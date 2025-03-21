<template>
    <p v-if="message" class="error-message">{{ message }}</p>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>