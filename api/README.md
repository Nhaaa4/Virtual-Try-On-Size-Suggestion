# Virtual Try-On & Size Suggestion API

## Introduction

This project is a comprehensive AI-powered fashion technology solution that combines **Virtual Try-On** and **Size Suggestion** capabilities. Built with FastAPI, this production-ready API enables users to virtually try on clothing items using advanced diffusion models and receive personalized size recommendations based on their body measurements using machine learning algorithms.

The system leverages:
- **OOTDiffusion** for high-quality virtual try-on generation
- **Google's Imagen** via Gemini API for AI-generated try-on images
- **Machine Learning models** (Decision Tree and Neural Network) for accurate size predictions
- **FastAPI** for a robust and scalable REST API architecture

## Project Objectives

### Primary Objectives
1. **Virtual Try-On Service**: Enable users to visualize how garments look on them by uploading a person image and a garment image
2. **Size Recommendation**: Provide accurate clothing size suggestions based on user's age, height, and weight measurements
3. **Multi-Model Support**: Offer multiple ML models (Decision Tree and Neural Network) for size prediction with model selection flexibility
4. **Production-Ready API**: Deliver a scalable, well-documented, and maintainable API service

### Key Features
- **Multiple Try-On Methods**: HD quality using OOTDiffusion and AI-generated using Gemini Imagen
- **Smart Size Prediction**: ML-powered size recommendations for different body types

## Project Structure

```
api/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── api/                    # API endpoints
│   │   ├── size_suggestion.py  # Size prediction endpoints
│   │   └── virtual_tryon.py    # Virtual try-on endpoints
│   ├── core/                   # Core configurations
│   │   ├── config.py           # Settings and environment variables
│   │   └── logging.py          # Logging configuration
│   ├── schemas/                # Pydantic models
│   │   ├── request.py          # Request schemas
│   │   └── response.py         # Response schemas
│   └── services/               # Business logic
│       ├── file_handler.py     # File upload/download handling
│       ├── gemini_service.py   # Gemini API integration
│       ├── model_loader.py     # ML model loading
│       ├── predictor.py        # Prediction logic
│       └── preprocessor.py     # Data preprocessing
├── models/                     # Trained ML models
│   ├── decision_tree_model.pkl
│   └── mlp_model.pkl
├── temp/                       # Temporary file storage
│   ├── upload/                 # Uploaded images
│   └── output/                 # Generated results
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

## Project Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Installation Steps

1. **Clone the repository**
   ```bash
   cd api
   ```

2. **Create and activate a virtual environment**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate on Linux/Mac
   source venv/bin/activate
   
   # Activate on Windows
   # venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MODEL_DECISION_TREE_PATH=models/decision_tree_model.pkl
   MODEL_NEURAL_NETWORK_PATH=models/mlp_model.pkl
   MODEL_VERSION=1.0.0
   LOG_LEVEL=INFO
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Ensure required directories exist**
   ```bash
   mkdir -p temp/upload temp/output data
   ```

6. **Run the application**
   ```bash
   # Development mode with auto-reload
   python -m app.main
   
   # Or using uvicorn directly
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

7. **Access the API documentation**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## API Endpoints

### Size Suggestion API

- **Base URL**: `/api/size-suggestion`
- `GET /` - Health check
- `POST /predict` - Get size recommendation
- `GET /models` - Check available models status

### Virtual Try-On API

- **Base URL**: `/api/virtual-tryon`
- `GET /` - Health check
- `POST /try-on-hd` - Generate HD virtual try-on (OOTDiffusion)
- `POST /try-on-ai` - Generate AI virtual try-on (Gemini Imagen)

## Testing with Postman

### Setup Postman

1. **Install Postman** from https://www.postman.com/downloads/
2. **Create a new collection** named "Virtual Try-On & Size Suggestion API"

### Test 1: Size Prediction (Decision Tree)

**Request:**
- **Method**: `POST`
- **URL**: `http://localhost:8000/api/size-suggestion/predict`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "age": 25,
    "height": 170,
    "weight": 65,
    "model_type": "decision_tree"
  }
  ```

**Expected Response:**
```json
{
  "recommended_size": "M",
  "model_used": "decision_tree",
  "confidence": 0.95,
  "user_measurements": {
    "age": 25,
    "height": 170,
    "weight": 65
  }
}
```

### Test 2: Size Prediction (Neural Network)

**Request:**
- **Method**: `POST`
- **URL**: `http://localhost:8000/api/size-suggestion/predict`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "age": 30,
    "height": 175,
    "weight": 70,
    "model_type": "neural_network"
  }
  ```

**Expected Response:**
```json
{
  "recommended_size": "L",
  "model_used": "neural_network",
  "confidence": 0.92,
  "user_measurements": {
    "age": 30,
    "height": 175,
    "weight": 70
  }
}
```

### Test 3: Check Models Status

**Request:**
- **Method**: `GET`
- **URL**: `http://localhost:8000/api/size-suggestion/models`

