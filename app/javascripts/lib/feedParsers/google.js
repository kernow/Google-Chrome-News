/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */
App.googleFeed = {

  uri: function(options){
    var uri  = chrome.i18n.getMessage("baseFeedUri");
    console.log(options);
    if(options.language){
      uri += "&ned=" + options.language;
    }else{
      uri += "&ned=" + chrome.i18n.getMessage("languageCode");
    }

    switch(options.category){
      case "topStories":
        uri += "&topic=h";
        break;
      case "newsNearYou":
        uri += "&geo=detect_metro_area";
        break;
      case "world":
        uri += "&topic=w";
        break;
      case "business":
        uri += "&topic=b";
        break;
      case "nation":
        uri += "&topic=n";
        break;
      case "technology":
        uri += "&topic=tc";
        break;
      case "entertainment":
        uri += "&topic=e";
        break;
      case "sports":
        uri += "&topic=s";
        break;
      case "science":
        uri += "&topic=snc";
        break;
      case "health":
        uri += "&topic=m";
        break;
      case "spotlight":
        uri += "&topic=ir";
        break;
    }

    if(options.query){
      uri += "&q=" + encodeURIComponent(options.query);
    }
    return uri;
  },

  parseItem: function(item){
    var imageUrl, image, arr, len, title, source;

    // extract the image uri from the description and use a larger version
    imageUrl = $('img', item.description).eq(0).attr('src');
    if (imageUrl) {
      image = imageUrl.replace(/\/0\.jpg$/, '/11.jpg').replace(/^\/\//, 'http://');
    }else{
      image = "";
    }

    // split the source from the title
    arr = item.title.split(/ - ([^\-]+)$/);

    // make sure we set a title and source even if the split fails
    len = arr.length;

    if (len < 1) {
      title   = item.title;
      source  = '';
    }
    if (len == 1) {
      title   = arr[0];
      source  = '';
    }
    if (len >= 2) {
      title   = arr[0];
      source  = arr[1];
    }

    // return an object suitable for storing in the article model
    return {
      "image"       : image,
      "title"       : title,
      "source"      : source,
      "id"          : item.id,
      "category"    : item.category,
      "link"        : item.link,
      "updated"     : item.updated,
      // set an updated time field so it can be used for sorting, we set this here rather than
      // calculating it in the comparator method for efficiancy
      "updatedTime" : new Date(item.updated).getTime(),
      "description" : item.description
    };
  }
};
