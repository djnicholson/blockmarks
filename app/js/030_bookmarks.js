blockmarks.bookmarks = (function(){
    
    // privates:
    
    var DEFAULT_BOOKMARKS = [
        ["clickbox", "https://clickbox.link/", "A decentralized bookmark manager"],
        ["App.co", "https://app.co/"],
        ["blockstack", "https://blockstack.org/", "The easiest way to start building decentralized blockchain apps"],
    ];

    var FILE_NAME = "bookmarks.json";

    var rootElement = null; // set on initialization

    var getFileAndRender = function() {
        var receiveFileContents = function(fileContents) {
            var bookmarks = JSON.parse(fileContents) || DEFAULT_BOOKMARKS;
            blockmarks.authentication.state("bookmarks", bookmarks);
            rootElement.empty();
            for (var i = 0; i < bookmarks.length; i++) {
                var bookmark = bookmarks[i];
                if (bookmark) {
                    renderBookmark(bookmark);
                }
            }
        };

        blockstack.getFile(FILE_NAME).then(receiveFileContents);
    };

    var renderBookmark = function(bookmark) {
        var bookmarkElement = $($("#template-bookmark").html());
        bookmarkElement.find(".-link").text(bookmark[0]);
        bookmarkElement.find(".-link").prop("href", bookmark[1]);
        console.log(bookmark);
        if (bookmark[2]) {
            bookmarkElement.find(".-description").text(bookmark[2]);
        } else {
            bookmarkElement.find(".-description").hide();
        }

        rootElement.append(bookmarkElement);
    };

    // initialization:
    // (don't depend on other packages, order of package initialization is not guaranteed)
    
    rootElement = $(".-bookmarks");

    return {

        // publics:
        
        add: function() {
            var newEntry = [];
            newEntry[1] = $(".-add-form .-url").val();
            newEntry[0] = $(".-add-form .-title").val() || newEntry[1];
            var description = $(".-add-form .-description").val();
            if (description) {
                newEntry[2] = description;
            }

            if (newEntry[0]) {
                var bookmarks = blockmarks.authentication.state("bookmarks");
                if (bookmarks) {
                    bookmarks.push(newEntry);
                    blockstack.putFile(FILE_NAME, JSON.stringify(bookmarks)).then(getFileAndRender);
                } else {
                    // TODO: Error for edge case (signed out)
                }
            } else {
                // TODO: Show error (URL is required)
            }
            
            $(".-add-form .-url").val("")
            $(".-add-form .-title").val("")
            $(".-add-form .-description").val("")
        },

        initialize: function() {
            rootElement.empty();
            if (blockmarks.authentication.isSignedIn()) {
                getFileAndRender();
            }
        },

    };

})();
