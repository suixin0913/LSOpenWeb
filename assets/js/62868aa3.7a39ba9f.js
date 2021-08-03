(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[7687],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return k}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=d(n),k=a,m=u["".concat(s,".").concat(k)]||u[k]||c[k]||i;return n?r.createElement(m,l(l({ref:t},p),{},{components:n})):r.createElement(m,l({ref:t},p))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var d=2;d<i;d++)l[d]=n[d];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8279:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return u}});var r=n(2122),a=n(9756),i=(n(7294),n(3905)),l=["components"],o={},s=void 0,d={unversionedId:"tools/LISA_LPM/API/classes/fs.dir",id:"tools/LISA_LPM/API/classes/fs.dir",isDocsHomePage:!1,title:"fs.dir",description:"@listenai/lisa_core / Exports / fs / Dir",source:"@site/docs/tools/LISA_LPM/API/classes/fs.dir.md",sourceDirName:"tools/LISA_LPM/API/classes",slug:"/tools/LISA_LPM/API/classes/fs.dir",permalink:"/tools/LISA_LPM/API/classes/fs.dir",version:"current",frontMatter:{},sidebar:"toolsLISA",previous:{title:"fs.bigintstats",permalink:"/tools/LISA_LPM/API/classes/fs.bigintstats"},next:{title:"fs.dirent",permalink:"/tools/LISA_LPM/API/classes/fs.dirent"}},p=[{value:"Table of contents",id:"table-of-contents",children:[{value:"Constructors",id:"constructors",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Methods",id:"methods",children:[]}]},{value:"Constructors",id:"constructors-1",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"path",id:"path",children:[]}]},{value:"Methods",id:"methods-1",children:[{value:"Symbol.asyncIterator",id:"symbolasynciterator",children:[]},{value:"close",id:"close",children:[]},{value:"closeSync",id:"closesync",children:[]},{value:"read",id:"read",children:[]},{value:"readSync",id:"readsync",children:[]}]}],c={toc:p};function u(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/README"},"@listenai/lisa_core")," / ",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/modules"},"Exports")," / ",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/modules/fs"},"fs")," / Dir"),(0,i.kt)("h1",{id:"class-dir"},"Class: Dir"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/modules/fs"},"fs"),".Dir"),(0,i.kt)("p",null,"A class representing a directory stream."),(0,i.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,i.kt)("h3",{id:"constructors"},"Constructors"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/API/classes/fs.dir#constructor"},"constructor"))),(0,i.kt)("h3",{id:"properties"},"Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/API/classes/fs.dir#path"},"path"))),(0,i.kt)("h3",{id:"methods"},"Methods"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/API/classes/fs.dir#%5Bsymbol.asynciterator%5D"},"[Symbol.asyncIterator]")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/API/classes/fs.dir#close"},"close")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/API/classes/fs.dir#closesync"},"closeSync")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/API/classes/fs.dir#read"},"read")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/tools/LISA_LPM/API/classes/fs.dir#readsync"},"readSync"))),(0,i.kt)("h2",{id:"constructors-1"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new Dir"),"()"),(0,i.kt)("h2",{id:"properties-1"},"Properties"),(0,i.kt)("h3",{id:"path"},"path"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"path"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:79"),(0,i.kt)("h2",{id:"methods-1"},"Methods"),(0,i.kt)("h3",{id:"symbolasynciterator"},"[Symbol.asyncIterator]"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"[Symbol.asyncIterator]"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"AsyncIterableIterator"),"<",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/classes/fs.dirent"},(0,i.kt)("inlineCode",{parentName:"a"},"Dirent")),">"),(0,i.kt)("p",null,"Asynchronously iterates over the directory via ",(0,i.kt)("inlineCode",{parentName:"p"},"readdir(3)")," until all entries have been read."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"AsyncIterableIterator"),"<",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/classes/fs.dirent"},(0,i.kt)("inlineCode",{parentName:"a"},"Dirent")),">"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:84"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"close"},"close"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"close"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("p",null,"Asynchronously close the directory's underlying resource handle.\nSubsequent reads will result in errors."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:90"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"close"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"cb"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"cb")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"/tools/LISA_LPM/API/modules/fs#noparamcallback"},(0,i.kt)("inlineCode",{parentName:"a"},"NoParamCallback")))))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:91"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"closesync"},"closeSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"closeSync"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"Synchronously close the directory's underlying resource handle.\nSubsequent reads will result in errors."),(0,i.kt)("h4",{id:"returns-3"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:97"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"read"},"read"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"read"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/classes/fs.dirent"},(0,i.kt)("inlineCode",{parentName:"a"},"Dirent")),">"),(0,i.kt)("p",null,"Asynchronously read the next directory entry via ",(0,i.kt)("inlineCode",{parentName:"p"},"readdir(3)")," as an ",(0,i.kt)("inlineCode",{parentName:"p"},"Dirent"),".\nAfter the read is completed, a value is returned that will be resolved with an ",(0,i.kt)("inlineCode",{parentName:"p"},"Dirent"),", or ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," if there are no more directory entries to read.\nDirectory entries returned by this function are in no particular order as provided by the operating system's underlying directory mechanisms."),(0,i.kt)("h4",{id:"returns-4"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,i.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/classes/fs.dirent"},(0,i.kt)("inlineCode",{parentName:"a"},"Dirent")),">"),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:104"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"read"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"cb"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"cb")),(0,i.kt)("td",{parentName:"tr",align:"left"},"(",(0,i.kt)("inlineCode",{parentName:"td"},"err"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"null")," ","|"," ",(0,i.kt)("inlineCode",{parentName:"td"},"ErrnoException"),", ",(0,i.kt)("inlineCode",{parentName:"td"},"dirEnt"),": ",(0,i.kt)("inlineCode",{parentName:"td"},"null")," ","|"," ",(0,i.kt)("a",{parentName:"td",href:"/tools/LISA_LPM/API/classes/fs.dirent"},(0,i.kt)("inlineCode",{parentName:"a"},"Dirent")),") => ",(0,i.kt)("inlineCode",{parentName:"td"},"void"))))),(0,i.kt)("h4",{id:"returns-5"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:105"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"readsync"},"readSync"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"readSync"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/classes/fs.dirent"},(0,i.kt)("inlineCode",{parentName:"a"},"Dirent"))),(0,i.kt)("p",null,"Synchronously read the next directory entry via ",(0,i.kt)("inlineCode",{parentName:"p"},"readdir(3)")," as a ",(0,i.kt)("inlineCode",{parentName:"p"},"Dirent"),".\nIf there are no more directory entries to read, null will be returned.\nDirectory entries returned by this function are in no particular order as provided by the operating system's underlying directory mechanisms."),(0,i.kt)("h4",{id:"returns-6"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"null")," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"/tools/LISA_LPM/API/classes/fs.dirent"},(0,i.kt)("inlineCode",{parentName:"a"},"Dirent"))),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,"node_modules/@types/node/fs.d.ts:112"))}u.isMDXComponent=!0}}]);