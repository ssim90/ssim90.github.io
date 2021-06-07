var menuPlane;
var menuADT;

function InitializeUI(scene, canvas) {
    console.debug(canvas.width);
    var planeOpts = {
        height: 5.4762, 
        width: 7.3967,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
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

    if(menuPlane == null) {
        menuPlane = BABYLON.MeshBuilder.CreatePlane("menu", {width:planeOpts.width, height:planeOpts.height}, scene);
        menuPlane.position = new BABYLON.Vector3(0, 0, -.1);
    }

    menuADT = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(menuPlane);
}

function CreateStartUI (scene, videoPlane) {
    var UICanvas = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    panel = new BABYLON.GUI.StackPanel();
    panel.isVertical = false;

    function addButton (name, text, address, onClick) {
        //var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(name, text, address);
        var button = BABYLON.GUI.Button.CreateSimpleButton(name, text);
        const element = document.querySelector('.startbutton')
        const style = getComputedStyle(element)
        button.width = style.width;
        button.height = style.height;
        button.color = style.color;
        button.fontFaile = style.fontFamily;
        button.background = style.backgroundColor;
        button.cornerRadius = 10;
        button.thickness = 0;
        button.onPointerClickObservable.add(()=>{onClick();});
        panel.addControl(button);
        return button;
    }

    addButton("butt1", "Waterproof", "assets/button.png", 
    function () {
        videotype = videotypes.WATERPROOF;
        videoTextures = waterproofTextures;
        currentVideo = 0;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI(UICanvas);
        PlayVideo();
    });
    AddMargin("100px", "50px");
    addButton("butt2", "Non-Waterproof", "assets/button.png", 
    function () {
        videotype = videotypes.NONWATERPROOF;
        videoTextures = nonWaterproofTextures;
        currentVideo = 0;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI(UICanvas);
        PlayVideo();
    });
    
    UICanvas.addControl(panel);
}

function CreateVideoUI(scene, videoPlane) {
    panel = new BABYLON.GUI.StackPanel();
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.isVertical = false;
    panel.height = "100px";
    
    var alignmentStack = new BABYLON.GUI.StackPanel();
    alignmentStack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    alignmentStack.addControl(panel);

    menuPlane.gui = alignmentStack;
    menuADT.addControl(alignmentStack);

    if(stage != stages.START) {
        var back = addVideoButton("back", "assets/back.png", ()=>{
            if(currentVideo == 3) {
                --currentVideo;
                HideUI();
                stage = stages.SELECT;
                Create4ButtonSelectionUI(scene, videoPlane);
            } else {
                --currentVideo;
                videoPlane.material = SetVideoMaterial(scene);
                HideUI();
                PlayVideo();
            }
        })

        AddMargin("50px", "50px");
    }

    var replay = addVideoButton("replay", "assets/replay.png", ()=>{
        videoPlane.material = SetVideoMaterial(scene);
        HideUI();
        PlayVideo();
    })

    AddMargin("50px", "50px");

    var skip = addVideoButton("skip", "assets/skip.png", ()=>{
        ++currentVideo;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI();
        PlayVideo();
    })
}

function Create4ButtonSelectionUI(scene, videoPlane) {
    panel = new BABYLON.GUI.StackPanel();
    panel.isVertical = false;
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    
    let subVideoIndex = 0;

    var selectPanel = new BABYLON.GUI.StackPanel();
    selectPanel.isVertical = false;
    selectPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectPanel.top = "100px";

    function addButton(name, address, onClick) {
        var Button = BABYLON.GUI.Button.CreateImageOnlyButton(name, address);
        const element = document.querySelector('.videobutton')
        const style = getComputedStyle(element)
        Button.width = style.width;
        Button.height = style.height;
        Button.background = "white";
    
        Button.onPointerClickObservable.add(()=>{
            onClick();
        })
    
        selectPanel.addControl(Button);
        return Button;
    }

    function addMargin() {
        var margin = new BABYLON.GUI.Rectangle();
        margin.width = "50px";
        margin.height = "50px";
        margin.alpha = 0;
        selectPanel.addControl(margin);
    }

    function selectVideo() {
        if(videotype == videotypes.WATERPROOF) {
            subVideoTextures = subWaterproofTextures;
        } else {
            subVideoTextures = subNonWaterproofTextures;
        }

        if(currentVideo > 4) {
            subVideoIndex = 4;
        }
    }

    function hideUI() {
        menuADT.removeControl(selectPanel);
        HideUI();
    } 

    var button1 = addButton("btn1", "assets/1.png", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button2 = addButton("btn1", "assets/2.png", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 1);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button3 = addButton("btn1", "assets/3.png", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 2);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button4 = addButton("btn1", "assets/4.png", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 3);
        hideUI();
        PlayVideo();
    });

    var back = addVideoButton("back", "assets/back.png", ()=>{
        if(stage == stages.SELECT) {

        } else {
            --currentVideo;
        }
        videoPlane.material = SetVideoMaterial(scene);
        hideUI();
        PlayVideo();
    })
    if(stage === stages.SELECT) {
        var skip = addVideoButton("skip", "assets/skip.png", ()=>{
            if(CheckEndStage()) {
                stage = stages.END;
                hideUI();
                CreateEndUI(scene, videoPlane);
            } else {
                ++currentVideo;
                videoPlane.material = SetVideoMaterial(scene);
                hideUI();
                PlayVideo();
            }
        })
    }

    menuPlane.gui = panel;
    menuADT.addControl(selectPanel);
    menuADT.addControl(panel);
}

