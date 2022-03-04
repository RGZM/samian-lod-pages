// realtions

let initModalFeatureRelationsEdit = () => {
    let modal = document.getElementById('modalFeatureRelationsEdit');
    let btn = document.getElementById("btn-modal-open-relationsedit-feature");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/features?type=feature&q=" + THISOBJECT,
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#feature-list-relations-features").empty();
                $("#feature-list-relations-features").append("<div class='kachelsubmit' id='btn-save-feature-relations'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                for (item in data) {
                    $("#feature-list-relations-features").append("<div class='featurekacheln select' id='" + data[item].f + "' onclick='selectFeatureInFeatureRelations(\"" + data[item].f + "\");'>" + data[item].label + "</div>");
                    $("#feature-list-relations-features").append("<div class='kachelinfo2' id='" + data[item].f + "-fcount' onclick=''><b>&raquo;" + data[item].typelabel + "&laquo; described with " + data[item].observations.length + " observations(s)</b></div>");
                    let observations = data[item].observations;
                    for (obs in observations) {
                        let ac = "";
                        for (ii in observations[obs].ac) {
                            ac += observations[obs].ac[ii] + ", ";
                        }
                        ac = ac.substring(0, ac.length - 2);
                        if (ac != "") {
                            ac = " > " + ac;
                        }
                        if (observations[obs].observationtype === "ars:Statement") {
                            $("#feature-list-relations-features").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>Statement " + ac + "</i></div>");
                        } else {
                            $("#feature-list-relations-features").append("<div class='kachelinfoindividual' id='" + observations[obs].observation + "' onclick=''><i>" + observations[obs].observationtypelabel + ac + "</i></div>");
                        }
                    }
                }
                $("#btn-save-feature-relations").click(function() {
                    console.log(THISFEATURE, THISFEATUREFEATURESELECTIONS);
                    RDF4J.updateFeaturFeatureRelations(THISFEATURE, THISFEATUREFEATURESELECTIONS);
                });
                selectFeatureRelFeaturefromStore();
            }
        });
    }
    $("#btn-modal-feature-relationsedit-feature-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-features-modal").trigger("click");
    });
};

let openFeatureRelationsEditModal = (feature) => {
    console.log(feature);
    THISFEATURE = feature;
    $("#btn-modal-features-overview-close").trigger("click");
    initModalFeatureRelationsEdit();
    $("#btn-modal-open-relationsedit-feature").trigger("click");
};

let selectFeatureRelFeaturefromStore = () => {
    THISFEATUREFEATURESELECTIONS = [];
    $('.select').each(function(i, obj) {
        $(this).addClass("kachelfeaturenotselected");
        $(this).removeClass("kachelfeatureselected");
    });
    $.ajax({
        type: "GET",
        url: API.BASE + "/features/" + THISFEATURE,
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log(data);
            let relF = data.relatedto;
            for (i in relF) {
                console.log(relF[i]);
                THISFEATUREFEATURESELECTIONS.push(relF[i]);
                $("#" + relF[i].replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + relF[i].replace(":", "\\:")).addClass("kachelfeatureselected");
            }
            console.log(THISFEATUREFEATURESELECTIONS);
        }
    });
};

let selectFeatureInFeatureRelations = (feature) => {
    let match = false;
    for (item in THISFEATUREFEATURESELECTIONS) {
        if (THISFEATUREFEATURESELECTIONS[item] == feature) {
            match = true;
        }
    }
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === feature) {
            if (match === true) {
                let index = THISFEATUREFEATURESELECTIONS.indexOf(feature);
                if (index > -1) {
                    THISFEATUREFEATURESELECTIONS.splice(index, 1);
                }
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (feature !== "null") {
                    THISFEATUREFEATURESELECTIONS.push(feature);
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        }
    });
    let uniqueFG = [];
    $.each(THISFEATUREFEATURESELECTIONS, function(i, el) {
        if ($.inArray(el, uniqueFG) === -1) uniqueFG.push(el);
    });
    THISFEATUREFEATURESELECTIONS = uniqueFG;
    console.log(THISFEATUREFEATURESELECTIONS);
};

// manufacturing

let initModalFeatureManufacturingEdit = () => {
    let modal = document.getElementById('modalFeatureManufacturingEdit');
    let btn = document.getElementById("btn-modal-open-manufacturing-feature");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/manufacturingfeaturetypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                $("#manufacturing-list-features").empty();
                $("#manufacturing-list-features").append("<div class='kachelsubmit' id='btn-new-mft' onclick='openFeatureManufacturingNewModal();'><i class='fa fa-plus' aria-hidden='true'></i>&nbsp;new Manufacturing Feature Type</div>");
                $("#manufacturing-list-features").append("<div class='kachelsubmit' id='btn-save-feature-relations'><i class='fa fa-floppy-o' aria-hidden='true'></i>&nbsp;save changes</div>");
                for (item in data) {
                    $("#manufacturing-list-features").append("<div class='featurekacheln select' id='" + data[item].id + "' onclick='selectManufacturingFeatureTypeByClick(\"" + data[item].id + "\");'>" + data[item].label + "</div>");
                    $("#manufacturing-list-features").append("<div class='featurekacheleditit' id='" + data[item].id + "-edit' onclick='openFeatureManufacturingEditingModal(\"" + data[item].id + "\");'><b><i class='fa fa-pencil' aria-hidden='true'></i> edit</b></div>");
                }
                $("#btn-save-feature-relations").click(function() {
                    RDF4J.updateManufaturingFeatureType(THISFEATURE, THISMANUFACTURINGFEATURETYPE);
                });
                selectManufacturingFeatureTypeFromStore();
            }
        });
    }
    $("#btn-modal-feature-manufacturing-close").click(function() {
        modal.style.display = "none";
        $("#btn-open-features-modal").trigger("click");
    });
};

