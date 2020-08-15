import styles from './assets/styles/slider.css'
import { getNextPosition } from './position'
import Controls from './controls'

export default class sliderJS {
    constructor(sliderName, { width = 940, height = 270, timeout = 3000, hideControls = false } = {}) {
        this.slider = document.getElementById(sliderName)
        this.timeout = timeout
        this.hideControls = hideControls
        this.height = height
        this.checkedWidth = window.innerWidth > 0 && window.innerWidth >= width ? width : window.innerWidth

        if (this.slider) {
            this.getSliderParams()
        } else {
            console.log(`Не был найден слайдер с id ${sliderName}`)
        }

        if (this.defaultNumberOfElements < 1) {
            console.log('Слайдер не содержит элементов внутри')
        } else {
            this.activateContainer()
            this.setStartedParams()
            this.addListenersForTransition()
            this.addListenersForTouchSwipe()
            this.addListenersForMouseSwipe()
            this.addListenersForWindow()
            if (!hideControls && window.innerWidth >= 724) {
                this.addControls()
            }
        }
    }

    getStatusPresentation() {
        return this.statusPresentation
    }

    getButtonBlockedStatus() {
        return this.buttonBlocked
    }

    setStatusPresentation(status) {
        this.statusPresentation = status
    }

    clearIntervalPresentation() {
        clearInterval(this.presentation)
    }

    getSliderParams() {
        this.slider.className = 'slider'
        this.defaultNumberOfElements = slider.children.length
        this.numberOfElements = this.defaultNumberOfElements
    }

    setRootStyle() {
        const root = document.documentElement
        root.style.setProperty('--checkedWidth', `${this.checkedWidth}px`)
        root.style.setProperty('--height', `${this.height}px`)
    }

    setStartedParams() {
        this.statusPresentation = true
        this.nextNumber = 1
        this.prevNumber = this.numberOfElements - 1
        this.currentNumber = 0
        this.buttonBlocked = false
        this.startPosition = null
        this.setPresentationInterval()
        this.controlContainer.children[this.prevNumber].className = `${styles.imageDefault} ${styles.prevNumber}`
        this.controlContainer.children[this.currentNumber].className = `${styles.imageDefault} ${styles.currentNumber}`
        this.controlContainer.children[this.nextNumber].className = `${styles.imageDefault} ${styles.nextNumber}`
    }

    setPresentationInterval() {
        this.presentation = setInterval(() => {
            this.simulationNextClick()
        }, this.timeout)
    }

    resetInterval() {
        if (this.presentation) this.clearIntervalPresentation()
        this.setPresentationInterval()
    }

    addListenersForTransition() {
        this.controlContainer.addEventListener('transitionstart', () => {
            this.buttonBlocked = true
        })

        this.controlContainer.addEventListener('transitionend', () => {
            this.controlContainer.children[this.nextNumber].className = `${styles.imageDefault} ${styles.nextNumber}`
            this.controlContainer.children[this.currentNumber].className = `${styles.imageDefault} ${styles.currentNumber}`
            this.controlContainer.children[this.prevNumber].className = `${styles.imageDefault} ${styles.prevNumber}`
            this.controlContainer.className = styles.controlContainer
            this.buttonBlocked = false
        })
    }

    addListenersForTouchSwipe() {
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

    addListenersForMouseSwipe() {
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

    simulationNextClick() {
        this.controlContainer.children[this.prevNumber].className = styles.imageDefault
        this.controlContainer.classList.add(styles.nextClick)

        const positions = getNextPosition(
            { prevNumber: this.prevNumber, currentNumber: this.currentNumber, nextNumber: this.nextNumber },
            this.numberOfElements,
            'right'
        )
        this.prevNumber = positions.prevNumber
        this.currentNumber = positions.currentNumber
        this.nextNumber = positions.nextNumber
    }

    simulationPrevClick() {
        this.controlContainer.children[this.nextNumber].className = styles.imageDefault
        this.controlContainer.classList.add(styles.prevClick)

        const positions = getNextPosition(
            { prevNumber: this.prevNumber, currentNumber: this.currentNumber, nextNumber: this.nextNumber },
            this.numberOfElements,
            'left'
        )
        this.prevNumber = positions.prevNumber
        this.currentNumber = positions.currentNumber
        this.nextNumber = positions.nextNumber
    }

    activateContainer() {
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

    singleElementSlider() {
        const addEl = [...this.slider.children][0].cloneNode(true)
        const addEl2 = [...this.slider.children][0].cloneNode(true)
        const arr = [...this.slider.children, addEl, addEl2]
        this.controlContainer.append(...arr)
        this.numberOfElements += 2
    }

    twoElementsSlider() {
        const addEl = [...this.slider.children][0].cloneNode(true)
        const addEl2 = [...this.slider.children][1].cloneNode(true)
        const arr = [...this.slider.children, addEl, addEl2]
        this.controlContainer.append(...arr)
        this.numberOfElements += 2
    }

    addControls() {
        const clearIntervalPresentation = this.clearIntervalPresentation.bind(this)
        const resetInterval = this.resetInterval.bind(this)
        const getStatusPresentation = this.getStatusPresentation.bind(this)
        const setStatusPresentation = this.setStatusPresentation.bind(this)
        const simulationNextClick = this.simulationNextClick.bind(this)
        const simulationPrevClick = this.simulationPrevClick.bind(this)
        const getButtonBlockedStatus = this.getButtonBlockedStatus.bind(this)

        this.controls = new Controls(this.slider, {
            clearIntervalPresentation,
            resetInterval,
            getStatusPresentation,
            setStatusPresentation,
            simulationNextClick,
            simulationPrevClick,
            getButtonBlockedStatus,
        })
    }
}
