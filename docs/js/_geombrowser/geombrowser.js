function resetSelection(mode) {
    if (mode == 0) {
        polygons.selectionpolygon = [];
        polygons.crackpolygons = [];
        polygons.edgepolygons = [];
        polygons.overlappolygons = [];
        polygons.kinkpolygons = [];
        polygons.unnamed6polygons = [];
        polygons.unnamed7polygons = [];
        polygons.unnamed8polygons = [];
        polygons.unnamed9polygons = [];
        polygons.unnamed10polygons = [];

        presenter._selectionPoints = [];

        selectionmodus = 1;
        document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'basic';

    } else if (mode == 1) {
        polygons.selectionpolygon = [];
        presenter._selectionPoints = [];
    } else if (mode == 2) {
        polygons.crackpolygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 3) {
        polygons.edgepolygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 4) {
        polygons.overlappolygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 5) {
        polygons.kinkpolygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 6) {
        polygons.unnamed6polygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 7) {
        polygons.unnamed7polygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 8) {
        polygons.unnamed8polygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 9) {
        polygons.unnamed9polygons = [];
        presenter._selectionPoints = [];
    } else if (mode == 10) {
        polygons.unnamed10polygons = [];
        presenter._selectionPoints = [];
    }
    //console.log(polygons);
    presenter.repaint();
}

function setup3dhop(model_url) {
    sceneoptions = {
        meshes: {
            //"Gargoyle" : { url: "models/multires/gargo.nxz" },
            //"Cube" : { url: "models/singleres/cube.ply" },
            "O-40839_c": {
                url: model_url
            },
            //"part" : {url: "models/singleres/O-39449_part.ply"}
        },
        modelInstances: {
            "Gargo": {
                mesh: "Gargoyle"

            },
            "Base": {
                mesh: "Cube",
                transform: {
                    translation: [0.0, 0.0, 0.0],
                    scale: [0, 0, 0]
                },
            },
            "Schale": {
                //mesh: "part"
                mesh: "O-40839_c"
            }
        },
        trackball: {
            type: TurntablePanTrackball,
            trackOptions: {
                startDistance: 1.3,
                startPhi: 0,
                startTheta: 0,
                startPanX: 0.0,
                startPanY: -0.12,
                startPanZ: 0.0,
                minMaxDist: [0.2, 2.5],
                minMaxPhi: [-1800, 1800],
                minMaxTheta: [-1800, 1800]
            }
        },
        space: {
            centerMode: "scene",
            radiusMode: "scene"
        },
        config: {
            pickedpointColor: [1.0, 0.0, 1.0],
            measurementColor: [0.5, 1.0, 0.5],
            selectionColor: [0.235, 0.940, 0.681],
            selectionColor: selectColor,
            showClippingPlanes: true,
            showClippingBorder: false,
            clippingBorderSize: 0.5,
            clippingBorderColor: [0.0, 1.0, 1.0],
            pointSize: 1.0,
            pointSizeMinMax: [1.0, 5.0],
        }
    }


    //presenter = new Presenter("draw-canvas");
    presenter = new Presenter_extended("draw-canvas");
    presenter.setScene(sceneoptions);
    presenter.setCameraOrthographic()

    presenter._onEndMeasurement = onEndMeasure;
}

let loadSmallFeatureInfoBox = () => {
    console.log("loadSmallFeatureInfoBox", THISFEATURE);
    $.ajax({
        type: "GET",
        url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log(data);
            for (item in data) {
                if (data[item].f === THISFEATURE) {
                    console.log(data[item].label, data[item].typelabel);
                    $("#featurebox-label").text(data[item].label);
                    $("#featurebox-type").text(data[item].typelabel);
                    let acs = "";
                    if (data[item].observations.length > 0) {
                        acs = "<hr />";
                    }
                    for (item2 in data[item].observations) {
                        if (data[item].observations[item2].observationtype === "ars:Statement") {
                            acs = acs + "Statement: " + data[item].observations[item2].observationlabel + "<br>";
                        } else {
                            acs = acs + data[item].observations[item2].observationtypelabel + "<br>";
                        }
                    }
                    $("#featurebox-ac").html(acs);
                }
            }
            $('#feature-box').fadeIn().css("visibility", "visible");
        }
    });
};

let showAllFeatures = true;

