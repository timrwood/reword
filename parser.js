var fs = require('fs');

var words = fs.readFileSync('/usr/share/dict/words', 'utf8').split('\n');

var output = {};

words.forEach(function (word) {
	if (word.length < 3) {
		return;
	}
	word = word.toLowerCase();
	var key = word[0] + word[word.length - 1],
		middle = word.substr(1, word.length - 2),
		len = middle.length - 1,
		i;
	if (!output[key]) {
		output[key] = [];
	}

	for (i = 0; i <= len; i++) {
		if (!output[key][i]) {
			output[key][i] = '';
		}
	}

	output[key][len] += middle;
});

fs.writeFileSync('data.json', JSON.stringify(output, null, 1));
