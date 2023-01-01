<template>
  <q-dialog v-model="dialogUploadPhoto" maximized >
    <q-card>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title>
          Imagens
        </q-toolbar-title>
        <q-space />
        <q-btn flat round dense icon="close" @click="fecharDialogUploadPhoto" />
      </q-toolbar>
      <div class="full-width q-pa-md">
      <q-file filled multiple label-color ="white" bg-color="accent" bottom-slots v-model="files" label="Upload de imagens" style="max-width: 400px" counter>
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
        <template v-slot:after>
          <q-btn icon="send" flat @click="uploadPhotoURL" class="cursor-pointer" />
        </template>

        <template v-slot:hint>
          Selecione imagens do seu dispositivo
        </template>
      </q-file>
      </div>
      <q-layout class="q-pa-lg ">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab :name="categoria.data.name" v-for="(categoria, i) in listaCategorias" :key="i" :label="categoria.data.label" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated >
          <q-tab-panel :name="categoria.data.name" v-for="(categoria, i) in listaCategorias" :key="i" class="row items-start q-gutter-md">

            <q-list bordered :class="{bordaVerde: item === selectImagem}" class="relative-position" v-for="(item, index) in listaPhoto" :key="index">
              <q-btn v-if="item !== selectImagem" color="negative" class="absolute-top-right z-top q-ma-xs" size="xs" round icon="close" @click="deleteImagem(item)" />
              <q-item clickable v-ripple @click="selecionarPhoto(item)" class="col-auto" >
                <div v-if="item === selectImagem" class="bg-positive absolute-top-right z-top roundIcon q-ma-xs">
                  <q-icon name="done" size="xs" color="white" />
                </div>
                <q-item-section >
                  <q-img
                    :src="item"
                    :ratio="1"
                    width="100px"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                </q-item-section>
              </q-item>
            </q-list>

          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      </q-layout>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue"
import { useGlobalStore } from '../stores/globalStore'
import { Notify, Dialog } from 'quasar'

const props = defineProps(['selectImagem', 'dialogUploadPhoto'])
const emit = defineEmits(['setDialogUploadPhoto', 'mudarImg'])

const global = useGlobalStore()
let listaCategorias = computed(() => global.listaCategorias)
let dialogUploadPhoto = computed(() => props.dialogUploadPhoto)

let tab = ref('revolver')
let files = ref(null)

let listaPhoto = computed(() => {
  switch (tab.value) {
    case 'revolver':
      return global.listaRevolver
    case 'pistola':
      return global.listaPistola
    case 'armas_longas':
      return global.listaArmasLongas
    case 'insumos':
      return global.listaInsumos
    case 'municoes':
      return global.listaMunicoes
    case 'carregador':
      return global.listaCarregador
    case 'recarga':
      return global.listaRecarga
    case 'acessorios':
      return global.listaAcessorios
    default:
      return []
  }

})

function fecharDialogUploadPhoto() {
  emit('setDialogUploadPhoto', false)
}

function selecionarPhoto(item) {
  emit("mudarImg", item);
  this.fecharDialogUploadPhoto()
}

function uploadPhotoURL(params) {

  files.value.forEach(element => {
    var value = {
      files: element,
    }
    global.uploadPhotoPost(value)
  });
  files.value = null
}

function deleteImagem(value) {

  Dialog.create({
    title: "Tem certeza?",
    message: "Ao remover esta imagem, não será possível voltar atrás.",
  })
  .onOk(() => {

      var path = value.substring(76).split("?")
      var item = path[0].replaceAll('%2F', '/')
      global.deleteImagem(item)

      Notify(
        "Imegem removida com sucesso."
      );
  })
}
</script>

<style>
  .bordaVerde {
    border: 5px solid #21BA45;
  }
  .roundIcon {
    border-radius: 100%;
    border: 1px solid #21BA45;
  }
</style>
