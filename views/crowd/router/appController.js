var app = app || {};
app.types = app.types || {};

app.types.AppController = Backbone.Marionette.Object.extend({
    showMain: function(){
        app.mainApplication.showRoot();
    }
})

app.appController = new app.types.AppController();