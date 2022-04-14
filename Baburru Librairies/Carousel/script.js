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
     * @param {Object} [options.slidesToScroll=1] , slidesToScroll = Number of elements to scroll (WARNING this have to be < than slidesVisible or bugs)
     * @param {Object} [options.slidesVisible=1] , slideVisible = Number of elements visible on screen in same time
     * @param {Boolean} [options.pagination=false] , pagination = If you want little dots to go directly to the slide you want 
     * @param {Boolean} [options.loop=false] , loop = If YES or NO when u are at end of items it goes back to start/end !WARNING! => Do not use with infinite or bugs
     * @param {Boolean} [options.navigation=true] , navigation = If YES or NO you want navigate in the slides by using buttons or keyboard's arrows
     * @param {boolean} [options.infinite=false] , infinite = You can scroll as much as u want on a side and it never stop
     */

    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false ,
            pagination : false ,
            navigation : true ,
            infinite : false
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
            return item
        })

        if (this.options.infinite) {
            this.offset = this.options.slidesVisible * 2 -1
            this.items = [
                ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true))

            ]
                this.goToItem(this.offset, false)
                window.setTimeout(() => {
                    this.goToItem(offset + 1, false)
                },)
        }

        this.items.forEach(item => this.container.appendChild(item))

        this.setStyle()
        if (this.options.navigation) {
            this.createNavigation()
            this.root.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'Right') {
                    this.next()
                } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                    this.prev()
                }
            })
            if (this.options.infinite) {
                this.container.addEventListener('transitionend', this.resetInfinite.bind(this))
            }
        }

        if (this.options.pagination) {
            this.createPagination()
        }

        this.moveCallbacks.forEach(cb => cb(this.currentItem))
        this.onWindowResize()


        window.addEventListener('resize', this.onWindowResize.bind(this))


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

    createPagination () { 
        let pagination = this.createDivWithClass('carousel__pagination')
        let buttons = []
        this.root.appendChild(pagination)
        debugger
        for (let i = 0; i < this.items.length; i = i + this.options.slidesToScroll){
            let button = this.createDivWithClass('carousel__pagination__button')
            button.addEventListener('click', () => this.goToItem(i))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
           let activeButton = buttons[ Math.floor(index / this.options.slidesToScroll) ]
           if (activeButton) {
               buttons.forEach(button => button.classList.remove('carousel__pagination__button--active'))
               activeButton.classList.add('carousel__pagination__button--active')
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
     * @param {boolean} [animation = true ]  , If YES or NO you want an animation when u change item ...
     */

    goToItem(index, animation = true) {
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
        if (this.currentItem + this.slidesToScroll > this.items.length) {
            index = this.items.length - this.slidesVisible
        }

        if (index + this.slidesToScroll >= this.items.length){
            index = this.items.length - this.slidesVisible
        }
        /* Apply transition */
        let translateX = index * -100 / this.items.length
        if (animation === false) {
            this.container.style.transition = 'none'
        }
        this.container.style.transform = 'translate3d(' + translateX + '%,0,0)'
        this.container.offsetHeight // force repaint
        if (animation === false) {
            this.container.style.transition = ''
        }
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }

    /**
     * Déplace le containter pour donner l'impression d'un slide infini
     */

    resetInfinite () {
        if (this.currentItem <= this.options.slidesToScroll) {
            this.goToItem(this.currentItem + this.items.length -2 * this.offset, false)
        } else if (this.currentItem >= this.items.length - this.offset) {
            this.goToItem(this.currentItem - (this.items.length - 2 * this.offset), false)
        }
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




let onReady = function() {
    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 3,
        slidesToScroll: 1 ,     
    })



    new Carousel(document.querySelector('#carousel2'), {
        slidesVisible: 4,
        slidesToScroll: 3,
        loop:true ,
        pagination: true
    })

    new Carousel(document.querySelector('#carousel3'), {
        slidesVisible: 4,
        slidesToScroll: 3,
        infinite: true
    })
}



if (document.readyState !== 'loading') {
    onReady()
}

document.addEventListener('DOMContentLoaded', onReady) 
