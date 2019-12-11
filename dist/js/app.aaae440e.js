(function(t){function e(e){for(var n,s,c=e[0],i=e[1],l=e[2],d=0,h=[];d<c.length;d++)s=c[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&h.push(r[s][0]),r[s]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);u&&u(e);while(h.length)h.shift()();return a.push.apply(a,l||[]),o()}function o(){for(var t,e=0;e<a.length;e++){for(var o=a[e],n=!0,c=1;c<o.length;c++){var i=o[c];0!==r[i]&&(n=!1)}n&&(a.splice(e--,1),t=s(s.s=o[0]))}return t}var n={},r={app:0},a=[];function s(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=n,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(o,n,function(e){return t[e]}.bind(null,n));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=i;a.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"034f":function(t,e,o){"use strict";var n=o("85ec"),r=o.n(n);r.a},1:function(t,e){},"39ad":function(t,e,o){"use strict";var n=o("7674"),r=o.n(n);r.a},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("set-game")],1)},a=[],s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"game-body",class:{pink:1===t.colorState,blue:2===t.colorState}},[o("div",{staticClass:"game-container"},[o("div",{staticClass:"bar"},[o("h1",[t._v("Set "+t._s(t.score>0?"(×"+t.score+")":""))]),o("button",{staticStyle:{border:"none","box-shadow":"none","border-radius":"0"},on:{click:function(e){t.showMenu=!t.showMenu}}},[t._v(t._s(t.showMenu?"╳":"☰"))])]),o("div",{staticClass:"bar menu",class:{"menu-hidden":!t.showMenu}},[o("div",{staticStyle:{color:"#505050",display:"flex","flex-direction":"column","font-size":"0.75rem","align-self":"flex-start",position:"absolute"}},t._l(t.players,(function(e){return o("div",{key:e.id},[t._v(t._s(e.username+": ×"+e.score+" (-"+e.penalties+")"))])})),0),o("div",{staticClass:"join-room"},[o("label",[t._v("ROOM:")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.roomName,expression:"roomName"}],attrs:{type:"text",autocapitalize:"off"},domProps:{value:t.roomName},on:{input:function(e){e.target.composing||(t.roomName=e.target.value)}}}),o("a",{staticClass:"a-button",attrs:{href:t.roomUrl}},[t._v("JOIN")])]),o("div",{staticClass:"join-room"},[o("label",[t._v("NAME:")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"text",autocapitalize:"off"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),o("button",{staticClass:"a-button",staticStyle:{"box-shadow":"none"},on:{click:function(e){return t.changeName(t.username)}}},[t._v("EDIT")])]),o("button",{on:{click:function(e){t.colors=t.colorSets[++t.colorIndex%t.colorSets.length]}}},[t._v("Change colors")]),o("button",{on:{click:function(e){return t.loadSavedGame(2)}}},[t._v("Load test game")])]),o("div",{staticClass:"bar"},[o("div",{staticClass:"info",class:{hidden:t.loading}},[t._v(t._s(t.setExists?"A SET EXISTS.":"NO SETS EXIST."))]),o("div",{staticClass:"controls"},[o("button",{on:{click:function(e){return t.drawCards()}}},[t._v("Draw")]),o("button",{on:{click:function(e){return t.rotateBoard()}}},[t._v("Rotate")]),o("button",{on:{click:function(e){return t.newGame()}}},[t._v("New game")])])]),o("div",{staticClass:"board",class:[0===this.rotation?"board-v":"board-h"]},t._l(t.displayCards,(function(e,n){return o("set-card",{key:n,attrs:{card:e,color:t.colors[e.color],selected:t.selection[n],isLoading:t.loading,rotation:t.rotation},nativeOn:{click:function(e){return e.preventDefault(),t.selectCard(n)}}})})),1)])])},c=[],i=(o("99af"),o("c975"),o("baa5"),o("fb6a"),o("b0c0"),o("284c")),l=(o("8055"),function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"card",class:{blank:-1===t.card.count,selected:-1!==t.selected}},[o("div",[o("svg",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],style:{transform:"rotateZ("+t.rotation+"deg)"},attrs:{viewBox:"0 0 120 120"}},[o("pattern",{attrs:{id:"diagonalHatch"+t.card.color,width:"5",height:"5",patternTransform:"rotate(45 0 0)",patternUnits:"userSpaceOnUse"}},[o("line",{attrs:{x1:"0",y1:"0",x2:"0",y2:"5",stroke:t.color,"stroke-width":"2px"}})]),t._l(t.card.count+1,(function(e,n){return o(t.shapeComponents[t.card.shape],{key:n,tag:"component",attrs:{x:30,y:45-20*t.card.count+40*n,w:60,h:30,card:t.card,color:t.color}})}))],2)])])}),u=[],d=(o("a9e3"),function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("polygon",{attrs:{points:t.points,fill:t.fill[t.card.shading],stroke:t.color,"stroke-width":"3px"}})}),h=[],f={name:"SetDiamond",props:{x:Number,y:Number,w:Number,h:Number,card:Object,color:String},computed:{points:function(){var t=this.x,e=this.y,o=this.w,n=this.h;return"".concat(t+o/2,",").concat(e," ")+"".concat(t,",").concat(e+n/2," ")+"".concat(t+o/2,",").concat(e+n," ")+"".concat(t+o,",").concat(e+n/2)},fill:function(){return["#fff",this.color,"url('#diagonalHatch".concat(this.card.color,"')")]}}},m=f,p=o("2877"),v=Object(p["a"])(m,d,h,!1,null,"5a117b1c",null),g=v.exports,b=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("rect",{attrs:{x:t.x,y:t.y,rx:t.h/2,width:t.w,height:t.h,stroke:t.color,fill:t.fill[t.card.shading],"stroke-width":"3px"}})},w=[],C={name:"SetOval",props:{x:Number,y:Number,w:Number,h:Number,card:Object,color:String},computed:{fill:function(){return["#fff",this.color,"url('#diagonalHatch".concat(this.card.color,"')")]}}},S=C,k=Object(p["a"])(S,b,w,!1,null,"4c508b87",null),y=k.exports,x=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("path",{style:{transform:"translate(50%, "+(.75*t.y+15)+"%)"},attrs:{d:t.d,fill:t.fill[t.card.shading],stroke:t.color,"stroke-width":"3px"}})},_=[],O={name:"SetSquiggle",props:{x:Number,y:Number,w:Number,h:Number,card:Object,color:String},computed:{d:function(){return"M ".concat(-14," ",14," ")+"C -2 14, -2 8, 10 8 C 22 8, 20 14, 28 14 C 40 14, 30 -14, 14 -14 C 2 -14, 2 -8, -10 -8 C -22 -8, -20 -14, -28 -14 C -40 -14, -30 14, -14 14"},fill:function(){return["#fff0",this.color,"url('#diagonalHatch".concat(this.card.color,"')")]}}},N=O,j=Object(p["a"])(N,x,_,!1,null,"0c50ca7a",null),E=j.exports,T={name:"SetCard",components:{SetDiamond:g,SetOval:y,SetSquiggle:E},props:{card:Object,selected:Number,color:String,isLoading:Boolean,rotation:Number},data:function(){return{shapeComponents:[g,y,E]}}},M=T,I=(o("88c1"),Object(p["a"])(M,l,u,!1,null,"acf3a8ba",null)),P=I.exports,G={name:"SetGame",components:{SetCard:P},data:function(){return{sock:{},rawCards:[],selection:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],colors:["#ff3311","#33c055","#6622c0"],colorSets:[["#ff3311","#33c055","#6622c0"],["#222222","#33c055","#6622c0"],["#ff3311","#222222","#6622c0"],["#cccccc","#777777","#000000"],["#9922c0","#1520ff","#ddd022"]],colorIndex:0,loading:!1,submitting:!1,showConsole:!1,showMenu:!1,rotation:0,players:[],colorState:0,roomName:"",username:"",score:0,userId:""}},watch:{},computed:{cards:function(){for(var t=[],e=0;e<this.rawCards.length;e++)t.push({count:this.rawCards[e]/27|0,color:this.rawCards[e]/9%3|0,shape:this.rawCards[e]/3%3|0,shading:this.rawCards[e]%3|0});return t},baseUrl:function(){return location.href.slice(0,location.href.lastIndexOf("/")+1)},socketUrl:function(){return"ws://"+location.host+"/"+this.roomName},roomUrl:function(){return"http://"+location.host+"/"+this.roomName},displayCards:function(){for(var t=Object(i["a"])(this.cards),e=0;e<Math.max(12-this.rawCards.length,0);e++)t.push({count:-1,color:0,shape:0,shading:0});return t},selectedCards:function(){for(var t=[],e=0;e<this.selection.length;e++)-1!==this.selection[e]&&t.push(this.selection[e]);return t},selectedIndices:function(){for(var t=[],e=0;e<this.selection.length;e++)-1!==this.selection[e]&&t.push(e);return t},setExists:function(){for(var t=this.rawCards.length,e=this.rawCards.slice(0,t/2),o=this.rawCards.slice(t/2),n=0;n<e.length-1;n++)for(var r=n;r<e.length-1;r++){var a=this.computeLastCard(e[n],e[r+1]);if(this.rawCards.indexOf(a)>-1)return!0}for(var s=0;s<o.length-1;s++)for(var c=s;c<o.length-1;c++){var i=this.computeLastCard(o[s],o[c+1]);if(this.rawCards.indexOf(i)>-1)return!0}return!1}},created:function(){var t=this;this.connect(),window.onkeydown=function(e){"`"===e.key&&e.ctrlKey&&t.loadSavedGame(2)}},mounted:function(){this.init()},methods:{connect:function(){var t=this;this.roomName=location.href.substr(location.href.lastIndexOf("/")+1),""!==this.roomName&&(window.document.title="Set | "+this.roomName),"http://localhost:8080/"===location.href?this.sock=new WebSocket("ws://localhost:8000"):this.sock=new WebSocket(this.socketUrl),this.sock.onopen=function(e){console.log("Connected!"),t.sockEmit("user-connected",t.userId)},this.sock.onclose=function(e){console.log("Disconnected!"),setTimeout((function(){console.log("Attempting to reconnect..."),t.connect(),t.init()}),1e3)},setTimeout((function(){t.selection=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],t.submitting=!1}),350)},init:function(){var t=this;this.sock.onmessage=function(e){var o=JSON.parse(e.data),n=o.message,r=o.data;switch(console.log("IN: "+n),n){case"new-game":t.rawCards=[],t.score=0;break;case"load-game":setTimeout((function(){t.rawCards=r}),350);break;case"set-user-id":t.userId=r.id,t.username=r.name,console.log("User ID set to [".concat(r.id,"]"));break;case"update-players":var a=[];for(var s in r)a.push(r[s]);t.players=[].concat(a),console.log("Players updated.");break;case"draw-card":t.rawCards.push(r);break;case"valid-set":t.flashColorServer(!0),t.score=r.score,setTimeout((function(){t.selection=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],t.submitting=!1}),350);break;case"invalid-set":t.flashColorServer(!1),setTimeout((function(){t.selection=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],t.submitting=!1}),350);break;case"time":console.log(r);break}setTimeout((function(){t.loading=!1}),200)}},changeName:function(t){this.sockEmit("change-name",t)},flashColor:function(t){var e=this,o=this.rawCards[t[2]]===this.computeLastCard(this.rawCards[t[0]],this.rawCards[t[1]]);this.colorState=o?1:2,setTimeout((function(){e.colorState=0}),350)},flashColorServer:function(t){var e=this;this.colorState=t?1:2,setTimeout((function(){e.colorState=0}),350)},computeLastCard:function(t,e){for(var o=0,n=0;n<4;n++){var r=t/Math.pow(3,n)%3|0,a=e/Math.pow(3,n)%3|0;o+=r===a?r*Math.pow(3,n):(3-r-a)*Math.pow(3,n)}return o},sockEmit:function(t,e){console.log("OUT: "+t),this.sock.send(JSON.stringify({message:t,data:e}))},newGame:function(){this.loading=!0,this.sockEmit("new-game")},loadSavedGame:function(t){var e=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[73,2,47,53,66,32,74,52,46,15,49,56,9,50,12,19,61,44,22,62,65,79,31,40,13,37,70,63,24,54,39,7,27,25,14,43,20,6,8,58,45,59,67,28,78,76,60,33,11,10,48,4,42,1,5,38,21,35,3,72,75,18,0,23,16,71,69,68,41,17,36,29,57,26,51,55,77,64,30,80,34],[73,2,47,53,66,32,74,52,46,15,49,56,9,50,12]];t<e.length&&this.loadGame(e[t])},loadGame:function(t){this.loading=!0,t.length>0&&this.sockEmit("load-new-game",t)},drawCards:function(){this.rawCards.length<15&&this.sockEmit("draw-cards")},selectCard:function(t){if(!this.submitting){var e=this.rawCards[t];this.$set(this.selection,t,-1===this.selection[t]?e:-1),3===this.selectedCards.length&&this.submitSet(this.selectedIndices)}},submitSet:function(t){this.submitting=!0,this.sockEmit("submit-set",t)},rotateBoard:function(){this.rotation=0===this.rotation?90:0}}},L=G,U=(o("39ad"),Object(p["a"])(L,s,c,!1,null,"b1e1e240",null)),$=U.exports,D={name:"app",components:{SetGame:$}},J=D,B=(o("034f"),Object(p["a"])(J,r,a,!1,null,null,null)),H=B.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(H)}}).$mount("#app")},7674:function(t,e,o){},"85ec":function(t,e,o){},"88c1":function(t,e,o){"use strict";var n=o("f396"),r=o.n(n);r.a},f396:function(t,e,o){}});
//# sourceMappingURL=app.aaae440e.js.map