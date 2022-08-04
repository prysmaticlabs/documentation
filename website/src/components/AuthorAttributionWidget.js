import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const AuthorAttributionWidget = ({ author }) => (() =>
	<a class="author-attribution" href={`https://github.com/${(convertNameToGithubHandle)}`}>{author}</a>
);

convertNameToGithubHandle = function (name) {
	return "symbolpunk";
}