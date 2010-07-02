var HashEvents = new Class({
	
	Implements: [Options, Events],
	
	initialize: function(options){
		this.setOptions(options);
		this.pairs = {};
		this.lastPairs = {};
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
		this.fireEvent('change');
		this.pairs = window.location.hash.substr(1).parseHashEvents();
		
		for (key in this.pairs){
				// changed
			if (this.lastPairs[key] && this.lastPairs[key] != this.pairs[key]) 
				this.fireEvent(key + ':change', this.pairs[key]);
			// added
			else if (!this.lastPairs[key])
				this.fireEvent(key, this.pairs[key])
		}
		
		for (key in this.lastPairs){
			// removed
			!this.pairs[key] && this.fireEvent(key + ':remove', this.lastPairs[key]);
		}

		this.lastPairs = this.pairs;
		return this;
	},
	
	handleBlankKeys: function(val){
		if ($type(val) == 'array'){
			val.each(function(key){
				console.log(key + ' added!');
			}, this);
		} else {
			console.log(val + ' added!')
		}
	}

});


String.implement({

	parseHashEvents: function(){
		var vars = this.split(/[&;]/), res = {};
		if (vars.length) vars.each(function(val){
			var split = val.split('=');
			var key = split[0],
				value = split[1] || true;
			var args = ($type(value) == 'string') ? value.split(',') : false;
			if (args && args.length > 1)
				res[key] = args;
			else
				res[key] = value;
		});
		return res;
	}
	
});