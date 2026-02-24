# 🌱 Plant Disease Classifier

An AI-powered web application that helps farmers and agriculturists quickly and accurately classify plant diseases from leaf images. Simply upload a picture of a diseased leaf, and our lightweight AI model will instantly predict the exact disease with an associated confidence score.

## Features

- **Modern & Beautiful UI**: A clean, light-mode interface with glassmorphism components and smooth CSS animations.
- **Drag & Drop Upload**: An intuitive interface for uploading plant leaf images via file browser or drag-and-drop.
- **Instant AI Inference**: Powered by a robust PyTorch backend that instantly runs inference on uploaded images.
- **Detailed Results**: Provides clear visibility on the predicted disease class alongside a visual confidence percentage bar.
- **Supported Diseases Catalog**: Easily view the application's supported catalog of 78 distinct diseases (covering Apple, Strawberry, Tomato, Potato, Corn, and many more).

## Tech Stack

- **Frontend**: React (Vite), Vanilla CSS (Custom modern glassmorphism UI)
- **Backend API**: FastAPI (Python), Uvicorn
- **AI Model**: PyTorch, TorchVision (Local inference running `finalmodel.pth`)

---

## 🚀 Getting Started

To run the application locally, you will need to start both the Python backend API and the React frontend separately.

### 1. Setup the Backend (FastAPI + PyTorch)

The backend handles receiving the uploaded image, transforming it, and running the inference model.

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Make sure you have the required dependencies (you can install them using `pip`):
   ```bash
   pip install fastapi uvicorn python-multipart torch torchvision Pillow
   ```
3. Run the FastAPI development server:
   ```bash
   python server.py
   ```
   _The server will start running on `http://0.0.0.0:8000`._

### 2. Setup the Frontend (React + Vite)

The frontend provides the modern interface for the user to upload images and view the results.

1. Navigate to the `Frontend/Inferencer` directory:
   ```bash
   cd Frontend/Inferencer
   ```
2. Install the required Node packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   _The application will now be accessible in your browser (typically at `http://localhost:5173`)._

---

## 📷 Usage

1. Open the frontend in your browser.
2. Click the central **Upload Image** box to browse for a leaf image.
3. Click **Run Inference** to send the image to the backend.
4. View your **Predicted Class** and **Confidence Score** instantly!
5. Curious what else the app can classify? Click **View Supported Diseases** at the bottom to explore the full catalog.
