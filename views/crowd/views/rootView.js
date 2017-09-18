var app = app || {};
app.types = app.types || {};

app.types.RootView = Backbone.Marionette.View.extend({
    template: '#root-template',
    regions: {
        header: {
            el: "#header",
            replaceElement: true
        },
        body: {
            el: "#body"
        }
    },
    childViewEvents: {
        'project:create': 'onChildProjectCreate',
        'my:projects': 'onChildMyProjects',
        'edit:project': 'onChildEditProject'
    },
    onRender: function(){
        this.showChildView('header', new app.types.HeaderView());
    },
    onChildProjectCreate: function(model){
        this.showChildView('body', new app.types.EditProjectView({model: model}));
    },
    onChildMyProjects: function(){
        this.showChildView('body', new app.types.ProjectBodyView({collection: app.myProjects}));
    },
    onChildEditProject: function(model){
        this.showChildView('body', new app.types.EditProjectView({model: model}));
    }
})