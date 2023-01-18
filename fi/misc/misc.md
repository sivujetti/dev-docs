---
layout: default
title: Misc
nav_order: 6
---

# Misc

...
{: .fs-6 .fw-300 }

## Miten mutatoin sivua renderöidessä?

Jos haluat muuttaa sivun sisältöä ohjelmallisesti (esim. järjestää `Listaus`-sisällön sivujen järjestystä jonkin tietyn logiikan mukaan) renderöidessä, voit tehdä sen `ON_PAGE_BEFORE_RENDER`-eventissä [Site](../api/user-site/sivujetti_user-site_user-site-api.html)-luokassa:

```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\Block\BlockTree;
use Sivujetti\Block\Entities\Block;
use Sivujetti\Page\Entities\Page;
use Sivujetti\UserSite\{UserSiteAPI, UserSiteInterface};

class Site implements UserSiteInterface {
    /**
     * @param \Sivujetti\UserSite\UserSiteAPI $api
     */
    public function __construct(UserSiteAPI $api) {
        // ...
        $api->on($api::ON_PAGE_BEFORE_RENDER, function(Page $page) {
            if ($page->slug !== "/some-page")
                return; // ei sivu jonka sisältöä halutaan muokata

            $someListing = BlockTree::findBlock($page->blocks, fn($b) => $b->type === Block::TYPE_LISTING);
            if (!$someListing)
                return; // "/some-page":sta ei löytynyt yhtään Listaus -sisältölohkoa

            // Tämä esimerkki siirtää listauksen ensimmäisen sivun aina viimeiseksi
            $first = $someListing->__pages[0];
            $allButFirst = array_slice($someListing->__pages, 1);
            $someListing->__pages = [...$allButFirst, $first];
        });
    }
}

```

## Miten muutan sivun &lt;head&gt;-tagin sisältöä renderöidessä?

Näin:

```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\UserSite\{UserSiteAPI, UserSiteInterface};

class Site implements UserSiteInterface {
    /**
     * @param \Sivujetti\UserSite\UserSiteAPI $api
     */
    public function __construct(UserSiteAPI $api) {
        // ...
        $api->filter("sivujetti:webPageGeneratedHeadHtml", fn(string $head) => str_replace(
            "</title>",
            "</title>\n    <meta name=\"robots\" content=\"noindex, nofollow, nosnippet, noarchive\">",
            $head
        ));
    }
}

```

## Miten lisään custom-templaatin listaussisällölle?

1. Uploadaa tiedosto `${sivustonPolkuPalvelimella}site/templates/` kansioon palvelimella
1. Rekisteröi edellisen stepin tiedosto `Site`-luokassa

### Step 1:

Uppaa tiedosto `${sivustonPolkuPalvelimella}site/templates/block-listing-jokin-nimi.tmpl.php` (esim. `/var/www/sivujetti-backend/site/templates/block-listing-links-only.tmpl.php`) ja kirjoita sen sisälläksi:

```php
<div
    class="j-Listing<?= $props->styleClasses ? " {$this->escAttr($props->styleClasses)}" : "" ?>"
    data-block-type="Listing"
    data-block="<?= $props->id ?>">
    <ul>
    <?php if ($props->__pages ?? null): ?>
        <?php foreach ($props->__pages as $page): ?>
        <li class="list-item list-item-<?= $page->slug ?>">
            <a href="<?= $this->url($page->slug) ?>">
                <?= $this->e($page->title) ?>
            </a>
        </li>
        <?php endforeach; ?>
    <?php else: ?>
        <li><p><?= $this->__("No %s found.", strtolower($props->__pageType->friendlyNamePlural)) ?></p></li>
    <?php endif; ?>
    </ul>
    <?= $this->renderChildren($props); // mikäli tällä listaussisällöllä on lapsisisältöä ?>
</div>
```

### Step 2:
```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\UserSite\{UserSiteAPI, UserSiteInterface};

class Site implements UserSiteInterface {
    /**
     * @param \Sivujetti\UserSite\UserSiteAPI $api
     */
    public function __construct(UserSiteAPI $api) {
        $api->registerBlockRenderer("block-listing-jokin-nimi", for: "Pages");
        ...
    }
}

```

## I_LIKE_TES

:)

```diff
 
 define("SIVUJETTI_INDEX_PATH", str_replace("\\", "/", __DIR__) . "/");
 define("SIVUJETTI_BACKEND_PATH", SIVUJETTI_INDEX_PATH . "backend/");
 define("SIVUJETTI_SITE_PATH", SIVUJETTI_BACKEND_PATH . "site/");
 define("SIVUJETTI_PLUGINS_PATH", SIVUJETTI_BACKEND_PATH . "plugins/");
+define("I_LIKE_TES", 1);
 
 // Do not edit below this line -------------------------------------------------
 
 $config = require "config.php";
 $loader = require SIVUJETTI_BACKEND_PATH . "vendor/autoload.php";

```