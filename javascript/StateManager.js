const stages = {
    READY: "ready",
    START: "start",
    NORMAL: "normal",
    SELECT: "select",
    END: "end"
}

let stage;

function CheckNextStepForWaterproof(scene, videoPlane) {
    if(VideoTexture != null) {
        if(VideoTexture.video.paused) {
            VideoTexture = null;
            if(currentVideo == 2 || currentVideo ==  6) {

                if(stage == stages.END) {
                    CreateEndUI(scene, videoPlane);
                } else {
                    Create4ButtonSelectionUI(scene, videoPlane);
                }

            } else {
                if(stage != stages.READY)
                    CreateVideoUI(scene, videoPlane);
            }
        } else {

        }
    }
}

function SetUpStage() {
    if(currentVideo == 0) {
        playedSubVideo = false;
        stage = stages.START;
    } else if(currentVideo == 2 || currentVideo == 5 || currentVideo == 6) {
        if(playedSubVideo) {
            stage = stages.SELECT;
        } else {
            stage = stages.NORMAL;
        }
    } else {
        stage = stages.NORMAL;
    }
}

function CheckEndStage() {
    if((videotype == videotypes.WATERPROOF && currentVideo == 6) || (videotype == videotypes.NONWATERPROOF && currentVideo == 5))
            return true;

    return false;
}
function CheckNextStepForNonWaterproof(scene, videoPlane) {
    if(VideoTexture != null) {
        if(VideoTexture.video.paused) {
            VideoTexture = null;
            if(currentVideo == 2 || currentVideo ==  5) {
                if(stage == stages.END) {
                    CreateEndUI(scene, videoPlane);
                } else if (currentVideo == 2) {
                    Create4ButtonSelectionUI(scene, videoPlane);
                } else {
                    Create4ButtonSelectionUI2(scene,videoPlane);
                }

            } else if(currentVideo == 3) {
                CreateTwoButtonPopupUI(scene, videoPlane);
            } else {
                if(stage != stages.READY)
                    CreateVideoUI(scene, videoPlane);
            }
        }
    }    
}