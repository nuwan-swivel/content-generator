const express = require('express');
const { createVideo } = require('./functions/video-generator');
const { upload } = require('./functions/file-save.js');
const cors = require('cors');
const app = express();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');

// Middleware to parse JSON data
app.use(express.static('public'));
// Use the cors middleware to allow requests from all origins
app.use(cors());


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
const BASE_URL = `http://localhost:4000`;

app.post('/video', async (req, res) => {
    const {images,text,duration,videoWidth , videoHeight} = req.body;
    const fileName = `video-${Math.random()*1000}.mp4`
   const videoUrl = await createVideo(images,fileName,text,videoWidth,videoHeight,duration);

   return res.status(200).send({message: 'Video created successfully', videoUrl});
});

app.post('/save-image', async (req, res) => {
  const type = req.body.type;
  if(type==='base64'){
    const base64Data = req.body.image.replace(/^data:image\/png;base64,/, ""); // Get the base64-encoded image data from the request body
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `image-${uniqueSuffix}.png`;
  
    // Decode the base64 data and save it to a file
    fs.writeFile(`src/public/uploads/${fileName}`, base64Data, 'base64', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving the image.');
      }
  
      res.send({message: 'image created successfully', imageName:`${BASE_URL}/files/${fileName}`});
    });
  }else{
      try {
    const image = req.body.image; // Get the image URL from the request body
    const response = await axios.get(image, { responseType: 'arraybuffer' });

    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `image-${uniqueSuffix}.jpg`;

    // Save the image to a local directory
    fs.writeFileSync(`src/public/uploads/${fileName}`, response.data);

    // Respond with the saved filename
    res.send({message: 'image created successfully', imageName:`${BASE_URL}/files/${fileName}`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image from URL' });
  }
  }
});


app.post('/upload/image', upload.single('image'), (req, res) => {
  // The uploaded file can be accessed as req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

   const uploadedFileName = req.file.filename;

    // Return the new file name as a response
    return res.status(200).send({massage:`File uploaded as: ${uploadedFileName}` , imageUrl:`${BASE_URL}/files/${uploadedFileName}`});
});

app.post('/upload/image', upload.single('image'), (req, res) => {
  // The uploaded file can be accessed as req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

   const uploadedFileName = req.file.filename;

    // Return the new file name as a response
    return res.status(200).send({massage:`File uploaded as: ${uploadedFileName}` , imageUrl:`${BASE_URL}/files/${uploadedFileName}`});
});

app.get('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log("🚀 ~ file: server.js:25 ~ app.get ~ __dirname:", __dirname)
  res.sendFile(`${__dirname}/public/uploads/${filename}`);
});

app.listen(4000, () => {
    console.log('Server is up on port 4000');  
})