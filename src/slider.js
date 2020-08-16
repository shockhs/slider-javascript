import styles from './assets/styles/slider.css'
import PositionsController from './Controller'
import Controls from './ControlsBar'

export default class SliderJS {
    /**
     * @param {string} sliderName - slider container id
     * @param {Object} config - configuration object
     * @param {number} config.width - Set width of the elements
     * @param {number} config.height - Set height of the elements
     * @param {number} config.iconSize - Set controls icons size
     * @param {number} config.timeout - Set timeout for auto-sliding
     * @param {boolean} config.hideControls - Hide controls bar
     */
    constructor(sliderName, { width = 940, height = 270, iconSize = 60, timeout = 3000, hideControls = false } = {}) {
        this.slider = document.getElementById(sliderName)
        this.timeout = timeout
        this.checkedWidth = window.innerWidth > 0 && window.innerWidth >= width ? width : window.innerWidth

        if (this.slider) {
            this.getSliderParams()
            this.setSlider({ height, iconSize, hideControls })
        } else {
            throw new Exeption(`Не был найден слайдер с id ${sliderName}`)
        }
    }

    getStatusPresentation = () => this.statusPresentation

    getButtonBlockedStatus = () => this.buttonBlocked

    setStatusPresentation = (status) => (this.statusPresentation = status)

    clearIntervalPresentation = () => clearInterval(this.presentation)

    setSlider({ height, iconSize, hideControls }) {
        if (this.defaultNumberOfElements < 1) {
            throw new Exeption('Слайдер не содержит элементов внутри')
        } else {
            this.setRootStyle(height)
            this.activateContainer()
            this.setStartedParams()
            this.setStartedPositions()
            this.addListenersForTransition()
            this.addListenersForTouchSwipe()
            this.addListenersForMouseSwipe()
            this.addListenersForWindow()
            if (!hideControls && window.innerWidth >= 724) {
                this.addControls(iconSize)
            }
        }
    }

    setPresentationInterval = () => {
        this.presentation = setInterval(() => {
            this.simulationNextClick()
        }, this.timeout)
    }

    resetInterval = () => {
        if (this.presentation) this.clearIntervalPresentation()
        this.setPresentationInterval()
    }

    getSliderParams = () => {
        this.slider.className = 'slider'
        this.defaultNumberOfElements = slider.children.length
        this.numberOfElements = this.defaultNumberOfElements
    }

    setRootStyle = (height) => {
        const root = document.documentElement
        root.style.setProperty('--checkedWidth', `${this.checkedWidth}px`)
        root.style.setProperty('--height', `${height}px`)
    }

    setStartedParams = () => {
        this.statusPresentation = true
        this.buttonBlocked = false
        this.startPosition = null
        this.setPresentationInterval()
        this.positionsController = new PositionsController(this.numberOfElements)
    }

    setStartedPositions() {
        this.controlContainer.children[
            this.positionsController.getPrev()
        ].className = `${styles.imageDefault} ${styles.prevNumber}`
        this.controlContainer.children[
            this.positionsController.getCurrent()
        ].className = `${styles.imageDefault} ${styles.currentNumber}`
        this.controlContainer.children[
            this.positionsController.getNext()
        ].className = `${styles.imageDefault} ${styles.nextNumber}`
    }

    simulationNextClick = () => {
        this.controlContainer.children[this.positionsController.getPrev()].className = styles.imageDefault
        this.controlContainer.classList.add(styles.nextClick)
        this.positionsController.goNext()
    }

    simulationPrevClick = () => {
        this.controlContainer.children[this.positionsController.getNext()].className = styles.imageDefault
        this.controlContainer.classList.add(styles.prevClick)
        this.positionsController.goPrev()
    }

