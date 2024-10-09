<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CalendarCard from '@/components/CalendarCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// Reactive variable for the page title
const pageTitle = ref('Calendar')

// Refs for managing the file input and upload state
const fileName = ref<string | null>(null)
const email = ref<string>('')

// Method to handle file input change
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input?.files?.length) {
    fileName.value = input.files[0].name
  }
}

// Method to trigger file input click
const triggerFileInput = () => {
  document.getElementById('fileID')?.click()
}

// Method to handle file upload form submission (for email input)
const handleSubmit = () => {
  if (email.value && fileName.value) {
    alert(`File ${fileName.value} will be uploaded to email: ${email.value}`)
    // You can add your file upload logic here
  }
}
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="card">
        <h3>Upload Files</h3>
        <div class="drop_box">
          <header v-if="!fileName">
            <h4>Select File here</h4>
          </header>
          <p v-if="!fileName">Files Supported: CSV, XLX, XLXS</p>

          <!-- File input and upload form -->
          <input type="file" hidden accept=".csv,.xlxs,.xlx" id="fileID" @change="handleFileChange" />

          <!-- Show file name and email form after file selection -->
          <div v-if="fileName" class="form ">
            <h4>{{ fileName }}</h4>
            <!-- <input type="email" v-model="email" placeholder="Enter email to upload file" /> -->
            <button class="btn mt-5" @click="handleSubmit">Upload</button>
          </div>

          <!-- Button to choose a file -->
          <button v-if="!fileName" class="btn" @click="triggerFileInput">Choose File</button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.container {
  height: 80vh;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #f1f5f9;
}

.card {
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  width: 600px;
  height: 260px;
  background-color: #ffffff;
  padding: 10px 30px 40px;
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
  border: 3px dotted #a3a3a3;
  border-radius: 5px;
}

.drop_box h4 {
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
}

.drop_box p {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #a3a3a3;
}

.btn {
  text-decoration: none;
  background-color: #005af0;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  outline: none;
  transition: 0.3s;
}

.btn:hover {
  background-color: #ffffff;
  color: #005af0;
  border: 1px solid #010101;
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
</style>
