<template>
  <div class="step-container">
    <p class="step-info">Etapa <span class="highlight">1</span> de 4</p>
    <h1>Seja bem vindo(a)</h1>

    <label for="email">Endereço de e-mail</label>
    <input
      type="email"
      id="email"
      v-model="formData.email"
      placeholder="Digite seu e-mail"
      @input="validateEmail"
      required
    />
    <p v-if="emailError" class="error-message">
      Por favor, insira um e-mail válido.
    </p>

    <div class="radio-group">
      <label>
        <input type="radio" v-model="formData.tipoCadastro" value="PF" /> Pessoa
        física
      </label>
      <label>
        <input type="radio" v-model="formData.tipoCadastro" value="PJ" /> Pessoa
        jurídica
      </label>
    </div>
    <p v-if="tipoCadastroError" class="error-message">
      Selecione um tipo de cadastro.
    </p>

    <button @click="continuar" :disabled="!isValid">Continuar</button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "next"]);

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const emailError = ref(false);
const tipoCadastroError = ref(false);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailRegex.test(formData.value.email);
};

const isValid = computed(() => {
  return (
    formData.value.email && !emailError.value && formData.value.tipoCadastro
  );
});

const continuar = () => {
  emailError.value = !formData.value.email;
  tipoCadastroError.value = !formData.value.tipoCadastro;
  if (isValid.value) {
    emit("next");
  }
};
</script>

<style scoped>
.step-container {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.step-info {
  font-size: 14px;
}

.highlight {
  color: orange;
  font-weight: bold;
}

h1 {
  font-size: 20px;
  font-weight: bold;
}

input[type="email"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.radio-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  background-color: orange;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: orange;
  cursor: not-allowed;
  opacity: 50%;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
