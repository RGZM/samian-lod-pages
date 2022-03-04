let initModalObjectEditPeriod = () => {
    let modal = document.getElementById('modalObjectEditPeriod');
    let btn = document.getElementById("btn-modal-open-object-edit-period");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/periods",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#list-object-edit-period").empty();
                $("#list-object-edit-period").append("<div class='kachelsubmit' id='btn-save-object-edit-period'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                $("#list-object-edit-period").append("<div class='kachelsubmit' id='btn-new-period-individual' onclick='openObjectPeriodNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new period individual</div>");
                for (item in data) {
                    $("#list-object-edit-period").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectObjectPeriodByClick(\"" + data[item].id + "\");'>" + data[item].full + "</div>");
                    $("#list-object-edit-period").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openObjectPeriodEditModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-object-edit-period").click(function() {
                    RDF4J.modifyObjectPeriod(THISOBJECT, THISOBJECTPERIOD);
                });
                selectObjectPeriodFromStore();
            }
        });
    }
    $("#btn-modal-object-edit-period-close").click(function() {
        modal.style.display = "none";
        $("#btn-edit-object").trigger("click");
    });
};

let openObjectEditPeriodModal = () => {
    $("#btn-modal-object-edit-close").trigger("click");
    $("#btn-modal-open-object-edit-period").trigger("click");
};

initModalObjectEditPeriod();

let selectObjectPeriodFromStore = () => {
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
            console.log("selectObjectPeriodFromStore", data);
            let selected = data.period;
            if (selected !== "") {
                $("#" + selected.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + selected.replace(":", "\\:")).addClass("kachelfeatureselected");
                THISOBJECTPERIOD = selected;
                console.log(THISOBJECTPERIOD);
            }
        }
    });
};

let selectObjectPeriodByClick = (item) => {
    let match = false;
    if (THISOBJECTPERIOD == item) {
        match = true;
    }
    THISOBJECTPERIOD = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === item) {
            if (match === true) {
                THISOBJECTPERIOD = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (item !== "null") {
                    THISOBJECTPERIOD = item;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISOBJECTPERIOD);
};

let initModalObjectPeriodEdit = (obj) => {
    let modal = document.getElementById('modalObjectPeriodEdit');
    let btn = document.getElementById("btn-modal-open-object-period-edit");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/periods",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === obj) {
                        $("#inp-period-edit-name").val(data[item].label);
                        $("#inp-period-edit-meta").val(data[item].meta);
                        $("#inp-period-edit-date").val(data[item].date);
                        THISOBJECTPERIOD = obj;
                    }
                }
            }
        });
    }
    $("#btn-modal-object-period-edit-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-period").trigger("click");
    });
};

let openObjectPeriodEditModal = (obj) => {
    initModalObjectPeriodEdit(obj);
    $("#btn-modal-object-edit-period-close").trigger("click");
    $("#btn-modal-open-object-period-edit").trigger("click");
};

$('#btn-period-edit-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-period-edit-name").val();
    let meta = $("#inp-period-edit-meta").val();
    let date = $("#inp-period-edit-date").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (meta === "") {
        showNotification('error', 'Error!', 'The meta entry cannot be empty!');
        ok = false;
    }
    if (date === "") {
        showNotification('error', 'Error!', 'The date entry cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyPeriod(THISOBJECTPERIOD, label, meta, date);
    }
});

let initModalObjectPeriodNew = () => {
    let modal = document.getElementById('modalNewObjectPeriod');
    let btn = document.getElementById("btn-modal-open-new-object-period");
    btn.onclick = function() {
        modal.style.display = "block";
        $("#inp-period-new-name").val("");
        $("#inp-period-new-meta").val("");
        $("#inp-period-new-date").val("");
    }
    $("#btn-modal-new-object-period-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-object-edit-period").trigger("click");
    });
};

let openObjectPeriodNewModal = () => {
    $("#btn-modal-object-edit-period-close").trigger("click");
    $("#btn-modal-open-new-object-period").trigger("click");
};

initModalObjectPeriodNew();

$('#btn-period-new-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-period-new-name").val();
    let meta = $("#inp-period-new-meta").val();
    let date = $("#inp-period-new-date").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (meta === "") {
        showNotification('error', 'Error!', 'The meta entry cannot be empty!');
        ok = false;
    }
    if (date === "") {
        showNotification('error', 'Error!', 'The date entry cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createPeriod(label, meta, date);
    }
});