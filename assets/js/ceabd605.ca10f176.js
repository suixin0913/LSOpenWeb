(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[1527],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return f},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},f=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,s=e.originalType,i=e.parentName,f=l(e,["components","mdxType","originalType","parentName"]),c=p(r),d=o,m=c["".concat(i,".").concat(d)]||c[d]||u[d]||s;return r?n.createElement(m,a(a({ref:t},f),{},{components:r})):n.createElement(m,a({ref:t},f))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=r.length,a=new Array(s);a[0]=c;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<s;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},6624:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return f},default:function(){return c}});var n=r(2122),o=r(9756),s=(r(7294),r(3905)),a=["components"],l={},i=void 0,p={unversionedId:"tools/LISA_LPM/development/API/interfaces/fs.readvresult",id:"tools/LISA_LPM/development/API/interfaces/fs.readvresult",isDocsHomePage:!1,title:"fs.readvresult",description:"@listenai/lisa_core / Exports / fs / ReadVResult",source:"@site/docs/tools/LISA_LPM/development/API/interfaces/fs.readvresult.md",sourceDirName:"tools/LISA_LPM/development/API/interfaces",slug:"/tools/LISA_LPM/development/API/interfaces/fs.readvresult",permalink:"/tools/LISA_LPM/development/API/interfaces/fs.readvresult",version:"current",frontMatter:{},sidebar:"toolsLISA",previous:{title:"fs.readsyncoptions",permalink:"/tools/LISA_LPM/development/API/interfaces/fs.readsyncoptions"},next:{title:"fs.rmdiroptions",permalink:"/tools/LISA_LPM/development/API/interfaces/fs.rmdiroptions"}},f=[{value:"Table of contents",id:"table-of-contents",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"buffers",id:"buffers",children:[]},{value:"bytesRead",id:"bytesread",children:[]}]}],u={toc:f};function c(e){var t=e.components,r=(0,o.Z)(e,a);return(0,s.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/development/API/README"},"@listenai/lisa_core")," / ",(0,s.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/development/API/modules"},"Exports")," / ",(0,s.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/development/API/modules/fs"},"fs")," / ReadVResult"),(0,s.kt)("h1",{id:"interface-readvresult"},"Interface: ReadVResult"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/development/API/modules/fs"},"fs"),".ReadVResult"),(0,s.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,s.kt)("h3",{id:"properties"},"Properties"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/development/API/interfaces/fs.readvresult#buffers"},"buffers")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/development/API/interfaces/fs.readvresult#bytesread"},"bytesRead"))),(0,s.kt)("h2",{id:"properties-1"},"Properties"),(0,s.kt)("h3",{id:"buffers"},"buffers"),(0,s.kt)("p",null,"\u2022 ",(0,s.kt)("strong",{parentName:"p"},"buffers"),": ",(0,s.kt)("inlineCode",{parentName:"p"},"ArrayBufferView"),"[]"),(0,s.kt)("h4",{id:"defined-in"},"Defined in"),(0,s.kt)("p",null,"node_modules/@types/node/fs.d.ts:2213"),(0,s.kt)("hr",null),(0,s.kt)("h3",{id:"bytesread"},"bytesRead"),(0,s.kt)("p",null,"\u2022 ",(0,s.kt)("strong",{parentName:"p"},"bytesRead"),": ",(0,s.kt)("inlineCode",{parentName:"p"},"number")),(0,s.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,s.kt)("p",null,"node_modules/@types/node/fs.d.ts:2212"))}c.isMDXComponent=!0}}]);