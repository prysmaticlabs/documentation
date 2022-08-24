import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {

	let bindTabs = function () {
		setTimeout(function () {
			var tabElements = document.querySelectorAll('.quickstart-tabs .tabs__item');
			console.log("tabs: " + tabElements.length);
			tabElements.forEach(element => element.addEventListener("click", function () { alert('heyo'); }));
			console.log("start with the user, work backwards to the technology...");
			console.log("start with utopia, work backwards to the mechanism design...");
		}, 500)
	}

	return (
		<BrowserOnly>
			{() => { bindTabs() }}
		</BrowserOnly>
	);
};