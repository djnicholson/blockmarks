blockmarks.bookmarks = (function(blockstack){
    
    var DEFAULT_BOOKMARKS = [
        ["clickbox", "https://clickbox.link/", "A decentralized bookmark manager"],
        ["App.co", "https://app.co/"],
        ["blockstack", "https://blockstack.org/", "The easiest way to start building decentralized blockchain apps"],
    ];

    var FILE_NAME = "bookmarks.json";

    var FORM_FIELD_URL = ".-add-form .-url";
    var FORM_FIELD_TITLE = ".-add-form .-title";
    var FORM_FIELD_DESCRIPTION = ".-add-form .-description";

    var rootElement = null; // set on initialization

    var deleteBookmark = function(i) {
        if (confirm("Are you sure?")) {
            var bookmarks = blockmarks.authentication.state("bookmarks");
            if (bookmarks) {
                bookmarks[i] && $(FORM_FIELD_TITLE).val(bookmarks[i][0] || "");
                bookmarks[i] && $(FORM_FIELD_URL).val(bookmarks[i][1] || "https://");
                bookmarks[i] && $(FORM_FIELD_DESCRIPTION).val(bookmarks[i][2] || "");

                bookmarks[i] = undefined;
                pushFileAndRender(bookmarks);
            } else {
                // TODO: Error for edge case (signed out)
            }
        }
    };

    var detectEnter = function(e) {
        e = e || window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            blockmarks.bookmarks.add();
        }
    };

    var getFileAndRender = function() {
        var receiveFileContents = function(fileContents) {
            var bookmarks = JSON.parse(fileContents) || DEFAULT_BOOKMARKS;
            blockmarks.authentication.state("bookmarks", bookmarks);
            rootElement.empty();
            for (var i = 0; i < bookmarks.length; i++) {
                var bookmark = bookmarks[i];
                if (bookmark) {
                    renderBookmark(i, bookmark);
                }
            }
        };

        blockstack.getFile(FILE_NAME).then(receiveFileContents);
    };

    var pushFileAndRender = function(bookmarks) {
        blockstack.putFile(FILE_NAME, JSON.stringify(bookmarks)).then(getFileAndRender);
    };

    var renderBookmark = function(i, bookmark) {
        var bookmarkElement = $($("#template-bookmark").html());
        bookmarkElement.find(".-link").text(bookmark[0]);

        if (chromeExtensionId && chrome && chrome.runtime && chrome.runtime.sendMessage) {
            bookmarkElement.find(".-link").prop("href", "#");
            bookmarkElement.find(".-link").click(function() {
                chrome.runtime.sendMessage(chromeExtensionId, { goto: bookmark[1] });
                return false;
            });
        } else {
            bookmarkElement.find(".-link").prop("href", bookmark[1]);    
        }

        bookmarkElement.find(".-delete-link").click(function(){ deleteBookmark(i); });
        if (bookmark[2]) {
            bookmarkElement.find(".-description").text(bookmark[2]);
        } else {
            bookmarkElement.find(".-description").hide();
        }

        rootElement.append(bookmarkElement);
    };
    
    rootElement = $(".-bookmarks");

    var chromeExtensionId = undefined;
    var fragment = window.location.hash;
    if (fragment && (fragment.startsWith("#EXT_"))) {
        chromeExtensionId = fragment.substring(5);
    }

    return {

        // publics:
        
        add: function() {
            var newEntry = [];
            newEntry[1] = blockmarks.siteinfo.withProtocol($(FORM_FIELD_URL).val());
            newEntry[0] = $(FORM_FIELD_TITLE).val() || newEntry[1];
            var description = $(FORM_FIELD_DESCRIPTION).val();
            if (description) {
                newEntry[2] = description;
            }

            if (newEntry[0]) {
                var bookmarks = blockmarks.authentication.state("bookmarks");
                if (bookmarks) {
                    bookmarks.push(newEntry);
                    pushFileAndRender(bookmarks);
                } else {
                    // TODO: Error for edge case (signed out)
                }
            } else {
                // TODO: Show error (URL is required)
            }
            
            $(FORM_FIELD_URL).val("https://")
            $(FORM_FIELD_TITLE).val("")
            $(FORM_FIELD_DESCRIPTION).val("")
        },

        initialize: function() {
            rootElement.empty();
            $(FORM_FIELD_URL).keypress(detectEnter);
            $(FORM_FIELD_TITLE).keypress(detectEnter);
            $(FORM_FIELD_DESCRIPTION).keypress(detectEnter);
            if (blockmarks.authentication.isSignedIn()) {
                getFileAndRender();
            }
        },

    };

})(blockstack);
