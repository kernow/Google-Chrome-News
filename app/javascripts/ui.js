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
  
  $(".category_list").on("click", "a", function(){
    $(".category_list a").removeClass("active");
    
    $(this).addClass("active");
    
    var target = $(this).parents("li").attr("class").replace("_category_trigger", "");
    
    $("#news_container").masonry("reload");
    
    return false;
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
  });
});