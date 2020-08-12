# What is this?

Get simple slider for your application

# Installation

`npm i vmslider --save`

Then...

```
import { sliderJS } from 'vm-slider-js'

sliderJS.createSlider('slider', {
    width: 940,
    timeout: 2000, 
    ...other options
})

```

# Options

SliderJS supports 4 options which are all optional:

- _hideControls_ - true / false (Default is false)
- _width_ - size of images in (px) (Default 940)
- _height_ - height of images (px) (Default is 270)
- _timeout_ - auto sliding timer (ms) (Default is 3000)
