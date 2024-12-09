<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'

const toast = useToast()
const form = ref({
  email: '',
  password: ''
})
const formReset = () => {
  form.value = {
    email: '',
    password: ''
  }
}

const modalText = ref('')
const open = ref(false)
const confirmLoading = ref(false)
const showModal = () => {
  open.value = true
  console.log(open.value)
}

const loading = ref(false)

// Utility function to get the value of a cookie by name
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
  return undefined
}

const handlesubmit = async () => {
  console.log(form.value)
  loading.value = true

  try {
    // First, ensure CSRF token is retrieved
    // await getToken()

    // Then make the login request
    const response = await axios.post(`${import.meta.env.VITE_APP_ENDPOINT}login`, form.value)

    // Handle success response
    const userData = response.data.user
    const token = response.data.token

    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)

    const csrfToken = getCookie('XSRF-TOKEN')

    // Only store the CSRF token if it's defined
    if (csrfToken !== undefined) {
      localStorage.setItem('csrfToken', csrfToken)
    } else {
      console.error('CSRF token is undefined')
    }

    // Role-based redirection
    if (userData.role === 'admin') {
      router.push('/')
    } else {
      router.push('/')
    }

    // Success notification
    toast.success('Login Successfully', {
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

    loading.value = false
    formReset()

    // Store user info in auth store
    const authStore = useAuthStore()
    authStore.userName = userData.name
    authStore.userEmail = userData.email
  } catch (error: any) {
    loading.value = false

    // Error handling and toasts
    if (error.response && error.response.data.message === 'Invalid credentials') {
      toast.error('Your Credentials are Invalid', {
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
    } else {
      toast.error('Error in login in', {
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
    }

    console.log(error)
  }
}

// State to control password visibility
const passwordVisible = ref(false)

// Toggle password visibility function
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleCancel = () => {
  open.value = false
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    <DefaultAuthCard title="Sign in to iriscommunications portal">
      <form>
        <!-- Email input group -->
        <InputGroup label="Email" type="email" placeholder="Enter your email" v-model="form.email">
          <svg
            class="fill-current"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                fill=""
              />
            </g>
          </svg>
        </InputGroup>

        <!-- Password input group with show/hide functionality -->
        <InputGroup
          label="Password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="6+ Characters, 1 Capital letter"
          v-model="form.password"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="togglePasswordVisibility"
            v-show="passwordVisible"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#80838B"
              d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.35 0-6.113-1.8t-4.362-4.75q-.125-.225-.187-.462t-.063-.488t.063-.488t.187-.462q1.6-2.95 4.363-4.75T12 4t6.113 1.8t4.362 4.75q.125.225.188.463t.062.487t-.062.488t-.188.462q-1.6 2.95-4.362 4.75T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
            ></path>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            @click="togglePasswordVisibility"
            v-show="!passwordVisible"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#80838B"
              d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"
            ></path>
          </svg>
        </InputGroup>

        <!-- Sign In button with loading spinner -->
        <div class="mb-5 mt-6">
          <button
            type="submit"
            @click.prevent="handlesubmit"
            value="Sign In"
            class="w-full cursor-pointer rounded-lg border border-[#465985] bg-[#465985] p-4 font-medium text-white transition hover:bg-opacity-10 hover:text-[#465985]"
          >
            <pulse-loader v-if="loading" color="#000"></pulse-loader>
            <span v-if="!loading">Sign In</span>
          </button>
        </div>
        <div @click="showModal" class="cursor-pointer hover:text-[#455984] mt-5">
          Reset password?
        </div>
        <div></div>
      </form>
    </DefaultAuthCard>
  </div>
</template>
