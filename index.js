var express = require('express');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
require('dotenv').config()

var app = express();

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Clean up uploaded files after processing
function cleanupFile(filePath) {
  setTimeout(() => {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error('Error cleaning up file:', err);
    }
  }, 60000); // Delete after 1 minute
}

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// API endpoint for file analysis
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }
  
  // Clean up the uploaded file after processing
  cleanupFile(req.file.path);
  
  // Return file metadata
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.json({ error: 'File too large' });
    }
  }
  res.json({ error: error.message });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
