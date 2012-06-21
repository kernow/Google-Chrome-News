// View for the category list
App.CategoriesListView = Backbone.View.extend({
  initialize: function(){
    console.log("Initializing categories list");
    
    this.setElement('.category_list');
    
    this.render();
  },
  render: function(){
    var self = this;
    
    this.$el.empty();
    
    _.each(App.defaultCategories, function(category){ self.$el.append(self.create_category(category).render().el); });
  },

  create_category: function(category){
    var category_name;
    
    category_name = chrome.i18n.getMessage(category);
    
    var options = {
      "category_name": category_name,
      "category": category
    };

    return new App.CategoryView(options);
  }
});

// View for each category
App.CategoryView = Backbone.View.extend({
  tagName: "li",

  initialize: function(options){
    this.category = options.category;
    this.category_name = options.category_name;
  },

  events: {
    "click": "activate_category"
  },

  activate_category: function(){
    $(this.el).siblings().removeClass("active");
    $(this.el).addClass("active");
  },

  render: function(){
    $(this.el).html(this.category_name).addClass(this.category + "CategoryTrigger");
    
    return this;
  }
});