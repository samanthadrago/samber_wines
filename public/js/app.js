//Model

var Wine = Backbone.Model.extend();

var WineCollection = Backbone.Collection.extend({
  model: Wine,
  url: '/wines'
});

//View

var WineListView = Backbone.View.extend({

  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.model, "reset", this.render);
  },

  // renderWines: function(wine){
  //   $(this.el).append(new WineListItemView({model: wine}).render());
  // },

  render: function(eventName) {
    // debugger;
    _.each(app.wineList.models, function(wine){
      // debugger;
      this.$el.append(new WineListItemView({model: wine}).render().html())
      // new WineListItemView({model: wine}).render()
    }, this);
    $('#sidebar').html(this.$el);
    return this;
  }

});

var WineListItemView = Backbone.View.extend({

  template: _.template($('#tpl-wine-list-item').html()),

  render: function(eventName) {
    // debugger;
    return this.$el.html(this.template(this.model.attributes).trim());
  }
});

var WineView = Backbone.View.extend({

  template: _.template($('#tpl-wine-details').html()),

  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

//Router

var AppRouter = Backbone.Router.extend({

  routes: {
    "": "list",
    "wines/:id": "wineDetails"
  },

  list: function () {
    var that = this;
    this.wineList = new WineCollection();
    this.wineListView = new WineListView({
      model: this.wineList
    });
    this.wineList.fetch().done(function(){
      that.wineListView.render()
    });
    // console.log(this.wineList)
    // $('#sidebar').html(this.wineListView.render().$el);
  },

  wineDetails: function (id) {
    this.wine = this.wineList.get(id);
    this.wineView = new wineView({
      model: this.wine
    });
    $('#content').html(this.wineView.render().$el);
  }
});

var app = new AppRouter();
Backbone.history.start();
