import sys
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

data = pd.read_csv('prognosis.csv')

X = data.drop('prognosis', axis=1)
y = data['prognosis']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = DecisionTreeClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')


def predict_disease(symptoms):
    transformed_symptoms = transform_symptoms(symptoms)
    predicted_disease = model.predict([transformed_symptoms])
    accuracy = accuracy_score(y_test, model.predict(X_test))
    return predicted_disease, accuracy


if __name__ == '__main__':
    if len(sys.argv) > 1:
        symptoms = json.loads(sys.argv[1])
        predicted_disease, accuracy = predict_disease(symptoms)
        print(json.dumps({
            "disease": predicted_disease[0],
            "accuracy": accuracy,
        }))
    else:
        print("No symptoms were provided as arguments.")
