blockmarks.plugin = (function(){
    
    var chromeExtensionId = undefined;
    var fragment = window.location.hash;
    if (fragment && (fragment.startsWith("#EXT_"))) {
        chromeExtensionId = fragment.substring(5);
    }

    return {

        // publics:
        
        chromeExtensionId: function() {
            return chromeExtensionId;
        },

        isRunningInPlugin: function() {
            return chrome && chrome.runtime && chrome.runtime.sendMessage && chromeExtensionId;
        },

    };

})();
