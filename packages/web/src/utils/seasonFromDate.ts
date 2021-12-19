import dayjs from 'dayjs';

export const seasonFromDate = (date: Date) => {
	const d = dayjs(date).hour(5);
	console.log(d);
	console.log(d.isAfter(dayjs(new Date(d.year() - 1, 11, 1))));
	console.log(d.isBefore(dayjs(new Date(d.year(), 2, 1))));

	if (
		d.isAfter(dayjs(new Date(d.year() - 1, 11, 1))) &&
		d.isBefore(dayjs(new Date(d.year(), 2, 1)))
	) {
		return 'Winter';
	} else if (
		d.isAfter(dayjs(new Date(d.year(), 2, 1))) &&
		d.isBefore(dayjs(new Date(d.year(), 5, 1)))
	) {
		return 'Spring';
	} else if (
		d.isAfter(dayjs(new Date(d.year(), 5, 1))) &&
		d.isBefore(dayjs(new Date(d.year(), 8, 1)))
	) {
		return 'Summer';
	} else if (
		d.isAfter(dayjs(new Date(d.year(), 8, 1))) &&
		d.isBefore(dayjs(new Date(d.year(), 11, 1)))
	) {
		return 'Fall';
	} else if (
		d.isAfter(dayjs(new Date(d.year(), 11, 1))) &&
		d.isBefore(dayjs(new Date(d.year() + 1, 2, 1)))
	) {
		return 'Winter';
	}

	return '';
};
