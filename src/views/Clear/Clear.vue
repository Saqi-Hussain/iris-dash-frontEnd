<script setup lang="ts">
import { h, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Button from '@/components/ui/button/Button.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const pageTitle = ref('Calendar')
const isLoading = ref(false) // Define the loading state

const handleClick = () => {
  isLoading.value = true // Start loading
  axios
    .delete(`${import.meta.env.VITE_APP_ENDPOINT}api/clear`)
    .then((response) => {
      toast.success('Cleared Successfully', {
        timeout: 1500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      toast.error('Failed to Clear', {
        timeout: 1500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    })
    .finally(() => {
      isLoading.value = false // Stop loading
    })
}
</script>

<template>
  <DefaultLayout>
    <div class="grid place-items-center h-[80vh] gap-5">
      <Button @click="handleClick" :disabled="isLoading" class="bg-red-500 w-32 h-10 space-x-2">
        <template v-if="!isLoading">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
            ></path>
          </svg>
          <span> Clear </span>
        </template>
        <template v-else>
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </template>
      </Button>
    </div>
  </DefaultLayout>
</template>
