export interface DropdownItem {
	title: string;
	value: number;
}

export type TimeSlot = {
	startTime: number; // startTime  in miliseconds
	endTime?: number; // endTime in miliseconds, could be calculate by startTime and duration
};

export interface BookingSlot {
	dayInMiliseconds: number;
	checked: boolean;
	timeSlots: TimeSlot[];
}
export type HTMLElementEvent<T extends HTMLElement> = Event & {
	target: T;
};
