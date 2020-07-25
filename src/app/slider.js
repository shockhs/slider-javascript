const defaultConfiguration = {
    width: 940,
    height: 270,
    timeout: 3000
}

function createSlider(slider, configuration) {
    if (!configuration.numberOfElements) throw new Error('Во входных данных пропущено обязательное свойство numberOfElements')
    const elements = configuration.numberOfElements
    const width = configuration.width ? configuration.width : defaultConfiguration.width
    const height = configuration.height ? configuration.height : defaultConfiguration.height
    const hideControls = configuration.hideControls !== undefined ? configuration.hideControls : false
    const timeout = configuration.timeout ? configuration.timeout : defaultConfiguration.timeout

    const sliderContainer = document.createElement('div')
    sliderContainer.className = 'slider-container'
    sliderContainer.append(slider)
    document.body.append(sliderContainer)
    sliderContainer.style.width = width + 'px'
    sliderContainer.style.height = height + 'px'

    let counter = 1
    let statusPresentation = true
    let statusButtonsVisibility = true
    slider.style.width = width + 'px'
    slider.style.transform = 'translateX(' + (-width * counter) + 'px)'

    let buttonContainer, btnPlayPause, btnLeft, btnRight, btnPrev, btnNext, btnHideActionBar

    if (!hideControls) {
        buttonContainer = document.createElement('div')
        buttonContainer.className = 'button-container'
        sliderContainer.append(buttonContainer)
        btnPlayPause = document.createElement('a')
        btnPlayPause.className = 'play-button'
        btnLeft = document.createElement('div')
        btnLeft.className = 'left'
        btnRight = document.createElement('div')
        btnRight.className = 'right'
        btnPlayPause.append(btnLeft, btnRight)
        btnPlayPause.style.transition = 'opacity 0.7s ease-in-out'


        btnPrev = document.createElement('button')
        btnNext = document.createElement('button')
        btnHideActionBar = document.createElement('button')
        btnHideActionBar.className = 'btnHideActionBar'
        btnPrev.className = 'btnPrev'
        btnNext.className = 'btnNext'
        btnNext.style.transition = 'opacity 0.7s ease-in-out'
        btnPrev.style.transition = 'opacity 0.7s ease-in-out'
        buttonContainer.append(btnPrev, btnPlayPause, btnNext, btnHideActionBar)
        buttonContainer.style.width = (width - 100) + 'px'

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
            btnPlayPause.classList.toggle('paused');
            if (statusPresentation) {
                statusPresentation = false
                clearInterval(presentation)
            } else {
                statusPresentation = true
                resetInterval()
            }
        })

        btnNext.addEventListener('click', () => {
            if (counter > elements + 1) return
            slider.style.transition = 'transform 0.7s ease-in-out'
            counter++
            slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
            if (statusPresentation) resetInterval()
        })

        btnPrev.addEventListener('click', () => {
            if (counter < 0) return
            slider.style.transition = 'transform 0.7s ease-in-out'
            counter--
            slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
            if (statusPresentation) resetInterval()
        })
    }

    const simulationNextClick = () => {
        if (counter > elements + 1) return
        slider.style.transition = 'transform 0.7s ease-in-out'
        counter++
        slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
        if (statusPresentation) resetInterval()
    }

    let presentation = setInterval(() => {
        simulationNextClick()
    }, timeout)


    // сбросить таймер после перехода напрямую по нажатию
    const resetInterval = () => {
        if (presentation) clearInterval(presentation)
        presentation = setInterval(() => {
            simulationNextClick()
        }, timeout)
    }


    slider.addEventListener('transitionend', () => {
        if (counter > elements) {
            clearInterval(presentation)
            slider.style.transition = 'none'
            counter = 1
            slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
            resetInterval()
        }
        if (counter === 0) {
            clearInterval(presentation)
            slider.style.transition = 'none'
            counter = elements
            slider.style.transform = 'translateX(' + (-width * counter) + 'px)'
            resetInterval()
        }
    })

}

module.exports = { createSlider }