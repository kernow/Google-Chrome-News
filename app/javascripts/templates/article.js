App.templates = {};
App.templates.article = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='\n      <a href="javascript:;" data-link="'+
( link )+
'">\n        ';
 if (image) {
;__p+='\n          <img src="'+
( image )+
'" />\n        ';
 }
;__p+='\n        <p>'+
( category )+
'</p>\n        <h1>'+
( title )+
'</h1>\n        <p>'+
( source )+
'</p>\n        <p>'+
( updated )+
'</p>\n      </a>\n    ';
}
return __p;
}
