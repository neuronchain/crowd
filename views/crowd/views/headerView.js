var app = app || {};
app.types = app.types || {};

app.types.HeaderView = Backbone.Marionette.View.extend({
    template: '#header-template',
    tagName: 'nav',
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
    regions: {
        rightForm: {
            el: '#right-form',
            replaceElement: true
        }
    },
    events: {
        'click #create-project': 'createProject',
        'click #my-projects': 'myProjects'
    },
    childViewEvents: {
        'auth:event': 'onChildAuthEvent'
    },
    onRender: function(){
        if (!app.user) this.showChildView('rightForm', new app.types.LoginView());
        else this.showChildView('rightForm', new app.types.UserView({model : app.user}));
    },
    onChildAuthEvent: function(){
        this.render();
    },
    createProject: function(e){
        e.preventDefault();
        var project = new app.types.Project();
        var self = this;
        project.save().done(function(model){
            self.trigger('project:create', model);
        }).fail(function(err){
            console.log(err);
        })
    },
    myProjects: function(){
        if (!app.user) {
            alert('Not authorized');
        } else {
            var self = this;
            app.myProjecs || (app.myProjects = new app.types.ProjectList());
            app.myProjects.fetch({me: true}).done(function(){
                self.trigger('my:projects');
            })
        }
    }
})