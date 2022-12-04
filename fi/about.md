---
layout: default
title: Yleistä
nav_order: 2
---

# Yleistä
{: .fs-9 }

Sivujetti itse hostattava, vapaa, avoimen lähdekoodin nettisivurakentaja ja sisällönhallintajärjestelmä. Sivujetin backend on kirjoitettu php:lla, ja frontend preactilla. Tiedon tallennukseen Sivujetti käyttää joko MySQL/MariaDB-, tai SQLite-tietokantaa.

## Miten Sivujetti eroaa muista vastaavista sisällönhallintajärjestelmistä?

- Sivujetissä ei ole erillistä hallintanäkymää, vaan sivujen muokkaus ja esikatselu tapahtuu yhdessä ja samassa näkymässä
    - Tämää mahdollista nopean muokkausworkflown muokkaa+tallenna+vaihdaselainikkunaa+päivitäsivu -jumpan sijasta
    - Muokkausnäkymän esikatselu, ja lopullinen sivusto ei eroa mitenkään: näet muokatessasi pikselintarkasti byte-to-byte miltä muokkauksen lopputulos tulee näyttämään
- Sivujetti renderöi sivut jopa muutamassa sekunnin sadasosassa (ei kymmenesosassa tai sekunnissa)
    - Et siis tarvitse minkäänlaista välimuistimekanismia suurissa osaa tapauksista
- Voit valita käytätkö erillistä tietokantaserveriä (MySQL/MariaDb), vai sqliteä
- Sivujetti tukee vain php:n uusinta versiota (tällä hetkellä 8.0+)
    - 0% legacy -spagettia, 100% solidia, oliopohjaista koodia
- Sivujetti on pohjimmiltaan nettisivurakentaja, ei blogialusta

## Miten Sivujetti eroaa muista nettisivurekentajista?

- Sivujetissä sisältöä ei muokata suoraan sivun "päällä" (in-place), vaan erillisessä käyttöliittymän osiossa ikään kuin kauko-ohjattuna. Tämä takaa mm. sen, että:
    - sisällön järjestely raahammalla ei mene ikinä "rikki", koska sisältö esitetään visuaalisesti normalisoituna ja aina saman kokoisena
    - sisällön lisääminen raahaamalla juuri oikeaan paikkaan on huomattavasti helpompaa ja varmempaa
    - vaikka sisältö olisi näkymättömissä itse sivulla, se on silti __aina__ muokattavissa käyttöliittymässä (toisin kuin in-place -toetutuksissa)
    - sisällön seassa voi olla "metasisältöä", kuten koodia, joka in-place -toteutuksissa ei ole mahdollista
- Sivujetti on vapaa, avoimen lähdekoodin ohjelmisto, toisin kuin suurin osa markkinoilla toimivista nettisivurakentajista
- Sivujetissä on myös sisällönhallintaominaisuuksia, kuten mahdollisuus luoda custom-sisältötyyppejä, tageja, kategorioita jne.
