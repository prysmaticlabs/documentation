import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const GenerateTroubleshootingReportWidget = () => {

	let generateConfigDetails = function () {
		var foo = `config`;
		return foo;
	}

	let generateChecklistDetails = function () {
		var foo = `checklist`;
		return foo;
	}

	let generateReport = function () {
		var output = 'Troubleshooting report';
		output = appendLineToOutput(output, '---------');

		var configDetails = generateConfigDetails();
		output = appendLineToOutput(output, configDetails);

		var checklistDetails = generateChecklistDetails();
		output = appendLineToOutput(output, checklistDetails);

		var reportDiv = document.querySelector('#generated-report');
		reportDiv.innerHTML = output;
	}

	let appendLineToOutput = function (output, newLine) {
		output = output + `\n\r` + newLine;
		return output;
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