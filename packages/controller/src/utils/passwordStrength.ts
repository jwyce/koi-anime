export const passwordStrength = (password: string) => {
	let strength = 20;
	let color = 'red.500';

	if (/[A-Z]/.test(password)) {
		strength += 20;
	}
	if (/[0-9]/.test(password)) {
		strength += 20;
	}
	if (/[!@#\$%\^&\*]/.test(password)) {
		strength += 20;
	}
	if (password.length >= 8) {
		strength += 20;
	}

	if (strength <= 40) {
		color = 'red';
	} else if (strength <= 80) {
		color = 'yellow';
	} else {
		color = 'green';
	}

	return { strength, color };
};
