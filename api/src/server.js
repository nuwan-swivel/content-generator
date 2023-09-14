const express = require('express');
const { createVideo } = require('./functions/video-generator');

const app = express();


app.get('/video', (req, res) => {
    const {images} = req.body;
   const result = createVideo();

   return res.status(200).send();
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');  
})