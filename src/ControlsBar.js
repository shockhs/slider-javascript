import svgPlayPauseBtn from './assets/icons/svg'
import arrow from './assets/icons/arrow.svg'
import down from './assets/icons/down.svg'
import styles from './assets/styles/slider.css'

export default class Controls {
    /**
     * @param {external:Node} sliderName - Slider container
     * @param {number} iconSize - Set height of the icons
     * @param {Object} functions - Functions for control
     * @param {callback} functions.clearIntervalPresentation - Callback for clearing interval
     * @param {callback} functions.resetInterval - Callback for setting interval
     * @param {callback} functions.getStatusPresentation - Callback for getting current status
     * @param {callback} functions.setStatusPresentation - Callback for setting status
     * @param {callback} functions.simulationNextClick - Callback for sliding to the right
     * @param {callback} functions.simulationPrevClick - Callback for sliding to the left
     * @param {callback} functions.getButtonBlockedStatus - Callback for getting buttonBlocked status
     */
    constructor(
        slider,
        iconSize,
        {
            clearIntervalPresentation,
            resetInterval,
            getStatusPresentation,
            setStatusPresentation,
            simulationNextClick,
            simulationPrevClick,
            getButtonBlockedStatus,
        }
    ) {
        this.clearIntervalPresentation = clearIntervalPresentation
        this.resetInterval = resetInterval
        this.getStatusPresentation = getStatusPresentation
        this.setStatusPresentation = setStatusPresentation
        this.simulationNextClick = simulationNextClick
        this.simulationPrevClick = simulationPrevClick
        this.getButtonBlockedStatus = getButtonBlockedStatus
        this.statusButtonsVisibility = true

        this.setIconSize(iconSize)
        this.createButtonsContainer(slider)
        this.addPlayPauseButton()
        this.addOtherButtons()
        this.addListenerForHideButton()
        this.addListenerForPlayPauseButton()
        this.addListenersForSlideButtons()
    }

    setIconSize(iconSize) {
        const root = document.documentElement
        root.style.setProperty('--buttonHeight', `${iconSize}px`)
    }

    createButtonsContainer(slider) {
        this.buttonContainer = document.createElement('div')
        this.buttonContainer.className = styles.buttonContainer
        slider.append(this.buttonContainer)
    }

    addPlayPauseButton() {
        this.btnPlayPause = document.createElement('button')
        this.btnPlayPause.innerHTML = svgPlayPauseBtn
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
