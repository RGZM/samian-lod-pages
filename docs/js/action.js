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

let loadMap = (id, wkt, type) => {
    console.log(wkt);
    let geommap = L.map(id).setView([0, 0], 1);
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
        geommap.setZoom(5);
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

let loadTerm = () => {
    let query = "null";
    if (findGetParameter("resource").indexOf("loc_ds") !== -1) {
        query = "SELECT ?item ?label (GROUP_CONCAT(DISTINCT ?type; SEPARATOR = ',') AS ?types) ?typ ?identifier ?wikidata ?pleiades ?ancientName ?geom ?lastupdate WHERE { ?item rdf:type ?type. ?item lado:hasType ?typ. ?item rdfs:label ?label. ?item dc:identifier ?identifier. ?item lado:exactMatch ?wikidata. ?item geosparql:hasGeometry ?geom_bn. ?geom_bn geosparql:asWKT ?geom. ?item prov:wasGeneratedBy ?activity_bn. ?activity_bn prov:endedAtTime ?lastupdate. bind('undefined' AS ?pleiades) bind('undefined' AS ?ancientName) OPTIONAL {?item lado:pleiadesID ?pleiades.} OPTIONAL {?item lado:ancientName ?ancientName.} FILTER (?item = samian:" + findGetParameter("resource") + ") } GROUP BY ?item ?label ?identifier ?typ ?wikidata ?pleiades ?ancientName ?geom ?lastupdate";
    }
    if (findGetParameter("resource").indexOf("loc_pc") !== -1) {
        query = "SELECT ?item ?label (GROUP_CONCAT(DISTINCT ?type; SEPARATOR = ',') AS ?types) ?typ ?identifier ?wikidata ?kilnregion ?kilnregion_label ?geom ?lastupdate WHERE { ?item rdf:type ?type. ?item lado:hasType ?typ. ?item rdfs:label ?label. ?item dc:identifier ?identifier. ?item lado:exactMatch ?wikidata. ?item lado:clusteredAs ?kilnregion. ?kilnregion rdfs:label ?kilnregion_label. ?item geosparql:hasGeometry ?geom_bn. ?geom_bn geosparql:asWKT ?geom. ?item prov:wasGeneratedBy ?activity_bn. ?activity_bn prov:endedAtTime ?lastupdate. FILTER (?item = samian:" + findGetParameter("resource") + ") } GROUP BY ?item ?label ?identifier ?typ ?wikidata ?kilnregion ?kilnregion_label ?geom ?lastupdate";
    }
    if (findGetParameter("resource").indexOf("loc_kr") !== -1) {
        query = "SELECT ?item ?label (GROUP_CONCAT(DISTINCT ?type; SEPARATOR = ',') AS ?types) ?typ ?identifier ?wikidata ?geom ?lastupdate WHERE {?item rdf:type ?type. ?item lado:hasType ?typ. ?item rdfs:label ?label. ?item dc:identifier ?identifier. ?item lado:exactMatch ?wikidata. ?item lado:clusteredArea ?geom_bn. ?geom_bn geosparql:asWKT ?geom. ?item prov:wasGeneratedBy ?activity_bn. ?activity_bn prov:endedAtTime ?lastupdate. FILTER (?item = samian:" + findGetParameter("resource") + ") } GROUP BY ?item ?label ?identifier ?typ ?wikidata ?geom ?lastupdate";
    }
    if (query !== "null") {
        RDF4J.query(query, visData);
    } else {
        error404();
    }
};

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

let visData = (termObject) => {
    termObject = termObject.results.bindings[0];
    console.log(termObject);
    if (typeof termObject === 'undefined') {
        error404();
    } else {
        if (termObject['item']['value'].indexOf("loc_ds") !== -1) {
            loc_ds(termObject);
        } else if (termObject['item']['value'].indexOf("loc_pc") !== -1) {
            loc_pc(termObject);
        } else if (termObject['item']['value'].indexOf("loc_kr") !== -1) {
            loc_kr(termObject);
        } else {

        }
    }
};

loadTerm();