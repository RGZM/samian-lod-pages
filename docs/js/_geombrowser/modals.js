let initModalGeometryProcess = () => {
    let modal = document.getElementById('modalGeometryProcess');
    let btn = document.getElementById("btn-modal-open-gp");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features/geometryprocesses/" + THISFEATURE,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-gp-overview-list").empty();
                for (item in data) {
                    $("#mod-gp-overview-list").append("<div class='featurekacheln' id='" + data[item].id + "' onclick='alert(\"" + "do something :-)" + "\")'>" + data[item].state + " | " + data[item].gp + "</div>");
                    $("#mod-gp-overview-list").append("<div class='featurekacheltype' id='' onclick=''><b>" + data[item].date + "</b></div>");
                    THISGPDATA = data[0];
                    $("#mod-gp-overview-list").append("<div class='kachelrun' id='btn-run' onclick='runCropPolyline()'><b>Run</b></div>");
                }
            }
        });
    }
    $("#btn-modal-geometryprocess-close").click(function() {
        modal.style.display = "none";
    });
};

let initModalFeatureEdit = () => {
    let modal = document.getElementById('modalFeatureEdit');
    let btn = document.getElementById("btn-modal-open-feature-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features/" + THISFEATURE,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(featuredata) {
                console.log(featuredata);
                $("#inp-feature-name-edit").val(featuredata.label);
                $.ajax({
                    type: "GET",
                    url: API.BASE + "/fixedvalues/featuretypes",
                    async: false,
                    error: function(jqXHR, textStatus, errorThrown) {},
                    success: function(data) {
                        console.log(data);
                        $("#mod-feature-type-list-edit").empty();
                        for (item in data) {
                            $("#mod-feature-type-list-edit").append("<div class='kachelfeaturetype ft' id='" + data[item].s + "' onclick='selectft(\"" + data[item].s + "\")'>" + data[item].label + "</div>");
                        }
                        selectft(featuredata.type);
                        $("#mod-feature-edit-list").empty();
                        $("#mod-feature-edit-list").append("<div class='kachelsubmit' id='btn-feature-edit-submit' onclick='editFeature()'><b>Modify Feature</b></div>");
                    }
                });
            }
        });
    }
    $("#btn-modal-feature-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-features-modal").trigger("click");
    });
};

let editFeature = () => {
    RDF4J.updateFeature(THISFEATURE, $("#inp-feature-name-edit").val(), FEATURETYPE);
};

let initModalFeatureName = () => {
    let modal = document.getElementById('modalFeatureName');
    let btn = document.getElementById("btn-feature-name");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-feature-name").val("");
        FEATURETYPE = "";
    }
    $("#btn-modal-feature-name-close").click(function() {
        modal.style.display = "none";
    });
};

