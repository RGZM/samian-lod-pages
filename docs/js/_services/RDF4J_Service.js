let RDF4J = {};

RDF4J.SPARQLQUERY = GS.HOST + "/" + GS.API + "/sparql";
RDF4J.SPARQLUPDATE = GS.HOST + "/" + GS.API + "/sparqlupdate";

RDF4J.PREFIXES =
    "PREFIX ars: <http://ars3D/documentation/ontology/arsonto#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX ecrm: <http://erlangen-crm.org/current/>  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/> PREFIX Applique1: <http://ars3D/documentation/ontology/arsonto#Applique> PREFIX Applique: <http://ars3D/documentation/ontology/arsonto#Applique%20> PREFIX ars3d: <http://java-dev.rgzm.de/ars#> PREFIX meta: <http://meta.rgzm.de/term/> PREFIX dig: <http://www.ics.forth.gr/isl/CRMdig/> PREFIX ars3do: <http://java-dev.rgzm.de/ars/objects/> PREFIX ars3df: <http://java-dev.rgzm.de/ars/features/> PREFIX ars3dsp: <http://java-dev.rgzm.de/ars/scans/> PREFIX ars3dgp: <http://java-dev.rgzm.de/ars/processes/>  PREFIX ars3dobs: <http://java-dev.rgzm.de/ars/observations/>   PREFIX sci: <http://www.ics.forth.gr/isl/CRMsci/> PREFIX inf: <http://www.ics.forth.gr/isl/CRMinf/> ";

