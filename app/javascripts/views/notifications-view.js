/*global App: false, webkitNotifications: false */

// ### Authors
// Jamie Dyer <http://kernowsoul.com>
// ### Last changed
// 2012-06-23

App.NotificationsView = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.clearCounts();

    // Add a handler for the collections add event
    this.collection.on('add', this.add, this);

    // Check to see if we need to display a notification every 30 seconds
    setInterval(function() {
      self.render();
    }, 30000);
  },

  clearCounts: function(){
    console.log('clearing unread counts');
    this.unreadArticles       = 0;
    this.previousUnreadCount  = 0;
  },

  add: function(){
    this.unreadArticles++;
  },

  render: function(){
    // If background processing is not allowed to run simply return and do nothing
    if(!App.canBackgroundProcess){ return; }

    var self = this;

    if(this.unreadArticles > 0 && this.previousUnreadCount != this.unreadArticles){

      this.previousUnreadCount = this.unreadArticles;

      // If a notification window is already being displayed then close it so only 1
      // is ever displayed to the user
      if(this.notification){ this.close(); }

      // build the notification object
      this.notification = webkitNotifications.createNotification(
        '48.png',
        'You have ' + this.unreadArticles + ' new ' + App.pluralize('article', this.unreadArticles) + ' in the Google News App',
        'Click to launch the app'
      );

      // Handle notification click events
      this.notification.onclick = function(){

        // Reset the unread counts to 0
        this.unreadArticles       = 0;
        this.previousUnreadCount  = 0;

        // Launch the application
        chrome.management.launchApp(chrome.i18n.getMessage("@@extension_id"));
        self.close();
      };

      // Display the notification window
      this.notification.show();
    }
  },

  // close the notification window
  close: function(){
    this.notification.close();
  }
});
