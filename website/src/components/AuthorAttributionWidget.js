import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const AuthorAttributionWidget = ((author) => {
	let convertNameToGithubHandle = function (name) {
		return "symbolpunk";
	}

	return (<a class="author-attribution" href={`https://github.com/${(convertNameToGithubHandle)}`}>{author}</a>)
});

