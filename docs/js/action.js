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
    let query = "SELECT * WHERE { samian:loc_ds_1000955 ?p ?o. }";
    RDF4J.query(query, visData);
}


/*$.ajax({
        type: "GET",
        url: "http://localhost:8080/nopi/rest/objects/" + findGetParameter("id"),
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function(data) {
            termObject = data;
            sparql =
                "SELECT DISTINCT ?classificationNumber ?comment ?typLabel ?bookLabel WHERE { " + findGetParameter("id") +
                " ars:is_stated_by ?s. ?s a ars:Statement. ?s rdfs:label ?l. ?s rdfs:comment ?comment. ?s crm:P2_has_type ?type. ?type ars:classification-number ?classificationNumber. ?type rdf:type ?tr. ?tr rdfs:label ?typLabel. ?tr ars:hasOriginIn ?b. ?b rdfs:label ?bookLabel. }"
            $.ajax({
                type: 'POST',
                url: RDF4J.SPARQLQUERY,
                data: {
                    query: encodeURIComponent(RDF4J.PREFIXES + sparql),
                    out: "json"
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                },
                success: function(sparql1) {
                    let bindings = sparql1.results.bindings;
                    objectStatement = Object.assign({}, bindings);
                    $.ajax({
                        type: "GET",
                        url: API.BASE + "/features?type=feature&q=" + findGetParameter("id"),
                        async: false,
                        error: function(jqXHR, textStatus, errorThrown) {},
                        success: function(data2) {
                            console.log(data2);
                            featureObject = data2;

                        }
                    });
                    visData();
                }
            });
        }
    });
}*/

let ObjectSize = (obj) => {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

let getScanMetadata = (json_url, divstr, callback, spinner, target) => {
    setTimeout(function() {
        $.ajax({
            type: 'GET',
            async: false,
            url: json_url,
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                if (typeof callback === 'function') {
                    callback(response, json_url, divstr);
                } else {
                    console.log(response);
                }
            }
        });
    }, 0);
};

