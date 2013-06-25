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

walk(document.body, function (node) {
	var text = node.nodeValue;
	console.log(text);
});
