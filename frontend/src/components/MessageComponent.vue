<template>
  <p v-if="message" :class="messageClass">{{ message }}</p>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'error', // Define o tipo padrão como 'error'
  },
});

const messageClass = computed(() => {
  return props.type === 'success' ? 'success-message' : 'error-message';
});
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 12px;
}

.success-message {
  color: green;
  font-size: 12px;
}
</style>