let error404 = () => {
    searchResultsDiv += "<div class='box-resultlist-eighty' id='" + termObject.id + "'>";
    searchResultsDiv += "<h1 style='text-align:center;padding-bottom:10px;'> " + "404 Not Found" + "</h1>";
    searchResultsDiv += "<h2 style='text-align:center;padding-bottom:10px;'><i> " + "The requested resource is not available." + "</i></h2>";
    searchResultsDiv += '</div>';
    $("#content_kacheln").html(searchResultsDiv);
};