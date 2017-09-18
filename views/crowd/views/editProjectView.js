var app = app || {};
app.types = app.types || {};

app.types.EditProjectView = Marionette.View.extend({
    template: '#edit-project-template',
    events: {
        'click #save-creation': 'saveCreation',
        'click #save-stages' : 'saveStages',
        'click #deploy': 'deploy'
    },
    saveCreation: function(){
        var locality = {
            name: this.$('#locality-input').val(),
            region: {
                country: {
                    name: 'Россия',
                    ISOAlpha2: 'RU',
                    ISOAlpha3: 'RUS'
                },
                name: this.$('#region-input').val()
            }
        }
        this.model.save({
            name: this.$('#name-input').val(),
            description: this.$('#description-input').val(),
            locality: locality,
            website: this.$('#website-input').val()
        },{patch: true}).done(function(){
            alert('Сохранено');
        })
    },
    saveStages: function(){
        $.ajax({
            url: '/projects/project/' + this.model.get('id') + '/row',
            data: {
                lotCount: this.$('#lotCount-input').val(),
                lotNotional: this.$('#lotNotional-input').val(),
                symbol: this.$('#symbol-input').val(),
                tokenName: this.$('#tokenName-input').val(),
                decimals: this.$('#decimals-input').val()
            },
            method: 'POST'
        }).done(function(data){
            console.log(data);
        }).fail(function(err){
            console.log(err);
        })
    },
    deploy: function(){
        $.ajax({
            url: '/projects/project/' + this.model.get('id') + '/deploy',
            method: 'POST'
        }).done(function(data){
            console.log(data);
        }).fail(function(err){
            console.log(err);
        })
    }
})