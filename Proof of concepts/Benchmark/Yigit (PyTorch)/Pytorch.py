import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import torch
import arrow
from sklearn import preprocessing
from sklearn.model_selection import train_test_split

# Load data from csv file
step_data = pd.read_csv('datasets/datasetSubsetStap.csv',
                        sep=';',
                        decimal=',')

# # Delete records with missing information
# step_data = step_data.replace('?', np.nan)
#
# # Drop records with missing fields
# step_data = step_data.dropna()

# Select columns to use
columns = ['x-axis (deg/s)']
step_features = step_data[columns]

step_target = step_data[['timestamp (+0100)']]

pd.options.mode.chained_assignment = None

step_date = []
for date in step_target['timestamp (+0100)']:
    currentDate = arrow.get(date, 'YYYY-MM-DD HH:mm:ss')
    step_date.append(currentDate.timestamp)

step_target['timestamp (+0100)'] = step_date

#
# step_features = pd.get_dummies(step_features,
#                                columns=['timestamp (+0100)'])

step_features[['x-axis (deg/s)']] = \
    preprocessing.scale(step_features[['x-axis (deg/s)']])

X_train, x_test, Y_train, y_test = train_test_split(step_target,
                                                    step_features,
                                                    test_size=0.2,
                                                    random_state=0)
dtype = torch.float

X_train_tensor = torch.tensor(X_train.values, dtype = dtype)
x_test_tensor = torch.tensor(x_test.values, dtype = dtype)

Y_train_tensor = torch.tensor(Y_train.values, dtype = dtype)
y_test_tensor = torch.tensor(y_test.values, dtype = dtype)

print(X_train_tensor.shape)

inp = 1
output = 800

hidden = 1

loss_fn = torch.nn.MSELoss()

learning_rate = 0.0001

model = torch.nn.Sequential(torch.nn.Linear(inp, hidden),
                            torch.nn.Sigmoid(),
                            torch.nn.Linear(hidden, output))
for iter in range(10000):
    y_pred = model(X_train_tensor)
    loss = loss_fn(y_pred, Y_train_tensor)

    if iter % 1000 == 0:
        print(iter, loss.item())

    model.zero_grad()
    loss.backward()

    with torch.no_grad():
        for param in model.parameters():
            param -= learning_rate * param.grad

sample = x_test.iloc[23]
print(sample)

sample_tensor = torch.tensor(sample.values, dtype = dtype)
print(sample_tensor)

y_pred = model(sample_tensor)
print("Predicted:", int(y_pred.item()))
print("Actual: ", int(y_test.iloc[23]))

y_pred_tensor = model(x_test_tensor)
y_pred = y_pred_tensor.detacj().numpy()

plt.scattery(y_pred, y_test.values)
plt.xlabel("Actual")
plt.ylabel("Predict")
plt.show()

