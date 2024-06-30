---
layout: default
title: sivujetti-commons-for-web-pages
parent: Frontend-API
nav_order: 1
---

# module @sivujetti-commons-for-web-pages

Minimaalinen moduuli, jota voidaan käyttää julkisten sivujen yhteydessä. Muuntuu rollupissa muodosta
```javascript
import {foo} from '@sivujetti-commons-for-web-pages';
```
muotoon ->
```javascript
import {foo} from '${public_path}/sivujetti/sivujetti-commons-for-web-pages.js`;
```
ja sitten ->
```javascript
(function (_sivujettiCommonsForWebPages) {
  const _foo = _sivujettiCommonsForWebPages.foo;
})(window.sivujettiCommonsForWebPages);
```
(, siis moduuli on globaali muuttuja, vaikka se importataan). Ks. myös [rollup.config.js <svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler icon-tabler-in-text icon-tabler-external-link" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path><line x1="10" y1="14" x2="20" y2="4"></line><polyline points="15 4 20 4 20 9"></polyline></svg>](https://github.com/sivujetti/sivujetti/blob/master/rollup.config.js).

### Lähdekoodi
{: .mb-3 }

[frontend2/commons-for-web-pages/main.js <svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler icon-tabler-in-text icon-tabler-external-link" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path><line x1="10" y1="14" x2="20" y2="4"></line><polyline points="15 4 20 4 20 9"></polyline></svg>](https://github.com/sivujetti/sivujetti/blob/next/frontend2/commons-for-web-pages/main.js).

---

Exports
{: .text-delta .mt-8 }

- [env](#env)
- [http](#http)
- [urlAndSlugUtils](#urlandslugutils)
- [urlUtils](#urlUtils)

## env

Lähinnä testihin tarkoitettu configuraatio-olio.

```typescript
export const env: Env;

interface Env {
    window: Window;
    document: Document;
    normalTypingDebounceMillis: number;
}
```

### Example

```
import {env} from '@sivujetti-commons-for-web-pages';

console.log(env.normalTypingDebounceMillis) // 200
```

## http
{: .pt-4 }

```typescript
export const http: Http;

interface Http {
    new (
    	fetchFn: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response> = (url, settings) => window.fetch(url, settings),
    	makeUrl: (url: string) => string = url => url
    ): Http;
    get<T>(url: string, settings: RequestInit = {}): Promise<T>;
    post<T>(url: string, data: Object, settings: RequestInit = {}, defaults: RequestInit = {method: 'POST'}): Promise<T>;
    put<T>(url: string, data: Object, settings: RequestInit = {}): Promise<T>;
    delete<T>(url: string, settings: RequestInit = {}): Promise<T>;
}
```

### Example

```javascript
import {http} from '@sivujetti-commons-for-web-pages';

const settings = await getSettings();
console.log(settings); // [...]

async function getSettings() {
    try {
        return await http.get('/plugins/jet-forms/settings/mailSendSettings');
    } catch (err) {
        window.console.error(err);
    }
}
```

## urlAndSlugUtils
{: .pt-4 }

```typescript
export const urlAndSlugUtils: UrlAndSlugUtils;

interface UrlAndSlugUtils {
    getCompletedUrl(url: string): string;
    normalizeExternalUrl(url: string): string;
}
```

### Examples

```javascript
import {urlAndSlugUtils} from '@sivujetti-commons-for-web-pages';

console.log(urlAndSlugUtils.getCompletedUrl('/slug')); // "/sub-dir/slug"

console.log(urlAndSlugUtils.normalizeExternalUrl('foo.com')); // "http://foo.com"
```

## urlUtils
{: .pt-4 }

```typescript
export const urlUtils: UrlUtils;

interface UrlUtils {
    baseUrl: string;
    assetBaseUrl: string;
    currentPageSlug: string;
    cacheBustStr: string; // website.versionId by default
    new (
        envConfig: {baseUrl?: string; assetBaseUrl?: string; currentPageSlug?: string; cacheBustStr?: string;},
        env: Env
    ): UrlUtils;
    withCacheBustStr(url: string): string;
    makeUrl(url: string, includeDomain: boolean = false, normalizeQ: boolean = true): string;
    makeAssetUrl(url: string, includeDomain: boolean = false): string;
    redirect(url: string, includeDomain: boolean = false, normalizeQ: boolean = false): void;
}
```

### Examples

```javascript
import {urlUtils} from '@sivujetti-commons-for-web-pages';

console.log(urlUtils.baseurl);         // "/index.php?q=/"
console.log(urlUtils.assetBaseurl);    // "/"
console.log(urlUtils.currentPageSlug); // "/"
console.log(urlUtils.cacheBustStr);    // "abdc1234"

console.log(urlUtils.withCacheBustStr('foo.png')); // "foo.png?v=abdc1234"
console.log(urlUtils.makeUrl('/slug'));            // "/index.php?q=/slug"
console.log(urlUtils.makeAssetUrl('/public/uploads/pic.png')); // "/public/uploads/pic.png"
urlUtils.redirect('/_edit&show-message=page-deleted', true);
```
