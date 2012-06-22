// View for the category list
App.CategoriesListView = Backbone.View.extend({
  initialize: function(){
    // Fetch categories dropdown from DOM    
    this.setElement('.category_list');
    
    this.render();
  },
  render: function(){
    var self = this;
    
    // Ensure list is empty
    this.$el.empty();
    
    // Set default categories
    var categories = App.defaultCategories;
    
    // Do something here to reflect preferred categories
    
    // Append categories
    _.each(categories, function(category){ self.$el.append(self.create_category(category).render().el); });
  },

  create_category: function(category){
    // Get category label
    var category_label = chrome.i18n.getMessage(category);
    
    var options = {
      "category_label": category_label,
      "category": category
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
  },

  render: function(){
    // Set label + class
    $(this.el).html(this.category_label).addClass(this.category + "CategoryTrigger");
    
    return this;
  }
});