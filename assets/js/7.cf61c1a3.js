(window.webpackJsonp=window.webpackJsonp||[]).push([[7,12],{122:function(t,e,n){t.exports=n.p+"assets/img/image.1616fde2.jpg"},123:function(t,e,n){"use strict";var i=n(40);n.n(i).a},14:function(t,e,n){},180:function(t,e,n){"use strict";n.r(e);var i=n(11),s=n(52),o={name:"CircleExample",components:{Cropper:i.b},data:function(){return{stencil:s.default}}},c=(n(123),n(1)),r=Object(c.a)(o,function(){var t=this.$createElement;return(this._self._c||t)("Cropper",{attrs:{classname:"circle-example",src:n(122),"stencil-component":this.stencil}})},[],!1,null,null,null);e.default=r.exports},35:function(t,e,n){t.exports=n.p+"assets/img/handler.d2843e4e.svg"},36:function(t,e,n){"use strict";var i=n(14);n.n(i).a},40:function(t,e,n){},52:function(t,e,n){"use strict";n.r(e);var i=n(11),s={name:"CircleStencil",components:{PreviewResult:i.e,DraggableArea:i.c,DraggableElement:i.d},props:{img:{type:Object},resultCoordinates:{type:Object},stencilCoordinates:{type:Object}},computed:{style:function(){var t=this.stencilCoordinates,e=t.height,n=t.width,i=t.left,s=t.top;return{width:"".concat(n,"px"),height:"".concat(e,"px"),left:"".concat(i,"px"),top:"".concat(s,"px")}}},methods:{onMove:function(t){this.$emit("move",t)},onHandlerMove:function(t){var e=t.shift(),n=e.left/2,s=-e.top/2,o=this.resultCoordinates,c=(o.height,o.width);o.left,o.top,this.stencilCoordinates.width;this.$emit("resize",new i.f(t.nativeEvent,{left:n,right:n,top:s,bottom:s}))},aspectRatios:function(){return{minimum:1,maximum:1}}}},o=(n(36),n(1)),c=Object(o.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"circle-stencil",style:t.style},[i("DraggableElement",{attrs:{classname:"circle-stencil__handler"},on:{drag:t.onHandlerMove}},[i("img",{staticClass:"circle-stencil__icon",attrs:{src:n(35),alt:""}})]),t._v(" "),i("DraggableArea",{on:{move:t.onMove}},[i("PreviewResult",{attrs:{classname:"circle-stencil__preview",img:t.img,width:t.stencilCoordinates.width,height:t.stencilCoordinates.height,resultCoordinates:t.resultCoordinates,stencilCoordinates:t.stencilCoordinates}})],1)],1)},[],!1,null,null,null);e.default=c.exports}}]);