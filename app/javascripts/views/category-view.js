/*global App */

// ### Authors
// Chris Garrett <http://abstraktion.co.uk>
// Jamie Dyer <http://kernowsoul.com>
// ### Last changed
// 2012-06-23

// View for the category list
App.CategoriesListView = Backbone.View.extend({
  initialize: function(){
    // Fetch categories dropdown from DOM
    this.setElement('.category_list');

    // Listen for the languageChanged event so that the local country name in the list can be changed
    App.settings.on('languageChanged', this.changeCountryName, this);

    this.render();
  },
  render: function(){
    var self = this;

    // Ensure list is empty
    this.$el.empty();

    // Set default categories
    var categories = ["allStories"];

    categories = categories.concat(App.settings.get('categories'));

    // Load the currently selected category from the settings
    var selectedCategory = App.settings.get('filterCategory');

    // TODO Mode to the settings model
    if(!selectedCategory){
      selectedCategory = 'allStories';
    }

    // Append categories
    _.each(categories, function(category){
      var selected = category == selectedCategory ? true : false;
      self.$el.append(self.create_category(category, selected).render().el);
    });
  },

  changeCountryName: function(language){
    this.$('.countryName').text(language.name);
  },

  create_category: function(category, selected){
    var category_label;
    var classNames = [];

    if(category == "nation"){
      category_label = App.settings.get('feedLanguage').name;
      // Add the 'countryName' class so the label can be changed when the feedLanguage setting is changed
      classNames.push('countryName');
    }else{
      // Get category label
      category_label = chrome.i18n.getMessage(category);
    }

    // If the item should be selected add the active class
    if(selected){
      classNames.push('active');
    }

    var options = {
      "category_label": category_label,
      "category":       category,
      "className":      classNames.join(' ')
    };

    // Pass to single category view
    return new App.CategoryView(options);
  }
});

// View for each category
App.CategoryView = Backbone.View.extend({
  tagName: "li",

  initialize: function(options){
    // Set properties
    this.category = options.category;
    this.category_label = options.category_label;
  },

  // Register click callback
  events: { click: "activate_category" },

  activate_category: function(){
    // Deactivate all categories
    $(this.el).siblings().removeClass("active");

    // And activate this one
    $(this.el).addClass("active");

    $(".news_item").show();

    // Hide irrelevant news items
    if(this.category != "allStories"){ $(".news_item:not(.in_category_" + this.category.underscore() + ")").hide(); }

    // Reload masonry
    $("#news_container").masonry("reload");

    // Save the current filter in the settings model
    App.settings.saveCurrentFilterCategory(this.category);
  },

  render: function(){
    // Set label + class
    $(this.el).html(this.category_label).addClass(this.category + "CategoryTrigger");
    return this;
  }
});
