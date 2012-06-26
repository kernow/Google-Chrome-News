App.IntentView = Backbone.View.extend({
  initialize: function(){
    console.log("intent view loaded");
    this.setElement(".intent_trigger");
  },
  events: {
    click: "triggerIntent"
  },
  triggerIntent: function(){
    var action = ($(this).hasClass("share_trigger")) ? "share" : "save";
    
    var intent = new WebKitIntent("http://webintents.org/" + action, "text/uri-list", $(this).attr("href"));

    window.navigator.webkitStartActivity(intent);
    
    return false;
  }
});