function actionsToolbar(action) {
    console.log(action);
    if (action == 'help' || action == 'help_on') helpSwitch();
    else if (action == 'home') {
        presenter.resetTrackball();
        isZAxisrotation();
    } else if (action == 'zoomin') presenter.zoomIn();
    else if (action == 'zoomout') presenter.zoomOut();
    else if (action == 'view') {
        viewpanelSwitch(true);
        if (viewclick == false) {
            $("#rotate-box").addClass("rotate-box2");
            viewclick = true;
            console.log("1");
        } else {
            $("#rotate-box").removeClass("rotate-box2");
            viewclick = false;
            console.log("2");
        }
        //transformation(-90, true);
        //console.log(presenter._scene.meshes["O-40839_c"].transform.matrix);
    } else if (action == 'view_on') {
        viewpanelSwitch(false);
        if (viewclick == false) {
            $("#rotate-box").addClass("rotate-box2");
            viewclick = true;
            console.log("1");
        } else {
            $("#rotate-box").removeClass("rotate-box2");
            viewclick = false;
            console.log("2");
        }
    } else if (action == 'light' || action == 'light_on') {
        presenter.enableLightTrackball(!presenter.isLightTrackballEnabled());
        lightSwitch();
    } else if (action == 'measure' || action == 'measure_on') {
        if (switcher(action)) {
            if (action == 'measure') {

                presenter.enableMeasurementTool(!presenter.isMeasurementToolEnabled());
                measureSwitch(true);

            } else {

                presenter.enableMeasurementTool(!presenter.isMeasurementToolEnabled());
                measureSwitch(false);
            }
        }

    } else if (action == 'full' || action == 'full_on') fullscreenSwitch();
    else if (action == 'color') {
        colorpanelSwitch(true);
    } else if (action == 'color_on') {
        colorpanelSwitch(false);
    } else if (action == 'select' || action == 'select_on') {
        if (switcher(action)) {
            if (!drawgeom) {

                //isZAxisrotation();
                deselection();
                var button = document.getElementById("btn-group-deselection");
                button.src ="css/vendor/skins/dark/deselctgroups_inactive.png";

                drawgeom = true;
                presenter.enableSelectionTool(true);
                $('#btn-confirm-selection').show();
                $('#btn-undo-selection').show();
                $('#btn-reset-selection').show();
                $('#btn-modus').show();
                $('#btn-modus-confirm').show();
                $('#btn-modus-reset').show();
                selectionmodus = 1;


            } else {
                drawgeom = false;
                presenter.enableSelectionTool(false);
                $('#btn-confirm-selection').hide();
                $('#btn-undo-selection').hide();
                $('#btn-reset-selection').hide();
                $('#btn-modus').hide();
                $('#btn-modus-confirm').hide();
                $('#btn-modus-reset').hide();
                resetSelection(0);
                selectionmodus = 1;
            }
            selectionSwitch();
            document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'basic';
        }
    }
    // Draw polygon of each feature from a scene
    else if (action == 'btn-show-all-feature') {
        let check = true;
        if (editorgeom) {
            check = false;
            showNotification('error', 'Attention!', 'Geomeditor is active!');
        }
        if (pickFeature) {
            if (THISFEATURE == "") {
                check = false;
                showNotification('info', 'Info!', 'Select a feature first!');
            }
        }
        if (check)
            visual_ALL();
        else {


        }
    }
    // Draw polygon form feature
    else if (action == "btn-test-polygoneditor") {
        if (switcher(action)) {
            if (!editorgeom) {

                deselection();
                var button = document.getElementById("btn-group-deselection");
                button.src ="css/vendor/skins/dark/deselctgroups_inactive.png";
                //isZAxisrotation();
                $("#btn-test-polygoneditor").attr("src", "css/vendor/skins/dark/polygon_editor_on.png");
                //showNotification('info', 'Info!', 'Select a polygon')
                API.getFeaturesByObjectId("ars3do:" + THISOBJ, displayFeaturebyObjekt);
                visualAll = true;
                visual_ALL_reload();
                editorgeom = true;
                presenter.enableSelectionTool(true)
                //$('#btn-confirm-selection').show();
                //$('#btn-undo-selection').show();
                //$('#btn-reset-selection').show();
                //$('#btn-modus').show();
                //$('#btn-modus-confirm').show();
                //$('#btn-modus-reset').show();
                selectionmodus = 1;
                document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'basic';



            } else {
                $("#btn-test-polygoneditor").attr("src", "css/vendor/skins/dark/polygon_editor.png");
                editorgeom = false;
                //visualAll = false;
                presenter.enableSelectionTool(false);
                $('#btn-confirm-selection').hide();
                $('#btn-undo-selection').hide();
                $('#btn-reset-selection').hide();
                $('#btn-modus').hide();
                $('#btn-modus-confirm').hide();
                $('#btn-modus-reset').hide();
                resetSelection(0);
                selectionmodus = 1;
                pointISTID = 9999999;
                visual_ALL();

            }
        }

    } else if (action == "btn-select-feature_on") {

        infoswitch(false);


    } else if (action == "btn-select-feature") {
        if (switcher(action)) {
            //isZAxisrotation();
            deselection();
            var button = document.getElementById("btn-group-deselection");
            button.src ="css/vendor/skins/dark/deselctgroups_inactive.png";
            infoswitch(true);
        }

    } else if (action == "btn-show-transparent-line") {
        if (!transparent_line) {
            transparent_line = true;
            presenter.repaint();
            $("#btn-show-transparent-line").attr("src", "css/vendor/skins/dark/polygon_transparent_on.png");
        } else {
            transparent_line = false;
            presenter.repaint();
            $("#btn-show-transparent-line").attr("src", "css/vendor/skins/dark/polygon_transparent.png");
        }
    } else if (action == "btn-rotate-object") {
        console.log(presenter.isMeasurementToolEnabled());
        //if (switcher(action)) {
        if (!rotatemodeon) {

            rotatemodeon = true;
            $("#btn-rotate-object").attr("src", "css/vendor/skins/dark/rotate_on.png");
            $('#rotate-box').fadeIn().css("visibility", "visible");
        } else {
            rotatemodeon = false;
            $("#btn-rotate-object").attr("src", "css/vendor/skins/dark/rotate.png");
            $('#rotate-box').fadeOut().css("visibility", "hidden");
        }
        //}
    }



}
$('#btn-rotate-box-0').on('click', (event) => {
    transformation(0, true);

});

$('#btn-rotate-box-180').on('click', (event) => {
    transformation(180, true);

});

$('#btn-rotate-box-cw90').on('click', (event) => {
    transformation(-90, true);
});

$('#btn-rotate-box-ccw90').on('click', (event) => {
    transformation(90, true);
});

