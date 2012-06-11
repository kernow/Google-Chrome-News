/*
 * Authors:       Jamie Dyer (http://kernowsoul.com)
 * Last changed:  2012-06-11
 */

/*global App: false */
$(function() {
  // Setup code goes here
  App.articles = new App.Articles();
  new App.ArticlesView({ collection: App.articles });
  App.articles.fetch();
});
