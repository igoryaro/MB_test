<template>
  <div>
    <h2>Passo 4: Revisão</h2>
    <pre>{{ modelValue }}</pre>
    <button @click="$emit('prev')">Voltar</button>
    <button @click="$emit('submit')">Cadastrar</button>
  </div>
</template>
