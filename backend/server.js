const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const { Ollama } = require("ollama");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/",
});

const ollama = new Ollama({
  host: "http://127.0.0.1:11434",
});

let documentText = "";

// =================== Upload PDF ===================

app.post(
  "/upload",
  upload.single("pdf"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          message:
            "Please select PDF",
        });
      }

      const dataBuffer =
        fs.readFileSync(
          req.file.path
        );

      const pdfData =
        await pdfParse(
          dataBuffer
        );

      documentText =
        pdfData.text;

      console.log(
        "PDF Uploaded Successfully"
      );

      res.json({
        message:
          "PDF uploaded successfully",
      });

    } catch (error) {

      console.log(
        "UPLOAD ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Upload failed",
      });
    }
  }
);

// =================== Ask Question ===================

app.post("/ask", async (req, res) => {
try {

const { question } = req.body;

if (!question) {
return res.json({
answer:"Please enter question"
});
}

if (!documentText) {
return res.json({
answer:"Upload PDF first"
});
}

// Split PDF into chunks
const chunks =
documentText
.split(/\n+/)
.filter(
x => x.trim().length > 30
);

// Find relevant chunks
const words =
question
.toLowerCase()
.split(" ")
.filter(
w => w.length > 2
);

let scored=[];

chunks.forEach(chunk=>{

let score=0;

words.forEach(word=>{

if(
chunk
.toLowerCase()
.includes(word)
){
score++;
}

});

if(score>0){

scored.push({
text:chunk,
score
});

}

});

scored.sort(
(a,b)=>
b.score-a.score
);

// Take top matching content
const context =
scored
.slice(0,12)
.map(x=>x.text)
.join("\n");

const prompt = `

You are an AI PDF Assistant.

Read the provided PDF content carefully.

PDF Content:
${context}

Question:
${question}

Instructions:

- Answer ONLY using the PDF content
- Give complete and proper answers
- Use multiple sentences if needed
- Use bullet points if suitable
- Do not invent information
- If answer does not exist write:
"Answer not found in PDF"

`;

const response =
await ollama.generate({

model:"phi3",

prompt,

stream:false,

options:{
temperature:0.2,
num_predict:150
}

});

res.json({
answer:
response.response
});

}
catch(error){

console.log(
"QUESTION ERROR:",
error
);

res.status(500).json({
answer:
"Question failed"
});

}
});

app.listen(
5000,
()=>{
console.log(
"Server running on port 5000"
);
}
);