if (Ti.Platform.osname == 'android'){
            Ti.Gesture.addEventListener('orientationchange', function(e) {
 
              Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
            });
        }
var win = Titanium.UI.createWindow({
    backgroundImage: 'images/background-blue.png',
    url: 'window.menu.js',
    navBarHidden : false,
    modal:true, 
    fullscreen: true
});
win.open();
