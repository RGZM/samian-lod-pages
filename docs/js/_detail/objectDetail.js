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

let loadTerm = () => {
    $.ajax({
        type: "GET",
        url: API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", "") + "?mode=label",
        async: false,
        error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function(data) {
            termObject = data;
            visData();
        }
    });
}

let visData = () => {
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
    let searchResultsDiv = "";
    // breadcrumb
    if (termObject.id !== -1) {
        $("#bc-parent").html(termObject.label + " <i>(" + termObject.uri + ")</i>" + " &#x2937; " + termObject.features_count + " features");
    } else {
        $("#bc-parent").html();
    }

    clickedKachel = termObject.id;

    // Object
    searchResultsDiv += "<div class='box-resultlist-eighty' id='" + termObject.uri + "'>";
    searchResultsDiv += "<h2 style='margin-left:25px;'><i class='fa fa-cubes' aria-hidden='true'></i> " + termObject.label + "</h1>";
    // Object Data
    searchResultsDiv += '<h3 style="margin-left:25px;"><i class="fa fa-flag-o" aria-hidden="true"></i> Object Data</h1>';
    searchResultsDiv += "<span class='label label-primary font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Object Type</span>&nbsp;";
    searchResultsDiv += "<span class='label label-danger font12'>" + termObject.type + "</span><br>";
    searchResultsDiv += "<span class='label label-primary font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/Tools.gif'>&nbsp;Material</span>&nbsp;";
    searchResultsDiv += "<span class='label label-danger font12'>" + termObject.material + "</span><br>";
    searchResultsDiv += "<span class='label label-primary font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/Tools.gif'>&nbsp;Condition</span>&nbsp;";
    searchResultsDiv += "<span class='label label-danger font12'>" + termObject.condition_type + "</span><br>";
    searchResultsDiv += "<span class='label label-primary font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/Clock.gif'>&nbsp;Geometric Shape</span>&nbsp;";
    searchResultsDiv += "<span class='label label-danger font12'>" + termObject.shape + "</span><br>";
    searchResultsDiv += "<span class='label label-primary font12' style='margin-left:25px;'><i class='fa fa-user' aria-hidden='true'></i>&nbsp;Manufacturing Type</span>&nbsp;";
    searchResultsDiv += "<span class='label label-danger font12'>" + termObject.manufacturing_type + "</span><br>";
    searchResultsDiv += "<span class='label label-primary font12' style='margin-left:25px;'><i class='fa fa-map-pin' aria-hidden='true'></i>&nbsp;Period</span>&nbsp;";
    searchResultsDiv += "<span class='label label-danger font12'>" + termObject.period + "</span><br>";
    // Object Statements
    searchResultsDiv += '<h3 style="margin-left:25px;"><i class="fa fa-lightbulb-o" aria-hidden="true"></i> Object Statements</h1>';
    let s = termObject.statements;
    for (statement in s) {
        searchResultsDiv += "<span class='label label-primary font12 link' style='margin-left:25px;' onclick='window.open(\"" + API.BASE + "/statements/" + s[statement].uri.replace("ars3d:", "") + ".ttl\", \"_blank\");'><i class='fa fa-lightbulb-o' aria-hidden='true'></i>&nbsp;" + s[statement].label + "</span>&nbsp;";
        searchResultsDiv += "<span class='label label-yellow font12' style='margin-left:0px;'>document:&nbsp;" + s[statement].document + "</span>&nbsp;";
        searchResultsDiv += "<span class='label label-yellow font12' style='margin-left:0px;'>type:&nbsp;" + s[statement].type + "</span>&nbsp;";
        searchResultsDiv += "<span class='label label-yellow font12' style='margin-left:0px;'>number:&nbsp;" + s[statement].number + "</span>&nbsp;";
        searchResultsDiv += "<span class='label label-yellow font12' style='margin-left:0px;'>comment:&nbsp;" + s[statement].comment + "</span><br>";
    }
    /*searchResultsDiv += '<h1 style="margin-left:25px;"><i class="fa fa-picture-o" aria-hidden="true"></i> Images</h1>';
    if (termObject.image_primary.filename.includes("dummy")) {
        searchResultsDiv += '<a class="group1" href="img/' + termObject.image_primary.filename + '" title="' + termObject.image_primary.description_primary + '"><div class="box-thumbnail-div box-thumbnail-div2"><img src="img/' + termObject.image_primary.filename + '" class="thumbnail a"></div></a>';
    } else if (termObject.image_primary.filename.includes("Navis3")) {
        searchResultsDiv += '<a class="group1" href="' + termObject.image_primary.filename + '" title="' + termObject.image_primary.description_primary + '"><div class="box-thumbnail-div box-thumbnail-div2"><img src="' + termObject.image_primary.filename + '" class="thumbnail a"></div></a>';
    } else {
        searchResultsDiv += '<a class="group1" href="https://www2.rgzm.de/Navis2/Objects/' + termObject.image_primary.filename + '" title="' + termObject.image_primary.description_primary + '"><div class="box-thumbnail-div box-thumbnail-div2"><img src="https://www2.rgzm.de/Navis2/Objects/' + termObject.image_primary.filename + '" class="thumbnail a"></div></a>';
    }*/
    searchResultsDiv += "<br></div>";
    $("#content_kacheln").html(searchResultsDiv);

    // features
    /*let f = termObject.features;
    for (feature in f) {
        searchResultsDiv = "";
        searchResultsDiv += "<div class='box-resultlist-fourty' id='" + f[feature].id + "'>";
        searchResultsDiv += "<h2 style='margin-left:25px;'><i class='fa fa-puzzle-piece' aria-hidden='true'></i> " + f[feature].name + "</h2>";
        if (f[feature].keywords.shiptype) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Type</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.shiptype[lang] + "</span><br>";
        } else {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Type</span>&nbsp;";
            searchResultsDiv += "<span class='label label-default font12'>n/a</span><br>";
        }
        if (f[feature].keywords.iconography) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/Cloud.gif'>&nbsp;Symbolic Context</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.supericonography[lang] + "</span> &#x2937; ";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.iconography[lang] + "</span><br>";
        } else {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/Cloud.gif'>&nbsp;Symbolic Context</span>&nbsp;";
            searchResultsDiv += "<span class='label label-default font12'>n/a</span><br>";
        }
        if (f[feature].keywords.propulsion) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Propulsion</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.propulsion[lang] + "</span><br>";
        } else {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Propulsion</span>&nbsp;";
            searchResultsDiv += "<span class='label label-default font12'>n/a</span><br>";
        }
        if (f[feature].keywords.function) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Function</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.function[lang] + "</span><br>";
        } else {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Function</span>&nbsp;";
            searchResultsDiv += "<span class='label label-default font12'>n/a</span><br>";
        }
        if (f[feature].keywords.environment) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Environment</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.environment[lang] + "</span><br>";
        } else {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Environment</span>&nbsp;";
            searchResultsDiv += "<span class='label label-default font12'>n/a</span><br>";
        }
        if (f[feature].keywords.views) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Views</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.views[lang] + "</span><br>";
        } else {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Views</span>&nbsp;";
            searchResultsDiv += "<span class='label label-default font12'>n/a</span><br>";
        }
        if (f[feature].keywords.researchdocu) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;Research & Documentation</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12'>" + f[feature].keywords.researchdocu[lang] + "</span><br>";
        } else {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/PaperRollFeder.gif'>&nbsp;ResearchDucu</span>&nbsp;";
            searchResultsDiv += "<span class='label label-default font12'>n/a</span><br>";

        }
        searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/Personal.gif'>&nbsp;Crew Visible</span>&nbsp;";
        searchResultsDiv += "<span class='label label-yellow font12'>" + f[feature].crewvisible + "</span><br>";
        searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/kettle16x16.gif'>&nbsp;Cargo Visible</span>&nbsp;";
        searchResultsDiv += "<span class='label label-yellow font12'>" + f[feature].cargovisible + "</span><br>";
        searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><img src='https://www2.rgzm.de/Navis2/Home/jimages/kettle16x16.gif'>&nbsp;Is Cargo?</span>&nbsp;";
        searchResultsDiv += "<span class='label label-yellow font12'>" + f[feature].iscargo + "</span><br>";
        let cs = f[feature].keywords.components;
        for (component in cs) {
            searchResultsDiv += "<span class='label label-success font12' style='margin-left:25px;'><i class='fa fa-puzzle-piece' aria-hidden='true'></i>&nbsp;component</span>&nbsp;";
            searchResultsDiv += "<span class='label label-danger font12' style='margin-left:0px;'>" + cs[component][lang] + "</span><br>";
        }

        if (f[feature].image_primary.filename.includes("dummy")) {
            searchResultsDiv += '<a class="group1" href="img/' + f[feature].image_primary.filename + '" title="' + f[feature].image_primary.description_primary + '"><div class="box-thumbnail-div box-thumbnail-div2"><img src="img/' + f[feature].image_primary.filename + '" class="thumbnail a"></div></a>';
        } else if (f[feature].image_primary.filename.includes("Navis3")) {
            searchResultsDiv += '<a class="group1" href="' + f[feature].image_primary.filename + '" title="' + f[feature].image_primary.description_primary + '"><div class="box-thumbnail-div box-thumbnail-div2"><img src="' + f[feature].image_primary.filename + '" class="thumbnail a"></div></a>';
        } else if (f[feature].image_primary.filename.includes("/Navis/")) {
            searchResultsDiv += '<a class="group1" href="https://www2.rgzm.de' + f[feature].image_primary.filename + '" title="' + f[feature].image_primary.description_primary + '"><div class="box-thumbnail-div box-thumbnail-div2"><img src="https://www2.rgzm.de' + f[feature].image_primary.filename + '" class="thumbnail a"></div></a>';
        } else {
            searchResultsDiv += '<a class="group1" href="https://www2.rgzm.de/Navis2/Objects/' + f[feature].image_primary.filename + '" title="' + f[feature].image_primary.description_primary + '"><div class="box-thumbnail-div box-thumbnail-div2"><img src="https://www2.rgzm.de/Navis2/Objects/' + f[feature].image_primary.filename + '" class="thumbnail a"></div></a>';
        }

        searchResultsDiv += "</div>";
        searchResultsDiv += "</div>";
        $("#content_kacheln").append(searchResultsDiv);
    }

    $(".group1").colorbox({
        rel: 'group1'
    });*/
};

let setButtons = () => {
    $("#inp-uri").val(API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", ""));
    $("#span-permalink").click(function() {});
    $("#ul-uri").append('<li><a href="' + API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", "") + '" target="_blank">JSON</a></li>');
    $("#ul-uri").append('<li><a href="' + API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", "") + '.rdf" target="_blank">RDF/XML</a></li>');
    $("#ul-uri").append('<li><a href="' + API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", "") + '.ttl" target="_blank">TURTLE</a></li>');
    $("#ul-uri").append('<li><a href="' + API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", "") + '.ntriples" target="_blank">N-TRIPLES</a></li>');
    $("#ul-uri").append('<li><a href="' + API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", "") + '.ntriplesplaintext" target="_blank">N-TRIPLES (text/plain)</a></li>');
    $("#ul-uri").append('<li><a href="' + API.BASE + "/objects/" + findGetParameter("id").replace("ars3d:", "") + '.jsonld" target="_blank">JSON-LD</a></li>');
}

setButtons();
loadTerm();
//loadModalFunctionsDetail();
