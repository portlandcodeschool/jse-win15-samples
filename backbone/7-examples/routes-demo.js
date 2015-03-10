_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var template = _.template(
  " Click <a href='#{{route}}'>here</a> for the {{route}} view."
);

var MainView = Backbone.View.extend({
  el:'#myApp',
  render: function() {
    this.$el.html("I'm the main view!" + template({route:'alternative'}));
  }
});

var OtherView = Backbone.View.extend({
  el:'#myApp',
  render: function() {
    this.$el.html("I'm the alternative view!" + template({route:'default'}));
  }
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'showMainView',
    'default': 'showMainView',
    'alternative': 'showOtherView'
  },
  showMainView: function() {
    this.view = new MainView();
    this.view.render();
  },
  showOtherView: function() {
    this.view = new OtherView();
    this.view.render();
  }
});

function go() {
  window.app = new Router();
  Backbone.history.start();
}

$(go);
