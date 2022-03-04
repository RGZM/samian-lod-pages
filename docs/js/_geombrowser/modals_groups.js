// LOAD Feature Group Modal
let initModalFeatureGroupOverview = () => {
    let modal = document.getElementById('modalFeatureGroupOverview');
    let btn = document.getElementById("btn-open-featuregroup-modal");
    $("#mod-featuregroup-overview-list").empty();
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            async: false,
            url: API.BASE + "/features?type=featuregroup&q=" + THISOBJECT,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalFeatureGroupOverview", data);
                $("#mod-featuregroup-overview-list").empty();
                for (item in data) {
                    $.ajax({
                        type: "GET",
                        async: false,
                        url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
                        error: function(jqXHR, textStatus, errorThrown) {},
                        success: function(data2) {
                            console.log("initModalFeatureGroupOverview-features", data2);
                            let relatedFeatures = [];
                            relatedFeatures = data[item].relatedto;
                            let connectedFeatureGroups = [];
                            connectedFeatureGroups = data[item].connectedto;
                            let statements = [];
                            statements = data[item].statements;
                            $("#mod-featuregroup-overview-list").append("<div class='featurekacheln' id='" + data[item].id + "' onclick='showFeatures(\"" + data[item].id + "\", \"" + "featuregroup" + "\");'>" + data[item].label + "</div>");
                            $("#mod-featuregroup-overview-list").append("<div class='kachelinfo' id='" + data[item].id + "-info1' style='margin-top:-8px;'><b>contains " + data[item].relatedto.length + " feature(s) and " + data[item].connectedto.length + " group relation(s) and " + data[item].statements.length + " statement(s)</b></div>");
                            for (i in data2) {
                                for (f in relatedFeatures) {
                                    if (relatedFeatures[f] === data2[i].f) {
                                        $("#mod-featuregroup-overview-list").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-feature'><b>Feature > " + data2[i].label + "</b></div>");
                                    }
                                }
                            }
                            for (ii in data) {
                                for (fg in connectedFeatureGroups) {
                                    if (connectedFeatureGroups[fg] === data[ii].id) {
                                        $("#mod-featuregroup-overview-list").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-fg'><b>Group > " + data[ii].label + "</b></div>");
                                    }
                                }
                            }
                            for (s in statements) {
                                $("#mod-featuregroup-overview-list").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-statement'><b>Statement > " + statements[s].label + "</b></div>");
                            }
                        }
                    });
                }
                // modal for new feature group
                let modal2 = document.getElementById('modalNewFeatureGroup');
                let btn2 = document.getElementById("btn-new-featuregroup");
                btn2.onclick = function() {
                    modal.style.display = "none";
                    modal2.style.display = "block";
                    $("#inp-new-featuregroup-name").val("");
                }
                $("#btn-modal-new-featuregroup-close").click(function() {
                    modal2.style.display = "none";
                    modal.style.display = "block";
                });
            }
        });
    }
    $("#btn-modal-featuregroup-overview-close").click(function() {
        modal.style.display = "none";
    });
};

// new feature group
$('#btn-new-featuregroup-submit').on('click', (event) => {
    let ok = true;
    let featureGroupName = $("#inp-new-featuregroup-name").val();
    if (featureGroupName === "") {
        showNotification('error', 'Error!', 'The featuregroup name cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(featureGroupName) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createFeatureGroup(THISOBJECT, featureGroupName, console.log)
    }
});

// Feature Group Edit
let initModalFeatureGroupEdit = () => {
    let modal = document.getElementById('modalFeatureGroupEdit');
    let btn = document.getElementById("btn-modal-open-featuregroup-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=featuregroup&q=" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(featuredata) {
                console.log(featuredata, THISFEATUREGROUP);
                $("#inp-edit-featuregroup-name").empty();
                for (obj in featuredata) {
                    if (featuredata[obj].id == THISFEATUREGROUP) {
                        $("#inp-edit-featuregroup-name").val(featuredata[obj].label);
                    }
                }
            }
        });
    }
    $("#btn-modal-edit-featuregroup-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-featuregroup-modal").trigger("click");
    });
};

let openFeatureGroupEditModal = (featuregroup) => {
    console.log(featuregroup);
    THISFEATUREGROUP = featuregroup;
    $("#btn-modal-featuregroup-overview-close").trigger("click");
    $("#btn-modal-open-featuregroup-edit").trigger("click");
};

$('#btn-edit-featuregroup-submit').on('click', (event) => {
    let ok = true;
    let featureGroupName = $("#inp-edit-featuregroup-name").val();
    if (featureGroupName === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.updateFeatureGroup(THISFEATUREGROUP, $("#inp-edit-featuregroup-name").val());
    }
});

