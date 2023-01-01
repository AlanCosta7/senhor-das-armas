<template>
  <div>
    <q-responsive class="responsive" style="width: 100vw; height:100vh">
      <q-carousel
        animated
        v-model="slide"
        :navigation="!mobile"
        infinite
        :autoplay="autoplay"
      >
          <q-carousel-slide class="dimmed" v-for="(item, i) in banner" :key="i" :name="i" :img-src="item.img" >
            <div class="column fit flex flex-center text-white text-uppercase" >
              <div class="z-top container">
                <div class="absolute-center" style="top: 200px">
                  <q-img width="400px" :ratio="20/10" src="https://firebasestorage.googleapis.com/v0/b/senhor-das-armas.appspot.com/o/logo%2Fthumbs%2FLOGOS-02_800x800.webp?alt=media&token=fbd57866-b490-42ca-b7e6-2a853f7fdc82" alt="logo" />
                </div>
                <div style="margin-top: 120px">
                  <h2 class="text-left text-weight-bolder q-ma-none mobile-hide">{{item.title}}</h2>
                  <h3 class="text-left text-weight-bolder q-ma-none mobile-only">{{item.title}}</h3>
                  <h4 class="text-left q-pa-none q-ma-none mobile-hide">{{item.descricao}}</h4>
                  <h5 class="text-left q-pa-none q-ma-none mobile-only">{{item.descricao}}</h5>
                  <div class="q-my-xl q-gutter-md">
                    <q-btn color="positive" rounded icon="phone" label="Fale conosco" @click="faleconoso('zap')" />
                    <q-btn color="positive" rounded icon="email" label="Email" @click="faleconoso('email')" />
                  </div>
                </div>
              </div>
            </div>
          </q-carousel-slide>
      </q-carousel>
    </q-responsive>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { openURL, Platform } from 'quasar'
import { useGlobalStore } from '../stores/globalStore'

const global = useGlobalStore()

let slide = ref(0)
let autoplay = ref(true)

let banner = computed(() => global.banner)

let mobile = computed(() => Platform?.is?.mobile)

function faleconoso(item) {
  if(item == 'zap') {
    let tel = '21996113758'
    openURL(`https://api.whatsapp.com/send?phone=55${tel}`);
  } else {
    openURL('mailto:senhordasarmas@gmail.com')
  }
}

</script>

<style scoped>
  .responsive {
    margin-top: 0px;
  }
</style>
