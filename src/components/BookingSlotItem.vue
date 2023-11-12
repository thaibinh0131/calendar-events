<script lang="ts" setup>
import { type BookingSlot, type HTMLElementEvent } from '@/type';
import BookingSlotItemTimesItem from './BookingSlotItemTimesItem.vue';
import AddIcon from './AddIcon.vue';
import { getISOWeekDayString } from '@/utils';
import { maximumTime } from '@/constants';

const props = defineProps<{
	slot: BookingSlot;
	index: number;
}>();

const {
	slotsCheckedMap,
	updateSlotsChecked,
	updateBookSlotStartTime,
	addMoreTimeItemToTimeSlots,
	removeTimeItems,
	maximumTimeInMiliseconds,
	bookSlotsEndTimes,
	visitDuration,
	maxSessions,
} = useSettings();

const ableToAddNewTimeSlot = computed(() => {
	return props.slot.timeSlots.length < maxSessions.value;
});

const checked = computed(() => Boolean(props.slot.checked && props.slot.timeSlots.length > 0));
const onCheckedChange = (e: Event) => {
	const value = (e as HTMLElementEvent<HTMLInputElement>).target.checked;
	if (props.slot.timeSlots.length === 0) {
		addMoreTimeItemToTimeSlots(props.index);
	}
	updateSlotsChecked(props.index, value);
};

const onButtonAddClick = () => {
	if (!ableToAddNewTimeSlot.value) {
		return;
	}
	addMoreTimeItemToTimeSlots(props.index);
};

watch(visitDuration, (duration) => {
	props.slot.timeSlots.forEach((time, timeIndex) => {
		if (time.startTime + duration.value > maximumTimeInMiliseconds.value) {
			updateBookSlotStartTime(
				maximumTimeInMiliseconds.value - duration.value,
				props.index,
				timeIndex
			);
		}
	});
});

watch(maxSessions, (max) => {
	if (!isNaN(max) && max > 0 && props.slot.timeSlots.length > max) {
		removeTimeItems(props.index, max, props.slot.timeSlots.length);
	}
});
</script>

<template>
	<div
		v-if="slot"
		class="flex items-start gap-4 mb-4"
	>
		<div class="flex items-center mt-2">
			<input
				:checked="checked"
				type="checkbox"
				@change="onCheckedChange"
				class="min-w-[40px]"
				:id="slot.dayInMiliseconds.toString()"
			/>
			<label
				class="w-10 font-semibold cursor-pointer"
				:for="slot.dayInMiliseconds.toString()"
				>{{ getISOWeekDayString(slot.dayInMiliseconds) }}</label
			>
		</div>
		<template v-if="checked">
			<div
				v-if="slot.timeSlots && slot.timeSlots.length"
				class="flex flex-col gap-4"
			>
				<BookingSlotItemTimesItem
					v-for="(item, timeIndex) in slot.timeSlots"
					:start-time="item.startTime"
					:end-time="
						bookSlotsEndTimes && bookSlotsEndTimes[index] ? bookSlotsEndTimes[index][timeIndex] : 0
					"
					@update:start-time="(val) => updateBookSlotStartTime(val, index, timeIndex)"
					@remove-time-item="removeTimeItems(index, timeIndex)"
				/>
			</div>

			<button
				class="ml-10 mt-[6px] disabled:opacity-50 disabled:cursor-not-allowed"
				:disabled="!ableToAddNewTimeSlot"
				@click="onButtonAddClick"
			>
				<AddIcon />
			</button>
		</template>
		<div
			v-else
			class="mt-2"
		>
			Unavailable
		</div>
	</div>
</template>
