---
layout: default
title: Luo lisäosa
parent: Tutoriaalit
nav_order: 2
---

# Luo lisäosa

...

## Step 0. Asenna Sivujetti

...

## Step 1. Luo lisäosan pääluokka

<!--
Jokaisella lisäosalla on pakollinen pääluokka, jonka nimi koostuu kahdesta osasta:
- Vendor-prefiksistä ja
- Lisäosan nimestä

Tässä esimerkissä vendor-prefix on `VendorPrefix` ja lisäosan nimi `PluginName`.
-->

Luo kansio `VendorPrefixPluginName` plugins-kansioon, ja sinne tiedosto `VendorPrefixPluginName.php`.

Kirjoita `VendorPrefixPluginName.php`:n sisällöksi:

```php
<?php declare(strict_types=1);

namespace SitePlugins\VendorPrefixPluginName;

use Sivujetti\UserPlugin\{UserPluginAPI, UserPluginInterface};

final class VendorPrefixPluginName implements UserPluginInterface {
    /**
     * @inheritdoc
     */
    public function __construct(UserPluginAPI $api) {
        // Täällä ei mitään vielä
    }
}
```

Tämän jälkeen kansiorakenne tulisi olla:

```
/plugins
    ...
    /VendorPrefixPluginName
        VendorPrefixPluginName.php
    ...
```
