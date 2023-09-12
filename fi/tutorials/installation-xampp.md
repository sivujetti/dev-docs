---
layout: default
title:  Asennus lokaalisti XAMPP/MAMP
parent: Asennus
grand_parent: Tutoriaalit
nav_order: 1
---

# Asennus lokaalisti XAMPP/MAMP
{: .no_toc }

Tässä tutoriaalissa opit luomaan uuden Sivujetti -sivuston jo koneellesi asennettuun XAMPP/MAMP -ympäristöön. Valitse käyttöjärjestelmäsi

<div id="tutorial-os-selector" class="mb-6">
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'macos')" type="button" name="button" class="btn selected">Macos</button>
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'windows')" type="button" name="button" class="btn">Windows</button>
<button type="button" name="button" class="btn" disabled>Linux</button>
</div>

---

## Step 0. Esivalmistelut

Käynnistä MAMPin serveri on päällä, ja varmista että sen PHP-tulkin versio on 8.0 tai uudempi. Jos haluat selkeämmät virheviestit, tsekkaa että `/Applications/MAMP/bin/php/php8.x.x/conf/php.ini` löytyy:
{: .dm-macos }
```ini
[xdebug]
zend_extension="/Applications/MAMP/bin/php/php8.x.x/lib/php/extensions/no-debug-non-zts-yyyymmdd/xdebug.so"
;xdebug.mode=debug
;xdebug.start_with_request=yes

; kommentoi myös tämä jos php:n ajaminen komentoriviltä tuntuu hitaalta
; extension=imap.so
```
{: .dm-macos }

Käynnistä Apache XAMPPin hallintapaneelista. Tsekkaa että `c:\xampp\php\php.ini`n rivi `extension=sodium` ei ole kommentoitu.
{: .dm-windows .d-none }

## Step 1. Lataa Sivujetti & luo projektikansio

