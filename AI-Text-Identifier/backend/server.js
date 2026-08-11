const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const upload = multer({ storage: multer.memoryStorage() });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Text Identifier backend is running"
  });
});

app.post("/api/analyze", upload.single("image"), async (req, res) => {
  console.log("Analyze request received");

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image received",
    });
  }

  try {
    console.log("Image received:");
    console.log("Filename:", req.file.originalname);
    console.log("Mimetype:", req.file.mimetype);
    console.log("Size:", req.file.size, "bytes");

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: req.file.buffer.toString("base64"),
          },
        },
        {
         text: `
You are a text extraction system for a Digital Herbarium.

Analyze the provided image and extract all readable information
written on the image.

The image may contain:
- printed text
- typed text
- handwritten text
- plant names
- scientific names
- family names
- collector names
- dates
- locations
- specimen numbers
- institution names
- botanical information
- other metadata related to the specimen

Extract the information that is actually present in the image.

Do NOT determine whether the text is AI-generated or human-written.
Do NOT describe the visual appearance of the image.
Do NOT infer information from the appearance of the plant.
Do NOT invent or guess missing information.

Return the extracted information as key-value pairs.

Return ONLY valid JSON in this format:

{
  "fields": [
    {
      "key": "field_name",
      "value": "field_value"
    }
  ]
}
`,
        },
      ],
    });

console.log("Gemini response received");

const rawText = result.text;

console.log("Gemini raw response:");
console.log(rawText);

const cleanedText = rawText
  .replace(/^```json\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/\s*```$/i, "")
  .trim();

const extractedData = JSON.parse(cleanedText);

console.log("Parsed JSON:");
console.log(extractedData);

res.json({
  success: true,
  result: extractedData,
});

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      success: false,
      message: "Error analyzing image",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});