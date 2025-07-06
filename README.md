# File Metadata Microservice

A Node.js/Express.js microservice that analyzes uploaded files and returns their metadata.

## Features

- Upload files through a web interface
- Get file metadata including name, type, and size
- File size limit of 10MB
- RESTful API endpoint

## API

### POST `/api/fileanalyse`

Upload a file using multipart/form-data with the field name `upfile`.

**Response:**
```json
{
  "name": "example.txt",
  "type": "text/plain",
  "size": 1024
}
```

**Error Response:**
```json
{
  "error": "No file uploaded"
}
```

## Usage

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

4. Upload a file using the web interface or make a POST request to `/api/fileanalyse`

## Example using cURL

```bash
curl -X POST \
  http://localhost:3000/api/fileanalyse \
  -F "upfile=@/path/to/your/file.txt"
```

## Environment Variables

- `PORT`: Server port (default: 3000)

## Technologies Used

- Node.js
- Express.js
- Multer (for file upload handling)
- CORS (for cross-origin resource sharing)
