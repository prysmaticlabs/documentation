import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {

	let bindTabs = function () {
		setTimeout(function () {
			console.log("heyo...");
			var tabElements = document.querySelectorAll('.quickstart-tabs .tabs__item');
			console.log("tabs: " + tabElements.length);
			tabElements.forEach(element => element.addEventListener("click", function () { alert('heyo'); }));
			console.log("bound");
		}, 500)
	}

	return (
		<BrowserOnly>
			{() => { bindTabs() }}
		</BrowserOnly>
	);
};