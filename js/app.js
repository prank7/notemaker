var App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('notes',  function(){
 	 this.resource('note',{ path: '/:note_id'});
 	 this.route('today')
 	});
});

App.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('note');
  }
});

App.NoteRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('note', params.note_id);
	}
});

App.NotesTodayRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('notes').filterBy("alert", "today");
  }
});

App.IndexRoute = Ember.Route.extend({
	model: function(){
		return this.store.findAll('note')
	}
});


//Controllers for templates
App.IndexController = Ember.ArrayController.extend({
	notesCount: Ember.computed.alias('length')
});

App.NotesController = Ember.ArrayController.extend({
	sortProperties: ['title'],
  sortAscending: true
});


//Fixtures
App.ApplicationAdapter = DS.FixtureAdapter.extend({});

App.Note = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	alert: DS.attr('string'),
	tags: DS.hasMany('tag', {async: true})
});

App.Tag = DS.Model.extend({
	name: DS.attr('string'),
	note: DS.belongsTo('note')
}); 


App.Note.FIXTURES = [
{
	id: 1,
	title: 'DailyNotes',
	description:'I take daily Notes here',
	alert: 'tommorrow',
	tags: [100,101]
},
{
	id: 2,
	title:'MonthlyNotes',
	description: 'Take monthly notes here',
	alert: 'today'
},
{
	id: 3,
	title:'AnnualNotes',
	description: 'Take AnnualNotes notes here',
	alert: 'today'
}
];


App.Tag.FIXTURES = [
{
	id: 100,
	note: 1,
	name: "Daily"
},
{
	id: 101,
	note: 1,
	name: "Cool"
}];

