<script setup lang="ts">
import { type DropdownItem } from '@/type';

const props = defineProps<{
	items: DropdownItem[];
	modelValue: DropdownItem | undefined;
}>();
const emit = defineEmits(['update:modelValue']);
const selected = useSyncProps<DropdownItem>(props, 'modelValue', emit);
</script>

<template>
	<select v-model="selected">
		<option
			:value="selected"
			disabled
			selected
		>
			{{ selected.title || 'Select' }}
		</option>

		<option
			v-for="item in items"
			:value="item"
		>
			{{ item.title }}
		</option>
	</select>
</template>
