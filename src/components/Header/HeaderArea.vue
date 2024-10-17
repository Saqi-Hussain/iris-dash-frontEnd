<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
// import DarkModeSwitcher from './DarkModeSwitcher.vue'
// import DropdownMessage from './DropdownMessage.vue'
// import DropdownNotification from './DropdownNotification.vue'
import DropdownUser from './DropdownUser.vue'
import { useRouter } from 'vue-router';
import {  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('user');
  router.push({ name: 'signin' });
};

const { toggleSidebar } = useSidebarStore()
const sidebarStore = useSidebarStore()
</script>

<template>
  <header
    class=" z-999 flex w-full bg-slate-200 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
  >
    <div class="flex flex-grow items-center justify-between lg:justify-between py-4 px-4 shadow-2 md:px-10  2xl:px-11">
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <!-- Hamburger Toggle BTN -->
        <button
          class="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          @click="
            () => {
              console.log('Toggling Sidebar')
              toggleSidebar()
            }
          "
        >
          <span class="relative block h-5.5 w-5.5 cursor-pointer">
            <span class="block absolute right-0 h-full w-full">
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-300': !sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-400': !sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-500': !sidebarStore.isSidebarOpen }"
              ></span>
            </span>
            <span class="block absolute right-0 h-full w-full rotate-45">
              <span
                class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 delay-[0]': !sidebarStore.isSidebarOpen }"
              ></span>
              <span
                class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 delay-200': !sidebarStore.isSidebarOpen }"
              ></span>
            </span>
          </span>
        </button>
        <!-- Hamburger Toggle BTN -->
        <router-link class="block flex-shrink-0 lg:hidden" to="/">
          <!-- <img src="@/assets/images/logo/logo-icon.svg" alt="Logo" /> -->
        </router-link>
      </div>
      <div>

      </div>
      <span class="block text-[24px] font-bold text-[#465985] dark:text-white text-start">Bank Alfalah Dashboard -
        Branch Exit Interviews</span>
     
        <div class="flex items-end gap-1">
          <img v-if="useAuthStore().userAvatar" :src="useAuthStore().userAvatar" width="35" alt="User" />
          <DropdownMenu>
              <DropdownMenuTrigger class="font-semibold" >Hello {{ useAuthStore().userName }}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account Setting</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <router-link to="account/settings">  <DropdownMenuItem>Change Account Setting</DropdownMenuItem> </router-link>
                <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
                <!-- <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem> -->
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      
    </div>
  </header>
</template>
