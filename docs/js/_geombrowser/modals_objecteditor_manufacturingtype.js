let initModalObjectEditManufacturingtype = () => {
    let modal = document.getElementById('modalObjectEditManufacturingtype');
    let btn = document.getElementById("btn-modal-open-object-edit-manufacturingtype");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/manufacturingobjecttypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-manufacturingtype").empty();
                $("#list-object-edit-manufacturingtype").append("<div class='kachelsubmit' id='btn-save-object-edit-manufacturingtype'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-manufacturingtype").append("<div class='kachelsubmit' id='btn-new-manufacturingtype-individual' onclick='openObjectManufacturingtypeNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new manufacturing type individual</div>");
                for (item in data) {
                    $("#list-object-edit-manufacturingtype").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectManufacturingtypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#list-object-edit-manufacturingtype").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectManufacturingtypeEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-manufacturingtype").click(function() {
                    RDF4J.modifyObjectManufacturingtype(THISOBJECT, THISOBJECTMANUFACTURINGTYPE);
                });
                selectObjectManufacturingtypeFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-manufacturingtype-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditManufacturingtypeModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-manufacturingtype").trigger("click");
};

initModalObjectEditManufacturingtype();

let selectObjectManufacturingtypeFromStore = () => {
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
            console.log("selectObjectManufacturingtypeFromStore", data);
            let selected = data.manufacturing_type;
            if (selected !== "") {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTMANUFACTURINGTYPE = selected;
                console.log(THISOBJECTMANUFACTURINGTYPE);
            }
        }
    });
};

let selectObjectManufacturingtypeByClick = (item) => {
    let match = false;
    if (THISOBJECTMANUFACTURINGTYPE == item) {
        match = true;
    }
    THISOBJECTMANUFACTURINGTYPE = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTMANUFACTURINGTYPE = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTMANUFACTURINGTYPE = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTMANUFACTURINGTYPE);
};

let initModalObjectManufacturingtypeEdit = (obj) => {
    let modal = document.getElementById('modalObjectManufacturingtypeEdit');
    let btn = document.getElementById("btn-modal-open-object-manufacturingtype-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/manufacturingobjecttypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-manufacturingtype-edit-name").val(data[item].label);
                        THISOBJECTMANUFACTURINGTYPE = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-manufacturingtype-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-manufacturingtype").trigger("click");
    });
};

let openObjectManufacturingtypeEditModal = (obj) => {
    initModalObjectManufacturingtypeEdit(obj);
    $("#btn-modal-object-edit-manufacturingtype-close").trigger("click");
    $("#btn-modal-open-object-manufacturingtype-edit").trigger("click");
};

$('#btn-manufacturingtype-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-manufacturingtype-edit-name").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyManufacturingtype(THISOBJECTMANUFACTURINGTYPE, label);
    }
});

let initModalObjectManufacturingtypeNew = () => {
    let modal = document.getElementById('modalNewObjectManufacturingtype');
    let btn = document.getElementById("btn-modal-open-new-object-manufacturingtype");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-manufacturingtype-new-name").val("");
    }
    $("#btn-modal-new-object-manufacturingtype-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-manufacturingtype").trigger("click");
    });
};

let openObjectManufacturingtypeNewModal = () => {
    $("#btn-modal-object-edit-manufacturingtype-close").trigger("click");
    $("#btn-modal-open-new-object-manufacturingtype").trigger("click");
};

initModalObjectManufacturingtypeNew();

$('#btn-manufacturingtype-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-manufacturingtype-new-name").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createManufacturingtype(label);
    }
});