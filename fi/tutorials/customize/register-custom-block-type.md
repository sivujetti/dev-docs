---
layout: default
title: Rekisteröi oma sisältölohkotyyppi (Site.php)
parent: Kustomoi sivustoa
grand_parent: Tutoriaalit
nav_order: 4
---

# Rekisteröi oma sisältölohkotyyppi

Tässä ohjeessa lisätään uusi sisältölohkotyyppi `MySiteBreakingNews`.

- Rekisteröi [javascript-olio](#step-1-lis%C3%A4%C3%A4-muokkauslomake-javascript-olio) (joka implementoi muokkauslomakkeen, jolla käyttäjä voi muokata sisältöä muokkaustilassa)
- Rekisteröi [preact-komponentti](#step-2-lisää-muokkaustilan-renderöijä-preact-komponentti) (joka renderöi sisällön muokkaustilassa)
- Rekisteröi [Php-luokka](#step-3-lisää-backend-renderöidä-php-luokka) (joka renderöi sisällön backendissä / ei-muokkaus -tilassa)

## Step 0: Paikallista Site.php, ja public-kansio

Paikallista `Site.php`, joka sijaitsee samassa kansiossa kuin `Theme.php`, ks. [ensimmäinen tutoriaali](./register-theme-css-file.html#step-0-paikallista-themephp-ja-public-kansio).

## Step 1: Lisää muokkauslomake (Javascript-olio)

<span class="bg-highlight">Luo tiedosto</span> `${public_kansio}/my-site-edit-app-bundle.js` tekstieditorilla:

```javascript
(function (_sivujettiCommonsForEditApp) {
    const breakingNewsBlockType = {
        name: 'MySiteBreakingNews',
        friendlyName: 'Breaking news',
        editForm: class extends preact.Component {
            render() { return 'todo'; }
        },
        stylesEditForm: null,
        icon: 'box',
        createOwnProps(_defProps) {
            return {text: 'News text'};
        }
    };

    _sivujettiCommonsForEditApp.api.blockTypes.register(breakingNewsBlockType.name, () => breakingNewsBlockType);
})(sivujettiCommonsEditApp);

```

Tämä tiedosto luodaan normaalisti rollup-bundlerilla, mutta tutoriaalin yksinkertaisemiseksi kirjoitetaan se nyt käsin.
{: .message-box.info data-title="Note" }

<span class="bg-highlight">Muokkaa</span> `${site_kansio}/Site.php` -tiedostoon tekstieditorilla:

```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\UserSite\{UserSiteAPI, UserSiteInterface};

/**
 * @psalm-import-type JetFormsMailSendSettings from \SitePlugins\JetForms\JetForms
 */
class Site implements UserSiteInterface {
    /**
     * @param \Sivujetti\UserSite\UserSiteAPI $api
     */
    public function __construct(UserSiteAPI $api) {
        $api->on($api::ON_ROUTE_CONTROLLER_BEFORE_EXEC, function () use ($api) {
            $api->enqueueEditAppJsFile("my-site-edit-app-bundle.js");
        });
    }
}

```

Tämän jälkeen muokkaustilan valikon sisällön lisäyslistassa pitäisi näkyä `MySiteBreakingNews` sisältölohkotyyppi. Tässä vaiheessa Sivujetti ei kuitenkaan osaa renderöidä sitä. Korjataan tilanne lisäämällä muokkaustilan renderöijä.

## Step 2: Lisää muokkaustilan renderöijä (preact-komponentti)

<span class="bg-highlight">Luo tiedosto</span> `${public_kansio}/my-site-webpage-preview-renderer-app-bundle.js` tekstieditorilla:

```javascript
(function (_sivujettiWebpagePreviewRendererApp) {
    class BreakingNewsBlockRenderer extends preact.Component {
        /**
         * @param {BlockRendererProps} props
         * @access protected
         */
        render({block, createDefaultProps, renderChildren}) {
            return preact.createElement('marquee', {...createDefaultProps()},
                block.text,
                renderChildren()
            );
        }
    }

    _sivujettiWebpagePreviewRendererApp.api.registerRenderer('MySiteBreakingNews', BreakingNewsBlockRenderer);
})(sivujettiWebPagePreviewRendererApp);
```

<span class="bg-highlight">Muokkaa</span> `${site_kansio}/Site.php` -tiedostoon tekstieditorilla:

```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\UserSite\{UserSiteAPI, UserSiteInterface};

/**
 * @psalm-import-type JetFormsMailSendSettings from \SitePlugins\JetForms\JetForms
 */
class Site implements UserSiteInterface {
    /**
     * @param \Sivujetti\UserSite\UserSiteAPI $api
     */
    public function __construct(UserSiteAPI $api) {
        $api->on($api::ON_ROUTE_CONTROLLER_BEFORE_EXEC, function () use ($api) {
            $api->enqueuePreviewAppJsFile("my-site-webpage-preview-renderer-app-bundle.js");
        });
    }
}

```

Tässä kohtaa custom sisältöämme voi lisätä sivuihin muokkaustilassa, mutta Sivujetti osaa renderöidä sen vain muokkaus-tilassa. Lisätään tuki ei-muokkaustilan renderöinnille seuraavassa kohdassa.

## Step 3: Lisää backend-renderöidä (Php-luokka)

<span class="bg-highlight">Muokkaa</span> `${site_kansio}/Site.php` -tiedostoon tekstieditorilla:

```php
<?php declare(strict_types=1);

namespace MySite;

use Sivujetti\BlockType\{BlockTypeInterface, JsxLikeRenderingBlockTypeInterface, PropertiesBuilder};
use Sivujetti\Page\WebPageAwareTemplate;
use Sivujetti\UserSite\{UserSiteAPI, UserSiteInterface};

use function Sivujetti\createElement as el;

/**
 * @psalm-import-type JetFormsMailSendSettings from \SitePlugins\JetForms\JetForms
 */
class Site implements UserSiteInterface {
    /**
     * @param \Sivujetti\UserSite\UserSiteAPI $api
     */
    public function __construct(UserSiteAPI $api) {
        $api->registerBlockType("MySiteBreakingNews", new class() implements BlockTypeInterface, JsxLikeRenderingBlockTypeInterface {
            /**
             * @inheritdoc
             */
            public function defineProperties(PropertiesBuilder $builder): \ArrayObject {
                return $builder
                    ->newProperty("text")
                    ->getResult();
            }
            /**
             * @inheritdoc
             */
            public function render(object $block,
                                   \Closure $createDefaultProps,
                                   \Closure $renderChildren,
                                   WebPageAwareTemplate $tmpl): array {
                /* Same as: ```jsx
                <marquee { ...createDefaultProps() }>
                    { text }
                <marquee>
                ``` */
                return el("marquee", $createDefaultProps(),
                    $block->text,
                    $renderChildren()
                );
            }
        });
    }
}

```

## Step 4: Profit

Nyt käyttäjät voi lisätä custom-sisältöämme sivuihin muokkaustilassa, muokata niitä, ja Sivujetti osaa myös renderöidä sen ei-muokkaus -tilassa.

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.colorCodeMenusAndHeadings();</script>
