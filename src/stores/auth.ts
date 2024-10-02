import { defineStore } from 'pinia'
import axios from 'axios'


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
      userName:'',
      userRole:''
    }),
    actions: {
        login(){
            console.log('login from store');
            
        },
        register(){
            console.log("register from store");
            
        }

        
    }

})