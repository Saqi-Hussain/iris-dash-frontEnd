<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios' // You'll need axios for making HTTP requests
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CalendarCard from '@/components/CalendarCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()

const pageTitle = ref('File Upload')

// Reactive variables
const fileName = ref<string | null>(null)
const file = ref<File | null>(null)
const email = ref<string>('')
const isLoading = ref(false)
const done = ref(false)

// Handle file input change
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input?.files?.length) {
    file.value = input.files[0]
    fileName.value = input.files[0].name
  }
}

// Trigger file input click
const triggerFileInput = () => {
  document.getElementById('fileID')?.click()
}

// Handle file upload
const handleSubmit = async () => {
  if (email.value && file.value) {
    const formData = new FormData()
    formData.append('email', email.value)
    formData.append('file', file.value)

    isLoading.value = true

    try {
      // Send POST request to the backend
      const response = await axios.post(`${import.meta.env.VITE_APP_ENDPOINT}api/import`, formData)

      // Handle successful upload
      console.log('File uploaded successfully', response.data)
      if (response.status === 200) {
        toast.success('File uploaded successfully', {
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
        router.push('/')
      }
      isLoading.value = false
      fileName.value = null
      email.value = ''
      done.value = true
    } catch (error) {
      // Handle error during upload
      console.error('Error uploading file', error)
      isLoading.value = false
    }
  } else {
    console.log('Email and file are required')
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="card">
        <h3>Upload Files</h3>
        <div class="drop_box">
          <!-- Show loader while uploading -->
          <div v-if="isLoading" class="loader">
            <h4>Uploading...</h4>
            <div class="spinner"></div>
          </div>
          <div v-else-if="done">Done</div>
          <!-- File selection and form if not uploading -->
          <div v-else>
            <header v-if="!fileName">
              <h4>Select File here</h4>
            </header>
            <p v-if="!fileName">Files Supported: CSV, XLX, XLXS</p>

            <!-- File input and upload form -->
            <input
              type="file"
              hidden
              accept=".csv,.xlsx,.xlx"
              id="fileID"
              @change="handleFileChange"
            />

            <!-- Show file name and email form after file selection -->
            <div v-if="fileName" class="form w-full flex flex-col items-center space-y-8">
              <h4>{{ fileName }}</h4>
              <input type="email" v-model="email" placeholder="Enter email to upload file" />
              <button class="btn mt-10" @click="handleSubmit">Upload</button>
            </div>

            <!-- Button to choose a file -->
            <button v-if="!fileName" class="btn" @click="triggerFileInput">Choose File</button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.container {
  height: 80vh;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 5px;
}

.card {
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 #486189;
  width: 600px;
  height: 320px;
  background-color: #486189;
  color: white;
  padding: 30px;
}

.card h3 {
  font-size: 22px;
  font-weight: 600;
}

.drop_box {
  margin: 10px 0;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  height: 200px;
}

.drop_box h4 {
  font-size: 16px;
  font-weight: 400;
  color: #f3f3f3;
}

.drop_box p {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #f3f3f3;
}

.btn {
  text-decoration: none;
  background-color: white;
  color: #486189;
  padding: 10px 20px;
  border: none;
  outline: none;
  transition: 0.3s;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

.btn:hover {
  background-color: #486189;
  color: #f3f3f3;
  box-shadow: 0px 0px 5px 1px #f3f3f3;
}

.form input {
  margin: 20px 0;
  width: 100%;
  background-color: #e2e2e2;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 4px;
}

/* Loader styles */
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* border: 1px solid #f3f3f3; */
  width: 100%;
}

.loader h4 {
  font-size: 16px;
  font-weight: 500;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
