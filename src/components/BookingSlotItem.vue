<script lang="ts" setup>
import { type BookingSlot } from '@/type';
import BookingSlotItemTimesItem from './BookingSlotItemTimesItem.vue';

const props = defineProps<{
	slot: BookingSlot;
	checked: boolean;
	index: number;
}>();

const emit = defineEmits(['update:checked']);
const value = useSyncProps<boolean>(props, 'checked', emit);
</script>

<template>
	<div
		v-if="slot"
		class="flex items-center gap-4"
	>
		<input
			v-model="value"
			type="checkbox"
		/>
		<template v-if="slot.timeSlots && slot.timeSlots.length">
			<BookingSlotItemTimesItem
				v-for="item in slot.timeSlots"
				:start-time="item.startTime"
				:end-time="item.endTime"
			/>
		</template>
		<div v-else>No Available</div>
	</div>
</template>
