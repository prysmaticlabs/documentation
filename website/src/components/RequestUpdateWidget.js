import React from 'react';

export const RequestUpdateWidget = ({ docTitleToUse }) => (
	<div class="update-request">
		<a href={`https://github.com/prysmaticlabs/documentation/issues/new?title=${docTitleToUse}`}>🐼 Request an update</a>
	</div>
); 654