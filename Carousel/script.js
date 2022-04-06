class Carousel {

    /**
     * 
     * @callback moveCallback
     * @param {number} index 
     */




    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options , slidesToScroll = Number of elements to scroll
     * @param {Object} options , slideVisible = Number of elements visible on screen in same time
     * @param {Boolean} options , loop = If YES or NO when u are at end of items it goes back to start/end
     */

    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.setAttribute('tabindex','0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(cb => cb(0))
        this.onWindowResize()


        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next()
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                this.prev()
            }
        })

    }

    /**
     * Auto apply dimension of items with the container's dimensions
     */

    setStyle() {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
    }

    /**
     * Add arrow navigation system
     */

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if (this.options.loop === true) {
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.items[this.currentItem + this.slidesVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')
            }
        })
    }

    next() {
        this.goToItem(this.currentItem + this.slidesToScroll)
    }

    prev() {
        this.goToItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Move items to selected direction/distance
     * @param {number} index 
     */

    goToItem(index) {
        /* If u try to go left on u are at start and loop activated it go to end */
        if (index < 0) {
            if (this.options.loop) {
                
            index = this.items.length - this.slidesVisible

            if (this.currentItem < this.options.slidesToScroll && this.currentItem != 0) {
                index = 0
            }
        
            } else {
                return
            }

        /* If u try to go right on u are at end and loop activated it go to start */
        } else if (index >= this.items.length || this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem) {
            if (this.options.loop) {
                index = 0
            } else {
                return
            }

        }

        /* Stystem to make sure that ur not scrolling to much and displa blank item */
        if ((this.items.length - this.options.slidesVisible) < this.options.slidesToScroll && index != 0){
            index = this.items.length - this.slidesVisible
        }
        if (this.currentItem + index + this.slidesToScroll > this.items.length) {
            index = this.items.length - this.slidesVisible
        }

        /* Apply transition */
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%,0,0)'
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    /**
     * 
     * @param {moveCallback} cb 
     */

    onMove(cb) {
        this.moveCallbacks.push(cb)
        
    }

    onWindowResize () {
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentItem))
        }
    }

    /**
     * Permet de créer une div avec en parametre le nom de la classe voulu
     * @param {string} className 
     * @returns {HTMLElement}
     */

    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    /**
     * @returns {number}
     */

    get slidesToScroll () {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
    
    
    /**
     * @returns {number}
     */

    get slidesVisible () {
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}

/**
 * Partie a copier/coller autant de fois que vous souhaitez creer de carousel et changer l'id du "Query Selector avec celui "
 */

document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 3,
        slidesToScroll: 1,
        loop: false
    })

    new Carousel(document.querySelector('#carousel2'), {
        slidesVisible: 4,
        slidesToScroll: 2,
        loop: true
    })

})


