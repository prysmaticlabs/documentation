import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {

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

	let jwtOnly = function () {
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
			if (jwtOnly()) {
				selectByText('HTTP-JWT');
				disableByText('IPC');
			}

			tabElements.forEach(element => {
				var isLabel = element.textContent.indexOf(":") > -1;

				if (isLabel) {
					// unbind so tab can't be selected
					element.outerHTML = element.outerHTML;
				} else {
					element.addEventListener("click", function (event) {
						console.log("76");
						var targetElement = event.target;
						var textContent = targetElement.textContent;

						if (textContent == 'Besu' || textContent == 'Nethermind') {
							selectByText('HTTP-JWT');
							disableByText('IPC');
						} else if (textContent == 'Geth') {
							enableByText('IPC');
						} else if (textContent == 'IPC') {
							if (jwtOnly()) {
								setTimeout(function () { selectByText('HTTP-JWT'); }, 50)
								disableByText('IPC');
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
		}, 200)
	}

	return (
		<BrowserOnly>
			{() => { bindTabs() }}
		</BrowserOnly>
	);
};