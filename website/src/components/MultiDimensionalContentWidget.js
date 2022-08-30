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
		console.log("selecting " + text + '...');
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

	let isViewingMergePrep = function () {
		var isOnMergePrepPage = window.location.href.indexOf('/prepare-for-merge') > -1;
		return isOnMergePrepPage;
	}

	let scrollDownASmidge = function () {
		window.scrollBy(0, 10)
	}

	let toggleUpdated = function (element) {
		var parent = element.parentElement;
		parent.classList.add('updated');
		setTimeout(function () {
			parent.classList.remove('updated');
		}, 1000)
	}

	let bindTabs = function () {
		setTimeout(function () {
			var tabElements = getAllTabElements();
			tabElements.forEach(element => {
				var isLabel = element.textContent.indexOf(":") > -1;

				if (isLabel) {
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

						toggleUpdated(targetElement);

					}, false)
				}
			});
		}, 100)
	}

	return (
		<BrowserOnly>
			{() => { bindTabs() }}
		</BrowserOnly>
	);
};