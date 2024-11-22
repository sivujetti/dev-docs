---
layout: default
title: Sivujetti&bsol;BlockType&bsol;PropertiesBuilder
parent: Sivujetti&bsol;BlockType
grand_parent: Backend-API
nav_order: 2
---

# class Sivujetti\\BlockType\\PropertiesBuilder

Builder-luokka, jolla voi määritellä lohkotyypin kentät. Esim. `ImageBlockType`llä on `src`-, `altText`-, ja `caption`-kentät.

## Synopsis

```php
final class PropertiesBuilder {

    /* Vakiot */
    const DATA_TYPE_TEXT = BlockProperty::DATA_TYPE_TEXT;
    const DATA_TYPE_UINT = BlockProperty::DATA_TYPE_UINT;

    /* Metodit */
    public newProperty(string $name, ?string $dataType = null): $this
    public dataType(string $type, ?int $length = null, ?array $validationRules = null): $this
    public getResult(): ArrayObject<int, BlockProperty>
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

Määrittelee uuden kentän.

#### Signature

```php
public function newProperty(string $name, ?string $dataType = null): PropertiesBuilder
```

#### Esimerkit

```php
$builder->newProperty("numColumns", $builder::DATA_TYPE_UINT);
```

Tietotyypeillä on oletuksena seuraavat validaattorit:

Tyypi | Validaattorit
--- | ---
`"text"` (`$builder::DATA_TYPE_TEXT`) | `["type", "string"]`<br>`["maxLength", 1024]`
`"json"` | `["type", "string"]`<br>`["maxLength", 256000]`
`"int"` | `["type", "number"]`
`"uint"` (`$builder::DATA_TYPE_UINT`) | `["type", "number"]`<br>`["min", 0]`

Jos haluat yliajaa oletusvalidaattorien asetuksia, korvaa `$builder->newProperty("year", $builder::DATA_TYPE_TEXT)` -> `$builder->newProperty("year")->dataType($builder::DATA_TYPE_TEXT, validationRules: [["maxLength", 4]])`.

---

### dataType()

Määrittelee edellisen kentän tietotyypin.

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
public function getResult(): \ArrayObject<int, BlockProperty>
```
