// Item Individual Edit

let initModalItemIndividualEdit = () => {
    let modal = document.getElementById('modalEditItemIndividual');
    let btn = document.getElementById("btn-modal-open-edit-ii");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/observationclassitems?oc=" + THISITEMCLASS,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                console.log(data, THISITEMCLASS, THISITEMINDIVIDUAL);
                $("#inp-edit-ii").empty();
                for (i in data) {
                    if (data[i].i == THISITEMINDIVIDUAL) {
                        $("#inp-edit-ii").val(data[i].label);
                    }
                }
                $("#inp-edit-ii-meta").empty();
                for (i in data) {
                    if (data[i].i == THISITEMINDIVIDUAL) {
                        $("#inp-edit-ii-meta").val(data[i].meta);
                    }
                }
            }
        });
    }
    $("#btn-modal-edit-ii-close").click(function() {
        modal.style.display = "none";
    });
};

let openItemEditModal = (item) => {
    console.log(item);
    THISITEMINDIVIDUAL = item;
    $("#btn-modal-item-ii-close").trigger("click");
    $("#btn-modal-open-edit-ii").trigger("click");
};

$('#btn-edit-ii-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-edit-ii").val();
    let meta = $("#inp-edit-ii-meta").val();
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
        RDF4J.updateItemIndividual(THISITEMINDIVIDUAL, label, meta);
    }
});

initModalItemIndividualEdit();