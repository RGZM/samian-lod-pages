let error404 = () => {
    searchResultsDiv += "<div class='box-resultlist-eighty'>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + "&nbsp;" + "</h1>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + '<img src="al_circle_icon.png" height="250">' + "</h1>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + "404 Not Found" + "</h1>";
    searchResultsDiv += "<h2 style='text-align:center;padding-bottom:10px;'><i> " + "The requested archaeology.link resource is not available." + "</i></h2>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + "&nbsp;" + "</h1>";
    searchResultsDiv += '</div>';
    $("#content_kacheln").html(searchResultsDiv);
};