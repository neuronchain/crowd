var app = app || {};
app.types = app.types || {};

app.types.Project = Backbone.Model.extend({
    urlRoot: '/projects/project'
})