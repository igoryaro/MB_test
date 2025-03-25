<template>
  <div class="step-container">
    <p class="step-info">Etapa <span class="highlight">1</span> de 4</p>
    <h1>Seja bem-vindo(a)</h1>

    <label for="email">Endereço de e-mail</label>
    <input
      type="email"
      id="email"
      v-model="formData.email"
      placeholder="Digite seu e-mail"
      @input="touched.email = true"
      @blur="validateEmailInput"
      required
    />
    <MessageComponent v-if="touched.email && emailError" :message="'Por favor, insira um e-mail válido.'" />

    <div class="radio-group">
      <label>
        <input type="radio" v-model="formData.tipoCadastro" value="PF" /> Pessoa
        Física
      </label>
      <label>
        <input type="radio" v-model="formData.tipoCadastro" value="PJ" /> Pessoa
        Jurídica
      </label>
    </div>
    <MessageComponent v-if="tipoCadastroError" :message="'Selecione um tipo de cadastro.'" />

    <Button
      :variant="'fill'"
      :size="'large'"
      @click="nextStep"
      :disabled="!isValid"
    >
      Continuar
    </Button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { validateEmail } from "../validators";
import Button from "../components/Button.vue";
import MessageComponent from "../components/MessageComponent.vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "next"]);

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const touched = ref({
  email: false,
});

const emailError = ref(false);
const tipoCadastroError = ref(false);

const validateEmailInput = () => {
  emailError.value = !validateEmail(formData.value.email);
};

const isValid = computed(() => {
  return (
    formData.value.email && !emailError.value && formData.value.tipoCadastro
  );
});

const nextStep = () => {
  touched.value.email = true;
  emailError.value = !validateEmail(formData.value.email);
  tipoCadastroError.value = !formData.value.tipoCadastro;

  if (isValid.value) {
    emit("next");
  }
};
</script>

<style scoped>

.radio-group {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>