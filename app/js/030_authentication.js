blockmarks.authentication = (function(blockstack){
    
    // privates:

    var currentUserState = { };

    var postHandlePendingSignIn = function (newUserData) {
        history.replaceState({}, document.title, "?");
        updateUiAccordingToAuthState();
    };

    var updateUiAccordingToAuthState = function() {
        if (blockmarks.authentication.isSignedIn()) {
            $(".-only-when-signed-in").show();
            $(".-only-when-signed-out").hide();
        } else {
            $(".-only-when-signed-in").hide();
            $(".-only-when-signed-out").show();
        }

        blockmarks.bookmarks.initialize();
    };

    // initialization:
    // (don't depend on other packages, order of package initialization is not guaranteed)
    // foo = 1;
    // bar = 2;

    return {

        // publics:
        
        initialize: function() {
            currentUserState = { };
            if (blockstack.isSignInPending()) {
                blockstack.handlePendingSignIn().then(postHandlePendingSignIn);
            } else {
                updateUiAccordingToAuthState();
            }
        },

        isSignedIn: function() {
            return blockstack.isUserSignedIn();
        },

        signIn: function() {
            currentUserState = { };
            blockstack.redirectToSignIn();
        },

        signOut: function() {
            blockstack.signUserOut();
            updateUiAccordingToAuthState();
            currentUserState = { };
        },

        state: function(key, value) {
            if (!blockmarks.authentication.isSignedIn) {
                return null;
            } else {
                if (value) {
                    currentUserState[key] = value;
                }

                return currentUserState[key];
            }
        },

    };

})(blockstack);
