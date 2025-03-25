<script setup>
import { ref } from "vue";
import Step1 from "../pages/Step1.vue";
import Step2 from "../pages/Step2.vue";
import Step3 from "../pages/Step3.vue";
import Step4 from "../pages/Step4.vue";

const step = ref(1);
const formData = ref({
  email: "",
  tipoCadastro: "PF",
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  razaoSocial: "",
  cnpj: "",
  dataAbertura: "",
  senha: "",
});

const nextStep = () => step.value++;
const prevStep = () => step.value--;

const submitForm = async () => {
  const response = await fetch("http://localhost:3000/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData.value),
  });

  const data = await response.json();
  alert(data.message);
};
</script>

<template>
  <div>
    <Step1 v-if="step === 1" v-model="formData" @next="nextStep" />
    <Step2
      v-if="step === 2"
      v-model="formData"
      @next="nextStep"
      @prev="prevStep"
    />
    <Step3
      v-if="step === 3"
      v-model="formData"
      @next="nextStep"
      @prev="prevStep"
    />
    <Step4
      v-if="step === 4"
      v-model="formData"
      @submit="submitForm"
      @prev="prevStep"
      @newUser="step = 1"
    />
  </div>
</template>
