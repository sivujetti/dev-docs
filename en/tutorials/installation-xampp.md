---
layout: default
title:  ^^text^^ XAMPP/MAMP
parent: Installation
grand_parent: Tutorials
nav_order: 1
---

# ^^text^^ XAMPP/MAMP
{: .no_toc }

^^text^^

<div id="tutorial-os-selector" class="mb-6">
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'macos')" type="button" name="button" class="btn selected">Macos</button>
<button onclick="sivujettiDocs.showInstallationTutorialInstructionsFor(event, 'windows')" type="button" name="button" class="btn">Windows</button>
<button type="button" name="button" class="btn" disabled>Linux</button>
</div>

---

## Step 0. ^^text^^

^^text^^:
{: .dm-macos }
```ini
[xdebug]
zend_extension="/Applications/MAMP/bin/php/php8.x.x/lib/php/extensions/no-debug-non-zts-yyyymmdd/xdebug.so"
;xdebug.mode=debug
;xdebug.start_with_request=yes

; ^^text^^
; extension=imap.so
```
{: .dm-macos }

^^text^^. Make sure that the line `extension=sodium` is not commented out in `c:\xampp\php\php.ini`.
{: .dm-windows .d-none }

## Step 1. ^^text^^

<span class="bg-highlight">Download</span> [sivujetti-0.16.0.zip](https://github.com/sivujetti/sivujetti/releases/download/sivujetti-0.16.0/sivujetti-0.16.0.zip).

^^text^^
{: .dm-macos }

^^text^^
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
## Step 2. ^^text^^

<span class="bg-highlight">^^text^^</span> ^^text^^
{: .dm-macos }

<span class="bg-highlight">^^text^^</span> ^^text^^
{: .dm-windows .d-none }

<span class="bg-highlight">^^text^^</span> ^^text^^ `cd /Applications/MAMP/htdocs/hello-sivujetti/`.
{: .dm-macos }

<span class="bg-highlight">^^text^^</span> ^^text^^ `cd c:\xampp\htdocs\hello-sivujetti\`.
{: .dm-windows .d-none }

<span class="bg-highlight">^^text^^</span> ^^text^^ `php backend/cli.php install-from-dir minimal sivujettiuser user@email.com userpass - - - - /hello-sivujetti/`
{: .dm-macos }

^^text^^ `command not found: php`, run `alias php='/Applications/MAMP/bin/php/php8.3.9/bin/php'` and try again.
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">^^text^^</span> ^^text^^ `c:\xampp\php\php.exe backend\cli.php install-from-dir minimal sivujettiuser user@email.com userpass - - - - /hello-sivujetti/`
{: .dm-windows .d-none }

^^text^^ <span class="bg-highlight">^^text^^</span> `c:\xampp\php\libsodium.dll` ^^text^^ `c:\xampp\apache\bin\libsodium.dll` and restart Apache.
{: .message-box.info .dm-windows .d-none data-title="Info" }
</div>
<div class="d-none" markdown="1">
## Step 2.1 ^^text^^

<span class="bg-highlight">^^text^^</span> ^^text^^
{: .dm-macos }

<span class="bg-highlight">^^text^^</span> ^^text^^
{: .dm-windows .d-none }

<span class="bg-highlight">Luo</span> ^^text^^ `/Applications/MAMP/Library/bin/mysql -u root -p` (^^text^^ `root`), then `create database hellosivujetti;`, and finally `exit`
{: .dm-macos }

<span class="bg-highlight">^^text^^</span> ^^text^^ `c:\xampp\mysql\bin\mysql.exe -u root`, then `create database hellosivujetti;`, and finally `exit`
{: .dm-windows .d-none }

^^text^^
{: .message-box .info .mt-0 data-title="Info" }

## Step 2.2 ^^text^^

<span class="bg-highlight">^^text^^</span> ^^text^^ `cd /Applications/MAMP/htdocs/hello-sivujetti/`.
{: .dm-macos }

<span class="bg-highlight">^^text^^</span> ^^text^^ `cd c:\xampp\htdocs\hello-sivujetti\`.
{: .dm-windows .d-none }

<span class="bg-highlight">^^text^^</span> `php backend/cli.php install-from-dir minimal sivujettiuser user@email.com userpass mysql:127.0.0.1:8889 hellosivujetti root root /hello-sivujetti/`
{: .dm-macos }

(replace `... mysql:127.0.0.1:8889 hellosivujetti ...` -> `... mysql hellosivujetti ...` ^^text^^)
{: .dm-macos }

^^text^^ `command not found: php`, run `alias php='/Applications/MAMP/bin/php/php8.3.9/bin/php'` and try again.
{: .message-box.info .dm-macos data-title="Info" }

<span class="bg-highlight">^^text^^</span> `c:\xampp\php\php.exe backend\cli.php install-from-dir minimal sivujettiuser user@email.com userpass mysql hellosivujetti root - /hello-sivujetti/`
{: .dm-windows .d-none }

^^text^^ <span class="bg-highlight">^^text^^</span> `c:\xampp\php\libsodium.dll` kansioon `c:\xampp\apache\bin\libsodium.dll` and restart Apache.
{: .message-box.info .dm-windows .d-none data-title="Info" }
</div>
</div>

## Step 3. ^^text^^

<span class="bg-highlight">^^text^^</span> ^^text^^ [http://localhost/hello-sivujetti/index.php?q=/](http://localhost/hello-sivujetti/index.php?q=/) (^^text^^), [http://localhost/hello-sivujetti/index.php?q=/jet-login](http://localhost/hello-sivujetti/index.php?q=/jet-login) (edit mode). ^^text^^ (sivujettiuser userpass).

^^text^^ [http://localhost:8888/hello-sivujetti/index.php?q=/](http://localhost:8888/hello-sivujetti/index.php?q=/) and [http://localhost:8888/hello-sivujetti/index.php?q=/jet-login](http://localhost:8888/hello-sivujetti/index.php?q=/jet-login) ^^text^^
{: .message-box.info data-title="Info" }

^^text^^

## ^^text^^

^^text^^

<script src="/assets/js/sivujetti-docs.js"></script>
<script>sivujettiDocs.interactifyTabs()</script>
