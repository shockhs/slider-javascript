function sliderJS(slider, { // export надо сделать
    width = 940,
    height = 270,
    buttonsSize = 15,
    timeout = 3000,
    hideControls = false
}) {
    const checkedWidth = (window.innerWidth > 0) && window.innerWidth >= width ? width : window.innerWidth;
    const numberOfElements = slider.children.length;
    const slidesContainer = document.createElement('div')
    const controlContainer = document.createElement('div')

    controlContainer.style.cssText = `position: relative; left: 0px; width: ${checkedWidth}px; height: ${height}px;`
    slidesContainer.style.cssText = `overflow: hidden; position: relative; width: ${checkedWidth}px; height: ${height}px;`
    controlContainer.append(...slider.children)
    slidesContainer.append(controlContainer)
    slider.append(slidesContainer)
    slider.style.cssText = `overflow: hidden; display: block;`


    const childArray = [...controlContainer.children]
    childArray.forEach(item => {
        item.style.cssText = `display:none; position: absolute; top: 0px; left: 0px; width: 100%; z-index: 0; backface-visibility: hidden;`
    })

    let statusPresentation = true
    let nextNumber = 1
    let prevNumber = numberOfElements - 1
    let currentNumber = 0
    let buttonBlocked = false

    controlContainer.children[prevNumber].style.display = 'block'
    controlContainer.children[prevNumber].style.left = `${-checkedWidth}px`
    controlContainer.children[currentNumber].style.display = 'block'
    controlContainer.children[currentNumber].style.zIndex = 10
    controlContainer.children[nextNumber].style.display = 'block'
    controlContainer.children[nextNumber].style.left = `${checkedWidth}px`


    if (!hideControls && checkedWidth >= 724) {
        addControls()
    }

    const simulationNextClick = () => {
        controlContainer.style.transition = 'transform 0.7s ease-in-out'
        controlContainer.style.transform = 'translateX(-' + checkedWidth + 'px)'

        if (nextNumber === numberOfElements - 1) {
            currentNumber = nextNumber
            prevNumber = nextNumber - 1
            nextNumber = 0
        } else if (currentNumber === numberOfElements - 1) {
            prevNumber = currentNumber
            currentNumber = 0
            nextNumber = currentNumber + 1
        } else {
            currentNumber++
            prevNumber = currentNumber - 1
            nextNumber = currentNumber + 1
        }
        controlContainer.children[prevNumber].style.zIndex = 0
        controlContainer.children[currentNumber].style.zIndex = 10
        controlContainer.children[nextNumber].style.zIndex = 0
    }

    const simulationPrevClick = () => {
        controlContainer.style.transition = 'transform 0.7s ease-in-out'
        controlContainer.style.transform = 'translateX(' + checkedWidth + 'px)'

        if (prevNumber === numberOfElements - 1) {
            currentNumber = prevNumber
            prevNumber = currentNumber - 1
            nextNumber = 0
        } else if (currentNumber === 1) {
            currentNumber = 0
            prevNumber = numberOfElements - 1
            nextNumber = currentNumber + 1
        } else {
            currentNumber--
            prevNumber = currentNumber - 1
            nextNumber = currentNumber + 1
        }
        controlContainer.children[prevNumber].style.zIndex = 0
        controlContainer.children[currentNumber].style.zIndex = 10
        controlContainer.children[nextNumber].style.zIndex = 0
    }

    controlContainer.addEventListener('transitionend', () => {
        if (currentNumber % 2 === 0 && currentNumber !== 0) {
            controlContainer.children[currentNumber - 2].style.left = 0
            controlContainer.children[currentNumber - 2].style.display = 'none'
        }
        controlContainer.children[nextNumber].style.left = `${checkedWidth}px`
        controlContainer.children[nextNumber].style.display = 'block'
        controlContainer.children[currentNumber].style.left = 0
        controlContainer.children[prevNumber].style.left = `${-checkedWidth}px`
        controlContainer.children[prevNumber].style.display = 'block'
        controlContainer.style.transition = 'none'
        controlContainer.style.transform = 'none'
        buttonBlocked = false
    })


    // режим презентации
    let presentation = setInterval(() => {
        simulationNextClick()
    }, timeout)

    // сброс интервала при манипуляциях
    const resetInterval = () => {
        if (presentation) clearInterval(presentation)
        presentation = setInterval(() => {
            simulationNextClick()
        }, timeout)
    }

    let startPosition

    slidesContainer.addEventListener('touchstart', (event) => {
        event.preventDefault()
        clearInterval(presentation)
        startPosition = event.changedTouches[0].clientX
    }, false)

    slidesContainer.addEventListener('mousedown', (event) => {
        event.preventDefault()
        clearInterval(presentation)
        startPosition = event.clientX
    }, false)

    slidesContainer.addEventListener('mouseup', (event) => {
        event.preventDefault()
        if (event.clientX - startPosition > 0) {
            simulationPrevClick()
            if (statusPresentation) resetInterval()
        } else {
            simulationNextClick()
            if (statusPresentation) resetInterval()
        }
    }, false)

    slidesContainer.addEventListener('touchend', (event) => {
        if (event.changedTouches[0].clientX - startPosition > 0) {
            simulationPrevClick()
            if (statusPresentation) resetInterval()
        } else {
            simulationNextClick()
            if (statusPresentation) resetInterval()
        }
    }, false)


    function addControls() {
        let statusButtonsVisibility = true

        const btnRightDefaultStyles = `outline: none; border-width: ${buttonsSize}px; border-style: solid; border-color: #000; -webkit-transition: all 0.2s ease-in; -o-transition: all 0.2s ease-in; transition: all 0.2s ease-in;`
        const btnRightActiveStyles = `border-width: ${buttonsSize}px 0px ${buttonsSize}px ${buttonsSize}px; border-color: transparent transparent transparent #000; -webkit-transform: scaleY(0.5); -ms-transform: scaleY(0.5); transform: scaleY(0.5);`
        const btnLeftDefaultStyles = `outline: none; margin-right: 10px; height: 100 %; border-width: ${buttonsSize/2}px; border-style: solid; border-color: #000; -webkit-transition: all 0.2s ease-in; -o-transition: all 0.2s ease-in; transition: all 0.2s ease-in; overflow: hidden;`
        const btnLeftActiveStyles = `border-width: ${buttonsSize / 2}px 0px ${buttonsSize / 2}px ${buttonsSize}px;border-color: transparent transparent transparent #000; margin: 0;`
        const buttonContainerStyles = `outline: none; width: 100 %; bottom: 0; margin-top: 20px; padding: 20px; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between;`
        const btnPlayPauseStyles = `outline: none; height: ${buttonsSize * 2}px; width: ${buttonsSize * 2 + 10}px; display: -webkit-box; display: -ms-flexbox; display: flex; overflow: hidden; cursor: pointer; position: relative;`
        const btnHideActionBarStyles = `cursor: pointer; border: none; background-color: transparent; outline: none; border-style: solid; border-width: ${buttonsSize}px; border-color: #000 transparent transparent transparent; -webkit-transform-origin: 50 % 50 %; -ms-transform-origin: 50 % 50 %; transform-origin: 50 % 50 %;`
        const btnPrevStyles = `outline: none; cursor: pointer; border: none; outline: none; background-color: transparent; border: ${buttonsSize}px solid #000; border-width: ${buttonsSize}px ${buttonsSize * 2}px ${buttonsSize}px 0px; border-top-color: transparent; border-bottom-color: transparent;`
        const btnNextStyles = `cursor: pointer; border: none; outline: none; background-color: transparent; border: solid #000; border-width: ${buttonsSize}px 0px ${buttonsSize}px ${buttonsSize * 2}px; border-top-color: transparent; border-bottom-color: transparent;`

        const buttonContainer = document.createElement('div')
        buttonContainer.style.cssText = buttonContainerStyles
        slider.append(buttonContainer)
        const btnPlayPause = document.createElement('a')
        btnPlayPause.style.cssText = btnPlayPauseStyles
        const btnLeft = document.createElement('div')
        btnLeft.style.cssText = btnLeftDefaultStyles
        const btnRight = document.createElement('div')
        btnRight.style.cssText = btnRightDefaultStyles
        btnPlayPause.append(btnLeft, btnRight)
        btnPlayPause.style.transition = 'opacity 0.7s ease-in-out'


        const btnPrev = document.createElement('button')
        const btnNext = document.createElement('button')
        const btnHideActionBar = document.createElement('button')
        btnHideActionBar.style.cssText = btnHideActionBarStyles
        btnPrev.style.cssText = btnPrevStyles
        btnNext.style.cssText = btnNextStyles
        btnNext.style.transition = 'opacity 0.7s ease-in-out'
        btnPrev.style.transition = 'opacity 0.7s ease-in-out'
        buttonContainer.append(btnPrev, btnPlayPause, btnNext, btnHideActionBar)
        buttonContainer.style.width = (checkedWidth - 100) + 'px'

        const hideButtons = () => {
            btnNext.style.opacity = '0'
            btnPrev.style.opacity = '0'
            btnPlayPause.style.opacity = '0'
            setTimeout(() => {
                btnPrev.style.display = 'none'
                btnNext.style.display = 'none'
                btnPlayPause.style.display = 'none'
                buttonContainer.style.flexDirection = 'row-reverse'
            }, 700)
        }

        const openButtons = () => {
            btnPrev.style.display = 'block'
            btnNext.style.display = 'block'
            btnPlayPause.style.display = 'flex'
            buttonContainer.style.flexDirection = 'row'
            setTimeout(() => {
                btnNext.style.opacity = '1'
                btnPrev.style.opacity = '1'
                btnPlayPause.style.opacity = '1'
            }, 700)
        }


        btnHideActionBar.addEventListener('click', () => {
            if (statusButtonsVisibility) {
                btnHideActionBar.style.transform = 'rotateX(180deg)'
                btnHideActionBar.style.transition = 'transform 0.7s ease-in-out'
                hideButtons()
                statusButtonsVisibility = false
            } else {
                btnHideActionBar.style.transform = 'rotateX(0deg)'
                btnHideActionBar.style.transition = 'transform 0.7s ease-in-out'
                openButtons()
                statusButtonsVisibility = true
            }
        })


        btnPlayPause.addEventListener('click', () => {
            if (statusPresentation) {
                btnLeft.style.cssText += btnLeftActiveStyles
                btnRight.style.cssText += btnRightActiveStyles
                statusPresentation = false
                clearInterval(presentation)
            } else {
                btnLeft.style.cssText = btnLeftDefaultStyles
                btnRight.style.cssText = btnRightDefaultStyles
                statusPresentation = true
                resetInterval()
            }
        })

        btnNext.addEventListener('click', () => {
            if (!buttonBlocked) {
                buttonBlocked = true
                simulationNextClick()
                if (statusPresentation) resetInterval()
            }
        })

        btnPrev.addEventListener('click', () => {
            if (!buttonBlocked) {
                buttonBlocked = true
                simulationPrevClick()
                if (statusPresentation) resetInterval()
            }
        })
    }
}
