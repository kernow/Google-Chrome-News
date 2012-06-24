/*global App */

// ### Authors
// Jamie Dyer <http://kernowsoul.com>
// ### Last changed
// 2012-06-23

// ## App.DisplayedArticles
// The App.DisplayedArticles is used to store articles that are to be
// displayed. It handles the loading of new articles from the data store and firing
// events that views can listen for.

App.DisplayedArticles = Backbone.Collection.extend({

  // Set the indexedDb database to use
  database:   App.articlesDatabase,
  storeName:  "articles",
  model:      App.Article,

  // ### initialize
  initialize: function(){
    this.loading = false;
    App.articles.on('allRemoved', this.allRemoved, this);
    App.articles.on('add', this.articleAdded, this);
    App.articles.on('articlesFromCategoryRemoved', this.removeWithCategory, this);
    App.settings.on('filterCategoryChanged', this.filterCategoryChanged, this);
  },

  // ### comparator
  // sort articles by the updatedTime field so that newest articles are first
  comparator: function(article) {
    return -article.get('updatedTime');
  },

  // ### articleAdded
  // handles new articles that have been added and decides if they should
  // be displayed. Articles that are newer than the oldest article currently displayed
  // are added. Older articles are also added if the number of articles currently
  // displayed is less than the value of App.perPage
  articleAdded: function(article){
    var oldestTime;
    if(this.length > 0){
      oldestTime = this.last().get('updatedTime');
    }else{
      oldestTime = 0;
    }
    // Add the article to the collection if it's newer than the oldest article
    // or if there are less articles displayed than should be on a single page
    if(this.length < App.perPage || oldestTime < article.get('updatedTime')){
      this.add(article);
      this.trigger('articlesAdded');
    }
  },

  // ### removeWithCategory
  removeWithCategory: function(category){
    this.remove(this.where({ 'categoryEnglish': category }));
    this.trigger("articlesRemoved", category);
  },

  // ### allRemoved
  allRemoved: function(){
    this.reset();
  },

  // ## filterCategoryChanged
  filterCategoryChanged: function(category){

    // If the category is allStories we don't need to load anything so return immediatly
    if(category == 'allStories'){ return; }
    console.log('loading articles for category:', category);
    var self = this;
    // work out how many articles are in the category
    var articles = this.where({ 'categoryEnglish': category });
    console.log('articles', articles);

    var from;
    // Work out the from time by getting the last article
    if(articles.length < 1){
      from = new Date().getTime() + 1;
    }else{
      from = _.last(articles).get('updatedTime') + 1;
    }

    console.log('from', from);
    console.log('category', category);

    // Load more articles if there is less than should be displayed on a page
    if(articles.length < App.perPage){
      console.log('fetching articles...');
      self.loading = true;
      this.fetch({
        add: true,
        limit: App.perPage,
        conditions: {
          'categoryEnglish': category,
          'updatedTime': [from, 0]
        },
        success: function(){
          console.log('done, articles returned:', arguments);
          self.loading = false;
          self.trigger('articlesAdded');
        }
      });
    }
  },

  // ### load
  // Load articles form indexedDb, articles will be loaded with a limit the same as the
  // number set in App.perPage to support pagination.
  load: function(){

    // Check if there are articles to load, or if articles are already being loaded
    if((this.length < App.articles.length && !this.loading) || this.length === 0){
      var from, to;
      var self = this;

      // Set loading to be true so we don't load twice at the same time
      this.loading = true;

      // Set the to time to 0 so we can load articles up to the begining of time
      to = 0;

      if(this.length > 0){

        // Set the from time the date of the last article we have and minus 1 off the value
        // as ranges in indexedDb load results between, but not including, the range limits
        from = this.last().get('updatedTime') + 1;
      }else{

        // If there are no articles in this collection set the time limit to the current time
        from = new Date().getTime() + 1;
      }

      // Fetch the articles, we pass add: true so that the articles are added to the current
      // collection and do not replacing  it. The success callback sets the loading variable
      // to false so load() can be called again and also triggers the articlesAdded event so
      // views know all the articles have been loaded.
      this.fetch({
        add: true,
        limit: App.perPage,
        conditions: { 'updatedTime': [from, to] },
        success: function(){
          self.loading = false;
          self.trigger('articlesAdded');
        }
      });
    }
  }

});
