---
layout: default
title: Sivujetti&bsol;BlockType&bsol;BlockTypeInterface
parent: Sivujetti&bsol;BlockType
grand_parent: API
nav_order: 1
---

# interface Sivujetti\\BlockType\\BlockTypeInterface

Rajapinta lohkotyypeille, kuten `HeadingBlockType`, `ButtonBlockType` tai `ContactFormBlockType`.

## Synopsis

```php
interface BlockTypeInterface {

    /* Metodit */
    public defineProperties(PropertiesBuilder $builder): ArrayObject<BlockProperty>
}
```