let initModalObservations = () => {
    let modal = document.getElementById('modalObservations');
    let btn = document.getElementById("btn-modal-open-oe");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalObservations", data);
                $("#mod-observation-list").empty();
                $("#mod-observation-list").append("<div class='kachelsubmit' id='btn-new-observation'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;add observation</div>");
                for (item in data) {
                    if (data[item].f === THISFEATURE) {
                        let observations = data[item].observations;
                        for (obs in observations) {
                            if (observations[obs].observationtype === "ars:Statement") {
                                $("#mod-observation-list").append("<div class='featurekacheln select' id='" + observations[obs].observation + "'>" + observations[obs].observationlabel + " (Statement)</div>");
                                $("#mod-observation-list").append("<div class='featurekacheleditit' id='" + observations[obs].observation + "-delete' onclick='RDF4J.deleteObservation(\"" + THISFEATURE + "\", \"" + observations[obs].observation + "\");'><b><i class='fa fa-trash' aria-hidden='true'></i> delete</b></div>");
                                //$("#mod-observation-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "-asd' onclick=''><i>" + "Statement > " + observations[obs].observationtype + "</i></div>");
                                //console.log(observations[obs].observationtype, observations[obs].observationtypelabel, observations[obs].ac);
                                $("#mod-observation-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "-asd' onclick=''><i>" + "Statement > " + observations[obs].ac[0] + "</i></div>");
                            } else {
                                $("#mod-observation-list").append("<div class='featurekacheln select' id='" + observations[obs].observation + "'>" + observations[obs].observationlabel + " (Observation)</div>");
                                $("#mod-observation-list").append("<div class='featurekacheleditit' id='" + observations[obs].observation + "-delete' onclick='RDF4J.deleteObservation(\"" + THISFEATURE + "\", \"" + observations[obs].observation + "\");'><b><i class='fa fa-trash' aria-hidden='true'></i> delete</b></div>");
                                //console.log(observations[obs].observationtype, observations[obs].observationtypelabel, observations[obs].ac);
                                let ac = "";
                                for (iii in observations[obs].ac) {
                                    ac += observations[obs].ac[iii] + ", ";
                                }
                                ac = ac.substring(0, ac.length - 2);
                                if (ac != "") {
                                    ac = " > " + ac;
                                }
                                $("#mod-observation-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "-asd' onclick=''><i>" + observations[obs].observationtypelabel + ac + "</i></div>");
                            }
                        }
                    }
                }
                let modal = document.getElementById('modalNewObservation');
                let btn = document.getElementById("btn-new-observation");
                btn.onclick = function() {
                    modal.style.display = "block";
                    $("#inp-new-observation-name").val("");
                    $("#btn-new-observation-individual").text("");
                    $("#btn-new-observation-individual").append("<i class='fa fa-plus' aria-hidden='true'></i>&nbsp;choose item class");
                    $("#btn-new-observation-individual").removeClass("dashboardkachelnobservationnewsel");
                    $("#btn-new-observation-individual").addClass("kachelsubmit");
                    deleteItemActivities();
                    deleteItemConditions();
                }
                $("#btn-modal-new-observation-close").click(function() {
                    modal.style.display = "none";
                });
            }
        });

    }
    $("#btn-modal-observations-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-features-modal").trigger("click");
    });
};

let initModalItems = () => {
    let modal = document.getElementById('modalItemClasses');
    let btn = document.getElementById("btn-new-observation-individual");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/observationclasses",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-class-list").empty();
                $("#mod-item-class-list").append("<div class='dashboardkachelnitemstatement' id='" + "btn-itemstatementtypes" + "' onclick='openStatementClassesModal(\"" + "FEATURE" + "\");'>" + "Statement" + "</div>");
                for (item in data) {
                    $("#mod-item-class-list").append("<div class='dashboardkachelnitem' id='" + data[item].s + "' onclick='searchIndividuals(\"" + data[item].s + "\");'>" + data[item].label + "</div>");
                }
            }
        });
    }
    $("#btn-modal-item-class-close").click(function() {
        modal.style.display = "none";
    });
};

let initModalIndividuals = () => {
    let modal = document.getElementById('modalItemIndividuals');
    let btn = document.getElementById("btn-itemindividuals");
    btn.onclick = function() {
        modal.style.display = "block";
    }
    $("#btn-modal-item-indiv-close").click(function() {
        modal.style.display = "none";
    });
};

let initModalActivities = () => {
    let modal = document.getElementById('modalItemActivities');
    let btn = document.getElementById("btn-new-observation-activity");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/activities",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalActivities", data);
                $("#inp-qs-activity").val("");
                $("#mod-item-activity-list").empty();
                $("#mod-item-activity-list").append("<div class='kachelsubmit' id='btn-new-item-activity' onclick=''><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new activity</div>");
                for (item in data) {
                    $("#mod-item-activity-list").append("<div class='kachelnactivitycondition' id='" + data[item].a + "' onclick='setItemActivity(\"" + data[item].label + "\",\"" + data[item].a + "\");$(\"#btn-modal-item-activity-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-activity-list").append("<div class='featurekacheleditit' id='" + data[item].a + "-edit' onclick='openActivityEditModal(\"" + data[item].a + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                let modal = document.getElementById('modalNewActivity');
                let btn = document.getElementById("btn-new-item-activity");
                btn.onclick = function() {
                    $("#inp-new-activity").val("");
                    modal.style.display = "block";
                }
                $("#btn-modal-new-activity-close").click(function() {
                    modal.style.display = "none";
                });
            }
        });
    }
    $("#btn-modal-item-activity-close").click(function() {
        modal.style.display = "none";
    });
};

