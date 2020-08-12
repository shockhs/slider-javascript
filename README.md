# What is this?

Get simple slider for your application

# Installation

`npm i vm-slider-js --save`

Then...

```
import { sliderJS } from 'vm-slider-js'

sliderJS.createSlider('slider', {
    width: 940,
    timeout: 2000, 
    ...other options
})


<div id="slider" class="slider"> 
    <img src="https://slidesjs.com/img/example-slide-350-1.jpg" alt="Slider #1" />
    <img src="https://slidesjs.com/img/example-slide-350-2.jpg" alt="Slider #2" />
    <img src="https://slidesjs.com/img/example-slide-350-3.jpg" alt="Slider #3" />
    <img src="https://slidesjs.com/img/example-slide-350-4.jpg" alt="Slider #4" />
</div>

```

# Options

SliderJS supports 4 options which are all optional:

- _hideControls_ - true / false (Default is false)
- _width_ - size of images in (px) (Default 940)
- _height_ - height of images (px) (Default is 270)
- _timeout_ - auto sliding timer (ms) (Default is 3000)
