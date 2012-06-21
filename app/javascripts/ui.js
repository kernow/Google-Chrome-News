$(document).ready(function(){
  $("#fullscreen_trigger").click(function(e){
    document.webkitRequestFullscreen();

    return false;
  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 0){
      $("body").addClass("in_scroll");
    }else{
      $("body").removeClass("in_scroll");
    }
  });
  
  var toggle_categories_list_trigger = function(){
    nav_item = $(".category_list_trigger");
    nav_item_link = $(".category_list_trigger > a");

    if($(window).width() > 480){
      nav_item.removeClass("icon");
      nav_item_link.text("Categories");
    }else{
      nav_item.addClass("icon");
      nav_item_link.text("l");
    }
  };
  
  toggle_categories_list_trigger();
  
  $(window).resize(function(){ toggle_categories_list_trigger(); });
  
  $(".close_browser_trigger").click(function(){
    $("body").removeClass("news_loaded");
    
    $("#browser_container").html("");
    
    return false;
  });
  
  $(".save_trigger, .share_trigger").click(function(){
    var action = ($(this).hasClass("share_trigger")) ? "share" : "save";
    
    var intent = new WebKitIntent("http://webintents.org/" + action, "text/uri-list", $(this).attr("href"));

    window.navigator.webkitStartActivity(intent);
    
    return false;
  });
  
  $(document).bind("keydown", "right", function(){
    $("body").addClass("keyboard_navigation");
    
    var current = $(".keyboard_activated");
    
    if(current.size() > 0){     
      var current_position = current.offset();
       
      target = $(document.elementFromPoint(current_position.left + current.outerWidth() + parseFloat(current.css("margin-left")) + parseFloat(current.css("margin-right")) + 10, current_position.top + 10)).parents(".news_item");
      
      current.removeClass("keyboard_activated");
      
      target.addClass("keyboard_activated"); 
    }else{
      $(".news_item:first").addClass("keyboard_activated");
    }
    
    return false;
  });
  
  $(document).bind("keydown", "down", function(){
    $("body").addClass("keyboard_navigation");
    
    var current = $(".keyboard_activated");
    
    if(current.size() > 0){     
      var current_position = current.offset();
      
      var target_top = current_position.top + current.outerHeight() + parseFloat(current.css("margin-top")) + parseFloat(current.css("margin-bottom")) + 10;
       
      target = $(document.elementFromPoint(current_position.left + 10, target_top)).parents(".news_item");
      
      current.removeClass("keyboard_activated");
      
      target.addClass("keyboard_activated"); 
    }else{
      $(".news_item:first").addClass("keyboard_activated");
    }
    
    //$("html, body").animate({ scrollTop: target_top - 85 }, 800, function(){ $("body").addClass("keyboard_navigation"); });
    
    return false;
  });
  
  $(window).mousemove(function(e){ 
    if(window.lastX !== e.clientX || window.lastY !== e.clientY){
      $("body").removeClass("keyboard_navigation"); 
    }   
  
    window.lastX = e.clientX
    window.lastY = e.clientY
  });
});