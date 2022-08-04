import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const AuthorAttributionWidget = ({ authors }) => {
	let convertNameToGithubHandle = function (author) {
		return "symbolpunk";
	}

	let buildAuthorBadge = function (author) {
		return (<a class="author-attribution" href={`https://github.com/${(convertNameToGithubHandle(author))}`}><span>{author}</span></a>)
	}

	return <div>{authors.split(',').map(buildAuthorBadge)}</div>;
};

