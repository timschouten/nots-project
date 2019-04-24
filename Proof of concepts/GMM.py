import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from pandas import DataFrame
from sklearn import datasets
from sklearn.mixture import GaussianMixture
import csv
with open('datasetSubsetStap.csv', 'r') as f:

    Data = list(csv.reader(f, delimiter=';'))
    print(Data)
# load the iris dataset
# iris = datasets.load_iris()

# select first two columns
# X = iris.data[:, :2]

# turn it into a dataframe
d = pd.DataFrame(Data)

# plot the data
plt.scatter(d[0], d[1])
plt.show()

gmm = GaussianMixture(n_components=3)

# Fit the GMM model for the dataset
# which expresses the dataset as a
# mixture of 3 Gaussian Distribution
gmm.fit(d)

# Assign a label to each sample
labels = gmm.predict(d)
d['labels'] = labels
d0 = d[d['TIMESTAMP'] == 0]
d1 = d[d['X_AXIS'] == 1]
d2 = d[d['Y_AXIS'] == 2]
# d3 = d[d['labels'] == 3]

# plot three clusters in same plot
plt.scatter(d0[0], d0[1], c='r')
plt.scatter(d1[0], d1[1], c='b')
plt.scatter(d2[0], d2[1], c='g')
# plt.scatter(d3[0], d3[1], c='yellow')

plt.show()