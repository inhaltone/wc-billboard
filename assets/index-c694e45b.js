var T=Object.defineProperty;var D=(n,e,t)=>e in n?T(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var A=(n,e,t)=>(D(n,typeof e!="symbol"?e+"":e,t),t),E=(n,e,t)=>{if(!e.has(n))throw TypeError("Cannot "+t)};var s=(n,e,t)=>(E(n,e,"read from private field"),t?t.call(n):e.get(n)),l=(n,e,t)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,t)},S=(n,e,t,o)=>(E(n,e,"write to private field"),o?o.call(n,t):e.set(n,t),t);var h=(n,e,t)=>(E(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const w of a.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&o(w)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();var f,c,r,m,M,p,I,b,x,g,P,v,R,y,q,u,F,d,N,j,C,B;const O=class O extends HTMLElement{constructor(){super();l(this,m);l(this,p);l(this,b);l(this,g);l(this,v);l(this,y);l(this,u);l(this,d);A(this,"state",{animationFrameId:null,offset:0});l(this,f,Date.now());l(this,c,{left:"left",right:"right"});l(this,r,{rate:1,direction:"left",hover:!1,clones:10,fps:30});const t=this.attachShadow({mode:"open"}),o=document.createElement("template");o.innerHTML=s(O,C,B),t.append(o.content.cloneNode(!0))}setState(t){const o=h(this,p,I).call(this,t);for(const[i]of Object.entries(this.state))typeof o[i]>"u"||(this.state[i]=o[i])}handleMouseOver(){this.stop()}handleMouseOut(){this.start()}refresh(){h(this,b,x).call(this),h(this,g,P).call(this),h(this,v,R).call(this),this.start()}connectedCallback(){this.refresh()}disconnectedCallback(){h(this,y,q).call(this)}attributeChangedCallback(){this.refresh()}animate(){this.setState({animationFrameId:requestAnimationFrame(this.animate.bind(this))});let t=Date.now(),o=t-s(this,d,N);if(o>s(this,u,F)){if(S(this,d,t-o%s(this,u,F),j),s(this,r).direction===s(this,c).left){const i=this.firstElementChild;Math.floor(i.getBoundingClientRect().right)<=this.getBoundingClientRect().left&&(this.setState({offset:-1}),this.appendChild(i)),this.decrease()}if(s(this,r).direction===s(this,c).right){const i=this.firstElementChild;Math.floor(i.getBoundingClientRect().right)>=this.getBoundingClientRect().left&&(this.setState({offset:this.state.offset-i.getBoundingClientRect().width}),this.prepend(i)),this.increase()}this.shadowRoot.querySelector(".billboard-content").style.transform=`translate3d(${this.state.offset}px, 0, 0)`}}increase(){this.setState(t=>({offset:t.offset+=s(this,r).rate}))}decrease(){this.setState(t=>({offset:t.offset-=s(this,r).rate}))}start(){this.setState({animationFrameId:requestAnimationFrame(this.animate.bind(this))})}stop(){cancelAnimationFrame(this.state.animationFrameId)}static define(t){try{customElements.define(t,this)}catch{throw new Error(`Couldn't define ${t} element`)}}};f=new WeakMap,c=new WeakMap,r=new WeakMap,m=new WeakSet,M=function(t){if(!s(this,c)[t])throw new Error('Attribute direction is incorrect! Please assign the attribute as: direction="left | right"');return s(this,c)[t]},p=new WeakSet,I=function(t){if(typeof t=="function")return t(this.state);if(typeof t=="object")return t;throw new Error("Invalid type of params! Accepted types are: Object | Function that returns Object")},b=new WeakSet,x=function(){s(this,r).rate=this.getAttribute("rate")!==null?parseFloat(this.getAttribute("rate")):s(this,r).rate,s(this,r).direction=this.getAttribute("direction")!==null?h(this,m,M).call(this,this.getAttribute("direction")):s(this,r).direction,s(this,r).hover=this.hasAttribute("hover"),s(this,r).clones=this.getAttribute("clones")!==null?parseInt(this.getAttribute("clones")):s(this,r).clones},g=new WeakSet,P=function(){for(let t=0;t<s(this,r).clones;t++)this.appendChild(this.firstElementChild.cloneNode(!0))},v=new WeakSet,R=function(){s(this,r).hover&&(this.addEventListener("mouseenter",this.handleMouseOver,!1),this.addEventListener("mouseleave",this.handleMouseOut,!1))},y=new WeakSet,q=function(){s(this,r).hover&&(this.removeEventListener("mouseenter",this.handleMouseOver,!1),this.removeEventListener("mouseleave",this.handleMouseOut,!1))},u=new WeakSet,F=function(){return 1e3/s(this,r).fps},d=new WeakSet,N=function(){return s(this,f)},j=function(t){S(this,f,t)},C=new WeakSet,B=function(){return`
            <style>
             .billboard-root {
                        overflow-x: hidden;
                     }
                    .billboard-content {
                        width: 150%;
                        display: flex;
                        overflow: hidden;
                    }
            </style>
            <div class="billboard-root">
                <div class="billboard-content">
                    <slot></slot>
                </div>
            </div>
        `},l(O,C);let L=O;function H(){L.define("billboard-component")}document.querySelector("#app").innerHTML=`
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
`;H();
