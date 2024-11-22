---
layout: default
title: Sivujetti&bsol;Page&bsol;Entities&bsol;Page
parent: Sivujetti&bsol;Page
grand_parent: Backend-API
nav_order: 1
---

# interface Sivujetti\\Page\\Entities\\Page

Entiteettiluokka sivuille.

## Synopsis

```php
class Page extends \stdClass {

    /* Vakiot */
    const STATUS_PUBLISHED = 0;
    const STATUS_DRAFT = 1;

    /* Muuttujat */
    public string $slug;
    public string $path;
    public int $level;
    public string $title;
    public ?object $meta;
    public string $id;
    public string $type;
    public Block[] $blocks;
    public int $status;
    public int $createdAt;
    public int $lastUpdatedAt;
    public Layout $layout;
}
```

## Vakiot

<dl>
    <dt><var>STATUS_PUBLISHED</var></dt>
    <dd>...</dd>
    <dt><var>STATUS_DRAFT</var></dt>
    <dd>...</dd>
</dl>

## Muuttujat

<dl>
    <dt><var>slug</var></dt>
    <dd>Example: "/" or "/some-page"</dd>
    <dt><var>path</var></dt>
    <dd>...</dd>
    <dt><var>level</var></dt>
    <dd>1 = top level, 2 = 2nd. level etc.</dd>
    <dt><var>title</var></dt>
    <dd>...</dd>
    <dt><var>meta</var></dt>
    <dd>{description: ?string}</dd>
    <dt><var>layoutId</var></dt>
    <dd>Example "1"</dd>
    <dt><var>id</var></dt>
    <dd>Push id, e.g. "-NGLshqi40f1ZK1ua74k"</dd>
    <dt><var>type</var></dt>
    <dd>...</dd>
    <dt><var>blocks</var></dt>
    <dd>...</dd>
    <dt><var>status</var></dt>
    <dd>self::STATUS_*</dd>
    <dt><var>createdAt</var></dt>
    <dd>Unix timestamp</dd>
    <dt><var>lastUpdatedAt</var></dt>
    <dd>Unix timestamp. If new page, has the same value as createdAt.</dd>
    <dt><var>layout</var></dt>
    <dd>...</dd>
</dl>