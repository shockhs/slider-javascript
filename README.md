# What is this?

Get simple slider for your application

# Installation

`npm i vm-slider-js --save`

Then...

```

<div id="slider" class="slider"> 
    <img src="#" alt="Slider #1" />
    <img src="#" alt="Slider #2" />
    <img src="#" alt="Slider #3" />
    <img src="#" alt="Slider #4" />
</div>

<script>
    import { sliderJS } from 'vm-slider-js'

    sliderJS.createSlider('slider', {
        width: 940,
        timeout: 2000, 
        ...other options
    })
</script>

```

# Options

SliderJS supports 4 options which are all optional:

- _hideControls_ - true / false (Default is false)
- _width_ - size of images in (px) (Default 940)
- _height_ - height of images (px) (Default is 270)
- _timeout_ - auto sliding timer (ms) (Default is 3000)
