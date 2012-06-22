App.WindowView = Backbone.View.extend({
  initialize: function(){
    this.setElement(window);
    this.set_ui();
  },
  events: {
    resize: "set_ui",
    mousemove: "deactivate_keyboard_state"
  },
  set_ui: function(){
    nav_item = $(".category_list_trigger");
    nav_item_link = $(".category_list_trigger > a");

    if($(window).width() > 480){
      nav_item.removeClass("icon");
      nav_item_link.text("Categories");
    }else{
      nav_item.addClass("icon");
      nav_item_link.text("l");
    }
  }
});