import { createSlider } from './slider'
import '../styles/style.css'

const sliderContainer = document.getElementById('slider-container')
const buttonContainer = document.getElementById('actions')
const sliderContainer2 = document.getElementById('slider-container-2')
const buttonContainer2 = document.getElementById('actions-2')

createSlider(sliderContainer, buttonContainer, {
    numberOfElements: 4,
    size: 740
})
createSlider(sliderContainer2, buttonContainer2, {
    numberOfElements: 4,
    size: 940,
    timeout: 2000
})