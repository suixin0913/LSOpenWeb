(self.webpackChunkls_docs_web=self.webpackChunkls_docs_web||[]).push([[7116],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),u=a,f=d["".concat(s,".").concat(u)]||d[u]||m[u]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3556:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i=["components"],l={},s=void 0,c={unversionedId:"API/lisa_core/modules/fs.lchmod",id:"API/lisa_core/modules/fs.lchmod",isDocsHomePage:!1,title:"fs.lchmod",description:"@listenai/lisa_core / Exports / fs / lchmod",source:"@site/docs/API/lisa_core/modules/fs.lchmod.md",sourceDirName:"API/lisa_core/modules",slug:"/API/lisa_core/modules/fs.lchmod",permalink:"/API/lisa_core/modules/fs.lchmod",version:"current",frontMatter:{},sidebar:"autogeneratedSidebar",previous:{title:"fs.exists",permalink:"/API/lisa_core/modules/fs.exists"},next:{title:"fs.lutimes",permalink:"/API/lisa_core/modules/fs.lutimes"}},p=[{value:"Table of contents",id:"table-of-contents",children:[{value:"Functions",id:"functions",children:[]}]},{value:"Functions",id:"functions-1",children:[{value:"__promisify__",id:"__promisify__",children:[]}]}],m={toc:p};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/lisa_core/README"},"@listenai/lisa_core")," / ",(0,o.kt)("a",{parentName:"p",href:"/API/lisa_core/modules"},"Exports")," / ",(0,o.kt)("a",{parentName:"p",href:"/API/lisa_core/modules/fs"},"fs")," / lchmod"),(0,o.kt)("h1",{id:"namespace-lchmod"},"Namespace: lchmod"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/API/lisa_core/modules/fs"},"fs"),".lchmod"),(0,o.kt)("h2",{id:"table-of-contents"},"Table of contents"),(0,o.kt)("h3",{id:"functions"},"Functions"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/API/lisa_core/modules/fs.lchmod#__promisify__"},"_","_","promisify","_","_"))),(0,o.kt)("h2",{id:"functions-1"},"Functions"),(0,o.kt)("h3",{id:"__promisify__"},"_","_","promisify","_","_"),(0,o.kt)("p",null,"\u25b8 ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("strong",{parentName:"strong"},"promisify")),"(",(0,o.kt)("inlineCode",{parentName:"p"},"path"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"mode"),"): ",(0,o.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,o.kt)("p",null,"Asynchronous lchmod(2) - Change permissions of a file. Does not dereference symbolic links."),(0,o.kt)("h4",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,o.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"path")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("a",{parentName:"td",href:"/API/lisa_core/modules/fs#pathlike"},(0,o.kt)("inlineCode",{parentName:"a"},"PathLike"))),(0,o.kt)("td",{parentName:"tr",align:"left"},"A path to a file. If a URL is provided, it must use the ",(0,o.kt)("inlineCode",{parentName:"td"},"file:")," protocol.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"mode")),(0,o.kt)("td",{parentName:"tr",align:"left"},(0,o.kt)("inlineCode",{parentName:"td"},"Mode")),(0,o.kt)("td",{parentName:"tr",align:"left"},"A file mode. If a string is passed, it is parsed as an octal integer.")))),(0,o.kt)("h4",{id:"returns"},"Returns"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Promise"),"<",(0,o.kt)("inlineCode",{parentName:"p"},"void"),">"),(0,o.kt)("h4",{id:"defined-in"},"Defined in"),(0,o.kt)("p",null,"node_modules/@types/node/fs.d.ts:529"))}d.isMDXComponent=!0}}]);