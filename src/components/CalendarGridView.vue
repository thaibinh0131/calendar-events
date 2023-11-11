<template>
	<ejs-schedule
		height="550px"
		width="100%"
		:selectedDate="selectedDate"
		:eventSettings="eventSettings"
        :readonly="true"
	>
		<e-views>
			<e-view option="Day"></e-view>
			<e-view option="Week"></e-view>
			<e-view option="WorkWeek"></e-view>
			<e-view option="Month"></e-view>
			<e-view option="Agenda"></e-view>
		</e-views>
		<e-resources>
			<e-resource
				field="OwnerId"
				title="Owner"
				name="Owners"
				:dataSource="ownerDataSource"
				textField="OwnerText"
				idField="Id"
				colorField="OwnerColor"
			>
			</e-resource>
		</e-resources>
	</ejs-schedule>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import {
	ScheduleComponent as EjsSchedule,
	ViewsDirective as EViews,
	ViewDirective as EView,
	ResourcesDirective as EResources,
	ResourceDirective as EResource,
	Day,
	Week,
	WorkWeek,
	Month,
	Agenda,
} from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Day, Week, WorkWeek, Month, Agenda]);

const selectedDate = new Date(2023, 7, 8);
const eventSettings = {
	dataSource: [
		{
			Id: 1,
			Subject: 'Surgery - Andrew',
			EventType: 'Confirmed',
			StartTime: new Date(2023, 7, 10, 9, 0),
			EndTime: new Date(2023, 7, 10, 10, 0),
			OwnerId: 2,
		},
		{
			Id: 2,
			Subject: 'Consulting - John',
			EventType: 'Confirmed',
			StartTime: new Date(2023, 7, 9, 10, 0),
			EndTime: new Date(2023, 7, 9, 11, 30),
			OwnerId: 3,
		},
		{
			Id: 3,
			Subject: 'Therapy - Robert',
			EventType: 'Requested',
			StartTime: new Date(2023, 7, 8, 11, 30),
			EndTime: new Date(2023, 7, 8, 12, 30),
			OwnerId: 1,
		},
	],
};
const ownerDataSource = [
	{ OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
	{ OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
	{ OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' },
];

const hideLicense = () => {
	const body = document.getElementsByTagName('body')[0];

	const textShouldHide =
		'This application was built using a trial version of Syncfusion Essential Studio. To remove the license validation message permanently, a valid license key must be included. Claim your free account';

	body.childNodes.forEach((node) => {
		if (node.textContent === textShouldHide) {
			node.remove();
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
</style>
