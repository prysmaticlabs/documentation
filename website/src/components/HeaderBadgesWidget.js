import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const HeaderBadgesWidget = ({ authors }) => {
	let githubUsernames = {
		Mick: "symbolpunk",
		Raul: "rauljordan",
		Terence: "terencechain"
	}

	let buildAuthorBadge = function (author) {
		return (
			<a class="header-badge" href={`https://github.com/${githubUsernames[author]}`}>
				<span class="author-avatar" style={{ backgroundImage: "url('https://avatars.githubusercontent.com/" + githubUsernames[author] + "')" }}></span>
				<span class="author-name">{author}</span>
			</a>
		)
	}

	return (
		<BrowserOnly>
			{() =>
				<div>
					<div class="header-badges">{authors.split(',').map(buildAuthorBadge)}</div>
					<a href={`https://github.com/prysmaticlabs/documentation/issues/new?title=Docs update request: ${new URL(window.location.href).pathname}&body=Source: ${window.location.href}%0A%0ARequest: (how can we help?)`}>🐼 Request an update</a>

				</div>
			}
		</BrowserOnly>
	);
};

