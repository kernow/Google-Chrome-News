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
    
    return false;
  });
});