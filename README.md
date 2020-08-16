# What is this?

Get simple slider for your application

[demo](https://esaxco.github.io/slider-javascript/)

## Version
4.2.0

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




## Usage

<p align="center">
    <a href="https://github.com/EsaxCO/slider-javascript"><img width="740" src="https://github.com/EsaxCO/slider-javascript/blob/master/example/screenshots/slider.png?sanitize=true" ></a>
</p>


###### HTML
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

    <script src="./dist/vm-slider-js.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function (event) {
            new sliderJS('slider', options)
        })
    </script>
</body>

</html>
```

###### NPM

```
import { sliderJS } from 'vm-slider-js'

new sliderJS('slider', options)
```

# Options

You can pass the 2nd argument as an object with options

SliderJS supports 5 options which are all optional:

-   _width_ - size of images in (px) (Default 940)
-   _height_ - height of images (px) (Default is 270)
-   _iconSize_ - height of icons (px) (Default is 60)
-   _timeout_ - auto sliding timer (ms) (Default is 3000)
-   _hideControls_ - true / false (Default is false)