RDF4J.query = (sparql, callback) => {
    setTimeout(function() {
        //console.log(sparql);
        $.ajax({
            type: 'GET',
            //async: false,
            url: RDF4J.SPARQLQUERY,
            data: {
                query: encodeURIComponent(RDF4J.PREFIXES + sparql),
                out: "json"
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                //console.log(response);
                var vars = response.head.vars;
                var bindings = response.results.bindings;
                const bindings_copy = Object.assign({}, bindings);
                for (var item in bindings) {
                    for (var varstr in vars) {
                        var tblTxt = "";
                        let type = String(typeof bindings[item][vars[varstr]]);
                        if (type !== "undefined") {
                            if (bindings[item][vars[varstr]].type === "uri") {
                                var val = bindings[item][vars[varstr]].value;
                                val = val.replace("http://ars3D/documentation/ontology/arsonto#", "ars:");
                                val = val.replace("http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:");
                                val = val.replace("http://www.w3.org/2002/07/owl#", "owl:");
                                val = val.replace("http://erlangen-crm.org/current/", "ecrm:");
                                val = val.replace("http://www.w3.org/2001/XMLSchema#", "xsd:");
                                val = val.replace("http://www.w3.org/2004/02/skos/core#", "skos:");
                                val = val.replace("http://www.w3.org/2000/01/rdf-schema#", "rdfs:");
                                val = val.replace("http://www.cidoc-crm.org/cidoc-crm/", "crm:");
                                val = val.replace("http://www.ics.forth.gr/isl/CRMdig/", "dig:");
                                val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique", "Applique1:");
                                val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique%20", "Applique:");
                                val = val.replace("http://java-dev.rgzm.de/ars#", "ars3d:");
                                val = val.replace("http://meta.rgzm.de/term/", "meta:");
                                val = val.replace("http://java-dev.rgzm.de/ars/objects/", "ars3do:");
                                val = val.replace("http://java-dev.rgzm.de/ars/features/", "ars3df:");
                                val = val.replace("http://java-dev.rgzm.de/ars/scans/", "ars3dsp:");
                                val = val.replace("http://java-dev.rgzm.de/ars/processes/", "ars3dgp:");
                                val = val.replace("http://java-dev.rgzm.de/ars/observations/", "ars3dobs:");
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
                }
                response.results.bindings = bindings_copy;
                //console.log(response);
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 100);
};

RDF4J.query2 = (sparql, callback) => {
    setTimeout(function() {
        //console.log(sparql);
        $.ajax({
            type: 'POST',
            //async: false,
            url: RDF4J.SPARQLQUERY,
            data: {
                query: encodeURIComponent(RDF4J.PREFIXES + sparql),
                out: "json"
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
                            val = val.replace("http://ars3D/documentation/ontology/arsonto#", "ars:");
                            val = val.replace("http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:");
                            val = val.replace("http://www.w3.org/2002/07/owl#", "owl:");
                            val = val.replace("http://erlangen-crm.org/current/", "ecrm:");
                            val = val.replace("http://www.w3.org/2001/XMLSchema#", "xsd:");
                            val = val.replace("http://www.w3.org/2004/02/skos/core#", "skos:");
                            val = val.replace("http://www.w3.org/2000/01/rdf-schema#", "rdfs:");
                            val = val.replace("http://www.cidoc-crm.org/cidoc-crm/", "crm:");
                            val = val.replace("http://www.ics.forth.gr/isl/CRMdig/", "dig:");
                            val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique", "Applique1:");
                            val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique%20", "Applique:");
                            val = val.replace("http://java-dev.rgzm.de/ars#", "ars3d:");
                            val = val.replace("http://meta.rgzm.de/term/", "meta:");
                            val = val.replace("http://java-dev.rgzm.de/ars/objects/", "ars3do:");
                            val = val.replace("http://java-dev.rgzm.de/ars/features/", "ars3df:");
                            val = val.replace("http://java-dev.rgzm.de/ars/scans/", "ars3dsp:");
                            val = val.replace("http://java-dev.rgzm.de/ars/processes/", "ars3dgp:");
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

RDF4J.queryComparison = (sparql, callback) => {
    setTimeout(function() {
        //console.log(sparql);
        $.ajax({
            //async: false,
            url: "https://java-dev.rgzm.de/rdf4j-server/repositories/ars3dcomparison",
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
                        let type = String(typeof bindings[item][vars[varstr]]);
                        if (type !== "undefined") {
                            if (bindings[item][vars[varstr]].type === "uri") {
                                var val = bindings[item][vars[varstr]].value;
                                val = val.replace("http://ars3D/documentation/ontology/arsonto#", "ars:");
                                val = val.replace("http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:");
                                val = val.replace("http://www.w3.org/2002/07/owl#", "owl:");
                                val = val.replace("http://erlangen-crm.org/current/", "ecrm:");
                                val = val.replace("http://www.w3.org/2001/XMLSchema#", "xsd:");
                                val = val.replace("http://www.w3.org/2004/02/skos/core#", "skos:");
                                val = val.replace("http://www.w3.org/2000/01/rdf-schema#", "rdfs:");
                                val = val.replace("http://www.cidoc-crm.org/cidoc-crm/", "crm:");
                                val = val.replace("http://www.ics.forth.gr/isl/CRMdig/", "dig:");
                                val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique", "Applique1:");
                                val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique%20", "Applique:");
                                val = val.replace("http://java-dev.rgzm.de/ars#", "ars3d:");
                                val = val.replace("http://meta.rgzm.de/term/", "meta:");
                                val = val.replace("http://java-dev.rgzm.de/ars/objects/", "ars3do:");
                                val = val.replace("http://java-dev.rgzm.de/ars/features/", "ars3df:");
                                val = val.replace("http://java-dev.rgzm.de/ars/scans/", "ars3dsp:");
                                val = val.replace("http://java-dev.rgzm.de/ars/processes/", "ars3dgp:");
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

//
// CREATE
//

RDF4J.createObject = (uuid, invno, label, thumbnail, typ, callback) => {
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3do:" + uuid + " " + "rdf:type" + " " + typ + ". ";
    THIS_UPDATE += "ars3do:" + uuid + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    let h1 = UUID.getUUIDv4();
    THIS_UPDATE += "ars3do:" + uuid + " " + "crm:P1_is_identified_by" + " " + "ars3d:E42_" + h1 + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdf:type" + " " + "crm:E42_Identifier" + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdfs:label" + " " + "'" + invno + "'@en" + ". ";
    let h2 = UUID.getUUIDv4();
    THIS_UPDATE += "ars3do:" + uuid + " " + "ars:has_thumbnail" + " " + "ars3d:TN_" + h2 + ". ";
    THIS_UPDATE += "ars3d:" + h2 + " " + "rdf:type" + " " + "ars:Thumbnail" + ". ";
    THIS_UPDATE += "ars3d:" + h2 + " " + "ars:stored_in_file" + " " + "'" + thumbnail + "'" + ". ";
    THIS_UPDATE += " }";
    console.log("createObject", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectLabel = (object, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " rdfs:label ?label. ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += object + " rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += object + " rdfs:label ?label. ";
    THIS_UPDATE += "}";
    console.log("modifyObjectLabel", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Modified!');
            $("#btn-modal-object-edit-label-close").trigger("click");
            $("#btn-edit-object").trigger("click");
        }
    });
};

RDF4J.modifyObjectIdentifier = (object, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?i rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?i rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += object + " crm:P1_is_identified_by ?i. ";
    THIS_UPDATE += "?i rdfs:label ?label . ";
    THIS_UPDATE += "} ";
    console.log("modifyObjectIdentifier", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Modified!');
            $("#btn-modal-object-edit-id-close").trigger("click");
            $("#btn-edit-object").trigger("click");
        }
    });
};

RDF4J.modifyObjectThumbnail = (object, thumb, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?t ars:stored_in_file ?thumb . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?t ars:stored_in_file \"" + thumb + "\". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += object + " ars:has_thumbnail ?t. ";
    THIS_UPDATE += "?t ars:stored_in_file ?thumb . ";
    THIS_UPDATE += "} ";
    console.log("modifyObjectThumbnail", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectType = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " rdf:type ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " rdf:type " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " rdf:type ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectType", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Type updated!');
            $("#btn-modal-object-edit-type-close").trigger("click");
        }
    });
};

RDF4J.createMaterial = (label, meta, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "crm:E57_Material" + ". ";;
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createMaterial", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Material updated!');
            $("#btn-modal-new-object-material-close").trigger("click");
        }
    });
};

RDF4J.modifyMaterial = (node, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += "} ";
    console.log("modifyMaterial", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Material updated!');
            $("#btn-modal-object-material-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectMaterial = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P2_has_type ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " crm:P2_has_type " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P2_has_type ?node. ";
    THIS_UPDATE += "?node rdf:type crm:E57_Material. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectMaterial", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Material updated!');
            $("#btn-modal-object-edit-material-close").trigger("click");
        }
    });
};

RDF4J.createConditiontype = (label, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "ars:Condition_Type" + ". ";;
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createCondition", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Condition Type created!');
            $("#btn-modal-new-object-conditiontype-close").trigger("click");
        }
    });
};

RDF4J.modifyConditiontype = (node, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += "} ";
    console.log("modifyCondition", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Condition Type updated!');
            $("#btn-modal-object-conditiontype-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectConditiontype = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P44_has_condition ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " crm:P44_has_condition " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P44_has_condition ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectCondition", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Condition Type updated!');
            $("#btn-modal-object-edit-conditiontype-close").trigger("click");
        }
    });
};

RDF4J.createShape = (label, meta, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "ars:Shape" + ". ";;
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createShape", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Shape updated!');
            $("#btn-modal-new-object-shape-close").trigger("click");
        }
    });
};

RDF4J.modifyShape = (node, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += "} ";
    console.log("modifyShape", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Shape updated!');
            $("#btn-modal-object-shape-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectShape = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " ars:hasShape ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " ars:hasShape " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " ars:hasShape ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectShape", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Shape updated!');
            $("#btn-modal-object-edit-shape-close").trigger("click");
        }
    });
};

RDF4J.createManufacturingtype = (label, meta, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "ars:Manufacturing_Object_Type" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createManufacturingtype", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Manufacturing Type created!');
            $("#btn-modal-new-object-manufacturingtype-close").trigger("click");
        }
    });
};

RDF4J.modifyManufacturingtype = (node, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += "} ";
    console.log("modifyManufacturingtype", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Manufacturing Type updated!');
            $("#btn-modal-object-manufacturingtype-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectManufacturingtype = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P2_has_type ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " crm:P2_has_type " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P2_has_type ?node. ";
    THIS_UPDATE += "?node rdf:type ars:Manufacturing_Object_Type. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectManufacturingtype", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Condition Type updated!');
            $("#btn-modal-object-edit-manufacturingtype-close").trigger("click");
        }
    });
};

RDF4J.createFindspot = (label, meta, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "crm:E53_Place" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "crm:P2_has_type" + " " + "ars:FindSpot" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createFindspot", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Findspot created!');
            $("#btn-modal-new-object-findspot-close").trigger("click");
        }
    });
};

RDF4J.modifyFindspot = (node, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += "} ";
    console.log("modifyFindspot", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Findspot updated!');
            $("#btn-modal-object-findspot-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectFindspot = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P53_has_former_or_current_location ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " crm:P53_has_former_or_current_location " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P53_has_former_or_current_location ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectFindspot", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Findspot updated!');
            $("#btn-modal-object-edit-findspot-close").trigger("click");
        }
    });
};

