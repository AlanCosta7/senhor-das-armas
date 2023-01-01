<template>
  <div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="setCategoria" />
      </q-page-sticky>
      <div>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab @click="onRouter(categoria.data.name)" :name="categoria.data.name" v-for="(categoria, i) in listaCategorias" :key="i" :label="categoria.data.label" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated >
          <q-tab-panel :name="categoria.data.name" v-for="(categoria, i) in listaCategorias" :key="i" class="row items-start q-gutter-md">
            <q-list v-for="(produto, index) in filterListaCategorias" :key="index">
              <q-infinite-scroll @load="onLoad" :offset="500" class="row justify-center" >
                <q-card style="width: 100vw; max-width: 300px">
                  <q-img
                    alt="imagem"
                    :ratio="1"
                    style="width: 100vw; max-width: 300px"
                    spinner-color="primary"
                    spinner-size="82px"
                    :src="produto.data.img"
                    @click="selectPhoto"
                    class="cursor-pointer"
                  >
                    <template v-slot:error>
                      <div
                        class="absolute-full flex flex-center bg-negative text-white"
                      >Selecione uma imagem</div>
                    </template>
                  </q-img>

                  <q-card-section class="q-gutter-md">
                    <div class="text-subtitle2">
                      <q-input v-model="produto.data.title" outlined type="text" label="Nome do produto" />
                    </div>
                    <div class="text-h6">
                      <q-input v-model="produto.data.preco" outlined type="text" label="Preço do produto" />
                    </div>
                  </q-card-section>
                  <q-card-actions>
                    <q-btn icon="done" color="primary" @click="salvarProduto(produto)" />
                    <q-btn icon="content_copy" color="primary" @click="copiarProduto(produto)" />
                  </q-card-actions>
                </q-card>
                <template class="col-12" v-slot:loading>
                  <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px" />
                  </div>
                </template>
              </q-infinite-scroll>
            </q-list>

          </q-tab-panel>
        </q-tab-panels>
      </div>
    <UploadPhoto class="z-top" :selectImagem="selectImagem" :dialogUploadPhoto="dialogUploadPhoto" @setDialogUploadPhoto="setDialogUploadPhoto" @mudarImg="mudarImg" />

    <q-dialog class="z-top" v-model="isCategoria" maximized>
      <q-card>
        <q-toolbar class="bg-black text-white">
          <q-toolbar-title>
            Categorias
          </q-toolbar-title>
          <q-btn flat round dense icon="close" @click="setCategoria" />
        </q-toolbar>

        <q-card>
          <q-card-section>
            <div>
              <q-input v-model="titleCategoria" outlined type="text" label="Label" />
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat label="Criar categoria" @click="criarCategoria" />
          </q-card-actions>
        </q-card>

        <q-list bordered>
          <q-item clickable v-ripple v-for="(categoria, i) in listaCategorias" :key="i">
            <q-item-section>{{categoria.data.label}}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import UploadPhoto from '../components/upload-photo.vue'
import { ref, computed } from "vue"
import { useGlobalStore } from '../stores/globalStore'

const global = useGlobalStore()
let next = computed(() => global.next)

let listaCategorias = computed(() => global.listaCategorias)
let filterListaCategorias = computed(() => {
  let listaProduto = global.listaProduto.filter(v => v.data.categoria === tab.value) || []
  return listaProduto
})
let dialogUploadPhoto = ref(false)
let selectImagem = ref('./')
let filePhotoURL = ref(null)
let title = ref('')
let titleCategoria = ref('')
let preco = ref(0)
let isCategoria = ref(false)
let tab = ref('revolver')
let order = ref('preco')

function salvar() {
  global.salvarProduto({
    img: selectImagem.value,
    title: title.value,
    preco: preco.value,
    categoria: tab.value
  })
}

function salvarProduto(item) {
  let val = {
    collection: 'produtos',
    data: {
      id: item.id,
      title: item.data.title,
      preco: item.data.preco,
      img: item.data.img
    }
  }
  global.updateDoc(val)
}

function copiarProduto(item) {
  let val = {
    collection: 'produtos',
    data: {
      categoria: item.data.categoria,
      title: item.data.title,
      preco: item.data.preco,
      img: item.data.img
    }
  }
  global.saveDoc(val)
}

function setCategoria() {
  isCategoria.value = !isCategoria.value
}

function mudarImg(item) {
  selectImagem.value = item
}

function setDialogUploadPhoto(item) {
  dialogUploadPhoto.value = item
}

function selectPhoto() {
  dialogUploadPhoto.value = true
}

function criarCategoria() {
  let title = titleCategoria.value

  var needle = title.toLowerCase().replace(/ /g, "")
  const parsed = needle.normalize("NFD").replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')

  let val = {
    collection: 'categorias',
    data: {
      label: title,
      name: parsed
    }
  }
  global.saveDoc(val)
}

function onLoad(index, done) {
  global.getProdutos(tab.value, order.value)
  if(next.value > 0) {
    setTimeout(() => {
      done()
    }, 3000);
  } else {
    done({stop: true})
  }
}

function onRouter(item) {
  global.getProdutos(item, order.value)
}

</script>

