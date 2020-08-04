import svgOuterHTMLElement from './svg'

(function () {
    const sliderJS = function (slider, {
        width = 940,
        height = 270,
        timeout = 3000,
        hideControls = false
    }) {
        const checkedWidth = (window.innerWidth > 0) && window.innerWidth >= width ? width : window.innerWidth;

        const numberOfElements = slider.children.length;
        const slidesContainer = document.createElement('div')
        const controlContainer = document.createElement('div')


        controlContainer.className = 'controlContainer'
        slidesContainer.className = 'slidesContainer'
        slidesContainer.style.width = checkedWidth + 'px'
        slidesContainer.style.height = height + 'px'
        controlContainer.style.width = checkedWidth + 'px'
        controlContainer.style.height = height + 'px'

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

        controlContainer.addEventListener('transitionstart', () => {
            buttonBlocked = true
        })

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


        function addControls() {
            let statusButtonsVisibility = true

            const buttonContainer = document.createElement('div')
            buttonContainer.className = 'buttonContainer'
            slider.append(buttonContainer)
    
            const btnPlayPause = document.createElement('button')
            const btnPlayPauseSVG = document.createElement('div')
            btnPlayPause.append(btnPlayPauseSVG)
            btnPlayPauseSVG.outerHTML = svgOuterHTMLElement
            const lefttoplay = btnPlayPause.getElementsByClassName('lefttoplay')[0]
            const righttoplay = btnPlayPause.getElementsByClassName('righttoplay')[0]
            const lefttopause = btnPlayPause.getElementsByClassName('lefttopause')[0]
            const righttopause = btnPlayPause.getElementsByClassName('righttopause')[0]


            const btnPrev = document.createElement('input')
            const btnNext = document.createElement('input')
            const btnHideActionBar = document.createElement('input')
            btnPrev.className = 'btnPrev'
            btnNext.className = 'btnNext'
            btnHideActionBar.className = 'btnHideActionBar'
            btnPrev.type = 'image'
            btnPrev.src = './assets/images/arrow.svg'
            btnNext.type = 'image'
            btnNext.src = './assets/images/arrow.svg'
            btnHideActionBar.type = 'image'
            btnHideActionBar.src = './assets/images/down.svg'
            buttonContainer.append(btnPrev, btnPlayPause, btnNext, btnHideActionBar)
            buttonContainer.style.width = (checkedWidth - 100) + 'px'

            const hideButtons = () => {
                btnNext.classList.toggle('opacityInvisible')
                btnPrev.classList.toggle('opacityInvisible')
                btnPlayPause.classList.toggle('opacityInvisible')
                btnNext.disabled = true
                btnPrev.disabled = true
                btnPlayPause.disabled = true
            }

            const openButtons = () => {
                btnNext.classList.toggle('opacityInvisible')
                btnPrev.classList.toggle('opacityInvisible')
                btnPlayPause.classList.toggle('opacityInvisible')
                btnNext.disabled = false
                btnPrev.disabled = false
                btnPlayPause.disabled = false
            }


            btnHideActionBar.addEventListener('click', () => {
                if (statusButtonsVisibility) {
                    btnHideActionBar.style.transform = 'rotateX(180deg)'
                    hideButtons()
                    statusButtonsVisibility = false
                } else {
                    btnHideActionBar.style.transform = 'rotateX(0deg)'
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
