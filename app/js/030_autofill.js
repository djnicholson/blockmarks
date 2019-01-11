blockmarks.autofill = (function(){
    
    var POLLING_INTERVAL = 2500;

    var FORM_FIELD_URL = $(".-add-form .-url");
    var FORM_FIELD_TITLE = $(".-add-form .-title");
    var FORM_FIELD_DESCRIPTION = $(".-add-form .-description");

    var initialValue = FORM_FIELD_URL.val();
    var lastLookup = "";

    var doLookup = function() {
        var currentInput = FORM_FIELD_URL.val();
        if ((currentInput != lastLookup) &&
            currentInput.length &&
            (currentInput != initialValue)) {

            lastLookup = currentInput;
            blockmarks.siteinfo.lookup(currentInput).ready.then(function(urlInfo) {
                if (FORM_FIELD_URL.val() == currentInput) {
                    urlInfo.title ? FORM_FIELD_TITLE.val(urlInfo.title) : FORM_FIELD_TITLE.val("");
                    urlInfo.description ? FORM_FIELD_DESCRIPTION.val(urlInfo.description) : FORM_FIELD_DESCRIPTION.val("");
                }
            });
        }
    };

    return {

        initialize: function() {
            setInterval(doLookup, POLLING_INTERVAL);
            FORM_FIELD_URL.blur(doLookup);
        },

    };

})();
