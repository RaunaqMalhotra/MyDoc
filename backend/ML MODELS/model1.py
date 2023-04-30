from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import json

app = Flask(__name__)

def load_data():
    try:
        data = pd.read_csv('prognosis.csv')
        return data
    except FileNotFoundError:
        print("CSV file not found.")
        return None

def transform_symptoms(symptoms, X_columns):
    transformed_symptoms = []
    for symptom in X_columns:
        if symptom in symptoms:
            transformed_symptoms.append(1)
        else:
            transformed_symptoms.append(0)
    return transformed_symptoms

@app.route('/')
def home():
    return "This is the home page."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if data is None or 'symptoms' not in data:
        return jsonify({"error": "No data provided or 'symptoms' key missing in request data"}), 400

    symptoms = data['symptoms']

    if symptoms is not None:
        data = load_data()

        if data is not None:
            X = data.drop('prognosis', axis=1)
            y = data['prognosis']

            X_columns = X.columns.tolist()
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

            model = RandomForestClassifier()
            model.fit(X_train, y_train)

            transformed_symptoms = transform_symptoms(symptoms, X_columns)
            predicted_disease = model.predict([transformed_symptoms])

            y_pred = model.predict(X_test)
            accuracy = accuracy_score(y_test, y_pred)

            return jsonify({
                "disease": predicted_disease[0],
                "accuracy": accuracy,
            })
        else:
            return jsonify({"error": "Unable to load CSV file"}), 500
    else:
        return jsonify({"error": "No symptoms provided"}), 400

if __name__ == '__main__':
    try:
        app.run(port=9000)
    except Exception as e:
        print(e)
    finally:
        print("Closing Flask app.")
