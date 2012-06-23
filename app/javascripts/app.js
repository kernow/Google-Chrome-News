// ### Authors
// Jamie Dyer <http://kernowsoul.com>
// ### Last changed
// 2012-06-23

// setup the applications namespace
window.App = {

  perPage: 30,

  // pluralization help method
  pluralize: function(singular, count) {
    if (count == 1) {
      return singular;
    } else {
      return singular.pluralize();
    }
  }

};
