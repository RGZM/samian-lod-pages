let initModalObjectInfo = () => {
    let modal = document.getElementById('modalObjectInfo');
    let btn = document.getElementById("btn-info-object");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/objects/" + THISOBJECT + "?mode=label",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $.ajax({
                    type: "GET",
                    url: API.BASE + "/objects/" + THISOBJECT,
                    async: false,
                    error: function(jqXHR, textStatus, errorThrown) {},
                    success: function(data2) {
                        console.log("initModalObjectInfo", data, data2);
                        let style = "";
                        $("#object-info-list").empty();
                        // unique identifier
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-uuid-what'><b>unique identifier</b></div>");
                        $("#object-info-list").append("<div class='kachelobjectinfo' id='btn-object-info-uuid'>" + data.uri.replace("http://java-dev.rgzm.de/ars/objects/", "") + "</div>");
                        // label
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-label-what'><b>label</b></div>");
                        $("#object-info-list").append("<div class='kachelobjectinfo' id='btn-object-info-label'>" + data.label + "</div>");
                        // inventory number
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-inventory-what'><b>inventory number</b></div>");
                        $("#object-info-list").append("<div class='kachelobjectinfo' id='btn-object-info-inventory'>" + data.id + "</div>");
                        // thumbnail
                        $("#object-info-list").append("<span><center><img src='img/obj/" + data.thumbnail + "' height='300' style='margin-top:20px;margin-bottom:20px;'></center></span>");
                        // type
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-type-what'><b>type</b></div>");
                        $("#object-info-list").append("<div class='kachelobjectinfo' id='btn-object-info-type'>" + data.type + "</div>");
                        // shape
                        if (typeof data.shape === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-shape-what'><b>shape</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-info-shape'>" + data.shape + "</div>");
                        // material
                        if (typeof data.material === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-material-what'><b>material</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-info-material'>" + data.material + "</div>");
                        // condition type
                        if (typeof data.condition_type === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-conditiontype-what'><b>condition type</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-info-conditiontype'>" + data.condition_type + "</div>");
                        // manufacturing type
                        if (typeof data.manufacturing_type === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-manufacturingtype-what'><b>manufacturing type</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-info-manufacturingtype'>" + data.manufacturing_type + "</div>");
                        // findspot
                        if (typeof data.findspot === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-findspot-what'><b>findspot</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-info-findspot'>" + data.findspot + "</div>");
                        // residence
                        if (typeof data.residence === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-residence-what'><b>residence</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-info-residence'>" + data.residence + "</div>");
                        // period
                        if (typeof data.period === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-period-what'><b>period</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-info-period'>" + data.period + " > " + data.date + "</div>");
                        // object group
                        let groupstring = "";
                        if (typeof data.group === 'undefined') {
                            style = "kachelobjectinfonotset";
                            groupstring = "no object group relation";
                        } else {
                            style = "kachelobjectinfo";
                            groupstring = data.group;
                        }
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-groups-what'><b>groups</b></div>");
                        $("#object-info-list").append("<div class='" + style + "' id='btn-object-edit-groups'>" + groupstring + "</div>");
                        // statements
                        $("#object-info-list").append("<div class='featurekacheleditlabel' id='btn-object-info-statements-what'><b>statements</b></div>");
                        if (data2.statements.length > 0) {
                            for (item in data2.statements) {
                                $("#object-info-list").append("<div class='" + "kachelobjectinfo" + "' id='" + data2.statements[item].id + "'>" + data2.statements[item].cn + " > " + data2.statements[item].comment + "</div>");
                            }
                        } else {
                            $("#object-info-list").append("<div class='" + "kachelobjectinfonotset" + "' id='btn-object-edit-statement-empty'>" + "no statement" + "</div>");
                        }
                        // features
                        $.ajax({
                            type: "GET",
                            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
                            error: function(jqXHR, textStatus, errorThrown) {},
                            success: function(data) {
                                $("#object-info-list").append("<div class='featurekacheleditlabel2' style='margin-bottom:-8px !important;' id='btn-object-info-period-what'><b>features</b></div>");
                                for (item in data) {
                                    $("#object-info-list").append("<div class='" + "kachelobjectinfo" + "' id='" + data[item].f + "'>" + data[item].label + "</div>");
                                    $("#object-info-list").append("<div class='kachelinfoindividual' style='margin-top:-8px !important;' id='" + data[item].f + "-fcount' onclick=''><b>&raquo;" + data[item].typelabel + "&laquo; related to " + data[item].relatedto.length + " feature(s) and described with " + data[item].observations.length + " observations(s)</b></div>");
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
                                            $("#object-info-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>Statement " + ac + "</i></div>");
                                        } else {
                                            $("#object-info-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>" + observations[obs].observationtypelabel + ac + "</i></div>");
                                        }
                                    }
                                }
                                //featuregroups
                                $.ajax({
                                    type: "GET",
                                    async: false,
                                    url: API.BASE + "/features?type=featuregroup&q=" + THISOBJECT,
                                    error: function(jqXHR, textStatus, errorThrown) {},
                                    success: function(data) {
                                        console.log("initModalFeatureGroupOverview", data);
                                        $("#object-info-list").append("<div class='featurekacheleditlabel2' style='margin-bottom:-8px !important;' id='btn-object-info-period-what'><b>feature groups</b></div>");
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
                                                    $("#object-info-list").append("<div class='kachelobjectinfo' id='" + data[item].id + "'>" + data[item].label + "</div>");
                                                    $("#object-info-list").append("<div class='kachelinfoindividual' style='margin-top:-8px !important;' id='" + data[item].id + "-fcount' onclick=''><b>contains " + data[item].relatedto.length + " feature(s) and " + data[item].connectedto.length + " group relation(s) and " + data[item].statements.length + " statement(s)</b></div>");
                                                    for (i in data2) {
                                                        for (f in relatedFeatures) {
                                                            if (relatedFeatures[f] === data2[i].f) {
                                                                $("#object-info-list").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-feature'><b>Feature > " + data2[i].label + "</b></div>");
                                                            }
                                                        }
                                                    }
                                                    for (ii in data) {
                                                        for (fg in connectedFeatureGroups) {
                                                            if (connectedFeatureGroups[fg] === data[ii].id) {
                                                                $("#object-info-list").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-fg'><b>Group > " + data[ii].label + "</b></div>");
                                                            }
                                                        }
                                                    }
                                                    for (s in statements) {
                                                        $("#object-info-list").append("<div class='kachelinfoindividual' id='" + UUID.getHash() + "-statement'><b>Statement > " + statements[s].label + "</b></div>");
                                                    }
                                                }
                                            });
                                        }
                                        // interpretations
                                        $.ajax({
                                            type: "GET",
                                            url: API.BASE + "/objects/" + THISOBJECT,
                                            async: false,
                                            error: function(jqXHR, textStatus, errorThrown) {},
                                            success: function(data) {
                                                console.log("initModalInterpretations", data);
                                                let interpretations = data.interpretations;
                                                $("#object-info-list").append("<div class='featurekacheleditlabel2' style='margin-bottom:-8px !important;' id='btn-object-info-period-what'><b>interpretations</b></div>");
                                                for (item in interpretations) {
                                                    $("#object-info-list").append("<div class='kachelobjectinfo select' id='" + interpretations[item].id + "'>" + interpretations[item].label + "</div>");
                                                    let arguments = interpretations[item].arguments;
                                                    $("#object-info-list").append("<div class='kachelinfoindividual' style='margin-top:-8px !important;' id='" + interpretations[item].id + "-fcount' onclick=''><b>based on " + interpretations[item].arguments.length + " argument(s)</b></div>");
                                                    for (arg in arguments) {
                                                        let statementtype = arguments[arg].type.replace("ars:", "").replace("_", " ");
                                                        if (arguments[arg].item === "ars:Statement") {
                                                            $("#object-info-list").append("<div class='kachelinfoindividual' id='" + arguments[arg].id + "'><b>" + statementtype + " > " + arguments[arg].label + " (Statement)</b></div>");
                                                        } else if (arguments[arg].item === "sci:S4_Observation") {
                                                            $("#object-info-list").append("<div class='kachelinfoindividual' id='" + arguments[arg].id + "'><b>" + statementtype + " > " + arguments[arg].label + " (Observation)</b></div>");
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    $("#btn-modal-object-info-close").click(function() {
        modal.style.display = "none";
    });
};

let openObjectInfoModal = () => {
    console.log("openObjectInfoModal");
    $("#btn-info-object").trigger("click");
};

initModalObjectInfo();

let initModalFeatureInfo = () => {
    let modal = document.getElementById('modalFeatureInfo');
    let btn = document.getElementById("btn-open-features-modal");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/objects/" + THISOBJECT + "?mode=label",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $.ajax({
                    type: "GET",
                    url: API.BASE + "/objects/" + THISOBJECT,
                    async: false,
                    error: function(jqXHR, textStatus, errorThrown) {},
                    success: function(data2) {
                        console.log("initModalFeatureInfo", data, data2);
                        let style = "";
                        $("#feature-info-list").empty();
                        // features
                        $.ajax({
                            type: "GET",
                            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
                            error: function(jqXHR, textStatus, errorThrown) {},
                            success: function(data) {
                                for (item in data) {
                                    console.log(data[item].f);
                                    $("#feature-info-list").append("<div class='" + "featurekacheln" + "' id='" + data[item].f + "'>" + data[item].label + "</div>");
                                    $("#feature-info-list").append("<div class='kachelinfo' style='margin-top:-8px !important;' id='" + data[item].f + "-fcount' onclick=''><b>&raquo;" + data[item].typelabel + "&laquo; related to " + data[item].relatedto.length + " feature(s) and described with " + data[item].observations.length + " observations(s)</b></div>");
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
                                            $("#feature-info-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>Statement " + ac + "</i></div>");
                                        } else {
                                            $("#feature-info-list").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>" + observations[obs].observationtypelabel + ac + "</i></div>");
                                        }
                                    }
                                }
                                $("#feature-info-list").append("<div class='kachellinebreak' id='dummy'></div>");
                            }
                        }); // end ajax
                    } // end success
                });
            }
        });
    }
    $("#btn-modal-feature-info-close").click(function() {
        modal.style.display = "none";
    });
};

let openFeatureInfoModal = () => {
    console.log("openFeatureInfoModal");
    $("#btn-open-features-modal").trigger("click");
};

initModalFeatureInfo();