---
layout: default
title: Muuta renderöityvää sisältöä dynaamisesti (Site.php)
parent: Kustomoi sivustoa
grand_parent: Tutoriaalit
nav_order: 3
---

# Muuta renderöityvää sisältöä dynaamisesti

Tässä ohjeessa muutetaan Sivujetin renderöimän sivun HTML:ää mutatoimalla tietokantaan tallennettua dataa dynaamisesti "lennosta".

## Step 0: Paikallista Site.php.

Paikallista `Site.php`, joka sijaitsee samassa kansiossa kuin `Theme.php`, ks. [ensimmäinen tutoriaali](./register-theme-css-file.html#step-0-paikallista-themephp-ja-public-kansio).

## Step 1: Lisää esimerkkisisältö

1. Lisää johonkin sivuun muokkaustilassa `Osio`-sisältö, ja sen sisälle `Teksti`-sisältö
1. Lisää `Osio` -sisällölle CSS-luokka `footer` "Tyylit (koodi)" -tabissa (huomaa että kirjautuneen käyttäjän rooli tulee olla vähintään `\Sivujetti\Auth\ACL::ROLE_ADMIN_EDITOR`)
1. Muokkaa `Teksti`-sisällön tekstiksi esim. `(c) [[year]] Yritys Oy`

## Step 2: Mutatoi sivun sisältölohkoa

<span class="bg-highlight">Muokkaa</span> `${site_kansio}/Site.php` -tiedostoon tekstieditorilla:

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
        $api->on($api::ON_PAGE_BEFORE_RENDER, function(Page $page, bool $editModeIsOn) {
            if ($editModeIsOn)
                return;
            $footerSectionBlock = BlockTree::findBlock($page->blocks, fn(Block $b) =>
                $b->type === "Section2" && str_starts_with($b->styleClasses, "footer")
            );
            if ($footerSectionBlock) {
                $footerTextBlock = BlockTree::findBlock($footerSectionBlock->children, fn(Block $b) => $b->type === "Text");
                $footerTextBlock->html = str_replace("[[year]]", date_create()->format("Y"), $footerTextBlock->html);
            }
        });
    }
}
```

## Step 3: Profit

Tämän jälkeen Sivujetti renderöi:
```html
<div todo>
  <p>(c) 2024 Yritys Oy</p>
</div>
```

, eikä
```html
<div todo>
  <p>(c) [[year]] Yritys Oy</p>
</div>
```

## Mutatoi useita sisältölohkoja

Jos haluat muuttaa useamman kuin yhden lohkon sisältöä, korvaa `BlockTree::findBlock()` -kutsu `BlockTree::filterBlocks()` -kutsulla:

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
        $api->on($api::ON_PAGE_BEFORE_RENDER, function(Page $page, bool $editModeIsOn) {
            if ($editModeIsOn)
                return;
            $allTextBlocks = BlockTree::filterBlocks($page->blocks, fn(Block $b) => $b->type === "Text");
            foreach ($allTextBlocks as $block) {
                $block->html = str_replace("[[year]]", date_create()->format("Y"), $block->html);
            }
        });
    }
}
```

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.colorCodeMenusAndHeadings();</script>
