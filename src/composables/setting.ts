import { type BookingSlot, type DropdownItem } from '@/type';
import { minutesToMiliseconds, generateTimeOptions, generateWeekDaysFromDate } from '@/utils';

const selectedDate = new Date(); // selected date of the week to create booking slot
const visitDurationOptions: DropdownItem[] = [
	{
		title: '15 min',
		value: minutesToMiliseconds(15),
	},
	{
		title: '30 min',
		value: minutesToMiliseconds(30),
	},
	{
		title: '45 min',
		value: minutesToMiliseconds(45),
	},
	{
		title: '60 min',
		value: minutesToMiliseconds(60),
	},
	{
		title: '90 min',
		value: minutesToMiliseconds(90),
	},
];

const timeOptions = computed(() => generateTimeOptions(selectedDate));

const visitDuration = useStorage<DropdownItem>('visitDuration', visitDurationOptions[3]);
const maxSessions = useStorage<number>('maxSessions', 2);
const allowVideoCall = useStorage<boolean>('allowVideoCall', false);

const bookSlots = useStorage<BookingSlot[]>('savedBookingSlots', []);

export const useSettings = () => {
	generateWeekDaysFromDate(selectedDate);
	const initializeBookSlots = () => {};
	if (!bookSlots.value.length)
		return {
			selectedDate,
			visitDuration,
			maxSessions,
			allowVideoCall,
			bookSlots,
			visitDurationOptions,
			timeOptions,
		};
};
