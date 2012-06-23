/*global App */

// ### Authors
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

    // Do something here to reflect preferred categories

    // Append categories
    _.each(categories, function(category){ self.$el.append(self.create_category(category).render().el); });
  },

  changeCountryName: function(language){
    this.$('.countryName').text(language.name);
  },

  create_category: function(category){
    var category_label;
    var className = '';

    if(category == "nation"){
      category_label = App.settings.get('feedLanguage').name;
      // Add the 'countryName' class so the label can be changed when the feedLanguage setting is changed
      className = 'countryName';
    }else{
      // Get category label
      category_label = chrome.i18n.getMessage(category);
    }

    var options = {
      "category_label": category_label,
      "category":       category,
      "className":      className
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

    // Hide irrelevant news items
    $(".news_item").show();

    if(this.category != "allStories"){ $(".news_item:not(.in_category_" + this.category + ")").hide(); }

    // Reload masonry

    $("#news_container").masonry("reload");
  },

  render: function(){
    // Set label + class
    $(this.el).html(this.category_label).addClass(this.category + "CategoryTrigger");

    if(this.category == "allStories"){ $(this.el).addClass("active"); }

    return this;
  }
});
