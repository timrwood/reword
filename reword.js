(function(){
	// using bookmarklett twice should not cause the data to download twice
	if (window.reword) {
		window.reword();
		return;
	}

	function walk(node, cb)  {
		var child, next;

		switch ( node.nodeType ) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				walk(child, cb);
				child = next;
			}
			break;
		case 3: // Text node
			cb(node);
			break;
		}
	}

	var onLoad = function (){},
		didLoad = false,
		data = null;

	function loadData (cb) {
		onLoad = cb;
		if (didLoad) {
			return;
		}
		var g = document.createElement('script'),
			s = document.scripts[0];
		g.src = 'http://rawgithub.com/timrwood/reword/master/data.js';
		s.parentNode.insertBefore(g, s);
		didLoad = true;
	}

	function reword () {
		if (!data) {
			return;
		}

		walk(document.body, function (node) {
			var text = node.nodeValue;
			console.log(text);
		});
	}

	reword.load = function (d) {
		data = d;
		onLoad();
	};

	window.reword = reword;

	loadData(reword);
})();
