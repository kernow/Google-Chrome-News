/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */
App.googleFeed = {

  uri: function(category){
    return  chrome.i18n.getMessage("baseFeedUri") +
            chrome.i18n.getMessage("ned") +
            chrome.i18n.getMessage(category + "Params");
  },

  parseItem: function(item){
    var image, arr, len, title, source;
    // extract the image uri from the description and use a larger version
    image = $(item.description).find('img').eq(0).attr('src');
    if (image) {
      image = image.replace(/\/0\.jpg$/, '/11.jpg').replace(/^\/\//, 'http://');
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