RDF4J.createResidence = (label, meta, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "crm:E53_Place" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "crm:P2_has_type" + " " + "ars:Residence" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Residence created!');
            $("#btn-modal-new-object-residence-close").trigger("click");
        }
    });
};

RDF4J.modifyResidence = (node, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += "} ";
    console.log("modifyResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Residence updated!');
            $("#btn-modal-object-residence-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectResidence = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P55_has_current_location ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " crm:P55_has_current_location " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P55_has_current_location ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Residence updated!');
            $("#btn-modal-object-edit-residence-close").trigger("click");
        }
    });
};

RDF4J.createPeriod = (label, meta, date, callback) => {
    let h1 = UUID.getUUIDv4();
    let h2 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "crm:E4_Period" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "crm:P86i_contains" + " " + "ars3d:" + h2 + ". ";
    THIS_UPDATE += "ars3d:" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + h2 + " " + "rdf:type" + " " + "crm:E63_Beginning_of_Existence" + ". ";
    THIS_UPDATE += "ars3d:" + h2 + " " + "rdfs:label" + " " + "'" + date + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createPeriod", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Period created!');
            $("#btn-modal-new-object-period-close").trigger("click");
        }
    });
};

RDF4J.modifyPeriod = (node, label, meta, date, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "?date rdfs:label ?datelabel. ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "?date" + " rdfs:label " + "'" + date + "'@en" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += node + " crm:P86i_contains ?date. ";
    THIS_UPDATE += "?date rdfs:label ?datelabel. ";
    THIS_UPDATE += "} ";
    console.log("modifyPeriod", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Period updated!');
            $("#btn-modal-object-period-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectPeriod = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P8_took_place_on_or_within ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " crm:P8_took_place_on_or_within " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P8_took_place_on_or_within ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectPeriod", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Period updated!');
            $("#btn-modal-object-edit-period-close").trigger("click");
        }
    });
};

RDF4J.createGroup = (label) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "ars:Object_Group" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Group created!');
            $("#btn-modal-new-object-group-close").trigger("click");
        }
    });
};

RDF4J.modifyGroup = (node, label) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += "} ";
    console.log("modifyGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Group updated!');
            $("#btn-modal-object-group-edit-close").trigger("click");
        }
    });
};

RDF4J.modifyObjectGroup = (object, node) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " ars:hasRelation ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "") {
        THIS_UPDATE += object + " ars:hasRelation " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " ars:hasRelation ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Object Group updated!');
            $("#btn-modal-object-edit-group-close").trigger("click");
        }
    });
};

RDF4J.createDocument = (label, meta, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdf:type" + " " + "crm:E31_Document" + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createDocument", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyDocument = (node, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += "} ";
    console.log("modifyDocument", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createStatement = (label, arstype, type, book, comment, callback) => {
    let h1 = UUID.getUUIDv4();
    let h2 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdf:type" + " " + "ars:Statement" + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdfs:label" + " " + "'" + type + "'@en" + ". ";
    //THIS_UPDATE += "ars3d:S_" + h1 + " " + "crm:P70_documents" + " " + book + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "rdfs:comment" + " " + "'" + comment + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + h1 + " " + "crm:P2_has_type" + " " + "_:" + h2 + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "rdf:type " + arstype + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "ars:classification-number" + " " + "'" + type + "'" + ". ";
    THIS_UPDATE += " }";
    console.log("createStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyStatement = (node, label, book, comment, arstype, type, callback) => {
    let h1 = UUID.getUUIDv4();
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    //THIS_UPDATE += node + " crm:P70_documents ?book. ";
    THIS_UPDATE += node + " rdfs:comment ?comment. ";
    THIS_UPDATE += node + " crm:P2_has_type ?h1. ";
    THIS_UPDATE += "?h1 rdf:type ?arstype. ";
    THIS_UPDATE += "?h1 ars:classification-number ?type. ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + type + "'@en" + ". ";
    //THIS_UPDATE += node + " crm:P70_documents" + " " + book + ". ";
    THIS_UPDATE += node + " rdfs:comment" + " " + "'" + comment + "'@en" + ". ";
    THIS_UPDATE += node + " crm:P2_has_type" + " " + "_:" + h1 + ". ";
    THIS_UPDATE += "_:" + h1 + " " + "rdf:type " + arstype + ". ";
    THIS_UPDATE += "_:" + h1 + " " + "ars:classification-number" + " " + "'" + type + "'" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    //THIS_UPDATE += node + " crm:P70_documents ?book. ";
    THIS_UPDATE += node + " rdfs:comment ?comment. ";
    THIS_UPDATE += node + " crm:P2_has_type ?h1. ";
    THIS_UPDATE += "?h1 rdf:type ?arstype. ";
    THIS_UPDATE += "?h1 ars:classification-number ?type. ";
    THIS_UPDATE += "} ";
    console.log("modifyStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

// connections

RDF4J.saveObjectStatement = (object, node, callback) => {
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += object + " ars:is_stated_by " + node + " . ";
    THIS_UPDATE += "} ";
    console.log("saveObjectStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.deleteObjectStatement = (object, node, callback) => {
    let THIS_UPDATE = "DELETE DATA { ";
    THIS_UPDATE += object + " ars:is_stated_by " + node + " . ";
    THIS_UPDATE += "} ";
    console.log("deleteObjectStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

//////////////
// Features //
//////////////

RDF4J.createFeature = (object, uuid, label, process, processid, geom, type, callback) => {
    console.log(object, uuid, label, process, geom, type);
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars3df:" + uuid + " " + "rdf:type" + " crm:E25_Man-Made_Feature .";
    THIS_UPDATE += "ars3df:" + uuid + " " + "rdf:type" + " dig:D9_Data_Object .";
    THIS_UPDATE += "ars3df:" + uuid + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3df:" + uuid + " " + "crm:P2_has_type " + type + " .";
    geom = JSON.stringify(geom);
    geom = geom.replace(/\"/g, "\'");
    THIS_UPDATE += "ars3df:" + uuid + " " + "ars:hasGeometricalExtent" + " " + "\"" + geom + "\"" + ". ";
    THIS_UPDATE += "ars3df:" + uuid + " " + "dig:L31_has_starting_date-time" + " " + "'" + processid + "'" + ". ";
    THIS_UPDATE += "ars3df:" + uuid + " " + "dig:L30_has_operator" + " " + "'" + CURRENT_OPERATOR + "'" + ". ";
    // process data
    THIS_UPDATE += "ars3dgp:" + processid + " " + "rdf:type" + " " + "dig:D10_Software_Execution" + ". ";
    THIS_UPDATE += "ars3dgp:" + processid + " " + "dig:L10_had_input" + " " + "ars3df:" + uuid + ". ";
    THIS_UPDATE += "ars3dgp:" + processid + " " + "dig:L31_has_starting_date-time" + " " + "'" + processid + "'" + ". ";
    THIS_UPDATE += "ars3dgp:" + processid + " " + "ars:hasProcessState" + " " + "'" + process + "'" + ". ";
    // object connection
    THIS_UPDATE += "" + object + " " + "crm:P56_bears_feature" + " " + "ars3df:" + uuid + ". ";
    THIS_UPDATE += " }";
    console.log("createFeature", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            THISFEATURE = "ars3df:" + uuid;
            showNotification('success', 'Created!', 'Feature created!');
            openObservationModal("ars3df:" + uuid);
        }
    });
};

RDF4J.updateFeatureGeometry = (feature, fgeom, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?f ars:hasGeometricalExtent ?geom . ";
    THIS_UPDATE += "} INSERT { ";
    fgeom = JSON.stringify(fgeom);
    fgeom = fgeom.replace(/\"/g, "\'");
    THIS_UPDATE += "?f ars:hasGeometricalExtent" + " " + "\"" + fgeom + "\"" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?f ars:hasGeometricalExtent ?geom. ";
    THIS_UPDATE += "?f rdf:type crm:E25_Man-Made_Feature. ";
    THIS_UPDATE += "FILTER(?f = " + feature + ")";
    THIS_UPDATE += "} ";
    console.log("updateFeatureGeometry", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', errorThrown);
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'feature geometry updated!');
        }
    });
};

RDF4J.createObservation = (OBSERVATIONTYPE, observationName, ACTIVITIES, CONDITIONS, THISFEATURE, callback) => {
    console.log(OBSERVATIONTYPE, observationName, ACTIVITIES, CONDITIONS, THISFEATURE);
    let obsID = UUID.getUUIDv4();
    let obsItemID = UUID.getUUIDv4();
    let d = new Date();
    let n = d.getTime();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "rdf:type" + " sci:S4_Observation . ";
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "rdf:type" + " " + "dig:D10_Software_Execution" + ". ";
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "rdfs:label " + " " + "'" + observationName + "'@en" + ". ";
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "dig:L31_has_starting_date-time" + " " + "'" + n + "'" + ". ";
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "sci:O8_observed" + " " + "ars3dobs:" + obsItemID + ". ";
    THIS_UPDATE += "ars3dobs:" + obsItemID + " " + "rdf:type" + " sci:S4_Observation . ";
    THIS_UPDATE += "ars3dobs:" + obsItemID + " " + "crm:P2:has_type" + " " + OBSERVATIONTYPE + ". ";
    for (i in ACTIVITIES) {
        THIS_UPDATE += "ars3dobs:" + obsItemID + " " + "sci:O8_observed" + " " + ACTIVITIES[i].uri + ". ";
    }
    for (i in CONDITIONS) {
        THIS_UPDATE += "ars3dobs:" + obsItemID + " " + "sci:O8_observed" + " " + CONDITIONS[i].uri + ". ";
    }
    // feature connection
    THIS_UPDATE += THISFEATURE + " " + "crm:P62_depicts" + " " + "ars3dobs:" + obsID + ". ";
    THIS_UPDATE += " }";
    console.log("createObservation", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'Observation created!');
            $("#btn-modal-new-observation-close").trigger("click");
            $("#btn-modal-open-oe").trigger("click");
        }
    });
};

RDF4J.createObjectGroup = (name, callback) => {
    console.log(object, name);
    let ogID = UUID.getUUIDv4();
    let d = new Date();
    let n = d.getTime();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars3dog:" + ogID + " " + "rdf:type" + " ars:Object_Group . ";
    THIS_UPDATE += "ars3dog:" + ogID + " " + "rdfs:label " + " " + "'" + name + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createObjectGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'ObjectGroup created!');
            $("#btn-modal-new-objectgroup-close").trigger("click");
            $("#btn-open-objectgroup-modal").trigger("click");
        }
    });
};

