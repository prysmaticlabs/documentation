import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const AuthorAttributionWidget = ({ authors }) => {
	let githubUsernames = {
		Mick: "symbolpunk"
	}

	let githubAvatars = {
		Mick: "symbolpunk"
	}

	let buildAuthorBadge = function (author) {
		return (
			<a class="author-attribution" href={`https://github.com/${githubUsernames[author]}`}>
				<span class="author-avatar" style={{ backgroundImage: "url('https://avatars.githubusercontent.com/" + githubUsernames[author] + "')" }}></span>
				<span class="author-name">{author}</span>
			</a>
		)
	}

	return <div class="author-attributions">{authors.split(',').map(buildAuthorBadge)}</div>;
};

