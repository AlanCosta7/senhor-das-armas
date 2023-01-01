<template>
  <q-card @click="onRouter(title)" class="cursor-pointer">
    <q-img
      :src="img"
      :ratio="1"
      spinner-color="primary"
      spinner-size="82px"
    >
      <div class="absolute-full text-subtitle2 flex flex-center">
        <h6 class="text-uppercase text-center">Armas para {{title}}</h6>
      </div>
    </q-img>
    <q-card-section>
      <div class="text-weight-thin text-uppercase	text-center">Como funciona?</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { openURL } from 'quasar'
const props = defineProps(['title', 'link', 'img'])

function onRouter(item) {
  let tel = '21996113758'
  let info = `Tenho interesse no serviço de armas para ${item}`
  openURL(`https://api.whatsapp.com/send?phone=55${tel}&text=${info}`);
}
</script>