RDF4J.createFeatureGroup = (object, name, callback) => {
    console.log(object, name);
    let fgID = UUID.getUUIDv4();
    let d = new Date();
    let n = d.getTime();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars3df:" + fgID + " " + "rdf:type" + " ars:Feature_Group . ";
    THIS_UPDATE += "ars3df:" + fgID + " " + "rdf:type" + " dig:D9_Data_Object .";
    THIS_UPDATE += "ars3df:" + fgID + " " + "rdfs:label " + " " + "'" + name + "'@en" + ". ";
    THIS_UPDATE += "ars3df:" + fgID + " " + "dig:L31_has_starting_date-time" + " " + "'" + n + "'" + ". ";
    // object connection
    THIS_UPDATE += object + " " + "crm:P56_bears_feature" + " " + "ars3df:" + fgID + ". ";
    THIS_UPDATE += " }";
    console.log("createFeatureGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'FeatureGroup created!');
            $("#btn-modal-new-featuregroup-close").trigger("click");
            $("#btn-open-featuregroup-modal").trigger("click");
        }
    });
};

RDF4J.createScene = (object, name, callback) => {
    console.log(object, name);
    let scID = UUID.getUUIDv4();
    let d = new Date();
    let n = d.getTime();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars3df:" + scID + " " + "rdf:type" + " ars:Scene . ";
    THIS_UPDATE += "ars3df:" + fgID + " " + "rdf:type" + " dig:D9_Data_Object .";
    THIS_UPDATE += "ars3df:" + scID + " " + "rdfs:label " + " " + "'" + name + "'@en" + ". ";
    THIS_UPDATE += "ars3df:" + scID + " " + "dig:L31_has_starting_date-time" + " " + "'" + n + "'" + ". ";
    // object connection
    THIS_UPDATE += object + " " + "crm:P56_bears_feature" + " " + "ars3df:" + scID + ". ";
    THIS_UPDATE += " }";
    console.log("createScene", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'Scene created!');
            $("#btn-modal-new-scene-close").trigger("click");
            $("#btn-open-scene-modal").trigger("click");
        }
    });
};

