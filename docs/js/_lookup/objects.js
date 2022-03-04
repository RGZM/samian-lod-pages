let initLoad = () => {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/npi/navone/searchobj",
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {},
        success: function(data) {
            //console.log("objects", data);
            showTiles(data);
        }
    });
};

let showTiles = (data) => {
    console.log(data);
    $("#content").empty();
    let searchResultsDiv = "";
    let i = 0;
    objectidlist = [];
    for (item in data) {
        //clickedKachel = bindings[item].obj.value;
        searchResultsDiv += "<div class='box-resultkacheln box-object' id='" + data[item].id + "' onclick='openDetail(\"" + data[item].id + "\")'>";
        let name = "";
        let nameLength = 50;
        if (data[item].label.length > nameLength) {
            name = data[item].label.substring(0, nameLength) + " ...";
        } else {
            name = data[item].label;
        }
        searchResultsDiv += "<div class='box-header-div' style='text-align:center;'><b>" + name + "</b><br><span><i style='font-size:13px;'><b>NAVISone-ID</b>: " + data[item].id + "</i></span></div>";
        searchResultsDiv += '<div class="box-thumbnail-div"><img src="img/' + data[item].thumbnail + '" class="thumbnail" onerror="this.onerror=null;this.src=\'img/dummy.png\';"></div>';
        searchResultsDiv += "</div>";
        objectidlist.push(data[item].id);
        i++;
    }
    $("#span-count").html("<b style='color:#2b597d;'>" + i + "</b> NAVISone Objects");
    $("#span-loading").html("loading...");
    $("#content").html(searchResultsDiv);
    loadStart();
};

// load types

let loadStart = () => {
    objlist_str = objectidlist.toString();
    API.getSearchValuesAndObjectCountPOST("lut_objecttype", objlist_str, loadObjecttypes);
};

let loadObjecttypes = (response) => {
    $("#panel-objecttype").empty();
    data = response;
    for (item in data) {
        $("#panel-objecttype").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-type" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    API.getSearchValuesAndObjectCountPOST("lut_material", objlist_str, loadObjectMaterial);
};

let loadObjectMaterial = (response) => {
    $("#panel-material").empty();
    data = response;
    for (item in data) {
        $("#panel-material").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-material" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    API.getSearchValuesAndObjectCountPOST("lut_technique", objlist_str, loadObjectTechnique);
};

let loadObjectTechnique = (response) => {
    $("#panel-technique").empty();
    data = response;
    for (item in data) {
        $("#panel-technique").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-technique" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    API.getSearchValuesAndObjectCountPOST("lut_culture", objlist_str, loadObjectCulture);
};

let loadObjectCulture = (response) => {
    $("#panel-culture").empty();
    data = response;
    for (item in data) {
        $("#panel-culture").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-technique" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    API.getSearchValuesAndObjectCountPOST("lut_person", objlist_str, loadObjectPerson);
};

let loadObjectPerson = (response) => {
    $("#panel-person").empty();
    data = response;
    for (item in data) {
        $("#panel-person").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-technique" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    API.getSearchValuesAndObjectCountPOST("lut_depository", objlist_str, loadObjectInstitution);
};

/*let loadObjectCountry = (response) => {
    $("#panel-country").empty();
    data = response;
    for (item in data) {
        $("#panel-country").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-technique" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    API.getSearchValuesAndObjectCountPOST("lut_depository", objlist_str, loadObjectPOI);
};

let loadObjectPOI = (response) => {
    $("#panel-poi").empty();
    data = response;
    for (item in data) {
        $("#panel-poi").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-technique" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    API.getSearchValuesAndObjectCountPOST("lut_depository", objlist_str, loadObjectInstitution);
};*/

let loadObjectInstitution = (response) => {
    $("#panel-institution").empty();
    data = response;
    for (item in data) {
        $("#panel-institution").append("<ul class='list-group panel-item2' id='" + data[item].id + "' onclick='selectKey(\"" + data[item].id + "\",\"" + data[item].label_en + "\",\"" + "object-technique" +
            "\");'><li class='list-group-item panel-item'><span class='badge'>" + data[item].count + "</span>" + data[item].label_en + "</li></ul>");
    }
    $("#span-loading").html("loaded!");
};

let paramList = [];

let selectKey = (key, label, attribute) => {
    let multiple = false;
    for (attr in keylist) {
        if (keylist[attr][0] === key) {
            multiple = true;
        }
    }
    if (multiple === false) {
        if (attribute !== "substr") {
            keylist.push([key, label, attribute]);
            paramList.push(key);
            console.log("keylist", keylist, paramList.toString());
            let labelclass = "label-green";
            $("#div-keys").append("<div class='" + labelclass + " deletekey' style='clear:both;width:100%;font-size:11px;margin-bottom:5px;' onclick='deleteKey(\"" + key + "\");' id='k-" + key +
                "'><div style='float:left;width:100%;font-style: italic;color:white;text-align:center;padding-top:7px;padding-bottom:7px;'>" + attribute.replace("-", " ") +
                "</div><div style='width:100%;font-weight:600;color:white;text-align:center;padding-top:7px;padding-bottom:7px;'>" + label + "</span></div>");
        }
        API.getSearchObjectsForParamListCountPOST(paramList.toString(), showTiles);
        if ($("#inp-search").val().length > 0) {
            $("#inp-search").focus();
        }
    }
};

let deleteKey = (key) => {
    let index = -1;
    let i = 0;
    for (attr in keylist) {
        if (keylist[attr][0] === key) {
            index = i;
        }
        i++;
    }
    keylist.splice(index, 1);
    console.log("keylist", keylist);
    paramList = [];
    for (i in keylist) {
        paramList.push(keylist[i][0]);
    }
    let el = document.getElementById("k-" + key);
    el.remove();

    jump("header");
    $("#span-count").html("loading...");
    $("#span-loading").html("loading...");
    if (keylist.length === 0 && $("#inp-search").val().length == 0) {
        initLoad();
    } else {
        API.getSearchObjectsForParamListCountPOST(paramList.toString(), showTiles);
    }
    if ($("#inp-search").val().length > -1) {
        document.getElementById("inp-search").focus();
        document.getElementById("inp-search").select();
    }
};