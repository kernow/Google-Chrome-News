$(document).ready(function(){
  $(window).scroll(function(){
    if($(this).scrollTop() > 0){
      $("body").addClass("in_scroll");
    }else{
      $("body").removeClass("in_scroll");
    }
  });
  
  $("#fullscreen_trigger").click(function(){ document.webkitRequestFullscreen(); });
});