RDF4J.createObservationStatement = (OBSERVATIONTYPE, observationName, ACTIVITIES, CONDITIONS, THISFEATURE, callback) => {
    console.log(OBSERVATIONTYPE, observationName, ACTIVITIES, CONDITIONS, THISFEATURE);
    let obsID = UUID.getUUIDv4();
    let obsItemID = UUID.getUUIDv4();
    let d = new Date();
    let n = d.getTime();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "rdf:type" + " sci:S4_Observation . ";
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "rdfs:label " + " " + "'" + observationName + "'@en" + ". ";
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "dig:L31_has_starting_date-time" + " " + "'" + n + "'" + ". ";
    THIS_UPDATE += "ars3dobs:" + obsID + " " + "sci:O8_observed" + " " + "ars3dobs:" + obsItemID + ". ";
    THIS_UPDATE += "ars3dobs:" + obsItemID + " " + "crm:P2:has_type" + " " + "ars:Statement" + ". ";
    THIS_UPDATE += "ars3dobs:" + obsItemID + " " + "sci:O8_observed" + " " + OBSERVATIONTYPE + ". ";
    // feature connection
    THIS_UPDATE += THISFEATURE + " " + "crm:P62_depicts" + " " + "ars3dobs:" + obsID + ". ";
    THIS_UPDATE += " }";
    console.log("createObservation", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'Observation created!');
            $("#btn-modal-new-observation-close").trigger("click");
            $("#btn-modal-open-oe").trigger("click");
        }
    });
};

RDF4J.createActivity = (label, callback) => {
    console.log(label);
    let E7HASH = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars:" + E7HASH + " " + "rdf:type" + " owl:NamedIndividual . ";
    THIS_UPDATE += "ars:" + E7HASH + " " + "rdf:type" + " crm:E7_Activity . ";
    THIS_UPDATE += "ars:" + E7HASH + " " + "rdfs:label " + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createActivity", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'Activity created!');
            $("#btn-modal-new-activity-close").trigger("click");
            $("#inp-qs-activity").val("");
            $("#inp-qs-activity").trigger("keyup");
            initModalActivities();
        }
    });
};

RDF4J.createCondition = (label, callback) => {
    console.log(label);
    let E3HASH = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars:" + E3HASH + " " + "rdf:type" + " owl:NamedIndividual . ";
    THIS_UPDATE += "ars:" + E3HASH + " " + "rdf:type" + " crm:E3_Condition_State . ";
    THIS_UPDATE += "ars:" + E3HASH + " " + "rdfs:label " + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createCondition", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'Condition created!');
            $("#btn-modal-new-condition-close").trigger("click");
            $("#inp-qs-condition").val("");
            $("#inp-qs-condition").trigger("keyup");
            initModalConditions();
        }
    });
};

RDF4J.createItemIndividual = (itemclass, label, meta, callback) => {
    console.log(itemclass, label, meta);
    let E3HASH = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    // feature data
    THIS_UPDATE += "ars:" + E3HASH + " " + "rdf:type" + " owl:NamedIndividual . ";
    THIS_UPDATE += "ars:" + E3HASH + " " + "rdf:type" + " " + itemclass + " . ";
    THIS_UPDATE += "ars:" + E3HASH + " " + "rdfs:label " + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + E3HASH + " " + "ars:external_reference " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createItemIndividual", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Created!', 'Individual created!');
            $("#btn-modal-new-ii-close").trigger("click");
            $("#inp-qs-oci").val("");
            $("#inp-qs-oci").trigger("keyup");
            initModalIndividuals();
        }
    });
};

RDF4J.createFeatureTypeStatement = (label, appliquetype, type, book, comment, callback) => {
    let h1 = UUID.getUUIDv4();
    let h2 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdf:type" + " " + "ars:Statement" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "crm:P70_documents" + " " + book + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "rdfs:comment" + " " + "'" + comment + "'@en" + ". ";
    THIS_UPDATE += "ars:" + h1 + " " + "crm:P2_has_type" + " " + "_:" + h2 + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "rdf:type " + appliquetype + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "ars:classification-number" + " " + "'" + type + "'" + ". ";
    THIS_UPDATE += " }";
    console.log("createFeatureTypeStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

//
// UPDATE
//

RDF4J.updateProcess = (object, processTimestamp, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += " ars3dgp:" + processid + " " + "ars:hasProcessState ?ps. ";
    THIS_UPDATE += " }";
    THIS_UPDATE = "INSERT { ";
    THIS_UPDATE += " ars3dgp:" + processid + " " + "ars:hasProcessState 'processState'. ";
    THIS_UPDATE += " ars3dgp:" + processid + " " + "ars:L11_output_crop '" + object + "_test_" + processTimestamp + ".ply'. ";
    THIS_UPDATE += " ars3dgp:" + processid + " " + "ars:L11_output_plane '" + object + "_test_" + processTimestamp + ".ply'. ";
    THIS_UPDATE += " ars3dgp:" + processid + " " + "ars:L11_output_equalisation '" + object + "_test_" + processTimestamp + ".png'. ";
    THIS_UPDATE += " }";
    THIS_UPDATE = "WHERE { ";
    THIS_UPDATE += "?p rdf:type dig:D10_Software_Execution . ";
    THIS_UPDATE += "FILTER (?p = ars3dgp:" + processTimestamp + ") ";
    THIS_UPDATE += " }";
    console.log("updateProcess", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'Triples not saved.');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Stored!', 'Write Triples sucessfull');
            //callback();
        }
    });
};

RDF4J.updateFeature = (feature, flabel, ftype, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?f rdfs:label ?label . ";
    THIS_UPDATE += "?f crm:P2_has_type ?type . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?f rdfs:label \"" + flabel + "\"@en. ";
    THIS_UPDATE += "?f crm:P2_has_type " + ftype + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?f rdfs:label ?label. ";
    THIS_UPDATE += "?f crm:P2_has_type ?type. ";
    THIS_UPDATE += "?f rdf:type crm:E25_Man-Made_Feature. ";
    THIS_UPDATE += "FILTER(?f = " + feature + ")";
    THIS_UPDATE += "} ";
    console.log("updateFeature", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Feature updated!');
            $("#btn-modal-feature-edit-close").trigger("click");
            $("#btn-modal-features-overview-close").trigger("click");
            $("#btn-open-features-modal").trigger("click");
        }
    });
};

RDF4J.updateFeatureGroup = (featuregroup, flabel, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?f rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?f rdfs:label \"" + flabel + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?f rdf:type ars:Feature_Group. ";
    THIS_UPDATE += "?f rdfs:label ?label. ";
    THIS_UPDATE += "FILTER(?f = " + featuregroup + ")";
    THIS_UPDATE += "} ";
    console.log("updateFeatureGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Feature Group updated!');
            $("#btn-modal-edit-featuregroup-close").trigger("click");
            $("#btn-modal-featuregroup-overview-close").trigger("click");
            $("#btn-open-featuregroup-modal").trigger("click");
        }
    });
};