$('#btn-group-deselection').on('click', () => {

    if (visualMultipleFeature)
    {
        var button = document.getElementById("btn-group-deselection");
        button.src ="css/vendor/skins/dark/deselctgroups_inactive.png";
        infoswitch(false);
    }
})


function switcher(b_action) {

    tmp = true;

    if (drawgeom) {
        if (b_action != 'select' && b_action != 'select_on') {
            tmp = false;
            showNotification('error', 'Attention!', 'Draw polygons is on');
        }

    } else if (editorgeom) {
        if (b_action != "btn-test-polygoneditor") {
            tmp = false;
            showNotification('error', 'Attention!', 'Polygoneditor is on!');


        }

    } else if (pickFeature && !editorgeom) {
        if (b_action != "btn-select-feature") {
            tmp = false;
            showNotification('error', 'Attention!', 'Feature selektion is on!');
            presenter.enableSelectionTool(false);
            pickFeature = false;
        }

    }
    if (b_action != 'measure' && b_action != 'measure_on') {
        if (presenter.isMeasurementToolEnabled()) {
            tmp = true;
            //console.log("hi ", "m");
            measureSwitch(false);
            showNotification('info', 'Info!', 'The measuring mode is exited');
        }
    }

    if (false) {
        //if (b_action != 'btn-rotate-object' || b_action !="btn-select-feature") {
        if (rotatemodeon) {
            rotatemodeon = false;
            $("#btn-rotate-object").attr("src", "css/vendor/skins/dark/rotate.png");
            $('#rotate-box').fadeOut().css("visibility", "hidden");
            showNotification('info', 'Info!', 'Z Axis Rotation is not full implemented');
        }
    }

    //console.log("hi ", tmp);
    return tmp;

}

function infoswitch(on) {
    if (on) {

        //visual_ALL_reload();
        $('#draw-canvas').css("cursor", "pointer");
        console.log("thisfeature:", THISFEATURE);
        presenter.enableSelectionTool(true);
        pickFeature = true;
        //displayAllFeaturesByParam();
        visualAll = true;
        visual_ALL_reload()


        //showNotification('info', 'Info!', 'Select a polygon');

        $('#btn-select-feature').css("visibility", "hidden");
        $('#btn-select-feature_on').css("visibility", "visible");
        //$('#btn-info-feature').css("visibility", "hidden");
        $('#feature-box').fadeOut().css("visibility", "hidden");


    } else {

        var button = document.getElementById("btn-group-deselection");
        button.src ="css/vendor/skins/dark/deselctgroups_inactive.png"
        $('#draw-canvas').css("cursor", "default");
        deselection();

    }
}


function deselection() {
    polygons = {
        selectionpolygon: [], // Basisselektion
        crackpolygons: [], // Rissselektion auf dem Basispolygon
        edgepolygons: [], // Bruchkantenselektion auf dem Basispolygon
        overlappolygons: [], // Überlappungsselektion auf dem Basispolygon
        kinkpolygons: [], // Knickselektion auf dem Basispolygon
        unnamed6polygons: [],
        unnamed7polygons: [],
        unnamed8polygons: [],
        unnamed9polygons: [],
        unnamed10polygons: [],
        visualpolygon: [], // Darstellung eines einzelnen Polygons
    };

    visualFeature = false;
    visualMultipleFeature = false;
    viewer.polygon = [];
    viewer.multiplepolygon_selection = [];
    viewer.polygonR = [];
    viewer.multiplepolygon_selectionR = [];
    THISFEATURE = "";
    presenter.repaint()

    //$('#btn-info-feature').css("visibility", "hidden");
    $('#feature-box').fadeOut().css("visibility", "hidden");
    $('#btn-select-feature_on').css("visibility", "hidden");
    $('#btn-select-feature').css("visibility", "visible");

    if (pickFeature) {
        $('#draw-canvas').css("cursor", "default");
        pickFeature = false;
        presenter.enableSelectionTool(false);
        //$('#selector').css('cursor', 'default');
    }
}

//Show all Feature
function visual_ALL() {
    if (!visualAll) {
        visualAll = true;
        //console.log(visualAll);

        viewer.multiplepolygon = [];
        if (viewer.multiplepolygon.length < 1) {
            API.getFeaturesByObjectId("ars3do:" + THISOBJ, displayFeaturebyObjekt);

        }

        $("#btn-show-all-feature").attr("src", "css/vendor/skins/dark/features_show.png");
    } else {
        visualAll = false;
        viewer.multiplepolygon = [];
        $("#btn-show-all-feature").attr("src", "css/vendor/skins/dark/features_show_on.png");


    }
    if (THISFEATURE != "") {
        if (false) {
            viewer.polygon = transfomation_point(viewer.polygonR);
        }
    }
    //console.log("vmp", viewer.multiplepolygon);
    presenter.repaint();

}


function visual_ALL_reload() {

    if (visualAll) {
        viewer.multiplepolygon = [];
        if (viewer.multiplepolygon.length < 1) {
            API.getFeaturesByObjectId("ars3do:" + THISOBJ, displayFeaturebyObjekt);

        }

        $("#btn-show-all-feature").attr("src", "css/vendor/skins/dark/features_show.png");

        //console.log("vmp", viewer.multiplepolygon);



    }
    if (THISFEATURE != "") {
        if (true) {
            visual_selection_reload();
            //viewer.polygon = transfomation_point(viewer.polygon);
        }
    }
    presenter.repaint();
}

function visual_selection_reload() {
    switcher
    //API.getFeaturesByObjectId("ars3do:" + THISOBJ, getFeaturebyObjectPicking);
    console.log(THISFEATURE);
    let r = presenter._scene.meshes["O-40839_c"].transform.matrix;
    viewer.polygon = transfomation_point(viewer.polygonR, r);
    //showFeature(THISFEATURE);
}