$("#btn-submit-activity").click(function() {
    let label = $("#inp-new-activity").val();
    let ok = true;
    if (label === "") {
        showNotification('error', 'Error!', 'The activity name cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createActivity(label, console.log);
    }
});

let reloadModalNewActivity = () => {
    let modal = document.getElementById('modalNewActivity');
    let btn = document.getElementById("btn-new-item-activity");
    btn.onclick = function() {
        $("#inp-new-activity").val("");
        modal.style.display = "block";
    }
    $("#btn-new-item-activity").trigger("click");
};

let initModalConditions = () => {
    let modal = document.getElementById('modalItemConditions');
    let btn = document.getElementById("btn-new-observation-condition");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/conditions",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalConditions", data);
                $("#inp-qs-condition").val("");
                $("#mod-item-condition-list").empty();
                $("#mod-item-condition-list").append("<div class='kachelsubmit' id='btn-new-item-condition' onclick=''><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new condition</div>");
                for (item in data) {
                    $("#mod-item-condition-list").append("<div class='kachelnactivitycondition' id='" + data[item].c + "' onclick='setItemCondition(\"" + data[item].label + "\",\"" + data[item].c + "\");$(\"#btn-modal-item-condition-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-condition-list").append("<div class='featurekacheleditit' id='" + data[item].c + "-edit' onclick='openConditionEditModal(\"" + data[item].c + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                let modal = document.getElementById('modalNewCondition');
                let btn = document.getElementById("btn-new-item-condition");
                btn.onclick = function() {
                    $("#inp-new-condition").val("");
                    modal.style.display = "block";
                }
                $("#btn-modal-new-condition-close").click(function() {
                    modal.style.display = "none";
                });
            }
        });
    }
    $("#btn-modal-item-condition-close").click(function() {
        modal.style.display = "none";
    });
};

$("#btn-submit-condition").click(function() {
    let label = $("#inp-new-condition").val();
    let ok = true;
    if (label === "") {
        showNotification('error', 'Error!', 'The condition name cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.createCondition(label, console.log);
    }
});

let reloadModalNewCondition = () => {
    let modal = document.getElementById('modalNewCondition');
    let btn = document.getElementById("btn-new-item-condition");
    btn.onclick = function() {
        $("#inp-new-condition").val("");
        modal.style.display = "block";
    }
    $("#btn-new-item-condition").trigger("click");
};

let reloadModalNewIndividual = () => {
    let modal = document.getElementById('modalNewItemIndividual');
    let btn = document.getElementById("btn-new-item-individual");
    btn.onclick = function() {
        $("#inp-new-ii").val("");
        $("#inp-new-ii-meta").val("");
        modal.style.display = "block";
    }
    $("#btn-new-item-individual").trigger("click");
};

let initModalFeaturesOverview = () => {
    let modal = document.getElementById('modalFeaturesOverview');
    let btn = document.getElementById("btn-open-features-modal");
    $("#mod-features-overview-list").empty();
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-features-overview-list").empty();
                for (item in data) {
                    $("#mod-features-overview-list").append("<div class='featurekacheln' id='" + data[item].f + "' onclick='showFeature(\"" + data[item].f + "\");'>" + data[item].label + "</div>");
                    $("#mod-features-overview-list").append("<div class='kachelinfo' id='" + data[item].f + "-info1' onclick='' style='margin-top:-8px;'><b>feature is related to " + data[item].relatedto.length + " feature(s) and described with " + data[item].observations.length + " observations(s)</b></div>");
                    let manu = "";
                    if (data[item].manufacturinglabel !== "") {
                        manu = ", " + data[item].manufacturinglabel;
                    }
                    $("#mod-features-overview-list").append("<div class='kachelinfo' id='" + data[item].f + "-info2' onclick=''><b>&raquo;" + data[item].typelabel + "&laquo;" + manu + "</b></div>");
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
                            $("#mod-features-overview-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>Statement " + ac + "</i></div>");
                        } else {
                            $("#mod-features-overview-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>" + observations[obs].observationtypelabel + ac + "</i></div>");
                        }
                    }
                }
            }
        });
    }
    $("#btn-modal-features-overview-close").click(function() {
        modal.style.display = "none";
    });
};

