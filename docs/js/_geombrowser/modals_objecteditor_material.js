let initModalObjectEditMaterial = () => {
    let modal = document.getElementById('modalObjectEditMaterial');
    let btn = document.getElementById("btn-modal-open-object-edit-material");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/materials",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-material").empty();
                $("#list-object-edit-material").append("<div class='kachelsubmit' id='btn-save-object-edit-material'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-material").append("<div class='kachelsubmit' id='btn-new-material-individual' onclick='openObjectMaterialNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new material individual</div>");
                for (item in data) {
                    $("#list-object-edit-material").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectMaterialByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#list-object-edit-material").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectMaterialEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-material").click(function() {
                    RDF4J.modifyObjectMaterial(THISOBJECT, THISOBJECTMATERIAL);
                });
                selectObjectMaterialFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-material-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditMaterialModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-material").trigger("click");
};

initModalObjectEditMaterial();

let selectObjectMaterialFromStore = () => {
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
            console.log("selectObjectMaterialFromStore", data);
            let selected = data.material;
            if (selected !== "") {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTMATERIAL = selected;
                console.log(THISOBJECTMATERIAL);
            }
        }
    });
};

let selectObjectMaterialByClick = (item) => {
    let match = false;
    if (THISOBJECTMATERIAL == item) {
        match = true;
    }
    THISOBJECTMATERIAL = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTMATERIAL = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTMATERIAL = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTMATERIAL);
};

let initModalObjectMaterialEdit = (obj) => {
    let modal = document.getElementById('modalObjectMaterialEdit');
    let btn = document.getElementById("btn-modal-open-object-material-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/materials",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-material-edit-name").val(data[item].label);
                        $("#inp-material-edit-meta").val(data[item].meta);
                        THISOBJECTMATERIAL = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-material-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-material").trigger("click");
    });
};

let openObjectMaterialEditModal = (obj) => {
    initModalObjectMaterialEdit(obj);
    $("#btn-modal-object-edit-material-close").trigger("click");
    $("#btn-modal-open-object-material-edit").trigger("click");
};

$('#btn-material-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-material-edit-name").val();
    let meta = $("#inp-material-edit-meta").val();
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
        RDF4J.modifyMaterial(THISOBJECTMATERIAL, label, meta);
    }
});

let initModalObjectMaterialNew = () => {
    let modal = document.getElementById('modalNewObjectMaterial');
    let btn = document.getElementById("btn-modal-open-new-object-material");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-material-new-name").val("");
        $("#inp-material-new-meta").val("");
    }
    $("#btn-modal-new-object-material-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-material").trigger("click");
    });
};

let openObjectMaterialNewModal = () => {
    $("#btn-modal-object-edit-material-close").trigger("click");
    $("#btn-modal-open-new-object-material").trigger("click");
};

initModalObjectMaterialNew();

$('#btn-material-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-material-new-name").val();
    let meta = $("#inp-material-new-meta").val();
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
        RDF4J.createMaterial(label, meta);
    }
});