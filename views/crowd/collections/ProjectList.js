var app = app || {};
app.types = app.types || {};

app.types.ProjectList = Backbone.Collection.extend({
    model: app.types.Project,
    url: 'projects/project',
    fetch: function(options) {
        options || (options = {});
        if (options.me) {
            options.url = this.url + '/me'
        }
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
});