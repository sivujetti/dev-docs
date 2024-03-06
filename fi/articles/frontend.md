---
layout: default
title: Frontend
parent: Artikkelit
nav_order: 2
---

# Frontend

Sivujetin frontend koostuu useasta [Preact](https://preactjs.com/) -komponentista. Sivuston esikatselu pyörii erillisen &lt;iframe&gt;:n sisällä, jonka pääsivun komponentti luo ja päivittää sivulatauksen sekä navigoinnin yhdeydessä. Kommunikointi pääsivun komponentin ja esikatselu-komponentin välillä tapahtuu [`MessageChannel`](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) -oliolla.

