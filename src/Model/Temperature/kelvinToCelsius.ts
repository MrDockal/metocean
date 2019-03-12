const ABS_ZERO = -273.15;

export const kelvinToCelsius = (kelvin: number) => {
	if (kelvin < 0) {
		throw new Error('Invalid kelvin value');
	} else {
		return kelvin + ABS_ZERO;
	}
}
