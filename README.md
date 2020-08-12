# What is this?

Get simple slider for your application


## Version
1.9.0

## Installation

Install the package 

###### npm 

```
npm install vm-slider-js
```

###### yarn 

```
yarn add vm-slider-js
```

<b>HTML</b>
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slider App</title>
    <style>
        * {
            box-sizing: border-box;
        }
    </style>
</head>

<body>
    <div id="slider">
        <img src="#" alt="Slider #1" />
        <img src="#" alt="Slider #2" />
        <img src="#" alt="Slider #3" />
        <img src="#" alt="Slider #4" />
    </div>

    <script src="../../dist/vm-slider-js.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function (event) {
            sliderJS.createSlider('slider', {
                width: 940,
                timeout: 2000
            })
        })
    </script>
</body>

</html>
```

<b>NPM</b>

```
import { sliderJS } from 'vm-slider-js'

sliderJS.createSlider('slider', {
    width: 940,
    timeout: 2000
})

```

# Options

SliderJS supports 4 options which are all optional:

-   _hideControls_ - true / false (Default is false)
-   _width_ - size of images in (px) (Default 940)
-   _height_ - height of images (px) (Default is 270)
-   _timeout_ - auto sliding timer (ms) (Default is 3000)
