# DEPRECATED: angular-lightbox
Light-weight, simple image lightbox and image viewer for AngularJS (1.x).

## Installation
__bower:__
```shell
bower install https://github.com/rustygreen/angular-lightbox.git
```

__npm:__
```shell
npm install https://github.com/rustygreen/angular-lightbox.git
```

__yarn:__
```shell
yarn add https://github.com/rustygreen/angular-lightbox.git
```

__raw github:__
```shell
<script src="https://rawgit.com/rustygreen/angular-lightbox/master/src/angular-lightbox.js"></script>
```

## Usage
__Add module:__
```javascript
angular.module('yourApp', ['angular-lightbox']);
```

__Turn image into lightbox on click:__
```html
<img src="..." lightbox/>
```

__Customization:__
```javascript
angular.module('yourApp', ['angular-lightbox'])
  .config(function(angularLightboxConfig) {
    angular.extend(angularLightboxConfig, {
      modalTemplate: 'YOUR_CUSTOM_TEMPLATE',
      imgTitle: 'Click to enlarge image'
    });
  });
```
