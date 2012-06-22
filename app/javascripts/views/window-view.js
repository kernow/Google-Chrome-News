App.WindowView = Backbone.View.extend({
  initialize: function(){
    this.setElement(window);
    this.set_ui();
  },
  
  events: {
    resize: "set_ui",
    scroll: "set_scroll_state",
    mousemove: "deactivate_keyboard_state",
    // Binding FPS directional nav as arrow keys are problematic
    "keyup[w a s d]": "activate_keyboard_state"
  },
  
  set_ui: function(){
    var nav_item = $(".category_list_trigger");
    var nav_item_link = $(".category_list_trigger > a");
    
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
  
  set_scroll_state: function(){ 
    // Add or remove state class?
    var method = (($(this.el).scrollTop() > 0) ? "add" : "remove") + "Class";
    
    $("body")[method]("in_scroll"); 
  },
  
  deactivate_keyboard_state: function(e){
    // Check the cursor position has changed from cached values
    // We do this to gauge whether the user has moved the cursor or just scrolled the window
    if(window.lastX !== e.clientX || window.lastY !== e.clientY){ $("body").removeClass("keyboard_navigation"); }   
  
    // Cache the new cursor position
    window.lastX = e.clientX
    window.lastY = e.clientY
  },
  
  current_active_item: null,
  
  activate_keyboard_state: function(e, test){    
    // Set keyboard navigable state
    $("body").addClass("keyboard_navigation");
    
    // Cache the currently active item
    this.current_active_item = $(".keyboard_activated");
    
    return false;
  }
});