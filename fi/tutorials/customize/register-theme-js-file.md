---
layout: default
title: Lisää Javascript teematiedosto (Theme.php)
parent: Kustomoi sivustoa
grand_parent: Tutoriaalit
nav_order: 2
---

# Lisää Javascript teematiedosto

Tässä ohjeessa lisätään kaksi javascript-tiedostoa sivuston &lt;body&gt; -tagin loppuun muokkaamalla `Theme.php` -tiedostoa.

## Step 0. Paikallista Theme.php, ja public-kansio

Ks. [edellinen tutoriaali](./register-theme-css-file.html#step-0-paikallista-themephp-ja-public-kansio)

## Step 1: Siirrä tai luo tiedostot public-kansioon

<span class="bg-highlight">Luo tai siirrä</span> tiedostot `${public_kansio}/some-lib.min.js` sekä `${public_kansio}/with-attrs.js`.

## Step 2: Rekisteröi tiedostot

<span class="bg-highlight">Muokkaa</span> `${site_kansio}/Theme.php` -tiedostoon tekstieditorilla:

```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\UserTheme\{UserThemeAPI, UserThemeInterface};

class Theme implements UserThemeInterface {
    /**
     * @param \Sivujetti\UserTheme\UserThemeAPI $api
     */
    public function __construct(UserThemeAPI $api) {
        if (!$api->isJsFileEnqueued("some-lib.min.js"))
            $api->enqueueJsFile("some-lib.min.js");
        $api->enqueueJsFile("with-attrs.js", [
            "data-attr" => "foo",
        ]);
    }
}

```

## Step 3: Profit

Tämän jälkeen Sivujetti sisällyttää rekisteröidyt tiedostot sivuston &lt;body&gt; -tagin loppuun esim. seuraavasti:
```html
<script src="/sivusto/public/some-lib.js?v=dc5e2a1e"></script>
<script src="/sivusto/public/with-attrs.js?v=dc5e2a1e" data-attr="foo"></script>
```

## Lisää tiedosto vain tiettyyn sivuun

ks. [edellinen ohje](./register-theme-css-file.html#lis%C3%A4%C3%A4-tiedosto-vain-tiettyyn-sivuun).

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.colorCodeMenusAndHeadings();</script>
