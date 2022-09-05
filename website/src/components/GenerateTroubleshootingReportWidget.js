import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const GenerateTroubleshootingReportWidget = () => {

	let appendConfigDetailsToOutput = function (output) {
		var tabWidget = document.querySelector('.quickstart-tabs');
		var currentConfig = tabWidget.dataset.configObject;
		appendLineToText(output, 'Operating system: ' + currentConfig.selectedOS);
		appendLineToText(output, 'Network: ' + currentConfig.selectedNetwork);
		appendLineToText(output, 'Execution client: ' + currentConfig.selectedEL);
		appendLineToText(output, 'EN-BN connection: ' + currentConfig.selectedENBN);
	}

	let generateChecklistDetails = function () {
		var foo = `checklist`;
		return foo;
	}

	let generateReport = function () {
		var output = 'Troubleshooting report';
		appendLineToText(output, '---------');

		appendConfigDetailsToOutput(output);

		var checklistDetails = generateChecklistDetails();
		appendLineToText(output, checklistDetails);

		var reportDiv = document.querySelector('#generated-report');
		reportDiv.innerHTML = output;
	}

	let appendLineToText = function (existingText, newLine) {
		existingText = existingText + `\n` + newLine;
	}

	let getButton = function () {
		var button = document.querySelector('#generate-report');
		return button;
	}

	let bindButton = function () {
		setTimeout(function () {
			var button = getButton();
			if (button && !button.classList.contains('bound')) {
				button.addEventListener("click", function (event) {
					generateReport();
				});
				button.classList.add('bound');
			}
		}, 100)
	}

	return (
		<BrowserOnly>
			{() => { bindButton() }}
		</BrowserOnly>
	);
};