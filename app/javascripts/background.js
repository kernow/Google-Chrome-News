chrome.experimental.app.onLaunched.addListener(function() {
  var opts = {
    width: 800,
    height: 600,
    left: 100,
    top: 100
  };
  chrome.appWindow.create('main.html', opts);
});
