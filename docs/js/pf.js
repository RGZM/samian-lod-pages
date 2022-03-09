let pf = (termObject) => {

    // object
    searchResultsDiv += "<div class='box-resultlist-eighty' id='" + termObject['item']['value'] + "'>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'>Potform " + termObject['label']['value'].replace("@en", "") + "</h1>";

    // add map / image
    searchResultsDiv += "<div id='map-poi' style='display: flex;justify-content: center;align-items: center;'>";
    searchResultsDiv += "<img src='" + termObject['image']['value'] + "' style='min-height:50px;min-width:50px;'>";
    searchResultsDiv += "</div>";

    // add Object Data
    searchResultsDiv += '<div id="object_details"></div>';
    objectdataDetailsDiv += '<br><h3><center><img src="al_circle_icon.png" height="80"></center></h3>';
    objectdataDetailsDiv += '<h3>Metadata</h3>';
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-uuid" + "'><li class='list-group-item panel-item'><span class='badge'>" + "URI / permalink" + "</span>" + termObject['item']['value'].replace("samian:", "http://data.archaeology.link/data/samian/") + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-label" + "'><li class='list-group-item panel-item'><span class='badge'>" + "label" + "</span>" + termObject['label']['value'] + "</li></ul>";
    let str_origin = "Samian Research";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-origin" + "'><li class='list-group-item panel-item'><span class='badge'>" + "origin" + "</span>" + str_origin + "</li></ul>";
    let types = termObject['types']['value'].replaceAll("http://archaeology.link/ontology#", "lado:")
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-type" + "'><li class='list-group-item panel-item'><span class='badge'>" + "type" + "</span>" + types + "," + termObject['typ']['value'] + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-identifier" + "'><li class='list-group-item panel-item'><span class='badge'>" + "identifier" + "</span>" + termObject['identifier']['value'] + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "object-update" + "'><li class='list-group-item panel-item'><span class='badge'>" + "last update" + "</span>" + termObject['lastupdate']['value'] + "</li></ul>";

    // add project metadata
    objectdataDetailsDiv += '<h3>Project Data</h3>';
    let name1 = "Linked Open Samian Ware";
    let name2 = "(" + str_origin + ")";
    let name_link1 = "https://github.com/archaeolink/samian-lod-pages";
    let name_link2 = "https://www.rgzm.de/samian";
    let funding = "RGZM, University of Reading, University of Leeds, Ceramica-Stiftung";
    let contact = "Department of Scientific IT, RGZM, Mainz (Dr. Allard Mees, Florian Thiery M.Sc.)";
    let date = "since 1963";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-1" + "'><li class='list-group-item panel-item'><span class='badge'>" + "project" + "</span>" + "<a href='" + name_link1 + "' target='_blank'>" + name1 + "</a>" +
        " <a href='" + name_link2 + "' target='_blank'>" + name2 + "</a>" + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-2" + "'><li class='list-group-item panel-item'><span class='badge'>" + "funding" + "</span>" + "" + funding +
        "" + "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-3" + "'><li class='list-group-item panel-item'><span class='badge'>" + "contact" + "</span>" + "" + contact + "" +
        "</li></ul>";
    objectdataDetailsDiv += "<ul class='list-group panel-item2' id='" + "project-4" + "'><li class='list-group-item panel-item'><span class='badge'>" + "duration" + "</span>" + "<i>" + date + "</i>" + "</li></ul>";
    objectdataDetailsDiv += '</div>';

    // add object metadata
    searchResultsDiv += '<div id="object_technicaldata"></div>';
    objectdataTechnicalDetailsDiv += '<h3>Objectdata</h3>';

    $("#content_kacheln").html(searchResultsDiv);
    $("#objectdata_images").html(objectdataImagesDiv);
    $("#object_details").html(objectdataDetailsDiv);
    $("#object_technicaldata").html(objectdataTechnicalDetailsDiv);
};