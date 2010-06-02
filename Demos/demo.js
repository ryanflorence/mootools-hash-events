var manager;

window.addEvent('domready',function(){
		
	var log = $('log');
	var addLog = function(message, className){
		className = className || 'added or changed';
		log.adopt(new Element('p', { 'class': className, html: '[' + new Date().getTime() + '] - ' + message }));
	};
	
	
	manager = new HashEvents();
	
	manager.addEvents({
		here: function(arg){
			$('here').highlight();
			addLog('added or changed <b>here</b>');
		},
		'here:remove': function(){
			addLog('removed or changed <b>here</b>', 'removed');
		},
		there: function(one, two, three){
			$('there').highlight();
			addLog('added or changed <b>there</b> with args: ' + one + ', ' + two + ', ' + three);
		},
		'there:remove': function(){
			addLog('removed or changed <b>there</b>', 'removed');
		},
		every: function(){
			$('every').highlight();
			addLog('added or changed <b>every</b>');
		},
		where: function(){
			$('where').highlight();
			addLog('added or changed <b>where</b>');
		},
		'where:remove': function(){
			addLog('removed or changed <b>where</b>', 'removed');
		},
		'/some/path': function(){
			$('some_path').highlight();
			addLog('added <b>some/path</b>');
		},
		change: function(){
			log.scrollTo.delay(100, log, [0, log.getScrollSize().y]);
		}
	}).check();
	
});