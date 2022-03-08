let loadMap = (id, wkt, type) => {
    console.log(wkt);
    let geommap = L.map(id).setView([0, 0], 1);
    /*L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
    }).addTo(geommap);*/
    L.tileLayer.grayscale('http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri ',
        minZoom: 1,
        maxZoom: 16,
        ext: 'jpg'
    }).addTo(geommap);
    L.geoJSON(rivers, {
        style: function(feature) {
            return {
                color: "#326690",
                weight: 1
            };
        }
    }).addTo(geommap);
    L.geoJSON(canals, {
        style: function(feature) {
            return {
                color: "#326690",
                weight: 1
            };
        }
    }).addTo(geommap);
    if (type != 0) {
        let geojson = Terraformer.WKT.parse(wkt);
        let geojsonMarkerOptions = {
            radius: 5,
            fillColor: "#d9534f",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1.0
        };
        let layer = L.geoJson(geojson, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(geommap);
        let bounds = geojson.bbox();
        geommap.fitBounds([
            [bounds[1], bounds[0]],
            [bounds[3], bounds[2]]
        ]);
        geommap.setZoom(4);
    } else {
        let geojson = Terraformer.WKT.parse("POINT(0 50)");
        let bounds = geojson.bbox();
        geommap.fitBounds([
            [bounds[1], bounds[0]],
            [bounds[3], bounds[2]]
        ]);
        geommap.setZoom(2);
    }
};

let loc_ds = (termObject) => {

    // object
    searchResultsDiv += "<div class='box-resultlist-eighty' id='" + termObject['item']['value'] + "'>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + termObject['label']['value'] + "</h1>";

    // add map / image
    searchResultsDiv += "<div id='map-poi'></div>";
    //searchResultsDiv += '<div id="objectdata_images">';
    /*objectdataImagesDiv += '<div id="objects_gallery">';
    objectdataImagesDiv += '<div class="box-thumbnail-div box-thumbnail-div3"></div>';
    objectdataImagesDiv += '</div>';*/
    //searchResultsDiv += "</div>";

    // add Object Data
    searchResultsDiv += '<div id="object_details"></div>';
    objectdataDetailsDiv += '<br><h3><center><img src="al_circle_icon.png" height="80">&nbsp;&nbsp;&nbsp;<img src="losm_circle_icon.png" height="80"></center></h3>';
    objectdataDetailsDiv += '<h3>Metadata</h3>';
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-uuid" + "'><li class='list-group-item panel-item'><span class='badge'>" + "URI / permalink" + "</span>" + termObject['item']['value'].replace("samian:", "http://data.archaeology.link/data/samian/") + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-label" + "'><li class='list-group-item panel-item'><span class='badge'>" + "label" + "</span>" + termObject['label']['value'] + "</li></ul>";
    let str_origin = "Samian Research";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-origin" + "'><li class='list-group-item panel-item'><span class='badge'>" + "origin" + "</span>" + str_origin + "</li></ul>";
    let types = termObject['types']['value'].replaceAll("http://archaeology.link/ontology#", "lado:")
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-type" + "'><li class='list-group-item panel-item'><span class='badge'>" + "type" + "</span>" + types + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-identifier" + "'><li class='list-group-item panel-item'><span class='badge'>" + "identifier" + "</span>" + termObject['identifier']['value'] + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-update" + "'><li class='list-group-item panel-item'><span class='badge'>" + "last update" + "</span>" + termObject['lastupdate']['value'] + "</li></ul>";
    // add project metadata
    objectdataDetailsDiv += '<h3>Project Data</h3>';
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
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "name" + "</span>" + "<a href='" + name_wd + "' target='_blank'>" + name + "</a>" +
        "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-2" + "'><li class='list-group-item panel-item'><span class='badge'>" + "funding" + "</span>" + "<a href='" + funding_wd + "' target='_blank'>" + funding +
        "</a>" + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-3" + "'><li class='list-group-item panel-item'><span class='badge'>" + "applicant" + "</span>" + "<a href='" + appl1_wd + "' target='_blank'>" + appl1 + "</a>" +
        "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-4" + "'><li class='list-group-item panel-item'><span class='badge'>" + "duration" + "</span>" + "<i>" + start + " - " + end + "</i>" + "</li></ul>";
    objectdataDetailsDiv += '</div>';

    // add object metadata
    searchResultsDiv += '<div id="object_technicaldata"></div>';
    objectdataTechnicalDetailsDiv += '<h3>Objectdata</h3>';
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-wikidata" + "'><li class='list-group-item panel-item'><span class='badge'>" + "Wikidata ID" + "</span>" + termObject['wikidata']['value'].replace("samian:", "http://data.archaeology.link/data/samian/") + "</li></ul>";
    if (termObject['pleiades']['value'] == "undefined") {
        objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-pleiades" + "'><li class='list-group-item panel-item'><span class='badge'>" + "Pleiades ID" + "</span>" + "<span class='label label-default font12'>not defined</span>" + "</li></ul>";
    } else {
        objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-pleiades" + "'><li class='list-group-item panel-item'><span class='badge'>" + "Pleiades ID" + "</span>" + termObject['pleiades']['value'].replace("samian:", "http://data.archaeology.link/data/samian/") + "</li></ul>";
    }
    if (termObject['ancientName']['value'] == "undefined") {
        objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-ancientname" + "'><li class='list-group-item panel-item'><span class='badge'>" + "ancient name" + "</span>" + "<span class='label label-default font12'>not defined</span>" + "</li></ul>";
    } else {
        objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-ancientname" + "'><li class='list-group-item panel-item'><span class='badge'>" + "ancient name" + "</span>" + termObject['ancientName']['value'].replace("samian:", "http://data.archaeology.link/data/samian/") + "</li></ul>";
    }
    objectdataTechnicalDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-geom" + "'><li class='list-group-item panel-item'><span class='badge'>" + "geometry (point)" + "</span>" + termObject['geom']['value'] + "</li></ul>";

    $("#content_kacheln").html(searchResultsDiv);
    $("#objectdata_images").html(objectdataImagesDiv);
    $("#object_details").html(objectdataDetailsDiv);
    $("#object_technicaldata").html(objectdataTechnicalDetailsDiv);

    // load map
    //if (termObject.metadata.geom) {
    //loadMap("map-poi", termObject.metadata.geom, -1);
    //} else {
    //let element = document.getElementById("map-poi");
    //element.parentNode.removeChild(element);
    loadMap("map-poi", termObject['geom']['value'].replace("<http://www.opengis.net/def/crs/EPSG/0/4326> ", ""), -1);
    //}
    //setObjectGallery();
    //$('body,html').animate({
    //    scrollTop: 0
    //}, 800);
};