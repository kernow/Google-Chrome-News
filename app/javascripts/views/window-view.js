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
      // If mobile version, show text label for categories
      nav_item.removeClass("icon");
      nav_item_link.text("Categories");
    }else{
      // Otherwise show icon version
      nav_item.addClass("icon");
      nav_item_link.text("l");
    }
  },
  deactivate_keyboard_state: function(e){
    // Check the cursor position has changed from cached values
    // We do this to gauge whether the user has moved the cursor or just scrolled the window
    if(window.lastX !== e.clientX || window.lastY !== e.clientY){ $("body").removeClass("keyboard_navigation"); }   
  
    // Cache the new cursor position
    window.lastX = e.clientX
    window.lastY = e.clientY
  }
});