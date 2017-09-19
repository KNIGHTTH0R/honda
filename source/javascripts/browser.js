function detectBrowser(){  
    var isIE = navigator.userAgent.search("MSIE") > -1;  
    var isIE7 = navigator.userAgent.search("MSIE 7") > -1;  
    var isFirefox = navigator.userAgent.search("Firefox") > -1;  
    var isOpera = navigator.userAgent.search("Opera") > -1;  
    var isSafari = navigator.userAgent.search("Safari") > -1;//Google瀏覽器是用這核心  
      
    // if (isIE7) {  
    //     browser = 'IE7';  
    // }  
    // if (isIE) {  
    //     browser = 'IE';  
    // }  
    // if (isFirefox) {  
    //     browser = 'Firefox';  
    // }  
    // if (isOpera) {  
    //     browser = 'Opera';  
    // }  
    // if (isSafari) {  
    //     browser = 'Safari/Chrome';  
    // }  

    return isFirefox || isSafari;  
}  

if (!detectBrowser()) {
    location.href = "http://honda.dash.tw/browser_not_support.html";
}