let openObservationModal = (feature) => {
    console.log(feature);
    THISFEATURE = feature;

    $("#btn-modal-features-overview-close").trigger("click");
    initModalObservations();
    $("#btn-modal-open-oe").trigger("click");
};

let openGeometryProcessModal = (feature) => {
    console.log(feature);
    THISFEATURE = feature;
    initModalGeometryProcess();
    $("#btn-modal-open-gp").trigger("click");
};

let openFeatureEditModal = (feature) => {
    console.log(feature);
    THISFEATURE = feature;
    $("#btn-modal-features-overview-close").trigger("click");
    initModalFeatureEdit();
    $("#btn-modal-open-feature-edit").trigger("click");
};

// INIT
initModalObservations();
initModalItems();
initModalIndividuals();
initModalFeatureName();
initModalActivities();
initModalConditions();
initModalFeaturesOverview();
initModalGeometryProcess();
initModalFeatureEdit();

$(document).on("click", "input[type='text']", function() {
    $(this).focus();
});

let searchIndividuals = (classURL) => {
    console.log("searchIndividuals", classURL);
    THISITEMCLASS = classURL;
    $.ajax({
        type: "GET",
        url: API.BASE + "/fixedvalues/observationclassitems?oc=" + classURL,
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            $("#inp-qs-oci").val("");
            $("#mod-item-indiv-list").empty();
            $("#mod-item-indiv-list").append("<div class='kachelsubmit' id='btn-new-item-individual'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new item individual</div>");
            for (item in data) {
                $("#mod-item-indiv-list").append("<div class='kachelitemclass' id='" + data[item].i + "' onclick='setItemClass(\"" + data[item].label + "\",\"" + data[item].i + "\",\"Item\");$(\"#btn-modal-item-indiv-close\").click();$(\"#btn-modal-item-class-close\").click();'>" + data[item].label + "</div>");
                $("#mod-item-indiv-list").append("<div class='featurekacheleditit' id='" + data[item].i + "-edit' onclick='openItemEditModal(\"" + data[item].i + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
            }
            $("#btn-itemindividuals").trigger("click");
            let modal = document.getElementById('modalNewItemIndividual');
            let btn = document.getElementById("btn-new-item-individual");
            btn.onclick = function() {
                $("#inp-new-ii").val("");
                $("#inp-new-ii-meta").val("");
                modal.style.display = "block";
            }
            $("#btn-modal-new-ii-close").click(function() {
                modal.style.display = "none";
            });
        }
    });
};

let searchStatementTypes = () => {
    console.log("searchStatementTypes");
    $.ajax({
        type: "GET",
        url: API.BASE + "/fixedvalues/statementfeatureclasses",
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            $("#inp-qs-sclass").val("");
            $("#mod-item-sclass-list").empty();
            for (item in data) {
                $("#mod-item-sclass-list").append("<div class='dashboardkachelnitemstatement sclass' id='" + data[item].s + "' onclick='searchStatementIndividuals(\"" + data[item].s + "\");'>" + data[item].label + "</div>");
            }
            let modal = document.getElementById('modalItemStatementIndividuals');
            $("#btn-modal-item-sindiv-close").click(function() {
                modal.style.display = "none";
            });
            $(".sclass").each(function(index) {
                $(this).click(function() {
                    modal.style.display = "block";
                });
            });
        }
    });
};

