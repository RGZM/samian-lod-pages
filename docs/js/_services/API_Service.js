let API = {};

API.HOST = "http://localhost:8080";

API.BASE = API.HOST + "/nopi/rest";

API.getSearchValuesAndObjectCountPOST = (lut, list, callback) => {
    setTimeout(function() {
        $.ajax({
            type: 'POST',
            async: false,
            url: API.BASE + "/searchitems",
            data: jQuery.param({
                lut: lut,
                list: list
            }),
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

API.getSearchObjectsForParamListCountPOST = (paramlist, callback) => {
    console.log(paramlist);
    setTimeout(function() {
        $.ajax({
            type: 'POST',
            async: false,
            url: API.BASE + "/searchobj",
            data: jQuery.param({
                q: paramlist
            }),
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                    console.log(response);
                } catch (e) {}
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

// old

API.getObjectDataValues = (callback, spinner, target) => {
    setTimeout(function() {
        $.ajax({
            type: 'GET',
            async: false,
            url: API.BASE + "/ObjectDataValues",
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                if (typeof callback === 'function') {
                    if (spinner != null && target != null) {
                        callback(spinner, target, response);
                    } else {
                        callback(response);
                    }
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

API.getObjects = (callback) => {
    setTimeout(function() {
        $.ajax({
            type: 'GET',
            async: false,
            url: API.BASE + "/objects",
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

API.getObjectsQuery = (q, callback) => {
    setTimeout(function() {
        $.ajax({
            type: 'GET',
            async: false,
            url: API.BASE + "/objects?q=" + q,
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                if (typeof callback === 'function') {
                    callback(response);
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

API.getObjectById = (id, callback, spinner, target) => {
    setTimeout(function() {
        $.ajax({
            type: 'GET',
            async: false,
            url: API.BASE + "/objects/" + id,
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                THISOBJECTFULL = response;
                if (typeof callback === 'function') {
                    if (spinner != null && target != null) {
                        callback(spinner, target, response);
                    } else {
                        callback(response);
                    }
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

API.getFeaturesByObjectId = (id, callback, spinner, target) => {
    setTimeout(function() {
        console.log("call getFeaturesByObjectId");
        $.ajax({
            type: 'GET',
            async: false,
            url: API.BASE + "/features?q=" + id,
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                //console.log("features", response);
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                console.log("getFeaturesByObjectId", response);
                if (typeof callback === 'function') {
                    if (spinner != null && target != null) {
                        callback(spinner, target, response);
                    } else {
                        callback(response);
                    }
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

API.getFeatureById = (id, callback, spinner, target) => {
    setTimeout(function() {
        console.log("call getFeatureById");
        $.ajax({
            type: 'GET',
            async: false,
            url: API.BASE + "/features/" + id,
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                console.log(response);
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                console.log("getFeatureById", response);
                if (typeof callback === 'function') {
                    if (spinner != null && target != null) {
                        callback(spinner, target, response);
                    } else {
                        callback(response);
                    }
                } else {
                    return response;
                }
            }
        });
    }, 0);
};

API.getFeatureProcessesByFeatureId = (id, callback, spinner, target) => {
    setTimeout(function() {
        console.log("call getFeatureProcessesByFeatureId");
        $.ajax({
            type: 'GET',
            async: false,
            url: API.BASE + "/features/geometryprocesses/" + id,
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                console.log(response);
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                console.log("getFeatureProcessesByFeatureId", response);
                if (typeof callback === 'function') {
                    if (spinner != null && target != null) {
                        callback(spinner, target, response);
                    } else {
                        callback(response);
                    }
                } else {
                    return response;
                }
            }
        });
    }, 0);
};