function transformation(winkel, on) {

    let r = SglMat4.mul(SglMat4.translation(presenter._scene.meshes["O-40839_c"].transform.translation),
    SglMat4.rotationAngleAxis(sglDegToRad(winkel), [0.0, 0.0, 1.0]))

    let tmp = SglMat4.mul(SglMat4.translation(presenter._scene.meshes["O-40839_c"].transform.translation),
    SglMat4.rotationAngleAxis(sglDegToRad(-ZAxisrotation), [0.0, 0.0, 1.0]));

    if ( presenter._pointA[0] != 0 && presenter._pointA[1] != 0 && presenter._pointA[2] != 0 && presenter._pointA[0] != presenter._pointB[0] && presenter._pointA[1] != presenter._pointB[1] && presenter._pointA[2] != presenter._pointB[2]){
        console.log(presenter._pointA, presenter._pointB);
        let tpoints = [];
        tpoints.push(presenter._pointA);
        tpoints.push(presenter._pointB);

        tpoints = transfomation_point(tpoints, tmp);
        tpoints = transfomation_point(tpoints, r)

        presenter._pointA = tpoints[0];
        presenter._pointB = tpoints[1];
    }
    if (on) {
        //SglMat4.rotationAngleAxis(sglDegToRad(winkel), [0.0, 0.0, 1.0]);
;

        if (drawgeom || editorgeom) {




            if (presenter._selectionPoints != []) {
                presenter._selectionPoints = transfomation_point(presenter._selectionPoints, tmp);
                presenter._selectionPoints = transfomation_point(presenter._selectionPoints, r)
            }

            if (polygons.selectionpolygon != []) {
                //console.log("trans", 1);
                polygons.selectionpolygon = transfomation_point(polygons.selectionpolygon, tmp);
                polygons.selectionpolygon = transfomation_point(polygons.selectionpolygon, r);
            }

            if (polygons.crackpolygons != []) {
                //console.log("trans", 2);
                polygons.crackpolygons = transfomation_point_edit(polygons.crackpolygons, tmp);
                polygons.crackpolygons = transfomation_point_edit(polygons.crackpolygons, r);
            }

            if (polygons.edgepolygons != []) {
                polygons.edgepolygons = transfomation_point_edit(polygons.edgepolygons, tmp);
                polygons.edgepolygons = transfomation_point_edit(polygons.edgepolygons, r);
            }

            if (polygons.overlappolygons != []) {
                polygons.overlappolygons = transfomation_point_edit(polygons.overlappolygons, tmp);
                polygons.overlappolygons = transfomation_point_edit(polygons.overlappolygons, r);
            }

            if (polygons.kinkpolygons != []) {
                polygons.kinkpolygons = transfomation_point_edit(polygons.kinkpolygons, tmp);
                polygons.kinkpolygons = transfomation_point_edit(polygons.kinkpolygons, r);
            }

            if (polygons.unnamed6polygons != []) {
                polygons.unnamed6polygons = transfomation_point_edit(polygons.unnamed6polygons, tmp);
                polygons.unnamed6polygons = transfomation_point_edit(polygons.unnamed6polygons, r);
            }

            if (polygons.unnamed7polygons != []) {
                polygons.unnamed7polygons = transfomation_point_edit(polygons.unnamed7polygons, tmp);
                polygons.unnamed7polygons = transfomation_point_edit(polygons.unnamed7polygons, r);
            }

            if (polygons.unnamed8polygons != []) {
                polygons.unnamed8polygons = transfomation_point_edit(polygons.unnamed8polygons, tmp);
                polygons.unnamed8polygons = transfomation_point_edit(polygons.unnamed8polygons, r);
            }

            if (polygons.unnamed9polygons != []) {
                polygons.unnamed9polygons = transfomation_point_edit(polygons.unnamed9polygons, tmp);
                polygons.unnamed9polygons = transfomation_point_edit(polygons.unnamed9polygons, r);
            }

            if (polygons.unnamed10polygons != []) {
                polygons.unnamed10polygons = transfomation_point_edit(polygons.unnamed10polygons, tmp);
                polygons.unnamed10polygons = transfomation_point_edit(polygons.unnamed10polygons, r);
            }

            console.log("trans2", polygons);


        }
        ZAxisrotation = winkel;

        presenter._scene.meshes["O-40839_c"].transform.matrix = r;

        presenter.animateToTrackballPosition(presenter.getTrackballPosition());
        //if visual_AL
        visual_ALL_reload();
        console.log(pickFeature);


    } else {

        let r = presenter._scene.meshes["O-40839_c"].transform.matrix;
        // console.log("r", r, "\n w", presenter._scene.meshes["O-40839_c"].rotation);
    }
}

