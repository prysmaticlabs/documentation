import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const RequestUpdateWidget = ({ docTitle, currentUrl }) => (
	<BrowserOnly>
		{() =>
			<div class="update-request">
				<a href={`https://github.com/prysmaticlabs/documentation/issues/new?title=Docs update request: ${docTitle}&body=Source:${currentUrl}`}>🐼 Request an update</a>
			</div>
		}
	</BrowserOnly>
); 654