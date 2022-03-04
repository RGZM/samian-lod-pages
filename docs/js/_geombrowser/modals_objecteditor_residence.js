let initModalObjectEditResidence = () => {
    let modal = document.getElementById('modalObjectEditResidence');
    let btn = document.getElementById("btn-modal-open-object-edit-residence");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/residences",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-residence").empty();
                $("#list-object-edit-residence").append("<div class='kachelsubmit' id='btn-save-object-edit-residence'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-residence").append("<div class='kachelsubmit' id='btn-new-residence-individual' onclick='openObjectResidenceNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new residence individual</div>");
                for (item in data) {
                    $("#list-object-edit-residence").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectResidenceByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#list-object-edit-residence").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectResidenceEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-residence").click(function() {
                    RDF4J.modifyObjectResidence(THISOBJECT, THISOBJECTRESIDENCE);
                });
                selectObjectResidenceFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-residence-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditResidenceModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-residence").trigger("click");
};

initModalObjectEditResidence();

let selectObjectResidenceFromStore = () => {
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
            console.log("selectObjectResidenceFromStore", data);
            let selected = data.residence;
            if (selected !== "") {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTRESIDENCE = selected;
                console.log(THISOBJECTRESIDENCE);
            }
        }
    });
};

let selectObjectResidenceByClick = (item) => {
    let match = false;
    if (THISOBJECTRESIDENCE == item) {
        match = true;
    }
    THISOBJECTRESIDENCE = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTRESIDENCE = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTRESIDENCE = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTRESIDENCE);
};

let initModalObjectResidenceEdit = (obj) => {
    let modal = document.getElementById('modalObjectResidenceEdit');
    let btn = document.getElementById("btn-modal-open-object-residence-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/residences",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-residence-edit-name").val(data[item].label);
                        $("#inp-residence-edit-meta").val(data[item].meta);
                        THISOBJECTRESIDENCE = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-residence-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-residence").trigger("click");
    });
};

let openObjectResidenceEditModal = (obj) => {
    initModalObjectResidenceEdit(obj);
    $("#btn-modal-object-edit-residence-close").trigger("click");
    $("#btn-modal-open-object-residence-edit").trigger("click");
};

$('#btn-residence-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-residence-edit-name").val();
    let meta = $("#inp-residence-edit-meta").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (meta === "") {
        showNotification('error', 'Error!', 'The meta entry cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyResidence(THISOBJECTRESIDENCE, label, meta);
    }
});

let initModalObjectResidenceNew = () => {
    let modal = document.getElementById('modalNewObjectResidence');
    let btn = document.getElementById("btn-modal-open-new-object-residence");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-residence-new-name").val("");
        $("#inp-residence-new-meta").val("");
    }
    $("#btn-modal-new-object-residence-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-residence").trigger("click");
    });
};

let openObjectResidenceNewModal = () => {
    $("#btn-modal-object-edit-residence-close").trigger("click");
    $("#btn-modal-open-new-object-residence").trigger("click");
};

initModalObjectResidenceNew();

$('#btn-residence-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-residence-new-name").val();
    let meta = $("#inp-residence-new-meta").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (meta === "") {
        showNotification('error', 'Error!', 'The meta entry cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createResidence(label, meta);
    }
});