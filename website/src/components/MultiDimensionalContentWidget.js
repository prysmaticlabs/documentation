import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {

	let bindTabs = function () {
		alert('heyo 2');
		var tabElements = document.querySelectorAll('.tabs__item');
		tabElements.forEach(element => element.addEventListener("click", function () { alert('heyo'); }));
	}

	return (
		<BrowserOnly>
			{() => { bindTabs() }}
		</BrowserOnly>
	);
};