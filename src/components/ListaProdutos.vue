<template>
  <div class="container q-py-xl">
    <div>
      <q-separator spaced inset />
      <q-list class="row items-center justify-around text-black">
        <template v-for="(item, i) in menu" :key="i">
          <q-item clickable v-ripple @click="onRouter(item.link)">
            <q-item-section :class="item.link == categoria ? 'text-bold text-primary':'' " >{{item.label}}</q-item-section>
          </q-item>
        </template>
      </q-list>
      <q-separator spaced inset />
    </div>
    <h2>Catálogo</h2>
    <div class="row items-center q-gutter-md justify-center">
      <q-list class="col-md-3 col-sm-12" v-for="(item, i) in result" :key="i">

        <q-infinite-scroll :offset="500" class="row justify-center" >
          <Card class="col-auto" :img="item.data.img" :text="item.data.text" :preco="item.data.preco" />
        </q-infinite-scroll>

      </q-list>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGlobalStore } from '../stores/globalStore'
import Card from '../components/Card.vue'
import { Loading } from 'quasar';

const global = useGlobalStore()
let listaProduto = computed(() => global.listaProduto)
let result = ref([])
let categoria = ref('revolver')

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
    link: 'carregadores'
  },
  {
    label: 'Recarga',
    link: 'recarga'
  },
  {
    label: 'Acessórios',
    link: 'acessorios1'
  },
])

async function onRouter(item) {
  categoria.value = item
  result.value = await global.getProdutos(item)
}

onMounted(() => {
  Loading.show()
  setTimeout(() => {

    if(listaProduto.value.length) {
      onRouter('revolver')
    }
    Loading.hide()
  }, 2000);
})

</script>

<style>

</style>
