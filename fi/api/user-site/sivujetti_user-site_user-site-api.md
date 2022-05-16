---
layout: default
title: Sivujetti&bsol;UserSite&bsol;UserSiteAPI
parent: Sivujetti&bsol;UserSite
grand_parent: API
nav_order: 1
---

# class Sivujetti\\UserSite\\UserSiteAPI

Luokka, joka passataan automaattisesti sivuston pääluokalle `${SIVUJETTI_SITE_PATH}Site.php` (`/path/to/backend/site/Site.php`).

## Synopsis

```php
class UserSiteAPI {

    /* Vakiot */
    const ON_ROUTE_CONTROLLER_BEFORE_EXEC = "sivujetti:beforeExecRouteController";
    const ON_PAGE_BEFORE_RENDER = "sivujetti:onPageBeforeRender";

    /* Metodit */
    public on(string $when, callable $thenDo): int
    public enqueueCssFile(string $url, array<string, string> $attrs = []): void
    public enqueueJsFile(string $url, array<string, string> $attrs = []): void
    public isCssFileEnqueued(string $url): bool
    public isJsFileEnqueued(string $url): bool
    public registerBlockType(string $name, BlockTypeInterface $instance): void
    public enqueueEditAppJsFile(string $url): void
    public registerBlockRenderer(string $fileId, ?string $friendlyName = null, ?string $for = null): void
    public getPlugin(string $name): ?UserPluginInterface
}
```

## Vakiot

<dl style="grid-template-columns: minmax(10em, 19rem) 1fr;">
    <dt><var>ON_ROUTE_CONTROLLER_BEFORE_EXEC</var></dt>
    <dd>Signaali, joka ajetaan juuri ennen kontrolleria</dd>
    <dt><var>ON_PAGE_BEFORE_RENDER</var></dt>
    <dd>Signaali, joka ajetaan juuri ennen sivun renderöimistä</dd>
</dl>

## Metodit

### on()

...

#### Signature

```php
public function on(string $when, callable $thenDo): int
```

#### Esimerkit

```php
...
```

---

### enqueueCssFile()

...

#### Signature

```php
public function enqueueCssFile(string $url, array<string, string> $attrs = []): void
```

#### Esimerkit

```php
...
```

---

### enqueueJsFile()

...

#### Signature

```php
public function enqueueJsFile(string $url, array<string, string> $attrs = []): void
```

#### Esimerkit

```php
...
```

---

### isCssFileEnqueued()

...

#### Signature

```php
public function isCssFileEnqueued(string $url): bool
```

#### Esimerkit

```php
...
```

---

### isJsFileEnqueued()

...

#### Signature

```php
public function isJsFileEnqueued(string $url): bool
```

#### Esimerkit

```php
...
```

---

### registerBlockType()

...

#### Signature

```php
public function registerBlockType(string $name, BlockTypeInterface $instance): void
```

#### Esimerkit

```php
...
```

---

### enqueueEditAppJsFile()

Lisää tiedoston sisällytettäväksi sivuun kirjautuneelle muokkaustilassa. `$url` tulee sijaita `${SIVUJETTI_SITE_PATH}public/` -kansiossa.

#### Signature

```php
public function enqueueEditAppJsFile(string $url): void
```

#### Esimerkit

```php
...
```

---

### registerBlockRenderer()

Rekisteröi tiedosto, jolla voi renderöidä lohkon.

#### Signature

```php
public function registerBlockRenderer(string $fileId, ?string $friendlyName = null, ?string $for = null): void
```

#### Esimerkit

```php
...
```

---

### getPlugin()

...

#### Signature

```php
public function getPlugin(string $name): ?UserPluginInterface
```

#### Esimerkit

```php
...
```
