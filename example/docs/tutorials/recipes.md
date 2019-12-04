---
title: Recipes
---

# Recipes

## Changing a stencil

There are only two default stencil components now, `RectangleStencil` (default) and `CircleStencil`, but you can easily create your own stencil himself.

To specify stencil component you should pass it to `stencilComponent` prop. For globally registered component just pass their name:
```html
<Cropper
	stencilComponent="CircleStencil"
/>
```

But if your component is not registered globally you should pass the component’s options object.

There is one of approaches to pass it:
```js
import Vue from 'vue'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'

new Vue({
	el: '#app',
	components: {
		Cropper,
		CircleStencil
	}
})
```

```html
<div id="app">
  <Cropper
	src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
	:stencilComponent="$options.components.CircleStencil"
  />
</div>
```

The cause of this specificity is using the [dynamic components](https://vuejs.org/v2/guide/components.html#Dynamic-Components) approach to allow use an arbitrary stencil component.

<circle-example> </circle-example>

## Passing props to a stencil

To pass any props to stencil pass them as object to `stencilProps` prop.

```html
<Cropper
	:stencilProps="{
		minAspectRatio: 8/8,
		maxAspectRatio: 10/8
	}"
/>
```

::: warning Notice!
If you use cropper not in the vue single file components or template string you [should use](https://vuejs.org/v2/guide/components-props.html) kebab-case (hyphen-delimited) equivalent for `stencilProps`
:::

```html
<cropper
	:stencil-props="{
		minAspectRatio: 8/8,
		maxAspectRatio: 10/8
	}"
></cropper>
```

The list of available props varies from one stencil component to another. The props of default stencils are available at this site ([RectangleStencil](/components/rectangle-stencil.html), [CircleStencil](/components/circle-stencil.html))

## Getting result

### First method

You can get the coordinates of stencil and canvas with cropped image by processing `change` event.

::: tip
Cropper will emit `change` event on mounting, resizing the stencil, moving the stencil and changing the image.
:::

<getting-result-example></getting-result-example>

```js
import Vue from 'vue'
import { Cropper } from 'vue-advanced-cropper'

new Vue({
	el: '#app',
	data() {
		return {
			coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0
			},
			image: null
		}
	}
	methods: {
		onChange({coordinates, canvas}) {
			this.coordinates = coordinates
			// You able to do different manipulations at a canvas
			// but there we just get a cropped image
			this.image = canvas.toDataURL()
		}
	},
	components: {
		Cropper
	}
})
```

```html
<div id="app">
  <Cropper
		src="https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg"
		@change="onChange"
  />
</div>
```

### Second method

Also there is alternative to get the cropper result. You can call the cropper method `getResult` to get current stencil coordinates and canvas with cropped image.

Click at the button **Crop Image** below to see this method in action
<getting-result-second-example/>

```js
import Vue from 'vue'
import { Cropper } from 'vue-advanced-cropper'

new Vue({
	el: '#app',
	data() {
		return {
			coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0
			},
			image: null
		}
	}
	methods: {
		crop() {
			const {coordinates, canvas} = this.$refs.cropper.getResult()
			this.coordinates = coordinates
			// You able to do different manipulations at a canvas
			// but there we just get a cropped image
			this.image = canvas.toDataURL()
		}
	},
	components: {
		Cropper
	}
})
```

```html
<div id="app">
  <Cropper
		src="https://images.pexels.com/photos/580012/pexels-photo-580012.jpeg"
		ref="cropper"
  />
  <button @click="crop">
	Crop
  </button>
</div>
```

## Upload image

The image uploading doesn't depend at this library and can be completed by a numerous ways. There will be considered only one of them.

That's what you will get:
<upload-example></upload-example>

```js
import Vue from 'vue'
import { Cropper } from 'vue-advanced-cropper'

new Vue({
	el: '#app',
	data() {
		return {
			image: null
		}
	},
	methods: {
		uploadImage(event) {
			// Reference to the DOM input element
			var input = event.target;
			// Ensure that you have a file before attempting to read it
			if (input.files && input.files[0]) {
					// create a new FileReader to read this image and convert to base64 format
					var reader = new FileReader();
					// Define a callback function to run, when FileReader finishes its job
					reader.onload = (e) => {
							// Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
							// Read image as base64 and set to imageData
							this.image = e.target.result;
					}
					// Start the reader job - read file as a data url (base64 format)
					reader.readAsDataURL(input.files[0]);
			}
		}
	},
	components: {
		Cropper
	}
})
```

```html
<div id="app">
	<div class="upload-example">
		<Cropper
			classname="upload-example-cropper"
			:src="image"
		/>
		<div class="button-wrapper">
			<span class="button" @click="$refs.file.click()">
				<input type="file" ref="file" @change="uploadImage($event)" accept="image/*">
				Upload image
			</span>
		</div>
	</div>
</div>
```

```css
.upload-example-cropper {
	border: solid 1px #EEE;
	height: 300px;
	width: 100%;
}

.button-wrapper {
	display: flex;
	justify-content: center;
	margin-top: 17px;
}

.button {
	color: white;
	font-size: 16px;
	padding: 10px 20px;
	background: #3fb37f;
	cursor: pointer;
	transition: background 0.5s;
}

.button:hover {
	background: #38d890;
}

.button input {
	display: none;
}
```

## Custom restrictions

There may be situations, where you need to set the minimum and maximim sizes, for example, in pixels, not by percents. In that situations you should redefine the `restrictions` functions by passing your custom function as [a corresponding prop](/components/cropper.html#restrictions)


<custom-restrictions-example></custom-restrictions-example>

```js
import Vue from 'vue'
import { Cropper } from 'vue-advanced-cropper'

new Vue({
	el: '#app',
	methods: {
		pixelsRestriction({minWidth, minHeight, maxWidth, maxHeight, imageWidth, imageHeight}) {
			return {
				minWidth: minWidth,
				minHeight: minHeight,
				maxWidth: Math.min(imageWidth, maxWidth),
				maxHeight: Math.min(imageHeight, maxHeight),
			}
		},
	},
	components: {
		Cropper
	}
})
```

```html
<div id="app">
	<div class="custom-restrictions-example">
		<Cropper
			:src="image"
			:restrictions="pixelsRestriction"
			:minHeight="400"
			:minWidth="400"
		/>
	</div>
</div>
```


## Fixed stencil

There is the example of a fixed stencil below, that may be useful for mobile devices.
<mobile-fixed-example></mobile-fixed-example>

```html
<script>
import { Cropper } from 'vue-advanced-cropper';

export default {
	components: {
		Cropper,
	},
};
</script>
```

```html
<div id="app">
	<Cropper
		src="https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
		:stencil-props="{
		  handlers: {},
		  movable: false,
		  scalable: false,
		  aspectRatio: 1,
      }"
	/>
</div>
```

## Set coordinates

Usually an user changes the coordinates of a stencil, but sometimes you need to set its coordinates programmatically. There is the special method to do it: [setCoordinates](/components/cropper.html#setcoordinates-transform). It applies your changes respect to existing limitation (aspect ratios, minimum size and etc.)

<set-coordinates-example></set-coordinates-example>

The minimal working example:

```html
<script>
import { Cropper } from 'vue-advanced-cropper';

export default {
	components: {
		Cropper,
	},
	methods: {
		resize(width, height, left, top) {
			this.$refs.cropper.setCoordinates({
				width: width,
				height: height,
				left: left,
				top: top
			})
		},
	},
};
</script>
```

```html
<div id="app">
	<Cropper
		ref="cropper"
		:src="image"
	/>
</div>
```

### Arguments

The only argument `transform` can be: `Object`, `Function` or `Array` that contains objects or function in the case if you need consequence transforms.

#### `Object`

If you just want to set the known coordinates you can pass object to `setCoordinates` method

```js
cropper.setCoordinates({
	width: 32,
	height: 42,
	left: 102,
	top: 74
})
```

#### `Function`

But mostly you need to set coordinates based at current coordinates or image size.

1. Center stencil:
```js
cropper.setCoordinates((coordinates, imageSize) => ({
	left: imageSize.width/2 - coordinates.width/2,
	top: imageSize.height/2 - coordinates.height/2
}))

```
2. Maximize stencil:
```js
cropper.setCoordinates((coordinates, imageSize) => ({
	width: imageSize.width,
	height: imageSize.height
}))
```

#### `Array`

Finally, there might be situations where you need to make consequence transforms. For example, resize stencil and then center it.

That can appear to be superfluous, because you can set coordinates and size simultaneosly:
```js
cropper.setCoordinates((coordinates, imageSize) => ({
	width: newWidth,
	height: newHeight,
	left: imageSize.width/2 - newWidth.width/2,
	top: imageSize.height/2 - newHeight.height/2
}))
```

But there is a catch, `setCoordinates` method respects limitations, so the new width might be different than `newWidth` in this example.

So the right way is do multiple consequence transforms:
```js
cropper.setCoordinates([
	(coordinates, imageSize) => ({
		width: newWidth,
		height: newHeight,
	}),
	// There will be coordinates after first transformation
	(coordinates, imageSize) => ({
		left: imageSize.width/2 - coordinates.width/2,
		top: imageSize.height/2 - coordinates.height/2
	}),
])
```


## Default size and position

Sometime you should set the default position and default size of cropper. For example, if you automatically detect an user face.

<default-positioning-example></default-positioning-example>

```js
import Vue from 'vue'
import { Cropper } from 'vue-advanced-cropper'

new Vue({
	el: '#app',
	methods: {
		defaultPosition() {
			return {
				left: 100,
				top: 100
			}
		},
		defaultSize() {
			return {
				width: 400,
				height: 400,
			}
		}
	}
	components: {
		Cropper
	},
})
```


```html
<div id="app">
	<Cropper
		:src="https://images.unsplash.com/photo-1527199372136-dff50c10ea34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
		:defaultPosition="defaultPosition"
		:defaultSize="defaultSize"
	/>
</div>
```

## Blurred background

<blurred-background-example></blurred-background-example>

```html
<div class="cropper-wrapper">
	<div :style="{backgroundImage: 'url(' + img + ')'}" class="cropper-background"></div>
	<Cropper
		:src="img"
	/>
</div>
```

```css
.cropper-wrapper {
	position: relative;
	height: 400px;
	background: black;
}
.cropper-background {
	position: absolute;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: 50%;
	filter: blur(5px);
	opacity: 0.25;
}
```
