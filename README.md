# AI PDF Q&A System

## Project Overview

AI PDF Q&A System is a web application that allows users to upload PDF documents and interact with them using natural language questions. The application extracts content from uploaded PDFs and uses an AI model to generate answers strictly based on document content.

The project provides a chat-based interface where users can:

* Upload PDF files
* Ask questions related to uploaded documents
* Receive answers based only on PDF content
* Clear previous chat automatically when a new PDF is uploaded
* View conversation history in a chatbot-style UI


# Features

* Upload PDF documents
* Extract text from PDFs
* AI-powered question answering
* Chat-style interface
* Loading indicator
* Displays uploaded file name
* Clears old questions when a new PDF is uploaded
* Responsive UI
* Supports multiple questions for one PDF



# Tech Stack

## Frontend

* React.js
* Axios
* CSS

## Backend

* Node.js
* Express.js
* Multer
* pdf-parse
* Ollama

## AI Model

* Phi3 / TinyLlama (Ollama)


# Project Structure

```text
ai-pdf-chat/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── uploads/
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md

#System Architecture

  text
User
   ↓
Upload PDF
   ↓
React Frontend
   ↓
Express Backend
   ↓
pdf-parse extracts text
   ↓
Store extracted content
   ↓
User asks question
   ↓
Relevant content sent to AI
   ↓
Ollama + Phi3 model
   ↓
Generate answer
   ↓
Return answer to frontend


# Project Flow

### Step 1

User uploads PDF document.

### Step 2

Backend receives PDF.

### Step 3

pdf-parse extracts text.

### Step 4

Text stored temporarily.

### Step 5

User asks a question.

### Step 6

Relevant content is selected.

### Step 7

Prompt sent to AI model.

### Step 8

AI generates answer.

### Step 9

Answer displayed in chat UI.

---

# Installation Guide

## Clone Repository

```bash
git clone YOUR_GITHUB_LINK
```

```bash
cd ai-pdf-chat
```

---

# Backend Setup

```bash
cd backend
```

Install packages:

```bash
npm install
```

Required packages:

```bash
npm install express cors multer pdf-parse ollama
```

Run backend:

```bash
node server.js
```

Server:

```text
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
```

Install:

```bash
npm install
```

Run:

```bash
npm start
```

Application:

```text
http://localhost:3000
```

---

# AI Model Setup

Install Ollama.

Run model:

```bash
ollama run phi3
```

or

```bash
ollama run tinyllama
```

Keep terminal open.

---

# AI Tools and Models Used

| Tool      | Purpose            |
| --------- | ------------------ |
| Ollama    | Run local AI model |
| Phi3      | Question answering |
| pdf-parse | Extract PDF text   |
| React     | Frontend           |
| Express   | Backend API        |
| Multer    | File upload        |

---

# Prompt Used

```text
You are an AI PDF Assistant.

Answer ONLY using PDF content.

Provide complete answers.

Do not invent information.

If answer not available:
Answer not found in PDF
```

---

# Sample Questions

* What is this document about?
* Summarize this PDF
* Who is the student?
* Which internship was completed?
* What work was done?
* Which technologies were used?
* What skills were learned?
* Explain the conclusion.

---

# Limitations

* Large PDFs may slow response time
* Accuracy depends on PDF text extraction
* Local models may require system resources
* Tables and images inside PDFs are not deeply understood
* Performance depends on model size

---

# Possible Improvements

* Vector database integration
* Semantic search
* Multi-PDF support
* Authentication system
* Cloud deployment
* Streaming AI responses
* Better document chunking
* PDF highlighting

---

# Future Scope

* Document summarization
* Multi-language support
* Voice-based questions
* OCR support for scanned PDFs
* RAG architecture integration

---

# Demo Steps

1. Upload PDF
2. Ask a question
3. View AI answer
4. Upload another PDF
5. Previous chat clears automatically
6. Continue asking questions

---

# Performance Analysis

The system may take a few seconds to generate answers because of the following reasons:

1. Local AI processing:
   The project uses Ollama with local AI models (Phi3/TinyLlama). Models run on the user's machine instead of cloud servers.

2. PDF text extraction:
   The application first extracts text from the uploaded PDF using pdf-parse before answering.

3. Large PDF content:
   Bigger PDF files contain more text, increasing processing time.

4. Context searching:
   Before generating answers, the system searches for relevant content inside the PDF.

5. Hardware limitations:
   Response speed depends on:
   - CPU
   - RAM
   - Disk speed
   - GPU availability

6. AI model size:
   Larger models provide better answers but require more processing time.

Examples:

- TinyLlama:
  Faster response
  Lower accuracy

- Phi3:
  Better answer quality
  Slightly slower

- Llama3:
  Best quality
  Slowest among local models

---

# Optimizations Applied

To improve speed, the following optimizations were used:

- Relevant PDF chunks are selected before sending to AI
- Limited context size
- Chat history clears when new PDF uploads
- Reduced unnecessary prompt size
- Lower temperature values used
- Restricted generated output length

---

# Challenges Faced

During development:

- Gemini API quota exceeded
- Local model setup issues
- Slow response time
- Incorrect PDF answer retrieval
- Matching relevant content from large PDFs
- Managing chat state after new uploads

Solutions:

- Switched to Ollama
- Used Phi3/TinyLlama
- Added context filtering
- Improved prompts
- Added automatic chat clearing
# Conclusion

The AI PDF Q&A System provides an interactive way for users to query PDF documents using natural language. It combines document parsing with AI to improve accessibility and information retrieval from large documents.
