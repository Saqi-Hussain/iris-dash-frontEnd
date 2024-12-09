import { defineStore } from 'pinia'
import axios from 'axios' 


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
      userName:'',
      userRole:'',
      userEmail: '',
      userId:'',
      userAvatar: ''
    }),
    actions: {
        login(){
            console.log('login from store');
            
        },
        register(){
            console.log("register from store");
            
        },
        async fetchImg(){
            try {
                const response = await axios.post(`${import.meta.env.VITE_APP_ENDPOINT}api/user-profile`, {
                  user_id: this.userId
                });
            console.log('response status = ',response.status);
            
                if (response.status === 200) {
                  console.log('response data avatar_link = ',response.data.avatar_link);
                  this.userAvatar = response.data.avatar_link;
                  this.userAvatar = `${import.meta.env.VITE_APP_ENDPOINT}${response.data.avatar_link}`;
                } else {
                  console.error('Failed to fetch user profile:', response);
                }
              } catch (error) {
                console.error('Error fetching user profile', error);
              }
        }

        
    }

})