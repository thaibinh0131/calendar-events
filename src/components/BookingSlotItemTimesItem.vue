<script lang="ts" setup>
import { type DropdownItem, type BookingSlot } from '@/type';
import Dropdown from './Dropdown.vue';
import DeleteIcon from './DeleteIcon.vue';
import { generateTimeLabel } from '@/utils';

const props = defineProps<{
	startTime: number;
	endTime?: number;
}>();

const emit = defineEmits(['update:startTime', 'removeTimeItem']);
const { timeOptions } = useSettings();

const startTimeSelected = computed(() => {
	return {
		title: generateTimeLabel(props.startTime),
		value: props.startTime,
	};
});

const endTimeSelected = computed(() => {
	return {
		title: generateTimeLabel(props.endTime || 0),
		value: props.endTime || 0,
	};
});

const onUpdateStartTime = (option: DropdownItem) => {
	emit('update:startTime', option.value);
};
</script>

<template>
	<div class="flex items-center gap-1">
		<Dropdown
			:model-value="startTimeSelected"
			:items="timeOptions"
			@update:model-value="onUpdateStartTime"
			class="!min-w-[100px]"
		></Dropdown>
		<span>-</span>
		<Dropdown
			class="!min-w-[100px] bg-gray-200"
			:model-value="endTimeSelected"
			disabled
			:items="timeOptions"
		></Dropdown>
		<button
			class="ml-1"
			@click="$emit('removeTimeItem')"
		>
			<DeleteIcon />
		</button>
	</div>
</template>
