let THISOBJECT = ""; // URI of active object
let THISOBJECTFULL = {}; // Object of active object
let THISOBJ = ""; // URI of active object > sameAs THISOBJECT but used by JV
let CURRENT_OPERATOR = ""; // this operator

let FEATURETYPE = "";
let OBSERVATIONTYPE = "";
let THISFEATURE = ""; // URI of active feature
let THISITEMCLASS = ""; // URI of active item class
let THISITEMINDIVIDUAL = ""; // URI of active item individual
let THISITEMFEATURETYPE = ""; // URI of active item feature type
let THISFEATUREGROUP = ""; // URI of active featuregroup
let THISMANUFACTURINGFEATURETYPE = ""; // URI of active manufacturing feature type
let THISINTERPRETATION = ""; // URI of active interpretation
let THISARGUMENTATIONTYPE = ""; // URI of active argumentation type
let THISARGUMENTLABEL = ""; // URI of active argument label
let THISARGUMENTSTATEMENT = ""; // URI of active argument statement
let THISARGUMENTOBSERVATION = ""; // URI of active argument observation
let THISACTIVITY = ""; // URI of active activity
let THISCONDITION = ""; // URI of active condition
let THISGPDATA = ""; // geometry process object [0]
let THISOBJECTTYPE = ""; // URI of active objecttype
let THISOBJECTSHAPE = ""; // URI of active objectshape
let THISOBJECTMATERIAL = ""; // URI of active objectmaterial
let THISOBJECTCONDITIONTYPE = ""; // URI of active objectconditiontype
let THISOBJECTMANUFACTURINGTYPE = ""; // URI of active objectmanufacturingtype
let THISOBJECTMFINDSPOT = ""; // URI of active objectfindspot
let THISOBJECTRESICENCE = ""; // URI of active objectresidence
let THISOBJECTPERIOD = ""; // URI of active objectperiod
let THISOBJECTGROUP = ""; // URI of active objectgroup

let ACTIVITIES = []; // array of feature activities
let CONDITIONS = []; // array of feature conditions
let THISFEATUREGROUPSELECTIONS = []; // array of feature group selections
let THISFEATUREGROUPFGSELECTIONS = []; // array of feature group featuregroup selections
let THISFEATUREFEATURESELECTIONS = []; // array of feature feature selections

var presenter = null; //Object to draw the 3DModel and polygons
var pickFeature = false; // if true picking features by click on 3DModell
var visualAll = false; // Zeige alle Features an wenn true. Nutze deine Functions displayAllFeaturesByParam
var visualFeature = false; // Show feature
var visualMultipleFeature = false; // Show selected Feature group / interpretatiopn
var editorgeom = false; // Polygoneditor on/off
var drawgeom = false; // Draw Selectionpolygon modus on/off
var transparent_line = false; // Show transparent line on/off
var rotatemodeon = false; // Show transparent line on/off
var ZAxisrotation = 0; // Z Axis rotaion in degree
let viewclick = false;

var polygons = {
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

}


// Polygons from triple store
var viewer = {
    polygon: [], //Darstellung eines einzelnen Polygons
    multiplepolygon: [], // Darstellung von mehreren Polygonen
    multiplepolygon_selection: [], // Darstellung mehrer Polygone in der Selektierungsfarbe
    polygonR: [], //Darstellung eines einzelnen Polygons
    multiplepolygonR: [], // Darstellung von mehreren Polygonen
    multiplepolygon_selectionR: [] // Darstellung mehrer Polygone in der Selektierungsfarbe
}

var selectioneditor = {

    selectionpoint: [],
    selectionfeature: "null"
};

var selectColor = [0.235, 0.940, 0.681];
var sceneoptions = null;
var selectionmodus = 1;
var pointISTID = 9999999;
var pointPickISTID = 9999999;
var pointPickIST = null;

let findGetParameter = (parameterName) => {
    let result = null;
    let tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
};

let setCurrentOperator = () => {
    CURRENT_OPERATOR = "Louise Rokohl";
    console.log("CURRENT_OPERATOR:", CURRENT_OPERATOR);
}

let setCurrentObject = (data) => {
    THISOBJECTFULL = data;
    console.log("THISOBJECTFULL:", THISOBJECTFULL);
}

let checkLabelStringIfOK = (str) => {
    console.log("checkLabelStringIfOK", str);
    if (str.includes("<") || str.includes(">") || str.includes("\"") || str.includes("'")) {
        return false;
    } else {
        return true;
    }
};

$(document).ready(function() {
    // load data

    $('#feature-box').css("visibility", "hidden");
    $('#rotate-box').css("visibility", "hidden");
    //setCurrentOperator();
    // model_url = "models/multires/O-39676.nxs";
    if (findGetParameter("model_id") || findGetParameter("feature_id") || findGetParameter("group_id") || findGetParameter("interpretation_id")) {
        if (findGetParameter("model_id")) {

            THISOBJECT = findGetParameter("model_id");
            console.log("THISOBJECT:", THISOBJECT);
            API.getObjectById(THISOBJECT, setCurrentObject); // set THISOBJECTFULL

            tmp = THISOBJECT.split(":");
            THISOBJ = tmp[1];
            murl = GS.OBJECT;
            murl = murl.replace("$1", THISOBJ);
            murl = murl.replace("$2", THISOBJ);
            model_url = murl;
            //model_url = "http://143.93.113.149/" + "mntModels/rgzm/ars3do/" + THISOBJ + "/" + THISOBJ + ".nxz";

            // call object data
            API.getObjectById("ars3do:" + THISOBJ, displayObject);
            console.log("UUID:", THISOBJ)
        }

    } else {
        $('#no-model-selected-message').removeClass('hide');
    }

    // display all features or feature
    console.log("f", getQueryVariable("feature_id"), "fg", getQueryVariable("group_id"), "i", getQueryVariable("interpretation_id"));
    if (getQueryVariable("feature_id") == false && getQueryVariable("group_id") == false && getQueryVariable("interpretation_id") == false) {
        displayAllFeaturesByParam();
    }
});

let displayAllFeaturesByParam = () => {
    visualAll = true;
    console.log(visualAll);
    viewer.multiplepolygon = [];
    if (viewer.multiplepolygon.length < 1) {
        API.getFeaturesByObjectId("ars3do:" + THISOBJ, displayFeaturebyObjekt);
    }
};

let displayFeatureByParam = (f) => {
    showFeature(f);
};

let displayFeatureGroupByParam = (fg) => {
    showFeatures(fg, "featuregroup");
};

let displayInterpretationByParam = (fg) => {
    showFeatures(fg, "interpretation");
};