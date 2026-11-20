(()=>{var Zw=Object.defineProperty;var eI=(n,e,t)=>e in n?Zw(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var V=(n,e,t)=>eI(n,typeof e!="symbol"?e+"":e,t);var Pg=()=>{};var xg=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},tI=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){let i=n[t++],o=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{let i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},ya={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,l=u?n[s+2]:0,B=i>>2,f=(i&3)<<4|c>>4,g=(c&15)<<2|l>>6,I=l&63;u||(I=64,o||(g=64)),r.push(t[B],t[f],t[g],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(xg(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):tI(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;let l=s<n.length?t[n.charAt(s)]:64;++s;let f=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||l==null||f==null)throw new Cl;let g=i<<2|c>>4;if(r.push(g),l!==64){let I=c<<4&240|l>>2;if(r.push(I),f!==64){let D=l<<6&192|f;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Cl=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},nI=function(n){let e=xg(n);return ya.encodeByteArray(e,!0)},Fi=function(n){return nI(n).replace(/\./g,"")},wa=function(n){try{return ya.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Kn(n){return Lg(void 0,n)}function Lg(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:let t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(let t in e)!e.hasOwnProperty(t)||!rI(t)||(n[t]=Lg(n[t],e[t]));return n}function rI(n){return n!=="__proto__"}function fs(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var sI=()=>fs().__FIREBASE_DEFAULTS__,iI=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},oI=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&wa(n[1]);return e&&JSON.parse(e)},Ia=()=>{try{return Pg()||sI()||iI()||oI()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},El=n=>Ia()?.emulatorHosts?.[n],kg=n=>{let e=El(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},_l=()=>Ia()?.config,yl=n=>Ia()?.[`_${n}`];var vt=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Fg(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Fi(JSON.stringify(t)),Fi(JSON.stringify(o)),""].join(".")}function We(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(We())}function aI(){let n=Ia()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Mg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gg(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ug(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Hg(){let n=We();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function qg(){return!aI()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ps(){try{return typeof indexedDB=="object"}catch{return!1}}function jg(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}var cI="FirebaseError",Ct=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=cI,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jt.prototype.create)}},jt=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?uI(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Ct(s,c,r)}};function uI(n,e){try{let t=0,r="";for(;t<n.length;){let s=n.indexOf("{$",t);if(s===-1){r+=n.substring(t);break}let i=n.indexOf("}",s+2);if(i===-1){r+=n.substring(t);break}let o=n.substring(s+2,i),c=e[o];r+=n.substring(t,s)+(c!=null?String(c):`<${o}?>`),t=i+1}return r}catch{return n}}function Kg(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Kt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let i=n[s],o=e[s];if(Ng(i)&&Ng(o)){if(!Kt(i,o))return!1}else if(i!==o)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function Ng(n){return n!==null&&typeof n=="object"}function gs(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Cs(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ms(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Jg(n,e){let t=new ml(n,e);return t.subscribe.bind(t)}var ml=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");lI(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=gl),s.error===void 0&&(s.error=gl),s.complete===void 0&&(s.complete=gl);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function lI(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function gl(){}var hI=1e3,BI=2,dI=4*60*60*1e3,fI=.5;function zg(n,e=hI,t=BI){let r=e*Math.pow(t,n),s=Math.round(fI*r*(Math.random()-.5)*2);return Math.min(dI,r+s)}function Ne(n){return n&&n._delegate?n._delegate:n}function wr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Da(n){return(await fetch(n,{credentials:"include"})).ok}var tt=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Ir="[DEFAULT]";var wl=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new vt;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(gI(e))try{this.getOrInitializeService({instanceIdentifier:Ir})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Ir){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ir){return this.instances.has(e)}getOptions(e=Ir){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[i,o]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);let i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:pI(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ir){return this.component?this.component.multipleInstances?e:Ir:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function pI(n){return n===Ir?void 0:n}function gI(n){return n.instantiationMode==="EAGER"}var Ta=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new wl(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var CI=[],ue;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ue||(ue={}));var mI={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},EI=ue.INFO,_I={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},yI=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=_I[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},kt=class{constructor(e){this.name=e,this._logLevel=EI,this._logHandler=yI,this._userLogHandler=null,CI.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?mI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}};var wI=(n,e)=>e.some(t=>n instanceof t),Wg,$g;function II(){return Wg||(Wg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function DI(){return $g||($g=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Qg=new WeakMap,Dl=new WeakMap,Yg=new WeakMap,Il=new WeakMap,Al=new WeakMap;function TI(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(nn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Qg.set(t,n)}).catch(()=>{}),Al.set(e,n),e}function AI(n){if(Dl.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Dl.set(n,e)}var Tl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Dl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Yg.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return nn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Xg(n){Tl=n(Tl)}function bI(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(Aa(this),e,...t);return Yg.set(r,e.sort?e.sort():[e]),nn(r)}:DI().includes(n)?function(...e){return n.apply(Aa(this),e),nn(Qg.get(this))}:function(...e){return nn(n.apply(Aa(this),e))}}function vI(n){return typeof n=="function"?bI(n):(n instanceof IDBTransaction&&AI(n),wI(n,II())?new Proxy(n,Tl):n)}function nn(n){if(n instanceof IDBRequest)return TI(n);if(Il.has(n))return Il.get(n);let e=vI(n);return e!==n&&(Il.set(n,e),Al.set(e,n)),e}var Aa=n=>Al.get(n);function eC(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){let o=indexedDB.open(n,e),c=nn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(nn(o.result),u.oldVersion,u.newVersion,nn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}var RI=["get","getKey","getAll","getAllKeys","count"],SI=["put","add","delete","clear"],bl=new Map;function Zg(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(bl.get(e))return bl.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=SI.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||RI.includes(t)))return;let i=async function(o,...c){let u=this.transaction(o,s?"readwrite":"readonly"),l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),s&&u.done]))[0]};return bl.set(e,i),i}Xg(n=>({...n,get:(e,t,r)=>Zg(e,t)||n.get(e,t,r),has:(e,t)=>!!Zg(e,t)||n.has(e,t)}));var Rl=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(OI(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function OI(n){return n.getComponent()?.type==="VERSION"}var Sl="@firebase/app",tC="0.16.5";var _n=new kt("@firebase/app"),PI="@firebase/app-compat",NI="@firebase/analytics-compat",xI="@firebase/analytics",LI="@firebase/app-check-compat",kI="@firebase/app-check",FI="@firebase/auth",VI="@firebase/auth-compat",MI="@firebase/crashlytics",GI="@firebase/database",UI="@firebase/data-connect",HI="@firebase/database-compat",qI="@firebase/functions",jI="@firebase/functions-compat",KI="@firebase/installations",JI="@firebase/installations-compat",zI="@firebase/messaging",WI="@firebase/messaging-compat",$I="@firebase/performance",QI="@firebase/performance-compat",YI="@firebase/remote-config",XI="@firebase/remote-config-compat",ZI="@firebase/storage",eD="@firebase/storage-compat",tD="@firebase/firestore",nD="@firebase/ai",rD="@firebase/firestore-compat",sD="firebase",iD="13.2.0";var Ol="[DEFAULT]",oD={[Sl]:"fire-core",[PI]:"fire-core-compat",[xI]:"fire-analytics",[NI]:"fire-analytics-compat",[kI]:"fire-app-check",[LI]:"fire-app-check-compat",[FI]:"fire-auth",[VI]:"fire-auth-compat",[MI]:"fire-cls",[GI]:"fire-rtdb",[UI]:"fire-data-connect",[HI]:"fire-rtdb-compat",[qI]:"fire-fn",[jI]:"fire-fn-compat",[KI]:"fire-iid",[JI]:"fire-iid-compat",[zI]:"fire-fcm",[WI]:"fire-fcm-compat",[$I]:"fire-perf",[QI]:"fire-perf-compat",[YI]:"fire-rc",[XI]:"fire-rc-compat",[ZI]:"fire-gcs",[eD]:"fire-gcs-compat",[tD]:"fire-fst",[rD]:"fire-fst-compat",[nD]:"fire-vertex","fire-js":"fire-js",[sD]:"fire-js-all"};var ba=new Map,aD=new Map,Pl=new Map;function nC(n,e){try{n.container.addComponent(e)}catch(t){_n.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Rt(n){let e=n.name;if(Pl.has(e))return _n.debug(`There were multiple attempts to register component ${e}.`),!1;Pl.set(e,n);for(let t of ba.values())nC(t,n);for(let t of aD.values())nC(t,n);return!0}function Jt(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ut(n){return n==null?!1:n.settings!==void 0}var cD={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},En=new jt("app","Firebase",cD);var Nl=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new tt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw En.create("app-deleted",{appName:this._name})}};var Jn=iD;function kl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:Ol,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw En.create("bad-app-name",{appName:String(s)});if(t||(t=_l()),!t)throw En.create("no-options");let i=ba.get(s);if(i)if(Kt(t,i.options)){if(Kt(r,i.config))return i;throw En.create("duplicate-app",{appName:s,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(r)})}else throw En.create("duplicate-app",{appName:s,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});let o=new Ta(s);for(let u of Pl.values())o.addComponent(u);let c=new Nl(t,r,o);return ba.set(s,c),c}function zn(n=Ol){let e=ba.get(n);if(!e&&n===Ol&&_l())return kl();if(!e)throw En.create("no-app",{appName:n});return e}function ct(n,e,t){let r=oD[n]??n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){let o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_n.warn(o.join(" "));return}Rt(new tt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var uD="firebase-heartbeat-database",lD=1,Vi="firebase-heartbeat-store",vl=null;function oC(){return vl||(vl=eC(uD,lD,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Vi)}catch(t){console.warn(t)}}}}).catch(n=>{throw En.create("idb-open",{originalErrorMessage:n.message})})),vl}async function hD(n){try{let t=(await oC()).transaction(Vi),r=await t.objectStore(Vi).get(aC(n));return await t.done,r}catch(e){if(e instanceof Ct)_n.warn(e.message);else{let t=En.create("idb-get",{originalErrorMessage:e?.message});_n.warn(t.message)}}}async function rC(n,e){try{let r=(await oC()).transaction(Vi,"readwrite");await r.objectStore(Vi).put(e,aC(n)),await r.done}catch(t){if(t instanceof Ct)_n.warn(t.message);else{let r=En.create("idb-set",{originalErrorMessage:t?.message});_n.warn(r.message)}}}function aC(n){return`${n.name}!${n.options.appId}`}var BD=1024,dD=30,xl=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Ll(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=sC();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>dD){let s=pD(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){_n.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=sC(),{heartbeatsToSend:t,unsentEntries:r}=fD(this._heartbeatsCache.heartbeats),s=Fi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return _n.warn(e),""}}};function sC(){return new Date().toISOString().substring(0,10)}function fD(n,e=BD){let t=[],r=n.slice();for(let s of n){let i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),iC(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),iC(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Ll=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ps()?jg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await hD(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return rC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return rC(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function iC(n){return Fi(JSON.stringify({version:2,heartbeats:n})).length}function pD(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function gD(n){Rt(new tt("platform-logger",e=>new Rl(e),"PRIVATE")),Rt(new tt("heartbeat",e=>new xl(e),"PRIVATE")),ct(Sl,tC,n),ct(Sl,tC,"esm2020"),ct("fire-js","")}gD("");var CD="firebase",mD="13.2.0";ct(CD,mD,"app");function bC(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var vC=bC,RC=new jt("auth","Firebase",bC());var La=new kt("@firebase/auth");function Ra(n,...e){La.logLevel<=ue.WARN&&La.warn(`Auth (${Jn}): ${n}`,...e)}function Sa(n,...e){La.logLevel<=ue.ERROR&&La.error(`Auth (${Jn}): ${n}`,...e)}function Ft(n,...e){throw ih(n,...e)}function zt(n,...e){return ih(n,...e)}function sc(n,e,t){let r={...vC(),[e]:t};return new jt("auth","Firebase",r).create(e,{appName:n.name})}function Qn(n){return sc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function SC(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Ft(n,"argument-error"),sc(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ih(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return RC.create(n,...e)}function Y(n,e,...t){if(!n)throw ih(e,...t)}function rn(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Sa(e),new Error(e)}function wn(n,e){n||rn(e)}function Hl(){return typeof self<"u"&&self.location?.href||""}function ED(){return cC()==="http:"||cC()==="https:"}function cC(){return typeof self<"u"&&self.location?.protocol||null}function _D(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ED()||Gg()||"connection"in navigator)?navigator.onLine:!0}function yD(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Dr=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,wn(t>e,"Short delay should be less than long delay!"),this.isMobile=Vg()||Ug()}get(){return _D()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function oh(n,e){wn(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var ka=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;rn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;rn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;rn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var wD={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var ID=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],DD=new Dr(3e4,6e4);function $e(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function lt(n,e,t,r,s={}){return OC(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});let c=gs({...o,key:n.config.apiKey}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);let l={method:e,headers:u,...i};return Mg()||(l.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&wr(n.emulatorConfig.host)&&(l.credentials="include"),ka.fetch()(await PC(n,n.config.apiHost,t,c),l)})}async function OC(n,e,t){n._canInitEmulator=!1;let r={...wD,...e};try{let s=new ql(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let o=await i.json();if("needConfirmation"in o)throw Gi(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{let c=i.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Gi(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Gi(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Gi(n,"user-disabled",o);let B=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw sc(n,B,l);Ft(n,B)}}catch(s){if(s instanceof Ct)throw s;Ft(n,"network-request-failed",{message:String(s)})}}async function Sr(n,e,t,r,s={}){let i=await lt(n,e,t,r,s);return"mfaPendingCredential"in i&&Ft(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function PC(n,e,t,r){let s=`${e}${t}?${r}`,i=n,o=i.config.emulator?oh(n.config,s):`${n.config.apiScheme}://${s}`;return ID.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function TD(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var ql=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(zt(this.auth,"network-request-failed")),DD.get())})}};function Gi(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let s=zt(n,e,r);return s.customData._tokenResponse=t,s}function uC(n){return n!==void 0&&n.enterprise!==void 0}var Fa=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return TD(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function NC(n,e){return lt(n,"GET","/v2/recaptchaConfig",$e(n,e))}async function AD(n,e){return lt(n,"POST","/v1/accounts:delete",e)}async function Va(n,e){return lt(n,"POST","/v1/accounts:lookup",e)}function Ui(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function xC(n,e=!1){let t=Ne(n),r=await t.getIdToken(e),s=ah(r);Y(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Ui(Fl(s.auth_time)),issuedAtTime:Ui(Fl(s.iat)),expirationTime:Ui(Fl(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Fl(n){return Number(n)*1e3}function ah(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Sa("JWT malformed, contained fewer than 3 sections"),null;try{let s=wa(t);return s?JSON.parse(s):(Sa("Failed to decode base64 JWT payload"),null)}catch(s){return Sa("Caught error parsing JWT payload as JSON",s?.toString()),null}}function lC(n){let e=ah(n);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Ji(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw LC(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function LC(n){return n instanceof Ct?n.code==="auth/user-disabled"||n.code==="auth/user-token-expired":!1}var jl=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var zi=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ui(this.lastLoginAt),this.creationTime=Ui(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Ma(n){let e=n.auth,t=await n.getIdToken(),r=await Ji(n,Va(e,{idToken:t}));Y(r?.users.length,e,"internal-error");let s=r.users[0];n._notifyReloadListener(s);let i=s.providerUserInfo?.length?FC(s.providerUserInfo):[],o=bD(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!o?.length,l=c?u:!1,B={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new zi(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,B)}async function kC(n){let e=Ne(n);await Ma(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bD(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function FC(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function vD(n,e){let t=await OC(n,{},async()=>{let r=gs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await PC(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";let u={method:"POST",headers:c,body:r};return n.emulatorConfig&&wr(n.emulatorConfig.host)&&(u.credentials="include"),ka.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function RD(n,e){return lt(n,"POST","/v2/accounts:revokeToken",$e(n,e))}var Hi=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e5}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):lC(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");let t=lC(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:s,expiresIn:i}=await vD(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new n;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return rn("not implemented")}};function Wn(n,e){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var $n=class n{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new jl(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new zi(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Ji(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return xC(this,e)}reload(){return kC(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ma(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ut(this.auth.app))return Promise.reject(Qn(this.auth));let e=await this.getIdToken();return await Ji(this,AD(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,B=t.lastLoginAt??void 0,{uid:f,emailVerified:g,isAnonymous:I,providerData:D,stsTokenManager:O}=t;Y(f&&O,e,"internal-error");let M=Hi.fromJSON(this.name,O);Y(typeof f=="string",e,"internal-error"),Wn(r,e.name),Wn(s,e.name),Y(typeof g=="boolean",e,"internal-error"),Y(typeof I=="boolean",e,"internal-error"),Wn(i,e.name),Wn(o,e.name),Wn(c,e.name),Wn(u,e.name),Wn(l,e.name),Wn(B,e.name);let K=new n({uid:f,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:I,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:M,createdAt:l,lastLoginAt:B});return D&&Array.isArray(D)&&(K.providerData=D.map($=>({...$}))),u&&(K._redirectEventId=u),K}static async _fromIdTokenResponse(e,t,r=!1){let s=new Hi;s.updateFromServerResponse(t);let i=new n({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ma(i),i}static async _fromGetAccountInfoResponse(e,t,r){let s=t.users[0];Y(s.localId!==void 0,"internal-error");let i=s.providerUserInfo!==void 0?FC(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new Hi;c.updateFromIdToken(r);let u=new n({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new zi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,l),u}};var hC=new Map;function yn(n){wn(n instanceof Function,"Expected a class definition");let e=hC.get(n);return e?(wn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,hC.set(n,e),e)}var Ga=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Ga.type="NONE";var Kl=Ga;function Oa(n,e,t){return`firebase:${n}:${e}:${t}`}var qi=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:s,name:i}=this.auth;this.fullUserKey=Oa(this.userKey,s.apiKey,i),this.fullPersistenceKey=Oa("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await Va(this.auth,{idToken:e}).catch(()=>{});return t?$n._fromGetAccountInfoResponse(this.auth,t,e):null}return $n._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new n(yn(Kl),e,r);let s=(await Promise.all(t.map(async l=>{try{if(await l._isAvailable())return l}catch{return}}))).filter(l=>l),i=s[0]||yn(Kl),o=Oa(r,e.config.apiKey,e.name),c=null;for(let l of t)try{let B=await l._get(o);if(B){let f;if(typeof B=="string"){let g=await Va(e,{idToken:B}).catch(()=>{});if(!g)break;f=await $n._fromGetAccountInfoResponse(e,g,B)}else f=$n._fromJSON(e,B);l!==i&&(c=f),i=l;break}}catch{}let u=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new n(i,e,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new n(i,e,r))}};function BC(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(UC(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(VC(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(qC(e))return"Blackberry";if(jC(e))return"Webos";if(MC(e))return"Safari";if((e.includes("chrome/")||GC(e))&&!e.includes("edge/"))return"Chrome";if(HC(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function VC(n=We()){return/firefox\//i.test(n)}function MC(n=We()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function GC(n=We()){return/crios\//i.test(n)}function UC(n=We()){return/iemobile/i.test(n)}function HC(n=We()){return/android/i.test(n)}function qC(n=We()){return/blackberry/i.test(n)}function jC(n=We()){return/webos/i.test(n)}function ch(n=We()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function SD(n=We()){return ch(n)&&!!window.navigator?.standalone}function OD(){return Hg()&&document.documentMode===10}function KC(n=We()){return ch(n)||HC(n)||jC(n)||qC(n)||/windows phone/i.test(n)||UC(n)}function JC(n,e=[]){let t;switch(n){case"Browser":t=BC(We());break;case"Worker":t=`${BC(We())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Jn}/${r}`}var Jl=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=i=>new Promise((o,c)=>{try{let u=e(i);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function PD(n,e={}){return lt(n,"GET","/v2/passwordPolicy",$e(n,e))}var ND=6,zl=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ND,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}};var Wl=class{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ua(this),this.idTokenSubscription=new Ua(this),this.beforeStateQueue=new Jl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=RC,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=yn(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await qi.create(this,e)}catch(r){Ra(`Failed to initialize persistence: ${r}`),this.persistenceManager=await qi.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(r){Ra(`Failed to initialize current user: ${r}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Va(this,{idToken:e}),r=await $n._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ut(this.app)){let i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ma(e)}catch(t){if(LC(t))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=yD()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ut(this.app))return Promise.reject(Qn(this));let t=e?Ne(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ut(this.app)?Promise.reject(Qn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ut(this.app)?Promise.reject(Qn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(yn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await PD(this),t=new zl(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new jt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await RD(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&yn(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await qi.create(this,[yn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};let i=typeof t=="function"?t:t.next.bind(t),o=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}).catch(u=>{if(!o)if(typeof t!="function"&&t.error)t.error(u);else if(r)r(u);else throw u}),typeof t=="function"){let u=e.addObserver(t,r,s);return()=>{o=!0,u()}}else{let u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){let r=t?.message||String(t),s=sc(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw s.customData={originalError:t},s}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=JC(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(ut(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Ra(`Error while retrieving App Check token: ${e.error}`),e?.token}};function In(n){return Ne(n)}var Ua=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Jg(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var ic={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function xD(n){ic=n}function zC(n){return ic.loadJS(n)}function LD(){return ic.recaptchaEnterpriseScript}function kD(){return ic.gapiScript}function WC(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var $l=class{constructor(){this.enterprise=new Ql}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Ql=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var FD="recaptcha-enterprise",ji="NO_RECAPTCHA",dC="onFirebaseAuthREInstanceReady",Wi=class n{constructor(e){this.type=FD,this.auth=In(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{NC(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let l=new Fa(u);return i.tenantId==null?i._agentRecaptchaConfig=l:i._tenantRecaptchaConfigs[i.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){let u=window.grecaptcha;uC(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(l=>{o(l)}).catch(()=>{o(ji)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new $l().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(async c=>{if(!t&&uC(window.grecaptcha)&&n.scriptInjectionDeferred)await n.scriptInjectionDeferred.promise,s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=LD();u.length!==0&&(u+=c+`&onload=${dC}`),n.scriptInjectionDeferred=new vt,window[dC]=()=>{n.scriptInjectionDeferred?.resolve()},zC(u).then(()=>n.scriptInjectionDeferred?.promise).then(()=>{s(c,i,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}};Wi.scriptInjectionDeferred=null;async function Mi(n,e,t,r=!1,s=!1){let i=new Wi(n),o;if(s)o=ji;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}let c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){let u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){let u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Ki(n,e,t,r,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let i=await Mi(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await Mi(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(i)});else if(s==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let i=await Mi(n,e,t);return r(n,i).catch(async o=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(o.code==="auth/missing-recaptcha-token"||o.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let c=await Mi(n,e,t,!1,!0);return r(n,c)}return Promise.reject(o)})}else{let i=await Mi(n,e,t,!1,!0);return r(n,i)}else return Promise.reject(s+" provider is not supported.")}async function VD(n){let e=In(n),t=await NC(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Fa(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Wi(e).verify().catch(()=>{})}function $C(n,e){let t=Jt(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),i=t.getOptions();if(Kt(i,e??{}))return s;Ft(s,"already-initialized")}return t.initialize({options:e})}function MD(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(yn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function QC(n,e,t){let r=In(n);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let s=!!t?.disableWarnings,i=YC(e),{host:o,port:c}=GD(e),u=c===null?"":`:${c}`,l={url:`${i}//${o}${u}/`},B=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(Kt(l,r.config.emulator)&&Kt(B,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=B,r.settings.appVerificationDisabledForTesting=!0,wr(o)?Da(`${i}//${o}${u}`):s||UD()}function YC(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function GD(n){let e=YC(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){let i=s[1];return{host:i,port:fC(r.substr(i.length+1))}}else{let[i,o]=r.split(":");return{host:i,port:fC(o)}}}function fC(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function UD(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Tr=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return rn("not implemented")}_getIdTokenResponse(e){return rn("not implemented")}_linkToIdToken(e,t){return rn("not implemented")}_getReauthenticationResolver(e){return rn("not implemented")}};async function HD(n,e){return lt(n,"POST","/v1/accounts:signUp",e)}async function qD(n,e){return Sr(n,"POST","/v1/accounts:signInWithPassword",$e(n,e))}async function jD(n,e){return Sr(n,"POST","/v1/accounts:signInWithEmailLink",$e(n,e))}async function KD(n,e){return Sr(n,"POST","/v1/accounts:signInWithEmailLink",$e(n,e))}var $i=class n extends Tr{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ki(e,t,"signInWithPassword",qD,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return jD(e,{email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ki(e,r,"signUpPassword",HD,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return KD(e,{idToken:t,email:this._email,oobCode:this._password});default:Ft(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Es(n,e){return Sr(n,"POST","/v1/accounts:signInWithIdp",$e(n,e))}var JD="http://localhost",Ar=class n extends Tr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ft("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;let o=new n(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return Es(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Es(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Es(e,t)}buildRequest(){let e={requestUri:JD,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=gs(t)}return e}};async function pC(n,e){return lt(n,"POST","/v1/accounts:sendVerificationCode",$e(n,e))}async function zD(n,e){return Sr(n,"POST","/v1/accounts:signInWithPhoneNumber",$e(n,e))}async function WD(n,e){let t=await Sr(n,"POST","/v1/accounts:signInWithPhoneNumber",$e(n,e));if(t.temporaryProof)throw Gi(n,"account-exists-with-different-credential",t);return t}var $D={USER_NOT_FOUND:"user-not-found"};async function QD(n,e){let t={...e,operation:"REAUTH"};return Sr(n,"POST","/v1/accounts:signInWithPhoneNumber",$e(n,t),$D)}var Qi=class n extends Tr{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return zD(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return WD(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return QD(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new n({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}};function YD(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function XD(n){let e=Cs(ms(n)).link,t=e?Cs(ms(e)).deep_link_id:null,r=Cs(ms(n)).deep_link_id;return(r?Cs(ms(r)).link:null)||r||t||e||n}var Ha=class n{constructor(e){let t=Cs(ms(e)),r=t.apiKey??null,s=t.oobCode??null,i=YD(t.mode??null);Y(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=XD(e);try{return new n(t)}catch{return null}}};var _s=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return $i._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Ha.parseLink(t);return Y(r,"argument-error"),$i._fromEmailAndCode(e,r.code,r.tenantId)}};_s.PROVIDER_ID="password";_s.EMAIL_PASSWORD_SIGN_IN_METHOD="password";_s.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var ys=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var br=class extends ys{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Yi=class n extends br{constructor(){super("facebook.com")}static credential(e){return Ar._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Yi.FACEBOOK_SIGN_IN_METHOD="facebook.com";Yi.PROVIDER_ID="facebook.com";var vr=class n extends br{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ar._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};vr.GOOGLE_SIGN_IN_METHOD="google.com";vr.PROVIDER_ID="google.com";var Xi=class n extends br{constructor(){super("github.com")}static credential(e){return Ar._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Xi.GITHUB_SIGN_IN_METHOD="github.com";Xi.PROVIDER_ID="github.com";var Zi=class n extends br{constructor(){super("twitter.com")}static credential(e,t){return Ar._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Zi.TWITTER_SIGN_IN_METHOD="twitter.com";Zi.PROVIDER_ID="twitter.com";var eo=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){let i=await $n._fromIdTokenResponse(e,r,s),o=gC(r);return new n({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let s=gC(r);return new n({user:e,providerId:s,_tokenResponse:r,operationType:t})}};function gC(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Yl=class n extends Ct{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new n(e,t,r,s)}};function XC(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Yl._fromErrorAndOperation(n,i,e,r):i})}async function ZD(n,e,t=!1){let r=await Ji(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return eo._forOperation(n,"link",r)}async function eT(n,e,t=!1){let{auth:r}=n;if(ut(r.app))return Promise.reject(Qn(r));let s="reauthenticate";try{let i=await Ji(n,XC(r,s,e,n),t);Y(i.idToken,r,"internal-error");let o=ah(i.idToken);Y(o,r,"internal-error");let{sub:c}=o;return Y(n.uid===c,r,"user-mismatch"),eo._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&Ft(r,"user-mismatch"),i}}async function tT(n,e,t=!1){if(ut(n.app))return Promise.reject(Qn(n));let r="signIn",s=await XC(n,r,e),i=await eo._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}function uh(n,e){return Ne(n).setPersistence(e)}function ZC(n,e,t,r){return Ne(n).onIdTokenChanged(e,t,r)}function em(n,e,t){return Ne(n).beforeAuthStateChanged(e,t)}function lh(n,e,t,r){return Ne(n).onAuthStateChanged(e,t,r)}function hh(n){return Ne(n).signOut()}function CC(n,e){return lt(n,"POST","/v2/accounts/mfaEnrollment:start",$e(n,e))}function nT(n,e){return lt(n,"POST","/v2/accounts/mfaEnrollment:finalize",$e(n,e))}function rT(n,e){return lt(n,"POST","/v2/accounts/mfaEnrollment:start",$e(n,e))}function sT(n,e){return lt(n,"POST","/v2/accounts/mfaEnrollment:finalize",$e(n,e))}var qa="__sak";var ja=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(qa,"1"),this.storage.removeItem(qa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var iT=1e3,oT=10,Ka=class extends ja{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=KC(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}let r=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);OD()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,oT):s()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},iT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Ka.type="LOCAL";var oc=Ka;var aT=1e3;function Vl(n){let e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function Ml(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var Xl=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=Ml(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:Vl(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=Ml(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=Ml(e);if(window.cookieStore){let c=l=>{let B=l.changed.find(g=>g.name===r);B&&t(B.value),l.deleted.find(g=>g.name===r)&&t(null)},u=()=>window.cookieStore.removeEventListener("change",c);return this.listenerUnsubscribes.set(t,u),window.cookieStore.addEventListener("change",c)}let s=Vl(r),i=setInterval(()=>{let c=Vl(r);c!==s&&(t(c),s=c)},aT),o=()=>clearInterval(i);this.listenerUnsubscribes.set(t,o)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};Xl.type="COOKIE";var Ja=class extends ja{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Ja.type="SESSION";var Bh=Ja;function cT(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var za=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});let c=Array.from(o).map(async l=>l(t.origin,i)),u=await cT(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};za.receivers=[];function dh(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Zl=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{let l=dh("",20);s.port1.start();let B=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(f){let g=f;if(g.data.eventId===l)switch(g.data.status){case"ack":clearTimeout(B),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(B),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function sn(){return window}function uT(n){sn().location.href=n}function tm(){return typeof sn().WorkerGlobalScope<"u"&&typeof sn().importScripts=="function"}async function lT(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function hT(){return navigator?.serviceWorker?.controller||null}function BT(){return tm()?self:null}var nm="firebaseLocalStorageDb",dT=1,Wa="firebaseLocalStorage",rm="fbase_key",Rr=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function ac(n,e){return n.transaction([Wa],e?"readwrite":"readonly").objectStore(Wa)}function fT(){let n=indexedDB.deleteDatabase(nm);return new Rr(n).toPromise()}function sm(){let n=indexedDB.open(nm,dT);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Wa,{keyPath:rm})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Wa)?e(r):(r.close(),await fT(),e(await sm()))})})}async function mC(n,e,t){let r=ac(n,!0).put({[rm]:e,value:t});return new Rr(r).toPromise()}async function pT(n,e){let t=ac(n,!1).get(e),r=await new Rr(t).toPromise();return r===void 0?null:r.value}function EC(n,e){let t=ac(n,!0).delete(e);return new Rr(t).toPromise()}var gT=800,CT=3,$a=class{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=sm(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>CT)throw r;if(this.dbPromise){let s=this.dbPromise;this.dbPromise=null;try{(await s).close()}catch{}}}}async initializeServiceWorkerMessaging(){return tm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=za._getInstance(BT()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await lT(),!this.activeServiceWorker)return;this.sender=new Zl(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||hT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await mC(e,qa,"1"),await EC(e,qa)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>mC(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>pT(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>EC(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(s=>{let i=ac(s,!1).getAll();return new Rr(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}catch(e){return this.isClosing||Ra(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),gT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e).catch(()=>{})),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};$a.type="LOCAL";var im=$a;function _C(n,e){return lt(n,"POST","/v2/accounts/mfaSignIn:start",$e(n,e))}function mT(n,e){return lt(n,"POST","/v2/accounts/mfaSignIn:finalize",$e(n,e))}function ET(n,e){return lt(n,"POST","/v2/accounts/mfaSignIn:finalize",$e(n,e))}var gS=WC("rcb"),CS=new Dr(3e4,6e4);var Pa="recaptcha";async function _T(n,e,t){if(!n._getRecaptchaConfig())try{await VD(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){let s=r.session;if("phoneNumber"in r){Y(s.type==="enroll",n,"internal-error");let i={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Ki(n,i,"mfaSmsEnrollment",async(l,B)=>{if(B.phoneEnrollmentInfo.captchaResponse===ji){Y(t?.type===Pa,l,"argument-error");let f=await Gl(l,B,t);return CC(l,f)}return CC(l,B)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).phoneSessionInfo.sessionInfo}else{Y(s.type==="signin",n,"internal-error");let i=r.multiFactorHint?.uid||r.multiFactorUid;Y(i,n,"missing-multi-factor-info");let o={mfaPendingCredential:s.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Ki(n,o,"mfaSmsSignIn",async(B,f)=>{if(f.phoneSignInInfo.captchaResponse===ji){Y(t?.type===Pa,B,"argument-error");let g=await Gl(B,f,t);return _C(B,g)}return _C(B,f)},"PHONE_PROVIDER").catch(B=>Promise.reject(B))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Ki(n,s,"sendVerificationCode",async(u,l)=>{if(l.captchaResponse===ji){Y(t?.type===Pa,u,"argument-error");let B=await Gl(u,l,t);return pC(u,B)}return pC(u,l)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).sessionInfo}}finally{t?._reset()}}async function Gl(n,e,t){Y(t.type===Pa,n,"argument-error");let r=await t.verify();Y(typeof r=="string",n,"argument-error");let s={...e};if("phoneEnrollmentInfo"in s){let i=s.phoneEnrollmentInfo.phoneNumber,o=s.phoneEnrollmentInfo.captchaResponse,c=s.phoneEnrollmentInfo.clientType,u=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:o,clientType:c,recaptchaVersion:u}}),s}else if("phoneSignInInfo"in s){let i=s.phoneSignInInfo.captchaResponse,o=s.phoneSignInInfo.clientType,c=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:o,recaptchaVersion:c}}),s}else return Object.assign(s,{recaptchaToken:r}),s}var to=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=In(e)}verifyPhoneNumber(e,t){return _T(this.auth,e,Ne(t))}static credential(e,t){return Qi._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Qi._fromTokenResponse(t,r):null}};to.PROVIDER_ID="phone";to.PHONE_SIGN_IN_METHOD="phone";function fh(n,e){return e?yn(e):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var no=class extends Tr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Es(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Es(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Es(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function yT(n){return tT(n.auth,new no(n),n.bypassAuthState)}function wT(n){let{auth:e,user:t}=n;return Y(t,e,"internal-error"),eT(t,new no(n),n.bypassAuthState)}async function IT(n){let{auth:e,user:t}=n;return Y(t,e,"internal-error"),ZD(t,new no(n),n.bypassAuthState)}var Qa=class{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{if(this.eventManager=await this.resolver._initialize(this.auth),!this.pendingPromise||(await this.onExecution(),!this.pendingPromise))return;this.eventManager.registerConsumer(this)}catch(r){this.pendingPromise&&this.reject(r)}})}async onAuthEvent(e){if(!this.pendingPromise)return;let{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}let u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return yT;case"linkViaPopup":case"linkViaRedirect":return IT;case"reauthViaPopup":case"reauthViaRedirect":return wT;default:Ft(this.auth,"internal-error")}}resolve(e){wn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){wn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var DT=new Dr(2e3,1e4);async function ph(n,e,t){if(ut(n.app))return Promise.reject(zt(n,"operation-not-supported-in-this-environment"));let r=In(n);SC(n,e,ys);let s=fh(r,t);return new Ya(r,"signInViaPopup",e,s).executeNotNull()}var Ya=class n extends Qa{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){wn(this.filter.length===1,"Popup operations only handle one event");let e=dh();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,DT.get())};e()}};Ya.currentPopupAction=null;var TT="pendingRedirect",Na=new Map,eh=class extends Qa{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Na.get(this.auth._key());if(!e){try{let r=await AT(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Na.set(this.auth._key(),e)}return this.bypassAuthState||Na.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function AT(n,e){let t=am(e),r=om(n);if(!await r._isAvailable())return!1;let s=await r._get(t)==="true";return await r._remove(t),s}async function bT(n,e){return om(n)._set(am(e),"true")}function vT(n,e){Na.set(n._key(),e)}function om(n){return yn(n._redirectPersistence)}function am(n){return Oa(TT,n.config.apiKey,n.name)}function gh(n,e,t){return RT(n,e,t)}async function RT(n,e,t){if(ut(n.app))return Promise.reject(Qn(n));let r=In(n);SC(n,e,ys),await r._initializationPromise;let s=fh(r,t);return await bT(s,r),s._openRedirect(r,e,"signInViaRedirect")}async function Ch(n,e){return await In(n)._initializationPromise,cm(n,e,!1)}async function cm(n,e,t=!1){if(ut(n.app))return Promise.reject(Qn(n));let r=In(n),s=fh(r,e),o=await new eh(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var ST=10*60*1e3,th=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!OT(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!um(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(zt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ST&&this.cachedEventUids.clear(),this.cachedEventUids.has(yC(e))}saveEventToCache(e){this.cachedEventUids.add(yC(e)),this.lastProcessedEventTime=Date.now()}};function yC(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function um({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function OT(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return um(n);default:return!1}}async function PT(n,e={}){return lt(n,"GET","/v1/projects",e)}var NT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xT=/^https?/;async function LT(n){if(n.config.emulator)return;let{authorizedDomains:e}=await PT(n);for(let t of e)try{if(kT(t))return}catch{}Ft(n,"unauthorized-domain")}function kT(n){let e=Hl(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!xT.test(t))return!1;if(NT.test(n))return r===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}var FT=new Dr(3e4,6e4);function wC(){let n=sn().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function VT(n){return new Promise((e,t)=>{function r(){wC(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wC(),t(zt(n,"network-request-failed"))},timeout:FT.get()})}if(sn().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(sn().gapi?.load)r();else{let s=WC("iframefcb");return sn()[s]=()=>{gapi.load?r():t(zt(n,"network-request-failed"))},zC(`${kD()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw xa=null,e})}var xa=null;function MT(n){return xa=xa||VT(n),xa}var GT=new Dr(5e3,15e3),UT="__/auth/iframe",HT="emulator/auth/iframe",qT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},jT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function KT(n){let e=n.config;Y(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?oh(e,HT):`https://${n.config.authDomain}/${UT}`,r={apiKey:e.apiKey,appName:n.name,v:Jn},s=jT.get(n.config.apiHost);s&&(r.eid=s);let i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${gs(r).slice(1)}`}async function JT(n){let e=await MT(n),t=sn().gapi;return Y(t,n,"internal-error"),e.open({where:document.body,url:KT(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:qT,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});let o=zt(n,"network-request-failed"),c=sn().setTimeout(()=>{i(o)},GT.get());function u(){sn().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}var zT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},WT=500,$T=600,QT="_blank",YT="http://localhost",Xa=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function XT(n,e,t,r=WT,s=$T){let i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",u={...zT,width:r.toString(),height:s.toString(),top:i,left:o},l=We().toLowerCase();t&&(c=GC(l)?QT:t),VC(l)&&(e=e||YT,u.scrollbars="yes");let B=Object.entries(u).reduce((g,[I,D])=>`${g}${I}=${D},`,"");if(SD(l)&&c!=="_self")return ZT(e||"",c),new Xa(null);let f=window.open(e||"",c,B);Y(f,n,"popup-blocked");try{f.focus()}catch{}return new Xa(f)}function ZT(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var eA="__/auth/handler",tA="emulator/auth/handler",nA=encodeURIComponent("fac");async function IC(n,e,t,r,s,i){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Jn,eventId:s};if(e instanceof ys){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Kg(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[B,f]of Object.entries(i||{}))o[B]=f}if(e instanceof br){let B=e.getScopes().filter(f=>f!=="");B.length>0&&(o.scopes=B.join(","))}n.tenantId&&(o.tid=n.tenantId);let c=o;for(let B of Object.keys(c))c[B]===void 0&&delete c[B];let u=await n._getAppCheckToken(),l=u?`#${nA}=${encodeURIComponent(u)}`:"";return`${rA(n)}?${gs(c).slice(1)}${l}`}function rA({config:n}){return n.emulator?oh(n,tA):`https://${n.authDomain}/${eA}`}var Ul="webStorageSupport",nh=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Bh,this._completeRedirectFn=cm,this._overrideRedirectResult=vT}async _openPopup(e,t,r,s){wn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let i=await IC(e,t,r,Hl(),s);return XT(e,i,dh())}async _openRedirect(e,t,r,s){await this._originValidation(e);let i=await IC(e,t,r,Hl(),s);return uT(i),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(wn(i,"If manager is not set, promise should be"),i)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await JT(e),r=new th(e);return t.register("authEvent",s=>(Y(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ul,{type:Ul},s=>{let i=s?.[0]?.[Ul];i!==void 0&&t(!!i),Ft(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=LT(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return KC()||MC()||ch()}},lm=nh,Za=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return rn("unexpected MultiFactorSessionType")}}},rh=class n extends Za{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return nT(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return mT(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},ec=class{constructor(){}static assertion(e){return rh._fromCredential(e)}};ec.FACTOR_ID="phone";var tc=class{static assertionForEnrollment(e,t){return nc._fromSecret(e,t)}static assertionForSignIn(e,t){return nc._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;Y(typeof t.user?.auth<"u","internal-error");let r=await rT(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return rc._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}};tc.FACTOR_ID="totp";var nc=class n extends Za{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return Y(typeof this.secret<"u",e,"argument-error"),sT(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){Y(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return ET(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},rc=class n{constructor(e,t,r,s,i,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(va(e)||va(t))&&(r=!0),r&&(va(e)&&(e=this.auth.currentUser?.email||"unknownuser"),va(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function va(n){return typeof n>"u"||n?.length===0}var DC="@firebase/auth",TC="1.13.9";var sh=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function sA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function iA(n){Rt(new tt("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:JC(n)},l=new Wl(r,s,i,u);return MD(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Rt(new tt("auth-internal",e=>{let t=In(e.getProvider("auth").getImmediate());return(r=>new sh(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ct(DC,TC,sA(n)),ct(DC,TC,"esm2020")}var oA=5*60,aA=yl("authIdTokenMaxAge")||oA,AC=null,cA=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>aA)return;let s=t?.token;AC!==s&&(AC=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function mh(n=zn()){let e=Jt(n,"auth");if(e.isInitialized())return e.getImmediate();let t=$C(n,{popupRedirectResolver:lm,persistence:[im,oc,Bh]}),r=yl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let i=new URL(r,location.origin);if(location.origin===i.origin){let o=cA(i.toString());em(t,o,()=>o(t.currentUser)),ZC(t,c=>o(c))}}let s=El("auth");return s&&QC(t,`http://${s}`),t}function uA(){return document.getElementsByTagName("head")?.[0]??document}xD({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{let i=zt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",uA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});iA("Browser");var hm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Bm={};var Dn,Eh;(function(){var n;function e(A,E){function y(){}y.prototype=E.prototype,A.F=E.prototype,A.prototype=new y,A.prototype.constructor=A,A.D=function(v,T,S){for(var _=Array(arguments.length-2),_t=2;_t<arguments.length;_t++)_[_t-2]=arguments[_t];return E.prototype[T].apply(v,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,E,y){y||(y=0);let v=Array(16);if(typeof E=="string")for(var T=0;T<16;++T)v[T]=E.charCodeAt(y++)|E.charCodeAt(y++)<<8|E.charCodeAt(y++)<<16|E.charCodeAt(y++)<<24;else for(T=0;T<16;++T)v[T]=E[y++]|E[y++]<<8|E[y++]<<16|E[y++]<<24;E=A.g[0],y=A.g[1],T=A.g[2];let S=A.g[3],_;_=E+(S^y&(T^S))+v[0]+3614090360&4294967295,E=y+(_<<7&4294967295|_>>>25),_=S+(T^E&(y^T))+v[1]+3905402710&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(y^S&(E^y))+v[2]+606105819&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(E^T&(S^E))+v[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=E+(S^y&(T^S))+v[4]+4118548399&4294967295,E=y+(_<<7&4294967295|_>>>25),_=S+(T^E&(y^T))+v[5]+1200080426&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(y^S&(E^y))+v[6]+2821735955&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(E^T&(S^E))+v[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=E+(S^y&(T^S))+v[8]+1770035416&4294967295,E=y+(_<<7&4294967295|_>>>25),_=S+(T^E&(y^T))+v[9]+2336552879&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(y^S&(E^y))+v[10]+4294925233&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(E^T&(S^E))+v[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=E+(S^y&(T^S))+v[12]+1804603682&4294967295,E=y+(_<<7&4294967295|_>>>25),_=S+(T^E&(y^T))+v[13]+4254626195&4294967295,S=E+(_<<12&4294967295|_>>>20),_=T+(y^S&(E^y))+v[14]+2792965006&4294967295,T=S+(_<<17&4294967295|_>>>15),_=y+(E^T&(S^E))+v[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=E+(T^S&(y^T))+v[1]+4129170786&4294967295,E=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(E^y))+v[6]+3225465664&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^y&(S^E))+v[11]+643717713&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^E&(T^S))+v[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=E+(T^S&(y^T))+v[5]+3593408605&4294967295,E=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(E^y))+v[10]+38016083&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^y&(S^E))+v[15]+3634488961&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^E&(T^S))+v[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=E+(T^S&(y^T))+v[9]+568446438&4294967295,E=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(E^y))+v[14]+3275163606&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^y&(S^E))+v[3]+4107603335&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^E&(T^S))+v[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=E+(T^S&(y^T))+v[13]+2850285829&4294967295,E=y+(_<<5&4294967295|_>>>27),_=S+(y^T&(E^y))+v[2]+4243563512&4294967295,S=E+(_<<9&4294967295|_>>>23),_=T+(E^y&(S^E))+v[7]+1735328473&4294967295,T=S+(_<<14&4294967295|_>>>18),_=y+(S^E&(T^S))+v[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=E+(y^T^S)+v[5]+4294588738&4294967295,E=y+(_<<4&4294967295|_>>>28),_=S+(E^y^T)+v[8]+2272392833&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^y)+v[11]+1839030562&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^E)+v[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=E+(y^T^S)+v[1]+2763975236&4294967295,E=y+(_<<4&4294967295|_>>>28),_=S+(E^y^T)+v[4]+1272893353&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^y)+v[7]+4139469664&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^E)+v[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=E+(y^T^S)+v[13]+681279174&4294967295,E=y+(_<<4&4294967295|_>>>28),_=S+(E^y^T)+v[0]+3936430074&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^y)+v[3]+3572445317&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^E)+v[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=E+(y^T^S)+v[9]+3654602809&4294967295,E=y+(_<<4&4294967295|_>>>28),_=S+(E^y^T)+v[12]+3873151461&4294967295,S=E+(_<<11&4294967295|_>>>21),_=T+(S^E^y)+v[15]+530742520&4294967295,T=S+(_<<16&4294967295|_>>>16),_=y+(T^S^E)+v[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=E+(T^(y|~S))+v[0]+4096336452&4294967295,E=y+(_<<6&4294967295|_>>>26),_=S+(y^(E|~T))+v[7]+1126891415&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~y))+v[14]+2878612391&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~E))+v[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=E+(T^(y|~S))+v[12]+1700485571&4294967295,E=y+(_<<6&4294967295|_>>>26),_=S+(y^(E|~T))+v[3]+2399980690&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~y))+v[10]+4293915773&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~E))+v[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=E+(T^(y|~S))+v[8]+1873313359&4294967295,E=y+(_<<6&4294967295|_>>>26),_=S+(y^(E|~T))+v[15]+4264355552&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~y))+v[6]+2734768916&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~E))+v[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=E+(T^(y|~S))+v[4]+4149444226&4294967295,E=y+(_<<6&4294967295|_>>>26),_=S+(y^(E|~T))+v[11]+3174756917&4294967295,S=E+(_<<10&4294967295|_>>>22),_=T+(E^(S|~y))+v[2]+718787259&4294967295,T=S+(_<<15&4294967295|_>>>17),_=y+(S^(T|~E))+v[9]+3951481745&4294967295,A.g[0]=A.g[0]+E&4294967295,A.g[1]=A.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,A.g[2]=A.g[2]+T&4294967295,A.g[3]=A.g[3]+S&4294967295}r.prototype.v=function(A,E){E===void 0&&(E=A.length);let y=E-this.blockSize,v=this.C,T=this.h,S=0;for(;S<E;){if(T==0)for(;S<=y;)s(this,A,S),S+=this.blockSize;if(typeof A=="string"){for(;S<E;)if(v[T++]=A.charCodeAt(S++),T==this.blockSize){s(this,v),T=0;break}}else for(;S<E;)if(v[T++]=A[S++],T==this.blockSize){s(this,v),T=0;break}}this.h=T,this.o+=E},r.prototype.A=function(){var A=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);A[0]=128;for(var E=1;E<A.length-8;++E)A[E]=0;E=this.o*8;for(var y=A.length-8;y<A.length;++y)A[y]=E&255,E/=256;for(this.v(A),A=Array(16),E=0,y=0;y<4;++y)for(let v=0;v<32;v+=8)A[E++]=this.g[y]>>>v&255;return A};function i(A,E){var y=c;return Object.prototype.hasOwnProperty.call(y,A)?y[A]:y[A]=E(A)}function o(A,E){this.h=E;let y=[],v=!0;for(let T=A.length-1;T>=0;T--){let S=A[T]|0;v&&S==E||(y[T]=S,v=!1)}this.g=y}var c={};function u(A){return-128<=A&&A<128?i(A,function(E){return new o([E|0],E<0?-1:0)}):new o([A|0],A<0?-1:0)}function l(A){if(isNaN(A)||!isFinite(A))return f;if(A<0)return M(l(-A));let E=[],y=1;for(let v=0;A>=y;v++)E[v]=A/y|0,y*=4294967296;return new o(E,0)}function B(A,E){if(A.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(A.charAt(0)=="-")return M(B(A.substring(1),E));if(A.indexOf("-")>=0)throw Error('number format error: interior "-" character');let y=l(Math.pow(E,8)),v=f;for(let S=0;S<A.length;S+=8){var T=Math.min(8,A.length-S);let _=parseInt(A.substring(S,S+T),E);T<8?(T=l(Math.pow(E,T)),v=v.j(T).add(l(_))):(v=v.j(y),v=v.add(l(_)))}return v}var f=u(0),g=u(1),I=u(16777216);n=o.prototype,n.m=function(){if(O(this))return-M(this).m();let A=0,E=1;for(let y=0;y<this.g.length;y++){let v=this.i(y);A+=(v>=0?v:4294967296+v)*E,E*=4294967296}return A},n.toString=function(A){if(A=A||10,A<2||36<A)throw Error("radix out of range: "+A);if(D(this))return"0";if(O(this))return"-"+M(this).toString(A);let E=l(Math.pow(A,6));var y=this;let v="";for(;;){let T=Oe(y,E).g;y=K(y,T.j(E));let S=((y.g.length>0?y.g[0]:y.h)>>>0).toString(A);if(y=T,D(y))return S+v;for(;S.length<6;)S="0"+S;v=S+v}},n.i=function(A){return A<0?0:A<this.g.length?this.g[A]:this.h};function D(A){if(A.h!=0)return!1;for(let E=0;E<A.g.length;E++)if(A.g[E]!=0)return!1;return!0}function O(A){return A.h==-1}n.l=function(A){return A=K(this,A),O(A)?-1:D(A)?0:1};function M(A){let E=A.g.length,y=[];for(let v=0;v<E;v++)y[v]=~A.g[v];return new o(y,~A.h).add(g)}n.abs=function(){return O(this)?M(this):this},n.add=function(A){let E=Math.max(this.g.length,A.g.length),y=[],v=0;for(let T=0;T<=E;T++){let S=v+(this.i(T)&65535)+(A.i(T)&65535),_=(S>>>16)+(this.i(T)>>>16)+(A.i(T)>>>16);v=_>>>16,S&=65535,_&=65535,y[T]=_<<16|S}return new o(y,y[y.length-1]&-2147483648?-1:0)};function K(A,E){return A.add(M(E))}n.j=function(A){if(D(this)||D(A))return f;if(O(this))return O(A)?M(this).j(M(A)):M(M(this).j(A));if(O(A))return M(this.j(M(A)));if(this.l(I)<0&&A.l(I)<0)return l(this.m()*A.m());let E=this.g.length+A.g.length,y=[];for(var v=0;v<2*E;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(let T=0;T<A.g.length;T++){let S=this.i(v)>>>16,_=this.i(v)&65535,_t=A.i(T)>>>16,gr=A.i(T)&65535;y[2*v+2*T]+=_*gr,$(y,2*v+2*T),y[2*v+2*T+1]+=S*gr,$(y,2*v+2*T+1),y[2*v+2*T+1]+=_*_t,$(y,2*v+2*T+1),y[2*v+2*T+2]+=S*_t,$(y,2*v+2*T+2)}for(A=0;A<E;A++)y[A]=y[2*A+1]<<16|y[2*A];for(A=E;A<2*E;A++)y[A]=0;return new o(y,0)};function $(A,E){for(;(A[E]&65535)!=A[E];)A[E+1]+=A[E]>>>16,A[E]&=65535,E++}function Be(A,E){this.g=A,this.h=E}function Oe(A,E){if(D(E))throw Error("division by zero");if(D(A))return new Be(f,f);if(O(A))return E=Oe(M(A),E),new Be(M(E.g),M(E.h));if(O(E))return E=Oe(A,M(E)),new Be(M(E.g),E.h);if(A.g.length>30){if(O(A)||O(E))throw Error("slowDivide_ only works with positive integers.");for(var y=g,v=E;v.l(A)<=0;)y=ot(y),v=ot(v);var T=ve(y,1),S=ve(v,1);for(v=ve(v,2),y=ve(y,2);!D(v);){var _=S.add(v);_.l(A)<=0&&(T=T.add(y),S=_),v=ve(v,1),y=ve(y,1)}return E=K(A,T.j(E)),new Be(T,E)}for(T=f;A.l(E)>=0;){for(y=Math.max(1,Math.floor(A.m()/E.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),S=l(y),_=S.j(E);O(_)||_.l(A)>0;)y-=v,S=l(y),_=S.j(E);D(S)&&(S=g),T=T.add(S),A=K(A,_)}return new Be(T,A)}n.B=function(A){return Oe(this,A).h},n.and=function(A){let E=Math.max(this.g.length,A.g.length),y=[];for(let v=0;v<E;v++)y[v]=this.i(v)&A.i(v);return new o(y,this.h&A.h)},n.or=function(A){let E=Math.max(this.g.length,A.g.length),y=[];for(let v=0;v<E;v++)y[v]=this.i(v)|A.i(v);return new o(y,this.h|A.h)},n.xor=function(A){let E=Math.max(this.g.length,A.g.length),y=[];for(let v=0;v<E;v++)y[v]=this.i(v)^A.i(v);return new o(y,this.h^A.h)};function ot(A){let E=A.g.length+1,y=[];for(let v=0;v<E;v++)y[v]=A.i(v)<<1|A.i(v-1)>>>31;return new o(y,A.h)}function ve(A,E){let y=E>>5;E%=32;let v=A.g.length-y,T=[];for(let S=0;S<v;S++)T[S]=E>0?A.i(S+y)>>>E|A.i(S+y+1)<<32-E:A.i(S+y);return new o(T,A.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Eh=Bm.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=B,Dn=Bm.Integer=o}).apply(typeof hm<"u"?hm:typeof self<"u"?self:typeof window<"u"?window:{});function Qe(n,e,t,r){if(t==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?r:t==="a"?r.call(n):r?r.value:e.get(n)}var cc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Tn={};var _h,lA,ws,yh,ro,uc,wh,Ih,Dh;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof cc=="object"&&cc];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(a,h){if(h)e:{var d=r;a=a.split(".");for(var p=0;p<a.length-1;p++){var R=a[p];if(!(R in d))break e;d=d[R]}a=a[a.length-1],p=d[a],h=h(p),h!=p&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(h){var d=[],p;for(p in h)Object.prototype.hasOwnProperty.call(h,p)&&d.push([p,h[p]]);return d}});var i=i||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,d){return a.call.apply(a.bind,arguments)}function l(a,h,d){return l=u,l.apply(null,arguments)}function B(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function f(a,h){function d(){}d.prototype=h.prototype,a.Z=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(p,R,P){for(var j=Array(arguments.length-2),oe=2;oe<arguments.length;oe++)j[oe-2]=arguments[oe];return h.prototype[R].apply(p,j)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function I(a){let h=a.length;if(h>0){let d=Array(h);for(let p=0;p<h;p++)d[p]=a[p];return d}return[]}function D(a,h){for(let p=1;p<arguments.length;p++){let R=arguments[p];var d=typeof R;if(d=d!="object"?d:R?Array.isArray(R)?"array":d:"null",d=="array"||d=="object"&&typeof R.length=="number"){d=a.length||0;let P=R.length||0;a.length=d+P;for(let j=0;j<P;j++)a[d+j]=R[j]}else a.push(R)}}class O{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function M(a){o.setTimeout(()=>{throw a},0)}function K(){var a=A;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class ${constructor(){this.h=this.g=null}add(h,d){let p=Be.get();p.set(h,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Be=new O(()=>new Oe,a=>a.reset());class Oe{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let ot,ve=!1,A=new $,E=()=>{let a=Promise.resolve(void 0);ot=()=>{a.then(y)}};function y(){for(var a;a=K();){try{a.h.call(a.g)}catch(d){M(d)}var h=Be;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}ve=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{let d=()=>{};o.addEventListener("test",d,h),o.removeEventListener("test",d,h)}catch{}return a}();function _(a){return/^[\s\xa0]*$/.test(a)}function _t(a,h){T.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}f(_t,T),_t.prototype.init=function(a,h){let d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&_t.Z.h.call(this)},_t.prototype.h=function(){_t.Z.h.call(this);let a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var gr="closure_listenable_"+(Math.random()*1e6|0),yw=0;function ww(a,h,d,p,R){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!p,this.ha=R,this.key=++yw,this.da=this.fa=!1}function ia(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function oa(a,h,d){for(let p in a)h.call(d,a[p],p,a)}function Iw(a,h){for(let d in a)h.call(void 0,a[d],d,a)}function Op(a){let h={};for(let d in a)h[d]=a[d];return h}let Pp="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Np(a,h){let d,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(d in p)a[d]=p[d];for(let P=0;P<Pp.length;P++)d=Pp[P],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function aa(a){this.src=a,this.g={},this.h=0}aa.prototype.add=function(a,h,d,p,R){let P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);let j=Wu(a,h,p,R);return j>-1?(h=a[j],d||(h.fa=!1)):(h=new ww(h,this.src,P,!!p,R),h.fa=d,a.push(h)),h};function zu(a,h){let d=h.type;if(d in a.g){var p=a.g[d],R=Array.prototype.indexOf.call(p,h,void 0),P;(P=R>=0)&&Array.prototype.splice.call(p,R,1),P&&(ia(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Wu(a,h,d,p){for(let R=0;R<a.length;++R){let P=a[R];if(!P.da&&P.listener==h&&P.capture==!!d&&P.ha==p)return R}return-1}var $u="closure_lm_"+(Math.random()*1e6|0),Qu={};function xp(a,h,d,p,R){if(Array.isArray(h)){for(let P=0;P<h.length;P++)xp(a,h[P],d,p,R);return null}return d=Fp(d),a&&a[gr]?a.J(h,d,c(p)?!!p.capture:!1,R):Dw(a,h,d,!1,p,R)}function Dw(a,h,d,p,R,P){if(!h)throw Error("Invalid event type");let j=c(R)?!!R.capture:!!R,oe=Xu(a);if(oe||(a[$u]=oe=new aa(a)),d=oe.add(h,d,p,j,P),d.proxy)return d;if(p=Tw(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)S||(R=j),R===void 0&&(R=!1),a.addEventListener(h.toString(),p,R);else if(a.attachEvent)a.attachEvent(kp(h.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Tw(){function a(d){return h.call(a.src,a.listener,d)}let h=Aw;return a}function Lp(a,h,d,p,R){if(Array.isArray(h))for(var P=0;P<h.length;P++)Lp(a,h[P],d,p,R);else p=c(p)?!!p.capture:!!p,d=Fp(d),a&&a[gr]?(a=a.i,P=String(h).toString(),P in a.g&&(h=a.g[P],d=Wu(h,d,p,R),d>-1&&(ia(h[d]),Array.prototype.splice.call(h,d,1),h.length==0&&(delete a.g[P],a.h--)))):a&&(a=Xu(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Wu(h,d,p,R)),(d=a>-1?h[a]:null)&&Yu(d))}function Yu(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[gr])zu(h.i,a);else{var d=a.type,p=a.proxy;h.removeEventListener?h.removeEventListener(d,p,a.capture):h.detachEvent?h.detachEvent(kp(d),p):h.addListener&&h.removeListener&&h.removeListener(p),(d=Xu(h))?(zu(d,a),d.h==0&&(d.src=null,h[$u]=null)):ia(a)}}}function kp(a){return a in Qu?Qu[a]:Qu[a]="on"+a}function Aw(a,h){if(a.da)a=!0;else{h=new _t(h,this);let d=a.listener,p=a.ha||a.src;a.fa&&Yu(a),a=d.call(p,h)}return a}function Xu(a){return a=a[$u],a instanceof aa?a:null}var Zu="__closure_events_fn_"+(Math.random()*1e9>>>0);function Fp(a){return typeof a=="function"?a:(a[Zu]||(a[Zu]=function(h){return a.handleEvent(h)}),a[Zu])}function at(){v.call(this),this.i=new aa(this),this.M=this,this.G=null}f(at,v),at.prototype[gr]=!0,at.prototype.removeEventListener=function(a,h,d,p){Lp(this,a,h,d,p)};function pt(a,h){var d,p=a.G;if(p)for(d=[];p;p=p.G)d.push(p);if(a=a.M,p=h.type||h,typeof h=="string")h=new T(h,a);else if(h instanceof T)h.target=h.target||a;else{var R=h;h=new T(p,a),Np(h,R)}R=!0;let P,j;if(d)for(j=d.length-1;j>=0;j--)P=h.g=d[j],R=ca(P,p,!0,h)&&R;if(P=h.g=a,R=ca(P,p,!0,h)&&R,R=ca(P,p,!1,h)&&R,d)for(j=0;j<d.length;j++)P=h.g=d[j],R=ca(P,p,!1,h)&&R}at.prototype.N=function(){if(at.Z.N.call(this),this.i){var a=this.i;for(let h in a.g){let d=a.g[h];for(let p=0;p<d.length;p++)ia(d[p]);delete a.g[h],a.h--}}this.G=null},at.prototype.J=function(a,h,d,p){return this.i.add(String(a),h,!1,d,p)},at.prototype.K=function(a,h,d,p){return this.i.add(String(a),h,!0,d,p)};function ca(a,h,d,p){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let R=!0;for(let P=0;P<h.length;++P){let j=h[P];if(j&&!j.da&&j.capture==d){let oe=j.listener,qe=j.ha||j.src;j.fa&&zu(a.i,j),R=oe.call(qe,p)!==!1&&R}}return R&&!p.defaultPrevented}function bw(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Vp(a){a.g=bw(()=>{a.g=null,a.i&&(a.i=!1,Vp(a))},a.l);let h=a.h;a.h=null,a.m.apply(null,h)}class vw extends v{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Vp(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function yi(a){v.call(this),this.h=a,this.g={}}f(yi,v);var Mp=[];function Gp(a){oa(a.g,function(h,d){this.g.hasOwnProperty(d)&&Yu(h)},a),a.g={}}yi.prototype.N=function(){yi.Z.N.call(this),Gp(this)},yi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var el=o.JSON.stringify,Rw=o.JSON.parse,Sw=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Up(){}function Hp(){}var wi={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function tl(){T.call(this,"d")}f(tl,T);function nl(){T.call(this,"c")}f(nl,T);var Cr={},qp=null;function ua(){return qp=qp||new at}Cr.Ia="serverreachability";function jp(a){T.call(this,Cr.Ia,a)}f(jp,T);function Ii(a){let h=ua();pt(h,new jp(h))}Cr.STAT_EVENT="statevent";function Kp(a,h){T.call(this,Cr.STAT_EVENT,a),this.stat=h}f(Kp,T);function gt(a){let h=ua();pt(h,new Kp(h,a))}Cr.Ja="timingevent";function Jp(a,h){T.call(this,Cr.Ja,a),this.size=h}f(Jp,T);function Di(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Ti(){this.g=!0}Ti.prototype.ua=function(){this.g=!1};function Ow(a,h,d,p,R,P){a.info(function(){if(a.g)if(P){var j="",oe=P.split("&");for(let _e=0;_e<oe.length;_e++){var qe=oe[_e].split("=");if(qe.length>1){let ze=qe[0];qe=qe[1];let tn=ze.split("_");j=tn.length>=2&&tn[1]=="type"?j+(ze+"="+qe+"&"):j+(ze+"=redacted&")}}}else j=null;else j=P;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+h+`
`+d+`
`+j})}function Pw(a,h,d,p,R,P,j){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+h+`
`+d+`
`+P+" "+j})}function hs(a,h,d,p){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+xw(a,d)+(p?" "+p:"")})}function Nw(a,h){a.info(function(){return"TIMEOUT: "+h})}Ti.prototype.info=function(){};function xw(a,h){if(!a.g)return h;if(!h)return null;try{let P=JSON.parse(h);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var d=P[a];if(!(d.length<2)){var p=d[1];if(Array.isArray(p)&&!(p.length<1)){var R=p[0];if(R!="noop"&&R!="stop"&&R!="close")for(let j=1;j<p.length;j++)p[j]=""}}}}return el(P)}catch{return h}}var la={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},zp={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Wp;function rl(){}f(rl,Up),rl.prototype.g=function(){return new XMLHttpRequest},Wp=new rl;function Ai(a){return encodeURIComponent(String(a))}function Lw(a){var h=1;a=a.split(":");let d=[];for(;h>0&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function Mn(a,h,d,p){this.j=a,this.i=h,this.l=d,this.S=p||1,this.V=new yi(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new $p}function $p(){this.i=null,this.g="",this.h=!1}var Qp={},sl={};function il(a,h,d){a.M=1,a.A=Ba(en(h)),a.u=d,a.R=!0,Yp(a,null)}function Yp(a,h){a.F=Date.now(),ha(a),a.B=en(a.A);var d=a.B,p=a.S;Array.isArray(p)||(p=[String(p)]),lg(d.i,"t",p),a.C=0,d=a.j.L,a.h=new $p,a.g=vg(a.j,d?h:null,!a.u),a.P>0&&(a.O=new vw(l(a.Y,a,a.g),a.P)),h=a.V,d=a.g,p=a.ba;var R="readystatechange";Array.isArray(R)||(R&&(Mp[0]=R.toString()),R=Mp);for(let P=0;P<R.length;P++){let j=xp(d,R[P],p||h.handleEvent,!1,h.h||h);if(!j)break;h.g[j.key]=j}h=a.J?Op(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Ii(),Ow(a.i,a.v,a.B,a.l,a.S,a.u)}Mn.prototype.ba=function(a){a=a.target;let h=this.O;h&&Hn(a)==3?h.j():this.Y(a)},Mn.prototype.Y=function(a){try{if(a==this.g)e:{let oe=Hn(this.g),qe=this.g.ya(),_e=this.g.ca();if(!(oe<3)&&(oe!=3||this.g&&(this.h.h||this.g.la()||Cg(this.g)))){this.K||oe!=4||qe==7||(qe==8||_e<=0?Ii(3):Ii(2)),ol(this);var h=this.g.ca();this.X=h;var d=kw(this);if(this.o=h==200,Pw(this.i,this.v,this.B,this.l,this.S,oe,h),this.o){if(this.U&&!this.L){t:{if(this.g){var p,R=this.g;if((p=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var P=p;break t}}P=null}if(a=P)hs(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,al(this,a);else{this.o=!1,this.m=3,gt(12),mr(this),bi(this);break e}}if(this.R){a=!0;let ze;for(;!this.K&&this.C<d.length;)if(ze=Fw(this,d),ze==sl){oe==4&&(this.m=4,gt(14),a=!1),hs(this.i,this.l,null,"[Incomplete Response]");break}else if(ze==Qp){this.m=4,gt(15),hs(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else hs(this.i,this.l,ze,null),al(this,ze);if(Xp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),oe!=4||d.length!=0||this.h.h||(this.m=1,gt(16),a=!1),this.o=this.o&&a,!a)hs(this.i,this.l,d,"[Invalid Chunked Response]"),mr(this),bi(this);else if(d.length>0&&!this.W){this.W=!0;var j=this.j;j.g==this&&j.aa&&!j.P&&(j.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),fl(j),j.P=!0,gt(11))}}else hs(this.i,this.l,d,null),al(this,d);oe==4&&mr(this),this.o&&!this.K&&(oe==4?Dg(this.j,this):(this.o=!1,ha(this)))}else Yw(this.g),h==400&&d.indexOf("Unknown SID")>0?(this.m=3,gt(12)):(this.m=0,gt(13)),mr(this),bi(this)}}}catch{}finally{}};function kw(a){if(!Xp(a))return a.g.la();let h=Cg(a.g);if(h==="")return"";let d="",p=h.length,R=Hn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return mr(a),bi(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<p;P++)a.h.h=!0,d+=a.h.i.decode(h[P],{stream:!(R&&P==p-1)});return h.length=0,a.h.g+=d,a.C=0,a.h.g}function Xp(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Fw(a,h){var d=a.C,p=h.indexOf(`
`,d);return p==-1?sl:(d=Number(h.substring(d,p)),isNaN(d)?Qp:(p+=1,p+d>h.length?sl:(h=h.slice(p,p+d),a.C=p+d,h)))}Mn.prototype.cancel=function(){this.K=!0,mr(this)};function ha(a){a.T=Date.now()+a.H,Zp(a,a.H)}function Zp(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Di(l(a.aa,a),h)}function ol(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Mn.prototype.aa=function(){this.D=null;let a=Date.now();a-this.T>=0?(Nw(this.i,this.B),this.M!=2&&(Ii(),gt(17)),mr(this),this.m=2,bi(this)):Zp(this,this.T-a)};function bi(a){a.j.I==0||a.K||Dg(a.j,a)}function mr(a){ol(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Gp(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function al(a,h){try{var d=a.j;if(d.I!=0&&(d.g==a||cl(d.h,a))){if(!a.L&&cl(d.h,a)&&d.I==3){try{var p=d.Ba.g.parse(h)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)ma(d),ga(d);else break e;dl(d),gt(18)}}else d.xa=R[1],0<d.xa-d.K&&R[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Di(l(d.Va,d),6e3));ng(d.h)<=1&&d.ta&&(d.ta=void 0)}else _r(d,11)}else if((a.L||d.g==a)&&ma(d),!_(h))for(R=d.Ba.g.parse(h),h=0;h<R.length;h++){let _e=R[h],ze=_e[0];if(!(ze<=d.K))if(d.K=ze,_e=_e[1],d.I==2)if(_e[0]=="c"){d.M=_e[1],d.ba=_e[2];let tn=_e[3];tn!=null&&(d.ka=tn,d.j.info("VER="+d.ka));let yr=_e[4];yr!=null&&(d.za=yr,d.j.info("SVER="+d.za));let qn=_e[5];qn!=null&&typeof qn=="number"&&qn>0&&(p=1.5*qn,d.O=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;let jn=a.g;if(jn){let _a=jn.g?jn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_a){var P=p.h;P.g||_a.indexOf("spdy")==-1&&_a.indexOf("quic")==-1&&_a.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(ul(P,P.h),P.h=null))}if(p.G){let pl=jn.g?jn.g.getResponseHeader("X-HTTP-Session-Id"):null;pl&&(p.wa=pl,Ae(p.J,p.G,pl))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),p=d;var j=a;if(p.na=bg(p,p.L?p.ba:null,p.W),j.L){rg(p.h,j);var oe=j,qe=p.O;qe&&(oe.H=qe),oe.D&&(ol(oe),ha(oe)),p.g=j}else wg(p);d.i.length>0&&Ca(d)}else _e[0]!="stop"&&_e[0]!="close"||_r(d,7);else d.I==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?_r(d,7):Bl(d):_e[0]!="noop"&&d.l&&d.l.qa(_e),d.A=0)}}Ii(4)}catch{}}var Vw=class{constructor(a,h){this.g=a,this.map=h}};function eg(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function tg(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ng(a){return a.h?1:a.g?a.g.size:0}function cl(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function ul(a,h){a.g?a.g.add(h):a.h=h}function rg(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}eg.prototype.cancel=function(){if(this.i=sg(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let a of this.g.values())a.cancel();this.g.clear()}};function sg(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(let d of a.g.values())h=h.concat(d.G);return h}return I(a.i)}var ig=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Mw(a,h){if(a){a=a.split("&");for(let d=0;d<a.length;d++){let p=a[d].indexOf("="),R,P=null;p>=0?(R=a[d].substring(0,p),P=a[d].substring(p+1)):R=a[d],h(R,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function Gn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof Gn?(this.l=a.l,vi(this,a.j),this.o=a.o,this.g=a.g,Ri(this,a.u),this.h=a.h,ll(this,hg(a.i)),this.m=a.m):a&&(h=String(a).match(ig))?(this.l=!1,vi(this,h[1]||"",!0),this.o=Si(h[2]||""),this.g=Si(h[3]||"",!0),Ri(this,h[4]),this.h=Si(h[5]||"",!0),ll(this,h[6]||"",!0),this.m=Si(h[7]||"")):(this.l=!1,this.i=new Pi(null,this.l))}Gn.prototype.toString=function(){let a=[];var h=this.j;h&&a.push(Oi(h,og,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Oi(h,og,!0),"@"),a.push(Ai(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Oi(d,d.charAt(0)=="/"?Hw:Uw,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Oi(d,jw)),a.join("")},Gn.prototype.resolve=function(a){let h=en(this),d=!!a.j;d?vi(h,a.j):d=!!a.o,d?h.o=a.o:d=!!a.g,d?h.g=a.g:d=a.u!=null;var p=a.h;if(d)Ri(h,a.u);else if(d=!!a.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var R=h.h.lastIndexOf("/");R!=-1&&(p=h.h.slice(0,R+1)+p)}if(R=p,R==".."||R==".")p="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){p=R.lastIndexOf("/",0)==0,R=R.split("/");let P=[];for(let j=0;j<R.length;){let oe=R[j++];oe=="."?p&&j==R.length&&P.push(""):oe==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),p&&j==R.length&&P.push("")):(P.push(oe),p=!0)}p=P.join("/")}else p=R}return d?h.h=p:d=a.i.toString()!=="",d?ll(h,hg(a.i)):d=!!a.m,d&&(h.m=a.m),h};function en(a){return new Gn(a)}function vi(a,h,d){a.j=d?Si(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Ri(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function ll(a,h,d){h instanceof Pi?(a.i=h,Kw(a.i,a.l)):(d||(h=Oi(h,qw)),a.i=new Pi(h,a.l))}function Ae(a,h,d){a.i.set(h,d)}function Ba(a){return Ae(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Si(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Oi(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,Gw),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Gw(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var og=/[#\/\?@]/g,Uw=/[#\?:]/g,Hw=/[#\?]/g,qw=/[#\?@]/g,jw=/#/g;function Pi(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Er(a){a.g||(a.g=new Map,a.h=0,a.i&&Mw(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}n=Pi.prototype,n.add=function(a,h){Er(this),this.i=null,a=Bs(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function ag(a,h){Er(a),h=Bs(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function cg(a,h){return Er(a),h=Bs(a,h),a.g.has(h)}n.forEach=function(a,h){Er(this),this.g.forEach(function(d,p){d.forEach(function(R){a.call(h,R,p,this)},this)},this)};function ug(a,h){Er(a);let d=[];if(typeof h=="string")cg(a,h)&&(d=d.concat(a.g.get(Bs(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)d=d.concat(a[h]);return d}n.set=function(a,h){return Er(this),this.i=null,a=Bs(this,a),cg(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=ug(this,a),a.length>0?String(a[0]):h):h};function lg(a,h,d){ag(a,h),d.length>0&&(a.i=null,a.g.set(Bs(a,h),I(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let a=[],h=Array.from(this.g.keys());for(let p=0;p<h.length;p++){var d=h[p];let R=Ai(d);d=ug(this,d);for(let P=0;P<d.length;P++){let j=R;d[P]!==""&&(j+="="+Ai(d[P])),a.push(j)}}return this.i=a.join("&")};function hg(a){let h=new Pi;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function Bs(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Kw(a,h){h&&!a.j&&(Er(a),a.i=null,a.g.forEach(function(d,p){let R=p.toLowerCase();p!=R&&(ag(this,p),lg(this,R,d))},a)),a.j=h}function Jw(a,h){let d=new Ti;if(o.Image){let p=new Image;p.onload=B(Un,d,"TestLoadImage: loaded",!0,h,p),p.onerror=B(Un,d,"TestLoadImage: error",!1,h,p),p.onabort=B(Un,d,"TestLoadImage: abort",!1,h,p),p.ontimeout=B(Un,d,"TestLoadImage: timeout",!1,h,p),o.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else h(!1)}function zw(a,h){let d=new Ti,p=new AbortController,R=setTimeout(()=>{p.abort(),Un(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:p.signal}).then(P=>{clearTimeout(R),P.ok?Un(d,"TestPingServer: ok",!0,h):Un(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),Un(d,"TestPingServer: error",!1,h)})}function Un(a,h,d,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(d)}catch{}}function Ww(){this.g=new Sw}function da(a){this.i=a.Sb||null,this.h=a.ab||!1}f(da,Up),da.prototype.g=function(){return new fa(this.i,this.h)};function fa(a,h){at.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(fa,at),n=fa.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,xi(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;let h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ni(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,xi(this)),this.g&&(this.readyState=3,xi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Bg(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Bg(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ni(this):xi(this),this.readyState==3&&Bg(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Ni(this))},n.Na=function(a){this.g&&(this.response=a,Ni(this))},n.ga=function(){this.g&&Ni(this)};function Ni(a){a.readyState=4,a.l=null,a.j=null,a.B=null,xi(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function xi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(fa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function dg(a){let h="";return oa(a,function(d,p){h+=p,h+=":",h+=d,h+=`\r
`}),h}function hl(a,h,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=dg(d),typeof a=="string"?d!=null&&Ai(d):Ae(a,h,d))}function Pe(a){at.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Pe,at);var $w=/^https?$/i,Qw=["POST","PUT"];n=Pe.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Wp.g(),this.g.onreadystatechange=g(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){fg(this,P);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)d.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let P of p.keys())d.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Qw,h,void 0)>=0)||p||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[P,j]of d)this.g.setRequestHeader(P,j);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){fg(this,P)}};function fg(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,pg(a),pa(a)}function pg(a){a.A||(a.A=!0,pt(a,"complete"),pt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,pt(this,"complete"),pt(this,"abort"),pa(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),pa(this,!0)),Pe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?gg(this):this.Xa())},n.Xa=function(){gg(this)};function gg(a){if(a.h&&typeof i<"u"){if(a.v&&Hn(a)==4)setTimeout(a.Ca.bind(a),0);else if(pt(a,"readystatechange"),Hn(a)==4){a.h=!1;try{let P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var p;if(p=P===0){let j=String(a.D).match(ig)[1]||null;!j&&o.self&&o.self.location&&(j=o.self.location.protocol.slice(0,-1)),p=!$w.test(j?j.toLowerCase():"")}d=p}if(d)pt(a,"complete"),pt(a,"success");else{a.o=6;try{var R=Hn(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",pg(a)}}finally{pa(a)}}}}function pa(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);let d=a.g;a.g=null,h||pt(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Hn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Hn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Rw(h)}};function Cg(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Yw(a){let h={};a=(a.g&&Hn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(_(a[p]))continue;var d=Lw(a[p]);let R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let P=h[R]||[];h[R]=P,P.push(d)}Iw(h,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Li(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function mg(a){this.za=0,this.i=[],this.j=new Ti,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Li("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Li("baseRetryDelayMs",5e3,a),this.Za=Li("retryDelaySeedMs",1e4,a),this.Ta=Li("forwardChannelMaxRetries",2,a),this.va=Li("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new eg(a&&a.concurrentRequestLimit),this.Ba=new Ww,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=mg.prototype,n.ka=8,n.I=1,n.connect=function(a,h,d,p){gt(0),this.W=a,this.H=h||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.J=bg(this,null,this.W),Ca(this)};function Bl(a){if(Eg(a),a.I==3){var h=a.V++,d=en(a.J);if(Ae(d,"SID",a.M),Ae(d,"RID",h),Ae(d,"TYPE","terminate"),ki(a,d),h=new Mn(a,a.j,h),h.M=2,h.A=Ba(en(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=h.A,d=!0),d||(h.g=vg(h.j,null),h.g.ea(h.A)),h.F=Date.now(),ha(h)}Ag(a)}function ga(a){a.g&&(fl(a),a.g.cancel(),a.g=null)}function Eg(a){ga(a),a.v&&(o.clearTimeout(a.v),a.v=null),ma(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ca(a){if(!tg(a.h)&&!a.m){a.m=!0;var h=a.Ea;ot||E(),ve||(ot(),ve=!0),A.add(h,a),a.D=0}}function Xw(a,h){return ng(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Di(l(a.Ea,a,h),Tg(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;let R=new Mn(this,this.j,a),P=this.o;if(this.U&&(P?(P=Op(P),Np(P,this.U)):P=this.U),this.u!==null||this.R||(R.J=P,P=null),this.S)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(h+=p,h>4096){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=yg(this,R,h),d=en(this.J),Ae(d,"RID",a),Ae(d,"CVER",22),this.G&&Ae(d,"X-HTTP-Session-Id",this.G),ki(this,d),P&&(this.R?h="headers="+Ai(dg(P))+"&"+h:this.u&&hl(d,this.u,P)),ul(this.h,R),this.Ra&&Ae(d,"TYPE","init"),this.S?(Ae(d,"$req",h),Ae(d,"SID","null"),R.U=!0,il(R,d,null)):il(R,d,h),this.I=2}}else this.I==3&&(a?_g(this,a):this.i.length==0||tg(this.h)||_g(this))};function _g(a,h){var d;h?d=h.l:d=a.V++;let p=en(a.J);Ae(p,"SID",a.M),Ae(p,"RID",d),Ae(p,"AID",a.K),ki(a,p),a.u&&a.o&&hl(p,a.u,a.o),d=new Mn(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),h&&(a.i=h.G.concat(a.i)),h=yg(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),ul(a.h,d),il(d,p,h)}function ki(a,h){a.H&&oa(a.H,function(d,p){Ae(h,p,d)}),a.l&&oa({},function(d,p){Ae(h,p,d)})}function yg(a,h,d){d=Math.min(a.i.length,d);let p=a.l?l(a.l.Ka,a.l,a):null;e:{var R=a.i;let oe=-1;for(;;){let qe=["count="+d];oe==-1?d>0?(oe=R[0].g,qe.push("ofs="+oe)):oe=0:qe.push("ofs="+oe);let _e=!0;for(let ze=0;ze<d;ze++){var P=R[ze].g;let tn=R[ze].map;if(P-=oe,P<0)oe=Math.max(0,R[ze].g-100),_e=!1;else try{P="req"+P+"_"||"";try{var j=tn instanceof Map?tn:Object.entries(tn);for(let[yr,qn]of j){let jn=qn;c(qn)&&(jn=el(qn)),qe.push(P+yr+"="+encodeURIComponent(jn))}}catch(yr){throw qe.push(P+"type="+encodeURIComponent("_badmap")),yr}}catch{p&&p(tn)}}if(_e){j=qe.join("&");break e}}j=void 0}return a=a.i.splice(0,d),h.G=a,j}function wg(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;ot||E(),ve||(ot(),ve=!0),A.add(h,a),a.A=0}}function dl(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Di(l(a.Da,a),Tg(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Ig(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Di(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,gt(10),ga(this),Ig(this))};function fl(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Ig(a){a.g=new Mn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=en(a.na);Ae(h,"RID","rpc"),Ae(h,"SID",a.M),Ae(h,"AID",a.K),Ae(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&Ae(h,"TO",a.ia),Ae(h,"TYPE","xmlhttp"),ki(a,h),a.u&&a.o&&hl(h,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Ba(en(h)),d.u=null,d.R=!0,Yp(d,a)}n.Va=function(){this.C!=null&&(this.C=null,ga(this),dl(this),gt(19))};function ma(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Dg(a,h){var d=null;if(a.g==h){ma(a),fl(a),a.g=null;var p=2}else if(cl(a.h,h))d=h.G,rg(a.h,h),p=1;else return;if(a.I!=0){if(h.o)if(p==1){d=h.u?h.u.length:0,h=Date.now()-h.F;var R=a.D;p=ua(),pt(p,new Jp(p,d)),Ca(a)}else wg(a);else if(R=h.m,R==3||R==0&&h.X>0||!(p==1&&Xw(a,h)||p==2&&dl(a)))switch(d&&d.length>0&&(h=a.h,h.i=h.i.concat(d)),R){case 1:_r(a,5);break;case 4:_r(a,10);break;case 3:_r(a,6);break;default:_r(a,2)}}}function Tg(a,h){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*h}function _r(a,h){if(a.j.info("Error code "+h),h==2){var d=l(a.bb,a),p=a.Ua;let R=!p;p=new Gn(p||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||vi(p,"https"),Ba(p),R?Jw(p.toString(),d):zw(p.toString(),d)}else gt(2);a.I=0,a.l&&a.l.pa(h),Ag(a),Eg(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),gt(2)):(this.j.info("Failed to ping google.com"),gt(1))};function Ag(a){if(a.I=0,a.ja=[],a.l){let h=sg(a.h);(h.length!=0||a.i.length!=0)&&(D(a.ja,h),D(a.ja,a.i),a.h.i.length=0,I(a.i),a.i.length=0),a.l.oa()}}function bg(a,h,d){var p=d instanceof Gn?en(d):new Gn(d);if(p.g!="")h&&(p.g=h+"."+p.g),Ri(p,p.u);else{var R=o.location;p=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;let P=new Gn(null);p&&vi(P,p),h&&(P.g=h),R&&Ri(P,R),d&&(P.h=d),p=P}return d=a.G,h=a.wa,d&&h&&Ae(p,d,h),Ae(p,"VER",a.ka),ki(a,p),p}function vg(a,h,d){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Pe(new da({ab:d})):new Pe(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Rg(){}n=Rg.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ea(){}Ea.prototype.g=function(a,h){return new bt(a,h)};function bt(a,h){at.call(this),this.g=new mg(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!_(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!_(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new ds(this)}f(bt,at),bt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},bt.prototype.close=function(){Bl(this.g)},bt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=el(a),a=d);h.i.push(new Vw(h.Ya++,a)),h.I==3&&Ca(h)},bt.prototype.N=function(){this.g.l=null,delete this.j,Bl(this.g),delete this.g,bt.Z.N.call(this)};function Sg(a){tl.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(let d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}f(Sg,tl);function Og(){nl.call(this),this.status=1}f(Og,nl);function ds(a){this.g=a}f(ds,Rg),ds.prototype.ra=function(){pt(this.g,"a")},ds.prototype.qa=function(a){pt(this.g,new Sg(a))},ds.prototype.pa=function(a){pt(this.g,new Og)},ds.prototype.oa=function(){pt(this.g,"b")},Ea.prototype.createWebChannel=Ea.prototype.g,bt.prototype.send=bt.prototype.o,bt.prototype.open=bt.prototype.m,bt.prototype.close=bt.prototype.close,Dh=Tn.createWebChannelTransport=function(){return new Ea},Ih=Tn.getStatEventTarget=function(){return ua()},wh=Tn.Event=Cr,uc=Tn.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},la.NO_ERROR=0,la.TIMEOUT=8,la.HTTP_ERROR=6,ro=Tn.ErrorCode=la,zp.COMPLETE="complete",yh=Tn.EventType=zp,Hp.EventType=wi,wi.OPEN="a",wi.CLOSE="b",wi.ERROR="c",wi.MESSAGE="d",at.prototype.listen=at.prototype.J,ws=Tn.WebChannel=Hp,lA=Tn.FetchXmlHttpFactory=da,Pe.prototype.listenOnce=Pe.prototype.K,Pe.prototype.getLastError=Pe.prototype.Ha,Pe.prototype.getLastErrorCode=Pe.prototype.ya,Pe.prototype.getStatus=Pe.prototype.ca,Pe.prototype.getResponseJson=Pe.prototype.La,Pe.prototype.getResponseText=Pe.prototype.la,Pe.prototype.send=Pe.prototype.ea,Pe.prototype.setWithCredentials=Pe.prototype.Fa,_h=Tn.XhrIo=Pe}).apply(typeof cc<"u"?cc:typeof self<"u"?self:typeof window<"u"?window:{});var we,L=(we=class{},V(we,"FOLD_CASE",1),V(we,"LITERAL",2),V(we,"CLASS_NL",4),V(we,"DOT_NL",8),V(we,"ONE_LINE",16),V(we,"NON_GREEDY",32),V(we,"PERL_X",64),V(we,"UNICODE_GROUPS",128),V(we,"WAS_DOLLAR",256),V(we,"LOOKBEHIND",512),V(we,"MATCH_NL",we.CLASS_NL|we.DOT_NL),V(we,"PERL",we.CLASS_NL|we.ONE_LINE|we.PERL_X|we.UNICODE_GROUPS),V(we,"POSIX",0),V(we,"UNANCHORED",0),V(we,"ANCHOR_START",1),V(we,"ANCHOR_BOTH",2),we),nt={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},ao=128,Sh=new Int32Array(ao),Oh=new Int32Array(ao),lc=65535;for(let n=0;n<ao;n++)n>=97&&n<=122?Sh[n]=n-32:Sh[n]=n,n>=65&&n<=90?Oh[n]=n+32:Oh[n]=n;var Rh,k=(Rh=class{static toUpperCase(n){if(n<ao)return Sh[n];let e=String.fromCodePoint(n).toUpperCase(),t=e.codePointAt(0)>lc?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),s=r.codePointAt(0)>lc?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}static toLowerCase(n){if(n<ao)return Oh[n];let e=String.fromCodePoint(n).toLowerCase(),t=e.codePointAt(0)>lc?2:1;if(e.length>t)return n;let r=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),s=r.codePointAt(0)>lc?2:1;return r.length>s||r.codePointAt(0)!==n?n:e.codePointAt(0)}},V(Rh,"CODES",Object.freeze({"\x07":7,"\b":8,"	":9,"\n":10,"\v":11,"\f":12,"\r":13," ":32,'"':34,$:36,"&":38,"'":39,"(":40,")":41,"*":42,"+":43,"-":45,".":46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,":":58,"<":60,">":62,"?":63,A:65,B:66,C:67,F:70,P:80,Q:81,U:85,Z:90,"[":91,"\\":92,"]":93,"^":94,_:95,"`":96,a:97,b:98,f:102,i:105,m:109,n:110,r:114,s:115,t:116,v:118,x:120,z:122,"{":123,"|":124,"}":125})),Rh),C=class{constructor(n,e=!1){this.data=n,this.isStride1=e,this.SIZE=e?2:3}getLo(n){return this.data[n*this.SIZE]}getHi(n){return this.data[n*this.SIZE+1]}getStride(n){return this.isStride1?1:this.data[n*this.SIZE+2]}get length(){return this.data.length/this.SIZE}},hA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-",Hm=new Uint8Array(256);for(let n=0;n<64;n++)Hm[hA.charCodeAt(n)]=n;var qm=n=>{let e=[],t=0,r=0;for(let s=0;s<n.length;s++){let i=Hm[n.charCodeAt(s)];t|=(i&31)<<r,i&32?r+=5:(e.push(t),t=0,r=0)}return e},m=(n,e)=>{let t=qm(n),r=e?t.length/2:t.length/3,s=new Uint32Array(r*3),i=0,o=0;for(let c=0;c<r;c++)i+=t[o++],s[c*3]=i,i+=t[o++],s[c*3+1]=i,s[c*3+2]=e?1:t[o++];return s},BA=n=>{let e=qm(n),t=new Map,r=0;for(let s=0;s<e.length;s+=2){r+=e[s];let i=e[s+1],o=i>>>1^-(i&1);t.set(r,r+o)}return t},hc=class{constructor(n){this.initializer=n,this.cache=new Map}has(n){return Object.hasOwn(this.initializer,n)}get(n){if(this.cache.has(n))return this.cache.get(n);let e=this.has(n)?this.initializer[n]():null;return this.cache.set(n,e),e}},Yn,St=(Yn=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=BA("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new C(m("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}},V(Yn,"_CASE_ORBIT",null),V(Yn,"_Print",null),V(Yn,"CATEGORIES",new hc({C:()=>new C(m("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new C(m("AfgDgB",!0)),Cf:()=>new C(m("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new C(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new C(m("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new C(m("gg2B--B",!0)),L:()=>new C(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new C(m("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new C(m("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new C(m("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new C(m("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new C(m("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new C(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new C(m("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new C(m("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new C(m("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new C(m("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new C(m("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new C(m("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new C(m("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new C(m("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new C(m("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new C(m("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new C(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new C(m("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new C(m("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new C(m("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new C(m("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new C(m("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new C(m("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new C(m("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new C(m("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new C(m("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new C(m("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new C(m("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new C(m("ohIA",!0)),Zp:()=>new C(m("phIA",!0)),Zs:()=>new C(m("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new C(m("wBJIFbF",!0)),Alphabetic:()=>new C(m("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new C(m("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new C(m("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new C(m("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new C(m("7-8DE",!0)),Emoji_Modifier_Base:()=>new C(m("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new C(m("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new C(m("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new C(m("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new C(m("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new C(m("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new C(m("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new C(m("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new C(m("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new C(m("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),V(Yn,"SCRIPTS",new hc({Adlam:()=>new C(m("go6DrCFJFB",!0)),Ahom:()=>new C(m("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new C(m("ggxCmS",!0)),Arabic:()=>new C(m("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new C(m("xpBlBDxBDCks9BE",!0)),Avestan:()=>new C(m("g4iC1BEG",!0)),Balinese:()=>new C(m("g4GsCCxB",!0)),Bamum:()=>new C(m("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new C(m("w26CdDF",!0)),Batak:()=>new C(m("g+GzBJD",!0)),Bengali:()=>new C(m("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new C(m("g17CYDY",!0)),Bhaiksuki:()=>new C(m("ggnCICsBCNLc",!0)),Bopomofo:()=>new C(m("qXB6wLqBxDf",!0)),Brahmi:()=>new C(m("ggkCtCFjBKA",!0)),Braille:()=>new C(m("ggK-H",!0)),Buginese:()=>new C(m("gwGbDB",!0)),Buhid:()=>new C(m("g6FT",!0)),Canadian_Aboriginal:()=>new C(m("ggF-TxRlC7tgCP",!0)),Carian:()=>new C(m("g1gCwB",!0)),Caucasian_Albanian:()=>new C(m("wphCzBMA",!0)),Chakma:()=>new C(m("gokC0BCR",!0)),Cham:()=>new C(m("gwqB2BKNDJDD",!0)),Cherokee:()=>new C(m("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new C(m("w9jCb",!0)),Common:()=>new C(m("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new C(m("ifNxkKzDGG",!0)),Cuneiform:()=>new C(m("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new C(m("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new C(m("w8rCiD",!0)),Cyrillic:()=>new C(m("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new C(m("gghCvC",!0)),Devanagari:()=>new C(m("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new C(m("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new C(m("ggmC7B",!0)),Duployan:()=>new C(m("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new C(m("ggsC1iBL68D",!0)),Elbasan:()=>new C(m("gohCnB",!0)),Elymaic:()=>new C(m("g-jCW",!0)),Ethiopic:()=>new C(m("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new C(m("gqjClBEcJB",!0)),Georgian:()=>new C(m("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new C(m("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new C(m("w5gCa",!0)),Grantha:()=>new C(m("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new C(m("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new C(m("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new C(m("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new C(m("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new C(m("go4C5B",!0)),Han:()=>new C(m("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new C(m("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new C(m("gojCnBJJ",!0)),Hanunoo:()=>new C(m("g5FU",!0)),Hatran:()=>new C(m("gniCSCBGE",!0)),Hebrew:()=>new C(m("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new C(m("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new C(m("giiCVCI",!0)),Inherited:()=>new C(m("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new C(m("g7iCSGH",!0)),Inscriptional_Parthian:()=>new C(m("g6iCVDH",!0)),Javanese:()=>new C(m("gsqBtCDJFB",!0)),Kaithi:()=>new C(m("gkkCiCLA",!0)),Kannada:()=>new C(m("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new C(m("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new C(m("g4nCQCoBEc",!0)),Kayah_Li:()=>new C(m("goqBtBCA",!0)),Kharoshthi:()=>new C(m("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new C(m("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new C(m("g8F9CDJHJnPf",!0)),Khojki:()=>new C(m("gwkCRCuB",!0)),Khudawadi:()=>new C(m("w1kC6BGJ",!0)),Kirat_Rai:()=>new C(m("gq7C5B",!0)),Lao:()=>new C(m("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new C(m("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new C(m("ggH3BEOEC",!0)),Limbu:()=>new C(m("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new C(m("gwhC2JKVLH",!0)),Linear_B:()=>new C(m("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new C(m("wmpBvBx1eA",!0)),Lycian:()=>new C(m("g0gCc",!0)),Lydian:()=>new C(m("gpiCZGA",!0)),Mahajani:()=>new C(m("wqkCmB",!0)),Makasar:()=>new C(m("g3nCY",!0)),Malayalam:()=>new C(m("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new C(m("giCbDA",!0)),Manichaean:()=>new C(m("g2iCmBFL",!0)),Marchen:()=>new C(m("wjnCfDVCN",!0)),Masaram_Gondi:()=>new C(m("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new C(m("gy7C6C",!0)),Meetei_Mayek:()=>new C(m("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new C(m("gg6DkGDP",!0)),Meroitic_Cursive:()=>new C(m("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new C(m("gsiCf",!0)),Miao:()=>new C(m("g47CqCF4BIQ",!0)),Modi:()=>new C(m("gwlCkCMJ",!0)),Mongolian:()=>new C(m("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new C(m("gy6CeCJFB",!0)),Multani:()=>new C(m("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new C(m("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new C(m("gkiCeJI",!0)),Nag_Mundari:()=>new C(m("wm5DpB",!0)),Nandinagari:()=>new C(m("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new C(m("gsGrBFZHKEB",!0)),Newa:()=>new C(m("gglC7CCE",!0)),Nko:()=>new C(m("g+B6BDC",!0)),Nushu:()=>new C(m("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new C(m("go4DsBENDJFB",!0)),Ogham:()=>new C(m("g0Fc",!0)),Ol_Chiki:()=>new C(m("wiHvB",!0)),Ol_Onal:()=>new C(m("wu5DqBFA",!0)),Old_Hungarian:()=>new C(m("gkjCyBOyBIF",!0)),Old_Italic:()=>new C(m("g4gCjBKC",!0)),Old_North_Arabian:()=>new C(m("g0iCf",!0)),Old_Permic:()=>new C(m("w6gCqB",!0)),Old_Persian:()=>new C(m("g9gCjBFN",!0)),Old_Sogdian:()=>new C(m("g4jCnB",!0)),Old_South_Arabian:()=>new C(m("gziCf",!0)),Old_Turkic:()=>new C(m("ggjCoC",!0)),Old_Uyghur:()=>new C(m("w7jCZ",!0)),Oriya:()=>new C(m("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new C(m("wlhCjBFjB",!0)),Osmanya:()=>new C(m("gkhCdDJ",!0)),Pahawh_Hmong:()=>new C(m("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new C(m("gjiCf",!0)),Pau_Cin_Hau:()=>new C(m("g2mC4B",!0)),Phags_Pa:()=>new C(m("giqB3B",!0)),Phoenician:()=>new C(m("goiCbEA",!0)),Psalter_Pahlavi:()=>new C(m("g8iCRIDNG",!0)),Rejang:()=>new C(m("wpqBjBMA",!0)),Runic:()=>new C(m("g1FqCEK",!0)),Samaritan:()=>new C(m("ggCtBDO",!0)),Saurashtra:()=>new C(m("gkqBlCJL",!0)),Sharada:()=>new C(m("gskC-ChsCH",!0)),Shavian:()=>new C(m("wihCvB",!0)),Siddham:()=>new C(m("gslC1BDlB",!0)),Sidetic:()=>new C(m("gqiCZ",!0)),SignWriting:()=>new C(m("gg2DrUQECO",!0)),Sinhala:()=>new C(m("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new C(m("w5jCpB",!0)),Sora_Sompeng:()=>new C(m("wmkCYIJ",!0)),Soyombo:()=>new C(m("wymCyC",!0)),Sundanese:()=>new C(m("g8G-BhIH",!0)),Sunuwar:()=>new C(m("g+mChBPJ",!0)),Syloti_Nagri:()=>new C(m("ggqBsB",!0)),Syriac:()=>new C(m("g4BNC7BDCxIK",!0)),Tagalog:()=>new C(m("g4FVKA",!0)),Tagbanwa:()=>new C(m("g7FMCCCB",!0)),Tai_Le:()=>new C(m("wqGdDE",!0)),Tai_Tham:()=>new C(m("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new C(m("g0qBiCZE",!0)),Tai_Yo:()=>new C(m("g25DeCVJB",!0)),Takri:()=>new C(m("g0lC5BHJ",!0)),Tamil:()=>new C(m("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new C(m("wz6CuCCJ",!0)),Tangut:()=>new C(m("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new C(m("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new C(m("g8BxB",!0)),Thai:()=>new C(m("hwD5BGb",!0)),Tibetan:()=>new C(m("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new C(m("wpL3BIBPA",!0)),Tirhuta:()=>new C(m("gklCnCJJ",!0)),Todhri:()=>new C(m("guhCzB",!0)),Tolong_Siki:()=>new C(m("wtnCrBFJ",!0)),Toto:()=>new C(m("w04De",!0)),Tulu_Tigalari:()=>new C(m("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new C(m("g8gCdCA",!0)),Unknown:()=>new C(m("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new C(m("gopBrJ",!0)),Vithkuqi:()=>new C(m("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new C(m("g24D5BGA",!0)),Warang_Citi:()=>new C(m("glmCyCNA",!0)),Yezidi:()=>new C(m("g0jCpBCCDB",!0)),Yi:()=>new C(m("ggoBskBE2B",!0)),Zanabazar_Square:()=>new C(m("gwmCnC",!0))})),V(Yn,"FOLD_CATEGORIES",new hc({L:()=>new C(m("laA",!0)),LC:()=>new C(m("laA",!0)),Ll:()=>new C(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new C(m("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new C(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new C(m("5cgBgBlgHAB",!1)),Mn:()=>new C(m("5cgBgBlgHAB",!1)),Emoji:()=>new C(m("8mJA",!0)),Extended_Pictographic:()=>new C(m("8mJA",!0)),Lowercase:()=>new C(m("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new C(m("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new C(m("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),V(Yn,"FOLD_SCRIPT",new hc({Common:()=>new C(m("8cgBgB",!1)),Greek:()=>new C(m("1FwUwU",!1)),Inherited:()=>new C(m("5cgBgBlgHAB",!1))})),Yn),me,z=(me=class{static isUnsearchable(e){return e===me.RUNE_ERROR||e>=me.MIN_HIGH_SURROGATE&&e<=me.MAX_LOW_SURROGATE}static is32(e,t){let r=0,s=e.length;for(;r<s;){let i=r+Math.floor((s-r)/2),o=e.getLo(i),c=e.getHi(i);if(o<=t&&t<=c){let u=e.getStride(i);return(t-o)%u===0}t<o?s=i:r=i+1}return!1}static is(e,t){if(t<=me.MAX_LATIN1){for(let r=0;r<e.length;r++){if(t>e.getHi(r))continue;let s=e.getLo(r);if(t<s)return!1;let i=e.getStride(r);return(t-s)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&me.is32(e,t)}static isPrint(e){return e<=me.MAX_LATIN1?e>=32&&e<me.MAX_ASCII||e>=161&&e!==173:me.is(St.Print,e)}static simpleFold(e){if(St.CASE_ORBIT.has(e))return St.CASE_ORBIT.get(e);if(e<=me.MAX_ASCII){let t=k.toLowerCase(e);return t!==e?t:k.toUpperCase(e)}return e}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=me.MAX_ASCII&&t<=me.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let r=me.simpleFold(e);r!==e;r=me.simpleFold(r))if(r===t)return!0;return!1}},V(me,"MAX_RUNE",1114111),V(me,"RUNE_ERROR",65533),V(me,"MAX_ASCII",127),V(me,"MAX_LATIN1",255),V(me,"MAX_BMP",65535),V(me,"MIN_FOLD",65),V(me,"MAX_FOLD",125251),V(me,"MIN_HIGH_SURROGATE",55296),V(me,"MAX_HIGH_SURROGATE",56319),V(me,"MIN_LOW_SURROGATE",56320),V(me,"MAX_LOW_SURROGATE",57343),V(me,"MIN_SUPPLEMENTARY_CODE_POINT",65536),me),co=class extends Error{constructor(n){super(n),this.name="RE2JSException"}},De=class extends co{constructor(n,e=null){let t=`error parsing regexp: ${n}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=n,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},oo=class extends co{constructor(n){super(n),this.name="RE2JSCompileException"}},yt=class extends co{constructor(n){super(n),this.name="RE2JSGroupException"}},jm=class extends co{constructor(n){super(n),this.name="RE2JSFlagsException"}},Cc=class extends co{constructor(n){super(n),this.name="RE2JSInternalException"}},Nh=256,Km=new Uint8Array(Nh);for(let n=0;n<Nh;n++)Km[n]=97<=n&&n<=122||65<=n&&n<=90||48<=n&&n<=57||n===95?1:0;var Th=null,Ah=null,Ce,q=(Ce=class{static emptyInts(){return[]}static isString(e){return typeof e=="string"||Object.prototype.toString.call(e)==="[object String]"}static typeName(e){return e===null||typeof e!="object"&&typeof e!="function"?e===null?"null":typeof e:Object.prototype.toString.call(e).slice(8,-1)}static checkPattern(e){if(!Ce.isString(e))throw new TypeError(`The pattern must be a string, not ${Ce.typeName(e)} (RE2JS.translateRegExp() converts a RegExp)`)}static checkInput(e){if(!Ce.isString(e)&&!Ce.isByteArray(e))throw new TypeError(`The input must be a string or a byte array (Uint8Array or number[]), not ${Ce.typeName(e)}`)}static checkFlags(e){let t=nt.MULTILINE|nt.DOTALL|nt.CASE_INSENSITIVE|nt.DISABLE_UNICODE_GROUPS|nt.LONGEST_MATCH|nt.LOOKBEHINDS;if(!Number.isInteger(e)||e&~t)throw new jm("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS")}static isByteArray(e){return Array.isArray(e)||Object.prototype.toString.call(e)==="[object Uint8Array]"}static isalnum(e){return k.CODES[0]<=e&&e<=k.CODES[9]||k.CODES.a<=e&&e<=k.CODES.z||k.CODES.A<=e&&e<=k.CODES.Z}static unhex(e){return k.CODES[0]<=e&&e<=k.CODES[9]?e-k.CODES[0]:k.CODES.a<=e&&e<=k.CODES.f?e-k.CODES.a+10:k.CODES.A<=e&&e<=k.CODES.F?e-k.CODES.A+10:-1}static escapeRune(e){let t="";if(z.isPrint(e))Ce.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case k.CODES['"']:t+='\\"';break;case k.CODES["\\"]:t+="\\\\";break;case k.CODES["	"]:t+="\\t";break;case k.CODES[`
`]:t+="\\n";break;case k.CODES["\r"]:t+="\\r";break;case k.CODES["\b"]:t+="\\b";break;case k.CODES["\f"]:t+="\\f";break;default:{let r=e.toString(16);e<256?(t+="\\x",r.length===1&&(t+="0"),t+=r):t+=`\\x{${r}}`;break}}return t}static stringToRunes(e){let t=String(e),r=[],s=0;for(;s<t.length;){let i=t.codePointAt(s);r.push(i),s+=i>z.MAX_BMP?2:1}return new Int32Array(r)}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<Nh?Km[e]===1:!1}static emptyOpContext(e,t){let r=0;return e<0&&(r|=Ce.EMPTY_BEGIN_TEXT|Ce.EMPTY_BEGIN_LINE),e===10&&(r|=Ce.EMPTY_BEGIN_LINE),t<0&&(r|=Ce.EMPTY_END_TEXT|Ce.EMPTY_END_LINE),t===10&&(r|=Ce.EMPTY_END_LINE),Ce.isWordRune(e)!==Ce.isWordRune(t)?r|=Ce.EMPTY_WORD_BOUNDARY:r|=Ce.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(e){return e.split("").map(t=>Ce.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>z.MAX_BMP?2:1}static toArray(e){let t=e.length,r=new Array(t);for(let s=0;s<t;s++)r[s]=e[s];return r}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return Th||(Th=new TextEncoder),Th.encode(e);{let t=[],r=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[r++]=i:i<2048?(t[r++]=i>>6|192,t[r++]=i&63|128):(i&64512)===z.MIN_HIGH_SURROGATE&&s+1<e.length&&(e.charCodeAt(s+1)&64512)===z.MIN_LOW_SURROGATE?(i=z.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++s)&1023),t[r++]=i>>18|240,t[r++]=i>>12&63|128,t[r++]=i>>6&63|128,t[r++]=i&63|128):(t[r++]=i>>12|224,t[r++]=i>>6&63|128,t[r++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){Ah||(Ah=new TextDecoder("utf-8"));let t=e instanceof Uint8Array?e:new Uint8Array(e);return Ah.decode(t)}else{let t=[],r=0,s=0;for(;r<e.length;){let i=e[r++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[r++];t[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[r++],c=e[r++],u=e[r++],l=((i&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-z.MIN_SUPPLEMENTARY_CODE_POINT;t[s++]=String.fromCharCode(z.MIN_HIGH_SURROGATE+(l>>10)),t[s++]=String.fromCharCode(z.MIN_LOW_SURROGATE+(l&1023))}else{let o=e[r++],c=e[r++];t[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|c&63)}}return t.join("")}}},V(Ce,"METACHARACTERS","\\.+*?()|[]{}^$"),V(Ce,"EMPTY_BEGIN_LINE",1),V(Ce,"EMPTY_END_LINE",2),V(Ce,"EMPTY_BEGIN_TEXT",4),V(Ce,"EMPTY_END_TEXT",8),V(Ce,"EMPTY_WORD_BOUNDARY",16),V(Ce,"EMPTY_NO_WORD_BOUNDARY",32),V(Ce,"EMPTY_ALL",-1),Ce),Jm=(n=[],e=0)=>{let t=Object.create(null);for(let r=0;r<n.length;r++){let s=n[r],i=e+r;t[s]=i,t[i]=s}return Object.freeze(t)},Xn,kr=(Xn=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Xn.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Xn.Encoding.UTF_16}},V(Xn,"Encoding",Jm(["UTF_16","UTF_8"])),Xn),dm=class extends kr{constructor(n=null){super(),this.bytes=n}getEncoding(){return kr.Encoding.UTF_8}asCharSequence(){return q.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},dA=class extends kr{constructor(n=null){super(),this.charSequence=n}getEncoding(){return kr.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return q.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},Nr=class{static utf16(n){return q.checkInput(n),new dA(n)}static utf8(n){return q.isByteArray(n)?new dm(n):new dm(q.stringToUtf8ByteArray(n))}},mt=class{static EOF(){return-8}constructor(){this.start=0,this.end=0}canCheckPrefix(){return!0}endPos(){return this.end-this.start}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},Wt,fA=(Wt=class extends mt{constructor(e,t=0,r=e.length){super(),this.bytes=e,this.start=t,this.end=r}hasString(e,t){let r=e.bytes;if(r.length===0)return!0;let s=this.indexOf(this.bytes,r,this.start+t);return s!==-1&&s<=this.end-r.length}hasAnyString(e,t){return e.automaton8().searchUTF8(this.bytes,this.start+t,this.end)}step(e){if(e+=this.start,e>=this.end)return mt.EOF();let t=this.bytes[e]&255;if(t<128)return t<<3|1;let r,s,i=128,o=191;if(t>=194&&t<=223)r=2,s=t&31;else if(t>=224&&t<=239)r=3,s=t&15,t===224?i=160:t===237&&(o=159);else if(t>=240&&t<=244)r=4,s=t&7,t===240?i=144:t===244&&(o=143);else return Wt.RUNE_ERROR_STEP;if(e+r>this.end)return Wt.RUNE_ERROR_STEP;let c=this.bytes[e+1]&255;if(c<i||c>o)return Wt.RUNE_ERROR_STEP;if(s=s<<6|c&63,r>2){let u=this.bytes[e+2]&255;if((u&192)!==128)return Wt.RUNE_ERROR_STEP;if(s=s<<6|u&63,r>3){let l=this.bytes[e+3]&255;if((l&192)!==128)return Wt.RUNE_ERROR_STEP;s=s<<6|l&63}}return s<<3|r}index(e,t){t+=this.start;let r=this.indexOf(this.bytes,e.prefixUTF8,t);return r<0?r:r-t}context(e){e+=this.start;let t=-1;if(e>this.start&&e<=this.end){let s=e-1;if(t=this.bytes[s--],t>=128){let i=e-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start);let o=this.step(s-this.start);t=s+(o&7)===e?o>>3:z.RUNE_ERROR}}let r=e<this.end?this.step(e-this.start)>>3:-1;return q.emptyOpContext(t,r)}indexOf(e,t,r=0){let s=t.length;if(s===0)return r<=this.end?r:-1;let i=t[0],o=this.end-s,c=typeof e.indexOf=="function",u=r;for(;u<=o;){if(c){if(u=e.indexOf(i,u),u===-1||u>o)return-1}else{for(;u<=o&&e[u]!==i;)u++;if(u>o)return-1}let l=!0;for(let B=1;B<s;B++)if(e[u+B]!==t[B]){l=!1;break}if(l)return u;u++}return-1}prefixLength(e){return e.prefixUTF8.length}},V(Wt,"RUNE_ERROR_STEP",z.RUNE_ERROR<<3|1),Wt),pA=class extends mt{constructor(n,e=0,t=n.length){super(),this.charSequence=n,this.start=e,this.end=t}hasString(n,e){let t=this.charSequence.indexOf(n.str,this.start+e);return t!==-1&&t<=this.end-n.str.length}hasAnyString(n,e){return n.automaton16().searchUTF16(this.charSequence,this.start+e,this.end)}step(n){if(n+=this.start,n>=this.end)return mt.EOF();let e=this.charSequence.charCodeAt(n);if(e<z.MIN_HIGH_SURROGATE||e>z.MAX_HIGH_SURROGATE||n+1>=this.end)return e<<3|1;let t=this.charSequence.charCodeAt(n+1);return t>=z.MIN_LOW_SURROGATE&&t<=z.MAX_LOW_SURROGATE?(e-z.MIN_HIGH_SURROGATE)*1024+(t-z.MIN_LOW_SURROGATE)+z.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(n,e){e+=this.start;let t=this.charSequence.indexOf(n.prefix,e);return t<0||t>this.end-n.prefix.length?-1:t-e}context(n){n+=this.start;let e=n>this.start&&n<=this.end?this.charSequence.charCodeAt(n-1):-1,t=n<this.end?this.charSequence.charCodeAt(n):-1;return q.emptyOpContext(e,t)}prefixLength(n){return n.prefix.length}},ye=class{static fromUTF8(n,e=0,t=n.length){return new fA(n,e,t)}static fromUTF16(n,e=0,t=void 0){return q.checkInput(n),new pA(n,e,t??n.length)}},xr,fm=(xr=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(r=>{let s=r.codePointAt(0);return s===k.CODES["\\"]||s===k.CODES.$?`\\${r}`:r}).join(""):e.indexOf("$")<0?e:e.split("").map(r=>r.codePointAt(0)===k.CODES.$?"$$":r).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;let r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,this.hasNamedGroups=Object.keys(this.namedGroups).length>0,this.numberOfInstructions=r.numberOfInstructions(),this.lookbehindState=null,t instanceof kr?this.resetMatcherInput(t):q.isByteArray(t)?this.resetMatcherInput(Nr.utf8(t)):this.resetMatcherInput(Nr.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof kr||(q.isByteArray(e)?e=Nr.utf8(e):e=Nr.utf16(e)),this.matcherInput=e,this.lookbehindState!==null?this.lookbehindState.reset():this.lookbehindState=this.patternInput.re2().createLookbehindState(),this.reset(),this}start(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new yt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){let t=this.namedGroups[e];if(!Number.isFinite(t))throw new yt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){let s=this.namedGroups[e];if(!Number.isFinite(s))throw new yt(`group '${e}' not found`);e=s}let t=this.start(e),r=this.end(e);return t<0&&r<0?null:this.substring(t,r)}getNamedGroups(){if(!this.hasMatch)throw new yt("perhaps no match attempted");let e=Object.create(null);for(let t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(!Number.isInteger(e)||e<0||e>this.patternGroupCount)throw new yt(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new yt("perhaps no match attempted");if(e===0||this.hasGroups)return;let t=this.matcherInputLength,r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount,this.lookbehindState);if(!r[0])throw new yt("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,L.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,L.ANCHOR_START)}find(e=null){if(e!==null){if(!Number.isInteger(e)||e<0||e>this.matcherInputLength)throw new yt(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){let t=(this.matcherInput.isUTF16Encoding()?ye.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):ye.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,L.UNANCHORED)}genMatch(e,t){let r=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1,this.lookbehindState);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?q.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let r="",s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),r}appendReplacementInternalJava(e){let t="",r=0,s=e.length,i=0;for(;i<s;){let o=e.codePointAt(i);if(o===k.CODES["\\"]){if(r<i&&(t+=e.substring(r,i)),i++,i>=s)throw new yt("character to be escaped is missing");r=i,i++;continue}if(o===k.CODES.$){if(r<i&&(t+=e.substring(r,i)),i+1>=s)throw new yt("Illegal group reference: group index is missing");let c=e.codePointAt(i+1);if(k.CODES[0]<=c&&c<=k.CODES[9]){let u=c-k.CODES[0],l=i+2;for(;l<s;l++){let f=e.codePointAt(l);if(f<k.CODES[0]||f>k.CODES[9]||u*10+f-k.CODES[0]>this.patternGroupCount)break;u=u*10+f-k.CODES[0]}if(u>this.patternGroupCount)throw new yt(`n > number of groups: ${u}`);let B=this.group(u);B!==null&&(t+=B),i=l,r=i}else if(c===k.CODES["{"]){let u=i+2;for(;u<s&&e.codePointAt(u)!==k.CODES["}"];)u++;if(u>=s)throw new yt("named capture group is missing trailing '}'");let l=e.substring(i+2,u),B=this.group(l);B!==null&&(t+=B),i=u+1,r=i}else throw new yt("Illegal group reference");continue}i++}return r<s&&(t+=e.substring(r,s)),t}appendReplacementInternalJs(e){let t=o=>o>=48&&o<=57,r=this.patternGroupCount,s="",i=0;for(;i<e.length;){let o=e.indexOf("$",i);if(o<0)break;s+=e.substring(i,o),i=o;let c=e.charCodeAt(i+1);if(c===k.CODES.$)s+="$",i+=2;else if(c===k.CODES["&"])s+=this.group(0),i+=2;else if(c===k.CODES["`"])s+=this.substring(0,this.start(0)),i+=2;else if(c===k.CODES["'"])s+=this.substring(this.end(0),this.matcherInputLength),i+=2;else if(t(c)){let u=1,l=c-48,B=e.charCodeAt(i+2);if(t(B)&&l*10+B-48<=r&&(u=2,l=l*10+B-48),l>=1&&l<=r){let f=this.group(l);f!==null&&(s+=f)}else s+=e.substring(i,i+1+u);i+=1+u}else if(c===k.CODES["<"]&&this.hasNamedGroups){let u=e.indexOf(">",i+2);if(u<0)s+="$<",i+=2;else{let l=e.substring(i+2,u);if(Object.hasOwn(this.namedGroups,l)){let B=this.group(l);B!==null&&(s+=B)}i=u+1}}else s+="$",i+=1}return s+e.substring(i)}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,r=!1){let s="";this.reset();let i=typeof e=="function",o=null;if(i){if(this.groupCount()>=xr.MAX_REPLACER_ARGS)throw new yt("Too many capture groups to safely invoke replacer function");o=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(s+=i?this.appendReplacementFunc(e,o):this.appendReplacement(e,r),!!t););return s+=this.appendTail(),s}appendReplacementFunc(e,t){let r="",s=this.start(),i=this.end();this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i;let o=this.matchArray();return o.push(s,t),this.hasNamedGroups&&o.push(this.namedGroupsObject()),r+=String(e(...o)),r}matchArray(){let e=[this.group(0)];for(let t=1;t<=this.patternGroupCount;t++){let r=this.group(t);e.push(r===null?void 0:r)}return e}namedGroupsObject(){if(!this.hasNamedGroups)return;let e=this.getNamedGroups();for(let t in e)e[t]===null&&(e[t]=void 0);return e}},V(xr,"MAX_REPLACER_ARGS",65535),xr),de,N=(de=class{static isRuneOp(e){return de.RUNE<=e&&e<=de.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let r of e)t+=q.escapeRune(r);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=new Int32Array(0),this.next=null}matchRune(e){if(this.runes.length===1){let o=this.runes[0];return this.arg&L.FOLD_CASE?z.equalsIgnoreCase(o,e):e===o}let t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return!1;if(e<=this.runes[o+1])return!0}return!1}let r=0,s=t>>1;for(;s>1;){let o=s>>1;r+=this.runes[r+o<<1]<=e?o:0,s-=o}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){let o=this.runes[0];return this.arg&L.FOLD_CASE?z.equalsIgnoreCase(o,e)?0:-1:e===o?0:-1}let t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return-1;if(e<=this.runes[o+1])return Math.floor(o/2)}return-1}let r=0,s=t>>1;for(;s>1;){let o=s>>1;r+=this.runes[r+o<<1]<=e?o:0,s-=o}r+=this.runes[r<<1]<=e?1:0;let i=r-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case de.ALT:return`alt -> ${this.out}, ${this.arg}`;case de.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case de.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case de.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case de.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case de.FAIL:return"fail";case de.NOP:return`nop -> ${this.out}`;case de.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case de.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case de.RUNE:return this.runes===null?"rune <null>":["rune ",de.escapeRunes(this.runes),this.arg&L.FOLD_CASE?"/i":""," -> ",this.out].join("");case de.RUNE1:return`rune1 ${de.escapeRunes(this.runes)} -> ${this.out}`;case de.RUNE_ANY:return`any -> ${this.out}`;case de.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},V(de,"ALT",1),V(de,"ALT_MATCH",2),V(de,"CAPTURE",3),V(de,"EMPTY_WIDTH",4),V(de,"FAIL",5),V(de,"MATCH",6),V(de,"NOP",7),V(de,"RUNE",8),V(de,"RUNE1",9),V(de,"RUNE_ANY",10),V(de,"RUNE_ANY_NOT_NL",11),V(de,"LB_WRITE",12),V(de,"LB_CHECK",13),de),Lr,pm=(Lr=class{constructor(e){this.sparse=new Int32Array(e),this.densePcs=new Int32Array(e),this.denseCaps=null,this.size=0,this.ncap=0,this.mainThreads=0}init(e){this.ncap=e;let t=Math.min(this.densePcs.length,Lr.INITIAL_THREADS)*e;(!this.denseCaps||this.denseCaps.length<t)&&(this.denseCaps=new Int32Array(t))}growCaps(e){let t=this.densePcs.length*this.ncap,r=new Int32Array(Math.min(t,Math.max(e,2*this.denseCaps.length)));r.set(this.denseCaps),this.denseCaps=r}contains(e){let t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return this.size===0}add(e){let t=this.size++;return this.sparse[e]=t,this.densePcs[t]=e,t}clear(){this.size=0,this.mainThreads=0}toString(){let e="{";for(let t=0;t<this.size;t++)t!==0&&(e+=", "),e+=this.densePcs[t];return e+="}",e}},V(Lr,"INITIAL_THREADS",32),Lr),gA=class{constructor(n){this.pos=-1,this.pcs=new Int32Array(n.numInst()),this.size=0,this.lbTable=new Int32Array(n.numLb+1)}reset(){this.pos=-1,this.size=0}},zm=class Wm{static fromRE2(e){let t=new Wm;return t.prog=e.prog,t.re2=e,t.q0=new pm(t.prog.numInst()),t.q1=new pm(t.prog.numInst()),t.addStack=new Int32Array(2*(t.prog.numInst()+1)),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.addStack=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?q.emptyInts():q.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,r,s=null){let i=this.re2.cond;if(i===q.EMPTY_ALL||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let o=this.prog.numLb>0,c=t,u=t,l=!1;o&&(s!==null&&s.pos>=0&&s.pos<=t?(u=s.pos,l=!0):u=0);let B=o&&s!==null,f=this.q0,g=this.q1,I=e.step(u),D=I>>3,O=I&7,M=-1,K=0;I!==mt.EOF()&&(I=e.step(u+O),M=I>>3,K=I&7);let $;for(u===0?$=q.emptyOpContext(-1,D):$=e.context(u),o&&(l?this.restoreLookbehinds(s,f,$):this.spawnLookbehinds(f,u,$));;){if(f.mainThreads===0){if(i&q.EMPTY_BEGIN_TEXT&&u!==0||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&u!==0||this.matched)break;if(this.prog.numLb===0&&f.isEmpty()&&this.re2.prefix.length!==0&&M!==this.re2.prefixRune&&e.canCheckPrefix()){let ot=e.index(this.re2,u);if(ot<0)break;u+=ot,I=e.step(u),D=I>>3,O=I&7,I=e.step(u+O),M=I>>3,K=I&7,$=e.context(u)}}u>=c&&(B&&(this.saveLookbehinds(s,f,u),B=!1),!this.matched&&(u===0||r===L.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=u),this.add(f,this.prog.start,u,this.matchcap,0,$)));let Be=u+O;if($=e.context(Be),this.step(f,g,u,Be,D,$,r,u===e.endPos()),O===0||this.ncap===0&&this.matched)break;u+=O,D=M,O=K,D!==-1&&(I=e.step(u+O),M=I>>3,K=I&7);let Oe=f;f=g,g=Oe}return f.clear(),g.clear(),this.matched}matchSet(e,t,r){let s=this.re2.cond;if(s===q.EMPTY_ALL)return[];if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,o=t,c=this.q0,u=this.q1,l=e.step(i),B=l>>3,f=l&7,g=-1,I=0;l!==mt.EOF()&&(l=e.step(i+f),g=l>>3,I=l&7);let D=i===0?q.emptyOpContext(-1,B):e.context(i),O=new Set;for(this.prog.numLb>0&&this.spawnLookbehinds(c,i,D);!(c.mainThreads===0&&(s&q.EMPTY_BEGIN_TEXT&&i!==0||(r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&i!==0));){(i===0||r===L.UNANCHORED)&&i>=o&&this.add(c,this.prog.start,i,this.matchcap,0,D);let M=i+f;D=e.context(M);for(let $=0;$<c.size;$++){let Be=c.densePcs[$],Oe=this.prog.inst[Be],ot=$*this.ncap,ve=!1;switch(Oe.op){case N.MATCH:if(r===L.ANCHOR_BOTH&&i!==e.endPos())break;O.add(Oe.arg);break;case N.RUNE:ve=Oe.matchRune(B);break;case N.RUNE1:ve=B===Oe.runes[0];break;case N.RUNE_ANY:ve=!0;break;case N.RUNE_ANY_NOT_NL:ve=B!==10;break;default:continue}ve&&this.add(u,Oe.out,M,c.denseCaps,ot,D)}if(c.clear(),f===0)break;i+=f,B=g,f=I,B!==-1&&(l=e.step(i+f),g=l>>3,I=l&7);let K=c;c=u,u=K}return u.clear(),Array.from(O).sort((M,K)=>M-K)}step(e,t,r,s,i,o,c,u){let l=this.re2.longest;for(let B=0;B<e.size;B++){let f=e.densePcs[B],g=B*this.ncap;if(l&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[g])continue;let I=this.prog.inst[f],D=!1;switch(I.op){case N.MATCH:if(c===L.ANCHOR_BOTH&&!u)break;if(this.ncap>0&&(!l||!this.matched||this.matchcap[1]<r)){e.denseCaps[g+1]=r;for(let O=0;O<this.ncap;O++)this.matchcap[O]=e.denseCaps[g+O]}l||(e.size=0),this.matched=!0;break;case N.RUNE:D=I.matchRune(i);break;case N.RUNE1:D=i===I.runes[0];break;case N.RUNE_ANY:D=!0;break;case N.RUNE_ANY_NOT_NL:D=i!==10;break;default:continue}D&&this.add(t,I.out,s,e.denseCaps,g,o)}e.clear()}spawnLookbehinds(e,t,r){for(let s=0;s<this.prog.lbStarts.length;s++)this.add(e,this.prog.lbStarts[s],t,this.matchcap,0,r)}restoreLookbehinds(e,t,r){this.lbTable.set(e.lbTable);for(let s=0;s<e.size;s++)this.add(t,e.pcs[s],e.pos,this.matchcap,0,r)}saveLookbehinds(e,t,r){let s=0;for(let i=0;i<t.size;i++){let o=t.densePcs[i];this.prog.lbInst[o]===1&&N.isRuneOp(this.prog.inst[o].op)&&(e.pcs[s++]=o)}e.size=s,e.pos=r,e.lbTable.set(this.lbTable)}add(e,t,r,s,i,o){let c=this.addStack,u=0;for(;;){for(;t!==0&&!e.contains(t);){let B=e.add(t),f=this.prog.inst[t];switch(f.op){case N.FAIL:t=0;break;case N.ALT:case N.ALT_MATCH:c[u++]=f.arg,c[u++]=0,t=f.out;break;case N.EMPTY_WIDTH:t=f.arg&~o?0:f.out;break;case N.NOP:t=f.out;break;case N.CAPTURE:f.arg<this.ncap&&(c[u++]=-f.arg-1,c[u++]=s[i+f.arg],s[i+f.arg]=r),t=f.out;break;case N.LB_WRITE:this.lbTable[Math.abs(f.arg)]=r,t=f.out;break;case N.LB_CHECK:f.arg>0?t=this.lbTable[f.arg]===r?f.out:0:t=this.lbTable[-f.arg]!==r?f.out:0;break;case N.MATCH:case N.RUNE:case N.RUNE1:case N.RUNE_ANY:case N.RUNE_ANY_NOT_NL:if(this.prog.lbInst[t]===0&&e.mainThreads++,this.ncap>0){let g=B*this.ncap;g+this.ncap>e.denseCaps.length&&e.growCaps(g+this.ncap);for(let I=0;I<this.ncap;I++)e.denseCaps[g+I]=s[i+I]}t=0;break;default:throw new Cc("unhandled")}}if(u===0)return;u-=2;let l=c[u];l<0?(s[i-l-1]=c[u+1],t=0):t=l}}},CA=(n,e,t)=>{let r=-2128831035;for(let s=0;s<n.length;s++)r^=n[s],r=Math.imul(r,16777619);r^=e,r=Math.imul(r,16777619);for(let s=0;s<t.length;s++)r^=t[s],r=Math.imul(r,16777619);return r},gm=(n,e)=>{if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0},Cm=(n,e,t,r)=>n.flag===t&&gm(n.nfaStates,e)&&gm(n.matchIDs,r),bh=[],so=-1,Bc=class{constructor(n,e,t){this.nfaStates=n,this.flag=e,this.isMatch=(e&xh.FLAG_MATCH)!==0,this.matchIDs=t,this.next=null,this.nextAnchored=null}},ge,xh=(ge=class{constructor(e,t=8388608){this.prog=e,this.maxMem=t,this.stateCache=new Map,this.stateCount=0,this.startStates=new Map,this.failed=!1;for(let r=0;r<e.numInst();r++){let s=e.getInst(r).op;if(s===N.LB_WRITE||s===N.LB_CHECK){this.failed=!0;break}}this.computeRuneClasses(),this.stateBudget=t,this.memBudget=t}computeRuneClasses(){let e=new Set,t=(s,i)=>{e.add(s),e.add(i+1)};for(let s=0;s<this.prog.numInst();s++){let i=this.prog.getInst(s);switch(i.op){case N.RUNE:case N.RUNE1:if(i.runes.length===1){if(t(i.runes[0],i.runes[0]),i.arg&L.FOLD_CASE)for(let o=z.simpleFold(i.runes[0]);o!==i.runes[0];o=z.simpleFold(o))t(o,o)}else for(let o=0;o<i.runes.length;o+=2)t(i.runes[o],i.runes[o+1]);break;case N.RUNE_ANY_NOT_NL:t(10,10);break;case N.EMPTY_WIDTH:i.arg&(q.EMPTY_BEGIN_LINE|q.EMPTY_END_LINE)&&t(10,10),i.arg&(q.EMPTY_WORD_BOUNDARY|q.EMPTY_NO_WORD_BOUNDARY)&&(t(48,57),t(65,90),t(95,95),t(97,122))}}e.delete(0),this.classBounds=Int32Array.from(e).sort(),this.numClasses=this.classBounds.length+1;let r=new Int32Array(z.MAX_LATIN1+1);for(let s=0;s<=z.MAX_LATIN1;s++)r[s]=this.searchClass(s);this.latin1Class=r}runeClass(e){return e<=z.MAX_LATIN1?this.latin1Class[e]:this.searchClass(e)}searchClass(e){let t=this.classBounds,r=0,s=t.length;for(;r<s;){let i=r+s>>1;t[i]<=e?r=i+1:s=i}return r}closure(e,t){let r=new Set,s=Array.from(e),i=0;for(;s.length>0;){let o=s.pop();if(o===0||r.has(o))continue;r.add(o);let c=this.prog.getInst(o);switch(c.op){case N.ALT:case N.ALT_MATCH:s.push(c.out),s.push(c.arg);break;case N.NOP:case N.CAPTURE:s.push(c.out);break;case N.EMPTY_WIDTH:i|=c.arg,c.arg&~t||s.push(c.out)}}return{pcs:Array.from(r).sort((o,c)=>o-c),needflags:i}}getState(e,t,r){let s=CA(e,t,r),i=this.stateCache.get(s);if(i instanceof Bc){if(Cm(i,e,t,r))return i}else if(i!==void 0){for(let u=0;u<i.length;u++)if(Cm(i[u],e,t,r))return i[u]}let o=ge.stateCost(e,r);if(this.memBudget<o)return null;this.memBudget-=o;let c=new Bc(e,t,r);return i===void 0?this.stateCache.set(s,c):i instanceof Bc?this.stateCache.set(s,[i,c]):i.push(c),this.stateCount++,c}static stateCost(e,t){let r=t.length===0?0:ge.ARRAY_OVERHEAD+ge.ELEMENT_SIZE*t.length;return ge.STATE_OVERHEAD+ge.ELEMENT_SIZE*e.length+r}*cachedStates(){for(let e of this.stateCache.values())e instanceof Bc?yield e:yield*e}makeState(e,t,r){let s=this.closure(e,t&ge.FLAG_EMPTY_MASK),i=t;return s.needflags===0&&(i&=ge.FLAG_MATCH),i|=s.needflags<<ge.FLAG_NEED_SHIFT,this.getState(s.pcs,i,r)}allocTable(e,t){let r=this.numClasses+1,s=ge.TABLE_OVERHEAD+ge.ELEMENT_SIZE*r;if(this.memBudget<s)return null;this.memBudget-=s;let i=new Array(r).fill(null);return t===L.UNANCHORED?e.next=i:e.nextAnchored=i,i}clearCache(){this.stateCache.clear(),this.stateCount=0,this.startStates.clear(),this.memBudget=this.stateBudget}resetCache(e){return this.clearCache(),this.getState(e.nfaStates,e.flag,e.matchIDs)}step(e,t,r,s){let i=s===L.UNANCHORED?e.next:e.nextAnchored;if(i!==null){let $=i[t];if($!==null)return $}else if(i=this.allocTable(e,s),i===null)return null;let o=e.flag>>>ge.FLAG_NEED_SHIFT,c=e.flag&ge.FLAG_EMPTY_MASK,u=c,l=0;r===10&&(u|=q.EMPTY_END_LINE,l|=q.EMPTY_BEGIN_LINE),r===so&&(u|=q.EMPTY_END_LINE|q.EMPTY_END_TEXT);let B=(e.flag&ge.FLAG_LAST_WORD)!==0,f=r!==so&&q.isWordRune(r);u|=f===B?q.EMPTY_NO_WORD_BOUNDARY:q.EMPTY_WORD_BOUNDARY;let g=e.nfaStates;u&~c&o&&(g=this.closure(g,u).pcs);let I=[],D=!1,O=bh;for(let $=0;$<g.length;$++){let Be=this.prog.getInst(g[$]);Be.op===N.MATCH?(D||(D=!0,O=[]),O.push(Be.arg)):r!==so&&N.isRuneOp(Be.op)&&Be.matchRune(r)&&I.push(Be.out)}O.length>1&&O.sort(($,Be)=>$-Be),s===L.UNANCHORED&&r!==so&&I.push(this.prog.start);let M=l;D&&(M|=ge.FLAG_MATCH),f&&(M|=ge.FLAG_LAST_WORD);let K=this.makeState(I,M,O);return K===null?null:(i[t]=K,K)}start(e,t){let r=e.context(t),s;if(r&q.EMPTY_BEGIN_TEXT)s=q.EMPTY_BEGIN_TEXT|q.EMPTY_BEGIN_LINE;else if(r&q.EMPTY_BEGIN_LINE)s=q.EMPTY_BEGIN_LINE;else{let o=e.step(t),c=o>=0&&q.isWordRune(o>>3);s=(r&q.EMPTY_WORD_BOUNDARY)!==0!==c?ge.FLAG_LAST_WORD:0}let i=this.startStates.get(s);if(i===void 0){if(i=this.makeState([this.prog.start],s,bh),i===null&&(this.clearCache(),i=this.makeState([this.prog.start],s,bh),i===null))return null;this.startStates.set(s,i)}return i}stepOrReset(e,t,r,s,i,o){let c=this.step(e,t,r,s);if(c!==null)return c;if(o.resetPos>=0&&i-o.resetPos<ge.PROGRESS_PER_STATE*this.stateCount)return null;o.resetPos=i;let u=this.resetCache(e);return u===null?null:(c=this.step(u,t,r,s),c)}run(e,t,r,s,i){let o=e.endPos(),c=this.latin1Class,u=r===L.UNANCHORED,l={resetPos:-1},B=t;for(;B<o;){let f=e.step(B),g=f>>3,I=f&7;if(I===0)break;let D=g<=z.MAX_LATIN1?c[g]:this.runeClass(g),O=u&&s.next!==null?s.next[D]:null;if(O===null&&(O=this.stepOrReset(s,D,g,r,B,l),O===null))return null;if(s=O,s.isMatch&&i(s,!1))return!0;if(!u&&s.nfaStates.length===0)return!1;B+=I}return s=this.stepOrReset(s,this.numClasses,so,r,B,l),s===null?null:s.isMatch&&i(s,!0)}match(e,t,r){if(this.failed)return null;if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return!1;let s=this.start(e,t);return s===null?null:this.run(e,t,r,s,(i,o)=>r!==L.ANCHOR_BOTH||o)}matchSet(e,t,r){if(this.failed)return null;if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return[];let s=this.start(e,t);if(s===null)return null;let i=new Set,o=(c,u)=>{if(r!==L.ANCHOR_BOTH||u)for(let l=0;l<c.matchIDs.length;l++)i.add(c.matchIDs[l]);return!1};return this.run(e,t,r,s,o)===null?null:Array.from(i).sort((c,u)=>c-u)}},V(ge,"FLAG_EMPTY_MASK",255),V(ge,"FLAG_MATCH",256),V(ge,"FLAG_LAST_WORD",512),V(ge,"FLAG_NEED_SHIFT",16),V(ge,"STATE_OVERHEAD",150),V(ge,"ARRAY_OVERHEAD",40),V(ge,"ELEMENT_SIZE",8),V(ge,"TABLE_OVERHEAD",48),V(ge,"PROGRESS_PER_STATE",10),ge),mA=32,EA=500,vh=256,_A=262144,yA=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array(vh),this.jobArg=new Uint8Array(vh),this.jobPos=new Int32Array(vh),this.jobLen=0,this.visited=new Uint32Array(0)}reset(n,e,t){this.end=e,this.jobLen=0,this.ncap=t;let r=n.numInst()*(e+1)+mA-1>>>5;this.visited.length<r?this.visited=new Uint32Array(r):this.visited.fill(0,0,r),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(n,e){let t=n*(this.end+1)+e,r=t>>>5,s=1<<(t&31);return this.visited[r]&s?!1:(this.visited[r]|=s,!0)}push(n,e,t,r){if(n.prog.getInst(e).op!==N.FAIL&&(r||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){let s=this.jobPc.length*2,i=new Int32Array(s);i.set(this.jobPc),this.jobPc=i;let o=new Uint8Array(s);o.set(this.jobArg),this.jobArg=o;let c=new Int32Array(s);c.set(this.jobPos),this.jobPos=c}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=r?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(n,e,t,r,s){let i=n.longest;for(this.push(n,t,r,!1);this.jobLen>0;){this.jobLen--;let o=this.jobPc[this.jobLen],c=this.jobArg[this.jobLen]===1,u=this.jobPos[this.jobLen],l=!0;for(;!(!l&&!this.shouldVisit(o,u));){l=!1;let B=n.prog.getInst(o);switch(B.op){case N.FAIL:break;case N.ALT:if(c){c=!1,o=B.arg;continue}else{this.push(n,o,u,!0),o=B.out;continue}case N.ALT_MATCH:{let f=n.prog.getInst(B.out);if(N.isRuneOp(f.op)){this.push(n,B.arg,u,!1),o=B.arg,u=this.end;continue}this.push(n,B.out,this.end,!1),o=B.out;continue}case N.RUNE:{let f=e.step(u);if(f===mt.EOF()||!B.matchRune(f>>3))break;u+=f&7,o=B.out;continue}case N.RUNE1:{let f=e.step(u);if(f===mt.EOF()||f>>3!==B.runes[0])break;u+=f&7,o=B.out;continue}case N.RUNE_ANY_NOT_NL:{let f=e.step(u);if(f===mt.EOF()||f>>3===10)break;u+=f&7,o=B.out;continue}case N.RUNE_ANY:{let f=e.step(u);if(f===mt.EOF())break;u+=f&7,o=B.out;continue}case N.CAPTURE:if(c){this.cap[B.arg]=u;break}else{B.arg<this.ncap&&(this.push(n,o,this.cap[B.arg],!0),this.cap[B.arg]=u),o=B.out;continue}case N.EMPTY_WIDTH:{let f=e.context(u);if(B.arg&~f)break;o=B.out;continue}case N.NOP:o=B.out;continue;case N.MATCH:{if(s===L.ANCHOR_BOTH&&u!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=u);let f=this.matchcap[1];if((f===-1||i&&u>0&&u>f)&&this.matchcap.set(this.cap),!i||u===this.end)return!0;break}case N.LB_WRITE:case N.LB_CHECK:throw new Cc("Backtracker cannot evaluate Lookbehind instructions");default:throw new Cc("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}},dc=[],fc=class $m{static shouldBacktrack(e){return e.numInst()<=EA}static maxBitStateLen(e){return $m.shouldBacktrack(e)?Math.floor(_A/e.numInst()):0}static execute(e,t,r,s,i){let o=e.cond;if(o===q.EMPTY_ALL||(s===L.ANCHOR_START||s===L.ANCHOR_BOTH)&&r!==0||o&q.EMPTY_BEGIN_TEXT&&r!==0)return null;let c=dc.length>0?dc.pop():new yA,u=t.endPos();c.reset(e.prog,u,i);let l=!1;if(o&q.EMPTY_BEGIN_TEXT||s===L.ANCHOR_START||s===L.ANCHOR_BOTH)c.ncap>0&&(c.cap[0]=r),c.tryBacktrack(e,t,e.prog.start,r,s)&&(l=!0);else{let f=-1;for(;r<=u&&f!==0;r+=f){if(e.prefix.length>0){let I=t.index(e,r);if(I<0)break;r+=I}if(c.ncap>0&&(c.cap[0]=r),c.tryBacktrack(e,t,e.prog.start,r,s)){l=!0;break}let g=t.step(r);f=g===mt.EOF()?0:g&7}}if(!l)return dc.push(c),null;let B=i===0?[]:q.toArray(c.matchcap.subarray(0,i));return dc.push(c),B}},mm=class{constructor(n){this.sparse=new Uint32Array(n),this.dense=new Uint32Array(n),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(n){return n<this.sparse.length&&this.sparse[n]<this.size&&this.dense[this.sparse[n]]===n}insert(n){this.contains(n)||this.insertNew(n)}insertNew(n){n>=this.sparse.length||(this.sparse[n]=this.size,this.dense[this.size]=n,this.size++)}},wA=(n,e,t,r)=>{let s=n.length,i=e.length,o=0,c=0,u=[],l=[],B=!0,f=-1,g=I=>{let D=I?n:e,O=I?o:c,M=I?t:r;return f>0&&D[O]<=u[f]?!1:(u.push(D[O],D[O+1]),I?o+=2:c+=2,f+=2,l.push(M),!0)};for(;o<s||c<i;)if(c>=i?B=g(!0):o>=s||e[c]<n[o]?B=g(!1):B=g(!0),!B)return null;return{merged:u,next:l}},IA=class{constructor(n){this.start=n.start,this.numCap=n.numCap,this.inst=new Array(n.inst.length);for(let e=0;e<n.inst.length;e++){let t=n.inst[e],r=new N(t.op);r.out=t.out,r.arg=t.arg,r.runes=t.runes?new Int32Array(t.runes):new Int32Array(0),r.next=null,this.inst[e]=r}}},DA=n=>{let e=new IA(n);for(let t=0;t<e.inst.length;t++){let r=e.inst[t];if(r.op!==N.ALT&&r.op!==N.ALT_MATCH)continue;let s="out",i="arg",o=e.inst[r[i]];if(o.op!==N.ALT&&o.op!==N.ALT_MATCH&&(s="arg",i="out",o=e.inst[r[i]],o.op!==N.ALT&&o.op!==N.ALT_MATCH))continue;let c=e.inst[r[s]];if(c.op===N.ALT||c.op===N.ALT_MATCH)continue;let u="out",l="arg",B=!1;o.out===t?B=!0:o.arg===t&&(B=!0,u="arg",l="out"),B&&(o[u]=r[s]),r[s]===o[u]&&(r[i]=o[l])}return e},TA=n=>{if(n.inst.length>=1e3)return null;let e=new mm(n.inst.length),t=new mm(n.inst.length),r=new Array(n.inst.length),s=new Array(n.inst.length).fill(!1),i=o=>{let c=!0,u=n.inst[o];if(t.contains(o))return!0;switch(t.insert(o),u.op){case N.ALT:case N.ALT_MATCH:{c=i(u.out)&&i(u.arg);let l=s[u.out],B=s[u.arg];if(l&&B)return!1;if(B){let D=u.out;u.out=u.arg,u.arg=D;let O=l;l=B,B=O}l&&(s[o]=!0,u.op=N.ALT_MATCH);let f=r[u.out]||[],g=r[u.arg]||[],I=wA(f,g,u.out,u.arg);if(!I)return!1;r[o]=new Int32Array(I.merged),u.next=new Uint32Array(I.next);break}case N.CAPTURE:case N.EMPTY_WIDTH:case N.NOP:c=i(u.out),s[o]=s[u.out],r[o]=r[u.out]?new Int32Array(r[u.out]):new Int32Array(0),u.next=new Uint32Array(Math.floor(r[o].length/2)+1).fill(u.out);break;case N.MATCH:case N.FAIL:s[o]=u.op===N.MATCH;break;case N.RUNE:{if(s[o]=!1,u.next&&u.next.length>0)break;if(e.insert(u.out),!u.runes||u.runes.length===0){r[o]=new Int32Array(0),u.next=new Uint32Array([u.out]);break}let l=[];if(u.runes.length===1&&u.arg&L.FOLD_CASE){let B=u.runes[0];l.push(B,B);for(let f=z.simpleFold(B);f!==B;f=z.simpleFold(f))l.push(f,f);l.sort((f,g)=>f-g)}else for(let B=0;B<u.runes.length;B++)l.push(u.runes[B]);r[o]=new Int32Array(l),u.next=new Uint32Array(Math.floor(l.length/2)+1).fill(u.out),u.op=N.RUNE;break}case N.RUNE1:{if(s[o]=!1,u.next&&u.next.length>0)break;e.insert(u.out);let l=[];if(u.arg&L.FOLD_CASE){let B=u.runes[0];l.push(B,B);for(let f=z.simpleFold(B);f!==B;f=z.simpleFold(f))l.push(f,f);l.sort((f,g)=>f-g)}else l.push(u.runes[0],u.runes[0]);r[o]=new Int32Array(l),u.next=new Uint32Array(Math.floor(l.length/2)+1).fill(u.out),u.op=N.RUNE;break}case N.RUNE_ANY:if(s[o]=!1,u.next&&u.next.length>0)break;e.insert(u.out),r[o]=new Int32Array([0,z.MAX_RUNE]),u.next=new Uint32Array([u.out]);break;case N.RUNE_ANY_NOT_NL:if(s[o]=!1,u.next&&u.next.length>0)break;e.insert(u.out),r[o]=new Int32Array([0,9,11,z.MAX_RUNE]),u.next=new Uint32Array(Math.floor(r[o].length/2)+1).fill(u.out)}return c};for(e.clear(),e.insert(n.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let o=0;o<n.inst.length;o++)r[o]&&(n.inst[o].runes=r[o]);return n},AA=(n,e)=>{for(let t=0;t<e.inst.length;t++){let r=e.inst[t];switch(r.op){case N.ALT:case N.ALT_MATCH:case N.RUNE:break;case N.CAPTURE:case N.EMPTY_WIDTH:case N.NOP:case N.MATCH:case N.FAIL:n.inst[t].next=null;break;case N.RUNE1:case N.RUNE_ANY:case N.RUNE_ANY_NOT_NL:n.inst[t].next=null,n.inst[t].op=r.op,n.inst[t].runes=r.runes?new Int32Array(r.runes):new Int32Array(0)}}},Em=class Qm{static compile(e){if(e.start===0||e.numLb>0)return null;let t=e.inst[e.start];if(t.op!==N.EMPTY_WIDTH||!(t.arg&q.EMPTY_BEGIN_TEXT))return null;let r=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===N.ALT||e.inst[i].op===N.ALT_MATCH){r=!0;break}for(let i=0;i<e.inst.length;i++){let o=e.inst[i],c=e.inst[o.out].op;switch(o.op){case N.ALT:case N.ALT_MATCH:if(c===N.MATCH||e.inst[o.arg].op===N.MATCH)return null;break;case N.EMPTY_WIDTH:if(c===N.MATCH){if((o.arg&q.EMPTY_END_TEXT)===q.EMPTY_END_TEXT)continue;return null}break;default:if(c===N.MATCH&&r)return null}}let s=DA(e);return s=TA(s),s!==null&&AA(s,e),s}static next(e,t){let r=e.matchRunePos(t);return r>=0?e.next[r]:e.op===N.ALT_MATCH?e.out:0}static execute(e,t,r,s,i){let o=e.onepass;if(!o)return null;let c=new Int32Array(i).fill(-1),u=!1,l=t.step(r),B=l>>3,f=l&7,g=mt.EOF(),I=-1,D=0;l!==mt.EOF()&&(g=t.step(r+f),g!==mt.EOF()&&(I=g>>3,D=g&7));let O=r===0?q.emptyOpContext(-1,B):t.context(r),M=o.start,K;for(;;){switch(K=o.inst[M],M=K.out,K.op){case N.MATCH:return s===L.ANCHOR_BOTH&&r!==t.endPos()?null:(u=!0,c.length>0&&(c[0]=0,c[1]=r),i===0?[]:q.toArray(c));case N.RUNE:if(!K.matchRune(B))return null;break;case N.RUNE1:if(B!==K.runes[0])return null;break;case N.RUNE_ANY:break;case N.RUNE_ANY_NOT_NL:if(B===10)return null;break;case N.ALT:case N.ALT_MATCH:M=Qm.next(K,B);continue;case N.FAIL:return null;case N.NOP:continue;case N.EMPTY_WIDTH:if(K.arg&~O)return null;continue;case N.CAPTURE:K.arg<c.length&&(c[K.arg]=r);continue;default:throw new Cc("bad inst")}if(f===0)break;O=q.emptyOpContext(B,I),r+=f,B=I,f=D,B!==-1&&(g=t.step(r+f),g!==mt.EOF()?(I=g>>3,D=g&7):(I=-1,D=0))}return u?i===0?[]:q.toArray(c):null}},X,w=(X=class{static isPseudoOp(e){return e>=X.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===k.CODES["-"]?"\\":""}static fromRegexp(e){let t=new X(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=X.emptySubs(),this.runes=new Int32Array(0),this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=X.emptySubs(),this.runes=new Int32Array(0),this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case X.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case X.Op.EMPTY_MATCH:e+="(?:)";break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:case X.Op.REPEAT:{let t=this.subs[0];switch(t.op>X.Op.CAPTURE||t.op===X.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case X.Op.STAR:e+="*";break;case X.Op.PLUS:e+="+";break;case X.Op.QUEST:e+="?";break;case X.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}"}this.flags&L.NON_GREEDY&&(e+="?");break}case X.Op.CONCAT:for(let t of this.subs)t.op===X.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case X.Op.ALTERNATE:{let t="";for(let r of this.subs)e+=t,t="|",e+=r.appendTo();break}case X.Op.LITERAL:this.flags&L.FOLD_CASE&&(e+="(?i:");for(let t of this.runes)e+=q.escapeRune(t);this.flags&L.FOLD_CASE&&(e+=")");break;case X.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case X.Op.ANY_CHAR:e+="(?s:.)";break;case X.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case X.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case X.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==X.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case X.Op.BEGIN_TEXT:e+="\\A";break;case X.Op.END_TEXT:this.flags&L.WAS_DOLLAR?e+="(?-m:$)":e+="\\z";break;case X.Op.BEGIN_LINE:e+="^";break;case X.Op.END_LINE:e+="$";break;case X.Op.WORD_BOUNDARY:e+="\\b";break;case X.Op.NO_WORD_BOUNDARY:e+="\\B";break;case X.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===z.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){let r=this.runes[t]+1,s=this.runes[t+1]-1;e+=X.quoteIfHyphen(r),e+=q.escapeRune(r),r!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=q.escapeRune(s))}}else for(let t=0;t<this.runes.length;t+=2){let r=this.runes[t],s=this.runes[t+1];e+=X.quoteIfHyphen(r),e+=q.escapeRune(r),r!==s&&(e+="-",e+=X.quoteIfHyphen(s),e+=q.escapeRune(s))}e+="]";break;default:e+=this.op}return e}maxCap(){let e=0;if(this.op===X.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){let r=t.maxCap();e<r&&(e=r)}return e}equals(e){if(!(e!==null&&e instanceof X)||this.op!==e.op)return!1;switch(this.op){case X.Op.END_TEXT:if((this.flags&L.WAS_DOLLAR)!==(e.flags&L.WAS_DOLLAR))return!1;break;case X.Op.LITERAL:case X.Op.CHAR_CLASS:if((this.flags&L.FOLD_CASE)!==(e.flags&L.FOLD_CASE))return!1;if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case X.Op.ALTERNATE:case X.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:if((this.flags&L.NON_GREEDY)!==(e.flags&L.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.REPEAT:if((this.flags&L.NON_GREEDY)!==(e.flags&L.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.PLB:case X.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1}return!0}},V(X,"Op",Jm(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),X),Lh=class{static walk(n,e){let t=[],r=n,s;for(;;){if(r.subs.length===0)s=e.leaf(r);else{let i=e.enter(r);if(i.result===void 0){t.push({re:r,state:i,i:0}),r=r.subs[0];continue}s=i.result}for(;;){if(t.length===0)return s;let i=t[t.length-1];if(e.child(i.re,i.state,s,i.i),i.i++,i.state.result===void 0&&i.i<i.re.subs.length){r=i.re.subs[i.i];break}t.pop(),s=i.state.result!==void 0?i.state.result:e.leave(i.re,i.state)}}}},_m=class{constructor(n,e){let t=new Map,r=[0],s=[0],i=[0],o=[0];for(let D of n){let O=0;for(let M=0;M<D.length;M++){let K=O*e+D[M],$=t.get(K);$===void 0&&($=r.length,t.set(K,$),r.push(O),s.push(D[M]),i.push(i[O]+1),o.push(0)),O=$}o[O]=1}let c=r.length,u=new Int32Array(c-1);for(let D=1;D<c;D++)u[D-1]=D;u.sort((D,O)=>r[D]-r[O]||s[D]-s[O]);let l=new Int32Array(c+1);for(let D=1;D<c;D++)l[r[D]+1]++;for(let D=0;D<c;D++)l[D+1]+=l[D];let B=new Int32Array(c-1);for(let D=0;D<u.length;D++)B[D]=s[u[D]];this.childStart=l,this.childUnit=B,this.childNode=u;let f=new Int32Array(c);for(let D=0;D<c;D++)f[D]=D;f.sort((D,O)=>i[D]-i[O]);let g=new Int32Array(c),I=Uint8Array.from(o);for(let D=1;D<c;D++){let O=f[D],M=r[O];if(M!==0){let K=g[M],$=this.next(K,s[O]);for(;$<0&&K!==0;)K=g[K],$=this.next(K,s[O]);g[O]=$>=0?$:0}I[O]|=I[g[O]]}this.fail=g,this.match=I}next(n,e){let t=this.childStart[n],r=this.childStart[n+1],s=this.childUnit;for(;t<r;){let i=t+r>>1,o=s[i];if(o===e)return this.childNode[i];o<e?t=i+1:r=i}return-1}advance(n,e){for(;;){let t=this.next(n,e);if(t>=0)return t;if(n===0)return 0;n=this.fail[n]}}searchUTF16(n,e,t){let r=0;for(let s=e;s<t;s++)if(r=this.advance(r,n.charCodeAt(s)),this.match[r]===1)return!0;return!1}searchUTF8(n,e,t){let r=0;for(let s=e;s<t;s++)if(r=this.advance(r,n[s]),this.match[r]===1)return!0;return!1}},Ot,ae=(Ot=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.cost=e===Ot.Type.EXACT?1:0,this.allExact=!1,this.ac16=null,this.ac8=null}automaton16(){if(this.ac16===null){let e=this.subs.map(t=>{let r=new Array(t.str.length);for(let s=0;s<t.str.length;s++)r[s]=t.str.charCodeAt(s);return r});this.ac16=new _m(e,65536)}return this.ac16}automaton8(){return this.ac8===null&&(this.ac8=new _m(this.subs.map(e=>e.bytes),256)),this.ac8}eval(e,t){switch(this.type){case Ot.Type.NONE:return!0;case Ot.Type.EXACT:return e.hasString(this,t);case Ot.Type.AND:for(let r=0;r<this.subs.length;r++)if(!this.subs[r].eval(e,t))return!1;return!0;case Ot.Type.OR:if(this.allExact)return e.hasAnyString(this,t);for(let r=0;r<this.subs.length;r++)if(this.subs[r].eval(e,t))return!0;return!1;default:return!0}}},V(Ot,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),V(Ot,"MAX_SCANS",32),V(Ot,"MAX_AC_UNITS",1<<18),Ot),$t,bA=($t=class{static build(e){return e?Lh.walk(e,$t.WALKER):new ae(ae.Type.NONE)}static leaf(e){if(e.op!==w.Op.LITERAL)return new ae(ae.Type.NONE);if(e.runes.length===0||e.flags&L.FOLD_CASE)return new ae(ae.Type.NONE);let t="";for(let s=0;s<e.runes.length;s++){if(z.isUnsearchable(e.runes[s]))return new ae(ae.Type.NONE);t+=String.fromCodePoint(e.runes[s])}let r=new ae(ae.Type.EXACT);return r.str=t,r.bytes=q.stringToUtf8ByteArray(r.str),r}static enter(e){switch(e.op){case w.Op.CAPTURE:case w.Op.PLUS:return{sub:null};case w.Op.REPEAT:return e.min>=1?{sub:null}:{result:new ae(ae.Type.NONE)};case w.Op.CONCAT:return{pf:new ae(ae.Type.AND),subs:[]};case w.Op.ALTERNATE:return{pf:new ae(ae.Type.OR),subs:[]};default:return{result:new ae(ae.Type.NONE)}}}static child(e,t,r){if(t.subs===void 0){t.sub=r;return}if(t.pf.type===ae.Type.AND){if(r.type===ae.Type.NONE)return;if(r.type===ae.Type.AND){for(let s=0;s<r.subs.length;s++)t.subs.push(r.subs[s]);return}t.subs.push(r);return}if(r.type===ae.Type.NONE){t.result=new ae(ae.Type.NONE);return}if(r.type===ae.Type.OR){for(let s=0;s<r.subs.length;s++)t.subs.push(r.subs[s]);return}t.subs.push(r)}static leave(e,t){if(t.subs===void 0)return t.sub;let r=t.pf,s=new Set,i=[];for(let l of t.subs){if(l.type===ae.Type.EXACT){if(s.has(l.str))continue;s.add(l.str)}i.push(l)}if(r.type===ae.Type.AND){let l=[],B=0;for(let f of i)B+f.cost>ae.MAX_SCANS||(l.push(f),B+=f.cost);return l.length===0?new ae(ae.Type.NONE):l.length===1?l[0]:(r.subs=l,r.cost=B,r)}if(i.length===0)return new ae(ae.Type.NONE);if(i.length===1)return i[0];r.subs=i;let o=!0,c=0,u=0;for(let l of i)l.type!==ae.Type.EXACT?o=!1:u+=l.bytes.length,c+=l.cost;return o?u>ae.MAX_AC_UNITS?new ae(ae.Type.NONE):(r.allExact=!0,r.cost=1,r):c>ae.MAX_SCANS?new ae(ae.Type.NONE):(r.cost=c,r)}},V($t,"WALKER",{leaf:e=>$t.leaf(e),enter:e=>$t.enter(e),child:(e,t,r)=>$t.child(e,t,r),leave:(e,t)=>$t.leave(e,t)}),$t),Vt=class{constructor(n=0,e=0){this.head=n,this.tail=e}},vA=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0,this.lbInst=null}getInst(n){return this.inst[n]}numInst(){return this.inst.length}addInst(n){this.inst.push(new N(n))}markLookbehindInsts(){let n=new Uint8Array(this.inst.length),e=this.lbStarts.slice();for(;e.length>0;){let t=e.pop();if(t===0||n[t]===1)continue;n[t]=1;let r=this.inst[t];switch(r.op){case N.ALT:case N.ALT_MATCH:e.push(r.out,r.arg);break;case N.MATCH:case N.FAIL:break;default:e.push(r.out)}}this.lbInst=n}skipNop(n){let e=this.inst[n];for(;e.op===N.NOP||e.op===N.CAPTURE;)e=this.inst[n],n=e.out;return e}prefix(){let n="",e=this.skipNop(this.start);if(!N.isRuneOp(e.op)||e.runes.length!==1)return[e.op===N.MATCH,n];for(;N.isRuneOp(e.op)&&e.runes.length===1&&!(e.arg&L.FOLD_CASE)&&!z.isUnsearchable(e.runes[0]);)n+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===N.MATCH,n]}startCond(){let n=0,e=this.start;e:for(;;){let t=this.inst[e];switch(t.op){case N.EMPTY_WIDTH:n|=t.arg;break;case N.FAIL:return-1;case N.CAPTURE:case N.NOP:break;default:break e}e=t.out}return n}patch(n,e){let t=n.head;for(;t!==0;){let r=this.inst[t>>1];t&1?(t=r.arg,r.arg=e):(t=r.out,r.out=e)}}append(n,e){if(n.head===0)return e;if(e.head===0)return n;let t=this.inst[n.tail>>1];return n.tail&1?t.arg=e.head:t.out=e.head,new Vt(n.head,e.tail)}toString(){let n="";for(let e=0;e<this.inst.length;e++){let t=n.length;n+=e,e===this.start&&(n+="*"),n+="        ".substring(n.length-t),n+=this.inst[e],n+=`
`}return n}},RA=new Int32Array([0,k.CODES[`
`]-1,k.CODES[`
`]+1,z.MAX_RUNE]),ym=new Int32Array([0,z.MAX_RUNE]),pc=class{constructor(n=0,e=new Vt,t=!1){this.i=n,this.out=e,this.nullable=t}},Ym=class Ph{static compileRegexp(e){let t=new Ph,r=t.compile(e);return t.prog.patch(r.out,t.newInst(N.MATCH).i),t.prog.start=r.i,t.prog.markLookbehindInsts(),t.prog}static compileSet(e){let t=new Ph;if(e.length===0)return t.prog.start=t.newInst(N.FAIL).i,t.prog.markLookbehindInsts(),t.prog;let r=[];for(let i=0;i<e.length;i++){t.lbOffset=t.prog.numLb;let o=t.compile(e[i]),c=t.newInst(N.MATCH);t.prog.getInst(c.i).arg=i,t.prog.patch(o.out,c.i),r.push(o.i)}let s=r[0];for(let i=1;i<r.length;i++){let o=t.newInst(N.ALT),c=t.prog.getInst(o.i);c.out=s,c.arg=r[i],s=o.i}return t.prog.start=s,t.prog.markLookbehindInsts(),t.prog}constructor(){this.prog=new vA,this.newInst(N.FAIL),this.lbOffset=0,this.runeCache=new Map,this.walker={leaf:e=>this.leaf(e),enter:e=>this.enter(e),child:(e,t,r)=>this.child(e,t,r),leave:(e,t)=>this.leave(e,t)}}newInst(e){return this.prog.addInst(e),new pc(this.prog.numInst()-1,new Vt,!0)}nop(){let e=this.newInst(N.NOP);return e.out=new Vt(e.i<<1,e.i<<1),e}fail(){return new pc}cap(e){let t=this.newInst(N.CAPTURE);return t.out=new Vt(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?(this.prog.patch(e.out,0),this.prog.patch(t.out,0),this.fail()):(this.prog.patch(e.out,t.i),new pc(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;let r=this.newInst(N.ALT),s=this.prog.getInst(r.i);return s.out=e.i,s.arg=t.i,r.out=this.prog.append(e.out,t.out),r.nullable=e.nullable||t.nullable,r}loop(e,t){let r=this.newInst(N.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new Vt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new Vt(r.i<<1|1,r.i<<1|1)),this.prog.patch(e.out,r.i),r}quest(e,t){if(e.i===0)return this.nop();let r=this.newInst(N.ALT),s=this.prog.getInst(r.i);return t?(s.arg=e.i,r.out=new Vt(r.i<<1,r.i<<1)):(s.out=e.i,r.out=new Vt(r.i<<1|1,r.i<<1|1)),r.out=this.prog.append(r.out,e.out),r}star(e,t){return e.i===0?this.nop():e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return e.i===0?this.fail():new pc(e.i,this.loop(e,t).out,e.nullable)}empty(e){let t=this.newInst(N.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new Vt(t.i<<1,t.i<<1),t}rune(e,t){let r=this.newInst(N.RUNE);r.nullable=!1;let s=this.prog.getInst(r.i);return s.runes=e,t&=L.FOLD_CASE,(e.length!==1||z.simpleFold(e[0])===e[0])&&(t&=~L.FOLD_CASE),s.arg=t,r.out=new Vt(r.i<<1,r.i<<1),!(t&L.FOLD_CASE)&&e.length===1||e.length===2&&e[0]===e[1]?s.op=N.RUNE1:e.length===2&&e[0]===0&&e[1]===z.MAX_RUNE?s.op=N.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===k.CODES[`
`]-1&&e[2]===k.CODES[`
`]+1&&e[3]===z.MAX_RUNE&&(s.op=N.RUNE_ANY_NOT_NL),r}lookBehind(e,t){let r=Math.sign(t)*(Math.abs(t)+this.lbOffset),s=this.newInst(N.LB_WRITE);this.prog.getInst(s.i).arg=r;let i=this.rune(ym,0),o=this.star(i,!0),c=this.cat(o,e);this.prog.patch(c.out,s.i);let u=this.newInst(N.LB_CHECK);return this.prog.getInst(u.i).arg=r,this.prog.lbStarts.push(c.i),Math.abs(r)>this.prog.numLb&&(this.prog.numLb=Math.abs(r)),u.out=new Vt(u.i<<1,u.i<<1),u}compile(e){return Lh.walk(e,this.walker)}leaf(e){switch(e.op){case w.Op.NO_MATCH:return this.fail();case w.Op.EMPTY_MATCH:return this.nop();case w.Op.LITERAL:{if(e.runes.length===0)return this.nop();let t=null;for(let r of e.runes){let s=this.runeCache.get(r);s===void 0&&(s=new Int32Array([r]),this.runeCache.set(r,s));let i=this.rune(s,e.flags);t=t===null?i:this.cat(t,i)}return t}case w.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case w.Op.ANY_CHAR_NOT_NL:return this.rune(RA,0);case w.Op.ANY_CHAR:return this.rune(ym,0);case w.Op.BEGIN_LINE:return this.empty(q.EMPTY_BEGIN_LINE);case w.Op.END_LINE:return this.empty(q.EMPTY_END_LINE);case w.Op.BEGIN_TEXT:return this.empty(q.EMPTY_BEGIN_TEXT);case w.Op.END_TEXT:return this.empty(q.EMPTY_END_TEXT);case w.Op.WORD_BOUNDARY:return this.empty(q.EMPTY_WORD_BOUNDARY);case w.Op.NO_WORD_BOUNDARY:return this.empty(q.EMPTY_NO_WORD_BOUNDARY);case w.Op.CONCAT:case w.Op.ALTERNATE:return this.nop();default:throw new oo("regexp: unhandled case in compile")}}enter(e){switch(e.op){case w.Op.PLB:case w.Op.NLB:case w.Op.STAR:case w.Op.PLUS:case w.Op.QUEST:return{sub:null};case w.Op.CAPTURE:return{bra:this.cap(e.cap<<1),sub:null};case w.Op.CONCAT:case w.Op.ALTERNATE:return{f:null};default:throw new oo("regexp: unhandled case in compile")}}child(e,t,r){e.op===w.Op.CONCAT?t.f=t.f===null?r:this.cat(t.f,r):e.op===w.Op.ALTERNATE?t.f=t.f===null?r:this.alt(t.f,r):t.sub=r}leave(e,t){switch(e.op){case w.Op.PLB:case w.Op.NLB:return this.lookBehind(t.sub,e.lb);case w.Op.CAPTURE:{let r=this.cap(e.cap<<1|1);return this.cat(this.cat(t.bra,t.sub),r)}case w.Op.STAR:return this.star(t.sub,(e.flags&L.NON_GREEDY)!==0);case w.Op.PLUS:return this.plus(t.sub,(e.flags&L.NON_GREEDY)!==0);case w.Op.QUEST:return this.quest(t.sub,(e.flags&L.NON_GREEDY)!==0);case w.Op.CONCAT:case w.Op.ALTERNATE:return t.f;default:throw new oo("regexp: unhandled case in compile")}}},xe,Xm=(xe=class{static simplify(e){return e===null?null:Lh.walk(e,xe.WALKER)}static leaf(e){if(e.op===w.Op.CHAR_CLASS){if(e.runes===null)return e;if(e.runes.length===0)return new w(w.Op.NO_MATCH);if(e.runes.length===2&&e.runes[0]===0&&e.runes[1]===z.MAX_RUNE)return new w(w.Op.ANY_CHAR);if(e.runes.length===4&&e.runes[0]===0&&e.runes[1]===k.CODES[`
`]-1&&e.runes[2]===k.CODES[`
`]+1&&e.runes[3]===z.MAX_RUNE)return new w(w.Op.ANY_CHAR_NOT_NL)}return e}static enter(e){switch(e.op){case w.Op.PLB:case w.Op.NLB:case w.Op.CAPTURE:case w.Op.STAR:case w.Op.PLUS:case w.Op.QUEST:return{sub:null};case w.Op.CONCAT:case w.Op.ALTERNATE:return{subs:[],changed:!1};case w.Op.REPEAT:return e.min===0&&e.max===0?{result:new w(w.Op.EMPTY_MATCH)}:{sub:null};default:return{result:e}}}static child(e,t,r,s){if(t.subs===void 0){t.sub=r;return}if(r!==e.subs[s]&&(t.changed=!0),e.op===w.Op.CONCAT){if(r.op===w.Op.NO_MATCH){t.result=new w(w.Op.NO_MATCH);return}if(r.op===w.Op.EMPTY_MATCH){t.changed=!0;return}if(r.op===w.Op.CONCAT){t.changed=!0;for(let i=0;i<r.subs.length;i++)t.subs.push(r.subs[i]);return}}else{if(r.op===w.Op.NO_MATCH){t.changed=!0;return}if(r.op===w.Op.ALTERNATE){t.changed=!0;for(let i=0;i<r.subs.length;i++)t.subs.push(r.subs[i]);return}}t.subs.push(r)}static leave(e,t){switch(e.op){case w.Op.PLB:case w.Op.NLB:case w.Op.CAPTURE:{let r=t.sub;if(r!==e.subs[0]){let s=w.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=[r],s}return e}case w.Op.CONCAT:case w.Op.ALTERNATE:if(t.changed){let r=t.subs;if(r.length===0)return new w(e.op===w.Op.CONCAT?w.Op.EMPTY_MATCH:w.Op.NO_MATCH);if(r.length===1)return r[0];let s=w.fromRegexp(e);return s.runes=new Int32Array(0),s.subs=r,s}return e;case w.Op.STAR:case w.Op.PLUS:case w.Op.QUEST:return xe.simplify1(e.op,e.flags,t.sub,e);case w.Op.REPEAT:return xe.simplifyRepeat(e,t.sub);default:return e}}static simplifyRepeat(e,t){if(e.max===-1){if(e.min===0)return xe.simplify1(w.Op.STAR,e.flags,t,null);if(e.min===1)return xe.simplify1(w.Op.PLUS,e.flags,t,null);let s=[];for(let i=0;i<e.min-1;i++)s.push(t);return s.push(xe.simplify1(w.Op.PLUS,e.flags,t,null)),xe.concat(s)}if(e.min===1&&e.max===1)return t;let r=null;if(e.min>0){r=[];for(let s=0;s<e.min;s++)r.push(t)}if(e.max>e.min){let s=xe.simplify1(w.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++)s=xe.simplify1(w.Op.QUEST,e.flags,xe.concat([t,s]),null);if(r===null)return s;r.push(s)}return r!==null?xe.concat(r):new w(w.Op.NO_MATCH)}static concat(e){let t=[];for(let s=0;s<e.length;s++){let i=e[s];if(i.op===w.Op.NO_MATCH)return new w(w.Op.NO_MATCH);if(i.op!==w.Op.EMPTY_MATCH){if(i.op===w.Op.CONCAT){for(let o=0;o<i.subs.length;o++)t.push(i.subs[o]);continue}t.push(i)}}if(t.length===0)return new w(w.Op.EMPTY_MATCH);if(t.length===1)return t[0];let r=new w(w.Op.CONCAT);return r.subs=t,r}static simplify1(e,t,r,s){if(r.op===w.Op.EMPTY_MATCH)return r;if(r.op===w.Op.NO_MATCH)return e===w.Op.PLUS?r:new w(w.Op.EMPTY_MATCH);if(e===r.op&&(t&L.NON_GREEDY)===(r.flags&L.NON_GREEDY))return r;if(s!==null&&s.op===e&&(s.flags&L.NON_GREEDY)===(t&L.NON_GREEDY)&&r===s.subs[0])return s;let i=new w(e);return i.flags=t,i.subs=[r],i}},V(xe,"WALKER",{leaf:e=>xe.leaf(e),enter:e=>xe.enter(e),child:(e,t,r,s)=>xe.child(e,t,r,s),leave:(e,t)=>xe.leave(e,t)}),xe),fe=class{constructor(n,e){this.sign=n,this.cls=e}},wm=[48,57],Im=[9,10,12,13,32,32],Dm=[48,57,65,90,95,95,97,122],Tm=new Map([["\\d",new fe(1,wm)],["\\D",new fe(-1,wm)],["\\s",new fe(1,Im)],["\\S",new fe(-1,Im)],["\\w",new fe(1,Dm)],["\\W",new fe(-1,Dm)]]),Am=[48,57,65,90,97,122],bm=[65,90,97,122],vm=[0,127],Rm=[9,9,32,32],Sm=[0,31,127,127],Om=[48,57],Pm=[33,126],Nm=[97,122],xm=[32,126],Lm=[33,47,58,64,91,96,123,126],km=[9,13,32,32],Fm=[65,90],Vm=[48,57,65,90,95,95,97,122],Mm=[48,57,65,70,97,102],Gm=new Map([["[:alnum:]",new fe(1,Am)],["[:^alnum:]",new fe(-1,Am)],["[:alpha:]",new fe(1,bm)],["[:^alpha:]",new fe(-1,bm)],["[:ascii:]",new fe(1,vm)],["[:^ascii:]",new fe(-1,vm)],["[:blank:]",new fe(1,Rm)],["[:^blank:]",new fe(-1,Rm)],["[:cntrl:]",new fe(1,Sm)],["[:^cntrl:]",new fe(-1,Sm)],["[:digit:]",new fe(1,Om)],["[:^digit:]",new fe(-1,Om)],["[:graph:]",new fe(1,Pm)],["[:^graph:]",new fe(-1,Pm)],["[:lower:]",new fe(1,Nm)],["[:^lower:]",new fe(-1,Nm)],["[:print:]",new fe(1,xm)],["[:^print:]",new fe(-1,xm)],["[:punct:]",new fe(1,Lm)],["[:^punct:]",new fe(-1,Lm)],["[:space:]",new fe(1,km)],["[:^space:]",new fe(-1,km)],["[:upper:]",new fe(1,Fm)],["[:^upper:]",new fe(-1,Fm)],["[:word:]",new fe(1,Vm)],["[:^word:]",new fe(-1,Vm)],["[:xdigit:]",new fe(1,Mm)],["[:^xdigit:]",new fe(-1,Mm)]]),Or=class gc{static charClassToString(e,t){let r="[";for(let s=0;s<t;s+=2){s>0&&(r+=" ");let i=e[s],o=e[s+1];i===o?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${o.toString(16)}`}return r+="]",r}static sortRanges(e,t){let r=t>>1,s=new Array(r);for(let o=0;o<r;o++)s[o]=o;s.sort((o,c)=>e[2*o]-e[2*c]||e[2*c+1]-e[2*o+1]);let i=e.slice(0,t);for(let o=0;o<r;o++)e[2*o]=i[2*s[o]],e[2*o+1]=i[2*s[o]+1]}constructor(e=q.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.r instanceof Int32Array?this.len===this.r.length?this.r:this.r.subarray(0,this.len):new Int32Array(this.len===this.r.length?this.r:this.r.slice(0,this.len))}toGrowableArray(){return Array.isArray(this.r)?(this.r.length=this.len,this.r):Array.from(this.r.subarray(0,this.len))}cleanClass(){if(this.len<4)return this;gc.sortRanges(this.r,this.len);let e=2;for(let t=2;t<this.len;t+=2){let r=this.r[t],s=this.r[t+1];if(r<=this.r[e-1]+1){s>this.r[e-1]&&(this.r[e-1]=s);continue}this.r[e]=r,this.r[e+1]=s,e+=2}return this.len=e,this}appendLiteral(e,t){return t&L.FOLD_CASE?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){let s=this.r[this.len-r],i=this.r[this.len-r+1];if(e<=i+1&&s<=t+1)return e<s&&(this.r[this.len-r]=e),t>i&&(this.r[this.len-r+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=z.MIN_FOLD&&t>=z.MAX_FOLD)return this.appendRange(e,t);if(t<z.MIN_FOLD||e>z.MAX_FOLD)return this.appendRange(e,t);e<z.MIN_FOLD&&(this.appendRange(e,z.MIN_FOLD-1),e=z.MIN_FOLD),t>z.MAX_FOLD&&(this.appendRange(z.MAX_FOLD+1,t),t=z.MAX_FOLD);for(let r=e;r<=t;r++){this.appendRange(r,r);for(let s=z.simpleFold(r);s!==r;s=z.simpleFold(s))this.appendRange(s,s)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let r=0;r<e.length;r+=2){let s=e[r],i=e[r+1];t<=s-1&&this.appendRange(t,s-1),t=i+1}return t<=z.MAX_RUNE&&this.appendRange(t,z.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){let r=e.getLo(t),s=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(r,s);continue}for(let o=r;o<=s;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(e){let t=0;for(let r=0;r<e.length;++r){let s=e.getLo(r),i=e.getHi(r),o=e.getStride(r);if(o===1){t<=s-1&&this.appendRange(t,s-1),t=i+1;continue}for(let c=s;c<=i;c+=o)t<=c-1&&this.appendRange(t,c-1),t=c+1}return t<=z.MAX_RUNE&&this.appendRange(t,z.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let r=0;r<this.len;r+=2){let s=this.r[r],i=this.r[r+1];e<=s-1&&(this.r[t]=e,this.r[t+1]=s-1,t+=2),e=i+1}return this.len=t,e<=z.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=z.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let r=e.cls;return t&&(r=new gc().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,e.sign)}toString(){return gc.charClassToString(this.r,this.len)}},SA=class{constructor(n){this.str=n,this.position=0}pos(){return this.position}rewindTo(n){this.position=n}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(n){this.position+=n}skipString(n){this.position+=n.length}pop(){let n=this.str.codePointAt(this.position);return this.position+=q.charCount(n),n}lookingAt(n){return this.str.startsWith(n,this.position)}rest(){return this.str.substring(this.position)}from(n){return this.str.substring(n,this.position)}toString(){return this.rest()}},U,io=(U=class{static unicodeTable(e){return e==="Any"?{tab:U.ANY_TABLE,fold:U.ANY_TABLE,sign:1}:e==="Ascii"?{tab:U.ASCII_TABLE,fold:U.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:St.CATEGORIES.get("Cn"),fold:St.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:St.CATEGORIES.get("LC"),fold:St.FOLD_CATEGORIES.get("LC"),sign:1}:St.CATEGORIES.has(e)?{tab:St.CATEGORIES.get(e),fold:St.FOLD_CATEGORIES.get(e),sign:1}:St.SCRIPTS.has(e)?{tab:St.SCRIPTS.get(e),fold:St.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<z.MIN_FOLD||e>z.MAX_FOLD)return e;let t=e,r=e;for(e=z.simpleFold(e);e!==r;e=z.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===w.Op.EMPTY_MATCH)return null;if(e.op===w.Op.CONCAT&&e.subs.length>0){let t=e.subs[0];return t.op===w.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){let r=new w(w.Op.LITERAL);return r.flags=t,r.runes=q.stringToRunes(e),r}static parse(e,t){return new U(e,t).parseInternal()}static parseRepeat(e){let t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);let r=U.parseInt(e);if(r===-1||!e.more())return-1;let s;if(!e.lookingAt(","))s=r;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))s=-1;else if((s=U.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new De(U.ERR_INVALID_REPEAT_SIZE,e.from(t));return r<<16|s&z.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){let r=e.codePointAt(t);if(r!==k.CODES._&&!q.isalnum(r))return!1}return!0}static parseInt(e){let t=e.pos();for(;e.more()&&e.peek()>=k.CODES[0]&&e.peek()<=k.CODES[9];)e.skip(1);let r=e.from(t);return r.length===0||r.length>1&&r.codePointAt(0)===k.CODES[0]?-1:r.length>8?-2:parseInt(r,10)}static isCharClass(e){return e.op===w.Op.LITERAL&&e.runes.length===1||e.op===w.Op.CHAR_CLASS||e.op===w.Op.ANY_CHAR_NOT_NL||e.op===w.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case w.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case w.Op.CHAR_CLASS:for(let r=0;r<e.runes.length;r+=2)if(e.runes[r]<=t&&t<=e.runes[r+1])return!0;return!1;case w.Op.ANY_CHAR_NOT_NL:return t!==k.CODES[`
`];case w.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case w.Op.ANY_CHAR:break;case w.Op.ANY_CHAR_NOT_NL:U.matchRune(t,k.CODES[`
`])&&(e.op=w.Op.ANY_CHAR);break;case w.Op.CHAR_CLASS:{let r=new Or(Array.isArray(e.runes)?e.runes:Array.from(e.runes));t.op===w.Op.LITERAL?r.appendLiteral(t.runes[0],t.flags):r.appendClass(t.runes),e.runes=r.toGrowableArray();break}case w.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=w.Op.CHAR_CLASS,e.runes=new Or().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toGrowableArray()}}static parseEscape(e){let t=e.pos();if(e.skip(1),!e.more())throw new De(U.ERR_TRAILING_BACKSLASH);let r=e.pop();e:switch(r){case k.CODES[1]:case k.CODES[2]:case k.CODES[3]:case k.CODES[4]:case k.CODES[5]:case k.CODES[6]:case k.CODES[7]:if(!e.more()||e.peek()<k.CODES[0]||e.peek()>k.CODES[7])break;case k.CODES[0]:{let s=r-k.CODES[0];for(let i=1;i<3&&!(!e.more()||e.peek()<k.CODES[0]||e.peek()>k.CODES[7]);i++)s=s*8+e.peek()-k.CODES[0],e.skip(1);return s}case k.CODES.x:{if(!e.more())break;if(r=e.pop(),r===k.CODES["{"]){let o=0,c=0;for(;;){if(!e.more())break e;if(r=e.pop(),r===k.CODES["}"])break;let u=q.unhex(r);if(u<0||(c=c*16+u,c>z.MAX_RUNE))break e;o++}if(o===0)break e;return c}let s=q.unhex(r);if(!e.more())break;r=e.pop();let i=q.unhex(r);if(s<0||i<0)break;return s*16+i}case k.CODES.a:return k.CODES["\x07"];case k.CODES.f:return k.CODES["\f"];case k.CODES.n:return k.CODES[`
`];case k.CODES.r:return k.CODES["\r"];case k.CODES.t:return k.CODES["	"];case k.CODES.v:return k.CODES["\v"];default:if(r<=z.MAX_ASCII&&!q.isalnum(r))return r}throw new De(U.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new De(U.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?U.parseEscape(e):e.pop()}static hasCapture(e){if(e===null)return!1;if(e.op===w.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if(U.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new w(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>U.MAX_RUNES)throw new De(U.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===w.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor(U.MAX_SIZE/this.repeats)?this.repeats=U.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor(U.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>U.MAX_SIZE)throw new De(U.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let r=0;switch(e.op){case w.Op.LITERAL:r=e.runes.length;break;case w.Op.PLB:case w.Op.NLB:case w.Op.CAPTURE:case w.Op.STAR:r=2+this.calcSize(e.subs[0]);break;case w.Op.PLUS:case w.Op.QUEST:r=1+this.calcSize(e.subs[0]);break;case w.Op.CONCAT:for(let s of e.subs)r=r+this.calcSize(s);break;case w.Op.ALTERNATE:for(let s of e.subs)r=r+this.calcSize(s);e.subs.length>1&&(r=r+e.subs.length-1);break;case w.Op.REPEAT:{let s=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?r=2+s:r=1+e.min*s;break}r=e.max*s+(e.max-e.min);break}}return r=Math.max(1,r),this.size===null&&(this.size=new Map),this.size.set(e,r),r}checkHeight(e){if(!(this.numRegexp<U.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>U.MAX_HEIGHT)throw new De(U.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let r=1;for(let s of e.subs){let i=this.calcHeight(s);r<1+i&&(r=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,r),r}pop(){return this.stack.pop()}popToPseudo(){let e=this.stack.length,t=e;for(;t>0&&!w.isPseudoOp(this.stack[t-1].op);)t--;return this.stack.splice(t,e-t)}push(e){if(this.numRunes+=e.runes.length,e.op===w.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&~L.FOLD_CASE))return null;e.op=w.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&~L.FOLD_CASE}else if(e.op===w.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&z.simpleFold(e.runes[0])===e.runes[2]&&z.simpleFold(e.runes[2])===e.runes[0]||e.op===w.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&z.simpleFold(e.runes[0])===e.runes[1]&&z.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|L.FOLD_CASE))return null;e.op=w.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|L.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){let r=this.stack.length;if(r<2)return!1;let s=this.stack[r-1],i=this.stack[r-2];if(s.op!==w.Op.LITERAL||i.op!==w.Op.LITERAL||(s.flags&L.FOLD_CASE)!==(i.flags&L.FOLD_CASE))return!1;Array.isArray(i.runes)||(i.runes=Array.from(i.runes));for(let o=0;o<s.runes.length;o++)i.runes.push(s.runes[o]);return e>=0?(s.runes=[e],s.flags=t,!0):(this.pop(),this.reuse(s),!1)}newLiteral(e,t){let r=this.newRegexp(w.Op.LITERAL);return r.flags=t,t&L.FOLD_CASE&&(e=U.minFoldRune(e)),r.runes=[e],r}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){let t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,r,s,i,o){let c=this.flags;if(c&L.PERL_X&&(i.more()&&i.lookingAt("?")&&(i.skip(1),c^=L.NON_GREEDY),o!==-1))throw new De(U.ERR_INVALID_REPEAT_OP,i.from(o));let u=this.stack.length;if(u===0)throw new De(U.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let l=this.stack[u-1];if(w.isPseudoOp(l.op))throw new De(U.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));let B=this.newRegexp(e);if(B.min=t,B.max=r,B.flags=c,B.subs=[l],this.stack[u-1]=B,this.checkLimits(B),e===w.Op.REPEAT&&(t>=2||r>=2)&&!this.repeatIsValid(B,1e3))throw new De(U.ERR_INVALID_REPEAT_SIZE,i.from(s))}repeatIsValid(e,t){if(e.op===w.Op.REPEAT){let r=e.max;if(r===0)return!0;if(r<0&&(r=e.min),r>t)return!1;r>0&&(t=Math.trunc(t/r))}for(let r of e.subs)if(!this.repeatIsValid(r,t))return!1;return!0}concat(){this.maybeConcat(-1,0);let e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(w.Op.EMPTY_MATCH)):this.push(this.collapse(e,w.Op.CONCAT))}alternate(){let e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(w.Op.NO_MATCH)):this.push(this.collapse(e,w.Op.ALTERNATE))}cleanAlt(e){e.op===w.Op.CHAR_CLASS&&(e.runes=new Or(Array.from(e.runes)).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===z.MAX_RUNE?(e.runes=new Int32Array(0),e.op=w.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===k.CODES[`
`]-1&&e.runes[2]===k.CODES[`
`]+1&&e.runes[3]===z.MAX_RUNE&&(e.runes=new Int32Array(0),e.op=w.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let r=0;for(let c of e)r+=c.op===t?c.subs.length:1;let s=new Array(r).fill(null),i=0;for(let c of e)if(c.op===t){for(let u=0;u<c.subs.length;u++)s[i++]=c.subs[u];this.reuse(c)}else s[i++]=c;let o=this.newRegexp(t);if(o.subs=s,t===w.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){let c=o;o=o.subs[0],this.reuse(c)}return o}factor(e){if(e.length<2)return e;let t=0,r=e.length,s=0,i=null,o=0,c=0,u=0;for(let B=0;B<=r;B++){let f=null,g=0,I=0;if(B<r){let D=e[t+B];if(D.op===w.Op.CONCAT&&D.subs.length>0&&(D=D.subs[0]),D.op===w.Op.LITERAL&&(f=D.runes,g=D.runes.length,I=D.flags&L.FOLD_CASE),I===c){let O=0;for(;O<o&&O<g&&i[O]===f[O];)O++;if(O>0){o=O;continue}}}if(B!==u)if(B===u+1)e[s++]=e[t+u];else{let D=this.newRegexp(w.Op.LITERAL);D.flags=c,D.runes=i.slice(0,o);for(let K=u;K<B;K++)e[t+K]=this.removeLeadingString(e[t+K],o),this.checkLimits(e[t+K]);let O=this.collapse(e.slice(t+u,t+B),w.Op.ALTERNATE),M=this.newRegexp(w.Op.CONCAT);M.subs=[D,O],e[s++]=M}u=B,i=f,o=g,c=I}r=s,t=0,u=0,s=0;let l=null;for(let B=0;B<=r;B++){let f=null;if(!(B<r&&(f=U.leadingRegexp(e[t+B]),l!==null&&l.equals(f)&&(U.isCharClass(l)||l.op===w.Op.REPEAT&&l.min===l.max&&U.isCharClass(l.subs[0]))))){if(B!==u)if(B===u+1)e[s++]=e[t+u];else{let g=l;for(let O=u;O<B;O++){let M=O!==u;e[t+O]=this.removeLeadingRegexp(e[t+O],M),this.checkLimits(e[t+O])}let I=this.collapse(e.slice(t+u,t+B),w.Op.ALTERNATE),D=this.newRegexp(w.Op.CONCAT);D.subs=[g,I],e[s++]=D}u=B,l=f}}r=s,t=0,u=0,s=0;for(let B=0;B<=r;B++)if(!(B<r&&U.isCharClass(e[t+B]))){if(B!==u)if(B===u+1)e[s++]=e[t+u];else{let f=u;for(let I=u+1;I<B;I++){let D=e[t+f],O=e[t+I];(D.op<O.op||D.op===O.op&&(D.runes!==null?D.runes.length:0)<(O.runes!==null?O.runes.length:0))&&(f=I)}let g=e[t+u];e[t+u]=e[t+f],e[t+f]=g;for(let I=u+1;I<B;I++)U.mergeCharClass(e[t+u],e[t+I]),this.reuse(e[t+I]);this.cleanAlt(e[t+u]),e[s++]=e[t+u]}B<r&&(e[s++]=e[t+B]),u=B+1}r=s,t=0,u=0,s=0;for(let B=0;B<r;++B)B+1<r&&e[t+B].op===w.Op.EMPTY_MATCH&&e[t+B+1].op===w.Op.EMPTY_MATCH||(e[s++]=e[t+B]);return r=s,t=0,e.slice(t,r)}removeLeadingString(e,t){if(e.op===w.Op.CONCAT&&e.subs.length>0){let r=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=r,r.op===w.Op.EMPTY_MATCH)switch(this.reuse(r),e.subs.length){case 0:case 1:e.op=w.Op.EMPTY_MATCH,e.subs=w.emptySubs();break;case 2:{let s=e;e=e.subs[1],this.reuse(s);break}default:e.subs=e.subs.slice(1,e.subs.length)}return e}return e.op===w.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=w.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===w.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=w.Op.EMPTY_MATCH,e.subs=w.emptySubs();break;case 1:{let r=e;e=e.subs[0],this.reuse(r);break}}return e}return t&&this.reuse(e),this.newRegexp(w.Op.EMPTY_MATCH)}parseInternal(){if(this.flags&L.LITERAL)return U.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,r=-1,s=new SA(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case k.CODES["("]:if(this.flags&L.LOOKBEHIND){if(s.lookingAt("(?<=")){this.parsePosLookBehind(),s.skip(4);break}if(s.lookingAt("(?<!")){this.parseNegLookBehind(),s.skip(4);break}}if(this.flags&L.PERL_X&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(w.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case k.CODES["|"]:this.parseVerticalBar(),s.skip(1);break;case k.CODES[")"]:this.parseRightParen(),s.skip(1);break;case k.CODES["^"]:this.flags&L.ONE_LINE?this.op(w.Op.BEGIN_TEXT):this.op(w.Op.BEGIN_LINE),s.skip(1);break;case k.CODES.$:this.flags&L.ONE_LINE?this.op(w.Op.END_TEXT).flags|=L.WAS_DOLLAR:this.op(w.Op.END_LINE),s.skip(1);break;case k.CODES["."]:this.flags&L.DOT_NL?this.op(w.Op.ANY_CHAR):this.op(w.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case k.CODES["["]:this.parseClass(s);break;case k.CODES["*"]:case k.CODES["+"]:case k.CODES["?"]:{i=s.pos();let o=null;switch(s.pop()){case k.CODES["*"]:o=w.Op.STAR;break;case k.CODES["+"]:o=w.Op.PLUS;break;case k.CODES["?"]:o=w.Op.QUEST}this.repeat(o,t,r,i,s,e);break}case k.CODES["{"]:{let o=s.pos(),c=U.parseRepeat(s);if(c<0){s.rewindTo(o),this.literal(s.pop());break}i=o,t=c>>16,r=(c&z.MAX_BMP)<<16>>16,this.repeat(w.Op.REPEAT,t,r,i,s,e);break}case k.CODES["\\"]:{let o=s.pos();if(s.skip(1),this.flags&L.PERL_X&&s.more())switch(s.pop()){case k.CODES.A:this.op(w.Op.BEGIN_TEXT);break e;case k.CODES.b:this.op(w.Op.WORD_BOUNDARY);break e;case k.CODES.B:this.op(w.Op.NO_WORD_BOUNDARY);break e;case k.CODES.C:throw new De(U.ERR_INVALID_ESCAPE,"\\C");case k.CODES.Q:{let l=s.rest(),B=l.indexOf("\\E");B>=0?(l=l.substring(0,B),s.skipString(l),s.skipString("\\E")):s.skipString(l);let f=0;for(;f<l.length;){let g=l.codePointAt(f);this.literal(g),f+=q.charCount(g)}break e}case k.CODES.z:this.op(w.Op.END_TEXT);break e;default:s.rewindTo(o)}else s.rewindTo(o);let c=this.newRegexp(w.Op.CHAR_CLASS);if(c.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){let l=new Or;if(this.parseUnicodeClass(s,l)){c.runes=l.toArray(),this.push(c);break e}}let u=new Or;if(this.parsePerlClassEscape(s,u)){c.runes=u.toArray(),this.push(c);break e}s.rewindTo(o),this.reuse(c),this.literal(U.parseEscape(s));break}default:this.literal(s.pop())}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new De(U.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){let t=e.pos(),r=e.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){let c=r.charAt(2)==="P"?4:3,u=r.indexOf(">");if(u<0)throw new De(U.ERR_INVALID_NAMED_CAPTURE,r);let l=r.substring(c,u);if(e.skipString(l),e.skip(c+1),!U.isValidCaptureName(l))throw new De(U.ERR_INVALID_NAMED_CAPTURE,r.substring(0,u+1));let B=this.op(w.Op.LEFT_PAREN);if(B.cap=++this.numCap,this.namedGroups[l])throw new De(U.ERR_DUPLICATE_NAMED_CAPTURE,l);this.namedGroups[l]=this.numCap,B.name=l;return}e.skip(2);let s=this.flags,i=1,o=!1;e:for(;e.more();){let c=e.pop();switch(c){case k.CODES.i:s|=L.FOLD_CASE,o=!0;break;case k.CODES.m:s&=~L.ONE_LINE,o=!0;break;case k.CODES.s:s|=L.DOT_NL,o=!0;break;case k.CODES.U:s|=L.NON_GREEDY,o=!0;break;case k.CODES["-"]:if(i<0)break e;i=-1,s=~s,o=!1;break;case k.CODES[":"]:case k.CODES[")"]:if(i<0){if(!o)break e;s=~s}c===k.CODES[":"]&&this.op(w.Op.LEFT_PAREN),this.flags=s;return;default:break e}}throw new De(U.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){let e=this.newRegexp(w.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){let e=this.newRegexp(w.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(w.Op.VERTICAL_BAR)}swapVerticalBar(){let e=this.stack.length;if(e>=3&&this.stack[e-2].op===w.Op.VERTICAL_BAR&&U.isCharClass(this.stack[e-1])&&U.isCharClass(this.stack[e-3])){let t=this.stack[e-1],r=this.stack[e-3];if(t.op>r.op){let s=r;r=t,t=s,this.stack[e-3]=r}return U.mergeCharClass(r,t),this.reuse(t),this.pop(),!0}if(e>=2){let t=this.stack[e-1],r=this.stack[e-2];if(r.op===w.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new De(U.ERR_UNEXPECTED_PAREN,this.wholeRegexp);let e=this.pop(),t=this.pop();if(t.op!==w.Op.LEFT_PAREN)throw new De(U.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if(U.hasCapture(e))throw new De(U.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=w.Op.PLB:t.op=w.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=w.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){let r=e.pos();if(!(this.flags&L.PERL_X)||!e.more()||e.pop()!==k.CODES["\\"]||!e.more())return!1;e.pop();let s=e.from(r),i=Tm.has(s)?Tm.get(s):null;return i===null?!1:(t.appendGroup(i,(this.flags&L.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){let r=e.rest(),s=r.indexOf(":]");if(s<0)return!1;let i=r.substring(0,s+2);e.skipString(i);let o=Gm.has(i)?Gm.get(i):null;if(o===null)throw new De(U.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(o,(this.flags&L.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){let r=e.pos();if(!(this.flags&L.UNICODE_GROUPS)||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let s=1,i=e.pop();if(i===k.CODES.P&&(s=-1),!e.more())throw e.rewindTo(r),new De(U.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let o;if(i!==k.CODES["{"])o=q.runeToString(i);else{let B=e.rest(),f=B.indexOf("}");if(f<0)throw e.rewindTo(r),new De(U.ERR_INVALID_CHAR_RANGE,e.rest());o=B.substring(0,f),e.skipString(o),e.skip(1)}o.length!==0&&o.codePointAt(0)===k.CODES["^"]&&(s=0-s,o=o.substring(1));let c=U.unicodeTable(o);if(c===null)throw new De(U.ERR_INVALID_CHAR_RANGE,e.from(r));c.sign<0&&(s=0-s);let u=c.tab,l=c.fold;if(!(this.flags&L.FOLD_CASE)||l===null)t.appendTableWithSign(u,s);else{let B=new Or().appendTable(u).appendTable(l).cleanClass().toArray();t.appendClassWithSign(Array.from(B),s)}return!0}parseClass(e){let t=e.pos();e.skip(1);let r=this.newRegexp(w.Op.CHAR_CLASS);r.flags=this.flags;let s=new Or,i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),this.flags&L.CLASS_NL||s.appendRange(k.CODES[`
`],k.CODES[`
`]));let o=!0;for(;!e.more()||e.peek()!==k.CODES["]"]||o;){if(e.more()&&e.lookingAt("-")&&!(this.flags&L.PERL_X)&&!o){let B=e.rest();if(B==="-"||!B.startsWith("-]"))throw e.rewindTo(t),new De(U.ERR_INVALID_CHAR_RANGE,e.rest())}o=!1;let c=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,s))continue;e.rewindTo(c)}if(this.parseUnicodeClass(e,s)||this.parsePerlClassEscape(e,s))continue;e.rewindTo(c);let u=U.parseClassChar(e,t),l=u;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(l=U.parseClassChar(e,t),l<u)throw new De(U.ERR_INVALID_CHAR_RANGE,e.from(c))}this.flags&L.FOLD_CASE?s.appendFoldedRange(u,l):s.appendRange(u,l)}e.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}},V(U,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),V(U,"ERR_INVALID_CHAR_RANGE","invalid character class range"),V(U,"ERR_INVALID_ESCAPE","invalid escape sequence"),V(U,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),V(U,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),V(U,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),V(U,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),V(U,"ERR_MISSING_BRACKET","missing closing ]"),V(U,"ERR_MISSING_PAREN","missing closing )"),V(U,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),V(U,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),V(U,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),V(U,"ERR_UNEXPECTED_PAREN","unexpected )"),V(U,"ERR_NESTING_DEPTH","expression nests too deeply"),V(U,"ERR_LARGE","expression too large"),V(U,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),V(U,"MAX_HEIGHT",1e3),V(U,"MAX_SIZE",1398101),V(U,"MAX_RUNES",33554432),V(U,"ANY_TABLE",new C(new Uint32Array([0,z.MAX_RUNE,1]))),V(U,"ASCII_TABLE",new C(new Uint32Array([0,127,1]))),V(U,"ASCII_FOLD_TABLE",new C(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),U),OA=class Pr{static initTest(e){let t=Pr.compile(e),r=new Pr(t.expr,t.prog,t.numSubexp,t.longest);return r.cond=t.cond,r.prefix=t.prefix,r.prefixUTF8=t.prefixUTF8,r.prefixComplete=t.prefixComplete,r.prefixRune=t.prefixRune,r.prefilter=t.prefilter,r.namedGroups=t.namedGroups,r}static compile(e){return Pr.compileImpl(e,L.PERL,!1)}static compilePOSIX(e){return Pr.compileImpl(e,L.POSIX,!0)}static compileImpl(e,t,r){let s=io.parse(e,t),i=s.maxCap(),o=s.namedGroups;s=Xm.simplify(s);let c=bA.build(s),u=Ym.compileRegexp(s),l=new Pr(e,u,i,r);l.prefilter=c.type===ae.Type.NONE?null:c;let[B,f]=u.prefix();return l.prefixComplete=B,l.prefix=f,l.prefixUTF8=q.stringToUtf8ByteArray(l.prefix),l.prefix.length>0&&(l.prefixRune=l.prefix.codePointAt(0)),l.namedGroups=o,l}static match(e,t){return Pr.compile(e).match(t)}constructor(e,t,r=0,s=0){this.expr=e,this.prog=t,this.numSubexp=r,this.longest=s,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.namedGroups=Object.create(null),this.machinePool=[],this.lazyDFA=null,this.onepass=Em.compile(this.prog),this.prefilter=null}get dfa(){return this.lazyDFA===null&&(this.lazyDFA=new xh(this.prog)),this.lazyDFA}matchPrefixComplete(e,t,r,s){if((r===L.ANCHOR_START||r===L.ANCHOR_BOTH)&&t!==0)return null;let i=-1,o=-1,c=e.prefixLength(this);if(r===L.UNANCHORED){let u=e.index(this,t);if(u<0)return null;i=t+u,o=i+c}else if(r===L.ANCHOR_BOTH){if(e.endPos()!==c||e.index(this,0)!==0)return null;i=0,o=c}else if(r===L.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,o=c}if(i<0)return null;if(s>0){let u=new Int32Array(s).fill(-1);return u[0]=i,u[1]=o,Array.from(u)}return[]}createLookbehindState(){return this.prog.numLb>0?new gA(this.prog):null}executeEngine(e,t,r,s,i=null){if(this.prefixComplete&&(s===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,r,s);if(this.prefilter!==null&&r===L.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return Em.execute(this,e,t,r,s);if(s>0)return this.prog.numLb===0&&e.endPos()<=fc.maxBitStateLen(this.prog)?fc.execute(this,e,t,r,s):this.doExecuteNFA(e,t,r,s,i);if(this.prog.numLb===0){let o=this.dfa.match(e,t,r);if(o!==null)return o?[]:null;if(e.endPos()<=fc.maxBitStateLen(this.prog))return fc.execute(this,e,t,r,s)}return this.doExecuteNFA(e,t,r,s,i)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,r,s,i=null){let o=this.get();o||(o=zm.fromRE2(this)),o.init(s);let c=o.match(e,t,r,i)?o.submatches():null;return this.put(o),c}match(e){return this.executeEngine(ye.fromUTF16(e),0,L.UNANCHORED,0)!==null}matchWithGroup(e,t,r,s,i,o=null){return e instanceof kr||(q.isByteArray(e)?e=Nr.utf8(e):e=Nr.utf16(e)),this.matchMachineInput(e,t,r,s,i,o)}matchMachineInput(e,t,r,s,i,o=null){if(t>r)return[!1,null];let c=e.isUTF16Encoding()?ye.fromUTF16(e.asCharSequence(),0,r):ye.fromUTF8(e.asBytes(),0,r),u=this.executeEngine(c,t,s,2*i,o);return u===null?[!1,null]:[!0,u]}matchUTF8(e){return this.executeEngine(ye.fromUTF8(e),0,L.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,r){let s=0,i=0,o="",c=ye.fromUTF16(e),u=this.createLookbehindState(),l=0;for(;i<=e.length;){let B=this.executeEngine(c,i,L.UNANCHORED,2,u);if(B===null||B.length===0)break;o+=e.substring(s,B[0]),(B[1]>s||B[0]===0)&&(o+=t(e.substring(B[0],B[1])),l++),s=B[1];let f=c.step(i)&7;if(i+f>B[1]?i+=f:i+1>B[1]?i++:i=B[1],l>=r)break}return o+=e.substring(s),o}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let r=new Array(t).fill(-1);for(let s=0;s<e.length;s++)r[s]=e[s];e=r}return e}allMatches(e,t,r=s=>s){let s=[],i=e.endPos();t<0&&(t=i+1);let o=0,c=0,u=-1,l=this.createLookbehindState();for(;c<t&&o<=i;){let B=this.executeEngine(e,o,L.UNANCHORED,this.prog.numCap,l);if(B===null||B.length===0)break;let f=!0;if(B[1]===o){B[0]===u&&(f=!1);let g=e.step(o);g<0?o=i+1:o+=g&7}else o=B[1];u=B[1],f&&(s.push(r(this.pad(B))),c++)}return s}findUTF8(e){let t=this.executeEngine(ye.fromUTF8(e),0,L.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){let t=this.executeEngine(ye.fromUTF8(e),0,L.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){let t=this.executeEngine(ye.fromUTF16(e),0,L.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(ye.fromUTF16(e),0,L.UNANCHORED,2)}findUTF8Submatch(e){let t=this.executeEngine(ye.fromUTF8(e),0,L.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.slice(t[2*s],t[2*s+1]));return r}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(ye.fromUTF8(e),0,L.UNANCHORED,this.prog.numCap))}findSubmatch(e){let t=this.executeEngine(ye.fromUTF16(e),0,L.UNANCHORED,this.prog.numCap);if(t===null)return null;let r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<t.length&&t[2*s]>=0&&(r[s]=e.substring(t[2*s],t[2*s+1]));return r}findSubmatchIndex(e){return this.pad(this.executeEngine(ye.fromUTF16(e),0,L.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){let r=this.allMatches(ye.fromUTF8(e),t,s=>e.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(e,t){let r=this.allMatches(ye.fromUTF8(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAll(e,t){let r=this.allMatches(ye.fromUTF16(e),t,s=>e.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(e,t){let r=this.allMatches(ye.fromUTF16(e),t,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(e,t){let r=this.allMatches(ye.fromUTF8(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.slice(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(e,t){let r=this.allMatches(ye.fromUTF8(e),t);return r.length===0?null:r}findAllSubmatch(e,t){let r=this.allMatches(ye.fromUTF16(e),t,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=e.substring(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(e,t){let r=this.allMatches(ye.fromUTF16(e),t);return r.length===0?null:r}},wt,SO=(wt=class{constructor(e=wt.UNANCHORED,t=0,r=8388608){if(![wt.UNANCHORED,wt.ANCHOR_START,wt.ANCHOR_BOTH].includes(e))throw new jm("The anchor should be RE2Set.UNANCHORED, RE2Set.ANCHOR_START or RE2Set.ANCHOR_BOTH");q.checkFlags(t),this.anchor=e,this.jsFlags=t,this.maxMem=r;let s=L.PERL;t&nt.DISABLE_UNICODE_GROUPS&&(s&=~L.UNICODE_GROUPS),t&nt.LOOKBEHINDS&&(s|=L.LOOKBEHIND),this.re2Flags=s,this.regexps=[],this.prog=null,this.dfa=null,this.dummyRe2=null}add(e){if(this.prog)throw new oo("Cannot add patterns after compile");q.checkPattern(e);let t=e;this.jsFlags&nt.CASE_INSENSITIVE&&(t=`(?i)${t}`),this.jsFlags&nt.DOTALL&&(t=`(?s)${t}`),this.jsFlags&nt.MULTILINE&&(t=`(?m)${t}`);let r=io.parse(t,this.re2Flags);return this.regexps.push(Xm.simplify(r)),this.regexps.length-1}compile(){if(this.prog)return;let e=Ym.compileSet(this.regexps);if(e.numInst()>io.MAX_SIZE)throw new oo(`${io.ERR_LARGE}: the set compiles to ${e.numInst()} instructions, more than ${io.MAX_SIZE}`);this.prog=e,this.dfa=new xh(this.prog,this.maxMem),this.dummyRe2={prog:this.prog,cond:this.prog.startCond(),prefix:"",prefixRune:0,longest:!1}}match(e){this.prog||this.compile();let t=q.isByteArray(e)?ye.fromUTF8(e):ye.fromUTF16(e),r=L.UNANCHORED;this.anchor===wt.ANCHOR_START?r=L.ANCHOR_START:this.anchor===wt.ANCHOR_BOTH&&(r=L.ANCHOR_BOTH);let s=this.dfa.matchSet(t,0,r);if(s!==null)return s;let i=zm.fromRE2(this.dummyRe2);return i.init(0),i.matchSet(t,0,r)}},V(wt,"UNANCHORED",L.UNANCHORED),V(wt,"ANCHOR_START",L.ANCHOR_START),V(wt,"ANCHOR_BOTH",L.ANCHOR_BOTH),wt),PA=class Is{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(Object.prototype.toString.call(e)==="[object RegExp]"&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let r="",s=!1,i=e.length;i===0&&(r="(?:)",s=!0);let o=!1,c=0;for(;c<i;){let l=e[c];if(l==="\\"){if(c+1<i)switch(l=e[c+1],l){case"\\":r+="\\\\",c+=2;continue;case"c":if(c+2<i){let g=e[c+2].charCodeAt(0);if(g>=65&&g<=90||g>=97&&g<=122){let I=g%32;r+="\\x",r+=(I>>4).toString(16).toUpperCase(),r+=(I&15).toString(16).toUpperCase(),c+=3,s=!0;continue}}r+="c",c+=2,s=!0;continue;case"u":if(c+2<i){if(e[c+2]==="{"){let g=c+3,I=!1,D=!1;for(;g<i;){let O=e[g];if(O==="}"){D=!0;break}if(!Is.isHexadecimal(O))break;I=!0,g++}if(D&&I){r+="\\x",c+=2,s=!0;continue}}else if(c+5<i){let g=!0;for(let I=0;I<4;I++)if(!Is.isHexadecimal(e[c+2+I])){g=!1;break}if(g){r+="\\x{"+e.substring(c+2,c+6)+"}",c+=6,s=!0;continue}}}r+="u",c+=2,s=!0;continue;case"x":{let g=!1;if(c+2<i&&e[c+2]==="{"){let I=c+3,D=!1,O=!1;for(;I<i;){let M=e[I];if(M==="}"){O=!0;break}if(!Is.isHexadecimal(M))break;D=!0,I++}O&&D&&(g=!0)}else c+3<i&&Is.isHexadecimal(e[c+2])&&Is.isHexadecimal(e[c+3])&&(g=!0);g?(r+="\\x",c+=2):(r+="x",c+=2,s=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":r+="\\"+l,c+=2;continue;default:{let g=e.codePointAt(c+1);if(g>=48&&g<=57||g>=65&&g<=90||g>=97&&g<=122){let I=q.charCount(g);r+=e.substring(c+1,c+1+I),c+=I+1,s=!0}else{r+="\\";let I=q.charCount(g);r+=e.substring(c+1,c+1+I),c+=I+1}continue}}}else if(l==="/"){r+="\\/",c+=1,s=!0;continue}else if(l==="["){if(!o&&e[c+1]==="]"){r+="[^\\x00-\\x{10FFFF}]",c+=2,s=!0;continue}if(!o&&e[c+1]==="^"&&e[c+2]==="]"){r+="[\\x00-\\x{10FFFF}]",c+=3,s=!0;continue}o=!0}else if(l==="]")o=!1;else if(!o&&l==="("&&c+2<i&&e[c+1]==="?"&&e[c+2]==="<"&&c+3<i&&!"=!>)".includes(e[c+3])){r+="(?P<",c+=3,s=!0;continue}let B=e.codePointAt(c),f=q.charCount(B);r+=e.substring(c,c+f),c+=f}let u=s?r:e;return t.length>0?`(?${t})${u}`:u}},Um=(n,e)=>{let t=n.matchArray();return t.index=n.start(0),t.input=e,t.groups=n.namedGroupsObject(),t},Ve,mc=(Ve=class{static quote(e){return q.quoteMeta(e)}static quoteReplacement(e,t=!1){return fm.quoteReplacement(e,t)}static translateRegExp(e){return PA.translate(e)}static compile(e,t=0){q.checkPattern(e),q.checkFlags(t);let r=e;t&Ve.CASE_INSENSITIVE&&(r=`(?i)${r}`),t&Ve.DOTALL&&(r=`(?s)${r}`),t&Ve.MULTILINE&&(r=`(?m)${r}`);let s=L.PERL;t&Ve.DISABLE_UNICODE_GROUPS&&(s&=~L.UNICODE_GROUPS),t&Ve.LOOKBEHINDS&&(s|=L.LOOKBEHIND);let i=new Ve(e,t);return i.re2Input=OA.compileImpl(r,s,(t&Ve.LONGEST_MATCH)!==0),i}static matches(e,t){return Ve.compile(e).testExact(t)}static initTest(e,t,r){if(e==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");let s=new Ve(e,t);return s.re2Input=r,s}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return q.isByteArray(e)&&(e=Nr.utf8(e)),new fm(this,e)}test(e){return q.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){let t=q.isByteArray(e)?ye.fromUTF8(e):ye.fromUTF16(e);return this.re2Input.executeEngine(t,0,L.ANCHOR_BOTH,0)!==null}exec(e){let t=this.matcher(e);return t.find()?Um(t,e):null}split(e,t=0){let r=this.matcher(e),s=[],i=0,o=0;for(;r.find();){if(o===0&&r.end()===0){o=r.end();continue}if(t>0&&s.length===t-1)break;if(o===r.start()){if(t===0){i+=1,o=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.start())),o=r.end()}if(t===0&&o!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.inputLength()))}return(t!==0||s.length===0&&!(o===r.inputLength()&&o>0))&&s.push(r.substring(o,r.inputLength())),s}*matchAll(e){let t=this.matcher(e);for(;t.find();)yield Um(t,e)}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},V(Ve,"CASE_INSENSITIVE",nt.CASE_INSENSITIVE),V(Ve,"DOTALL",nt.DOTALL),V(Ve,"MULTILINE",nt.MULTILINE),V(Ve,"DISABLE_UNICODE_GROUPS",nt.DISABLE_UNICODE_GROUPS),V(Ve,"LONGEST_MATCH",nt.LONGEST_MATCH),V(Ve,"LOOKBEHINDS",nt.LOOKBEHINDS),Ve);var fi="13.2.0";function FE(n){fi=n}var Hr=new kt("@firebase/firestore");function Ds(){return Hr.logLevel}function J(n,...e){if(Hr.logLevel<=ue.DEBUG){let t=e.map(Pf);Hr.debug(`Firestore (${fi}): ${n}`,...t)}}function Rn(n,...e){if(Hr.logLevel<=ue.ERROR){let t=e.map(Pf);Hr.error(`Firestore (${fi}): ${n}`,...t)}}function Ut(n,...e){if(Hr.logLevel<=ue.WARN){let t=e.map(Pf);Hr.warn(`Firestore (${fi}): ${n}`,...t)}}function Pf(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function Z(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,VE(n,r,t)}function VE(n,e,t){let r=`FIRESTORE (${fi}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Rn(r),new Error(r)}function Q(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||VE(e,s,r)}function ie(n,e){return n}function NA(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var Ls=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let s=NA(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}};function ce(n,e){return n<e?-1:n>e?1:0}function Eo(n,e){let t=Math.min(n.length,e.length);for(let r=0;r<t;r++){let s=n.charAt(r),i=e.charAt(r);if(s!==i)return kh(s)===kh(i)?ce(s,i):kh(s)?1:-1}return ce(n.length,e.length)}var xA=55296,LA=57343;function kh(n){let e=n.charCodeAt(0);return e>=xA&&e<=LA}function ks(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}var Se=class n{constructor(e,t){this.comparator=e,this.root=t||ln.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ln.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ln.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Rs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Rs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Rs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Rs(this.root,e,this.comparator,!0)}},Rs=class{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},ln=class n{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??n.RED,this.left=s??n.EMPTY,this.right=i??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new n(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this,i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return n.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Z(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw Z(27949);return e+(this.isRed()?0:1)}};ln.EMPTY=null,ln.RED=!0,ln.BLACK=!1;ln.EMPTY=new class{constructor(){this.size=0}get key(){throw Z(57766)}get value(){throw Z(16141)}get color(){throw Z(16727)}get left(){throw Z(29726)}get right(){throw Z(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new ln(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Ke=class n{constructor(e){this.comparator=e,this.data=new Se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new bc(this.data.getIterator())}getIteratorFrom(e){return new bc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},bc=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},W=class extends Ct{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Fs="__name__",vc=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&Z(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&Z(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let s=0;s<r;s++){let i=n.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ce(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),s=n.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?n.extractNumericId(e).compare(n.extractNumericId(t)):Eo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Dn.fromString(e.substring(4,e.length-2))}},Ie=class n extends vc{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new W(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new n(t)}static emptyPath(){return new n([])}},kA=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Dt=class Ts extends vc{construct(e,t,r){return new Ts(e,t,r)}static isValidIdentifier(e){return kA.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ts.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fs}static keyField(){return new Ts([Fs])}static fromServerFormat(e){let t=[],r="",s=0,i=()=>{if(r.length===0)throw new W(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;s<e.length;){let c=e[s];if(c==="\\"){if(s+1===e.length)throw new W(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new W(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ts(t)}static emptyPath(){return new Ts([])}};var on=class n{constructor(e){this.fields=e,e.sort(Dt.comparator)}static empty(){return new n([])}unionWith(e){let t=new Ke(Dt.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ks(this.fields,e.fields,(t,r)=>t.isEqual(r))}};function qr(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function os(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ME(n,e){let t=[];for(let r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function GE(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var ee=class n{constructor(e){this.path=e}static fromPath(e){return new n(Ie.fromString(e))}static fromName(e){return new n(Ie.fromString(e).popFirst(5))}static empty(){return new n(Ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new Ie(e.slice()))}};function FA(n,e,t){if(!t)throw new W(F.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function UE(n,e,t,r){if(e===!0&&r===!0)throw new W(F.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Zm(n){if(!ee.isDocumentKey(n))throw new W(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Wo(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Eu(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Z(12329,{type:typeof n})}function pi(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Eu(n);throw new W(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function ke(n,e){let t={typeString:n};return e&&(t.value=e),t}function $o(n,e){if(!Wo(n))throw new W(F.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0,o=e[r].optional;if(!(r in n)){if(o)continue;t=`JSON missing required field: '${r}'`;break}let c=n[r];if(s&&typeof c!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&c!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new W(F.INVALID_ARGUMENT,t);return!0}var eE=-62135596800,tE=1e6,Re=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*tE);return new n(t,r)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new W(F.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return n._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,r;if(e>=0n)t=Number(e/1000000000n),r=Number(e%1000000000n);else{let s=e%1000000000n;s===0n?(t=Number(e/1000000000n),r=0):(t=Number(e/1000000000n-1n),r=Number(s+1000000000n))}return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<eE)throw new W(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/tE}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new W(F.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");let e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if($o(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-eE;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};Re._jsonSchemaVersion="firestore/timestamp/1.0",Re._jsonSchema={type:ke("string",Re._jsonSchemaVersion),seconds:ke("number"),nanoseconds:ke("number")};var Rc=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var be=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Rc("Invalid base64 string: "+i):i}}(e);return new n(t)}static fromUint8Array(e){let t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};be.EMPTY_BYTE_STRING=new be("");var VA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Sn(n){if(Q(!!n,39018),typeof n=="string"){let e=0,t=VA.exec(n);if(Q(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Te(n.seconds),nanos:Te(n.nanos)}}function Te(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Qt(n){return typeof n=="string"?be.fromBase64String(n):be.fromUint8Array(n)}var HE="server_timestamp",qE="__type__",jE="__previous_value__",KE="__local_write_time__";function _u(n){return(n?.mapValue?.fields||{})[qE]?.stringValue===HE}function Qo(n){let e=n.mapValue.fields[jE];return _u(e)?Qo(e):e}function Vs(n){let e=Sn(n.mapValue.fields[KE].timestampValue);return new Re(e.seconds,e.nanos)}var qh=class{constructor(e,t,r,s,i,o,c,u,l,B,f,g,I){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=B,this.apiKey=f,this._customHeaders=g,this.grpcFlowControlWindow=I}},Sc="(default)",_o=class n{constructor(e,t){this.projectId=e,this.database=t||Sc}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Sc}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};function JE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new W(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _o(n.options.projectId,e)}var Le=class n{constructor(){this.exponent=0,this.i=0n,this.o=0n,this.u=new Array(4).fill(0n),this.l=new Array(6).fill(0n),this.h=new Array(6).fill(0n),this.T=new Array(6).fill(0n),this.P=new Array(12).fill(0n)}static I(e,t){let r=new n;return r.parse(e,t),r}parse(e,t){t+=e.length-1,this.exponent=0,this.i=0n,this.o=0n;let r=this.T,s=this.R(e,r);if(s==0&&this.isEmpty(r)||(t+=s)<n.A)return;if(t>n.V)return void(this.exponent=Number(n.m));let i=this.p(t,r);this.S(t,i,r)}R(e,t){for(let i=0;i<6;i++)t[i]=0n;let r=0;for(;r<e.length&&e[r]==0;)r+=1;if(r==e.length)return 0;let s=-r;if(e.length-r>n.v){let i=e[n.v]>=5,o=new Array(n.v).fill(0);for(let c=0;c<n.v;c++)o[c]=e[c+r];i&&(s+=this.D(o)),e=o,r=0}for(let i=e.length-1;i>=r;i--)t[0]|=BigInt(e[i])<<32n,this.C(t);return s}C(e){let t=e.length;for(let r=0;r<t;r++){let s=e[r]%10n;e[r]=e[r]/10n,r+1<t&&(e[r+1]+=s<<32n)}}isEmpty(e){for(let t=0;t<e.length;t++)if(e[t]!=0n)return!1;return!0}D(e){for(let t=e.length-1;t>=0;t--){if(e[t]!=9)return e[t]=e[t]+1,0;e[t]=0}return e[0]=1,1}p(e,t){let r=t[0]<<31n|t[1]>>1n,s=Number(r)/n.F;return Math.floor(Number(e)*n.O+this.log2(s))}log2(e){return n.M*Math.log(e)}S(e,t,r){let s=this.u;this.N(-t,s);let i=this.P;this.B(r,s,i),this.L(i),BigInt(s[0])!=BigInt(-e)&&this.L(i),t+=this.$(i),(t+=n.U)<=0||(t+=this.k(i),BigInt(t)>=n.m?this.exponent=Number(n.m):(this.exponent=Number(t),this.i=(i[0]<<32n)+i[1]&0xffffffffffffffffn,this.o=(i[2]<<32n)+i[3]&0xffffffffffffffffn))}N(e,t){if(e==0)return void this.q(n.K[0],t);let r=n.K;e<0&&(e=-e,r=n.W);let s=n.G,i=32,o=!0;for(;e>0;)e>=s&&(o?(this.q(r[i],t),o=!1):this.j(t,r[i],t),e-=s),i-=1,s*=.5}q(e,t){for(let r=0;r<t.length;r++)t[r]=e[r]}j(e,t,r){this.H(e,t,this.P);let s=this.J(this.P);this.Y(this.P,r),r[0]=e[0]+t[0]+BigInt(s)}H(e,t,r){for(let s=0;s<r.length;s++)r[s]=0n;this.Z(e,this.l),this.Z(t,this.h);for(let s=5;s>=0;s--)for(let i=5;i>=0;i--){let o=this.l[s]*this.h[i];r[i+s+1]=r[i+s+1]+(o&n.X)&0xffffffffffffffffn,r[i+s]=r[i+s]+(o>>32n)&0xffffffffffffffffn}for(let s=11;s>=1;s--)r[s-1]=r[s-1]+(r[s]>>32n)&0xffffffffffffffffn,r[s]&=n.X}J(e){let t=0;for(;this.ee(e);)this.L(e),t-=1;return t}ee(e){if(e[0]<0x19999999n)return!0;if(e[0]>0x19999999n)return!1;for(let t=1;t<e.length;t++){if(e[t]<0x99999999n)return!0;if(e[t]>0x99999999n)return!1}return!1}B(e,t,r){for(let o=0;o<r.length;o++)r[o]=0n;let s=this.h;this.Z(t,s);let i=e.length;for(let o=i-1;o>=0;o--)for(let c=i-1;c>=0;c--){let u=e[o]*s[c];r[c+o+1]=r[c+o+1]+(u&n.X)&0xffffffffffffffffn,r[c+o]=r[c+o]+(u>>32n)&0xffffffffffffffffn}for(let o=11;o>=1;o--)r[o-1]=r[o-1]+(r[o]>>32n)&0xffffffffffffffffn,r[o]&=n.X}L(e){let t=e.length-1;e[0]&=n.X,e[t]*=10n;for(let r=t-1;r>=0;r--)e[r]=10n*e[r]+(e[r+1]>>32n)&0xffffffffffffffffn,e[r+1]&=n.X}$(e){let t=31-n.te(e[0]);return t!=0&&this.ne(e,t),t}k(e){return this.re(e,5,100n),this.re(e,4,0x80000000n),(e[0]&n.ie<<1n)!=0n?(this.ne(e,1),1):0}Y(e,t){t[1]=(e[0]<<32n)+e[1],t[2]=(e[2]<<32n)+e[3],t[3]=(e[4]<<32n)+e[5]}Z(e,t){t[0]=e[1]>>32n,t[1]=e[1]&n.X,t[2]=e[2]>>32n,t[3]=e[2]&n.X,t[4]=e[3]>>32n,t[5]=e[3]&n.X}ne(e,t){let r=e.length-1,s=BigInt(32-Math.abs(t));if(t>0){let i=BigInt(t);for(let o=r+1-1;o>=1;o--)e[o]=e[o]>>i|e[o-1]<<s&n.X;e[0]=e[0]>>i}else if(t<0){let i=BigInt(-t);e[0]=0xffffffffffffffffn&(e[0]<<i|e[1]>>s);for(let o=1;o<r;o++)e[o]=0xffffffffffffffffn&(e[o]<<i&n.X|e[o+1]>>s);e[r]=e[r]<<i&n.X}}re(e,t,r){let s=t;e[s]=e[s]+r&0xffffffffffffffffn;for(let i=s+1-1;i>=1&&(e[i]&n.ie)!=0n;i--)e[i]&=n.X,e[i-1]+=1n}static te(e){let t=Number(e>>32n);return t==0?32+Math.clz32(Number(BigInt.asUintN(32,e))):Math.clz32(t)}};var Ye,Ss,jh,Ic,Dc,ho;Le.v=59,Le.V=646456993,Le.A=-646457032,Le.F=0xccccccccccccd00,Le.se=0x8000000000000000n,Le.G=2147483648,Le.X=0x00000000ffffffffn,Le.ie=0xffffffff00000000n,Le.O=Math.log(10)/Math.log(2),Le.M=1/Math.log(2),Le.U=2147483647,Le.m=0xffffffffn,Le.K=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[1n,0x3333333333333333n,0x3333333333333333n,0x3333333333333334n],[1n,0x6666666666666666n,0x6666666666666666n,0x6666666666666667n],[2n,0x28f5c28f5c28f5c2n,0x8f5c28f5c28f5c28n,0xf5c28f5c28f5c290n],[3n,0x4189374bc6a7ef9dn,0xb22d0e5604189374n,0xbc6a7ef9db22d0e6n],[5n,0xa7c5ac471b478423n,0x0fcf80dc33721d53n,0xcddd6e04c0592104n],[10n,0x6df37f675ef6eadfn,0x5ab9a2072d44268dn,0x97df837e6748956en],[20n,0x2f394219248446ban,0xa23d2ec729af3d61n,0x0607aa0167dd94cbn],[39n,0x571cbec554b60dbbn,0xd5f64baf0506840dn,0x451db70d5904029bn],[78n,0x1da48ce468e7c702n,0x6520247d3556476dn,0x1469caf6db224cfan],[155n,0x2252f0e5b39769dcn,0x9ae2eea30ca3ade0n,0xeeaa3c08dfe84e30n],[309n,0x2e055c9a3f6ba793n,0x16583a816eb60a59n,0x22c4b0826cf1ebf7n],[617n,0x52bb45e9cf23f17fn,0x7688c07606e50364n,0xb34479aa9d449a57n],[1234n,0x1abc81c8ff5f846cn,0x8f5e3c9853e38c97n,0x45060097f3bf9296n],[2467n,0x1bec53b510daa7b4n,0x48369ed77dbb0eb1n,0x3b05587b2187b41en],[4933n,0x1e75063a5ba91326n,0x8abfb8e460016ae3n,0x28008702d29e8a3cn],[9865n,0x243c5d8bb5c5fa55n,0x40c6d248c5881915n,0x4c0fd99fd5befc22n],[19729n,0x334a5570c3f4ef3cn,0xa13c36c43f979c90n,0xda7ac473555fb7a8n],[39457n,0x66c304445dd98f3bn,0xa8c293a20e47a41bn,0x4c5b03dc12604964n],[78914n,0x293ffbf5fb028cc4n,0x89d3e5ff44238406n,0x369a339e1bfe8c9bn],[157827n,0x427792fbb68e5d20n,0x7b297cd9fc154b62n,0xf09142114aa9a20cn],[315653n,0xac92bc65ad5c08fcn,0x00beeb115a566c19n,0x4ba882d8a4622437n],[631306n,0x745581440f92e80en,0x4da822cf7f896f41n,0x509d598678164ecdn],[1262612n,0x34dd99b4c69523a5n,0x64bc2e8f0d8b1044n,0xb03b1c96da5dd349n],[2525223n,0x6d2bbea9d6d25a08n,0xa0a4606a88e96b70n,0x182063bbc2fe8520n],[5050446n,0x2e8e47d63bfdd6e3n,0x2b55fa8976eaa3e9n,0x1a6b9d3086412a73n],[10100891n,0x54aa68efa1d719dfn,0xd8505806612c5c8fn,0xad068837fee8b43an],[20201782n,0x1c00464ccb7bae77n,0x9e3877784c77982cn,0xd94af3b61717404fn],[40403563n,0x1ea099c8be2b6cd0n,0x8bfb6d539fa50466n,0x6d3bc37e69a84218n],[80807125n,0x24a457f466ce8d18n,0xf2c8f3b81bc6bb59n,0xa78c757692e02d49n],[161614249n,0x347256677aba6b53n,0x3fbf90d30611a67cn,0x1e039d87e0bdb32bn],[323228497n,0x6b727daf0fd3432an,0x71f71121f9e4200fn,0x8fcd9942d486c10cn],[646456994n,0x2d18e84484d91f78n,0x4079bfe7829dec6fn,0x21551643e365abc6n]],Le.W=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[0n,0x8000000000000000n,0x0000000000000000n,0x0000000000000000n],[0n,0x4000000000000000n,0x0000000000000000n,0x0000000000000001n],[-1n,0xa000000000000000n,0x0000000000000000n,0x0000000000000000n],[-2n,0x6400000000000000n,0x0000000000000000n,0x0000000000000000n],[-4n,0x2710000000000000n,0x0000000000000000n,0x0000000000000001n],[-9n,0x3b9aca0000000000n,0x0000000000000000n,0x0000000000000001n],[-19n,0x8ac7230489e80000n,0x0000000000000000n,0x0000000000000000n],[-38n,0x4b3b4ca85a86c47an,0x098a224000000000n,0x0000000000000001n],[-77n,0xdd15fe86affad912n,0x49ef0eb713f39eben,0xaa987b6e6fd2a002n],[-154n,0xbeeefb584aff8603n,0xaafb550ffacfd8fan,0x5ca47e4f88d45371n],[-308n,0x8e679c2f5e44ff8fn,0x570f09eaa7ea7648n,0x5961db50c6d2b888n],[-616n,0x4f371b3399fc2ab0n,0x8170041c9feb05aan,0xc7c343447c75bcf6n],[-1233n,0xf51e928179013fd3n,0xde4bd12cde4d985cn,0x4a573ca6f94bff14n],[-2466n,0xeab388127bccaff7n,0x1667639142b9fbaen,0x775ec9995e1039fbn],[-4932n,0xd72cb2a95c7ef6ccn,0xe81bf1e825ba7515n,0xc2feb521d6cb5dcdn],[-9864n,0xb4dc1be6604502dcn,0xd491079b8eef6535n,0x578d3965d24de84dn],[-19728n,0x7fc6447bee60ea43n,0x2548da5c8b125b27n,0x5f42d1142f41d349n],[-39456n,0x3fc65180f88af8fbn,0x6a6915f383349413n,0x063c3708b6ceb291n],[-78913n,0x9ee0197c8dcd55bfn,0x2b2b9b942c38f4a2n,0x0f8ba634e9c706aen],[-157826n,0x629963a25b8b2d79n,0xd00b9d2286f70876n,0xe97004700c3644fcn],[-315652n,0x25f9cc308ceef4f3n,0x40f19543911a4546n,0xa2cd389452cfc366n],[-631305n,0x385597b0d47e76b8n,0x1b9f67e103bf2329n,0xc3119848595985f7n],[-1262611n,0x7bf795d276c12f66n,0x66a61d62a446659an,0xa1a4d73bebf093d5n],[-2525222n,0x3c07d96ab1ed7799n,0xcb7355c22cc05ac0n,0x4ffc0ab73b1f6a49n],[-5050445n,0x8cc4cd8c3edefb9an,0x6c8ff86a90a97e0cn,0x166cfddbf98b71bfn],[-10100890n,0x4d67d81cc88e1228n,0x1d7cfb06666b79b3n,0x7b916728aaa4e70dn],[-20201781n,0xea0c55494e7a552dn,0xb88cb9484bb86c61n,0x8d44893c610bb7dfn],[-40403562n,0xd5fa8c821ec0c24an,0xa80e46e764e0f8b0n,0xa7276bfa432fac7en],[-80807124n,0xb2dae307426f6791n,0xc970b82f58b12918n,0x0472592f7f39190en],[-161614248n,0x7cf51edd8a15f1c9n,0x656dab3498f8e697n,0x12daa2a80e53c807n],[-323228496n,0x3cfe609ab5883c50n,0xbec8b5d22b198871n,0xe18477703b4622b4n],[-646456993n,0x9152447b9d7cda9an,0x3b4d3f6110d77aadn,0xfa81bad1c394adb4n]];var Ee=class n{constructor(e,t,r,s){this.negative=e,this._e=t,this.i=r,this.o=s}exponent(){return this._e-Le.U}oe(){return this._e===0&&this.i===0n&&this.o===0n}ae(){return this._e===Qe(n,Ye,"f",Ss)&&this.i===0n&&this.o===0n}isNaN(){return this._e===Qe(n,Ye,"f",Ss)&&!(this.i===0n&&this.o===0n)}compareTo(e){if(this.isNaN())return e.isNaN()?0:1;if(e.isNaN())return-1;let t,r;if(this.negative){if(!e.negative)return-1;t=1,r=-1}else{if(e.negative)return 1;t=-1,r=1}return this._e<e._e?t:this._e>e._e?r:this.i<e.i?t:this.i>e.i?r:this.o<e.o?t:this.o>e.o?r:0}debug(){return(this.negative?"+":"-")+Qe(n,Ye,"m",jh).call(n,this.i)+Qe(n,Ye,"m",jh).call(n,this.o)+"*2^"+this.exponent()}static fromNumber(e){if(isNaN(e))return n.NaN;if(!isFinite(e))return e<0?n.ue:n.ce;if(e===0)return Math.sign(1/e)>0?n.le:n.Ee;let t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);let r=t.getBigUint64(0),s=BigInt.asUintN(64,r<<12n),i=2047&Number(r>>52n);if(i===0){let o=Le.te(s);s=o<63?s<<BigInt(o+1):0n,i=-o}return new n(e<0,Qe(n,Ye,"m",ho).call(n,i-1023),s,0n)}static fromString(e){if(e==="NaN")return n.NaN;if(e==="-Infinity")return n.ue;if(e==="Infinity"||e==="+Infinity")return n.ce;let t=new Array(e.length).fill(0),r=0,s=0,i=0,o=!1;for(e[r]==="-"?(o=!0,r++):e[r]==="+"&&r++;Qe(n,Ye,"m",Ic).call(n,e,r);)t[s++]=Qe(n,Ye,"m",Dc).call(n,e,r++);if(e[r]==="."){let u=++r;for(;Qe(n,Ye,"m",Ic).call(n,e,r);)t[s++]=Qe(n,Ye,"m",Dc).call(n,e,r++);i=u-r}if(e[r]==="e"||e[r]==="E"){let u=0;r++;let l=1;e[r]==="-"?(l=-1,r++):e[r]==="+"&&r++;let B=r;for(;Qe(n,Ye,"m",Ic).call(n,e,r);)if(u=10*u+Qe(n,Ye,"m",Dc).call(n,e,r++),r-B>9)throw new Error("Exponent too large "+e);if(r===B)throw new Error("Invalid number "+e);i+=u*l}if(s===0||r!==e.length)throw new Error("Invalid number "+e);let c=Le.I(t.slice(0,s),i);return new n(o,c.exponent,c.i,c.o)}};Ye=Ee,jh=function(e){return e.toString(16).padStart(16,"0")},Ic=function(e,t){let r=e.codePointAt(t);return r!==void 0&&r>=48&&r<=57},Dc=function(e,t){return e.codePointAt(t)-48},ho=function(e){return e+Le.U},Ss={value:Number(Le.m)},Ee.le=new Ee(!1,0,0n,0n),Ee.Ee=new Ee(!0,0,0n,0n),Ee.NaN=new Ee(!1,Qe(Ee,Ye,"f",Ss),1n<<63n,0n),Ee.ue=new Ee(!0,Qe(Ee,Ye,"f",Ss),0n,0n),Ee.ce=new Ee(!1,Qe(Ee,Ye,"f",Ss),0n,0n),new Ee(!0,Qe(Ee,Ye,"m",ho).call(Ee,63),0n,0n),new Ee(!1,Qe(Ee,Ye,"m",ho).call(Ee,0),0n,0n),new Ee(!0,Qe(Ee,Ye,"m",ho).call(Ee,0),0n,0n);var Nf=-1;function yu(n){return n==null}function Ms(n){return n===0&&1/n==-1/0}function MA(n){return typeof n=="number"&&Number.isInteger(n)&&!Ms(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function GA(n){return typeof n=="string"}var wu="__type__",Iu="__vector__",jr="value",UA="server_timestamp",xf="__min__",Yo="__max__",an="__regex__",Gs="pattern",Us="options",Kr="__oid__",Br="__int__",On="__decimal128__",An="__request_timestamp__",yo="seconds",wo="increment",Hs="__binary__",qs={nullValue:"NULL_VALUE"},Ec={mapValue:{fields:{__type__:{stringValue:Yo}}}},CP={mapValue:{fields:{[wu]:{stringValue:Iu},[jr]:{arrayValue:{}}}}},mP={mapValue:{fields:{[xf]:{nullValue:"NULL_VALUE"}}}},EP={mapValue:{fields:{[Yo]:{nullValue:"NULL_VALUE"}}}},_P={mapValue:{fields:{[Kr]:{stringValue:""}}}},yP={mapValue:{fields:{[An]:{mapValue:{fields:{[yo]:{integerValue:0},[wo]:{integerValue:0}}}}}}},wP={mapValue:{fields:{[an]:{mapValue:{fields:{[Gs]:{stringValue:""},[Us]:{stringValue:""}}}}}}},he,Mt;(Mt=he||(he={})).he="regexValue",Mt.Te="bsonObjectIdValue",Mt.Pe="int32Value",Mt.Ie="decimal128Value",Mt.Re="bsonTimestampValue",Mt.Ae="bsonBinaryValue",Mt.Ve="minKeyValue",Mt.de="maxKeyValue",Mt.fe="maxValue",Mt.me="vectorValue",Mt.pe="serverTimestampValue",Mt.ge="regularMapValue";var nE={[Iu]:he.me,[Yo]:he.fe,[UA]:he.pe},zE={[an]:he.he,[Kr]:he.Te,[Br]:he.Pe,[On]:he.Ie,[An]:he.Re,[Hs]:he.Ae,[xf]:he.Ve,[Yo]:he.de},HA=new Set(Object.values(zE)),Tt={booleanValue:!0},Ze={booleanValue:!1};function He(n){if("nullValue"in n)return 0;if("booleanValue"in n)return 2;if("integerValue"in n||"doubleValue"in n)return 3;if("timestampValue"in n)return 4;if("stringValue"in n)return 7;if("bytesValue"in n)return 8;if("referenceValue"in n)return 9;if("geoPointValue"in n)return 11;if("arrayValue"in n)return 13;if(!("mapValue"in n))return Z(28295,{value:n});switch(Lf(n)){case he.pe:return 6;case he.fe:return 9007199254740991;case he.me:return 14;case he.he:return 12;case he.Te:return 10;case he.Pe:case he.Ie:return 3;case he.Re:return 5;case he.Ae:return 8;case he.Ve:return 1;case he.de:return 16;default:return 15}}function Ht(n,e,t){if(n===e)return!0;let r=He(n);if(r!==He(e))return!1;switch(r){case 0:case 9007199254740991:case 16:case 1:return!0;case 2:return n.booleanValue===e.booleanValue;case 6:return Vs(n).isEqual(Vs(e));case 4:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;let c=Sn(i.timestampValue),u=Sn(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos}(n,e);case 7:return n.stringValue===e.stringValue;case 8:return function(i,o){return YE(i,o)===0}(n,e);case 9:return n.referenceValue===e.referenceValue;case 11:return function(i,o){return Te(i.geoPointValue.latitude)===Te(o.geoPointValue.latitude)&&Te(i.geoPointValue.longitude)===Te(o.geoPointValue.longitude)}(n,e);case 3:return function(i,o,c){if(qt(i)&&qt(o))return $E(i,o)===0;if("integerValue"in i&&"integerValue"in o||ir(i)&&ir(o))return Do(i)===Do(o);let u,l;if("doubleValue"in i&&"doubleValue"in o)u=Te(i.doubleValue),l=Te(o.doubleValue);else{if(!c?.ye)return!1;u=Te(i.integerValue??i.doubleValue),l=Te(o.integerValue??o.doubleValue)}return u===l?!!c?.we||Ms(u)===Ms(l):!!(c===void 0||c.be)&&isNaN(u)&&isNaN(l)}(n,e,t);case 13:return ks(n.arrayValue.values||[],e.arrayValue.values||[],(s,i)=>Ht(s,i,t));case 14:case 15:return function(i,o,c){let u=i.mapValue.fields||{},l=o.mapValue.fields||{};if(qr(u)!==qr(l))return!1;for(let B in u)if(u.hasOwnProperty(B)&&(l[B]===void 0||!Ht(u[B],l[B],c)))return!1;return!0}(n,e,t);case 5:return QE(n,e)===0;case 12:return XE(n,e)===0;case 10:return ZE(n,e)===0;default:return Z(52216,{left:n})}}function Io(n,e){return(n.values||[]).find(t=>Ht(t,e))!==void 0}function At(n,e){if(n===e)return 0;let t=He(n),r=He(e);if(t!==r)return ce(t,r);switch(t){case 0:case 1:case 16:case 9007199254740991:return 0;case 2:return ce(n.booleanValue,e.booleanValue);case 3:return To(n,e);case 4:return sE(n.timestampValue,e.timestampValue);case 6:return sE(Vs(n),Vs(e));case 7:return Eo(n.stringValue,e.stringValue);case 8:return YE(n,e);case 9:return function(i,o){let c=i.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){let B=ce(c[l],u[l]);if(B!==0)return B}return ce(c.length,u.length)}(n.referenceValue,e.referenceValue);case 11:return function(i,o){let c=ce(Te(i.latitude),Te(o.latitude));return c!==0?c:ce(Te(i.longitude),Te(o.longitude))}(n.geoPointValue,e.geoPointValue);case 13:return iE(n.arrayValue,e.arrayValue);case 14:return function(i,o){let c=i.fields||{},u=o.fields||{},l=c[jr]?.arrayValue,B=u[jr]?.arrayValue,f=ce(l?.values?.length||0,B?.values?.length||0);return f!==0?f:iE(l,B)}(n.mapValue,e.mapValue);case 15:return function(i,o){if(i===Ec.mapValue&&o===Ec.mapValue)return 0;if(i===Ec.mapValue)return 1;if(o===Ec.mapValue)return-1;let c=i.fields||{},u=Object.keys(c),l=o.fields||{},B=Object.keys(l);u.sort(),B.sort();for(let f=0;f<u.length&&f<B.length;++f){let g=Eo(u[f],B[f]);if(g!==0)return g;let I=At(c[u[f]],l[B[f]]);if(I!==0)return I}return ce(u.length,B.length)}(n.mapValue,e.mapValue);case 5:return QE(n,e);case 12:return XE(n,e);case 10:return ZE(n,e);default:throw Z(23264,{Se:t})}}function Do(n){let e;return e=ir(n)?n.mapValue.fields[Br].integerValue:n.integerValue||n.doubleValue,Te(e)}function WE(n){return n.mapValue.fields[On].stringValue}function To(n,e){if(qt(n)||qt(e))return $E(n,e);let t=Do(n),r=Do(e);return isNaN(t)?isNaN(r)?0:-1:isNaN(r)?1:ce(t,r)}function $E(n,e){let t=rE(n),r=rE(e);return t.oe()&&r.oe()?0:t.isNaN()?r.isNaN()?0:-1:r.isNaN()?1:t.compareTo(r)}function rE(n){return qt(n)?Ee.fromString(WE(n)):Ee.fromNumber(Do(n))}function sE(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ce(n,e);let t=Sn(n),r=Sn(e),s=ce(t.seconds,r.seconds);return s!==0?s:ce(t.nanos,r.nanos)}function iE(n,e){let t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){let i=At(t[s],r[s]);if(i!==void 0&&i!==0)return i}return ce(t.length,r.length)}function QE(n,e){let t=n.mapValue.fields?.[An].mapValue?.fields?.[yo],r=e.mapValue.fields?.[An].mapValue?.fields?.[yo],s=n.mapValue.fields?.[An].mapValue?.fields?.[wo],i=e.mapValue.fields?.[An].mapValue?.fields?.[wo],o=To(t,r);return o!==0?o:To(s,i)}function oE(n){if("bytesValue"in n)return{subtype:0,bytes:Qt(n.bytesValue)};let e=n.mapValue?.fields,t=e?.[Hs],r=t?.bytesValue;if(!r)throw new Error("Received incorrect value for BsonBinaryData");let s=Qt(r).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for BsonBinaryData");let i=s[0],o=s.slice(1);return{subtype:i,bytes:be.fromUint8Array(o)}}function YE(n,e){let t=oE(n),r=oE(e);return t.subtype!==r.subtype?t.subtype<r.subtype?-1:1:t.bytes.compareTo(r.bytes)}function XE(n,e){let t=n.mapValue.fields,r=t?.[an]?.mapValue?.fields?.[Gs]?.stringValue??"",s=t?.[an]?.mapValue?.fields?.[Us]?.stringValue??"",i=e.mapValue.fields,o=i?.[an]?.mapValue?.fields?.[Gs]?.stringValue??"",c=i?.[an]?.mapValue?.fields?.[Us]?.stringValue??"",u=Eo(r,o);return u!==0?u:ce(s,c)}function ZE(n,e){return Eo(n.mapValue.fields?.[Kr]?.stringValue??"",e.mapValue.fields?.[Kr]?.stringValue??"")}function js(n){return Kh(n)}function Kh(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=Sn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Qt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return ee.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(let i of t.values||[])s?s=!1:r+=",",r+=Kh(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),s="{",i=!0;for(let o of r)i?i=!1:s+=",",s+=`${o}:${Kh(t.fields[o])}`;return s+"}"}(n.mapValue):Z(61005,{value:n})}function Oc(n){switch(He(n)){case 0:case 2:return 4;case 3:return qt(n)?16:8;case 4:case 11:return 16;case 6:let e=Qo(n);return e?16+Oc(e):16;case 7:return 2*n.stringValue.length;case 8:return"bytesValue"in n?Qt(n.bytesValue).approximateByteSize():aE(n.mapValue);case 9:return n.referenceValue.length;case 13:return function(r){return(r.values||[]).reduce((s,i)=>s+Oc(i),0)}(n.arrayValue);case 14:case 15:case 12:case 10:case 5:case 1:case 16:return aE(n.mapValue);default:throw Z(13486,{value:n})}}function aE(n){let e=0;return os(n.fields,(t,r)=>{e+=t.length+Oc(r)}),e}function cn(n){return!!n&&"integerValue"in n}function un(n){return!!n&&"doubleValue"in n}function qt(n){if(!n.mapValue?.fields)return!1;let e=n.mapValue.fields;return qr(e)===1&&e[On]&&!!e[On].stringValue}function ir(n){if(!n.mapValue?.fields)return!1;let e=n.mapValue.fields;return qr(e)===1&&e[Br]?.integerValue!==void 0}function Pn(n){return cn(n)||un(n)||!!n&&ir(n)||!!n&&qt(n)}function Ks(n){return!!n&&"arrayValue"in n}function xt(n){return!!n&&"nullValue"in n}function et(n){return!(!un(n)||!isNaN(Number(n.doubleValue)))||!(!qt(n)||WE(n)!=="NaN")}function Gr(n){return!!n&&"mapValue"in n}function Lf(n){if(!n.mapValue?.fields)return he.ge;let e=n.mapValue.fields,t=e[wu]?.stringValue;if(t&&nE[t])return nE[t];if(qr(e)===1){let r=Object.keys(e);return zE[r[0]]??he.ge}return he.ge}function Jh(n){return(n?.mapValue?.fields||{})[wu]?.stringValue===Iu}function zh(n){return(n?.mapValue?.fields||{})[jr]?.arrayValue}function Bo(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){let e={mapValue:{fields:{}}};return os(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Bo(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Bo(n.arrayValue.values[t]);return e}return{...n}}var Nt=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Gr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Bo(t)}setAll(e){let t=Dt.emptyPath(),r={},s=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){let u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Bo(o):s.push(c.lastSegment())});let i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){let t=this.field(e.popLast());Gr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ht(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Gr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){os(t,(s,i)=>e[s]=i);for(let s of r)delete e[s]}clone(){return new n(Bo(this.value))}};function e_(n){let e=[];return os(n.fields,(t,r)=>{let s=new Dt([t]);if(Gr(r)&&!function(o){return HA.has(Lf(o))}(r)){let i=e_(r.mapValue).fields;if(i.length===0)e.push(s);else for(let o of i)e.push(s.child(o))}else e.push(s)}),new on(e)}function kf(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ms(e)?"-0":e}}function Os(n){return{integerValue:""+n}}function Ff(n,e,t){return MA(e)?Os(e):kf(n,e)}var Js=class{constructor(){this._=void 0}};function qA(n,e,t){return n instanceof zs?function(s,i){let o={fields:{[qE]:{stringValue:HE},[KE]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&_u(i)&&(i=Qo(i)),i&&(o.fields[jE]=i),{mapValue:o}}(t,e):n instanceof Jr?n_(n,e):n instanceof zr?r_(n,e):n instanceof Wr?function(s,i){let o=t_(s,i),c=cE(o)+cE(s.xe);return qt(o)||qt(s.xe)?{mapValue:{fields:{[On]:{stringValue:c.toString()}}}}:ir(o)?un(s.xe)?{doubleValue:c}:cn(s.xe)?{integerValue:c.toString()}:{mapValue:{fields:{[Br]:Os(c)}}}:cn(o)&&(cn(s.xe)||ir(s.xe))?Os(c):kf(s.serializer,c)}(n,e):n instanceof Ws?function(s,i){return!Pn(i)||et(s.xe)?s.xe:et(i)?i:To(s.xe,i)<0?s.xe:i}(n,e):n instanceof $s?function(s,i){return!Pn(i)||et(s.xe)?s.xe:et(i)?i:To(s.xe,i)>0?s.xe:i}(n,e):void 0}function jA(n,e,t){return n instanceof Jr?n_(n,e):n instanceof zr?r_(n,e):t}function t_(n,e){return n instanceof Wr?Pn(e)?e:{integerValue:0}:null}var zs=class extends Js{},Jr=class extends Js{constructor(e){super(),this.elements=e}};function n_(n,e){let t=s_(e);for(let r of n.elements)t.some(s=>Ht(s,r))||t.push(r);return{arrayValue:{values:t}}}var zr=class extends Js{constructor(e){super(),this.elements=e}};function r_(n,e){let t=s_(e);for(let r of n.elements)t=t.filter(s=>!Ht(s,r));return{arrayValue:{values:t}}}var Ao=class extends Js{constructor(e,t){super(),this.serializer=e,this.xe=t}},Wr=class extends Ao{},Ws=class extends Ao{},$s=class extends Ao{};function cE(n){return cn(n)?Te(n.integerValue):un(n)?Te(n.doubleValue):ir(n)?Te(n.mapValue.fields[Br].integerValue):qt(n)?parseFloat(n.mapValue.fields[On].stringValue):0}function s_(n){return Ks(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function KA(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Jr&&s instanceof Jr||r instanceof zr&&s instanceof zr?ks(r.elements,s.elements,Ht):r instanceof Wr&&s instanceof Wr||r instanceof Ws&&s instanceof Ws||r instanceof $s&&s instanceof $s?Ht(r.xe,s.xe):r instanceof zs&&s instanceof zs}(n.transform,e.transform)}var Wh=class{constructor(e,t){this.version=e,this.transformResults=t}},tr=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Tc(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Qs=class{};function i_(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new bo(n.key,tr.none()):new $r(n.key,n.data,tr.none());{let t=n.data,r=Nt.empty(),s=new Ke(Dt.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Nn(n.key,r,new on(s.toArray()),tr.none())}}function JA(n,e,t){n instanceof $r?function(s,i,o){let c=s.value.clone(),u=lE(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Nn?function(s,i,o){if(!Tc(s.precondition,i))return void i.convertToUnknownDocument(o.version);let c=lE(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(o_(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function fo(n,e,t,r){return n instanceof $r?function(i,o,c,u){if(!Tc(i.precondition,o))return c;let l=i.value.clone(),B=hE(i.fieldTransforms,u,o);return l.setAll(B),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof Nn?function(i,o,c,u){if(!Tc(i.precondition,o))return c;let l=hE(i.fieldTransforms,u,o),B=o.data;return B.setAll(o_(i)),B.setAll(l),o.convertToFoundDocument(o.version,B).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(f=>f.field))}(n,e,t,r):function(i,o,c){return Tc(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function zA(n,e){let t=null;for(let r of n.fieldTransforms){let s=e.data.field(r.field),i=t_(r.transform,s||null);i!=null&&(t===null&&(t=Nt.empty()),t.set(r.field,i))}return t||null}function uE(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ks(r,s,(i,o)=>KA(i,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var $r=class extends Qs{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},Nn=class extends Qs{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}};function o_(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function lE(n,e,t){let r=new Map;Q(n.length===t.length,32656,{ve:t.length,De:n.length});for(let s=0;s<t.length;s++){let i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,jA(o,c,t[s]))}return r}function hE(n,e,t){let r=new Map;for(let s of n){let i=s.transform,o=t.data.field(s.field);r.set(s.field,qA(i,o,e))}return r}var bo=class extends Qs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},$h=class extends Qs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var Qr=class{constructor(e,t){this.position=e,this.inclusive=t}};function BE(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){let i=e[s],o=n.position[s];if(i.field.isKeyField()?r=ee.comparator(ee.fromName(o.referenceValue),t.key):r=At(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function dE(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ht(n.position[t],e.position[t]))return!1;return!0}var Pc=class{},Ue=class n extends Pc{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Yh(e,t,r):t==="array-contains"?new eB(e,r):t==="in"?new tB(e,r):t==="not-in"?new nB(e,r):t==="array-contains-any"?new rB(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Xh(e,r):new Zh(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(At(t,this.value)):t!==null&&He(this.value)===He(t)&&this.matchesComparison(At(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Yt=class n extends Pc{constructor(e,t){super(),this.filters=e,this.op=t,this.Ce=null}static create(e,t){return new n(e,t)}matches(e){return a_(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Ce!==null||(this.Ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Ce}getFilters(){return Object.assign([],this.filters)}};function a_(n){return n.op==="and"}function c_(n){return WA(n)&&a_(n)}function WA(n){for(let e of n.filters)if(e instanceof Yt)return!1;return!0}function Qh(n){if(n instanceof Ue)return n.field.canonicalString()+n.op.toString()+js(n.value);if(c_(n))return n.filters.map(e=>Qh(e)).join(",");{let e=n.filters.map(t=>Qh(t)).join(",");return`${n.op}(${e})`}}function u_(n,e){return n instanceof Ue?function(r,s){return s instanceof Ue&&r.op===s.op&&r.field.isEqual(s.field)&&Ht(r.value,s.value)}(n,e):n instanceof Yt?function(r,s){return s instanceof Yt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,c)=>i&&u_(o,s.filters[c]),!0):!1}(n,e):void Z(19439)}function l_(n){return n instanceof Ue?function(t){return`${t.field.canonicalString()} ${t.op} ${js(t.value)}`}(n):n instanceof Yt?function(t){return t.op.toString()+" {"+t.getFilters().map(l_).join(" ,")+"}"}(n):"Filter"}var Yh=class extends Ue{constructor(e,t,r){super(e,t,r),this.key=ee.fromName(r.referenceValue)}matches(e){let t=ee.comparator(e.key,this.key);return this.matchesComparison(t)}},Xh=class extends Ue{constructor(e,t){super(e,"in",t),this.keys=h_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Zh=class extends Ue{constructor(e,t){super(e,"not-in",t),this.keys=h_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function h_(n,e){return(e.arrayValue?.values||[]).map(t=>ee.fromName(t.referenceValue))}var eB=class extends Ue{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return Ks(t)&&Io(t.arrayValue,this.value)}},tB=class extends Ue{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Io(this.value.arrayValue,t)}},nB=class extends Ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(Io(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Io(this.value.arrayValue,t)}},rB=class extends Ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!Ks(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Io(this.value.arrayValue,r))}};var Yr=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function $A(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var se=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new Re(0,0))}static max(){return new n(new Re(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Xt=class n{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new n(e,0,se.min(),se.min(),se.min(),Nt.empty(),0)}static newFoundDocument(e,t,r,s){return new n(e,1,t,se.min(),r,s,0)}static newNoDocument(e,t){return new n(e,2,t,se.min(),se.min(),Nt.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,se.min(),se.min(),Nt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(se.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Nt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Nt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=se.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var vo=-1,Nc=class{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}};Nc.UNKNOWN_ID=-1;function QA(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=se.fromTimestamp(r===1e9?new Re(t+1,0):new Re(t,r));return new Xr(s,ee.empty(),e)}function YA(n){return new Xr(n.readTime,n.key,vo)}var Xr=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(se.min(),ee.empty(),vo)}static max(){return new n(se.max(),ee.empty(),vo)}};function XA(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=ee.comparator(n.documentKey,e.documentKey),t!==0?t:ce(n.largestBatchId,e.largestBatchId))}var sB=class{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Fe=null}};function fE(n,e=null,t=[],r=[],s=null,i=null,o=null){return new sB(n,e,t,r,s,i,o)}function B_(n){let e=ie(n);if(e.Fe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Qh(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),yu(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>js(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>js(r)).join(",")),e.Fe=t}return e.Fe}function d_(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!$A(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!u_(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!dE(n.startAt,e.startAt)&&dE(n.endAt,e.endAt)}function Fr(n){return!!n.isCorePipeline}function f_(n){return!!n.path&&ee.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var Ys=class{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.Oe=null,this.Me=null,this.Ne=null,this.startAt,this.endAt}};function ZA(n,e,t,r,s,i,o,c){return new Ys(n,e,t,r,s,i,o,c)}function Du(n){return new Ys(n)}function pE(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function eb(n){return ee.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function p_(n){return n.collectionGroup!==null}function Ps(n){let e=ie(n);if(e.Oe===null){e.Oe=[];let t=new Set;for(let i of e.explicitOrderBy)e.Oe.push(i),t.add(i.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Ke(Dt.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(c=c.add(l.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Oe.push(new Yr(i,r))}),t.has(Dt.keyField().canonicalString())||e.Oe.push(new Yr(Dt.keyField(),r))}return e.Oe}function hn(n){let e=ie(n);return e.Me||(e.Me=tb(e,Ps(n))),e.Me}function tb(n,e){if(n.limitType==="F")return fE(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{let i=s.dir==="desc"?"asc":"desc";return new Yr(s.field,i)});let t=n.endAt?new Qr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Qr(n.startAt.position,n.startAt.inclusive):null;return fE(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function xc(n,e,t){return new Ys(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function nb(n,e){return d_(hn(n),hn(e))&&n.limitType===e.limitType}function po(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>l_(s)).join(", ")}]`),yu(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>js(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>js(s)).join(",")),`Target(${r})`}(hn(n))}; limitType=${n.limitType})`}function Tu(n,e){return e.isFoundDocument()&&function(r,s){let i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):ee.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(let i of Ps(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(let i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(o,c,u){let l=BE(o,c,u);return o.inclusive?l<=0:l<0}(r.startAt,Ps(r),s)||r.endAt&&!function(o,c,u){let l=BE(o,c,u);return o.inclusive?l>=0:l>0}(r.endAt,Ps(r),s))}(n,e)}function Vf(n){return(e,t)=>{let r=!1;for(let s of Ps(n)){let i=rb(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function rb(n,e,t){let r=n.field.isKeyField()?ee.comparator(e.key,t.key):function(i,o,c){let u=o.data.field(i),l=c.data.field(i);return u!==null&&l!==null?At(u,l):Z(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Z(19790,{direction:n.dir})}}var iB=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var Me,pe;function sb(n){switch(n){case F.OK:return Z(64938);case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0;default:return Z(15467,{code:n})}}function g_(n){if(n===void 0)return Rn("GRPC error has no .code"),F.UNKNOWN;switch(n){case Me.OK:return F.OK;case Me.CANCELLED:return F.CANCELLED;case Me.UNKNOWN:return F.UNKNOWN;case Me.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case Me.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case Me.INTERNAL:return F.INTERNAL;case Me.UNAVAILABLE:return F.UNAVAILABLE;case Me.UNAUTHENTICATED:return F.UNAUTHENTICATED;case Me.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case Me.NOT_FOUND:return F.NOT_FOUND;case Me.ALREADY_EXISTS:return F.ALREADY_EXISTS;case Me.PERMISSION_DENIED:return F.PERMISSION_DENIED;case Me.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case Me.ABORTED:return F.ABORTED;case Me.OUT_OF_RANGE:return F.OUT_OF_RANGE;case Me.UNIMPLEMENTED:return F.UNIMPLEMENTED;case Me.DATA_LOSS:return F.DATA_LOSS;default:return Z(39323,{code:n})}}(pe=Me||(Me={}))[pe.OK=0]="OK",pe[pe.CANCELLED=1]="CANCELLED",pe[pe.UNKNOWN=2]="UNKNOWN",pe[pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",pe[pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",pe[pe.NOT_FOUND=5]="NOT_FOUND",pe[pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",pe[pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",pe[pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",pe[pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",pe[pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",pe[pe.ABORTED=10]="ABORTED",pe[pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",pe[pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",pe[pe.INTERNAL=13]="INTERNAL",pe[pe.UNAVAILABLE=14]="UNAVAILABLE",pe[pe.DATA_LOSS=15]="DATA_LOSS";var xn=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){os(this.inner,(t,r)=>{for(let[s,i]of r)e(s,i)})}isEmpty(){return GE(this.inner)}size(){return this.innerSize}};var ib=new Se(ee.comparator);function It(){return ib}var C_=new Se(ee.comparator);function As(...n){let e=C_;for(let t of n)e=e.insert(t.key,t);return e}function m_(n){let e=C_;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Zn(){return go()}function E_(){return go()}function go(){return new xn(n=>n.toString(),(n,e)=>n.isEqual(e))}var ob=new Se(ee.comparator),ab=new Ke(ee.comparator);function le(...n){let e=ab;for(let t of n)e=e.add(t);return e}var cb=new Ke(ce);function ub(){return cb}var lb=null;function hb(){return new TextEncoder}var Bb=new Dn([4294967295,4294967295],0);function gE(n){let e=hb().encode(n),t=new Eh;return t.update(e),new Uint8Array(t.digest())}function CE(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Dn([t,r],0),new Dn([s,i],0)]}var oB=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Vr(`Invalid padding: ${t}`);if(r<0)throw new Vr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Vr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Vr(`Invalid padding when bitmap length is 0: ${t}`);this.Be=8*e.length-t,this.Le=Dn.fromNumber(this.Be)}$e(e,t,r){let s=e.add(t.multiply(Dn.fromNumber(r)));return s.compare(Bb)===1&&(s=new Dn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Le).toNumber()}Ue(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Be===0)return!1;let t=gE(e),[r,s]=CE(t);for(let i=0;i<this.hashCount;i++){let o=this.$e(r,s,i);if(!this.Ue(o))return!1}return!0}static create(e,t,r){let s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new n(i,s,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.Be===0)return;let t=gE(e),[r,s]=CE(t);for(let i=0;i<this.hashCount;i++){let o=this.$e(r,s,i);this.ke(o)}}ke(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},Vr=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Ro=class n{constructor(e,t,r,s,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let s=new Map;return s.set(e,So.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(se.min(),s,new Se(ce),It(),It(),le())}},So=class n{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,le(),le(),le())}};var Ns=class{constructor(e,t,r,s){this.Qe=e,this.removedTargetIds=t,this.key=r,this.qe=s}},Lc=class{constructor(e,t){this.targetId=e,this.Ke=t}},kc=class{constructor(e,t,r=be.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}},Fc=class{constructor(e){this.targetId=e,this.We=0,this.Ge=mE(),this.je=be.EMPTY_BYTE_STRING,this.ze=!1,this.He=!0}get current(){return this.ze}get resumeToken(){return this.je}get Je(){return this.We!==0}get Ye(){return this.He}Ze(e){e.approximateByteSize()>0&&(this.He=!0,this.je=e)}Xe(){let e=le(),t=le(),r=le();return this.Ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:Z(38017,{changeType:i})}}),new So(this.je,this.ze,e,t,r)}et(){this.He=!1,this.Ge=mE()}tt(e,t){this.He=!0,this.Ge=this.Ge.insert(e,t)}nt(e){this.He=!0,this.Ge=this.Ge.remove(e)}rt(){this.We+=1}it(){this.We-=1,Q(this.We>=0,3241,{We:this.We,targetId:this.targetId})}st(){this.He=!0,this.ze=!0}},uo="WatchChangeAggregator",aB=class{constructor(e){this._t=e,this.ot=new Map,this.ut=It(),this.ct=_c(),this.lt=It(),this.Et=_c(),this.ht=new Se(ce)}Tt(e){for(let t of e.Qe)e.qe&&e.qe.isFoundDocument()?this.Pt(t,e.qe):this.It(t,e.key,e.qe);for(let t of e.removedTargetIds)this.It(t,e.key,e.qe)}Rt(e){this.forEachTarget(e,t=>{let r=this.ot.get(t);if(r)switch(e.state){case 0:this.At(t)&&r.Ze(e.resumeToken);break;case 1:r.it(),r.Je||r.et(),r.Ze(e.resumeToken);break;case 2:r.it(),r.Je||this.removeTarget(t);break;case 3:this.At(t)&&(r.st(),r.Ze(e.resumeToken));break;case 4:this.At(t)&&(this.Vt(t),r.Ze(e.resumeToken));break;default:Z(56790,{state:e.state})}else J(uo,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ot.forEach((r,s)=>{this.At(s)&&t(s)})}dt(e){return Fr(e)?e.getPipelineSourceType()==="documents"&&e.getPipelineDocuments()?.length===1:f_(e)}ft(e){let t=e.targetId,r=e.Ke.count,s=this.gt(t);if(s){let i=s.target;if(this.dt(i))if(r===0){let o=new ee(Fr(i)?Ie.fromString(i.getPipelineDocuments()[0]):i.path);this.It(t,o,Xt.newNoDocument(o,se.min()))}else Q(r===1,20013,"Single document existence filter with count: "+r);else{let o=this.yt(t);if(o!==r){let c=this.wt(e),u=c?this.bt(c,e,o):1;if(u!==0){this.Vt(t);let l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.ht=this.ht.insert(t,l)}lb?.St(function(B,f,g,I,D){let O={localCacheCount:B,existenceFilterCount:f.count,databaseId:g.database,projectId:g.projectId},M=f.unchangedNames;return M&&(O.bloomFilter={applied:D===0,hashCount:M?.hashCount??0,bitmapLength:M?.bits?.bitmap?.length??0,padding:M?.bits?.padding??0,mightContain:K=>I?.mightContain(K)??!1}),O}(o,e.Ke,this._t.xt(),c,u))}}}}wt(e){let t=e.Ke.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t,o,c;try{o=Qt(r).toUint8Array()}catch(u){if(u instanceof Rc)return Ut("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new oB(o,s,i)}catch(u){return Ut(u instanceof Vr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Be===0?null:c}bt(e,t,r){return t.Ke.count===r-this.vt(e,t.targetId)?0:2}vt(e,t){let r=this._t.getRemoteKeysForTarget(t),s=0;return r.forEach(i=>{let o=this._t.xt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.It(t,i,null),s++)}),s}Dt(e){let t=new Map;this.ot.forEach((i,o)=>{let c=this.gt(o);if(c){if(i.current&&this.dt(c.target)){let u=Fr(c.target)?Ie.fromString(c.target.getPipelineDocuments()[0]):c.target.path,l=new ee(u);this.Ct(l).has(o)||this.Ft(o,l)||this.It(o,l,Xt.newNoDocument(l,e))}i.Ye&&(t.set(o,i.Xe()),i.et())}});let r=le();this.Et.forEach((i,o)=>{let c=!0;o.forEachWhile(u=>{let l=this.gt(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.ut.forEach((i,o)=>o.setReadTime(e)),this.lt.forEach((i,o)=>o.setReadTime(e));let s=new Ro(e,t,this.ht,this.ut,this.lt,r);return this.ut=It(),this.ct=_c(),this.lt=It(),this.Et=_c(),this.ht=new Se(ce),s}Pt(e,t){let r=this.ot.get(e);if(!r||!this.At(e))return void J(uo,`addDocumentToTarget received document for unknown inactive target (${e})`);let s=this.Ft(e,t.key)?2:0;r.tt(t.key,s),Fr(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t.key,t):this.ut=this.ut.insert(t.key,t),this.ct=this.ct.insert(t.key,this.Ct(t.key).add(e)),this.Et=this.Et.insert(t.key,this.Ot(t.key).add(e))}It(e,t,r){let s=this.ot.get(e);s&&this.At(e)?(this.Ft(e,t)?s.tt(t,1):s.nt(t),this.Et=this.Et.insert(t,this.Ot(t).delete(e)),this.Et=this.Et.insert(t,this.Ot(t).add(e)),r&&(Fr(this.gt(e).target)&&this.gt(e).target.getPipelineFlavor()!=="exact"?this.lt=this.lt.insert(t,r):this.ut=this.ut.insert(t,r))):J(uo,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ot.delete(e)}yt(e){let t=this.ot.get(e);if(!t)return 0;let r=t.Xe();return this._t.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}rt(e){let t=this.ot.get(e);t||(J(uo,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Fc(e),this.ot.set(e,t)),t.rt()}Ot(e){let t=this.Et.get(e);return t||(t=new Ke(ce),this.Et=this.Et.insert(e,t)),t}Ct(e){let t=this.ct.get(e);return t||(t=new Ke(ce),this.ct=this.ct.insert(e,t)),t}At(e){let t=this.gt(e)!==null;return t||J(uo,"Detected inactive target",e),t}gt(e){let t=this.ot.get(e);return t===void 0||t.Je?null:this._t.Mt(e)}Vt(e){this.ot.set(e,new Fc(e)),this._t.getRemoteKeysForTarget(e).forEach(t=>{this.It(e,t,null)})}Ft(e,t){return this._t.getRemoteKeysForTarget(e).has(t)}};function _c(){return new Se(ee.comparator)}function mE(){return new Se(ee.comparator)}var db={asc:"ASCENDING",desc:"DESCENDING"},fb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},pb={and:"AND",or:"OR"},cB=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function uB(n,e){return n.useProto3Json||yu(e)?e:{value:e}}function Co(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Mf(n){let e=Sn(n);return new Re(e.seconds,e.nanos)}function lB(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Ac(n,e){return Co(n,e.toTimestamp())}function Bn(n){return Q(!!n,49232),se.fromTimestamp(Mf(n))}function Gf(n,e){return hB(n,e).canonicalString()}function hB(n,e){let t=function(s){return new Ie(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function __(n){let e=Ie.fromString(n);return Q(T_(e),10190,{key:e.toString()}),e}function Vc(n,e){return Gf(n.databaseId,e.path)}function Fh(n,e){let t=__(e);if(t.get(1)!==n.databaseId.projectId)throw new W(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new ee(w_(t))}function y_(n,e){return Gf(n.databaseId,e)}function gb(n){let e=__(n);return e.length===4?Ie.emptyPath():w_(e)}function BB(n){return new Ie(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function w_(n){return Q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function EE(n,e,t){return{name:Vc(n,e),fields:t.value.mapValue.fields}}function Cb(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:Z(39313,{state:l})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(l,B){return l.useProto3Json?(Q(B===void 0||typeof B=="string",58123),be.fromBase64String(B||"")):(Q(B===void 0||B instanceof Buffer||B instanceof Uint8Array,16193),be.fromUint8Array(B||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(l){let B=l.code===void 0?F.UNKNOWN:g_(l.code);return new W(B,l.message||"")}(o);t=new kc(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let s=Fh(n,r.document.name),i=Bn(r.document.updateTime),o=r.document.createTime?Bn(r.document.createTime):se.min(),c=new Nt({mapValue:{fields:r.document.fields}}),u=Xt.newFoundDocument(s,i,o,c),l=r.targetIds||[],B=r.removedTargetIds||[];t=new Ns(l,B,u.key,u)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let s=Fh(n,r.document),i=r.readTime?Bn(r.readTime):se.min(),o=Xt.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ns([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let s=Fh(n,r.document),i=r.removedTargetIds||[];t=new Ns([],i,s,null)}else{if(!("filter"in e))return Z(11601,{Nt:e});{e.filter;let r=e.filter;r.targetId;let{count:s=0,unchangedNames:i}=r,o=new iB(s,i),c=r.targetId;t=new Lc(c,o)}}return t}function mb(n,e){let t;if(e instanceof $r)t={update:EE(n,e.key,e.value)};else if(e instanceof bo)t={delete:Vc(n,e.key)};else if(e instanceof Nn)t={update:EE(n,e.key,e.data),updateMask:vb(e.fieldMask)};else{if(!(e instanceof $h))return Z(16599,{Bt:e.type});t={verify:Vc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,o){let c=o.transform;if(c instanceof zs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Jr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof zr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Wr)return{fieldPath:o.field.canonicalString(),increment:c.xe};if(c instanceof Ws)return{fieldPath:o.field.canonicalString(),minimum:c.xe};if(c instanceof $s)return{fieldPath:o.field.canonicalString(),maximum:c.xe};throw Z(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Ac(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Z(27497)}(n,e.precondition)),t}function Eb(n,e){return n&&n.length>0?(Q(e!==void 0,14353),n.map(t=>function(s,i){let o=s.updateTime?Bn(s.updateTime):Bn(i);return o.isEqual(se.min())&&(o=Bn(i)),new Wh(o,s.transformResults||[])}(t,e))):[]}function _b(n,e){return{documents:[y_(n,e.path)]}}function yb(n,e){let t={structuredQuery:{}},r=e.path,s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=y_(n,s);let i=function(l){if(l.length!==0)return D_(Yt.create(l,"and"))}(e.filters);i&&(t.structuredQuery.where=i);let o=function(l){if(l.length!==0)return l.map(B=>function(g){return{field:bs(g.field),direction:Tb(g.dir)}}(B))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let c=uB(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{Lt:t,parent:s}}function wb(n){let e=gb(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,s=null;if(r>0){Q(r===1,65062);let B=t.from[0];B.allDescendants?s=B.collectionId:e=e.child(B.collectionId)}let i=[];t.where&&(i=function(f){let g=I_(f);return g instanceof Yt&&c_(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(f){return f.map(g=>function(D){return new Yr(vs(D.field),function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(g))}(t.orderBy));let c=null;t.limit&&(c=function(f){let g;return g=typeof f=="object"?f.value:f,yu(g)?null:g}(t.limit));let u=null;t.startAt&&(u=function(f){let g=!!f.before,I=f.values||[];return new Qr(I,g)}(t.startAt));let l=null;return t.endAt&&(l=function(f){let g=!f.before,I=f.values||[];return new Qr(I,g)}(t.endAt)),ZA(e,s,o,i,c,"F",u,l)}function Ib(n,e){let t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Z(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Db(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map(t=>t._toProto(n))}}}}function I_(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=vs(t.unaryFilter.field);return Ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":let s=vs(t.unaryFilter.field);return Ue.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let i=vs(t.unaryFilter.field);return Ue.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=vs(t.unaryFilter.field);return Ue.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Z(61313);default:return Z(60726)}}(n):n.fieldFilter!==void 0?function(t){return Ue.create(vs(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Z(58110);default:return Z(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Yt.create(t.compositeFilter.filters.map(r=>I_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Z(1026)}}(t.compositeFilter.op))}(n):Z(30097,{filter:n})}function Tb(n){return db[n]}function Ab(n){return fb[n]}function bb(n){return pb[n]}function bs(n){return{fieldPath:n.canonicalString()}}function vs(n){return Dt.fromServerFormat(n.fieldPath)}function D_(n){return n instanceof Ue?function(t){if(t.op==="=="){if(et(t.value))return{unaryFilter:{field:bs(t.field),op:"IS_NAN"}};if(xt(t.value))return{unaryFilter:{field:bs(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(et(t.value))return{unaryFilter:{field:bs(t.field),op:"IS_NOT_NAN"}};if(xt(t.value))return{unaryFilter:{field:bs(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:bs(t.field),op:Ab(t.op),value:t.value}}}(n):n instanceof Yt?function(t){let r=t.getFilters().map(s=>D_(s));return r.length===1?r[0]:{compositeFilter:{op:bb(t.op),filters:r}}}(n):Z(54877,{filter:n})}function vb(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function T_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function A_(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Oo(n,e){let t={fields:{}};return e.forEach((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=r._toProto(n)}),{mapValue:t}}function b_(n){return{stringValue:n}}function Au(n){return new cB(n,!0)}var Xs=class{constructor(e){this.value=e}isEqual(e){return this.value===e.value}};var Zs=class{constructor(e,t){if(this.seconds=e,this.increment=t,!Number.isInteger(e)||e<0||e>4294967295)throw new Error("BsonTimestamp 'seconds' must be in the range of a 32-bit unsigned integer (0-4294967295).");if(!Number.isInteger(t)||t<0||t>4294967295)throw new Error("BsonTimestamp 'increment' must be in the range of a 32-bit unsigned integer (0-4294967295).")}isEqual(e){return this.seconds===e.seconds&&this.increment===e.increment}};var dn=class n{constructor(e,t=0){if(this.subtype=t,!Number.isInteger(t)||t<0||t>255)throw new W(F.INVALID_ARGUMENT,"The subtype for Bytes must be a value in the inclusive [0, 255] range.");this._byteString=e}static fromBase64String(e,t=0){try{return new n(be.fromBase64String(e),t)}catch(r){throw new W(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+r)}}static fromUint8Array(e,t=0){return new n(be.fromUint8Array(e),t)}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}get data(){return this.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+", subtype: "+this.subtype+")"}isEqual(e){return this.subtype===e.subtype&&this._byteString.isEqual(e._byteString)}toJSON(){let e={type:n._jsonSchemaVersion,bytes:this.toBase64()};return this.subtype!==0&&(e.subtype=this.subtype),e}static fromJSON(e){if($o(e,n._jsonSchema)){let t=e.subtype??0;return n.fromBase64String(e.bytes,t)}}};dn._jsonSchemaVersion="firestore/bytes/1.0",dn._jsonSchema={type:ke("string",dn._jsonSchemaVersion),bytes:ke("string"),subtype:{...ke("number"),optional:!0}};var ei=class{constructor(e){this.stringValue=e,this.value=Ee.fromString(e)}isEqual(e){return!(!this.value.oe()||!e.value.oe())||this.value.compareTo(e.value)===0}toJSON(){return{Ut:{stringValue:this.stringValue}}}};var ti=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Dt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};function v_(){return new ti(Fs)}var Po=class{constructor(e){this._methodName=e}};var bn=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if($o(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};bn._jsonSchemaVersion="firestore/geoPoint/1.0",bn._jsonSchema={type:ke("string",bn._jsonSchemaVersion),latitude:ke("number"),longitude:ke("number")};var ni=class{constructor(e){this.value=e}isEqual(e){return this.value===e.value}};var Zr=class n{constructor(){this.type="MaxKey"}static instance(){return n.MAX_KEY_VALUE_INSTANCE||(n.MAX_KEY_VALUE_INSTANCE=new n),n.MAX_KEY_VALUE_INSTANCE}};Zr.MAX_KEY_VALUE_INSTANCE=null;var es=class n{constructor(){this.type="MinKey"}static instance(){return n.MIN_KEY_VALUE_INSTANCE||(n.MIN_KEY_VALUE_INSTANCE=new n),n.MIN_KEY_VALUE_INSTANCE}};es.MIN_KEY_VALUE_INSTANCE=null;var Xe=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Xe.UNAUTHENTICATED=new Xe(null),Xe.GOOGLE_CREDENTIALS=new Xe("google-credentials-uid"),Xe.FIRST_PARTY=new Xe("first-party-uid"),Xe.MOCK_USER=new Xe("mock-user");var fn=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Mc=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Gc=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Xe.UNAUTHENTICATED))}shutdown(){}},dB=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},Uc=class{constructor(e){this.kt=e,this.currentUser=Xe.UNAUTHENTICATED,this.Qt=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.qt===void 0,42304);let r=this.Qt,s=u=>this.Qt!==r?(r=this.Qt,t(u)):Promise.resolve(),i=new fn;this.qt=()=>{this.Qt++,this.currentUser=this.Kt(),i.resolve(),i=new fn,e.enqueueRetryable(()=>s(this.currentUser))};let o=()=>{let u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{J("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.qt&&(this.auth.addAuthTokenListener(this.qt),o())};this.kt.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){let u=this.kt.getImmediate({optional:!0});u?c(u):(J("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new fn)}},0),o()}getToken(){let e=this.Qt,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.Qt!==e?(J("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string",31837,{Wt:r}),new Mc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.qt&&this.auth.removeAuthTokenListener(this.qt),this.qt=void 0}Kt(){let e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string",2055,{Gt:e}),new Xe(e)}},fB=class{constructor(e,t,r){this.jt=e,this.zt=t,this.Ht=r,this.type="FirstParty",this.user=Xe.FIRST_PARTY,this.Jt=new Map}Yt(){return this.Ht?this.Ht():null}get headers(){this.Jt.set("X-Goog-AuthUser",this.jt);let e=this.Yt();return e&&this.Jt.set("Authorization",e),this.zt&&this.Jt.set("X-Goog-Iam-Authorization-Token",this.zt),this.Jt}},pB=class{constructor(e,t,r){this.jt=e,this.zt=t,this.Ht=r}getToken(){return Promise.resolve(new fB(this.jt,this.zt,this.Ht))}start(e,t){e.enqueueRetryable(()=>t(Xe.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Hc=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},qc=class{constructor(e,t){this.Zt=t,this.forceRefresh=!1,this.appCheck=null,this.Xt=null,this.en=null,ut(e)&&e.settings.appCheckToken&&(this.en=e.settings.appCheckToken)}start(e,t){Q(this.qt===void 0,3512);let r=i=>{i.error!=null&&J("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);let o=i.token!==this.Xt;return this.Xt=i.token,J("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.qt=i=>{e.enqueueRetryable(()=>r(i))};let s=i=>{J("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.qt&&this.appCheck.addTokenListener(this.qt)};this.Zt.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){let i=this.Zt.getImmediate({optional:!0});i?s(i):J("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.en)return Promise.resolve(new Hc(this.en));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Q(typeof t.token=="string",44558,{tokenResult:t}),this.Xt=t.token,new Hc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.qt&&this.appCheck.removeTokenListener(this.qt),this.qt=void 0}};function R_(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var gB=class{tn(e){}shutdown(){}};var _E="ConnectivityMonitor",jc=class{constructor(){this.nn=()=>this.rn(),this.sn=()=>this._n(),this.an=[],this.un()}tn(e){this.an.push(e)}shutdown(){window.removeEventListener("online",this.nn),window.removeEventListener("offline",this.sn)}un(){window.addEventListener("online",this.nn),window.addEventListener("offline",this.sn)}rn(){J(_E,"Network connectivity changed: AVAILABLE");for(let e of this.an)e(0)}_n(){J(_E,"Network connectivity changed: UNAVAILABLE");for(let e of this.an)e(1)}static cn(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var yc=null;function CB(){return yc===null?yc=function(){return 268435456+Math.round(2147483648*Math.random())}():yc++,"0x"+yc.toString(16)}var Vh="RestConnection",Rb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},mB=class{get En(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.hn=t+"://"+e.host,this.Tn=`projects/${r}/databases/${s}`,this.Pn=this.databaseId.database===Sc?`project_id=${r}`:`project_id=${r}&database_id=${s}`}In(e,t,r,s,i){let o=CB(),c=this.Rn(e,t.toUriEncodedString());J(Vh,`Sending RPC '${e}' ${o}:`,c,r);let u={"google-cloud-resource-prefix":this.Tn,"x-goog-request-params":this.Pn};this.An(u,s,i);let{host:l}=new URL(c),B=wr(l);return this.Vn(e,c,u,r,B).then(f=>(J(Vh,`Received RPC '${e}' ${o}: `,f),f),f=>{throw Ut(Vh,`RPC '${e}' ${o} failed with error: `,f,"url: ",c,"request:",r),f})}dn(e,t,r,s,i,o){return this.In(e,t,r,s,i)}An(e,t,r){if(e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+fi}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s),this.databaseInfo._customHeaders)for(let s of Object.keys(this.databaseInfo._customHeaders))e[s]=this.databaseInfo._customHeaders[s]}Rn(e,t){let r=Rb[e],s=`${this.hn}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}};var EB=class{constructor(e){this.fn=e.fn,this.mn=e.mn}pn(e){this.gn=e}yn(e){this.wn=e}bn(e){this.Sn=e}onMessage(e){this.xn=e}close(){this.mn()}send(e){this.fn(e)}vn(){this.gn()}Dn(){this.wn()}Cn(e){this.Sn(e)}Fn(e){this.xn(e)}};var ht="WebChannelConnection",lo=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})},Kc=class n extends mB{constructor(e){super(e),this.On=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static Mn(){if(!n.Nn){let e=Ih();lo(e,wh.STAT_EVENT,t=>{t.stat===uc.PROXY?J(ht,"STAT_EVENT: detected buffering proxy"):t.stat===uc.NOPROXY&&J(ht,"STAT_EVENT: detected no buffering proxy")}),n.Nn=!0}}Vn(e,t,r,s,i){let o=CB();return new Promise((c,u)=>{let l=new _h;l.setWithCredentials(!0),l.listenOnce(yh.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ro.NO_ERROR:let f=l.getResponseJson();J(ht,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),c(f);break;case ro.TIMEOUT:J(ht,`RPC '${e}' ${o} timed out`),u(new W(F.DEADLINE_EXCEEDED,"Request time out"));break;case ro.HTTP_ERROR:let g=l.getStatus();if(J(ht,`RPC '${e}' ${o} failed with status:`,g,"response text:",l.getResponseText()),g>0){let I=l.getResponseJson();Array.isArray(I)&&(I=I[0]);let D=I?.error;if(D&&D.status&&D.message){let O=function(K){let $=K.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf($)>=0?$:F.UNKNOWN}(D.status);u(new W(O,D.message))}else u(new W(F.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new W(F.UNAVAILABLE,"Connection failed."));break;default:Z(9055,{Bn:e,streamId:o,Ln:l.getLastErrorCode(),$n:l.getLastError()})}}finally{J(ht,`RPC '${e}' ${o} completed.`)}});let B=JSON.stringify(s);J(ht,`RPC '${e}' ${o} sending request:`,s),l.send(t,"POST",B,r,15)})}Un(e,t,r){let s=CB(),i=[this.hn,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.An(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;let l=i.join("");J(ht,`Creating RPC '${e}' stream ${s}: ${l}`,c);let B=o.createWebChannel(l,c);this.kn(B);let f=!1,g=!1,I=new EB({fn:D=>{g?J(ht,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(f||(J(ht,`Opening RPC '${e}' stream ${s} transport.`),B.open(),f=!0),J(ht,`RPC '${e}' stream ${s} sending:`,D),B.send(D))},mn:()=>B.close()});return lo(B,ws.EventType.OPEN,()=>{g||(J(ht,`RPC '${e}' stream ${s} transport opened.`),I.vn())}),lo(B,ws.EventType.CLOSE,()=>{g||(g=!0,J(ht,`RPC '${e}' stream ${s} transport closed`),I.Cn(),this.Qn(B))}),lo(B,ws.EventType.ERROR,D=>{g||(g=!0,Ut(ht,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),I.Cn(new W(F.UNAVAILABLE,"The operation could not be completed")))}),lo(B,ws.EventType.MESSAGE,D=>{if(!g){let O=D.data[0];Q(!!O,16349);let M=O,K=M?.error||M[0]?.error;if(K){J(ht,`RPC '${e}' stream ${s} received error:`,K);let $=K.status,Be=function(ve){let A=Me[ve];if(A!==void 0)return g_(A)}($),Oe=K.message;$==="NOT_FOUND"&&Oe.includes("database")&&Oe.includes("does not exist")&&Oe.includes(this.databaseId.database)&&Ut(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Be===void 0&&(Be=F.INTERNAL,Oe="Unknown error status: "+$+" with message "+K.message),g=!0,I.Cn(new W(Be,Oe)),B.close()}else J(ht,`RPC '${e}' stream ${s} received:`,O),I.Fn(O)}}),n.Mn(),setTimeout(()=>{I.Dn()},0),I}terminate(){this.On.forEach(e=>e.close()),this.On=[]}kn(e){this.On.push(e)}Qn(e){this.On=this.On.filter(t=>t===e)}An(e,t,r){super.An(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Dh()}};function Sb(n){return new Kc(n)}Kc.Nn=!1;var Jc=class{constructor(e,t,r=1e3,s=1.5,i=6e4){this.qn=e,this.timerId=t,this.Kn=r,this.Wn=s,this.Gn=i,this.jn=0,this.zn=null,this.Hn=Date.now(),this.reset()}reset(){this.jn=0}Jn(){this.jn=this.Gn}Yn(e){this.cancel();let t=Math.floor(this.jn+this.Zn()),r=Math.max(0,Date.now()-this.Hn),s=Math.max(0,t-r);s>0&&J("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.jn} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.zn=this.qn.enqueueAfterDelay(this.timerId,s,()=>(this.Hn=Date.now(),e())),this.jn*=this.Wn,this.jn<this.Kn&&(this.jn=this.Kn),this.jn>this.Gn&&(this.jn=this.Gn)}Xn(){this.zn!==null&&(this.zn.skipDelay(),this.zn=null)}cancel(){this.zn!==null&&(this.zn.cancel(),this.zn=null)}Zn(){return(Math.random()-.5)*this.jn}};var yE="PersistentStream",zc=class{constructor(e,t,r,s,i,o,c,u){this.qn=e,this.er=r,this.tr=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.nr=0,this.rr=null,this.ir=null,this.stream=null,this.sr=0,this._r=new Jc(e,t)}ar(){return this.state===1||this.state===5||this.ur()}ur(){return this.state===2||this.state===3}start(){this.sr=0,this.state!==4?this.auth():this.cr()}async stop(){this.ar()&&await this.close(0)}lr(){this.state=0,this._r.reset()}Er(){this.ur()&&this.rr===null&&(this.rr=this.qn.enqueueAfterDelay(this.er,6e4,()=>this.hr()))}Tr(e){this.Pr(),this.stream.send(e)}async hr(){if(this.ur())return this.close(0)}Pr(){this.rr&&(this.rr.cancel(),this.rr=null)}Ir(){this.ir&&(this.ir.cancel(),this.ir=null)}async close(e,t){this.Pr(),this.Ir(),this._r.cancel(),this.nr++,e!==4?this._r.reset():t&&t.code===F.RESOURCE_EXHAUSTED?(Rn(t.toString()),Rn("Using maximum backoff delay to prevent overloading the backend."),this._r.Jn()):t&&t.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Rr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.bn(t)}Rr(){}auth(){this.state=1;let e=this.Ar(this.nr),t=this.nr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.nr===t&&this.Vr(r,s)},r=>{e(()=>{let s=new W(F.UNKNOWN,"Fetching auth token failed: "+r.message);return this.dr(s)})})}Vr(e,t){let r=this.Ar(this.nr);this.stream=this.mr(e,t),this.stream.pn(()=>{r(()=>this.listener.pn())}),this.stream.yn(()=>{r(()=>(this.state=2,this.ir=this.qn.enqueueAfterDelay(this.tr,1e4,()=>(this.ur()&&(this.state=3),Promise.resolve())),this.listener.yn()))}),this.stream.bn(s=>{r(()=>this.dr(s))}),this.stream.onMessage(s=>{r(()=>++this.sr==1?this.pr(s):this.onNext(s))})}cr(){this.state=5,this._r.Yn(async()=>{this.state=0,this.start()})}dr(e){return J(yE,`close with error: ${e}`),this.stream=null,this.close(4,e)}Ar(e){return t=>{this.qn.enqueueAndForget(()=>this.nr===e?t():(J(yE,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},_B=class extends zc{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}mr(e,t){return this.connection.Un("Listen",e,t)}pr(e){return this.onNext(e)}onNext(e){this._r.reset();let t=Cb(this.serializer,e),r=function(i){if(!("targetChange"in i))return se.min();let o=i.targetChange;return o.targetIds&&o.targetIds.length?se.min():o.readTime?Bn(o.readTime):se.min()}(e);return this.listener.gr(t,r)}yr(e){let t={};t.database=BB(this.serializer),t.addTarget=function(i,o){let c,u=o.target;if(c=Fr(u)?{pipelineQuery:Db(i,u)}:f_(u)?{documents:_b(i,u)}:{query:yb(i,u).Lt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=lB(i,o.resumeToken);let l=uB(i,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(se.min())>0){c.readTime=Co(i,o.snapshotVersion.toTimestamp());let l=uB(i,o.expectedCount);l!==null&&(c.expectedCount=l)}return c}(this.serializer,e);let r=Ib(this.serializer,e);r&&(t.labels=r),this.Tr(t)}wr(e){let t={};t.database=BB(this.serializer),t.removeTarget=e,this.Tr(t)}},yB=class extends zc{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get br(){return this.sr>0}start(){this.lastStreamToken=void 0,super.start()}Rr(){this.br&&this.Sr([])}mr(e,t){return this.connection.Un("Write",e,t)}pr(e){return Q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0,55816),this.listener.vr()}onNext(e){Q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this._r.reset();let t=Eb(e.writeResults,e.commitTime),r=Bn(e.commitTime);return this.listener.Dr(r,t)}Cr(){let e={};e.database=BB(this.serializer),this.Tr(e)}Sr(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>mb(this.serializer,r))};this.Tr(t)}};var wB=class{},IB=class extends wB{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.Fr=!1}Or(){if(this.Fr)throw new W(F.FAILED_PRECONDITION,"The client has already been terminated.")}In(e,t,r,s){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.In(e,hB(t,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(F.UNKNOWN,i.toString())})}dn(e,t,r,s,i){return this.Or(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.dn(e,hB(t,r),s,o,c,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(F.UNKNOWN,o.toString())})}terminate(){this.Fr=!0,this.connection.terminate()}};function Ob(n,e,t,r){return new IB(n,e,t,r)}var Pb="ComponentProvider",wE=new Map;function Nb(n,e,t,r,s){return new qh(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,R_(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r,s._customHeaders,s.grpcFlowControlWindow)}var IE={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},S_=41943040,Gt=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};Gt.DEFAULT_COLLECTION_PERCENTILE=10,Gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Gt.DEFAULT=new Gt(S_,Gt.DEFAULT_COLLECTION_PERCENTILE,Gt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Gt.DISABLED=new Gt(-1,0,0);var ri=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.Mr(r),this.Nr=r=>t.writeSequenceNumber(r))}Mr(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.Nr&&this.Nr(e),e}};ri.Br=-1;var xb="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",DB=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function gi(n){if(n.code!==F.FAILED_PRECONDITION||n.message!==xb)throw n;J("LocalStore","Unexpectedly lost primary lease")}var G=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let s=0,i=0,o=!1;e.forEach(c=>{++s,c.next(()=>{++i,o&&i===s&&t()},u=>r(u))}),o=!0,i===s&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(s=>s?n.resolve(s):r());return t}static forEach(e,t){let r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new n((r,s)=>{let i=e.length,o=new Array(i),c=0;for(let u=0;u<i;u++){let l=u;t(e[l]).next(B=>{o[l]=B,++c,c===i&&r(o)},B=>s(B))}})}static doWhile(e,t){return new n((r,s)=>{let i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}};function Lb(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ci(n){return n.name==="IndexedDbTransactionError"}var DE="LruGarbageCollector",kb=1048576;function TE([n,e],[t,r]){let s=ce(n,t);return s===0?ce(e,r):s}var TB=class{constructor(e){this.ai=e,this.buffer=new Ke(TE),this.ui=0}ci(){return++this.ui}li(e){let t=[e,this.ci()];if(this.buffer.size<this.ai)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();TE(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},AB=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ei=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.hi(6e4)}stop(){this.Ei&&(this.Ei.cancel(),this.Ei=null)}get started(){return this.Ei!==null}hi(e){J(DE,`Garbage collection scheduled in ${e}ms`),this.Ei=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ei=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ci(t)?J(DE,"Ignoring IndexedDB error during garbage collection: ",t):await gi(t)}await this.hi(3e5)})}},bB=class{constructor(e,t){this.Ti=e,this.params=t}calculateTargetCount(e,t){return this.Ti.Pi(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return G.resolve(ri.Br);let r=new TB(t);return this.Ti.forEachTarget(e,s=>r.li(s.sequenceNumber)).next(()=>this.Ti.Ii(e,s=>r.li(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Ti.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ti.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(J("LruGarbageCollector","Garbage collection skipped; disabled"),G.resolve(IE)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(J("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),IE):this.Ri(e,t))}getCacheSize(e){return this.Ti.getCacheSize(e)}Ri(e,t){let r,s,i,o,c,u,l,B=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(f=>(f>this.params.maximumSequenceNumbersToCollect?(J("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),s=this.params.maximumSequenceNumbersToCollect):s=f,o=Date.now(),this.nthSequenceNumber(e,s))).next(f=>(r=f,c=Date.now(),this.removeTargets(e,r,t))).next(f=>(i=f,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(f=>(l=Date.now(),Ds()<=ue.DEBUG&&J("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-B}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${f} documents in `+(l-u)+`ms
Total Duration: ${l-B}ms`),G.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:f})))}};function Fb(n,e){return new bB(n,e)}var O_="firestore.googleapis.com",AE=!0,Wc=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new W(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=O_,this.ssl=AE}else this.host=e.host,this.ssl=e.ssl??AE;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=S_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<kb)throw new W(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(UE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=R_(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new W(F.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new W(F.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new W(F.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new W(F.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&function(r,s){if(r===s)return!0;if(!r||!s)return!1;let i=Object.keys(r),o=Object.keys(s);if(i.length!==o.length)return!1;for(let c of i)if(r[c]!==s[c])return!1;return!0}(this._customHeaders,e._customHeaders)}},Uf=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Wc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Wc(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Gc;switch(r.type){case"firstParty":return new pB(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=wE.get(t);r&&(J(Pb,"Removing Datastore"),wE.delete(t),r.terminate())}(this),Promise.resolve()}};function P_(n,e,t,r={}){n=pi(n,Uf);let s=wr(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&Da(`https://${c}`),i.host!==O_&&i.host!==c&&Ut("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let u={...i,host:c,ssl:s,emulatorOptions:r};if(!Kt(u,o)&&(n._setSettings(u),r.mockUserToken)){let l,B;if(typeof r.mockUserToken=="string")l=r.mockUserToken,B=Xe.MOCK_USER;else{l=Fg(r.mockUserToken,n._app?.options.projectId);let f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new W(F.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");B=new Xe(f)}n._authCredentials=new dB(new Mc(l,B))}}var $c=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},rt=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new si(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if($o(t,n._jsonSchema))return new n(e,r||null,new ee(Ie.fromString(t.referencePath)))}};rt._jsonSchemaVersion="firestore/documentReference/1.0",rt._jsonSchema={type:ke("string",rt._jsonSchemaVersion),referencePath:ke("string")};var si=class n extends $c{constructor(e,t,r){super(e,t,Du(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new rt(this.firestore,null,new ee(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function bu(n,e,...t){if(n=Ne(n),arguments.length===1&&(e=Ls.newId()),FA("doc","path",e),n instanceof Uf){let r=Ie.fromString(e,...t);return Zm(r),new rt(n,null,new ee(r))}{if(!(n instanceof rt||n instanceof si))throw new W(F.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(Ie.fromString(e,...t));return Zm(r),new rt(n.firestore,n instanceof si?n.converter:null,new ee(r))}}var ii=class{constructor(e,t){this.pattern=e,this.options=t}isEqual(e){return this.pattern===e.pattern&&this.options===e.options}};var Lt=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if($o(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new W(F.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};Lt._jsonSchemaVersion="firestore/vectorValue/1.0",Lt._jsonSchema={type:ke("string",Lt._jsonSchemaVersion),vectorValues:ke("object")};var Vb=/^__.*__$/,vB=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Nn(e,this.data,this.fieldMask,t,this.fieldTransforms):new $r(e,this.data,t,this.fieldTransforms)}};function N_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Z(40011,{dataSource:n})}}var RB=class n{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new n({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Qc(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(N_(this.dataSource)&&Vb.test(e))throw this.createError('Document fields cannot begin and end with "__"')}},SB=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Au(e)}createContext(e,t,r,s=!1){return new RB({dataSource:e,methodName:t,targetDoc:r,path:Dt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function x_(n){let e=n._freezeSettings(),t=Au(n._databaseId);return new SB(n._databaseId,!!e.ignoreUndefinedProperties,t)}function L_(n,e,t,r,s,i={}){let o=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);M_("Data must be an object, but it was:",o,r);let c=k_(r,o),u,l;if(i.merge)u=new on(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){let B=[];for(let f of i.mergeFields){let g=Xo(e,f,t);if(!o.contains(g))throw new W(F.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Gb(B,g)||B.push(g)}u=new on(B),l=o.fieldTransforms.filter(f=>u.covers(f.field))}else u=null,l=o.fieldTransforms;return new vB(new Nt(c),u,l)}function No(n,e,t){if(V_(n=Ne(n)))return M_("Unsupported field value:",e,n),k_(n,e);if(n instanceof Po)return function(s,i){if(!N_(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);let o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(s,i){let o=[],c=0;for(let u of s){let l=No(u,i.childContextForArray(c));l==null&&(l={nullValue:"NULL_VALUE"}),o.push(l),c++}return{arrayValue:{values:o}}}(n,e)}return function(s,i,o){if((s=Ne(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Ff(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){let c=Re.fromDate(s);return{timestampValue:Co(i.serializer,c)}}if(s instanceof Re){let c=new Re(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Co(i.serializer,c)}}if(F_(s)){let c=Re.fromInstant(s),u=new Re(c.seconds,1e3*Math.floor(c.nanoseconds/1e3));return{timestampValue:Co(i.serializer,u)}}if(s instanceof bn)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof dn)return s.subtype===0?{bytesValue:lB(i.serializer,s._byteString)}:function(u,l){let B=l.toUint8Array(),f=new Uint8Array(B.length+1);return f[0]=l.subtype,f.set(B,1),{mapValue:{fields:{[Hs]:{bytesValue:lB(u,be.fromUint8Array(f))}}}}}(i.serializer,s);if(s instanceof rt){let c=i.databaseId,u=s.firestore._databaseId;if(!u.isEqual(c))throw i.createError(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:Gf(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof Lt)return function(u,l){let B=u instanceof Lt?u.toArray():u;return{mapValue:{fields:{[wu]:{stringValue:Iu},[jr]:{arrayValue:{values:B.map(g=>{if(typeof g!="number")throw l.createError("VectorValues must only contain numeric values.");return kf(l.serializer,g)})}}}}}}(s,i);if(s instanceof ii)return function(u){return{mapValue:{fields:{[an]:{mapValue:{fields:{[Gs]:{stringValue:u.pattern},[Us]:{stringValue:u.options}}}}}}}}(s);if(s instanceof Xs)return function(u){return{mapValue:{fields:{[Kr]:{stringValue:u.value}}}}}(s);if(s instanceof ni)return function(u){return{mapValue:{fields:{[Br]:Os(u.value)}}}}(s);if(s instanceof ei)return function(u){return{mapValue:{fields:{[On]:{stringValue:u.stringValue}}}}}(s);if(s instanceof Zs)return function(u){return{mapValue:{fields:{[An]:{mapValue:{fields:{[yo]:Os(u.seconds),[wo]:Os(u.increment)}}}}}}}(s);if(s instanceof es)return function(){return{mapValue:{fields:{[xf]:{nullValue:"NULL_VALUE"}}}}}();if(s instanceof Zr)return function(){return{mapValue:{fields:{[Yo]:{nullValue:"NULL_VALUE"}}}}}();if(A_(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Eu(s)}`)}(n,e)}function k_(n,e){let t={};return GE(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):os(n,(r,s)=>{let i=No(s,e.childContextForField(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function F_(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;let e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function V_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Re||n instanceof bn||n instanceof dn||n instanceof rt||n instanceof Po||n instanceof Lt||n instanceof es||n instanceof Zr||n instanceof ni||n instanceof ei||n instanceof ii||n instanceof Xs||n instanceof Zs||F_(n)||A_(n))}function M_(n,e,t){if(!V_(t)||!Wo(t)){let r=Eu(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Xo(n,e,t){if((e=Ne(e))instanceof ti)return e._internalPath;if(typeof e=="string")return G_(n,e);throw Qc("Field path arguments must be of type string or ",n,!1,void 0,t)}var Mb=new RegExp("[~\\*/\\[\\]]");function G_(n,e,t){if(e.search(Mb)>=0)throw Qc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ti(...e.split("."))._internalPath}catch{throw Qc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Qc(n,e,t,r,s){let i=r&&!r.isEmpty(),o=s!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new W(F.INVALID_ARGUMENT,c+n+u)}function Gb(n,e){return n.some(t=>t.isEqual(e))}function Ub(n){return typeof n._readUserData=="function"}var dt=class n{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){let r=Nt.empty();for(let s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){let i=this.optionDefinitions[s];if(s in e){let o=e[s],c;i.nestedOptions&&Wo(o)?c={mapValue:{fields:new n(i.nestedOptions).getOptionsProto(t,o)}}:o&&(c=No(o,t)??void 0),c&&r.set(Dt.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(e,t,r){let s=this._getKnownOptions(t,e);if(r){let i=new Map(ME(r,(o,c)=>[Dt.fromServerFormat(c),o!==void 0?No(o,e):null]));s.setAll(i)}return s.value.mapValue.fields??{}}};function Hb(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")}(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")}(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))}(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!Wo(t.fields))}(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))}(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))}(n.pipelineValue)))}function U_(n){return new Lt(n)}function H(n){let e;return n instanceof Ln?n:(e=Wo(n)?Kb(n):n instanceof Array?Jb(n):H_(n,void 0),e)}function Mh(n){if(n instanceof Ln)return n;if(n instanceof Lt)return xo(n);if(Array.isArray(n))return xo(U_(n));throw new Error("Unsupported value: "+typeof n)}function Hf(n){return GA(n)?qb(n):H(n)}var Ln=class{constructor(){this._protoValueType="ProtoValue"}add(e){return new x("add",[this,H(e)],"add")}asBoolean(){if(this instanceof or)return this;if(this instanceof oi)return new Xc(this);if(this instanceof ts)return new NB(this);if(this instanceof x)return new Yc(this);throw new W("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new x("subtract",[this,H(e)],"subtract")}multiply(e){return new x("multiply",[this,H(e)],"multiply")}divide(e){return new x("divide",[this,H(e)],"divide")}mod(e){return new x("mod",[this,H(e)],"mod")}equal(e){return new x("equal",[this,H(e)],"equal").asBoolean()}notEqual(e){return new x("not_equal",[this,H(e)],"notEqual").asBoolean()}lessThan(e){return new x("less_than",[this,H(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new x("less_than_or_equal",[this,H(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new x("greater_than",[this,H(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new x("greater_than_or_equal",[this,H(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){let r=[e,...t].map(s=>H(s));return new x("array_concat",[this,...r],"arrayConcat")}arrayContains(e){return new x("array_contains",[this,H(e)],"arrayContains").asBoolean()}arrayContainsAll(e){let t=Array.isArray(e)?new Mr(e.map(H),"arrayContainsAll"):e;return new x("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){let t=Array.isArray(e)?new Mr(e.map(H),"arrayContainsAny"):e;return new x("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new x("array_reverse",[this])}arrayLength(){return new x("array_length",[this],"arrayLength")}equalAny(e){let t=Array.isArray(e)?new Mr(e.map(H),"equalAny"):e;return new x("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){let t=Array.isArray(e)?new Mr(e.map(H),"notEqualAny"):e;return new x("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new x("exists",[this],"exists").asBoolean()}charLength(){return new x("char_length",[this],"charLength")}like(e){return new x("like",[this,H(e)],"like").asBoolean()}regexContains(e){return new x("regex_contains",[this,H(e)],"regexContains").asBoolean()}regexFind(e){return new x("regex_find",[this,H(e)],"regexFind")}regexFindAll(e){return new x("regex_find_all",[this,H(e)],"regexFindAll")}regexMatch(e){return new x("regex_match",[this,H(e)],"regexMatch").asBoolean()}stringContains(e){return new x("string_contains",[this,H(e)],"stringContains").asBoolean()}startsWith(e){return new x("starts_with",[this,H(e)],"startsWith").asBoolean()}endsWith(e){return new x("ends_with",[this,H(e)],"endsWith").asBoolean()}toLower(){return new x("to_lower",[this],"toLower")}toUpper(){return new x("to_upper",[this],"toUpper")}trim(e){let t=[this];return e&&t.push(H(e)),new x("trim",t,"trim")}ltrim(e){let t=[this];return e&&t.push(H(e)),new x("ltrim",t,"ltrim")}rtrim(e){let t=[this];return e&&t.push(H(e)),new x("rtrim",t,"rtrim")}type(){return new x("type",[this])}isType(e){return new x("is_type",[this,xo(e)],"isType").asBoolean()}stringConcat(e,...t){let r=[e,...t].map(H);return new x("string_concat",[this,...r],"stringConcat")}stringIndexOf(e){return new x("string_index_of",[this,H(e)],"stringIndexOf")}stringRepeat(e){return new x("string_repeat",[this,H(e)],"stringRepeat")}stringReplaceAll(e,t){return new x("string_replace_all",[this,H(e),H(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new x("string_replace_one",[this,H(e),H(t)],"stringReplaceOne")}concat(e,...t){let r=[e,...t].map(H);return new x("concat",[this,...r],"concat")}reverse(){return new x("reverse",[this],"reverse")}arrayFilter(e,t){return new x("array_filter",[this,H(e),t],"arrayFilter")}arrayTransform(e,t){return new x("array_transform",[this,H(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,r){return new x("array_transform",[this,H(e),H(t),r],"arrayTransformWithIndex")}arraySlice(e,t){let r=[this,H(e)];return t!==void 0&&r.push(H(t)),new x("array_slice",r,"arraySlice")}arrayFirst(){return new x("array_first",[this],"arrayFirst")}arrayFirstN(e){return new x("array_first_n",[this,H(e)],"arrayFirstN")}arrayLast(){return new x("array_last",[this],"arrayLast")}arrayLastN(e){return new x("array_last_n",[this,H(e)],"arrayLastN")}arrayMaximum(){return new x("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new x("maximum_n",[this,H(e)],"arrayMaximumN")}arrayMinimum(){return new x("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new x("minimum_n",[this,H(e)],"arrayMinimumN")}arrayIndexOf(e){return new x("array_index_of",[this,H(e),H("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new x("array_index_of",[this,H(e),H("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new x("array_index_of_all",[this,H(e)],"arrayIndexOfAll")}byteLength(){return new x("byte_length",[this],"byteLength")}ceil(){return new x("ceil",[this])}floor(){return new x("floor",[this])}abs(){return new x("abs",[this])}exp(){return new x("exp",[this])}mapGet(e){return new x("map_get",[this,xo(e)],"mapGet")}mapSet(e,t,...r){let s=[this,H(e),H(t),...r.map(H)];return new x("map_set",s,"mapSet")}mapKeys(){return new x("map_keys",[this],"mapKeys")}mapValues(){return new x("map_values",[this],"mapValues")}mapEntries(){return new x("map_entries",[this],"mapEntries")}getField(e){return new x("get_field",[this,H(e)],"get_field")}count(){return Pt._create("count",[this],"count")}sum(){return Pt._create("sum",[this],"sum")}average(){return Pt._create("average",[this],"average")}minimum(){return Pt._create("minimum",[this],"minimum")}maximum(){return Pt._create("maximum",[this],"maximum")}first(){return Pt._create("first",[this],"first")}last(){return Pt._create("last",[this],"last")}arrayAgg(){return Pt._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return Pt._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return Pt._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){let r=[e,...t];return new x("maximum",[this,...r.map(H)],"logicalMaximum")}logicalMinimum(e,...t){let r=[e,...t];return new x("minimum",[this,...r.map(H)],"minimum")}vectorLength(){return new x("vector_length",[this],"vectorLength")}cosineDistance(e){return new x("cosine_distance",[this,Mh(e)],"cosineDistance")}dotProduct(e){return new x("dot_product",[this,Mh(e)],"dotProduct")}euclideanDistance(e){return new x("euclidean_distance",[this,Mh(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new x("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new x("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new x("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new x("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new x("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new x("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new x("timestamp_add",[this,H(e),H(t)],"timestampAdd")}timestampSubtract(e,t){return new x("timestamp_subtract",[this,H(e),H(t)],"timestampSubtract")}timestampDiff(e,t){return new x("timestamp_diff",[this,Hf(e),H(t)],"timestampDiff")}timestampExtract(e,t){let r=[this,H(e)];return t&&r.push(H(t)),new x("timestamp_extract",r,"timestampExtract")}documentId(){return new x("document_id",[this],"documentId")}parent(){return new x("parent",[this],"parent")}substring(e,t){let r=H(e);return new x("substring",t===void 0?[this,r]:[this,r,H(t)],"substring")}arrayGet(e){return new x("array_get",[this,H(e)],"arrayGet")}isError(){return new x("is_error",[this],"isError").asBoolean()}ifError(e){let t=new x("if_error",[this,H(e)],"ifError");return e instanceof or?t.asBoolean():t}isAbsent(){return new x("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new x("map_remove",[this,H(e)],"mapRemove")}mapMerge(e,...t){let r=H(e),s=t.map(H);return new x("map_merge",[this,r,...s],"mapMerge")}pow(e){return new x("pow",[this,H(e)])}trunc(e){return e===void 0?new x("trunc",[this]):new x("trunc",[this,H(e)],"trunc")}round(e){return e===void 0?new x("round",[this]):new x("round",[this,H(e)],"round")}collectionId(){return new x("collection_id",[this])}length(){return new x("length",[this])}ln(){return new x("ln",[this])}sqrt(){return new x("sqrt",[this])}stringReverse(){return new x("string_reverse",[this])}ifAbsent(e){return new x("if_absent",[this,H(e)],"ifAbsent")}ifNull(e){return new x("if_null",[this,H(e)],"ifNull")}coalesce(e,...t){return new x("coalesce",[this,H(e),...t.map(H)],"coalesce")}join(e){return new x("join",[this,H(e)],"join")}log10(){return new x("log10",[this])}arraySum(){return new x("sum",[this])}split(e){return new x("split",[this,H(e)])}timestampTruncate(e,t){let r=[this,H(e)];return t&&r.push(H(t)),new x("timestamp_trunc",r)}ascending(){return zb(this)}descending(){return Wb(this)}as(e){return new PB(this,e,"as")}},Pt=class n{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,r){let s=new n(e,t);return s._methodName=r,s}as(e){return new OB(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}},OB=class{constructor(e,t,r){this.aggregate=e,this.alias=t,this._methodName=r}_readUserData(e){this.aggregate._readUserData(e)}},PB=class{constructor(e,t,r){this.expr=e,this.alias=t,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}},Mr=class extends Ln{constructor(e,t){super(),this.di=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.di.map(t=>t._toProto(e))}}}_readUserData(e){this.di.forEach(t=>t._readUserData(e))}},ts=class extends Ln{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new x("geo_distance",[this,H(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}};function qb(n){return jb(n,"field")}function jb(n,e){return new ts(typeof n=="string"?Fs===n?v_()._internalPath:Xo("field",n):n._internalPath,e)}var oi=class n extends Ln{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){let t=new n(e,void 0);return t._protoValue=e,t}_toProto(e){return Q(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,Hb(this._protoValue)||(this._protoValue=No(this.value,e))}};function xo(n,e){return H_(n,"constant")}function H_(n,e){let t=new oi(n,e);return typeof n=="boolean"?new Xc(t):t}var x=class extends Ln{constructor(e,t,r,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new dt({})}_toProto(e){let t={functionValue:{name:this.name,args:this.params.map(r=>r._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}},or=class n extends Ln{get _methodName(){return this._expr._methodName}countIf(){return Pt._create("count_if",[this],"countIf")}not(){return new x("not",[this],"not").asBoolean()}conditional(e,t){return new x("conditional",[this,e,t],"conditional")}ifError(e){let t=H(e),r=new x("if_error",[this,t],"ifError");return t instanceof n?r.asBoolean():r}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}},Yc=class extends or{constructor(e){super(),this._expr=e,this.expressionType="Function"}},Xc=class extends or{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}},NB=class extends or{constructor(e){super(),this._expr=e,this.expressionType="Field"}};function Kb(n,e){let t=[];for(let r in n)if(Object.prototype.hasOwnProperty.call(n,r)){let s=n[r];t.push(xo(r)),t.push(H(s))}return new x("map",t,"map")}function Jb(n){return function(t,r){return new x("array",t.map(s=>H(s)),r)}(n,"array")}function zb(n){return new Zc(Hf(n),"ascending","ascending")}function Wb(n){return new Zc(Hf(n),"descending","descending")}var Zc=class{constructor(e,t,r){this.expr=e,this.direction=t,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:b_(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}};var Et=class{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}},eu=class extends Et{get _name(){return"add_fields"}get _optionsUtil(){return new dt({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Oo(e,this.fields)]}}_readUserData(e){super._readUserData(e),ar(this.fields,e)}};var tu=class extends Et{get _name(){return"aggregate"}get _optionsUtil(){return new dt({})}constructor(e,t,r){super(r),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Oo(e,this.accumulators),Oo(e,this.groups)]}}_readUserData(e){super._readUserData(e),ar(this.groups,e),ar(this.accumulators,e)}},nu=class extends Et{get _name(){return"distinct"}get _optionsUtil(){return new dt({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Oo(e,this.groups)]}}_readUserData(e){super._readUserData(e),ar(this.groups,e)}},ai=class extends Et{get _name(){return"collection"}get _optionsUtil(){return new dt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.pi=$b(e)}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.pi}]}}_readUserData(e){super._readUserData(e)}},ci=class extends Et{get _name(){return"collection_group"}get _optionsUtil(){return new dt({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}};var Lo=class extends Et{get _name(){return"database"}get _optionsUtil(){return new dt({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}},ko=class extends Et{get _name(){return"documents"}get _optionsUtil(){return new dt({})}constructor(e,t){if(super(t),!e||e.length===0)throw new W(F.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");let r=e.map(i=>i.startsWith("/")?i:"/"+i),s=new Set(r);if(s.size!==r.length)throw new W(F.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.gi=r,this.yi=s}_toProto(e){return{...super._toProto(e),args:this.gi.map(t=>({referenceValue:t}))}}_readUserData(e){super._readUserData(e)}};var Fo=class extends Et{get _name(){return"where"}get _optionsUtil(){return new dt({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),ar(this.condition,e)}};var ns=class extends Et{get _name(){return"limit"}get _optionsUtil(){return new dt({})}constructor(e,t){Q(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Ff(e,this.limit)]}}},ru=class extends Et{get _name(){return"offset"}get _optionsUtil(){return new dt({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Ff(e,this.offset)]}}},xB=class extends Et{get _name(){return"select"}get _optionsUtil(){return new dt({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Oo(e,this.selections)]}}_readUserData(e){super._readUserData(e),ar(this.selections,e)}},Vo=class extends Et{get _name(){return"sort"}get _optionsUtil(){return new dt({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),ar(this.orderings,e)}};var LB=class n extends Et{get _name(){return"replace_with"}get _optionsUtil(){return new dt({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),b_(n.bi)]}}_readUserData(e){super._readUserData(e),ar(this.map,e)}};LB.bi="full_replace";function $b(n){let e=typeof n=="string"?n:n.path;return e.startsWith("/")?e:"/"+e}function ar(n,e){return Ub(n)?n._readUserData(e):Array.isArray(n)?n.forEach(t=>t._readUserData(e)):n instanceof Map?n.forEach(t=>t._readUserData(e)):Object.values(n).forEach(t=>t._readUserData(e)),n}var Bt=class{constructor(e,t,r){this.serializer=e,this.stages=t,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return vu(this)}getPipelineCollectionGroup(){return qf(this)}getPipelineCollectionId(){return Qb(this)}getPipelineDocuments(){return kB(this)}getPipelineFlavor(){return function(t){let r="exact";return t.stages.forEach((s,i)=>{s._name!==nu.name&&s._name!==tu.name||(r="keyless"),s._name===xB.name&&r==="exact"&&(r="augmented"),s._name===eu.name&&i<t.stages.length-1&&r==="exact"&&(r="augmented")}),r}(this)}getPipelineSourceType(){return nr(this)}};function nr(n){let e=n.stages[0];return e instanceof ai||e instanceof ci||e instanceof Lo||e instanceof ko?e._name:"unknown"}function vu(n){if(nr(n)==="collection")return n.stages[0].pi}function qf(n){if(nr(n)==="collection_group")return n.stages[0].collectionId}function Qb(n){switch(nr(n)){case"collection":return Ie.fromString(vu(n)).lastSegment();case"collection_group":return qf(n);default:return}}function kB(n){if(nr(n)==="documents")return n.stages[0].gi}var b=class n{constructor(e,t){this.type=e,this.value=t}static Oi(){return new n("ERROR",void 0)}static Mi(){return new n("UNSET",void 0)}static Ni(){return new n("NULL",qs)}static newValue(e){return xt(e)?new n("NULL",qs):function(r){return!!r&&"booleanValue"in r}(e)?new n("BOOLEAN",e):cn(e)?new n("INT",e):un(e)?new n("DOUBLE",e):function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue}(e)?new n("TIMESTAMP",e):function(r){return!!r&&"stringValue"in r}(e)?new n("STRING",e):function(r){return!!r&&"bytesValue"in r}(e)?new n("BYTES",e):e.referenceValue?new n("REFERENCE",e):e.geoPointValue?new n("GEO_POINT",e):Ks(e)?new n("ARRAY",e):Jh(e)?new n("VECTOR",e):Gr(e)?new n("MAP",e):new n("ERROR",void 0)}Bi(){return this.type==="ERROR"||this.type==="UNSET"}Li(){return this.type==="NULL"}};function mo(n){if(!n.Bi())return n.value}function q_(n){return n instanceof or?n._expr:n}function te(n){if((n=q_(n))instanceof ts)return new FB(n);if(n instanceof oi)return new VB(n);if(n instanceof Mr)return new MB(n);if(n instanceof x){if(n.name==="add")return new GB(n);if(n.name==="subtract")return new UB(n);if(n.name==="multiply")return new HB(n);if(n.name==="divide")return new qB(n);if(n.name==="mod")return new jB(n);if(n.name==="and")return new KB(n);if(n.name==="equal")return new sd(n);if(n.name==="not_equal")return new id(n);if(n.name==="less_than")return new od(n);if(n.name==="less_than_or_equal")return new ad(n);if(n.name==="greater_than")return new cd(n);if(n.name==="greater_than_or_equal")return new ud(n);if(n.name==="array_concat")return new ld(n);if(n.name==="array_reverse")return new hd(n);if(n.name==="array_contains")return new Bd(n);if(n.name==="array_contains_all")return new dd(n);if(n.name==="array_contains_any")return new fd(n);if(n.name==="array_length")return new pd(n);if(n.name==="array_element")return new gd(n);if(n.name==="equal_any")return new su(n);if(n.name==="not_equal_any")return new WB(n);if(n.name==="is_nan")return new $B(n);if(n.name==="is_not_nan")return new QB(n);if(n.name==="is_null")return new YB(n);if(n.name==="is_not_null")return new XB(n);if(n.name==="is_error")return new ZB(n);if(n.name==="exists")return new ed(n);if(n.name==="not")return new ui(n);if(n.name==="or")return new JB(n);if(n.name==="xor")return new zB(n);if(n.name==="conditional")return new td(n);if(n.name==="maximum")return new nd(n);if(n.name==="minimum")return new rd(n);if(n.name==="reverse")return new Cd(n);if(n.name==="replace_first")return new md(n);if(n.name==="replace_all")return new Ed(n);if(n.name==="char_length")return new _d(n);if(n.name==="byte_length")return new yd(n);if(n.name==="like")return new wd(n);if(n.name==="regex_contains")return new Id(n);if(n.name==="regex_match")return new Dd(n);if(n.name==="string_contains")return new Td(n);if(n.name==="starts_with")return new Ad(n);if(n.name==="ends_with")return new bd(n);if(n.name==="to_lower")return new vd(n);if(n.name==="to_upper")return new Rd(n);if(n.name==="trim")return new Sd(n);if(n.name==="string_concat")return new Od(n);if(n.name==="map_get")return new Pd(n);if(n.name==="cosine_distance")return new Nd(n);if(n.name==="dot_product")return new xd(n);if(n.name==="euclidean_distance")return new Ld(n);if(n.name==="vector_length")return new kd(n);if(n.name==="unix_micros_to_timestamp")return new Fd(n);if(n.name==="timestamp_to_unix_micros")return new Gd(n);if(n.name==="unix_millis_to_timestamp")return new Vd(n);if(n.name==="timestamp_to_unix_millis")return new Ud(n);if(n.name==="unix_seconds_to_timestamp")return new Md(n);if(n.name==="timestamp_to_unix_seconds")return new Hd(n);if(n.name==="timestamp_add")return new qd(n);if(n.name==="timestamp_subtract")return new jd(n)}throw new Error(`Unknown Expr : ${n}`)}var FB=class{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Fs)return b.newValue({referenceValue:Vc(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return b.newValue({timestampValue:Ac(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return b.newValue({timestampValue:Ac(e.serializer,t.createTime)});let r=t.data.field(this.expr._fieldPath);return r?_u(r)?b.newValue(function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Ac(i.serializer,se.fromTimestamp(Vs(o)))};if(i.serverTimestampBehavior==="previous"){let c=Qo(o);if(c)return c}return{nullValue:"NULL_VALUE"}}(e,r)):b.newValue(r):b.Mi()}},VB=class{constructor(e){this.expr=e}evaluate(e,t){return b.newValue(this.expr._getValue())}},MB=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.di.map(s=>te(s).evaluate(e,t));return r.some(s=>s.Bi())?b.Oi():b.newValue({arrayValue:{values:r.map(s=>s.value)}})}};function st(n){return un(n)?Number(n.doubleValue):Number(n.integerValue)}function pn(n){return BigInt(n.integerValue)}var Yb=BigInt("0x7fffffffffffffff"),Xb=-BigInt("0x8000000000000000"),rs=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length>=2,24778);let r=te(this.expr.params[0]).evaluate(e,t),s=te(this.expr.params[1]).evaluate(e,t),i=this.$i(r,s);for(let o of this.expr.params.slice(2)){let c=te(o).evaluate(e,t);i=this.$i(i,c)}return i}$i(e,t){if(e.Bi()||t.Bi())return b.Oi();if(e.Li()||t.Li())return b.Ni();let r=e.value,s=t.value;if(!un(r)&&!cn(r)||!un(s)&&!cn(s))return b.Oi();if(un(r)||un(s)){let i=this.Ui(r,s);return i?b.newValue(i):b.Oi()}if(cn(r)&&cn(s)){let i=this.ki(r,s);return i===void 0?b.Oi():typeof i=="number"?b.newValue({doubleValue:i}):i<Xb||i>Yb?b.Oi():b.newValue({integerValue:`${i}`})}return b.Oi()}};function kn(n,e){return He(n)!==He(e)?"TYPE_MISMATCH":et(n)||et(e)?"NOT_EQ":xt(n)&&xt(e)?"EQ":xt(n)||xt(e)?"NULL":Ks(n)&&Ks(e)?function(r,s){if(r.values?.length!==s.values?.length)return"NOT_EQ";let i=!1;for(let o=0;o<(r.values?.length??0);o++){let c=r.values[o],u=s.values[o];switch(kn(c,u)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:Z(44609,{Qi:c,qi:u})}}return i?"NULL":"EQ"}(n.arrayValue,e.arrayValue):Jh(n)&&Jh(e)||Gr(n)&&Gr(e)?function(r,s){let i=r.fields||{},o=s.fields||{};if(qr(i)!==qr(o))return"NOT_EQ";let c=!1;for(let u in i)if(i.hasOwnProperty(u)){if(o[u]===void 0)return"NOT_EQ";switch(kn(i[u],o[u])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"}(n.mapValue,e.mapValue):function(r,s){return Ht(r,s,{be:!1,ye:!0,we:!0})}(n,e)?"EQ":"NOT_EQ"}var GB=class extends rs{ki(e,t){return pn(e)+pn(t)}Ui(e,t){return{doubleValue:st(e)+st(t)}}},UB=class extends rs{constructor(e){super(e),this.expr=e}ki(e,t){return pn(e)-pn(t)}Ui(e,t){return{doubleValue:st(e)-st(t)}}},HB=class extends rs{constructor(e){super(e),this.expr=e}ki(e,t){return pn(e)*pn(t)}Ui(e,t){return{doubleValue:st(e)*st(t)}}},qB=class extends rs{constructor(e){super(e),this.expr=e}ki(e,t){let r=pn(t);if(r!==BigInt(0))return pn(e)/r}Ui(e,t){let r=st(t);return r===0?{doubleValue:Ms(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:st(e)/r}}},jB=class extends rs{constructor(e){super(e),this.expr=e}ki(e,t){let r=pn(t);if(r!==BigInt(0))return pn(e)%r}Ui(e,t){let r=st(t);if(r!==0)return{doubleValue:st(e)%r}}},KB=class{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let o=te(i).evaluate(e,t);switch(o.type){case"BOOLEAN":if(!o.value?.booleanValue)return b.newValue(Ze);break;case"NULL":s=!0;break;default:r=!0}}return r?b.Oi():s?b.Ni():b.newValue(Tt)}},ui=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,9634);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return b.newValue({booleanValue:!r.value?.booleanValue});case"NULL":return b.Ni();default:return b.Oi()}}},JB=class{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let o=te(i).evaluate(e,t);switch(o.type){case"BOOLEAN":if(o.value?.booleanValue)return b.newValue(Tt);break;case"NULL":s=!0;break;default:r=!0}}return r?b.Oi():s?b.Ni():b.newValue(Ze)}},zB=class n{constructor(e){this.expr=e}evaluate(e,t){let r=!1,s=!1;for(let i of this.expr.params){let o=te(i).evaluate(e,t);switch(o.type){case"BOOLEAN":r=n.xor(r,!!o.value?.booleanValue);break;case"NULL":s=!0;break;default:return b.Oi()}}return s?b.Ni():b.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}},su=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,55094);let r=!1,s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return b.Oi()}let i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return b.Oi()}if(r)return b.Ni();for(let o of i.value?.arrayValue?.values??[])switch(xt(s.value)&&xt(o)?"EQ":kn(s.value,o)){case"EQ":return b.newValue(Tt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Z(44608,{value:s.value,candidate:o})}return r?b.Ni():b.newValue(Ze)}},WB=class{constructor(e){this.expr=e}evaluate(e,t){return new ui(new x("not",[new x("equal_any",this.expr.params)])).evaluate(e,t)}},$B=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,23322);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return b.newValue(Ze);case"DOUBLE":return b.newValue({booleanValue:isNaN(st(r.value))});case"NULL":return b.Ni();default:return b.Oi()}}},QB=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,50406),new ui(new x("not",[new x("is_nan",this.expr.params)])).evaluate(e,t)}},YB=class{constructor(e){this.expr=e}evaluate(e,t){switch(Q(this.expr.params.length===1,23123),te(this.expr.params[0]).evaluate(e,t).type){case"NULL":return b.newValue(Tt);case"UNSET":case"ERROR":return b.Oi();default:return b.newValue(Ze)}}},XB=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,23167),new ui(new x("not",[new x("is_null",this.expr.params)])).evaluate(e,t)}},ZB=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===1,5228),te(this.expr.params[0]).evaluate(e,t).type==="ERROR"?b.newValue(Tt):b.newValue(Ze)}},ed=class{constructor(e){this.expr=e}evaluate(e,t){switch(Q(this.expr.params.length===1,6877),te(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return b.Oi();case"UNSET":return b.newValue(Ze);default:return b.newValue(Tt)}}},td=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===3,11706);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return r.value?.booleanValue?te(this.expr.params[1]).evaluate(e,t):te(this.expr.params[2]).evaluate(e,t);case"NULL":return te(this.expr.params[2]).evaluate(e,t);default:return b.Oi()}}},nd=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map(i=>te(i).evaluate(e,t)),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||At(i.value,s.value)>0?i:s}return s===void 0?b.Ni():s}},rd=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map(i=>te(i).evaluate(e,t)),s;for(let i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||At(i.value,s.value)<0?i:s}return s===void 0?b.Ni():s}},cr=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return b.Oi()}let s=te(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return b.Oi()}return this.Ki(r,s)}},sd=class extends cr{constructor(e){super(e),this.expr=e}Ki(e,t){if(e.Li()&&t.Li())return b.newValue(Tt);if(e.Li()||t.Li()||et(e.value)||et(t.value)||He(e.value)!==He(t.value))return b.newValue(Ze);switch(kn(e.value,t.value)){case"EQ":return b.newValue(Tt);case"NOT_EQ":return b.newValue(Ze);case"NULL":return b.Ni();default:Z(44615,{left:e,right:t})}}},id=class extends cr{constructor(e){super(e),this.expr=e}Ki(e,t){switch(kn(e.value,t.value)){case"EQ":return b.newValue(Ze);case"NOT_EQ":case"TYPE_MISMATCH":return b.newValue(Tt);case"NULL":return b.Ni();default:Z(44614,{left:e,right:t})}}},od=class extends cr{constructor(e){super(e),this.expr=e}Ki(e,t){return He(e.value)!==He(t.value)||et(e.value)||et(t.value)?b.newValue(Ze):b.newValue({booleanValue:At(e.value,t.value)<0})}},ad=class extends cr{constructor(e){super(e),this.expr=e}Ki(e,t){return He(e.value)!==He(t.value)||et(e.value)||et(t.value)?b.newValue(Ze):kn(e.value,t.value)==="EQ"?b.newValue(Tt):b.newValue({booleanValue:At(e.value,t.value)<0})}},cd=class extends cr{constructor(e){super(e),this.expr=e}Ki(e,t){return He(e.value)!==He(t.value)||et(e.value)||et(t.value)?b.newValue(Ze):b.newValue({booleanValue:At(e.value,t.value)>0})}},ud=class extends cr{constructor(e){super(e),this.expr=e}Ki(e,t){return He(e.value)!==He(t.value)||et(e.value)||et(t.value)?b.newValue(Ze):kn(e.value,t.value)==="EQ"?b.newValue(Tt):b.newValue({booleanValue:At(e.value,t.value)>0})}},ld=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},hd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,216);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return b.Ni();case"ARRAY":{let s=r.value.arrayValue?.values??[];return b.newValue({arrayValue:{values:[...s].reverse()}})}default:return b.Oi()}}},Bd=class{constructor(e){this.expr=e}evaluate(e,t){return Q(this.expr.params.length===2,52884),new su(new x("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}},dd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,1392);let r=!1,s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return b.Oi()}let i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return b.Oi()}if(r)return b.Ni();let o=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(let u of o){let l=!1;r=!1;for(let B of c){switch(xt(u)&&xt(B)?"EQ":kn(u,B)){case"EQ":l=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Z(44613,{value:B,search:u})}if(l)break}if(!l)return b.newValue(Ze)}return b.newValue(Tt)}},fd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,2680);let r=!1,s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return b.Oi()}let i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return b.Oi()}if(r)return b.Ni();let o=i.value?.arrayValue?.values??[],c=s.value?.arrayValue?.values??[];for(let u of c)for(let l of o)switch(xt(u)&&xt(l)?"EQ":kn(u,l)){case"EQ":return b.newValue(Tt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:Z(60403,{value:u,search:l})}return r?b.Ni():b.newValue(Ze)}},pd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,38605);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return b.Ni();case"ARRAY":return b.newValue({integerValue:`${r.value?.arrayValue?.values?.length??0}`});default:return b.Oi()}}},gd=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Cd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,1508);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return b.Ni();case"BYTES":{let s=r.value?.bytesValue;if(typeof s=="string"){let i=be.fromBase64String(s).toUint8Array();return i.reverse(),b.newValue({bytesValue:be.fromUint8Array(i).toBase64()})}return b.newValue({bytesValue:new Uint8Array(s).reverse()})}case"STRING":{let s=r.value?.stringValue,i=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(s),o=Array.from(i,c=>c.segment).reverse();return b.newValue({stringValue:o.join("")})}default:return b.Oi()}}},md=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},Ed=class{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}},_d=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,19400);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return b.Ni();case"STRING":{let s=function(o){let c=0;for(let u=0;u<o.length;u++){let l=o.codePointAt(u);if(l===void 0)return;if(l<=65535)if(l>=55296&&l<=57343)if(l<=56319){let B=o.codePointAt(u+1);B!==void 0&&B>=56320&&B<=57343?(c+=1,u++):c+=1}else c+=1;else c+=1;else{if(!(l<=1114111))return;c+=1,u++}}return c}(r.value.stringValue);return s===void 0?b.Oi():b.newValue({integerValue:s})}default:return b.Oi()}}},yd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,8486);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BYTES":{let s=r.value?.bytesValue;return typeof s=="string"?b.newValue({integerValue:be.fromBase64String(s).toUint8Array().length}):b.newValue({integerValue:new Uint8Array(s).length})}case"STRING":{let s=function(o){let c=0;for(let u=0;u<o.length;u++){let l=o.codePointAt(u);if(l===void 0)return;if(l>=55296&&l<=57343){if(!(l<=56319))return;{let B=o.codePointAt(u+1);if(B===void 0||!(B>=56320&&B<=57343))return;c+=4,u++}}else if(l<=127)c+=1;else if(l<=2047)c+=2;else if(l<=65535)c+=3;else{if(!(l<=1114111))return;c+=4,u++}}return c}(r.value?.stringValue);return s===void 0?b.Oi():b.newValue({integerValue:s})}case"NULL":return b.Ni();default:return b.Oi()}}},ur=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1,s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return b.Oi()}let i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return b.Oi()}return r?b.Ni():this.Wi(s.value?.stringValue,i.value?.stringValue)}},wd=class extends ur{Wi(e,t){try{let r=function(o){let c="";for(let u=0;u<o.length;u++){let l=o.charAt(u);switch(l){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+l;break;default:c+=l}}return"^"+c+"$"}(t),s=mc.compile(r);return b.newValue({booleanValue:s.matches(e)})}catch(r){return Ut(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${r}`),b.Oi()}}},Id=class extends ur{Wi(e,t){try{let r=mc.compile(t);return b.newValue({booleanValue:r.test(e)})}catch{return Ut(`Invalid regex pattern found in regex_contains: ${t}, returning error`),b.Oi()}}},Dd=class extends ur{Wi(e,t){try{return b.newValue({booleanValue:mc.compile(t).matches(e)})}catch{return Ut(`Invalid regex pattern found in regex_match: ${t}, returning error`),b.Oi()}}},Td=class extends ur{Wi(e,t){return b.newValue({booleanValue:e.includes(t)})}},Ad=class extends ur{Wi(e,t){return b.newValue({booleanValue:e.startsWith(t)})}},bd=class extends ur{Wi(e,t){return b.newValue({booleanValue:e.endsWith(t)})}},vd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,29079);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return b.newValue({stringValue:r.value?.stringValue?.toLowerCase()});case"NULL":return b.Ni();default:return b.Oi()}}},Rd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,60487);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return b.newValue({stringValue:r.value?.stringValue?.toUpperCase()});case"NULL":return b.Ni();default:return b.Oi()}}},Sd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,28544);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":return b.newValue({stringValue:r.value?.stringValue?.trim()});case"NULL":return b.Ni();default:return b.Oi()}}},Od=class{constructor(e){this.expr=e}evaluate(e,t){let r=this.expr.params.map(o=>te(o).evaluate(e,t)),s="",i=!1;for(let o of r)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return b.Oi()}return i?b.Ni():b.newValue({stringValue:s})}},Pd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,4483);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"UNSET":return b.Mi();case"MAP":break;default:return b.Oi()}let s=te(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return b.Oi();let i=r.value?.mapValue?.fields?.[s.value?.stringValue];return i===void 0?b.Mi():b.newValue(i)}},Mo=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1,s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return b.Oi()}let i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return b.Oi()}if(r)return b.Ni();let o=zh(s.value),c=zh(i.value);if(o===void 0||c===void 0||o.values?.length!==c.values?.length)return b.Oi();let u=this.Gi(o,c);return u===void 0||isNaN(u)?b.Oi():b.newValue({doubleValue:u})}},Nd=class extends Mo{Gi(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return;let i=0,o=0,c=0;for(let l=0;l<r.length;l++){if(!Pn(r[l])||!Pn(s[l]))return;let B=st(r[l]),f=st(s[l]);i+=B*f,o+=B*B,c+=f*f}let u=Math.sqrt(o)*Math.sqrt(c);if(u!==0)return 1-Math.max(-1,Math.min(1,i/u))}},xd=class extends Mo{Gi(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!Pn(r[o])||!Pn(s[o]))return;i+=st(r[o])*st(s[o])}return i}},Ld=class extends Mo{Gi(e,t){let r=e?.values??[],s=t?.values??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!Pn(r[o])||!Pn(s[o]))return;let c=st(r[o]),u=st(s[o]);i+=Math.pow(c-u,2)}return Math.sqrt(i)}},kd=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,39044);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{let s=zh(r.value);return b.newValue({integerValue:s?.values?.length??0})}case"NULL":return b.Ni();default:return b.Oi()}}},Go=BigInt(-62135596800),Uo=BigInt(253402300799),iu=BigInt(1e3),rr=BigInt(1e6),Zb=Go*iu,e0=Uo*iu+BigInt(999),t0=Go*rr,n0=Uo*rr+BigInt(999999);function jf(n){return n>=t0&&n<=n0}function j_(n){return n>=Go&&n<=Uo}function Ho(n,e){let t=BigInt(n);return!(t<Go||t>Uo)&&!(e<0||e>=1e9)&&(t!==Go||e===0)&&!(t===Uo&&e>999999999)}function K_(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function Kf(n){return BigInt(n.seconds)*rr+BigInt(Math.trunc(n.nanoseconds/1e3))}var qo=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return b.Ni();default:return b.Oi()}}},Fd=class extends qo{toTimestamp(e){if(!jf(e))return b.Oi();let t=Number(e/rr),r=Number(e%rr*BigInt(1e3)),s=K_(t,r);return t=s.seconds,r=s.nanos,Ho(t,r)?b.newValue({timestampValue:{seconds:t,nanos:r}}):b.Oi()}},Vd=class extends qo{toTimestamp(e){if(!function(o){return o>=Zb&&o<=e0}(e))return b.Oi();let t=Number(e/iu),r=Number(e%iu*BigInt(1e6)),s=K_(t,r);return t=s.seconds,r=s.nanos,Ho(t,r)?b.newValue({timestampValue:{seconds:t,nanos:r}}):b.Oi()}},Md=class extends qo{toTimestamp(e){if(!j_(e))return b.Oi();let t=Number(e);return b.newValue({timestampValue:{seconds:t,nanos:0}})}},jo=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);let r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":return b.Ni();default:return b.Oi()}let s=Mf(r.value.timestampValue);return Ho(s.seconds,s.nanoseconds)?this.ji(s):b.Oi()}},Gd=class extends jo{ji(e){let t=Kf(e);return jf(t)?b.newValue({integerValue:`${t.toString()}`}):b.Oi()}},Ud=class extends jo{ji(e){let t=Kf(e),r=t/BigInt(1e3),s=t%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?b.newValue({integerValue:r.toString()}):b.newValue({integerValue:(r-BigInt(1)).toString()})}},Hd=class extends jo{ji(e){let t=BigInt(e.seconds);return j_(t)?b.newValue({integerValue:t.toString()}):b.Oi()}},ou=class{constructor(e){this.expr=e}evaluate(e,t){Q(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1,s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return b.Oi()}let i=te(this.expr.params[1]).evaluate(e,t),o;switch(i.type){case"STRING":if(o=function($){switch($){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(i.value.stringValue),o===void 0)return b.Oi();break;case"NULL":r=!0;break;default:return b.Oi()}let c=te(this.expr.params[2]).evaluate(e,t);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return b.Oi()}if(r)return b.Ni();let u=BigInt(c.value.integerValue),l;try{switch(o){case"microsecond":l=u;break;case"millisecond":l=u*BigInt(1e3);break;case"second":l=u*BigInt(1e6);break;case"minute":l=u*BigInt(6e7);break;case"hour":l=u*BigInt(36e8);break;case"day":l=u*BigInt(864e8);break;default:return b.Oi()}if(o!=="microsecond"&&u!==BigInt(0)&&l/u!==BigInt(this.zi(o)))return b.Oi()}catch(K){return Ut(`Error during timestamp arithmetic: ${K}`),b.Oi()}let B=Mf(s.value.timestampValue);if(!Ho(B.seconds,B.nanoseconds))return b.Oi();let f=Kf(B),g=this.Hi(f,l);if(!jf(g))return b.Oi();let I=Number(g/rr),D=g%rr,O=Number((D<0?D+rr:D)*BigInt(1e3)),M=D<0?I-1:I;return Ho(M,O)?b.newValue({timestampValue:{seconds:M,nanos:O}}):b.Oi()}zi(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}},qd=class extends ou{Hi(e,t){return e+t}},jd=class extends ou{Hi(e,t){return e-t}};function Ko(n){if((n=q_(n))instanceof ts)return`fld(${n.fieldName})`;if(n instanceof oi)return`cst(${function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof rt?`ref(${t.path})`:t instanceof Lt?`vec(${JSON.stringify(t)})`:JSON.stringify(t)}(n.value)})`;if(n instanceof x)return`fn(${n.name},[${n.params.map(Ko).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.di.map(Ko).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function r0(n){if(n instanceof eu)return`${n._name}(${wc(n.fields)})`;if(n instanceof tu){let e=`${n._name}(${wc(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${wc(n.groups)})`),e}if(n instanceof nu)return`${n._name}(${wc(n.groups)})`;if(n instanceof ai)return`${n._name}(${n.pi})`;if(n instanceof ci)return`${n._name}(${n.collectionId})`;if(n instanceof Lo)return`${n._name}()`;if(n instanceof ko)return`${n._name}(${n.gi.sort()})`;if(n instanceof Fo)return`${n._name}(${Ko(n.condition)})`;if(n instanceof ns)return`${n._name}(${n.limit})`;if(n instanceof Vo)return`${n._name}(${function(t){return t.map(r=>`${Ko(r.expr)}${r.direction}`).join(",")}(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function wc(n){return`${Array.from(n.entries()).sort().map(([e,t])=>`${e}=${Ko(t)}`).join(",")}`}function vn(n){return n.stages.map(e=>r0(e)).join("|")}function J_(n,e){return vn(n)===vn(e)}function je(n){return n instanceof Bt}function bE(n){return je(n)?vn(n):po(n)}function z_(n){return je(n)?vn(n):function(t){return`${B_(hn(t))}|lt:${t.limitType}`}(n)}function Ru(n,e){return n instanceof Bt&&e instanceof Bt?J_(n,e):!(n instanceof Bt&&!(e instanceof Bt)||!(n instanceof Bt)&&e instanceof Bt)&&nb(n,e)}function W_(n){return Fr(n)?vn(n):B_(n)}function $_(n,e){return n instanceof Bt&&e instanceof Bt?J_(n,e):!(n instanceof Bt&&!(e instanceof Bt)||!(n instanceof Bt)&&e instanceof Bt)&&d_(n,e)}var Kd=class{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let i=this.mutations[s];i.key.isEqual(e.key)&&JA(i,e,r[s])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=fo(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=fo(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=E_();return this.mutations.forEach(s=>{let i=e.get(s.key),o=i.overlayedDocument,c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;let u=i_(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(se.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),le())}isEqual(e){return this.batchId===e.batchId&&ks(this.mutations,e.mutations,(t,r)=>uE(t,r))&&ks(this.baseMutations,e.baseMutations,(t,r)=>uE(t,r))}},Jd=class n{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Q(e.mutations.length===r.length,58842,{Ji:e.mutations.length,Yi:r.length});let s=function(){return ob}(),i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new n(e,t,r,s)}};var Q_="";function s0(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=vE(e)),e=i0(n.get(t),e);return vE(e)}function i0(n,e){let t=e,r=n.length;for(let s=0;s<r;s++){let i=n.charAt(s);switch(i){case"\0":t+="";break;case Q_:t+="";break;default:t+=i}}return t}function vE(n){return n+Q_+""}var o0="remoteDocuments",Y_="owner";var X_="mutationQueues";var Z_="mutations";var ey="documentMutations",a0="remoteDocumentsV14";var ty="remoteDocumentGlobal";var ny="targets";var ry="targetDocuments";var sy="targetGlobal",iy="collectionParents";var oy="clientMetadata";var ay="bundles";var cy="namedQueries";var c0="indexConfiguration";var u0="indexState";var l0="indexEntries";var uy="documentOverlays";var h0="globals";var B0=[X_,Z_,ey,o0,ny,Y_,sy,ry,oy,ty,iy,ay,cy],DP=[...B0,uy],d0=[X_,Z_,ey,a0,ny,Y_,sy,ry,oy,ty,iy,ay,cy,uy],f0=d0,p0=[...f0,c0,u0,l0];var TP=[...p0,h0];var zd=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var li=class n{constructor(e,t,r,s,i=se.min(),o=se.min(),c=be.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var Wd=class{constructor(e){this.Xi=e}};function g0(n){let e=wb({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?xc(e,e.limit,"L"):e}var au=class{constructor(){}Ts(e,t){this.Ps(e,t),t.Is()}Ps(e,t){if("nullValue"in e)this.Rs(t,5);else if("booleanValue"in e)this.Rs(t,10),t.As(e.booleanValue?1:0);else if("integerValue"in e)this.Rs(t,15),t.As(Te(e.integerValue));else if("doubleValue"in e){let r=Te(e.doubleValue);this.Vs(r,t)}else if("timestampValue"in e)this.ds(e.timestampValue,t);else if("stringValue"in e)this.fs(e.stringValue,t),this.ps(t);else if("bytesValue"in e)this.Rs(t,30),t.gs(Qt(e.bytesValue)),this.ps(t);else if("referenceValue"in e)this.ys(e.referenceValue,t);else if("geoPointValue"in e)this.ws(e.geoPointValue,t);else if("mapValue"in e){let r=Lf(e);if(r===he.fe)this.Rs(t,Number.MAX_SAFE_INTEGER);else if(r===he.me)this.bs(e.mapValue,t);else if(r===he.de)this.Rs(t,999);else if(r===he.Ve)this.Rs(t,7);else if(r===he.Ae){let s=e.mapValue?.fields,i=s?.[Hs],o=i?.bytesValue,c=Qt(o).toUint8Array();if(c[0]===0){let u=c.slice(1);this.Rs(t,30),t.gs(be.fromUint8Array(u)),this.ps(t)}else this.Ss(e.mapValue,t)}else if(r===he.he)this.xs(e.mapValue,t);else if(r===he.Re)this.vs(e.mapValue,t);else if(r===he.Te)this.Ds(e.mapValue,t);else if(r===he.Pe)this.Cs(e.mapValue,t);else if(r===he.Ie){let s=parseFloat(e.mapValue.fields[On].stringValue);this.Vs(s,t)}else this.Fs(e.mapValue,t),this.ps(t)}else"arrayValue"in e?(this.Os(e.arrayValue,t),this.ps(t)):Z(19022,{Ms:e})}fs(e,t){this.Rs(t,25),this.Ns(e,t)}Ns(e,t){t.Bs(e)}Vs(e,t){isNaN(e)?this.Rs(t,13):(this.Rs(t,15),Ms(e)?t.As(0):t.As(e))}Cs(e,t){this.Rs(t,15),t.As(Te(e.fields[Br].integerValue))}ds(e,t){this.Rs(t,20),typeof e=="string"&&(e=Sn(e)),t.Bs(`${e.seconds||""}`),t.As(e.nanos||0)}ws(e,t){this.Rs(t,45),t.As(e.latitude||0),t.As(e.longitude||0)}Fs(e,t){let r=e.fields||{};this.Rs(t,55);for(let s of Object.keys(r))this.fs(s,t),this.Ps(r[s],t)}bs(e,t){let r=e.fields||{};this.Rs(t,53);let s=jr,i=r[s].arrayValue?.values?.length||0;this.Rs(t,15),t.As(Te(i)),this.fs(s,t),this.Ps(r[s],t)}Os(e,t){let r=e.values||[];this.Rs(t,50);for(let s of r)this.Ps(s,t)}ys(e,t){this.Rs(t,37);let r=e.split("/").filter(s=>s.length>0);ee.fromSegments(r.slice(5)).path.forEach(s=>{this.Rs(t,60),this.Ns(s,t)})}Rs(e,t){e.As(t)}ps(e){e.As(2)}vs(e,t){this.Rs(t,22);let r=e.fields||{};r&&this.Fs(r[An].mapValue,t)}Ds(e,t){this.Rs(t,43);let r=e.fields||{},s=r[Kr]?.stringValue||"";t.gs(Qt(s))}Ss(e,t){this.Rs(t,31);let r=e.fields||{},s=r[Hs]?.bytesValue||"";t.gs(Qt(s)),this.ps(t)}xs(e,t){this.Rs(t,47);let r=e.fields||{},s=r[an]?.mapValue?.fields||{};s&&(t.Bs(s[Gs]?.stringValue||""),t.Bs(s[Us]?.stringValue||"")),this.ps(t)}};au.Ls=new au;var $d=class{constructor(){this.d_=new Qd}addToCollectionParentIndex(e,t){return this.d_.add(t),G.resolve()}getCollectionParents(e,t){return G.resolve(this.d_.getEntries(t))}addFieldIndex(e,t){return G.resolve()}deleteFieldIndex(e,t){return G.resolve()}deleteAllFieldIndexes(e){return G.resolve()}createTargetIndexes(e,t){return G.resolve()}getDocumentsMatchingTarget(e,t){return G.resolve(null)}getIndexType(e,t){return G.resolve(0)}getFieldIndexes(e,t){return G.resolve([])}getNextCollectionGroupToUpdate(e){return G.resolve(null)}getMinOffset(e,t){return G.resolve(Xr.min())}getMinOffsetFromCollectionGroup(e,t){return G.resolve(Xr.min())}updateCollectionGroup(e,t,r){return G.resolve()}updateIndexEntries(e,t){return G.resolve()}},Qd=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ke(Ie.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ke(Ie.comparator)).toArray()}};var AP=new Uint8Array(0);var ss=class n{constructor(e){this.K_=e}next(){return this.K_+=2,this.K_}static W_(){return new n(0)}static G_(){return new n(-1)}};function ly(n,e){let t=e;for(let r of n.stages)t=m0({serializer:n.serializer,serverTimestampBehavior:n.listenOptions?.serverTimestampBehavior},r,t);return t}function Su(n,e){return ly(n,[e]).length>0}function C0(n,e){return je(n)?Su(n,e):Tu(n,e)}function m0(n,e,t){if(e instanceof ai)return function(s,i,o){return o.filter(c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.pi)}(0,e,t);if(e instanceof Fo)return function(s,i,o){return o.filter(c=>{let u=mo(te(i.condition).evaluate(s,c));return u!==void 0&&Ht(u,Tt)})}(n,e,t);if(e instanceof ci)return function(s,i,o){return o.filter(c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId)}(0,e,t);if(e instanceof Lo)return function(s,i,o){return o.filter(c=>c.isFoundDocument())}(0,0,t);if(e instanceof ko)return function(s,i,o){return o.filter(c=>c.isFoundDocument()&&i.yi.has(c.key.path.toStringWithLeadingSlash()))}(0,e,t);if(e instanceof ns)return function(s,i,o){return o.slice(0,i.limit)}(0,e,t);if(e instanceof Vo)return function(s,i,o){let c=i.orderings.map(u=>({eo:te(u.expr),direction:u.direction}));return[...o].sort((u,l)=>{for(let{eo:B,direction:f}of c){let g=mo(B.evaluate(s,u)),I=mo(B.evaluate(s,l)),D=At(g??qs,I??qs);if(D!==0)return f==="ascending"?D:-D}return 0})}(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Yd(n){let e=function(r){for(let s=r.stages.length-1;s>=0;s--){let i=r.stages[s];if(i instanceof Vo)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(n);return(t,r)=>{for(let s of e){let i=mo(te(s.expr).evaluate({serializer:n.serializer},t)),o=mo(te(s.expr).evaluate({serializer:n.serializer},r)),c=At(i||qs,o||qs);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function Gh(n){for(let e=n.stages.length-1;e>=0;e--){let t=n.stages[e];if(t instanceof ns)return{limit:t.limit}}}var Xd=class{constructor(){this.changes=new xn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Xt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?G.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Zd=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var ef=class{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&fo(r.mutation,s,on.empty(),Re.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,le()).next(()=>r))}getLocalViewOfDocuments(e,t,r=le()){let s=Zn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=As();return i.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let r=Zn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,le()))}populateOverlays(e,t,r){let s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,s){let i=It(),o=go(),c=function(){return go()}();return t.forEach((u,l)=>{let B=r.get(l.key);s.has(l.key)&&(B===void 0||B.mutation instanceof Nn)?i=i.insert(l.key,l):B!==void 0?(o.set(l.key,B.mutation.getFieldMask()),fo(B.mutation,l,B.mutation.getFieldMask(),Re.now())):o.set(l.key,on.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((l,B)=>o.set(l,B)),t.forEach((l,B)=>c.set(l,new Zd(B,o.get(l)??null))),c))}recalculateAndSaveOverlays(e,t){let r=go(),s=new Se((o,c)=>o-c),i=le();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let c of o)c.keys().forEach(u=>{let l=t.get(u);if(l===null)return;let B=r.get(u)||on.empty();B=c.applyToLocalView(l,B),r.set(u,B);let f=(s.get(c.batchId)||le()).add(u);s=s.insert(c.batchId,f)})}).next(()=>{let o=[],c=s.getReverseIterator();for(;c.hasNext();){let u=c.getNext(),l=u.key,B=u.value,f=E_();B.forEach(g=>{if(!i.has(g)){let I=i_(t.get(g),r.get(g));I!==null&&f.set(g,I),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,f))}return G.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return je(t)?this.getDocumentsMatchingPipeline(e,t,r,s):eb(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):p_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{let o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):G.resolve(Zn()),c=vo,u=i;return o.next(l=>G.forEach(l,(B,f)=>(c<f.largestBatchId&&(c=f.largestBatchId),i.get(B)?G.resolve():this.remoteDocumentCache.getEntry(e,B).next(g=>{u=u.insert(B,g)}))).next(()=>this.populateOverlays(e,l,i)).next(()=>this.computeViews(e,u,l,le())).next(B=>({batchId:c,changes:m_(B)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ee(t)).next(r=>{let s=As();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){let i=t.collectionGroup,o=As();return this.indexManager.getCollectionParents(e,i).next(c=>G.forEach(c,u=>{let l=function(f,g){return new Ys(g,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,l,r,s).next(B=>{B.forEach((f,g)=>{o=o.insert(f,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(o=>this.retrieveMatchingLocalDocuments(i,o,c=>Tu(t,c)))}getDocumentsMatchingPipeline(e,t,r,s){if(nr(t)==="collection_group"){let i=qf(t),o=As();return this.indexManager.getCollectionParents(e,i).next(c=>G.forEach(c,u=>{let l=function(f,g){let I=f.stages.map(D=>D instanceof ci?new ai(g.canonicalString(),{}):D);return new Bt(f.serializer,I)}(t,u.child(i));return this.getDocumentsMatchingPipeline(e,l,r,s).next(B=>{B.forEach((f,g)=>{o=o.insert(f,g)})})}).next(()=>o))}{let i;return this.getOverlaysForPipeline(e,t,r.largestBatchId).next(o=>{switch(i=o,nr(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s);case"documents":let c=le();for(let u of kB(t))c=c.add(ee.fromPath(u));return this.remoteDocumentCache.getEntries(e,c);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new W("invalid-argument",`Invalid pipeline source to execute offline: ${vn(t)}`)}}).next(o=>this.retrieveMatchingLocalDocuments(i,o,c=>Su(t,c)))}}retrieveMatchingLocalDocuments(e,t,r){e.forEach((i,o)=>{let c=o.getKey();t.get(c)===null&&(t=t.insert(c,Xt.newInvalidDocument(c)))});let s=As();return t.forEach((i,o)=>{let c=e.get(i);c!==void 0&&fo(c.mutation,o,on.empty(),Re.now()),r(o)&&(s=s.insert(i,o))}),s}getOverlaysForPipeline(e,t,r){switch(nr(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,Ie.fromString(vu(t)),r);case"collection_group":throw new W("invalid-argument",`Unexpected collection group pipeline: ${vn(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,kB(t).map(s=>ee.fromPath(s)));case"database":return this.documentOverlayCache.getAllOverlays(e,r);default:throw new W("invalid-argument",`Failed to get overlays for pipeline: ${vn(t)}`)}}};var tf=class{constructor(e){this.serializer=e,this.co=new Map,this.lo=new Map}getBundleMetadata(e,t){return G.resolve(this.co.get(t))}saveBundleMetadata(e,t){return this.co.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Bn(s.createTime)}}(t)),G.resolve()}getNamedQuery(e,t){return G.resolve(this.lo.get(t))}saveNamedQuery(e,t){return this.lo.set(t.name,function(s){return{name:s.name,query:g0(s.bundledQuery),readTime:Bn(s.readTime)}}(t)),G.resolve()}};var nf=class{constructor(){this.overlays=new Se(ee.comparator),this.Eo=new Map}getOverlay(e,t){return G.resolve(this.overlays.get(t))}getOverlays(e,t){let r=Zn();return G.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}getAllOverlays(e,t){let r=Zn();return this.overlays.forEach((s,i)=>{i.largestBatchId>t&&r.set(s,i)}),G.resolve(r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.Es(e,t,i)}),G.resolve()}removeOverlaysForBatchId(e,t,r){let s=this.Eo.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Eo.delete(r)),G.resolve()}getOverlaysForCollection(e,t,r){let s=Zn(),i=t.length+1,o=new ee(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){let u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return G.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Se((l,B)=>l-B),o=this.overlays.getIterator();for(;o.hasNext();){let l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let B=i.get(l.largestBatchId);B===null&&(B=Zn(),i=i.insert(l.largestBatchId,B)),B.set(l.getKey(),l)}}let c=Zn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,B)=>c.set(l,B)),!(c.size()>=s)););return G.resolve(c)}Es(e,t,r){let s=this.overlays.get(r.key);if(s!==null){let o=this.Eo.get(s.largestBatchId).delete(r.key);this.Eo.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new zd(t,r));let i=this.Eo.get(t);i===void 0&&(i=le(),this.Eo.set(t,i)),this.Eo.set(t,i.add(r.key))}};var rf=class{constructor(){this.sessionToken=be.EMPTY_BYTE_STRING}getSessionToken(e){return G.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,G.resolve()}};var Jo=class{constructor(){this.ho=new Ke(Ge.To),this.Po=new Ke(Ge.Io)}isEmpty(){return this.ho.isEmpty()}addReference(e,t){let r=new Ge(e,t);this.ho=this.ho.add(r),this.Po=this.Po.add(r)}Ro(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Ao(new Ge(e,t))}Vo(e,t){e.forEach(r=>this.removeReference(r,t))}fo(e){let t=new ee(new Ie([])),r=new Ge(t,e),s=new Ge(t,e+1),i=[];return this.Po.forEachInRange([r,s],o=>{this.Ao(o),i.push(o.key)}),i}mo(){this.ho.forEach(e=>this.Ao(e))}Ao(e){this.ho=this.ho.delete(e),this.Po=this.Po.delete(e)}po(e){let t=new ee(new Ie([])),r=new Ge(t,e),s=new Ge(t,e+1),i=le();return this.Po.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){let t=new Ge(e,0),r=this.ho.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},Ge=class{constructor(e,t){this.key=e,this.yo=t}static To(e,t){return ee.comparator(e.key,t.key)||ce(e.yo,t.yo)}static Io(e,t){return ce(e.yo,t.yo)||ee.comparator(e.key,t.key)}};var sf=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.rs=1,this.wo=new Ke(Ge.To)}checkEmpty(e){return G.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){let i=this.rs;this.rs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new Kd(i,t,r,s);this.mutationQueue.push(o);for(let c of s)this.wo=this.wo.add(new Ge(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return G.resolve(o)}lookupMutationBatch(e,t){return G.resolve(this.bo(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,s=this.So(r),i=s<0?0:s;return G.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return G.resolve(this.mutationQueue.length===0?Nf:this.rs-1)}getAllMutationBatches(e){return G.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new Ge(t,0),s=new Ge(t,Number.POSITIVE_INFINITY),i=[];return this.wo.forEachInRange([r,s],o=>{let c=this.bo(o.yo);i.push(c)}),G.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ke(ce);return t.forEach(s=>{let i=new Ge(s,0),o=new Ge(s,Number.POSITIVE_INFINITY);this.wo.forEachInRange([i,o],c=>{r=r.add(c.yo)})}),G.resolve(this.xo(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,s=r.length+1,i=r;ee.isDocumentKey(i)||(i=i.child(""));let o=new Ge(new ee(i),0),c=new Ke(ce);return this.wo.forEachWhile(u=>{let l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(c=c.add(u.yo)),!0)},o),G.resolve(this.xo(c))}xo(e){let t=[];return e.forEach(r=>{let s=this.bo(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Q(this.vo(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.wo;return G.forEach(t.mutations,s=>{let i=new Ge(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.wo=r})}us(e){}containsKey(e,t){let r=new Ge(t,0),s=this.wo.firstAfterOrEqual(r);return G.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,G.resolve()}vo(e,t){return this.So(e)}So(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}bo(e){let t=this.So(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var of=class{constructor(e){this.Do=e,this.docs=function(){return new Se(ee.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.Do(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return G.resolve(r?r.document.mutableCopy():Xt.newInvalidDocument(t))}getEntries(e,t){let r=It();return t.forEach(s=>{let i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Xt.newInvalidDocument(s))}),G.resolve(r)}getAllEntries(e){let t=It();return this.docs.forEach((r,s)=>{t=t.insert(r,s.document)}),G.resolve(t)}getDocumentsMatchingQuery(e,t,r,s){let i,o;je(t)?(i=Ie.fromString(vu(t)),o=B=>Su(t,B)):(i=t.path,o=B=>Tu(t,B));let c=It(),u=new ee(i.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){let{key:B,value:{document:f}}=l.getNext();if(!i.isPrefixOf(B.path))break;B.path.length>i.length+1||XA(YA(f),r)<=0||(s.has(f.key)||o(f))&&(c=c.insert(f.key,f.mutableCopy()))}return G.resolve(c)}getAllFromCollectionGroup(e,t,r,s){Z(9500)}Co(e,t){return G.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new af(this)}getSize(e){return G.resolve(this.size)}},af=class extends Xd{constructor(e){super(),this.ao=e}applyChanges(e){let t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.ao.addEntry(e,s)):this.ao.removeEntry(r)}),G.waitFor(t)}getFromCache(e,t){return this.ao.getEntry(e,t)}getAllFromCache(e,t){return this.ao.getEntries(e,t)}};var cf=class{constructor(e){this.persistence=e,this.Fo=new xn(t=>W_(t),$_),this.lastRemoteSnapshotVersion=se.min(),this.highestTargetId=0,this.Oo=0,this.Mo=new Jo,this.targetCount=0,this.No=ss.W_()}forEachTarget(e,t){return this.Fo.forEach((r,s)=>t(s)),G.resolve()}getLastRemoteSnapshotVersion(e){return G.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return G.resolve(this.Oo)}allocateTargetId(e){return this.highestTargetId=this.No.next(),G.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Oo&&(this.Oo=t),G.resolve()}H_(e){this.Fo.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.No=new ss(t),this.highestTargetId=t),e.sequenceNumber>this.Oo&&(this.Oo=e.sequenceNumber)}addTargetData(e,t){return this.H_(t),this.targetCount+=1,G.resolve()}updateTargetData(e,t){return this.H_(t),G.resolve()}removeTargetData(e,t){return this.Fo.delete(t.target),this.Mo.fo(t.targetId),this.targetCount-=1,G.resolve()}removeTargets(e,t,r){let s=0,i=[];return this.Fo.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Fo.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),G.waitFor(i).next(()=>s)}getTargetCount(e){return G.resolve(this.targetCount)}getTargetData(e,t){let r=this.Fo.get(t)||null;return G.resolve(r)}addMatchingKeys(e,t,r){return this.Mo.Ro(t,r),G.resolve()}removeMatchingKeys(e,t,r){this.Mo.Vo(t,r);let s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),G.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Mo.fo(t),G.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Mo.po(t);return G.resolve(r)}containsKey(e,t){return G.resolve(this.Mo.containsKey(t))}};var cu=class{constructor(e,t){this.Bo={},this.overlays={},this.Lo=new ri(0),this.$o=!1,this.$o=!0,this.Uo=new rf,this.referenceDelegate=e(this),this.ko=new cf(this),this.indexManager=new $d,this.remoteDocumentCache=function(s){return new of(s)}(r=>this.referenceDelegate.Qo(r)),this.serializer=new Wd(t),this.qo=new tf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.$o=!1,Promise.resolve()}get started(){return this.$o}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new nf,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Bo[e.toKey()];return r||(r=new sf(t,this.referenceDelegate),this.Bo[e.toKey()]=r),r}getGlobalsCache(){return this.Uo}getTargetCache(){return this.ko}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qo}runTransaction(e,t,r){J("MemoryPersistence","Starting transaction:",e);let s=new uf(this.Lo.next());return this.referenceDelegate.Ko(),r(s).next(i=>this.referenceDelegate.Wo(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Go(e,t){return G.or(Object.values(this.Bo).map(r=>()=>r.containsKey(e,t)))}},uf=class extends DB{constructor(e){super(),this.currentSequenceNumber=e}},lf=class n{constructor(e){this.persistence=e,this.jo=new Jo,this.zo=null}static Ho(e){return new n(e)}get Jo(){if(this.zo)return this.zo;throw Z(60996)}addReference(e,t,r){return this.jo.addReference(r,t),this.Jo.delete(r.toString()),G.resolve()}removeReference(e,t,r){return this.jo.removeReference(r,t),this.Jo.add(r.toString()),G.resolve()}markPotentiallyOrphaned(e,t){return this.Jo.add(t.toString()),G.resolve()}removeTarget(e,t){this.jo.fo(t.targetId).forEach(s=>this.Jo.add(s.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Jo.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ko(){this.zo=new Set}Wo(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return G.forEach(this.Jo,r=>{let s=ee.fromPath(r);return this.Yo(e,s).next(i=>{i||t.removeEntry(s,se.min())})}).next(()=>(this.zo=null,t.apply(e)))}updateLimboDocument(e,t){return this.Yo(e,t).next(r=>{r?this.Jo.delete(t.toString()):this.Jo.add(t.toString())})}Qo(e){return 0}Yo(e,t){return G.or([()=>G.resolve(this.jo.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Go(e,t)])}},uu=class n{constructor(e,t){this.persistence=e,this.Zo=new xn(r=>s0(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Fb(this,t)}static Ho(e,t){return new n(e,t)}Ko(){}Wo(e){return G.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Pi(e){let t=this.Y_(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}Y_(e){let t=0;return this.Ii(e,r=>{t++}).next(()=>t)}Ii(e,t){return G.forEach(this.Zo,(r,s)=>this.X_(e,r,s).next(i=>i?G.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Co(e,o=>this.X_(e,o,t).next(c=>{c||(r++,i.removeEntry(o,se.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.Zo.set(t,e.currentSequenceNumber),G.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.Zo.set(r,e.currentSequenceNumber),G.resolve()}removeReference(e,t,r){return this.Zo.set(r,e.currentSequenceNumber),G.resolve()}updateLimboDocument(e,t){return this.Zo.set(t,e.currentSequenceNumber),G.resolve()}Qo(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Oc(e.data.value)),t}X_(e,t,r){return G.or([()=>this.persistence.Go(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let s=this.Zo.get(t);return G.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var hf=class n{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$a=r,this.Ua=s}static ka(e,t){let r=le(),s=le();for(let i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new n(e,t.fromCache,r,s)}};function E0(n,e){return ee.comparator(n.key,e.key)}var Bf=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var df=class{constructor(){this.Qa=!1,this.qa=!1,this.Ka=100,this.Wa=function(){return qg()?8:Lb(We())>0?6:4}()}initialize(e,t){this.Ga=e,this.indexManager=t,this.Qa=!0}getDocumentsMatchingQuery(e,t,r,s){let i={result:null};return this.ja(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.za(e,t,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;let o=new Bf;return this.Ha(e,t,o).next(c=>{if(i.result=c,this.qa)return this.Ja(e,t,o,c.size)})}).next(()=>i.result)}Ja(e,t,r,s){return je(t)?G.resolve():r.documentReadCount<this.Ka?(Ds()<=ue.DEBUG&&J("QueryEngine","SDK will not create cache indexes for query:",po(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ka,"documents"),G.resolve()):(Ds()<=ue.DEBUG&&J("QueryEngine","Query:",po(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Wa*s?(Ds()<=ue.DEBUG&&J("QueryEngine","The SDK decides to create cache indexes for query:",po(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,hn(t))):G.resolve())}ja(e,t){if(je(t))return G.resolve(null);let r=t;if(pE(r))return G.resolve(null);let s=hn(r);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(r.limit!==null&&i===1&&(r=xc(r,null,"F"),s=hn(r)),this.indexManager.getDocumentsMatchingTarget(e,s).next(o=>{let c=le(...o);return this.Ga.getDocuments(e,c).next(u=>this.indexManager.getMinOffset(e,s).next(l=>{let B=this.Ya(r,u);return this.Za(r,B,c,l.readTime)?this.ja(e,xc(r,null,"F")):this.Xa(e,B,r,l)}))})))}za(e,t,r,s){return(je(t)?function(o){for(let c of o.stages){if(c instanceof ns||c instanceof ru)return!1;if(c instanceof Fo){if(c.condition instanceof Yc&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof ts&&c.condition._expr.params[0].fieldName===Fs)continue;return!1}}return!0}(t):pE(t))||s.isEqual(se.min())?G.resolve(null):this.Ga.getDocuments(e,r).next(i=>{let o=this.Ya(t,i);return this.Za(t,o,r,s)?G.resolve(null):(Ds()<=ue.DEBUG&&J("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),bE(t)),this.Xa(e,o,t,QA(s,vo)).next(c=>c))})}Ya(e,t){let r,s;return je(e)?(r=new Ke(E0),s=i=>Su(e,i)):(r=new Ke(Vf(e)),s=i=>Tu(e,i)),t.forEach((i,o)=>{s(o)&&(r=r.add(o))}),r}Za(e,t,r,s){if(je(e))return function(c){return c.stages.some(u=>u instanceof ns||u instanceof ru)}(e);if(e.limit===null)return!1;if(r.size!==t.size)return!0;let i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ha(e,t,r){return Ds()<=ue.DEBUG&&J("QueryEngine","Using full collection scan to execute query:",bE(t)),this.Ga.getDocumentsMatchingQuery(e,t,Xr.min(),r)}Xa(e,t,r,s){return this.Ga.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}};var Jf="LocalStore",_0=3e8,ff=class{constructor(e,t,r,s){this.persistence=e,this.eu=t,this.serializer=s,this.tu=new Se(ce),this.nu=new xn(i=>W_(i),$_),this.ru=new Map,this.iu=e.getRemoteDocumentCache(),this.ko=e.getTargetCache(),this.qo=e.getBundleCache(),this.su(r)}su(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ef(this.iu,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.iu.setIndexManager(this.indexManager),this.eu.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.tu))}};function y0(n,e,t,r){return new ff(n,e,t,r)}async function hy(n,e){let t=ie(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.su(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{let o=[],c=[],u=le();for(let l of s){o.push(l.batchId);for(let B of l.mutations)u=u.add(B.key)}for(let l of i){c.push(l.batchId);for(let B of l.mutations)u=u.add(B.key)}return t.localDocuments.getDocuments(r,u).next(l=>({_u:l,removedBatchIds:o,addedBatchIds:c}))})})}function w0(n,e){let t=ie(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let s=e.batch.keys(),i=t.iu.newChangeBuffer({trackRemovals:!0});return function(c,u,l,B){let f=l.batch,g=f.keys(),I=G.resolve();return g.forEach(D=>{I=I.next(()=>B.getEntry(u,D)).next(O=>{let M=l.docVersions.get(D);Q(M!==null,48541),O.version.compareTo(M)<0&&(f.applyToRemoteDocument(O,l),O.isValidDocument()&&(O.setReadTime(l.commitVersion),B.addEntry(O)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(u,f))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=le();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function By(n){let e=ie(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ko.getLastRemoteSnapshotVersion(t))}function I0(n,e){let t=ie(n),r=e.snapshotVersion,s=t.tu;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{let o=t.iu.newChangeBuffer({trackRemovals:!0});s=t.tu;let c=[];e.targetChanges.forEach((B,f)=>{let g=s.get(f);if(!g)return;c.push(t.ko.removeMatchingKeys(i,B.removedDocuments,f).next(()=>t.ko.addMatchingKeys(i,B.addedDocuments,f)));let I=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?I=I.withResumeToken(be.EMPTY_BYTE_STRING,se.min()).withLastLimboFreeSnapshotVersion(se.min()):B.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(B.resumeToken,r)),s=s.insert(f,I),function(O,M,K){return O.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=_0?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(g,I,B)&&c.push(t.ko.updateTargetData(i,I))});let u=It(),l=le();if(e.documentUpdates.forEach(B=>{e.resolvedLimboDocuments.has(B)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,B))}),c.push(D0(i,o,e.documentUpdates).next(B=>{u=B.ou,l=B.au})),!r.isEqual(se.min())){let B=t.ko.getLastRemoteSnapshotVersion(i).next(f=>t.ko.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(B)}return G.waitFor(c).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,l)).next(()=>u)}).then(i=>(t.tu=s,i))}function D0(n,e,t){let r=le(),s=le();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=It();return t.forEach((c,u)=>{let l=i.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(se.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):J(Jf,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),{ou:o,au:s}})}function T0(n,e){let t=ie(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Nf),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function A0(n,e){let t=ie(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.ko.getTargetData(r,e).next(i=>i?(s=i,G.resolve(s)):t.ko.allocateTargetId(r).next(o=>(s=new li(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.ko.addTargetData(r,s).next(()=>s))))}).then(r=>{let s=t.tu.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.tu=t.tu.insert(r.targetId,r),t.nu.set(e,r.targetId)),r})}async function pf(n,e,t){let r=ie(n),s=r.tu.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Ci(o))throw o;J(Jf,`Failed to update sequence numbers for target ${e}: ${o}`)}r.tu=r.tu.remove(e),r.nu.delete(s.target)}function RE(n,e,t){let r=ie(n),s=se.min(),i=le();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,B){let f=ie(u),g=f.nu.get(B);return g!==void 0?G.resolve(f.tu.get(g)):f.ko.getTargetData(l,B)}(r,o,je(e)?e:hn(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ko.getMatchingKeysForTargetId(o,c.targetId).next(u=>{i=u})}).next(()=>r.eu.getDocumentsMatchingQuery(o,e,t?s:se.min(),t?i:le())).next(c=>(b0(r,c),{documents:c,uu:i})))}function b0(n,e){e.forEach((t,r)=>{let s=r.key.getCollectionGroup(),i=n.ru.get(s)||se.min();r.readTime.compareTo(i)>0&&n.ru.set(s,r.readTime)})}var gf=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Pu=0,this.Iu=null,this.Ru=!0}Au(){this.Pu===0&&(this.Vu("Unknown"),this.Iu=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Iu=null,this.du("Backend didn't respond within 10 seconds."),this.Vu("Offline"),Promise.resolve())))}fu(e){this.state==="Online"?this.Vu("Unknown"):(this.Pu++,this.Pu>=1&&(this.mu(),this.du(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Vu("Offline")))}set(e){this.mu(),this.Pu=0,e==="Online"&&(this.Ru=!1),this.Vu(e)}Vu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}du(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ru?(Rn(t),this.Ru=!1):J("OnlineStateTracker",t)}mu(){this.Iu!==null&&(this.Iu.cancel(),this.Iu=null)}};var gn="RemoteStore",Cf=class{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.pu=[],this.gu=new Map,this.yu=new Map,this.wu=new Map,this.bu=new ss(1e3),this.Su=new ss(1001),this.xu=new Set,this.vu=[],this.Du=i,this.Du.tn(o=>{r.enqueueAndForget(async()=>{as(this)&&(J(gn,"Restarting streams for network reachability change."),await async function(u){let l=ie(u);l.xu.add(4),await Zo(l),l.Cu.set("Unknown"),l.xu.delete(4),await Ou(l)}(this))})}),this.Cu=new gf(r,s)}};async function Ou(n){if(as(n))for(let e of n.vu)await e(!0)}async function Zo(n){for(let e of n.vu)await e(!1)}function mf(n,e){return n.yu.get(e)||void 0}function dy(n,e){let t=ie(n),r=mf(t,e.targetId);if(r!==void 0&&t.gu.has(r))return;let s=function(c,u){let l=mf(c,u);l!==void 0&&c.wu.delete(l);let B=function(g,I){return I%2!=0?g.Su.next():g.bu.next()}(c,u);return c.yu.set(u,B),c.wu.set(B,u),B}(t,e.targetId);J(gn,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);let i=new li(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.gu.set(s,i),Qf(t)?$f(t):mi(t).ur()&&Wf(t,i)}function zf(n,e){let t=ie(n),r=mi(t),s=mf(t,e);J(gn,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.gu.delete(s),t.yu.delete(e),t.wu.delete(s),r.ur()&&fy(t,s),t.gu.size===0&&(r.ur()?r.Er():as(t)&&t.Cu.set("Unknown"))}function Wf(n,e){if(n.Fu.rt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(se.min())>0){let t=n.wu.get(e.targetId);if(t===void 0)return void J(gn,"SDK target ID not found for remote ID: "+e.targetId);let r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}mi(n).yr(e)}function fy(n,e){n.Fu.rt(e),mi(n).wr(e)}function $f(n){n.Fu=new aB({getRemoteKeysForTarget:e=>{let t=n.wu.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):le()},Mt:e=>n.gu.get(e)||null,xt:()=>n.datastore.serializer.databaseId}),mi(n).start(),n.Cu.Au()}function Qf(n){return as(n)&&!mi(n).ar()&&n.gu.size>0}function as(n){return ie(n).xu.size===0}function py(n){n.Fu=void 0}async function v0(n){n.Cu.set("Online")}async function R0(n){n.gu.forEach((e,t)=>{Wf(n,e)})}async function S0(n,e){py(n),Qf(n)?(n.Cu.fu(e),$f(n)):n.Cu.set("Unknown")}async function O0(n,e,t){if(n.Cu.set("Online"),e instanceof kc&&e.state===2&&e.cause)try{await async function(s,i){let o=i.cause;for(let c of i.targetIds){if(s.gu.has(c)){let u=s.wu.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.yu.delete(u),s.wu.delete(c)),s.gu.delete(c)}s.Fu.removeTarget(c)}}(n,e)}catch(r){J(gn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await lu(n,r)}else if(e instanceof Ns?n.Fu.Tt(e):e instanceof Lc?n.Fu.ft(e):n.Fu.Rt(e),!t.isEqual(se.min()))try{let r=await By(n.localStore);t.compareTo(r)>=0&&await function(i,o){let c=i.Fu.Dt(o);c.targetChanges.forEach((l,B)=>{if(l.resumeToken.approximateByteSize()>0){let f=i.gu.get(B);f&&i.gu.set(B,f.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,B)=>{let f=i.gu.get(l);if(!f)return;i.gu.set(l,f.withResumeToken(be.EMPTY_BYTE_STRING,f.snapshotVersion)),fy(i,l);let g=new li(f.target,l,B,f.sequenceNumber);Wf(i,g)});let u=function(B,f){let g=new Map;f.targetChanges.forEach((D,O)=>{let M=B.wu.get(O);M!==void 0&&g.set(M,D)});let I=new Se(ce);return f.targetMismatches.forEach((D,O)=>{let M=B.wu.get(D);M!==void 0&&(I=I.insert(M,O))}),new Ro(f.snapshotVersion,g,I,f.documentUpdates,f.augmentedDocumentUpdates,f.resolvedLimboDocuments)}(i,c);return i.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){J(gn,"Failed to raise snapshot:",r),await lu(n,r)}}async function lu(n,e,t){if(!Ci(e))throw e;n.xu.add(1),await Zo(n),n.Cu.set("Offline"),t||(t=()=>By(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{J(gn,"Retrying IndexedDB access"),await t(),n.xu.delete(1),await Ou(n)})}function gy(n,e){return e().catch(t=>lu(n,t,e))}async function Pu(n){let e=ie(n),t=lr(e),r=e.pu.length>0?e.pu[e.pu.length-1].batchId:Nf;for(;P0(e);)try{let s=await T0(e.localStore,r);if(s===null){e.pu.length===0&&t.Er();break}r=s.batchId,N0(e,s)}catch(s){await lu(e,s)}Cy(e)&&my(e)}function P0(n){return as(n)&&n.pu.length<10}function N0(n,e){n.pu.push(e);let t=lr(n);t.ur()&&t.br&&t.Sr(e.mutations)}function Cy(n){return as(n)&&!lr(n).ar()&&n.pu.length>0}function my(n){lr(n).start()}async function x0(n){lr(n).Cr()}async function L0(n){let e=lr(n);for(let t of n.pu)e.Sr(t.mutations)}async function k0(n,e,t){let r=n.pu.shift(),s=Jd.from(r,e,t);await gy(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Pu(n)}async function F0(n,e){e&&lr(n).br&&await async function(r,s){if(function(o){return sb(o)&&o!==F.ABORTED}(s.code)){let i=r.pu.shift();lr(r).lr(),await gy(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Pu(r)}}(n,e),Cy(n)&&my(n)}async function SE(n,e){let t=ie(n);t.asyncQueue.verifyOperationInProgress(),J(gn,"RemoteStore received new credentials");let r=as(t);t.xu.add(3),await Zo(t),r&&t.Cu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.xu.delete(3),await Ou(t)}async function V0(n,e){let t=ie(n);e?(t.xu.delete(2),await Ou(t)):e||(t.xu.add(2),await Zo(t),t.Cu.set("Unknown"))}function mi(n){return n.Ou||(n.Ou=function(t,r,s){let i=ie(t);return i.Or(),new _B(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{pn:v0.bind(null,n),yn:R0.bind(null,n),bn:S0.bind(null,n),gr:O0.bind(null,n)}),n.vu.push(async e=>{e?(n.Ou.lr(),Qf(n)?$f(n):n.Cu.set("Unknown")):(await n.Ou.stop(),py(n))})),n.Ou}function lr(n){return n.Mu||(n.Mu=function(t,r,s){let i=ie(t);return i.Or(),new yB(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{pn:()=>Promise.resolve(),yn:x0.bind(null,n),bn:F0.bind(null,n),vr:L0.bind(null,n),Dr:k0.bind(null,n)}),n.vu.push(async e=>{e?(n.Mu.lr(),await Pu(n)):(await n.Mu.stop(),n.pu.length>0&&(J(gn,`Stopping write stream with ${n.pu.length} pending writes`),n.pu=[]))})),n.Mu}var Ef=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Nu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Nu(this.observer.error,e):Rn("Uncaught Error in snapshot listener:",e.toString()))}Bu(){this.muted=!0}Nu(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var _f=class n{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){let o=Date.now()+r,c=new n(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Yf(n,e){if(Rn("AsyncQueue",`${e}: ${n}`),Ci(n))return new W(F.UNAVAILABLE,`${e}: ${n}`);throw n}var hu=class{constructor(){this.activeTargetIds=ub()}nc(e){this.activeTargetIds=this.activeTargetIds.add(e)}rc(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tc(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var yf=class{constructor(){this.kc=new hu,this.Qc={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.kc.nc(e),this.Qc[e]||"not-current"}updateQueryState(e,t,r){this.Qc[e]=t}removeLocalQueryTarget(e){this.kc.rc(e)}isLocalQueryTarget(e){return this.kc.activeTargetIds.has(e)}clearQueryState(e){delete this.Qc[e]}getAllActiveQueryTargets(){return this.kc.activeTargetIds}isActiveQueryTarget(e){return this.kc.activeTargetIds.has(e)}start(){return this.kc=new hu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};function Uh(){return typeof document<"u"?document:null}var zo=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||ee.comparator(t.key,r.key):(t,r)=>ee.comparator(t.key,r.key),this.keyedMap=As(),this.sortedSet=new Se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Bu=class{constructor(){this.qc=new Se(ee.comparator)}track(e){let t=e.doc.key,r=this.qc.get(t);r?e.type!==0&&r.type===3?this.qc=this.qc.insert(t,e):e.type===3&&r.type!==1?this.qc=this.qc.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.qc=this.qc.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.qc=this.qc.remove(t):e.type===1&&r.type===2?this.qc=this.qc.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.qc=this.qc.insert(t,{type:2,doc:e.doc}):Z(63341,{Nt:e,Kc:r}):this.qc=this.qc.insert(t,e)}Wc(){let e=[];return this.qc.inorderTraversal((t,r)=>{e.push(r)}),e}},hi=class n{constructor(e,t,r,s,i,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,s,i){let o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new n(e,t,zo.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ru(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}};var wf=class{constructor(){this.Gc=void 0,this.jc=[]}zc(){return this.jc.some(e=>e.Hc())}},If=class{constructor(){this.queries=OE(),this.onlineState="Unknown",this.Jc=new Set}terminate(){(function(t,r){let s=ie(t),i=s.queries;s.queries=OE(),i.forEach((o,c)=>{for(let u of c.jc)u.onError(r)})})(this,new W(F.ABORTED,"Firestore shutting down"))}};function OE(){return new xn(n=>z_(n),Ru)}async function M0(n,e){let t=ie(n),r=3,s=e.query,i=t.queries.get(s);i?!i.zc()&&e.Hc()&&(r=2):(i=new wf,r=e.Hc()?0:1);try{switch(r){case 0:i.Gc=await t.onListen(s,!0);break;case 1:i.Gc=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){let c=Yf(o,`Initialization of query '${je(e.query)?vn(e.query):po(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.jc.push(e),e.Yc(t.onlineState),i.Gc&&e.Zc(i.Gc)&&Xf(t)}async function G0(n,e){let t=ie(n),r=e.query,s=3,i=t.queries.get(r);if(i){let o=i.jc.indexOf(e);o>=0&&(i.jc.splice(o,1),i.jc.length===0?s=e.Hc()?0:1:!i.zc()&&e.Hc()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function U0(n,e){let t=ie(n),r=!1;for(let s of e){let i=s.query,o=t.queries.get(i);if(o){for(let c of o.jc)c.Zc(s)&&(r=!0);o.Gc=s}}r&&Xf(t)}function H0(n,e,t){let r=ie(n),s=r.queries.get(e);if(s)for(let i of s.jc)i.onError(t);r.queries.delete(e)}function Xf(n){n.Jc.forEach(e=>{e.next()})}var Df;(function(n){n.Default="default",n.Cache="cache"})(Df||(Df={}));var Tf=class{constructor(e,t,r){this.query=e,this.Xc=t,this.el=!1,this.tl=null,this.onlineState="Unknown",this.options=r||{}}Zc(e){if(!this.options.includeMetadataChanges){let r=[];for(let s of e.docChanges)s.type!==3&&r.push(s);e=new hi(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.el?this.nl(e)&&(this.Xc.next(e),t=!0):this.rl(e,this.onlineState)&&(this.il(e),t=!0),this.tl=e,t}onError(e){this.Xc.error(e)}Yc(e){this.onlineState=e;let t=!1;return this.tl&&!this.el&&this.rl(this.tl,e)&&(this.il(this.tl),t=!0),t}rl(e,t){if(!e.fromCache||!this.Hc())return!0;let r=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}nl(e){if(e.docChanges.length>0)return!0;let t=this.tl&&this.tl.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}il(e){e=hi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.el=!0,this.Xc.next(e)}Hc(){return this.options.source!==Df.Cache}};var du=class{constructor(e){this.key=e}},fu=class{constructor(e){this.key=e}},Af=class{constructor(e,t){this.query=e,this.hl=t,this.Tl=null,this.hasCachedResults=!1,this.current=!1,this.Pl=le(),this.mutatedKeys=le(),this.Il=je(e)?Yd(e):Vf(e),this.Rl=new zo(this.Il)}get Al(){return this.hl}Vl(e,t){let r=t?t.dl:new Bu,s=t?t.Rl:this.Rl,i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1,[u,l]=this.fl(this.query,s);e.inorderTraversal((f,g)=>{let I=s.get(f),D=C0(this.query,g)?g:null,O=!!I&&this.mutatedKeys.has(I.key),M=!!D&&(D.hasLocalMutations||this.mutatedKeys.has(D.key)&&D.hasCommittedMutations),K=!1;I&&D?I.data.isEqual(D.data)?O!==M&&(r.track({type:3,doc:D}),K=!0):this.ml(I,D)||(r.track({type:2,doc:D}),K=!0,(u&&this.Il(D,u)>0||l&&this.Il(D,l)<0)&&(c=!0)):!I&&D?(r.track({type:0,doc:D}),K=!0):I&&!D&&(r.track({type:1,doc:I}),K=!0,(u||l)&&(c=!0)),K&&(D?(o=o.add(D),i=M?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))});let B=this.pl(this.query);if(B)if(je(this.query)){let f=[];o.forEach(D=>f.push(D));let g=ly(this.query,f),I=new zo(Yd(this.query));for(let D of g)I=I.add(D);o.forEach(D=>{I.has(D.key)||(i=i.delete(D.key),r.track({type:1,doc:D}))}),o=I}else{let f=this.gl(this.query);for(;o.size>B;){let g=f==="F"?o.last():o.first();o=o.delete(g.key),i=i.delete(g.key),r.track({type:1,doc:g})}}return{Rl:o,dl:r,Za:c,mutatedKeys:i}}pl(e){return je(e)?Gh(e)?.limit:e.limit||void 0}gl(e){if(je(e)){let t=Gh(e);return t&&t.limit<0?"L":"F"}return e.limitType}fl(e,t){if(je(e)){let r=Gh(e)?.limit;return[t.size===r?t.last():null,null]}return[e.limitType==="F"&&t.size===this.pl(this.query)?t.last():null,e.limitType==="L"&&t.size===this.pl(this.query)?t.first():null]}ml(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){let i=this.Rl;this.Rl=e.Rl,this.mutatedKeys=e.mutatedKeys;let o=e.dl.Wc();o.sort((B,f)=>function(I,D){let O=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Z(20277,{Nt:M})}};return O(I)-O(D)}(B.type,f.type)||this.Il(B.doc,f.doc)),this.yl(r),s=s??!1;let c=t&&!s?this.wl():[],u=this.Pl.size===0&&this.current&&!s?1:0,l=u!==this.Tl;return this.Tl=u,o.length!==0||l?{snapshot:new hi(this.query,e.Rl,i,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),bl:c}:{bl:c}}Yc(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Rl:this.Rl,dl:new Bu,mutatedKeys:this.mutatedKeys,Za:!1},!1)):{bl:[]}}Sl(e){return!this.hl.has(e)&&!!this.Rl.has(e)&&!this.Rl.get(e).hasLocalMutations}yl(e){e&&(e.addedDocuments.forEach(t=>this.hl=this.hl.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.hl=this.hl.delete(t)),this.current=e.current)}wl(){if(!this.current)return[];let e=this.Pl;this.Pl=le(),this.Rl.forEach(r=>{this.Sl(r.key)&&(this.Pl=this.Pl.add(r.key))});let t=[];return e.forEach(r=>{this.Pl.has(r)||t.push(new fu(r))}),this.Pl.forEach(r=>{e.has(r)||t.push(new du(r))}),t}xl(e){this.hl=e.uu,this.Pl=le();let t=this.Vl(e.documents);return this.applyChanges(t,!0)}vl(){return hi.fromInitialDocuments(this.query,this.Rl,this.mutatedKeys,this.Tl===0,this.hasCachedResults)}},Zf="SyncEngine",bf=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},vf=class{constructor(e){this.key=e,this.Dl=!1}},Rf=class{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Cl={},this.Fl=new xn(c=>z_(c),Ru),this.Ol=new Map,this.Ml=new Set,this.Nl=new Se(ee.comparator),this.Bl=new Map,this.Ll=new Jo,this.$l={},this.Ul=new Map,this.kl=ss.G_(),this.onlineState="Unknown",this.Ql=void 0}get isPrimaryClient(){return this.Ql===!0}};async function q0(n,e,t=!0){let r=Dy(n),s,i=r.Fl.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.vl()):s=await Ey(r,e,t,!0),s}async function j0(n,e){let t=Dy(n);await Ey(t,e,!0,!1)}async function Ey(n,e,t,r){let s=await A0(n.localStore,je(e)?e:hn(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t),c;return r&&(c=await K0(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&dy(n.remoteStore,s),c}async function K0(n,e,t,r,s){n.ql=(f,g,I)=>async function(O,M,K,$){let Be=M.view.Vl(K);Be.Za&&(Be=await RE(O.localStore,M.query,!1).then(({documents:A})=>M.view.Vl(A,Be)));let Oe=$&&$.targetChanges.get(M.targetId),ot=$&&$.targetMismatches.get(M.targetId)!=null,ve=M.view.applyChanges(Be,O.isPrimaryClient,Oe,ot);return NE(O,M.targetId,ve.bl),ve.snapshot}(n,f,g,I);let i=await RE(n.localStore,e,!0),o=new Af(e,i.uu),c=o.Vl(i.documents),u=So.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),l=o.applyChanges(c,n.isPrimaryClient,u);NE(n,t,l.bl);let B=new bf(e,t,o);return n.Fl.set(e,B),n.Ol.has(t)?n.Ol.get(t).push(e):n.Ol.set(t,[e]),l.snapshot}async function J0(n,e,t){let r=ie(n),s=r.Fl.get(e),i=r.Ol.get(s.targetId);if(i.length>1)return r.Ol.set(s.targetId,i.filter(o=>!Ru(o,e))),void r.Fl.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await pf(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&zf(r.remoteStore,s.targetId),Sf(r,s.targetId)}).catch(gi)):(Sf(r,s.targetId),await pf(r.localStore,s.targetId,!0))}async function z0(n,e){let t=ie(n),r=t.Fl.get(e),s=t.Ol.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),zf(t.remoteStore,r.targetId))}async function W0(n,e,t){let r=tv(n);try{let s=await function(o,c){let u=ie(o),l=Re.now(),B=c.reduce((I,D)=>I.add(D.key),le()),f,g;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let D=It(),O=le();return u.iu.getEntries(I,B).next(M=>{D=M,D.forEach((K,$)=>{$.isValidDocument()||(O=O.add(K))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,D)).next(M=>{f=M;let K=[];for(let $ of c){let Be=zA($,f.get($.key).overlayedDocument);Be!=null&&K.push(new Nn($.key,Be,e_(Be.value.mapValue),tr.exists(!0)))}return u.mutationQueue.addMutationBatch(I,l,K,c)}).next(M=>{g=M;let K=M.applyToLocalDocumentSet(f,O);return u.documentOverlayCache.saveOverlays(I,M.batchId,K)})}).then(()=>({batchId:g.batchId,changes:m_(f)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,c,u){let l=o.$l[o.currentUser.toKey()];l||(l=new Se(ce)),l=l.insert(c,u),o.$l[o.currentUser.toKey()]=l}(r,s.batchId,t),await ea(r,s.changes),await Pu(r.remoteStore)}catch(s){let i=Yf(s,"Failed to persist write");t.reject(i)}}async function _y(n,e){let t=ie(n);try{let r=await I0(t.localStore,e);e.targetChanges.forEach((s,i)=>{let o=t.Bl.get(i);o&&(Q(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Dl=!0:s.modifiedDocuments.size>0?Q(o.Dl,14607):s.removedDocuments.size>0&&(Q(o.Dl,42227),o.Dl=!1))}),await ea(t,r,e)}catch(r){await gi(r)}}function PE(n,e,t){let r=ie(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let s=[];r.Fl.forEach((i,o)=>{let c=o.view.Yc(e);c.snapshot&&s.push(c.snapshot)}),function(o,c){let u=ie(o);u.onlineState=c;let l=!1;u.queries.forEach((B,f)=>{for(let g of f.jc)g.Yc(c)&&(l=!0)}),l&&Xf(u)}(r.eventManager,e),s.length&&r.Cl.gr(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function $0(n,e,t){let r=ie(n);r.sharedClientState.updateQueryState(e,"rejected",t);let s=r.Bl.get(e),i=s&&s.key;if(i){let o=new Se(ee.comparator);o=o.insert(i,Xt.newNoDocument(i,se.min()));let c=le().add(i),u=new Ro(se.min(),new Map,new Se(ce),o,It(),c);await _y(r,u),r.Nl=r.Nl.remove(i),r.Bl.delete(e),ep(r)}else await pf(r.localStore,e,!1).then(()=>Sf(r,e,t)).catch(gi)}async function Q0(n,e){let t=ie(n),r=e.batch.batchId;try{let s=await w0(t.localStore,e);wy(t,r,null),yy(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ea(t,s)}catch(s){await gi(s)}}async function Y0(n,e,t){let r=ie(n);try{let s=await function(o,c){let u=ie(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let B;return u.mutationQueue.lookupMutationBatch(l,c).next(f=>(Q(f!==null,37113),B=f.keys(),u.mutationQueue.removeMutationBatch(l,f))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,B,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,B)).next(()=>u.localDocuments.getDocuments(l,B))})}(r.localStore,e);wy(r,e,t),yy(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ea(r,s)}catch(s){await gi(s)}}function yy(n,e){(n.Ul.get(e)||[]).forEach(t=>{t.resolve()}),n.Ul.delete(e)}function wy(n,e,t){let r=ie(n),s=r.$l[r.currentUser.toKey()];if(s){let i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.$l[r.currentUser.toKey()]=s}}function Sf(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Ol.get(e))n.Fl.delete(r),t&&n.Cl.Kl(r,t);n.Ol.delete(e),n.isPrimaryClient&&n.Ll.fo(e).forEach(r=>{n.Ll.containsKey(r)||Iy(n,r)})}function Iy(n,e){n.Ml.delete(e.path.canonicalString());let t=n.Nl.get(e);t!==null&&(zf(n.remoteStore,t),n.Nl=n.Nl.remove(e),n.Bl.delete(t),ep(n))}function NE(n,e,t){for(let r of t)r instanceof du?(n.Ll.addReference(r.key,e),X0(n,r)):r instanceof fu?(J(Zf,"Document no longer in limbo: "+r.key),n.Ll.removeReference(r.key,e),n.Ll.containsKey(r.key)||Iy(n,r.key)):Z(19791,{Wl:r})}function X0(n,e){let t=e.key,r=t.path.canonicalString();n.Nl.get(t)||n.Ml.has(r)||(J(Zf,"New document in limbo: "+t),n.Ml.add(r),ep(n))}function ep(n){for(;n.Ml.size>0&&n.Nl.size<n.maxConcurrentLimboResolutions;){let e=n.Ml.values().next().value;n.Ml.delete(e);let t=new ee(Ie.fromString(e)),r=n.kl.next();n.Bl.set(r,new vf(t)),n.Nl=n.Nl.insert(t,r),dy(n.remoteStore,new li(hn(Du(t.path)),r,"TargetPurposeLimboResolution",ri.Br))}}async function ea(n,e,t){let r=ie(n),s=[],i=[],o=[];r.Fl.isEmpty()||(r.Fl.forEach((c,u)=>{o.push(r.ql(u,e,t).then(l=>{if((l||t)&&r.isPrimaryClient){let B=l?!l.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,B?"current":"not-current")}if(l){s.push(l);let B=hf.ka(u.targetId,l);i.push(B)}}))}),await Promise.all(o),r.Cl.gr(s),await async function(u,l){let B=ie(u);try{await B.persistence.runTransaction("notifyLocalViewChanges","readwrite",f=>G.forEach(l,g=>G.forEach(g.$a,I=>B.persistence.referenceDelegate.addReference(f,g.targetId,I)).next(()=>G.forEach(g.Ua,I=>B.persistence.referenceDelegate.removeReference(f,g.targetId,I)))))}catch(f){if(!Ci(f))throw f;J(Jf,"Failed to update sequence numbers: "+f)}for(let f of l){let g=f.targetId;if(!f.fromCache){let I=B.tu.get(g),D=I.snapshotVersion,O=I.withLastLimboFreeSnapshotVersion(D);B.tu=B.tu.insert(g,O)}}}(r.localStore,i))}async function Z0(n,e){let t=ie(n);if(!t.currentUser.isEqual(e)){J(Zf,"User change. New user:",e.toKey());let r=await hy(t.localStore,e);t.currentUser=e,function(i,o){i.Ul.forEach(c=>{c.forEach(u=>{u.reject(new W(F.CANCELLED,o))})}),i.Ul.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ea(t,r._u)}}function ev(n,e){let t=ie(n),r=t.Bl.get(e);if(r&&r.Dl)return le().add(r.key);{let s=le(),i=t.Ol.get(e);if(!i)return s;for(let o of i??[]){let c=t.Fl.get(o);s=s.unionWith(c.view.Al)}return s}}function Dy(n){let e=ie(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=_y.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ev.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=$0.bind(null,e),e.Cl.gr=U0.bind(null,e.eventManager),e.Cl.Kl=H0.bind(null,e.eventManager),e}function tv(n){let e=ie(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Q0.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Y0.bind(null,e),e}var is=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Au(e.databaseInfo.databaseId),this.sharedClientState=this.jl(e),this.persistence=this.zl(e),await this.persistence.start(),this.localStore=this.Hl(e),this.gcScheduler=this.Jl(e,this.localStore),this.indexBackfillerScheduler=this.Yl(e,this.localStore)}Jl(e,t){return null}Yl(e,t){return null}Hl(e){return y0(this.persistence,new df,e.initialUser,this.serializer)}zl(e){return new cu(lf.Ho,this.serializer)}jl(e){return new yf}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};is.provider={build:()=>new is};var pu=class extends is{constructor(e){super(),this.cacheSizeBytes=e}Jl(e,t){Q(this.persistence.referenceDelegate instanceof uu,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new AB(r,e.asyncQueue,t)}zl(e){let t=this.cacheSizeBytes!==void 0?Gt.withCacheSize(this.cacheSizeBytes):Gt.DEFAULT;return new cu(r=>uu.Ho(r,t),this.serializer)}};var Bi=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>PE(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Z0.bind(null,this.syncEngine),await V0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new If}()}createDatastore(e){let t=Au(e.databaseInfo.databaseId),r=Sb(e.databaseInfo);return Ob(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,o,c){return new Cf(r,s,i,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>PE(this.syncEngine,t,0),function(){return jc.cn()?new jc:new gB}())}createSyncEngine(e,t){return function(s,i,o,c,u,l,B){let f=new Rf(s,i,o,c,u,l);return B&&(f.Ql=!0),f}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(t){let r=ie(t);J(gn,"RemoteStore shutting down."),r.xu.add(5),await Zo(r),r.Du.shutdown(),r.Cu.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}};Bi.provider={build:()=>new Bi};var hr="FirestoreClient",Of=class{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Xe.UNAUTHENTICATED,this.clientId=Ls.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{J(hr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(J(hr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=Yf(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Hh(n,e){n.asyncQueue.verifyOperationInProgress(),J(hr,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await hy(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function xE(n,e){n.asyncQueue.verifyOperationInProgress();let t=await nv(n);J(hr,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>SE(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>SE(e.remoteStore,s)),n._onlineComponents=e}async function nv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){J(hr,"Using user provided OfflineComponentProvider");try{await Hh(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(s){return s.name==="FirebaseError"?s.code===F.FAILED_PRECONDITION||s.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Ut("Error using user provided cache. Falling back to memory cache: "+t),await Hh(n,new is)}}else J(hr,"Using default OfflineComponentProvider"),await Hh(n,new pu(void 0));return n._offlineComponents}async function Ty(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(J(hr,"Using user provided OnlineComponentProvider"),await xE(n,n._uninitializedComponentsProvider._online)):(J(hr,"Using default OnlineComponentProvider"),await xE(n,new Bi))),n._onlineComponents}function rv(n){return Ty(n).then(e=>e.syncEngine)}async function sv(n){let e=await Ty(n),t=e.eventManager;return t.onListen=q0.bind(null,e.syncEngine),t.onUnlisten=J0.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=j0.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=z0.bind(null,e.syncEngine),t}function Ay(n,e,t={}){let r=new fn;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,c,u,l){let B=new Ef({next:g=>{B.Bu(),o.enqueueAndForget(()=>G0(i,f));let I=g.docs.has(c);!I&&g.fromCache?l.reject(new W(F.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&g.fromCache&&u&&u.source==="server"?l.reject(new W(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(g)},error:g=>l.reject(g)}),f=new Tf(Du(c.path),B,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return M0(i,f)}(await sv(n),n.asyncQueue,e,t,r)),r.promise}function by(n,e){let t=new fn;return n.asyncQueue.enqueueAndForget(async()=>W0(await rv(n),e,t)),t.promise}var tp=class{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new rt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new iv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){let t=this._document.data.field(Xo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},iv=class extends tp{data(){return super.data()}};var gu=class{convertValue(e,t="none"){switch(He(e)){case 0:return null;case 2:return e.booleanValue;case 3:if("mapValue"in e){if(ir(e))return this.convertToInt32Value(e.mapValue);if(qt(e))return this.convertToDecimal128Value(e.mapValue)}return Te(e.integerValue||e.doubleValue);case 4:return this.convertTimestamp(e.timestampValue);case 6:return this.convertServerTimestamp(e,t);case 7:return e.stringValue;case 8:return"bytesValue"in e?this.convertBytes(Qt(e.bytesValue)):this.convertToBytesWithSubtype(e.mapValue);case 9:return this.convertReference(e.referenceValue);case 11:return this.convertGeoPoint(e.geoPointValue);case 13:return this.convertArray(e.arrayValue,t);case 15:return this.convertObject(e.mapValue,t);case 14:return this.convertVectorValue(e.mapValue);case 12:return this.convertToRegexValue(e.mapValue);case 10:return this.convertToBsonObjectId(e.mapValue);case 5:return this.convertToBsonTimestamp(e.mapValue);case 16:return Zr.instance();case 1:return es.instance();default:throw Z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return os(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){let t=e.fields?.[jr].arrayValue?.values?.map(r=>Te(r.doubleValue));return new Lt(t)}convertToBsonObjectId(e){let t=e.fields?.[Kr]?.stringValue??"";return new Xs(t)}convertToBytesWithSubtype(e){let t=e.fields?.[Hs],r=t?.bytesValue;if(!r)throw new Error("Received incorrect bytesValue for Bytes with subtype");let s=Qt(r).toUint8Array();if(s.length===0)throw new Error("Received empty bytesValue for Bytes with subtype");let i=s[0],o=s.slice(1);return new dn(be.fromUint8Array(o),i)}convertToBsonTimestamp(e){let t=e.fields?.[An],r=Number(t?.mapValue?.fields?.[yo]?.integerValue),s=Number(t?.mapValue?.fields?.[wo]?.integerValue);return new Zs(r,s)}convertToRegexValue(e){let t=e.fields?.[an]?.mapValue?.fields?.[Gs]?.stringValue??"",r=e.fields?.[an]?.mapValue?.fields?.[Us]?.stringValue??"";return new ii(t,r)}convertToInt32Value(e){let t=Number(e.fields?.[Br]?.integerValue);return new ni(t)}convertToDecimal128Value(e){let t=e.fields?.[On]?.stringValue??"";return new ei(t)}convertGeoPoint(e){return new bn(Te(e.latitude),Te(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Qo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Vs(e));default:return null}}convertTimestamp(e){let t=Sn(e);return new Re(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=Ie.fromString(e);Q(T_(r),9688,{name:e});let s=new _o(r.get(1),r.get(3)),i=new ee(r.popFirst(5));return s.isEqual(t)||Rn(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}};function vy(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var LE="AsyncQueue",Cu=class{constructor(e=Promise.resolve()){this._E=[],this.oE=!1,this.aE=[],this.uE=null,this.cE=!1,this.lE=!1,this.EE=[],this._r=new Jc(this,"async_queue_retry"),this.hE=()=>{let r=Uh();r&&J(LE,"Visibility state changed to "+r.visibilityState),this._r.Xn()},this.TE=e;let t=Uh();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.hE)}get isShuttingDown(){return this.oE}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.PE(),this.IE(e)}enterRestrictedMode(e){if(!this.oE){this.oE=!0,this.lE=e||!1;let t=Uh();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.hE)}}enqueue(e){if(this.PE(),this.oE)return new Promise(()=>{});let t=new fn;return this.IE(()=>this.oE&&this.lE?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this._E.push(e),this.RE()))}async RE(){if(this._E.length!==0){try{await this._E[0](),this._E.shift(),this._r.reset()}catch(e){if(!Ci(e))throw e;J(LE,"Operation failed with retryable error: "+e)}this._E.length>0&&this._r.Yn(()=>this.RE())}}IE(e){let t=this.TE.then(()=>(this.cE=!0,e().catch(r=>{throw this.uE=r,this.cE=!1,Rn("INTERNAL UNHANDLED ERROR: ",kE(r)),r}).then(r=>(this.cE=!1,r))));return this.TE=t,t}enqueueAfterDelay(e,t,r){this.PE(),this.EE.indexOf(e)>-1&&(t=0);let s=_f.createAndSchedule(this,e,t,r,i=>this.AE(i));return this.aE.push(s),s}PE(){this.uE&&Z(47125,{VE:kE(this.uE)})}verifyOperationInProgress(){}async dE(){let e;do e=this.TE,await e;while(e!==this.TE)}fE(e){for(let t of this.aE)if(t.timerId===e)return!0;return!1}mE(e){return this.dE().then(()=>{this.aE.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.aE)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.dE()})}pE(e){this.EE.push(e)}AE(e){let t=this.aE.indexOf(e);this.aE.splice(t,1)}};function kE(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}var di=class extends Uf{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Cu,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Cu(e),this._firestoreClient=void 0,await e}}};function np(n,e){let t=typeof n=="object"?n:zn(),r=typeof n=="string"?n:e||Sc,s=Jt(t,"firestore").getImmediate({identifier:r});if(!s._initialized){let i=kg("firestore");i&&P_(s,...i)}return s}function rp(n){if(n._terminated)throw new W(F.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ov(n),n._firestoreClient}function ov(n){let e=n._freezeSettings(),t=Nb(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Of(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(s){let i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}}(n._componentsProvider))}var mu=class extends gu{constructor(e){super(),this.firestore=e}convertBytes(e){return new dn(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new rt(this.firestore,null,t)}};var er=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},sr=class n extends tp{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Ur(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Xo("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(F.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};sr._jsonSchemaVersion="firestore/documentSnapshot/1.0",sr._jsonSchema={type:ke("string",sr._jsonSchemaVersion),bundleSource:ke("string","DocumentSnapshot"),bundleName:ke("string"),bundle:ke("string")};var Ur=class extends sr{data(e={}){return super.data(e)}},xs=class n{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new er(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ur(this._firestore,this._userDataWriter,r.key,r,new er(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(c=>{je(s._snapshot.query)?Yd(s._snapshot.query):Vf(s.query._query);let u=new Ur(s._firestore,s._userDataWriter,c.doc.key,c.doc,new er(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{let u=new Ur(s._firestore,s._userDataWriter,c.doc.key,c.doc,new er(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter),l=-1,B=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),B=o.indexOf(c.doc.key)),{type:av(c.type),doc:u,oldIndex:l,newIndex:B}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(F.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ls.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function av(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Z(61501,{type:n})}}xs._jsonSchemaVersion="firestore/querySnapshot/1.0",xs._jsonSchema={type:ke("string",xs._jsonSchemaVersion),bundleSource:ke("string","QuerySnapshot"),bundleName:ke("string"),bundle:ke("string")};function Oy(n){n=pi(n,rt);let e=pi(n.firestore,di),t=rp(e);return Ay(t,n._key).then(r=>uv(e,n,r))}function Py(n,e,t){n=pi(n,rt);let r=pi(n.firestore,di),s=vy(n.converter,e,t),i=x_(r);return cv(r,[L_(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,tr.none())])}function cv(n,e){let t=rp(n);return by(t,e)}function uv(n,e,t){let r=t.docs.get(e._key),s=new mu(n);return new sr(n,s,e._key,r,new er(t.hasPendingWrites,t.fromCache),e.converter)}var Ry="@firebase/firestore",Sy="4.19.1";(function(e,t=!0){FE(Jn),Rt(new tt("firestore",(r,{instanceIdentifier:s,options:i})=>{let o=r.getProvider("app").getImmediate(),c=new di(new Uc(r.getProvider("auth-internal")),new qc(o,r.getProvider("app-check-internal")),JE(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),ct(Ry,Sy,e),ct(Ry,Sy,"esm2020")})();var Ny="@firebase/ai",cp="3.0.0";var Ei="AI",lv="global",hv="firebasevertexai.googleapis.com",xu="v1beta",xy=cp,Bv="gl-js",dv="hybrid",fv=180*1e3,pv="gemini-3.5-flash-lite";var re=class n extends Ct{constructor(e,t,r){let s=Ei,i=`${s}/${e}`,o=`${s}: ${t} (${i})`;super(e,o),this.code=e,this.customErrorData=r,Error.captureStackTrace&&Error.captureStackTrace(this,n),Object.setPrototypeOf(this,n.prototype),this.toString=()=>o}};var Ly=["user","model","function","system"];var Uy={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"};var ft={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"};var Zt={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},dr={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};var ne={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};var Vn={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};var Lu=class{constructor(e){this.backendType=e}},us=class extends Lu{constructor(){super(Vn.GOOGLE_AI)}_getModelPath(e,t){return`/${xu}/projects/${e}/${t}`}_getTemplatePath(e,t){return`/${xu}/projects/${e}/templates/${t}`}},ku=class extends Lu{constructor(e){super(Vn.AGENT_PLATFORM),this.location=lv,e&&(this.location=e)}_getModelPath(e,t){return`/${xu}/projects/${e}/locations/${this.location}/${t}`}_getTemplatePath(e,t){return`/${xu}/projects/${e}/locations/${this.location}/templates/${t}`}};function gv(n){if(n instanceof us)return`${Ei}/googleai`;if(n instanceof ku)return`${Ei}/agentplatform/${n.location}`;throw new re(ne.ERROR,`Invalid backend: ${JSON.stringify(n.backendType)}`)}function Cv(n){let e=n.split("/");if(e[0]!==Ei)throw new re(ne.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":let r=e[2];if(!r)throw new re(ne.ERROR,`Invalid instance identifier, unknown location '${n}'`);return new ku(r);case"googleai":return new us;default:throw new re(ne.ERROR,`Invalid instance identifier string: '${n}'`)}}var Je=new kt("@firebase/ai"),Fn;(function(n){n.UNAVAILABLE="unavailable",n.DOWNLOADABLE="downloadable",n.DOWNLOADING="downloading",n.AVAILABLE="available"})(Fn||(Fn={}));var Hy={type:"text",languages:["en"]},sp=[Hy,{type:"image"}],ip=[Hy],Fu=class n{constructor(e,t,r){this.languageModelProvider=e,this.mode=t,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:sp,expectedOutputs:ip}},r&&(this.onDeviceParams=r,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=sp),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=ip)):this.onDeviceParams.createOptions={expectedInputs:sp,expectedOutputs:ip})}async isAvailable(e){if(!this.mode)return Je.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===Zt.ONLY_IN_CLOUD)return Je.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;let t=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);if(this.mode===Zt.ONLY_ON_DEVICE){if(t===Fn.UNAVAILABLE)throw new re(ne.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(t===Fn.DOWNLOADABLE||t===Fn.DOWNLOADING){Je.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(r){throw new re(ne.ERROR,r.message)}return!0}return!0}return t!==Fn.AVAILABLE?(Je.debug(`On-device inference unavailable because availability is "${t}".`),!1):n.isOnDeviceRequest(e)?!0:(Je.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){let t=await this.createSession(),r=await Promise.all(e.contents.map(n.toLanguageModelMessage)),s=await t.prompt(r,this.onDeviceParams.promptOptions);return n.toResponse(s)}async generateContentStream(e){let t=await this.createSession(),r=await Promise.all(e.contents.map(n.toLanguageModelMessage)),s=t.promptStreaming(r,this.onDeviceParams.promptOptions);return n.toStreamResponse(s)}async countTokens(e){throw new re(ne.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return Je.debug("Empty prompt rejected for on-device inference."),!1;for(let t of e.contents){if(t.parts.some(r=>"functionResponse"in r))return Je.debug("Content with a function response part rejected for on-device inference."),!1;for(let r of t.parts)if("inlineData"in r&&r.inlineData&&n.SUPPORTED_MIME_TYPES.indexOf(r.inlineData.mimeType)===-1)return Je.debug(`Unsupported mime type "${r.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){let t=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);return(t===Fn.DOWNLOADABLE||t===Fn.DOWNLOADING)&&this.download(e),t}download(e){if(this.downloadPromise)return;let t={...this.onDeviceParams.createOptions};t&&!t.monitor&&e&&(t.monitor=r=>{r.addEventListener("downloadprogress",s=>{e(s.loaded)})}),this.downloadPromise=this.languageModelProvider?.create(t).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){let t=await Promise.all(e.parts.map(n.toLanguageModelMessageContent));return{role:n.toLanguageModelMessageRole(e.role),content:t}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){let r=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(r)}}throw new re(ne.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new re(ne.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");let e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){let t=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(r,s){let i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:r}]}}]});s.enqueue(t.encode(`data: ${i}

`))}}))}}};Fu.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function mv(n,e,t){let s=(e||fs()).LanguageModel;if(s&&n)return new Fu(s,n,t)}var up=class{constructor(e,t,r,s,i){this.app=e,this.backend=t,this.chromeAdapterFactory=i;let o=s?.getImmediate({optional:!0}),c=r?.getImmediate({optional:!0});this.auth=c||null,this.appCheck=o||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}};function Ev(n,{instanceIdentifier:e}){if(!e)throw new re(ne.ERROR,"AIService instance identifier is undefined.");let t=Cv(e),r=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new up(r,t,s,i,mv)}function _v(n){if(n.app?.options?.apiKey)if(n.app?.options?.projectId){if(!n.app?.options?.appId)throw new re(ne.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new re(ne.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new re(ne.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');let e={apiKey:n.app.options.apiKey,project:n.app.options.projectId,appId:n.app.options.appId,automaticDataCollectionEnabled:n.app.automaticDataCollectionEnabled,backend:n.backend};if(ut(n.app)&&n.app.settings.appCheckToken){let t=n.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:t})}else n.appCheck&&(n.options?.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>n.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>n.appCheck.getToken());return n.auth&&(e.getAuthToken=()=>n.auth.getToken()),e}var lp=class n{constructor(e,t){this._apiSettings=_v(e),this.model=n.normalizeModelName(t,this._apiSettings.backend.backendType)}static normalizeModelName(e,t){return t===Vn.GOOGLE_AI?n.normalizeGoogleAIModelName(e):n.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let t;return e.includes("/")?e.startsWith("models/")?t=`publishers/google/${e}`:t=e:t=`publishers/google/models/${e}`,t}};var yv="Timeout has expired.",op="AbortError",hp=class{constructor(e){this.params=e}toString(){let e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){return this.params.singleRequestOptions?.baseUrl??`https://${hv}`}get queryParams(){let e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}};function wv(n){let e=[];return e.push(`${Bv}/${xy}`),e.push(`fire/${xy}`),(n.params.apiSettings.inferenceMode===Zt.PREFER_ON_DEVICE||n.params.apiSettings.inferenceMode===Zt.PREFER_IN_CLOUD)&&e.push(dv),e.join(" ")}async function Iv(n){let e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",wv(n)),e.append("x-goog-api-key",n.params.apiSettings.apiKey),n.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",n.params.apiSettings.appId),n.params.apiSettings.getAppCheckToken){let t=await n.params.apiSettings.getAppCheckToken();t&&(e.append("X-Firebase-AppCheck",t.token),t.error&&Je.warn(`Unable to obtain a valid App Check token: ${t.error.message}`))}if(n.params.apiSettings.getAuthToken){let t=await n.params.apiSettings.getAuthToken();t&&e.append("Authorization",`Firebase ${t.accessToken}`)}return e}async function pp(n,e){let t=new hp(n),r,s=n.singleRequestOptions?.signal,i=n.singleRequestOptions?.timeout!=null&&n.singleRequestOptions.timeout>=0?n.singleRequestOptions.timeout:fv,o=new AbortController,c=setTimeout(()=>{o.abort(new DOMException(yv,op)),Je.debug(`Aborting request to ${t} due to timeout (${i}ms)`)},i),u=AbortSignal.any(s?[s,o.signal]:[o.signal]);if(s&&s.aborted)throw clearTimeout(c),new DOMException(s.reason??"Aborted externally before fetch",op);try{let l={method:"POST",headers:await Iv(t),signal:u,body:e};if(r=await fetch(t.toString(),l),!r.ok){let B="",f;try{let g=await r.json();B=g.error.message,g.error.details&&(B+=` ${JSON.stringify(g.error.details)}`,f=g.error.details)}catch{}throw r.status===403&&f&&f.some(g=>g.reason==="SERVICE_DISABLED")&&f.some(g=>g.links?.[0]?.description.includes("Google developers console API activation"))?new re(ne.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${t.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:r.status,statusText:r.statusText,errorDetails:f}):new re(ne.FETCH_ERROR,`Error fetching from ${t}: [${r.status} ${r.statusText}] ${B}`,{status:r.status,statusText:r.statusText,errorDetails:f})}}catch(l){let B=l;throw l.code!==ne.FETCH_ERROR&&l.code!==ne.API_NOT_ENABLED&&l instanceof Error&&l.name!==op&&(B=new re(ne.ERROR,`Error fetching from ${t.toString()}: ${l.message}`),B.stack=l.stack),B}finally{clearTimeout(c)}return r}function Nu(n){if(n.candidates&&n.candidates.length>0){if(n.candidates.length>1&&Je.warn(`This response had ${n.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),jy(n.candidates[0]))throw new re(ne.RESPONSE_ERROR,`Response error: ${cs(n)}. Response body stored in error.response`,{response:n});return!0}else return!1}function Cn(n){return"type"in n&&n.type?n:n.text!==void 0?{...n,type:"text"}:n.inlineData!==void 0?{...n,type:"inlineData"}:n.functionCall!==void 0?{...n,type:"functionCall"}:n.functionResponse!==void 0?{...n,type:"functionResponse"}:n.fileData!==void 0?{...n,type:"fileData"}:n.executableCode!==void 0?{...n,type:"executableCode"}:n.codeExecutionResult!==void 0?{...n,type:"codeExecutionResult"}:n}function Vu(n,e=dr.IN_CLOUD){if(n.candidates&&!n.candidates[0].hasOwnProperty("index")&&(n.candidates[0].index=0),n.candidates)for(let r of n.candidates)r.content?.parts&&(r.content.parts=r.content.parts.map(Cn));let t=Dv(n);return t.inferenceSource=e,t}function Dv(n){return n.text=()=>{if(Nu(n))return ky(n,e=>!("thought"in e&&e.thought));if(n.promptFeedback)throw new re(ne.RESPONSE_ERROR,`Text not available. ${cs(n)}`,{response:n});return""},n.thoughtSummary=()=>{if(Nu(n)){let e=ky(n,t=>!!("thought"in t&&t.thought));return e===""?void 0:e}else if(n.promptFeedback)throw new re(ne.RESPONSE_ERROR,`Thought summary not available. ${cs(n)}`,{response:n})},n.inlineDataParts=()=>{if(Nu(n))return Tv(n);if(n.promptFeedback)throw new re(ne.RESPONSE_ERROR,`Data not available. ${cs(n)}`,{response:n})},n.functionCalls=()=>{if(Nu(n))return qy(n);if(n.promptFeedback)throw new re(ne.RESPONSE_ERROR,`Function call not available. ${cs(n)}`,{response:n})},n}function ky(n,e){let t=[];if(n.candidates?.[0].content?.parts)for(let r of n.candidates?.[0].content?.parts){let s=Cn(r);s.type==="text"&&e(s)&&t.push(s.text)}return t.length>0?t.join(""):""}function qy(n){if(!n)return;let e=[];if(n.candidates?.[0].content?.parts)for(let t of n.candidates?.[0].content?.parts){let r=Cn(t);r.type==="functionCall"&&e.push(r.functionCall)}if(e.length>0)return e}function Tv(n){let e=[];if(n.candidates?.[0].content?.parts)for(let t of n.candidates?.[0].content?.parts){let r=Cn(t);r.type==="inlineData"&&e.push(r)}if(e.length>0)return e}var Av=[ft.RECITATION,ft.SAFETY,ft.BLOCKLIST,ft.PROHIBITED_CONTENT,ft.SPII,ft.MALFORMED_FUNCTION_CALL,ft.IMAGE_SAFETY,ft.IMAGE_PROHIBITED_CONTENT,ft.IMAGE_OTHER,ft.NO_IMAGE,ft.IMAGE_RECITATION,ft.LANGUAGE,ft.UNEXPECTED_TOOL_CALL,ft.TOO_MANY_TOOL_CALLS,ft.MISSING_THOUGHT_SIGNATURE,ft.MALFORMED_RESPONSE];function jy(n){return!!n.finishReason&&Av.some(e=>e===n.finishReason)}function cs(n){let e="";if((!n.candidates||n.candidates.length===0)&&n.promptFeedback)e+="Response was blocked",n.promptFeedback?.blockReason&&(e+=` due to ${n.promptFeedback.blockReason}`),n.promptFeedback?.blockReasonMessage&&(e+=`: ${n.promptFeedback.blockReasonMessage}`);else if(n.candidates?.[0]){let t=n.candidates[0];jy(t)&&(e+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(e+=`: ${t.finishMessage}`))}return e}function gp(n){if(n!=null){if(typeof n=="string")return{role:"system",parts:[{type:"text",text:n}]};if(n.type==="text"||"text"in n&&typeof n.text=="string")return{role:"system",parts:[Kn(Cn(n))]};if(n.parts){let e=n.parts.map(t=>Kn(Cn(t)));return n.role?{...n,parts:e}:{role:"system",parts:e}}}}function ta(n){let e=[];if(typeof n=="string")e=[{type:"text",text:n}];else for(let t of n)typeof t=="string"?e.push({type:"text",text:t}):e.push(Kn(Cn(t)));return bv(e)}function bv(n){let e={role:"user",parts:[]},t=!1,r=!1;for(let s of n)s.type==="functionResponse"||"functionResponse"in s?r=!0:t=!0,e.parts.push(s);if(t&&r)throw new re(ne.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!t&&!r)throw new re(ne.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function ap(n){let e;if(n.contents){let t=n;e={...t,contents:t.contents.map(r=>({...r,parts:r.parts?r.parts.map(Cn):[]}))}}else e={contents:[ta(n)]};return n.systemInstruction&&(e.systemInstruction=gp(n.systemInstruction)),e}function vv(n){return n.parts&&Array.isArray(n.parts)?{...n,parts:n.parts.map(Cp)}:n}function Cp(n){let e;if("type"in n){let{type:t,...r}=n;e=r}else e=n;return e.functionResponse&&(e={...e,functionResponse:vv(e.functionResponse)}),e}function mp(n){return n.parts?{...n,parts:n.parts.map(Cp)}:n}function Ky(n){return n==null||typeof n=="string"?n:"parts"in n&&Array.isArray(n.parts)?mp(n):Cp(n)}function Jy(n){let e={...n};return e.contents&&(e.contents=e.contents.map(mp)),e.systemInstruction&&(e.systemInstruction=Ky(e.systemInstruction)),e}function Rv(n){let e={...n};return e.contents&&(e.contents=e.contents.map(mp)),e.systemInstruction&&(e.systemInstruction=Ky(e.systemInstruction)),e}function zy(n){if(n.safetySettings?.forEach(e=>{if(e.method)throw new re(ne.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),n.generationConfig?.topK){let e=Math.round(n.generationConfig.topK);e!==n.generationConfig.topK&&(Je.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),n.generationConfig.topK=e)}return n}function Ep(n){return{candidates:n.candidates?Ov(n.candidates):void 0,prompt:n.promptFeedback?Pv(n.promptFeedback):void 0,usageMetadata:n.usageMetadata}}function Sv(n,e){return{generateContentRequest:{model:e,...n}}}function Ov(n){let e=[],t;return e&&n.forEach(r=>{let s;if(r.citationMetadata&&(s={citations:r.citationMetadata.citationSources}),r.safetyRatings&&(t=r.safetyRatings.map(o=>({...o,severity:o.severity??Uy.HARM_SEVERITY_UNSUPPORTED,probabilityScore:o.probabilityScore??0,severityScore:o.severityScore??0}))),r.content?.parts?.some(o=>"videoMetadata"in o&&o.videoMetadata))throw new re(ne.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");let i={index:r.index,content:r.content,finishReason:r.finishReason,finishMessage:r.finishMessage,safetyRatings:t,citationMetadata:s,groundingMetadata:r.groundingMetadata,urlContextMetadata:r.urlContextMetadata};e.push(i)}),e}function Pv(n){let e=[];return n.safetyRatings.forEach(r=>{e.push({category:r.category,probability:r.probability,severity:r.severity??Uy.HARM_SEVERITY_UNSUPPORTED,probabilityScore:r.probabilityScore??0,severityScore:r.severityScore??0,blocked:r.blocked})}),{blockReason:n.blockReason,safetyRatings:e,blockReasonMessage:n.blockReasonMessage}}var Fy=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function Nv(n,e,t){let r=n.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),s=Fv(r),[i,o]=s.tee(),{response:c,firstValue:u}=await xv(o,e,t);return{stream:kv(i,e,t),response:c,firstValue:u}}async function xv(n,e,t){let[r,s]=n.tee(),i=r.getReader(),{value:o}=await i.read();return{firstValue:o,response:Lv(s,e,t)}}async function Lv(n,e,t){let r=[],s=n.getReader();for(;;){let{done:i,value:o}=await s.read();if(i){let c=Vv(r);return e.backend.backendType===Vn.GOOGLE_AI&&(c=Ep(c)),Vu(c,t)}r.push(o)}}async function*kv(n,e,t){let r=n.getReader();for(;;){let{value:s,done:i}=await r.read();if(i)break;let o;e.backend.backendType===Vn.GOOGLE_AI?o=Vu(Ep(s),t):o=Vu(s,t);let c=o.candidates?.[0];!c?.content?.parts&&!c?.finishReason&&!c?.citationMetadata&&!c?.urlContextMetadata||(yield o)}}function Fv(n){let e=n.getReader();return new ReadableStream({start(r){let s="";return i();function i(){return e.read().then(({value:o,done:c})=>{if(c){if(s.trim()){r.error(new re(ne.PARSE_FAILED,"Failed to parse stream"));return}r.close();return}s+=o;let u=s.match(Fy),l;for(;u;){try{l=JSON.parse(u[1])}catch{r.error(new re(ne.PARSE_FAILED,`Error parsing JSON response: "${u[1]}`));return}r.enqueue(l),s=s.substring(u[0].length),u=s.match(Fy)}return i()})}}})}function Vv(n){let t={promptFeedback:n[n.length-1]?.promptFeedback};for(let r of n)if(r.candidates)for(let s of r.candidates){let i=s.index||0;t.candidates||(t.candidates=[]),t.candidates[i]||(t.candidates[i]={index:s.index}),t.candidates[i].citationMetadata=s.citationMetadata,t.candidates[i].finishReason=s.finishReason,t.candidates[i].finishMessage=s.finishMessage,t.candidates[i].safetyRatings=s.safetyRatings,t.candidates[i].groundingMetadata=s.groundingMetadata;let o=s.urlContextMetadata;if(typeof o=="object"&&o!==null&&Object.keys(o).length>0&&(t.candidates[i].urlContextMetadata=o),s.content){if(!s.content.parts)continue;t.candidates[i].content||(t.candidates[i].content={role:s.content.role||"user",parts:[]});for(let c of s.content.parts){if("text"in c&&c.text==="")continue;if(Object.keys(c).length===0)throw new re(ne.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");let u=Cn({...c});Object.keys(u).length>0&&t.candidates[i].content.parts.push(u)}}}return t}var Mv=[ne.FETCH_ERROR,ne.ERROR,ne.API_NOT_ENABLED];async function Wy(n,e,t,r){if(!e)return{response:await r(),inferenceSource:dr.IN_CLOUD};switch(e.mode){case Zt.ONLY_ON_DEVICE:if(await e.isAvailable(n))return{response:await t(),inferenceSource:dr.ON_DEVICE};throw new re(ne.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case Zt.ONLY_IN_CLOUD:return{response:await r(),inferenceSource:dr.IN_CLOUD};case Zt.PREFER_IN_CLOUD:try{return{response:await r(),inferenceSource:dr.IN_CLOUD}}catch(s){if(s instanceof re&&Mv.includes(s.code)&&await e.isAvailable(n))return{response:await t(),inferenceSource:dr.ON_DEVICE};throw s}case Zt.PREFER_ON_DEVICE:return await e.isAvailable(n)?{response:await t(),inferenceSource:dr.ON_DEVICE}:{response:await r(),inferenceSource:dr.IN_CLOUD};default:throw new re(ne.ERROR,`Unexpected infererence mode: ${e.mode}`)}}async function Gv(n,e,t,r){return t=Jy(t),n.backend.backendType===Vn.GOOGLE_AI&&(t=zy(t)),pp({task:"streamGenerateContent",model:e,apiSettings:n,stream:!0,singleRequestOptions:r},JSON.stringify(t))}async function $y(n,e,t,r,s){let i=await Wy(t,r,()=>r.generateContentStream(t),()=>Gv(n,e,t,s));return Nv(i.response,n,i.inferenceSource)}async function Uv(n,e,t,r){return t=Jy(t),n.backend.backendType===Vn.GOOGLE_AI&&(t=zy(t)),pp({model:e,task:"generateContent",apiSettings:n,stream:!1,singleRequestOptions:r},JSON.stringify(t))}async function Qy(n,e,t,r,s){let i=await Wy(t,r,()=>r.generateContent(t),()=>Uv(n,e,t,s)),o=await Hv(i.response,n);return{response:Vu(o,i.inferenceSource)}}async function Hv(n,e){let t=await n.json();return e.backend.backendType===Vn.GOOGLE_AI?Ep(t):t}var Vy="SILENT_ERROR",My=10,Bp=class{constructor(e,t,r){this.params=t,this.requestOptions=r,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,Kn(this._history).map(e=>({...e,parts:e.parts?e.parts.map(Cn):[]}))}async _sendMessage(e,t){let r={};await this._sendPromise;let s=[];return this._sendPromise=this._sendPromise.then(async()=>{let i,o=0,c=this.requestOptions?.maxSequentialFunctionCalls??My;do{let u;if(i){o++;let f=await this._callFunctionsAsNeeded(i);u=ta(f)}else u=ta(e);let l=this._formatRequest(u,[...s]);s.push(u);let B=await this._callGenerateContent(l,t);if(B)if(r=B,i=this._getCallableFunctionCalls(B.response),B.response.candidates&&B.response.candidates.length>0){let f={parts:B.response.candidates?.[0].content.parts||[],role:B.response.candidates?.[0].content.role||"model"};s.push(Kn(f))}else{let f=cs(B.response);f&&Je.warn(`sendMessage() was unsuccessful. ${f}. Inspect response object for details.`)}else i=void 0}while(i&&o<c);i&&o>=c&&Je.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(s),r}async _sendMessageStream(e,t){await this._sendPromise;let r=[],i=(async()=>{let o,c=0,u=this.requestOptions?.maxSequentialFunctionCalls??My,l;do{let B;if(o){c++;let g=await this._callFunctionsAsNeeded(o);B=ta(g)}else B=ta(e);let f=this._formatRequest(B,[...r]);if(r.push(B),l=await this._callGenerateContentStream(f,t),o=this._getCallableFunctionCalls(l.firstValue),o&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){let g={...l.firstValue.candidates[0].content};g.role||(g.role="model"),r.push(g)}}while(o&&c<u);return o&&c>=u&&Je.warn(`Automatic function calling exceeded the limit of ${u} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>i).catch(o=>{throw new Error(Vy)}).then(o=>o.response).then(o=>{if(o.candidates&&o.candidates.length>0){this._history=this._history.concat(r);let c={...o.candidates[0].content};c.role||(c.role="model"),this._history.push(Kn(c))}else{let c=cs(o);c&&Je.warn(`sendMessageStream() was unsuccessful. ${c}. Inspect response object for details.`)}}).catch(o=>{o.message!==Vy&&o.name!=="AbortError"&&Je.error(o)}),i}_getCallableFunctionCalls(e){let t=this.params?.tools?.find(s=>s.functionDeclarations);if(!t?.functionDeclarations)return;let r=qy(e);if(r){for(let s of r)if(!t.functionDeclarations?.some(o=>o.name===s.name&&typeof o.functionReference=="function"))return;return r}}async _callFunctionsAsNeeded(e){let t=[],r=[],s=this.params?.tools?.find(i=>i.functionDeclarations);if(s&&s.functionDeclarations){for(let o of e){let c=s.functionDeclarations.find(u=>u.name===o.name);if(c?.functionReference){let u=Promise.resolve(c.functionReference(o.args)).catch(l=>{let B=new re(ne.ERROR,`Error in user-defined function "${c.name}": ${l.message}`);throw B.stack=l.stack,B});t.push({name:o.name,id:o.id,results:u}),r.push(u)}}await Promise.all(r);let i=[];for(let{name:o,id:c,results:u}of t){let l={name:o,response:await u};c&&(l.id=c),i.push({type:"functionResponse",functionResponse:l})}return i}else throw new re(ne.REQUEST_ERROR,'No function declarations were provided in "tools".')}};var qv=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],jv={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},Gy={user:["model"],function:["model"],model:["user","function"],system:[]};function Kv(n){let e=null;for(let t of n){let{role:r,parts:s}=t;if(!e&&r!=="user")throw new re(ne.INVALID_CONTENT,`First Content should be with role 'user', got ${r}`);if(!Ly.includes(r))throw new re(ne.INVALID_CONTENT,`Each item should include role field. Got ${r} but valid roles are: ${JSON.stringify(Ly)}`);if(!Array.isArray(s))throw new re(ne.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(s.length===0)throw new re(ne.INVALID_CONTENT,"Each Content should have at least one part");let i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let c of s){if(c.type)i[c.type]+=1;else for(let u of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])u in c&&(i[u]+=1);"thought"in c&&c.thought&&(i.thought+=1),"thoughtSignature"in c&&c.thoughtSignature&&(i.thoughtSignature+=1)}let o=jv[r];for(let c of qv)if(!o.includes(c)&&i[c]>0)throw new re(ne.INVALID_CONTENT,`Content with role '${r}' can't contain '${c}' part`);if(e&&!Gy[r].includes(e.role))throw new re(ne.INVALID_CONTENT,`Content with role '${r}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(Gy)}`);e=t}}var dp=class extends Bp{constructor(e,t,r,s,i){super(e,s,i),this.model=t,this.chromeAdapter=r,this.params=s,this.requestOptions=i,s?.history&&(Kv(s.history),this._history=Kn(s.history)),this.params?.systemInstruction!=null&&(this.params={...this.params,systemInstruction:gp(this.params.systemInstruction)})}_formatRequest(e,t){return{safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,...t,e]}}_callGenerateContent(e,t){return Qy(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}_callGenerateContentStream(e,t){return $y(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}async sendMessage(e,t){return this._sendMessage(e,t)}async sendMessageStream(e,t){return this._sendMessageStream(e,t)}};async function Jv(n,e,t,r){t=Rv(t);let s="";if(n.backend.backendType===Vn.GOOGLE_AI){let o=Sv(t,e);s=JSON.stringify(o)}else s=JSON.stringify(t);return(await pp({model:e,task:"countTokens",apiSettings:n,stream:!1,singleRequestOptions:r},s)).json()}async function zv(n,e,t,r,s){if(r?.mode===Zt.ONLY_ON_DEVICE)throw new re(ne.UNSUPPORTED,"countTokens() is not supported for on-device models.");return Jv(n,e,t,s)}var fp=class extends lp{constructor(e,t,r,s){super(e,t.model),this.chromeAdapter=s,this.generationConfig=t.generationConfig||{},Wv(this.generationConfig),this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=gp(t.systemInstruction),this.requestOptions=r||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===Zt.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===Fn.UNAVAILABLE){let r=new re(ne.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===Zt.ONLY_ON_DEVICE)throw r;Je.debug(r.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,t){let r=ap(e);return Qy(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...r},this.chromeAdapter,{...this.requestOptions,...t})}async generateContentStream(e,t){let r=ap(e),{stream:s,response:i}=await $y(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...r},this.chromeAdapter,{...this.requestOptions,...t});return{stream:s,response:i}}startChat(e){return new dp(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,t){let r=ap(e);return zv(this._apiSettings,this.model,r,this.chromeAdapter,{...this.requestOptions,...t})}};function Wv(n){if(n.thinkingConfig?.thinkingBudget!=null&&n.thinkingConfig?.thinkingLevel)throw new re(ne.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(n.responseSchema!=null&&n.responseJsonSchema!=null)throw new re(ne.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((n.responseSchema!=null||n.responseJsonSchema!=null)&&n.responseMimeType!=="application/json"&&n.responseMimeType!=="text/x.enum")throw new re(ne.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}var $v="audio-processor",$N=`
  class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.targetSampleRate = options.processorOptions.targetSampleRate;
      // 'sampleRate' is a global variable available inside the AudioWorkletGlobalScope,
      // representing the native sample rate of the AudioContext.
      this.inputSampleRate = sampleRate;
    }

    /**
     * This method is called by the browser's audio engine for each block of audio data.
     * Input is a single input, with a single channel (input[0][0]).
     */
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0 && input[0].length > 0) {
        const pcmData = input[0]; // Float32Array of raw audio samples.
        
        // Simple linear interpolation for resampling.
        const resampled = new Float32Array(Math.round(pcmData.length * this.targetSampleRate / this.inputSampleRate));
        const ratio = pcmData.length / resampled.length;
        for (let i = 0; i < resampled.length; i++) {
          resampled[i] = pcmData[Math.floor(i * ratio)];
        }

        // Convert Float32 (-1, 1) samples to Int16 (-32768, 32767)
        const resampledInt16 = new Int16Array(resampled.length);
        for (let i = 0; i < resampled.length; i++) {
          const sample = Math.max(-1, Math.min(1, resampled[i]));
          if (sample < 0) {
            resampledInt16[i] = sample * 32768;
          } else {
            resampledInt16[i] = sample * 32767;
          }
        }
        
        this.port.postMessage(resampledInt16);
      }
      // Return true to keep the processor alive and processing the next audio block.
      return true;
    }
  }

  // Register the processor with a name that can be used to instantiate it from the main thread.
  registerProcessor('${$v}', AudioProcessor);
`;function Yy(n=zn(),e){n=Ne(n);let t=Jt(n,Ei),r=e?.backend??new us,s={useLimitedUseAppCheckTokens:e?.useLimitedUseAppCheckTokens??!1},i=gv(r),o=t.getImmediate({identifier:i});return o.options=s,o}var Qv=["mode","onDeviceParams","inCloudParams"];function Xy(n,e,t){let r=e,s;if(r.mode){for(let c of Object.keys(e))Qv.includes(c)||Je.warn(`When a hybrid inference mode is specified (mode is currently set to ${r.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);s=r.inCloudParams||{model:pv}}else s=e;if(!s.model)throw new re(ne.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");let i=n.chromeAdapterFactory?.(r.mode,typeof window>"u"?void 0:window,r.onDeviceParams),o=new fp(n,s,t,i);return o._apiSettings.inferenceMode=r.mode,o}function Yv(){Rt(new tt(Ei,Ev,"PUBLIC").setMultipleInstances(!0)),ct(Ny,cp),ct(Ny,cp,"esm2020")}Yv();var wp=new Map,nw={activated:!1,tokenObservers:[]},Xv={initialized:!1,enabled:!1};function Fe(n){return wp.get(n)||{...nw}}function Zv(n,e){return wp.set(n,e),wp.get(n)}function Ku(){return Xv}var Ap="https://content-firebaseappcheck.googleapis.com/v1",eR="exchangeRecaptchaV3Token",tR="exchangeRecaptchaEnterpriseToken",nR="exchangeDebugToken",Zy={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},rR=24*60*60*1e3;var Ip=class{constructor(e,t,r,s,i){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=s,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=s,s>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new vt,this.pending.promise.catch(t=>{}),await sR(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new vt,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{let t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}};function sR(n){return new Promise(e=>{setTimeout(e,n)})}var iR={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},it=new jt("appCheck","AppCheck",iR);function Uu(n=!1){return n?self.grecaptcha?.enterprise:self.grecaptcha}function bp(n){if(!Fe(n).activated)throw it.create("use-before-activation",{appName:n.name})}function vp(n){let e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),s=Math.floor((e-t*3600*24-r*3600)/60),i=e-t*3600*24-r*3600-s*60,o="";return t&&(o+=Mu(t)+"d:"),r&&(o+=Mu(r)+"h:"),o+=Mu(s)+"m:"+Mu(i)+"s",o}function Mu(n){return n===0?"00":n>=10?n.toString():"0"+n}async function Ju({url:n,body:e},t){let r={"Content-Type":"application/json"},s=t.getImmediate({optional:!0});if(s){let f=await s.getHeartbeatsHeader();f&&(r["X-Firebase-Client"]=f)}let i={method:"POST",body:JSON.stringify(e),headers:r},o;try{o=await fetch(n,i)}catch(f){throw it.create("fetch-network-error",{originalErrorMessage:f?.message})}if(o.status!==200)throw it.create("fetch-status-error",{httpStatus:o.status});let c;try{c=await o.json()}catch(f){throw it.create("fetch-parse-error",{originalErrorMessage:f?.message})}let u=c.ttl.match(/^([\d.]+)(s)$/);if(!u||!u[2]||isNaN(Number(u[1])))throw it.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${c.ttl}`});let l=Number(u[1])*1e3,B=Date.now();return{token:c.token,expireTimeMillis:B+l,issuedAtTimeMillis:B}}function oR(n,e){let{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Ap}/projects/${t}/apps/${r}:${eR}?key=${s}`,body:{recaptcha_v3_token:e}}}function aR(n,e){let{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Ap}/projects/${t}/apps/${r}:${tR}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function rw(n,e){let{projectId:t,appId:r,apiKey:s}=n.options;return{url:`${Ap}/projects/${t}/apps/${r}:${nR}?key=${s}`,body:{debug_token:e}}}var cR="firebase-app-check-database",uR=1,na="firebase-app-check-store",sw="debug-token",Gu=null;function iw(){return Gu||(Gu=new Promise((n,e)=>{try{let t=indexedDB.open(cR,uR);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{e(it.create("storage-open",{originalErrorMessage:r.target.error?.message}))},t.onupgradeneeded=r=>{let s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(na,{keyPath:"compositeKey"})}}}catch(t){e(it.create("storage-open",{originalErrorMessage:t?.message}))}}),Gu)}function lR(n){return aw(cw(n))}function hR(n,e){return ow(cw(n),e)}function BR(n){return ow(sw,n)}function dR(){return aw(sw)}async function ow(n,e){let r=(await iw()).transaction(na,"readwrite"),i=r.objectStore(na).put({compositeKey:n,value:e});return new Promise((o,c)=>{i.onsuccess=u=>{o()},r.onerror=u=>{c(it.create("storage-set",{originalErrorMessage:u.target.error?.message}))}})}async function aw(n){let t=(await iw()).transaction(na,"readonly"),s=t.objectStore(na).get(n);return new Promise((i,o)=>{s.onsuccess=c=>{let u=c.target.result;i(u?u.value:void 0)},t.onerror=c=>{o(it.create("storage-get",{originalErrorMessage:c.target.error?.message}))}})}function cw(n){return`${n.options.appId}-${n.name}`}var fr=new kt("@firebase/app-check");async function fR(n){if(ps()){let e;try{e=await lR(n)}catch(t){fr.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function _p(n,e){return ps()?hR(n,e).catch(t=>{fr.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function pR(n){let e;try{e=await dR()}catch{}if(e)return e;{let t=crypto.randomUUID(),r=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${t}

`,s=n?.options.appId,i=n?.options.projectId;return i&&s?r+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${i}/appcheck/apps?selectedAppId=${s}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${t} --project ${i} --app ${s}

`:r+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,r+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(r),BR(t).catch(o=>fr.warn(`Failed to persist debug token to IndexedDB. Error: ${o}`)),t}}function Rp(){return Ku().enabled}async function Sp(){let n=Ku();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function gR(n){let e=fs(),t=Ku();if(t.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;t.enabled=!0;let r=new vt;t.token=r,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?r.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):r.resolve(pR(n))}var CR={error:"UNKNOWN_ERROR"};function mR(n){return ya.encodeString(JSON.stringify(n),!1)}async function Dp(n,e=!1,t=!1){let r=n.app;bp(r);let s=Fe(r),i=s.token,o;if(i&&!_i(i)&&(s.token=void 0,i=void 0),!i){let l=await s.cachedTokenPromise;l&&(_i(l)?i=l:await _p(r,void 0))}if(!e&&i&&_i(i))return{token:i.token};let c=!1;if(Rp())try{let l=await Sp();s.exchangeTokenPromise||(s.exchangeTokenPromise=Ju(rw(r,l),n.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),c=!0);let B=await s.exchangeTokenPromise;return await _p(r,B),s.token=B,{token:B.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?fr.warn(l.message):t&&fr.error(l),yp(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),c=!0),i=await Fe(r).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?fr.warn(l.message):t&&fr.error(l),o=l}let u;return i?o?_i(i)?u={token:i.token,internalError:o}:u=yp(o):(u={token:i.token},s.token=i,await _p(r,i)):u=yp(o),c&&hw(r,u),u}async function ER(n){let e=n.app;bp(e);let{provider:t}=Fe(e);if(Rp()){let r=await Sp(),s=rw(e,r);s.body.limited_use=!0;let{token:i}=await Ju(s,n.heartbeatServiceProvider);return{token:i}}else{let{token:r}=await t.getToken(!0);return{token:r}}}function uw(n,e,t,r){let{app:s}=n,i=Fe(s),o={next:t,error:r,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&_i(i.token)){let c=i.token;Promise.resolve().then(()=>{t({token:c.token}),ew(n)}).catch(()=>{})}i.cachedTokenPromise.then(()=>ew(n))}function lw(n,e){let t=Fe(n),r=t.tokenObservers.filter(s=>s.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function ew(n){let{app:e}=n,t=Fe(e),r=t.tokenRefresher;r||(r=_R(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function _R(n){let{app:e}=n;return new Ip(async()=>{let t=Fe(e),r;if(t.token?r=await Dp(n,!0):r=await Dp(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{let t=Fe(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5,s=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,s),Math.max(0,r-Date.now())}else return 0},Zy.RETRIAL_MIN_WAIT,Zy.RETRIAL_MAX_WAIT)}function hw(n,e){let t=Fe(n).tokenObservers;for(let r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function _i(n){return n.expireTimeMillis-Date.now()>0}function yp(n){return{token:mR(CR),error:n}}var Tp=class{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){let{tokenObservers:e}=Fe(this.app);for(let t of e)lw(this.app,t.next);return Promise.resolve()}};function yR(n,e){return new Tp(n,e)}function wR(n){return{getToken:e=>Dp(n,e),getLimitedUseToken:()=>ER(n),addTokenListener:e=>uw(n,"INTERNAL",e),removeTokenListener:e=>lw(n.app,e)}}var IR="@firebase/app-check",DR="0.13.1";var TR="https://www.google.com/recaptcha/api.js",AR="https://www.google.com/recaptcha/enterprise.js";function bR(n,e){let t=new vt,r=Fe(n);r.reCAPTCHAState={initialized:t};let s=Bw(n),i=Uu(!1);return i?Hu(n,e,i,s,t):SR(()=>{let o=Uu(!1);if(!o)throw new Error("no recaptcha");Hu(n,e,o,s,t)}),t.promise}function vR(n,e){let t=new vt,r=Fe(n);r.reCAPTCHAState={initialized:t};let s=Bw(n),i=Uu(!0);return i?Hu(n,e,i,s,t):OR(()=>{let o=Uu(!0);if(!o)throw new Error("no recaptcha");Hu(n,e,o,s,t)}),t.promise}function Hu(n,e,t,r,s){t.ready(()=>{RR(n,e,t,r),s.resolve(t)})}function Bw(n){let e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function dw(n){bp(n);let t=await Fe(n).reCAPTCHAState.initialized.promise;return new Promise((r,s)=>{let i=Fe(n).reCAPTCHAState;t.ready(()=>{r(t.execute(i.widgetId,{action:"fire_app_check"}))})})}function RR(n,e,t,r){let s=t.render(r,{sitekey:e,size:"invisible",callback:()=>{Fe(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{Fe(n).reCAPTCHAState.succeeded=!1}}),i=Fe(n);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:s}}function SR(n){let e=document.createElement("script");e.src=TR,e.onload=n,document.head.appendChild(e)}function OR(n){let e=document.createElement("script");e.src=AR+"?render=explicit",e.onload=n,document.head.appendChild(e)}var qu=class n{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){pw(this._throttleData);let t=await dw(this._app).catch(s=>{throw it.create("recaptcha-error")});if(!Fe(this._app).reCAPTCHAState?.succeeded)throw it.create("recaptcha-error");let r;try{let s=oR(this._app,t);e&&(s.body.limited_use=!0),r=await Ju(s,this._heartbeatServiceProvider)}catch(s){throw s.code?.includes("fetch-status-error")?(this._throttleData=fw(Number(s.customData?.httpStatus),this._throttleData),it.create("initial-throttle",{time:vp(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,r}initialize(e){this._app=e,this._heartbeatServiceProvider=Jt(e,"heartbeat"),bR(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof n?this._siteKey===e._siteKey:!1}},ju=class n{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){pw(this._throttleData);let t=await dw(this._app).catch(s=>{throw it.create("recaptcha-error")});if(!Fe(this._app).reCAPTCHAState?.succeeded)throw it.create("recaptcha-error");let r;try{let s=aR(this._app,t);e&&(s.body.limited_use=!0),r=await Ju(s,this._heartbeatServiceProvider)}catch(s){throw s.code?.includes("fetch-status-error")?(this._throttleData=fw(Number(s.customData?.httpStatus),this._throttleData),it.create("initial-throttle",{time:vp(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,r}initialize(e){this._app=e,this._heartbeatServiceProvider=Jt(e,"heartbeat"),vR(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof n?this._siteKey===e._siteKey:!1}};function fw(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+rR,httpStatus:n};{let t=e?e.backoffCount:0,r=zg(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function pw(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw it.create("throttled",{time:vp(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}function gw(n=zn(),e){n=Ne(n);let t=Jt(n,"app-check");if(Ku().initialized||gR(n),Rp()&&Sp().then(s=>{console.log(`Firebase App Check debug token: ${s}`)}),t.isInitialized()){let s=t.getImmediate(),i=t.getOptions();if(i&&!!i.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&i.provider?.isEqual(e.provider))return s;throw it.create("already-initialized",{appName:n.name})}let r=t.initialize({options:e});return PR(n,e.provider,e.isTokenAutoRefreshEnabled),Fe(n).isTokenAutoRefreshEnabled&&uw(r,"INTERNAL",()=>{}),r}function PR(n,e,t=!1){let r=Zv(n,{...nw});r.activated=!0,r.provider=e,r.cachedTokenPromise=fR(n).then(s=>(s&&_i(s)&&(r.token=s,hw(n,{token:s.token})),s)),r.isTokenAutoRefreshEnabled=t&&n.automaticDataCollectionEnabled,!n.automaticDataCollectionEnabled&&t&&fr.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(n)}var NR="app-check",tw="app-check-internal";function xR(){Rt(new tt(NR,n=>{let e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return yR(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(tw).initialize()})),Rt(new tt(tw,n=>{let e=n.getProvider("app-check").getImmediate();return wR(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ct(IR,DR)}xR();var pr=null,mn=null,ra=null,sa=null,ls=null,Cw=!1,mw=[],Ew=!1;function LR(n,e={}){if(pr||!n||!n.apiKey)return!!pr;if(pr=kl(n),e.appCheckSiteKey)try{let t=e.appCheckProvider==="v3"?new qu(e.appCheckSiteKey):new ju(e.appCheckSiteKey);gw(pr,{provider:t,isTokenAutoRefreshEnabled:!0}),Ew=!0}catch{}mn=mh(pr),uh(mn,oc).catch(()=>{}),ra=np(pr);try{sa=Yy(pr,{backend:new us})}catch{sa=null}return Ch(mn).catch(()=>{}),lh(mn,t=>{ls=t,Cw=!0,mw.forEach(r=>{try{r(t?_w(t):null)}catch{}})}),!0}var _w=n=>({uid:n.uid,name:n.displayName||"",email:n.email||"",photo:n.photoURL||""});async function kR(){if(!mn)throw new Error("not_configured");let n=new vr;n.setCustomParameters({prompt:"select_account"});try{await ph(mn,n)}catch(e){let t=e&&e.code||"";if(t==="auth/popup-blocked"||t==="auth/operation-not-supported-in-this-environment")return gh(mn,n);if(t==="auth/popup-closed-by-user"||t==="auth/cancelled-popup-request")return;throw e}}var FR=()=>mn?hh(mn):Promise.resolve(),VR=n=>{mw.push(n),mn&&Cw&&n(ls?_w(ls):null)};async function MR(){if(!ra||!ls)return null;let n=await Oy(bu(ra,"users",ls.uid));return n.exists()?n.data():null}async function GR(n,e){!ra||!ls||await Py(bu(ra,"users",ls.uid),{state:n,updated:e})}async function UR({system:n,messages:e,json:t,models:r}){if(!sa)throw{code:"not_configured"};let s=null;for(let i of r)try{let o=Xy(sa,{model:i,systemInstruction:n||void 0,generationConfig:t?{responseMimeType:"application/json"}:void 0}),c=e.map(l=>({role:l.role==="assistant"?"model":"user",parts:[{text:l.content}]}));return{text:(await o.generateContent({contents:c})).response.text(),model:i}}catch(o){s=o;let c=String(o&&(o.message||o.code)||"");if(/429|quota|RESOURCE_EXHAUSTED/i.test(c))throw{code:"rate_limited",message:c};if(/app ?check/i.test(c))throw{code:"app_check",message:c};if(/404|not found|not supported|permission|403|400/i.test(c))continue;throw{code:"error",message:c}}throw{code:"error",message:String(s&&s.message||s)}}window.PoisCloud={init:LR,signIn:kR,signOut:FR,onUser:VR,load:MR,save:GR,generate:UR,get ready(){return!!pr},get aiReady(){return!!sa},get appCheck(){return Ew}};window.dispatchEvent(new Event("poiscloud"));})();
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

re2js/build/index.js:
  (*!
  * re2js
  * RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
  *
  * @version v2.10.0
  * @author Oleksii Vasyliev
  * @homepage https://github.com/le0pard/re2js#readme
  * @repository [object Object]
  * @license MIT
  *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * Copyright 2021 M.Vokhmentsev
   *
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (* Copyright 2024 Google LLC* @license *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (* Copyright 2024 Google LLC* @license *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/common-aOCKfaeU.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
