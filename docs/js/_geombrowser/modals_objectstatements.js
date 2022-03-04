let THISOBJSTATEMENTOBJCLASS = "";
let THISOBJSTATEMENTOBJINDIVIDUAL = "";
let THISOBJACTIONTYPEOBJ = "default";

let initModalObjectStatementobjClasses = () => {
    let modal = document.getElementById('modalStatementobjClasses');
    let btn = document.getElementById("btn-modal-open-statementobj-classes");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementobjectclasses",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalObjectStatementobjClasses", data);
                $("#mod-item-statementobj-class-list").empty();
                for (item in data) {
                    $("#mod-item-statementobj-class-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='openObjectStatementobjIndividualsModal(\"" + data[item].id + "\", \"" + THISOBJACTIONTYPEOBJ + "\");'>" + data[item].label + "</div>");
                }
            }
        });
    }
    $("#btn-modal-statementobj-class-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

initModalObjectStatementobjClasses();

let openObjectStatementobjClassesModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-statementobj-classes").trigger("click");
};

let initModalObjectStatementobjIndividuals = () => {
    let modal = document.getElementById('modalStatementobjIndividuals');
    let btn = document.getElementById("btn-modal-open-statementobj-individuals");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementobjectinstances?indiv=" + THISOBJSTATEMENTOBJCLASS,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalStatementobjIndividuals", data);
                $("#mod-item-statementobj-individual-list").empty();
                for (item in data) {
                    $("#mod-item-statementobj-individual-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='statementobjIndividualsAction(\"" + data[item].id + "\",\"" + data[item].label + "\",\"" + THISOBJACTIONTYPEOBJ + "\");'>" + data[item].label + "</div>");
                    $("#mod-item-statementobj-individual-list").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectStatementobjIndividualEdit(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    }
    $("#btn-modal-statementobj-individual-close").click(function() {
        modal.style.display = "none";
    });
};

let openObjectStatementobjIndividualsModal = (statementclass, action) => {
    THISOBJSTATEMENTOBJCLASS = statementclass;
    $("#inp-qs-statementobj-individual").val("");
    $("#btn-modal-open-statementobj-individuals").trigger("click");
};

initModalObjectStatementobjIndividuals();

let initModalObjectStatementobjIndividualNew = () => {
    let modal = document.getElementById('modalStatementobjIndividualNew');
    let btn = document.getElementById("btn-new-statementobj-individual");
    btn.onclick = function() {
        modal.style.display = "block";
        let label = $("#inp-new-statementobj-individual-no").val("");
        let meta = $("#inp-new-statementobj-individual-comment").val("");
    }
    $("#btn-modal-statementobj-individual-new-close").click(function() {
        modal.style.display = "none";
    });
};

let openObjectStatementobjIndividualNew = () => {
    $("#btn-new-statementobj-individual").trigger("click");
};

initModalObjectStatementobjIndividualNew();

let initModalObjectStatementobjIndividualEdit = () => {
    let modal = document.getElementById('modalStatementobjIndividualEdit');
    let btn = document.getElementById("btn-modal-open-statementobj-individual-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementobjectinstances?indiv=" + THISOBJSTATEMENTOBJCLASS,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === THISOBJSTATEMENTOBJINDIVIDUAL) {
                        $("#inp-edit-statementobj-individual-no").val(data[item].label);
                        $("#inp-edit-statementobj-individual-comment").val(data[item].comment);
                    }
                }
            }
        });
    }
    $("#btn-modal-statementobj-individual-edit-close").click(function() {
        modal.style.display = "none";
    });
};

let openObjectStatementobjIndividualEdit = (indiv) => {
    THISOBJSTATEMENTOBJINDIVIDUAL = indiv;
    $("#btn-modal-open-statementobj-individual-edit").trigger("click");
};

initModalObjectStatementobjIndividualEdit();

$("#inp-qs-statementobj-individual").keyup(function() {
    if ($("#inp-qs-statementobj-individual").val() !== "") {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementobjectinstances?indiv=" + THISOBJSTATEMENTOBJCLASS + "&q=" + $("#inp-qs-statementobj-individual").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-statementobj-individual-list").empty();
                for (item in data) {
                    $("#mod-item-statementobj-individual-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='statementobjIndividualsAction(\"" + data[item].id + "\",\"" + data[item].label + "\",\"" + THISOBJACTIONTYPEOBJ + "\");'>" + data[item].label + "</div>");
                    $("#mod-item-statementobj-individual-list").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectStatementobjIndividualEdit(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/statementobjectinstances?indiv=" + THISOBJSTATEMENTOBJCLASS + "&q=" + $("#inp-qs-statementobj-individual").val(),
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#mod-item-statementobj-individual-list").empty();
                for (item in data) {
                    $("#mod-item-statementobj-individual-list").append("<div class='kachelnstatement select' id='" + data[item].id + "' onclick='statementobjIndividualsAction(\"" + data[item].id + "\",\"" + data[item].label + "\",\"" + THISOBJACTIONTYPEOBJ + "\");'>" + data[item].label + "</div>");
                    $("#mod-item-statementobj-individual-list").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectStatementobjIndividualEdit(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
            }
        });
    }
});

let statementobjIndividualsAction = (statementindividual, statementindividuallabel, action) => {
    if (action === "default") {
        console.log(statementindividual, statementindividuallabel, action);
        RDF4J.addStatementToObject(THISOBJECT, statementindividual);
    }
};

$("#btn-new-statementobj-individual").click(function() {
    initModalObjectStatementobjIndividualNew();
});

$('#btn-new-statementobj-individual-submit').on('click', (event) => {
    let ok = true;
    let no = $("#inp-new-statementobj-individual-no").val();
    let comment = $("#inp-new-statementobj-individual-comment").val();
    if (no === "" || comment === "") {
        showNotification('error', 'Error!', 'The number and/or comment cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(comment) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createStatementobjIndividual(no, comment, THISOBJSTATEMENTOBJCLASS, console.log)
    }
});

$('#btn-edit-statementobj-individual-submit').on('click', (event) => {
    let ok = true;
    let no = $("#inp-edit-statementobj-individual-no").val();
    let comment = $("#inp-edit-statementobj-individual-comment").val();
    if (no === "" || comment === "") {
        showNotification('error', 'Error!', 'The number and/or comment cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyStatementobjIndividual(THISOBJSTATEMENTOBJINDIVIDUAL, no, comment, console.log)
    }
});