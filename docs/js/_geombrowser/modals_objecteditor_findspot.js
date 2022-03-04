let initModalObjectEditFindspot = () => {
    let modal = document.getElementById('modalObjectEditFindspot');
    let btn = document.getElementById("btn-modal-open-object-edit-findspot");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/findspots",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-findspot").empty();
                $("#list-object-edit-findspot").append("<div class='kachelsubmit' id='btn-save-object-edit-findspot'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-findspot").append("<div class='kachelsubmit' id='btn-new-findspot-individual' onclick='openObjectFindspotNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new findspot individual</div>");
                for (item in data) {
                    $("#list-object-edit-findspot").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectFindspotByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#list-object-edit-findspot").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectFindspotEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-findspot").click(function() {
                    RDF4J.modifyObjectFindspot(THISOBJECT, THISOBJECTFINDSPOT);
                });
                selectObjectFindspotFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-findspot-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditFindspotModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-findspot").trigger("click");
};

initModalObjectEditFindspot();

let selectObjectFindspotFromStore = () => {
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
            console.log("selectObjectFindspotFromStore", data);
            let selected = data.findspot;
            if (selected !== "") {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTFINDSPOT = selected;
                console.log(THISOBJECTFINDSPOT);
            }
        }
    });
};

let selectObjectFindspotByClick = (item) => {
    let match = false;
    if (THISOBJECTFINDSPOT == item) {
        match = true;
    }
    THISOBJECTFINDSPOT = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTFINDSPOT = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTFINDSPOT = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTFINDSPOT);
};

let initModalObjectFindspotEdit = (obj) => {
    let modal = document.getElementById('modalObjectFindspotEdit');
    let btn = document.getElementById("btn-modal-open-object-findspot-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/findspots",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-findspot-edit-name").val(data[item].label);
                        $("#inp-findspot-edit-meta").val(data[item].meta);
                        THISOBJECTFINDSPOT = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-findspot-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-findspot").trigger("click");
    });
};

let openObjectFindspotEditModal = (obj) => {
    initModalObjectFindspotEdit(obj);
    $("#btn-modal-object-edit-findspot-close").trigger("click");
    $("#btn-modal-open-object-findspot-edit").trigger("click");
};

$('#btn-findspot-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-findspot-edit-name").val();
    let meta = $("#inp-findspot-edit-meta").val();
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
        RDF4J.modifyFindspot(THISOBJECTFINDSPOT, label, meta);
    }
});

let initModalObjectFindspotNew = () => {
    let modal = document.getElementById('modalNewObjectFindspot');
    let btn = document.getElementById("btn-modal-open-new-object-findspot");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-findspot-new-name").val("");
        $("#inp-findspot-new-meta").val("");
    }
    $("#btn-modal-new-object-findspot-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-findspot").trigger("click");
    });
};

let openObjectFindspotNewModal = () => {
    $("#btn-modal-object-edit-findspot-close").trigger("click");
    $("#btn-modal-open-new-object-findspot").trigger("click");
};

initModalObjectFindspotNew();

$('#btn-findspot-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-findspot-new-name").val();
    let meta = $("#inp-findspot-new-meta").val();
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
        RDF4J.createFindspot(label, meta);
    }
});