# 🌿 Digital Herbarium — AI Text Identifier

> **An AI-powered image-to-text extraction component for digitizing herbarium specimens.**

The **AI Text Identifier** is a component of the **Digital Herbarium** project that uses **Google Gemini AI** to extract readable information from images of herbarium specimens.

It supports **printed, typed, and handwritten text** and converts the extracted information into a structured **JSON format** that can later be reviewed, edited, and stored as a digital herbarium record.

![Status](https://img.shields.io/badge/Status-Prototype-orange)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![AI-Gemini](https://img.shields.io/badge/AI-Google%20Gemini-purple)
![Images](https://img.shields.io/badge/Images-PNG%20%7C%20JPG%20%7C%20JPEG-yellow)

---

## 🌱 What Does It Do?

The component allows a user to:

**📷 Upload an image**
↓
**🤖 Send it to the AI backend**
↓
**🔍 Extract readable text**
↓
**📦 Convert it into structured JSON**
↓
**✏️ Review and verify the extracted information**
↓
**🌿 Create a digital herbarium record**

---

## ✨ Features

| Feature                  | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| 📷 Image Upload          | Upload herbarium specimen images                     |
| 🖼️ Image Preview        | Preview the selected image before analysis           |
| 📄 OCR / Text Extraction | Extract readable information from specimen labels    |
| ✍️ Handwriting Support   | Attempts to extract handwritten information          |
| 🤖 Gemini AI             | Uses Google Gemini for image-based text extraction   |
| 📦 JSON Output           | Returns extracted information in a structured format |
| 🛡️ No Guessing          | AI is instructed not to invent missing information   |
| 🌐 REST API              | Frontend communicates with backend through an API    |

---

## 🧰 Technologies

### Frontend

![React](https://img.shields.io/badge/React-2026-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript)
![Vite](https://img.shields.io/badge/Vite-purple?logo=vite)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![Multer](https://img.shields.io/badge/Multer-File%20Upload-lightgrey)

### AI

![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-blue)

---

## 🔄 System Architecture

```text
                    🌿 DIGITAL HERBARIUM
                            │
                            ▼
                    📷 User Uploads Image
                            │
                            ▼
                    ⚛️ React Frontend
                            │
                     multipart/form-data
                            │
                            ▼
                   🟢 Node.js + Express
                            │
                            ▼
                       📦 Multer
                     Image in Memory
                            │
                            ▼
                     🔐 Base64 Encoding
                            │
                            ▼
                     🤖 Google Gemini
                            │
                  🔍 Text Extraction
                            │
                            ▼
                     📦 Structured JSON
                            │
                            ▼
                    ✏️ User Verification
                            │
                            ▼
                    🌿 Digital Record
```

---

## 🧠 AI Text Extraction

The backend sends the uploaded image to Gemini along with instructions to extract information that is actually present in the image.

The AI can extract information such as:

* 🌱 Plant names
* 🔬 Scientific names
* 🧬 Family names
* 👤 Collector names
* 📅 Collection dates
* 📍 Locations
* 🔢 Specimen numbers
* 🏛️ Institution names
* 📝 Botanical information
* 📋 Other specimen metadata

The AI is explicitly instructed **not to**:

❌ Determine whether the text was AI-generated
❌ Describe the visual appearance of the image
❌ Identify a plant based only on its appearance
❌ Infer information that is not present
❌ Guess missing values

---

## 📦 JSON Output

The extracted information is returned in a flexible structure:

```json
{
  "fields": [
    {
      "key": "scientific_name",
      "value": "Example plantus"
    },
    {
      "key": "collector",
      "value": "John Smith"
    },
    {
      "key": "location",
      "value": "Karachi, Pakistan"
    }
  ]
}
```

### Why use a flexible structure?

Herbarium specimens do not necessarily contain the same information.

One specimen might contain:

```text
Scientific Name
Collector
Location
Date
```

while another might contain:

```text
Family
Specimen Number
Institution
Collector
```

Using a dynamic `fields` array allows the system to handle different specimen formats without requiring a fixed database structure at the extraction stage.

---

## 📁 Project Structure

```text
AI-Text-Identifier/
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── ⚛️ App.jsx
│   │   └── 🎨 App.css
│   ├── 📄 package.json
│   └── ...
│
├── 📂 backend/
│   ├── 🟢 server.js
│   ├── 📄 package.json
│   ├── 🔐 .env
│   └── ...
│
└── 📖 README.md
```

> 🔐 **Important:** The `.env` file contains the Gemini API key and should **never be committed to GitHub**.

---

## 🚀 Getting Started

### 1️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

Required backend packages:

```bash
npm install express cors multer dotenv @google/genai
```

---

## 🔐 Environment Configuration

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Add the following to `.gitignore`:

```text
.env
node_modules/
```

---

## ▶️ Running the Application

### 🟢 Start Backend

From the `backend` directory:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

You can verify it by opening the root endpoint:

```text
GET /
```

Expected response:

```json
{
  "message": "AI Text Identifier backend is running"
}
```

### 🔵 Start Frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will provide the local development URL.

---

## 🌐 API

### `POST /api/analyze`

Analyzes an uploaded herbarium image.

**Request type:**

```text
multipart/form-data
```

**Field:**

```text
image
```

### Successful Response

```json
{
  "success": true,
  "result": {
    "fields": [
      {
        "key": "scientific_name",
        "value": "Example plantus"
      }
    ]
  }
}
```

### Error Response

If no image is provided:

```json
{
  "success": false,
  "message": "No image received"
}
```

---

## ⚠️ Current Limitations

This is currently a **prototype**.

🔸 Extracted results are currently logged to the browser console.

🔸 The frontend does not yet display the extracted fields dynamically.

🔸 Users cannot yet edit and verify individual extracted fields.

🔸 Extracted data is not currently stored in a database.

🔸 OCR accuracy depends on image quality and handwriting clarity.

🔸 Plant identification based on visual characteristics is outside the current scope.

---

## 🚀 Future Improvements

### 🖥️ Frontend

* [ ] Display extracted fields in the UI
* [ ] Add editable fields
* [ ] Add loading indicators
* [ ] Add better error messages
* [ ] Add image validation

### 🤖 AI

* [ ] Improve handwritten text recognition
* [ ] Improve extraction accuracy
* [ ] Add plant/species identification
* [ ] Add confidence scores for extracted fields

### 🗄️ Data Management

* [ ] Store verified records in a database
* [ ] Create permanent herbarium records
* [ ] Add search functionality
* [ ] Add filtering and categorization

### 🔐 Production

* [ ] Add authentication
* [ ] Secure API endpoints
* [ ] Add rate limiting
* [ ] Deploy frontend and backend
* [ ] Implement production environment configuration

---

## 🌿 Project Vision

The ultimate goal of this component is to help transform **physical herbarium specimens into structured digital records**.

Instead of manually typing information from every specimen label:

> 📷 **Image → 🤖 AI Extraction → ✏️ Verification → 🗄️ Digital Record**

The AI Text Identifier forms the **text extraction layer** of the larger Digital Herbarium system.

---

### 🌱 Digital Herbarium

**Preserving botanical knowledge through AI-powered digitization.**

> *From physical specimens to searchable digital knowledge.* 🌿
