# Billboard
### Wep Component written in plain Javascript

## Html

```html
 <main>
    <billboard-component rate=".8" direction="left" clones="10" hover>
        <h5>Component Example</h5>
    </billboard-component>
</main>
```

## Attributes

```typescript
interface Config {
    rate: Number;
    direction: 'right' | 'left';
    clones: Number;
    hover: boolean
}
```

## Javascript

```js
import defineBillboardComponent from "./Billboard.js";

defineBillboardComponent();
```
