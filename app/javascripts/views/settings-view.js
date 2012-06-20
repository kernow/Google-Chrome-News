/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

App.CategorySettingsView = Backbone.View.extend({
  tagName:    "li",

  initialize: function(options){
    this.category = options.category;
  },

  events: {
    "click": "updateSettings"
  },

  updateSettings: function(){
    // toggle the active class
    this.$el.toggleClass('active');

    // save the settings
    if(this.$el.hasClass('active')){
      // the category has been added
      App.settings.addCategory(this.category);
    }else{
      // the category has been removed
      App.settings.removeCategory(this.category);
    }
  },

  render: function(){
    $(this.el).html(chrome.i18n.getMessage(this.category));
    return this;
  }
});

App.SettingsView = Backbone.View.extend({

  initialize: function(){
    var self = this;
    this.setElement('#settings_categories');
    this.$el.empty();
    _.each(App.defaultCategories, function(category){
      self.$el.append(self.createCategorySetting(category).render().el);
    });
  },

  createCategorySetting: function(category){
    var options = {
      'category': category
    };
    if($.inArray(category, App.settings.get('categories')) > -1){
      options.className = 'active';
    }
    return new App.CategorySettingsView(options);
  }
});
