chrome.experimental.app.onLaunched.addListener(function() {
  var opts = {
    width: 1200,
    height: 600,
    left: 100,
    top: 100
  };
  chrome.appWindow.create('main.html', opts);
});
