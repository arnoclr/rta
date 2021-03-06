import Gestured from './gestures';
import './style.scss'

export default class RelToAbs {
    el: HTMLElement
    sections: Array<HTMLDivElement> = []
    opened: boolean = false
    placeholder: HTMLElement = null
    options: object
    defaultOptions: object = {
        swipeToClose: true,
        scrollToClose: false,
        clickOutsideToClose: false,
        scrollElement: document.body,
        coloredPlaceholder: false
    }

    constructor(el, options = {}) {
        this.el = el
        this.options = Object.assign(this.defaultOptions, options)

        // filter nodes and get only divs
        this.el.childNodes.forEach(node => {
            if(node.nodeName === 'DIV') {
                this.sections.push(node)
            }
        })

        // gestures 
        if(this.options.swipeToClose) {
            new Gestured(this.el, this.close.bind(this))
        }

        // scroll to close
        if(this.options.scrollToClose) {
            this.options.scrollElement.addEventListener('scroll', this.close.bind(this))
        }

        // click outside to close
        if(this.options.clickOutsideToClose) {
            const backdrop = this.el.querySelector('.rta__backdrop')
            backdrop.addEventListener('click', this.close.bind(this))
        }

        // close buttons
        const closeButtons = this.el.querySelectorAll('.rta--close')
        closeButtons.forEach(button => {
            button.addEventListener('click', this.close.bind(this))
        })

        // open on click
        this.el.addEventListener('click', this.open.bind(this))

        this.el.classList.add('rta')
    }

    public open(event) {
        if(this.opened) return
        this.opened = true

        // get divs dimensions 
        const position = this.getOffset(this.el)
        const dimensions = {
            width: this.el.offsetWidth,
            height: this.el.offsetHeight
        }

        // create placeholder
        this.createPlaceholder(dimensions)
        
        this.el.classList.add('rta--open')
        this.el.style.top = position.top + 'px'
        this.el.style.left = position.left + 'px'
        this.el.style.width = dimensions.width + 'px'
        this.el.style.height = dimensions.height + 'px'

        if(!this.options.scrollToClose || this.options.swipeToClose) {
            this.options.scrollElement.classList.add('rta--overflow-hidden')
        }

        setTimeout(() => {
            this.el.classList.add('rta--opened')
        }, 10)
    }

    public close(event) {
        event.stopPropagation()
        if(!this.opened) return
        this.opened = false
        navigator.vibrate(20)

        this.el.classList.remove('rta--opened')

        setTimeout(() => {
            this.el.classList.remove('rta--open')
            this.options.scrollElement.classList.remove('rta--overflow-hidden')
            this.el.style.top = null
            this.el.style.left = null
            this.el.style.width = null
            this.el.style.height = null
            this.placeholder.remove()
        }, 300)
    }

    private createPlaceholder(dimensions) {
        this.placeholder = document.createElement('div')
        this.placeholder.classList.add('rta__placeholder')
        this.placeholder.style.width = dimensions.width + 'px'
        this.placeholder.style.height = dimensions.height + 'px'
        if(this.options.coloredPlaceholder)
            this.placeholder.style.backgroundColor = this.options.coloredPlaceholder
        this.el.parentNode.insertBefore(this.placeholder, this.el)
    }

    private getOffset(el) {
        let x = 0
        let y = 0
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            x += el.offsetLeft - el.scrollLeft
            y += el.offsetTop - el.scrollTop
            el = el.offsetParent
        }
        // remove scroll offset
        x -= window.scrollX
        y -= window.scrollY

        return { top: y, left: x }
    }

}
