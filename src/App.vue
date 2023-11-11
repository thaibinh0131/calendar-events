<script setup lang="ts">
import CalendarGridView from './components/CalendarGridView.vue';
import SettingsForm from './components/SettingsForm.vue';
</script>

<template>
	<main class="p-10">
		<SettingsForm class="mb-20 border border-gray-200 rounded-md p-4" />

		<CalendarGridView />
	</main>
</template>
