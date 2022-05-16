---
layout: default
title: Sivujetti&bsol;BlockType&bsol;PropertiesBuilder
parent: Sivujetti&bsol;BlockType
grand_parent: API
nav_order: 2
---

# interface Sivujetti\\BlockType\\PropertiesBuilder

Builder-luokka, jolla voi määritellä lohkotyypin kentät. Esim. `ParagraphBlockType`llä on pelkästään `text`-kenttä, ja `ColumnsBlockType`:llä `numColumns`, ja `takeFullWidth`.

## Synopsis

```php
final class PropertiesBuilder {

    /* Vakiot */
    const DATA_TYPE_TEXT = BlockProperty::DATA_TYPE_TEXT;
    const DATA_TYPE_UINT = BlockProperty::DATA_TYPE_UINT;

    /* Metodit */
    public newProperty(string $name, ?string $dataType = null): $this
    public dataType(string $type, ?int $length = null, ?array $validationRules = null):$this
    public getResult(): ArrayObject
}
```

## Vakiot

<dl>
    <dt><var>DATA_TYPE_TEXT</var></dt>
    <dd>...</dd>
    <dt><var>DATA_TYPE_UINT</var></dt>
    <dd>...</dd>
</dl>

## Metodit

### newProperty()

...

#### Signature

```php
public function newProperty(string $name, ?string $dataType = null): PropertiesBuilder
```

#### Esimerkit

```php
$builder->newProperty("numColumns", $builder::DATA_TYPE_UINT);
```

---

### dataType()

Määrittele edellisen kentän tietotyyppi.

#### Signature

```php
public function dataType(string $type, ?int $length = null, ?array $validationRules = null): PropertiesBuilder
```

#### Esimerkit

```php
$builder
    ->newProperty("stringPropWithLength")
    ->dataType($builder::DATA_TYPE_TEXT, 64);
```

---

### getResult()

...

#### Signature

```php
public function getResult(): \ArrayObject
```
