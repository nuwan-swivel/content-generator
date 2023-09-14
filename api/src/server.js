const express = require('express');
const { createVideo } = require('./functions/video-generator');
const cors = require('cors');
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static('public'));
// Use the cors middleware to allow requests from all origins
app.use(cors());

// Increase the limit for JSON request bodies (adjust the limit as needed)
app.use(express.json({ limit: '10mb' })); // Example limit of 10 megabytes

// Increase the limit for URL-encoded request bodies (if needed)
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const BASE_URL = `http://localhost:4000`;

app.post('/video', async (req, res) => {
    const {images,text,duration,videoWidth , videoHeight} = req.body;
    const fileName = `video-${Math.random()*1000}.mp4`
   const videoUrl = await createVideo(images,fileName,text,videoWidth,videoHeight,duration);

   return res.status(200).send({message: 'Video created successfully', videoUrl});
});

app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log("🚀 ~ file: server.js:25 ~ app.get ~ __dirname:", __dirname)
  res.sendFile(`${__dirname}/public/files/${filename}`);
});

app.listen(4000, () => {
    console.log('Server is up on port 4000');  
})