import uvicorn
from fastapi import FastAPI, UploadFile, File
from inference_onnx import predict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
def predict_image(image: UploadFile = File(...)):
    image = image.file
    class_name, confidence = predict(image)
    return {"class": class_name, "confidence": confidence}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
