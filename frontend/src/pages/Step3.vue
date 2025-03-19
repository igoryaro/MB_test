<template>
  <div class="step-container">
    <p class="step-info">Etapa <span class="highlight">3</span> de 4</p>
    <h1>Senha de acesso</h1>

    <label for="senha">Sua senha</label>
    <input type="password" id="senha" v-model="formData.senha" required />

    <p v-if="senhaError" class="error-message">A senha é obrigatória.</p>

    <div class="button-group">
      <Button :variant="'fill'" :size="'medium'" @click="emit('prev')"
        >Voltar</Button
      >
      <Button
        :variant="'fill'"
        :size="'medium'"
        @click="continuar"
        :disabled="!formData.senha"
      >
        Continuar
      </Button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from "vue";
import Button from "../components/Button.vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "next", "prev"]);

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const senhaError = ref(false);

const continuar = () => {
  if (!formData.value.senha) {
    senhaError.value = true;
  } else {
    senhaError.value = false;
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

.error-message {
  color: red;
  font-size: 12px;
}
</style>