// Feature Group Relations Edit
let initModalFeatureGroupRelationsEdit = () => {
    let modal = document.getElementById('modalFeatureGroupRelationsEdit');
    let btn = document.getElementById("btn-modal-open-relationsedit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#feature-list-relations-group").empty();
                $("#feature-list-relations-group").append("<div class='kachelsubmit' id='btn-save-featuregroup-relations'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                for (item in data) {
                    $("#feature-list-relations-group").append("<div class='featurekacheln select' id='" + data[item].f + "' onclick='selectFeatureInFG(\"" + data[item].f + "\");'>" + data[item].label + "</div>");
                    $("#feature-list-relations-group").append("<div class='kachelinfo2' id='" + data[item].f + "-fcount' onclick=''><b>&raquo;" + data[item].typelabel + "&laquo; described with " + data[item].observations.length + " observations(s)</b></div>");
                    let observations = data[item].observations;
                    console.log(observations);
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
                            $("#feature-list-relations-group").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>Statement " + ac + "</i></div>");
                        } else {
                            $("#feature-list-relations-group").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>" + observations[obs].observationtypelabel + ac + "</i></div>");
                        }
                    }
                }
                $("#btn-save-featuregroup-relations").click(function() {
                    RDF4J.updateFeatureGroupRelationsFeatures(THISFEATUREGROUP, THISFEATUREGROUPSELECTIONS);
                });
                selectFeatureInFGfromStore();
            }
        });
    }
    $("#btn-modal-featuregroup-relationsedit-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-featuregroup-modal").trigger("click");
    });
};

let openFeatureGroupRelationsEditModal = (featuregroup) => {
    console.log(featuregroup);
    THISFEATUREGROUP = featuregroup;
    $("#btn-modal-featuregroup-overview-close").trigger("click");
    $("#btn-modal-open-relationsedit").trigger("click");
};

let selectFeatureInFGfromStore = () => {
    THISFEATUREGROUPSELECTIONS = [];
    $('.select').each(function(i, obj) {
        $(this).addClass("kachelfeaturenotselected");
        $(this).removeClass("kachelfeatureselected");
    });
    $.ajax({
        type: "GET",
        url: API.BASE + "/features?type=featuregroup&q=" + THISOBJECT + "&fg=" + THISFEATUREGROUP,
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log(data);
            let relF = data.relatedto;
            for (i in relF) {
                console.log(relF[i]);
                THISFEATUREGROUPSELECTIONS.push(relF[i]);
                $("#" + relF[i].replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + relF[i].replace(":", "\\:")).addClass("kachelfeatureselected");
            }
            console.log(THISFEATUREGROUPSELECTIONS);
        }
    });
};

let selectFeatureInFG = (feature) => {
    let match = false;
    for (item in THISFEATUREGROUPSELECTIONS) {
        if (THISFEATUREGROUPSELECTIONS[item] == feature) {
            match = true;
        }
    }
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === feature) {
            if (match === true) {
                let index = THISFEATUREGROUPSELECTIONS.indexOf(feature);
                if (index > -1) {
                    THISFEATUREGROUPSELECTIONS.splice(index, 1);
                }
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (feature !== "null") {
                    THISFEATUREGROUPSELECTIONS.push(feature);
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        }
    });
    let uniqueFG = [];
    $.each(THISFEATUREGROUPSELECTIONS, function(i, el) {
        if ($.inArray(el, uniqueFG) === -1) uniqueFG.push(el);
    });
    THISFEATUREGROUPSELECTIONS = uniqueFG;
    console.log(THISFEATUREGROUPSELECTIONS);
};

// Feature Group Relations Edit (between Feature Groups)
let initModalFeatureGroupRelationsEdit2 = () => {
    let modal = document.getElementById('modalFeatureGroupRelationsEdit2');
    let btn = document.getElementById("btn-modal-open-relationsedit2");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=featuregroup&q=" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $.ajax({
                    type: "GET",
                    url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
                    async: false,
                    error: function(jqXHR, textStatus, errorThrown) {},
                    success: function(data2) {
                        $("#feature-list-relations-group2").empty();
                        $("#feature-list-relations-group2").append("<div class='kachelsubmit' id='btn-save-featuregroup-relations2'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                        for (item in data) {
                            $("#feature-list-relations-group2").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectFGInFG(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                            let relatedFeatures = [];
                            relatedFeatures = data[item].relatedto;
                            let connectedFeatureGroups = [];
                            connectedFeatureGroups = data[item].connectedto;
                            let statements = [];
                            statements = data[item].statements;
                            $("#feature-list-relations-group2").append("<div class='kachelinfo2' id='" + data[item].id + "-fcount' onclick=''><b>contains " + data[item].relatedto.length + " feature(s) and " + data[item].connectedto.length + " group relation(s) and " + data[item].statements.length + " statement(s)</b></div>");
                            console.log(data, relatedFeatures);
                            for (i in data2) {
                                for (f in relatedFeatures) {
                                    if (relatedFeatures[f] === data2[i].f) {
                                        $("#feature-list-relations-group2").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-feature'><b>Feature > " + data2[i].label + "</b></div>");
                                    }
                                }
                            }
                            for (ii in data) {
                                for (fg in connectedFeatureGroups) {
                                    if (connectedFeatureGroups[fg] === data[ii].id) {
                                        $("#feature-list-relations-group2").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-fg'><b>Group > " + data[ii].label + "</b></div>");
                                    }
                                }
                            }
                            for (s in statements) {
                                $("#feature-list-relations-group2").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-statement'><b>Statement > " + statements[s].label + "</b></div>");
                            }
                        }
                        $("#btn-save-featuregroup-relations2").click(function() {
                            RDF4J.updateFeatureGroupRelationsFeatureGroups(THISFEATUREGROUP, THISFEATUREGROUPFGSELECTIONS);
                        });
                        selectFGInFGfromStore();
                    }
                });
            }
        });
    }
    $("#btn-modal-featuregroup-relationsedit2-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-featuregroup-modal").trigger("click");
    });
};

