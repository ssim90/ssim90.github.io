var waterproof = ["assets/Step1.mp4","assets/Waterproof/Step2_W.mp4","assets/Waterproof/Step3_W.mp4",
                    "assets/Waterproof/Step5_W.mp4","assets/Waterproof/Step6_W.mp4","assets/Waterproof/Step7_W.mp4","assets/Waterproof/Step8_W.mp4"]
var subWaterproof = ["assets/Waterproof/Step4-1_W.mp4","assets/Waterproof/Step4-2_W.mp4","assets/Waterproof/Step4-3_W.mp4","assets/Waterproof/Step4-4_W.mp4",
                     "assets/Waterproof/Step9-1_W.mp4","assets/Waterproof/Step9-2_W.mp4","assets/Waterproof/Step9-3_W.mp4","assets/Waterproof/Step9-4_W.mp4"]
var nonWaterproof = ["assets/Step1.mp4","assets/Non-Waterproof/Step2_NW.mp4","assets/Non-Waterproof/Step3_NW.mp4",
                     "assets/Non-Waterproof/Step5_NW.mp4","assets/Non-Waterproof/Step5-5_NW.mp4","assets/Non-Waterproof/Step6_NW.mp4"]
var subNonWaterproof = ["assets/Non-Waterproof/Step4-1_NW.mp4","assets/Non-Waterproof/Step4-2_NW.mp4","assets/Non-Waterproof/Step4-3_NW.mp4","assets/Non-Waterproof/Step4-4_NW.mp4",
                        "assets/Non-Waterproof/Step7-1_NW.mp4","assets/Non-Waterproof/Step7-2_NW.mp4","assets/Non-Waterproof/Step7-3_NW.mp4","assets/Non-Waterproof/Step7-4_NW.mp4"]
var waterproofTextures = []
var nonWaterproofTextures = []
var subWaterproofTextures = []
var subNonWaterproofTextures = []
var videoTextures = []
var subVideoTextures = []
var currentVideo;
const videotypes = {
    WATERPROOF: "waterproof",
    NONWATERPROOF: "non-waterproof",
}

let videotype;

var VideoTexture;
var playedSubVideo;

function SetUpVideos(scene) {
    waterproof.forEach(function(element) {
        var texture = new BABYLON.VideoTexture("vidtex", element, scene);
        texture.video.autoplay = false;
        texture.video.preload = 'auto';
        waterproofTextures.push(texture);
    })

    nonWaterproof.forEach(function(element) {
        var texture = new BABYLON.VideoTexture("vidtext2", element, scene);
        texture.video.autoplay = false;
        nonWaterproofTextures.push(texture);
    })

    subWaterproof.forEach(function(element) {
        var texture = new BABYLON.VideoTexture("vidtext3", element, scene);
        texture.video.autoplay = false;
        subWaterproofTextures.push(texture);
    })

    subNonWaterproof.forEach(function(element) {
        var texture = new BABYLON.VideoTexture("vidtex4", element, scene);
        texture.video.autoplay = false;
        subNonWaterproofTextures.push(texture);
    })
    playedSubVideo = false;
}

function SetVideoMaterial(scene) {
    var VideoMaterial = new BABYLON.StandardMaterial("m", scene);
    VideoTexture = videoTextures[currentVideo];
    VideoMaterial.diffuseTexture = VideoTexture;
    VideoMaterial.roughness = 1;
    VideoMaterial.emissiveColor = new BABYLON.Color3.White();
    VideoTexture.video.pause();
    playedSubVideo = false;

    return VideoMaterial;
}

function SetSubVideoMaterial(scene, select) {
    var VideoMaterial = new BABYLON.StandardMaterial("m", scene);
    VideoTexture = subVideoTextures[select];
    VideoMaterial.diffuseTexture = VideoTexture;
    VideoMaterial.roughness = 1;
    VideoMaterial.emissiveColor = new BABYLON.Color3.White();
    VideoTexture.video.pause();
    playedSubVideo = true;

    return VideoMaterial;
}

function PlayVideo() {
    VideoTexture.video.loop = false;
    VideoTexture.video.play();

    SetUpStage();
}

function ReloadVideo() {
    videoTextures.forEach(function(element) {
        element.video.currentTime = 0;
    })
}