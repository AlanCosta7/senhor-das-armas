import { defineStore } from 'pinia';
import { $firestore } from '../boot/firebase'
import { collection, query, where, orderBy, limit, getDocs, startAfter, doc, updateDoc, addDoc } from "firebase/firestore";
import { Loading } from 'quasar'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    uid: '',
    next: 1,
    lastVisible: null,
    loading: false,
    listaRevolver: [],
    listaPistola: [],
    listaArmasLongas: [],
    listaInsumos: [],
    listaMunicoes: [],
    listaCarregador: [],
    listaRecarga: [],
    listaAcessorios: [],
    banner: [
      {
        title: 'Despachante de armas',
        descricao: 'Compre a sua',
        img: 'https://firebasestorage.googleapis.com/v0/b/senhor-das-armas.appspot.com/o/site%2Fthumbs%2Fpexels-photo-864987_1440x1440.webp?alt=media&token=d88d8970-d488-4ae0-97b9-0fc6096f8206'
      },
      {
        title: 'Despachante de armas',
        descricao: 'Compre a sua',
        img: 'https://firebasestorage.googleapis.com/v0/b/senhor-das-armas.appspot.com/o/site%2Fthumbs%2Fpexels-karolina-grabowska-5202419_1440x1440.webp?alt=media&token=cad918ce-94d8-4adb-9a3d-5b99ef7400ce'
      },
      {
        title: 'Despachante de armas',
        descricao: 'Compre a sua',
        img: 'https://firebasestorage.googleapis.com/v0/b/senhor-das-armas.appspot.com/o/site%2Fthumbs%2Fpexels-enrico-ha%CC%88nel-5462022_1440x1440.webp?alt=media&token=3fdf6e11-e66c-488b-91e9-4d278710501b'
      }
    ],
    listaProduto: [],
    listaServicos: [
      {
        title: 'Atirador desportivo',
        link: 'atirador-desportivo',
        img: 'https://firebasestorage.googleapis.com/v0/b/senhor-das-armas.appspot.com/o/servico%2Fthumbs%2F1%20(1)_800x800.webp?alt=media&token=dde7538f-fa14-4694-b1cc-3013054241af'
      },
      {
        title: 'Colecionador',
        link: 'colecionador',
        img: 'https://firebasestorage.googleapis.com/v0/b/senhor-das-armas.appspot.com/o/servico%2Fthumbs%2FCaptura%20de%20Tela%202022-12-02%20a%CC%80s%2020.35.34_800x800.webp?alt=media&token=e66df986-8e44-4067-8644-b245e70f462d'
      },
      {
        title: 'Caçador',
        link: 'cacador',
        img: 'https://firebasestorage.googleapis.com/v0/b/senhor-das-armas.appspot.com/o/servico%2Fthumbs%2Fpexels-elle-hughes-2954926_800x800.webp?alt=media&token=51709225-0453-434d-bca9-fabb81646947'
      }
    ],
    listaCategorias: []
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async uploadPhotoPost(payload) {
      const files = payload.files
      const type = payload.type

      if (!files) {
        return null
      } else {
        const idRef = uid()
        const ref = `/photoURL/${type}/${idRef}`

        const projetoRef = $storage.ref().child(ref)
        const uploadTask = projetoRef.put(files)

        uploadTask.on(
          "state_changed",
          function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            Loading.show({
              message: `<h3>Estamos salvando suas <b>imagens</b></h3>`
            })

            if(progress === 100) {
              setTimeout(async() => {
                Loading.hide()

                await this.listarImagens(type)
              }, 2000);
            }

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                break;
            }
          },
          function(error) {
            // Handle unsuccessful uploads
            console.log(error);
          },
        );
        return uploadTask;
      }
    },
    async listarImagens(type) {

      // Create a reference under which you want to list
      var listRef = $storage.ref().child(`photoURL/${type}/thumbs`);
      // Fetch the first page of 100.
      var firstPage = await listRef.list({ maxResults: 1000});

      var list = []
      firstPage.items.forEach(element => {
        var size = element.name.split("x").pop();
        if (size === '400') {
          const storageRef = $storage.ref(element.fullPath)
          storageRef.getDownloadURL().then(function(downloadURL) {
            list.push(downloadURL)
          })
        }
      });

      switch (type) {
        case 'revolver':
          this.listaRevolver = list
          break
        case 'pistola':
          this.listaPistola = list
          break
        case 'armas_longas':
          this.listaArmasLongas = list
          break
        case 'insumos':
          this.listaInsumos = list
          break
        case 'municoes':
          this.listaMunicoes = list
          break
        case 'carregador':
          this.listaCarregador = list
          break
        case 'recarga':
          this.listaRecarga = list
          break
        case 'acessorios':
          this.listaAcessorios = list
          break
        default:
          break
      }

      if (firstPage.nextPageToken) {
        var secondPage = await listRef.list({
          maxResults: 100,
          pageToken: firstPage.nextPageToken,
        });
        // processItems(secondPage.items)
        // processPrefixes(secondPage.prefixes)
      }

      return list

    },
    async deleteImagem(payload) {

      var imageRef = $storage.ref().child(payload)

      imageRef.delete().then(function() {

        // console.log('deletado')
      }).catch(function(error) {
        console.log(error)
      });
    },
    async saveDoc(value) {
      await addDoc(collection($firestore, value.collection), value.data);
    },
    async updateDoc(value) {
      await updateDoc(collection($firestore, value.collection, value.id), value.data);
    },
    async loadDoc(item) {

      console.log('loadDoc', item)
      const querySnapshot = await getDocs(collection($firestore, item));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if(item == 'categorias') {
          this.listaCategorias = []

          this.listaCategorias.push({
            id: doc.id,
            data: doc.data()
          })
        } else if('produtos') {
          this.listaProduto.push({
            id: doc.id,
            data: doc.data()
          })
        }
      });

      console.log('listaProduto', this.listaProduto)

    },
    getProdutos(item) {
      console.log('getProdutos', item)
      return this.listaProduto.filter(v => v.data.categoria == item)
    }
  },
});
