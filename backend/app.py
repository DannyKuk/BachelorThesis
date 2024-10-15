from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from data_preprocessing import preprocess_image
from torchvision.models import resnet18

app = Flask(__name__)
CORS(app)


# Load the trained model
def load_model():
    model = resnet18(weights=None)
    model.fc = torch.nn.Linear(model.fc.in_features, 1)
    model.load_state_dict(torch.load("models/trained_model.pth"))
    model.eval()
    return model


model = load_model()


# Endpoint for recognizing a person
@app.route('/recognize', methods=['POST'])
def recognize():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = request.files['image']
    threshold = float(request.form['threshold'])

    # Preprocess the image and make predictions
    image_tensor = preprocess_image(image)
    with torch.no_grad():
        output = model(image_tensor)
        probability = torch.sigmoid(output).item()

    recognized = probability > threshold

    return jsonify({
        "recognized": recognized,
        "confidence": probability
    })


if __name__ == '__main__':
    app.run(debug=True)
