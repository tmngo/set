(function(t){function e(e){for(var o,s,i=e[0],c=e[1],l=e[2],d=0,h=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&h.push(a[s][0]),a[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(h.length)h.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],o=!0,i=1;i<r.length;i++){var c=r[i];0!==a[c]&&(o=!1)}o&&(n.splice(e--,1),t=s(s.s=r[0]))}return t}var o={},a={app:0},n=[];function s(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=o,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(r,o,function(e){return t[e]}.bind(null,o));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;n.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";var o=r("85ec"),a=r.n(o);a.a},1:function(t,e){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("set-game")],1)},n=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"game-body",class:{pink:1===t.colorState,blue:2===t.colorState}},[r("div",{staticClass:"game-container"},[r("div",{staticClass:"bar"},[r("h1",[t._v("Set "+t._s(t.score>0?"(×"+t.score+")":""))]),r("div",{staticClass:"join-room"},[r("label",[t._v("ROOM:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.roomName,expression:"roomName"}],attrs:{type:"text",autocapitalize:"off"},domProps:{value:t.roomName},on:{input:function(e){e.target.composing||(t.roomName=e.target.value)}}}),r("a",{staticClass:"a-button",attrs:{href:t.roomUrl}},[t._v("Join")])])]),r("div",{staticClass:"bar"},[r("div",{staticClass:"info",class:{hidden:t.loading}},[t._v(t._s(t.setExists?"A SET EXISTS.":"NO SETS EXIST."))]),r("div",{staticClass:"controls"},[r("button",{on:{click:function(e){return t.drawCards()}}},[t._v("Draw")]),r("button",{on:{click:function(e){return t.rotateBoard()}}},[t._v("Rotate")]),r("button",{on:{click:function(e){return t.newGame()}}},[t._v("New game")])])]),r("div",{staticClass:"board",class:[0===this.rotation?"board-v":"board-h"]},t._l(t.displayCards,(function(e,o){return r("set-card",{key:o,attrs:{card:e,color:t.colors[e.color],selected:t.selection[o],isLoading:t.loading,rotation:t.rotation},nativeOn:{click:function(e){return e.preventDefault(),t.selectCard(o)}}})})),1)])])},i=[],c=(r("c975"),r("baa5"),r("fb6a"),r("284c")),l=(r("8055"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card",class:{blank:-1===t.card.count,selected:-1!==t.selected}},[r("div",[r("svg",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],style:{transform:"rotateZ("+t.rotation+"deg)"},attrs:{viewBox:"0 0 120 120"}},[r("pattern",{attrs:{id:"diagonalHatch"+t.card.color,width:"5",height:"5",patternTransform:"rotate(45 0 0)",patternUnits:"userSpaceOnUse"}},[r("line",{attrs:{x1:"0",y1:"0",x2:"0",y2:"5",stroke:t.color,"stroke-width":"2px"}})]),t._l(t.card.count+1,(function(e,o){return r(t.shapeComponents[t.card.shape],{key:o,tag:"component",attrs:{x:30,y:45-20*t.card.count+40*o,w:60,h:30,card:t.card,color:t.color}})}))],2)])])}),u=[],d=(r("a9e3"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("polygon",{attrs:{points:t.points,fill:t.fill[t.card.shading],stroke:t.color,"stroke-width":"3px"}})}),h=[],f=(r("99af"),{name:"SetDiamond",props:{x:Number,y:Number,w:Number,h:Number,card:Object,color:String},computed:{points:function(){var t=this.x,e=this.y,r=this.w,o=this.h;return"".concat(t+r/2,",").concat(e," ")+"".concat(t,",").concat(e+o/2," ")+"".concat(t+r/2,",").concat(e+o," ")+"".concat(t+r,",").concat(e+o/2)},fill:function(){return["#fff",this.color,"url('#diagonalHatch".concat(this.card.color,"')")]}}}),m=f,p=r("2877"),v=Object(p["a"])(m,d,h,!1,null,"5a117b1c",null),b=v.exports,g=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("rect",{attrs:{x:t.x,y:t.y,rx:t.h/2,width:t.w,height:t.h,stroke:t.color,fill:t.fill[t.card.shading],"stroke-width":"3px"}})},w=[],C={name:"SetOval",props:{x:Number,y:Number,w:Number,h:Number,card:Object,color:String},computed:{fill:function(){return["#fff",this.color,"url('#diagonalHatch".concat(this.card.color,"')")]}}},S=C,k=Object(p["a"])(S,g,w,!1,null,"4c508b87",null),x=k.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("path",{style:{transform:"translate(50%, "+(.75*t.y+15)+"%)"},attrs:{d:t.d,fill:t.fill[t.card.shading],stroke:t.color,"stroke-width":"3px"}})},O=[],N={name:"SetSquiggle",props:{x:Number,y:Number,w:Number,h:Number,card:Object,color:String},computed:{d:function(){return"M ".concat(-14," ",14," ")+"C -2 14, -2 8, 10 8 C 22 8, 20 14, 28 14 C 40 14, 30 -14, 14 -14 C 2 -14, 2 -8, -10 -8 C -22 -8, -20 -14, -28 -14 C -40 -14, -30 14, -14 14"},fill:function(){return["#fff0",this.color,"url('#diagonalHatch".concat(this.card.color,"')")]}}},_=N,j=Object(p["a"])(_,y,O,!1,null,"0c50ca7a",null),E=j.exports,T={name:"SetCard",components:{SetDiamond:b,SetOval:x,SetSquiggle:E},props:{card:Object,selected:Number,color:String,isLoading:Boolean,rotation:Number},data:function(){return{shapeComponents:[b,x,E]}}},M=T,L=(r("88c1"),Object(p["a"])(M,l,u,!1,null,"acf3a8ba",null)),P=L.exports,U={name:"SetGame",components:{SetCard:P},data:function(){return{sock:{},rawCards:[],selection:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],colors:["#ff3311","#33c055","#6622c0"],loading:!1,submitting:!1,rotation:0,colorState:0,roomName:"",score:0}},computed:{cards:function(){for(var t=[],e=0;e<this.rawCards.length;e++)t.push({count:this.rawCards[e]/27|0,color:this.rawCards[e]/9%3|0,shape:this.rawCards[e]/3%3|0,shading:this.rawCards[e]%3|0});return t},baseUrl:function(){return location.href.slice(0,location.href.lastIndexOf("/")+1)},socketUrl:function(){return"ws://"+location.host+"/"+this.roomName},roomUrl:function(){return"http://"+location.host+"/"+this.roomName},displayCards:function(){for(var t=Object(c["a"])(this.cards),e=0;e<Math.max(12-this.rawCards.length,0);e++)t.push({count:-1,color:0,shape:0,shading:0});return t},selectedCards:function(){for(var t=[],e=0;e<this.selection.length;e++)-1!==this.selection[e]&&t.push(this.selection[e]);return t},selectedIndices:function(){for(var t=[],e=0;e<this.selection.length;e++)-1!==this.selection[e]&&t.push(e);return t},setExists:function(){for(var t=this.rawCards.length,e=this.rawCards.slice(0,t/2),r=this.rawCards.slice(t/2),o=0;o<e.length-1;o++)for(var a=o;a<e.length-1;a++){var n=this.computeLastCard(e[o],e[a+1]);if(this.rawCards.indexOf(n)>-1)return!0}for(var s=0;s<r.length-1;s++)for(var i=s;i<r.length-1;i++){var c=this.computeLastCard(r[s],r[i+1]);if(this.rawCards.indexOf(c)>-1)return!0}return!1}},created:function(){this.roomName=location.href.substr(location.href.lastIndexOf("/")+1),""!==this.roomName&&(window.document.title="Set | "+this.roomName),"http://localhost:8080/"===location.href?this.sock=new WebSocket("ws://localhost:8000"):this.sock=new WebSocket(this.socketUrl)},mounted:function(){this.init()},methods:{init:function(){var t=this;this.sock.onmessage=function(e){var r=JSON.parse(e.data),o=r.message,a=r.data;switch(console.log("IN: "+o),o){case"new-game":t.rawCards=[],t.score=0;break;case"load-game":setTimeout((function(){t.rawCards=a}),350);break;case"draw-card":t.rawCards.push(a);break;case"valid-set":t.flashColorServer(!0),t.score=a.score,setTimeout((function(){t.selection=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],t.submitting=!1}),350);break;case"invalid-set":t.flashColorServer(!1),setTimeout((function(){t.selection=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],t.submitting=!1}),350);break;case"time":console.log(a);break}setTimeout((function(){t.loading=!1}),200)}},flashColor:function(t){var e=this,r=this.rawCards[t[2]]===this.computeLastCard(this.rawCards[t[0]],this.rawCards[t[1]]);this.colorState=r?1:2,setTimeout((function(){e.colorState=0}),350)},flashColorServer:function(t){var e=this;this.colorState=t?1:2,setTimeout((function(){e.colorState=0}),350)},computeLastCard:function(t,e){for(var r=0,o=0;o<4;o++){var a=t/Math.pow(3,o)%3|0,n=e/Math.pow(3,o)%3|0;r+=a===n?a*Math.pow(3,o):(3-a-n)*Math.pow(3,o)}return r},sockEmit:function(t,e){console.log("OUT: "+t),this.sock.send(JSON.stringify({message:t,data:e}))},newGame:function(){this.loading=!0,this.sockEmit("new-game")},loadSavedGame:function(t){var e=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[73,2,47,53,66,32,74,52,46,15,49,56,9,50,12,19,61,44,22,62,65,79,31,40,13,37,70,63,24,54,39,7,27,25,14,43,20,6,8,58,45,59,67,28,78,76,60,33,11,10,48,4,42,1,5,38,21,35,3,72,75,18,0,23,16,71,69,68,41,17,36,29,57,26,51,55,77,64,30,80,34],[73,2,47,53,66,32,74,52,46,15,49,56,9,50,12]];this.loadGame(e[t])},loadGame:function(t){this.loading=!0,t.length>0&&this.sockEmit("load-new-game",t)},drawCards:function(){this.rawCards.length<15&&this.sockEmit("draw-cards")},selectCard:function(t){if(!this.submitting){var e=this.rawCards[t];this.$set(this.selection,t,-1===this.selection[t]?e:-1),3===this.selectedCards.length&&this.submitSet(this.selectedIndices)}},submitSet:function(t){this.submitting=!0,this.sockEmit("submit-set",t)},rotateBoard:function(){this.rotation=0===this.rotation?90:0}}},$=U,G=(r("f00e"),Object(p["a"])($,s,i,!1,null,"43bd0634",null)),I=G.exports,J={name:"app",components:{SetGame:I}},B=J,D=(r("034f"),Object(p["a"])(B,a,n,!1,null,null,null)),H=D.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(H)}}).$mount("#app")},"85ec":function(t,e,r){},"88c1":function(t,e,r){"use strict";var o=r("f396"),a=r.n(o);a.a},ad04:function(t,e,r){},f00e:function(t,e,r){"use strict";var o=r("ad04"),a=r.n(o);a.a},f396:function(t,e,r){}});
//# sourceMappingURL=app.63e4d43b.js.map