let searchStatementIndividuals = (classURL) => {
    console.log("searchStatementIndividuals", classURL);
    THISITEMCLASS = classURL;
    $.ajax({
        type: "GET",
        url: API.BASE + "/fixedvalues/statementfeatureinstances?indiv=" + classURL,
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            $("#inp-qs-sindiv").val("");
            $("#mod-item-sindiv-list").empty();
            $("#mod-item-sindiv-list").append("<div class='dashboardkachelnitemnew' id='btn-new-item-individual' onclick=''><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new individual</div>");
            for (item in data) {
                $("#mod-item-sindiv-list").append("<div class='dashboardkachelnitemstatement' id='" + data[item].s + "' onclick='setItemClass(\"" + data[item].label + "\",\"" + data[item].s + "\",\"Statement\");$(\"#btn-modal-item-sindiv-close\").click();$(\"#btn-modal-item-sclass-close\").click();$(\"#btn-modal-item-class-close\").click();'>" + data[item].label + "</div>");
            }
        }
    });
};

$("#btn-submit-ii").click(function() {
    let label = $("#inp-new-ii").val();
    let meta = $("#inp-new-ii-meta").val();
    let ok = true;
    if (label === "") {
        showNotification('error', 'Error!', 'The individual name cannot be empty!');
        ok = false;
    }
    if (meta === "") {
        showNotification('error', 'Error!', 'The meta reference cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.createItemIndividual(THISITEMCLASS, label, meta, console.log);
    }
});

let setItemClass = (label, i, statement) => {
    console.log("setItemClass", label, i, statement);
    $("#btn-new-observation-individual").text(label);
    $("#btn-new-observation-individual").attr('url', i);
    $("#btn-new-observation-individual").attr('statement', statement);
    $("#btn-new-observation-individual").removeClass("kachelsubmit");
    $("#btn-new-observation-individual").addClass("dashboardkachelnobservationnewsel");
    OBSERVATIONTYPE = i;
};

let setItemActivity = (label, a) => {
    let tmp = {};
    tmp.label = label;
    tmp.uri = a;
    ACTIVITIES.push(tmp);
    $("#mod-activity-list").empty();
    for (item in ACTIVITIES) {
        $("#mod-activity-list").append("<div class='dashboardkachelnobservation' id='" + ACTIVITIES[item].uri + "' ondblclick='deleteItemActivity(\"" + ACTIVITIES[item].label + "\",\"" + ACTIVITIES[item].uri + "\")'>" + ACTIVITIES[item].label + "</div>");
    }
};

let deleteItemActivity = (label, uri) => {
    let removeIndex = ACTIVITIES.map(function(item) {
        return item.uri;
    }).indexOf(uri);
    ACTIVITIES.splice(removeIndex, 1);
    $("#mod-activity-list").empty();
    for (item in ACTIVITIES) {
        $("#mod-activity-list").append("<div class='dashboardkachelnobservation' id='" + ACTIVITIES[item].uri + "' ondblclick='deleteItemActivity(\"" + ACTIVITIES[item].label + "\",\"" + ACTIVITIES[item].uri + "\")'>" + ACTIVITIES[item].label + "</div>");
    }
};

let deleteItemActivities = () => {
    ACTIVITIES = [];
    $("#mod-activity-list").empty();
    for (item in ACTIVITIES) {
        $("#mod-activity-list").append("<div class='dashboardkachelnobservation' id='" + ACTIVITIES[item].uri + "' ondblclick='deleteItemActivity(\"" + ACTIVITIES[item].label + "\",\"" + ACTIVITIES[item].uri + "\")'>" + ACTIVITIES[item].label + "</div>");
    }
};

let setItemCondition = (label, c) => {
    let tmp = {};
    tmp.label = label;
    tmp.uri = c;
    CONDITIONS.push(tmp);
    $("#mod-condition-list").empty();
    for (item in CONDITIONS) {
        $("#mod-condition-list").append("<div class='dashboardkachelnobservation' id='" + CONDITIONS[item].uri + "' ondblclick='deleteItemCondition(\"" + CONDITIONS[item].label + "\",\"" + CONDITIONS[item].uri + "\")'>" + CONDITIONS[item].label + "</div>");
    }
};

let deleteItemCondition = (label, uri) => {
    let removeIndex = CONDITIONS.map(function(item) {
        return item.uri;
    }).indexOf(uri);
    CONDITIONS.splice(removeIndex, 1);
    $("#mod-condition-list").empty();
    for (item in CONDITIONS) {
        $("#mod-condition-list").append("<div class='dashboardkachelnobservation' id='" + CONDITIONS[item].uri + "' ondblclick='deleteItemCondition(\"" + CONDITIONS[item].label + "\",\"" + CONDITIONS[item].uri + "\")'>" + CONDITIONS[item].label + "</div>");
    }
};

let deleteItemConditions = () => {
    CONDITIONS = [];
    $("#mod-condition-list").empty();
    for (item in CONDITIONS) {
        $("#mod-condition-list").append("<div class='dashboardkachelnobservation' id='" + CONDITIONS[item].uri + "' ondblclick='deleteItemActivity(\"" + CONDITIONS[item].label + "\",\"" + CONDITIONS[item].uri + "\")'>" + CONDITIONS[item].label + "</div>");
    }
};

let selectft = (type) => {
    FEATURETYPE = type;
    console.log("selected feature type", type);
    $('.ft').each(function(i, obj) {
        $(this).removeClass("kachelfeaturetypeselected");
        $(this).addClass("kachelfeaturetype");
        if ($(this).attr('id') === FEATURETYPE) {
            $(this).removeClass("kachelfeaturetype");
            $(this).addClass("kachelfeaturetypeselected");
        }
    });
};

writeGeomprocessTriples = (obj) => {
    RDF4J.createFeature(obj.feature.object, obj.feature.id, obj.feature.label, obj.process.status, obj.process.id, obj.segmentation.polygon, obj.feature.type);
}

$('#btn-new-observation-submit').on('click', (event) => {
    let ok = true;
    let observationName = $("#inp-new-observation-name").val();
    if (OBSERVATIONTYPE === "") {
        showNotification('error', 'Error!', 'The item class cannot be undefinded!');
        ok = false;
    }
    if (observationName === "") {
        showNotification('error', 'Error!', 'The observation name cannot be empty!');
        ok = false;
    }
    if (ok) {
        if ($("#btn-new-observation-individual").attr('statement') !== "Statement") {
            RDF4J.createObservation(OBSERVATIONTYPE, observationName, ACTIVITIES, CONDITIONS, THISFEATURE, console.log);
        } else {
            RDF4J.createObservationStatement(OBSERVATIONTYPE, observationName, ACTIVITIES, CONDITIONS, THISFEATURE, console.log);
        }
    }
});

$('#btn-new-scene-submit').on('click', (event) => {
    let ok = true;
    let sceneName = $("#inp-new-scene-name").val();
    if (sceneName === "") {
        showNotification('error', 'Error!', 'The scene name cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.createScene(THISOBJECT, sceneName, console.log)
    }
});

$("#inp-qs-activity").keyup(function() {
    if ($("#inp-qs-activity").val() !== "") {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/activities?q=" + $("#inp-qs-activity").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-activity-list").empty();
                $("#mod-item-activity-list").append("<div class='kachelsubmit' id='btn-new-item-activity' onclick='reloadModalNewActivity();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new activity</div>");
                for (item in data) {
                    $("#mod-item-activity-list").append("<div class='kachelnactivitycondition' id='" + data[item].a + "' onclick='setItemActivity(\"" + data[item].label + "\",\"" + data[item].a + "\");$(\"#btn-modal-item-activity-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-activity-list").append("<div class='featurekacheleditit' id='" + data[item].a + "-edit' onclick='openActivityEditModal(\"" + data[item].a + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/activities",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-activity-list").empty();
                $("#mod-item-activity-list").append("<div class='kachelsubmit' id='btn-new-item-activity' onclick='reloadModalNewActivity();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new activity</div>");
                for (item in data) {
                    $("#mod-item-activity-list").append("<div class='kachelnactivitycondition' id='" + data[item].a + "' onclick='setItemActivity(\"" + data[item].label + "\",\"" + data[item].a + "\");$(\"#btn-modal-item-activity-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-activity-list").append("<div class='featurekacheleditit' id='" + data[item].a + "-edit' onclick='openActivityEditModal(\"" + data[item].a + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    }
});

$("#inp-qs-condition").keyup(function() {
    if ($("#inp-qs-condition").val() !== "") {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/conditions?q=" + $("#inp-qs-condition").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-condition-list").empty();
                $("#mod-item-condition-list").append("<div class='kachelsubmit' id='btn-new-item-condition' onclick='reloadModalNewCondition();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new condition</div>");
                for (item in data) {
                    $("#mod-item-condition-list").append("<div class='kachelnactivitycondition' id='" + data[item].c + "' onclick='setItemCondition(\"" + data[item].label + "\",\"" + data[item].c + "\");$(\"#btn-modal-item-condition-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-condition-list").append("<div class='featurekacheleditit' id='" + data[item].c + "-edit' onclick='openConditionEditModal(\"" + data[item].c + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/conditions",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-condition-list").empty();
                $("#mod-item-condition-list").append("<div class='kachelsubmit' id='btn-new-item-condition' onclick='reloadModalNewCondition();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new condition</div>");
                for (item in data) {
                    $("#mod-item-condition-list").append("<div class='kachelnactivitycondition' id='" + data[item].c + "' onclick='setItemCondition(\"" + data[item].label + "\",\"" + data[item].c + "\");$(\"#btn-modal-item-condition-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-condition-list").append("<div class='featurekacheleditit' id='" + data[item].c + "-edit' onclick='openConditionEditModal(\"" + data[item].c + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    }
});

$("#inp-qs-oc").keyup(function() {
    if ($("#inp-qs-oc").val() !== "") {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/observationclasses?q=" + $("#inp-qs-oc").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-class-list").empty();
                for (item in data) {
                    $("#mod-item-class-list").append("<div class='dashboardkachelnitem' id='" + data[item].s + "' onclick='searchIndividuals(\"" + data[item].s + "\");'>" + data[item].label + "</div>");
                }
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/observationclasses",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-class-list").empty();
                $("#mod-item-class-list").append("<div class='dashboardkachelnitemstatement' id='" + "btn-itemstatementtypes" + "' onclick='openStatementClassesModal(\"" + "FEATURE" + "\");>" + "Statement" + "</div>");
                for (item in data) {
                    $("#mod-item-class-list").append("<div class='dashboardkachelnitem' id='" + data[item].s + "' onclick='searchIndividuals(\"" + data[item].s + "\");'>" + data[item].label + "</div>");
                }
            }
        });
    }
});

$("#inp-qs-oci").keyup(function() {
    if ($("#inp-qs-oci").val() !== "") {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/observationclassitems?oc=" + THISITEMCLASS + "&q=" + $("#inp-qs-oci").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-indiv-list").empty();
                $("#mod-item-indiv-list").append("<div class='kachelsubmit' id='btn-new-item-individual' onclick='reloadModalNewIndividual()'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new item individual</div>");
                for (item in data) {
                    $("#mod-item-indiv-list").append("<div class='kachelitemclass' id='" + data[item].i + "' onclick='setItemClass(\"" + data[item].label + "\",\"" + data[item].i + "\",\"Item\");$(\"#btn-modal-item-indiv-close\").click();$(\"#btn-modal-item-class-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-indiv-list").append("<div class='featurekacheleditit' id='" + data[item].i + "-edit' onclick='openItemEditModal(\"" + data[item].i + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/observationclassitems?oc=" + THISITEMCLASS + "",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-indiv-list").empty();
                $("#mod-item-indiv-list").append("<div class='kachelsubmit' id='btn-new-item-individual' onclick='reloadModalNewIndividual()'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new item individual</div>");
                for (item in data) {
                    $("#mod-item-indiv-list").append("<div class='kachelitemclass' id='" + data[item].i + "' onclick='setItemClass(\"" + data[item].label + "\",\"" + data[item].i + "\",\"Item\");$(\"#btn-modal-item-indiv-close\").click();$(\"#btn-modal-item-class-close\").click();'>" + data[item].label + "</div>");
                    $("#mod-item-indiv-list").append("<div class='featurekacheleditit' id='" + data[item].i + "-edit' onclick='openItemEditModal(\"" + data[item].i + "\")';><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    }
});
