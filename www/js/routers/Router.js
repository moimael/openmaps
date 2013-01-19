var AppRouter = Backbone.Router.extend({
 
    routes:{
        "":"list",
        "wines/:id":"wineDetails"
    },
 
    initialize:function () {
        $('#header').html(new HeaderView().render().el);
    },
 
    list:function () {
        this.wineList = new WineCollection();
        this.wineListView = new WineListView({model:this.wineList});
        this.wineList.fetch();
        $('#sidebar').html(this.wineListView.render().el);
    },
 
    wineDetails:function (id) {
        this.wine = this.wineList.get(id);
        if (app.wineView) app.wineView.close();
        this.wineView = new WineView({model:this.wine});
        $('#content').html(this.wineView.render().el);
    }
 
});
  AppRouter = new AppRouter();
  Backbone.history.start();
