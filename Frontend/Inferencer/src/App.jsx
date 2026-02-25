import { useState, useRef, useEffect } from 'react'
import './App.css'

const SUPPORTED_CLASSES = [
  "Apple-alternaria_leaf_spot", "Apple-black_rot", "Apple-brown_spot", "Apple-gray_spot", "Apple-healthy", "Apple-rust", "Apple-scab",
  "Bell_pepper-bacterial_spot", "Bell_pepper-healthy",
  "Blueberry-healthy",
  "Cassava-bacterial_blight", "Cassava-brown_streak_disease", "Cassava-green_mottle", "Cassava-healthy", "Cassava-mosaic_disease",
  "Cherry-healthy", "Cherry-powdery_mildew",
  "Coffee-healthy", "Coffee-red_spider_mite", "Coffee-rust",
  "Corn-common_rust", "Corn-gray_leaf_spot", "Corn-healthy", "Corn-northern_leaf_blight",
  "Grape_Leaf_blight", "Grape_black_measles", "Grape_black_rot", "Grape_healthy",
  "Orange-citrus_greening",
  "Peach-bacterial_spot", "Peach-healthy",
  "Potato_bacterial_wilt", "Potato_early_blight", "Potato_healthy", "Potato_late_blight", "Potato_leafroll_virus", "Potato_mosaic_virus", "Potato_nematode", "Potato_pests", "Potato_phytophthora",
  "Raspberry_healthy",
  "Rice_bacterial_blight", "Rice_blast", "Rice_brown_spot", "Rice_tungro",
  "Rose_healthy", "Rose_rust", "Rose_slug_sawfly",
  "Soybean_healthy",
  "Squash_powdery_mildew",
  "Strawberry_healthy", "Strawberry_leaf_scorch",
  "Sugercane_healthy", "Sugercane_mosaic", "Sugercane_red_rot", "Sugercane_rust", "Sugercane_yellow_leaf",
  "Tomato_bacterial_spot", "Tomato_early_blight", "Tomato_healthy", "Tomato_late_blight", "Tomato_leaf_curl", "Tomato_leaf_mold", "Tomato_mosaic_virus", "Tomato_septoria_leaf_spot", "Tomato_spider_mites", "Tomato_target_spot",
  "Watermelon_anthracnose", "Watermelon_downy_mildew", "Watermelon_healthy", "Watermelon_mosaic_virus"
];

function App() {
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [confidence, setConfidence] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showDiseases, setShowDiseases] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setPrediction(null)
      setConfidence(null)
    }
  }

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true)
    
    const formData = new FormData()
    formData.append("image", image)

    try {
      const response = await fetch('https://infback.biplawdev.in/predict', {
        method:"POST",
        body: formData
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setConfidence(data.confidence)
      setPrediction(data.class)
      console.log(data)
    } catch (error) {
      console.error("Error making prediction:", error)
      alert("Failed to make prediction. Please check if the server is running.")
    } finally {
      setLoading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1 className="logo">Plant Disease Predictor</h1>
      </nav>

      <main className="main-content">
        <div className="hero-text">
          <h2>Plant Disease Classifier</h2>
          <p>Upload an image of a plant leaf and let our AI model classify the disease instantly.</p>
        </div>

        <div className="inferencer-card">
          <div className="upload-container" onClick={triggerFileInput}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*"
              style={{ display: 'none' }}
            />
            {previewUrl ? (
              <div className="image-preview">
                <img src={previewUrl} alt="Upload preview" />
                <div className="image-overlay">
                  <span>Click to change image</span>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                </div>
                <h3>Upload Image</h3>
                <p>Click to browse and select a file</p>
              </div>
            )}
          </div>

          <div className="action-container">
            <button 
              className={`predict-btn ${loading ? 'loading' : ''} ${!image ? 'disabled' : ''}`}
              onClick={handlePredict} 
              disabled={loading || !image}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : "Run Inference"}
            </button>
          </div>

          {(prediction !== null || confidence !== null) && (
            <div className="results-container">
              <div className="result-item">
                <span className="result-label">Predicted Class</span>
                <span className="result-value class-name">{prediction}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Confidence</span>
                <span className="result-value confidence-bar-container">
                  <span className="confidence-text">{(confidence * 100).toFixed(2)}%</span>
                  <div className="confidence-bar-bg">
                    <div 
                      className="confidence-bar-fill" 
                      style={{ width: `${Math.min(100, confidence * 100)}%` }}
                    ></div>
                  </div>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="diseases-section mt-8">
          <button 
            className="toggle-diseases-btn"
            onClick={() => setShowDiseases(!showDiseases)}
          >
            {showDiseases ? "Hide" : "View"} Supported Diseases ({SUPPORTED_CLASSES.length})
            <svg 
              className={`chevron-icon ${showDiseases ? 'rotated' : ''}`} 
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {showDiseases && (
            <div className="diseases-grid">
              {SUPPORTED_CLASSES.map((disease, idx) => (
                <div key={idx} className="disease-pill">
                  {disease.replace(/_/g, ' ')}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
