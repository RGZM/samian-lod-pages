let THISSTATEMENTCLASS = "";
let THISSTATEMENTINDIVIDUAL = "";
let THISACTIONTYPE = "";

let initModalStatementClasses = () => {
    let modal = document.getElementById('modalStatementClasses');
    let btn = document.getElementById("btn-modal-open-statement-classes");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementfeatureclasses",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalStatementClasses", data);
                $("#mod-item-statement-class-list").empty();
                for (item in data) {
                    $("#mod-item-statement-class-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='openStatementIndividualsModal(\"" + data[item].id + "\", \"" + THISACTIONTYPE + "\");'>" + data[item].label + "</div>");
                }
            }
        });
    }
    $("#btn-modal-statement-class-close").click(function() {
        modal.style.display = "none";
    });
};

let openStatementClassesModal = (action) => {
    THISACTIONTYPE = action;
    console.log(THISACTIONTYPE);
    $("#btn-modal-open-statement-classes").trigger("click");
};

initModalStatementClasses();

let initModalStatementIndividuals = () => {
    let modal = document.getElementById('modalStatementIndividuals');
    let btn = document.getElementById("btn-modal-open-statement-individuals");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementfeatureinstances?indiv=" + THISSTATEMENTCLASS,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalStatementIndividuals", data);
                $("#mod-item-statement-individual-list").empty();
                for (item in data) {
                    $("#mod-item-statement-individual-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='statementIndividualsAction(\"" + data[item].id + "\",\"" + data[item].label + "\",\"" + THISACTIONTYPE + "\");'>" + data[item].label + "</div>");
                    $("#mod-item-statement-individual-list").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openStatementIndividualEdit(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    }
    $("#btn-modal-statement-individual-close").click(function() {
        modal.style.display = "none";
    });
};

let openStatementIndividualsModal = (statementclass, action) => {
    THISSTATEMENTCLASS = statementclass;
    THISACTIONTYPE = action;
    $("#inp-qs-statement-individual").val("");
    $("#btn-modal-open-statement-individuals").trigger("click");
};

initModalStatementIndividuals();

let initModalStatementIndividualNew = () => {
    let modal = document.getElementById('modalStatementIndividualNew');
    let btn = document.getElementById("btn-modal-open-statement-individual-new");
    btn.onclick = function() {
        modal.style.display = "block";
        let label = $("#inp-new-statement-individual-no").val("");
        let meta = $("#inp-new-statement-individual-comment").val("");
    }
    $("#btn-modal-statement-individual-new-close").click(function() {
        modal.style.display = "none";
    });
};

let openStatementIndividualNew = () => {
    $("#btn-modal-open-statement-individual-new").trigger("click");
};

initModalStatementIndividualNew();

let initModalStatementIndividualEdit = () => {
    let modal = document.getElementById('modalStatementIndividualEdit');
    let btn = document.getElementById("btn-modal-open-statement-individual-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementfeatureinstances?indiv=" + THISSTATEMENTCLASS,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === THISSTATEMENTINDIVIDUAL) {
                        $("#inp-edit-statement-individual-no").val(data[item].label);
                        $("#inp-edit-statement-individual-comment").val(data[item].comment);
                    }
                }
            }
        });
    }
    $("#btn-modal-statement-individual-edit-close").click(function() {
        modal.style.display = "none";
    });
};

let openStatementIndividualEdit = (indiv) => {
    THISSTATEMENTINDIVIDUAL = indiv;
    $("#btn-modal-open-statement-individual-edit").trigger("click");
};

initModalStatementIndividualEdit();

$("#inp-qs-statement-individual").keyup(function() {
    if ($("#inp-qs-statement-individual").val() !== "") {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementfeatureinstances?indiv=" + THISSTATEMENTCLASS + "&q=" + $("#inp-qs-statement-individual").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-statement-individual-list").empty();
                for (item in data) {
                    $("#mod-item-statement-individual-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='statementIndividualsAction(\"" + data[item].id + "\",\"" + data[item].label + "\",\"" + THISACTIONTYPE + "\");'>" + data[item].label + "</div>");
                    $("#mod-item-statement-individual-list").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openStatementIndividualEdit(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementfeatureinstances?indiv=" + THISSTATEMENTCLASS + "&q=" + $("#inp-qs-statement-individual").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-statement-individual-list").empty();
                for (item in data) {
                    $("#mod-item-statement-individual-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='statementIndividualsAction(\"" + data[item].id + "\",\"" + data[item].label + "\",\"" + THISACTIONTYPE + "\");'>" + data[item].label + "</div>");
                    $("#mod-item-statement-individual-list").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openStatementIndividualEdit(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    }
});

let statementIndividualsAction = (statementindividual, statementindividuallabel, action) => {
    if (action === "FEATUREGROUP") {
        RDF4J.addStatementToFeatureGroup(THISFEATUREGROUP, statementindividual);
    } else if (action === "ARGUMENT") {
        THISARGUMENTSTATEMENT = statementindividual;
        $("#inp-new-interpretation-argument-label").val(THISARGUMENTLABEL);
        $("#btn-modal-statement-individual-close").trigger("click");
        $("#btn-modal-statement-class-close").trigger("click");
        $("#btn-modal-open-argument-interpretation-new").trigger("click");
        $("#mod-interpretation-argument-new-item").empty();
        $("#mod-interpretation-argument-new-item").append("<div class='kachelnargumentstatement' id='" + statementindividual + "'>" + statementindividuallabel + "</div>");
        $("#new-interpretation-argument-statement").removeClass("kachelsubmit");
        $("#new-interpretation-argument-statement").addClass("kacheldummy");
        $("#new-interpretation-argument-observation").removeClass("kachelsubmitwomt");
        $("#new-interpretation-argument-observation").addClass("kacheldummy");
        $("#new-interpretation-argument-statement").off("click");
        $("#new-interpretation-argument-observation").off("click");
    } else if (action === "FEATURE") {
        $("#btn-new-observation-individual").text(statementindividuallabel);
        $("#btn-new-observation-individual").attr('url', statementindividual);
        $("#btn-new-observation-individual").attr('statement', "Statement");
        $("#btn-new-observation-individual").removeClass("kachelsubmit");
        $("#btn-new-observation-individual").addClass("dashboardkachelnobservationnewsel");
        OBSERVATIONTYPE = statementindividual;
        $("#btn-modal-statement-individual-close").trigger("click");
        $("#btn-modal-statement-class-close").trigger("click");
        $("#btn-modal-item-class-close").trigger("click");
    }
};

$("#btn-new-statement-individual").click(function() {
    openStatementIndividualNew();
});

$('#btn-new-statement-individual-submit').on('click', (event) => {
    let ok = true;
    let no = $("#inp-new-statement-individual-no").val();
    let comment = $("#inp-new-statement-individual-comment").val();
    if (no === "" || comment === "") {
        showNotification('error', 'Error!', 'The number and/or comment cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(comment) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createStatementIndividual(no, comment, THISSTATEMENTCLASS, console.log)
    }
});

$('#btn-edit-statement-individual-submit').on('click', (event) => {
    let ok = true;
    let no = $("#inp-edit-statement-individual-no").val();
    let comment = $("#inp-edit-statement-individual-comment").val();
    if (no === "" || comment === "") {
        showNotification('error', 'Error!', 'The number and/or comment cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyStatementIndividual(THISSTATEMENTINDIVIDUAL, no, comment, console.log)
    }
});