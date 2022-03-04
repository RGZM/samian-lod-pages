let initModalObjectEditConditiontype = () => {
    let modal = document.getElementById('modalObjectEditConditiontype');
    let btn = document.getElementById("btn-modal-open-object-edit-conditiontype");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/conditiontypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-conditiontype").empty();
                $("#list-object-edit-conditiontype").append("<div class='kachelsubmit' id='btn-save-object-edit-conditiontype'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-conditiontype").append("<div class='kachelsubmit' id='btn-new-conditiontype-individual' onclick='openObjectConditiontypeNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new condition type individual</div>");
                for (item in data) {
                    $("#list-object-edit-conditiontype").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectConditiontypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#list-object-edit-conditiontype").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectConditiontypeEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-conditiontype").click(function() {
                    RDF4J.modifyObjectConditiontype(THISOBJECT, THISOBJECTCONDITIONTYPE);
                });
                selectObjectConditiontypeFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-conditiontype-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditConditiontypeModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-conditiontype").trigger("click");
};

initModalObjectEditConditiontype();

let selectObjectConditiontypeFromStore = () => {
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
            console.log("selectObjectConditiontypeFromStore", data);
            let selected = data.condition_type;
            if (selected !== "") {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTCONDITIONTYPE = selected;
                console.log(THISOBJECTCONDITIONTYPE);
            }
        }
    });
};

let selectObjectConditiontypeByClick = (item) => {
    let match = false;
    if (THISOBJECTCONDITIONTYPE == item) {
        match = true;
    }
    THISOBJECTCONDITIONTYPE = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTCONDITIONTYPE = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTCONDITIONTYPE = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTCONDITIONTYPE);
};

let initModalObjectConditiontypeEdit = (obj) => {
    let modal = document.getElementById('modalObjectConditiontypeEdit');
    let btn = document.getElementById("btn-modal-open-object-conditiontype-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/conditiontypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-conditiontype-edit-name").val(data[item].label);
                        THISOBJECTCONDITIONTYPE = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-conditiontype-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-conditiontype").trigger("click");
    });
};

let openObjectConditiontypeEditModal = (obj) => {
    initModalObjectConditiontypeEdit(obj);
    $("#btn-modal-object-edit-conditiontype-close").trigger("click");
    $("#btn-modal-open-object-conditiontype-edit").trigger("click");
};

$('#btn-conditiontype-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-conditiontype-edit-name").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyConditiontype(THISOBJECTCONDITIONTYPE, label);
    }
});

let initModalObjectConditiontypeNew = () => {
    let modal = document.getElementById('modalNewObjectConditiontype');
    let btn = document.getElementById("btn-modal-open-new-object-conditiontype");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-conditiontype-new-name").val("");
    }
    $("#btn-modal-new-object-conditiontype-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-conditiontype").trigger("click");
    });
};

let openObjectConditiontypeNewModal = () => {
    $("#btn-modal-object-edit-conditiontype-close").trigger("click");
    $("#btn-modal-open-new-object-conditiontype").trigger("click");
};

initModalObjectConditiontypeNew();

$('#btn-conditiontype-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-conditiontype-new-name").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createConditiontype(label);
    }
});