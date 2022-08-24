import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {
	return (
		<BrowserOnly>
			{() =>
				<script >
					document.getElementsByClassName('tabs__item').onclick = function () {alert('heyo')};
				</script>
			}
		</BrowserOnly>
	);
};