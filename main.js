import './style.css'
import defineBillboardComponent from "./Billboard.js";

document.querySelector('#app').innerHTML = `
  <main>
    <billboard-component rate=".8" direction="left" clones="10">
        <h5>Component Example</h5>
    </billboard-component>
     <billboard-component rate="1.5" direction="left" clones="10">
        <h5>Component Example</h5>
    </billboard-component>
    <billboard-component rate="3" direction="right" clones="10" hover>
        <h5>Component Second example</h5>
    </billboard-component>
     <billboard-component rate="2" direction="left" clones="10">
        <h5>Wep Component</h5>
    </billboard-component>
  </main>
`

defineBillboardComponent();
