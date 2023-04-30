from flask import Flask, request, jsonify
import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

app = Flask(__name__)

data = pd.read_csv('prognosis.csv')

X = data.drop('prognosis', axis=1)
y = data['prognosis']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy on test set: {accuracy}')

def transform_symptoms(symptoms):
    transformed_symptoms = []
    for symptom in X.columns:
        if symptom in symptoms:
            transformed_symptoms.append(1)
        else:
            transformed_symptoms.append(0)
    return transformed_symptoms


def predict_disease(symptoms):
    transformed_symptoms = transform_symptoms(symptoms)
    predicted_disease = model.predict([transformed_symptoms])
    return predicted_disease[0]


@app.route('/predict', methods=['POST'])
def predict():
    symptoms = request.json['symptoms']
    predicted_disease = predict_disease(symptoms)
    return jsonify({
        "disease": predicted_disease,
        "accuracy": accuracy,
    })

if __name__ == '__main__':
    app.run(port=9000)
