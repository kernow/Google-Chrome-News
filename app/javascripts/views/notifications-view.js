/*global App: false, webkitNotifications: false */

App.NotificationsView = Backbone.View.extend({
  initialize: function(){
    var self = this;
    this.articlesAdded = 0;
    _.bindAll(this, 'add');
    this.collection.bind('add', this.add);

    setInterval(function() {
      self.render();
    }, 30000);
  },

  add: function(){
    console.log('-- added');
    this.articlesAdded++;
  },

  render: function(){
    if(this.articlesAdded > 0){
      var notification = webkitNotifications.createNotification(
        '48.png',
        'You have ' + this.articlesAdded + ' new articles in the Google News App',
        'Click to launch the app'
      );
      notification.onclick = function(){
        chrome.management.launchApp(chrome.i18n.getMessage("@@extension_id"));
        this.close();
      };
      notification.show();
      this.articlesAdded = 0;
    }
  }
});
