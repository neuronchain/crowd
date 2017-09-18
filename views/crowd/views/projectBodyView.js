var app = app || {};
app.types = app.types || {};

app.types.ProjectBodyView = Marionette.View.extend({
    template: '#project-body-template',
    regions: {
        body: {
            el: 'tbody',
            replaceElement: true
        }
    },
    onRender: function(){
        this.showChildView('body', new app.types.ProjectListView({collection : this.collection}));
    },
    childViewEvents: {
        'edit:project': 'onChildEditProject'
    },
    onChildEditProject: function(model){
        this.trigger('edit:project', model);
    }
})

app.types.ProjectEmptyListView = Marionette.View.extend({
    template: _.template('Нет проектов')
})

app.types.ProjectListView = Marionette.CollectionView.extend({
    tagName: 'tbody',
    childView: app.types.ProjectView,
    emptyView: app.types.ProjectEmptyListView,
    childViewEvents: {
        'edit:project': 'onChildEditProject'
    },
    onChildEditProject: function(view){
        this.trigger('edit:project', view.model);
    }
})