**Expected Response:**
```json
{
  "loaded_models": ["decision_tree", "neural_network"],
  "total_models": 2,
  "model_details": {
    "decision_tree": {
      "status": "ready",
      "path": "models/decision_tree_model.pkl"
    },
    "neural_network": {
      "status": "ready",
      "path": "models/mlp_model.pkl"
    }
  }
}
```

### Test 4: Virtual Try-On HD (OOTDiffusion)

**Request:**
- **Method**: `POST`
- **URL**: `http://localhost:8000/api/virtual-tryon/try-on-hd`
- **Headers**: 
  ```
  (Postman will auto-set Content-Type: multipart/form-data)
  ```
- **Body** (form-data):
  - Key: `vton_img` | Type: File | Value: [Select person image]
  - Key: `garm_img` | Type: File | Value: [Select garment image]

**Expected Response:**
```json
{
  "success": true,
  "output_image": "base64_encoded_image_string_here",
  "processing_time": 15.42,
  "message": "Virtual try-on completed successfully",
  "method": "ootdiffusion"
}
```

### Test 5: Virtual Try-On AI (Gemini Imagen)

**Request:**
- **Method**: `POST`
- **URL**: `http://localhost:8000/api/virtual-tryon/try-on-ai`
- **Headers**: 
  ```
  (Postman will auto-set Content-Type: multipart/form-data)
  ```
- **Body** (form-data):
  - Key: `vton_img` | Type: File | Value: [Select person image]
  - Key: `garm_img` | Type: File | Value: [Select garment image]
  - Key: `category` | Type: Text | Value: `Upper-body` (or `Lower-body`, `Dress`)

**Expected Response:**
```json
{
  "success": true,
  "output_image": "base64_encoded_image_string_here",
  "processing_time": 8.23,
  "message": "AI-generated try-on completed successfully",
  "method": "gemini_imagen"
}
```

### Test 6: Health Check

**Request:**
- **Method**: `GET`
- **URL**: `http://localhost:8000/`

**Expected Response:**
```json
{
  "docs": "http://localhost:8000/docs",
  "redoc": "http://localhost:8000/redoc"
}
```

## Postman Testing Tips

1. **Environment Variables**: Create a Postman environment with:
   - `base_url`: `http://localhost:8000`
   - Then use `{{base_url}}/api/size-suggestion/predict` in requests

2. **Image Testing**: 
   - Keep test images in a dedicated folder
   - Use images with clear person and garment visibility
   - Recommended formats: JPG, PNG
   - Recommended size: Under 10MB

3. **Save Responses**: 
   - Click on the response body
   - For base64 images, use online tools to decode and view results
   - Or write a Postman test script to auto-save images

4. **Error Handling Test Cases**:
   - Invalid data (negative values, missing fields)
   - Unsupported file types
   - Missing API keys (for Gemini endpoints)

5. **Collection Export**: Save your Postman collection for reuse:
   - Click on collection → Export → Collection v2.1
   - Share with team members

## Troubleshooting

### Common Issues

1. **Models Not Loading**
   - Ensure `.pkl` files exist in the `models/` directory
   - Check file paths in `.env` configuration

2. **Gemini API Errors**
   - Verify `GEMINI_API_KEY` is set correctly in `.env`
   - Check API quota and billing status

3. **OOTDiffusion Connection Failed**
   - Check internet connection
   - Gradio space might be temporarily unavailable

4. **File Upload Errors**
   - Ensure `temp/upload` and `temp/output` directories exist
   - Check file size limits and permissions

## Technology Stack

- **Framework**: FastAPI
- **ML Libraries**: scikit-learn, joblib
- **AI Services**: Gradio Client (OOTDiffusion), Google Gemini
- **Data Validation**: Pydantic
- **Server**: Uvicorn
- **Image Processing**: PIL, base64
- **Environment Management**: python-dotenv

## Contributing

This is a capstone project for Cambodia Academy of Digital Technology. For questions or contributions, please contact the development team.

## License

This project is developed as part of academic coursework at Cambodia Academy of Digital Technology.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Developed by**: Capstone II Team
