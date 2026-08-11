import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handleAnalyze = () => {
    console.log("Analyze button clicked");
  };

  return (
    <div className="app">
      <div className="container">

        <h1>AI Text Identifier</h1>

        <p className="subtitle">
          Upload an image and let AI identify the text.
        </p>

        <label htmlFor="imageUpload" className="upload-box">

          {image ? (
            <img
              src={image}
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