RDF4J.updateFeatureGroupRelationsFeatures = (featuregroup, features, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?fg crm:P46i_forms_part_of ?f . ";
    THIS_UPDATE += "}  ";
    if (features.length > 0) {
        THIS_UPDATE += "INSERT { ";
        for (item in features) {
            THIS_UPDATE += "?fg crm:P46i_forms_part_of " + features[item] + ". ";
        }
        THIS_UPDATE += "} ";
    }
    THIS_UPDATE += "WHERE { ";
    THIS_UPDATE += "?fg rdf:type ars:Feature_Group. ";
    THIS_UPDATE += "OPTIONAL {?fg crm:P46i_forms_part_of ?f.} ";
    THIS_UPDATE += "FILTER(?fg = " + featuregroup + ")";
    THIS_UPDATE += "} ";
    console.log("updateFeatureGroupRelationsFeatures", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Feature Group Relations updated!');
            $("#btn-modal-edit-featuregroup-close").trigger("click");
            $("#btn-modal-featuregroup-overview-close").trigger("click");
            $("#btn-open-featuregroup-modal").trigger("click");
        }
    });
};

RDF4J.updateFeatureGroupRelationsFeatureGroups = (featuregroup, featuregroups, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?fg ars:isRelatedTo ?fg2 . ";
    THIS_UPDATE += "}  ";
    if (featuregroups.length > 0) {
        THIS_UPDATE += "INSERT { ";
        for (item in featuregroups) {
            THIS_UPDATE += "?fg ars:isRelatedTo " + featuregroups[item] + ". ";
        }
        THIS_UPDATE += "} ";
    }
    THIS_UPDATE += "WHERE { ";
    THIS_UPDATE += "?fg rdf:type ars:Feature_Group. ";
    THIS_UPDATE += "OPTIONAL {?fg ars:isRelatedTo ?fg2.} ";
    THIS_UPDATE += "FILTER(?fg = " + featuregroup + ")";
    THIS_UPDATE += "} ";
    console.log("updateFeatureGroupRelationsFeatureGroups", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Feature Group Relations updated!');
            $("#btn-modal-edit-featuregroup-close").trigger("click");
            $("#btn-modal-featuregroup-overview-close").trigger("click");
            $("#btn-open-featuregroup-modal").trigger("click");
        }
    });
};

RDF4J.updateFeaturFeatureRelations = (feature, features, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?f ars:isRelatedTo ?f2 . ";
    THIS_UPDATE += "}  ";
    if (features.length > 0) {
        THIS_UPDATE += "INSERT { ";
        for (item in features) {
            THIS_UPDATE += "?f ars:isRelatedTo " + features[item] + ". ";
        }
        THIS_UPDATE += "} ";
    }
    THIS_UPDATE += "WHERE { ";
    THIS_UPDATE += "?f rdf:type crm:E25_Man-Made_Feature. ";
    THIS_UPDATE += "OPTIONAL {?f ars:isRelatedTo ?f2.} ";
    THIS_UPDATE += "FILTER(?f = " + feature + ")";
    THIS_UPDATE += "} ";
    console.log("updateFeaturFeatureRelations", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Feature Relations updated!');
            $("#btn-modal-feature-relationsedit-feature-close").trigger("click");
            $("#btn-modal-features-overview-close").trigger("click");
            $("#btn-open-features-modal").trigger("click");
        }
    });
};

RDF4J.updateManufaturingFeatureType = (feature, mft, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?f crm:P2_has_type ?mft . ";
    THIS_UPDATE += "}  ";
    if (mft !== "") {
        THIS_UPDATE += "INSERT { ";
        THIS_UPDATE += "?f crm:P2_has_type " + mft + ". ";
        THIS_UPDATE += "} ";
    }
    THIS_UPDATE += "WHERE { ";
    THIS_UPDATE += "?f rdf:type crm:E25_Man-Made_Feature. ";
    THIS_UPDATE += "?mft rdf:type ars:Manufacturing_Feature_Type. ";
    THIS_UPDATE += "OPTIONAL {?f crm:P2_has_type ?mft.} ";
    THIS_UPDATE += "FILTER(?f = " + feature + ")";
    THIS_UPDATE += "} ";
    console.log("updateManufaturingFeatureType", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Manufacturing Feature Type updated!');
        }
    });
};

RDF4J.createManufacturingFeatureType = (label, meta, callback) => {
    let uuid = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars:" + uuid + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars:" + uuid + " " + "rdf:type" + " " + "ars:Manufacturing_Feature_Type" + ". ";
    THIS_UPDATE += "ars:" + uuid + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars:" + uuid + " " + "ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += " }";
    console.log("createManufacturingFeatureType", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Manufacturing Feature Type created!');
            $("#btn-modal-feature-manufacturing-new-close").trigger("click");
            $("#btn-modal-open-manufacturing-feature").trigger("click");
        }
    });
};

RDF4J.modifyManufacturingFeatureType = (node, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label . ";
    THIS_UPDATE += node + " ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " ars:external_reference" + " " + "meta:" + meta + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " ars:external_reference ?meta. ";
    THIS_UPDATE += "} ";
    console.log("modifyShape", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Manufacturing Feature Type modified!');
            $("#btn-modal-feature-manufacturing-editing-close").trigger("click");
        }
    });
};

RDF4J.addStatementToFeatureGroup = (featuregroup, statement) => {
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += featuregroup + " ars:is_stated_by " + statement + " . ";
    THIS_UPDATE += "} ";
    console.log("addStatementToFeatureGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Statement added to FeatureGroup!');
            $("#btn-modal-statement-individual-close").trigger("click");
            $("#btn-modal-statement-class-close").trigger("click");
            $("#btn-modal-featuregroup-statements-close").trigger("click");
            openFeatureGroupStatementsModal(THISFEATUREGROUP);
        }
    });
};

RDF4J.deleteStatementFromFeatureGroup = (featuregroup, statement) => {
    let THIS_UPDATE = "DELETE DATA { ";
    THIS_UPDATE += featuregroup + " ars:is_stated_by " + statement + " . ";
    THIS_UPDATE += "} ";
    console.log("deleteStatementFromFeatureGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Statement deleted from FeatureGroup!');
            $("#btn-modal-featuregroup-statements-close").trigger("click");
            openFeatureGroupStatementsModal(THISFEATUREGROUP);
        }
    });
};

RDF4J.addStatementToObject = (object, statement) => {
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += object + " ars:is_stated_by " + statement + " . ";
    THIS_UPDATE += "} ";
    console.log("addStatementToObject", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Statement added to Group!');
            $("#btn-modal-statementobj-individual-close").trigger("click");
            $("#btn-modal-statementobj-class-close").trigger("click");
            $("#btn-modal-object-edit-close").trigger("click");
            openObjectEditModal();
        }
    });
};

