const path = require('path');
const ghpages = require('gh-pages');

ghpages.publish('dist', {
	push: true,
	message: "update gh-pages"
}, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('Published.');
});