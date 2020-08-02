(function () {
    const svgOuterHTMLElement = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="playpause" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <polygon points="7,3 19,3 19,47 7,47" id="leftbar" />
                                        <polygon points="31,3 43,3 43,26 43,47 31,47" id="rightbar" />
                                            <animate to="7,3 19,3 19,47 7,47" id="lefttopause" xlink:href="#leftbar" 
                                    attributeName="points" dur=".3s" begin="indefinite" fill="freeze" />
                                            <animate to="12,0 25,11.5 25,39 12,50" id="lefttoplay" xlink:href="#leftbar" 
                                    attributeName="points" dur=".3s" begin="indefinite" fill="freeze" />
                                            <animate to="31,3 43,3 43,26 43,47 31,47" id="righttopause" xlink:href="#rightbar" 
                                    attributeName="points" dur=".3s" begin="indefinite" fill="freeze" />
                                            <animate to="25,11.5 39.7,24.5 41.5,26 39.7,27.4 25,39" id="righttoplay" 
                                    xlink:href="#rightbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" />
                                    </svg>`


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
            event.preventDefault()
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

            const buttonContainer = document.createElement('div')
            buttonContainer.className = 'buttonContainerStyles'
            slider.append(buttonContainer)
            const btnPlayPause = document.createElement('button')
            const btnPlayPauseSVG = document.createElement('div')
            btnPlayPause.append(btnPlayPauseSVG)
            btnPlayPause.style.display = "block";
            btnPlayPauseSVG.outerHTML = svgOuterHTMLElement
            const lefttoplay = btnPlayPause.children[0].children[3]
            const righttoplay = btnPlayPause.children[0].children[5]
            const lefttopause = btnPlayPause.children[0].children[2]
            const righttopause = btnPlayPause.children[0].children[4]


            const btnPrev = document.createElement('input')
            const btnNext = document.createElement('input')
            const btnHideActionBar = document.createElement('input')
            btnPrev.className = 'btnPrevStyles'
            btnNext.className = 'btnNextStyles'
            btnHideActionBar.className = 'btnHideActionBarStyles'
            btnPrev.type = 'image'
            btnPrev.src = './assets/images/arrow.svg'
            btnNext.type = 'image'
            btnNext.src = './assets/images/arrow.svg'
            btnHideActionBar.type = 'image'
            btnHideActionBar.src = './assets/images/down.svg'
            buttonContainer.append(btnPrev, btnPlayPause, btnNext, btnHideActionBar)
            buttonContainer.style.width = (checkedWidth - 100) + 'px'

            const hideButtons = () => {
                btnNext.style.opacity = 0
                btnPrev.style.opacity = 0
                btnPlayPause.style.opacity = 0
                btnNext.disabled = true
                btnPrev.disabled = true
                btnPlayPause.disabled = true
            }

            const openButtons = () => {
                btnNext.style.opacity = 1
                btnPrev.style.opacity = 1
                btnPlayPause.style.opacity = 1
                btnNext.disabled = false
                btnPrev.disabled = false
                btnPlayPause.disabled = false
            }


            btnHideActionBar.addEventListener('click', () => {
                if (statusButtonsVisibility) {
                    btnHideActionBar.style.transform = 'rotateX(180deg)'
                    btnHideActionBar.style.transformOrigin = '50% 50%'
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
    window.sliderJS = sliderJS
})()
