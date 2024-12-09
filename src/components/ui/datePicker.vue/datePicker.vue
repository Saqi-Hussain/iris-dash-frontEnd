<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type Ref, ref, watch } from 'vue'
import { useDataStore } from '@/stores/data'
import { use } from 'echarts/core'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1 // JavaScript months are 0-based, so add 1
const day = currentDate.getDate()

const dataStore = useDataStore()

// Convert the start and end dates from strings to Date objects
const value = ref({
  start: dataStore.startDate ? new Date(dataStore.startDate) : undefined, // Convert to Date or set undefined
  end: dataStore.endDate ? new Date(dataStore.endDate) : undefined // Convert to Date or set undefined
}) as Ref<DateRange>

// Function to handle submit logic
const submitDate = () => {
  // useDataStore().startDate = value.value.start?.year+'/'+value.value.start?.month+'/'+value.value.start?.day
  // useDataStore().endDate = value.value.end?.year+'/'+value.value.end?.month+'/'+value.value.end?.day
  useDataStore().setDateRange(
    value.value.start?.year + '/' + value.value.start?.month + '/' + value.value.start?.day,
    value.value.end?.year + '/' + value.value.end?.month + '/' + value.value.end?.day
  )
  console.log('Selected Date Range:', useDataStore().startDate, useDataStore().endDate)
  // Perform further actions such as form submission, API call, etc.
}

// Watch for changes in the 'value' (both start and end dates)
watch(
  value,
  (newValue, oldValue) => {
    // Trigger submit when both start and end dates are set
    if (newValue.start && newValue.end) {
      console.log(value.value.start, value.value.end)
      console.log('new val = ', newValue)
      console.log('old val = ', oldValue)

      submitDate()
    }
  },
  { deep: true }
)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            ' lg:w-[220px]  justify-start text-left font-normal text-[13.2px] bg-[#455984] text-white hover:bg-[#455984] hover:text-white hover:shadow-md focus:bg-[#455984] focus:text-white p-3 h-[37.5px] rounded-[10px]',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="value.start && useDataStore().endDate !== ''">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar v-model="value" initial-focus :number-of-months="1" />
    </PopoverContent>
  </Popover>
</template>
