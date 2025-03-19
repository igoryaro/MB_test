<template>
  <button :class="[buttonClass, sizeClass]">
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
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});

const buttonClass = computed(() => {
  return {
    "btn-fill": props.variant === "fill",
    "btn-outline": props.variant === "outline",
  };
});

const sizeClass = computed(() => {
  return {
    "btn-small": props.size === "small",
    "btn-medium": props.size === "medium",
    "btn-large": props.size === "large",
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

.btn-small {
  width: 33%;
}

.btn-medium {
  width: 66%;
}

.btn-large {
  width: 100%;
}
</style>
