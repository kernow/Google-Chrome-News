/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

describe("Article", function() {

  describe("ordering", function() {

    var articleData = {
      "image"       : "http://google.com/image_url.jpg",
      "title"       : "Something happened in the business world!",
      "source"      : "The Guardian",
      "id"          : "123456",
      "category"    : "Business",
      "link"        : "http://news.google.com",
      "updated"     : "",
      "description" : "The article"
    };

    var artilce1, artilce2, article3, articles;

    beforeEach(function() {
      // create some articles
      article1 = new App.Article($.extend({}, articleData, { "id": "1", "updated": "Mon, 10 Jun 2012 14:23:36 GMT" }));
      article2 = new App.Article($.extend({}, articleData, { "id": "2", "updated": "Mon, 10 Jun 2012 09:23:36 GMT" }));
      article3 = new App.Article($.extend({}, articleData, { "id": "3", "updated": "Mon, 11 Jun 2012 14:23:36 GMT" }));
      articles = new App.Articles([article1, article2, article3]);
    });

    it("should order the articles with the newest first", function() {
      var dates = articles.pluck("updated");
      expect(dates[0]).toEqual(article3.get("updated"));
      expect(dates[1]).toEqual(article1.get("updated"));
      expect(dates[2]).toEqual(article2.get("updated"));
    });

  });

}); // end describe
