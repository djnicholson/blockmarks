blockmarks.authentication = (function(blockstack){
    
    // privates:

    var postHandlePendingSignIn = function (newUserData) {
        history.replaceState({}, document.title, "?");
        updateUiAccordingToAuthState();
    };

    var updateUiAccordingToAuthState = function() {
        if (blockstack.isUserSignedIn()) {
            $(".-only-when-signed-in").show();
            $(".-only-when-signed-out").hide();
        } else {
            $(".-only-when-signed-in").hide();
            $(".-only-when-signed-out").show();
        }
    };

    // initialization:
    // (don't depend on other packages, order of package initialization is not guaranteed)
    // foo = 1;
    // bar = 2;

    return {

        // publics:
        
        initialize: function() {
            if (blockstack.isSignInPending()) {
                blockstack.handlePendingSignIn().then(postHandlePendingSignIn);
            } else {
                updateUiAccordingToAuthState();
            }
        },

        signIn: function() {
            blockstack.redirectToSignIn();
        },

        signOut: function() {
            blockstack.signUserOut();
            updateUiAccordingToAuthState();
        },

    };

})(blockstack);