function transformation_geom(input) {

    //SglMat4.rotationAngleAxis(sglDegToRad(winkel), [0.0, 0.0, 1.0]);
    let r = SglMat4.mul(SglMat4.translation(presenter._scene.meshes["O-40839_c"].transform.translation),
        SglMat4.rotationAngleAxis(sglDegToRad(ZAxisrotation), [0.0, 0.0, 1.0]));



    if (input.selectionpolygon != []) {
        input.selectionpolygon = transfomation_point(input.selectionpolygon, r);
    }

    if (input.crackpolygons != []) {

        input.crackpolygons = transfomation_point_edit(input.crackpolygons, r);
    }

    if (input.edgepolygons != []) {

        input.edgepolygons = transfomation_point_edit(input.edgepolygons, r);
    }

    if (input.overlappolygons != []) {

        input.overlappolygons = transfomation_point_edit(input.overlappolygons, r);
    }

    if (input.kinkpolygons != []) {

        input.kinkpolygons = transfomation_point_edit(input.kinkpolygons, r);
    }

    if (input.unnamed6polygons != []) {

        input.unnamed6polygons = transfomation_point_edit(input.unnamed6polygons, r);
    }

    if (input.unnamed7polygons != []) {

        input.unnamed7polygons = transfomation_point_edit(input.unnamed7polygons, r);
    }

    if (input.unnamed8polygons != []) {

        input.unnamed8polygons = transfomation_point_edit(input.unnamed8polygons, r);
    }

    if (input.unnamed9polygons != []) {

        input.unnamed9polygons = transfomation_point_edit(input.unnamed9polygons, r);
    }

    if (input.unnamed10polygons != []) {

        input.unnamed10polygons = transfomation_point_edit(input.unnamed10polygons, r);
    }

    console.log("trans input", input);
    return input;
}

function isZAxisrotation() {
    if (ZAxisrotation == 0)
        return true;
    else {
        transformation(0, true);
        return false;
    }
}

function transfomation_point_edit(input_list, r) {
    //console.log("in", input_list);

    //let r = presenter._scene.meshes["O-40839_c"].transform.matrix;
    //console.log(input_list);
    var out_list = [];
    for (a in input_list) {
        array = input_list[a];
        var tmp_list = [];
        for (i in array) {
            //console.log("P =", input_list[i]);
            let h_pointa = SglMat4.translation(array[i]);
            //console.log(h_pointa);
            //console.log("dds");
            h_pointb = SglMat4.mul(r, h_pointa);

            //console.log("d", h_pointb);
            var pointb = []
            pointb.push(h_pointb[12]);
            pointb.push(h_pointb[13]);
            pointb.push(h_pointb[14]);
            //console.log("pb: ", pointb);

            tmp_list.push(pointb);
        }
        out_list.push(tmp_list);
    }
    return out_list;

}

function transfomation_point(input_list, r) {
    //console.log("in", input_list);
    var tmp_list = [];
    //let r = presenter._scene.meshes["O-40839_c"].transform.matrix;
    //console.log(input_list);

    for (i in input_list) {
        //console.log("P =", input_list[i]);
        let h_pointa = SglMat4.translation(input_list[i]);
        //console.log(h_pointa);
        //console.log("dds");
        h_pointb = SglMat4.mul(r, h_pointa);

        //console.log("d", h_pointb);
        var pointb = []
        pointb.push(h_pointb[12]);
        pointb.push(h_pointb[13]);
        pointb.push(h_pointb[14]);
        //console.log("pb: ", pointb);

        tmp_list.push(pointb);
    }

    //console.log("out", tmp_list);
    return tmp_list;
}




function onEndMeasure(measure) {
    // measure.toFixed(2) sets the number of decimals when displaying the measure
    // depending on the model measure units, use "mm","m","km" or whatever you have
    $('#measure-output').html(measure.toFixed(2) + " mm");
}
// kann ggf. gelöscht werden VORHER TESTEN
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

$('#btn-modus-reset').on('click', (event) => {

    presenter._selectionPoints = [];

    if (selectionmodus != 1) {
        resetSelection(selectionmodus);
    } else {
        resetSelection(0);
    }


});

$('#btn-modus').on('click', (event) => {

    if (polygons.selectionpolygon.length > 2) {

        if (presenter._selectionPoints.length < 1) {

            if (selectionmodus == 10) {
                selectionmodus = 1

            } else {
                selectionmodus = selectionmodus + 1
            }

            ;
            switch (selectionmodus) {
                case 1:
                    document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'basic';
                    break;
                case 2:
                    document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'crack';
                    break;
                case 3:
                    document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'edge';
                    break;
                case 4:
                    document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'overlap';
                    break;
                case 5:
                    document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'kink';
                    break;
                case 6:
                    document.getElementById('btn-modus').innerHTML = 'Modus: ' + 'supplemented';
                    break;
                default:
                    document.getElementById('btn-modus').innerHTML = 'Modus: ' + selectionmodus;
                    break;

            }
            console.log(selectionmodus)
        }
    }


});

$('#btn-modus-confirm').on('click', (event) => {

    console.log(presenter._selectionPoints.length);
    let status = false;

    if (presenter._selectionPoints.length > 1) {
        if (selectionmodus == 1) {
            if (presenter._selectionPoints.length > 2) {
                polygons.selectionpolygon = presenter._selectionPoints;
                presenter._selectionPoints = [];
                status = true;
            }
        } else if (selectionmodus == 2) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.crackpolygons.push(tmp);
            presenter._selectionPoints = [];

        } else if (selectionmodus == 3) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.edgepolygons.push(tmp);
            presenter._selectionPoints = [];
        } else if (selectionmodus == 4) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.overlappolygons.push(tmp);
            presenter._selectionPoints = [];

        } else if (selectionmodus == 5) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.kinkpolygons.push(tmp);
            presenter._selectionPoints = [];


        } else if (selectionmodus == 6) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.unnamed6polygons.push(tmp);
            presenter._selectionPoints = [];

        } else if (selectionmodus == 7) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.unnamed7polygons.push(tmp);
            presenter._selectionPoints = [];

        } else if (selectionmodus == 8) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.unnamed8polygons.push(tmp);
            presenter._selectionPoints = [];

        } else if (selectionmodus == 9) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.unnamed9polygons.push(tmp);
            presenter._selectionPoints = [];

        } else if (selectionmodus == 10) {
            status = true;
            let tmp = presenter._selectionPoints;
            tlength = presenter._selectionPoints.length;

            for (i = tlength - 2; i >= 0; i--) {
                tmp.push(presenter._selectionPoints[i]);
            }
            polygons.unnamed10polygons.push(tmp);
            presenter._selectionPoints = [];

        }


        console.log(polygons);
        console.log(presenter._selectionPoints);

        presenter.repaint();
    }
    if (!status) {
        showNotification('error', 'Attention!', 'You must select at least 3 points for the feature polygon and 2 points for a detail selection.');
    }

});

