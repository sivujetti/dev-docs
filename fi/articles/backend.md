---
layout: default
title: Backend
parent: Artikkelit
nav_order: 1
---

# Backend

Quick facts:

- Sivujetti käyttää [Pike](https://github.com/ut4/pike)-frameworkia
- Sivujetissä sivustojen rakennetta ei pääsääntöisesti määritellä php-templaateilla, vaan muokkaustilan käyttöliittymässä
- Sivut renderöidään backendissä php:lla, mutta frontin muokkaustilassa preactilla
- Sivujetissä on mahdollista luoda custom sivutyyppejä, jossa jokaisella on oma tietokantataulu, jokainen sivutyypin sivu tuon taulun yksi rivi, ja sivun sisältö rivin `blocks` JSON -tietueen arvo
- Sivujetti ei käytä erillistä templaattiengineä (Blade, Smarty jne.), vaan pelkkää php:ta
- Sivujetti ei käytä ORMia, vaan tietokantakyselyt tehdään query builderilla / fluent-rajapinnalla
- Sivujetti vaatii toimiakseen vähintään php:n version 8.1
