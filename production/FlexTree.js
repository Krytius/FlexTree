/**
 * FlexTree
 * @version: 0.0.1
 * @author: Elvis Ferreira Coelho (http://elviscoelho.net)
 * Date criation: 14/02/2014
 */
var Tree=function(a){var b,c,d,e,f,g=new TreeCreate,h=new TreeEvents,i=document.getElementById(a),j={},k={},l=function(){return j},m=function(a){b=a},n=function(){return b},o=function(a){c=a},p=function(){return c},q=function(a){d=a},r=function(){return d},s=function(a){e=a},t=function(){return e},u=function(a){f=a},v=function(){return f},w=function(a){j=a,x()},x=function(){if(i.className="mw-flextreeview",k={width:i.offsetWidth,height:i.offsetHeight},y(),b){var a=z();i.appendChild(a)}var c=A();if(i.appendChild(c),f){var d=B();i.appendChild(d)}},y=function(){g.init(H),h.init(H)},z=function(){var a=C("div");if(a.className="mw-title",c){var d=C("i");d.className="icon",d.style.backgroundImage="url("+c+")",a.appendChild(d)}var e=C("div");return e.className="text",e.innerHTML=b,a.appendChild(e),a},A=function(){var a=C("div");a.className="mw-tree-view",a.style.height=g.calculoElementos()+"px";var b=g.createTree(j);return a.appendChild(b),a},B=function(){var a=C("div");a.className="mw-tree-buttons";for(var b=f.length,c=b-1;c>=0;c--){var d=g.createButton(f[c]);a.appendChild(d)}return a},C=function(a){return document.createElement(a)},D=function(a){var b=document.querySelectorAll(a);return b.length<2?b[0]:b},E=function(a,b){b&&(b.className+=a)},F=function(a,b){b&&(b.className=b.className.replace(a,""))},G=function(a,b,c){c&&(c.className=c.className.replace(a,b))},H={treeCreate:g,treeEvents:h,object:j,init:w,getObject:l,getTitle:n,getIcon:p,setTitle:m,setIcon:o,setColapse:q,getColapse:r,setCheck:s,getCheck:t,setButtons:u,getButtons:v,create:C,selector:D,addClass:E,removeClass:F,replaceClass:G,element:i,setMonitorEvent:h.setMonitorEvents};return H},TreeCreate=function(){var a={},b=function(b){a=b},c=function(a,b,d){d?d+=1:d=1;for(var e=a.length,f=0;e>f;f++)if(a[f].id===b)return d;for(var g,f=0;e>f;f++){var h=a[f].filho?1:0;if(h&&(g=c(a[f].filho,b,d)),g)return g}},d=function(a,b){for(var c=a.length,e=0;c>e;e++)if(a[e].id===b&&a[e].filho)return a[e].filho;for(var f,e=0;c>e;e++){var g=a[e].filho?1:0;if(g&&(f=d(a[e].filho,b)),f)return f}},e=function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d].id===b&&a[d].filho)return a[d];for(var f,d=0;c>d;d++){var g=a[d].filho?1:0;if(g&&(f=e(a[d].filho,b)),f)return f}},f=function(b){var d=b.length,e=a.create("div");e.setAttribute("id","mw-content-tree");for(var h=0;d>h;h++){var k=c(a.getObject(),b[h].id),l=b[h].filho?1:0,m=a.create("div");m.className="mw-topic",m.setAttribute("data-id",b[h].id),m.setAttribute("group-id",b[h].idGroup),m.style.width=i(k)+"px",a.getCheck()||(m.onclick=a.treeEvents.openCloseGroup);var n=a.create("div");if(n.className="mw-title-tree",n.innerHTML=b[h].nome,n.style.width=j(m)+"px",n.onclick=a.treeEvents.eventsTitle,m.appendChild(n),a.getCheck()){var o=a.create("div");o.className=b[h].check?"checkActive":"checkInative",o.setAttribute("id","mw-check"),o.onclick=a.treeEvents.markDesmarkCheck,m.appendChild(o)}if(l){var p=g();a.getCheck()&&(p.onclick=a.treeEvents.openCloseGroup),m.appendChild(p)}if(e.appendChild(m),k>1&&(m.parentNode.setAttribute("data-id",b[h].id),m.parentNode.setAttribute("group-id",b[h].idGroup),m.parentNode.className="mw-group",m.parentNode.style.display=a.getColapse()?"block":"none"),l){var q=f(b[h].filho);e.appendChild(q)}}return e},g=function(){var b=a.create("i");return b.className=a.getColapse()?"arrowActive":"arrowInactive",b},h=function(b){var c=a.create("div");c.className="mw-button-custom",c.style.width=l()+"px";var d=a.create("div");return d.innerHTML=b.name,d.style.backgroundImage="url("+b.icon+")",d.className="mw-text-button",d.style.width=l()-20+"px",c.appendChild(d),c.onclick=function(){a.treeEvents.eventButton(this,b.eventReturn,b.callback)},c},i=function(b){var c=a.element.offsetWidth-20*(b?b:0);return c},j=function(b){var c=parseInt(b.style.width)-(a.getCheck()?40:25);return c},k=function(){var b=a.getTitle()?28:0,c=a.getButtons()?35:0,d=a.element.offsetHeight-b-c;return d},l=function(){var b=a.element.offsetWidth,c=b/a.getButtons().length,d=.2*b;return c>d&&(c=d),c},m={init:b,createTree:f,returnTreeDown:d,returnTreeUp:e,createButton:h,calculoElementos:k};return m},TreeEvents=function(){var a,b={},c=[],d=function(a){b=a},e=function(a){c=a},f=function(){return c},g=function(){var a,c;"arrow"===this.className.substr(0,5)?(a=this.parentNode,c=this):(a=this,c=this.childNodes[this.childNodes.length-1]);var d=a.getAttribute("data-id"),e=b.selector('.mw-group[group-id="'+d+'"]')[0];"block"===e.style.display?(e.style.display="none",b.replaceClass("arrowActive","arrowInactive",c)):(e.style.display="block",b.replaceClass("arrowInactive","arrowActive",c))},h=function(){var a;a="check"===this.className.substr(0,5)?this:this.parentNode.childNodes[1],j(a)},i=function(){var a=this.parentNode.getAttribute("data-id");b.getCheck()&&j(b.selector('.mw-topic[data-id="'+a+'"] #mw-check'))},j=function(a){var c=a.parentNode.getAttribute("data-id"),d=a.parentNode.getAttribute("group-id"),e=!1;"checkMediate"===a.className?(e=!0,b.replaceClass("checkMediate","checkActive",a),m(c)):"checkActive"===a.className?(e=!1,b.replaceClass("checkActive","checkInative",a),l(c)):(e=!0,b.replaceClass("checkInative","checkActive",a),m(c));var f=b.treeCreate.returnTreeDown(b.getObject(),c);f&&k(f,e),n(d,b.getObject())},k=function(a,c){for(var d=a.length,e=0;d>e;e++){var f=b.selector('.mw-topic[data-id="'+a[e].id+'"][group-id="'+a[e].idGroup+'"] #mw-check');c?(b.replaceClass("checkInative","checkActive",f),m(a[e].id)):(b.replaceClass("checkActive","checkInative",f),l(a[e].id)),a[e].filho&&k(a[e].filho,c)}},l=function(b){if(c.length>0){var d=c.indexOf(b);c.splice(d,1),a&&a(b,!1,c)}},m=function(b){var d=c.indexOf(b);-1===d&&c.push(b),a&&a(b,!0,c)},n=function(a,c){var d=b.treeCreate.returnTreeUp(c,a);if(d){for(var e=d.filho.length,f=b.selector('#mw-content-tree[group-id="'+d.id+'"] div.mw-topic div#mw-check'),g=0,h=0;e>h;h++)f.length||(f=[f]),"checkActive"===f[h].className&&g++;var i=b.selector('.mw-topic[data-id="'+d.id+'"] #mw-check');i.className=g===e?"checkActive":0===g?"checkInative":"checkMediate"}},o=function(a,b){switch(a){case"objectChecked":b(c)}},p=function(b,c){switch(b){case"OnCheck":a=c}},q={init:d,openCloseGroup:g,markDesmarkCheck:h,eventsTitle:i,eventButton:o,setSelected:e,getSelected:f,setMonitorEvents:p};return q};