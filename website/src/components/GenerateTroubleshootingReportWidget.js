import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const GenerateTroubleshootingReportWidget = () => {

	let getButton = function () {
		var button = document.querySelector('#generate-report');
		return button;
	}

	let bindButton = function () {
		setTimeout(function () {
			var button = getButton();
			button.addEventListener("click", function (event) {
				var targetElement = event.target;
				console.log(targetElement.innerHTML);
			});
		}, 100)
	}

	return (
		<BrowserOnly>
			{() => { bindButton() }}
		</BrowserOnly>
	);
};