RDF4J.deleteStatementFromObject = (object, statement) => {
    let THIS_UPDATE = "DELETE DATA { ";
    THIS_UPDATE += object + " ars:is_stated_by " + statement + " . ";
    THIS_UPDATE += "} ";
    console.log("deleteStatementFromObject", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Statement deleted from Object!');
            $("#btn-modal-object-edit-close").trigger("click");
            openObjectEditModal();
        }
    });
};

RDF4J.createStatementIndividual = (no, comment, statementclass, callback) => {
    let uuid1 = UUID.getUUIDv4();
    let uuid2 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "ars:Statement" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdfs:label" + " " + "'" + no + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdfs:comment" + " " + "'" + comment + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "crm:P2_has_type" + " " + "_:" + uuid2 + ". ";
    THIS_UPDATE += "_:" + uuid2 + " " + "rdf:type " + statementclass + ". ";
    THIS_UPDATE += "_:" + uuid2 + " " + "ars:classification-number" + " " + "'" + no + "'" + ". ";
    THIS_UPDATE += " }";
    console.log("createStatementIndividual", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Add new Statement Individual!');
            $("#btn-modal-statement-individual-new-close").trigger("click");
            $("#btn-modal-open-statement-individuals").trigger("click");
        }
    });
};

RDF4J.modifyStatementIndividual = (node, label, comment, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " rdfs:comment ?comment. ";
    THIS_UPDATE += node + " crm:P2_has_type ?bn. ";
    THIS_UPDATE += "?bn ars:classification-number ?type. ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " rdfs:comment" + " " + "'" + comment + "'@en" + ". ";
    THIS_UPDATE += node + " crm:P2_has_type" + " " + "?bn . ";
    THIS_UPDATE += "?bn ars:classification-number" + " " + "'" + label + "'" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " rdfs:comment ?comment. ";
    THIS_UPDATE += node + " crm:P2_has_type ?bn. ";
    THIS_UPDATE += "?bn ars:classification-number ?type. ";
    THIS_UPDATE += "} ";
    console.log("modifyStatementIndividual", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Statement Individual modified!');
            $("#btn-modal-statement-individual-edit-close").trigger("click");
            $("#btn-modal-open-statement-individuals").trigger("click");
        }
    });
};

RDF4J.createStatementobjIndividual = (no, comment, statementclass, callback) => {
    let uuid1 = UUID.getUUIDv4();
    let uuid2 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "ars:Statement" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdfs:label" + " " + "'" + no + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdfs:comment" + " " + "'" + comment + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "crm:P2_has_type" + " " + "_:" + uuid2 + ". ";
    THIS_UPDATE += "_:" + uuid2 + " " + "rdf:type " + statementclass + ". ";
    THIS_UPDATE += "_:" + uuid2 + " " + "ars:classification-number" + " " + "'" + no + "'" + ". ";
    THIS_UPDATE += " }";
    console.log("createStatementobjIndividual", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Add new Statement Individual!');
            $("#btn-modal-statementobj-individual-new-close").trigger("click");
            $("#btn-modal-open-statementobj-individuals").trigger("click");
        }
    });
};

RDF4J.modifyStatementobjIndividual = (node, label, comment, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " rdfs:comment ?comment. ";
    THIS_UPDATE += node + " crm:P2_has_type ?bn. ";
    THIS_UPDATE += "?bn ars:classification-number ?type. ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += node + " rdfs:comment" + " " + "'" + comment + "'@en" + ". ";
    THIS_UPDATE += node + " crm:P2_has_type" + " " + "?bn . ";
    THIS_UPDATE += "?bn ars:classification-number" + " " + "'" + label + "'" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label. ";
    THIS_UPDATE += node + " rdfs:comment ?comment. ";
    THIS_UPDATE += node + " crm:P2_has_type ?bn. ";
    THIS_UPDATE += "?bn ars:classification-number ?type. ";
    THIS_UPDATE += "} ";
    console.log("modifyStatementobjIndividual", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Statement Individual modified!');
            $("#btn-modal-statementobj-individual-edit-close").trigger("click");
            $("#btn-modal-open-statementobj-individuals").trigger("click");
        }
    });
};

RDF4J.createInterpretation = (thisobject, label, callback) => {
    let uuid1 = UUID.getUUIDv4();
    let uuid2 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "ars:Interpretation" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "crm:P2_has_type" + " " + "ars:Human_Interpretation" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "crm:P67_refers_to" + " " + thisobject + ". ";
    THIS_UPDATE += " }";
    console.log("createInterpretation", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Add new Interpretation!');
            $("#btn-modal-new-interpretation-close").trigger("click");
            $("#btn-modal-interpretations-close").trigger("click");
            $("#btn-open-interpretation-modal").trigger("click");
        }
    });
};

RDF4J.updateInterpretation = (interpretation, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?i rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?i rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?i rdf:type ars:Interpretation. ";
    THIS_UPDATE += "?i rdfs:label ?label. ";
    THIS_UPDATE += "FILTER(?i = " + interpretation + ")";
    THIS_UPDATE += "} ";
    console.log("updateInterpretation", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Interpretation updated!');
            $("#btn-modal-edit-interpretation-close").trigger("click");
            $("#btn-modal-interpretations-overview-close").trigger("click");
            $("#btn-open-interpretation-modal").trigger("click");
        }
    });
};

RDF4J.updateActivity = (activity, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?a rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?a rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?a rdfs:label ?label. ";
    THIS_UPDATE += "FILTER(?a = " + activity + ")";
    THIS_UPDATE += "} ";
    console.log("updateActivity", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Activity updated!');
            $("#btn-modal-edit-activity-close").trigger("click");
        }
    });
};

RDF4J.updateCondition = (condition, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?c rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?c rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?c rdfs:label ?label. ";
    THIS_UPDATE += "FILTER(?c = " + condition + ")";
    THIS_UPDATE += "} ";
    console.log("updateCondition", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Condition updated!');
            $("#btn-modal-edit-condition-close").trigger("click");
        }
    });
};

RDF4J.updateItemIndividual = (item, label, meta, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?i rdfs:label ?label . ";
    THIS_UPDATE += "?i ars:external_reference ?meta . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?i rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "?i ars:external_reference \"" + meta + "\". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?i ars:external_reference ?meta. ";
    THIS_UPDATE += "?i rdfs:label ?label. ";
    THIS_UPDATE += "FILTER(?i = " + item + ")";
    THIS_UPDATE += "} ";
    console.log("updateItemIndividual", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Item Individual updated!');
            $("#btn-modal-edit-ii-close").trigger("click");
            $("#btn-modal-item-indiv-close").trigger("click");
            searchIndividuals(THISITEMCLASS);
        }
    });
};

