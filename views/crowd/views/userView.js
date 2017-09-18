var app = app || {};
app.types = app.types || {};

app.types.UserView = Backbone.Marionette.View.extend({
    template: '#user-template',
    events: {
        'click #logout-button': 'logout'
    },
    logout: function(){
        var self = this;
        $.ajax({
            url: '/logout',
            method: 'POST'
        }).done(function(){
            delete app.user;
            self.triggerMethod('auth:event');
        }).fail(function(err){
            console.log(err);
        })
    }
})