<template>
  <div class="step-container">
    <div v-if="apiMessage">
      <MessageComponent :message="apiMessage.text" :type="apiMessage.type" />
    </div>
    <p class="step-info">Etapa <span class="highlight">4</span> de 4</p>
    <h1>Revise suas informações</h1>

    <label for="email">Endereço de e-mail</label>
    <input
      type="email"
      id="email"
      v-model="formData.email"
      @blur="markTouched('email')"
      :disabled="userRegistered"
      required
    />
    <MessageComponent v-if="emailError" :message="'E-mail inválido.'" />

    <div v-if="formData.tipoCadastro === 'PF'" class="d-flex-column">
      <label for="nome">Nome</label>
      <input
        type="text"
        id="nome"
        v-model="formData.nome"
        @blur="markTouched('nome')"
        :disabled="userRegistered"
        required
      />

      <label for="cpf">CPF</label>
      <input
        type="text"
        id="cpf"
        v-model="formData.cpf"
        v-mask="'###.###.###-##'"
        @blur="markTouched('cpf')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="cpfError" :message="'CPF inválido.'" />

      <label for="dataNascimento">Data de nascimento</label>
      <input
        type="text"
        id="dataNascimento"
        v-model="formData.dataNascimento"
        v-mask="'##/##/####'"
        @blur="markTouched('date')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="dateError" :message="'Data inválida.'" />

      <label for="telefone">Telefone</label>
      <input
        type="tel"
        id="telefone"
        v-model="formData.telefone"
        v-mask="'(##) #####-####'"
        @blur="markTouched('phone')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="phoneError" :message="'Telefone inválido.'" />

      <label for="senha">Senha</label>
      <input
        type="password"
        id="senha"
        v-model="formData.senha"
        @blur="markTouched('senha')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="passwordError" :message="'Senha inválida.'" />
    </div>

    <div v-else class="d-flex-column">
      <label for="razaoSocial">Razão Social</label>
      <input
        type="text"
        id="razaoSocial"
        v-model="formData.razaoSocial"
        @blur="markTouched('razaoSocial')"
        :disabled="userRegistered"
        required
      />

      <label for="cnpj">CNPJ</label>
      <input
        type="text"
        id="cnpj"
        v-model="formData.cnpj"
        v-mask="'##.###.###/####-##'"
        @blur="markTouched('cnpj')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="cnpjError" :message="'CNPJ inválido.'" />

      <label for="dataAbertura">Data de abertura</label>
      <input
        type="text"
        id="dataAbertura"
        v-model="formData.dataAbertura"
        v-mask="'##/##/####'"
        @blur="markTouched('date')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="dateError" :message="'Data inválida.'" />

      <label for="telefone">Telefone</label>
      <input
        type="tel"
        id="telefone"
        v-model="formData.telefone"
        v-mask="'(##) #####-####'"
        @blur="markTouched('phone')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="phoneError" :message="'Telefone inválido.'" />

      <label for="senha">Senha</label>
      <input
        type="password"
        id="senha"
        v-model="formData.senha"
        @blur="markTouched('senha')"
        :disabled="userRegistered"
        required
      />
      <MessageComponent v-if="passwordError" :message="'Senha inválida.'" />
    </div>

    <div class="button-group">
      <Button v-if="!userRegistered" :variant="'outline'" :size="'medium'" @click="emit('prev')">
        Voltar
      </Button>
      <Button v-if="!userRegistered"
        :variant="'fill'"
        :size="'medium'"
        @click="submitForm"
        :disabled="!isValid || isSubmitting"
      >
        {{ isSubmitting ? "Cadastrando..." : "Cadastrar" }}
      </Button>
      <Button v-else :variant="'fill'" :size="'large'" @click="registerNewUser">
        Cadastrar novo usuário
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  validateEmail,
  validateCPF,
  validateCNPJ,
  validateDate,
  validatePhone,
  validatePassword,
} from "../validators";
import Button from "../components/Button.vue";
import MessageComponent from "../components/MessageComponent.vue";
import { registerUser } from "../services/RegistrationService";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "prev", "submit", "newUser"]);

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const touched = ref({
  email: false,
  nome: false,
  cpf: false,
  cnpj: false,
  date: false,
  phone: false,
  senha: false,
  razaoSocial: false,
});

const isSubmitting = ref(false);
const apiMessage = ref(null);
const userRegistered = ref(false);

const markTouched = (field) => {
  touched.value[field] = true;
};

const emailError = computed(
  () => touched.value.email && !validateEmail(formData.value.email)
);
const cpfError = computed(
  () => touched.value.cpf && !validateCPF(formData.value.cpf)
);
const cnpjError = computed(
  () => touched.value.cnpj && !validateCNPJ(formData.value.cnpj)
);
const dateError = computed(
  () =>
    touched.value.date &&
    !validateDate(formData.value.dataNascimento || formData.value.dataAbertura)
);
const phoneError = computed(
  () => touched.value.phone && !validatePhone(formData.value.telefone)
);
const passwordError = computed(
  () => touched.value.senha && !validatePassword(formData.value.senha)
);

const isValid = computed(() => {
  if (!formData.value.email || !formData.value.senha) return false;

  if (formData.value.tipoCadastro === "PF") {
    return (
      formData.value.nome &&
      validateCPF(formData.value.cpf) &&
      validateDate(formData.value.dataNascimento) &&
      validatePhone(formData.value.telefone) &&
      validatePassword(formData.value.senha)
    );
  }

  return (
    formData.value.razaoSocial &&
    validateCNPJ(formData.value.cnpj) &&
    validateDate(formData.value.dataAbertura) &&
    validatePhone(formData.value.telefone) &&
    validatePassword(formData.value.senha)
  );
});

const submitForm = async () => {
  touched.value.email = true;
  touched.value.nome = true;
  touched.value.cpf = true;
  touched.value.cnpj = true;
  touched.value.date = true;
  touched.value.phone = true;
  touched.value.senha = true;
  touched.value.razaoSocial = true;

  if (!isValid.value) return;

  isSubmitting.value = true;
  apiMessage.value = null;

  const result = await registerUser(formData.value);

  if (result.success) {
    apiMessage.value = { type: "success", text: result.message };
    userRegistered.value = true;
  } else {
    apiMessage.value = { type: "error", text: result.message };
  }

  isSubmitting.value = false;
};

const registerNewUser = () => {
  emit("update:modelValue", {});
  emit("newUser");
};
</script>

<style scoped>

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

</style>