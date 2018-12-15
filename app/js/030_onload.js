blockmarks.onload = (function(blockstack){
    
    // privates:
    
    var userData = null;

    var receiveUserData = function (newUserData) {
        userData = newUserData;
        history.replaceState({}, document.title, "?");
    };

    // initialization:
    // (don't depend on other packages, order of package initialization is not guaranteed)
    // foo = 1;
    // bar = 2;

    return {

        // publics:
        
        go: function() {
            if (blockstack.isSignInPending()) {
                blockstack.handlePendingSignIn().then(receiveUserData);
            }
        },

    };

})(blockstack);
