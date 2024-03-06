---
layout: default
title: Misc
nav_order: 6
---

# Misc

...

## Kuinka mutatoin sivun sisältöä backendissä?

Jos haluat muuttaa sivun sisältöä ohjelmallisesti backendissä ennen [renderöintiä](https://github.com/sivujetti/sivujetti/blob/d22a947a09ecc0473fb4de37a88770e9674645e8/backend/sivujetti/src/Page/PagesController.php#L370) (esim. järjestää `Listaus`-sisällön sivujen järjestystä jonkin tietyn logiikan mukaan), voit tehdä sen `ON_PAGE_BEFORE_RENDER`-eventissä [Site](../api/user-site/sivujetti_user-site_user-site-api.html)-luokassa:

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
        $api->on($api::ON_PAGE_BEFORE_RENDER, function(Page $page, bool $editModeIsOn) {
            if ($editModeIsOn)
                return;
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

## Kuinka muutan sivun &lt;head&gt;-tagin sisältöä backendissä?

Voit myös määritellä &lt;head&gt;-tagiin renderöityvää koodia suoraan muokkaustilassa, "Sivusto > Globaalit skriptit" -näkymässä.
{: .message-box.info data-title="Info" }

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
            implode("\n    ", [
                "</title>",
                "<link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\">",
                "<link rel=\"icon\" href=\"/favicon.svg\" type=\"image/svg+xml\">",
            ]),
            $head
        ));
    }
}

```

## Kuinka lisään custom-templaatin listaussisällölle?

1. Uppaa tiedosto `${sivustonPolkuPalvelimella}site/templates/` kansioon palvelimella
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