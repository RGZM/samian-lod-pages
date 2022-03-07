let ArrNoDupe = (a) => {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
};

let findGetParameter = (parameterName) => {
    let result = null;
    let tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
};

let termObject = {};
let objectStatement = {};
let featureObject = {};

let setObjectGallery = () => {
    console.log(document.getElementById("objects_gallery"));
    $('#objects_gallery').nanogallery2({
        itemsBaseURL: "",
        thumbnailWidth: "auto",
        thumbnailHeight: "600",
        thumbnailBorderVertical: 0,
        thumbnailBorderHorizontal: 0,
        colorScheme: {
            "thumbnail": {
                "background": "rgba(50,102,144,1)"
            }
        },
        thumbnailDisplayInterval: 30,
        thumbnailLabel: {
            "display": false
        },
        galleryDisplayMode: "pagination",
        galleryLastRowFull: true,
        galleryPaginationMode: "dots",
        thumbnailAlignment: "center",
        thumbnailLevelUp: true
    });
    console.log($("#objects_gallery").nanogallery2('data'));
    //window.location.hash = '#breadcrumb';
};

let loadTerm = () => {
    let query = "SELECT * WHERE { ?item rdfs:label ?label. FILTER (?item = samian:" + findGetParameter("resource") + ") }";
    RDF4J.query(query, visData);
}

let ObjectSize = (obj) => {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

let visData = (termObject) => {
    termObject = termObject.results.bindings[0];
    console.log(termObject);

    let objectdataImagesDiv = "";
    let objectdataDetailsDiv = "";
    let objectdataTechnicalDetailsDiv = "";
    let objectdataTechnicalDetails2Div = "";

    let searchResultsDiv = "";
    let objectdataRightDiv = "";
    let objectdataLeft2Div = "";
    let objectdataRight2Div = "";
    let objectdataDatingsDiv = "";
    let objectdataLiteratureDiv = "";

    clickedKachel = termObject.id;

    // object
    searchResultsDiv += "<div class='box-resultlist-eighty' id='" + termObject.id + "'>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + termObject['label']['value'] + "</h1>";

    // add primary Image
    searchResultsDiv += '<div id="objectdata_images">';
    objectdataImagesDiv += '<div id="objects_gallery">';
    objectdataImagesDiv += '<div class="box-thumbnail-div box-thumbnail-div3"></div>';
    objectdataImagesDiv += '</div>';
    searchResultsDiv += "</div>";

    // add Object Data
    searchResultsDiv += '<div id="object_details"></div>';
    objectdataDetailsDiv += '<br><h3><center><img src="al_circle_icon.png" height="100">&nbsp;&nbsp;&nbsp;<img src="losm_circle_icon.png" height="100"></center></h3>';
    objectdataDetailsDiv += '<h3>Object Data</h3>';
    let tmp = "";
    //if (termObject.keywords.objecttype.length == 0) {
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-material" + "'><li class='list-group-item panel-item'><span class='badge'>" + "material" + "</span>" + "<span class='label label-default font12'>not defined</span>" + "</li></ul>";
    /*} else {
        for (item in termObject.keywords.objecttype) {
            tmp = tmp + termObject.keywords.objecttype[item].en + ", ";
        }
        tmp = tmp.substring(0, tmp.length - 2);
        objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-type" + "'><li class='list-group-item panel-item'><span class='badge'>" + "object type" + "</span>" + tmp + "</li></ul>";
    }*/

    // add object metadata
    searchResultsDiv += '<div id="object_technicaldata"></div>';
    objectdataTechnicalDetailsDiv += '<h3>Metadata</h3>';
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-uuid" + "'><li class='list-group-item panel-item'><span class='badge'>" + "URI" + "</span>" + termObject['item']['value'].replace("samian:", "http://data.archaeology.link/data/samian/") + "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-label" + "'><li class='list-group-item panel-item'><span class='badge'>" + "label" + "</span>" + termObject['label']['value'] + "</li></ul>";
    let str_origin = "Samian Research";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-origin" + "'><li class='list-group-item panel-item'><span class='badge'>" + "origin" + "</span>" + str_origin + "</li></ul>";

    // add project metadata
    objectdataTechnicalDetailsDiv += '<h3>Project Data</h3>';
    let name = "Linked Open Samian Ware, originally " + str_origin;
    let name_wd = "https://www.wikidata.org/entity/xxx";
    let funding = "RGZM, originally ...";
    let funding_wd = "xxx";
    funding_wd = funding_wd.replace("/wiki/", "/entity/");
    let appl1 = "RGZM";
    let appl1_wd = "xxx";
    appl1_wd = appl1_wd.replace("/wiki/", "/entity/");
    let start = "19..";
    let end = "19..";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "name" + "</span>" + "<a href='" + name_wd + "' target='_blank'>" + name + "</a>" +
        "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-2" + "'><li class='list-group-item panel-item'><span class='badge'>" + "funding" + "</span>" + "<a href='" + funding_wd + "' target='_blank'>" + funding +
        "</a>" + "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-3" + "'><li class='list-group-item panel-item'><span class='badge'>" + "applicant" + "</span>" + "<a href='" + appl1_wd + "' target='_blank'>" + appl1 + "</a>" +
        "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-4" + "'><li class='list-group-item panel-item'><span class='badge'>" + "duration" + "</span>" + "<i>" + start + " - " + end + "</i>" + "</li></ul>";
    objectdataTechnicalDetailsDiv += '</div>';
    //$("#object_technicaldata").append(objectdataTechnicalDetailsDiv);
    /*let id = findGetParameter("id").replace("ars3do:", "");
    console.log(id, GS.METAJSON);
    let json_url = GS.METAJSON.replace("$1", id);
    json_url = json_url.replace("$2", id);
    getScanMetadata(json_url, objectdataTechnicalDetails2Div, setScanMetadata);*/

    $("#content_kacheln").html(searchResultsDiv);
    $("#objectdata_images").html(objectdataImagesDiv);
    $("#object_details").html(objectdataDetailsDiv);
    $("#object_technicaldata").html(objectdataTechnicalDetailsDiv);
    $("#objectdata_features").html(featureDataDetailsDiv);

    $(".group1").colorbox({
        rel: 'group1',
        maxWidth: '75%',
        maxHeight: '75%',
    });

    $(".group2").colorbox({
        rel: 'group2',
        maxWidth: '75%',
        maxHeight: '75%',
    });

    setObjectGallery();

    // scroll to feature
    let urlFeature = findGetParameter("feature");
    if (urlFeature !== null) {
        let thisFeature = document.getElementById(urlFeature);
        console.log(urlFeature, thisFeature);
        thisFeature.scrollIntoView(true);
    } else {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    }
};

loadTerm();