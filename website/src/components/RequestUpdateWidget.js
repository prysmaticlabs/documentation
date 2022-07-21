import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const RequestUpdateWidget = ({ docTitle }) => (
	<BrowserOnly>
		{() =>
			<div class="update-request">
				<a href={`https://github.com/prysmaticlabs/documentation/issues/new?title=Docs update request: ${docTitle}&body=Source:${window.location.href}`}>🐼 Request an update</a>
			</div>
		}
	</BrowserOnly>
); 654