// get our canvas
const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas, true);

var isPortrait;

var videoPlane;
var planeOpts;

const createScene =  () => {
    isPortrait = true;
    // Set up basic environment ( scene, camera)
    const scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("arcR", -Math.PI/2, Math.PI/2, 15, BABYLON.Vector3.Zero(), scene);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);

    /////////////////////// Set up size//////////////////////////////
    // Portrait
    planeOpts = {
        height: 5.4762, 
        width: 7.3967,
    };
    // PC
    if(canvas.width >= 1000)
    {
        planeOpts.width = canvas.width * 0.001 * 7.3967;
        planeOpts.height = canvas.height * 0.001 * 10;
        isPortrait = false;
    }

    // Landscape
    if(canvas.width > 500 && canvas.width < 1000)
    {
        planeOpts.width = 14;
        planeOpts.height = 10;
    }

    /////////////////////////////////////////////////////////////////
    videoPlane = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);

    stage = stages.READY;

    SetUpVideos(scene);
    videoTextures = waterproofTextures;
    currentVideo = 0;
    videoPlane.material = SetVideoMaterial(scene);
    InitializeUI(scene, canvas);
    CreateStartUI(scene, videoPlane);

    return scene;
}

//create our scene
const scene = createScene();
engine.runRenderLoop(()=>{
    scene.render();
    if(videotype == videotypes.WATERPROOF) {
        CheckNextStepForWaterproof(scene, videoPlane);
    } else {
        CheckNextStepForNonWaterproof(scene, videoPlane);
    }
})