// TESTEN OB ES GELÖSCHT WERDEN KANN
/*
let displayFeatures = (input) => {
    console.log("Feature from TS:", input);
    //let geom = [];
    viewer.multiplepolygon_selection = [];


    let featureST = input.geom;
    featureST = featureST.replace(/\'/g, "\"");

    let featureOBJ = JSON.parse(featureST);

    if (featureOBJ.visualpolygon.length > 0) {
        console.log("m1");
        viewer.multiplepolygon_selection = featureOBJ.visualpolygon;
    } else {
        console.log("m2");
        viewer.multiplepolygon_selection = featureOBJ.selectionpolygon;
    }

    console.log("p:", viewer.multiplepolygon_selection);

};
*/
/*
let displayFeature = (input) => {

    let geom = [];
    let featureST = input.geom;

    featureST = featureST.replace(/\'/g, "\"");
    let featureOBJ = JSON.parse(featureST);

    if (featureOBJ.visualpolygon.length > 0) {
        viewer.polygon = featureOBJ.visualpolygon;
    } else {
        viewer.polygon = featureOBJ.selectionpolygon;
    }

};
*/

// TESTEN
/*
let searchFeatureByPolygon = (point) => {
    $.ajax({
        type: "GET",
        url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            $("#btn-modal-features-overview-close").trigger("click");
            resetSelection(0);
            polygons.visualpolygon = [];
            visualFeature = true;
            console.log(data);
            for (item in data) {
                if (data[item].f === id) {
                    let featureST = data[item].geom;
                    featureST = featureST.replace(/\'/g, "\"");
                    let featureOBJ = JSON.parse(featureST);

                    console.log(featureOBJ.visualpolygon.length, featureOBJ);
                    if (featureOBJ.visualpolygon.length > 0) {
                        viewer.polygon = featureOBJ.visualpolygon;
                    } else {
                        viewer.polygon = featureOBJ.selectionpolygon;
                    }
                    console.log(polygons);
                }
            }
            presenter.repaint();
        }
    });
};*/

let showFeature = (id) => {
    deselection();
    THISFEATURE = id;
    $.ajax({
        type: "GET",
        url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            $("#btn-modal-features-overview-close").trigger("click");
            resetSelection(0);
            //polygons.visualpolygon = [];
            viewer.polygon = [];
            viewer.polygonR = [];
            visualFeature = true;
            console.log(data);
            for (item in data) {
                if (data[item].f === id) {
                    let featureST = data[item].geom;
                    featureST = featureST.replace(/\'/g, "\"");
                    let featureOBJ = JSON.parse(featureST);
                    console.log(featureOBJ.visualpolygon.length, featureOBJ);
                    let r = presenter._scene.meshes["O-40839_c"].transform.matrix;
                    if (featureOBJ.visualpolygon.length > 0) {
                        if (true) {

                            viewer.polygon = transfomation_point(featureOBJ.visualpolygon, r);
                        }
                        viewer.polygonR = featureOBJ.visualpolygon;
                    } else {
                        if (true) {
                            viewer.polygon = transfomation_point(featureOBJ.selectionpolygon, r);
                        }
                        viewer.polygonR = featureOBJ.selectionpolygon;
                    }
                    console.log(polygons);
                }
            }
            infoswitch(true);
            //$('#btn-info-feature').css("visibility", "visible");
            //$('#feature-box').fadeIn().css("visibility", "visible");
            loadSmallFeatureInfoBox();
            presenter.repaint();
        }
    });
};

