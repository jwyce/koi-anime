import { useState } from 'react';

export const useToggle = (defaultValue: boolean): [boolean, () => void] => {
	const [value, setValue] = useState(defaultValue);

	function toggleValue() {
		setValue((currentValue) => !currentValue);
	}

	return [value, toggleValue];
};
