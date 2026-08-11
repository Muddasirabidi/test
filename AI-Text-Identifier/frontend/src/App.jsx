import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      console.log("No image selected");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("image", image);

      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  };

  return (
    <div className="app">
      <div className="container">

        <h1>AI Text Identifier</h1>

        <p className="subtitle">
          Upload an image and let AI identify the text.
        </p>

        <label htmlFor="imageUpload" className="upload-box">

          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Selected"
              className="preview-image"
            />
          ) : (
            <>
              <div className="upload-icon">📷</div>

              <p>Click to upload an image</p>

              <span>
                PNG, JPG or JPEG
              </span>
            </>
          )}

        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          hidden
        />

        {image && (
          <button
            className="analyze-button"
            onClick={handleAnalyze}
          >
            Analyze Image
          </button>
        )}

        <div className="result-box">
          <h2>Result</h2>

          <p>
            Your AI analysis will appear here.
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;