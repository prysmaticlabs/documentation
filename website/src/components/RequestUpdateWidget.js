import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const RequestUpdateWidget = ({ docTitle }) => (
	<BrowserOnly>
		{() =>
			<div class="update-request">
				<a href={`https://github.com/prysmaticlabs/documentation/issues/new?title=Docs update request&body=Source:${window.location.href}%0A%0ARequest: (how can we help?)`}>🐼 Request an update</a>
			</div>
		}
	</BrowserOnly>
); 654