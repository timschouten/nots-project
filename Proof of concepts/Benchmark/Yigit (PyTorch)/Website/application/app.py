from flask import request, render_template, jsonify, url_for, redirect, g
from flask_cors import CORS
from .models import User
from .TorchModel import Net
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token
import pandas as pd
import numpy as np
# import matplotlib.pyplot as plt
# import seaborn as sns
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
# import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

def loadData():
    pd.set_option('display.max_columns', None)

    # Step 1: Load the data
    dataset = pd.read_csv("./application/data/adult.csv")

    # Drop the data you don't want to use
    dataset.drop(labels=["workclass", "fnlwgt","education","occupation","relationship","race","native.country"], axis = 1, inplace = True)


    # Step 2: Replace All Null Data in NaN
    dataset = dataset.fillna(np.nan)

    # Step 3: Get data types
    dataset.dtypes

    # Step 4: Reformat Column We Are Predicting
    dataset['income']=dataset['income'].map({'<=50K': 0, '>50K': 1, '<=50K.': 0, '>50K.': 1})

    # Step 5: Identify Numeric features

    # Step 6: Format data
    dataset["sex"] = dataset["sex"].map({"Male": 0, "Female":1})
    dataset["marital.status"] = dataset["marital.status"].replace(['Never-married','Divorced','Separated','Widowed'], 'Single')
    dataset["marital.status"] = dataset["marital.status"].replace(['Married-civ-spouse','Married-spouse-absent','Married-AF-spouse'], 'Married')
    dataset["marital.status"] = dataset["marital.status"].map({"Married":1, "Single":0})
    dataset["marital.status"] = dataset["marital.status"].astype(int)

    dataset_targets = dataset['income'];
    dataset_features = dataset[['age', 'education.num','capital.gain','capital.loss','hours.per.week', 'sex','marital.status']]

    # Step 7: Modeling
    validation_size = 0.20
    X_train, X_validation, Y_train, Y_validation = train_test_split(dataset_features, dataset_targets,
        test_size=validation_size,random_state=0)


    Xtrain_ = torch.from_numpy(X_train.values).float()
    Xtest_ = torch.from_numpy(X_validation.values).float()
    Ytrain_ = torch.from_numpy(Y_train.values).view(1, -1)[0]
    Ytest_ = torch.from_numpy(Y_validation.values).view(1,-1)[0]
    return X_train, X_validation, Y_train, Y_validation, Xtrain_, Xtest_, Ytrain_, Ytest_


@app.route('/', methods=['GET'])
def index():
    return render_template('/website/public/index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('/website/public/index.html')


@app.route("/api/train/model", methods=["GET"])
def train_model():
    X_train, X_validation, Y_train, Y_validation, Xtrain_, Xtest_, Ytrain_, Ytest_ = loadData()
    model = Net()
    optimizer = optim.Adam(model.parameters())
    loss_fn = nn.NLLLoss()
    epoch_data = []
    epochs = 3000

    for epoch in range(1, epochs):
        optimizer.zero_grad()
        Ypred = model(Xtrain_)

        loss = loss_fn(Ypred, Ytrain_)
        loss.backward()

        optimizer.step()

        Ypred_test = model(Xtest_)
        loss_test = loss_fn(Ypred_test, Ytest_)

        _, pred = Ypred_test.data.max(1)

        accuracy = pred.eq(Ytest_.data).sum().item() / Y_validation.size
        epoch_data.append([epoch, loss.data.item(), loss_test.data.item(), accuracy])
        if epoch % 100 == 0:
            print('epoch - %d (%d%%) train loss - %.2f test loss - %.2f accuracy - %.4f' \
                    % (epoch, epoch / 150 * 10, loss.data.item(), loss_test.data.item(), accuracy))
    
    model.save('./data')
    return jsonify({'success': True, 'epoch-data': [epoch_data]})


@app.route("/api/test/model", methods=["GET"])
def test_model():
    X_train, X_validation, Y_train, Y_validation, Xtrain_, Xtest_, Ytrain_, Ytest_ = loadData()
    model = torch.load('./data')
    text = []
    for tst in X_validation.values:
        sample = np.array(tst)

        sample_tensor = torch.from_numpy(sample).float()

        out = model(sample_tensor)

        _, predicted = torch.max(out.data, -1)

        if predicted.item() == 0:
            print("Will earn more than 50k a year - " + str(predicted.item()))
            text.append("Will not earn more than 50k a year - " + str(predicted.item()))
        elif predicted.item() == 1:
            print("Will earn more than 50k a year - " + str(predicted.item()))
            text.append("Will earn more than 50k a year - " + str(predicted.item()))
    return jsonify(text)


@app.route("/api/predict", methods=["POST"])
def predict():
    incoming = request.get_json()
    print(incoming)
    values = [incoming['age'], incoming['study'], incoming['capitalGain'], incoming['capitalLoss'], incoming['hoursPerWeek'], incoming['sex'],incoming['status']]
    print(values)
    model = torch.load('./data')
    earn = False
    # for tst in X_validation.values:
    sample = np.array(values)
        #
    sample_tensor = torch.from_numpy(sample).float()
        #
    out = model(sample_tensor)
        #
    _, predicted = torch.max(out.data, -1)
    #
    if predicted.item() == 0:
        earn = False;
    elif predicted.item() == 1:
        earn = True;
    return jsonify({"prediction": earn})


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
