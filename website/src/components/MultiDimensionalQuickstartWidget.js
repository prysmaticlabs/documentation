import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalQuickstartWidget = () => {

	let bindTabs = function () {
		setTimeout(function () {
			var tabElements = document.querySelectorAll('.quickstart-tabs .tabs__item');
			tabElements.forEach(element => element.addEventListener("click", function (event) {
				var targetElement = event.target;
				var textContent = targetElement.textContent;
				var isLabel = textContent.indexOf(":") > -1;
				if (isLabel) {
					console.log('isLabel2')
					// unbind
					targetElement.parentElement.innerHTML = targetElement.parentElement.innerHTML;
				} else {
					if (textContent == 'Besu') {
						// disable IPC, select http
						alert(textContent);
					} else if (textContent == 'Geth' || textContent == 'Nethermind') {
						// enable IPC
					} else if (textContent == 'IPC') {
						// disable Besu
					}
				}
			}, false));
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