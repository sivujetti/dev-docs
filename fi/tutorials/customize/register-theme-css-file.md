---
layout: default
title: Lisää CSS teematiedosto (Theme.php)
parent: Kustomoi sivustoa
grand_parent: Tutoriaalit
nav_order: 1
---

# Lisää CSS teematiedosto

Tässä ohjeessa lisätään kaksi teematiedostoa sivuston &lt;head&gt; -tagiin muokkaamalla `Theme.php` -tiedostoa.

## Step 0. Paikallista Theme.php, ja public-kansio

- MAMP -tutoriaali
    - `Theme.php` sijaitsee polussa `/Applications/MAMP/htdocs/sivusto/backend/site`
    - teematiedostot sijaitsee polussa `/Applications/MAMP/htdocs/sivusto/public`
- MAMP -tutoriaali
    - `Theme.php` sijaitsee polussa `c:\xampp\htdocs\sivusto\backend\site`
    - teematiedostot sijaitsee polussa `c:\xampp\htdocs\sivusto\public`
- Docker -tutoriaali
    - `Theme.php` sijaitsee polussa `/var/www/sivujetti-backend/site`
    - teematiedostot sijaitsee polussa `/var/www/html/public`

## Step 1: Siirrä tai luo tiedostot public-kansioon

<span class="bg-highlight">Luo tai siirrä</span> tiedostot `${public_kansio}/some-css-framework.min.css` sekä `${public_kansio}/my-site-main.css`.

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
        if (!$api->isCssFileEnqueued("some-css-framework.min.css"))
            $api->enqueueCssFile("some-css-framework.min.css");
        $api->enqueueCssFile("my-site-main.css", ["data-my-attr" => "foo"]);
    }
}

```

## Step 3: Profit

Tämän jälkeen Sivujetti sisällyttää rekisteröidyt tiedostot sivuston &lt;head&gt; -tagiin esim. seuraavasti:
```html
<link href="/sivusto/public/some-css-framework.min.css?v=dc5e2a1e" rel="stylesheet">
<link href="/sivusto/public/my-site-main.css?v=dc5e2a1e" rel="stylesheet" data-my-attr="foo">
```

## Lisää tiedosto vain tiettyyn sivuun

Jos halut sisällyttää tiedoston vain esim. `/yhteys` -sivuun, rekisteröi tiedosto tapahtumakuuntelijassa; näin:

```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\Page\Entities\Page;
use Sivujetti\UserTheme\{UserThemeAPI, UserThemeInterface};

class Theme implements UserThemeInterface {
    /**
     * @param \Sivujetti\UserTheme\UserThemeAPI $api
     */
    public function __construct(UserThemeAPI $api) {
        $api->on($api::ON_PAGE_BEFORE_RENDER, function(Page $page, bool $editModeIsOn) use ($api) {
            if ($page->slug === "/yhteys") {
                $api->enqueueCssFile("special.css");
            }
        });
    }
}

```

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.colorCodeMenusAndHeadings();</script>
