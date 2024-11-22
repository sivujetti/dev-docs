---
layout: default
title:  ^^text^^
parent: Installation
grand_parent: Tutorials
nav_order: 2
---

# ^^text^^
{: .no_toc }

^^text^^

<div id="tutorial-os-selector" class="mb-6">
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'macos')" type="button" name="button" class="btn selected">Macos</button>
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'windows')" type="button" name="button" class="btn">Windows</button>
<button type="button" name="button" class="btn" disabled>Linux</button>
</div>

## Step 0. ^^text^^

^^text^^

## Step 1. ^^text^^

### sivujetti-docker

<span class="bg-highlight">Download</span> [sivujetti-docker-0.3.0.zip](https://github.com/sivujetti/sivujetti-docker/releases/download/sivujetti-docker-0.3.0/sivujetti-docker-0.3.0.zip).

<span class="bg-highlight">^^text^^</span> ^^text^^:
{: .dm-macos }

<span class="bg-highlight">Pura</span> ^^text^^:
{: .dm-windows .d-none }
```
/Documents
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

<span class="bg-highlight">Download</span> [sivujetti-0.16.0.zip](https://github.com/sivujetti/sivujetti/releases/download/sivujetti-0.16.0/sivujetti-0.16.0.zip) ^^text^^:
```
/Documents
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

## Step 2. ^^text^^

^^text^^.

<span class="bg-highlight">^^text^^</span> ^^text^^
{: .dm-macos }

<span class="bg-highlight">^^text^^</span> ^^text^^
{: .dm-windows .d-none }

<span class="bg-highlight">^^text^^</span> ^^text^^ `cd ~/Documents/sivujetti-docker/`.
{: .dm-macos }

<span class="bg-highlight">^^text^^</span> ^^text^^ `cd C:\Users\me\Documents\sivujetti-docker`.
{: .dm-windows .d-none }

<span class="bg-highlight">^^text^^</span> ^^text^^ `docker build -t sivujetti-docker .`

## Step 3. ^^text^^

^^text^^

### Option 1: ^^text^^

<div></div>

^^text^^
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">Run</span> `docker run -it -d -p 127.0.0.1:3000:8080 sivujetti-docker`

### Option 2: ^^text^^

<div></div>

^^text^^
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">Run</span>
```
docker run -it -d -p 127.0.0.1:3000:8080\
  -w /var/www\
  -v ~/Documents/sivujetti-docker/to-outside-htdocs:/var/www/sivujetti-backend\
  -v ~/Documents/sivujetti-docker/to-htdocs:/var/www/html\
  sivujetti-docker
```
{: .dm-macos }

```
docker run -it -d -p 127.0.0.1:3000:8080\
  -w /var/www\
  -v C:/Users/me/Documents/sivujetti-docker/to-outside-htdocs:/var/www/sivujetti-backend\
  -v C:/Users/me/Documents/sivujetti-docker/to-htdocs:/var/www/html\
  sivujetti-docker
```
{: .dm-windows .d-none }

<span class="bg-highlight">^^text^^</span> ^^text^^ (e.g. `5e888fd9627b3e28195c18a9f6f35cb91fd025e398245d968cc8fdcc8e4527ba` -> `5e88`).

## Step 4.1.

^^text^^
{: .message-box.message data-title="Note" }

<span class="bg-highlight">Monkeypatch</span> ^^text^^
`docker cp temp-patch.php 5e88:/var/www/sivujetti-backend/run-this-once.php && docker exec -it 5e88 /bin/sh -c 'php /var/www/sivujetti-backend/run-this-once.php && rm /var/www/sivujetti-backend/run-this-once.php'`
{: .dm-macos }

<span class="bg-highlight">Monkeypatch</span> ^^text^^
`docker cp temp-patch.php 5e88:/var/www/sivujetti-backend/run-this-once.php && docker exec -it 5e88 /bin/sh -c "php /var/www/sivujetti-backend/run-this-once.php && rm /var/www/sivujetti-backend/run-this-once.php"`
{: .dm-windows .d-none }

^^text^^ (`docker cp temp-patch.php 5e88:/var/www/sivujetti-backend/run-this-once.php && docker exec -it 5e88 php /var/www/sivujetti-backend/run-this-once.php`)
{: .message-box.info data-title="Info" }

## Step 4.2.

<span class="bg-highlight">^^text^^</span> ^^text^^ `docker exec -it 5e88 php /var/www/sivujetti-backend/cli.php install-from-dir minimal sivujettiuser user@email.com userpass - - - - /`

^^text^^

## Step 5. ^^text^^

<span class="bg-highlight">^^text^^</span> ^^text^^ [http://localhost:3000/index.php?q=/](http://localhost:3000/index.php?q=/) (^^text^^), [http://localhost:3000/index.php?q=/jet-login](http://localhost:3000/index.php?q=/jet-login) (edit mode). ^^text^^.

^^text^^

## ^^text^^

In this tutorial:

- ^^text^^

## ^^text^^
^^text^^

### ^^text^^

- ^^text^^
    - `docker exec -it 5e88 /bin/sh`
- ^^text^^
    - `nano /var/www/sivujetti-backend/site/Site.php`
    - or
    - `nano /var/www/html/config.php`
- ^^text^^
    - Ctrl + x
    - y/n
- ^^text^^
    - `exit`

### ^^text^^

- ^^text^^
    - `docker exec -it 5e88 /bin/sh`
- ^^text^^
    - `sqlite3 sivujetti-backend/site/my-site.db`
- Do something
    - `select title, slug from Pages;`
- Exit sqlite repl
    - `.q`
- ^^text^^
    - `exit`

### ^^text^^

^^text^^:

- ^^text^^
    - `docker exec -it 5e88 tar --create --file sivujetti-backend/exported.tar html sivujetti-backend`
- ^^text^^
    - `docker cp 5e88:/var/www/sivujetti-backend/exported.tar ~/Lataukset/my-exported-site.tar`
    {: .dm-macos }
    - `docker cp 5e88:/var/www/sivujetti-backend/exported.tar C:\Users\me\Documents\Lataukset\my-exported-site.tar`
    {: .dm-windows .d-none }
- (Optional) ^^text^^
    `docker exec -it 5e88 rm sivujetti-backend/exported.tar`

^^text^^

### ^^text^^

^^text^^

`docker start 5e88`

^^text^^ `docker ps -a` ^^text^^
{: .message-box.info data-title="Info" }

### ^^text^^

`docker stop 5e88 && docker rm 5e88`

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.interactifyTabs()</script>
