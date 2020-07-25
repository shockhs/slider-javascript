import { createSlider } from './slider'
import '../styles/style.css'

const sliderContainer = document.getElementById('slider-container')
const sliderContainer2 = document.getElementById('slider-container-2')

createSlider(sliderContainer, {
    numberOfElements: 4,
    hideControls: true,
    size: 740
})
createSlider(sliderContainer2, {
    numberOfElements: 4,
    size: 940,
    timeout: 2000
})