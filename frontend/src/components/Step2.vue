<template>
  <div class="step-container">
    <p class="step-info">Etapa <span class="highlight">2</span> de 4</p>
    <h1>
      {{ formData.tipoCadastro === "PF" ? "Pessoa Física" : "Pessoa Jurídica" }}
    </h1>

    <div v-if="formData.tipoCadastro === 'PF'">
      <label for="nome">Nome</label>
      <input type="text" id="nome" v-model="formData.nome" required />

      <label for="cpf">CPF</label>
      <input
        type="text"
        id="cpf"
        v-model="formData.cpf"
        @input="validateCPF"
        placeholder="000.000.000-00"
      />
      <p v-if="cpfError" class="error-message">CPF inválido.</p>

      <label for="dataNascimento">Data de nascimento</label>
      <input
        type="date"
        id="dataNascimento"
        v-model="formData.dataNascimento"
        @change="validateDate"
      />
      <p v-if="dateError" class="error-message">Data inválida.</p>

      <label for="telefone">Telefone</label>
      <input
        type="tel"
        id="telefone"
        v-model="formData.telefone"
        placeholder="(00) 00000-0000"
      />
    </div>

    <div v-else>
      <label for="razaoSocial">Razão Social</label>
      <input
        type="text"
        id="razaoSocial"
        v-model="formData.razaoSocial"
        required
      />

      <label for="cnpj">CNPJ</label>
      <input
        type="text"
        id="cnpj"
        v-model="formData.cnpj"
        @input="validateCNPJ"
        placeholder="00.000.000/0000-00"
      />
      <p v-if="cnpjError" class="error-message">CNPJ inválido.</p>

      <label for="dataAbertura">Data de abertura</label>
      <input
        type="date"
        id="dataAbertura"
        v-model="formData.dataAbertura"
        @change="validateDate"
      />
      <p v-if="dateError" class="error-message">Data inválida.</p>

      <label for="telefone">Telefone</label>
      <input
        type="tel"
        id="telefone"
        v-model="formData.telefone"
        placeholder="(00) 00000-0000"
      />
    </div>

    <div class="button-group">
      <button class="btn-outline" @click="emit('prev')">Voltar</button>
      <button class="btn-primary" @click="emit('next')" :disabled="!isValid">
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "next", "prev"]);

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const cpfError = ref(false);
const cnpjError = ref(false);
const dateError = ref(false);

const validateCPF = () => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  cpfError.value = !cpfRegex.test(formData.value.cpf);
};

const validateCNPJ = () => {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  cnpjError.value = !cnpjRegex.test(formData.value.cnpj);
};

const validateDate = () => {
  const date = formData.value.dataNascimento || formData.value.dataAbertura;
  dateError.value = !date || isNaN(Date.parse(date));
};

const isValid = computed(() => {
  if (formData.value.tipoCadastro === "PF") {
    return (
      formData.value.nome &&
      formData.value.cpf &&
      !cpfError.value &&
      formData.value.dataNascimento &&
      !dateError.value &&
      formData.value.telefone
    );
  }
  return (
    formData.value.razaoSocial &&
    formData.value.cnpj &&
    !cnpjError.value &&
    formData.value.dataAbertura &&
    !dateError.value &&
    formData.value.telefone
  );
});

const continuar = () => {
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

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn-outline {
  background-color: white;
  color: orange;
  padding: 10px;
  border: 1px solid orange;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: orange;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:disabled {
  background-color: orange;
  cursor: not-allowed;
  opacity: 50%;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>
