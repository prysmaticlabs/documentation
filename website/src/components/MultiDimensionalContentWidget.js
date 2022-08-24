import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {

	let bindTabs = function () {
		console.log("heyo...");
		var tabElements = document.querySelectorAll('.tabs__item');
		console.log("tabs: " + tabElements.length);
		tabElements.forEach(element => element.addEventListener("click", function () { alert('heyo'); }));
		console.log("bound");
	}

	return (
		<BrowserOnly>
			{() => { bindTabs() }}
		</BrowserOnly>
	);
};