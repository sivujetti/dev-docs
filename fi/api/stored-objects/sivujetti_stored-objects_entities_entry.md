---
layout: default
title: Sivujetti&bsol;StoredObjects&bsol;Entities&bsol;Entry
parent: Sivujetti&bsol;StoredObjects
grand_parent: API
nav_order: 2
---

# class Sivujetti\\StoredObjects\\Entities\\Entry

Yksi tietokantaan tallennettu objekti.

## Synopsis

```php
final class Entry extends \stdClass {

    // Muuttujat
    public string $objectName;
    public array<string, mixed> $data;
}
```

## Muuttujat

<dl>
    <dt><var>objectName</var></dt>
    <dd>esim. <span class="highlight"><code class="s2">"JetForms:mailSendSettings"</code></span> tai <span class="highlight"><code class="s2">"JetForms:submissions"</code></span></dd>
    <dt><var>data</var></dt>
    <dd>Objektin varsinainen sisältö</dd>
</dl>
