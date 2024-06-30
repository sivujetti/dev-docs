---
layout: default
title: sivujetti-commons-for-edit-app
parent: Frontend-API
nav_order: 2
---

# module @sivujetti-commons-for-edit-app

Moduuli, jota voidaan käyttää lisäosissa, ks. [Luo lisäosa - osa 1 - todo](../tutorials/customize/create-plugin-part-1.html#todo). Tämäkin moduuli, on teknisesti globaali muuttuja, kuten `@sivujetti-commons-for-web-pages`, jota [rollupin ansiosta] vain käytetään kuten tavallista javascript-moduulia.

### Lähdekoodi
{: .mb-3 }

[frontend2/commons-for-edit-app/main.js <svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler icon-tabler-in-text icon-tabler-external-link" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path><line x1="10" y1="14" x2="20" y2="4"></line><polyline points="15 4 20 4 20 9"></polyline></svg>](https://github.com/sivujetti/sivujetti/blob/next/frontend2/commons-for-edit-app/main.js).

Exports
{: .text-delta .mt-8 }

- <a href="#__">__()</a>
- [api](#api)
- [env](./sivujetti-commons-for-web-pages.html#env) (@sivujetti-commons-for-web-pages)
- [events](#events)
- [floatingDialog](#floatingdialog)
- [FormGroup](#formgroup)
- [FormGroupInline](#formgroupinline)
- [handleSubmit](#handlesubmit)
- [hasErrors](#haserrors)
- [hookForm](#hookform)
- [http](./sivujetti-commons-for-web-pages.html#http) (@sivujetti-commons-for-web-pages)
- [Icon](#icon)
- [Input](#input)
- [InputError](#inputerror)
- [InputErrors](#inputerrors)
- [MenuSection](#menusection)
- [objectUtils](#objectutils)
- [reHookValues](#rehookvalues)
- [setFocusTo](#setfocusto)
- [stringUtils](#stringutils)
- [Tabs](#tabs)
- [Textarea](#textarea)
- [timingUtils](#timingutils)
- [unhookForm](#unhookform)
- [urlUtils](./sivujetti-commons-for-web-pages.html#urlutils) (@sivujetti-commons-for-web-pages)
- [validationConstraints](#validationconstraints)

## __()

```typescript
export function __(key: string, ...args?: any) => string;
```

### Examples

```javascript
import {__} from '@sivujetti-commons-for-edit-app';

const translated = __('Cancel');
console.log(translated); // "Kumoa"

const translated2 = __('New %s created', __('page'));
console.log(translated2); // "Uusi sivu luotiin"
```

## api
{: .pt-4 }

```typescript
export const api: SivujettiFrontendApi;

interface SivujettiFrontendApi {
    getPageTypes(): Array<PageType>;
    getBlockRenderers(): Array<BlockRenderer>;
    menuPanel: MenuPanel;
    blockTypes: BlockTypesRegister;
    saveButton: {
        todo: todo;
    };
    user: {
        can(doWhat: 'doAnything'|'editGlobalStylesVisually'|'editBlockCss'|'createPageTypes'|
                    'createPages'|'createReusableBranches'|'createGlobalBlockTrees'|'specializeGlobalBlocks'|
                    'editTheWebsitesBasicInfo'|'editTheWebsitesGlobalScripts'|'listUploads'): boolean;
        getRole(): number;
        ROLE_SUPER_ADMIN: number;
        ROLE_ADMIN: number;
        ROLE_ADMIN_EDITOR: number;
        ROLE_EDITOR: number;
        ROLE_AUTHOR: number;
        ROLE_CONTRIBUTOR: number;
        ROLE_FOLLOWER: number;
    };
    registerTranslationstrings(strings: {[key: string]: string}): void;
}

interface PageType {
    name: string;
    friendlyName: string;
    friendlyNamePlural: string;
    description: string;
    slug: string;
    defaultLayoutId: string;
    status: number;
    isListable: boolean;
    initialBlocks: Array<BlockBlueprint>;
    ownFields: Array<PageTypeField>;
    defaultFields: {
        [key: string]: {
            defaultValue: string;
        };
    };
}

interface PageTypeField {
    name: string;
    friendlyName: string;
    dataType: {
        type: 'text'|'json'|'int'|'uint';
        isNullable: boolean;
        length?: number;
        validationRules?: Array;
        canBeEditedBy?: number;
        rel?: string;
    };
    defaultValue: string|Array|Object|null;
}

interface BlockBlueprint {
    blockType: string;
    initialOwnData: {[key: string]: any;};
    initialDefaultsData: {
        title: string;
        renderer: string;
        styleClasses: string;
        styleGroup: string;
    };
    initialStyles: Array<StyleChunk>;
    initialChildren: Array<BlockBlueprint>;
}

interface StyleChunk {
    scss: string;
    scope: {
        kind: styleScopeKind;
        media: mediaScope;
        layer: stylesLayer;
    };
}

type styleScopeKind = 'single-block'|'custom-class'|'optimized-class'|'base';

type mediaScope = 'all'|'960'|'840'|'600'|'480'|string;

type stylesLayer = 'user-styles'|'dev-styles'|'base-styles';

interface BlockRenderer {
    fileId: string;
    friendlyName: string|null;
    associatedWith: string|null;
}

interface MenuPanel {
    scrollTo(blockId: string, behavior: 'smooth'|'auto' = 'smooth');
    scrollToSection(name: mainPanelSectionName, behavior: 'smooth'|'auto' = 'smooth');
    getOuterEl(): HTMLElement;
    setSectionCmp(name: mainPanelSectionName, cmp: preact.Component);
    getSectionCmp(name: mainPanelSectionName): preact.Component|null;
    getSectionEl(name: mainPanelSectionName): HTMLElement;
    registerSection(name: string, Cls: preact.AnyComponent): void;
    getSection(name: string, doThrowIfNotFound: boolean = false): preact.AnyComponent;
    getSections(): Map<preact.AnyComponent>;
}

type mainPanelSectionName = 'onThisPage'|'baseStyles';

interface BlockTypesRegister {
    setup(defaultBlockTypes: Array<[string, BlockTypeDefinition]>): void;
    register(name: string, blockTypeFactory: () => BlockTypeDefinition): void;
    get(name: string): BlockTypeDefinition;
    getIconId(blockType: BlockTypeDefinition|string, fallback: string = 'box'): string;
    entries(): IterableIterator<string, BlockTypeDefinition>;
}

interface BlockTypeDefinition {
    name: string;         // Examples 'Text'
    friendlyName: string; // Examples 'Text'
    editForm: preact.Component;
    editFormType?: editFormType;
    stylesEditForm: preact.Component|null;
    createOwnProps(defProps: {[key: string]: any;}): {[propName: string]: any};
    icon?: string;        // Examples 'blockquote'
}

type editFormType = 'content'|'content+user-styles';

```

## events
{: .pt-4 }

```typescript
export const events: Events;

interface Events {
    on(when: string, thenDo: (...any) => void): Function;
    emit(eventName: string, ...args: any): void;
}
```

### Examples

```typescript
import {events} from '@sivujetti-commons-for-edit-app';

const unregister = events.on('route-changed', (e, isMainColumnView) => {
    console.log('route changed', e)
});
unregister();

events.trigger('my-plugin-did-something', 'thing');
```

## floatingDialog
{: .pt-4 }

```typescript
export const floatingDialog: FloatingDialog;

interface FloatingDialog {
    open(
        Renderer: preact.ComponentType|string,
        settings: FloatingDialogSettingsInput & {[key: string]: any;},
        rendererProps: Object
    ): void;
    close(): void;
    setTitle(title: string): void;
    setOnBeforeClose(fn: () => void): void;
    setHeight(height: number, instructions: 'animate'|'' = ''): void;
}

interface FloatingDialogSettingsInput {
    title: string;
    width?: number;
    height?: number;
}
```

### Examples

```typescript
import {floatingDialog} from '@sivujetti-commons-for-edit-app';

class MyPopup extends preact.Component {
    render({prop}) {
        return [
            <div>{ prop }</div>,
            <button
                onClick={ () => floatingDialog.close() }
                class="btn btn-link"
                type="button">Ok</button>
        ];
    }
}

floatingDialog.open(MyPopup, {
    title: 'My popup',
}, {
    prop: 'foo',
});
```

## &lt;FormGroup/&gt;
{: .pt-4 }

```typescript
export class FormGroup extends preact.Component<{className?: string}, any> {
    // No public methods
}
```

### Examples

```typescript
import {FormGroup, hookForm, Input, InputErrors} from '@sivujetti-commons-for-edit-app';

class MyForm extends preact.Component {
    componentWillMount() {
        this.setState(hookForm(this, [
            {name: 'something', value: '..', validations: [['minLength', 1]], label: 'Something'},
        ]));
    }
    render(_, {values, errors}) {
        return <div>
            <FormGroup className="foo">
                <label htmlFor="myform_something" class="form-label">Something</label>
                <Input vm={ this } prop="something" id="myform_something"/>
                <InputErrors vm={ this } prop="something"/>
            </FormGroup>
            <div>
                You typed: { values.something.value }
            </div>
            <div>
                Errors: { JSON.stringify(errors.something) }
            </div>
        </div>;
    }
}
```

## &lt;FormGroupInline/&gt;
{: .pt-4 }

```typescript
export class FormGroupInline extends preact.Component<{
    className?: string;
    labelFlow?: 'ellipsis'|'break';
}, any> {
    // No public methods
}
```

## handleSubmit()
{: .pt-4 }

```typescript
export function handleSubmit(
    cmp: preact.Component,
    fn: Promise<any>,
    e: Event = null
): boolean|null;
```

## hasErrors()
{: .pt-4 }

```typescript
export function hasErrors(cmp: preact.Component): boolean;
```

## hookForm()
{: .pt-4 }

```typescript
export function hookForm(
    cmp: preact.Component,
    inputs: Array<InputDef>,
    initialState: {[key: string]: any;} = {}
): {[key: string]: any;};

interface InputDef {
    name: string;                         // e.g. 'numColumns'
    value: string|number;                 // e.g. 1, 'foo'
    validations: Array<[string, ...any]>; // e.g. [['min', 0], ['max', 12]]
    id?: string;                          // e.g. 'numColumns'
    label?: string;                       // e.g. 'Num columns'
    valueType?: string;                   // e.g. 'int'
    type?: string;                        // e.g. 'number'
    // maybe other props
}
```

## &lt;Icon/&gt;
{: .pt-4 }

```typescript
export class Icon extends preact.Component<{
    iconId: string; // see github.com/sivujetti/sivujetti/blob/master/public/sivujetti/assets/tabler-sprite-custom.svg
    className?: string;
}, any> {
    // No public methods
}
```

## &lt;Input/&gt;
{: .pt-4 }

```typescript
export class Input extends preact.Component<{
    vm: preact.Component;
    prop: string;
}, any> {
    // No public methods
}
```

## &lt;InputError/&gt;
{: .pt-4 }

```typescript
export class InputError extends preact.Component<{
    errorMessage?: string;
}, any> {
    // No public methods
}
```

## &lt;InputErrors/&gt;
{: .pt-4 }

```typescript
export class InputErrors extends preact.Component<{
    vm?: preact.Component;
    prop?: string;
    errors?: Array<{message: string;}>;
}, any> {
    // No public methods
}
```

## &lt;MenuSection/&gt;
{: .pt-4 }

```typescript
export class MenuSection extends preact.Component<{
    title: string;
    subtitle: string;
    iconId: string;
    colorClass: string;
    outerClass?: string;
    buttonClass?: string;
    onIsCollapsedChanged?: (to: boolean) => void;
    initiallyIsCollapsed?: boolean;
}, any> {
    collapseOrUncollapse(): void;
    getEl(): HTMLElement;
}
```

## objectUtils
{: .pt-4 }

```typescript
export const objectUtils: {
    clonePartially(keys: Array<string>, obj: Object): Object;
    cloneDeep(obj: Object): Object,
    cloneDeepWithChanges(obj: Object, doTheChanges: (newCopyFreeToMutate: Object) => any): Object;
}
```

## reHookValues()
{: .pt-4 }

```typescript
export function reHookValues(cmp: preact.Component, inputs: Array<InputDef>): void;
```

## setFocusTo()
{: .pt-4 }

```typescript
export function setFocusTo(ref: preact.Ref): void;
```

## stringUtils
{: .pt-4 }

```typescript
export const stringUtils: StringUtils;

interface StringUtils {
    slugify(text: string): string;
    capitalize(str: string): string;
}
```

## &lt;Tabs/&gt;
{: .pt-4 }

```typescript
export class Tabs extends preact.Component<{
    links: Array<preact.ComponentChild>;
    onTabChanged: (idx: number) => any;
    initialIndex?: number;
    className?: string;
    getTabName?: (linkText: string, tabIdx: number) => string|null;
}, any> {
    changeTab(toIdx: number): void;
}
```

## &lt;Textarea/&gt;
{: .pt-4 }

```typescript
export class Textarea extends preact.Component<{
    vm: preact.Component;
    prop: string;
}, any> {
    // No public methods
}
```

## timingUtils
{: .pt-4 }

```typescript
export const timingUtils: TimingUtils;

interface TimingUtils {
    debounce(func: Function, wait: number, immediate?: boolean): Function;
}
```

## unhookForm()
{: .pt-4 }

```typescript
export function unhookForm(cmp: preact.Component): void;
```

## validationConstraints
{: .pt-4 }

```typescript
export const validationConstraints: ValidationConstraints;

interface ValidationConstraints {
    HARD_SHORT_TEXT_MAX_LEN: number; // Default 1024
    HARD_LONG_TEXT_MAX_LEN: number;  // Default 128000
    MAX_PROSE_HTML_LENGTH: number;   // Default 128000
    INDEX_STR_MAX_LENGTH: number;    // Default 92
    SLUG_REGEXP: string;             // Default '^/[a-zA-Z0-9_-]*$'
}
```
