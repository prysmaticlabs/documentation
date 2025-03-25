import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const RequestUpdateWidget = ({ }) => (
	<BrowserOnly>
		{() =>
			<div className="update-request">
				<a href={`https://github.com/prysmaticlabs/documentation/issues/new?title=Docs update request: ${new URL(window.location.href).pathname}&body=Source: ${window.location.href}%0A%0ARequest: (how can we help?)`}>🐼 Request an update</a>
			</div>
		}
	</BrowserOnly>
);