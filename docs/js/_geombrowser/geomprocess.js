let runCropPolyline = () => {
    let req_obj = {
        "object": THISOBJ,
        "feature": THISGPDATA.feature.f.replace("ars3df:", ""),
        "polygon": THISGPDATA.feature.geom,
        "process": "crop", // => step1
        "timestamp": parseInt(THISGPDATA.gp)
    };
    console.log(req_obj);
    $.ajax({
        url: 'api/cropPolyline',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(req_obj),
        processData: false,
        success: function(response, textStatus, jQxhr) {
            //loader.removeClass("load");
            showNotification('success', 'Success!', 'Your process request was successfully started.');
            console.log("response", response);
            resetSelection(0);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            //loader.removeClass("load");
            showNotification('error', 'Error!', 'Your process request failed!');
            console.log(errorThrown, textStatus, jqXhr);
            resetSelection(0);
        }
    });
};