function CreateTwoButtonPopupUI(scene, videoPlane) {
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    panel = new BABYLON.GUI.StackPanel();
    panel.isVertical = false;
    //panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    
    function HidePopup() {
        advancedTexture.removeControl(textblock);
        advancedTexture.removeControl(yesButton);
        advancedTexture.removeControl(noButton);
    }

    var rectangle = new BABYLON.GUI.Rectangle("rect");
    rectangle.background = "#232736";
    rectangle.color = "yellow";
    rectangle.width = "500px";
    rectangle.height = "300px";
    panel.addControl(rectangle);

    var textblock = new BABYLON.GUI.TextBlock();
    textblock.text = "Fire proofing?";
    textblock.fontSize = 24;
    textblock.top = -100;
    textblock.color = "white";
    rectangle.addControl(textblock);

    var yesButton = BABYLON.GUI.Button.CreateSimpleButton("yesButton", "Yes");
    yesButton.width = "100px";
    yesButton.height = "40px";
    yesButton.color = "Black";
    yesButton.background = "white";
    yesButton.left = "-100px";
    yesButton.top = "30px";
    yesButton.onPointerClickObservable.add(()=>{
        ++currentVideo;
        videoPlane.material = SetVideoMaterial(scene);
        HidePopup();
        PlayVideo();
    })

    rectangle.addControl(yesButton); 

    var noButton = BABYLON.GUI.Button.CreateSimpleButton("noButton", "No");
    noButton.width = "100px";
    noButton.height = "40px";
    noButton.color = "Black";
    noButton.background = "white";
    noButton.left = "100px";
    noButton.top = "30px";
    noButton.onPointerClickObservable.add(()=>{
        ++currentVideo;
        ++currentVideo;
        videoPlane.material = SetVideoMaterial(scene);
        HidePopup();
        PlayVideo();
    })
    rectangle.addControl(noButton); 

    menuPlane.gui = panel;
    menuADT.addControl(panel);
}

function CreateEndUI(scene, videoPlane) {
    var UICanvas = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    panel = new BABYLON.GUI.StackPanel();
    panel.isVertical = false;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    addVideoButton("return", "assets/return.png", ()=>{
        HideUI(UICanvas);
        ReloadVideo();
        stage = stages.READY;
        currentVideo = 0;
        videoPlane.material = SetVideoMaterial(scene);
        CreateStartUI(scene, videoPlane);
    })

    UICanvas.addControl(panel);
}

function BackButtonAction(scene, videoPlane, UICanvas) {
    if(currentVideo == 3) {
        Create4ButtonSelectionUI(scene, videoPlane);
    } else {
        --currentVideo;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI(UICanvas);
        PlayVideo();
    }
}

function addVideoButton(name, address, onClick) {
    var Button = BABYLON.GUI.Button.CreateImageOnlyButton(name, address);
    const element = document.querySelector('.videobutton')
    const style = getComputedStyle(element)
    Button.width = style.width;
    Button.height = style.height;
    Button.background = "white";

    Button.onPointerClickObservable.add(()=>{
        onClick();
    })

    panel.addControl(Button);
    return Button;
}

function addBigImageButton(name, address, onClick) {

}

function HideUI(UICanvas = null) {
    panel.clearControls();
    if(UICanvas != null)
        UICanvas.removeControl(panel);
    if(menuADT != null)
    {
        menuADT.removeControl(panel);
    }
}

function AddMargin(width, height) {
    var margin = new BABYLON.GUI.Rectangle();
    margin.width = width;
    margin.height = height;
    margin.alpha = 0;
    panel.addControl(margin);
}