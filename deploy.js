const path = require('path');
const ghpages = require('gh-pages');

ghpages.publish('dist', {
	push: true
}, (err) => {
	console.error(err);
});