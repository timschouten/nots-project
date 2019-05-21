import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

census = pd.read_csv("adult.csv", header=None)
census.columns = ['age', 'workclass', 'fnlwgt', 'education', 'education_num', 'marital_status',
                  'occupation', 'relationship', 'race', 'gender', 'capital_gain',
                  'capital_loss', 'hours_per_week', 'native_country', 'income_bracket']


def label_fix(label):
    if label == ' <=50K':
        return 0
    else:
        return 1


census['income_bracket'] = census['income_bracket'].apply(label_fix)
census['income_bracket'].unique()

x_data = census.drop('income_bracket', axis=1)
y_labels = census['income_bracket']

X_train, X_test, y_train, y_test = train_test_split(x_data, y_labels, test_size=0.3, random_state=101)

# Vocabulary list
gender = tf.feature_column.categorical_column_with_vocabulary_list("gender", ["Female", "Male"])

# Hash bucket
occupation = tf.feature_column.categorical_column_with_hash_bucket("occupation", hash_bucket_size=1000)
marital_status = tf.feature_column.categorical_column_with_hash_bucket("marital_status", hash_bucket_size=1000)
relationship = tf.feature_column.categorical_column_with_hash_bucket("relationship", hash_bucket_size=1000)
education = tf.feature_column.categorical_column_with_hash_bucket("education", hash_bucket_size=1000)
workclass = tf.feature_column.categorical_column_with_hash_bucket("workclass", hash_bucket_size=1000)
native_country = tf.feature_column.categorical_column_with_hash_bucket("native_country", hash_bucket_size=1000)

# Numeric
age = tf.feature_column.numeric_column("age")
education_num = tf.feature_column.numeric_column("education_num")
capital_gain = tf.feature_column.numeric_column("capital_gain")
capital_loss = tf.feature_column.numeric_column("capital_loss")
hours_per_week = tf.feature_column.numeric_column("hours_per_week")

feat_cols = [gender, occupation, marital_status, relationship, education, workclass, native_country, age, education_num,
             capital_gain, capital_loss, hours_per_week]

input_func = tf.estimator.inputs.pandas_input_fn(x=X_train, y=y_train, batch_size=100, num_epochs=None, shuffle=True)

model = tf.estimator.LinearClassifier(feature_columns=feat_cols)
model.train(input_fn=input_func, steps=4000)

# Try the trained model "test0.csv"=Lower than 50K, so supposed to be 0. "test1.csv"=Higher than 50K, so supposed
# to be 1.
# test_census = pd.read_csv("test1.csv", header=None)
# test_census.columns = ['age', 'workclass', 'fnlwgt', 'education', 'education_num', 'marital_status',
#                   'occupation', 'relationship', 'race', 'gender', 'capital_gain',
#                   'capital_loss', 'hours_per_week', 'native_country']
#
# test_pred_fn = tf.estimator.inputs.pandas_input_fn(x=test_census, batch_size=len(test_census), shuffle=False)
#
# predictions = list(model.predict(input_fn=test_pred_fn))
# final_preds = []
# for pred in predictions:
#     final_preds.append(pred['class_ids'][0])
#
# print(final_preds[0])


# Print the accuracy report
pred_fn = tf.estimator.inputs.pandas_input_fn(x=X_test, batch_size=len(X_test), shuffle=False)

predictions = list(model.predict(input_fn=pred_fn))
final_preds = []
for pred in predictions:
    final_preds.append(pred['class_ids'][0])

print(classification_report(y_test, final_preds))
