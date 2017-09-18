var app = app || {};
app.types = app.types || {};

app.types.LoginView = Backbone.Marionette.View.extend({
    template: '#login-template',
    tagName: 'form',
    className: 'form-inline my-2 my-lg-0',
    events: {
        'click #login-button' : 'login'
    },
    login: function(){
        var email = this.$('#input-email').val();
        var password = this.$('#input-password').val();
        var self = this;
        if (email && password) {
            $.ajax({
                url: '/login',
                method: 'POST',
                data: {
                    email: email,
                    password: password
                }
            }).done(function(data){
                app.user = new Backbone.Model(data);
                self.triggerMethod('auth:event');
            }).fail(function(err){
                console.log(err);
            })
        }
    }
})