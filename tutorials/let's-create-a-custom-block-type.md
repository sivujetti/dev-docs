---
layout: default
title: Lohkotyypin luominen
parent: Tutoriaalit
nav_order: 1
---

# Custom-lohkotyypin luominen

Tässä tutoriaalissa opit luomaan uuden lohkotyypin.

## Frontendin osuus

Ilman frontendin osuutta sivuston ylläpitäjät eivät pystyisi lisäämään tai muokkaamaan tämän tyyppistä sisältöä muokkaus-applikaatiossa.

### 0. Lataa KuuraSDK

Todo

### 1. Luo konfiguraatiotiedosto

Luo tiedosto `<sivustonPolku>/backend/site/rollup.config.js`, ja kirjoita sen sisällöksi:

```javascript
module.exports = {
    input: 'backend/site/main.js',
    output: {
        file: 'public/my-site-bundled.js',
    }
};

```

### 2. Luo lohkoimplementaatiolle tiedosto

Luo tiedosto `<sivustonPolku>/backend/site/main.js` ja kirjoita sen sisälläksi:

```javascript
import {__} from '@kuura-commons';

class TextAndImageBlockForm extends preact.Component {
    render() {
        return <p>todo</p>;
    }
}

window.sivujetti.blockTypes.register('TextAndImage', {
    name: 'TextAndImage',
    friendlyName: __('Text and image'),
    ownPropNames: ['imageSrc'],
    initialData: {imageSrc: ""},
    defaultRenderer: 'todo',
    reRender({imageSrc}, renderChildren) {
        return `<article>` +
            'todo' +
            renderChildren() +
        '</article>';
    },
    editForm: TextAndImageBlockForm,
});

```

### 3. Transpiloi

Transpiloi stepin 2. applikaatio yhdeksi tiedostoksi sdk:ta käyttäen:

- `cd <sivustonPolku>/backend/site`
- `npm --prefix ../../ start -- --configInput backend/site/rollup.config.js`

Bundlattu tiedosto pitäisi ilmestyä rollup-configissa määriteltyyn kohteeseen (`public/my-site-bundled.js`).

### 4. Sisällytä transpiloitu tiedosto muokkaus-applikaatiosivuun

Tee tämä muokkaamalla `<sivustonPolku>/backend/site/Site.php`:hen:

```php
...
    public function __construct(UserSiteAPI $api) {
        ...
        $api->enqueueEditAppJsFile("my-site-bundled.js");
    }
...
```

Tämän jälkeen muokkaus-applikaatio sisällyttää uuden `<script>`-tagin sivuun, ja uuden lohkotyypin sisältöä pitäisi pystyä valitsemaan "Luo sisältöä" dialogin listasta uutta sisältöää luodessa.

### 6. Koodaa muokkauslomake

todo

### 7. Yhteenveto

Tässä vaiheessa uuden tyyppisiä lohkoja voi siis valita muokkaus-applikaation "Lisää sisältöä"-dialogissa, mutta niitä ei voi tallentaa: korjataan tilanne seuraavassa osiossa.

## Backendin osuus

Ilman backendin osuutta KuuraCms ei osaa:

- Validoida eikä tallentaa tämän tyyppistä sisältöä
- Renderöidä tämän tyyppistä sisältöä kuin pelkästään muokkausapplikaatiossa

### 1. Rekisteröi tyyppi

todo
