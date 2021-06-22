var menuPlane;
var menuADT;

function InitializeUI(scene, canvas) {
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

    AddBasicButton("butt1", "Waterproof", panel,
    function () {
        videotype = videotypes.WATERPROOF;
        videoTextures = waterproofTextures;
        currentVideo = 0;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI(UICanvas);
        PlayVideo();
    });
    AddMargin("100px", "50px");
    AddBasicButton("butt2", "Non-Waterproof", panel,
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
        var back = AddBasicButtonOnPlane("back", "Previous", panel,()=>{
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

    var replay = AddBasicButtonOnPlane("replay", "Replay", panel, ()=>{
        videoPlane.material = SetVideoMaterial(scene);
        HideUI();
        PlayVideo();
    })

    AddMargin("50px", "50px");

    var skip = AddBasicButtonOnPlane("skip", "Next", panel, ()=>{
        ++currentVideo;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI();
        PlayVideo();
    })
}

function Create4ButtonSelectionUI(scene, videoPlane) {
    panel = new BABYLON.GUI.StackPanel();
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.isVertical = false;
    panel.height = "100px";
    
    var alignmentStack = new BABYLON.GUI.StackPanel();
    alignmentStack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    alignmentStack.addControl(panel);

    let subVideoIndex = 0;

    var selectPanel = new BABYLON.GUI.StackPanel();
    selectPanel.isVertical = false;
    selectPanel.top = "100px";

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

    var button1 = AddBasicButtonOnPlane("btn1", "Multichannel", selectPanel, ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button2 = AddBasicButtonOnPlane("btn2", "Ducts", selectPanel, ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 1);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button3 = AddBasicButtonOnPlane("btn3", "ProTrough", selectPanel, ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 2);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button4 = AddBasicButtonOnPlane("btn4", "Other", selectPanel, ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 3);
        hideUI();
        PlayVideo();
    });

    var back = AddBasicButtonOnPlane("back", "Previous", panel, ()=>{
        if(stage == stages.SELECT) {

        } else {
            --currentVideo;
        }
        videoPlane.material = SetVideoMaterial(scene);
        hideUI();
        PlayVideo();
    })

    if(stage === stages.SELECT) {
        AddMargin("50px", "50px");

        var skip = AddBasicButtonOnPlane("skip", "NEXT", panel, ()=>{
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

    menuPlane.gui = alignmentStack;
    menuADT.addControl(selectPanel);
    menuADT.addControl(alignmentStack);
}

function CreateTwoButtonPopupUI(scene, videoPlane) {
    panel = new BABYLON.GUI.StackPanel();
    panel.isVertical = false;

    var rectangle = new BABYLON.GUI.Rectangle("rect");
    rectangle.background = "#232736";
    rectangle.color = "#232736";
    rectangle.width = "550px";
    rectangle.height = "400px";
    panel.addControl(rectangle);

    var textblock = new BABYLON.GUI.TextBlock();
    textblock.text = "Do you have a Fire proofing?";
    textblock.fontSize = 24;
    textblock.top = -50;
    textblock.color = "white";
    rectangle.addControl(textblock);

    var yesButton = addSelectionButton("yesButton", "YES", "-100px", () => {
        ++currentVideo;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI();
        PlayVideo();
    });

    rectangle.addControl(yesButton); 

    var noButton = addSelectionButton("noButton", "NO", "100px", () => {
        ++currentVideo;
        ++currentVideo;
        videoPlane.material = SetVideoMaterial(scene);
        HideUI();
        PlayVideo();
    });

    rectangle.addControl(noButton); 

    menuPlane.gui = panel;
    menuADT.addControl(panel);
}

function Create4ButtonSelectionUI2(scene, videoPlane) {
    panel = new BABYLON.GUI.StackPanel();
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.isVertical = false;
    panel.height = "100px";
    
    var alignmentStack = new BABYLON.GUI.StackPanel();
    alignmentStack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    alignmentStack.addControl(panel);

    let subVideoIndex = 0;

    var selectPanel = new BABYLON.GUI.StackPanel();
    selectPanel.isVertical = false;
    selectPanel.top = "-50px";

    function addButton(name, address, onClick) {
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "");
        button.width = "250px";
        button.height = "700px";
        button.background = "white";
        button.cornerRadius = 10;
        button.onPointerClickObservable.add(()=>{
            onClick();
        })
        selectPanel.addControl(button);
 
        var Button = BABYLON.GUI.Button.CreateImageOnlyButton(name, address);
        const element = document.querySelector('.picturebutton')
        const style = getComputedStyle(element)
        Button.width =  style.width;
        Button.height = style.height;
        Button.cornerRadius = 10;
        Button.background = "white";
        Button.top = "-40px";
    
        Button.onPointerClickObservable.add(()=>{
            onClick();
        })
    
        button.addControl(Button);
        return Button;
    }

    function addMargin() {
        var margin = new BABYLON.GUI.Rectangle();
        margin.width = "5px";
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
        menuADT.removeControl(text1);
        HideUI();
    } 

    var button1 = addButton("btn1", "assets/1.jpg", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button2 = addButton("btn1", "assets/2.jpg", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 1);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button3 = addButton("btn1", "assets/3.jpg", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 2);
        hideUI();
        PlayVideo();
    });
    addMargin();
    var button4 = addButton("btn1", "assets/4.jpg", ()=>{
        selectVideo();
        videoPlane.material = SetSubVideoMaterial(scene, subVideoIndex + 3);
        hideUI();
        PlayVideo();
    });

    var back = AddBasicButtonOnPlane("back", "Previous", panel, ()=>{
        if(stage == stages.SELECT) {

        } else {
            --currentVideo;
        }
        videoPlane.material = SetVideoMaterial(scene);
        hideUI();
        PlayVideo();
    })

    if(stage === stages.SELECT) {
        AddMargin("50px", "50px");

        var skip = AddBasicButtonOnPlane("skip", "Next", panel, ()=>{
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

    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = "Installation?";
    text1.color = "white";
    text1.fontFamily = "Raleway";
    text1.fontSize = 50;
    text1.top = "-450px";
    text1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    menuPlane.gui = alignmentStack;
    menuADT.addControl(selectPanel);
    menuADT.addControl(alignmentStack);
    menuADT.addControl(text1);
}

function AddBasicButton (name, text, panel, onClick) {
    var button = BABYLON.GUI.Button.CreateSimpleButton(name, text);
    const element = document.querySelector('.button')
    const style = getComputedStyle(element)
    button.width = style.width;
    button.height = style.height;
    button.color = style.color;
    button.fontFaile = style.fontFamily;
    button.background = style.backgroundColor;
    button.margin = style.margin;
    button.padding = style.padding;
    button.cornerRadius = 3;
    button.thickness = 0;
    button.onPointerClickObservable.add(()=>{onClick();});
    panel.addControl(button);
    return button;
}

function AddBasicButtonOnPlane(name, text, panel, onClick) {
    var button = BABYLON.GUI.Button.CreateSimpleButton(name, text);
    const element = document.querySelector('.button')
    const style = getComputedStyle(element)
    button.width = "160px";
    button.height = "70px";
    button.color = style.color;
    button.fontSize = "23";
    button.fontFaile = style.fontFamily;
    button.background = style.backgroundColor;
    button.margin = style.margin;
    button.padding = style.padding;
    button.cornerRadius = 5;
    button.thickness = 0;
    button.onPointerClickObservable.add(()=>{onClick();});
    panel.addControl(button);
    return button;
}

function CreateEndUI(scene, videoPlane) {
    var UICanvas = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    panel = new BABYLON.GUI.StackPanel();
    panel.isVertical = false;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    AddBasicButton("return", "Back", panel, ()=>{
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

function addSelectionButton(name, label, left, onClick) {
    const element = document.querySelector('.button');
    const style = getComputedStyle(element);

    var button = BABYLON.GUI.Button.CreateSimpleButton(name, label);
    button.width = style.width;
    button.height = style.height;
    button.color = style.color;
    button.background = style.backgroundColor;
    button.fontFamily = style.fontFamily;
    button.margin = style.margin;
    button.padding = style.padding;
    button.cornerRadius = 3;
    button.left = left;
    button.top = "80px";
    button.onPointerClickObservable.add(()=> {
        onClick();
    })

    return button;
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