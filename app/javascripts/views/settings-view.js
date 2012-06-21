/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */

// Master settings panel view
App.SettingsView = Backbone.View.extend({
  initialize: function(){
    this.setElement('.settings_dropdown');
    // Immediatly render on initialization
    this.render();
  },

  render: function(){
    this.categories = new App.SettingCategoriesView();
    this.categories.setElement(this.$('#settings_categories')).render();

    this.languages = new App.SettingsLanguagesView();
    this.languages.setElement(this.$('#settings_languages')).render();
  }
});

// View for the category list
App.SettingCategoriesView = Backbone.View.extend({
  render: function(){
    var self = this;
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
    return new App.SettingsCategoryView(options);
  }
});

// View for each category
App.SettingsCategoryView = Backbone.View.extend({
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

App.SettingsLanguagesView = Backbone.View.extend({

  render: function(){
    this.$el.empty();
    var self = this;
    _.each(App.supportedLanguages, function(language){
      language.attributes = { 'value': language.code };
      // TODO work out if the language should be selected
      if(App.settings.get('feedLanguage') == language.code){
        // This is the current language and should be selected
        language.attributes.selected = "selected";
      }
      self.$el.append(self.createLanguage(language).render().el);
    });
    return this;
  },

  events: {
    "change": "updateSettings"
  },

  updateSettings: function(){
    App.settings.changeLanguage(this.$el.val());
  },

  createLanguage: function(options){
    return new App.SettingsLanguageView(options);
  }
});

App.SettingsLanguageView = Backbone.View.extend({
  tagName:    "option",

  initialize: function(options){
    this.name = options.name;
  },

  render: function(){
    $(this.el).html(this.name);
    return this;
  }
});
