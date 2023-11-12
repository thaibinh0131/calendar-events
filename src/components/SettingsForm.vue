<script lang="ts" setup>
import Dropdown from './Dropdown.vue';
import BookingSlotItem from './BookingSlotItem.vue';

const {
	visitDuration,
	bookSlotsEndTimes,
	visitDurationOptions,
	maxSessions,
	bookSlots,
	calendarViewDataSource,
	allowVideoCall,
} = useSettings();
</script>

<template>
	<section class="text-sm lg:max-w-[800px] mx-auto">
		<div>
			<div class="mb-1">Visit Duration</div>
			<Dropdown
				v-model="visitDuration"
				:items="visitDurationOptions"
			></Dropdown>
		</div>
		<div class="mt-4">
			<div class="mb-1">No. of Booking/Session</div>
			<input
				type="number"
				hide-controls
				v-model="maxSessions"
			/>
		</div>
		<div class="flex items-center mt-4">
			<input
				type="checkbox"
				v-model="allowVideoCall"
				id="videoCall"
				class="min-w-max mr-2"
			/>
			<label
				class="font-medium cursor-pointer"
				for="videoCall"
				>Allow video tour call</label
			>
		</div>
		<hr class="my-8" />
		<div>
			<div class="text-xl font-semibold">Availability</div>
			<div class="mb-4">Set your weekly recurring schedule</div>
			<div>
				<BookingSlotItem
					v-for="(slot, index) in bookSlots"
					:slot="slot"
					:index="index"
				></BookingSlotItem>
			</div>
		</div>
	</section>
</template>

<style>
input,
select {
	@apply border border-gray-300 rounded-md min-w-[200px] px-3 py-2;
}
</style>
