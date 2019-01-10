blockmarks.onload = (function(){
    
    // privates:
    // var foo = ...
    // var bar = ...    

    // initialization:
    // (don't depend on other packages, order of package initialization is not guaranteed)
    // foo = 1;
    // bar = 2;

    return {

        // publics:
        
        go: function() {

            blockmarks.authentication.initialize();
            blockmarks.autofill.initialize();
            
        },

    };

})();
