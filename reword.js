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
		g.src = '//rawgithub.com/timrwood/reword/master/data.js';
		s.parentNode.insertBefore(g, s);
		didLoad = true;
	}

	function matchCapitol (a, b) {
		var i,
			str = b.split('');
		for (i = 0; i < a.length; i++) {
			if (a[i].toUpperCase() === a[i]) {
				str[i] = str[i].toUpperCase();
			}
		}
		return str.join('');
	}

	function replace (word) {
		var first = word[0].toLowerCase(),
			last = word[word.length - 1].toLowerCase(),
			key = first + last,
			len = word.length - 2,
			words, index, newWord;

		if (!data[key] || !data[key][len - 1] || Math.random() < 0.25) {
			return word;
		}

		words = data[key][len - 1];
		index = Math.floor(Math.random() * (words.length / len)) * len;
		newWord = first + words.substr(index, len) + last;

		return matchCapitol(word, newWord);
	}

	function reword () {
		if (!data) {
			return;
		}

		walk(document.body, function (node) {
			node.nodeValue = node.nodeValue.replace(/[a-z]{3,100}/gi, replace);
		});
	}

	reword.load = function (d) {
		data = d;
		onLoad();
	};

	window.reword = reword;

	loadData(reword);
})();
