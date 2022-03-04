let initModalObjectEditGroup = () => {
    let modal = document.getElementById('modalObjectEditGroup');
    let btn = document.getElementById("btn-modal-open-object-edit-group");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/groups",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-group").empty();
                $("#list-object-edit-group").append("<div class='kachelsubmit' id='btn-save-object-edit-group'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-group").append("<div class='kachelsubmit' id='btn-new-group-individual' onclick='openObjectGroupNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new object group</div>");
                for (item in data) {
                    $("#list-object-edit-group").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectGroupByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#list-object-edit-group").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectGroupEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-group").click(function() {
                    RDF4J.modifyObjectGroup(THISOBJECT, THISOBJECTGROUP);
                });
                selectObjectGroupFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-group-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditGroupModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-group").trigger("click");
};

initModalObjectEditGroup();

let selectObjectGroupFromStore = () => {
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
            console.log("selectObjectGroupFromStore", data);
            let selected = data.group;
            if (selected !== "" && selected != false) {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTGROUP = selected;
                console.log(THISOBJECTGROUP);
            }
        }
    });
};

let selectObjectGroupByClick = (item) => {
    let match = false;
    if (THISOBJECTGROUP == item) {
        match = true;
    }
    THISOBJECTGROUP = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTGROUP = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTGROUP = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTGROUP);
};

let initModalObjectGroupEdit = (obj) => {
    let modal = document.getElementById('modalObjectGroupEdit');
    let btn = document.getElementById("btn-modal-open-object-group-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/groups",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-group-edit-name").val(data[item].label);
                        THISOBJECTGROUP = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-group-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-group").trigger("click");
    });
};

let openObjectGroupEditModal = (obj) => {
    initModalObjectGroupEdit(obj);
    $("#btn-modal-object-edit-group-close").trigger("click");
    $("#btn-modal-open-object-group-edit").trigger("click");
};

$('#btn-group-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-group-edit-name").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyGroup(THISOBJECTGROUP, label);
    }
});

let initModalObjectGroupNew = () => {
    let modal = document.getElementById('modalNewObjectGroup');
    let btn = document.getElementById("btn-modal-open-new-object-group");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-group-new-name").val("");
    }
    $("#btn-modal-new-object-group-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-group").trigger("click");
    });
};

let openObjectGroupNewModal = () => {
    $("#btn-modal-object-edit-group-close").trigger("click");
    $("#btn-modal-open-new-object-group").trigger("click");
};

initModalObjectGroupNew();

$('#btn-group-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-group-new-name").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createGroup(label);
    }
});