<span class="bg-highlight">Lataa</span> [sivujetti-0.15.0.zip](https://github.com/sivujetti/sivujetti/releases/download/sivujetti-0.15.0/sivujetti-0.15.0.zip).

<span class="bg-highlight">Luo</span> uudelle sivustolle työkansio (`/Applications/MAMP/htdocs/hello-sivujetti/`) ja <span class="bg-highlight">pura</span> lataamasi zipin sisältö sinne kokonaisuudessaan. Tällöin kansiorakenne pitäisi näyttää tältä:
{: .dm-macos }

<span class="bg-highlight dm-windows d-none">Luo</span> uudelle sivustolle työkansio (`c:\xampp\htdocs\hello-sivujetti\`) ja <span class="bg-highlight">pura</span> lataamasi zipin sisältö sinne kokonaisuudessaan. Tällöin kansiorakenne pitäisi näyttää tältä:
{: .dm-windows .d-none }
```
/htdocs
    ...
    /hello-sivujetti
        /backend
        /public
        index.php
    ...
```

<div class="tabs">
<button class="current">Sqlite</button><button>MySQL</button>
</div>
<div class="tabs-content">
<div markdown="1">
## Step 2. Asenna sivusto

<span class="bg-highlight">Avaa</span> komentoriviohjelma (`⌘ + väli`, hae nimellä "terminal")
{: .dm-macos }

<span class="bg-highlight">Avaa</span> komentoriviohjelma (`⊞ Win + X` ja sitten `A`), tai (`⊞ Win + R`, kirjoita `cmd.exe` ja paina enter)
{: .dm-windows .d-none }

<span class="bg-highlight">Siirry</span> kansioon johon purit sdk-zipin komennolla `cd /Applications/MAMP/htdocs/hello-sivujetti/`.
{: .dm-macos }

<span class="bg-highlight">Siirry</span> kansioon johon purit sdk-zipin komennolla `cd c:\xampp\htdocs\hello-sivujetti\`.
{: .dm-windows .d-none }

<span class="bg-highlight">Asenna</span> tyhjä teema komennolla `php backend/cli.php install-from-dir minimal sivujettiuser user@email.com userpass - - - - /hello-sivujetti/`
{: .dm-macos }

Mikäli terminaali sanoo että `command not found: php`, aja komento `alias php='/Applications/MAMP/bin/php/php8.0.0/bin/php'` ja yritä sitten uudelleen.
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">Asenna</span> oletussisältö komennolla `c:\xampp\php\php.exe backend\cli.php install-from-dir minimal sivujettiuser user@email.com userpass - - - - /hello-sivujetti/`
{: .dm-windows .d-none }

Jos komento tulostaa virheviestin, joka sanoo ettei sodium-lisäosaa voitu ladata, <span class="bg-highlight">kopioi</span> `c:\xampp\php\libsodium.dll` kansioon `c:\xampp\apache\bin\libsodium.dll` ja käynnistä Apache uudestaan.
{: .message-box.info .dm-windows .d-none data-title="Info" }
</div>
<div class="d-none" markdown="1">
## Step 2.1 Luo tietokanta

<span class="bg-highlight">Avaa</span> komentoriviohjelma (`⌘ + väli`, hae nimellä "terminal")
{: .dm-macos }

<span class="bg-highlight">Avaa</span> komentoriviohjelma (`⊞ Win + X` ja sitten `A`), tai (`⊞ Win + R`, kirjoita `cmd.exe` ja paina enter)
{: .dm-windows .d-none }

<span class="bg-highlight">Luo</span> uusi tietokanta ajamalle komento `/Applications/MAMP/Library/bin/mysql -u root -p` (kirjoita salasanaksi `root`), sitten `create database hellosivujetti;`, ja lopuksi `exit`
{: .dm-macos }

<span class="bg-highlight">Luo</span> uusi tietokanta ajamalle komento `c:\xampp\mysql\bin\mysql.exe -u root`, sitten `create database hellosivujetti;`, ja lopuksi `exit`
{: .dm-windows .d-none }

Voit käyttää myös olemassa olevaa tietokantakäyttäjää root & root:n sijaan.
{: .message-box .info .mt-0 data-title="Info" }

## Step 2.2 Asenna sivusto

<span class="bg-highlight">Siirry</span> kansioon johon purit sdk-zipin komennolla `cd /Applications/MAMP/htdocs/hello-sivujetti/`.
{: .dm-macos }

<span class="bg-highlight">Siirry</span> kansioon johon purit sdk-zipin komennolla `cd c:\xampp\htdocs\hello-sivujetti\`.
{: .dm-windows .d-none }

<span class="bg-highlight">Aja komento</span> `php backend/cli.php install-from-dir minimal sivujettiuser user@email.com userpass mysql:127.0.0.1:8889 hellosivujetti root root /hello-sivujetti/`
{: .dm-macos }

(korvaa `... mysql:127.0.0.1:8889 hellosivujetti ...` -> `... mysql hellosivujetti ...` jos käytät MAMP:in asetuksissa portteja 80 ja 3306)
{: .dm-macos }

Mikäli terminaali sanoo että `command not found: php`, aja komento `alias php='/Applications/MAMP/bin/php/php8.0.0/bin/php'` ja yritä sitten uudelleen.
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">Aja komento</span> `c:\xampp\php\php.exe backend\cli.php install-from-dir minimal sivujettiuser user@email.com userpass mysql hellosivujetti root - /hello-sivujetti/`
{: .dm-windows .d-none }

Jos komento tulostaa virheviestin, joka sanoo ettei sodium-lisäosaa voitu ladata, <span class="bg-highlight">kopioi</span> `c:\xampp\php\libsodium.dll` kansioon `c:\xampp\apache\bin\libsodium.dll` ja käynnistä Apache uudestaan.
{: .message-box.info .dm-windows .d-none data-title="Info" }
</div>
</div>

## Step 3. Avaa sivusto

<span class="bg-highlight">Avaa</span> selain osoittessa [http://localhost/hello-sivujetti/index.php?q=/](http://localhost/hello-sivujetti/index.php?q=/) (sivusto), [http://localhost/hello-sivujetti/index.php?q=/jet-login](http://localhost/hello-sivujetti/index.php?q=/jet-login) (muokkaustila). Käyttäjätunnus ja salasana samat, kuin edellisessä stepissä (sivujettiuser userpass).

Osoittessa voi olla mukana myös portti [http://localhost:8888/hello-sivujetti/index.php?q=/](http://localhost:8888/hello-sivujetti/index.php?q=/) ja [http://localhost:8888/hello-sivujetti/index.php?q=/jet-login](http://localhost:8888/hello-sivujetti/index.php?q=/jet-login) XAMPP/MAMPin asetuksista riippuen.
{: .message-box.info data-title="Info" }

Uusi Sivujetti-sivustosi on nyt asennettu. Pidä hauskaa!

## Yhteenveto

Tässä tutoriaalissa:

- Latasit Sivujetin
- Loit uudelle sivustolle projektikansion kehitysympäristöösi
- Asensit uuden sivuston projektikansioon
- Avasit asennetun sivuston selaimeen

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.interactifyTabs()</script>
