module("jqpboilerplate");

test("Constructor", function() {
	var v1 = $(document).defaultPluginName();
	ok( v1.jquery, "Calling plugin constructor returns jquery instance.");
	var v2 = $(document).defaultPluginName();
	notStrictEqual(v1, v2, 'Constructor run 2x returns the same thing.');

	var v1 = $('.error').defaultPluginName({'config':'value'});
	ok( v1.jquery, "Calling plugin constructor with config works.");
	
	var elems = v1.get();
	var obj = $.data(elems[0], 'plugin_defaultPluginName');		
	ok( (obj.options.key && obj.options.config), "Calling plugin constructor with config sets expected options.");
});

test("Calling public methods", function() {
	var v1 = $('div').defaultPluginName('example', 'arg1', 'arg2', 'arg3');
	ok( v1, "Calling plugin example method works.");
	ok( (v1.hasClass('arg1') && v1.hasClass('arg2') && v1.hasClass('arg3')), "Methods are passed parameters.");
	ok( v1.jquery, "Method automatically returns jquery instance");
});

test("Calling a private method", function() {
	expect(1);
	try{
		$('div').defaultPluginName('exampleToAlias');
		ok( false, "Calling a method that isn't in the publicMethods object by it's key throws an exception.");
	}catch(e){
		ok( e, "Calling a method that isn't in the publicMethods object by it's key throws an exception.");	
	}
});

test("Modifying global defaults, and regular options", function() {	
		$.fn.defaultPluginName.options.key = 'fruit';
		$(window).defaultPluginName({'config' : 'superhero'});
		var obj = $.data(window, 'plugin_defaultPluginName');
		ok( ( obj.options.key == 'fruit' && obj.options.config == 'superhero' ), "Global defaults modified, options changed");		

		$.fn.defaultPluginName.options.music = 'pop';
		$(window).defaultPluginName({'config' : 'jibjab'});
		var obj = $.data(window, 'plugin_defaultPluginName');
		ok( ( obj.options.music == 'pop' && obj.options.config == 'jibjab' ), "Calling init with new options, and new global defaults changes options correctly.");		
});