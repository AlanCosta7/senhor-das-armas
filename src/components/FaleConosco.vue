<template>
  <div class="bg-primary full-width flex flex-center">
    <div class="container q-py-xl column" >
      <h2 class="text-white">Fale conosco</h2>
      <div class="q-gutter-md">
        <div class="row items-center q-gutter-md" v-for="(item, i) in listaSocial" :key="i">
          <q-img
            :src="item.img"
            :ratio="1"
            width="30px"
            spinner-color="primary"
            spinner-size="82px"
          />
          <div class="text-white text-h6">{{item.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import linkedin from '../assets/linkedin.png'
import whatsapp from '../assets/whatsapp.png'
import email from '../assets/email.png'

const listaSocial = ref([
  {
    img: facebook,
    label: '/senhordasarmas'
  },
  {
    img: instagram,
    label: '@senhordasarmas'
  },
  {
    img: linkedin,
    label: '/company/senhordasarmas/'
  },
  {
    img: whatsapp,
    label: 'Whatsapp: (21) 99611-3758'
  },
  {
    img: email,
    label: 'senhordasarmas@gmail.com'
  }
])

</script>

<style>

</style>
