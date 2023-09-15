const { FFScene, FFText, FFVideo, FFAlbum, FFImage, FFCreator, FFAudio } = require("ffcreator");
const path = require("path");
const fs = require('fs');
const  { getAudioDurationInSeconds } = require('get-audio-duration');
//  async function createVideo(images,fileName,videoText,videoWidth = 512,videoHeight = 512,duration=6, audioUrls) {

//   return new Promise((resolve, reject) => {
//     const creator = new FFCreator({
//       width: videoWidth,
//       height: videoHeight,
//     });

//     const scene = new FFScene();
//     scene.setBgColor("#ffcc22");
//     scene.setDuration(duration);
//     scene.setTransition("GridFlip", 2);
//     creator.addChild(scene);

//     if(videoText){
//       const text = new FFText({ text: videoText, x: 0, y: 0 });
//       text.setColor("#ffffff");
//       text.setBackgroundColor("#000000");
//       text.addEffect("fadeIn", 1, 1);
//       scene.addChild(text);
//     }

//     const album = new FFAlbum({
//       list: images, // Picture collection for album
//       x:videoWidth/2,
//       y:videoHeight/2,
//       width: videoWidth,
//       height: videoHeight,
//     });

//     const totalImages = images.length;
//     const singleTransitionTime = 1.5
//     const singleImageDuration = (duration)/totalImages;
//     album.setTransition("zoomIn"); // Set album switching animation
//     album.setDuration(singleImageDuration); // Set the stay time of a single sheet
//     album.setTransTime(singleTransitionTime); // Set the duration of a single animation
//     scene.addChild(album);
//     creator.output(path.join(__dirname, `../public/files/${fileName}`));

//     creator.start();        // Start processing
//     creator.closeLog();     // Close log (including perf)

//     creator.on('start', () => {
//         console.log(`FFCreator start`);
//     });
//     creator.on('error', e => {
//         console.log(`FFCreator error: ${JSON.stringify(e)}`);
//     });
//     creator.on('progress', e => {
//         console.log("🚀 ~ file: video-generator.js:54 ~ returnnewPromise ~ e:", e)
//     });
//     creator.on('complete', e => {
//         resolve(`http://localhost:4000/files/${fileName}`)
//     });

//   })
//   }

// createVideo();
// // // console.log("🚀 ~ file: video-generator.js:44 ~ createVideo:")

async function createVideo(images,fileName,videoText,videoWidth=512,videoHeight=512,duration=6, audioUrls) {

  return new Promise(async (resolve, reject) => {
    const creator = new FFCreator({
      width: videoWidth,
      height: videoHeight,
    });

    await Promise.all(images.map(async (image, i) => new Promise((res, req) =>{
      
      // Assuming base64Data contains your Base64 audio data
        const base64Data = audioUrls[i];

        // Decode and save the audio to a file
        const audioBuffer = Buffer.from(base64Data.replace(/^data:application\/octet-stream;base64,/, ""), 'base64');
        fs.writeFileSync(path.join(__dirname,`./tempAudio${i}.mp3`), audioBuffer);

        // Get the duration of the audio file
        getAudioDurationInSeconds(path.join(__dirname,`./tempAudio${i}.mp3`)).then((duration) => {
          console.log(`Audio duration: ${duration} seconds`);
          const scene = new FFScene();
          scene.setBgColor("#000000");
          scene.setDuration(duration);
          scene.setTransition("GridFlip", 2);

          creator.addChild(scene);

          const sceneImage = new FFImage({ path: image,  x: videoWidth / 2, y: videoHeight / 2, width: videoWidth, height: videoHeight});
          sceneImage.addEffect('zoomIn', duration);
          scene.addChild(sceneImage);
          scene.addAudio(path.join(__dirname,`./tempAudio${i}.mp3`));
          res();
    
        });
      
    })))

   
    // const album = new FFAlbum({
    //   list: images, // Picture collection for album
    //   x:videoWidth/2,
    //   y:videoHeight/2,
    //   width: videoWidth,
    //   height: videoHeight,
    // });

    // const totalImages = images.length;
    // const singleTransitionTime = 1.5
    // const singleImageDuration = (duration)/totalImages;
    // album.setTransition("zoomIn"); // Set album switching animation
    // album.setDuration(singleImageDuration); // Set the stay time of a single sheet
    // album.setTransTime(singleTransitionTime); // Set the duration of a single animation
    // scene.addChild(album);
    creator.output(path.join(__dirname, `../public/files/${fileName}`));

    creator.start();        // Start processing
    creator.closeLog();     // Close log (including perf)

    creator.on('start', () => {
        console.log(`FFCreator start`);
    });
    creator.on('error', e => {
        console.log(`FFCreator error: ${JSON.stringify(e)}`);
    });
    creator.on('progress', e => {
        console.log("🚀 ~ file: video-generator.js:54 ~ returnnewPromise ~ e:", e)
    });
    creator.on('complete', e => {
        resolve(`http://localhost:4000/files/${fileName}`)
    });

  })
  }

module.exports  = {
    createVideo
}