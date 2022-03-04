let initModalInterpretations = () => {
    let modal = document.getElementById('modalInterpretations');
    let btn = document.getElementById("btn-open-interpretation-modal");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/objects/" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalInterpretations", data);
                $("#interpretations-list").empty();
                let interpretations = data.interpretations;
                for (item in interpretations) {
                    $("#interpretations-list").append("<div class='featurekacheln select' id='" + interpretations[item].id + "' onclick='showFeatures(\"" + interpretations[item].id + "\", \"" + "interpretation" + "\");'>" + interpretations[item].label + "</div>");
                    $("#interpretations-list").append("<div class='kachelinfo' id='" + interpretations[item].id + "-info1' style='margin-top:-8px;cursor:pointer;' onclick='openInterpretationArgumentsModal(\"" + interpretations[item].id + "\");'><b><i class='fa fa-info' aria-hidden='true'></i> arguments</b></div>");
                    let arguments = interpretations[item].arguments;
                    for (arg in arguments) {
                        let statementtype = arguments[arg].type.replace("ars:", "").replace("_", " ");
                        if (arguments[arg].item === "ars:Statement") {
                            $("#interpretations-list").append("<div class='kachelinfoindividual' id='" + arguments[arg].id + "'><b>" + statementtype + " > " + arguments[arg].label + " (Statement)</b></div>");
                        } else if (arguments[arg].item === "sci:S4_Observation") {
                            $("#interpretations-list").append("<div class='kachelinfoindividual' id='" + arguments[arg].id + "'><b>" + statementtype + " > " + arguments[arg].label + " (Observation)</b></div>");
                        }
                    }
                }
                let modal2 = document.getElementById('modalNewInterpretation');
                let btn2 = document.getElementById("btn-new-interpretation");
                btn2.onclick = function() {
                    modal.style.display = "none";
                    modal2.style.display = "block";
                    $("#inp-new-interpretation-label").val("");
                }
                $("#btn-modal-new-interpretation-close").click(function() {
                    modal2.style.display = "none";
                    modal.style.display = "block";
                });
            }
        });
    }
    $("#btn-modal-interpretations-close").click(function() {
        modal.style.display = "none";
    });
};

let openInterpretationsModal = () => {
    console.log("openInterpretationsModal");
    $("#btn-modal-open-interpretations").trigger("click");
};

initModalInterpretations();

// new interpretation
$('#btn-new-interpretation-submit').on('click', (event) => {
    let ok = true;
    let interpretationLabel = $("#inp-new-interpretation-label").val();
    if (interpretationLabel === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(interpretationLabel) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createInterpretation(THISOBJECT, interpretationLabel, console.log)
    }
});

// Interpretation Edit
let initModalInterpretationEdit = () => {
    let modal = document.getElementById('modalEditInterpretation');
    let btn = document.getElementById("btn-modal-open-interpretation-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/objects/" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalInterpretationEdit", data);
                $("#inp-edit-interpretation-label").empty();
                for (item in data.interpretations) {
                    if (data.interpretations[item].id == THISINTERPRETATION) {
                        $("#inp-edit-interpretation-label").val(data.interpretations[item].label);
                    }
                }
            }
        });
    }
    $("#btn-modal-edit-interpretation-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-interpretation-modal").trigger("click");
    });
};

let openInterpretationEditModal = (interpretation) => {
    console.log(interpretation);
    THISINTERPRETATION = interpretation;
    $("#btn-modal-interpretation-overview-close").trigger("click");
    $("#btn-modal-open-interpretation-edit").trigger("click");
};

initModalInterpretationEdit();

$('#btn-edit-interpretation-submit').on('click', (event) => {
    let ok = true;
    let interpretationLabel = $("#inp-edit-interpretation-label").val();
    if (interpretationLabel === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.updateInterpretation(THISINTERPRETATION, interpretationLabel, console.log)
    }
});

