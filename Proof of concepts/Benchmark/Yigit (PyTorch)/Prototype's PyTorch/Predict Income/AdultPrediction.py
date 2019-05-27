import pandas as pd;
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

pd.set_option('display.max_columns', None)

# Step 1: Load the data
dataset = pd.read_csv("./data/adult.csv")

# Drop the data you don't want to use
dataset.drop(labels=["workclass","education","occupation","relationship","race","native.country"], axis = 1, inplace = True)


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
dataset_features = dataset[['age','fnlwgt','education.num','capital.gain','capital.loss','hours.per.week', 'marital.status']]

# Step 7: Modeling
validation_size = 0.20
X_train, X_validation, Y_train, Y_validation = train_test_split(dataset_features, dataset_targets,
    test_size=validation_size,random_state=0)

Xtrain_ = torch.from_numpy(X_train.values).float()
Xtest_ = torch.from_numpy(X_validation.values).float()

Ytrain_ = torch.from_numpy(Y_train.values).view(1, -1)[0]
Ytest_ = torch.from_numpy(Y_validation.values).view(1,-1)[0]

# Step 8: Size of the neural network
input_size = 7
output_size = 2
hidden_size = 50

# Step 9: Building the model


class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = F.sigmoid(self.fc1(x))
        x = F.sigmoid(self.fc2(x))
        x = self.fc3(x)

        return F.log_softmax(x, dim=-1)


model = Net()

optimizer = optim.Adam(model.parameters())

loss_fn = nn.NLLLoss()

# Step 10: Training the model
epoch_data = []
epochs = 1001

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

# Save or load model, by saving and loading you won't need to be train the model everytime you run the code.

# torch.save(model, './models')
#
# model = torch.load('./models')
# model.eval()

# UNCOMMENT FOR GRAPHS

# df_epochs_data = pd.DataFrame(epoch_data,
#                               columns=["epoch", "train_loss", "test_loss", "accuracy"])
#
# f, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
#
# df_epochs_data[["train_loss", "test_loss"]].plot(ax=ax1)
# df_epochs_data[["accuracy"]].plot(ax=ax2)
# plt.ylim(ymin=0.5)

# plt.show()

# Step 11: Testing the neural network with the dest data.

i = 0
for tst in X_validation.values:
    sample = np.array(tst)

    sample_tensor = torch.from_numpy(sample).float()

    out = model(sample_tensor)

    _, predicted = torch.max(out.data, -1)

    if predicted.item() == 0:
        print(i, "Will not earn more than 50k a year - ", predicted.item())
    elif predicted.item() == 1:
        print(i,"Will earn more than 50k a year - ", predicted.item())
    i += 1