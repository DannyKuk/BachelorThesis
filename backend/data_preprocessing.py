import os
import torch
from torchvision import transforms
from PIL import Image
from torchvision.models import resnet18

# Load the trained model
def load_model(model_path: str):
    model = resnet18(weights=None)
    model.fc = torch.nn.Linear(model.fc.in_features, 1)
    model.load_state_dict(torch.load(model_path))
    model.eval()
    return model

# Preprocess the image for the model
def preprocess_image(image_path: str) -> torch.Tensor:
    image = Image.open(image_path).convert("RGB")
    preprocess = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])
    return preprocess(image).unsqueeze(0)  # Add batch dimension

# Recognize the person in the image
def recognize_person(model, image_path: str, threshold: float = 0.975) -> dict:
    image = preprocess_image(image_path)
    with torch.no_grad():
        output = model(image)
        # Apply sigmoid to get a probability
        probability = torch.sigmoid(output).item()

    print(f"Processing image: {os.path.basename(image_path)}")
    print(f"Raw output (logits): {output.item()}")
    print(f"Model output (probability): {probability}")

    recognized = probability > threshold
    return {
        "recognized": recognized,
        "confidence": probability
    }

# Main function for testing recognition (optional)
if __name__ == "__main__":
    model_path = "models/trained_model.pth"
    model = load_model(model_path)

    test_folder = "data/test/"
    for image_name in os.listdir(test_folder):
        image_path = os.path.join(test_folder, image_name)
        result = recognize_person(model, image_path)
        print(f"Result for {image_name}: {result['recognized']}, Confidence: {result['confidence']:.3f}")
