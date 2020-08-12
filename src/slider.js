import svgOuterHTMLElement from './assets/icons/svg'
import arrow from './assets/icons/arrow.svg'
import down from './assets/icons/down.svg'
import styles from './assets/styles/slider.css'

const sliderJS = (sliderName, { width = 940, height = 270, timeout = 3000, hideControls = false }) => {
    const checkedWidth = (window.innerWidth > 0) && window.innerWidth >= width ? width : window.innerWidth;


    let root = document.documentElement;
    root.style.setProperty('--checkedWidth', checkedWidth + "px");
    root.style.setProperty('--height', height + "px");

    const slider = document.getElementById(sliderName)

    if (!slider) return;

    const defaultNumberOfElements = slider.children.length;
    let numberOfElements = defaultNumberOfElements

    if (numberOfElements === 0) return;

    const slidesContainer = document.createElement('div')
    const controlContainer = document.createElement('div')

    controlContainer.className = styles.controlContainer
    slidesContainer.className = styles.slidesContainer

    if (numberOfElements === 1) {
        const addEl = [...slider.children][0].cloneNode(true)
        const addEl2 = [...slider.children][0].cloneNode(true)
        const arr = [...slider.children, addEl, addEl2]
        controlContainer.append(...arr)
        numberOfElements += 2
    } else if (numberOfElements === 2) {
        const addEl = [...slider.children][0].cloneNode(true)
        const addEl2 = [...slider.children][1].cloneNode(true)
        const arr = [...slider.children, addEl, addEl2]
        controlContainer.append(...arr)
        numberOfElements += 2
    } else {
        controlContainer.append(...slider.children)
    }

    slidesContainer.append(controlContainer)
    slider.append(slidesContainer)
    slider.className = styles.slider
    const childArray = [...controlContainer.children]
    childArray.forEach(item => {
        item.className = styles.imageDefault
    })

    let statusPresentation = true
    let nextNumber = 1
    let prevNumber = numberOfElements - 1
    let currentNumber = 0
    let buttonBlocked = false
    let startPosition

    controlContainer.children[prevNumber].className = `${styles.imageDefault} ${styles.prevNumber}`
    controlContainer.children[currentNumber].className = `${styles.imageDefault} ${styles.currentNumber}`
    controlContainer.children[nextNumber].className = `${styles.imageDefault} ${styles.nextNumber}`


    if (!hideControls && checkedWidth >= 724) {
        addControls()
    }

    const simulationNextClick = () => {
        controlContainer.children[prevNumber].className = styles.imageDefault
        controlContainer.classList.add(styles.nextClick)

        if (nextNumber === numberOfElements - 1) {
            preLastPositionOfElementNextClick()
        } else if (currentNumber === numberOfElements - 1) {
            lastPositionOfElementNextClick()
        } else {
            middlePositionOfElementNextClick()
        }

        controlContainer.children[prevNumber].classList.add(styles.zIndexDefault)
        controlContainer.children[currentNumber].classList.add(styles.zIndexActive)
        controlContainer.children[nextNumber].classList.add(styles.zIndexDefault)
    }

    const simulationPrevClick = () => {
        controlContainer.children[nextNumber].className = styles.imageDefault
        controlContainer.classList.add(styles.prevClick)

        if (prevNumber === numberOfElements - 1) {
            lastPositionOfElementPrevClick()
        } else if (currentNumber === 1) {
            firstPositionOfElementPrevClick()
        } else {
            middlePositionOfElementPrevClick()
        }

        controlContainer.children[prevNumber].classList.add(styles.zIndexDefault)
        controlContainer.children[currentNumber].classList.add(styles.zIndexActive)
        controlContainer.children[nextNumber].classList.add(styles.zIndexDefault)
    }

    controlContainer.addEventListener('transitionstart', () => {
        buttonBlocked = true
    })

    controlContainer.addEventListener('transitionend', () => {
        controlContainer.children[nextNumber].className = `${styles.imageDefault} ${styles.nextNumber}`
        controlContainer.children[currentNumber].className = `${styles.imageDefault} ${styles.currentNumber}`
        controlContainer.children[prevNumber].className = `${styles.imageDefault} ${styles.prevNumber}`
        controlContainer.className = styles.controlContainer
        buttonBlocked = false
    })

    // Calculating nextView PREV CLICK

    const lastPositionOfElementPrevClick = () => {
        currentNumber = prevNumber
        prevNumber = currentNumber - 1
        nextNumber = 0
    }

    const firstPositionOfElementPrevClick = () => {
        currentNumber = 0
        prevNumber = numberOfElements - 1
        nextNumber = currentNumber + 1
    }

    const middlePositionOfElementPrevClick = () => {
        currentNumber--
        prevNumber = currentNumber - 1
        nextNumber = currentNumber + 1
    }

    // Calculating nextView NEXT CLICK

    const lastPositionOfElementNextClick = () => {
        prevNumber = currentNumber
        currentNumber = 0
        nextNumber = currentNumber + 1
    }

    const preLastPositionOfElementNextClick = () => {
        currentNumber = nextNumber
        prevNumber = nextNumber - 1
        nextNumber = 0
    }

    const middlePositionOfElementNextClick = () => {
        currentNumber++
        prevNumber = currentNumber - 1
        nextNumber = currentNumber + 1
    }

    let presentation = setInterval(() => {
        simulationNextClick()
    }, timeout)

    const resetInterval = () => {
        if (presentation) clearInterval(presentation)
        presentation = setInterval(() => {
            simulationNextClick()
        }, timeout)
    }

    slidesContainer.addEventListener('touchstart', (event) => {
        event.preventDefault()
        clearInterval(presentation)
        startPosition = event.changedTouches[0].clientX
    }, false)

    slidesContainer.addEventListener('touchend', (event) => {
        event.preventDefault()
        if (event.changedTouches[0].clientX - startPosition > 0) {
            simulationPrevClick()
            if (statusPresentation) resetInterval()
        } else {
            simulationNextClick()
            if (statusPresentation) resetInterval()
        }
    }, false)

    slidesContainer.addEventListener('mousedown', (event) => {
        event.preventDefault()
        if (!buttonBlocked) {
            clearInterval(presentation)
            startPosition = event.clientX
        }
    }, false)


    slidesContainer.addEventListener('mouseup', (event) => {
        event.preventDefault()
        if (!buttonBlocked) {
            if (event.clientX - startPosition > 0) {
                simulationPrevClick()
                if (statusPresentation) resetInterval()
            } else if (event.clientX - startPosition < 0) {
                simulationNextClick()
                if (statusPresentation) resetInterval()
            }
        }
    }, false)

    window.addEventListener('focus', function () {
        resetInterval()
    });

    window.addEventListener('blur', function () {
        clearInterval(presentation)
    });

    function addControls() {
        let statusButtonsVisibility = true

        const buttonContainer = document.createElement('div')
        buttonContainer.className = styles.buttonContainer
        slider.append(buttonContainer)

        const btnPlayPause = document.createElement('button')
        const btnPlayPauseSVG = document.createElement('div')
        btnPlayPause.append(btnPlayPauseSVG)
        btnPlayPauseSVG.outerHTML = svgOuterHTMLElement
        btnPlayPause.className = styles.playPauseBtn
        const lefttoplay = btnPlayPause.getElementsByClassName('lefttoplay')[0]
        const righttoplay = btnPlayPause.getElementsByClassName('righttoplay')[0]
        const lefttopause = btnPlayPause.getElementsByClassName('lefttopause')[0]
        const righttopause = btnPlayPause.getElementsByClassName('righttopause')[0]


        const btnPrev = document.createElement('button')
        const btnNext = document.createElement('button')
        const btnHideActionBar = document.createElement('button')
        btnPrev.className = styles.btnPrev
        btnNext.className = styles.btnNext
        btnHideActionBar.className = styles.btnHideActionBar
        btnPrev.innerHTML = arrow
        btnNext.innerHTML = arrow
        btnHideActionBar.innerHTML = down
        buttonContainer.append(btnPrev, btnPlayPause, btnNext, btnHideActionBar)

        const hideButtons = () => {
            btnNext.classList.toggle(styles.opacityInvisible)
            btnPrev.classList.toggle(styles.opacityInvisible)
            btnPlayPause.classList.toggle(styles.opacityInvisible)
            btnPlayPause.disabled = true
            btnNext.disabled = true
            btnPrev.disabled = true
        }

        const openButtons = () => {
            btnNext.classList.toggle(styles.opacityInvisible)
            btnPrev.classList.toggle(styles.opacityInvisible)
            btnPlayPause.classList.toggle(styles.opacityInvisible)
            btnPlayPause.disabled = false
            btnNext.disabled = false
            btnPrev.disabled = false
        }


        btnHideActionBar.addEventListener('click', () => {
            if (statusButtonsVisibility) {
                btnHideActionBar.classList.toggle(styles.hideClick)
                hideButtons()
                statusButtonsVisibility = false
            } else {
                btnHideActionBar.classList.toggle(styles.hideClick)
                openButtons()
                statusButtonsVisibility = true
            }
        })


        btnPlayPause.addEventListener('click', (e) => {
            e.preventDefault()
            if (statusPresentation) {
                lefttoplay.beginElement();
                righttoplay.beginElement();
                statusPresentation = false
                clearInterval(presentation)
            } else {
                lefttopause.beginElement();
                righttopause.beginElement();
                statusPresentation = true
                resetInterval()
            }
        }, false)

        btnNext.addEventListener('click', () => {
            if (!buttonBlocked) {
                simulationNextClick()
                if (statusPresentation) resetInterval()
            }
        })

        btnPrev.addEventListener('click', () => {
            if (!buttonBlocked) {
                simulationPrevClick()
                if (statusPresentation) resetInterval()
            }
        })
    }
}



export { sliderJS }