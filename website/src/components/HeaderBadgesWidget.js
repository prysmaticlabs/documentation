import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const HeaderBadgesWidget = ({ commaDelimitedContributors, lastVerifiedDateString, lastVerifiedVersionString }) => {
	let githubUsernames = {
		Mick: "symbolpunk",
		Raul: "rauljordan",
		Terence: "terencechain",
		James: "james-prysm",
		Kasey: "kasey"
	}

	let buildAuthorBadge = function (authorNickname) {
		return (
			<a class="header-badge" href={`https://github.com/${githubUsernames[authorNickname]}`}>
				<span class="badge-avatar" style={{ backgroundImage: "url('https://avatars.githubusercontent.com/" + githubUsernames[authorNickname] + "')" }}></span>
				<span class="badge-label">{authorNickname}</span>
			</a>
		)
	}

	let buildLastVerifiedBadge = function (dateString, versionString) {
		if (dateString != null && versionString != null) {
			return (
				<a class="header-badge">
					<span class="badge-avatar emoji-avatar">✔️</span>
					<span class="badge-label">Last verified on <strong>{dateString}</strong> using Prysm {versionString}</span>
				</a>
			)
		}
	}

	return (
		<BrowserOnly>
			{() =>
				<div class="header-badges">
					{(commaDelimitedContributors != null ? commaDelimitedContributors.split(',').map(buildAuthorBadge) : null)}
					{buildLastVerifiedBadge(lastVerifiedDateString, lastVerifiedVersionString)}
					<a class="header-badge" href={`https://github.com/prysmaticlabs/documentation/issues/new?title=Docs update request: ${new URL(window.location.href).pathname}&body=Source: ${window.location.href}%0A%0ARequest: (how can we help?)`}>
						<span class="badge-avatar emoji-avatar">✏️</span>
						<span class="badge-label">Request an update</span>
					</a>
				</div>
			}
		</BrowserOnly>
	);
};