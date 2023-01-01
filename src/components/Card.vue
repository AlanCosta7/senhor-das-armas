<template>
  <q-card style="width: 80vw; max-width: 300px; height: 420px ">
    <q-img
      :src="img"
      :ratio="1"
      style="width: 300px"
      spinner-color="primary"
      spinner-size="82px"
    />
    <q-card-section>
      <div class="text-subtitle2 ellipsis">{{text}}</div>
      <div v-if="(preco > 0)" class="text-h6">R${{preco}}</div>
    </q-card-section>
    <q-card-actions>
      <q-btn color="primary" class="full-width" push label="Comprar" @click="onRouter(text)" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { openURL } from 'quasar'
const props = defineProps(['img', 'text', 'preco'])

function onRouter(item) {
  let tel = '21996113758'
  let info = `Tenho interesse no produto ${item}`
  openURL(`https://api.whatsapp.com/send?phone=55${tel}&text=${info}`);
}

</script>

<style>

</style>
