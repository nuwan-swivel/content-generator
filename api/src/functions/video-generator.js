const { FFScene, FFText, FFVideo, FFAlbum, FFImage, FFCreator } = require("ffcreator");
const path = require("path");
 function createVideo() {
    const creator = new FFCreator({
      width: 800,
      height: 450,
    });
    // const image = new FFImage({ path: path.join(__dirname, "../") });;
    // const image1 = new FFImage({ path: path.join(__dirname, "../") });;
    // console.log("🚀 ~ file: video-generator.js:7 ~ createVideo ~ image:", image)

    const scene = new FFScene();
    scene.setBgColor("#ffcc22");
    scene.setDuration(6);
    scene.setTransition("GridFlip", 2);
    creator.addChild(scene);

  
    // scene.addChild(image);
    // scene.addChild(image1);

    const text = new FFText({ text: "hello 你好", x: 400, y: 300 });
    text.setColor("#ffffff");
    text.setBackgroundColor("#000000");
    text.addEffect("fadeIn", 1, 1);
    scene.addChild(text);

    const album = new FFAlbum({
      list: [
        "https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png",
        "https://plus.unsplash.com/premium_photo-1669248390922-1a7999ec82a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      ], // Picture collection for album
      x: 0,
      y: 0,
      width: 800,
      height: 450,
    });
    album.setTransition("zoomIn"); // Set album switching animation
    album.setDuration(2.5); // Set the stay time of a single sheet
    album.setTransTime(1.5); // Set the duration of a single animation
    scene.addChild(album);

    creator.output(path.join(__dirname, "./example3.mp4"));

    creator.start();        // Start processing
creator.closeLog();     // Close log (including perf)

creator.on('start', () => {
    console.log(`FFCreator start`);
});
creator.on('error', e => {
    console.log(`FFCreator error: ${JSON.stringify(e)}`);
});
creator.on('progress', e => {
    // console.log(colors.yellow(`FFCreator progress: ${e.state} ${(e.percent * 100) >> 0}%`));
    console.log("🚀 ~ file: video-generator.js:56 ~ createVideo ~ progress:", e)
});
creator.on('complete', e => {
    // console.log(colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `));
    console.log("🚀 ~ file: video-generator.js:60 ~ createVideo ~ e:", e)
});
    console.log("🚀 ~ file: video-generator.js:43 ~ createVideo ~ :", path.join(__dirname, "./example.mp4"))
  }

// createVideo();
// console.log("🚀 ~ file: video-generator.js:44 ~ createVideo:")

module.exports  = {
    createVideo
}