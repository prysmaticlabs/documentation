import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export const MultiDimensionalContentWidget = () => {
	return (
		<BrowserOnly>
			{() =>
				<script>
					{`
					alert('heyo 1');
					function(){
						alert('heyo 2');
						var tabElements = document.querySelectorAll('.tabs__item');
						foreach(var el in tabElements){
							el.addEventListener("click", function () { alert('heyo'); })
					}}();
					`}
				</script>
			}
		</BrowserOnly>
	);
};