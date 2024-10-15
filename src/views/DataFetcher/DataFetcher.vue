<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { Button } from '@/components/ui/button'

</script>

<template>
  <DefaultLayout>
    <div class="flex flex-col gap-6  border-gray-300 rounded-lg p-8 justify-center items-center h-[85vh] bg-white shadow-lg">
      <div class="text-6xl font-bold text-blue-600 mb-6">
        Data Fetcher
      </div>
      <Button>Click me</Button>
      <div class="flex flex-col gap-2 text-xl justify-center items-center">
        <label for="startDate" class="font-medium text-gray-700">Start Date</label>
        <input id="startDate" type="date" class="px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div class="flex flex-col gap-2 text-xl justify-center items-center">
        <label for="endDate" class="font-medium text-gray-700">End Date</label>
        <input id="endDate" type="date" class="px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
