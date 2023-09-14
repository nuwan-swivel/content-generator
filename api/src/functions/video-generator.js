const { FFScene, FFText, FFVideo, FFAlbum, FFImage, FFCreator } = require("ffcreator");
const path = require("path");
 async function createVideo(images,fileName,videoText,videoWidth,videoHeight,duration=6) {

  return new Promise((resolve, reject) => {
    const creator = new FFCreator({
      width: videoWidth,
      height: videoHeight,
    });

    const scene = new FFScene();
    scene.setBgColor("#ffcc22");
    scene.setDuration(duration);
    scene.setTransition("GridFlip", 2);
    creator.addChild(scene);

    if(videoText){
      const text = new FFText({ text: videoText, x: 0, y: 0 });
      text.setColor("#ffffff");
      text.setBackgroundColor("#000000");
      text.addEffect("fadeIn", 1, 1);
      scene.addChild(text);
    }

    const album = new FFAlbum({
      list: images, // Picture collection for album
      x:videoWidth/2,
      y:videoHeight/2,
      width: videoWidth,
      height: videoHeight,
    });

    const totalImages = images.length;
    const singleTransitionTime = 1.5
    const singleImageDuration = (duration)/totalImages;
    album.setTransition("zoomIn"); // Set album switching animation
    album.setDuration(singleImageDuration); // Set the stay time of a single sheet
    album.setTransTime(singleTransitionTime); // Set the duration of a single animation
    scene.addChild(album);
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

// createVideo();
// // // console.log("🚀 ~ file: video-generator.js:44 ~ createVideo:")

module.exports  = {
    createVideo
}