<template>
	<ejs-schedule
		height="550px"
		width="100%"
		:start-hour="`${minimumTime}:00`"
		:selectedDate="startDateToDisplayInCalendar"
		:eventSettings="{
			dataSource: calendarViewDataSource,
		}"
		:readonly="true"
		:firstDayOfWeek="1"
		:time-scale="timeScale"
		:end-hour="`${maximumTime}:00`"
	>
	</ejs-schedule>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
	ScheduleComponent as EjsSchedule,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
} from '@syncfusion/ej2-vue-schedule';
import { minimumTime, maximumTime } from '@/constants';

provide('schedule', [Day, Week, WorkWeek, Month, Agenda]);
const { startDateToDisplayInCalendar, calendarViewDataSource } = useSettings();

const timeScale = {
	enable: true,
	interval: 15,
	slotCount: 1,
};

const hideLicense = () => {
	const body = document.getElementsByTagName('body')[0];

	const textShouldHide =
		'This application was built using a trial version of Syncfusion Essential Studio. To remove the license validation message permanently, a valid license key must be included. Claim your free account';

	body.childNodes.forEach((node) => {
		if (node.textContent === textShouldHide) {
			node.remove()
		}
		return node;
	});
};

onMounted(() => {
	hideLicense();
});
</script>

<style>
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';

.e-toolbar-right {
	display: none !important;
}

.e-appointment {
	@apply bg-white border p-2 flex items-center border-gray-200 rounded-md text-gray-500 !important;
}

.e-time {
	@apply hidden !important;
}
</style>