// Initial and Interpretation
let showFeatures = (id, mode) => {
    deselection();
    visualMultipleFeature = true;
    var button = document.getElementById("btn-group-deselection");
    button.src ="css/vendor/skins/dark/deselctgroups.png"
    $.ajax({
        type: "GET",
        async: false,
        url: API.BASE + "/features?q=" + THISOBJECT,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log("showFeatures", data);
            $("#btn-modal-featuregroup-overview-close").trigger("click");
            $("#btn-modal-interpretations-close").trigger("click");

            let ids = [];
            if (mode === "featuregroup") {
                for (fgi in data.featuregroups) {
                    if (data.featuregroups[fgi].id === id) {
                        ids = data.featuregroups[fgi].relatedto;
                        //console.log("ID", ids)
                        //console.log("data", data.features)
                        let i = 0;
                        for (item in data.features) {

                            console.log("gh", data.features.length)
                            for (i = 0; i < ids.length; i++) {
                                //console.log("1", ids[i])
                                //console.log("2", data.features[item].f)
                                if (data.features[item].f == ids[i]) {

                                    let featureST = data.features[item].geom;
                                    featureST = featureST.replace(/\'/g, "\"");
                                    let featureOBJ = JSON.parse(featureST);
                                    if (featureOBJ.visualpolygon.length > 0) {
                                        //console.log("m1");
                                        viewer.multiplepolygon_selection.push(featureOBJ.visualpolygon);
                                    } else {
                                        //console.log("m2");
                                        viewer.multiplepolygon_selection.push(featureOBJ.selectionpolygon);
                                    }
                                    console.log(viewer);
                                    i = ids.length - 1;
                                }
                            }

                        }
                    }
                }
            } else if (mode === "interpretation") {
                for (int in data.interpretations) {
                    if (data.interpretations[int].id === id) {
                        console.log(data.interpretations[int].features);
                        ids = data.interpretations[int].features;
                        //console.log("ID", ids)
                        //console.log("data", data.features)
                        let i = 0;
                        for (item in data.features) {

                            console.log("gh", data.features.length)
                            for (i = 0; i < ids.length; i++) {
                                console.log("1", ids[i])
                                console.log("2", data.features[item].f)
                                if (data.features[item].f == ids[i]) {

                                    let featureST = data.features[item].geom;
                                    featureST = featureST.replace(/\'/g, "\"");
                                    let featureOBJ = JSON.parse(featureST);
                                    if (featureOBJ.visualpolygon.length > 0) {
                                        //console.log("m1");
                                        viewer.multiplepolygon_selection.push(featureOBJ.visualpolygon);
                                    } else {
                                        //console.log("m2");
                                        viewer.multiplepolygon_selection.push(featureOBJ.selectionpolygon);
                                    }
                                    console.log(viewer);
                                    i = ids.length - 1;
                                }
                            }

                        }
                    }
                }
            }
            console.log(ids);
            presenter.repaint();
        }
    });
};



// Zeigt alles an Features an
let displayFeaturebyObjekt = (input) => {
    console.log("Feature from TS:", input);

    for (i in input.features) {

        let featureST = input.features[i].geom;
        featureST = featureST.replace(/\'/g, "\"");


        let featureOBJ = JSON.parse(featureST);
        let r = presenter._scene.meshes["O-40839_c"].transform.matrix;
        if (featureOBJ.visualpolygon.length > 0) {

            if (true) {
                featureOBJ.visualpolygon = transfomation_point(featureOBJ.visualpolygon, r);
            }

            viewer.multiplepolygon.push(featureOBJ.visualpolygon);
        } else {

            if (true) {
                featureOBJ.selectionpolygon = transfomation_point(featureOBJ.selectionpolygon, r);
            }
            viewer.multiplepolygon.push(featureOBJ.selectionpolygon);
        }



    }

};


// Used for polygoneditor
let getFeaturebyObject = (input) => {
    console.log("Feature from TS:", input);;
    for (i in input.features) {



        let featureST = input.features[i].geom;
        featureST = featureST.replace(/\'/g, "\"");


        let featureOBJ = JSON.parse(featureST);
        console.log("asd", featureOBJ)

        if (ZAxisrotation != 0){
            featureOBJ = transformation_geom(featureOBJ);
            console.log("asd2", featureOBJ)
        }


        for (pointID in featureOBJ.selectionpolygon) {
            pointsearch = featureOBJ.selectionpolygon[pointID];

            if (featureOBJ.selectionpolygon[pointID][0] == selectioneditor.selectionpoint[0] && featureOBJ.selectionpolygon[pointID][1] == selectioneditor.selectionpoint[1] && featureOBJ.selectionpolygon[pointID][2] == selectioneditor.selectionpoint[2]) {
                selectioneditor.selectionfeature = input.features[i].f;
                polygons = featureOBJ;
                viewer.multiplepolygon = [];
                console.log("find point", polygons);
                //visual_ALL();
                break;
            }

        }

    }

};

// Used for feature picking
let getFeaturebyObjectPicking = (input) => {
    polygons = [];
    console.log("pick feature start", input);

    for (let i in input.features) {



        let featureST = input.features[i].geom;
        featureST = featureST.replace(/\'/g, "\"");


        let featureOBJ = JSON.parse(featureST);


        let array_point_IST = null;
        let tmp_length_IST = null;
        console.log("1")
        let r = presenter._scene.meshes["O-40839_c"].transform.matrix;
        if (featureOBJ.visualpolygon.length > 0) {
            if (true) {
                tmp = transfomation_point(featureOBJ.visualpolygon, r);
            }
            array_point_IST = tmp;
            tmp_length_IST = tmp.length;
            //array_point_IST = featureOBJ.visualpolygon;
            //tmp_length_IST = featureOBJ.visualpolygon.length;

        } else {
            if (true) {
                tmp = transfomation_point(featureOBJ.selectionpolygon, r);
            }
            //array_point_IST = featureOBJ.selectionpolygon;
            //tmp_length_IST = featureOBJ.selectionpolygon.length;
            array_point_IST = tmp;
            tmp_length_IST = tmp.length;
        }

        for (let pointID = 0; pointID < tmp_length_IST; pointID++) {
            console.log("2")
            pointsearch = array_point_IST[pointID];

            if (array_point_IST[pointID][0] == pointPickIST[0] && array_point_IST[pointID][1] == pointPickIST[1] && array_point_IST[pointID][2] == pointPickIST[2]) {
                //selectioneditor.selectionfeature = input.features[i].f;
                //polygons = featureOBJ;
                THISFEATURE = input.features[i].f;

                polygons = featureOBJ;
                if (!(polygons.visualpolygon.length > 0)) {
                    viewer.polygon = array_point_IST;
                    viewer.polygonR = featureOBJ.selectionpolygon;
                } else {
                    viewer.polygon = featureOBJ.visualpolygon;
                    viewer.polygonR = featureOBJ.visualpolygon;
                }
                visualFeature = true;
                console.log(polygons);
                //viewer.multiplepolygon = [];
                //openFeatureInfoModal();
                console.log("pick feature sucess", THISFEATURE);
                //$('#btn-info-feature').css("visibility", "visible");
                //$('#feature-box').fadeIn().css("visibility", "visible");
                loadSmallFeatureInfoBox();
                break;


            }
        }
    }
    presenter.repaint();
    //presenter.enableSelectionTool(false);
    //pickFeature = false;
    pointPickISTID = 9999999;

};

let displayObject = (data) => {
    console.log("test:", data);


    var element = document.getElementById("header");

    element.innerHTML = '<i class="fa fa-cube" aria-hidden="true"></i>&nbsp;' + data.label + " " + "<i>(" + data.id + ")</i>";


    init3dhop();

    setup3dhop(model_url);
    window.dispatchEvent(new Event('resize'));

   if (getQueryVariable("feature_id") != false) {
    //displayAllFeaturesByParam();
    displayFeatureByParam(getQueryVariable("feature_id"))
   }  else if (getQueryVariable("group_id") != false) {
    displayFeatureGroupByParam(getQueryVariable("group_id"));
} else if (getQueryVariable("interpretation_id") != false) {
    displayInterpretationByParam(getQueryVariable("interpretation_id"));
}

};




// model crop part and send data to API
$('#btn-undo-selection').on('click', () => {
    presenter._undoSelection();
})

$('#btn-reset-selection').on('click', () => {
    resetSelection(0);
    presenter.repaint();
})

$('#btn-confirm-selection').on('click', (event) => {

    if (polygons.selectionpolygon.length < 3) {
        showNotification('error', 'Attention!', 'You must select at least 3 points for the feature polygon and 2 points for a detail selection.');
    } else if (presenter._selectionPoints.length < 1) {
        transformation(0, true);

        if (!editorgeom) {
            console.log(polygons.selectionpolygon.length)
            $("#btn-feature-name").trigger("click");

            $.ajax({
                type: "GET",
                url: API.BASE + "/fixedvalues/featuretypes",
                async: false,
                error: function(jqXHR, textStatus, errorThrown) {},
                success: function(data) {
                    console.log(data);
                    $("#mod-feature-type-list").empty();
                    for (item in data) {
                        $("#mod-feature-type-list").append("<div class='kachelfeaturetype ft' id='" + data[item].s + "' onclick='selectft(\"" + data[item].s + "\")'>" + data[item].label + "</div>");
                    }
                    $("#btn-feature-name").trigger("click");
                }
            });
        } else {
            // Overrite for feature.geom

            RDF4J.updateFeatureGeometry(selectioneditor.selectionfeature, polygons);
            console.log("overrite", polygons);
            polygons = [];
            editorgeom = false;
            presenter.enableSelectionTool(false);
            $('#btn-confirm-selection').hide();
            $('#btn-undo-selection').hide();
            $('#btn-reset-selection').hide();
            $('#btn-modus').hide();
            $('#btn-modus-confirm').hide();
            $('#btn-modus-reset').hide();
            $("#btn-show-all-feature").attr("src", "css/vendor/skins/dark/features_show_on.png");


            resetSelection(0);
            selectionmodus = 1;
            selectioneditor.multiplepolygon = [];
            selectioneditor.multiplepolygon_selection = [];
            pointISTID = 9999999;

            visual_ALL();



        }
    } else {
        showNotification('error', 'Attention!', 'You must confirm the current selection for the mode or undo the selection points.');
    }
    console.log("THISOBJ1: ", THISOBJ)

});

$('#btn-confirm-crop').on('click', (event) => {
    let ok = true;
    console.log("THISOBJ: ", THISOBJ, "\n", polygons)

    let featureName = $("#inp-feature-name").val();
    console.log(featureName, FEATURETYPE);
    if (FEATURETYPE === "") {
        showNotification('error', 'Attention!', 'The feature type cannot be undefinded!');
        ok = false;
    }
    if (featureName === "") {
        showNotification('error', 'Attention!', 'The feature name cannot be empty!');
        ok = false;
    }
    if (ok) {
        $("#btn-modal-feature-name-close").trigger("click");
        let loader = $('#loader')
        let d = new Date();
        let n = d.getTime();
        console.log("THISOBJ2: ", THISOBJ, "\n", polygons)
        let response = {
            "segmentation": {
                "polygon": polygons
            },
            "feature": {
                "label": featureName,
                "id": UUID.getUUIDv4(),
                "type": FEATURETYPE,
                "object": THISOBJECT
            },
            "process": {
                "status": "step1",
                "id": n,
                "timestamp": n
            }
        };

        writeGeomprocessTriples(response);

        selectionSwitch(false);
        drawgeom = false;
        presenter.enableSelectionTool(false);
        $('#btn-confirm-selection').hide()
        $('#btn-undo-selection').hide()
        $('#btn-reset-selection').hide()
        $('#btn-modus').hide()
        $('#btn-modus-confirm').hide()
        $('#btn-modus-reset').hide()

        console.log("THISFEATURE create:", THISFEATURE);

        /*
        visualFeature = true;
        if (!(polygons.visualpolygon.length > 0)) {
            viewer.polygon = polygons.selectionpolygon;
            //showNotification('error', 'Attention!', 'Memo Jonas in <crop-confirm> feht noch etwas.');
        } else {
            viewer.polygon = polygons.visualpolygon;
            //showNotification('error', 'Attention!', 'Memo Jonas in <crop-confirm> feht noch etwas.');
        }
        */
        displayAllFeaturesByParam();

        resetSelection(0);
        selectionmodus = 1;
        presenter.repaint();

    }
});
