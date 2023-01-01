<template>
  <q-page class="row items-center justify-center">
    <Header id="inicio" />
    <ListaServicos id="servicos" />
    <ListaProdutos id="catalogo" />
    <FaleConosco id="contato" />
  </q-page>
</template>

<script setup>
import { defineComponent } from 'vue'
import Header from '../components/Header.vue';
import ListaProdutos from '../components/ListaProdutos.vue';
import ListaServicos from '../components/ListaServicos.vue';
import FaleConosco from '../components/FaleConosco.vue';


</script>
