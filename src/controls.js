import svgOuterHTMLElement from './assets/icons/svg'
import arrow from './assets/icons/arrow.svg'
import down from './assets/icons/down.svg'
import styles from './assets/styles/slider.css'

export default class Controls {
    constructor(slider, functions) {
        this.slider = slider
        this.clearIntervalPresentation = functions.clearIntervalPresentation
        this.resetInterval = functions.resetInterval
        this.getStatusPresentation = functions.getStatusPresentation
        this.setStatusPresentation = functions.setStatusPresentation
        this.simulationNextClick = functions.simulationNextClick
        this.simulationPrevClick = functions.simulationPrevClick
        this.getButtonBlockedStatus = functions.getButtonBlockedStatus
        this.statusButtonsVisibility = true

        this.createButtonsContainer()
        this.addPlayPauseButton()
        this.addOtherButtons()
        this.addListenerForHideButton()
        this.addListenerForPlayPauseButton()
        this.addListenersForSlideButtons()
    }

    createButtonsContainer() {
        this.buttonContainer = document.createElement('div')
        this.buttonContainer.className = styles.buttonContainer
        this.slider.append(this.buttonContainer)
    }

    addPlayPauseButton() {
        this.btnPlayPause = document.createElement('button') /// fix innerhtml
        const btnPlayPauseSVG = document.createElement('div')
        this.btnPlayPause.append(btnPlayPauseSVG)
        btnPlayPauseSVG.outerHTML = svgOuterHTMLElement

        this.btnPlayPause.className = styles.playPauseBtn
        this.lefttoplay = this.btnPlayPause.getElementsByClassName('lefttoplay')[0]
        this.righttoplay = this.btnPlayPause.getElementsByClassName('righttoplay')[0]
        this.lefttopause = this.btnPlayPause.getElementsByClassName('lefttopause')[0]
        this.righttopause = this.btnPlayPause.getElementsByClassName('righttopause')[0]
    }

    addOtherButtons() {
        this.btnPrev = document.createElement('button')
        this.btnNext = document.createElement('button')
        this.btnHideActionBar = document.createElement('button')
        this.btnPrev.className = styles.btnPrev
        this.btnNext.className = styles.btnNext
        this.btnHideActionBar.className = styles.btnHideActionBar
        this.btnPrev.innerHTML = arrow
        this.btnNext.innerHTML = arrow
        this.btnHideActionBar.innerHTML = down
        this.buttonContainer.append(this.btnPrev, this.btnPlayPause, this.btnNext, this.btnHideActionBar)
    }

    hideButtons() {
        this.btnNext.classList.toggle(styles.opacityInvisible)
        this.btnPrev.classList.toggle(styles.opacityInvisible)
        this.btnPlayPause.classList.toggle(styles.opacityInvisible)
        this.btnPlayPause.disabled = true
        this.btnNext.disabled = true
        this.btnPrev.disabled = true
    }

    openButtons() {
        this.btnNext.classList.toggle(styles.opacityInvisible)
        this.btnPrev.classList.toggle(styles.opacityInvisible)
        this.btnPlayPause.classList.toggle(styles.opacityInvisible)
        this.btnPlayPause.disabled = false
        this.btnNext.disabled = false
        this.btnPrev.disabled = false
    }

    addListenerForHideButton() {
        this.btnHideActionBar.addEventListener('click', () => {
            if (this.statusButtonsVisibility) {
                this.btnHideActionBar.classList.toggle(styles.hideClick)
                this.hideButtons()
                this.statusButtonsVisibility = false
            } else {
                this.btnHideActionBar.classList.toggle(styles.hideClick)
                this.openButtons()
                this.statusButtonsVisibility = true
            }
        })
    }

    addListenerForPlayPauseButton() {
        this.btnPlayPause.addEventListener(
            'click',
            (e) => {
                e.preventDefault()
                if (this.getStatusPresentation()) {
                    this.lefttoplay.beginElement()
                    this.righttoplay.beginElement()
                    this.setStatusPresentation(false)
                    this.clearIntervalPresentation()
                } else {
                    this.lefttopause.beginElement()
                    this.righttopause.beginElement()
                    this.setStatusPresentation(true)
                    this.resetInterval()
                }
            },
            false
        )
    }

    addListenersForSlideButtons() {
        this.btnNext.addEventListener('click', () => {
            if (!this.getButtonBlockedStatus()) {
                this.simulationNextClick()
                if (this.getStatusPresentation()) this.resetInterval()
            }
        })

        this.btnPrev.addEventListener('click', () => {
            if (!this.getButtonBlockedStatus()) {
                this.simulationPrevClick()
                if (this.getStatusPresentation()) this.resetInterval()
            }
        })
    }
}
