import React from 'react';

export const RequestUpdateWidget = ({ docTitle }) => (
	<div class="update-request">
		<a href={`https://github.com/prysmaticlabs/documentation/issues/new?title=Docs update request: ${docTitle}`}>🐼 Request an update</a>
	</div>
); 654