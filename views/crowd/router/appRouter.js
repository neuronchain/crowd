var app = app || {};
app.types = app.types || {};

app.types.AppRouter = Backbone.Marionette.AppRouter.extend({
    controller: app.appController,
    appRoutes: {
        '(/)': 'showMain'
    }
});

app.appRouter = new app.types.AppRouter();