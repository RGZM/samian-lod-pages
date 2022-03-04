// Activity Edit

let initModalActivityEdit = () => {
    let modal = document.getElementById('modalEditActivity');
    let btn = document.getElementById("btn-modal-open-edit-activity");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/activities",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log(data, THISACTIVITY);
                $("#inp-edit-activity").empty();
                for (i in data) {
                    if (data[i].a == THISACTIVITY) {
                        $("#inp-edit-activity").val(data[i].label);
                    }
                }
            }
        });
    }
    $("#btn-modal-edit-activity-close").click(function() {
        modal.style.display = "none";
        $("#btn-new-observation-activity").trigger("click");
    });
};

let openActivityEditModal = (activity) => {
    console.log(activity);
    THISACTIVITY = activity;
    $("#btn-modal-item-activity-close").trigger("click");
    $("#btn-modal-open-edit-activity").trigger("click");
};

$('#btn-edit-activity-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-edit-activity").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.updateActivity(THISACTIVITY, $("#inp-edit-activity").val());
    }
});

initModalActivityEdit();

// Condition Edit

let initModalConditionEdit = () => {
    let modal = document.getElementById('modalEditCondition');
    let btn = document.getElementById("btn-modal-open-edit-condition");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/conditions",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log(data, THISCONDITION);
                $("#inp-edit-condition").empty();
                for (i in data) {
                    if (data[i].c == THISCONDITION) {
                        $("#inp-edit-condition").val(data[i].label);
                    }
                }
            }
        });
    }
    $("#btn-modal-edit-condition-close").click(function() {
        modal.style.display = "none";
        $("#btn-new-observation-condition").trigger("click");
    });
};

let openConditionEditModal = (condition) => {
    console.log(condition);
    THISCONDITION = condition;
    $("#btn-modal-item-condition-close").trigger("click");
    $("#btn-modal-open-edit-condition").trigger("click");
};

$('#btn-edit-condition-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-edit-condition").val();
    if (label === "") {
        showNotification('error', 'Error!', 'The label cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.updateCondition(THISCONDITION, $("#inp-edit-condition").val());
    }
});

initModalConditionEdit();