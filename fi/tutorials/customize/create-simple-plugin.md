---
layout: default
title: Luo lisäosa (lisäosat)
parent: Kustomoi sivustoa
grand_parent: Tutoriaalit
nav_order: 5
---

# Luo lisäosa

...

## Step 0. Asenna Sivujetti

...

## Step 1. Luo lisäosan pääluokka

<span class="bg-highlight">Luo kansio</span> `VendorPrefixPluginName` plugins-kansioon, ja <span class="bg-highlight">luo</span> sinne tiedosto `VendorPrefixPluginName.php`.

<span class="bg-highlight">Muokkaa</span> `VendorPrefixPluginName.php`:n sisällöksi tekstieditorilla:

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

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.colorCodeMenusAndHeadings();</script>
