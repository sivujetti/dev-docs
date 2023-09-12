---
layout: default
title: Misc
nav_order: 6
---

# Misc

...
{: .fs-6 .fw-300 }

## ^^text^^

^^text^^

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
                return; // ^^text^^

            $someListing = BlockTree::findBlock($page->blocks, fn($b) => $b->type === Block::TYPE_LISTING);
            if (!$someListing)
                return; // ^^text^^

            // ^^text^^
            $first = $someListing->__pages[0];
            $allButFirst = array_slice($someListing->__pages, 1);
            $someListing->__pages = [...$allButFirst, $first];
        });
    }
}

```

## ^^text^^

^^text^^

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

## ^^text^^

^^text^^

### Step 1:

^^text^^

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
    <?= $this->renderChildren($props); // ^^text^^ ?>
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
        $api->registerBlockRenderer("block-listing-^^text^^", for: "Pages");
        ...
    }
}

```