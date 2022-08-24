import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {
	return (
		<BrowserOnly>
			{() =>
				<script >
					document.querySelectorAll('.tabs__item').forEach(function(el){el.addEventListener("click", function () { alert('heyo'); })});
				</script>
			}
		</BrowserOnly>
	);
};