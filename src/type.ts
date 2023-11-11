export interface DropdownItem {
	title: string;
	value: string | number;
}

export type TimeSlot = {
	startTime: number; // startTime  in miliseconds
	endTime: number; // endTime in miliseconds
};

export interface BookingSlot {
	dayInMiliseconds: number;
	timeSlots?: TimeSlot[];
}
