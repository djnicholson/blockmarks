var extensionId = chrome.extension.getURL("").replace("chrome-extension://", "").replace("/", "");
var frame = document.getElementById("frame");
frame.src = "https://clickbox.link/#EXT_" + extensionId;
chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if (request && request.goto) {
            chrome.tabs.create({ url: request.goto });
        }
    });    