let openFeatureGroupRelationsEditModal2 = (featuregroup) => {
    console.log(featuregroup);
    THISFEATUREGROUP = featuregroup;
    $("#btn-modal-featuregroup-overview-close").trigger("click");
    $("#btn-modal-open-relationsedit2").trigger("click");
};

let selectFGInFGfromStore = () => {
    THISFEATUREGROUPSELECTIONS = [];
    $('.select').each(function(i, obj) {
        $(this).addClass("kachelfeaturenotselected");
        $(this).removeClass("kachelfeatureselected");
    });
    $.ajax({
        type: "GET",
        url: API.BASE + "/features?type=featuregroup&q=" + THISOBJECT + "&fg=" + THISFEATUREGROUP,
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log(data);
            let conFG = data.connectedto;
            for (i in conFG) {
                console.log(conFG[i]);
                THISFEATUREGROUPFGSELECTIONS.push(conFG[i]);
                $("#" + conFG[i].replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + conFG[i].replace(":", "\\:")).addClass("kachelfeatureselected");
            }
            console.log(THISFEATUREGROUPFGSELECTIONS);
        }
    });
};

let selectFGInFG = (featuregroup) => {
    console.log(featuregroup);
    let match = false;
    for (item in THISFEATUREGROUPFGSELECTIONS) {
        if (THISFEATUREGROUPFGSELECTIONS[item] == featuregroup) {
            match = true;
        }
    }
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === featuregroup) {
            if (match === true) {
                let index = THISFEATUREGROUPFGSELECTIONS.indexOf(featuregroup);
                if (index > -1) {
                    THISFEATUREGROUPFGSELECTIONS.splice(index, 1);
                }
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (featuregroup !== "null") {
                    THISFEATUREGROUPFGSELECTIONS.push(featuregroup);
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        }
    });
    let uniqueFG = [];
    $.each(THISFEATUREGROUPFGSELECTIONS, function(i, el) {
        if ($.inArray(el, uniqueFG) === -1) uniqueFG.push(el);
    });
    THISFEATUREGROUPFGSELECTIONS = uniqueFG;
    console.log(THISFEATUREGROUPFGSELECTIONS);
};

// Feature Group Statement Edit
let initModalFeatureGroupStatements = () => {
    let modal = document.getElementById('modalFeatureGroupStatements');
    let btn = document.getElementById("btn-modal-open-statements-fg");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=featuregroup&q=" + THISOBJECT + "&fg=" + THISFEATUREGROUP,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalFeatureGroupStatements", data);
                $("#featuregroup-list-statements").empty();
                $("#featuregroup-list-statements").append("<div class='kachelsubmit' id='btn-add-featuregroup-statement' onclick='openStatementClassesModal(\"" + "FEATUREGROUP" + "\");'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;add statement to group</div>");
                for (item in data.statements) {
                    $("#featuregroup-list-statements").append("<div class='featurekacheln select' id='" + data.statements[item].id + "'>" + data.statements[item].label + "</div>");
                    $("#featuregroup-list-statements").append("<div class='featurekacheleditit' id='" + data.statements[item].id + "-delete' onclick='RDF4J.deleteStatementFromFeatureGroup(\"" + THISFEATUREGROUP + "\", \"" + data.statements[item].id + "\");'><b><i class='fa fa-trash' aria-hidden='true'></i> delete</b></div>");
                }
            }
        });
    }
    $("#btn-modal-featuregroup-statements-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-featuregroup-overview-close").trigger("click");
        $("#btn-open-featuregroup-modal").trigger("click");
    });
};

let openFeatureGroupStatementsModal = (featuregroup) => {
    console.log("openFeatureGroupStatementsModal", featuregroup);
    THISFEATUREGROUP = featuregroup;
    //$("#btn-modal-featuregroup-overview-close").trigger("click");
    $("#btn-modal-open-statements-fg").trigger("click");
};

// INIT
initModalFeatureGroupOverview();
initModalFeatureGroupStatements();
initModalFeatureGroupEdit();
initModalFeatureGroupRelationsEdit();
initModalFeatureGroupRelationsEdit2();
