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
  initialize: function(){
    App.settings.on('languageChanged', this.changeCountryName, this);
  },

  render: function(){
    var self = this;
    this.$el.empty();
    _.each(App.defaultCategories, function(category){
      self.$el.append(self.createCategorySetting(category).render().el);
    });
  },

  changeCountryName: function(language){
    this.$('.countryName').text(language.name);
  },

  createCategorySetting: function(category){
    var categoryName;
    var classNames = [];
    if(category == "nation"){
      categoryName = App.settings.get('feedLanguage').name;
      // Add the 'countryName' class so it can be changed when the language setting is changed
      classNames.push('countryName');
    }else{
      categoryName = chrome.i18n.getMessage(category);
    }

    var options = {
      'displayCategory':  categoryName,
      'category':         category
    };

    // If the category is in the settings array of categories mark it as active
    if($.inArray(category, App.settings.get('categories')) > -1){
      classNames.push('active');
    }

    options.className = classNames.join(' ');
    return new App.SettingsCategoryView(options);
  }
});

// View for each category
App.SettingsCategoryView = Backbone.View.extend({
  tagName:    "li",

  initialize: function(options){
    this.category         = options.category;
    this.displayCategory  = options.displayCategory;
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
    $(this.el).html(this.displayCategory);
    return this;
  }
});

App.SettingsLanguagesView = Backbone.View.extend({

  render: function(){
    this.$el.empty();
    var self = this;
    _.each(App.supportedLanguages, function(language){
      language.attributes = { 'value': language.code };
      if(App.settings.get('feedLanguage').code == language.code){
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
