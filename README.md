# <img src="icon.png" height="28"> Rel. To Abs.

Turn static css elements into absolute ones with smooth transitions and touch gestures.

![animation](https://i.imgur.com/2BWzhYc.gif)

## Usage

RTA can be used without configuration, just provide an element to apply effects.

html :
```html
<div id="photo">
    <div class="photo">
        <!-- animated div -->
        <div class="photo__img">
            <img src="https://picsum.photos/400/300" alt="">
        </div>
        <!-- hidden elements that appear on absolute view -->
        <div class="photo__box">
            <button class="photo__box-btn material-icons rta--close">close</button>
        </div>
    </div>
</div>
```

js :
```js
const openablePhoto = document.getElementById('photo');
new RelToAbs(openablePhoto);
```

## Configuration

In second argument you can pass a configuration object.
Detailed options are described below :

| parameter            | type                  | default         | description                                                                                                                                    |
|----------------------|-----------------------|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `swipeToClose`       | `boolean`             | `true`          | Allow to close the element by swiping it down.                                                                                                 |
| `scrollToClose`      | `boolean`             | `true`          | Allow to close the element by scrolling on page.                                                                                               |
| `scrollElement`      | `HTMLElement`         | `document.body` | Scrollable element on the page, used to lock the scroll when the element is open and detect the scroll position if `scrollToClose` is enabled. |
| `coloredPlaceholder` | `string` or `boolean` | `false`         | Change background color of element that replace the animated element when it's open in absolute mode. String represent the hexa color code.    |


## Commands

```sh
$ npm run dev
$ npm run build
```