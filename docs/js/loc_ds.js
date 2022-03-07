let loc_ds = (termObject) => {

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

    $("#content_kacheln").html(searchResultsDiv);
    $("#objectdata_images").html(objectdataImagesDiv);
    $("#object_details").html(objectdataDetailsDiv);
    $("#object_technicaldata").html(objectdataTechnicalDetailsDiv);
};