let initModalInterpretationArguments = () => {
    let modal = document.getElementById('modalInterpretationArguments');
    let btn = document.getElementById("btn-modal-open-arguments-interpretation");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/objects/" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalInterpretationArguments", data);
                $.ajax({
                    type: "GET",
                    url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
                    async: false,
                    error: function(jqXHR, textStatus, errorThrown) {},
                    success: function(data2) {
                        console.log("initModalInterpretationArguments", data2);
                        $("#interpretation-list-arguments").empty();
                        for (item in data.interpretations) {
                            if (data.interpretations[item].id == THISINTERPRETATION) {
                                let arguments = data.interpretations[item].arguments;
                                for (argument in arguments) {
                                    if (arguments[argument].item === "ars:Statement") {
                                        $("#interpretation-list-arguments").append("<div class='featurekacheln select' id='" + arguments[argument].id + "'>" + arguments[argument].label + " (Statement)</div>");
                                        $("#interpretation-list-arguments").append("<div class='kachelinfoindividual' id='" + arguments[argument].id + "-asd' onclick=''><i>" + "Statement > " + arguments[argument].statementlabel + "</i></div>");
                                    } else if (arguments[argument].item === "sci:S4_Observation") {
                                        $("#interpretation-list-arguments").append("<div class='featurekacheln select' id='" + arguments[argument].id + "'>" + arguments[argument].label + " (Observation)</div>");
                                        for (i in data2) {
                                            for (ii in data2[i].observations) {
                                                if (arguments[argument].arg === data2[i].observations[ii].observation) {
                                                    let ac = "";
                                                    for (iii in data2[i].observations[ii].ac) {
                                                        ac += data2[i].observations[ii].ac[iii] + ", ";
                                                    }
                                                    ac = ac.substring(0, ac.length - 2);
                                                    if (ac != "") {
                                                        ac = " > " + ac;
                                                    }
                                                    $("#interpretation-list-arguments").append("<div class='kachelinfoindividual' id='" + arguments[argument].id + "-asd' onclick=''><i>" + data2[i].observations[ii].observationlabel + ac + "</i></div>");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        });
    }
    $("#btn-modal-interpretation-arguments-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-interpretations-close").trigger("click");
        $("#btn-open-interpretation-modal").trigger("click");
    });
};

let openInterpretationArgumentsModal = (interpretation) => {
    console.log("openInterpretationArgumentsModal", interpretation);
    THISINTERPRETATION = interpretation;
    $("#btn-modal-interpretation-overview-close").trigger("click");
    $("#btn-modal-open-arguments-interpretation").trigger("click");
};

initModalInterpretationArguments();

let initModalInterpretationArgumentNew = () => {
    let modal = document.getElementById('modalInterpretationArgumentNew');
    let btn = document.getElementById("btn-modal-open-argument-interpretation-new");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/argumentationtypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalInterpretationArguments", data);
                $("#mod-interpretation-argument-new-type-list").empty();
                for (item in data) {
                    if (data[item].id === "ars:Main_Argument") {
                        THISARGUMENTATIONTYPE = "ars:Main_Argument";
                        $("#mod-interpretation-argument-new-type-list").append("<div class='select kachelfeatureselected' id='" + data[item].id + "' onclick='selectArgumentationTypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    } else {
                        $("#mod-interpretation-argument-new-type-list").append("<div class='select kachelfeaturenotselected' id='" + data[item].id + "' onclick='selectArgumentationTypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    }
                }
            }
        });
    }
    $("#btn-modal-interpretation-argument-new-close").click(function() {
        modal.style.display = "none";
        //$("#btn-modal-interpretation-arguments-close").trigger("click");
        //$("#btn-modal-interpretations-close").trigger("click");
        //$("#btn-modal-open-arguments-interpretation").trigger("click");
    });
    $("#new-interpretation-argument-statement").click(function() {
        $("#btn-modal-interpretation-argument-new-close").trigger("click");
        $("#btn-modal-interpretations-close").trigger("click");
        THISARGUMENTLABEL = $("#inp-new-interpretation-argument-label").val();
        openStatementClassesModal("ARGUMENT");
    });
    $("#new-interpretation-argument-observation").click(function() {
        $("#btn-modal-interpretation-argument-new-close").trigger("click");
        $("#btn-modal-interpretations-close").trigger("click");
        THISARGUMENTLABEL = $("#inp-new-interpretation-argument-label").val();
        openObservationFeaturesModal("ARGUMENT");
    });
};

let openInterpretationArgumentNewModal = (interpretation) => {
    console.log("openInterpretationArgumentNewModal", interpretation);
    THISINTERPRETATION = interpretation;
    THISARGUMENTSTATEMENT = "";
    THISARGUMENTOBSERVATION = "";
    $.ajax({
        type: "GET",
        async: false,
        url: API.BASE + "/fixedvalues/argumentationtypes",
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log("openInterpretationArgumentNewModal", data);
            $("#mod-interpretation-argument-new-type-list").empty();
            for (item in data) {
                if (data[item].id === "ars:Main_Argument") {
                    THISARGUMENTATIONTYPE = "ars:Main_Argument";
                    $("#mod-interpretation-argument-new-type-list").append("<div class='select kachelfeatureselected' id='" + data[item].id + "' onclick='selectArgumentationTypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                } else {
                    $("#mod-interpretation-argument-new-type-list").append("<div class='select kachelfeaturenotselected' id='" + data[item].id + "' onclick='selectArgumentationTypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                }
            }
            $("#inp-new-interpretation-argument-label").val("");
            $("#new-interpretation-argument-statement").addClass("kachelsubmit");
            $("#new-interpretation-argument-statement").removeClass("kacheldummy");
            $("#new-interpretation-argument-observation").addClass("kachelsubmitwomt");
            $("#new-interpretation-argument-observation").removeClass("kacheldummy");
            $("#mod-interpretation-argument-new-item").empty();
            $("#mod-interpretation-argument-new-item").append("<div class='kacheldummy' id='btn-modal-interpretation-argument-dummy'>nothing selected</div>");
            $("#new-interpretation-argument-statement").click(function() {
                $("#btn-modal-interpretation-argument-new-close").trigger("click");
                $("#btn-modal-interpretations-close").trigger("click");
                THISARGUMENTLABEL = $("#inp-new-interpretation-argument-label").val();
                openStatementClassesModal("ARGUMENT");
            });
            $("#new-interpretation-argument-observation").click(function() {
                $("#btn-modal-interpretation-argument-new-close").trigger("click");
                $("#btn-modal-interpretations-close").trigger("click");
                THISARGUMENTLABEL = $("#inp-new-interpretation-argument-label").val();
                openObservationFeaturesModal("ARGUMENT");
            });
            $("#btn-modal-interpretation-arguments-close").trigger("click");
            $("#btn-modal-open-argument-interpretation-new").trigger("click");
        }
    });
};

let selectArgumentationTypeByClick = (at) => {
    let match = false;
    if (THISARGUMENTATIONTYPE == at) {
        match = true;
    }
    THISARGUMENTATIONTYPE = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === at) {
            if (match === true) {
                THISARGUMENTATIONTYPE = at;
            } else {
                if (at !== "null") {
                    THISARGUMENTATIONTYPE = at;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISARGUMENTATIONTYPE);
};

initModalInterpretationArgumentNew();

$('#btn-new-argument-submit').on('click', (event) => {
    let ok = true;
    let typesel = true;
    let label = $("#inp-new-interpretation-argument-label").val();
    let item = "";
    if (THISARGUMENTSTATEMENT != "") {
        item = THISARGUMENTSTATEMENT;
    }
    if (THISARGUMENTOBSERVATION != "") {
        item = THISARGUMENTOBSERVATION;
    }
    if (THISARGUMENTSTATEMENT === "" && THISARGUMENTOBSERVATION === "") {
        typesel = false;
    }
    if (label === "" || typesel === false) {
        showNotification('error', 'Error!', 'The label and argument item cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.createInterpretationArgument(THISINTERPRETATION, THISARGUMENTATIONTYPE, label, item, console.log);
    }
});

let initModalObservationFeatures = () => {
    let modal = document.getElementById('modalObservationFeatures');
    let btn = document.getElementById("btn-modal-open-observation-features");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalObservationFeatures", data);
                $("#mod-item-observation-features-list").empty();
                for (item in data) {
                    $("#mod-item-observation-features-list").append("<div class='featurekacheln' id='" + data[item].f + "' onclick='openObservationFeatureOberservationsModal(\"" + data[item].f + "\");'>" + data[item].label + "</div>");
                    $("#mod-item-observation-features-list").append("<div class='kachelinfo2' id='" + data[item].f + "-fcount' onclick=''><b>&raquo;" + data[item].typelabel + "&laquo; described with " + data[item].observations.length + " observations(s)</b></div>");
                    let observations = data[item].observations;
                    for (obs in observations) {
                        let ac = "";
                        for (ii in observations[obs].ac) {
                            ac += observations[obs].ac[ii] + ", ";
                        }
                        ac = ac.substring(0, ac.length - 2);
                        if (ac != "") {
                            ac = " > " + ac;
                        }
                        if (observations[obs].observationtype === "ars:Statement") {
                            $("#mod-item-observation-features-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>Statement " + ac + "</i></div>");
                        } else {
                            $("#mod-item-observation-features-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>" + observations[obs].observationtypelabel + ac + "</i></div>");
                        }
                    }
                }
            }
        });
    }
    $("#btn-modal-observation-features-close").click(function() {
        modal.style.display = "none";
    });
};

let openObservationFeaturesModal = () => {
    $("#btn-modal-open-observation-features").trigger("click");
};

initModalObservationFeatures();

let initModalObservationFeatureOberservations = () => {
    let modal = document.getElementById('modalObservationFeatureOberservations');
    let btn = document.getElementById("btn-modal-open-observation-feature-observations");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalObservationFeatures", data);
                $("#mod-item-observation-feature-observations-list").empty();
                for (item in data) {
                    if (data[item].f === THISFEATURE) {
                        let obs = data[item].observations;
                        for (item2 in obs) {
                            if (obs[item2].observationtype !== "ars:Statement") {
                                $("#mod-item-observation-feature-observations-list").append("<div class='featurekacheln' id='" + obs[item2].observation + "' onclick='observationsAction(\"" + obs[item2].observation + "\",\"" + obs[item2].observationtypelabel + "\");'>" + obs[item2].observationlabel + "</div>");
                                let ac = "";
                                for (item3 in obs[item2].ac) {
                                    ac += obs[item2].ac[item3] + ", ";
                                }
                                ac = ac.substring(0, ac.length - 2);
                                if (ac != "") {
                                    ac = " > " + ac;
                                }
                                $("#mod-item-observation-feature-observations-list").append("<div class='kachelinfoindividual2' id='" + obs[item2].observation + "-" + "" + "'><i>" + obs[item2].observationtypelabel + ac + "</i></div>");
                            }
                        }
                    }
                }
            }
        });
    };
    $("#btn-modal-observation-feature-observations-close").click(function() {
        modal.style.display = "none";
    });
};

let observationsAction = (obsid, obslabel) => {
    console.log(obsid, obslabel);
    THISARGUMENTOBSERVATION = obsid;
    $("#inp-new-interpretation-argument-label").val(THISARGUMENTLABEL);
    $("#btn-modal-observation-feature-observations-close").trigger("click");
    $("#btn-modal-observation-features-close").trigger("click");
    $("#btn-modal-open-argument-interpretation-new").trigger("click");
    $("#mod-interpretation-argument-new-item").empty();
    $("#mod-interpretation-argument-new-item").append("<div class='kachelnargumentobservation' id='" + obsid + "'>" + obslabel + "</div>");
    $("#new-interpretation-argument-statement").removeClass("kachelsubmit");
    $("#new-interpretation-argument-statement").addClass("kacheldummy");
    $("#new-interpretation-argument-observation").removeClass("kachelsubmitwomt");
    $("#new-interpretation-argument-observation").addClass("kacheldummy");
    $("#new-interpretation-argument-statement").off("click");
    $("#new-interpretation-argument-observation").off("click");
};

let openObservationFeatureOberservationsModal = (feature) => {
    THISFEATURE = feature;
    $("#btn-modal-open-observation-feature-observations").trigger("click");
};

initModalObservationFeatureOberservations();
