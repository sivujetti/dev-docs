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
    defaultRenderer: 'site:block-text-and-image',
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

Opetetaan Kuura validoimaan ja tallentamaan uudentyyppistä sisältöämme. Tee tämä muokkaamalla `<sivustonPolku>/backend/site/Site.php`:hen:

```php
...
use KuuraCms\BlockType\PropertiesBuilder;
...
    public function __construct(WebsiteAPI $api) {
        $api->registerBlockType("TextAndImage", new TextAndImageBlockType);
        /* tai
        $api->registerBlockType("TextAndImage", new class implements BlockTypeInterface {
            public function defineProperties(PropertiesBuilder $builder): \ArrayObject {
                return ...
            }
        });
        */
        ...
    }
}

final class TextAndImageBlockType implements BlockTypeInterface {
    /**
     * @inheritdoc
     */
    public function defineProperties(PropertiesBuilder $builder): \ArrayObject {
        return $builder
            ->newProperty("html", $builder::DATA_TYPE_TEXT)
            ->newProperty("imageSrc", $builder::DATA_TYPE_TEXT)
            ->getResult();
    }
}

```

Tämän jälkeen KuuraCms osaa tallentaa ja validoida muokkausapplikaatiossa luodut lohkot käyttäen `TextAndImageBlockType->defineProperties()`-metodin ohjeita.

### 2. Lisää oletustemplaatti

Luo tiedosto `<sivustonPolku>/backend/site/templates/block-text-and-image.tmpl.php`:

```php
<div style="display:flex">
    <article style="flex:1">
        <?= $props->html // allow pre-validated html ?>
    </article>
    <img style="flex:1" src="<?= $this->assetUrl("public/uploads/{$props->imageSrc}") ?>">
</div>
```

Päivitä `<sivustonPolku>/backend/site/Site.php`:

```php
...
final class Site implements UserSiteInterface {
    /**
     * @param \KuuraCms\UserSite\UserSiteAPI $api
     */
    public function __construct(UserSiteAPI $api) {
        ...
        $api->registerBlockRenderer("site:block-text-and-image");
    }
...
```

Tämän jälkeen muokkaus-applikaatiossa lisätyt sisällöt myös renderöityy oikein.

### Yhteenveto

Lisäsimme sivustoomme uuden lohkotyypin:

- Rekisteröimällä frontendin osuuden `window.sivujetti.blockTypes.register()`
    - joka mahdollistaa uuden lohkotyyppimme valinnan muokkaus-applikaatiossa
- Rekisteröimällä backendin osuudet `$userSiteApi->registerBlockType()` ja `$userSiteApi->registerBlockRenderer()`
    - joka opettaa KuuraCms:n tallentamaan ja renderöimään lohkotyyppimme sisältöä