let setScanMetadata = (data, json_url, divstr) => {
    console.log("setScanMetadata", data, json_url, divstr);
    let objectdataTechnicalDetailsDiv = divstr;
    // add project metadata
    objectdataTechnicalDetailsDiv += '<h3>Project Data</h3>';
    let name = "ARS3D African Red Slip Ware digital";
    let name_wd = "https://www.wikidata.org/entity/Q105268778";
    let funding = data['projects'][0]['general']['research_project']['funding']['value_label'];
    let funding_wd = data['projects'][0]['general']['research_project']['funding']['value'];
    funding_wd = funding_wd.replace("/wiki/", "/entity/");
    let appl1 = data['projects'][0]['general']['research_project']['applicants'][0]['institute']['value_label'];
    let appl1_wd = data['projects'][0]['general']['research_project']['applicants'][0]['institute']['value'];
    appl1_wd = appl1_wd.replace("/wiki/", "/entity/");
    let appl2 = data['projects'][0]['general']['research_project']['applicants'][1]['institute']['value_label'];
    let appl2_wd = data['projects'][0]['general']['research_project']['applicants'][1]['institute']['value'];
    appl2_wd = appl2_wd.replace("/wiki/", "/entity/");
    let start = data['projects'][0]['general']['research_project']['duration']['project_start']['value'];
    let end = data['projects'][0]['general']['research_project']['duration']['project_end']['value'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "name" + "</span>" + "<a href='" + name_wd + "' target='_blank'>" + name + "</a>" +
        "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-2" + "'><li class='list-group-item panel-item'><span class='badge'>" + "funding" + "</span>" + "<a href='" + funding_wd + "' target='_blank'>" + funding +
        "</a>" + "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-3" + "'><li class='list-group-item panel-item'><span class='badge'>" + "applicant" + "</span>" + "<a href='" + appl1_wd + "' target='_blank'>" + appl1 + "</a>" +
        "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-4" + "'><li class='list-group-item panel-item'><span class='badge'>" + "applicant" + "</span>" + "<a href='" + appl2_wd + "' target='_blank'>" + appl2 + "</a>" +
        "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-4" + "'><li class='list-group-item panel-item'><span class='badge'>" + "duration" + "</span>" + "<i>" + start + " - " + end + "</i>" + "</li></ul>";
    // Scan Metadata
    objectdataTechnicalDetailsDiv += '<h3>Scan/3D-Model Data <a href="' + json_url + '" target="_blank"><span class=\'label label-3dmodel objectdatafsb\'>download metadata</span></a></h3>';
    let date = data['projects'][0]['measurement_series'][0]['measurements'][0]['measurement_properties']['acquisition_time']['value'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "capturing date" + "</span>" + "<i>" + date + "</i>" + "</li></ul>";
    let who = data['projects'][0]['general']['3d_creation']['3d_creator']['employed_by']['value_label'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "captured by" + "</span>" + "<i>" + who + "</i>" + "</li></ul>";
    let lizenz = data['projects'][0]['general']['license']['license_3d_modell']['value_label'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "license" + "</span>" + "<i>" + lizenz + "</i>" + "</li></ul>";
    let copyright = data['projects'][0]['general']['license']['copyright']['value_label'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "copyright" + "</span>" + "<i>" + copyright + "</i>" + "</li></ul>";
    // 3D-Aufnahme
    objectdataTechnicalDetailsDiv += '<h3>3D Capturing</h3>';
    let capturing_device_1 = 'structured light scanner';
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "capturing device" + "</span>" + "<i>" + capturing_device_1 + "</i>" +
        "</li></ul>";
    let sensor1 = data['projects'][0]['measurement_series'][0]['sensors'][0]['capturing_device']['sensor_type']['value'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "sensor" + "</span>" + "<i>" + sensor1 + "</i>" + "</li></ul>";
    let cam_img_h = data['projects'][0]['measurement_series'][0]['measurements'][0]['measurement_setup']['image_height']['value'];
    let cam_img_w = data['projects'][0]['measurement_series'][0]['measurements'][0]['measurement_setup']['image_width']['value'];
    let cam_resolution1 = parseInt((cam_img_h * cam_img_w) / 1000000);
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "camera resolution" + "</span>" + "<i>" + cam_resolution1 + " MegaPixel</i>" +
        "</li></ul>";
    let mv_length = data['projects'][0]['measurement_series'][0]['sensors'][0]['capturing_device']['measuring_volume_length']['value'];
    let mv_width = data['projects'][0]['measurement_series'][0]['sensors'][0]['capturing_device']['measuring_volume_width']['value'];
    let mv_depth = data['projects'][0]['measurement_series'][0]['sensors'][0]['capturing_device']['measuring_volume_depth']['value'];
    let mv = parseInt(mv_length) + "mm x " + parseInt(mv_width) + "mm x " + parseInt(mv_depth) + "mm";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "measuring volume" + "</span>" + "<i>" + mv + "</i>" + "</li></ul>";
    let theo_point_distance = data['projects'][0]['measurement_series'][0]['sensors'][0]['capturing_device']['theoretical_measuring_point_distance']['value'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "theoretical measuring point distance" + "</span>" + "<i>" + theo_point_distance +
        "mm</i>" +
        "</li></ul>";
    "</li></ul>";
    objectdataTechnicalDetailsDiv += '<h3>3D Model</h3>';
    // 3D-Modell
    let num_points = data['projects'][0]['meshes'][0]['mesh_information']['num_points']['value'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "number of points" + "</span>" + "<i>" + num_points + "</i>" + "</li></ul>";
    let num_triangles = data['projects'][0]['meshes'][0]['mesh_information']['num_triangles']['value'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "number of triangles" + "</span>" + "<i>" + num_triangles + "</i>" + "</li></ul>";
    let area_cm = parseInt((data['projects'][0]['meshes'][0]['mesh_information']['area']['value']) / 100);
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "area" + "</span>" + "<i>" + area_cm + "cm²</i>" + "</li></ul>";
    let scale = "1:1";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "scale" + "</span>" + "<i>" + scale + "</i>" + "</li></ul>";
    // Texturing
    objectdataTechnicalDetailsDiv += '<h3>Texturing</h3>';
    let capturing_device_2 = 'structure from motion';
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "capturing device" + "</span>" + "<i>" + capturing_device_2 + "</i>" +
        "</li></ul>";
    let sensor2 = data['projects'][1]['chunks'][0]['sensors'][0]['capturing_device']['name']['value'];
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "sensor" + "</span>" + "<i>" + sensor2 + "</i>" + "</li></ul>";
    "</li></ul>";
    let img_h = data['projects'][1]['chunks'][0]['sensors'][0]['calibration']['cal_properties']['image_height']['value'];
    let img_w = data['projects'][1]['chunks'][0]['sensors'][0]['calibration']['cal_properties']['image_width']['value'];
    let cam_resoulution2 = parseInt((img_h * img_w) / 1000000);
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-scan1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "camera resoulution" + "</span>" + "<i>" + cam_resoulution2 + " MegaPixel</i>" +
        "</li></ul>";
    objectdataTechnicalDetailsDiv += '</div>';
    $("#object_technicaldata").html(objectdataTechnicalDetailsDiv);
};

let visData = (termObject) => {
    termObject = termObject.results.bindings;
    console.log(termObject);
    // vars
    let lang = "";
    if (findGetParameter("lang") === null) {
        lang = "en";
    } else {
        if (findGetParameter("lang").includes("de")) {
            lang = "de";
        } else if (findGetParameter("lang").includes("en")) {
            lang = "en";
        } else {
            lang = "en";
        }
    }

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
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + termObject.name + " <i>(ID: " + termObject.id + ")</i></h1>";

    // add primary Image
    searchResultsDiv += '<div id="objectdata_images">';
    objectdataImagesDiv += '<div id="objects_gallery">';
    objectdataImagesDiv += '<div class="box-thumbnail-div box-thumbnail-div3"></div>';
    objectdataImagesDiv += '</div>';
    searchResultsDiv += "</div>";

    // add Object Data
    searchResultsDiv += '<div id="object_details"></div>';
    objectdataDetailsDiv += '<br><h3><center><img src="logo_white.png" height="80"></center></h3>';
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
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-uuid" + "'><li class='list-group-item panel-item'><span class='badge'>" + "URI" + "</span>" + "http://data.archaeology.link/data/navisone/obj_" + termObject.id + "</li></ul>";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-label" + "'><li class='list-group-item panel-item'><span class='badge'>" + "label" + "</span>" + termObject.name + "</li></ul>";
    let str_origin = "Samian Research";
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-origin" + "'><li class='list-group-item panel-item'><span class='badge'>" + "origin" + "</span>" + str_origin + "</li></ul>";

    // add project metadata
    objectdataTechnicalDetailsDiv += '<h3>Project Data</h3>';
    let name = "NAVIS.one, originally " + str_origin;
    let name_wd = "https://www.wikidata.org/entity/xxx";
    let funding = "RGZM, originally European Union";
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

    // features
    searchResultsDiv += '<div class="header_details">Object Features</div>';
    searchResultsDiv += '<div id="objectdata_features"></div>';
    featureDataDetailsDiv = "";
    let i = 1;
    let classfeat = "";
    // single feature box
    // calculate dynamical heights for 2 boxes in a line
    let featureHeightList = [];
    let featureHeightList2 = [];
    for (f in featureObject) {
        let observationsCount = 0;
        let observations = featureObject[f].observations;
        for (obs in observations) {
            observationsCount++;
        }
        let divheight = 600 + (observationsCount * 55);
        featureHeightList.push(divheight);
    }
    console.log(featureHeightList);
    for (let k = 0; k < featureHeightList.length; k += 2) {
        let lineHeight = -1;
        if (featureHeightList[k + 1] > featureHeightList[k]) {
            lineHeight = featureHeightList[k + 1]
        } else {
            lineHeight = featureHeightList[k]
        }
        featureHeightList2.push(lineHeight);
        featureHeightList2.push(lineHeight);
    }
    console.log(featureHeightList2);
    // style feature box
    for (f in featureObject) {
        if (i % 2 === 0) {
            classfeat = "featuredatare";
        } else {
            classfeat = "featuredatali";
        }
        i++;
        let divheightCss = featureHeightList2.at(i - 2) + "px";
        console.log(featureObject[f].f, divheightCss);
        // box
        featureDataDetailsDiv += '<div id="' + featureObject[f].f + '" class="' + classfeat + '" style="height: ' + divheightCss + ' !important">';
        let geombrowser = "viewer.htm?model_id=" + findGetParameter("id") + "&feature_id=" + featureObject[f].f;
        featureDataDetailsDiv += '<h3>Feature <a href="' + geombrowser + '" target="_blank"><span class=\'label label-3dmodel objectdatafsb\'>go to 3D model</span></a></h3>';
        featureDataDetailsDiv += '<img src="img/feature/' + featureObject[f].f.replace("ars3df:", "") + '.png" class="thumbnail a2 thumbnail2"><br>';
        featureDataDetailsDiv += "<ul class='list-group panel-item2' id='" + "feature-label" + "'><li class='list-group-item panel-item'><span class='badge'>" + "label" + "</span>" + featureObject[f].label + "</li></ul>";
        featureDataDetailsDiv += "<ul class='list-group panel-item2' id='" + "feature-typelabel" + "'><li class='list-group-item panel-item'><span class='badge'>" + "feature type" + "</span>" + featureObject[f].typelabel + "</li></ul>";
        if (featureObject[f].manufacturinglabel !== "") {
            featureDataDetailsDiv += "<ul class='list-group panel-item2' id='" + "feature-manufacturinglabel" + "'><li class='list-group-item panel-item'><span class='badge'>" + "manufacturing type" + "</span>" + featureObject[f].manufacturinglabel +
                "</li></ul>";
        } else {
            featureDataDetailsDiv += "<ul class='list-group panel-item2' id='" + "feature-manufacturinglabel" + "'><li class='list-group-item panel-item'><span class='badge'>" + "manufacturing type" + "</span>" + "<i>n/a</i>" +
                "</li></ul>";
        }
        featureDataDetailsDiv += "<ul class='list-group panel-item2' id='" + "feature-date" + "'><li class='list-group-item panel-item'><span class='badge'>" + "creation date" + "</span>" + featureObject[f].date + "</li></ul>";
        let observations = featureObject[f].observations;
        let opsi = 0;
        for (obs in observations) {
            opsi = opsi + 1;
            let classstr = "";
            let obsinfo = "";
            if (featureObject[f].observations[obs].observationtypelabel === "Stated Statement") {
                classstr = "Statement";
                obsinfo = featureObject[f].observations[obs].ac.toString();
            } else {
                classstr = featureObject[f].observations[obs].observationlabel;
                obsinfo = featureObject[f].observations[obs].ac.toString();
            }
            if (obsinfo != "" && classstr !== "Statement") {
                featureDataDetailsDiv += "<ul class='list-group panel-item2' id='obs-" + opsi + "'><li class='list-group-item panel-item'><span class='badge'>observation</span>" + obsinfo + "</li></ul>";
            } else if (obsinfo === "" && classstr !== "Statement") {
                featureDataDetailsDiv += "<ul class='list-group panel-item2' id='obs-" + opsi + "'><li class='list-group-item panel-item'><span class='badge'>observation</span>" + classstr + "</li></ul>";
            }
        }
        for (obs in observations) {
            opsi = opsi + 1;
            let classstr = "";
            let obsinfo = "";
            if (featureObject[f].observations[obs].observationtypelabel === "Stated Statement") {
                classstr = "Statement";
                obsinfo = featureObject[f].observations[obs].observationlabel;
            } else {
                classstr = featureObject[f].observations[obs].observationlabel;
                obsinfo = featureObject[f].observations[obs].ac.toString();
            }
            if (obsinfo != "" && classstr === "Statement") {
                featureDataDetailsDiv += "<ul class='list-group panel-item2' id='obs-" + opsi + "'><li class='list-group-item panel-item'><span class='badge'>statement</span>" + obsinfo + "</li></ul>";
            }
        }
        featureDataDetailsDiv += "</div>";
    }

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