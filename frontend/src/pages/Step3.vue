<template>
  <div class="step-container">
    <p class="step-info">Etapa <span class="highlight">3</span> de 4</p>
    <h1>Senha de acesso</h1>

    <label for="senha">Sua senha</label>
    <input type="password" id="senha" v-model="formData.senha" required />

    <ErrorMessage v-if="senhaError" :message="'A senha é obrigatória.'" />

    <div class="button-group">
      <Button :variant="'outline'" :size="'medium'" @click="emit('prev')"
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
import { computed, ref } from "vue";
import Button from "../components/Button.vue";
import ErrorMessage from "../components/ErrorMessage.vue";

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

.step-info {
  font-size: 14px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

</style>
