let RDF4J = {};

RDF4J.SPARQLQUERY = "https://java-dev.rgzm.de/rdf4j-server/repositories/samian-lod";

RDF4J.PREFIXES =
    "PREFIX samian: <http://data.archaeology.link/data/samian/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX dc: <http://purl.org/dc/elements/1.1/> PREFIX lado: <http://archaeology.link/ontology#> PREFIX geosparql: <http://www.opengis.net/ont/geosparql#> PREFIX prov: <http://www.w3.org/ns/prov#> ";

RDF4J.query = (sparql, callback) => {
    console.log(sparql);
    setTimeout(function() {
        //console.log(sparql);
        $.ajax({
            //async: false,
            url: RDF4J.SPARQLQUERY,
            type: 'POST',
            data: {
                queryLn: 'SPARQL',
                query: RDF4J.PREFIXES + sparql,
                Accept: 'application/json'
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                var vars = response.head.vars;
                var bindings = response.results.bindings;
                const bindings_copy = Object.assign({}, bindings);
                for (var item in bindings) {
                    for (var varstr in vars) {
                        var tblTxt = "";
                        if (bindings[item][vars[varstr]].type === "uri") {
                            var val = bindings[item][vars[varstr]].value;
                            val = val.replace("http://archaeology.link/ontology#", "lado:");
                            val = val.replace("http://data.archaeology.link/data/samian/", "samian:");
                            val = val.replace("http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:");
                            val = val.replace("http://www.w3.org/2002/07/owl#", "owl:");
                            val = val.replace("http://www.w3.org/2001/XMLSchema#", "xsd:");
                            val = val.replace("http://www.w3.org/2004/02/skos/core#", "skos:");
                            val = val.replace("http://www.w3.org/2000/01/rdf-schema#", "rdfs:");
                            val = val.replace("http://java-dev.rgzm.de/ars#", "ars3d:");
                            bindings_copy[item][vars[varstr]].value = val;
                        } else if (bindings[item][vars[varstr]]["xml:lang"]) {
                            bindings_copy[item][vars[varstr]].value = bindings[item][vars[varstr]].value + "@" + bindings[item][vars[varstr]]["xml:lang"];
                        } else if (bindings[item][vars[varstr]].type === "bnode") {
                            bindings_copy[item][vars[varstr]].value = "_:" + bindings[item][vars[varstr]].value;
                        } else {
                            bindings_copy[item][vars[varstr]].value = bindings[item][vars[varstr]].value
                        }
                    }
                }
                response.results.bindings = bindings_copy;
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 100);
};