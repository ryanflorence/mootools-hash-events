HashEvents
==========

How to use
----------

HashEvents picks up on changes to the url, whether the user manually types them in or you have internal links.  It follows the standard url query string pattern of key=value&otherkey=other,value.

### HTML

Set up some links that change the hash.

    <ul>
      <li><a id="here" href="#here">Here</a></li>
      <li><a href="#here=46&amp;there=1,2,3">Here = 46 AND there = 1,2,3</a></li>
      <li><a id="there" href="#there=cat,dog,sheep">There</a></li>
      <li><a id="every" href="#every">Every</a></li>
      <li><a id="where" href="#where">Where</a></li>
      <li><a id="some_path" href="#/some/path">/some/path</a></li>
    </ul>
    <div id="log"></div>


    var manager;

    window.addEvent('domready',function(){
		
    	var log = $('log');
    	var puts = function(message, className){
    		className = className || 'added';
    		log.adopt(new Element('p', { 'class': className, html: '[' + new Date().getTime() + '] - ' + message }));
    	};
	
	
    	manager = new HashEvents();
	
    	manager.addEvents({
		
    		here: function(arg){
    			$('here').highlight();
    			puts('added <b>here</b>');
    		},
    		'here:remove': function(){
    			puts('removed <b>here</b>', 'removed');
    		},
    		'here:change': function(){
    			puts('changed <b>here</b>');
    		},
		
    		there: function(one, two, three){
    			$('there').highlight();
    			puts('added <b>there</b> with args: ' + one + ', ' + two + ', ' + three);
    		},
    		'there:remove': function(){
    			puts('removed <b>there</b>', 'removed');
    		},
    		'there:change': function(one, two, three){
    			puts('changed <b>there</b> with args: ' + one + ', ' + two + ', ' + three, 'changed');
    		},
		
    		every: function(){
    			$('every').highlight();
    			puts('added <b>every</b>');
    		},
    		'every:remove': function(){
    			puts('removed <b>every</b>', 'removed');
    		},
		
    		where: function(){
    			$('where').highlight();
    			puts('added <b>where</b>');
    		},
    		'where:remove': function(){
    			puts('removed <b>where</b>', 'removed');
    		},
		
    		'/some/path': function(){
    			$('some_path').highlight();
    			puts('added <b>some/path</b>');
    		},
    		'/some/path:remove': function(){
    			puts('removed <b>some/path</b>', 'removed');
    		},
		
    		change: function(){
    			puts('----------------------------------------------------')
    			log.scrollTo.delay(100, log, [0, log.getScrollSize().y]);
    		}
		
    	}).check();
	
    });