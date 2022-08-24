import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalQuickstartWidget = () => {

	let getAllTabElements = function () {
		var tabElements = document.querySelectorAll('.quickstart-tabs .tabs__item');
		return tabElements;
	}

	let getByText = function (text) {
		var allElements = getAllTabElements();
		var selectedElement;
		// docusaurus seems to be stripping away some array extensions like find()...
		allElements.forEach(el => {
			if (el.innerHTML == text) {
				selectedElement = el;
			}
		})
		return selectedElement;
	}

	let disableByText = function (text) {
		var targetElement = getByText(text);
		targetElement.classList.add('disabled-tab');
	}

	let enableByText = function (text) {
		var targetElement = getByText(text);
		targetElement.classList.remove('disabled-tab');
	}

	let selectByText = function (text) {
		var targetElement = getByText(text);
		targetElement.click();
	}

	let isSelectedByText = function (text) {
		var targetElement = getByText(text);
		var isSelected = targetElement.classList.contains('tabs__item--active');
		return isSelected;
	}

	let isOnAuthPage = function () {
		var isOnAuthPage = window.location.href.indexOf('/authentication') > -1;
		return isOnAuthPage;
	}

	let bindTabs = function () {
		setTimeout(function () {
			var tabElements = getAllTabElements();
			if (isSelectedByText('Besu') || isSelectedByText('Nethermind')) {
				selectByText('HTTP-JWT');
				disableByText('IPC');
			}
			if (isSelectedByText('IPC')) {
				if (isSelectedByText('Besu') || isSelectedByText('Nethermind')) {
					selectByText('Geth');
				}
				disableByText('Besu');
				disableByText('Nethermind');
			}
			if (isOnAuthPage()) {
				selectByText('HTTP-JWT');
				disableByText('IPC');
			}

			tabElements.forEach(element => {
				var isLabel = element.textContent.indexOf(":") > -1;


				if (isLabel) {
					console.log('is label... unbinding')
					// unbind so tab can't be selected
					element.outerHTML = element.outerHTML;
				} else {
					element.addEventListener("click", function (event) {
						var targetElement = event.target;
						var textContent = targetElement.textContent;

						if (textContent == 'Besu' || textContent == 'Nethermind') {
							selectByText('HTTP-JWT');
							disableByText('IPC');
						} else if (textContent == 'Geth') {
							enableByText('IPC');
						} else if (textContent == 'IPC') {
							if (isOnAuthPage()) {
								selectByText('HTTP-JWT');
								disableByText('IPC');
								return;
							} else {
								if (isSelectedByText('Besu') || isSelectedByText('Nethermind')) {
									selectByText('Geth');
								}
								disableByText('Besu');
								disableByText('Nethermind');
							}
						} else if (textContent == 'HTTP-JWT') {
							enableByText('Besu');
							enableByText('Nethermind');
						}
					}, false)
				}
			});
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