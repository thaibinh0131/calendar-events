import type { DropdownItem } from './type';
import { minimumTime, maximumTime } from './constants';

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

export const getStartOfWeek = (date: Date) => {
	const newDate = new Date(date);
	const day = newDate.getDay();
	const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
	const startOfWeek = new Date(newDate.setDate(diff));
	return startOfWeek;
};

export const generateWeekDaysFromDate = (date: Date) => {
	const startOfWeek = getStartOfWeek(date);
	const days: number[] = [];
	for (let i = 0; i < 7; i++) {
		const d = new Date(startOfWeek);
		d.setDate(d.getDate() + i);
		days.push(d.getTime());
	}
	return days;
};

export const getISOWeekDayString = (miliseconds: number) => {
	return daysOfWeekMap.get(new Date(miliseconds).getDay());
};

export const generateTimeLabel = (miliseconds: number) => {
	return new Date(miliseconds).toLocaleString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
};

export const getStartOfDate = (date: Date) => {
	const newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);
	return newDate;
};

export const generateTimeOptions = (date: Date, duration: number) => {
	const newDate = getStartOfDate(date);
	const hours: number[] = [minimumTime];
	let k = minimumTime;
	while (hoursToMiliseconds(k) + duration < hoursToMiliseconds(maximumTime)) {
		k += 0.25;
		hours.push(k);
	}

	return hours.map((el) => {
		const time = newDate.getTime() + hoursToMiliseconds(el);
		return {
			title: generateTimeLabel(time),
			value: time,
		} as DropdownItem;
	});
};