RDF4J.createInterpretationArgument = (interpretation, type, label, item, callback) => {
    console.log(interpretation, type, label, item);
    let uuid1 = UUID.getUUIDv4();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdf:type" + " " + "inf:I1_Argumentation" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "crm:P2_has_type" + " " + type + ". ";
    THIS_UPDATE += "ars3d:" + uuid1 + " " + "crm:P67_refers_to" + " " + item + ". ";
    THIS_UPDATE += interpretation + " " + "crm:P67_refers_to" + " ars3d:" + uuid1 + ". ";
    THIS_UPDATE += " }";
    console.log("createInterpretationArgument", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', 'An error occured!');
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'Add new Argument!');
            $("#btn-modal-interpretation-argument-new-close").trigger("click");
            openInterpretationArgumentsModal(interpretation);
        }
    });
};

//
// DELETE
//

RDF4J.deleteFeature = (feature, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "	?object crm:P56_bears_feature ?feature .";
    THIS_UPDATE += "	?feature ?p1 ?o1 .";
    THIS_UPDATE += "	?s1 dig:L10_had_input ?feature .";
    THIS_UPDATE += "	?s1 ?p2 ?o2 .";
    THIS_UPDATE += "	?feature crm:P62_depicts ?observation .";
    THIS_UPDATE += "	?observation ?p3 ?o3 .";
    THIS_UPDATE += "	?observation sci:O8_observed ?o4 .";
    THIS_UPDATE += "	?o4 ?p4 ?o5 .";
    THIS_UPDATE += "} ";
    THIS_UPDATE += "WHERE {";
    THIS_UPDATE += "	?object crm:P56_bears_feature ?feature .";
    THIS_UPDATE += "	?feature a crm:E25_Man-Made_Feature .";
    THIS_UPDATE += "	?feature ?p1 ?o1 .";
    THIS_UPDATE += "	OPTIONAL { ?s1 dig:L10_had_input ?feature . ?s1 ?p2 ?o2 . }.";
    THIS_UPDATE += "	OPTIONAL { ?feature crm:P62_depicts ?observation . ?observation ?p3 ?o3 . ?observation sci:O8_observed ?o4 . ?o4 ?p4 ?o5 .}.";
    THIS_UPDATE += "	FILTER(?feature = " + feature + ")";
    THIS_UPDATE += "}";
    console.log("deleteFeature", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            deselection();
            visual_ALL_reload();
            $("#btn-modal-features-overview-close").trigger("click");
            $("#btn-open-features-modal").trigger("click");
        }
    });
};

RDF4J.deleteFeatureGroup = (featuregroup, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "	?fg ?p ?o . ";
    THIS_UPDATE += "	?s2 ?p2 ?fg . ";
    THIS_UPDATE += "} ";
    THIS_UPDATE += "WHERE {";
    THIS_UPDATE += "	?fg ?p ?o . ";
    THIS_UPDATE += "	?s2 ?p2 ?fg . ";
    THIS_UPDATE += "	FILTER(?fg = " + featuregroup + ") ";
    THIS_UPDATE += "}";
    console.log("deleteFeatureGroup", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', errorThrown);
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'featuregroup deleted!');
            $("#btn-modal-featuregroup-overview-close").trigger("click");
            $("#btn-open-featuregroup-modal").trigger("click");
        }
    });
};

RDF4J.deleteInterpretation = (interpretation, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "	?int ?p1 ?arg . ";
    THIS_UPDATE += "	?int a ars:Interpretation . ";
    THIS_UPDATE += "	?arg a inf:I1_Argumentation . ";
    THIS_UPDATE += "	?arg ?p2 ?o2 . ";
    THIS_UPDATE += "} ";
    THIS_UPDATE += "WHERE {";
    THIS_UPDATE += "	?int ?p1 ?arg . ";
    THIS_UPDATE += "	?int a ars:Interpretation . ";
    THIS_UPDATE += "	OPTIONAL { ?arg a inf:I1_Argumentation . ";
    THIS_UPDATE += "	?arg ?p2 ?o2 . } ";
    THIS_UPDATE += "	FILTER(?int = " + interpretation + ") ";
    THIS_UPDATE += "}";
    console.log("deleteInterpretation", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', errorThrown);
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'interpretation deleted!');
            $("#btn-modal-interpretations-close").trigger("click");
            $("#btn-open-interpretation-modal").trigger("click");
        }
    });
};

RDF4J.deleteArgumentFromInterpretation = (interpretation, argumentation, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "	?arg ?p1 ?o1 . ";
    THIS_UPDATE += "	?s2 ?p2 ?arg . ";
    THIS_UPDATE += "} ";
    THIS_UPDATE += "WHERE {";
    THIS_UPDATE += "	?arg ?p1 ?o1 . ";
    THIS_UPDATE += "	?s2 ?p2 ?arg . ";
    THIS_UPDATE += "	FILTER(?arg = " + argumentation + ") ";
    THIS_UPDATE += "}";
    console.log("deleteArgumentFromInterpretation", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', errorThrown);
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'interpretation deleted!');
            $("#btn-modal-interpretation-arguments-close").trigger("click");
            openInterpretationArgumentsModal(interpretation);
        }
    });
};

RDF4J.deleteObservation = (feature, observation, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "	?obs ?p1 ?o1 . ";
    THIS_UPDATE += "	?s2 ?p2 ?obs . ";
    THIS_UPDATE += "	?obs sci:O8_observed ?o3 . ";
    THIS_UPDATE += "	?o3 ?p4 ?o4 . ";
    THIS_UPDATE += "} ";
    THIS_UPDATE += "WHERE {";
    THIS_UPDATE += "	?obs ?p1 ?o1 . ";
    THIS_UPDATE += "	?s2 ?p2 ?obs . ";
    THIS_UPDATE += "	?obs sci:O8_observed ?o3 . ";
    THIS_UPDATE += "	?o3 ?p4 ?o4 . ";
    THIS_UPDATE += "	FILTER(?obs = " + observation + ") ";
    THIS_UPDATE += "}";
    //OPTIONAL { ?feature crm:P62_depicts ?observation . ?observation ?p3 ?o3 . ?observation sci:O8_observed ?o4 . ?o4 ?p4 ?o5 .}.";
    console.log("deleteObservation", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            showNotification('error', 'Error!', errorThrown);
        },
        success: function(output) {
            console.log(output);
            showNotification('success', 'Done!', 'observation deleted!');
            $("#btn-modal-observations-close").trigger("click");
            openObservationModal(feature);
        }
    });
};