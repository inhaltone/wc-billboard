class Billboard extends HTMLElement {
    state = {
        animationFrameId: null,
        offset: 0
    };

    #timeElapsed = Date.now();

    #directionValues = {
        left: 'left',
        right: 'right'
    }

    #config = {
        rate: 1,
        direction: 'left',
        hover: false,
        clones: 10,
        fps: 30
    }

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const root = document.createElement('template');
        root.innerHTML = Billboard.#Template;
        shadow.append(root.content.cloneNode(true));
    }

    #validateDirectionAttr(label) {
        if (!this.#directionValues[label]) {
            throw new Error('Attribute direction is incorrect! Please assign the attribute as: direction="left | right"');
        }
        return this.#directionValues[label];
    }

    #validateStateFunctionParameters(value) {
        if (typeof value === 'function') {
            return value(this.state);
        } else if (typeof value === 'object') {
            return value;
        } else {
            throw new Error('Invalid type of params! Accepted types are: Object | Function that returns Object');
        }
    }

    setState(args) {
        const params = this.#validateStateFunctionParameters(args);
        for (const [key] of Object.entries(this.state)) {
            if (typeof params[key] === 'undefined') continue;
            this.state[key] = params[key];
        }
    }

    #setupConfig() {
        this.#config.rate = this.getAttribute('rate') !== null ? parseFloat(this.getAttribute('rate')) : this.#config.rate;
        this.#config.direction = this.getAttribute('direction') !== null ? this.#validateDirectionAttr(this.getAttribute('direction')) : this.#config.direction;
        this.#config.hover = this.hasAttribute('hover');
        this.#config.clones = this.getAttribute('clones') !== null ? parseInt(this.getAttribute('clones')) : this.#config.clones;
    }

    #generateClones() {
        for (let i = 0; i < this.#config.clones; i++) {
            this.appendChild(this.firstElementChild.cloneNode(true));
        }
    }

    #attachMouseListeners() {
        if (!this.#config.hover) return;
        this.addEventListener('mouseenter', this.handleMouseOver, false);
        this.addEventListener('mouseleave', this.handleMouseOut, false);
    }

    #destroyMouseListeners() {
        if (!this.#config.hover) return;
        this.removeEventListener('mouseenter', this.handleMouseOver, false);
        this.removeEventListener('mouseleave', this.handleMouseOut, false);
    }

    handleMouseOver() {
        this.stop()
    }

    handleMouseOut() {
        this.start();
    }

    refresh() {
        this.#setupConfig();
        this.#generateClones();
        this.#attachMouseListeners();
        this.start();
    }

    connectedCallback() {
        this.refresh();
    }

    disconnectedCallback() {
        this.#destroyMouseListeners();
    }

    attributeChangedCallback() {
        // do something in reactive mode
        this.refresh();
    }

    animate() {
        this.setState({animationFrameId: requestAnimationFrame(this.animate.bind(this))});
        let now = Date.now();
        let delta = now - this.#then;
        if (delta > this.#interval) {
            this.#then = now - (delta % this.#interval);
            if (this.#config.direction === this.#directionValues.left) {
                const firstListItem = this.firstElementChild;
                let rightSideOfFirstItem = Math.floor(firstListItem.getBoundingClientRect().right);
                if (rightSideOfFirstItem <= this.getBoundingClientRect().left) {// APPEND FIRST ITEM TO END
                    this.setState({offset: -1});
                    this.appendChild(firstListItem);
                }
                this.decrease();
            }

            if (this.#config.direction === this.#directionValues.right) {
                const lastListItem = this.firstElementChild;
                let rightSideOfFirstItem = Math.floor(lastListItem.getBoundingClientRect().right);
                if (rightSideOfFirstItem >= this.getBoundingClientRect().left) {
                    this.setState({offset: this.state.offset - lastListItem.getBoundingClientRect().width});
                    this.prepend(lastListItem);
                }
                this.increase();
            }

            this.shadowRoot.querySelector('.billboard-content').style.transform = `translate3d(${this.state.offset}px, 0, 0)`;
        }
    }

    increase() {
        this.setState((state) => ({
            offset: state.offset += this.#config.rate
        }));
    }

    decrease() {
        this.setState((state) => ({
            offset: state.offset -= this.#config.rate
        }));
    }

    start() {
        this.setState({animationFrameId: requestAnimationFrame(this.animate.bind(this))});
    }

    stop() {
        cancelAnimationFrame(this.state.animationFrameId);
    }

    get #interval() {
        return (1000 / this.#config.fps);
    }

    get #then() {
        return this.#timeElapsed;
    }

    set #then(value) {
        this.#timeElapsed = value;
    }


    // Static Methods
    static get #Template() {
        return `
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
        `
    }

    static define(tag) {
        try {
            customElements.define(tag, this);
        } catch (err) {
            throw new Error(`Couldn't define ${tag} element`);
        }
    }
}


export default function defineBillboardComponent() {
    Billboard.define('billboard-component');
}
