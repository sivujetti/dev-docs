---
layout: default
title: Luo lisäosa - osa 1 (lisäosat)
parent: Kustomoi sivustoa
grand_parent: Tutoriaalit
nav_order: 6
---

# Luo lisäosa - osa 1

Tässä tutoriaalissa luomme lisäosan, jolla voi lisätä sivustoihin interaktiivisia Leaflet-karttoja.

## Preliminaries

Tietokoneellasi tulee olla asennettuna nodejs 16.4.2 tai uudempi.

## Step 0: Paikallista plugins-, ja public -kansio

`plugins` -kansio sijaitsee oletuksena samassa kansiossa kuin `site`-kansio, ks. [ensimmäinen tutoriaali](./register-theme-css-file.html#step-0-paikallista-themephp-ja-public-kansio).

## Step 1: Luo lisäosan kansio ja päätiedosto

<span class="bg-highlight">Luo kansio</span> `${plugins_kansio}/MycompLeafletMaps` ja <span class="bg-highlight">luo</span> sinne tiedosto `${plugins_kansio}/MycompLeafletMaps/MycompLeafletMaps.php`:

```php
<?php declare(strict_types=1);

namespace SitePlugins\MycompLeafletMaps;

use Sivujetti\Auth\{ACLRulesBuilder};
use Sivujetti\UserPlugin\{UserPluginAPI, UserPluginInterface};

final class MycompLeafletMaps implements UserPluginInterface {
    /**
     * @inheritdoc
     */
    public function __construct(UserPluginAPI $api) {
        // todo
    }
    /**
     * @inheritdoc
     */
    public function defineAclRules(ACLRulesBuilder $builder): ACLRulesBuilder {
        return $builder;
    }
}

```

## Yhteenveto

...

[Mene osaan kaksi](./create-plugin-part-2.html).

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.colorCodeMenusAndHeadings();</script>
