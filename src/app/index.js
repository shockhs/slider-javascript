import { sliderJS } from './slider'

document.addEventListener("DOMContentLoaded", function (event) {
    const slider2 = document.getElementById('slider-2')
    sliderJS(slider2, {
        buttonsSize: 30,
        size: 940,
        timeout: 2000
    })
});