<template>
  <div class="container q-py-xl">

    <h2>Serviços</h2>
    <h6>Faça todo o processo dentro da legalidade!</h6>

    <div class="row items-center q-gutter-md justify-center">
      <q-list class="col-xs-12 col-md-3 col-sm-12" v-for="(item, i) in listaServicos" :key="i">
        <CardServicos class="col-auto" :title="item.title" :link="item.link" :img="item.img" />
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGlobalStore } from '../stores/globalStore'
import CardServicos from '../components/CardServicos.vue'

const global = useGlobalStore()
let listaServicos = computed(() => global.listaServicos)
let next = computed(() => global.next)

let filter = ref(null)
let order = ref('preco')

let menu = ref([
  {
    label: 'Revolver',
    link: 'revolver'
  },
  {
    label: 'Pistola',
    link: 'pistola'
  },
  {
    label: 'Armas longas',
    link: 'armas-longas'
  },
  {
    label: 'Insumos',
    link: 'insumos'
  },
  {
    label: 'Munições',
    link: 'municoes'
  },
  {
    label: 'Carregador',
    link: 'carregador'
  },
  {
    label: 'Recarga',
    link: 'recarga'
  },
  {
    label: 'Acessórios',
    link: 'acessorios'
  },
])

function onRouter(item) {
  filter.value = item
  global.getProdutos(filter.value, order.value)
}

</script>

<style>

</style>
