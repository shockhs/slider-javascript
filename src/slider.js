import svgOuterHTMLElement from './svg';
const arrow = require('./assets/icons/arrow.svg');
const down = require('./assets/icons/down.svg');

(function () {
    const sliderJS = function (sliderName, {
        width = 940,
        height = 270,
        timeout = 3000,
        hideControls = false
    }) {
        const checkedWidth = (window.innerWidth > 0) && window.innerWidth >= width ? width : window.innerWidth;

        let root = document.documentElement;
        root.style.setProperty('--checkedWidth', checkedWidth + "px");
        root.style.setProperty('--height', height + "px");

        const slider = document.getElementById(sliderName)

        const numberOfElements = slider.children.length;
        const slidesContainer = document.createElement('div')
        const controlContainer = document.createElement('div')

        controlContainer.className = 'controlContainer'
        slidesContainer.className = 'slidesContainer'

        controlContainer.append(...slider.children)
        slidesContainer.append(controlContainer)
        slider.append(slidesContainer)
        slider.className = 'slider'

        const childArray = [...controlContainer.children]
        childArray.forEach(item => {
            item.className = 'imageDefault'
        })

        let statusPresentation = true
        let nextNumber = 1
        let prevNumber = numberOfElements - 1
        let currentNumber = 0
        let buttonBlocked = false

        controlContainer.children[prevNumber].className = 'imageDefault prevNumber'
        controlContainer.children[currentNumber].className = 'imageDefault currentNumber'
        controlContainer.children[nextNumber].className = 'imageDefault nextNumber'


        if (!hideControls && checkedWidth >= 724) {
            addControls()
        }

        const simulationNextClick = () => {
            controlContainer.children[prevNumber].className = 'imageDefault'
            controlContainer.classList.add('nextClick')

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
            controlContainer.children[prevNumber].classList.add('zIndexDefault')
            controlContainer.children[currentNumber].classList.add('zIndexActive')
            controlContainer.children[nextNumber].classList.add('zIndexDefault')
        }

        const simulationPrevClick = () => {
            controlContainer.children[nextNumber].className = 'imageDefault'
            controlContainer.classList.add('prevClick')

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
            controlContainer.children[prevNumber].classList.add('zIndexDefault')
            controlContainer.children[currentNumber].classList.add('zIndexActive')
            controlContainer.children[nextNumber].classList.add('zIndexDefault')
        }

        controlContainer.addEventListener('transitionstart', () => {
            buttonBlocked = true
        })

        controlContainer.addEventListener('transitionend', () => {
            controlContainer.children[nextNumber].className = 'imageDefault nextNumber'
            controlContainer.children[currentNumber].className = 'imageDefault currentNumber'
            controlContainer.children[prevNumber].className = 'imageDefault prevNumber'
            controlContainer.className = 'controlContainer'
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
            buttonContainer.className = 'buttonContainer'
            slider.append(buttonContainer)

            const btnPlayPause = document.createElement('button')
            const btnPlayPauseSVG = document.createElement('div')
            btnPlayPause.append(btnPlayPauseSVG)
            btnPlayPauseSVG.outerHTML = svgOuterHTMLElement
            btnPlayPause.className = 'playPauseBtn'
            const lefttoplay = btnPlayPause.getElementsByClassName('lefttoplay')[0]
            const righttoplay = btnPlayPause.getElementsByClassName('righttoplay')[0]
            const lefttopause = btnPlayPause.getElementsByClassName('lefttopause')[0]
            const righttopause = btnPlayPause.getElementsByClassName('righttopause')[0]


            const btnPrev = document.createElement('button')
            const btnPrevSVG = document.createElement('div')
            btnPrev.append(btnPrevSVG)
            const btnNext = document.createElement('button')
            const btnNextSVG = document.createElement('div')
            btnNext.append(btnNextSVG)
            const btnHideActionBar = document.createElement('button')
            const btnHideActionBarSVG = document.createElement('div')
            btnHideActionBar.append(btnHideActionBarSVG)
            btnPrev.className = 'btnPrev'
            btnNext.className = 'btnNext'
            btnHideActionBar.className = 'btnHideActionBar'
            btnPrevSVG.outerHTML = arrow
            btnNextSVG.outerHTML = arrow
            btnHideActionBarSVG.outerHTML = down
            buttonContainer.append(btnPrev, btnPlayPause, btnNext, btnHideActionBar)

            const hideButtons = () => {
                btnNext.classList.toggle('opacityInvisible')
                btnPrev.classList.toggle('opacityInvisible')
                btnPlayPause.classList.toggle('opacityInvisible')
                btnPlayPause.disabled = true
                btnNext.disabled = true
                btnPrev.disabled = true
            }

            const openButtons = () => {
                btnNext.classList.toggle('opacityInvisible')
                btnPrev.classList.toggle('opacityInvisible')
                btnPlayPause.classList.toggle('opacityInvisible')
                btnPlayPause.disabled = false
                btnNext.disabled = false
                btnPrev.disabled = false
            }


            btnHideActionBar.addEventListener('click', () => {
                if (statusButtonsVisibility) {
                    btnHideActionBar.classList.toggle('hideClick')
                    hideButtons()
                    statusButtonsVisibility = false
                } else {
                    btnHideActionBar.classList.toggle('hideClick')
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
    window.sliderJS = sliderJS
})()