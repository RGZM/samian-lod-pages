//  init the object editor modal

let initModalObjectEdit = () => {
    let modal = document.getElementById('modalObjectEdit');
    let btn = document.getElementById("btn-edit-object");
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
                        $("#object-edit-list").empty();
                        // unique identifier
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-uuid-what'><b>unique identifier</b></div>");
                        $("#object-edit-list").append("<div class='kachelobjectinfo' id='btn-object-edit-uuid'>" + data.uri.replace("http://java-dev.rgzm.de/ars/objects/", "") + "</div>");
                        // label
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-label-what'><b>label</b></div>");
                        $("#object-edit-list").append("<div class='kachelobjectinfo' id='btn-object-edit-label'>" + data.label + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-label-edit' onclick='openObjectEditLabelModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // inventory number
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-inventory-what'><b>inventory number</b></div>");
                        $("#object-edit-list").append("<div class='kachelobjectinfo' id='btn-object-edit-inventory'>" + data.id + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-inventory-edit' onclick='openObjectEditIDModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // type
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-type-what'><b>type</b></div>");
                        $("#object-edit-list").append("<div class='kachelobjectinfo' id='btn-object-edit-type'>" + data.type + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-type-edit' onclick='openObjectEditTypeModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // shape
                        if (typeof data.shape === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-shape-what'><b>shape</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-shape'>" + data.shape + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-shape-edit' onclick='openObjectEditShapeModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // material
                        if (typeof data.material === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-material-what'><b>material</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-material'>" + data.material + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-material-edit' onclick='openObjectEditMaterialModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // condition type
                        if (typeof data.condition_type === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-conditiontype-what'><b>condition type</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-conditiontype'>" + data.condition_type + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-conditiontype-edit' onclick='openObjectEditConditiontypeModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // manufacturing type
                        if (typeof data.manufacturing_type === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-manufacturingtype-what'><b>manufacturing type</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-manufacturingtype'>" + data.manufacturing_type + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-manufacturingtype-edit' onclick='openObjectEditManufacturingtypeModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // findspot
                        if (typeof data.findspot === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-findspot-what'><b>findspot</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-findspot'>" + data.findspot + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-findspot-edit' onclick='openObjectEditFindspotModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // residence
                        if (typeof data.residence === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-residence-what'><b>residence</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-residence'>" + data.residence + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-residence-edit' onclick='openObjectEditResidenceModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // period
                        if (typeof data.period === 'undefined') {
                            style = "kachelobjectinfonotset";
                        } else {
                            style = "kachelobjectinfo";
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-period-what'><b>period</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-period'>" + data.period + " > " + data.date + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-period-edit' onclick='openObjectEditPeriodModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // object group
                        let groupstring = "";
                        if (data.group === false) {
                            style = "kachelobjectinfonotset";
                            groupstring = "no object group relation";
                        } else {
                            style = "kachelobjectinfo";
                            groupstring = data.group;
                        }
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-groups-what'><b>groups</b></div>");
                        $("#object-edit-list").append("<div class='" + style + "' id='btn-object-edit-groups'>" + groupstring + "</div>");
                        $("#object-edit-list").append("<div class='featurekacheleditit' id='btn-object-edit-groups-edit' onclick='openObjectEditGroupModal();'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                        // statements
                        $("#object-edit-list").append("<div class='featurekacheleditlabel' id='btn-object-edit-statements-what'><b>statements</b></div>");
                        if (data2.statements.length > 0) {
                            for (item in data2.statements) {
                                $("#object-edit-list").append("<div class='" + "kachelobjectinfo" + "' id='" + data2.statements[item].id + "'>" + data2.statements[item].cn + " > " + data2.statements[item].comment + "</div>");
                                $("#object-edit-list").append("<div class='featurekacheleditit' id='" + data2.statements[item].id + "-edit' onclick='RDF4J.deleteStatementFromObject(\"" + THISOBJECT + "\", \"" + data2.statements[item].id + "\");'><b><i class='fa fa-trash' aria-hidden='true'></i> delete</b></div>");
                            }
                        } else {
                            $("#object-edit-list").append("<div class='" + "kachelobjectinfonotset" + "' id='btn-object-edit-statement-empty'>" + "no statement" + "</div>");
                        }
                        // plus add statements button
                        $("#object-edit-list").append("<div class='kachelsubmit' id='btn-modal-open-statementobj-classes' onclick='openObjectStatementobjClassesModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;add statement to object</div>");
                    }
                });
            }
        });
    }
    $("#btn-modal-object-edit-close").click(function() {
        modal.style.display = "none";
    });
};

let openObjectEditModal = () => {
    $("#btn-edit-object").trigger("click");
};

initModalObjectEdit();

// Object Label Edit

let initModalObjectEditLabel = () => {
    let modal = document.getElementById('modalObjectEditLabel');
    let btn = document.getElementById("btn-modal-open-object-edit-label");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/objects/" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalObjectEditLabel", data);
                $("#inp-edit-object-label").empty();
                $("#inp-edit-object-label").val(data.label);
            }
        });
    }
    $("#btn-modal-object-edit-label-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditLabelModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-label").trigger("click");
};

