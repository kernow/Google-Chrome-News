/*
 * Authors:       Jamie Dyer (http://kernowsoul.com), Chris Garrett (http://abstraktion.co.uk)
 * Last changed:  2012-06-11
 */

// setup the applications namespace
window.App = {};

jQuery("document").ready(function(){
  jQuery(window).scroll(function(){
    if($(this).scrollTop() > 0){
      $("body").addClass("in_scroll");
    }else{
      $("body").removeClass("in_scroll");
    }
  });
});