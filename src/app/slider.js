const defaultConfiguration = {
    width: 940,
    height: 270,
    numberOfElements: 4,
    timeout: 3000
}

function createSlider(sliderContainer, buttonContainer, configuration) {

    const width = configuration.width ? configuration.width : defaultConfiguration.width
    const height = configuration.height ? configuration.height : defaultConfiguration.height
    const elements = configuration.numberOfElements ? configuration.numberOfElements : defaultConfiguration.numberOfElements
    const timeout = configuration.timeout ? configuration.timeout : defaultConfiguration.timeout

    sliderContainer.style.width = width + 'px'
    sliderContainer.style.height = height + 'px'
    const slider = sliderContainer.childNodes[0].nodeName === '#text' ? sliderContainer.childNodes[1] : sliderContainer.childNodes[0]

    let counter = 1
    let statusPresentation = true
    let statusButtonsVisibility = true
    slider.style.width = width + 'px'
    slider.style.transform = 'translateX(' + (-width * counter) + 'px)'


    const btnPlayPause = document.createElement('a')
    btnPlayPause.className = 'play-button'
    const btnLeft = document.createElement('div')
    btnLeft.className = 'left'
    const btnRight = document.createElement('div')
    btnRight.className = 'right'
    btnPlayPause.append(btnLeft, btnRight)
    btnPlayPause.style.transition = 'opacity 0.7s ease-in-out'


    const btnPrev = document.createElement('button')
    const btnNext = document.createElement('button')
    const btnHideActionBar = document.createElement('button')
    btnHideActionBar.className = 'btnHideActionBar'
    btnPrev.className = 'btnPrev'
    btnNext.className = 'btnNext'
    btnNext.style.transition = 'opacity 0.7s ease-in-out'
    btnPrev.style.transition = 'opacity 0.7s ease-in-out'
    buttonContainer.append(btnPrev, btnPlayPause, btnNext, btnHideActionBar)
    buttonContainer.style.width = (width - 100) + 'px'


    let presentation = setInterval(() => {
        btnNext.click()
    }, timeout)


    // сбросить таймер после перехода напрямую по нажатию
    const resetInterval = () => {
        if (presentation) clearInterval(presentation)
        presentation = setInterval(() => {
            btnNext.click()
        }, timeout)
    }

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