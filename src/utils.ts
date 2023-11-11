import type { DropdownItem } from './type';

export const minutesToMiliseconds = (minutes: number) => {
	return minutes * 60 * 1000;
};

export const hoursToMiliseconds = (hours: number) => {
	return 60 * minutesToMiliseconds(hours);
};

export const daysOfWeekMap = new Map<number, string>([
	[1, 'Mon'],
	[2, 'Tue'],
	[3, 'Wed'],
	[4, 'Thu'],
	[5, 'Fri'],
	[6, 'Sat'],
	[0, 'Sun'],
]);

export const generateWeekDaysFromDate = (date: Date) => {
	const newDate = new Date(date);
	const day = newDate.getDay();
	const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
	const startOfWeek = new Date(newDate.setDate(diff));
	console.debug('startOfWeek', startOfWeek.toISOString());
	const days: number[] = [];
	for (let i = 0; i < 7; i++) {
		const d = new Date(startOfWeek);
		d.setDate(d.getDate() + i);
		console.debug(d.getTime(), d.toISOString());
		days.push(d.getTime());
	}
};

export const getISOWeekDayString = (miliseconds: number) => {
	return daysOfWeekMap.get(new Date(miliseconds).getDay());
};

export const generateTimeLabel = (miliseconds: number) => {
	return new Date(miliseconds).toLocaleString('en-US', { hour: 'numeric', hour12: true });
};

export const generateTimeOptions = (date: Date) => {
	const minTime = 7; // Start time = 7am
	const maxTime = 19; // EndTime = 7 pm
	const times: number[] = [];
	generateWeekDaysFromDate(date);
	const newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);
	for (let i = minTime; i <= maxTime; i++) {
		console.debug('HR', hoursToMiliseconds(i));

		times.push(newDate.getTime() + hoursToMiliseconds(i));
	}

	return times.map((el) => {
		return {
			title: generateTimeLabel(el),
			value: el,
		} as DropdownItem;
	});
};
