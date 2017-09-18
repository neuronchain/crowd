var app = app || {};
app.types = app.types || {};

app.types.ProjectView = Marionette.View.extend({
    tagName: 'tr',
    template: '#project-template',
    triggers: {
        'click .edit-project': 'edit:project'
    }
})