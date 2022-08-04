import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const AuthorAttributionWidget = ({ author }) => function () {
	<a class="author-attribution" href={`https://github.com/${(window.convertNameToGithubHandle(author))}`}>{author}</a>
};

window.convertNameToGithubHandle = function (name) {
	return "symbolpunk";
}