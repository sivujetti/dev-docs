---
layout: default
title: Sivujetti&bsol;StoredObjects&bsol;StoredObjectsRepository
parent: Sivujetti&bsol;StoredObjects
grand_parent: API
nav_order: 1
---

# class Sivujetti\\StoredObjects\\StoredObjectsRepository

Luokka, jolla voi tallentaa tietoa tietokantaan. Samankaltainen kuin Wordpressin [Options API](https://developer.wordpress.org/plugins/settings/options-api/).

## Synopsis

```php
final class StoredObjectsRepository {

    /* Metodit */
    public putEntry(string $objectName, array<string, mixed> $data): string|false
    public find(string $objectName): MySelect
    public updateEntry(string $objectName, array<string, mixed> $data): MyUpdate
}
```

## Metodit

### putEntry()

Tallentaa objektin tietokantaan, palauttaa id:n.

#### Signature

```php
public function putEntry(string $objectName, array<string, mixed> $data): string|false
```

#### Esimerkit

```php
$insertId = $storedObjectsRepo->putEntry("JetForms:submissions", [
    "sentAt" => time(),
    "sentFromPage" => "/page",
    "answers" => ["name" => "Submit Te'r", "message" => "Hello"],
]);
```

---

### find()

Palauttaa query-builderin, joka palauttaa tallennettuja objekteja tietokannasta.

#### Signature

```php
public function find(string $objectName): MySelect
```

#### Esimerkit

```php
// Yksi
$entry = $storedObjectsRepo->find("JetForms:mailSendSettings")->fetch() ?? null;
echo $entry instanceof \Sivujetti\StoredObjects\Entities\Entry ? "y" : "n";

// Monta
$entries = $storedObjectsRepo->find("JetForms:submissions")->fetchAll();

// Lisäfilttereillä
$entries = $storedObjectsRepo->find("JetForms:submissions")->where("id > ?", ["4"])->fetchAll();
```

---

### updateEntry()

Palauttaa query-builderin, joka yliajaa objekteja tietokantaan.

#### Signature

```php
public function updateEntry(string $objectName, array<string, mixed> $data): MyUpdate
```

#### Esimerkit

```php
$updated = [
    "sendingMethod" => $req->body->sendingMethod,
    "SMTP_host" => $req->body->SMTP_host ?? null,
    ...
];

// Kaikki rivit, joilla key "JetForms:mailSendSettings"
$numAffectedRows = $storedObjectsRepo
    ->updateEntry("JetForms:mailSendSettings", $updated)
    ->execute();

// Vain yksi rivi
$numAffectedRows = $storedObjectsRepo
    ->updateEntry("JetForms:mailSendSettings", $updated)
    ->where("id = ?", ["2"], "AND")
    ->execute();
```
