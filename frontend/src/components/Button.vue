<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "fill",
    validator: (value) => ["fill", "outline"].includes(value),
  },
});

const buttonClass = computed(() => {
  return {
    "btn-fill": props.variant === "fill",
    "btn-outline": props.variant === "outline",
  };
});
</script>

<style scoped>
.btn-fill {
  background-color: orange;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-outline {
  background-color: white;
  color: orange;
  padding: 10px;
  border: 1px solid orange;
  border-radius: 4px;
  cursor: pointer;
}

.btn-fill:disabled,
.btn-outline:disabled {
  cursor: not-allowed;
  opacity: 50%;
}
</style>
