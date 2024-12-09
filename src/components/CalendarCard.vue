<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { reactive, ref, nextTick } from 'vue'
import { Modal, Input, DatePicker } from 'ant-design-vue'
import dayjs from 'dayjs' // Import dayjs for date formatting

// Modal visibility and form data
const isModalVisible = ref(false)
const eventTitle = ref('') // To store the event title
const selectedDate = ref(null) // To store the event date

// Calendar events array (reactive)
const calendarEvents = ref([
  { title: 'Event 1', date: '2024-10-01' },
  { title: 'Event 2', date: '2024-09-02' }
])

// Calendar reference to force update
const calendarRef = ref(null)

// Define the calendar options reactively
const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],

  initialView: 'dayGridMonth',
  dateClick: handleDateClick,
  headerToolbar: {
    left: 'prev,next,today',
    center: 'title',
    right: 'dayGridWeek,dayGridDay,dayGridMonth,dayGridYear'
  },
  events: calendarEvents.value // Bind calendar events
})

// Handle date clicks and show modal for adding event
function handleDateClick(arg) {
  // selectedDate.value = arg.dateStr // Set the clicked date
  console.log('argument = ', arg)

  isModalVisible.value = true // Show the modal
}

// Modal OK handler: Add the event and refresh the calendar
async function handleOk() {
  if (eventTitle.value && selectedDate.value) {
    // Format the selected date from DatePicker (dayjs to string)
    console.log(selectedDate.value)

    const formattedDate = dayjs(selectedDate.value).format('YYYY-MM-DD')

    // Add the event to the calendar
    calendarEvents.value.push({
      title: eventTitle.value,
      date: formattedDate // Use formatted date
    })

    // Force calendar to refresh with new events
    await nextTick() // Wait for DOM to update
    calendarRef.value.getApi().refetchEvents() // Refetch events from the updated array
  }

  // Close modal and clear inputs
  isModalVisible.value = false
  eventTitle.value = ''
  selectedDate.value = null
}

// Modal Cancel handler
function handleCancel() {
  isModalVisible.value = false
  eventTitle.value = ''
  selectedDate.value = null
}

// Show "Add Event" modal
function showAddEventModal() {
  isModalVisible.value = true
}
</script>

<template>
  <div>
    <!-- Button to trigger the add event modal -->
    <div class="flex justify-end mb-3">
      <button
        @click="showAddEventModal"
        style="
          margin-bottom: 5px;
          font-weight: bold;
          background-color: #344870;
          color: white;
          padding: 10px;
          border-radius: 5px;
        "
      >
        Add Event
      </button>
    </div>

    <!-- FullCalendar component with ref for accessing its API -->
    <FullCalendar :options="calendarOptions" ref="calendarRef" />

    <!-- Modal for adding event -->
    <Modal v-model:open="isModalVisible" title="Add Event" @ok="handleOk" @cancel="handleCancel">
      <!-- Input for event title -->
      <Input v-model:value="eventTitle" placeholder="Enter event title" />

      <!-- Date Picker to select the date -->
      <DatePicker
        v-model:value="selectedDate"
        style="width: 100%; margin-top: 10px"
        format="YYYY-MM-DD"
      />
    </Modal>
  </div>
</template>

<style>
.fc-button {
  background-color: #163f98 !important;
  border: none;
  color: white;
}

.fc-button:hover {
  background-color: #ea212b !important;
}

.fc-button:active,
.fc-button-active {
  background-color: #ea212b !important;
}

.fc-button.fc-prev-button,
.fc-button.fc-next-button,
.fc-button.fc-today-button {
  background-color: #ac1a0d;
}

.fc-button.fc-prev-button:hover,
.fc-button.fc-next-button:hover,
.fc-button.fc-today-button:hover {
  background-color: #2c3e50;
}

.fc-button.fc-prev-button.fc-button-active,
.fc-button.fc-next-button.fc-button-active,
.fc-button.fc-today-button.fc-button-active {
  background-color: #ff4500 !important;
  border: 2px solid #ffdab9;
}
</style>
