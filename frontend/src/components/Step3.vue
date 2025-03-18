<template>
  <div>
    <h2>Passo 3: Criar Senha</h2>
    <input
      type="password"
      placeholder="Senha"
      @input="updateField('senha', $event.target.value)"
    />
    <button @click="$emit('prev')">Voltar</button>
    <button @click="$emit('next')">Continuar</button>
  </div>
</template>
