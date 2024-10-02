<!-- src/components/NotFound.vue -->
<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 3rem;
    color: #ff6b6b;
  }
  
  p {
    font-size: 1.5rem;
    margin: 20px 0;
  }
  
  a {
    color: #42b983;
    text-decoration: none;
  }
  </style>
  