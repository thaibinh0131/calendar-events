<script lang="ts" setup>
import { type DropdownItem, type BookingSlot } from '@/type';
import Dropdown from './Dropdown.vue';
import { generateTimeLabel } from '@/utils';

const props = defineProps<{
	startTime: number;
	endTime: number;
}>();

const { visitDuration, timeOptions } = useSettings();

const startTimeSelected = computed(() => {
	return {
		title: generateTimeLabel(props.startTime),
		value: props.startTime,
	};
});

const endTimeSelected = computed(() => {
	return {
		title: generateTimeLabel(props.endTime),
		value: props.endTime,
	};
});
</script>

<template>
	<div>
		<Dropdown
			:model-value="startTimeSelected"
			:items="timeOptions"
			class="!min-w-none"
		></Dropdown>
		<span>-</span>
		<Dropdown
			class="!min-w-none"
			:model-value="startTimeSelected"
			disabled
			:items="timeOptions"
		></Dropdown>
	</div>
</template>