let openFeatureManufacturingEditModal = (feature) => {
    console.log(feature);
    THISFEATURE = feature;
    $("#btn-modal-features-overview-close").trigger("click");
    initModalFeatureManufacturingEdit();
    $("#btn-modal-open-manufacturing-feature").trigger("click");
};

let selectManufacturingFeatureTypeFromStore = () => {
    THISMANUFACTURINGFEATURETYPE = "";
    $('.select').each(function(i, obj) {
        $(this).addClass("kachelfeaturenotselected");
        $(this).removeClass("kachelfeatureselected");
    });
    $.ajax({
        type: "GET",
        url: API.BASE + "/features/" + THISFEATURE,
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            console.log(data);
            let mft = data.manufacturing;
            if (mft !== "") {
                THISMANUFACTURINGFEATURETYPE = mft
                $("#" + mft.replace(":", "\\:")).removeClass("kachelfeaturenotselected");
                $("#" + mft.replace(":", "\\:")).addClass("kachelfeatureselected");
                console.log(THISMANUFACTURINGFEATURETYPE);
            }
        }
    });
};

let selectManufacturingFeatureTypeByClick = (mft) => {
    let match = false;
    if (THISMANUFACTURINGFEATURETYPE == mft) {
        match = true;
    }
    THISMANUFACTURINGFEATURETYPE = "";
    $('.select').each(function(i, obj) {
        if ($(this).attr('id') === mft) {
            if (match === true) {
                THISMANUFACTURINGFEATURETYPE = "";
                $(this).addClass("kachelfeaturenotselected");
                $(this).removeClass("kachelfeatureselected");
            } else {
                if (mft !== "null") {
                    THISMANUFACTURINGFEATURETYPE = mft;
                }
                $(this).removeClass("kachelfeaturenotselected");
                $(this).addClass("kachelfeatureselected");
            }
        } else {
            $(this).addClass("kachelfeaturenotselected");
            $(this).removeClass("kachelfeatureselected");
        }
    });
    console.log(THISMANUFACTURINGFEATURETYPE);
};

let initModalFeatureManufacturingNew = () => {
    let modal = document.getElementById('modalFeatureManufacturingNew');
    let btn = document.getElementById("btn-modal-open-manufacturing-feature-new");
    btn.onclick = function() {
        modal.style.display = "block";
        let label = $("#inp-edit-mft-name").val("");
        let meta = $("#inp-edit-mft-meta").val("");
    }
    $("#btn-modal-feature-manufacturing-new-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-manufacturing-feature").trigger("click");
    });
};

let openFeatureManufacturingNewModal = () => {
    $("#btn-modal-feature-manufacturing-close").trigger("click");
    initModalFeatureManufacturingNew();
    $("#btn-modal-open-manufacturing-feature-new").trigger("click");
};

$('#btn-new-mft-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-edit-mft-name").val();
    let meta = $("#inp-edit-mft-meta").val();
    if (label === "" || meta === "") {
        showNotification('error', 'Error!', 'The label and/or meta ID cannot be empty!');
        ok = false;
    }
    if (checkLabelStringIfOK(label) === false) {
        showNotification('error', 'Error!', 'Wrong sign in label!');
        ok = false;
    }
    if (ok) {
        RDF4J.createManufacturingFeatureType(label, meta, console.log)
    }
});

let initModalFeatureManufacturingEditing = (mft) => {
    let modal = document.getElementById('modalFeatureManufacturingEditing');
    let btn = document.getElementById("btn-modal-open-manufacturing-feature-editing");
    btn.onclick = function() {
        modal.style.display = "block";
        $.ajax({
            type: "GET",
            url: API.BASE + "/fixedvalues/manufacturingfeaturetypes",
            async: false,
            error: function(jqXHR, textStatus, errorThrown) {},
            success: function(data) {
                for (item in data) {
                    if (data[item].id === mft) {
                        $("#inp-editing-mft-name").val(data[item].label);
                        $("#inp-editing-mft-meta").val(data[item].meta);
                        THISMANUFACTURINGFEATURETYPE = mft;
                    }
                }
            }
        });
    }
    $("#btn-modal-feature-manufacturing-editing-close").click(function() {
        modal.style.display = "none";
        $("#btn-modal-open-manufacturing-feature").trigger("click");
    });
};

let openFeatureManufacturingEditingModal = (mft) => {
    $("#btn-modal-feature-manufacturing-close").trigger("click");
    initModalFeatureManufacturingEditing(mft);
    $("#btn-modal-open-manufacturing-feature-editing").trigger("click");
};

$('#btn-editing-mft-submit').on('click', (event) => {
    let ok = true;
    let label = $("#inp-editing-mft-name").val();
    let meta = $("#inp-editing-mft-meta").val();
    if (label === "" || meta === "") {
        showNotification('error', 'Error!', 'The label and/or meta ID cannot be empty!');
        ok = false;
    }
    if (ok) {
        RDF4J.modifyManufacturingFeatureType(THISMANUFACTURINGFEATURETYPE, label, meta, console.log)
    }
});