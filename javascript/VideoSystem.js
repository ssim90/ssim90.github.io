var waterproof = ["assets/Step1_text.mp4","assets/Waterproof/Waterproof_Step2_text.mp4","assets/Waterproof/Waterproof_Step3_text.mp4",
                    "assets/Waterproof/Placeholder_Step5-Waterproof.mp4","assets/Waterproof/Placeholder_Step6-Waterproof.mp4","assets/Waterproof/Placeholder_Step7-Waterproof.mp4",
                    "assets/Waterproof/Placeholder_Step8-Waterproof.mp4"]
var subWaterproof = ["assets/Waterproof/Waterproof_Step4.1_text.mp4","assets/Waterproof/Waterproof_Step4.2_text.mp4","assets/Waterproof/Waterproof_Step4.3_text.mp4","assets/Waterproof/Waterproof_Step4.4_text.mp4",
                     "assets/Waterproof/Placeholder_Step9.1-Waterproof.mp4","assets/Waterproof/Placeholder_Step9.2-Waterproof.mp4","assets/Waterproof/Placeholder_Step9.3-Waterproof.mp4","assets/Waterproof/Placeholder_Step9.4-Waterproof.mp4"]
var nonWaterproof = ["assets/Step1_text.mp4","assets/Non-Waterproof/Non-Waterproof_Step2_text.mp4","assets/Non-Waterproof/Non-Waterproof_Step3_text.mp4",
                     "assets/Non-Waterproof/Placeholder_Step5-Non-Waterproof.mp4","assets/Non-Waterproof/Placeholder_Step5.5-Non-Waterproof.mp4","assets/Non-Waterproof/Placeholder_Step6-Non-Waterproof.mp4"]
var subNonWaterproof = ["assets/Non-Waterproof/Non-Waterproof_Step4.1_text.mp4","assets/Non-Waterproof/Non-Waterproof_Step4.2_text.mp4","assets/Non-Waterproof/Non-Waterproof_Step4.3_text.mp4","assets/Non-Waterproof/Non-Waterproof_Step4.4_text.mp4",
                        "assets/Non-Waterproof/Placeholder_Step7.1-Non-Waterproof.mp4","assets/Non-Waterproof/Placeholder_Step7.2-Non-Waterproof.mp4","assets/Non-Waterproof/Placeholder_Step7.3-Non-Waterproof.mp4","assets/Non-Waterproof/Placeholder_Step7.4-Non-Waterproof.mp4"]
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