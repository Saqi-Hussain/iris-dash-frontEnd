<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import axios from 'axios';
import { useToast } from "vue-toastification";
// import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
// import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, ref } from 'vue'
import router from '@/router';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js';


const toast = useToast();
const form = ref({
  name: '',
  email: '',
  password: '',
})
const formReset = () => {
  form.value = {
    name: '',
    email: '',
    password: '',
  }
}
const loading = ref(false);




const handlesubmit = async () => {
  console.log(form.value);
  loading.value = true;
  console.log('hello')
  await axios.get('/sanctum/csrf-cookie').then(response => {
    // Login...
    try {

       axios.post(`${import.meta.env.VITE_APP_ENDPOINT}register`, form.value).then((response) => {
        toast.success("Registered Successfully", {
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
          rtl: false
        });

        loading.value = false;
        formReset();
        router.push('/auth/login')

        console.log(response)
      }).catch((error) => {
        if (error.response.data.message === "The email has already been taken.") {
          toast.error("The email has already been taken.", {
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: "button",
            icon: true,
            rtl: false
          });

          loading.value = false;
        }
        else {
          toast.error("Error in Registering", {
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: "button",
            icon: true,
            rtl: false
          });

          loading.value = false;
        }
        console.log(error)
      })
    }
    catch (error) {
      console.log(error)
      loading.value = false;
    }
  });
}


// State to control password visibility
const passwordVisible = ref(false)

// Toggle password visibility function
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}
// const pageTitle = ref('Sign Up')
</script>

<template>

  <div class="flex items-center justify-center min-h-screen p-6 dark:bg-gray-900 ">
    <DefaultAuthCard title="Sign Up to Bank Alfalah">
      <form>
        <InputGroup label="Name" type="text" placeholder="Enter your full name" v-model="form.name">
          <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                fill="" />
              <path
                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                fill="" />
            </g>
          </svg>
        </InputGroup>

        <InputGroup label="Email" type="email" placeholder="Enter your email" v-model="form.email">
          <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                fill="" />
            </g>
          </svg>
        </InputGroup>

        <InputGroup label="Password" :type="passwordVisible ? 'text' : 'password'"
          placeholder="6+ Characters, 1 Capital letter" v-model="form.password">
          <svg xmlns="http://www.w3.org/2000/svg" @click="togglePasswordVisibility" v-show="!passwordVisible"
            width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.35 0-6.113-1.8t-4.362-4.75q-.125-.225-.187-.462t-.063-.488t.063-.488t.187-.462q1.6-2.95 4.363-4.75T12 4t6.113 1.8t4.362 4.75q.125.225.188.463t.062.487t-.062.488t-.188.462q-1.6 2.95-4.362 4.75T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17">
            </path>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" @click="togglePasswordVisibility" v-show="passwordVisible"
            width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2">
            </path>
          </svg>
        </InputGroup>

        <!-- <InputGroup label="Re-type Password" type="password" placeholder="Re-enter your password">
          <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path
                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                fill="" />
              <path
                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                fill="" />
            </g>
          </svg>
        </InputGroup> -->

        <div class="mb-5 mt-6">
          <button @click.prevent="handlesubmit" value="Create account" type="button"
            class="w-full cursor-pointer rounded-lg border border-[#465985] bg-[#465985] p-4 font-medium text-white transition hover:bg-opacity-90 text-center">
            <pulse-loader v-if="loading" color="#000"></pulse-loader>
            <span v-if="!loading">
              Create account
            </span>
          </button>

        </div>




        <div class="mt-6 text-center">
          <p class="font-medium">
            Already have an account?
            <router-link to="/auth/login" class="text-primary">Sign in</router-link>
          </p>
        </div>
      </form>
    </DefaultAuthCard>

  </div>


</template>
