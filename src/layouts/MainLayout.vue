<template>
  <q-layout view="lHh Lpr lFf">
    <div class="absolute-top z-top bg-transparent">
      <q-toolbar>
        <q-space />
        <div>
          <q-list class="row items-center text-white mobile-hide">
            <q-item clickable v-ripple v-for="(item, i) in menu" :key="i" @click="onRouter(item.link)">
              <q-item-section>{{item.label}}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-toolbar>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGlobalStore } from '../stores/globalStore'

const router = useRouter()
const route = useRoute()
const global = useGlobalStore()

let contextIndex = computed(() => route.name == 'index' ? true:false)
const menu = ref([
  {
    label: 'Início',
    link: 'inicio'
  },
  {
    label: 'Catálogo',
    link: 'catalogo'
  },
  {
    label: 'Serviços',
    link: 'servicos'
  },
  {
    label: 'Contato',
    link: 'contato'
  }
])

function onRouter(item) {
  if(item == 'admin') {
    router.push({name: 'admin'})
  } else {
    setTimeout(() => {
      var scrollDiv = document.getElementById(`${item}`).offsetTop
      window.scrollTo({ top: scrollDiv, behavior: 'smooth' });
    }, 100);
  }
}


onMounted(() => {
  global.loadDoc('categorias')
  global.loadDoc('produtos')
})

</script>

<style lang="scss" scoped>
.bg-transparent {
  background-color: transparent;
}
</style>
