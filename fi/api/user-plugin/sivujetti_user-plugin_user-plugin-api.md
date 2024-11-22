---
layout: default
title: Sivujetti&bsol;UserPlugin&bsol;UserPluginAPI
parent: Sivujetti&bsol;UserPlugin
grand_parent: Backend-API
nav_order: 1
---

# class Sivujetti\\UserPlugin\\UserPluginAPI

Luokka, joka passataan automaattisesti lisäosien pääluokille `${SIVUJETTI_PLUGINS_PATH}MyPrefixMyPlugin/MyPrefixMyPlugin.php` (`/path/to/backend/plugins/MyPrefixMyPlugin/MyPrefixMyPlugin.php`).

## Synopsis

```php
final class UserPluginAPI extends UserSiteAPI {

    /* Metodit */
    public registerHttpRoute(string $method, string $url, string $ctrlClassPath, string $ctrlMethodName): void
    public getCurrentLang(): string
    public enqueueCssFile(string $url, array<string, string> $attrs = []): void
    public enqueueJsFile(string $url, array<string, string> $attrs = []): void
    public registerBlockType(string $name, BlockTypeInterface $instance): void
    public registerBlockRenderer(string $fileId, ?string $friendlyName = null, ?string $for = null): void
    public createService(string $name, array $args = []): mixed

    /* Perityt metodit */
    public UserSiteAPI::on(string $when, callable $thenDo): int
    public UserSiteAPI::isCssFileEnqueued(string $url): bool
    public UserSiteAPI::isJsFileEnqueued(string $url): bool
    public UserSiteAPI::registerBlockRenderer(string $fileId, ?string $friendlyName = null, ?string $for = null): void
    public UserSiteAPI::getPlugin(string $name): ?UserPluginInterface
    public UserSiteAPI::enqueueEditAppJsFile(string $url): void
    public UserSiteAPI::enqueuePreviewAppJsFile(string $url): void
}
```

## Metodit

### registerHttpRoute()

... Katso myös :

#### Signature

```php
public function registerHttpRoute(string $method, string $url, string $ctrlClassPath, string $ctrlMethodName): void
```

#### Esimerkit

```php
...
final class JetForms implements UserPluginInterface {
    ...
    public function __construct(UserPluginAPI $api) {
        ...
        $api->registerHttpRoute("POST", "/plugins/jet-forms/submissions/[w:blockId]/[w:pageSlug]",
            SubmissionsController::class, "handleSubmission"
        );
    }
}
```

---

### getCurrentLang()

...

#### Signature

```php
public function getCurrentLang(): string
```

#### Esimerkit

```php
echo $api->getCurrentLang(); // "fi"
```

---

### enqueueCssFile()

Sama kuin [UserSiteAPI::enqueueCssFile()](../user-site/sivujetti_user-site_user-site-api.html#enqueuecssfile), mutta hyväksyy vain tämän lisäosan slugifioidulla nimiavaruudella (`plugin-my-prefix-my-plugin`) alkavat urlit.

#### Signature

```php
public function enqueueCssFile(string $url, array<string, string> $attrs = []): void
```

#### Esimerkit

```php
final class JetForms implements UserPluginInterface {
    ...
    public function __construct(UserPluginAPI $api) {
        ...
        $api->on($api::ON_PAGE_BEFORE_RENDER, function (Page $page) use ($api) {
            if (!BlockTree::findBlock($page->blocks, fn($b) => $b->type === ContactFormBlockType::NAME ||
                                                                $b->type === SubscriptionFormBlockType::NAME))
                return;
            if (!$api->isCssFileEnqueued("sivujetti/vendor/pristine.css"))
                $api->enqueueCssFile("sivujetti/vendor/pristine.css");
            if (!$api->isCssFileEnqueued("plugin-jet-forms-foo.css"))
                $api->enqueueCssFile("plugin-jet-forms-foo.css");
            ...
        });
    }
}
```

---

### enqueueJsFile()

Sama kuin [UserSiteAPI::enqueueJsFile()](../user-site/sivujetti_user-site_user-site-api.html#enqueuejsfile), mutta hyväksyy vain tämän lisäosan slugifioidulla nimiavaruudella (`plugin-my-prefix-my-plugin`) alkavat urlit.

#### Signature

```php
public function enqueueJsFile(string $url, array<string, string> $attrs = []): void
```

#### Esimerkit

```php
final class JetForms implements UserPluginInterface {
    ...
    public function __construct(UserPluginAPI $api) {
        ...
        $api->on($api::ON_PAGE_BEFORE_RENDER, function (Page $page) use ($api) {
            if (!BlockTree::findBlock($page->blocks, fn($b) => $b->type === ContactFormBlockType::NAME ||
                                                                $b->type === SubscriptionFormBlockType::NAME))
                return;
            if (!$api->isJsFileEnqueued("sivujetti/vendor/pristine.min.js"))
                $api->enqueueJsFile("sivujetti/vendor/pristine.min.js");
            if (!$api->isJsFileEnqueued("plugin-jet-forms-bundle.js"))
                $api->enqueueJsFile("plugin-jet-forms-bundle.js");
            ...
        });
    }
}
```

---

### registerBlockType()

Sama kuin [UserSiteAPI::registerBlockType()](../user-site/sivujetti_user-site_user-site-api.html#registerblocktype), mutta hyväksyy vain tämän lisäosan nimiavaruudella (`PluginMyPrefixMyPlugin`) alkavat nimet.

#### Signature

```php
public function registerBlockType(string $name, BlockTypeInterface $instance): void
```

#### Esimerkit

```php
class ContactFormBlockType implements BlockTypeInterface {
    public const NAME = "JetFormsContactForm";
    public function defineProperties(PropertiesBuilder $builder): \ArrayObject {
        return $builder
            ->newProperty("property", $builder::DATA_TYPE_TEXT)
            ->getResult();
    }
}
final class JetForms implements UserPluginInterface {
    ...
    public function __construct(UserPluginAPI $api) {
        $api->on($api::ON_ROUTE_CONTROLLER_BEFORE_EXEC, function () use ($api) {
            $api->registerBlockType(ContactFormBlockType::NAME, new ContactFormBlockType);
        });
        ...
    }
}
```

---

### createService()

...

#### Signature

```php
public function createService(string $name, array $args = []): mixed
```

#### Esimerkit

```php
...
```

---

### registerBlockRenderer()

Sama kuin [UserSiteAPI::registerBlockRenderer()](../user-site/sivujetti_user-site_user-site-api.html#registerblockrenderer), mutta hyväksyy vain tämän lisäosan slugifioidulla nimiavaruudella (`my-prefix-my-plugin`) alkavat fileId:t.

#### Signature

```php
public function registerBlockRenderer(string $fileId, ?string $friendlyName = null, ?string $for = null): void
```

#### Esimerkit

```php
...
```
