---
layout: default
title: Installation
parent: Tutoriaalit
nav_order: 1
---

# Installation
{: .no_toc }

Tässä tutoriaalissa opit luomaan uuden Sivujetti -sivuston lokaalissa ympäristössä. Minulla on:

<div id="tutorial-os-selector" class="mb-6">
<button onclick="sivujettiDocs.alterInstallationTutorialInstructionsFor('macos')" type="button" name="button" class="btn">Macos</button>
<button onclick="sivujettiDocs.alterInstallationTutorialInstructionsFor('windows')" type="button" name="button" class="btn">Windows</button>
<button onclick="sivujettiDocs.alterInstallationTutorialInstructionsFor('linux')" type="button" name="button" class="btn">Linux</button>
</div>

Tätä tutoriaalia ei ole kirjoitettu windowsille, koska SivujettiSDK on saatavilla vain (pre M1) macos:lle. Mikäli windows-koneellasi on jo olemassa php-devausympäristö, voit yrittää seurata macos- tutoriaalin ohjeita skipaten SDK:hon liityvät stepit.
{: .message-box.warning .dynamic-message-windows .d-none data-title="Notice" }

Tätä tutoriaalia ei ole kirjoitettu linuxille, koska SivujettiSDK on saatavilla vain (pre M1) macos:lle. Mikäli linux-koneellasi on jo olemassa php-devausympäristö, voit yrittää seurata macos- tutoriaalin ohjeita skipaten SDK:hon liityvät stepit.
{: .message-box.warning .dynamic-message-linux .d-none data-title="Notice" }

## Sisällysluettelo
{: .no_toc .text-delta .d-none }

1. TOC
{:toc .d-none }

---

## Step 1. Lataa SivujettiSDK

<span class="bg-highlight">Lataa</span> `sivujetti-sdk-x.x.x.zip` osoitteesta [github.com/sivujetti/sivujetti-sdk/releases](https://github.com/sivujetti/sivujetti-sdk/releases) (Assets -osion alta).

<span class="bg-highlight">Pura</span> `sivujetti-sdk-x.x.x.zip` Dokumentit-kansioon tietokoneellesi.

SivujettiSDK on zip-paketti, joka sisältää kaiken tarvittavan Sivujetti-sivustojen pyörittämiseen lokaalissa ympäristössä. SDK:n mahdollistaa sen, ettei sinulla tarvitse olla koneellasi asennettuna mitään erityisiä ohjelmia, eikä sinun myöskään tarvitse asentaa tai ladata mitään SDK:ta lukuunottamatta. SDK sisältää _php8-tulkin_ sekä _php-devausserverin_.
{: .message-box.info data-title="Info" }

## Step 2. Lataa Sivujetti & luo sivustolle kansio

<span class="bg-highlight">Lataa</span> `sivujetti-x.x.x.zip` osoitteesta [github.com/sivujetti/sivujetti/releases](https://github.com/sivujetti/sivujetti/releases) (Assets -osion alta).

<span class="bg-highlight">Pura</span> `sivujetti-x.x.x.zip` Lataukset-kansioon.

<span class="bg-highlight">Luo</span> uudelle sivustolle työkansio (`Dokumentit/hello-sivujetti`) ja <span class="bg-highlight">kopio</span> purkamasi kansion sisältö sinne kokonaisuudessaan. Tällöin kansiorakenne pitäisi näyttää tältä:
```
/Dokumentit
    /hello-sivujetti
        /backend
        /public
        index.php
```

<span class="bg-highlight">Avaa</span> komentoriviohjelma (`⌘ + väli`, hae nimellä "terminal")

<span class="bg-highlight">Asenna</span> oletussisältö komennolla `~/Dokumentit/sivujetti-sdk-x.x.x/php/bin/php ~/Dokumentit/hello-sivujetti/backend/cli.php install-from-dir basic-site kayttajanimi kayttajan@maili.com kayttajansalasana`.

## Step 3. Käynnistä devausserveri

<span class="bg-highlight">Siirry</span> kansioon johon purit sdk-zipin komennolla `cd ~/Dokumentit/sivujetti-sdk-x.x.x/`.

<span class="bg-highlight">Käynnistä</span> serveri komennolla `php/bin/php -S localhost:8080 -t ~/Dokumentit/hello-sivujetti -c php/conf/php.ini`.

Mikäli macos ei anna ajaa ohjelmaa, klikkaa "Peruuta", ja avaa `php/bin/php`-tiedosto manuaalisesti hiiren oikealla napilla. Klikkaa "Avaa", sulje avautuva terminaali ja suorita edellinen steppi uudestaan.
{: .message-box.info data-title="Info" }

<span class="bg-highlight">Avaa</span> selain osoittessa [http://localhost:8080/index.php?q=/](http://localhost:8080/index.php?q=/) (sivusto), [http://localhost:8080/index.php?q=/jet-login](http://localhost:8080/index.php?q=/jet-login) (muokkaustila).

Kun et enää tarvitse serveriä, voit sammuttaa sen näppäinyhdistelmällä `ctrl + c` komentoriviohjelmassa, jossa käynnistit sen.

## Yhteenveto

Tässä tutoriaalissa:

- Latasit SivujettiSDK:n
- Loit uudelle sivustolle projektikansion
- Käynnistit devausserverin käyttäen SDK:ta joka pyörittää projektikansion sivustoa

<script src="/assets/js/sivujetti-docs.js"></script>