    addListenersForTransition = () => {
        this.controlContainer.addEventListener('transitionstart', () => {
            this.buttonBlocked = true
        })

        this.controlContainer.addEventListener('transitionend', () => {
            this.controlContainer.children[
                this.positionsController.getNext()
            ].className = `${styles.imageDefault} ${styles.nextNumber}`
            this.controlContainer.children[
                this.positionsController.getCurrent()
            ].className = `${styles.imageDefault} ${styles.currentNumber}`
            this.controlContainer.children[
                this.positionsController.getPrev()
            ].className = `${styles.imageDefault} ${styles.prevNumber}`
            this.controlContainer.className = styles.controlContainer
            this.buttonBlocked = false
        })
    }

    addListenersForTouchSwipe = () => {
        this.slidesContainer.addEventListener(
            'touchstart',
            (event) => {
                event.preventDefault()
                this.clearIntervalPresentation()
                this.startPosition = event.changedTouches[0].clientX
            },
            false
        )

        this.slidesContainer.addEventListener(
            'touchend',
            (event) => {
                event.preventDefault()
                if (event.changedTouches[0].clientX - this.startPosition > 0) {
                    this.simulationPrevClick()
                    if (this.statusPresentation) this.resetInterval()
                } else {
                    this.simulationNextClick()
                    if (this.statusPresentation) this.resetInterval()
                }
            },
            false
        )
    }

    addListenersForMouseSwipe = () => {
        this.slidesContainer.addEventListener(
            'mousedown',
            (event) => {
                event.preventDefault()
                if (!this.buttonBlocked) {
                    this.clearIntervalPresentation()
                    this.startPosition = event.clientX
                }
            },
            false
        )

        this.slidesContainer.addEventListener(
            'mouseup',
            (event) => {
                event.preventDefault()
                if (!this.buttonBlocked) {
                    if (event.clientX - this.startPosition > 0) {
                        this.simulationPrevClick()
                        if (this.statusPresentation) this.resetInterval()
                    } else if (event.clientX - this.startPosition < 0) {
                        this.simulationNextClick()
                        if (this.statusPresentation) this.resetInterval()
                    }
                }
            },
            false
        )
    }

    addListenersForWindow() {
        window.addEventListener('focus', () => {
            if (this.statusPresentation) {
                this.resetInterval()
            }
        })

        window.addEventListener('blur', () => {
            this.clearIntervalPresentation()
        })
    }

    activateContainer = () => {
        this.slidesContainer = document.createElement('div')
        this.controlContainer = document.createElement('div')
        this.controlContainer.className = styles.controlContainer
        this.slidesContainer.className = styles.slidesContainer

        if (this.numberOfElements === 1) {
            this.singleElementSlider()
        } else if (this.numberOfElements === 2) {
            this.twoElementsSlider()
        } else {
            this.controlContainer.append(...this.slider.children)
        }

        this.slidesContainer.append(this.controlContainer)
        this.slider.append(this.slidesContainer)
        this.slider.className = styles.slider
        const childArray = [...this.controlContainer.children]
        childArray.forEach((item) => {
            // Присвоение стиля
            // eslint-disable-next-line no-param-reassign
            item.className = styles.imageDefault
        })
    }

    singleElementSlider = () => {
        const addEl = [...this.slider.children][0].cloneNode(true)
        const addEl2 = [...this.slider.children][0].cloneNode(true)
        const arr = [...this.slider.children, addEl, addEl2]
        this.controlContainer.append(...arr)
        this.numberOfElements += 2
    }

    twoElementsSlider = () => {
        const addEl = [...this.slider.children][0].cloneNode(true)
        const addEl2 = [...this.slider.children][1].cloneNode(true)
        const arr = [...this.slider.children, addEl, addEl2]
        this.controlContainer.append(...arr)
        this.numberOfElements += 2
    }

    addControls = (iconSize) => {
        this.controls = new Controls(this.slider, iconSize, {
            clearIntervalPresentation: this.clearIntervalPresentation,
            resetInterval: this.resetInterval,
            getStatusPresentation: this.getStatusPresentation,
            setStatusPresentation: this.setStatusPresentation,
            simulationNextClick: this.simulationNextClick,
            simulationPrevClick: this.simulationPrevClick,
            getButtonBlockedStatus: this.getButtonBlockedStatus,
        })
    }
}
