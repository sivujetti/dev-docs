---
layout: default
title:  Asennus lokaalisti Docker-konttiin
parent: Asennus
grand_parent: Tutoriaalit
nav_order: 2
---

# Asennus lokaalisti Docker-konttiin
{: .no_toc }

Tässä tutoriaalissa asennat Sivujetti -sivuston Alpine Linux -pohjaiseen Docker-konttiin. Käyttöjärjestelmäni johon Docker Desktop on asennettu on

<div id="tutorial-os-selector" class="mb-6">
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'macos')" type="button" name="button" class="btn selected">Macos</button>
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'windows')" type="button" name="button" class="btn">Windows</button>
<button type="button" name="button" class="btn" disabled>Linux</button>
</div>

## Step 0. Esivalmistelut

Docker Desktop tulisi olla jo asennettuna ja käynnissä koneellasi.

## Step 1. Lataa sivujetti-docker ja Sivujetti

### sivujetti-docker

<span class="bg-highlight">Lataa</span> `sivujetti-docker-x.x.x.zip` osoitteesta [github.com/sivujetti/sivujetti-docker/releases](https://github.com/sivujetti/sivujetti-docker/releases) (Assets -osion alta).

<span class="bg-highlight">Pura</span> lataamasi zipin sisältö `Dokumentit/sivujetti-docker` -kansioon. Tällöin kansiorakenne pitäisi näyttää tältä:
{: .dm-macos }

<span class="bg-highlight">Pura</span> lataamasi zipin sisältö `C:\Users\me\Dokumentit\sivujetti-docker` -kansioon. Tällöin kansiorakenne pitäisi näyttää tältä:
{: .dm-windows .d-none }
```
/Dokumentit
    ...
    /sivujetti-docker
        /config
            fpm-pool.conf
            ...
        /to-htdocs
            <tyhjä>
        /to-outside-htdocs
            <tyhjä>
        Dockerfile
        ...
    ...
```

### Sivujetti

<span class="bg-highlight">Lataa</span> `sivujetti-x.x.x.zip` osoitteesta [github.com/sivujetti/sivujetti/releases](https://github.com/sivujetti/sivujetti/releases) (Assets -osion alta), pura se edellisen kohdan kansioon. <span class="bg-highlight">Siirrä</span> sen `public`-kansio sekä `index.php`-tiedosto edellisen stepin `to-htdocs` -kansioon, ja `backend` -kansion sisältö kokonaisuudessaan `to-outside-htdocs` -kansioon. Tämän jälkeen kansiorakenne pitäisi olla:
```
/Dokumentit
    ...
    /sivujetti-docker
        /config
            ...
        /to-htdocs
            /public
                /sivujetti
            index.php
        /to-outside-htdocs
            /assets
            /cli
            ...
        Dockerfile
        ...
    ...
```

## Step 2. Luo image

<span class="bg-highlight">Avaa</span> komentoriviohjelma (`⌘ + väli`, hae nimellä "terminal")
{: .dm-macos }

<span class="bg-highlight">Avaa</span> komentoriviohjelma (`⊞ Win + X` ja sitten `A`), tai (`⊞ Win + R`, kirjoita `cmd.exe` ja paina enter)
{: .dm-windows .d-none }

<span class="bg-highlight">Siirry</span> kansioon johon purit zipin komennolla `cd ~/Dokumentit/sivujetti-docker/`.
{: .dm-macos }

<span class="bg-highlight">Siirry</span> kansioon johon purit zipin komennolla `cd C:\Users\me\Dokumentit\sivujetti-docker`.
{: .dm-windows .d-none }

<span class="bg-highlight">Luo</span> Docker image ajamalla komento `docker build -t sivujetti-docker .`

## Step 3. Luo ja käynnistä kontti

### Vaihtoehto 1: Ilman tiedostojen synkkausta

<div></div>

Tämä komento luo kontin, jonka sisällä tapahtuvat muutokset ei vaikuta edellisen 1. stepin lokaaleihin tiedostoihin. Jos haluat muuttaa esim. jotain php-tiedostoa kontin sisällä, se tulee tehdä komentorivin kautta (`docker exec`).
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">Aja</span> komento `docker run -it -d -p 127.0.0.1:3000:8080 sivujetti-docker`

### Vaihtoehto 2: Synkkauksen kanssa

<div></div>

Tämä komento taas luo kontin, jossa sen sisällä tapahtuvat muutokset synkkautuu em. stepin lokaalien kansioiden kanssa, ja vice versa. Tällöin voit muokkailla esim. teematiedostoja ilman komentoriviä.
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">Aja</span> komento
```
docker run -it -d -p 127.0.0.1:3000:8080\
  -w /var/www\
  -v ~/Dokumentit/sivujetti-docker/to-outside-htdocs:/var/www/sivujetti-backend\
  -v ~/Dokumentit/sivujetti-docker/to-htdocs:/var/www/html\
  sivujetti-docker
```
{: .dm-macos }

```
docker run -it -d -p 127.0.0.1:3000:8080\
  -w /var/www\
  -v C:/Users/me/Dokumentit/sivujetti-docker/to-outside-htdocs:/var/www/sivujetti-backend\
  -v C:/Users/me/Dokumentit/sivujetti-docker/to-htdocs:/var/www/html\
  sivujetti-docker
```
{: .dm-windows .d-none }

<span class="bg-highlight">Ota ylös</span> komennon printtaaman merkkijonon alku (esim. `5e888fd9627b3e28195c18a9f6f35cb91fd025e398245d968cc8fdcc8e4527ba` -> `5e88`).

## Step 4.1

Tämä on väliaikainen steppi, ja poistuu kunhan Sivujetillä on "oikea" installeri.
{: .message-box.message data-title="Note" }

<span class="bg-highlight">Monkeypatchaa</span> kahta tiedostoa kontissa komennolla
`docker cp temp-patch.php 5e88:/var/www/sivujetti-backend/run-this-once.php && docker exec -it 5e88 /bin/sh -c 'php /var/www/sivujetti-backend/run-this-once.php && rm /var/www/sivujetti-backend/run-this-once.php'`
{: .dm-macos }

<span class="bg-highlight">Monkeypatchaa</span> kahta tiedostoa kontissa komennolla
`docker cp temp-patch.php 5e88:/var/www/sivujetti-backend/run-this-once.php && docker exec -it 5e88 /bin/sh -c "php /var/www/sivujetti-backend/run-this-once.php && rm /var/www/sivujetti-backend/run-this-once.php"`
{: .dm-windows .d-none }

Jos edellinen komento ei suostu toimimaan, koita ajaa se ilman viimeisin kohtaa (`docker cp temp-patch.php 5e88:/var/www/sivujetti-backend/run-this-once.php && docker exec -it 5e88 php /var/www/sivujetti-backend/run-this-once.php`)
{: .message-box.info data-title="Info" }

## Step 4.2

<span class="bg-highlight">Asenna</span> tyhjä teema komennolla `docker exec -it 5e88 php /var/www/sivujetti-backend/cli.php install-from-dir empty sivujettiuser user@email.com userpass - - - - /`

Tässä kohtaaa konttiin pitäisi ilmestyä uusia tiedostoja teemalle, konfiguraatiolle sekä esim. tietokannalle. Jos loit kontin tiedostosynkkauksen kanssa, nämä uudet tiedostot pitäisi nyt näkyä myös lokaaleissa kansioissa (`to-htdocs` / `to-outside-htdocs`).

## Step 5. Avaa sivusto

<span class="bg-highlight">Avaa</span> selain osoittessa [http://localhost:3000/index.php?q=/](http://localhost:3000/index.php?q=/) (sivusto), [http://localhost:3000/index.php?q=/jet-login](http://localhost:3000/index.php?q=/jet-login) (muokkaustila). Käyttäjätunnus ja salasana samat, kuin edellisessä stepissä (sivujettiuser userpass).

Uusi Sivujetti-sivustosi on nyt asennettu kontin sisään. Pidä hauskaa!

## Yhteenveto

Tässä tutoriaalissa:

- Latasit sivujetti-dockerin ja sivujetin uusimman version
- Loit kontin imagesta
- Asensit tyhjän teeman konttiin
- Avasit kontissa pyörivän sivuston selaimeen

## Muita ohjeita

Kaksi ensimmäistä ohjetta on hyödyllisiä silloin, jos loit kontin ilman tiedostojen synkkausta (jolloin ainoa tapa muuttaa tiedostoja kontin sisällä on komentorivin kautta).

### Tiedostojen muokkaus kontin sisällä

- Mene kontin sisälle
    - `docker exec -it 5e88 /bin/sh`
- Aloita muokkaamaan tiedostoa nanolla
    - `nano /var/www/sivujetti-backend/site/Site.php`
    - tai esim.
    - `nano /var/www/html/config.php`
- Tallenna tiedosto
    - Ctrl + x
    - y/n
- Poistu kontista
    - `exit`

### Tietokannan tarkasteleminen

- Mene kontin sisälle
    - `docker exec -it 5e88 /bin/sh`
- Avaa sivuston tietokanta sqlite-repliin
    - `sqlite3 sivujetti-backend/site/my-site.db`
- Tee jotain
    - `select * from Pages;`
- Poistu sqlite-replistä
    - `.q`
- Poistu kontista
    - `exit`

### Sivuston exporttaaminen

Jos haluat sivuston, ja sinne tekemäsi muutokset kontista ulos, voit tehdä sen esim. seuraavasti:

- Paketoi sivusto kontin sisällä
    - `docker exec -it 5e88 tar --create --file sivujetti-backend/exported.tar html sivujetti-backend`
- Kopioi paketti kontin sisältä omalle koneellesi (jos loit kontin ilman synkkausta, muutoin se löytyy `to-outside-htdocs` kansiosta)
    - `docker cp 5e88:/var/www/sivujetti-backend/exported.tar ~/Lataukset/my-exported-site.tar`
    {: .dm-macos }
    - `docker cp 5e88:/var/www/sivujetti-backend/exported.tar C:\Users\me\Dokumentit\Lataukset\my-exported-site.tar`
    {: .dm-windows .d-none }
- (Vapaaehtoinen) Poista paketti kontin sisältä
    `docker exec -it 5e88 rm sivujetti-backend/exported.tar`

Nyt sivusto kokonaisuudessaan löytyy `Lataukset` kansiosta koneeltasi.

### Kontin poistaminen

`docker stop 5e88 && docker rm 5e88`

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.interactifyTabs()</script>
