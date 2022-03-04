let initModalObjectEditShape = () => {
    let modal = document.getElementById('modalObjectEditShape');
    let btn = document.getElementById("btn-modal-open-object-edit-shape");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/shapes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-shape").empty();
                $("#list-object-edit-shape").append("<div class='kachelsubmit' id='btn-save-object-edit-shape'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-shape").append("<div class='kachelsubmit' id='btn-new-shape-individual' onclick='openObjectShapeNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new shape individual</div>");
                for (item in data) {
                    $("#list-object-edit-shape").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectShapeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#list-object-edit-shape").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectShapeEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-shape").click(function() {
                    RDF4J.modifyObjectShape(THISOBJECT, THISOBJECTSHAPE);
                });
                selectObjectShapeFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-shape-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditShapeModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-shape").trigger("click");
};

initModalObjectEditShape();

let selectObjectShapeFromStore = () => {
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
            console.log("selectObjectShapeFromStore", data);
            let selected = data.shape;
            if (selected !== "") {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTSHAPE = selected;
                console.log(THISOBJECTSHAPE);
            }
        }
    });
};

let selectObjectShapeByClick = (item) => {
    let match = false;
    if (THISOBJECTSHAPE == item) {
        match = true;
    }
    THISOBJECTSHAPE = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTSHAPE = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTSHAPE = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTSHAPE);
};

let initModalObjectShapeEdit = (obj) => {
    let modal = document.getElementById('modalObjectShapeEdit');
    let btn = document.getElementById("btn-modal-open-object-shape-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/shapes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-shape-edit-name").val(data[item].label);
                        $("#inp-shape-edit-meta").val(data[item].meta);
                        THISOBJECTSHAPE = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-shape-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-shape").trigger("click");
    });
};

let openObjectShapeEditModal = (obj) => {
    initModalObjectShapeEdit(obj);
    $("#btn-modal-object-edit-shape-close").trigger("click");
    $("#btn-modal-open-object-shape-edit").trigger("click");
};

$('#btn-shape-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-shape-edit-name").val();
    let meta = $("#inp-shape-edit-meta").val();
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
        RDF4J.modifyShape(THISOBJECTSHAPE, label, meta);
    }
});

let initModalObjectShapeNew = () => {
    let modal = document.getElementById('modalNewObjectShape');
    let btn = document.getElementById("btn-modal-open-new-object-shape");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-shape-new-name").val("");
        $("#inp-shape-new-meta").val("");
    }
    $("#btn-modal-new-object-shape-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-shape").trigger("click");
    });
};

let openObjectShapeNewModal = () => {
    $("#btn-modal-object-edit-shape-close").trigger("click");
    $("#btn-modal-open-new-object-shape").trigger("click");
};

initModalObjectShapeNew();

$('#btn-shape-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-shape-new-name").val();
    let meta = $("#inp-shape-new-meta").val();
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
        RDF4J.createShape(label, meta);
    }
});