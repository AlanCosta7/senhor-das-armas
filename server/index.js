const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();
const { uid } = require('uid');

const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  let listaURL = [
    'https://www.mtsarmas.com.br/pistola/beretta',
    'https://www.mtsarmas.com.br/pistola/springfield',
    'https://www.mtsarmas.com.br/pistola/stoeger',
    'https://www.mtsarmas.com.br/pistola/sig-sauer',
    'https://www.mtsarmas.com.br/pistola/ruger1',
    'https://www.mtsarmas.com.br/pistola/cz',
    'https://www.mtsarmas.com.br/pistola/pistola-arex1',
    'https://www.mtsarmas.com.br/armas-longas/espingarda/cbc',
    'https://www.mtsarmas.com.br/armas-longas/espingarda/boito',
    'https://www.mtsarmas.com.br/armas-longas/espingarda/khan-arms',
    'https://www.mtsarmas.com.br/armas-longas/espingarda/sa-ka',
    'https://www.mtsarmas.com.br/armas-longas/carabina-e-rifles/taurus2',
    'https://www.mtsarmas.com.br/armas-longas/carabina-e-rifles/cbc1',
    'https://www.mtsarmas.com.br/armas-longas/carabina-e-rifles/puma',
    'https://www.mtsarmas.com.br/armas-longas/carabina-e-rifles/ruger',
    'https://www.mtsarmas.com.br/armas-longas/carabina-e-rifles/springfield1',
    'https://www.mtsarmas.com.br/armas-longas/carabina-e-rifles/cz1',
    'https://www.mtsarmas.com.br/armas-longas/carabina-e-rifles/diamondback',
    'https://www.mtsarmas.com.br/insumos/espoleta',
    'https://www.mtsarmas.com.br/insumos/estojo',
    'https://www.mtsarmas.com.br/insumos/projeteis',
    'https://www.mtsarmas.com.br/municoes/nacionais/22lr1',
    'https://www.mtsarmas.com.br/municoes/nacionais/380-auto1',
    'https://www.mtsarmas.com.br/municoes/nacionais/9mm-9x19',
    'https://www.mtsarmas.com.br/municoes/nacionais/40sw',
    'https://www.mtsarmas.com.br/municoes/nacionais/10mm1',
    'https://www.mtsarmas.com.br/municoes/nacionais/45-acp1',
    'https://www.mtsarmas.com.br/municoes/nacionais/38-spl1',
    'https://www.mtsarmas.com.br/municoes/nacionais/357-mag1',
    'https://www.mtsarmas.com.br/municoes/nacionais/12ga',
    'https://www.mtsarmas.com.br/municoes/nacionais/22wmr',
    'https://www.mtsarmas.com.br/municoes/nacionais/restritos',
    'https://www.mtsarmas.com.br/municoes/importadas/22wmr1',
    'https://www.mtsarmas.com.br/municoes/importadas/22lr',
    'https://www.mtsarmas.com.br/municoes/importadas/17-hmr',
    'https://www.mtsarmas.com.br/municoes/importadas/380-auto',
    'https://www.mtsarmas.com.br/municoes/importadas/38-spl',
    'https://www.mtsarmas.com.br/municoes/importadas/9x19-9mm',
    'https://www.mtsarmas.com.br/municoes/importadas/357-mag',
    'https://www.mtsarmas.com.br/municoes/importadas/40-sw',
    'https://www.mtsarmas.com.br/municoes/importadas/10mm',
    'https://www.mtsarmas.com.br/municoes/importadas/45-acp',
    'https://www.mtsarmas.com.br/municoes/importadas/12ga1',
    'https://www.mtsarmas.com.br/municoes/importadas/restritos1/',
    'https://www.mtsarmas.com.br/carregadores/magpul/',
    'https://www.mtsarmas.com.br/carregadores/tanfoglio1/',
    'https://www.mtsarmas.com.br/acessorios1/capas/',
    'https://www.mtsarmas.com.br/acessorios1/snap-caps/',
    'https://www.mtsarmas.com.br/acessorios1/produtos-para-limpeza',
    'https://www.mtsarmas.com.br/acessorios1/bumpers',
    'https://www.mtsarmas.com.br/acessorios1/handguard',
    'https://www.mtsarmas.com.br/recarga/dies',
  ]

  for (let index = 0; index < listaURL.length; index++) {

    const url = listaURL[index]
    await page.goto(url);
    let tag = true

    while (tag) {
      try {

        await sleep(1000);
        await page.click('.js-load-more-btn')
      } catch (error) {
        tag = false
      }
    }

    const myList = await page.evaluate((marca, list) => {
      let nodeList = document.querySelectorAll('.span12 .m-top-none-xs')
      let lista = []

      nodeList.forEach((element) => {

        const url = element.baseURI
        let list = url.split('/')
        let marca = list[list.length-2]

        let val = {
          img: element.children[0].children[0].children[0].currentSrc,
          text: element.innerText.split('\nR$')[0],
          preco: 0,
          marca: marca,
          categoria: list[3]
        }
        lista.push(val)
      });

      return lista

    })

    console.log(myList)

    for (let i = 0; i < myList.length; i++) {
      const element = myList[i];

          // Get a new write batch
      const batch = firestore.batch();

      let myUid = uid(16)

      // // Set the value of 'NYC'
      const nycRef = firestore.collection('produtos').doc(myUid)
      batch.set(nycRef, element);

      // // Commit the batch
      try {

        console.log('try teste', i, element)
        batch.commit()
      } catch (error) {
        console.log('Error', error)
      }

    }

  }
  browser.close();

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

run()
