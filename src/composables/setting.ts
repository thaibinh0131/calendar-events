import type { BookingSlot, DropdownItem, CalendarDataSourceItem } from '@/type';
import {
	minutesToMiliseconds,
	getStartOfDate,
	generateTimeOptions,
	generateWeekDaysFromDate,
	hoursToMiliseconds,
	getStartOfWeek,
} from '@/utils';
import { maximumTime } from '@/constants';

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
const slotsCheckedMap = reactive(new Map<number, boolean>());

const visitDuration = useStorage<DropdownItem>('visitDuration', visitDurationOptions[3]);
const maxSessions = useStorage<number>('maxSessions', 2);
const allowVideoCall = useStorage<boolean>('allowVideoCall', false);

const bookSlots = useStorage<BookingSlot[]>('savedBookingSlots', []);

export const useSettings = () => {
	const maximumTimeInMiliseconds = computed(
		() => getStartOfDate(selectedDate).getTime() + hoursToMiliseconds(maximumTime)
	);
	const bookSlotsEndTimes = computed(() => {
		return bookSlots.value.map((el) => {
			return el.timeSlots?.map(
				(slot) => slot.startTime + (visitDuration.value.value as number)
			) as number[];
		});
	});
	const initializeBookSlots = () => {
		bookSlots.value = [
			...generateWeekDaysFromDate(selectedDate).map(
				(el) =>
					({
						dayInMiliseconds: el,
						checked: false,
						timeSlots: [
							{
								startTime: generateTimeOptions(new Date(el), visitDuration.value.value)[0].value,
							},
						],
					} as BookingSlot)
			),
		];
	};
	if (!bookSlots.value.length) {
		initializeBookSlots();
	}
	const updateSlotsChecked = (slotIndex: number, value: boolean) => {
		bookSlots.value[slotIndex].checked = value;
	};
	const updateBookSlotStartTime = (value: number, slotIndex: number, timeIndex: number) => {
		if (bookSlots.value[slotIndex].timeSlots && bookSlots.value[slotIndex].timeSlots?.length) {
			bookSlots.value[slotIndex].timeSlots[timeIndex] = {
				...bookSlots.value[slotIndex].timeSlots[timeIndex],
				startTime: value,
			};
		}
	};
	const addMoreTimeItemToTimeSlots = (bookSlotIndex: number, start: number) => {
		bookSlots.value[bookSlotIndex].timeSlots.push({
			startTime: start,
		});
	};
	const removeTimeItems = (bookSlotIndex: number, timeIndex: number, amount = 1) => {
		bookSlots.value[bookSlotIndex].timeSlots.splice(timeIndex, amount);
	};
	const startDateToDisplayInCalendar = computed(() => getStartOfWeek(selectedDate));
	const calendarViewDataSource = computed<CalendarDataSourceItem[]>(() => {
		const dataSource: CalendarDataSourceItem[] = [];
		const dataSourceIds: string[] = [];
		bookSlots.value
			.filter((el) => Boolean(el.checked && el.timeSlots.length > 0))
			.forEach((bookSlot, slotIndex) => {
				bookSlot.timeSlots.forEach((time, timeIndex) => {
					const id = `${bookSlot.dayInMiliseconds + time.startTime}`;
					if (!dataSourceIds.includes(id)) {
						dataSourceIds.push(id);
						dataSource.push({
							Id: id,
							StartTime: new Date(time.startTime),
							EndTime: new Date(bookSlotsEndTimes.value[slotIndex][timeIndex] || 0),
							Subject: 'Available',
						});
					}
				});
			});
		return dataSource;
	});
	return {
		selectedDate,
		visitDuration,
		maxSessions,
		allowVideoCall,
		bookSlots,
		visitDurationOptions,
		slotsCheckedMap,
		bookSlotsEndTimes,
		maximumTimeInMiliseconds,
		startDateToDisplayInCalendar,
		calendarViewDataSource,
		updateSlotsChecked,
		updateBookSlotStartTime,
		addMoreTimeItemToTimeSlots,
		removeTimeItems,
	};
};
