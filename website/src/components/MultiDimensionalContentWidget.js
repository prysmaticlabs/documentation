import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {
	document.getElementsByClassName('tabs__item').onclick = function () { alert('heyo') };
};