initModalObjectEditLabel();

$('#btn-edit-object-label-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-edit-object-label").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyObjectLabel(THISOBJECT, label);
    }
});

// Object Inventory Number Edit

let initModalObjectEditID = () => {
    let modal = document.getElementById('modalObjectEditID');
    let btn = document.getElementById("btn-modal-open-object-edit-id");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/objects/" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log("initModalObjectEditLabel", data);
                $("#inp-edit-object-id").empty();
                $("#inp-edit-object-id").val(data.id);
            }
        });
    }
    $("#btn-modal-object-edit-id-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditIDModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-id").trigger("click");
};

initModalObjectEditID();

$('#btn-edit-object-id-submit').on('click', (event) => {
    let ok = true;
    let id = $("#inp-edit-object-id").val();
    if (id === "") {
        showNotification('error', 'Error!', 'The inventory number cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(id) === false) {
        showNotification('error', 'Error!', 'Wrong sign in id!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyObjectIdentifier(THISOBJECT, id);
    }
});

let initModalObjectEditType = () => {
    let modal = document.getElementById('modalObjectEditType');
    let btn = document.getElementById("btn-modal-open-object-edit-type");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/objecttypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-type").empty();
                $("#list-object-edit-type").append("<div class='kachelsubmit' id='btn-save-object-edit-type'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                for (item in data) {
                    $("#list-object-edit-type").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectTypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    //$("#list-object-edit-type").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openFeatureManufacturingEditingModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-type").click(function() {
                    if (THISOBJECTTYPE == "") {
                        showNotification('error', 'Error!', 'Please choose a type!');
                    } else {
                        RDF4J.modifyObjectType(THISOBJECT, THISOBJECTTYPE);
                    }
                });
                selectObjectTypeFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-type-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditTypeModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-type").trigger("click");
};

initModalObjectEditType();

let selectObjectTypeFromStore = () => {
    $('.select').each(function(i, obj) {
        $(this).addClass("kachelfeaturenotselected");
        $(this).removeClass("kachelfeatureselected");
    });
    $.ajax({
        type: "GET",
        url: API.BASE + "/objects/" + THISOBJECT,
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log(data);
            let seltype = data.type;
            if (seltype !== "") {
                $("#" + seltype.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + seltype.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTTYPE = seltype;
                console.log(THISOBJECTTYPE);
            }
        }
    });
};

let selectObjectTypeByClick = (item) => {
    let match = false;
    if (THISOBJECTTYPE == item) {
        match = true;
    }
    THISOBJECTTYPE = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTTYPE = item;
            } else {
                if (item !== "null") {
                    THISOBJECTTYPE = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTTYPE);
};