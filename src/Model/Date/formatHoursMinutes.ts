import * as dateFns from 'date-fns';

export const formatHoursMinutes = (date: Date | string | number) => {
	return dateFns.format(date, 'hA');
};
