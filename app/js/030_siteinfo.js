blockmarks.siteinfo = (function(){
    
    var STATE_PENDING = 0;
    var STATE_SUCCEEDED = 1;
    var STATE_FAILED = 2;

    var parser = new DOMParser();

    var UrlInfo = function(url) {
        this.state = STATE_PENDING;
        this.title = undefined;
        this.description = undefined;
        var that = this;
        this.ready = new Promise(function(resolve, reject) {
            $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data) {
                try {            
                    var html = $(parser.parseFromString(data.contents, 'text/html'));
                    that.title = html.find("title").text();
                    that.description = html.find("meta[name=description]").attr("content");
                    that.state = STATE_SUCCEEDED;
                    resolve(that);
                } catch(e) {
                    console.warn("Could not get URL info for " + url, e);
                    that.state = STATE_FAILED;
                    reject(that);
                }
            });
        });
    };

    var getCache = function() {
        return blockmarks.authentication.state("siteinfoCache") || 
            blockmarks.authentication.state("siteinfoCache", { });
    };

    var withProtocol = function(url) {
        url.indexOf("://") != -1 || (url = "https://" + url);
        return url;
    };

    return {
        
        lookup: function(url) {
            url = withProtocol(url);
            cache = getCache();
            return cache[url] || (cache[url] = new UrlInfo(url));
        },

        withProtocol: function(url) {
            return withProtocol(url);
        },

    };

})();
