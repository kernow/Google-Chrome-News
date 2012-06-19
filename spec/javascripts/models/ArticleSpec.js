/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false, mostRecentAjaxRequest: false */

describe("Article", function() {

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

  describe("ordering", function() {

    var article1, article2, article3, articles;

    beforeEach(function() {
      // create some articles
      article1 = new App.Article($.extend({}, articleData, {
        "id": "1",
        "updatedTime": new Date("Mon, 10 Jun 2012 14:23:36 GMT").getTime()
      }));
      article2 = new App.Article($.extend({}, articleData, {
        "id": "2",
        "updatedTime": new Date("Mon, 10 Jun 2012 09:23:36 GMT").getTime()
      }));
      article3 = new App.Article($.extend({}, articleData, {
        "id": "3",
        "updatedTime": new Date("Mon, 11 Jun 2012 14:23:36 GMT").getTime()
      }));
      articles = new App.Articles([article1, article2, article3]);
    });

    it("should order the articles with the newest first", function() {
      var dates = articles.pluck("updatedTime");
      expect(dates[0]).toEqual(article3.get("updatedTime"));
      expect(dates[1]).toEqual(article1.get("updatedTime"));
      expect(dates[2]).toEqual(article2.get("updatedTime"));
    });

  });

  describe("article processing", function(){
    var articles;

    beforeEach(function() {
      jasmine.Clock.useMock();
      articles = new App.Articles();
    });

    describe("startProcessing", function() {

      it("should call getFromFeed after the default interval", function() {
        spyOn(articles, 'getFromFeed');
        articles.startProcessing();
        jasmine.Clock.tick(60000);
        expect(articles.getFromFeed).toHaveBeenCalledWith(App.googleFeed);
      });

      it("should call getFromFeed after the specified interval", function() {
        spyOn(articles, 'getFromFeed');
        articles.startProcessing(9000000000);
        jasmine.Clock.tick(60000);
        expect(articles.getFromFeed).not.toHaveBeenCalled();
        jasmine.Clock.tick(9000000000);
        expect(articles.getFromFeed).toHaveBeenCalledWith(App.googleFeed);
      });

      it("should clear any previous interval that have been set", function() {
        spyOn(articles, 'stopProcessing');
        articles.startProcessing();
        expect(articles.stopProcessing).not.toHaveBeenCalled();
        articles.startProcessing();
        expect(articles.stopProcessing).toHaveBeenCalled();
      });

    });

    describe("stopProcessing", function() {

      it("should clear all intervals", function() {
        spyOn(window, 'clearInterval');
        articles.stopProcessing();
        expect(window.clearInterval.calls.length).toEqual(2);
      });

      it("should call startProcessing if an interval is passed", function() {
        spyOn(articles, 'startProcessing');
        articles.stopProcessing(5000);
        expect(articles.startProcessing).not.toHaveBeenCalled();
        jasmine.Clock.tick(5000);
        expect(articles.startProcessing).toHaveBeenCalled();
      });

    });

    describe("getFromFeed", function() {
      var request, xml;

      beforeEach(function() {
        xml = jasmine.getFixtures().read('science-feed.rss');
        App.settings = new Mock();
        new Mock(App.settings);
        App.settings.stubs('get').returns(['science']);

        new Mock(App.googleFeed);
        App.googleFeed.stubs('uri').returns('https://news.google.com');

        spyOn(articles, 'storeImage');

        jasmine.Ajax.useMock();
      });

      it("call storeImage for each article that is processed", function() {
        runs(function() {
          articles.getFromFeed(App.googleFeed);
          request = mostRecentAjaxRequest();
          request.response({ 'status': 200, 'responseText': xml });
        });

        runs(function() {
          expect(articles.storeImage.calls.length).toEqual(10);
        });
      });

    });

  });

}); // end describe
