var app = app || {};
app.types = app.types || {};

app.types.MainApplication = Backbone.Marionette.Application.extend({
    region: {
        el: '#main-content',
        replaceElement: true
    },
    onStart: function(){
        Backbone.history.start({ pushState: true });
    },
    showRoot: function(){
        this.showView(new app.types.RootView());
    }
})

app.mainApplication = new app.types.MainApplication();
app.mainApplication.start();