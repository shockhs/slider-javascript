import { createSlider } from './slider'
import '../styles/style.css'

document.addEventListener("DOMContentLoaded", function (event) {
    const slider = document.getElementById('slider')
    const slider2 = document.getElementById('slider-2')
    createSlider(slider, {
        numberOfElements: 4,
        hideControls: true,
        size: 740
    })
    createSlider(slider2, {
        numberOfElements: 4,
        size: 940,
        timeout: 2000
    })
});