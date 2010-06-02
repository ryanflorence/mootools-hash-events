var HashEvents = new Class({
	
	Implements: [Options, Events],
	
		options: {
			delimiter: '&'
		},

	initialize: function(options){
		this.setOptions(options);
		this.lastHash = '';
		this.lastEvents = [];
		this.bound = this.check.bind(this);
		this.attach();
	},
	
	attach: function(){
		window.addEvent('hashchange', this.bound);
		return this;
	},
	
	detach: function(){
		window.removeEvent('hashchange', this.bound);
		return this;
	},
	
	check: function(){
		var hash = window.location.hash;
		this.fireEvent('change');
		
		var hashEvents = hash.substr(1).split(this.options.delimiter).map(function(hashEvent){
			return this.splitPair(hashEvent);
		}.bind(this));
		
		// check last hash pairs and fire remove events
		console.group('Last Pairs');
		this.lastEvents.each(function(pair){
			console.log(pair);
			//if (!eventPairs.contains(pair)) this.fireEvent(this.splitPair(pair)[0] + ':remove');
		}, this);
		console.groupEnd('Last Pairs');
		
		// add new pairs and fire events
		hashEvents.each(function(hashEvent, index, array){
			var args = this.splitArgs(hashEvent[1]);
			this.fireEvent(hashEvent[0], args);
		}.bind(this));
		
		this.lastEvents = hashEvents;

		return this;
	},

	
	splitPair: function(hashKeyValue){
		return hashKeyValue.split('=');
	},
	
	splitArgs: function(args){
		return (args) ? args.split(',') : false;
	}

});