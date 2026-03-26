(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const hy="modulepreload",py=function(n){return"/vite-project/"+n},cd={},Ft=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(c=>{if(c=py(c),c in cd)return;cd[c]=!0;const u=c.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":hy,u||(m.as="script"),m.crossOrigin="",m.href=c,l&&m.setAttribute("nonce",l),document.head.appendChild(m),u)return new Promise((g,_)=>{m.addEventListener("load",g),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var ud={};/**
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
 */const lp=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},fy=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],l=n[t++],c=((i&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},cp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,l=o?n[i+1]:0,c=i+2<n.length,u=c?n[i+2]:0,p=r>>2,m=(r&3)<<4|l>>4;let g=(l&15)<<2|u>>6,_=u&63;c||(_=64,o||(g=64)),s.push(t[p],t[m],t[g],t[_])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(lp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):fy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],l=i<n.length?t[n.charAt(i)]:0;++i;const u=i<n.length?t[n.charAt(i)]:64;++i;const m=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||l==null||u==null||m==null)throw new my;const g=r<<2|l>>4;if(s.push(g),u!==64){const _=l<<4&240|u>>2;if(s.push(_),m!==64){const y=u<<6&192|m;s.push(y)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class my extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gy=function(n){const e=lp(n);return cp.encodeByteArray(e,!0)},co=function(n){return gy(n).replace(/\./g,"")},up=function(n){try{return cp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function vy(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const yy=()=>vy().__FIREBASE_DEFAULTS__,_y=()=>{if(typeof process>"u"||typeof ud>"u")return;const n=ud.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},by=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&up(n[1]);return e&&JSON.parse(e)},Lo=()=>{try{return yy()||_y()||by()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},dp=n=>{var e,t;return(t=(e=Lo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},wy=n=>{const e=dp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},hp=()=>{var n;return(n=Lo())===null||n===void 0?void 0:n.config},pp=n=>{var e;return(e=Lo())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Iy{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function Ey(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[co(JSON.stringify(t)),co(JSON.stringify(o)),""].join(".")}/**
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
 */function xe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ty(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xe())}function Ay(){var n;const e=(n=Lo())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ky(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Cy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Py(){const n=xe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function fp(){return!Ay()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function mp(){try{return typeof indexedDB=="object"}catch{return!1}}function Ry(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const xy="FirebaseError";class Jt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=xy,Object.setPrototypeOf(this,Jt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,er.prototype.create)}}class er{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Dy(r,s):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Jt(i,l,s)}}function Dy(n,e){return n.replace(Ly,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Ly=/\{\$([^}]+)}/g;function Vy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vs(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(dd(r)&&dd(o)){if(!Vs(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function dd(n){return n!==null&&typeof n=="object"}/**
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
 */function tr(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function ki(n){const e={};return n.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[i,r]=s.split("=");e[decodeURIComponent(i)]=decodeURIComponent(r)}}),e}function Ci(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Ny(n,e){const t=new My(n,e);return t.subscribe.bind(t)}class My{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let i;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Oy(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:s},i.next===void 0&&(i.next=Ha),i.error===void 0&&(i.error=Ha),i.complete===void 0&&(i.complete=Ha);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Oy(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ha(){}/**
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
 */function Ce(n){return n&&n._delegate?n._delegate:n}class Yn{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Bn="[DEFAULT]";/**
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
 */class Fy{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Iy;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(By(e))try{this.getOrInitializeService({instanceIdentifier:Bn})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Bn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Bn){return this.instances.has(e)}getOptions(e=Bn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);s===l&&o.resolve(i)}return i}onInit(e,t){var s;const i=this.normalizeInstanceIdentifier(t),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:$y(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Bn){return this.component?this.component.multipleInstances?e:Bn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $y(n){return n===Bn?void 0:n}function By(n){return n.instantiationMode==="EAGER"}/**
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
 */class Uy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Fy(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var se;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(se||(se={}));const qy={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},jy=se.INFO,zy={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},Gy=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=zy[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Xl{constructor(e){this.name=e,this._logLevel=jy,this._logHandler=Gy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qy[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const Hy=(n,e)=>e.some(t=>n instanceof t);let hd,pd;function Ky(){return hd||(hd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wy(){return pd||(pd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gp=new WeakMap,ll=new WeakMap,vp=new WeakMap,Ka=new WeakMap,Zl=new WeakMap;function Qy(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(hn(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&gp.set(t,n)}).catch(()=>{}),Zl.set(e,n),e}function Yy(n){if(ll.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ll.set(n,e)}let cl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ll.get(n);if(e==="objectStoreNames")return n.objectStoreNames||vp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return hn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Jy(n){cl=n(cl)}function Xy(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Wa(this),e,...t);return vp.set(s,e.sort?e.sort():[e]),hn(s)}:Wy().includes(n)?function(...e){return n.apply(Wa(this),e),hn(gp.get(this))}:function(...e){return hn(n.apply(Wa(this),e))}}function Zy(n){return typeof n=="function"?Xy(n):(n instanceof IDBTransaction&&Yy(n),Hy(n,Ky())?new Proxy(n,cl):n)}function hn(n){if(n instanceof IDBRequest)return Qy(n);if(Ka.has(n))return Ka.get(n);const e=Zy(n);return e!==n&&(Ka.set(n,e),Zl.set(e,n)),e}const Wa=n=>Zl.get(n);function e_(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),l=hn(o);return s&&o.addEventListener("upgradeneeded",c=>{s(hn(o.result),c.oldVersion,c.newVersion,hn(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{r&&c.addEventListener("close",()=>r()),i&&c.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const t_=["get","getKey","getAll","getAllKeys","count"],n_=["put","add","delete","clear"],Qa=new Map;function fd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qa.get(e))return Qa.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=n_.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||t_.includes(t)))return;const r=async function(o,...l){const c=this.transaction(o,i?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(l.shift())),(await Promise.all([u[t](...l),i&&c.done]))[0]};return Qa.set(e,r),r}Jy(n=>({...n,get:(e,t,s)=>fd(e,t)||n.get(e,t,s),has:(e,t)=>!!fd(e,t)||n.has(e,t)}));/**
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
 */class s_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(i_(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function i_(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ul="@firebase/app",md="0.10.13";/**
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
 */const Wt=new Xl("@firebase/app"),r_="@firebase/app-compat",o_="@firebase/analytics-compat",a_="@firebase/analytics",l_="@firebase/app-check-compat",c_="@firebase/app-check",u_="@firebase/auth",d_="@firebase/auth-compat",h_="@firebase/database",p_="@firebase/data-connect",f_="@firebase/database-compat",m_="@firebase/functions",g_="@firebase/functions-compat",v_="@firebase/installations",y_="@firebase/installations-compat",__="@firebase/messaging",b_="@firebase/messaging-compat",w_="@firebase/performance",I_="@firebase/performance-compat",E_="@firebase/remote-config",T_="@firebase/remote-config-compat",A_="@firebase/storage",S_="@firebase/storage-compat",k_="@firebase/firestore",C_="@firebase/vertexai-preview",P_="@firebase/firestore-compat",R_="firebase",x_="10.14.1";/**
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
 */const dl="[DEFAULT]",D_={[ul]:"fire-core",[r_]:"fire-core-compat",[a_]:"fire-analytics",[o_]:"fire-analytics-compat",[c_]:"fire-app-check",[l_]:"fire-app-check-compat",[u_]:"fire-auth",[d_]:"fire-auth-compat",[h_]:"fire-rtdb",[p_]:"fire-data-connect",[f_]:"fire-rtdb-compat",[m_]:"fire-fn",[g_]:"fire-fn-compat",[v_]:"fire-iid",[y_]:"fire-iid-compat",[__]:"fire-fcm",[b_]:"fire-fcm-compat",[w_]:"fire-perf",[I_]:"fire-perf-compat",[E_]:"fire-rc",[T_]:"fire-rc-compat",[A_]:"fire-gcs",[S_]:"fire-gcs-compat",[k_]:"fire-fst",[P_]:"fire-fst-compat",[C_]:"fire-vertex","fire-js":"fire-js",[R_]:"fire-js-all"};/**
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
 */const uo=new Map,L_=new Map,hl=new Map;function gd(n,e){try{n.container.addComponent(e)}catch(t){Wt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ns(n){const e=n.name;if(hl.has(e))return Wt.debug(`There were multiple attempts to register component ${e}.`),!1;hl.set(e,n);for(const t of uo.values())gd(t,n);for(const t of L_.values())gd(t,n);return!0}function ec(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function pt(n){return n.settings!==void 0}/**
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
 */const V_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pn=new er("app","Firebase",V_);/**
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
 */class N_{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Yn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pn.create("app-deleted",{appName:this._name})}}/**
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
 */const Qs=x_;function yp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=Object.assign({name:dl,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw pn.create("bad-app-name",{appName:String(i)});if(t||(t=hp()),!t)throw pn.create("no-options");const r=uo.get(i);if(r){if(Vs(t,r.options)&&Vs(s,r.config))return r;throw pn.create("duplicate-app",{appName:i})}const o=new Uy(i);for(const c of hl.values())o.addComponent(c);const l=new N_(t,s,o);return uo.set(i,l),l}function _p(n=dl){const e=uo.get(n);if(!e&&n===dl&&hp())return yp();if(!e)throw pn.create("no-app",{appName:n});return e}function fn(n,e,t){var s;let i=(s=D_[n])!==null&&s!==void 0?s:n;t&&(i+=`-${t}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${i}" with version "${e}":`];r&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Wt.warn(l.join(" "));return}Ns(new Yn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const M_="firebase-heartbeat-database",O_=1,zi="firebase-heartbeat-store";let Ya=null;function bp(){return Ya||(Ya=e_(M_,O_,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(zi)}catch(t){console.warn(t)}}}}).catch(n=>{throw pn.create("idb-open",{originalErrorMessage:n.message})})),Ya}async function F_(n){try{const t=(await bp()).transaction(zi),s=await t.objectStore(zi).get(wp(n));return await t.done,s}catch(e){if(e instanceof Jt)Wt.warn(e.message);else{const t=pn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Wt.warn(t.message)}}}async function vd(n,e){try{const s=(await bp()).transaction(zi,"readwrite");await s.objectStore(zi).put(e,wp(n)),await s.done}catch(t){if(t instanceof Jt)Wt.warn(t.message);else{const s=pn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Wt.warn(s.message)}}}function wp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const $_=1024,B_=30*24*60*60*1e3;class U_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new j_(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=yd();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=B_}),this._storage.overwrite(this._heartbeatsCache))}catch(s){Wt.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=yd(),{heartbeatsToSend:s,unsentEntries:i}=q_(this._heartbeatsCache.heartbeats),r=co(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Wt.warn(t),""}}}function yd(){return new Date().toISOString().substring(0,10)}function q_(n,e=$_){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),_d(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),_d(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class j_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return mp()?Ry().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await F_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function _d(n){return co(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function z_(n){Ns(new Yn("platform-logger",e=>new s_(e),"PRIVATE")),Ns(new Yn("heartbeat",e=>new U_(e),"PRIVATE")),fn(ul,md,n),fn(ul,md,"esm2017"),fn("fire-js","")}z_("");var G_="firebase",H_="10.14.1";/**
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
 */fn(G_,H_,"app");function tc(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(n);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(n,s[i])&&(t[s[i]]=n[s[i]]);return t}function Ip(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ep=Ip,Tp=new er("auth","Firebase",Ip());/**
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
 */const ho=new Xl("@firebase/auth");function K_(n,...e){ho.logLevel<=se.WARN&&ho.warn(`Auth (${Qs}): ${n}`,...e)}function Kr(n,...e){ho.logLevel<=se.ERROR&&ho.error(`Auth (${Qs}): ${n}`,...e)}/**
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
 */function mt(n,...e){throw sc(n,...e)}function _t(n,...e){return sc(n,...e)}function nc(n,e,t){const s=Object.assign(Object.assign({},Ep()),{[e]:t});return new er("auth","Firebase",s).create(e,{appName:n.name})}function Ct(n){return nc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ap(n,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&mt(n,"argument-error"),nc(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function sc(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return Tp.create(n,...e)}function X(n,e,...t){if(!n)throw sc(e,...t)}function qt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Kr(e),new Error(e)}function Qt(n,e){n||qt(e)}/**
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
 */function pl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function W_(){return bd()==="http:"||bd()==="https:"}function bd(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Q_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(W_()||ky()||"connection"in navigator)?navigator.onLine:!0}function Y_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class nr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Qt(t>e,"Short delay should be less than long delay!"),this.isMobile=Ty()||Cy()}get(){return Q_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ic(n,e){Qt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Sp{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;qt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;qt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;qt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const J_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const X_=new nr(3e4,6e4);function In(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Xt(n,e,t,s,i={}){return kp(n,i,async()=>{let r={},o={};s&&(e==="GET"?o=s:r={body:JSON.stringify(s)});const l=tr(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const u=Object.assign({method:e,headers:c},r);return Sy()||(u.referrerPolicy="no-referrer"),Sp.fetch()(Cp(n,n.config.apiHost,t,l),u)})}async function kp(n,e,t){n._canInitEmulator=!1;const s=Object.assign(Object.assign({},J_),e);try{const i=new eb(n),r=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Mr(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const l=r.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mr(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Mr(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Mr(n,"user-disabled",o);const p=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw nc(n,p,u);mt(n,p)}}catch(i){if(i instanceof Jt)throw i;mt(n,"network-request-failed",{message:String(i)})}}async function sr(n,e,t,s,i={}){const r=await Xt(n,e,t,s,i);return"mfaPendingCredential"in r&&mt(n,"multi-factor-auth-required",{_serverResponse:r}),r}function Cp(n,e,t,s){const i=`${e}${t}?${s}`;return n.config.emulator?ic(n.config,i):`${n.config.apiScheme}://${i}`}function Z_(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class eb{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(_t(this.auth,"network-request-failed")),X_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Mr(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const i=_t(n,e,s);return i.customData._tokenResponse=t,i}function wd(n){return n!==void 0&&n.enterprise!==void 0}class tb{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Z_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function nb(n,e){return Xt(n,"GET","/v2/recaptchaConfig",In(n,e))}/**
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
 */async function sb(n,e){return Xt(n,"POST","/v1/accounts:delete",e)}async function Pp(n,e){return Xt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ni(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Rp(n,e=!1){const t=Ce(n),s=await t.getIdToken(e),i=rc(s);X(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:s,authTime:Ni(Ja(i.auth_time)),issuedAtTime:Ni(Ja(i.iat)),expirationTime:Ni(Ja(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Ja(n){return Number(n)*1e3}function rc(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return Kr("JWT malformed, contained fewer than 3 sections"),null;try{const i=up(t);return i?JSON.parse(i):(Kr("Failed to decode base64 JWT payload"),null)}catch(i){return Kr("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Id(n){const e=rc(n);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ms(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof Jt&&ib(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function ib({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class rb{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class fl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ni(this.lastLoginAt),this.creationTime=Ni(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function po(n){var e;const t=n.auth,s=await n.getIdToken(),i=await Ms(n,Pp(t,{idToken:s}));X(i==null?void 0:i.users.length,t,"internal-error");const r=i.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Dp(r.providerUserInfo):[],l=ob(n.providerData,o),c=n.isAnonymous,u=!(n.email&&r.passwordHash)&&!(l!=null&&l.length),p=c?u:!1,m={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:l,metadata:new fl(r.createdAt,r.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function xp(n){const e=Ce(n);await po(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ob(n,e){return[...n.filter(s=>!e.some(i=>i.providerId===s.providerId)),...e]}function Dp(n){return n.map(e=>{var{providerId:t}=e,s=tc(e,["providerId"]);return{providerId:t,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
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
 */async function ab(n,e){const t=await kp(n,{},async()=>{const s=tr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=n.config,o=Cp(n,i,"/v1/token",`key=${r}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Sp.fetch()(o,{method:"POST",headers:l,body:s})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lb(n,e){return Xt(n,"POST","/v2/accounts:revokeToken",In(n,e))}/**
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
 */class Rs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Id(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){X(e.length!==0,"internal-error");const t=Id(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:i,expiresIn:r}=await ab(e,t);this.updateTokensAndExpiration(s,i,Number(r))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:i,expirationTime:r}=t,o=new Rs;return s&&(X(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),i&&(X(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(X(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Rs,this.toJSON())}_performRefresh(){return qt("not implemented")}}/**
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
 */function rn(n,e){X(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class jt{constructor(e){var{uid:t,auth:s,stsTokenManager:i}=e,r=tc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new rb(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=s,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new fl(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Ms(this,this.stsTokenManager.getToken(this.auth,e));return X(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Rp(this,e)}reload(){return xp(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new jt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await po(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(pt(this.auth.app))return Promise.reject(Ct(this.auth));const e=await this.getIdToken();return await Ms(this,sb(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var s,i,r,o,l,c,u,p;const m=(s=t.displayName)!==null&&s!==void 0?s:void 0,g=(i=t.email)!==null&&i!==void 0?i:void 0,_=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,y=(o=t.photoURL)!==null&&o!==void 0?o:void 0,x=(l=t.tenantId)!==null&&l!==void 0?l:void 0,C=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,L=(u=t.createdAt)!==null&&u!==void 0?u:void 0,T=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:V,emailVerified:$,isAnonymous:G,providerData:Q,stsTokenManager:w}=t;X(V&&w,e,"internal-error");const b=Rs.fromJSON(this.name,w);X(typeof V=="string",e,"internal-error"),rn(m,e.name),rn(g,e.name),X(typeof $=="boolean",e,"internal-error"),X(typeof G=="boolean",e,"internal-error"),rn(_,e.name),rn(y,e.name),rn(x,e.name),rn(C,e.name),rn(L,e.name),rn(T,e.name);const I=new jt({uid:V,auth:e,email:g,emailVerified:$,displayName:m,isAnonymous:G,photoURL:y,phoneNumber:_,tenantId:x,stsTokenManager:b,createdAt:L,lastLoginAt:T});return Q&&Array.isArray(Q)&&(I.providerData=Q.map(S=>Object.assign({},S))),C&&(I._redirectEventId=C),I}static async _fromIdTokenResponse(e,t,s=!1){const i=new Rs;i.updateFromServerResponse(t);const r=new jt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:s});return await po(r),r}static async _fromGetAccountInfoResponse(e,t,s){const i=t.users[0];X(i.localId!==void 0,"internal-error");const r=i.providerUserInfo!==void 0?Dp(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(r!=null&&r.length),l=new Rs;l.updateFromIdToken(s);const c=new jt({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new fl(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(r!=null&&r.length)};return Object.assign(c,u),c}}/**
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
 */const Ed=new Map;function zt(n){Qt(n instanceof Function,"Expected a class definition");let e=Ed.get(n);return e?(Qt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ed.set(n,e),e)}/**
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
 */class Lp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Lp.type="NONE";const ml=Lp;/**
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
 */function Wr(n,e,t){return`firebase:${n}:${e}:${t}`}class xs{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:i,name:r}=this.auth;this.fullUserKey=Wr(this.userKey,i.apiKey,r),this.fullPersistenceKey=Wr("persistence",i.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?jt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new xs(zt(ml),e,s);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let r=i[0]||zt(ml);const o=Wr(s,e.config.apiKey,e.name);let l=null;for(const u of t)try{const p=await u._get(o);if(p){const m=jt._fromJSON(e,p);u!==r&&(l=m),r=u;break}}catch{}const c=i.filter(u=>u._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new xs(r,e,s):(r=c[0],l&&await r._set(o,l.toJSON()),await Promise.all(t.map(async u=>{if(u!==r)try{await u._remove(o)}catch{}})),new xs(r,e,s))}}/**
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
 */function Td(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Op(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if($p(e))return"Blackberry";if(Bp(e))return"Webos";if(Np(e))return"Safari";if((e.includes("chrome/")||Mp(e))&&!e.includes("edge/"))return"Chrome";if(Fp(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Vp(n=xe()){return/firefox\//i.test(n)}function Np(n=xe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Mp(n=xe()){return/crios\//i.test(n)}function Op(n=xe()){return/iemobile/i.test(n)}function Fp(n=xe()){return/android/i.test(n)}function $p(n=xe()){return/blackberry/i.test(n)}function Bp(n=xe()){return/webos/i.test(n)}function oc(n=xe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function cb(n=xe()){var e;return oc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ub(){return Py()&&document.documentMode===10}function Up(n=xe()){return oc(n)||Fp(n)||Bp(n)||$p(n)||/windows phone/i.test(n)||Op(n)}/**
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
 */function qp(n,e=[]){let t;switch(n){case"Browser":t=Td(xe());break;case"Worker":t=`${Td(xe())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Qs}/${s}`}/**
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
 */class db{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=r=>new Promise((o,l)=>{try{const c=e(r);o(c)}catch(c){l(c)}});s.onAbort=t,this.queue.push(s);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function hb(n,e={}){return Xt(n,"GET","/v2/passwordPolicy",In(n,e))}/**
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
 */const pb=6;class fb{constructor(e){var t,s,i,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:pb,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(s=e.allowedNonAlphanumericCharacters)===null||s===void 0?void 0:s.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,s,i,r,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(s=c.meetsMaxPasswordLength)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(r=c.containsUppercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let i=0;i<e.length;i++)s=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class mb{constructor(e,t,s,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ad(this),this.idTokenSubscription=new Ad(this),this.beforeStateQueue=new db(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=zt(t)),this._initializationPromise=this.queue(async()=>{var s,i;if(!this._deleted&&(this.persistenceManager=await xs.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Pp(this,{idToken:e}),s=await jt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(pt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let i=s,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(i=c.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await po(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Y_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(pt(this.app))return Promise.reject(Ct(this));const t=e?Ce(e):null;return t&&X(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return pt(this.app)?Promise.reject(Ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return pt(this.app)?Promise.reject(Ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(zt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hb(this),t=new fb(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new er("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await lb(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&zt(e)||this._popupRedirectResolver;X(t,this,"argument-error"),this.redirectPersistenceManager=await xs.create(this,[zt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,i){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(l,this,"internal-error"),l.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,s,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(t["X-Firebase-Client"]=s);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&K_(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Lt(n){return Ce(n)}class Ad{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ny(t=>this.observer=t)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Vo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gb(n){Vo=n}function jp(n){return Vo.loadJS(n)}function vb(){return Vo.recaptchaEnterpriseScript}function yb(){return Vo.gapiScript}function _b(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const bb="recaptcha-enterprise",wb="NO_RECAPTCHA";class Ib{constructor(e){this.type=bb,this.auth=Lt(e)}async verify(e="verify",t=!1){async function s(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,l)=>{nb(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new tb(c);return r.tenantId==null?r._agentRecaptchaConfig=u:r._tenantRecaptchaConfigs[r.tenantId]=u,o(u.siteKey)}}).catch(c=>{l(c)})})}function i(r,o,l){const c=window.grecaptcha;wd(c)?c.enterprise.ready(()=>{c.enterprise.execute(r,{action:e}).then(u=>{o(u)}).catch(()=>{o(wb)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{s(this.auth).then(l=>{if(!t&&wd(window.grecaptcha))i(l,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=vb();c.length!==0&&(c+=l),jp(c).then(()=>{i(l,r,o)}).catch(u=>{o(u)})}}).catch(l=>{o(l)})})}}async function Sd(n,e,t,s=!1){const i=new Ib(n);let r;try{r=await i.verify(t)}catch{r=await i.verify(t,!0)}const o=Object.assign({},e);return s?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function gl(n,e,t,s){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Sd(n,e,t,t==="getOobCode");return s(n,r)}else return s(n,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Sd(n,e,t,t==="getOobCode");return s(n,o)}else return Promise.reject(r)})}/**
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
 */function zp(n,e){const t=ec(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),r=t.getOptions();if(Vs(r,e??{}))return i;mt(i,"already-initialized")}return t.initialize({options:e})}function Eb(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(zt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Gp(n,e,t){const s=Lt(n);X(s._canInitEmulator,s,"emulator-config-failed"),X(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const i=!1,r=Hp(e),{host:o,port:l}=Tb(e),c=l===null?"":`:${l}`;s.config.emulator={url:`${r}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:l,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),Ab()}function Hp(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Tb(n){const e=Hp(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const r=i[1];return{host:r,port:kd(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:kd(o)}}}function kd(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ab(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class No{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return qt("not implemented")}_getIdTokenResponse(e){return qt("not implemented")}_linkToIdToken(e,t){return qt("not implemented")}_getReauthenticationResolver(e){return qt("not implemented")}}async function Sb(n,e){return Xt(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function kb(n,e){return sr(n,"POST","/v1/accounts:signInWithPassword",In(n,e))}/**
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
 */async function Cb(n,e){return sr(n,"POST","/v1/accounts:signInWithEmailLink",In(n,e))}async function Pb(n,e){return sr(n,"POST","/v1/accounts:signInWithEmailLink",In(n,e))}/**
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
 */class Os extends No{constructor(e,t,s,i=null){super("password",s),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Os(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new Os(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return gl(e,t,"signInWithPassword",kb);case"emailLink":return Cb(e,{email:this._email,oobCode:this._password});default:mt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return gl(e,s,"signUpPassword",Sb);case"emailLink":return Pb(e,{idToken:t,email:this._email,oobCode:this._password});default:mt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ds(n,e){return sr(n,"POST","/v1/accounts:signInWithIdp",In(n,e))}/**
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
 */const Rb="http://localhost";class gn extends No{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new gn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):mt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:i}=t,r=tc(t,["providerId","signInMethod"]);if(!s||!i)return null;const o=new gn(s,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Ds(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,Ds(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ds(e,t)}buildRequest(){const e={requestUri:Rb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=tr(t)}return e}}/**
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
 */function xb(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Db(n){const e=ki(Ci(n)).link,t=e?ki(Ci(e)).deep_link_id:null,s=ki(Ci(n)).deep_link_id;return(s?ki(Ci(s)).link:null)||s||t||e||n}class Mo{constructor(e){var t,s,i,r,o,l;const c=ki(Ci(e)),u=(t=c.apiKey)!==null&&t!==void 0?t:null,p=(s=c.oobCode)!==null&&s!==void 0?s:null,m=xb((i=c.mode)!==null&&i!==void 0?i:null);X(u&&p&&m,"argument-error"),this.apiKey=u,this.operation=m,this.code=p,this.continueUrl=(r=c.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=Db(e);try{return new Mo(t)}catch{return null}}}/**
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
 */class cs{constructor(){this.providerId=cs.PROVIDER_ID}static credential(e,t){return Os._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=Mo.parseLink(t);return X(s,"argument-error"),Os._fromEmailAndCode(e,s.code,s.tenantId)}}cs.PROVIDER_ID="password";cs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";cs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Oo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ir extends Oo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class $t extends ir{constructor(){super("facebook.com")}static credential(e){return gn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return $t.credential(e.oauthAccessToken)}catch{return null}}}$t.FACEBOOK_SIGN_IN_METHOD="facebook.com";$t.PROVIDER_ID="facebook.com";/**
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
 */class Tt extends ir{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return gn._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Tt.credential(t,s)}catch{return null}}}Tt.GOOGLE_SIGN_IN_METHOD="google.com";Tt.PROVIDER_ID="google.com";/**
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
 */class Bt extends ir{constructor(){super("github.com")}static credential(e){return gn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.GITHUB_SIGN_IN_METHOD="github.com";Bt.PROVIDER_ID="github.com";/**
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
 */class Ut extends ir{constructor(){super("twitter.com")}static credential(e,t){return gn._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Ut.credential(t,s)}catch{return null}}}Ut.TWITTER_SIGN_IN_METHOD="twitter.com";Ut.PROVIDER_ID="twitter.com";/**
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
 */async function Lb(n,e){return sr(n,"POST","/v1/accounts:signUp",In(n,e))}/**
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
 */class Jn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,i=!1){const r=await jt._fromIdTokenResponse(e,s,i),o=Cd(s);return new Jn({user:r,providerId:o,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const i=Cd(s);return new Jn({user:e,providerId:i,_tokenResponse:s,operationType:t})}}function Cd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class fo extends Jt{constructor(e,t,s,i){var r;super(t.code,t.message),this.operationType=s,this.user=i,Object.setPrototypeOf(this,fo.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,i){return new fo(e,t,s,i)}}function Kp(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?fo._fromErrorAndOperation(n,r,e,s):r})}async function Vb(n,e,t=!1){const s=await Ms(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Jn._forOperation(n,"link",s)}/**
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
 */async function Nb(n,e,t=!1){const{auth:s}=n;if(pt(s.app))return Promise.reject(Ct(s));const i="reauthenticate";try{const r=await Ms(n,Kp(s,i,e,n),t);X(r.idToken,s,"internal-error");const o=rc(r.idToken);X(o,s,"internal-error");const{sub:l}=o;return X(n.uid===l,s,"user-mismatch"),Jn._forOperation(n,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&mt(s,"user-mismatch"),r}}/**
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
 */async function Wp(n,e,t=!1){if(pt(n.app))return Promise.reject(Ct(n));const s="signIn",i=await Kp(n,s,e),r=await Jn._fromIdTokenResponse(n,s,i);return t||await n._updateCurrentUser(r.user),r}async function Qp(n,e){return Wp(Lt(n),e)}/**
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
 */async function Yp(n){const e=Lt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Jp(n,e,t){if(pt(n.app))return Promise.reject(Ct(n));const s=Lt(n),o=await gl(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Lb).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Yp(n),c}),l=await Jn._fromIdTokenResponse(s,"signIn",o);return await s._updateCurrentUser(l.user),l}function Xp(n,e,t){return pt(n.app)?Promise.reject(Ct(n)):Qp(Ce(n),cs.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&Yp(n),s})}/**
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
 */async function Mb(n,e){return Xt(n,"POST","/v1/accounts:update",e)}/**
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
 */async function Zp(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const s=Ce(n),r={idToken:await s.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await Ms(s,Mb(s.auth,r));s.displayName=o.displayName||null,s.photoURL=o.photoUrl||null;const l=s.providerData.find(({providerId:c})=>c==="password");l&&(l.displayName=s.displayName,l.photoURL=s.photoURL),await s._updateTokensIfNecessary(o)}function ef(n,e,t,s){return Ce(n).onIdTokenChanged(e,t,s)}function tf(n,e,t){return Ce(n).beforeAuthStateChanged(e,t)}function nf(n,e,t,s){return Ce(n).onAuthStateChanged(e,t,s)}function sf(n){return Ce(n).signOut()}const mo="__sak";/**
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
 */class rf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(mo,"1"),this.storage.removeItem(mo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Ob=1e3,Fb=10;class of extends rf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Up(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),i=this.localCache[t];s!==i&&e(t,i,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const s=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(s);!t&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);ub()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Fb):i()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},Ob)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}of.type="LOCAL";const af=of;/**
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
 */class lf extends rf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}lf.type="SESSION";const ac=lf;/**
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
 */function $b(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Fo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const s=new Fo(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:i,data:r}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:i});const l=Array.from(o).map(async u=>u(t.origin,r)),c=await $b(l);t.ports[0].postMessage({status:"done",eventId:s,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Fo.receivers=[];/**
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
 */function lc(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Bb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((l,c)=>{const u=lc("",20);i.port1.start();const p=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:i,onMessage(m){const g=m;if(g.data.eventId===u)switch(g.data.status){case"ack":clearTimeout(p),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),l(g.data.response);break;default:clearTimeout(p),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Pt(){return window}function Ub(n){Pt().location.href=n}/**
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
 */function cf(){return typeof Pt().WorkerGlobalScope<"u"&&typeof Pt().importScripts=="function"}async function qb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function jb(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function zb(){return cf()?self:null}/**
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
 */const uf="firebaseLocalStorageDb",Gb=1,go="firebaseLocalStorage",df="fbase_key";class rr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function $o(n,e){return n.transaction([go],e?"readwrite":"readonly").objectStore(go)}function Hb(){const n=indexedDB.deleteDatabase(uf);return new rr(n).toPromise()}function vl(){const n=indexedDB.open(uf,Gb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(go,{keyPath:df})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(go)?e(s):(s.close(),await Hb(),e(await vl()))})})}async function Pd(n,e,t){const s=$o(n,!0).put({[df]:e,value:t});return new rr(s).toPromise()}async function Kb(n,e){const t=$o(n,!1).get(e),s=await new rr(t).toPromise();return s===void 0?null:s.value}function Rd(n,e){const t=$o(n,!0).delete(e);return new rr(t).toPromise()}const Wb=800,Qb=3;class hf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await vl(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>Qb)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return cf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fo._getInstance(zb()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await qb(),!this.activeServiceWorker)return;this.sender=new Bb(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((t=s[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||jb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await vl();return await Pd(e,mo,"1"),await Rd(e,mo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>Pd(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>Kb(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Rd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=$o(i,!1).getAll();return new rr(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:i,value:r}of e)s.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!s.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Wb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}hf.type="LOCAL";const pf=hf;new nr(3e4,6e4);/**
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
 */function cc(n,e){return e?zt(e):(X(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class uc extends No{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ds(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ds(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ds(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Yb(n){return Wp(n.auth,new uc(n),n.bypassAuthState)}function Jb(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),Nb(t,new uc(n),n.bypassAuthState)}async function Xb(n){const{auth:e,user:t}=n;return X(t,e,"internal-error"),Vb(t,new uc(n),n.bypassAuthState)}/**
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
 */class ff{constructor(e,t,s,i,r=!1){this.auth=e,this.resolver=s,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:i,tenantId:r,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:s,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Yb;case"linkViaPopup":case"linkViaRedirect":return Xb;case"reauthViaPopup":case"reauthViaRedirect":return Jb;default:mt(this.auth,"internal-error")}}resolve(e){Qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Zb=new nr(2e3,1e4);async function mf(n,e,t){if(pt(n.app))return Promise.reject(_t(n,"operation-not-supported-in-this-environment"));const s=Lt(n);Ap(n,e,Oo);const i=cc(s,t);return new Kn(s,"signInViaPopup",e,i).executeNotNull()}class Kn extends ff{constructor(e,t,s,i,r){super(e,t,i,r),this.provider=s,this.authWindow=null,this.pollId=null,Kn.currentPopupAction&&Kn.currentPopupAction.cancel(),Kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){Qt(this.filter.length===1,"Popup operations only handle one event");const e=lc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(_t(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_t(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if(!((s=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_t(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zb.get())};e()}}Kn.currentPopupAction=null;/**
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
 */const ew="pendingRedirect",Qr=new Map;class tw extends ff{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Qr.get(this.auth._key());if(!e){try{const s=await nw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Qr.set(this.auth._key(),e)}return this.bypassAuthState||Qr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function nw(n,e){const t=vf(e),s=gf(n);if(!await s._isAvailable())return!1;const i=await s._get(t)==="true";return await s._remove(t),i}async function sw(n,e){return gf(n)._set(vf(e),"true")}function iw(n,e){Qr.set(n._key(),e)}function gf(n){return zt(n._redirectPersistence)}function vf(n){return Wr(ew,n.config.apiKey,n.name)}/**
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
 */function yf(n,e,t){return rw(n,e,t)}async function rw(n,e,t){if(pt(n.app))return Promise.reject(Ct(n));const s=Lt(n);Ap(n,e,Oo),await s._initializationPromise;const i=cc(s,t);return await sw(i,s),i._openRedirect(s,e,"signInViaRedirect")}async function _f(n,e){return await Lt(n)._initializationPromise,bf(n,e,!1)}async function bf(n,e,t=!1){if(pt(n.app))return Promise.reject(Ct(n));const s=Lt(n),i=cc(s,e),o=await new tw(s,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
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
 */const ow=10*60*1e3;class aw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!lw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!wf(e)){const i=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";t.onError(_t(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ow&&this.cachedEventUids.clear(),this.cachedEventUids.has(xd(e))}saveEventToCache(e){this.cachedEventUids.add(xd(e)),this.lastProcessedEventTime=Date.now()}}function xd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function wf({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function lw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return wf(n);default:return!1}}/**
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
 */async function cw(n,e={}){return Xt(n,"GET","/v1/projects",e)}/**
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
 */const uw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dw=/^https?/;async function hw(n){if(n.config.emulator)return;const{authorizedDomains:e}=await cw(n);for(const t of e)try{if(pw(t))return}catch{}mt(n,"unauthorized-domain")}function pw(n){const e=pl(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===s}if(!dw.test(t))return!1;if(uw.test(n))return s===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}/**
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
 */const fw=new nr(3e4,6e4);function Dd(){const n=Pt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function mw(n){return new Promise((e,t)=>{var s,i,r;function o(){Dd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Dd(),t(_t(n,"network-request-failed"))},timeout:fw.get()})}if(!((i=(s=Pt().gapi)===null||s===void 0?void 0:s.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=Pt().gapi)===null||r===void 0)&&r.load)o();else{const l=_b("iframefcb");return Pt()[l]=()=>{gapi.load?o():t(_t(n,"network-request-failed"))},jp(`${yb()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw Yr=null,e})}let Yr=null;function gw(n){return Yr=Yr||mw(n),Yr}/**
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
 */const vw=new nr(5e3,15e3),yw="__/auth/iframe",_w="emulator/auth/iframe",bw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ww=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Iw(n){const e=n.config;X(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ic(e,_w):`https://${n.config.authDomain}/${yw}`,s={apiKey:e.apiKey,appName:n.name,v:Qs},i=ww.get(n.config.apiHost);i&&(s.eid=i);const r=n._getFrameworks();return r.length&&(s.fw=r.join(",")),`${t}?${tr(s).slice(1)}`}async function Ew(n){const e=await gw(n),t=Pt().gapi;return X(t,n,"internal-error"),e.open({where:document.body,url:Iw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bw,dontclear:!0},s=>new Promise(async(i,r)=>{await s.restyle({setHideOnLeave:!1});const o=_t(n,"network-request-failed"),l=Pt().setTimeout(()=>{r(o)},vw.get());function c(){Pt().clearTimeout(l),i(s)}s.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const Tw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Aw=500,Sw=600,kw="_blank",Cw="http://localhost";class Ld{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Pw(n,e,t,s=Aw,i=Sw){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let l="";const c=Object.assign(Object.assign({},Tw),{width:s.toString(),height:i.toString(),top:r,left:o}),u=xe().toLowerCase();t&&(l=Mp(u)?kw:t),Vp(u)&&(e=e||Cw,c.scrollbars="yes");const p=Object.entries(c).reduce((g,[_,y])=>`${g}${_}=${y},`,"");if(cb(u)&&l!=="_self")return Rw(e||"",l),new Ld(null);const m=window.open(e||"",l,p);X(m,n,"popup-blocked");try{m.focus()}catch{}return new Ld(m)}function Rw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
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
 */const xw="__/auth/handler",Dw="emulator/auth/handler",Lw=encodeURIComponent("fac");async function Vd(n,e,t,s,i,r){X(n.config.authDomain,n,"auth-domain-config-required"),X(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:Qs,eventId:i};if(e instanceof Oo){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Vy(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof ir){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const c=await n._getAppCheckToken(),u=c?`#${Lw}=${encodeURIComponent(c)}`:"";return`${Vw(n)}?${tr(l).slice(1)}${u}`}function Vw({config:n}){return n.emulator?ic(n,Dw):`https://${n.authDomain}/${xw}`}/**
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
 */const Xa="webStorageSupport";class Nw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ac,this._completeRedirectFn=bf,this._overrideRedirectResult=iw}async _openPopup(e,t,s,i){var r;Qt((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Vd(e,t,s,pl(),i);return Pw(e,o,lc())}async _openRedirect(e,t,s,i){await this._originValidation(e);const r=await Vd(e,t,s,pl(),i);return Ub(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:r}=this.eventManagers[t];return i?Promise.resolve(i):(Qt(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Ew(e),s=new aw(e);return t.register("authEvent",i=>(X(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:s.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Xa,{type:Xa},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[Xa];o!==void 0&&t(!!o),mt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Up()||Np()||oc()}}const If=Nw;var Nd="@firebase/auth",Md="1.7.9";/**
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
 */class Mw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Ow(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Fw(n){Ns(new Yn("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=s.options;X(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qp(n)},u=new mb(s,i,r,c);return Eb(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),Ns(new Yn("auth-internal",e=>{const t=Lt(e.getProvider("auth").getImmediate());return(s=>new Mw(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),fn(Nd,Md,Ow(n)),fn(Nd,Md,"esm2017")}/**
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
 */const $w=5*60,Bw=pp("authIdTokenMaxAge")||$w;let Od=null;const Uw=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>Bw)return;const i=t==null?void 0:t.token;Od!==i&&(Od=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Ef(n=_p()){const e=ec(n,"auth");if(e.isInitialized())return e.getImmediate();const t=zp(n,{popupRedirectResolver:If,persistence:[pf,af,ac]}),s=pp("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=Uw(r.toString());tf(t,o,()=>o(t.currentUser)),ef(t,l=>o(l))}}const i=dp("auth");return i&&Gp(t,`http://${i}`),t}function qw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}gb({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=i=>{const r=_t("internal-error");r.customData=i,t(r)},s.type="text/javascript",s.charset="UTF-8",qw().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Fw("Browser");const jw=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeURL:Mo,AuthCredential:No,EmailAuthCredential:Os,EmailAuthProvider:cs,FacebookAuthProvider:$t,GithubAuthProvider:Bt,GoogleAuthProvider:Tt,OAuthCredential:gn,TwitterAuthProvider:Ut,beforeAuthStateChanged:tf,browserLocalPersistence:af,browserPopupRedirectResolver:If,browserSessionPersistence:ac,connectAuthEmulator:Gp,createUserWithEmailAndPassword:Jp,getAuth:Ef,getIdTokenResult:Rp,getRedirectResult:_f,inMemoryPersistence:ml,indexedDBLocalPersistence:pf,initializeAuth:zp,onAuthStateChanged:nf,onIdTokenChanged:ef,prodErrorMap:Ep,reload:xp,signInWithCredential:Qp,signInWithEmailAndPassword:Xp,signInWithPopup:mf,signInWithRedirect:yf,signOut:sf,updateProfile:Zp},Symbol.toStringTag,{value:"Module"}));var Fd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Wn,Tf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,b){function I(){}I.prototype=b.prototype,w.D=b.prototype,w.prototype=new I,w.prototype.constructor=w,w.C=function(S,k,P){for(var E=Array(arguments.length-2),Ze=2;Ze<arguments.length;Ze++)E[Ze-2]=arguments[Ze];return b.prototype[k].apply(S,E)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(s,t),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,b,I){I||(I=0);var S=Array(16);if(typeof b=="string")for(var k=0;16>k;++k)S[k]=b.charCodeAt(I++)|b.charCodeAt(I++)<<8|b.charCodeAt(I++)<<16|b.charCodeAt(I++)<<24;else for(k=0;16>k;++k)S[k]=b[I++]|b[I++]<<8|b[I++]<<16|b[I++]<<24;b=w.g[0],I=w.g[1],k=w.g[2];var P=w.g[3],E=b+(P^I&(k^P))+S[0]+3614090360&4294967295;b=I+(E<<7&4294967295|E>>>25),E=P+(k^b&(I^k))+S[1]+3905402710&4294967295,P=b+(E<<12&4294967295|E>>>20),E=k+(I^P&(b^I))+S[2]+606105819&4294967295,k=P+(E<<17&4294967295|E>>>15),E=I+(b^k&(P^b))+S[3]+3250441966&4294967295,I=k+(E<<22&4294967295|E>>>10),E=b+(P^I&(k^P))+S[4]+4118548399&4294967295,b=I+(E<<7&4294967295|E>>>25),E=P+(k^b&(I^k))+S[5]+1200080426&4294967295,P=b+(E<<12&4294967295|E>>>20),E=k+(I^P&(b^I))+S[6]+2821735955&4294967295,k=P+(E<<17&4294967295|E>>>15),E=I+(b^k&(P^b))+S[7]+4249261313&4294967295,I=k+(E<<22&4294967295|E>>>10),E=b+(P^I&(k^P))+S[8]+1770035416&4294967295,b=I+(E<<7&4294967295|E>>>25),E=P+(k^b&(I^k))+S[9]+2336552879&4294967295,P=b+(E<<12&4294967295|E>>>20),E=k+(I^P&(b^I))+S[10]+4294925233&4294967295,k=P+(E<<17&4294967295|E>>>15),E=I+(b^k&(P^b))+S[11]+2304563134&4294967295,I=k+(E<<22&4294967295|E>>>10),E=b+(P^I&(k^P))+S[12]+1804603682&4294967295,b=I+(E<<7&4294967295|E>>>25),E=P+(k^b&(I^k))+S[13]+4254626195&4294967295,P=b+(E<<12&4294967295|E>>>20),E=k+(I^P&(b^I))+S[14]+2792965006&4294967295,k=P+(E<<17&4294967295|E>>>15),E=I+(b^k&(P^b))+S[15]+1236535329&4294967295,I=k+(E<<22&4294967295|E>>>10),E=b+(k^P&(I^k))+S[1]+4129170786&4294967295,b=I+(E<<5&4294967295|E>>>27),E=P+(I^k&(b^I))+S[6]+3225465664&4294967295,P=b+(E<<9&4294967295|E>>>23),E=k+(b^I&(P^b))+S[11]+643717713&4294967295,k=P+(E<<14&4294967295|E>>>18),E=I+(P^b&(k^P))+S[0]+3921069994&4294967295,I=k+(E<<20&4294967295|E>>>12),E=b+(k^P&(I^k))+S[5]+3593408605&4294967295,b=I+(E<<5&4294967295|E>>>27),E=P+(I^k&(b^I))+S[10]+38016083&4294967295,P=b+(E<<9&4294967295|E>>>23),E=k+(b^I&(P^b))+S[15]+3634488961&4294967295,k=P+(E<<14&4294967295|E>>>18),E=I+(P^b&(k^P))+S[4]+3889429448&4294967295,I=k+(E<<20&4294967295|E>>>12),E=b+(k^P&(I^k))+S[9]+568446438&4294967295,b=I+(E<<5&4294967295|E>>>27),E=P+(I^k&(b^I))+S[14]+3275163606&4294967295,P=b+(E<<9&4294967295|E>>>23),E=k+(b^I&(P^b))+S[3]+4107603335&4294967295,k=P+(E<<14&4294967295|E>>>18),E=I+(P^b&(k^P))+S[8]+1163531501&4294967295,I=k+(E<<20&4294967295|E>>>12),E=b+(k^P&(I^k))+S[13]+2850285829&4294967295,b=I+(E<<5&4294967295|E>>>27),E=P+(I^k&(b^I))+S[2]+4243563512&4294967295,P=b+(E<<9&4294967295|E>>>23),E=k+(b^I&(P^b))+S[7]+1735328473&4294967295,k=P+(E<<14&4294967295|E>>>18),E=I+(P^b&(k^P))+S[12]+2368359562&4294967295,I=k+(E<<20&4294967295|E>>>12),E=b+(I^k^P)+S[5]+4294588738&4294967295,b=I+(E<<4&4294967295|E>>>28),E=P+(b^I^k)+S[8]+2272392833&4294967295,P=b+(E<<11&4294967295|E>>>21),E=k+(P^b^I)+S[11]+1839030562&4294967295,k=P+(E<<16&4294967295|E>>>16),E=I+(k^P^b)+S[14]+4259657740&4294967295,I=k+(E<<23&4294967295|E>>>9),E=b+(I^k^P)+S[1]+2763975236&4294967295,b=I+(E<<4&4294967295|E>>>28),E=P+(b^I^k)+S[4]+1272893353&4294967295,P=b+(E<<11&4294967295|E>>>21),E=k+(P^b^I)+S[7]+4139469664&4294967295,k=P+(E<<16&4294967295|E>>>16),E=I+(k^P^b)+S[10]+3200236656&4294967295,I=k+(E<<23&4294967295|E>>>9),E=b+(I^k^P)+S[13]+681279174&4294967295,b=I+(E<<4&4294967295|E>>>28),E=P+(b^I^k)+S[0]+3936430074&4294967295,P=b+(E<<11&4294967295|E>>>21),E=k+(P^b^I)+S[3]+3572445317&4294967295,k=P+(E<<16&4294967295|E>>>16),E=I+(k^P^b)+S[6]+76029189&4294967295,I=k+(E<<23&4294967295|E>>>9),E=b+(I^k^P)+S[9]+3654602809&4294967295,b=I+(E<<4&4294967295|E>>>28),E=P+(b^I^k)+S[12]+3873151461&4294967295,P=b+(E<<11&4294967295|E>>>21),E=k+(P^b^I)+S[15]+530742520&4294967295,k=P+(E<<16&4294967295|E>>>16),E=I+(k^P^b)+S[2]+3299628645&4294967295,I=k+(E<<23&4294967295|E>>>9),E=b+(k^(I|~P))+S[0]+4096336452&4294967295,b=I+(E<<6&4294967295|E>>>26),E=P+(I^(b|~k))+S[7]+1126891415&4294967295,P=b+(E<<10&4294967295|E>>>22),E=k+(b^(P|~I))+S[14]+2878612391&4294967295,k=P+(E<<15&4294967295|E>>>17),E=I+(P^(k|~b))+S[5]+4237533241&4294967295,I=k+(E<<21&4294967295|E>>>11),E=b+(k^(I|~P))+S[12]+1700485571&4294967295,b=I+(E<<6&4294967295|E>>>26),E=P+(I^(b|~k))+S[3]+2399980690&4294967295,P=b+(E<<10&4294967295|E>>>22),E=k+(b^(P|~I))+S[10]+4293915773&4294967295,k=P+(E<<15&4294967295|E>>>17),E=I+(P^(k|~b))+S[1]+2240044497&4294967295,I=k+(E<<21&4294967295|E>>>11),E=b+(k^(I|~P))+S[8]+1873313359&4294967295,b=I+(E<<6&4294967295|E>>>26),E=P+(I^(b|~k))+S[15]+4264355552&4294967295,P=b+(E<<10&4294967295|E>>>22),E=k+(b^(P|~I))+S[6]+2734768916&4294967295,k=P+(E<<15&4294967295|E>>>17),E=I+(P^(k|~b))+S[13]+1309151649&4294967295,I=k+(E<<21&4294967295|E>>>11),E=b+(k^(I|~P))+S[4]+4149444226&4294967295,b=I+(E<<6&4294967295|E>>>26),E=P+(I^(b|~k))+S[11]+3174756917&4294967295,P=b+(E<<10&4294967295|E>>>22),E=k+(b^(P|~I))+S[2]+718787259&4294967295,k=P+(E<<15&4294967295|E>>>17),E=I+(P^(k|~b))+S[9]+3951481745&4294967295,w.g[0]=w.g[0]+b&4294967295,w.g[1]=w.g[1]+(k+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+k&4294967295,w.g[3]=w.g[3]+P&4294967295}s.prototype.u=function(w,b){b===void 0&&(b=w.length);for(var I=b-this.blockSize,S=this.B,k=this.h,P=0;P<b;){if(k==0)for(;P<=I;)i(this,w,P),P+=this.blockSize;if(typeof w=="string"){for(;P<b;)if(S[k++]=w.charCodeAt(P++),k==this.blockSize){i(this,S),k=0;break}}else for(;P<b;)if(S[k++]=w[P++],k==this.blockSize){i(this,S),k=0;break}}this.h=k,this.o+=b},s.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var b=1;b<w.length-8;++b)w[b]=0;var I=8*this.o;for(b=w.length-8;b<w.length;++b)w[b]=I&255,I/=256;for(this.u(w),w=Array(16),b=I=0;4>b;++b)for(var S=0;32>S;S+=8)w[I++]=this.g[b]>>>S&255;return w};function r(w,b){var I=l;return Object.prototype.hasOwnProperty.call(I,w)?I[w]:I[w]=b(w)}function o(w,b){this.h=b;for(var I=[],S=!0,k=w.length-1;0<=k;k--){var P=w[k]|0;S&&P==b||(I[k]=P,S=!1)}this.g=I}var l={};function c(w){return-128<=w&&128>w?r(w,function(b){return new o([b|0],0>b?-1:0)}):new o([w|0],0>w?-1:0)}function u(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return C(u(-w));for(var b=[],I=1,S=0;w>=I;S++)b[S]=w/I|0,I*=4294967296;return new o(b,0)}function p(w,b){if(w.length==0)throw Error("number format error: empty string");if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(w.charAt(0)=="-")return C(p(w.substring(1),b));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=u(Math.pow(b,8)),S=m,k=0;k<w.length;k+=8){var P=Math.min(8,w.length-k),E=parseInt(w.substring(k,k+P),b);8>P?(P=u(Math.pow(b,P)),S=S.j(P).add(u(E))):(S=S.j(I),S=S.add(u(E)))}return S}var m=c(0),g=c(1),_=c(16777216);n=o.prototype,n.m=function(){if(x(this))return-C(this).m();for(var w=0,b=1,I=0;I<this.g.length;I++){var S=this.i(I);w+=(0<=S?S:4294967296+S)*b,b*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(y(this))return"0";if(x(this))return"-"+C(this).toString(w);for(var b=u(Math.pow(w,6)),I=this,S="";;){var k=$(I,b).g;I=L(I,k.j(b));var P=((0<I.g.length?I.g[0]:I.h)>>>0).toString(w);if(I=k,y(I))return P+S;for(;6>P.length;)P="0"+P;S=P+S}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function y(w){if(w.h!=0)return!1;for(var b=0;b<w.g.length;b++)if(w.g[b]!=0)return!1;return!0}function x(w){return w.h==-1}n.l=function(w){return w=L(this,w),x(w)?-1:y(w)?0:1};function C(w){for(var b=w.g.length,I=[],S=0;S<b;S++)I[S]=~w.g[S];return new o(I,~w.h).add(g)}n.abs=function(){return x(this)?C(this):this},n.add=function(w){for(var b=Math.max(this.g.length,w.g.length),I=[],S=0,k=0;k<=b;k++){var P=S+(this.i(k)&65535)+(w.i(k)&65535),E=(P>>>16)+(this.i(k)>>>16)+(w.i(k)>>>16);S=E>>>16,P&=65535,E&=65535,I[k]=E<<16|P}return new o(I,I[I.length-1]&-2147483648?-1:0)};function L(w,b){return w.add(C(b))}n.j=function(w){if(y(this)||y(w))return m;if(x(this))return x(w)?C(this).j(C(w)):C(C(this).j(w));if(x(w))return C(this.j(C(w)));if(0>this.l(_)&&0>w.l(_))return u(this.m()*w.m());for(var b=this.g.length+w.g.length,I=[],S=0;S<2*b;S++)I[S]=0;for(S=0;S<this.g.length;S++)for(var k=0;k<w.g.length;k++){var P=this.i(S)>>>16,E=this.i(S)&65535,Ze=w.i(k)>>>16,wt=w.i(k)&65535;I[2*S+2*k]+=E*wt,T(I,2*S+2*k),I[2*S+2*k+1]+=P*wt,T(I,2*S+2*k+1),I[2*S+2*k+1]+=E*Ze,T(I,2*S+2*k+1),I[2*S+2*k+2]+=P*Ze,T(I,2*S+2*k+2)}for(S=0;S<b;S++)I[S]=I[2*S+1]<<16|I[2*S];for(S=b;S<2*b;S++)I[S]=0;return new o(I,0)};function T(w,b){for(;(w[b]&65535)!=w[b];)w[b+1]+=w[b]>>>16,w[b]&=65535,b++}function V(w,b){this.g=w,this.h=b}function $(w,b){if(y(b))throw Error("division by zero");if(y(w))return new V(m,m);if(x(w))return b=$(C(w),b),new V(C(b.g),C(b.h));if(x(b))return b=$(w,C(b)),new V(C(b.g),b.h);if(30<w.g.length){if(x(w)||x(b))throw Error("slowDivide_ only works with positive integers.");for(var I=g,S=b;0>=S.l(w);)I=G(I),S=G(S);var k=Q(I,1),P=Q(S,1);for(S=Q(S,2),I=Q(I,2);!y(S);){var E=P.add(S);0>=E.l(w)&&(k=k.add(I),P=E),S=Q(S,1),I=Q(I,1)}return b=L(w,k.j(b)),new V(k,b)}for(k=m;0<=w.l(b);){for(I=Math.max(1,Math.floor(w.m()/b.m())),S=Math.ceil(Math.log(I)/Math.LN2),S=48>=S?1:Math.pow(2,S-48),P=u(I),E=P.j(b);x(E)||0<E.l(w);)I-=S,P=u(I),E=P.j(b);y(P)&&(P=g),k=k.add(P),w=L(w,E)}return new V(k,w)}n.A=function(w){return $(this,w).h},n.and=function(w){for(var b=Math.max(this.g.length,w.g.length),I=[],S=0;S<b;S++)I[S]=this.i(S)&w.i(S);return new o(I,this.h&w.h)},n.or=function(w){for(var b=Math.max(this.g.length,w.g.length),I=[],S=0;S<b;S++)I[S]=this.i(S)|w.i(S);return new o(I,this.h|w.h)},n.xor=function(w){for(var b=Math.max(this.g.length,w.g.length),I=[],S=0;S<b;S++)I[S]=this.i(S)^w.i(S);return new o(I,this.h^w.h)};function G(w){for(var b=w.g.length+1,I=[],S=0;S<b;S++)I[S]=w.i(S)<<1|w.i(S-1)>>>31;return new o(I,w.h)}function Q(w,b){var I=b>>5;b%=32;for(var S=w.g.length-I,k=[],P=0;P<S;P++)k[P]=0<b?w.i(P+I)>>>b|w.i(P+I+1)<<32-b:w.i(P+I);return new o(k,w.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,Tf=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=p,Wn=o}).apply(typeof Fd<"u"?Fd:typeof self<"u"?self:typeof window<"u"?window:{});var Or=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Af,Pi,Sf,Jr,yl,kf,Cf,Pf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,f){return a==Array.prototype||a==Object.prototype||(a[h]=f.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Or=="object"&&Or];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var s=t(this);function i(a,h){if(h)e:{var f=s;a=a.split(".");for(var v=0;v<a.length-1;v++){var R=a[v];if(!(R in f))break e;f=f[R]}a=a[a.length-1],v=f[a],h=h(v),h!=v&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}function r(a,h){a instanceof String&&(a+="");var f=0,v=!1,R={next:function(){if(!v&&f<a.length){var N=f++;return{value:h(N,a[N]),done:!1}}return v=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(a){return a||function(){return r(this,function(h,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function u(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function p(a,h,f){return a.call.apply(a.bind,arguments)}function m(a,h,f){if(!a)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,v),a.apply(h,R)}}return function(){return a.apply(h,arguments)}}function g(a,h,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,g.apply(null,arguments)}function _(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var v=f.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function y(a,h){function f(){}f.prototype=h.prototype,a.aa=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(v,R,N){for(var U=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)U[ge-2]=arguments[ge];return h.prototype[R].apply(v,U)}}function x(a){const h=a.length;if(0<h){const f=Array(h);for(let v=0;v<h;v++)f[v]=a[v];return f}return[]}function C(a,h){for(let f=1;f<arguments.length;f++){const v=arguments[f];if(c(v)){const R=a.length||0,N=v.length||0;a.length=R+N;for(let U=0;U<N;U++)a[R+U]=v[U]}else a.push(v)}}class L{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function T(a){return/^[\s\xa0]*$/.test(a)}function V(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function $(a){return $[" "](a),a}$[" "]=function(){};var G=V().indexOf("Gecko")!=-1&&!(V().toLowerCase().indexOf("webkit")!=-1&&V().indexOf("Edge")==-1)&&!(V().indexOf("Trident")!=-1||V().indexOf("MSIE")!=-1)&&V().indexOf("Edge")==-1;function Q(a,h,f){for(const v in a)h.call(f,a[v],v,a)}function w(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function b(a){const h={};for(const f in a)h[f]=a[f];return h}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function S(a,h){let f,v;for(let R=1;R<arguments.length;R++){v=arguments[R];for(f in v)a[f]=v[f];for(let N=0;N<I.length;N++)f=I[N],Object.prototype.hasOwnProperty.call(v,f)&&(a[f]=v[f])}}function k(a){var h=1;a=a.split(":");const f=[];for(;0<h&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function P(a){l.setTimeout(()=>{throw a},0)}function E(){var a=Nt;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Ze{constructor(){this.h=this.g=null}add(h,f){const v=wt.get();v.set(h,f),this.h?this.h.next=v:this.g=v,this.h=v}}var wt=new L(()=>new Ln,a=>a.reset());class Ln{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let te,ae=!1,Nt=new Ze,vr=()=>{const a=l.Promise.resolve(void 0);te=()=>{a.then(ba)}};var ba=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(f){P(f)}var h=wt;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}ae=!1};function It(){this.s=this.s,this.C=this.C}It.prototype.s=!1,It.prototype.ma=function(){this.s||(this.s=!0,this.N())},It.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Le(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}Le.prototype.h=function(){this.defaultPrevented=!0};var wa=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,h),l.removeEventListener("test",f,h)}catch{}return a}();function et(a,h){if(Le.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(G){e:{try{$(h.nodeName);var R=!0;break e}catch{}R=!1}R||(h=null)}}else f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement);this.relatedTarget=h,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ia[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&et.aa.h.call(this)}}y(et,Le);var Ia={2:"touch",3:"pen",4:"mouse"};et.prototype.h=function(){et.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var vt="closure_listenable_"+(1e6*Math.random()|0),cu=0;function Mv(a,h,f,v,R){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!v,this.ha=R,this.key=++cu,this.da=this.fa=!1}function yr(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function _r(a){this.src=a,this.g={},this.h=0}_r.prototype.add=function(a,h,f,v,R){var N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);var U=Ta(a,h,v,R);return-1<U?(h=a[U],f||(h.fa=!1)):(h=new Mv(h,this.src,N,!!v,R),h.fa=f,a.push(h)),h};function Ea(a,h){var f=h.type;if(f in a.g){var v=a.g[f],R=Array.prototype.indexOf.call(v,h,void 0),N;(N=0<=R)&&Array.prototype.splice.call(v,R,1),N&&(yr(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Ta(a,h,f,v){for(var R=0;R<a.length;++R){var N=a[R];if(!N.da&&N.listener==h&&N.capture==!!f&&N.ha==v)return R}return-1}var Aa="closure_lm_"+(1e6*Math.random()|0),Sa={};function uu(a,h,f,v,R){if(Array.isArray(h)){for(var N=0;N<h.length;N++)uu(a,h[N],f,v,R);return null}return f=pu(f),a&&a[vt]?a.K(h,f,u(v)?!!v.capture:!1,R):Ov(a,h,f,!1,v,R)}function Ov(a,h,f,v,R,N){if(!h)throw Error("Invalid event type");var U=u(R)?!!R.capture:!!R,ge=Ca(a);if(ge||(a[Aa]=ge=new _r(a)),f=ge.add(h,f,v,U,N),f.proxy)return f;if(v=Fv(),f.proxy=v,v.src=a,v.listener=f,a.addEventListener)wa||(R=U),R===void 0&&(R=!1),a.addEventListener(h.toString(),v,R);else if(a.attachEvent)a.attachEvent(hu(h.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Fv(){function a(f){return h.call(a.src,a.listener,f)}const h=$v;return a}function du(a,h,f,v,R){if(Array.isArray(h))for(var N=0;N<h.length;N++)du(a,h[N],f,v,R);else v=u(v)?!!v.capture:!!v,f=pu(f),a&&a[vt]?(a=a.i,h=String(h).toString(),h in a.g&&(N=a.g[h],f=Ta(N,f,v,R),-1<f&&(yr(N[f]),Array.prototype.splice.call(N,f,1),N.length==0&&(delete a.g[h],a.h--)))):a&&(a=Ca(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Ta(h,f,v,R)),(f=-1<a?h[a]:null)&&ka(f))}function ka(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[vt])Ea(h.i,a);else{var f=a.type,v=a.proxy;h.removeEventListener?h.removeEventListener(f,v,a.capture):h.detachEvent?h.detachEvent(hu(f),v):h.addListener&&h.removeListener&&h.removeListener(v),(f=Ca(h))?(Ea(f,a),f.h==0&&(f.src=null,h[Aa]=null)):yr(a)}}}function hu(a){return a in Sa?Sa[a]:Sa[a]="on"+a}function $v(a,h){if(a.da)a=!0;else{h=new et(h,this);var f=a.listener,v=a.ha||a.src;a.fa&&ka(a),a=f.call(v,h)}return a}function Ca(a){return a=a[Aa],a instanceof _r?a:null}var Pa="__closure_events_fn_"+(1e9*Math.random()>>>0);function pu(a){return typeof a=="function"?a:(a[Pa]||(a[Pa]=function(h){return a.handleEvent(h)}),a[Pa])}function $e(){It.call(this),this.i=new _r(this),this.M=this,this.F=null}y($e,It),$e.prototype[vt]=!0,$e.prototype.removeEventListener=function(a,h,f,v){du(this,a,h,f,v)};function We(a,h){var f,v=a.F;if(v)for(f=[];v;v=v.F)f.push(v);if(a=a.M,v=h.type||h,typeof h=="string")h=new Le(h,a);else if(h instanceof Le)h.target=h.target||a;else{var R=h;h=new Le(v,a),S(h,R)}if(R=!0,f)for(var N=f.length-1;0<=N;N--){var U=h.g=f[N];R=br(U,v,!0,h)&&R}if(U=h.g=a,R=br(U,v,!0,h)&&R,R=br(U,v,!1,h)&&R,f)for(N=0;N<f.length;N++)U=h.g=f[N],R=br(U,v,!1,h)&&R}$e.prototype.N=function(){if($e.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var f=a.g[h],v=0;v<f.length;v++)yr(f[v]);delete a.g[h],a.h--}}this.F=null},$e.prototype.K=function(a,h,f,v){return this.i.add(String(a),h,!1,f,v)},$e.prototype.L=function(a,h,f,v){return this.i.add(String(a),h,!0,f,v)};function br(a,h,f,v){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var R=!0,N=0;N<h.length;++N){var U=h[N];if(U&&!U.da&&U.capture==f){var ge=U.listener,Me=U.ha||U.src;U.fa&&Ea(a.i,U),R=ge.call(Me,v)!==!1&&R}}return R&&!v.defaultPrevented}function fu(a,h,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(a,h||0)}function mu(a){a.g=fu(()=>{a.g=null,a.i&&(a.i=!1,mu(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Bv extends It{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:mu(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function oi(a){It.call(this),this.h=a,this.g={}}y(oi,It);var gu=[];function vu(a){Q(a.g,function(h,f){this.g.hasOwnProperty(f)&&ka(h)},a),a.g={}}oi.prototype.N=function(){oi.aa.N.call(this),vu(this)},oi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ra=l.JSON.stringify,Uv=l.JSON.parse,qv=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function xa(){}xa.prototype.h=null;function yu(a){return a.h||(a.h=a.i())}function _u(){}var ai={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Da(){Le.call(this,"d")}y(Da,Le);function La(){Le.call(this,"c")}y(La,Le);var Vn={},bu=null;function wr(){return bu=bu||new $e}Vn.La="serverreachability";function wu(a){Le.call(this,Vn.La,a)}y(wu,Le);function li(a){const h=wr();We(h,new wu(h))}Vn.STAT_EVENT="statevent";function Iu(a,h){Le.call(this,Vn.STAT_EVENT,a),this.stat=h}y(Iu,Le);function Qe(a){const h=wr();We(h,new Iu(h,a))}Vn.Ma="timingevent";function Eu(a,h){Le.call(this,Vn.Ma,a),this.size=h}y(Eu,Le);function ci(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},h)}function ui(){this.g=!0}ui.prototype.xa=function(){this.g=!1};function jv(a,h,f,v,R,N){a.info(function(){if(a.g)if(N)for(var U="",ge=N.split("&"),Me=0;Me<ge.length;Me++){var oe=ge[Me].split("=");if(1<oe.length){var Be=oe[0];oe=oe[1];var Ue=Be.split("_");U=2<=Ue.length&&Ue[1]=="type"?U+(Be+"="+oe+"&"):U+(Be+"=redacted&")}}else U=null;else U=N;return"XMLHTTP REQ ("+v+") [attempt "+R+"]: "+h+`
`+f+`
`+U})}function zv(a,h,f,v,R,N,U){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+R+"]: "+h+`
`+f+`
`+N+" "+U})}function fs(a,h,f,v){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Hv(a,f)+(v?" "+v:"")})}function Gv(a,h){a.info(function(){return"TIMEOUT: "+h})}ui.prototype.info=function(){};function Hv(a,h){if(!a.g)return h;if(!h)return null;try{var f=JSON.parse(h);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var v=f[a];if(!(2>v.length)){var R=v[1];if(Array.isArray(R)&&!(1>R.length)){var N=R[0];if(N!="noop"&&N!="stop"&&N!="close")for(var U=1;U<R.length;U++)R[U]=""}}}}return Ra(f)}catch{return h}}var Ir={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Tu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Va;function Er(){}y(Er,xa),Er.prototype.g=function(){return new XMLHttpRequest},Er.prototype.i=function(){return{}},Va=new Er;function tn(a,h,f,v){this.j=a,this.i=h,this.l=f,this.R=v||1,this.U=new oi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Au}function Au(){this.i=null,this.g="",this.h=!1}var Su={},Na={};function Ma(a,h,f){a.L=1,a.v=kr(Mt(h)),a.m=f,a.P=!0,ku(a,null)}function ku(a,h){a.F=Date.now(),Tr(a),a.A=Mt(a.v);var f=a.A,v=a.R;Array.isArray(v)||(v=[String(v)]),Uu(f.i,"t",v),a.C=0,f=a.j.J,a.h=new Au,a.g=rd(a.j,f?h:null,!a.m),0<a.O&&(a.M=new Bv(g(a.Y,a,a.g),a.O)),h=a.U,f=a.g,v=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(gu[0]=R.toString()),R=gu);for(var N=0;N<R.length;N++){var U=uu(f,R[N],v||h.handleEvent,!1,h.h||h);if(!U)break;h.g[U.key]=U}h=a.H?b(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),li(),jv(a.i,a.u,a.A,a.l,a.R,a.m)}tn.prototype.ca=function(a){a=a.target;const h=this.M;h&&Ot(a)==3?h.j():this.Y(a)},tn.prototype.Y=function(a){try{if(a==this.g)e:{const Ue=Ot(this.g);var h=this.g.Ba();const vs=this.g.Z();if(!(3>Ue)&&(Ue!=3||this.g&&(this.h.h||this.g.oa()||Wu(this.g)))){this.J||Ue!=4||h==7||(h==8||0>=vs?li(3):li(2)),Oa(this);var f=this.g.Z();this.X=f;t:if(Cu(this)){var v=Wu(this.g);a="";var R=v.length,N=Ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Nn(this),di(this);var U="";break t}this.h.i=new l.TextDecoder}for(h=0;h<R;h++)this.h.h=!0,a+=this.h.i.decode(v[h],{stream:!(N&&h==R-1)});v.length=0,this.h.g+=a,this.C=0,U=this.h.g}else U=this.g.oa();if(this.o=f==200,zv(this.i,this.u,this.A,this.l,this.R,Ue,f),this.o){if(this.T&&!this.K){t:{if(this.g){var ge,Me=this.g;if((ge=Me.g?Me.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(ge)){var oe=ge;break t}}oe=null}if(f=oe)fs(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Fa(this,f);else{this.o=!1,this.s=3,Qe(12),Nn(this),di(this);break e}}if(this.P){f=!0;let yt;for(;!this.J&&this.C<U.length;)if(yt=Kv(this,U),yt==Na){Ue==4&&(this.s=4,Qe(14),f=!1),fs(this.i,this.l,null,"[Incomplete Response]");break}else if(yt==Su){this.s=4,Qe(15),fs(this.i,this.l,U,"[Invalid Chunk]"),f=!1;break}else fs(this.i,this.l,yt,null),Fa(this,yt);if(Cu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ue!=4||U.length!=0||this.h.h||(this.s=1,Qe(16),f=!1),this.o=this.o&&f,!f)fs(this.i,this.l,U,"[Invalid Chunked Response]"),Nn(this),di(this);else if(0<U.length&&!this.W){this.W=!0;var Be=this.j;Be.g==this&&Be.ba&&!Be.M&&(Be.j.info("Great, no buffering proxy detected. Bytes received: "+U.length),za(Be),Be.M=!0,Qe(11))}}else fs(this.i,this.l,U,null),Fa(this,U);Ue==4&&Nn(this),this.o&&!this.J&&(Ue==4?td(this.j,this):(this.o=!1,Tr(this)))}else uy(this.g),f==400&&0<U.indexOf("Unknown SID")?(this.s=3,Qe(12)):(this.s=0,Qe(13)),Nn(this),di(this)}}}catch{}finally{}};function Cu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Kv(a,h){var f=a.C,v=h.indexOf(`
`,f);return v==-1?Na:(f=Number(h.substring(f,v)),isNaN(f)?Su:(v+=1,v+f>h.length?Na:(h=h.slice(v,v+f),a.C=v+f,h)))}tn.prototype.cancel=function(){this.J=!0,Nn(this)};function Tr(a){a.S=Date.now()+a.I,Pu(a,a.I)}function Pu(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ci(g(a.ba,a),h)}function Oa(a){a.B&&(l.clearTimeout(a.B),a.B=null)}tn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Gv(this.i,this.A),this.L!=2&&(li(),Qe(17)),Nn(this),this.s=2,di(this)):Pu(this,this.S-a)};function di(a){a.j.G==0||a.J||td(a.j,a)}function Nn(a){Oa(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,vu(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Fa(a,h){try{var f=a.j;if(f.G!=0&&(f.g==a||$a(f.h,a))){if(!a.K&&$a(f.h,a)&&f.G==3){try{var v=f.Da.g.parse(h)}catch{v=null}if(Array.isArray(v)&&v.length==3){var R=v;if(R[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)Lr(f),xr(f);else break e;ja(f),Qe(18)}}else f.za=R[1],0<f.za-f.T&&37500>R[2]&&f.F&&f.v==0&&!f.C&&(f.C=ci(g(f.Za,f),6e3));if(1>=Du(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else On(f,11)}else if((a.K||f.g==a)&&Lr(f),!T(h))for(R=f.Da.g.parse(h),h=0;h<R.length;h++){let oe=R[h];if(f.T=oe[0],oe=oe[1],f.G==2)if(oe[0]=="c"){f.K=oe[1],f.ia=oe[2];const Be=oe[3];Be!=null&&(f.la=Be,f.j.info("VER="+f.la));const Ue=oe[4];Ue!=null&&(f.Aa=Ue,f.j.info("SVER="+f.Aa));const vs=oe[5];vs!=null&&typeof vs=="number"&&0<vs&&(v=1.5*vs,f.L=v,f.j.info("backChannelRequestTimeoutMs_="+v)),v=f;const yt=a.g;if(yt){const Nr=yt.g?yt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Nr){var N=v.h;N.g||Nr.indexOf("spdy")==-1&&Nr.indexOf("quic")==-1&&Nr.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(Ba(N,N.h),N.h=null))}if(v.D){const Ga=yt.g?yt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ga&&(v.ya=Ga,ye(v.I,v.D,Ga))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),v=f;var U=a;if(v.qa=id(v,v.J?v.ia:null,v.W),U.K){Lu(v.h,U);var ge=U,Me=v.L;Me&&(ge.I=Me),ge.B&&(Oa(ge),Tr(ge)),v.g=U}else Zu(v);0<f.i.length&&Dr(f)}else oe[0]!="stop"&&oe[0]!="close"||On(f,7);else f.G==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?On(f,7):qa(f):oe[0]!="noop"&&f.l&&f.l.ta(oe),f.v=0)}}li(4)}catch{}}var Wv=class{constructor(a,h){this.g=a,this.map=h}};function Ru(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Du(a){return a.h?1:a.g?a.g.size:0}function $a(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Ba(a,h){a.g?a.g.add(h):a.h=h}function Lu(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Ru.prototype.cancel=function(){if(this.i=Vu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Vu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.D);return h}return x(a.i)}function Qv(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var h=[],f=a.length,v=0;v<f;v++)h.push(a[v]);return h}h=[],f=0;for(v in a)h[f++]=a[v];return h}function Yv(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var h=[];a=a.length;for(var f=0;f<a;f++)h.push(f);return h}h=[],f=0;for(const v in a)h[f++]=v;return h}}}function Nu(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var f=Yv(a),v=Qv(a),R=v.length,N=0;N<R;N++)h.call(void 0,v[N],f&&f[N],a)}var Mu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Jv(a,h){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var v=a[f].indexOf("="),R=null;if(0<=v){var N=a[f].substring(0,v);R=a[f].substring(v+1)}else N=a[f];h(N,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Mn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Mn){this.h=a.h,Ar(this,a.j),this.o=a.o,this.g=a.g,Sr(this,a.s),this.l=a.l;var h=a.i,f=new fi;f.i=h.i,h.g&&(f.g=new Map(h.g),f.h=h.h),Ou(this,f),this.m=a.m}else a&&(h=String(a).match(Mu))?(this.h=!1,Ar(this,h[1]||"",!0),this.o=hi(h[2]||""),this.g=hi(h[3]||"",!0),Sr(this,h[4]),this.l=hi(h[5]||"",!0),Ou(this,h[6]||"",!0),this.m=hi(h[7]||"")):(this.h=!1,this.i=new fi(null,this.h))}Mn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(pi(h,Fu,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(pi(h,Fu,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(pi(f,f.charAt(0)=="/"?ey:Zv,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",pi(f,ny)),a.join("")};function Mt(a){return new Mn(a)}function Ar(a,h,f){a.j=f?hi(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Sr(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function Ou(a,h,f){h instanceof fi?(a.i=h,sy(a.i,a.h)):(f||(h=pi(h,ty)),a.i=new fi(h,a.h))}function ye(a,h,f){a.i.set(h,f)}function kr(a){return ye(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function hi(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function pi(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,Xv),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Xv(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Fu=/[#\/\?@]/g,Zv=/[#\?:]/g,ey=/[#\?]/g,ty=/[#\?@]/g,ny=/#/g;function fi(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function nn(a){a.g||(a.g=new Map,a.h=0,a.i&&Jv(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=fi.prototype,n.add=function(a,h){nn(this),this.i=null,a=ms(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function $u(a,h){nn(a),h=ms(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Bu(a,h){return nn(a),h=ms(a,h),a.g.has(h)}n.forEach=function(a,h){nn(this),this.g.forEach(function(f,v){f.forEach(function(R){a.call(h,R,v,this)},this)},this)},n.na=function(){nn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),f=[];for(let v=0;v<h.length;v++){const R=a[v];for(let N=0;N<R.length;N++)f.push(h[v])}return f},n.V=function(a){nn(this);let h=[];if(typeof a=="string")Bu(this,a)&&(h=h.concat(this.g.get(ms(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)h=h.concat(a[f])}return h},n.set=function(a,h){return nn(this),this.i=null,a=ms(this,a),Bu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Uu(a,h,f){$u(a,h),0<f.length&&(a.i=null,a.g.set(ms(a,h),x(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var f=0;f<h.length;f++){var v=h[f];const N=encodeURIComponent(String(v)),U=this.V(v);for(v=0;v<U.length;v++){var R=N;U[v]!==""&&(R+="="+encodeURIComponent(String(U[v]))),a.push(R)}}return this.i=a.join("&")};function ms(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function sy(a,h){h&&!a.j&&(nn(a),a.i=null,a.g.forEach(function(f,v){var R=v.toLowerCase();v!=R&&($u(this,v),Uu(this,R,f))},a)),a.j=h}function iy(a,h){const f=new ui;if(l.Image){const v=new Image;v.onload=_(sn,f,"TestLoadImage: loaded",!0,h,v),v.onerror=_(sn,f,"TestLoadImage: error",!1,h,v),v.onabort=_(sn,f,"TestLoadImage: abort",!1,h,v),v.ontimeout=_(sn,f,"TestLoadImage: timeout",!1,h,v),l.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else h(!1)}function ry(a,h){const f=new ui,v=new AbortController,R=setTimeout(()=>{v.abort(),sn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:v.signal}).then(N=>{clearTimeout(R),N.ok?sn(f,"TestPingServer: ok",!0,h):sn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),sn(f,"TestPingServer: error",!1,h)})}function sn(a,h,f,v,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),v(f)}catch{}}function oy(){this.g=new qv}function ay(a,h,f){const v=f||"";try{Nu(a,function(R,N){let U=R;u(R)&&(U=Ra(R)),h.push(v+N+"="+encodeURIComponent(U))})}catch(R){throw h.push(v+"type="+encodeURIComponent("_badmap")),R}}function Cr(a){this.l=a.Ub||null,this.j=a.eb||!1}y(Cr,xa),Cr.prototype.g=function(){return new Pr(this.l,this.j)},Cr.prototype.i=function(a){return function(){return a}}({});function Pr(a,h){$e.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}y(Pr,$e),n=Pr.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,gi(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,mi(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,gi(this)),this.g&&(this.readyState=3,gi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;qu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function qu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?mi(this):gi(this),this.readyState==3&&qu(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,mi(this))},n.Qa=function(a){this.g&&(this.response=a,mi(this))},n.ga=function(){this.g&&mi(this)};function mi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,gi(a)}n.setRequestHeader=function(a,h){this.u.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function gi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Pr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function ju(a){let h="";return Q(a,function(f,v){h+=v,h+=":",h+=f,h+=`\r
`}),h}function Ua(a,h,f){e:{for(v in f){var v=!1;break e}v=!0}v||(f=ju(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):ye(a,h,f))}function Ee(a){$e.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}y(Ee,$e);var ly=/^https?$/i,cy=["POST","PUT"];n=Ee.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,h,f,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Va.g(),this.v=this.o?yu(this.o):yu(Va),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(N){zu(this,N);return}if(a=f||"",f=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var R in v)f.set(R,v[R]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const N of v.keys())f.set(N,v.get(N));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(f.keys()).find(N=>N.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(cy,h,void 0))||v||R||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,U]of f)this.g.setRequestHeader(N,U);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ku(this),this.u=!0,this.g.send(a),this.u=!1}catch(N){zu(this,N)}};function zu(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Gu(a),Rr(a)}function Gu(a){a.A||(a.A=!0,We(a,"complete"),We(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,We(this,"complete"),We(this,"abort"),Rr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Rr(this,!0)),Ee.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Hu(this):this.bb())},n.bb=function(){Hu(this)};function Hu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Ot(a)!=4||a.Z()!=2)){if(a.u&&Ot(a)==4)fu(a.Ea,0,a);else if(We(a,"readystatechange"),Ot(a)==4){a.h=!1;try{const U=a.Z();e:switch(U){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var v;if(v=U===0){var R=String(a.D).match(Mu)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),v=!ly.test(R?R.toLowerCase():"")}f=v}if(f)We(a,"complete"),We(a,"success");else{a.m=6;try{var N=2<Ot(a)?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.Z()+"]",Gu(a)}}finally{Rr(a)}}}}function Rr(a,h){if(a.g){Ku(a);const f=a.g,v=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||We(a,"ready");try{f.onreadystatechange=v}catch{}}}function Ku(a){a.I&&(l.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Ot(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Ot(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Uv(h)}};function Wu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function uy(a){const h={};a=(a.g&&2<=Ot(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(T(a[v]))continue;var f=k(a[v]);const R=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const N=h[R]||[];h[R]=N,N.push(f)}w(h,function(v){return v.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function vi(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Qu(a){this.Aa=0,this.i=[],this.j=new ui,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=vi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=vi("baseRetryDelayMs",5e3,a),this.cb=vi("retryDelaySeedMs",1e4,a),this.Wa=vi("forwardChannelMaxRetries",2,a),this.wa=vi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Ru(a&&a.concurrentRequestLimit),this.Da=new oy,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Qu.prototype,n.la=8,n.G=1,n.connect=function(a,h,f,v){Qe(0),this.W=a,this.H=h||{},f&&v!==void 0&&(this.H.OSID=f,this.H.OAID=v),this.F=this.X,this.I=id(this,null,this.W),Dr(this)};function qa(a){if(Yu(a),a.G==3){var h=a.U++,f=Mt(a.I);if(ye(f,"SID",a.K),ye(f,"RID",h),ye(f,"TYPE","terminate"),yi(a,f),h=new tn(a,a.j,h),h.L=2,h.v=kr(Mt(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=h.v,f=!0),f||(h.g=rd(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Tr(h)}sd(a)}function xr(a){a.g&&(za(a),a.g.cancel(),a.g=null)}function Yu(a){xr(a),a.u&&(l.clearTimeout(a.u),a.u=null),Lr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Dr(a){if(!xu(a.h)&&!a.s){a.s=!0;var h=a.Ga;te||vr(),ae||(te(),ae=!0),Nt.add(h,a),a.B=0}}function dy(a,h){return Du(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ci(g(a.Ga,a,h),nd(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new tn(this,this.j,a);let N=this.o;if(this.S&&(N?(N=b(N),S(N,this.S)):N=this.S),this.m!==null||this.O||(R.H=N,N=null),this.P)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var v=this.i[f];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(h+=v,4096<h){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Xu(this,R,h),f=Mt(this.I),ye(f,"RID",a),ye(f,"CVER",22),this.D&&ye(f,"X-HTTP-Session-Id",this.D),yi(this,f),N&&(this.O?h="headers="+encodeURIComponent(String(ju(N)))+"&"+h:this.m&&Ua(f,this.m,N)),Ba(this.h,R),this.Ua&&ye(f,"TYPE","init"),this.P?(ye(f,"$req",h),ye(f,"SID","null"),R.T=!0,Ma(R,f,null)):Ma(R,f,h),this.G=2}}else this.G==3&&(a?Ju(this,a):this.i.length==0||xu(this.h)||Ju(this))};function Ju(a,h){var f;h?f=h.l:f=a.U++;const v=Mt(a.I);ye(v,"SID",a.K),ye(v,"RID",f),ye(v,"AID",a.T),yi(a,v),a.m&&a.o&&Ua(v,a.m,a.o),f=new tn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Xu(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ba(a.h,f),Ma(f,v,h)}function yi(a,h){a.H&&Q(a.H,function(f,v){ye(h,v,f)}),a.l&&Nu({},function(f,v){ye(h,v,f)})}function Xu(a,h,f){f=Math.min(a.i.length,f);var v=a.l?g(a.l.Na,a.l,a):null;e:{var R=a.i;let N=-1;for(;;){const U=["count="+f];N==-1?0<f?(N=R[0].g,U.push("ofs="+N)):N=0:U.push("ofs="+N);let ge=!0;for(let Me=0;Me<f;Me++){let oe=R[Me].g;const Be=R[Me].map;if(oe-=N,0>oe)N=Math.max(0,R[Me].g-100),ge=!1;else try{ay(Be,U,"req"+oe+"_")}catch{v&&v(Be)}}if(ge){v=U.join("&");break e}}}return a=a.i.splice(0,f),h.D=a,v}function Zu(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;te||vr(),ae||(te(),ae=!0),Nt.add(h,a),a.v=0}}function ja(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ci(g(a.Fa,a),nd(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,ed(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ci(g(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Qe(10),xr(this),ed(this))};function za(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function ed(a){a.g=new tn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=Mt(a.qa);ye(h,"RID","rpc"),ye(h,"SID",a.K),ye(h,"AID",a.T),ye(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&ye(h,"TO",a.ja),ye(h,"TYPE","xmlhttp"),yi(a,h),a.m&&a.o&&Ua(h,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=kr(Mt(h)),f.m=null,f.P=!0,ku(f,a)}n.Za=function(){this.C!=null&&(this.C=null,xr(this),ja(this),Qe(19))};function Lr(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function td(a,h){var f=null;if(a.g==h){Lr(a),za(a),a.g=null;var v=2}else if($a(a.h,h))f=h.D,Lu(a.h,h),v=1;else return;if(a.G!=0){if(h.o)if(v==1){f=h.m?h.m.length:0,h=Date.now()-h.F;var R=a.B;v=wr(),We(v,new Eu(v,f)),Dr(a)}else Zu(a);else if(R=h.s,R==3||R==0&&0<h.X||!(v==1&&dy(a,h)||v==2&&ja(a)))switch(f&&0<f.length&&(h=a.h,h.i=h.i.concat(f)),R){case 1:On(a,5);break;case 4:On(a,10);break;case 3:On(a,6);break;default:On(a,2)}}}function nd(a,h){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*h}function On(a,h){if(a.j.info("Error code "+h),h==2){var f=g(a.fb,a),v=a.Xa;const R=!v;v=new Mn(v||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Ar(v,"https"),kr(v),R?iy(v.toString(),f):ry(v.toString(),f)}else Qe(2);a.G=0,a.l&&a.l.sa(h),sd(a),Yu(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Qe(2)):(this.j.info("Failed to ping google.com"),Qe(1))};function sd(a){if(a.G=0,a.ka=[],a.l){const h=Vu(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ka,h),C(a.ka,a.i),a.h.i.length=0,x(a.i),a.i.length=0),a.l.ra()}}function id(a,h,f){var v=f instanceof Mn?Mt(f):new Mn(f);if(v.g!="")h&&(v.g=h+"."+v.g),Sr(v,v.s);else{var R=l.location;v=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;var N=new Mn(null);v&&Ar(N,v),h&&(N.g=h),R&&Sr(N,R),f&&(N.l=f),v=N}return f=a.D,h=a.ya,f&&h&&ye(v,f,h),ye(v,"VER",a.la),yi(a,v),v}function rd(a,h,f){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Ee(new Cr({eb:f})):new Ee(a.pa),h.Ha(a.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function od(){}n=od.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Vr(){}Vr.prototype.g=function(a,h){return new at(a,h)};function at(a,h){$e.call(this),this.g=new Qu(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!T(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!T(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new gs(this)}y(at,$e),at.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},at.prototype.close=function(){qa(this.g)},at.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=Ra(a),a=f);h.i.push(new Wv(h.Ya++,a)),h.G==3&&Dr(h)},at.prototype.N=function(){this.g.l=null,delete this.j,qa(this.g),delete this.g,at.aa.N.call(this)};function ad(a){Da.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}y(ad,Da);function ld(){La.call(this),this.status=1}y(ld,La);function gs(a){this.g=a}y(gs,od),gs.prototype.ua=function(){We(this.g,"a")},gs.prototype.ta=function(a){We(this.g,new ad(a))},gs.prototype.sa=function(a){We(this.g,new ld)},gs.prototype.ra=function(){We(this.g,"b")},Vr.prototype.createWebChannel=Vr.prototype.g,at.prototype.send=at.prototype.o,at.prototype.open=at.prototype.m,at.prototype.close=at.prototype.close,Pf=function(){return new Vr},Cf=function(){return wr()},kf=Vn,yl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ir.NO_ERROR=0,Ir.TIMEOUT=8,Ir.HTTP_ERROR=6,Jr=Ir,Tu.COMPLETE="complete",Sf=Tu,_u.EventType=ai,ai.OPEN="a",ai.CLOSE="b",ai.ERROR="c",ai.MESSAGE="d",$e.prototype.listen=$e.prototype.K,Pi=_u,Ee.prototype.listenOnce=Ee.prototype.L,Ee.prototype.getLastError=Ee.prototype.Ka,Ee.prototype.getLastErrorCode=Ee.prototype.Ba,Ee.prototype.getStatus=Ee.prototype.Z,Ee.prototype.getResponseJson=Ee.prototype.Oa,Ee.prototype.getResponseText=Ee.prototype.oa,Ee.prototype.send=Ee.prototype.ea,Ee.prototype.setWithCredentials=Ee.prototype.Ha,Af=Ee}).apply(typeof Or<"u"?Or:typeof self<"u"?self:typeof window<"u"?window:{});const $d="@firebase/firestore";/**
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
 */class Ne{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ne.UNAUTHENTICATED=new Ne(null),Ne.GOOGLE_CREDENTIALS=new Ne("google-credentials-uid"),Ne.FIRST_PARTY=new Ne("first-party-uid"),Ne.MOCK_USER=new Ne("mock-user");/**
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
 */let Ys="10.14.0";/**
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
 */const Xn=new Xl("@firebase/firestore");function Es(){return Xn.logLevel}function O(n,...e){if(Xn.logLevel<=se.DEBUG){const t=e.map(dc);Xn.debug(`Firestore (${Ys}): ${n}`,...t)}}function ke(n,...e){if(Xn.logLevel<=se.ERROR){const t=e.map(dc);Xn.error(`Firestore (${Ys}): ${n}`,...t)}}function vn(n,...e){if(Xn.logLevel<=se.WARN){const t=e.map(dc);Xn.warn(`Firestore (${Ys}): ${n}`,...t)}}function dc(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function H(n="Unexpected state"){const e=`FIRESTORE (${Ys}) INTERNAL ASSERTION FAILED: `+n;throw ke(e),new Error(e)}function Y(n,e){n||H()}function K(n,e){return n}/**
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
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends Jt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Rt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Rf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class xf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ne.UNAUTHENTICATED))}shutdown(){}}class zw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Gw{constructor(e){this.t=e,this.currentUser=Ne.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.o===void 0);let s=this.i;const i=c=>this.i!==s?(s=this.i,t(c)):Promise.resolve();let r=new Rt;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Rt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const c=r;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},l=c=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Rt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(Y(typeof s.accessToken=="string"),new Rf(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string"),new Ne(e)}}class Hw{constructor(e,t,s){this.l=e,this.h=t,this.P=s,this.type="FirstParty",this.user=Ne.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Kw{constructor(e,t,s){this.l=e,this.h=t,this.P=s}getToken(){return Promise.resolve(new Hw(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ne.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ww{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Qw{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Y(this.o===void 0);const s=r=>{r.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.R;return this.R=r.token,O("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>s(r))};const i=r=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(r=>i(r)),setTimeout(()=>{if(!this.appCheck){const r=this.A.getImmediate({optional:!0});r?i(r):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string"),this.R=t.token,new Ww(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Yw(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
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
 */class hc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const i=Yw(40);for(let r=0;r<i.length;++r)s.length<20&&i[r]<t&&(s+=e.charAt(i[r]%e.length))}return s}}function ee(n,e){return n<e?-1:n>e?1:0}function Fs(n,e,t){return n.length===e.length&&n.every((s,i)=>t(s,e[i]))}function Df(n){return n+"\0"}/**
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
 */class we{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new B(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new B(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new B(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new B(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return we.fromMillis(Date.now())}static fromDate(e){return we.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*t));return new we(t,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class J{constructor(e){this.timestamp=e}static fromTimestamp(e){return new J(e)}static min(){return new J(new we(0,0))}static max(){return new J(new we(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Gi{constructor(e,t,s){t===void 0?t=0:t>e.length&&H(),s===void 0?s=e.length-t:s>e.length-t&&H(),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Gi.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Gi?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let i=0;i<s;i++){const r=e.get(i),o=t.get(i);if(r<o)return-1;if(r>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ce extends Gi{construct(e,t,s){return new ce(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new B(M.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(i=>i.length>0))}return new ce(t)}static emptyPath(){return new ce([])}}const Jw=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class be extends Gi{construct(e,t,s){return new be(e,t,s)}static isValidIdentifier(e){return Jw.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),be.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new be(["__name__"])}static fromServerFormat(e){const t=[];let s="",i=0;const r=()=>{if(s.length===0)throw new B(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new B(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new B(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(s+=l,i++):(r(),i++)}if(r(),o)throw new B(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new be(t)}static emptyPath(){return new be([])}}/**
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
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(ce.fromString(e))}static fromName(e){return new q(ce.fromString(e).popFirst(5))}static empty(){return new q(ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new ce(e.slice()))}}/**
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
 */class vo{constructor(e,t,s,i){this.indexId=e,this.collectionGroup=t,this.fields=s,this.indexState=i}}function _l(n){return n.fields.find(e=>e.kind===2)}function Un(n){return n.fields.filter(e=>e.kind!==2)}vo.UNKNOWN_ID=-1;class Xr{constructor(e,t){this.fieldPath=e,this.kind=t}}class Hi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Hi(0,dt.min())}}function Lf(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,i=J.fromTimestamp(s===1e9?new we(t+1,0):new we(t,s));return new dt(i,q.empty(),e)}function Vf(n){return new dt(n.readTime,n.key,-1)}class dt{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new dt(J.min(),q.empty(),-1)}static max(){return new dt(J.max(),q.empty(),-1)}}function pc(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=q.comparator(n.documentKey,e.documentKey),t!==0?t:ee(n.largestBatchId,e.largestBatchId))}/**
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
 */const Nf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Mf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function En(n){if(n.code!==M.FAILED_PRECONDITION||n.message!==Nf)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((s,i)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(s,i)},this.catchCallback=r=>{this.wrapFailure(t,r).next(s,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,s)=>{t(e)})}static reject(e){return new D((t,s)=>{s(e)})}static waitFor(e){return new D((t,s)=>{let i=0,r=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++r,o&&r===i&&t()},c=>s(c))}),o=!0,r===i&&t()})}static or(e){let t=D.resolve(!1);for(const s of e)t=t.next(i=>i?D.resolve(i):s());return t}static forEach(e,t){const s=[];return e.forEach((i,r)=>{s.push(t.call(this,i,r))}),this.waitFor(s)}static mapArray(e,t){return new D((s,i)=>{const r=e.length,o=new Array(r);let l=0;for(let c=0;c<r;c++){const u=c;t(e[u]).next(p=>{o[u]=p,++l,l===r&&s(o)},p=>i(p))}})}static doWhile(e,t){return new D((s,i)=>{const r=()=>{e()===!0?t().next(()=>{r()},i):s()};r()})}}/**
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
 */class Bo{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Rt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Mi(e,t.error)):this.V.resolve()},this.transaction.onerror=s=>{const i=fc(s.target.error);this.V.reject(new Mi(e,i))}}static open(e,t,s,i){try{return new Bo(t,e.transaction(i,s))}catch(r){throw new Mi(t,r)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(O("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Zw(t)}}class mn{constructor(e,t,s){this.name=e,this.version=t,this.p=s,mn.S(xe())===12.2&&ke("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return O("SimpleDb","Removing database:",e),qn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!mp())return!1;if(mn.v())return!0;const e=xe(),t=mn.S(e),s=0<t&&t<10,i=Of(e),r=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||s||r)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),s=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(s)}async M(e){return this.db||(O("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,s)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=r=>{const o=r.target.result;t(o)},i.onblocked=()=>{s(new Mi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=r=>{const o=r.target.error;o.name==="VersionError"?s(new B(M.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?s(new B(M.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):s(new Mi(e,o))},i.onupgradeneeded=r=>{O("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',r.oldVersion);const o=r.target.result;this.p.O(o,i.transaction,r.oldVersion,this.version).next(()=>{O("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,s,i){const r=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const l=Bo.open(this.db,e,r?"readonly":"readwrite",s),c=i(l).next(u=>(l.g(),u)).catch(u=>(l.abort(u),D.reject(u))).toPromise();return c.catch(()=>{}),await l.m,c}catch(l){const c=l,u=c.name!=="FirebaseError"&&o<3;if(O("SimpleDb","Transaction failed with error:",c.message,"Retrying:",u),this.close(),!u)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Of(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Xw{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return qn(this.B.delete())}}class Mi extends B{constructor(e,t){super(M.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Tn(n){return n.name==="IndexedDbTransactionError"}class Zw{constructor(e){this.store=e}put(e,t){let s;return t!==void 0?(O("SimpleDb","PUT",this.store.name,e,t),s=this.store.put(t,e)):(O("SimpleDb","PUT",this.store.name,"<auto-key>",e),s=this.store.put(e)),qn(s)}add(e){return O("SimpleDb","ADD",this.store.name,e,e),qn(this.store.add(e))}get(e){return qn(this.store.get(e)).next(t=>(t===void 0&&(t=null),O("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return O("SimpleDb","DELETE",this.store.name,e),qn(this.store.delete(e))}count(){return O("SimpleDb","COUNT",this.store.name),qn(this.store.count())}U(e,t){const s=this.options(e,t),i=s.index?this.store.index(s.index):this.store;if(typeof i.getAll=="function"){const r=i.getAll(s.range);return new D((o,l)=>{r.onerror=c=>{l(c.target.error)},r.onsuccess=c=>{o(c.target.result)}})}{const r=this.cursor(s),o=[];return this.W(r,(l,c)=>{o.push(c)}).next(()=>o)}}G(e,t){const s=this.store.getAll(e,t===null?void 0:t);return new D((i,r)=>{s.onerror=o=>{r(o.target.error)},s.onsuccess=o=>{i(o.target.result)}})}j(e,t){O("SimpleDb","DELETE ALL",this.store.name);const s=this.options(e,t);s.H=!1;const i=this.cursor(s);return this.W(i,(r,o,l)=>l.delete())}J(e,t){let s;t?s=e:(s={},t=e);const i=this.cursor(s);return this.W(i,t)}Y(e){const t=this.cursor({});return new D((s,i)=>{t.onerror=r=>{const o=fc(r.target.error);i(o)},t.onsuccess=r=>{const o=r.target.result;o?e(o.primaryKey,o.value).next(l=>{l?o.continue():s()}):s()}})}W(e,t){const s=[];return new D((i,r)=>{e.onerror=o=>{r(o.target.error)},e.onsuccess=o=>{const l=o.target.result;if(!l)return void i();const c=new Xw(l),u=t(l.primaryKey,l.value,c);if(u instanceof D){const p=u.catch(m=>(c.done(),D.reject(m)));s.push(p)}c.isDone?i():c.K===null?l.continue():l.continue(c.K)}}).next(()=>D.waitFor(s))}options(e,t){let s;return e!==void 0&&(typeof e=="string"?s=e:t=e),{index:s,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const s=this.store.index(e.index);return e.H?s.openKeyCursor(e.range,t):s.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function qn(n){return new D((e,t)=>{n.onsuccess=s=>{const i=s.target.result;e(i)},n.onerror=s=>{const i=fc(s.target.error);t(i)}})}let Bd=!1;function fc(n){const e=mn.S(xe());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const s=new B("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Bd||(Bd=!0,setTimeout(()=>{throw s},0)),s}}return n}class e0{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){O("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{O("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Tn(t)?O("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await En(t)}await this.X(6e4)})}}class t0{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const s=new Set;let i=t,r=!0;return D.doWhile(()=>r===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!s.has(o))return O("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(l=>{i-=l,s.add(o)});r=!1})).next(()=>t-i)}ne(e,t,s){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,s).next(r=>{const o=r.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,r)).next(l=>(O("IndexBackfiller",`Updating offset: ${l}`),this.localStore.indexManager.updateCollectionGroup(e,t,l))).next(()=>o.size)}))}re(e,t){let s=e;return t.changes.forEach((i,r)=>{const o=Vf(r);pc(o,s)>0&&(s=o)}),new dt(s.readTime,s.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class nt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ie(s),this.se=s=>t.writeSequenceNumber(s))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}nt.oe=-1;function Uo(n){return n==null}function Ki(n){return n===0&&1/n==-1/0}function Ff(n){return typeof n=="number"&&Number.isInteger(n)&&!Ki(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function Ye(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ud(e)),e=n0(n.get(t),e);return Ud(e)}function n0(n,e){let t=e;const s=n.length;for(let i=0;i<s;i++){const r=n.charAt(i);switch(r){case"\0":t+="";break;case"":t+="";break;default:t+=r}}return t}function Ud(n){return n+""}function At(n){const e=n.length;if(Y(e>=2),e===2)return Y(n.charAt(0)===""&&n.charAt(1)===""),ce.emptyPath();const t=e-2,s=[];let i="";for(let r=0;r<e;){const o=n.indexOf("",r);switch((o<0||o>t)&&H(),n.charAt(o+1)){case"":const l=n.substring(r,o);let c;i.length===0?c=l:(i+=l,c=i,i=""),s.push(c);break;case"":i+=n.substring(r,o),i+="\0";break;case"":i+=n.substring(r,o+1);break;default:H()}r=o+2}return new ce(s)}/**
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
 */const qd=["userId","batchId"];/**
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
 */function Zr(n,e){return[n,Ye(e)]}function $f(n,e,t){return[n,Ye(e),t]}const s0={},i0=["prefixPath","collectionGroup","readTime","documentId"],r0=["prefixPath","collectionGroup","documentId"],o0=["collectionGroup","readTime","prefixPath","documentId"],a0=["canonicalId","targetId"],l0=["targetId","path"],c0=["path","targetId"],u0=["collectionId","parent"],d0=["indexId","uid"],h0=["uid","sequenceNumber"],p0=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],f0=["indexId","uid","orderedDocumentKey"],m0=["userId","collectionPath","documentId"],g0=["userId","collectionPath","largestBatchId"],v0=["userId","collectionGroup","largestBatchId"],Bf=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],y0=[...Bf,"documentOverlays"],Uf=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],qf=Uf,mc=[...qf,"indexConfiguration","indexState","indexEntries"],_0=mc,b0=[...mc,"globals"];/**
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
 */class bl extends Mf{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function De(n,e){const t=K(n);return mn.F(t._e,e)}/**
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
 */function jd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function us(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function jf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ve{constructor(e,t){this.comparator=e,this.root=t||Oe.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Oe.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Oe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const i=this.comparator(e,s.key);if(i===0)return t+s.left.size;i<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Fr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Fr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Fr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Fr(this.root,e,this.comparator,!0)}}class Fr{constructor(e,t,s,i){this.isReverse=i,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?s(e.key,t):1,t&&i&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Oe{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??Oe.RED,this.left=i??Oe.EMPTY,this.right=r??Oe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,i,r){return new Oe(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return i=r<0?i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Oe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Oe.EMPTY;s=i.right.min(),i=i.copy(s.key,s.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Oe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Oe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw H();const e=this.left.check();if(e!==this.right.check())throw H();return e+(this.isRed()?0:1)}}Oe.EMPTY=null,Oe.RED=!0,Oe.BLACK=!1;Oe.EMPTY=new class{constructor(){this.size=0}get key(){throw H()}get value(){throw H()}get color(){throw H()}get left(){throw H()}get right(){throw H()}copy(e,t,s,i,r){return this}insert(e,t,s){return new Oe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class me{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const i=s.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new zd(this.data.getIterator())}getIteratorFrom(e){return new zd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof me)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=s.getNext().key;if(this.comparator(i,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new me(this.comparator);return t.data=e,t}}class zd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function ys(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class st{constructor(e){this.fields=e,e.sort(be.comparator)}static empty(){return new st([])}unionWith(e){let t=new me(be.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new st(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Fs(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
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
 */class zf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new zf("Invalid base64 string: "+r):r}}(e);return new Se(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const w0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Yt(n){if(Y(!!n),typeof n=="string"){let e=0;const t=w0.exec(n);if(Y(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:_e(n.seconds),nanos:_e(n.nanos)}}function _e(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function yn(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}/**
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
 */function gc(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function vc(n){const e=n.mapValue.fields.__previous_value__;return gc(e)?vc(e):e}function Wi(n){const e=Yt(n.mapValue.fields.__local_write_time__.timestampValue);return new we(e.seconds,e.nanos)}/**
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
 */class I0{constructor(e,t,s,i,r,o,l,c,u){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=i,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u}}class _n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new _n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof _n&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const un={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},eo={nullValue:"NULL_VALUE"};function Zn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?gc(n)?4:Gf(n)?9007199254740991:qo(n)?10:11:H()}function Dt(n,e){if(n===e)return!0;const t=Zn(n);if(t!==Zn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Wi(n).isEqual(Wi(e));case 3:return function(i,r){if(typeof i.timestampValue=="string"&&typeof r.timestampValue=="string"&&i.timestampValue.length===r.timestampValue.length)return i.timestampValue===r.timestampValue;const o=Yt(i.timestampValue),l=Yt(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,r){return yn(i.bytesValue).isEqual(yn(r.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,r){return _e(i.geoPointValue.latitude)===_e(r.geoPointValue.latitude)&&_e(i.geoPointValue.longitude)===_e(r.geoPointValue.longitude)}(n,e);case 2:return function(i,r){if("integerValue"in i&&"integerValue"in r)return _e(i.integerValue)===_e(r.integerValue);if("doubleValue"in i&&"doubleValue"in r){const o=_e(i.doubleValue),l=_e(r.doubleValue);return o===l?Ki(o)===Ki(l):isNaN(o)&&isNaN(l)}return!1}(n,e);case 9:return Fs(n.arrayValue.values||[],e.arrayValue.values||[],Dt);case 10:case 11:return function(i,r){const o=i.mapValue.fields||{},l=r.mapValue.fields||{};if(jd(o)!==jd(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!Dt(o[c],l[c])))return!1;return!0}(n,e);default:return H()}}function Qi(n,e){return(n.values||[]).find(t=>Dt(t,e))!==void 0}function bn(n,e){if(n===e)return 0;const t=Zn(n),s=Zn(e);if(t!==s)return ee(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return ee(n.booleanValue,e.booleanValue);case 2:return function(r,o){const l=_e(r.integerValue||r.doubleValue),c=_e(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return Gd(n.timestampValue,e.timestampValue);case 4:return Gd(Wi(n),Wi(e));case 5:return ee(n.stringValue,e.stringValue);case 6:return function(r,o){const l=yn(r),c=yn(o);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(r,o){const l=r.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const p=ee(l[u],c[u]);if(p!==0)return p}return ee(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(r,o){const l=ee(_e(r.latitude),_e(o.latitude));return l!==0?l:ee(_e(r.longitude),_e(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Hd(n.arrayValue,e.arrayValue);case 10:return function(r,o){var l,c,u,p;const m=r.fields||{},g=o.fields||{},_=(l=m.value)===null||l===void 0?void 0:l.arrayValue,y=(c=g.value)===null||c===void 0?void 0:c.arrayValue,x=ee(((u=_==null?void 0:_.values)===null||u===void 0?void 0:u.length)||0,((p=y==null?void 0:y.values)===null||p===void 0?void 0:p.length)||0);return x!==0?x:Hd(_,y)}(n.mapValue,e.mapValue);case 11:return function(r,o){if(r===un.mapValue&&o===un.mapValue)return 0;if(r===un.mapValue)return 1;if(o===un.mapValue)return-1;const l=r.fields||{},c=Object.keys(l),u=o.fields||{},p=Object.keys(u);c.sort(),p.sort();for(let m=0;m<c.length&&m<p.length;++m){const g=ee(c[m],p[m]);if(g!==0)return g;const _=bn(l[c[m]],u[p[m]]);if(_!==0)return _}return ee(c.length,p.length)}(n.mapValue,e.mapValue);default:throw H()}}function Gd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ee(n,e);const t=Yt(n),s=Yt(e),i=ee(t.seconds,s.seconds);return i!==0?i:ee(t.nanos,s.nanos)}function Hd(n,e){const t=n.values||[],s=e.values||[];for(let i=0;i<t.length&&i<s.length;++i){const r=bn(t[i],s[i]);if(r)return r}return ee(t.length,s.length)}function $s(n){return wl(n)}function wl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const s=Yt(t);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return yn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return q.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let s="[",i=!0;for(const r of t.values||[])i?i=!1:s+=",",s+=wl(r);return s+"]"}(n.arrayValue):"mapValue"in n?function(t){const s=Object.keys(t.fields||{}).sort();let i="{",r=!0;for(const o of s)r?r=!1:i+=",",i+=`${o}:${wl(t.fields[o])}`;return i+"}"}(n.mapValue):H()}function Yi(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Il(n){return!!n&&"integerValue"in n}function Ji(n){return!!n&&"arrayValue"in n}function Kd(n){return!!n&&"nullValue"in n}function Wd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function to(n){return!!n&&"mapValue"in n}function qo(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Oi(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return us(n.mapValue.fields,(t,s)=>e.mapValue.fields[t]=Oi(s)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Oi(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Gf(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Hf={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function E0(n){return"nullValue"in n?eo:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Yi(_n.empty(),q.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?qo(n)?Hf:{mapValue:{}}:H()}function T0(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Yi(_n.empty(),q.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Hf:"mapValue"in n?qo(n)?{mapValue:{}}:un:H()}function Qd(n,e){const t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function Yd(n,e){const t=bn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class Ge{constructor(e){this.value=e}static empty(){return new Ge({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!to(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Oi(t)}setAll(e){let t=be.emptyPath(),s={},i=[];e.forEach((o,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,s,i),s={},i=[],t=l.popLast()}o?s[l.lastSegment()]=Oi(o):i.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,s,i)}delete(e){const t=this.field(e.popLast());to(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Dt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let i=t.mapValue.fields[e.get(s)];to(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,s){us(t,(i,r)=>e[i]=r);for(const i of s)delete e[i]}clone(){return new Ge(Oi(this.value))}}function Kf(n){const e=[];return us(n.fields,(t,s)=>{const i=new be([t]);if(to(s)){const r=Kf(s.mapValue).fields;if(r.length===0)e.push(i);else for(const o of r)e.push(i.child(o))}else e.push(i)}),new st(e)}/**
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
 */class Te{constructor(e,t,s,i,r,o,l){this.key=e,this.documentType=t,this.version=s,this.readTime=i,this.createTime=r,this.data=o,this.documentState=l}static newInvalidDocument(e){return new Te(e,0,J.min(),J.min(),J.min(),Ge.empty(),0)}static newFoundDocument(e,t,s,i){return new Te(e,1,t,J.min(),s,i,0)}static newNoDocument(e,t){return new Te(e,2,t,J.min(),J.min(),Ge.empty(),0)}static newUnknownDocument(e,t){return new Te(e,3,t,J.min(),J.min(),Ge.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ge.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ge.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Te&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Te(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Bs{constructor(e,t){this.position=e,this.inclusive=t}}function Jd(n,e,t){let s=0;for(let i=0;i<n.position.length;i++){const r=e[i],o=n.position[i];if(r.field.isKeyField()?s=q.comparator(q.fromName(o.referenceValue),t.key):s=bn(o,t.data.field(r.field)),r.dir==="desc"&&(s*=-1),s!==0)break}return s}function Xd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Dt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Xi{constructor(e,t="asc"){this.field=e,this.dir=t}}function A0(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Wf{}class ie extends Wf{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new S0(e,t,s):t==="array-contains"?new P0(e,s):t==="in"?new em(e,s):t==="not-in"?new R0(e,s):t==="array-contains-any"?new x0(e,s):new ie(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new k0(e,s):new C0(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(bn(t,this.value)):t!==null&&Zn(this.value)===Zn(t)&&this.matchesComparison(bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class he extends Wf{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new he(e,t)}matches(e){return Us(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Us(n){return n.op==="and"}function El(n){return n.op==="or"}function yc(n){return Qf(n)&&Us(n)}function Qf(n){for(const e of n.filters)if(e instanceof he)return!1;return!0}function Tl(n){if(n instanceof ie)return n.field.canonicalString()+n.op.toString()+$s(n.value);if(yc(n))return n.filters.map(e=>Tl(e)).join(",");{const e=n.filters.map(t=>Tl(t)).join(",");return`${n.op}(${e})`}}function Yf(n,e){return n instanceof ie?function(s,i){return i instanceof ie&&s.op===i.op&&s.field.isEqual(i.field)&&Dt(s.value,i.value)}(n,e):n instanceof he?function(s,i){return i instanceof he&&s.op===i.op&&s.filters.length===i.filters.length?s.filters.reduce((r,o,l)=>r&&Yf(o,i.filters[l]),!0):!1}(n,e):void H()}function Jf(n,e){const t=n.filters.concat(e);return he.create(t,n.op)}function Xf(n){return n instanceof ie?function(t){return`${t.field.canonicalString()} ${t.op} ${$s(t.value)}`}(n):n instanceof he?function(t){return t.op.toString()+" {"+t.getFilters().map(Xf).join(" ,")+"}"}(n):"Filter"}class S0 extends ie{constructor(e,t,s){super(e,t,s),this.key=q.fromName(s.referenceValue)}matches(e){const t=q.comparator(e.key,this.key);return this.matchesComparison(t)}}class k0 extends ie{constructor(e,t){super(e,"in",t),this.keys=Zf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class C0 extends ie{constructor(e,t){super(e,"not-in",t),this.keys=Zf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Zf(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(s=>q.fromName(s.referenceValue))}class P0 extends ie{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ji(t)&&Qi(t.arrayValue,this.value)}}class em extends ie{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Qi(this.value.arrayValue,t)}}class R0 extends ie{constructor(e,t){super(e,"not-in",t)}matches(e){if(Qi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Qi(this.value.arrayValue,t)}}class x0 extends ie{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ji(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>Qi(this.value.arrayValue,s))}}/**
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
 */class D0{constructor(e,t=null,s=[],i=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=i,this.limit=r,this.startAt=o,this.endAt=l,this.ue=null}}function Al(n,e=null,t=[],s=[],i=null,r=null,o=null){return new D0(n,e,t,s,i,r,o)}function es(n){const e=K(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>Tl(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),Uo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>$s(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>$s(s)).join(",")),e.ue=t}return e.ue}function or(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!A0(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Yf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Xd(n.startAt,e.startAt)&&Xd(n.endAt,e.endAt)}function yo(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function _o(n,e){return n.filters.filter(t=>t instanceof ie&&t.field.isEqual(e))}function Zd(n,e,t){let s=eo,i=!0;for(const r of _o(n,e)){let o=eo,l=!0;switch(r.op){case"<":case"<=":o=E0(r.value);break;case"==":case"in":case">=":o=r.value;break;case">":o=r.value,l=!1;break;case"!=":case"not-in":o=eo}Qd({value:s,inclusive:i},{value:o,inclusive:l})<0&&(s=o,i=l)}if(t!==null){for(let r=0;r<n.orderBy.length;++r)if(n.orderBy[r].field.isEqual(e)){const o=t.position[r];Qd({value:s,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(s=o,i=t.inclusive);break}}return{value:s,inclusive:i}}function eh(n,e,t){let s=un,i=!0;for(const r of _o(n,e)){let o=un,l=!0;switch(r.op){case">=":case">":o=T0(r.value),l=!1;break;case"==":case"in":case"<=":o=r.value;break;case"<":o=r.value,l=!1;break;case"!=":case"not-in":o=un}Yd({value:s,inclusive:i},{value:o,inclusive:l})>0&&(s=o,i=l)}if(t!==null){for(let r=0;r<n.orderBy.length;++r)if(n.orderBy[r].field.isEqual(e)){const o=t.position[r];Yd({value:s,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(s=o,i=t.inclusive);break}}return{value:s,inclusive:i}}/**
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
 */class Js{constructor(e,t=null,s=[],i=[],r=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function tm(n,e,t,s,i,r,o,l){return new Js(n,e,t,s,i,r,o,l)}function jo(n){return new Js(n)}function th(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function nm(n){return n.collectionGroup!==null}function Fi(n){const e=K(n);if(e.ce===null){e.ce=[];const t=new Set;for(const r of e.explicitOrderBy)e.ce.push(r),t.add(r.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new me(be.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(l=l.add(u.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.ce.push(new Xi(r,s))}),t.has(be.keyField().canonicalString())||e.ce.push(new Xi(be.keyField(),s))}return e.ce}function ut(n){const e=K(n);return e.le||(e.le=L0(e,Fi(n))),e.le}function L0(n,e){if(n.limitType==="F")return Al(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const r=i.dir==="desc"?"asc":"desc";return new Xi(i.field,r)});const t=n.endAt?new Bs(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new Bs(n.startAt.position,n.startAt.inclusive):null;return Al(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function Sl(n,e){const t=n.filters.concat([e]);return new Js(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function bo(n,e,t){return new Js(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function zo(n,e){return or(ut(n),ut(e))&&n.limitType===e.limitType}function sm(n){return`${es(ut(n))}|lt:${n.limitType}`}function Ts(n){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(i=>Xf(i)).join(", ")}]`),Uo(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(i=>$s(i)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(i=>$s(i)).join(",")),`Target(${s})`}(ut(n))}; limitType=${n.limitType})`}function ar(n,e){return e.isFoundDocument()&&function(s,i){const r=i.key.path;return s.collectionGroup!==null?i.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(r):q.isDocumentKey(s.path)?s.path.isEqual(r):s.path.isImmediateParentOf(r)}(n,e)&&function(s,i){for(const r of Fi(s))if(!r.field.isKeyField()&&i.data.field(r.field)===null)return!1;return!0}(n,e)&&function(s,i){for(const r of s.filters)if(!r.matches(i))return!1;return!0}(n,e)&&function(s,i){return!(s.startAt&&!function(o,l,c){const u=Jd(o,l,c);return o.inclusive?u<=0:u<0}(s.startAt,Fi(s),i)||s.endAt&&!function(o,l,c){const u=Jd(o,l,c);return o.inclusive?u>=0:u>0}(s.endAt,Fi(s),i))}(n,e)}function im(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function rm(n){return(e,t)=>{let s=!1;for(const i of Fi(n)){const r=V0(i,e,t);if(r!==0)return r;s=s||i.field.isKeyField()}return 0}}function V0(n,e,t){const s=n.field.isKeyField()?q.comparator(e.key,t.key):function(r,o,l){const c=o.data.field(r),u=l.data.field(r);return c!==null&&u!==null?bn(c,u):H()}(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return H()}}/**
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
 */class An{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[i,r]of s)if(this.equalsFn(i,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),i=this.inner[s];if(i===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return void(i[r]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return s.length===1?delete this.inner[t]:s.splice(i,1),this.innerSize--,!0;return!1}forEach(e){us(this.inner,(t,s)=>{for(const[i,r]of s)e(i,r)})}isEmpty(){return jf(this.inner)}size(){return this.innerSize}}/**
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
 */const N0=new ve(q.comparator);function lt(){return N0}const om=new ve(q.comparator);function Ri(...n){let e=om;for(const t of n)e=e.insert(t.key,t);return e}function am(n){let e=om;return n.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function St(){return $i()}function lm(){return $i()}function $i(){return new An(n=>n.toString(),(n,e)=>n.isEqual(e))}const M0=new ve(q.comparator),O0=new me(q.comparator);function ne(...n){let e=O0;for(const t of n)e=e.add(t);return e}const F0=new me(ee);function _c(){return F0}/**
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
 */function bc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ki(e)?"-0":e}}function cm(n){return{integerValue:""+n}}function um(n,e){return Ff(e)?cm(e):bc(n,e)}/**
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
 */class Go{constructor(){this._=void 0}}function $0(n,e,t){return n instanceof qs?function(i,r){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return r&&gc(r)&&(r=vc(r)),r&&(o.fields.__previous_value__=r),{mapValue:o}}(t,e):n instanceof ts?hm(n,e):n instanceof ns?pm(n,e):function(i,r){const o=dm(i,r),l=nh(o)+nh(i.Pe);return Il(o)&&Il(i.Pe)?cm(l):bc(i.serializer,l)}(n,e)}function B0(n,e,t){return n instanceof ts?hm(n,e):n instanceof ns?pm(n,e):t}function dm(n,e){return n instanceof js?function(s){return Il(s)||function(r){return!!r&&"doubleValue"in r}(s)}(e)?e:{integerValue:0}:null}class qs extends Go{}class ts extends Go{constructor(e){super(),this.elements=e}}function hm(n,e){const t=fm(e);for(const s of n.elements)t.some(i=>Dt(i,s))||t.push(s);return{arrayValue:{values:t}}}class ns extends Go{constructor(e){super(),this.elements=e}}function pm(n,e){let t=fm(e);for(const s of n.elements)t=t.filter(i=>!Dt(i,s));return{arrayValue:{values:t}}}class js extends Go{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function nh(n){return _e(n.integerValue||n.doubleValue)}function fm(n){return Ji(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class lr{constructor(e,t){this.field=e,this.transform=t}}function U0(n,e){return n.field.isEqual(e.field)&&function(s,i){return s instanceof ts&&i instanceof ts||s instanceof ns&&i instanceof ns?Fs(s.elements,i.elements,Dt):s instanceof js&&i instanceof js?Dt(s.Pe,i.Pe):s instanceof qs&&i instanceof qs}(n.transform,e.transform)}class q0{constructor(e,t){this.version=e,this.transformResults=t}}class Re{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Re}static exists(e){return new Re(void 0,e)}static updateTime(e){return new Re(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function no(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ho{}function mm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new cr(n.key,Re.none()):new Xs(n.key,n.data,Re.none());{const t=n.data,s=Ge.empty();let i=new me(be.comparator);for(let r of e.fields)if(!i.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?s.delete(r):s.set(r,o),i=i.add(r)}return new Zt(n.key,s,new st(i.toArray()),Re.none())}}function j0(n,e,t){n instanceof Xs?function(i,r,o){const l=i.value.clone(),c=ih(i.fieldTransforms,r,o.transformResults);l.setAll(c),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Zt?function(i,r,o){if(!no(i.precondition,r))return void r.convertToUnknownDocument(o.version);const l=ih(i.fieldTransforms,r,o.transformResults),c=r.data;c.setAll(gm(i)),c.setAll(l),r.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):function(i,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Bi(n,e,t,s){return n instanceof Xs?function(r,o,l,c){if(!no(r.precondition,o))return l;const u=r.value.clone(),p=rh(r.fieldTransforms,c,o);return u.setAll(p),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(n,e,t,s):n instanceof Zt?function(r,o,l,c){if(!no(r.precondition,o))return l;const u=rh(r.fieldTransforms,c,o),p=o.data;return p.setAll(gm(r)),p.setAll(u),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(m=>m.field))}(n,e,t,s):function(r,o,l){return no(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(n,e,t)}function z0(n,e){let t=null;for(const s of n.fieldTransforms){const i=e.data.field(s.field),r=dm(s.transform,i||null);r!=null&&(t===null&&(t=Ge.empty()),t.set(s.field,r))}return t||null}function sh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(s,i){return s===void 0&&i===void 0||!(!s||!i)&&Fs(s,i,(r,o)=>U0(r,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Xs extends Ho{constructor(e,t,s,i=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Zt extends Ho{constructor(e,t,s,i,r=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=i,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function gm(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}}),e}function ih(n,e,t){const s=new Map;Y(n.length===t.length);for(let i=0;i<t.length;i++){const r=n[i],o=r.transform,l=e.data.field(r.field);s.set(r.field,B0(o,l,t[i]))}return s}function rh(n,e,t){const s=new Map;for(const i of n){const r=i.transform,o=t.data.field(i.field);s.set(i.field,$0(r,o,e))}return s}class cr extends Ho{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class vm extends Ho{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class wc{constructor(e,t,s,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=i}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const r=this.mutations[i];r.key.isEqual(e.key)&&j0(r,e,s[i])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=Bi(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=Bi(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=lm();return this.mutations.forEach(i=>{const r=e.get(i.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(i.key)?null:l;const c=mm(o,l);c!==null&&s.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(J.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),ne())}isEqual(e){return this.batchId===e.batchId&&Fs(this.mutations,e.mutations,(t,s)=>sh(t,s))&&Fs(this.baseMutations,e.baseMutations,(t,s)=>sh(t,s))}}class Ic{constructor(e,t,s,i){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=i}static from(e,t,s){Y(e.mutations.length===s.length);let i=function(){return M0}();const r=e.mutations;for(let o=0;o<r.length;o++)i=i.insert(r[o].key,s[o].version);return new Ic(e,t,s,i)}}/**
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
 */class Ec{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class G0{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Pe,re;function H0(n){switch(n){default:return H();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function ym(n){if(n===void 0)return ke("GRPC error has no .code"),M.UNKNOWN;switch(n){case Pe.OK:return M.OK;case Pe.CANCELLED:return M.CANCELLED;case Pe.UNKNOWN:return M.UNKNOWN;case Pe.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Pe.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Pe.INTERNAL:return M.INTERNAL;case Pe.UNAVAILABLE:return M.UNAVAILABLE;case Pe.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Pe.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Pe.NOT_FOUND:return M.NOT_FOUND;case Pe.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Pe.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Pe.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Pe.ABORTED:return M.ABORTED;case Pe.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Pe.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Pe.DATA_LOSS:return M.DATA_LOSS;default:return H()}}(re=Pe||(Pe={}))[re.OK=0]="OK",re[re.CANCELLED=1]="CANCELLED",re[re.UNKNOWN=2]="UNKNOWN",re[re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",re[re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",re[re.NOT_FOUND=5]="NOT_FOUND",re[re.ALREADY_EXISTS=6]="ALREADY_EXISTS",re[re.PERMISSION_DENIED=7]="PERMISSION_DENIED",re[re.UNAUTHENTICATED=16]="UNAUTHENTICATED",re[re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",re[re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",re[re.ABORTED=10]="ABORTED",re[re.OUT_OF_RANGE=11]="OUT_OF_RANGE",re[re.UNIMPLEMENTED=12]="UNIMPLEMENTED",re[re.INTERNAL=13]="INTERNAL",re[re.UNAVAILABLE=14]="UNAVAILABLE",re[re.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function K0(){return new TextEncoder}/**
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
 */const W0=new Wn([4294967295,4294967295],0);function oh(n){const e=K0().encode(n),t=new Tf;return t.update(e),new Uint8Array(t.digest())}function ah(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),i=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new Wn([t,s],0),new Wn([i,r],0)]}class Tc{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new xi(`Invalid padding: ${t}`);if(s<0)throw new xi(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new xi(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new xi(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Wn.fromNumber(this.Ie)}Ee(e,t,s){let i=e.add(t.multiply(Wn.fromNumber(s)));return i.compare(W0)===1&&(i=new Wn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=oh(e),[s,i]=ah(t);for(let r=0;r<this.hashCount;r++){const o=this.Ee(s,i,r);if(!this.de(o))return!1}return!0}static create(e,t,s){const i=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new Tc(r,i,t);return s.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const t=oh(e),[s,i]=ah(t);for(let r=0;r<this.hashCount;r++){const o=this.Ee(s,i,r);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class xi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ur{constructor(e,t,s,i,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=i,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const i=new Map;return i.set(e,dr.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new ur(J.min(),i,new ve(ee),lt(),ne())}}class dr{constructor(e,t,s,i,r){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=i,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new dr(s,t,ne(),ne(),ne())}}/**
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
 */class so{constructor(e,t,s,i){this.Re=e,this.removedTargetIds=t,this.key=s,this.Ve=i}}class _m{constructor(e,t){this.targetId=e,this.me=t}}class bm{constructor(e,t,s=Se.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=i}}class lh{constructor(){this.fe=0,this.ge=uh(),this.pe=Se.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ne(),t=ne(),s=ne();return this.ge.forEach((i,r)=>{switch(r){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:s=s.add(i);break;default:H()}}),new dr(this.pe,this.ye,e,t,s)}Ce(){this.we=!1,this.ge=uh()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Y(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Q0{constructor(e){this.Le=e,this.Be=new Map,this.ke=lt(),this.qe=ch(),this.Qe=new ve(ee)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const s=this.Ge(t);switch(e.state){case 0:this.ze(t)&&s.De(e.resumeToken);break;case 1:s.Oe(),s.Se||s.Ce(),s.De(e.resumeToken);break;case 2:s.Oe(),s.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(s.Ne(),s.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),s.De(e.resumeToken));break;default:H()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((s,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,s=e.me.count,i=this.Je(t);if(i){const r=i.target;if(yo(r))if(s===0){const o=new q(r.path);this.Ue(t,o,Te.newNoDocument(o,J.min()))}else Y(s===1);else{const o=this.Ye(t);if(o!==s){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(t);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,u)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:i=0},hashCount:r=0}=t;let o,l;try{o=yn(s).toUint8Array()}catch(c){if(c instanceof zf)return vn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Tc(o,i,r)}catch(c){return vn(c instanceof xi?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,t,s){return t.me.count===s-this.nt(e,t.targetId)?0:2}nt(e,t){const s=this.Le.getRemoteKeysForTarget(t);let i=0;return s.forEach(r=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,r,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((r,o)=>{const l=this.Je(o);if(l){if(r.current&&yo(l.target)){const c=new q(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,Te.newNoDocument(c,e))}r.be&&(t.set(o,r.ve()),r.Ce())}});let s=ne();this.qe.forEach((r,o)=>{let l=!0;o.forEachWhile(c=>{const u=this.Je(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(s=s.add(r))}),this.ke.forEach((r,o)=>o.setReadTime(e));const i=new ur(e,t,this.Qe,this.ke,s);return this.ke=lt(),this.qe=ch(),this.Qe=new ve(ee),i}$e(e,t){if(!this.ze(e))return;const s=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,s),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,s){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),s&&(this.ke=this.ke.insert(t,s))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new lh,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new me(ee),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new lh),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function ch(){return new ve(q.comparator)}function uh(){return new ve(q.comparator)}const Y0={asc:"ASCENDING",desc:"DESCENDING"},J0={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},X0={and:"AND",or:"OR"};class Z0{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function kl(n,e){return n.useProto3Json||Uo(e)?e:{value:e}}function zs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function wm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function eI(n,e){return zs(n,e.toTimestamp())}function Je(n){return Y(!!n),J.fromTimestamp(function(t){const s=Yt(t);return new we(s.seconds,s.nanos)}(n))}function Ac(n,e){return Cl(n,e).canonicalString()}function Cl(n,e){const t=function(i){return new ce(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Im(n){const e=ce.fromString(n);return Y(xm(e)),e}function wo(n,e){return Ac(n.databaseId,e.path)}function Qn(n,e){const t=Im(e);if(t.get(1)!==n.databaseId.projectId)throw new B(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new B(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new q(Am(t))}function Em(n,e){return Ac(n.databaseId,e)}function Tm(n){const e=Im(n);return e.length===4?ce.emptyPath():Am(e)}function Pl(n){return new ce(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Am(n){return Y(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function dh(n,e,t){return{name:wo(n,e),fields:t.value.mapValue.fields}}function tI(n,e,t){const s=Qn(n,e.name),i=Je(e.updateTime),r=e.createTime?Je(e.createTime):J.min(),o=new Ge({mapValue:{fields:e.fields}}),l=Te.newFoundDocument(s,i,r,o);return t&&l.setHasCommittedMutations(),t?l.setHasCommittedMutations():l}function nI(n,e){let t;if("targetChange"in e){e.targetChange;const s=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:H()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],r=function(u,p){return u.useProto3Json?(Y(p===void 0||typeof p=="string"),Se.fromBase64String(p||"")):(Y(p===void 0||p instanceof Buffer||p instanceof Uint8Array),Se.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(u){const p=u.code===void 0?M.UNKNOWN:ym(u.code);return new B(p,u.message||"")}(o);t=new bm(s,i,r,l||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const i=Qn(n,s.document.name),r=Je(s.document.updateTime),o=s.document.createTime?Je(s.document.createTime):J.min(),l=new Ge({mapValue:{fields:s.document.fields}}),c=Te.newFoundDocument(i,r,o,l),u=s.targetIds||[],p=s.removedTargetIds||[];t=new so(u,p,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const i=Qn(n,s.document),r=s.readTime?Je(s.readTime):J.min(),o=Te.newNoDocument(i,r),l=s.removedTargetIds||[];t=new so([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const i=Qn(n,s.document),r=s.removedTargetIds||[];t=new so([],r,i,null)}else{if(!("filter"in e))return H();{e.filter;const s=e.filter;s.targetId;const{count:i=0,unchangedNames:r}=s,o=new G0(i,r),l=s.targetId;t=new _m(l,o)}}return t}function Io(n,e){let t;if(e instanceof Xs)t={update:dh(n,e.key,e.value)};else if(e instanceof cr)t={delete:wo(n,e.key)};else if(e instanceof Zt)t={update:dh(n,e.key,e.data),updateMask:lI(e.fieldMask)};else{if(!(e instanceof vm))return H();t={verify:wo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(s=>function(r,o){const l=o.transform;if(l instanceof qs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ts)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ns)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof js)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw H()}(0,s))),e.precondition.isNone||(t.currentDocument=function(i,r){return r.updateTime!==void 0?{updateTime:eI(i,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:H()}(n,e.precondition)),t}function Rl(n,e){const t=e.currentDocument?function(r){return r.updateTime!==void 0?Re.updateTime(Je(r.updateTime)):r.exists!==void 0?Re.exists(r.exists):Re.none()}(e.currentDocument):Re.none(),s=e.updateTransforms?e.updateTransforms.map(i=>function(o,l){let c=null;if("setToServerValue"in l)Y(l.setToServerValue==="REQUEST_TIME"),c=new qs;else if("appendMissingElements"in l){const p=l.appendMissingElements.values||[];c=new ts(p)}else if("removeAllFromArray"in l){const p=l.removeAllFromArray.values||[];c=new ns(p)}else"increment"in l?c=new js(o,l.increment):H();const u=be.fromServerFormat(l.fieldPath);return new lr(u,c)}(n,i)):[];if(e.update){e.update.name;const i=Qn(n,e.update.name),r=new Ge({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(c){const u=c.fieldPaths||[];return new st(u.map(p=>be.fromServerFormat(p)))}(e.updateMask);return new Zt(i,r,o,t,s)}return new Xs(i,r,t,s)}if(e.delete){const i=Qn(n,e.delete);return new cr(i,t)}if(e.verify){const i=Qn(n,e.verify);return new vm(i,t)}return H()}function sI(n,e){return n&&n.length>0?(Y(e!==void 0),n.map(t=>function(i,r){let o=i.updateTime?Je(i.updateTime):Je(r);return o.isEqual(J.min())&&(o=Je(r)),new q0(o,i.transformResults||[])}(t,e))):[]}function Sm(n,e){return{documents:[Em(n,e.path)]}}function km(n,e){const t={structuredQuery:{}},s=e.path;let i;e.collectionGroup!==null?(i=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=Em(n,i);const r=function(u){if(u.length!==0)return Rm(he.create(u,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(u){if(u.length!==0)return u.map(p=>function(g){return{field:As(g.field),direction:rI(g.dir)}}(p))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=kl(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:t,parent:i}}function Cm(n){let e=Tm(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let i=null;if(s>0){Y(s===1);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let r=[];t.where&&(r=function(m){const g=Pm(m);return g instanceof he&&yc(g)?g.getFilters():[g]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(g=>function(y){return new Xi(Ss(y.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(y.direction))}(g))}(t.orderBy));let l=null;t.limit&&(l=function(m){let g;return g=typeof m=="object"?m.value:m,Uo(g)?null:g}(t.limit));let c=null;t.startAt&&(c=function(m){const g=!!m.before,_=m.values||[];return new Bs(_,g)}(t.startAt));let u=null;return t.endAt&&(u=function(m){const g=!m.before,_=m.values||[];return new Bs(_,g)}(t.endAt)),tm(e,i,o,r,l,"F",c,u)}function iI(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return H()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Pm(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=Ss(t.unaryFilter.field);return ie.create(s,"==",{doubleValue:NaN});case"IS_NULL":const i=Ss(t.unaryFilter.field);return ie.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Ss(t.unaryFilter.field);return ie.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ss(t.unaryFilter.field);return ie.create(o,"!=",{nullValue:"NULL_VALUE"});default:return H()}}(n):n.fieldFilter!==void 0?function(t){return ie.create(Ss(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return H()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return he.create(t.compositeFilter.filters.map(s=>Pm(s)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return H()}}(t.compositeFilter.op))}(n):H()}function rI(n){return Y0[n]}function oI(n){return J0[n]}function aI(n){return X0[n]}function As(n){return{fieldPath:n.canonicalString()}}function Ss(n){return be.fromServerFormat(n.fieldPath)}function Rm(n){return n instanceof ie?function(t){if(t.op==="=="){if(Wd(t.value))return{unaryFilter:{field:As(t.field),op:"IS_NAN"}};if(Kd(t.value))return{unaryFilter:{field:As(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Wd(t.value))return{unaryFilter:{field:As(t.field),op:"IS_NOT_NAN"}};if(Kd(t.value))return{unaryFilter:{field:As(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:As(t.field),op:oI(t.op),value:t.value}}}(n):n instanceof he?function(t){const s=t.getFilters().map(i=>Rm(i));return s.length===1?s[0]:{compositeFilter:{op:aI(t.op),filters:s}}}(n):H()}function lI(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function xm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Gt{constructor(e,t,s,i,r=J.min(),o=J.min(),l=Se.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=i,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Gt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Gt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Dm{constructor(e){this.ct=e}}function cI(n,e){let t;if(e.document)t=tI(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const s=q.fromSegments(e.noDocument.path),i=is(e.noDocument.readTime);t=Te.newNoDocument(s,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return H();{const s=q.fromSegments(e.unknownDocument.path),i=is(e.unknownDocument.version);t=Te.newUnknownDocument(s,i)}}return e.readTime&&t.setReadTime(function(i){const r=new we(i[0],i[1]);return J.fromTimestamp(r)}(e.readTime)),t}function hh(n,e){const t=e.key,s={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Eo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())s.document=function(r,o){return{name:wo(r,o.key),fields:o.data.value.mapValue.fields,updateTime:zs(r,o.version.toTimestamp()),createTime:zs(r,o.createTime.toTimestamp())}}(n.ct,e);else if(e.isNoDocument())s.noDocument={path:t.path.toArray(),readTime:ss(e.version)};else{if(!e.isUnknownDocument())return H();s.unknownDocument={path:t.path.toArray(),version:ss(e.version)}}return s}function Eo(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function ss(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function is(n){const e=new we(n.seconds,n.nanoseconds);return J.fromTimestamp(e)}function jn(n,e){const t=(e.baseMutations||[]).map(r=>Rl(n.ct,r));for(let r=0;r<e.mutations.length-1;++r){const o=e.mutations[r];if(r+1<e.mutations.length&&e.mutations[r+1].transform!==void 0){const l=e.mutations[r+1];o.updateTransforms=l.transform.fieldTransforms,e.mutations.splice(r+1,1),++r}}const s=e.mutations.map(r=>Rl(n.ct,r)),i=we.fromMillis(e.localWriteTimeMs);return new wc(e.batchId,i,t,s)}function Di(n){const e=is(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?is(n.lastLimboFreeSnapshotVersion):J.min();let s;return s=function(r){return r.documents!==void 0}(n.query)?function(r){return Y(r.documents.length===1),ut(jo(Tm(r.documents[0])))}(n.query):function(r){return ut(Cm(r))}(n.query),new Gt(s,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Se.fromBase64String(n.resumeToken))}function Lm(n,e){const t=ss(e.snapshotVersion),s=ss(e.lastLimboFreeSnapshotVersion);let i;i=yo(e.target)?Sm(n.ct,e.target):km(n.ct,e.target)._t;const r=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:es(e.target),readTime:t,resumeToken:r,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:s,query:i}}function Vm(n){const e=Cm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?bo(e,e.limit,"L"):e}function Za(n,e){return new Ec(e.largestBatchId,Rl(n.ct,e.overlayMutation))}function ph(n,e){const t=e.path.lastSegment();return[n,Ye(e.path.popLast()),t]}function fh(n,e,t,s){return{indexId:n,uid:e,sequenceNumber:t,readTime:ss(s.readTime),documentKey:Ye(s.documentKey.path),largestBatchId:s.largestBatchId}}/**
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
 */class uI{getBundleMetadata(e,t){return mh(e).get(t).next(s=>{if(s)return function(r){return{id:r.bundleId,createTime:is(r.createTime),version:r.version}}(s)})}saveBundleMetadata(e,t){return mh(e).put(function(i){return{bundleId:i.id,createTime:ss(Je(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return gh(e).get(t).next(s=>{if(s)return function(r){return{name:r.name,query:Vm(r.bundledQuery),readTime:is(r.readTime)}}(s)})}saveNamedQuery(e,t){return gh(e).put(function(i){return{name:i.name,readTime:ss(Je(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function mh(n){return De(n,"bundles")}function gh(n){return De(n,"namedQueries")}/**
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
 */class Ko{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const s=t.uid||"";return new Ko(e,s)}getOverlay(e,t){return _i(e).get(ph(this.userId,t)).next(s=>s?Za(this.serializer,s):null)}getOverlays(e,t){const s=St();return D.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&s.set(i,r)})).next(()=>s)}saveOverlays(e,t,s){const i=[];return s.forEach((r,o)=>{const l=new Ec(t,o);i.push(this.ht(e,l))}),D.waitFor(i)}removeOverlaysForBatchId(e,t,s){const i=new Set;t.forEach(o=>i.add(Ye(o.getCollectionPath())));const r=[];return i.forEach(o=>{const l=IDBKeyRange.bound([this.userId,o,s],[this.userId,o,s+1],!1,!0);r.push(_i(e).j("collectionPathOverlayIndex",l))}),D.waitFor(r)}getOverlaysForCollection(e,t,s){const i=St(),r=Ye(t),o=IDBKeyRange.bound([this.userId,r,s],[this.userId,r,Number.POSITIVE_INFINITY],!0);return _i(e).U("collectionPathOverlayIndex",o).next(l=>{for(const c of l){const u=Za(this.serializer,c);i.set(u.getKey(),u)}return i})}getOverlaysForCollectionGroup(e,t,s,i){const r=St();let o;const l=IDBKeyRange.bound([this.userId,t,s],[this.userId,t,Number.POSITIVE_INFINITY],!0);return _i(e).J({index:"collectionGroupOverlayIndex",range:l},(c,u,p)=>{const m=Za(this.serializer,u);r.size()<i||m.largestBatchId===o?(r.set(m.getKey(),m),o=m.largestBatchId):p.done()}).next(()=>r)}ht(e,t){return _i(e).put(function(i,r,o){const[l,c,u]=ph(r,o.mutation.key);return{userId:r,collectionPath:c,documentId:u,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Io(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function _i(n){return De(n,"documentOverlays")}/**
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
 */class dI{Pt(e){return De(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const s=t==null?void 0:t.value;return s?Se.fromUint8Array(s):Se.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class zn{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(_e(e.integerValue));else if("doubleValue"in e){const s=_e(e.doubleValue);isNaN(s)?this.dt(t,13):(this.dt(t,15),Ki(s)?t.At(0):t.At(s))}else if("timestampValue"in e){let s=e.timestampValue;this.dt(t,20),typeof s=="string"&&(s=Yt(s)),t.Rt(`${s.seconds||""}`),t.At(s.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(yn(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const s=e.geoPointValue;this.dt(t,45),t.At(s.latitude||0),t.At(s.longitude||0)}else"mapValue"in e?Gf(e)?this.dt(t,Number.MAX_SAFE_INTEGER):qo(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):H()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const s=e.fields||{};this.dt(t,55);for(const i of Object.keys(s))this.Vt(i,t),this.Tt(s[i],t)}wt(e,t){var s,i;const r=e.fields||{};this.dt(t,53);const o="value",l=((i=(s=r[o].arrayValue)===null||s===void 0?void 0:s.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(_e(l)),this.Vt(o,t),this.Tt(r[o],t)}bt(e,t){const s=e.values||[];this.dt(t,50);for(const i of s)this.Tt(i,t)}yt(e,t){this.dt(t,37),q.fromName(e).path.forEach(s=>{this.dt(t,60),this.Dt(s,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}zn.vt=new zn;function hI(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function vh(n){const e=64-function(s){let i=0;for(let r=0;r<8;++r){const o=hI(255&s[r]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class pI{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let s=t.next();for(;!s.done;)this.Ft(s.value),s=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let s=t.next();for(;!s.done;)this.Ot(s.value),s=t.next();this.Nt()}Lt(e){for(const t of e){const s=t.charCodeAt(0);if(s<128)this.Ft(s);else if(s<2048)this.Ft(960|s>>>6),this.Ft(128|63&s);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|s>>>12),this.Ft(128|63&s>>>6),this.Ft(128|63&s);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const s=t.charCodeAt(0);if(s<128)this.Ot(s);else if(s<2048)this.Ot(960|s>>>6),this.Ot(128|63&s);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|s>>>12),this.Ot(128|63&s>>>6),this.Ot(128|63&s);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),s=vh(t);this.Qt(1+s),this.buffer[this.position++]=255&s;for(let i=t.length-s;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),s=vh(t);this.Qt(1+s),this.buffer[this.position++]=~(255&s);for(let i=t.length-s;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(r){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,r,!1),new Uint8Array(o.buffer)}(e),s=(128&t[0])!=0;t[0]^=s?255:128;for(let i=1;i<t.length;++i)t[i]^=s?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let s=2*this.buffer.length;s<t&&(s=t);const i=new Uint8Array(s);i.set(this.buffer),this.buffer=i}}class fI{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class mI{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class bi{constructor(){this.jt=new pI,this.Ht=new fI(this.jt),this.Jt=new mI(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class Gn{constructor(e,t,s,i){this.indexId=e,this.documentKey=t,this.arrayValue=s,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,s=new Uint8Array(t);return s.set(this.directionalValue,0),t!==e?s.set([0],this.directionalValue.length):++s[s.length-1],new Gn(this.indexId,this.documentKey,this.arrayValue,s)}}function on(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=yh(n.arrayValue,e.arrayValue),t!==0?t:(t=yh(n.directionalValue,e.directionalValue),t!==0?t:q.comparator(n.documentKey,e.documentKey)))}function yh(n,e){for(let t=0;t<n.length&&t<e.length;++t){const s=n[t]-e[t];if(s!==0)return s}return n.length-e.length}/**
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
 */class _h{constructor(e){this.Xt=new me((t,s)=>be.comparator(t.field,s.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const s=t;s.isInequality()?this.Xt=this.Xt.add(s):this.tn.push(s)}}get nn(){return this.Xt.size>1}rn(e){if(Y(e.collectionGroup===this.collectionId),this.nn)return!1;const t=_l(e);if(t!==void 0&&!this.sn(t))return!1;const s=Un(e);let i=new Set,r=0,o=0;for(;r<s.length&&this.sn(s[r]);++r)i=i.add(s[r].fieldPath.canonicalString());if(r===s.length)return!0;if(this.Xt.size>0){const l=this.Xt.getIterator().getNext();if(!i.has(l.field.canonicalString())){const c=s[r];if(!this.on(l,c)||!this._n(this.en[o++],c))return!1}++r}for(;r<s.length;++r){const l=s[r];if(o>=this.en.length||!this._n(this.en[o++],l))return!1}return!0}an(){if(this.nn)return null;let e=new me(be.comparator);const t=[];for(const s of this.tn)if(!s.field.isKeyField())if(s.op==="array-contains"||s.op==="array-contains-any")t.push(new Xr(s.field,2));else{if(e.has(s.field))continue;e=e.add(s.field),t.push(new Xr(s.field,0))}for(const s of this.en)s.field.isKeyField()||e.has(s.field)||(e=e.add(s.field),t.push(new Xr(s.field,s.dir==="asc"?0:1)));return new vo(vo.UNKNOWN_ID,this.collectionId,t,Hi.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const s=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===s}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Nm(n){var e,t;if(Y(n instanceof ie||n instanceof he),n instanceof ie){if(n instanceof em){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(r=>ie.create(n.field,"==",r)))||[];return he.create(i,"or")}return n}const s=n.filters.map(i=>Nm(i));return he.create(s,n.op)}function gI(n){if(n.getFilters().length===0)return[];const e=Ll(Nm(n));return Y(Mm(e)),xl(e)||Dl(e)?[e]:e.getFilters()}function xl(n){return n instanceof ie}function Dl(n){return n instanceof he&&yc(n)}function Mm(n){return xl(n)||Dl(n)||function(t){if(t instanceof he&&El(t)){for(const s of t.getFilters())if(!xl(s)&&!Dl(s))return!1;return!0}return!1}(n)}function Ll(n){if(Y(n instanceof ie||n instanceof he),n instanceof ie)return n;if(n.filters.length===1)return Ll(n.filters[0]);const e=n.filters.map(s=>Ll(s));let t=he.create(e,n.op);return t=To(t),Mm(t)?t:(Y(t instanceof he),Y(Us(t)),Y(t.filters.length>1),t.filters.reduce((s,i)=>Sc(s,i)))}function Sc(n,e){let t;return Y(n instanceof ie||n instanceof he),Y(e instanceof ie||e instanceof he),t=n instanceof ie?e instanceof ie?function(i,r){return he.create([i,r],"and")}(n,e):bh(n,e):e instanceof ie?bh(e,n):function(i,r){if(Y(i.filters.length>0&&r.filters.length>0),Us(i)&&Us(r))return Jf(i,r.getFilters());const o=El(i)?i:r,l=El(i)?r:i,c=o.filters.map(u=>Sc(u,l));return he.create(c,"or")}(n,e),To(t)}function bh(n,e){if(Us(e))return Jf(e,n.getFilters());{const t=e.filters.map(s=>Sc(n,s));return he.create(t,"or")}}function To(n){if(Y(n instanceof ie||n instanceof he),n instanceof ie)return n;const e=n.getFilters();if(e.length===1)return To(e[0]);if(Qf(n))return n;const t=e.map(i=>To(i)),s=[];return t.forEach(i=>{i instanceof ie?s.push(i):i instanceof he&&(i.op===n.op?s.push(...i.filters):s.push(i))}),s.length===1?s[0]:he.create(s,n.op)}/**
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
 */class vI{constructor(){this.un=new kc}addToCollectionParentIndex(e,t){return this.un.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(dt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(dt.min())}updateCollectionGroup(e,t,s){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class kc{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),i=this.index[t]||new me(ce.comparator),r=!i.has(s);return this.index[t]=i.add(s),r}has(e){const t=e.lastSegment(),s=e.popLast(),i=this.index[t];return i&&i.has(s)}getEntries(e){return(this.index[e]||new me(ce.comparator)).toArray()}}/**
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
 */const $r=new Uint8Array(0);class yI{constructor(e,t){this.databaseId=t,this.cn=new kc,this.ln=new An(s=>es(s),(s,i)=>or(s,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const s=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const r={collectionId:s,parent:Ye(i)};return wh(e).put(r)}return D.resolve()}getCollectionParents(e,t){const s=[],i=IDBKeyRange.bound([t,""],[Df(t),""],!1,!0);return wh(e).U(i).next(r=>{for(const o of r){if(o.collectionId!==t)break;s.push(At(o.parent))}return s})}addFieldIndex(e,t){const s=wi(e),i=function(l){return{indexId:l.indexId,collectionGroup:l.collectionGroup,fields:l.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(t);delete i.indexId;const r=s.add(i);if(t.indexState){const o=bs(e);return r.next(l=>{o.put(fh(l,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return r.next()}deleteFieldIndex(e,t){const s=wi(e),i=bs(e),r=_s(e);return s.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=wi(e),s=_s(e),i=bs(e);return t.j().next(()=>s.j()).next(()=>i.j())}createTargetIndexes(e,t){return D.forEach(this.hn(t),s=>this.getIndexType(e,s).next(i=>{if(i===0||i===1){const r=new _h(s).an();if(r!=null)return this.addFieldIndex(e,r)}}))}getDocumentsMatchingTarget(e,t){const s=_s(e);let i=!0;const r=new Map;return D.forEach(this.hn(t),o=>this.Pn(e,o).next(l=>{i&&(i=!!l),r.set(o,l)})).next(()=>{if(i){let o=ne();const l=[];return D.forEach(r,(c,u)=>{O("IndexedDbIndexManager",`Using index ${function(V){return`id=${V.indexId}|cg=${V.collectionGroup}|f=${V.fields.map($=>`${$.fieldPath}:${$.kind}`).join(",")}`}(c)} to execute ${es(t)}`);const p=function(V,$){const G=_l($);if(G===void 0)return null;for(const Q of _o(V,G.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null}(u,c),m=function(V,$){const G=new Map;for(const Q of Un($))for(const w of _o(V,Q.fieldPath))switch(w.op){case"==":case"in":G.set(Q.fieldPath.canonicalString(),w.value);break;case"not-in":case"!=":return G.set(Q.fieldPath.canonicalString(),w.value),Array.from(G.values())}return null}(u,c),g=function(V,$){const G=[];let Q=!0;for(const w of Un($)){const b=w.kind===0?Zd(V,w.fieldPath,V.startAt):eh(V,w.fieldPath,V.startAt);G.push(b.value),Q&&(Q=b.inclusive)}return new Bs(G,Q)}(u,c),_=function(V,$){const G=[];let Q=!0;for(const w of Un($)){const b=w.kind===0?eh(V,w.fieldPath,V.endAt):Zd(V,w.fieldPath,V.endAt);G.push(b.value),Q&&(Q=b.inclusive)}return new Bs(G,Q)}(u,c),y=this.In(c,u,g),x=this.In(c,u,_),C=this.Tn(c,u,m),L=this.En(c.indexId,p,y,g.inclusive,x,_.inclusive,C);return D.forEach(L,T=>s.G(T,t.limit).next(V=>{V.forEach($=>{const G=q.fromSegments($.documentKey);o.has(G)||(o=o.add(G),l.push(G))})}))}).next(()=>l)}return D.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=gI(he.create(e.filters,"and")).map(s=>Al(e.path,e.collectionGroup,e.orderBy,s.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,s,i,r,o,l){const c=(t!=null?t.length:1)*Math.max(s.length,r.length),u=c/(t!=null?t.length:1),p=[];for(let m=0;m<c;++m){const g=t?this.dn(t[m/u]):$r,_=this.An(e,g,s[m%u],i),y=this.Rn(e,g,r[m%u],o),x=l.map(C=>this.An(e,g,C,!0));p.push(...this.createRange(_,y,x))}return p}An(e,t,s,i){const r=new Gn(e,q.empty(),t,s);return i?r:r.Zt()}Rn(e,t,s,i){const r=new Gn(e,q.empty(),t,s);return i?r.Zt():r}Pn(e,t){const s=new _h(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(r=>{let o=null;for(const l of r)s.rn(l)&&(!o||l.fields.length>o.fields.length)&&(o=l);return o})}getIndexType(e,t){let s=2;const i=this.hn(t);return D.forEach(i,r=>this.Pn(e,r).next(o=>{o?s!==0&&o.fields.length<function(c){let u=new me(be.comparator),p=!1;for(const m of c.filters)for(const g of m.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?p=!0:u=u.add(g.field));for(const m of c.orderBy)m.field.isKeyField()||(u=u.add(m.field));return u.size+(p?1:0)}(r)&&(s=1):s=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&s===2?1:s)}Vn(e,t){const s=new bi;for(const i of Un(e)){const r=t.data.field(i.fieldPath);if(r==null)return null;const o=s.Yt(i.kind);zn.vt.It(r,o)}return s.zt()}dn(e){const t=new bi;return zn.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const s=new bi;return zn.vt.It(Yi(this.databaseId,t),s.Yt(function(r){const o=Un(r);return o.length===0?0:o[o.length-1].kind}(e))),s.zt()}Tn(e,t,s){if(s===null)return[];let i=[];i.push(new bi);let r=0;for(const o of Un(e)){const l=s[r++];for(const c of i)if(this.fn(t,o.fieldPath)&&Ji(l))i=this.gn(i,o,l);else{const u=c.Yt(o.kind);zn.vt.It(l,u)}}return this.pn(i)}In(e,t,s){return this.Tn(e,t,s.position)}pn(e){const t=[];for(let s=0;s<e.length;++s)t[s]=e[s].zt();return t}gn(e,t,s){const i=[...e],r=[];for(const o of s.arrayValue.values||[])for(const l of i){const c=new bi;c.seed(l.zt()),zn.vt.It(o,c.Yt(t.kind)),r.push(c)}return r}fn(e,t){return!!e.filters.find(s=>s instanceof ie&&s.field.isEqual(t)&&(s.op==="in"||s.op==="not-in"))}getFieldIndexes(e,t){const s=wi(e),i=bs(e);return(t?s.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):s.U()).next(r=>{const o=[];return D.forEach(r,l=>i.get([l.indexId,this.uid]).next(c=>{o.push(function(p,m){const g=m?new Hi(m.sequenceNumber,new dt(is(m.readTime),new q(At(m.documentKey)),m.largestBatchId)):Hi.empty(),_=p.fields.map(([y,x])=>new Xr(be.fromServerFormat(y),x));return new vo(p.indexId,p.collectionGroup,_,g)}(l,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((s,i)=>{const r=s.indexState.sequenceNumber-i.indexState.sequenceNumber;return r!==0?r:ee(s.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,s){const i=wi(e),r=bs(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(l=>D.forEach(l,c=>r.put(fh(c.indexId,this.uid,o,s)))))}updateIndexEntries(e,t){const s=new Map;return D.forEach(t,(i,r)=>{const o=s.get(i.collectionGroup);return(o?D.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(l=>(s.set(i.collectionGroup,l),D.forEach(l,c=>this.wn(e,i,c).next(u=>{const p=this.Sn(r,c);return u.isEqual(p)?D.resolve():this.bn(e,r,c,u,p)}))))})}Dn(e,t,s,i){return _s(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(s,t.key),documentKey:t.key.path.toArray()})}vn(e,t,s,i){return _s(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(s,t.key),t.key.path.toArray()])}wn(e,t,s){const i=_s(e);let r=new me(on);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([s.indexId,this.uid,this.mn(s,t)])},(o,l)=>{r=r.add(new Gn(s.indexId,t,l.arrayValue,l.directionalValue))}).next(()=>r)}Sn(e,t){let s=new me(on);const i=this.Vn(t,e);if(i==null)return s;const r=_l(t);if(r!=null){const o=e.data.field(r.fieldPath);if(Ji(o))for(const l of o.arrayValue.values||[])s=s.add(new Gn(t.indexId,e.key,this.dn(l),i))}else s=s.add(new Gn(t.indexId,e.key,$r,i));return s}bn(e,t,s,i,r){O("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(c,u,p,m,g){const _=c.getIterator(),y=u.getIterator();let x=ys(_),C=ys(y);for(;x||C;){let L=!1,T=!1;if(x&&C){const V=p(x,C);V<0?T=!0:V>0&&(L=!0)}else x!=null?T=!0:L=!0;L?(m(C),C=ys(y)):T?(g(x),x=ys(_)):(x=ys(_),C=ys(y))}}(i,r,on,l=>{o.push(this.Dn(e,t,s,l))},l=>{o.push(this.vn(e,t,s,l))}),D.waitFor(o)}yn(e){let t=1;return bs(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(s,i,r)=>{r.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,s){s=s.sort((o,l)=>on(o,l)).filter((o,l,c)=>!l||on(o,c[l-1])!==0);const i=[];i.push(e);for(const o of s){const l=on(o,e),c=on(o,t);if(l===0)i[0]=e.Zt();else if(l>0&&c<0)i.push(o),i.push(o.Zt());else if(c>0)break}i.push(t);const r=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const l=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,$r,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,$r,[]];r.push(IDBKeyRange.bound(l,c))}return r}Cn(e,t){return on(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Ih)}getMinOffset(e,t){return D.mapArray(this.hn(t),s=>this.Pn(e,s).next(i=>i||H())).next(Ih)}}function wh(n){return De(n,"collectionParents")}function _s(n){return De(n,"indexEntries")}function wi(n){return De(n,"indexConfiguration")}function bs(n){return De(n,"indexState")}function Ih(n){Y(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let s=1;s<n.length;s++){const i=n[s].indexState.offset;pc(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new dt(e.readTime,e.documentKey,t)}/**
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
 */const Eh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class tt{constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}static withCacheSize(e){return new tt(e,tt.DEFAULT_COLLECTION_PERCENTILE,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function Om(n,e,t){const s=n.store("mutations"),i=n.store("documentMutations"),r=[],o=IDBKeyRange.only(t.batchId);let l=0;const c=s.J({range:o},(p,m,g)=>(l++,g.delete()));r.push(c.next(()=>{Y(l===1)}));const u=[];for(const p of t.mutations){const m=$f(e,p.key.path,t.batchId);r.push(i.delete(m)),u.push(p.key)}return D.waitFor(r).next(()=>u)}function Ao(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw H();e=n.noDocument}return JSON.stringify(e).length}/**
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
 */tt.DEFAULT_COLLECTION_PERCENTILE=10,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,tt.DEFAULT=new tt(41943040,tt.DEFAULT_COLLECTION_PERCENTILE,tt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),tt.DISABLED=new tt(-1,0,0);class Wo{constructor(e,t,s,i){this.userId=e,this.serializer=t,this.indexManager=s,this.referenceDelegate=i,this.Fn={}}static lt(e,t,s,i){Y(e.uid!=="");const r=e.isAuthenticated()?e.uid:"";return new Wo(r,t,s,i)}checkEmpty(e){let t=!0;const s=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return an(e).J({index:"userMutationsIndex",range:s},(i,r,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,s,i){const r=ks(e),o=an(e);return o.add({}).next(l=>{Y(typeof l=="number");const c=new wc(l,t,s,i),u=function(_,y,x){const C=x.baseMutations.map(T=>Io(_.ct,T)),L=x.mutations.map(T=>Io(_.ct,T));return{userId:y,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:C,mutations:L}}(this.serializer,this.userId,c),p=[];let m=new me((g,_)=>ee(g.canonicalString(),_.canonicalString()));for(const g of i){const _=$f(this.userId,g.key.path,l);m=m.add(g.key.path.popLast()),p.push(o.put(u)),p.push(r.put(_,s0))}return m.forEach(g=>{p.push(this.indexManager.addToCollectionParentIndex(e,g))}),e.addOnCommittedListener(()=>{this.Fn[l]=c.keys()}),D.waitFor(p).next(()=>c)})}lookupMutationBatch(e,t){return an(e).get(t).next(s=>s?(Y(s.userId===this.userId),jn(this.serializer,s)):null)}Mn(e,t){return this.Fn[t]?D.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(s=>{if(s){const i=s.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const s=t+1,i=IDBKeyRange.lowerBound([this.userId,s]);let r=null;return an(e).J({index:"userMutationsIndex",range:i},(o,l,c)=>{l.userId===this.userId&&(Y(l.batchId>=s),r=jn(this.serializer,l)),c.done()}).next(()=>r)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let s=-1;return an(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,r,o)=>{s=r.batchId,o.done()}).next(()=>s)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return an(e).U("userMutationsIndex",t).next(s=>s.map(i=>jn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const s=Zr(this.userId,t.path),i=IDBKeyRange.lowerBound(s),r=[];return ks(e).J({range:i},(o,l,c)=>{const[u,p,m]=o,g=At(p);if(u===this.userId&&t.path.isEqual(g))return an(e).get(m).next(_=>{if(!_)throw H();Y(_.userId===this.userId),r.push(jn(this.serializer,_))});c.done()}).next(()=>r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new me(ee);const i=[];return t.forEach(r=>{const o=Zr(this.userId,r.path),l=IDBKeyRange.lowerBound(o),c=ks(e).J({range:l},(u,p,m)=>{const[g,_,y]=u,x=At(_);g===this.userId&&r.path.isEqual(x)?s=s.add(y):m.done()});i.push(c)}),D.waitFor(i).next(()=>this.xn(e,s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,i=s.length+1,r=Zr(this.userId,s),o=IDBKeyRange.lowerBound(r);let l=new me(ee);return ks(e).J({range:o},(c,u,p)=>{const[m,g,_]=c,y=At(g);m===this.userId&&s.isPrefixOf(y)?y.length===i&&(l=l.add(_)):p.done()}).next(()=>this.xn(e,l))}xn(e,t){const s=[],i=[];return t.forEach(r=>{i.push(an(e).get(r).next(o=>{if(o===null)throw H();Y(o.userId===this.userId),s.push(jn(this.serializer,o))}))}),D.waitFor(i).next(()=>s)}removeMutationBatch(e,t){return Om(e._e,this.userId,t).next(s=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),D.forEach(s,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return D.resolve();const s=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return ks(e).J({range:s},(r,o,l)=>{if(r[0]===this.userId){const c=At(r[1]);i.push(c)}else l.done()}).next(()=>{Y(i.length===0)})})}containsKey(e,t){return Fm(e,this.userId,t)}Nn(e){return $m(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function Fm(n,e,t){const s=Zr(e,t.path),i=s[1],r=IDBKeyRange.lowerBound(s);let o=!1;return ks(n).J({range:r,H:!0},(l,c,u)=>{const[p,m,g]=l;p===e&&m===i&&(o=!0),u.done()}).next(()=>o)}function an(n){return De(n,"mutations")}function ks(n){return De(n,"documentMutations")}function $m(n){return De(n,"mutationQueues")}/**
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
 */class rs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new rs(0)}static kn(){return new rs(-1)}}/**
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
 */class _I{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const s=new rs(t.highestTargetId);return t.highestTargetId=s.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>J.fromTimestamp(new we(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,s){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,s&&(i.lastRemoteSnapshotVersion=s.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(s=>(s.targetCount+=1,this.$n(t,s),this.Qn(e,s))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>ws(e).delete(t.targetId)).next(()=>this.qn(e)).next(s=>(Y(s.targetCount>0),s.targetCount-=1,this.Qn(e,s)))}removeTargets(e,t,s){let i=0;const r=[];return ws(e).J((o,l)=>{const c=Di(l);c.sequenceNumber<=t&&s.get(c.targetId)===null&&(i++,r.push(this.removeTargetData(e,c)))}).next(()=>D.waitFor(r)).next(()=>i)}forEachTarget(e,t){return ws(e).J((s,i)=>{const r=Di(i);t(r)})}qn(e){return Th(e).get("targetGlobalKey").next(t=>(Y(t!==null),t))}Qn(e,t){return Th(e).put("targetGlobalKey",t)}Kn(e,t){return ws(e).put(Lm(this.serializer,t))}$n(e,t){let s=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,s=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,s=!0),s}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const s=es(t),i=IDBKeyRange.bound([s,Number.NEGATIVE_INFINITY],[s,Number.POSITIVE_INFINITY]);let r=null;return ws(e).J({range:i,index:"queryTargetsIndex"},(o,l,c)=>{const u=Di(l);or(t,u.target)&&(r=u,c.done())}).next(()=>r)}addMatchingKeys(e,t,s){const i=[],r=cn(e);return t.forEach(o=>{const l=Ye(o.path);i.push(r.put({targetId:s,path:l})),i.push(this.referenceDelegate.addReference(e,s,o))}),D.waitFor(i)}removeMatchingKeys(e,t,s){const i=cn(e);return D.forEach(t,r=>{const o=Ye(r.path);return D.waitFor([i.delete([s,o]),this.referenceDelegate.removeReference(e,s,r)])})}removeMatchingKeysForTargetId(e,t){const s=cn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return s.delete(i)}getMatchingKeysForTargetId(e,t){const s=IDBKeyRange.bound([t],[t+1],!1,!0),i=cn(e);let r=ne();return i.J({range:s,H:!0},(o,l,c)=>{const u=At(o[1]),p=new q(u);r=r.add(p)}).next(()=>r)}containsKey(e,t){const s=Ye(t.path),i=IDBKeyRange.bound([s],[Df(s)],!1,!0);let r=0;return cn(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,l],c,u)=>{o!==0&&(r++,u.done())}).next(()=>r>0)}ot(e,t){return ws(e).get(t).next(s=>s?Di(s):null)}}function ws(n){return De(n,"targets")}function Th(n){return De(n,"targetGlobal")}function cn(n){return De(n,"targetDocuments")}/**
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
 */function Ah([n,e],[t,s]){const i=ee(n,t);return i===0?ee(e,s):i}class bI{constructor(e){this.Un=e,this.buffer=new me(Ah),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();Ah(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class wI{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){O("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Tn(t)?O("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await En(t)}await this.Hn(3e5)})}}class II{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(s=>Math.floor(t/100*s))}nthSequenceNumber(e,t){if(t===0)return D.resolve(nt.oe);const s=new bI(t);return this.Jn.forEachTarget(e,i=>s.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>s.zn(i))).next(()=>s.maxValue)}removeTargets(e,t,s){return this.Jn.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),D.resolve(Eh)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Eh):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let s,i,r,o,l,c,u;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(s=m,l=Date.now(),this.removeTargets(e,s,t))).next(m=>(r=m,c=Date.now(),this.removeOrphanedDocuments(e,s))).next(m=>(u=Date.now(),Es()<=se.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${r} targets in `+(c-l)+`ms
	Removed ${m} documents in `+(u-c)+`ms
Total Duration: ${u-p}ms`),D.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:r,documentsRemoved:m})))}}function EI(n,e){return new II(n,e)}/**
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
 */class TI{constructor(e,t){this.db=e,this.garbageCollector=EI(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(s=>t.next(i=>s+i))}er(e){let t=0;return this.Zn(e,s=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(s,i)=>t(i))}addReference(e,t,s){return Br(e,s)}removeReference(e,t,s){return Br(e,s)}removeTargets(e,t,s){return this.db.getTargetCache().removeTargets(e,t,s)}markPotentiallyOrphaned(e,t){return Br(e,t)}nr(e,t){return function(i,r){let o=!1;return $m(i).Y(l=>Fm(i,l,r).next(c=>(c&&(o=!0),D.resolve(!c)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const s=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let r=0;return this.tr(e,(o,l)=>{if(l<=t){const c=this.nr(e,o).next(u=>{if(!u)return r++,s.getEntry(e,o).next(()=>(s.removeEntry(o,J.min()),cn(e).delete(function(m){return[0,Ye(m.path)]}(o))))});i.push(c)}}).next(()=>D.waitFor(i)).next(()=>s.apply(e)).next(()=>r)}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,s)}updateLimboDocument(e,t){return Br(e,t)}tr(e,t){const s=cn(e);let i,r=nt.oe;return s.J({index:"documentTargetsIndex"},([o,l],{path:c,sequenceNumber:u})=>{o===0?(r!==nt.oe&&t(new q(At(i)),r),r=u,i=c):r=nt.oe}).next(()=>{r!==nt.oe&&t(new q(At(i)),r)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Br(n,e){return cn(n).put(function(s,i){return{targetId:0,path:Ye(s.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
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
 */class Bm{constructor(){this.changes=new An(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Te.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?D.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class AI{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,s){return Fn(e).put(s)}removeEntry(e,t,s){return Fn(e).delete(function(r,o){const l=r.path.toArray();return[l.slice(0,l.length-2),l[l.length-2],Eo(o),l[l.length-1]]}(t,s))}updateMetadata(e,t){return this.getMetadata(e).next(s=>(s.byteSize+=t,this.rr(e,s)))}getEntry(e,t){let s=Te.newInvalidDocument(t);return Fn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Ii(t))},(i,r)=>{s=this.ir(t,r)}).next(()=>s)}sr(e,t){let s={size:0,document:Te.newInvalidDocument(t)};return Fn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Ii(t))},(i,r)=>{s={document:this.ir(t,r),size:Ao(r)}}).next(()=>s)}getEntries(e,t){let s=lt();return this._r(e,t,(i,r)=>{const o=this.ir(i,r);s=s.insert(i,o)}).next(()=>s)}ar(e,t){let s=lt(),i=new ve(q.comparator);return this._r(e,t,(r,o)=>{const l=this.ir(r,o);s=s.insert(r,l),i=i.insert(r,Ao(o))}).next(()=>({documents:s,ur:i}))}_r(e,t,s){if(t.isEmpty())return D.resolve();let i=new me(Ch);t.forEach(c=>i=i.add(c));const r=IDBKeyRange.bound(Ii(i.first()),Ii(i.last())),o=i.getIterator();let l=o.getNext();return Fn(e).J({index:"documentKeyIndex",range:r},(c,u,p)=>{const m=q.fromSegments([...u.prefixPath,u.collectionGroup,u.documentId]);for(;l&&Ch(l,m)<0;)s(l,null),l=o.getNext();l&&l.isEqual(m)&&(s(l,u),l=o.hasNext()?o.getNext():null),l?p.$(Ii(l)):p.done()}).next(()=>{for(;l;)s(l,null),l=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,s,i,r){const o=t.path,l=[o.popLast().toArray(),o.lastSegment(),Eo(s.readTime),s.documentKey.path.isEmpty()?"":s.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Fn(e).U(IDBKeyRange.bound(l,c,!0)).next(u=>{r==null||r.incrementDocumentReadCount(u.length);let p=lt();for(const m of u){const g=this.ir(q.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);g.isFoundDocument()&&(ar(t,g)||i.has(g.key))&&(p=p.insert(g.key,g))}return p})}getAllFromCollectionGroup(e,t,s,i){let r=lt();const o=kh(t,s),l=kh(t,dt.max());return Fn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,l,!0)},(c,u,p)=>{const m=this.ir(q.fromSegments(u.prefixPath.concat(u.collectionGroup,u.documentId)),u);r=r.insert(m.key,m),r.size===i&&p.done()}).next(()=>r)}newChangeBuffer(e){return new SI(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Sh(e).get("remoteDocumentGlobalKey").next(t=>(Y(!!t),t))}rr(e,t){return Sh(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const s=cI(this.serializer,t);if(!(s.isNoDocument()&&s.version.isEqual(J.min())))return s}return Te.newInvalidDocument(e)}}function Um(n){return new AI(n)}class SI extends Bm{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new An(s=>s.toString(),(s,i)=>s.isEqual(i))}applyChanges(e){const t=[];let s=0,i=new me((r,o)=>ee(r.canonicalString(),o.canonicalString()));return this.changes.forEach((r,o)=>{const l=this.lr.get(r);if(t.push(this.cr.removeEntry(e,r,l.readTime)),o.isValidDocument()){const c=hh(this.cr.serializer,o);i=i.add(r.path.popLast());const u=Ao(c);s+=u-l.size,t.push(this.cr.addEntry(e,r,c))}else if(s-=l.size,this.trackRemovals){const c=hh(this.cr.serializer,o.convertToNoDocument(J.min()));t.push(this.cr.addEntry(e,r,c))}}),i.forEach(r=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,r))}),t.push(this.cr.updateMetadata(e,s)),D.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(s=>(this.lr.set(t,{size:s.size,readTime:s.document.readTime}),s.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:s,ur:i})=>(i.forEach((r,o)=>{this.lr.set(r,{size:o,readTime:s.get(r).readTime})}),s))}}function Sh(n){return De(n,"remoteDocumentGlobal")}function Fn(n){return De(n,"remoteDocumentsV14")}function Ii(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function kh(n,e){const t=e.documentKey.path.toArray();return[n,Eo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Ch(n,e){const t=n.path.toArray(),s=e.path.toArray();let i=0;for(let r=0;r<t.length-2&&r<s.length-2;++r)if(i=ee(t[r],s[r]),i)return i;return i=ee(t.length,s.length),i||(i=ee(t[t.length-2],s[s.length-2]),i||ee(t[t.length-1],s[s.length-1]))}/**
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
 *//**
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
 */class kI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class qm{constructor(e,t,s,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=i}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(s=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(s!==null&&Bi(s.mutation,i,st.empty(),we.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,ne()).next(()=>s))}getLocalViewOfDocuments(e,t,s=ne()){const i=St();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,s).next(r=>{let o=Ri();return r.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const s=St();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,ne()))}populateOverlays(e,t,s){const i=[];return s.forEach(r=>{t.has(r)||i.push(r)}),this.documentOverlayCache.getOverlays(e,i).next(r=>{r.forEach((o,l)=>{t.set(o,l)})})}computeViews(e,t,s,i){let r=lt();const o=$i(),l=function(){return $i()}();return t.forEach((c,u)=>{const p=s.get(u.key);i.has(u.key)&&(p===void 0||p.mutation instanceof Zt)?r=r.insert(u.key,u):p!==void 0?(o.set(u.key,p.mutation.getFieldMask()),Bi(p.mutation,u,p.mutation.getFieldMask(),we.now())):o.set(u.key,st.empty())}),this.recalculateAndSaveOverlays(e,r).next(c=>(c.forEach((u,p)=>o.set(u,p)),t.forEach((u,p)=>{var m;return l.set(u,new kI(p,(m=o.get(u))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,t){const s=$i();let i=new ve((o,l)=>o-l),r=ne();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const l of o)l.keys().forEach(c=>{const u=t.get(c);if(u===null)return;let p=s.get(c)||st.empty();p=l.applyToLocalView(u,p),s.set(c,p);const m=(i.get(l.batchId)||ne()).add(c);i=i.insert(l.batchId,m)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,p=c.value,m=lm();p.forEach(g=>{if(!r.has(g)){const _=mm(t.get(g),s.get(g));_!==null&&m.set(g,_),r=r.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,m))}return D.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,i){return function(o){return q.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):nm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,i):this.getDocumentsMatchingCollectionQuery(e,t,s,i)}getNextDocuments(e,t,s,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,i).next(r=>{const o=i-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,i-r.size):D.resolve(St());let l=-1,c=r;return o.next(u=>D.forEach(u,(p,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),r.get(p)?D.resolve():this.remoteDocumentCache.getEntry(e,p).next(g=>{c=c.insert(p,g)}))).next(()=>this.populateOverlays(e,u,r)).next(()=>this.computeViews(e,c,u,ne())).next(p=>({batchId:l,changes:am(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next(s=>{let i=Ri();return s.isFoundDocument()&&(i=i.insert(s.key,s)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,s,i){const r=t.collectionGroup;let o=Ri();return this.indexManager.getCollectionParents(e,r).next(l=>D.forEach(l,c=>{const u=function(m,g){return new Js(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,c.child(r));return this.getDocumentsMatchingCollectionQuery(e,u,s,i).next(p=>{p.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,s,i){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,r,i))).next(o=>{r.forEach((c,u)=>{const p=u.getKey();o.get(p)===null&&(o=o.insert(p,Te.newInvalidDocument(p)))});let l=Ri();return o.forEach((c,u)=>{const p=r.get(c);p!==void 0&&Bi(p.mutation,u,st.empty(),we.now()),ar(t,u)&&(l=l.insert(c,u))}),l})}}/**
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
 */class CI{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return D.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Je(i.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:Vm(i.bundledQuery),readTime:Je(i.readTime)}}(t)),D.resolve()}}/**
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
 */class PI{constructor(){this.overlays=new ve(q.comparator),this.Ir=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const s=St();return D.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&s.set(i,r)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((i,r)=>{this.ht(e,t,r)}),D.resolve()}removeOverlaysForBatchId(e,t,s){const i=this.Ir.get(s);return i!==void 0&&(i.forEach(r=>this.overlays=this.overlays.remove(r)),this.Ir.delete(s)),D.resolve()}getOverlaysForCollection(e,t,s){const i=St(),r=t.length+1,o=new q(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===r&&c.largestBatchId>s&&i.set(c.getKey(),c)}return D.resolve(i)}getOverlaysForCollectionGroup(e,t,s,i){let r=new ve((u,p)=>u-p);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>s){let p=r.get(u.largestBatchId);p===null&&(p=St(),r=r.insert(u.largestBatchId,p)),p.set(u.getKey(),u)}}const l=St(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,p)=>l.set(u,p)),!(l.size()>=i)););return D.resolve(l)}ht(e,t,s){const i=this.overlays.get(s.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(s.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new Ec(t,s));let r=this.Ir.get(t);r===void 0&&(r=ne(),this.Ir.set(t,r)),this.Ir.set(t,r.add(s.key))}}/**
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
 */class RI{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
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
 */class Cc{constructor(){this.Tr=new me(Ve.Er),this.dr=new me(Ve.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const s=new Ve(e,t);this.Tr=this.Tr.add(s),this.dr=this.dr.add(s)}Rr(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.Vr(new Ve(e,t))}mr(e,t){e.forEach(s=>this.removeReference(s,t))}gr(e){const t=new q(new ce([])),s=new Ve(t,e),i=new Ve(t,e+1),r=[];return this.dr.forEachInRange([s,i],o=>{this.Vr(o),r.push(o.key)}),r}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new q(new ce([])),s=new Ve(t,e),i=new Ve(t,e+1);let r=ne();return this.dr.forEachInRange([s,i],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new Ve(e,0),s=this.Tr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Ve{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return q.comparator(e.key,t.key)||ee(e.wr,t.wr)}static Ar(e,t){return ee(e.wr,t.wr)||q.comparator(e.key,t.key)}}/**
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
 */class xI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new me(Ve.Er)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,i){const r=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new wc(r,t,s,i);this.mutationQueue.push(o);for(const l of i)this.br=this.br.add(new Ve(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return D.resolve(o)}lookupMutationBatch(e,t){return D.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,i=this.vr(s),r=i<0?0:i;return D.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Ve(t,0),i=new Ve(t,Number.POSITIVE_INFINITY),r=[];return this.br.forEachInRange([s,i],o=>{const l=this.Dr(o.wr);r.push(l)}),D.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new me(ee);return t.forEach(i=>{const r=new Ve(i,0),o=new Ve(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([r,o],l=>{s=s.add(l.wr)})}),D.resolve(this.Cr(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,i=s.length+1;let r=s;q.isDocumentKey(r)||(r=r.child(""));const o=new Ve(new q(r),0);let l=new me(ee);return this.br.forEachWhile(c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===i&&(l=l.add(c.wr)),!0)},o),D.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(s=>{const i=this.Dr(s);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Y(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let s=this.br;return D.forEach(t.mutations,i=>{const r=new Ve(i.key,t.batchId);return s=s.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=s})}On(e){}containsKey(e,t){const s=new Ve(t,0),i=this.br.firstAfterOrEqual(s);return D.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class DI{constructor(e){this.Mr=e,this.docs=function(){return new ve(q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,i=this.docs.get(s),r=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return D.resolve(s?s.document.mutableCopy():Te.newInvalidDocument(t))}getEntries(e,t){let s=lt();return t.forEach(i=>{const r=this.docs.get(i);s=s.insert(i,r?r.document.mutableCopy():Te.newInvalidDocument(i))}),D.resolve(s)}getDocumentsMatchingQuery(e,t,s,i){let r=lt();const o=t.path,l=new q(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:p}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||pc(Vf(p),s)<=0||(i.has(p.key)||ar(t,p))&&(r=r.insert(p.key,p.mutableCopy()))}return D.resolve(r)}getAllFromCollectionGroup(e,t,s,i){H()}Or(e,t){return D.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new LI(this)}getSize(e){return D.resolve(this.size)}}class LI extends Bm{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((s,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(s)}),D.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class VI{constructor(e){this.persistence=e,this.Nr=new An(t=>es(t),or),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Cc,this.targetCount=0,this.kr=rs.Bn()}forEachTarget(e,t){return this.Nr.forEach((s,i)=>t(i)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.Lr&&(this.Lr=t),D.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new rs(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.Kn(t),D.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,s){let i=0;const r=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=t&&s.get(l.targetId)===null&&(this.Nr.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),D.waitFor(r).next(()=>i)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const s=this.Nr.get(t)||null;return D.resolve(s)}addMatchingKeys(e,t,s){return this.Br.Rr(t,s),D.resolve()}removeMatchingKeys(e,t,s){this.Br.mr(t,s);const i=this.persistence.referenceDelegate,r=[];return i&&t.forEach(o=>{r.push(i.markPotentiallyOrphaned(e,o))}),D.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),D.resolve()}getMatchingKeysForTargetId(e,t){const s=this.Br.yr(t);return D.resolve(s)}containsKey(e,t){return D.resolve(this.Br.containsKey(t))}}/**
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
 */class jm{constructor(e,t){this.qr={},this.overlays={},this.Qr=new nt(0),this.Kr=!1,this.Kr=!0,this.$r=new RI,this.referenceDelegate=e(this),this.Ur=new VI(this),this.indexManager=new vI,this.remoteDocumentCache=function(i){return new DI(i)}(s=>this.referenceDelegate.Wr(s)),this.serializer=new Dm(t),this.Gr=new CI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new PI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.qr[e.toKey()];return s||(s=new xI(t,this.referenceDelegate),this.qr[e.toKey()]=s),s}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,s){O("MemoryPersistence","Starting transaction:",e);const i=new NI(this.Qr.next());return this.referenceDelegate.zr(),s(i).next(r=>this.referenceDelegate.jr(i).next(()=>r)).toPromise().then(r=>(i.raiseOnCommittedEvent(),r))}Hr(e,t){return D.or(Object.values(this.qr).map(s=>()=>s.containsKey(e,t)))}}class NI extends Mf{constructor(e){super(),this.currentSequenceNumber=e}}class Qo{constructor(e){this.persistence=e,this.Jr=new Cc,this.Yr=null}static Zr(e){return new Qo(e)}get Xr(){if(this.Yr)return this.Yr;throw H()}addReference(e,t,s){return this.Jr.addReference(s,t),this.Xr.delete(s.toString()),D.resolve()}removeReference(e,t,s){return this.Jr.removeReference(s,t),this.Xr.add(s.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),D.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(r=>this.Xr.add(r.toString()))}).next(()=>s.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.Xr,s=>{const i=q.fromPath(s);return this.ei(e,i).next(r=>{r||t.removeEntry(i,J.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(s=>{s?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return D.or([()=>D.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class MI{constructor(e){this.serializer=e}O(e,t,s,i){const r=new Bo("createOrUpgrade",t);s<1&&i>=1&&(function(c){c.createObjectStore("owner")}(e),function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",qd,{unique:!0}),c.createObjectStore("documentMutations")}(e),Ph(e),function(c){c.createObjectStore("remoteDocuments")}(e));let o=D.resolve();return s<3&&i>=3&&(s!==0&&(function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")}(e),Ph(e)),o=o.next(()=>function(c){const u=c.store("targetGlobal"),p={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:J.min().toTimestamp(),targetCount:0};return u.put("targetGlobalKey",p)}(r))),s<4&&i>=4&&(s!==0&&(o=o.next(()=>function(c,u){return u.store("mutations").U().next(p=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",qd,{unique:!0});const m=u.store("mutations"),g=p.map(_=>m.put(_));return D.waitFor(g)})}(e,r))),o=o.next(()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),s<5&&i>=5&&(o=o.next(()=>this.ni(r))),s<6&&i>=6&&(o=o.next(()=>(function(c){c.createObjectStore("remoteDocumentGlobal")}(e),this.ri(r)))),s<7&&i>=7&&(o=o.next(()=>this.ii(r))),s<8&&i>=8&&(o=o.next(()=>this.si(e,r))),s<9&&i>=9&&(o=o.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)})),s<10&&i>=10&&(o=o.next(()=>this.oi(r))),s<11&&i>=11&&(o=o.next(()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(c){c.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),s<12&&i>=12&&(o=o.next(()=>{(function(c){const u=c.createObjectStore("documentOverlays",{keyPath:m0});u.createIndex("collectionPathOverlayIndex",g0,{unique:!1}),u.createIndex("collectionGroupOverlayIndex",v0,{unique:!1})})(e)})),s<13&&i>=13&&(o=o.next(()=>function(c){const u=c.createObjectStore("remoteDocumentsV14",{keyPath:i0});u.createIndex("documentKeyIndex",r0),u.createIndex("collectionGroupIndex",o0)}(e)).next(()=>this._i(e,r)).next(()=>e.deleteObjectStore("remoteDocuments"))),s<14&&i>=14&&(o=o.next(()=>this.ai(e,r))),s<15&&i>=15&&(o=o.next(()=>function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:d0}).createIndex("sequenceNumberIndex",h0,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:p0}).createIndex("documentKeyIndex",f0,{unique:!1})}(e))),s<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),s<17&&i>=17&&(o=o.next(()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((s,i)=>{t+=Ao(i)}).next(()=>{const s={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",s)})}ni(e){const t=e.store("mutationQueues"),s=e.store("mutations");return t.U().next(i=>D.forEach(i,r=>{const o=IDBKeyRange.bound([r.userId,-1],[r.userId,r.lastAcknowledgedBatchId]);return s.U("userMutationsIndex",o).next(l=>D.forEach(l,c=>{Y(c.userId===r.userId);const u=jn(this.serializer,c);return Om(e,r.userId,u).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),s=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const r=[];return s.J((o,l)=>{const c=new ce(o),u=function(m){return[0,Ye(m)]}(c);r.push(t.get(u).next(p=>p?D.resolve():(m=>t.put({targetId:0,path:Ye(m),sequenceNumber:i.highestListenSequenceNumber}))(c)))}).next(()=>D.waitFor(r))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:u0});const s=t.store("collectionParents"),i=new kc,r=o=>{if(i.add(o)){const l=o.lastSegment(),c=o.popLast();return s.put({collectionId:l,parent:Ye(c)})}};return t.store("remoteDocuments").J({H:!0},(o,l)=>{const c=new ce(o);return r(c.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,l,c],u)=>{const p=At(l);return r(p.popLast())}))}oi(e){const t=e.store("targets");return t.J((s,i)=>{const r=Di(i),o=Lm(this.serializer,r);return t.put(o)})}_i(e,t){const s=t.store("remoteDocuments"),i=[];return s.J((r,o)=>{const l=t.store("remoteDocumentsV14"),c=function(m){return m.document?new q(ce.fromString(m.document.name).popFirst(5)):m.noDocument?q.fromSegments(m.noDocument.path):m.unknownDocument?q.fromSegments(m.unknownDocument.path):H()}(o).path.toArray(),u={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(l.put(u))}).next(()=>D.waitFor(i))}ai(e,t){const s=t.store("mutations"),i=Um(this.serializer),r=new jm(Qo.Zr,this.serializer.ct);return s.U().next(o=>{const l=new Map;return o.forEach(c=>{var u;let p=(u=l.get(c.userId))!==null&&u!==void 0?u:ne();jn(this.serializer,c).keys().forEach(m=>p=p.add(m)),l.set(c.userId,p)}),D.forEach(l,(c,u)=>{const p=new Ne(u),m=Ko.lt(this.serializer,p),g=r.getIndexManager(p),_=Wo.lt(p,this.serializer,g,r.referenceDelegate);return new qm(i,_,m,g).recalculateAndSaveOverlaysForDocumentKeys(new bl(t,nt.oe),c).next()})})}}function Ph(n){n.createObjectStore("targetDocuments",{keyPath:l0}).createIndex("documentTargetsIndex",c0,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",a0,{unique:!0}),n.createObjectStore("targetGlobal")}const el="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Pc{constructor(e,t,s,i,r,o,l,c,u,p,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=s,this.ui=r,this.window=o,this.document=l,this.ci=u,this.li=p,this.hi=m,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=g=>Promise.resolve(),!Pc.D())throw new B(M.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new TI(this,i),this.Ai=t+"main",this.serializer=new Dm(c),this.Ri=new mn(this.Ai,this.hi,new MI(this.serializer)),this.$r=new dI,this.Ur=new _I(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Um(this.serializer),this.Gr=new uI,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,p===!1&&ke("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new B(M.FAILED_PRECONDITION,el);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new nt(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Ur(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(Tn(e))return O("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return O("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return Ei(e).get("owner").next(t=>D.resolve(this.vi(t)))}Ci(e){return Ur(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const s=De(t,"clientMetadata");return s.U().next(i=>{const r=this.xi(i,18e5),o=i.filter(l=>r.indexOf(l)===-1);return D.forEach(o,l=>s.delete(l.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?D.resolve(!0):Ei(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new B(M.FAILED_PRECONDITION,el);return!1}}return!(!this.networkEnabled||!this.inForeground)||Ur(e).U().next(s=>this.xi(s,5e3).find(i=>{if(this.clientId!==i.clientId){const r=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,l=this.networkEnabled===i.networkEnabled;if(r||o&&l)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&O("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new bl(e,nt.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(s=>this.Mi(s.updateTimeMs,t)&&!this.Ni(s.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Ur(e).U().next(t=>this.xi(t,18e5).map(s=>s.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Wo.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new yI(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Ko.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,s){O("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",r=function(c){return c===17?b0:c===16?_0:c===15?mc:c===14?qf:c===13?Uf:c===12?y0:c===11?Bf:void H()}(this.hi);let o;return this.Ri.runTransaction(e,i,r,l=>(o=new bl(l,this.Qr?this.Qr.next():nt.oe),t==="readwrite-primary"?this.wi(o).next(c=>!!c||this.Si(o)).next(c=>{if(!c)throw ke(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new B(M.FAILED_PRECONDITION,Nf);return s(o)}).next(c=>this.Di(o).next(()=>c)):this.Ki(o).next(()=>s(o)))).then(l=>(o.raiseOnCommittedEvent(),l))}Ki(e){return Ei(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new B(M.FAILED_PRECONDITION,el)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Ei(e).put("owner",t)}static D(){return mn.D()}bi(e){const t=Ei(e);return t.get("owner").next(s=>this.vi(s)?(O("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):D.resolve())}Mi(e,t){const s=Date.now();return!(e<s-t)&&(!(e>s)||(ke(`Detected an update time that is in the future: ${e} > ${s}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;fp()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const s=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return O("IndexedDbPersistence",`Client '${e}' ${s?"is":"is not"} zombied in LocalStorage`),s}catch(s){return ke("IndexedDbPersistence","Failed to get zombied client id.",s),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){ke("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Ei(n){return De(n,"owner")}function Ur(n){return De(n,"clientMetadata")}function zm(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Rc{constructor(e,t,s,i){this.targetId=e,this.fromCache=t,this.$i=s,this.Ui=i}static Wi(e,t){let s=ne(),i=ne();for(const r of t.docChanges)switch(r.type){case 0:s=s.add(r.doc.key);break;case 1:i=i.add(r.doc.key)}return new Rc(e,t.fromCache,s,i)}}/**
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
 */class OI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Gm{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return fp()?8:Of(xe())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,s,i){const r={result:null};return this.Yi(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.Zi(e,t,i,s).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new OI;return this.Xi(e,t,o).next(l=>{if(r.result=l,this.zi)return this.es(e,t,o,l.size)})}).next(()=>r.result)}es(e,t,s,i){return s.documentReadCount<this.ji?(Es()<=se.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Ts(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),D.resolve()):(Es()<=se.DEBUG&&O("QueryEngine","Query:",Ts(t),"scans",s.documentReadCount,"local documents and returns",i,"documents as results."),s.documentReadCount>this.Hi*i?(Es()<=se.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Ts(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ut(t))):D.resolve())}Yi(e,t){if(th(t))return D.resolve(null);let s=ut(t);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=bo(t,null,"F"),s=ut(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(r=>{const o=ne(...r);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,s).next(c=>{const u=this.ts(t,l);return this.ns(t,u,o,c.readTime)?this.Yi(e,bo(t,null,"F")):this.rs(e,u,t,c)}))})))}Zi(e,t,s,i){return th(t)||i.isEqual(J.min())?D.resolve(null):this.Ji.getDocuments(e,s).next(r=>{const o=this.ts(t,r);return this.ns(t,o,s,i)?D.resolve(null):(Es()<=se.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ts(t)),this.rs(e,o,t,Lf(i,-1)).next(l=>l))})}ts(e,t){let s=new me(rm(e));return t.forEach((i,r)=>{ar(e,r)&&(s=s.add(r))}),s}ns(e,t,s,i){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(i)>0)}Xi(e,t,s){return Es()<=se.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Ts(t)),this.Ji.getDocumentsMatchingQuery(e,t,dt.min(),s)}rs(e,t,s,i){return this.Ji.getDocumentsMatchingQuery(e,s,i).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
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
 */class FI{constructor(e,t,s,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ve(ee),this._s=new An(r=>es(r),or),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(s)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new qm(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Hm(n,e,t,s){return new FI(n,e,t,s)}async function Km(n,e){const t=K(n);return await t.persistence.runTransaction("Handle user change","readonly",s=>{let i;return t.mutationQueue.getAllMutationBatches(s).next(r=>(i=r,t.ls(e),t.mutationQueue.getAllMutationBatches(s))).next(r=>{const o=[],l=[];let c=ne();for(const u of i){o.push(u.batchId);for(const p of u.mutations)c=c.add(p.key)}for(const u of r){l.push(u.batchId);for(const p of u.mutations)c=c.add(p.key)}return t.localDocuments.getDocuments(s,c).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:l}))})})}function $I(n,e){const t=K(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const i=e.batch.keys(),r=t.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,u,p){const m=u.batch,g=m.keys();let _=D.resolve();return g.forEach(y=>{_=_.next(()=>p.getEntry(c,y)).next(x=>{const C=u.docVersions.get(y);Y(C!==null),x.version.compareTo(C)<0&&(m.applyToRemoteDocument(x,u),x.isValidDocument()&&(x.setReadTime(u.commitVersion),p.addEntry(x)))})}),_.next(()=>l.mutationQueue.removeMutationBatch(c,m))}(t,s,e,r).next(()=>r.apply(s)).next(()=>t.mutationQueue.performConsistencyCheck(s)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(s,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(l){let c=ne();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c}(e))).next(()=>t.localDocuments.getDocuments(s,i))})}function Wm(n){const e=K(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function BI(n,e){const t=K(n),s=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const l=[];e.targetChanges.forEach((p,m)=>{const g=i.get(m);if(!g)return;l.push(t.Ur.removeMatchingKeys(r,p.removedDocuments,m).next(()=>t.Ur.addMatchingKeys(r,p.addedDocuments,m)));let _=g.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(m)!==null?_=_.withResumeToken(Se.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):p.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(p.resumeToken,s)),i=i.insert(m,_),function(x,C,L){return x.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:L.addedDocuments.size+L.modifiedDocuments.size+L.removedDocuments.size>0}(g,_,p)&&l.push(t.Ur.updateTargetData(r,_))});let c=lt(),u=ne();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,p))}),l.push(UI(r,o,e.documentUpdates).next(p=>{c=p.Ps,u=p.Is})),!s.isEqual(J.min())){const p=t.Ur.getLastRemoteSnapshotVersion(r).next(m=>t.Ur.setTargetsMetadata(r,r.currentSequenceNumber,s));l.push(p)}return D.waitFor(l).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,c,u)).next(()=>c)}).then(r=>(t.os=i,r))}function UI(n,e,t){let s=ne(),i=ne();return t.forEach(r=>s=s.add(r)),e.getEntries(n,s).next(r=>{let o=lt();return t.forEach((l,c)=>{const u=r.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(l)),c.isNoDocument()&&c.version.isEqual(J.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):O("LocalStore","Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)}),{Ps:o,Is:i}})}function qI(n,e){const t=K(n);return t.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function So(n,e){const t=K(n);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let i;return t.Ur.getTargetData(s,e).next(r=>r?(i=r,D.resolve(i)):t.Ur.allocateTargetId(s).next(o=>(i=new Gt(e,o,"TargetPurposeListen",s.currentSequenceNumber),t.Ur.addTargetData(s,i).next(()=>i))))}).then(s=>{const i=t.os.get(s.targetId);return(i===null||s.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(s.targetId,s),t._s.set(e,s.targetId)),s})}async function Gs(n,e,t){const s=K(n),i=s.os.get(e),r=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",r,o=>s.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Tn(o))throw o;O("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.os=s.os.remove(e),s._s.delete(i.target)}function Vl(n,e,t){const s=K(n);let i=J.min(),r=ne();return s.persistence.runTransaction("Execute query","readwrite",o=>function(c,u,p){const m=K(c),g=m._s.get(p);return g!==void 0?D.resolve(m.os.get(g)):m.Ur.getTargetData(u,p)}(s,o,ut(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,s.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{r=c})}).next(()=>s.ss.getDocumentsMatchingQuery(o,e,t?i:J.min(),t?r:ne())).next(l=>(Jm(s,im(e),l),{documents:l,Ts:r})))}function Qm(n,e){const t=K(n),s=K(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",r=>s.ot(r,e).next(o=>o?o.target:null))}function Ym(n,e){const t=K(n),s=t.us.get(e)||J.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,Lf(s,-1),Number.MAX_SAFE_INTEGER)).then(i=>(Jm(t,e,i),i))}function Jm(n,e,t){let s=n.us.get(e)||J.min();t.forEach((i,r)=>{r.readTime.compareTo(s)>0&&(s=r.readTime)}),n.us.set(e,s)}function Rh(n,e){return`firestore_clients_${n}_${e}`}function xh(n,e,t){let s=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(s+=`_${e.uid}`),s}function tl(n,e){return`firestore_targets_${n}_${e}`}class ko{constructor(e,t,s,i){this.user=e,this.batchId=t,this.state=s,this.error=i}static Rs(e,t,s){const i=JSON.parse(s);let r,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(r=new B(i.error.code,i.error.message))),o?new ko(e,t,i.state,r):(ke("SharedClientState",`Failed to parse mutation state for ID '${t}': ${s}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ui{constructor(e,t,s){this.targetId=e,this.state=t,this.error=s}static Rs(e,t){const s=JSON.parse(t);let i,r=typeof s=="object"&&["not-current","current","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return r&&s.error&&(r=typeof s.error.message=="string"&&typeof s.error.code=="string",r&&(i=new B(s.error.code,s.error.message))),r?new Ui(e,s.state,i):(ke("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Co{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const s=JSON.parse(t);let i=typeof s=="object"&&s.activeTargetIds instanceof Array,r=_c();for(let o=0;i&&o<s.activeTargetIds.length;++o)i=Ff(s.activeTargetIds[o]),r=r.add(s.activeTargetIds[o]);return i?new Co(e,r):(ke("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class xc{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new xc(t.clientId,t.onlineState):(ke("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Nl{constructor(){this.activeTargetIds=_c()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class nl{constructor(e,t,s,i,r){this.window=e,this.ui=t,this.persistenceKey=s,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new ve(ee),this.started=!1,this.bs=[];const o=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=r,this.Ds=Rh(this.persistenceKey,this.ps),this.vs=function(c){return`firestore_sequence_number_${c}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Nl),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(c){return`firestore_online_state_${c}`}(this.persistenceKey),this.Os=function(c){return`firestore_bundle_loaded_v2_${c}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const s of e){if(s===this.ps)continue;const i=this.getItem(Rh(this.persistenceKey,s));if(i){const r=Co.Rs(s,i);r&&(this.Ss=this.Ss.insert(r.clientId,r))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const s=this.Ls(t);s&&this.Bs(s)}for(const s of this.bs)this.ws(s);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((s,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,s){this.qs(e,t,s),this.Qs(e)}addLocalQueryTarget(e,t=!0){let s="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(tl(this.persistenceKey,e));if(i){const r=Ui.Rs(e,i);r&&(s=r.state)}}return t&&this.Ks.fs(e),this.Ns(),s}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(tl(this.persistenceKey,e))}updateQueryState(e,t,s){this.$s(e,t,s)}handleUserChange(e,t,s){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,s.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return O("SharedClientState","READ",e,t),t}setItem(e,t){O("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){O("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(O("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void ke("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const s=this.Gs(t.key);return this.zs(s,null)}{const s=this.js(t.key,t.newValue);if(s)return this.zs(s.clientId,s)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const s=this.Hs(t.key,t.newValue);if(s)return this.Js(s)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const s=this.Ys(t.key,t.newValue);if(s)return this.Zs(s)}}else if(t.key===this.xs){if(t.newValue!==null){const s=this.Ls(t.newValue);if(s)return this.Bs(s)}}else if(t.key===this.vs){const s=function(r){let o=nt.oe;if(r!=null)try{const l=JSON.parse(r);Y(typeof l=="number"),o=l}catch(l){ke("SharedClientState","Failed to read sequence number from WebStorage",l)}return o}(t.newValue);s!==nt.oe&&this.sequenceNumberHandler(s)}else if(t.key===this.Os){const s=this.Xs(t.newValue);await Promise.all(s.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,s){const i=new ko(this.currentUser,e,t,s),r=xh(this.persistenceKey,this.currentUser,e);this.setItem(r,i.Vs())}Qs(e){const t=xh(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,s){const i=tl(this.persistenceKey,e),r=new Ui(e,t,s);this.setItem(i,r.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const s=this.Gs(e);return Co.Rs(s,t)}Hs(e,t){const s=this.Fs.exec(e),i=Number(s[1]),r=s[2]!==void 0?s[2]:null;return ko.Rs(new Ne(r),i,t)}Ys(e,t){const s=this.Ms.exec(e),i=Number(s[1]);return Ui.Rs(i,t)}Ls(e){return xc.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);O("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const s=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),r=this.ks(s),o=[],l=[];return r.forEach(c=>{i.has(c)||o.push(c)}),i.forEach(c=>{r.has(c)||l.push(c)}),this.syncEngine.io(o,l).then(()=>{this.Ss=s})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=_c();return e.forEach((s,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class Xm{constructor(){this.so=new Nl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,s){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Nl,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class jI{_o(e){}shutdown(){}}/**
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
 */class Dh{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let qr=null;function sl(){return qr===null?qr=function(){return 268435456+Math.round(2147483648*Math.random())}():qr++,"0x"+qr.toString(16)}/**
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
 */const zI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class GI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const qe="WebChannelConnection";class HI extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const s=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Do=s+"://"+t.host,this.vo=`projects/${i}/databases/${r}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${r}`}get Fo(){return!1}Mo(t,s,i,r,o){const l=sl(),c=this.xo(t,s.toUriEncodedString());O("RestConnection",`Sending RPC '${t}' ${l}:`,c,i);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,r,o),this.No(t,c,u,i).then(p=>(O("RestConnection",`Received RPC '${t}' ${l}: `,p),p),p=>{throw vn("RestConnection",`RPC '${t}' ${l} failed with error: `,p,"url: ",c,"request:",i),p})}Lo(t,s,i,r,o,l){return this.Mo(t,s,i,r,o)}Oo(t,s,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ys}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach((r,o)=>t[o]=r),i&&i.headers.forEach((r,o)=>t[o]=r)}xo(t,s){const i=zI[t];return`${this.Do}/v1/${s}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,s,i){const r=sl();return new Promise((o,l)=>{const c=new Af;c.setWithCredentials(!0),c.listenOnce(Sf.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Jr.NO_ERROR:const p=c.getResponseJson();O(qe,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(p)),o(p);break;case Jr.TIMEOUT:O(qe,`RPC '${e}' ${r} timed out`),l(new B(M.DEADLINE_EXCEEDED,"Request time out"));break;case Jr.HTTP_ERROR:const m=c.getStatus();if(O(qe,`RPC '${e}' ${r} failed with status:`,m,"response text:",c.getResponseText()),m>0){let g=c.getResponseJson();Array.isArray(g)&&(g=g[0]);const _=g==null?void 0:g.error;if(_&&_.status&&_.message){const y=function(C){const L=C.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(L)>=0?L:M.UNKNOWN}(_.status);l(new B(y,_.message))}else l(new B(M.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new B(M.UNAVAILABLE,"Connection failed."));break;default:H()}}finally{O(qe,`RPC '${e}' ${r} completed.`)}});const u=JSON.stringify(i);O(qe,`RPC '${e}' ${r} sending request:`,i),c.send(t,"POST",u,s,15)})}Bo(e,t,s){const i=sl(),r=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Pf(),l=Cf(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,s),c.encodeInitMessageHeaders=!0;const p=r.join("");O(qe,`Creating RPC '${e}' stream ${i}: ${p}`,c);const m=o.createWebChannel(p,c);let g=!1,_=!1;const y=new GI({Io:C=>{_?O(qe,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(g||(O(qe,`Opening RPC '${e}' stream ${i} transport.`),m.open(),g=!0),O(qe,`RPC '${e}' stream ${i} sending:`,C),m.send(C))},To:()=>m.close()}),x=(C,L,T)=>{C.listen(L,V=>{try{T(V)}catch($){setTimeout(()=>{throw $},0)}})};return x(m,Pi.EventType.OPEN,()=>{_||(O(qe,`RPC '${e}' stream ${i} transport opened.`),y.yo())}),x(m,Pi.EventType.CLOSE,()=>{_||(_=!0,O(qe,`RPC '${e}' stream ${i} transport closed`),y.So())}),x(m,Pi.EventType.ERROR,C=>{_||(_=!0,vn(qe,`RPC '${e}' stream ${i} transport errored:`,C),y.So(new B(M.UNAVAILABLE,"The operation could not be completed")))}),x(m,Pi.EventType.MESSAGE,C=>{var L;if(!_){const T=C.data[0];Y(!!T);const V=T,$=V.error||((L=V[0])===null||L===void 0?void 0:L.error);if($){O(qe,`RPC '${e}' stream ${i} received error:`,$);const G=$.status;let Q=function(I){const S=Pe[I];if(S!==void 0)return ym(S)}(G),w=$.message;Q===void 0&&(Q=M.INTERNAL,w="Unknown error status: "+G+" with message "+$.message),_=!0,y.So(new B(Q,w)),m.close()}else O(qe,`RPC '${e}' stream ${i} received:`,T),y.bo(T)}}),x(l,kf.STAT_EVENT,C=>{C.stat===yl.PROXY?O(qe,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===yl.NOPROXY&&O(qe,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{y.wo()},0),y}}/**
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
 *//**
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
 */function Zm(){return typeof window<"u"?window:null}function io(){return typeof document<"u"?document:null}/**
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
 */function Yo(n){return new Z0(n,!0)}/**
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
 */class eg{constructor(e,t,s=1e3,i=1.5,r=6e4){this.ui=e,this.timerId=t,this.ko=s,this.qo=i,this.Qo=r,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),s=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-s);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class tg{constructor(e,t,s,i,r,o,l,c){this.ui=e,this.Ho=s,this.Jo=i,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new eg(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===M.RESOURCE_EXHAUSTED?(ke(t.toString()),ke("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,i])=>{this.Yo===t&&this.P_(s,i)},s=>{e(()=>{const i=new B(M.UNKNOWN,"Fetching auth token failed: "+s.message);return this.I_(i)})})}P_(e,t){const s=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{s(()=>this.listener.Eo())}),this.stream.Ro(()=>{s(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{s(()=>this.I_(i))}),this.stream.onMessage(i=>{s(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return O("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(O("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class KI extends tg{constructor(e,t,s,i,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,i,o),this.serializer=r}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=nI(this.serializer,e),s=function(r){if(!("targetChange"in r))return J.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?Je(o.readTime):J.min()}(e);return this.listener.d_(t,s)}A_(e){const t={};t.database=Pl(this.serializer),t.addTarget=function(r,o){let l;const c=o.target;if(l=yo(c)?{documents:Sm(r,c)}:{query:km(r,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=wm(r,o.resumeToken);const u=kl(r,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(J.min())>0){l.readTime=zs(r,o.snapshotVersion.toTimestamp());const u=kl(r,o.expectedCount);u!==null&&(l.expectedCount=u)}return l}(this.serializer,e);const s=iI(this.serializer,e);s&&(t.labels=s),this.a_(t)}R_(e){const t={};t.database=Pl(this.serializer),t.removeTarget=e,this.a_(t)}}class WI extends tg{constructor(e,t,s,i,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,i,o),this.serializer=r}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Y(!!e.streamToken),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=sI(e.writeResults,e.commitTime),s=Je(e.commitTime);return this.listener.g_(s,t)}p_(){const e={};e.database=Pl(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(s=>Io(this.serializer,s))};this.a_(t)}}/**
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
 */class QI extends class{}{constructor(e,t,s,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new B(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Mo(e,Cl(t,s),i,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new B(M.UNKNOWN,r.toString())})}Lo(e,t,s,i,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Cl(t,s),i,o,l,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new B(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class YI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ke(t),this.D_=!1):O("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class JI{constructor(e,t,s,i,r){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=r,this.k_._o(o=>{s.enqueueAndForget(async()=>{ds(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await async function(c){const u=K(c);u.L_.add(4),await hr(u),u.q_.set("Unknown"),u.L_.delete(4),await Jo(u)}(this))})}),this.q_=new YI(s,i)}}async function Jo(n){if(ds(n))for(const e of n.B_)await e(!0)}async function hr(n){for(const e of n.B_)await e(!1)}function Xo(n,e){const t=K(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Vc(t)?Lc(t):ei(t).r_()&&Dc(t,e))}function Hs(n,e){const t=K(n),s=ei(t);t.N_.delete(e),s.r_()&&ng(t,e),t.N_.size===0&&(s.r_()?s.o_():ds(t)&&t.q_.set("Unknown"))}function Dc(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ei(n).A_(e)}function ng(n,e){n.Q_.xe(e),ei(n).R_(e)}function Lc(n){n.Q_=new Q0({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),ei(n).start(),n.q_.v_()}function Vc(n){return ds(n)&&!ei(n).n_()&&n.N_.size>0}function ds(n){return K(n).L_.size===0}function sg(n){n.Q_=void 0}async function XI(n){n.q_.set("Online")}async function ZI(n){n.N_.forEach((e,t)=>{Dc(n,e)})}async function eE(n,e){sg(n),Vc(n)?(n.q_.M_(e),Lc(n)):n.q_.set("Unknown")}async function tE(n,e,t){if(n.q_.set("Online"),e instanceof bm&&e.state===2&&e.cause)try{await async function(i,r){const o=r.cause;for(const l of r.targetIds)i.N_.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.N_.delete(l),i.Q_.removeTarget(l))}(n,e)}catch(s){O("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Po(n,s)}else if(e instanceof so?n.Q_.Ke(e):e instanceof _m?n.Q_.He(e):n.Q_.We(e),!t.isEqual(J.min()))try{const s=await Wm(n.localStore);t.compareTo(s)>=0&&await function(r,o){const l=r.Q_.rt(o);return l.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const p=r.N_.get(u);p&&r.N_.set(u,p.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,u)=>{const p=r.N_.get(c);if(!p)return;r.N_.set(c,p.withResumeToken(Se.EMPTY_BYTE_STRING,p.snapshotVersion)),ng(r,c);const m=new Gt(p.target,c,u,p.sequenceNumber);Dc(r,m)}),r.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(s){O("RemoteStore","Failed to raise snapshot:",s),await Po(n,s)}}async function Po(n,e,t){if(!Tn(e))throw e;n.L_.add(1),await hr(n),n.q_.set("Offline"),t||(t=()=>Wm(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Jo(n)})}function ig(n,e){return e().catch(t=>Po(n,t,e))}async function Zs(n){const e=K(n),t=wn(e);let s=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;nE(e);)try{const i=await qI(e.localStore,s);if(i===null){e.O_.length===0&&t.o_();break}s=i.batchId,sE(e,i)}catch(i){await Po(e,i)}rg(e)&&og(e)}function nE(n){return ds(n)&&n.O_.length<10}function sE(n,e){n.O_.push(e);const t=wn(n);t.r_()&&t.V_&&t.m_(e.mutations)}function rg(n){return ds(n)&&!wn(n).n_()&&n.O_.length>0}function og(n){wn(n).start()}async function iE(n){wn(n).p_()}async function rE(n){const e=wn(n);for(const t of n.O_)e.m_(t.mutations)}async function oE(n,e,t){const s=n.O_.shift(),i=Ic.from(s,e,t);await ig(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Zs(n)}async function aE(n,e){e&&wn(n).V_&&await async function(s,i){if(function(o){return H0(o)&&o!==M.ABORTED}(i.code)){const r=s.O_.shift();wn(s).s_(),await ig(s,()=>s.remoteSyncer.rejectFailedWrite(r.batchId,i)),await Zs(s)}}(n,e),rg(n)&&og(n)}async function Lh(n,e){const t=K(n);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");const s=ds(t);t.L_.add(3),await hr(t),s&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Jo(t)}async function Ml(n,e){const t=K(n);e?(t.L_.delete(2),await Jo(t)):e||(t.L_.add(2),await hr(t),t.q_.set("Unknown"))}function ei(n){return n.K_||(n.K_=function(t,s,i){const r=K(t);return r.w_(),new KI(s,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(n.datastore,n.asyncQueue,{Eo:XI.bind(null,n),Ro:ZI.bind(null,n),mo:eE.bind(null,n),d_:tE.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),Vc(n)?Lc(n):n.q_.set("Unknown")):(await n.K_.stop(),sg(n))})),n.K_}function wn(n){return n.U_||(n.U_=function(t,s,i){const r=K(t);return r.w_(),new WI(s,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:iE.bind(null,n),mo:aE.bind(null,n),f_:rE.bind(null,n),g_:oE.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Zs(n)):(await n.U_.stop(),n.O_.length>0&&(O("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class Nc{constructor(e,t,s,i,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=i,this.removalCallback=r,this.deferred=new Rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,i,r){const o=Date.now()+s,l=new Nc(e,t,o,i,r);return l.start(s),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Mc(n,e){if(ke("AsyncQueue",`${e}: ${n}`),Tn(n))return new B(M.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Ls{constructor(e){this.comparator=e?(t,s)=>e(t,s)||q.comparator(t.key,s.key):(t,s)=>q.comparator(t.key,s.key),this.keyedMap=Ri(),this.sortedSet=new ve(this.comparator)}static emptySet(e){return new Ls(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ls)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=s.getNext().key;if(!i.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new Ls;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
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
 */class Vh{constructor(){this.W_=new ve(q.comparator)}track(e){const t=e.doc.key,s=this.W_.get(t);s?e.type!==0&&s.type===3?this.W_=this.W_.insert(t,e):e.type===3&&s.type!==1?this.W_=this.W_.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.W_=this.W_.remove(t):e.type===1&&s.type===2?this.W_=this.W_.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):H():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,s)=>{e.push(s)}),e}}class Ks{constructor(e,t,s,i,r,o,l,c,u){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=i,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,s,i,r){const o=[];return t.forEach(l=>{o.push({type:0,doc:l})}),new Ks(e,t,Ls.emptySet(t),o,s,i,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&zo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==s[i].type||!t[i].doc.isEqual(s[i].doc))return!1;return!0}}/**
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
 */class lE{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class cE{constructor(){this.queries=Nh(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,s){const i=K(t),r=i.queries;i.queries=Nh(),r.forEach((o,l)=>{for(const c of l.j_)c.onError(s)})})(this,new B(M.ABORTED,"Firestore shutting down"))}}function Nh(){return new An(n=>sm(n),zo)}async function ag(n,e){const t=K(n);let s=3;const i=e.query;let r=t.queries.get(i);r?!r.H_()&&e.J_()&&(s=2):(r=new lE,s=e.J_()?0:1);try{switch(s){case 0:r.z_=await t.onListen(i,!0);break;case 1:r.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const l=Mc(o,`Initialization of query '${Ts(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,r),r.j_.push(e),e.Z_(t.onlineState),r.z_&&e.X_(r.z_)&&Oc(t)}async function lg(n,e){const t=K(n),s=e.query;let i=3;const r=t.queries.get(s);if(r){const o=r.j_.indexOf(e);o>=0&&(r.j_.splice(o,1),r.j_.length===0?i=e.J_()?0:1:!r.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function uE(n,e){const t=K(n);let s=!1;for(const i of e){const r=i.query,o=t.queries.get(r);if(o){for(const l of o.j_)l.X_(i)&&(s=!0);o.z_=i}}s&&Oc(t)}function dE(n,e,t){const s=K(n),i=s.queries.get(e);if(i)for(const r of i.j_)r.onError(t);s.queries.delete(e)}function Oc(n){n.Y_.forEach(e=>{e.next()})}var Ol,Mh;(Mh=Ol||(Ol={})).ea="default",Mh.Cache="cache";class cg{constructor(e,t,s){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=s||{}}X_(e){if(!this.options.includeMetadataChanges){const s=[];for(const i of e.docChanges)i.type!==3&&s.push(i);e=new Ks(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const s=t!=="Offline";return(!this.options._a||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Ks.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Ol.Cache}}/**
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
 */class ug{constructor(e){this.key=e}}class dg{constructor(e){this.key=e}}class hE{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ne(),this.mutatedKeys=ne(),this.Aa=rm(e),this.Ra=new Ls(this.Aa)}get Va(){return this.Ta}ma(e,t){const s=t?t.fa:new Vh,i=t?t.Ra:this.Ra;let r=t?t.mutatedKeys:this.mutatedKeys,o=i,l=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,m)=>{const g=i.get(p),_=ar(this.query,m)?m:null,y=!!g&&this.mutatedKeys.has(g.key),x=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let C=!1;g&&_?g.data.isEqual(_.data)?y!==x&&(s.track({type:3,doc:_}),C=!0):this.ga(g,_)||(s.track({type:2,doc:_}),C=!0,(c&&this.Aa(_,c)>0||u&&this.Aa(_,u)<0)&&(l=!0)):!g&&_?(s.track({type:0,doc:_}),C=!0):g&&!_&&(s.track({type:1,doc:g}),C=!0,(c||u)&&(l=!0)),C&&(_?(o=o.add(_),r=x?r.add(p):r.delete(p)):(o=o.delete(p),r=r.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),r=r.delete(p.key),s.track({type:1,doc:p})}return{Ra:o,fa:s,ns:l,mutatedKeys:r}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,i){const r=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((p,m)=>function(_,y){const x=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return H()}};return x(_)-x(y)}(p.type,m.type)||this.Aa(p.doc,m.doc)),this.pa(s),i=i!=null&&i;const l=t&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,u=c!==this.Ea;return this.Ea=c,o.length!==0||u?{snapshot:new Ks(this.query,e.Ra,r,o,e.mutatedKeys,c===0,u,!1,!!s&&s.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Vh,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ne(),this.Ra.forEach(s=>{this.Sa(s.key)&&(this.da=this.da.add(s.key))});const t=[];return e.forEach(s=>{this.da.has(s)||t.push(new dg(s))}),this.da.forEach(s=>{e.has(s)||t.push(new ug(s))}),t}ba(e){this.Ta=e.Ts,this.da=ne();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Ks.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class pE{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class fE{constructor(e){this.key=e,this.va=!1}}class mE{constructor(e,t,s,i,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=i,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new An(l=>sm(l),zo),this.Ma=new Map,this.xa=new Set,this.Oa=new ve(q.comparator),this.Na=new Map,this.La=new Cc,this.Ba={},this.ka=new Map,this.qa=rs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function gE(n,e,t=!0){const s=Zo(n);let i;const r=s.Fa.get(e);return r?(s.sharedClientState.addLocalQueryTarget(r.targetId),i=r.view.Da()):i=await hg(s,e,t,!0),i}async function vE(n,e){const t=Zo(n);await hg(t,e,!0,!1)}async function hg(n,e,t,s){const i=await So(n.localStore,ut(e)),r=i.targetId,o=n.sharedClientState.addLocalQueryTarget(r,t);let l;return s&&(l=await Fc(n,e,r,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Xo(n.remoteStore,i),l}async function Fc(n,e,t,s,i){n.Ka=(m,g,_)=>async function(x,C,L,T){let V=C.view.ma(L);V.ns&&(V=await Vl(x.localStore,C.query,!1).then(({documents:w})=>C.view.ma(w,V)));const $=T&&T.targetChanges.get(C.targetId),G=T&&T.targetMismatches.get(C.targetId)!=null,Q=C.view.applyChanges(V,x.isPrimaryClient,$,G);return Fl(x,C.targetId,Q.wa),Q.snapshot}(n,m,g,_);const r=await Vl(n.localStore,e,!0),o=new hE(e,r.Ts),l=o.ma(r.documents),c=dr.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",i),u=o.applyChanges(l,n.isPrimaryClient,c);Fl(n,t,u.wa);const p=new pE(e,t,o);return n.Fa.set(e,p),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),u.snapshot}async function yE(n,e,t){const s=K(n),i=s.Fa.get(e),r=s.Ma.get(i.targetId);if(r.length>1)return s.Ma.set(i.targetId,r.filter(o=>!zo(o,e))),void s.Fa.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(i.targetId),s.sharedClientState.isActiveQueryTarget(i.targetId)||await Gs(s.localStore,i.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(i.targetId),t&&Hs(s.remoteStore,i.targetId),Ws(s,i.targetId)}).catch(En)):(Ws(s,i.targetId),await Gs(s.localStore,i.targetId,!0))}async function _E(n,e){const t=K(n),s=t.Fa.get(e),i=t.Ma.get(s.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),Hs(t.remoteStore,s.targetId))}async function bE(n,e,t){const s=qc(n);try{const i=await function(o,l){const c=K(o),u=we.now(),p=l.reduce((_,y)=>_.add(y.key),ne());let m,g;return c.persistence.runTransaction("Locally write mutations","readwrite",_=>{let y=lt(),x=ne();return c.cs.getEntries(_,p).next(C=>{y=C,y.forEach((L,T)=>{T.isValidDocument()||(x=x.add(L))})}).next(()=>c.localDocuments.getOverlayedDocuments(_,y)).next(C=>{m=C;const L=[];for(const T of l){const V=z0(T,m.get(T.key).overlayedDocument);V!=null&&L.push(new Zt(T.key,V,Kf(V.value.mapValue),Re.exists(!0)))}return c.mutationQueue.addMutationBatch(_,u,L,l)}).next(C=>{g=C;const L=C.applyToLocalDocumentSet(m,x);return c.documentOverlayCache.saveOverlays(_,C.batchId,L)})}).then(()=>({batchId:g.batchId,changes:am(m)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(i.batchId),function(o,l,c){let u=o.Ba[o.currentUser.toKey()];u||(u=new ve(ee)),u=u.insert(l,c),o.Ba[o.currentUser.toKey()]=u}(s,i.batchId,t),await Sn(s,i.changes),await Zs(s.remoteStore)}catch(i){const r=Mc(i,"Failed to persist write");t.reject(r)}}async function pg(n,e){const t=K(n);try{const s=await BI(t.localStore,e);e.targetChanges.forEach((i,r)=>{const o=t.Na.get(r);o&&(Y(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?Y(o.va):i.removedDocuments.size>0&&(Y(o.va),o.va=!1))}),await Sn(t,s,e)}catch(s){await En(s)}}function Oh(n,e,t){const s=K(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const i=[];s.Fa.forEach((r,o)=>{const l=o.view.Z_(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const c=K(o);c.onlineState=l;let u=!1;c.queries.forEach((p,m)=>{for(const g of m.j_)g.Z_(l)&&(u=!0)}),u&&Oc(c)}(s.eventManager,e),i.length&&s.Ca.d_(i),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function wE(n,e,t){const s=K(n);s.sharedClientState.updateQueryState(e,"rejected",t);const i=s.Na.get(e),r=i&&i.key;if(r){let o=new ve(q.comparator);o=o.insert(r,Te.newNoDocument(r,J.min()));const l=ne().add(r),c=new ur(J.min(),new Map,new ve(ee),o,l);await pg(s,c),s.Oa=s.Oa.remove(r),s.Na.delete(e),Uc(s)}else await Gs(s.localStore,e,!1).then(()=>Ws(s,e,t)).catch(En)}async function IE(n,e){const t=K(n),s=e.batch.batchId;try{const i=await $I(t.localStore,e);Bc(t,s,null),$c(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await Sn(t,i)}catch(i){await En(i)}}async function EE(n,e,t){const s=K(n);try{const i=await function(o,l){const c=K(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let p;return c.mutationQueue.lookupMutationBatch(u,l).next(m=>(Y(m!==null),p=m.keys(),c.mutationQueue.removeMutationBatch(u,m))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,p,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,p)).next(()=>c.localDocuments.getDocuments(u,p))})}(s.localStore,e);Bc(s,e,t),$c(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await Sn(s,i)}catch(i){await En(i)}}function $c(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Bc(n,e,t){const s=K(n);let i=s.Ba[s.currentUser.toKey()];if(i){const r=i.get(e);r&&(t?r.reject(t):r.resolve(),i=i.remove(e)),s.Ba[s.currentUser.toKey()]=i}}function Ws(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Ma.get(e))n.Fa.delete(s),t&&n.Ca.$a(s,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(s=>{n.La.containsKey(s)||fg(n,s)})}function fg(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Hs(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),Uc(n))}function Fl(n,e,t){for(const s of t)s instanceof ug?(n.La.addReference(s.key,e),TE(n,s)):s instanceof dg?(O("SyncEngine","Document no longer in limbo: "+s.key),n.La.removeReference(s.key,e),n.La.containsKey(s.key)||fg(n,s.key)):H()}function TE(n,e){const t=e.key,s=t.path.canonicalString();n.Oa.get(t)||n.xa.has(s)||(O("SyncEngine","New document in limbo: "+t),n.xa.add(s),Uc(n))}function Uc(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new q(ce.fromString(e)),s=n.qa.next();n.Na.set(s,new fE(t)),n.Oa=n.Oa.insert(t,s),Xo(n.remoteStore,new Gt(ut(jo(t.path)),s,"TargetPurposeLimboResolution",nt.oe))}}async function Sn(n,e,t){const s=K(n),i=[],r=[],o=[];s.Fa.isEmpty()||(s.Fa.forEach((l,c)=>{o.push(s.Ka(c,e,t).then(u=>{var p;if((u||t)&&s.isPrimaryClient){const m=u?!u.fromCache:(p=t==null?void 0:t.targetChanges.get(c.targetId))===null||p===void 0?void 0:p.current;s.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(u){i.push(u);const m=Rc.Wi(c.targetId,u);r.push(m)}}))}),await Promise.all(o),s.Ca.d_(i),await async function(c,u){const p=K(c);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>D.forEach(u,g=>D.forEach(g.$i,_=>p.persistence.referenceDelegate.addReference(m,g.targetId,_)).next(()=>D.forEach(g.Ui,_=>p.persistence.referenceDelegate.removeReference(m,g.targetId,_)))))}catch(m){if(!Tn(m))throw m;O("LocalStore","Failed to update sequence numbers: "+m)}for(const m of u){const g=m.targetId;if(!m.fromCache){const _=p.os.get(g),y=_.snapshotVersion,x=_.withLastLimboFreeSnapshotVersion(y);p.os=p.os.insert(g,x)}}}(s.localStore,r))}async function AE(n,e){const t=K(n);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());const s=await Km(t.localStore,e);t.currentUser=e,function(r,o){r.ka.forEach(l=>{l.forEach(c=>{c.reject(new B(M.CANCELLED,o))})}),r.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Sn(t,s.hs)}}function SE(n,e){const t=K(n),s=t.Na.get(e);if(s&&s.va)return ne().add(s.key);{let i=ne();const r=t.Ma.get(e);if(!r)return i;for(const o of r){const l=t.Fa.get(o);i=i.unionWith(l.view.Va)}return i}}async function kE(n,e){const t=K(n),s=await Vl(t.localStore,e.query,!0),i=e.view.ba(s);return t.isPrimaryClient&&Fl(t,e.targetId,i.wa),i}async function CE(n,e){const t=K(n);return Ym(t.localStore,e).then(s=>Sn(t,s))}async function PE(n,e,t,s){const i=K(n),r=await function(l,c){const u=K(l),p=K(u.mutationQueue);return u.persistence.runTransaction("Lookup mutation documents","readonly",m=>p.Mn(m,c).next(g=>g?u.localDocuments.getDocuments(m,g):D.resolve(null)))}(i.localStore,e);r!==null?(t==="pending"?await Zs(i.remoteStore):t==="acknowledged"||t==="rejected"?(Bc(i,e,s||null),$c(i,e),function(l,c){K(K(l).mutationQueue).On(c)}(i.localStore,e)):H(),await Sn(i,r)):O("SyncEngine","Cannot apply mutation batch with id: "+e)}async function RE(n,e){const t=K(n);if(Zo(t),qc(t),e===!0&&t.Qa!==!0){const s=t.sharedClientState.getAllActiveQueryTargets(),i=await Fh(t,s.toArray());t.Qa=!0,await Ml(t.remoteStore,!0);for(const r of i)Xo(t.remoteStore,r)}else if(e===!1&&t.Qa!==!1){const s=[];let i=Promise.resolve();t.Ma.forEach((r,o)=>{t.sharedClientState.isLocalQueryTarget(o)?s.push(o):i=i.then(()=>(Ws(t,o),Gs(t.localStore,o,!0))),Hs(t.remoteStore,o)}),await i,await Fh(t,s),function(o){const l=K(o);l.Na.forEach((c,u)=>{Hs(l.remoteStore,u)}),l.La.pr(),l.Na=new Map,l.Oa=new ve(q.comparator)}(t),t.Qa=!1,await Ml(t.remoteStore,!1)}}async function Fh(n,e,t){const s=K(n),i=[],r=[];for(const o of e){let l;const c=s.Ma.get(o);if(c&&c.length!==0){l=await So(s.localStore,ut(c[0]));for(const u of c){const p=s.Fa.get(u),m=await kE(s,p);m.snapshot&&r.push(m.snapshot)}}else{const u=await Qm(s.localStore,o);l=await So(s.localStore,u),await Fc(s,mg(u),o,!1,l.resumeToken)}i.push(l)}return s.Ca.d_(r),i}function mg(n){return tm(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function xE(n){return function(t){return K(K(t).persistence).Qi()}(K(n).localStore)}async function DE(n,e,t,s){const i=K(n);if(i.Qa)return void O("SyncEngine","Ignoring unexpected query state notification.");const r=i.Ma.get(e);if(r&&r.length>0)switch(t){case"current":case"not-current":{const o=await Ym(i.localStore,im(r[0])),l=ur.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Se.EMPTY_BYTE_STRING);await Sn(i,o,l);break}case"rejected":await Gs(i.localStore,e,!0),Ws(i,e,s);break;default:H()}}async function LE(n,e,t){const s=Zo(n);if(s.Qa){for(const i of e){if(s.Ma.has(i)&&s.sharedClientState.isActiveQueryTarget(i)){O("SyncEngine","Adding an already active target "+i);continue}const r=await Qm(s.localStore,i),o=await So(s.localStore,r);await Fc(s,mg(r),o.targetId,!1,o.resumeToken),Xo(s.remoteStore,o)}for(const i of t)s.Ma.has(i)&&await Gs(s.localStore,i,!1).then(()=>{Hs(s.remoteStore,i),Ws(s,i)}).catch(En)}}function Zo(n){const e=K(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=pg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=SE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=wE.bind(null,e),e.Ca.d_=uE.bind(null,e.eventManager),e.Ca.$a=dE.bind(null,e.eventManager),e}function qc(n){const e=K(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=IE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=EE.bind(null,e),e}class Zi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Yo(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Hm(this.persistence,new Gm,e.initialUser,this.serializer)}Ga(e){return new jm(Qo.Zr,this.serializer)}Wa(e){return new Xm}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Zi.provider={build:()=>new Zi};class VE extends Zi{constructor(e,t,s){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=s,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await qc(this.Ja.syncEngine),await Zs(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return Hm(this.persistence,new Gm,e.initialUser,this.serializer)}ja(e,t){const s=this.persistence.referenceDelegate.garbageCollector;return new wI(s,e.asyncQueue,t)}Ha(e,t){const s=new t0(t,this.persistence);return new e0(e.asyncQueue,s)}Ga(e){const t=zm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),s=this.cacheSizeBytes!==void 0?tt.withCacheSize(this.cacheSizeBytes):tt.DEFAULT;return new Pc(this.synchronizeTabs,t,e.clientId,s,e.asyncQueue,Zm(),io(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new Xm}}class NE extends VE{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof nl&&(this.sharedClientState.syncEngine={no:PE.bind(null,t),ro:DE.bind(null,t),io:LE.bind(null,t),Qi:xE.bind(null,t),eo:CE.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async s=>{await RE(this.Ja.syncEngine,s),this.gcScheduler&&(s&&!this.gcScheduler.started?this.gcScheduler.start():s||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(s&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():s||this.indexBackfillerScheduler.stop())})}Wa(e){const t=Zm();if(!nl.D(t))throw new B(M.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const s=zm(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new nl(t,e.asyncQueue,s,e.clientId,e.initialUser)}}class Ro{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Oh(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=AE.bind(null,this.syncEngine),await Ml(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new cE}()}createDatastore(e){const t=Yo(e.databaseInfo.databaseId),s=function(r){return new HI(r)}(e.databaseInfo);return function(r,o,l,c){return new QI(r,o,l,c)}(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,i,r,o,l){return new JI(s,i,r,o,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Oh(this.syncEngine,t,0),function(){return Dh.D()?new Dh:new jI}())}createSyncEngine(e,t){return function(i,r,o,l,c,u,p){const m=new mE(i,r,o,l,c,u);return p&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const r=K(i);O("RemoteStore","RemoteStore shutting down."),r.L_.add(5),await hr(r),r.k_.shutdown(),r.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ro.provider={build:()=>new Ro};/**
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
 *//**
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
 */class gg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ke("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class ME{constructor(e,t,s,i,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=i,this.user=Ne.UNAUTHENTICATED,this.clientId=hc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(s,async o=>{O("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(s,o=>(O("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Mc(t,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function il(n,e){n.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener(async i=>{s.isEqual(i)||(await Km(e.localStore,i),s=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function $h(n,e){n.asyncQueue.verifyOperationInProgress();const t=await OE(n);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(s=>Lh(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,i)=>Lh(e.remoteStore,i)),n._onlineComponents=e}async function OE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await il(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;vn("Error using user provided cache. Falling back to memory cache: "+t),await il(n,new Zi)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await il(n,new Zi);return n._offlineComponents}async function vg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await $h(n,n._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await $h(n,new Ro))),n._onlineComponents}function FE(n){return vg(n).then(e=>e.syncEngine)}async function yg(n){const e=await vg(n),t=e.eventManager;return t.onListen=gE.bind(null,e.syncEngine),t.onUnlisten=yE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=vE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=_E.bind(null,e.syncEngine),t}function $E(n,e,t={}){const s=new Rt;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,l,c,u){const p=new gg({next:g=>{p.Za(),o.enqueueAndForget(()=>lg(r,m));const _=g.docs.has(l);!_&&g.fromCache?u.reject(new B(M.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&g.fromCache&&c&&c.source==="server"?u.reject(new B(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(g)},error:g=>u.reject(g)}),m=new cg(jo(l.path),p,{includeMetadataChanges:!0,_a:!0});return ag(r,m)}(await yg(n),n.asyncQueue,e,t,s)),s.promise}function BE(n,e,t={}){const s=new Rt;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,l,c,u){const p=new gg({next:g=>{p.Za(),o.enqueueAndForget(()=>lg(r,m)),g.fromCache&&c.source==="server"?u.reject(new B(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(g)},error:g=>u.reject(g)}),m=new cg(l,p,{includeMetadataChanges:!0,_a:!0});return ag(r,m)}(await yg(n),n.asyncQueue,e,t,s)),s.promise}/**
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
 */function _g(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Bh=new Map;/**
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
 */function bg(n,e,t){if(!t)throw new B(M.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function wg(n,e,t,s){if(e===!0&&s===!0)throw new B(M.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Uh(n){if(!q.isDocumentKey(n))throw new B(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function qh(n){if(q.isDocumentKey(n))throw new B(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ea(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H()}function ot(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new B(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ea(n);throw new B(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function UE(n,e){if(e<=0)throw new B(M.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */class jh{constructor(e){var t,s;if(e.host===void 0){if(e.ssl!==void 0)throw new B(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new B(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}wg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_g((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new B(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new B(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new B(M.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ta{constructor(e,t,s,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jh({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new B(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jh(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new xf;switch(s.type){case"firstParty":return new Kw(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new B(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=Bh.get(t);s&&(O("ComponentProvider","Removing Datastore"),Bh.delete(t),s.terminate())}(this),Promise.resolve()}}function Ig(n,e,t,s={}){var i;const r=(n=ot(n,ta))._getSettings(),o=`${e}:${t}`;if(r.host!=="firestore.googleapis.com"&&r.host!==o&&vn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},r),{host:o,ssl:!1})),s.mockUserToken){let l,c;if(typeof s.mockUserToken=="string")l=s.mockUserToken,c=Ne.MOCK_USER;else{l=Ey(s.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const u=s.mockUserToken.sub||s.mockUserToken.user_id;if(!u)throw new B(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Ne(u)}n._authCredentials=new zw(new Rf(l,c))}}/**
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
 */class en{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new en(this.firestore,e,this._query)}}class Ke{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ke(this.firestore,e,this._key)}}class Ht extends en{constructor(e,t,s){super(e,t,jo(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ke(this.firestore,null,new q(e))}withConverter(e){return new Ht(this.firestore,e,this._path)}}function Ie(n,e,...t){if(n=Ce(n),bg("collection","path",e),n instanceof ta){const s=ce.fromString(e,...t);return qh(s),new Ht(n,null,s)}{if(!(n instanceof Ke||n instanceof Ht))throw new B(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(ce.fromString(e,...t));return qh(s),new Ht(n.firestore,null,s)}}function W(n,e,...t){if(n=Ce(n),arguments.length===1&&(e=hc.newId()),bg("doc","path",e),n instanceof ta){const s=ce.fromString(e,...t);return Uh(s),new Ke(n,null,new q(s))}{if(!(n instanceof Ke||n instanceof Ht))throw new B(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(ce.fromString(e,...t));return Uh(s),new Ke(n.firestore,n instanceof Ht?n.converter:null,new q(s))}}/**
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
 */class zh{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new eg(this,"async_queue_retry"),this.Vu=()=>{const s=io();s&&O("AsyncQueue","Visibility state changed to "+s.visibilityState),this.t_.jo()},this.mu=e;const t=io();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=io();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Rt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Tn(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(s=>{this.Eu=s,this.du=!1;const i=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(s);throw ke("INTERNAL UNHANDLED ERROR: ",i),s}).then(s=>(this.du=!1,s))));return this.mu=t,t}enqueueAfterDelay(e,t,s){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Nc.createAndSchedule(this,e,t,s,r=>this.yu(r));return this.Tu.push(i),i}fu(){this.Eu&&H()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class Vt extends ta{constructor(e,t,s,i){super(e,t,s,i),this.type="firestore",this._queue=new zh,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new zh(e),this._firestoreClient=void 0,await e}}}function Eg(n,e){const t=typeof n=="object"?n:_p(),s=typeof n=="string"?n:"(default)",i=ec(t,"firestore").getImmediate({identifier:s});if(!i._initialized){const r=wy("firestore");r&&Ig(i,...r)}return i}function pr(n){if(n._terminated)throw new B(M.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Tg(n),n._firestoreClient}function Tg(n){var e,t,s;const i=n._freezeSettings(),r=function(l,c,u,p){return new I0(l,c,u,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,_g(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((s=i.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new ME(n._authCredentials,n._appCheckCredentials,n._queue,r,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}async function Ag(n){vn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();qE(n,Ro.provider,{build:t=>new NE(t,e.cacheSizeBytes)})}function qE(n,e,t){if((n=ot(n,Vt))._firestoreClient||n._terminated)throw new B(M.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new B(M.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Tg(n)}/**
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
 */class os{constructor(e){this._byteString=e}static fromBase64String(e){try{return new os(Se.fromBase64String(e))}catch(t){throw new B(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new os(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class ti{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new B(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new be(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class kn{constructor(e){this._methodName=e}}/**
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
 */class na{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new B(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new B(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}}/**
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
 */class sa{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,i){if(s.length!==i.length)return!1;for(let r=0;r<s.length;++r)if(s[r]!==i[r])return!1;return!0}(this._values,e._values)}}/**
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
 */const jE=/^__.*__$/;class zE{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Xs(e,this.data,t,this.fieldTransforms)}}class Sg{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return new Zt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function kg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H()}}class ia{constructor(e,t,s,i,r,o){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=i,r===void 0&&this.vu(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new ia(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:s,xu:!1});return i.Ou(e),i}Nu(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:s,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return xo(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(kg(this.Cu)&&jE.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class GE{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Yo(e)}Qu(e,t,s,i=!1){return new ia({Cu:e,methodName:t,qu:s,path:be.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function fr(n){const e=n._freezeSettings(),t=Yo(n._databaseId);return new GE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function jc(n,e,t,s,i,r={}){const o=n.Qu(r.merge||r.mergeFields?2:0,e,t,i);Wc("Data must be an object, but it was:",o,s);const l=xg(s,o);let c,u;if(r.merge)c=new st(o.fieldMask),u=o.fieldTransforms;else if(r.mergeFields){const p=[];for(const m of r.mergeFields){const g=$l(e,m,t);if(!o.contains(g))throw new B(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);Lg(p,g)||p.push(g)}c=new st(p),u=o.fieldTransforms.filter(m=>c.covers(m.field))}else c=null,u=o.fieldTransforms;return new zE(new Ge(l),c,u)}class ra extends kn{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ra}}function Cg(n,e,t){return new ia({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class zc extends kn{_toFieldTransform(e){return new lr(e.path,new qs)}isEqual(e){return e instanceof zc}}class Gc extends kn{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Cg(this,e,!0),s=this.Ku.map(r=>hs(r,t)),i=new ts(s);return new lr(e.path,i)}isEqual(e){return e instanceof Gc&&Vs(this.Ku,e.Ku)}}class Hc extends kn{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Cg(this,e,!0),s=this.Ku.map(r=>hs(r,t)),i=new ns(s);return new lr(e.path,i)}isEqual(e){return e instanceof Hc&&Vs(this.Ku,e.Ku)}}class Kc extends kn{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new js(e.serializer,um(e.serializer,this.$u));return new lr(e.path,t)}isEqual(e){return e instanceof Kc&&this.$u===e.$u}}function Pg(n,e,t,s){const i=n.Qu(1,e,t);Wc("Data must be an object, but it was:",i,s);const r=[],o=Ge.empty();us(s,(c,u)=>{const p=Qc(e,c,t);u=Ce(u);const m=i.Nu(p);if(u instanceof ra)r.push(p);else{const g=hs(u,m);g!=null&&(r.push(p),o.set(p,g))}});const l=new st(r);return new Sg(o,l,i.fieldTransforms)}function Rg(n,e,t,s,i,r){const o=n.Qu(1,e,t),l=[$l(e,s,t)],c=[i];if(r.length%2!=0)throw new B(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<r.length;g+=2)l.push($l(e,r[g])),c.push(r[g+1]);const u=[],p=Ge.empty();for(let g=l.length-1;g>=0;--g)if(!Lg(u,l[g])){const _=l[g];let y=c[g];y=Ce(y);const x=o.Nu(_);if(y instanceof ra)u.push(_);else{const C=hs(y,x);C!=null&&(u.push(_),p.set(_,C))}}const m=new st(u);return new Sg(p,m,o.fieldTransforms)}function HE(n,e,t,s=!1){return hs(t,n.Qu(s?4:3,e))}function hs(n,e){if(Dg(n=Ce(n)))return Wc("Unsupported field value:",e,n),xg(n,e);if(n instanceof kn)return function(s,i){if(!kg(i.Cu))throw i.Bu(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${s._methodName}() is not currently supported inside arrays`);const r=s._toFieldTransform(i);r&&i.fieldTransforms.push(r)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(s,i){const r=[];let o=0;for(const l of s){let c=hs(l,i.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),r.push(c),o++}return{arrayValue:{values:r}}}(n,e)}return function(s,i){if((s=Ce(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return um(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const r=we.fromDate(s);return{timestampValue:zs(i.serializer,r)}}if(s instanceof we){const r=new we(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:zs(i.serializer,r)}}if(s instanceof na)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof os)return{bytesValue:wm(i.serializer,s._byteString)};if(s instanceof Ke){const r=i.databaseId,o=s.firestore._databaseId;if(!o.isEqual(r))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Ac(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof sa)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return bc(l.serializer,c)})}}}}}}(s,i);throw i.Bu(`Unsupported field value: ${ea(s)}`)}(n,e)}function xg(n,e){const t={};return jf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):us(n,(s,i)=>{const r=hs(i,e.Mu(s));r!=null&&(t[s]=r)}),{mapValue:{fields:t}}}function Dg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof we||n instanceof na||n instanceof os||n instanceof Ke||n instanceof kn||n instanceof sa)}function Wc(n,e,t){if(!Dg(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const s=ea(t);throw s==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+s)}}function $l(n,e,t){if((e=Ce(e))instanceof ti)return e._internalPath;if(typeof e=="string")return Qc(n,e);throw xo("Field path arguments must be of type string or ",n,!1,void 0,t)}const KE=new RegExp("[~\\*/\\[\\]]");function Qc(n,e,t){if(e.search(KE)>=0)throw xo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ti(...e.split("."))._internalPath}catch{throw xo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function xo(n,e,t,s,i){const r=s&&!s.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${s}`),o&&(c+=` in document ${i}`),c+=")"),new B(M.INVALID_ARGUMENT,l+n+c)}function Lg(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Vg{constructor(e,t,s,i,r){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new WE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(oa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class WE extends Vg{data(){return super.data()}}function oa(n,e){return typeof e=="string"?Qc(n,e):e instanceof ti?e._internalPath:e._delegate._internalPath}/**
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
 */function QE(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new B(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Yc{}class aa extends Yc{}function Cn(n,e,...t){let s=[];e instanceof Yc&&s.push(e),s=s.concat(t),function(r){const o=r.filter(c=>c instanceof la).length,l=r.filter(c=>c instanceof mr).length;if(o>1||o>0&&l>0)throw new B(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const i of s)n=i._apply(n);return n}class mr extends aa{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new mr(e,t,s)}_apply(e){const t=this._parse(e);return Ng(e._query,t),new en(e.firestore,e.converter,Sl(e._query,t))}_parse(e){const t=fr(e.firestore);return function(r,o,l,c,u,p,m){let g;if(u.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new B(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Hh(m,p);const _=[];for(const y of m)_.push(Gh(c,r,y));g={arrayValue:{values:_}}}else g=Gh(c,r,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Hh(m,p),g=HE(l,o,m,p==="in"||p==="not-in");return ie.create(u,p,g)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Jc(n,e,t){const s=e,i=oa("where",n);return mr._create(i,s,t)}class la extends Yc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new la(e,t)}_parse(e){const t=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return t.length===1?t[0]:he.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,r){let o=i;const l=r.getFlattenedFilters();for(const c of l)Ng(o,c),o=Sl(o,c)}(e._query,t),new en(e.firestore,e.converter,Sl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ca extends aa{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ca(e,t)}_apply(e){const t=function(i,r,o){if(i.startAt!==null)throw new B(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new B(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Xi(r,o)}(e._query,this._field,this._direction);return new en(e.firestore,e.converter,function(i,r){const o=i.explicitOrderBy.concat([r]);return new Js(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function ni(n,e="asc"){const t=e,s=oa("orderBy",n);return ca._create(s,t)}class ua extends aa{constructor(e,t,s){super(),this.type=e,this._limit=t,this._limitType=s}static _create(e,t,s){return new ua(e,t,s)}_apply(e){return new en(e.firestore,e.converter,bo(e._query,this._limit,this._limitType))}}function Pn(n){return UE("limit",n),ua._create("limit",n,"F")}function Gh(n,e,t){if(typeof(t=Ce(t))=="string"){if(t==="")throw new B(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!nm(e)&&t.indexOf("/")!==-1)throw new B(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(ce.fromString(t));if(!q.isDocumentKey(s))throw new B(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return Yi(n,new q(s))}if(t instanceof Ke)return Yi(n,t._key);throw new B(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ea(t)}.`)}function Hh(n,e){if(!Array.isArray(n)||n.length===0)throw new B(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ng(n,e){const t=function(i,r){for(const o of i)for(const l of o.getFlattenedFilters())if(r.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new B(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new B(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Mg{convertValue(e,t="none"){switch(Zn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return _e(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(yn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw H()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return us(e,(i,r)=>{s[i]=this.convertValue(r,t)}),s}convertVectorValue(e){var t,s,i;const r=(i=(s=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||s===void 0?void 0:s.values)===null||i===void 0?void 0:i.map(o=>_e(o.doubleValue));return new sa(r)}convertGeoPoint(e){return new na(_e(e.latitude),_e(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=vc(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(Wi(e));default:return null}}convertTimestamp(e){const t=Yt(e);return new we(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=ce.fromString(e);Y(xm(s));const i=new _n(s.get(1),s.get(3)),r=new q(s.popFirst(5));return i.isEqual(t)||ke(`Document ${r} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
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
 */function Xc(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}/**
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
 */class Ps{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Zc extends Vg{constructor(e,t,s,i,r,o){super(e,t,s,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new qi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(oa("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}}class qi extends Zc{data(e={}){return super.data(e)}}class Og{constructor(e,t,s,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Ps(i.hasPendingWrites,i.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new qi(this._firestore,this._userDataWriter,s.key,s,new Ps(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new B(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,r){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const c=new qi(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ps(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const c=new qi(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ps(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let u=-1,p=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),p=o.indexOf(l.doc.key)),{type:YE(l.type),doc:c,oldIndex:u,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function YE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return H()}}/**
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
 */function ct(n){n=ot(n,Ke);const e=ot(n.firestore,Vt);return $E(pr(e),n._key).then(t=>JE(e,n,t))}class Fg extends Mg{constructor(e){super(),this.firestore=e}convertBytes(e){return new os(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ke(this.firestore,null,t)}}function Xe(n){n=ot(n,en);const e=ot(n.firestore,Vt),t=pr(e),s=new Fg(e);return QE(n._query),BE(t,n._query).then(i=>new Og(e,s,n,i))}function Fe(n,e,t){n=ot(n,Ke);const s=ot(n.firestore,Vt),i=Xc(n.converter,e,t);return si(s,[jc(fr(s),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Re.none())])}function fe(n,e,t,...s){n=ot(n,Ke);const i=ot(n.firestore,Vt),r=fr(i);let o;return o=typeof(e=Ce(e))=="string"||e instanceof ti?Rg(r,"updateDoc",n._key,e,t,s):Pg(r,"updateDoc",n._key,e),si(i,[o.toMutation(n._key,Re.exists(!0))])}function $g(n){return si(ot(n.firestore,Vt),[new cr(n._key,Re.none())])}function Rn(n,e){const t=ot(n.firestore,Vt),s=W(n),i=Xc(n.converter,e);return si(t,[jc(fr(n.firestore),"addDoc",s._key,i,n.converter!==null,{}).toMutation(s._key,Re.exists(!1))]).then(()=>s)}function si(n,e){return function(s,i){const r=new Rt;return s.asyncQueue.enqueueAndForget(async()=>bE(await FE(s),i,r)),r.promise}(pr(n),e)}function JE(n,e,t){const s=t.docs.get(e._key),i=new Fg(n);return new Zc(n,i,e._key,s,new Ps(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */class Bg{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=fr(e)}set(e,t,s){this._verifyNotCommitted();const i=rl(e,this._firestore),r=Xc(i.converter,t,s),o=jc(this._dataReader,"WriteBatch.set",i._key,r,i.converter!==null,s);return this._mutations.push(o.toMutation(i._key,Re.none())),this}update(e,t,s,...i){this._verifyNotCommitted();const r=rl(e,this._firestore);let o;return o=typeof(t=Ce(t))=="string"||t instanceof ti?Rg(this._dataReader,"WriteBatch.update",r._key,t,s,i):Pg(this._dataReader,"WriteBatch.update",r._key,t),this._mutations.push(o.toMutation(r._key,Re.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=rl(e,this._firestore);return this._mutations=this._mutations.concat(new cr(t._key,Re.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new B(M.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function rl(n,e){if((n=Ce(n)).firestore!==e)throw new B(M.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function ue(){return new zc("serverTimestamp")}function da(...n){return new Gc("arrayUnion",n)}function eu(...n){return new Hc("arrayRemove",n)}function it(n){return new Kc("increment",n)}/**
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
 */function ps(n){return pr(n=ot(n,Vt)),new Bg(n,e=>si(n,e))}(function(e,t=!0){(function(i){Ys=i})(Qs),Ns(new Yn("firestore",(s,{instanceIdentifier:i,options:r})=>{const o=s.getProvider("app").getImmediate(),l=new Vt(new Gw(s.getProvider("auth-internal")),new Qw(s.getProvider("app-check-internal")),function(u,p){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new B(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _n(u.options.projectId,p)}(o,i),o);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),fn($d,"4.7.3",e),fn($d,"4.7.3","esm2017")})();const Kh=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Mg,Bytes:os,CollectionReference:Ht,DocumentReference:Ke,DocumentSnapshot:Zc,FieldPath:ti,FieldValue:kn,Firestore:Vt,FirestoreError:B,GeoPoint:na,Query:en,QueryCompositeFilterConstraint:la,QueryConstraint:aa,QueryDocumentSnapshot:qi,QueryFieldFilterConstraint:mr,QueryLimitConstraint:ua,QueryOrderByConstraint:ca,QuerySnapshot:Og,SnapshotMetadata:Ps,Timestamp:we,VectorValue:sa,WriteBatch:Bg,_AutoId:hc,_ByteString:Se,_DatabaseId:_n,_DocumentKey:q,_EmptyAuthCredentialsProvider:xf,_FieldPath:be,_cast:ot,_logWarn:vn,_validateIsNotUsedTogether:wg,addDoc:Rn,arrayRemove:eu,arrayUnion:da,collection:Ie,connectFirestoreEmulator:Ig,deleteDoc:$g,doc:W,enableMultiTabIndexedDbPersistence:Ag,ensureFirestoreConfigured:pr,executeWrite:si,getDoc:ct,getDocs:Xe,getFirestore:Eg,increment:it,limit:Pn,orderBy:ni,query:Cn,serverTimestamp:ue,setDoc:Fe,updateDoc:fe,where:Jc,writeBatch:ps},Symbol.toStringTag,{value:"Module"})),XE={apiKey:"AIzaSyCeCGep-Hh8yY2mXSHc2IWLPEJIB1uQIaY",authDomain:"drama3-d81d9.firebaseapp.com",projectId:"drama3-d81d9",storageBucket:"drama3-d81d9.firebasestorage.app",messagingSenderId:"807928634816",appId:"1:807928634916:web:bfaa56c93e0210c6d182b1",measurementId:"G-FXY2R6W4XX"},Ug=yp(XE),xn=Ef(Ug),F=Eg(Ug),xt="admin@dramaflow.com";Ag(F).catch(n=>{n.code==="failed-precondition"?console.info("[DramaFlow] Offline persistence limited to one tab"):n.code==="unimplemented"&&console.info("[DramaFlow] Offline persistence not supported")});const ii=new Tt;ii.addScope("profile");ii.addScope("email");ii.setCustomParameters({prompt:"select_account"});const Wh=Object.freeze(Object.defineProperty({__proto__:null,ADMIN_EMAIL:xt,auth:xn,db:F,googleProvider:ii},Symbol.toStringTag,{value:"Module"})),d={user:null,isAdmin:!1,isSuperAdmin:!1,userRole:"user",adminLevel:0,userBlocked:!1,page:"home",appLoading:!0,appError:null,isOffline:!1,content:[],sections:[],sectionConfigs:null,trendingIds:[],bannerContentId:null,myList:[],watchHistory:{},liked:[],sub:"free",ratings:{},adCredits:0,adCreditsUsed:{},loginStreak:0,lastLoginDate:null,completedTasks:{},totalCreditsEarned:0,notifications:[],awardModal:null,allUsers:[],userFilter:"all",userSearch:"",usersSearch:"",chatSearch:"",aTab:"content",expandedUserId:null,aEditId:null,aShowForm:!1,tmpTrending:[],tmpSections:[],tmpSectionConfigs:[],expandedSection:-1,tasksConfig:null,pc:null,pEp:0,pPaywall:null,pShowLib:!1,pShowComments:!1,pComments:[],pMuted:!1,pSpeed:1,pAutoplay:!0,pShowRating:!1,pCountdownActive:!1,pCountdownSec:5,adPlaying:!1,adContext:null,adTimeLeft:30,adCanSkip:!1,adCompleted:!1,adSource:"paywall",detailId:null,detailFrom:"home",notifHistory:[],notifAudience:"all",chatMessages:[],chatUid:null,chatInput:"",globalChatMessages:[],globalChatInput:"",globalChatTab:"direct",activityLog:[],actLogFilter:"all",promoConfig:null,showPromo:!1,sq:"",sg:"",sSort:"popular",sGenres:[],searchPage:0,libSearch:"",libGenre:"",libSort:"default",showPlanModal:null,userChatMessages:[],userChatUnread:!1,showUserChat:!1,userChatInput:""},Bl=new Set;function qg(n){return Bl.add(n),()=>Bl.delete(n)}function de(){Bl.forEach(n=>n())}function z(n){Object.assign(d,n),de()}const as=2;function ha(n){const e=n||d.sub||"free";return{plan:e,freeEpLimit:as,canWatchAll:e==="standard"||e==="premium",canExclusive:e==="premium"}}function pa(n,e,t){var r;const s=ha(t);return d.userBlocked?{allowed:!1,reason:"blocked"}:n.exclusive===!0&&!s.canExclusive?{allowed:!1,reason:"exclusive"}:s.canWatchAll?{allowed:!0,reason:null}:e<as?{allowed:!0,reason:null}:(((r=d.adCreditsUsed)==null?void 0:r[n.id])||[]).includes(e)?{allowed:!0,reason:null}:{allowed:!1,reason:"episode_limit"}}function Ae(n){return n.catch(e=>console.warn("[DramaFlow] Background write failed:",e.message))}function tu(){return d.content.filter(n=>!n.hidden)}function gt(n){return d.content.find(e=>e.id===n)||null}async function jg(n,e){if(!(n!=null&&n.trim()))throw new Error("Email is required");if(!e)throw new Error("Password is required");await Xp(xn,n.trim(),e)}async function zg(n,e,t){if(!(t!=null&&t.trim()))throw new Error("Full name is required");if(!(n!=null&&n.trim()))throw new Error("Email is required");if(!e||e.length<6)throw new Error("Password must be at least 6 characters");const s=await Jp(xn,n.trim(),e);await Zp(s.user,{displayName:t.trim()}),await Fe(W(F,"users",s.user.uid),{email:n.trim(),displayName:t.trim(),subscription:"free",role:"user",adminLevel:0,online:!0,blocked:!1,myList:[],watchHistory:{},liked:[],createdAt:ue(),lastSeen:ue()})}async function Gg(){d.user&&Ae(Fe(W(F,"users",d.user.uid),{online:!1,lastSeen:ue()},{merge:!0})),await sf(xn),z({user:null,isAdmin:!1,isSuperAdmin:!1,userRole:"user",adminLevel:0,userBlocked:!1,myList:[],watchHistory:{},liked:[],sub:"free",page:"home",pc:null,pEp:0,pShowLib:!1,pShowComments:!1,pComments:[],allUsers:[]})}async function Hg(){try{const n=await mf(xn,ii),e=n.user,t=W(F,"users",e.uid),s=await ct(t);return s.exists()?Ae(Fe(t,{email:e.email,displayName:e.displayName||s.data().displayName||"",photoURL:e.photoURL||s.data().photoURL||null,online:!0,lastSeen:ue()},{merge:!0})):await Fe(t,{email:e.email,displayName:e.displayName||e.email.split("@")[0],photoURL:e.photoURL||null,subscription:"free",role:"user",adminLevel:0,online:!0,blocked:!1,myList:[],watchHistory:{},liked:[],provider:"google",createdAt:ue(),lastSeen:ue()}),n.user}catch(n){if(n.code==="auth/popup-closed-by-user"||n.code==="auth/cancelled-popup-request")return"cancelled";if(n.code==="auth/popup-blocked")return Kg();throw n}}async function Kg(){await yf(xn,ii)}async function Wg(){try{const n=await _f(xn);if(!n)return null;const e=n.user,t=W(F,"users",e.uid),s=await ct(t);return s.exists()?Ae(Fe(t,{email:e.email,displayName:e.displayName||s.data().displayName||"",photoURL:e.photoURL||s.data().photoURL||null,online:!0,lastSeen:ue()},{merge:!0})):await Fe(t,{email:e.email,displayName:e.displayName||e.email.split("@")[0],photoURL:e.photoURL||null,subscription:"free",role:"user",adminLevel:0,online:!0,blocked:!1,myList:[],watchHistory:{},liked:[],provider:"google",createdAt:ue(),lastSeen:ue()}),e}catch(n){return console.warn("[DramaFlow] Google redirect result error:",n.message),null}}async function Qg(n){const e=await ct(W(F,"users",n));if(!e.exists())return;const t=e.data();z({myList:Array.isArray(t.myList)?t.myList:[],watchHistory:t.watchHistory&&typeof t.watchHistory=="object"?t.watchHistory:{},liked:Array.isArray(t.liked)?t.liked:[],sub:t.subscription||"free",userBlocked:t.blocked===!0,userRole:t.role||"user",adminLevel:t.adminLevel||0,ratings:t.ratings&&typeof t.ratings=="object"?t.ratings:{},adCredits:typeof t.adCredits=="number"?t.adCredits:0,adCreditsUsed:t.adCreditsUsed&&typeof t.adCreditsUsed=="object"?t.adCreditsUsed:{}})}async function fa(){z({appLoading:!0,appError:null});try{const{seedIfEmpty:n}=await Ft(async()=>{const{seedIfEmpty:m}=await import("./mockData-_0DqGLqj.js");return{seedIfEmpty:m}},[]);await n();const[e,t,s,i,r]=await Promise.all([Xe(Ie(F,"content")),ct(W(F,"settings","sections")),ct(W(F,"settings","trending")),ct(W(F,"settings","banner")),ct(W(F,"settings","sectionConfigs"))]),o=e.docs.map(m=>({id:m.id,...m.data()})),l=t.exists()?t.data().order||[]:[],c=s.exists()?s.data().top10||[]:[],u=i.exists()?i.data().contentId:null,p=r.exists()?r.data().configs:null;z({content:o,sections:l,trendingIds:c,bannerContentId:u,sectionConfigs:p,appLoading:!1,appError:null}),d.tmpTrending=[...c],d.tmpSections=[...l],d.tmpSectionConfigs=nu(),de()}catch(n){console.error("[DramaFlow] loadData failed:",n);const e=navigator.onLine?"Failed to load content. Check your connection and try again.":"You appear to be offline. Showing cached content.";z({appLoading:!1,appError:e}),de()}}async function ma(){const n=await Xe(Ie(F,"content"));z({content:n.docs.map(e=>({id:e.id,...e.data()}))})}function nu(){const n=[{name:"Top 10 Trending",type:"trending",pinnedIds:[]},{name:"Continue Watching",type:"continue",pinnedIds:[]}],e=d.sectionConfigs;if(e&&Array.isArray(e)){const t=d.tmpSections.map(s=>e.find(r=>r.name===s&&r.type==="content")||{name:s,type:"content",pinnedIds:[]});return[...n,...t]}return[...n,...d.tmpSections.map(t=>({name:t,type:"content",pinnedIds:[]}))]}async function ji(n,e=0){if(!d.user)return"auth";if(d.userBlocked){alert("Your account has been blocked. Please contact support to appeal.");return}const t=gt(n);if(!t){console.warn("[DramaFlow] actPlay: content not found:",n);return}const s=t.episodes||1,i=Math.max(0,Math.min(e,s-1)),r=pa(t,i,d.sub);if(!r.allowed)return z({pc:t,pEp:i,pShowLib:!1,pShowComments:!1,pComments:[],pPaywall:r.reason}),de(),"paywall";d.pPaywall=null,z({pc:t,pEp:i,pShowLib:!1,pShowComments:!1,pComments:[],pPaywall:null}),d.myList.includes(n)||(d.myList=[...d.myList,n],Ae(fe(W(F,"users",d.user.uid),{myList:da(n)}))),d.watchHistory={...d.watchHistory,[n]:i},Ae(fe(W(F,"users",d.user.uid),{[`watchHistory.${n}`]:i})),Ae(fe(W(F,"content",n),{views:it(1)})),ga(n),de()}async function Yg(n){if(!d.pc)return;const e=d.pc.episodes||1,t=Math.max(0,Math.min(n,e-1)),s=pa(d.pc,t,d.sub);if(!s.allowed)return d.pEp=t,d.pPaywall=s.reason,de(),"paywall";d.pPaywall=null,d.pEp=t,d.watchHistory={...d.watchHistory,[d.pc.id]:t},d.user&&Ae(fe(W(F,"users",d.user.uid),{[`watchHistory.${d.pc.id}`]:t}))}async function Jg(n){if(!d.user)return"auth";const e=gt(n);d.myList.includes(n)?(d.myList=d.myList.filter(s=>s!==n),Ae(fe(W(F,"users",d.user.uid),{myList:eu(n)})),Z("Removed from My List")):(d.myList=[...d.myList,n],Ae(fe(W(F,"users",d.user.uid),{myList:da(n)})),Z(((e==null?void 0:e.title)||"Drama")+" added to My List")),de()}async function Xg(n){if(!d.user)return"auth";const e=d.liked.includes(n),t=gt(n);e?(d.liked=d.liked.filter(s=>s!==n),t&&(t.likes=Math.max(0,(t.likes||0)-1)),Ae(fe(W(F,"users",d.user.uid),{liked:eu(n)})),Ae(fe(W(F,"content",n),{likes:it(-1)}))):(d.liked=[...d.liked,n],t&&(t.likes=(t.likes||0)+1),Ae(fe(W(F,"users",d.user.uid),{liked:da(n)})),Ae(fe(W(F,"content",n),{likes:it(1)}))),de()}async function Zg(n,e){if(!d.user)return"auth";if(d.userBlocked)return Z("Your account is blocked"),"blocked";if(!(e!=null&&e.trim()))return;if(!gr("comment_"+d.user.uid,5))return Z("Slow down — you are posting too fast"),"rate_limit";const t=He(e,500);t&&(await Rn(Ie(F,"comments"),{contentId:n,userId:d.user.uid,userName:He(d.user.displayName||d.user.email,80),userEmail:d.user.email,text:t,createdAt:ue()}),await ga(n))}async function ga(n){try{const e=Cn(Ie(F,"comments"),Jc("contentId","==",n),Pn(100)),s=(await Xe(e)).docs.map(i=>({id:i.id,...i.data()})).sort((i,r)=>{var c,u;const o=((c=i.createdAt)==null?void 0:c.seconds)||0;return(((u=r.createdAt)==null?void 0:u.seconds)||0)-o});z({pComments:s})}catch(e){console.warn("[DramaFlow] loadComments failed:",e.message),z({pComments:[]})}}async function ZE(n){if(!d.user)return"auth";await $g(W(F,"comments",n)),d.pc&&await ga(d.pc.id)}async function ev(){if(!d.user)return"auth";confirm("Clear all watch history? This cannot be undone.")&&(d.watchHistory={},Ae(fe(W(F,"users",d.user.uid),{watchHistory:{}})),de())}async function tv(n){var e,t,s;try{if(bt(1),!((e=n.title)!=null&&e.trim()))throw new Error("Title is required");if(!((t=n.genre)!=null&&t.trim()))throw new Error("Genre is required");const i=Math.min(500,Math.max(1,parseInt(n.episodes)||1));await Rn(Ie(F,"content"),{title:He(n.title,200),genre:He(n.genre,80),thumbnail:((s=n.thumbnail)==null?void 0:s.trim())||"",description:He(n.description||"",2e3),section:He(n.section||"",100),episodes:i,episodeUrls:Array.isArray(n.episodeUrls)?n.episodeUrls.slice(0,i):[],exclusive:n.exclusive===!0,hidden:!1,likes:0,views:0,trending:!1,trendRank:99,createdAt:ue()}),await ma(),de(),Z("Content added ✓")}catch(i){throw Z("Failed to add content: "+i.message,4e3),i}}async function nv(n,e){var i;if(bt(1),!n)throw new Error("Content ID is required");const t=["title","genre","thumbnail","description","section","episodes","episodeUrls","hidden","exclusive","trending","trendRank"],s={};for(const r of t)e[r]!==void 0&&(s[r]=e[r]);for(const r of["title","genre","description","section"])typeof s[r]=="string"&&(s[r]=He(s[r],r==="description"?2e3:200));if(typeof s.thumbnail=="string"&&(s.thumbnail=s.thumbnail.trim().slice(0,500)),((i=s.title)==null?void 0:i.length)===0)throw new Error("Title cannot be empty");s.episodes&&(s.episodes=Math.min(500,Math.max(1,parseInt(s.episodes)||1))),s.updatedAt=ue(),await fe(W(F,"content",n),s),await ma(),de()}async function sv(n){var i;bt(1);const e=gt(n),t=(e==null?void 0:e.title)||"this item";if(!confirm(`Permanently delete "${t}"?
This cannot be undone.`))return;const s=ps(F);if(s.delete(W(F,"content",n)),d.trendingIds.includes(n)){const r=d.trendingIds.filter(o=>o!==n);s.set(W(F,"settings","trending"),{top10:r}),d.tmpTrending=r,d.trendingIds=r}if(d.bannerContentId===n){const r=((i=tu().find(o=>o.id!==n))==null?void 0:i.id)||null;s.set(W(F,"settings","banner"),{contentId:r}),d.bannerContentId=r}await s.commit(),await ma(),de()}function iv(n,e){const t=d.content.find(s=>s.id===n);t&&(t.hidden=e),Ae(fe(W(F,"content",n),{hidden:e})),de()}async function rv(n){await Fe(W(F,"settings","banner"),{contentId:n}),z({bannerContentId:n})}async function ov(){const n=d.tmpTrending.slice(0,10);await Fe(W(F,"settings","trending"),{top10:n}),d.trendingIds=[...n],d.tmpTrending=[...n],de()}async function av(n){if(!Array.isArray(n)||n.length===0)return;const e=n.filter(i=>i.type==="content").map(i=>i.name).filter(Boolean),t=ps(F);t.set(W(F,"settings","sections"),{order:e}),t.set(W(F,"settings","sectionConfigs"),{configs:n}),await t.commit();const s=n.map(i=>({...i,pinnedIds:[...i.pinnedIds||[]]}));z({sections:e,sectionConfigs:s,tmpSections:[...e],tmpSectionConfigs:s}),de()}async function Cs(){const n=await Xe(Ie(F,"users"));z({allUsers:n.docs.map(e=>({id:e.id,...e.data()}))})}async function lv(n,e){if(!["free","standard","premium"].includes(e))return;const s=d.allUsers.find(r=>r.id===n),i=(s==null?void 0:s.subscription)||"free";await fe(W(F,"users",n),{subscription:e}),z({allUsers:d.allUsers.map(r=>r.id===n?{...r,subscription:e}:r)}),Dn({type:"subscription",action:"Changed subscription",targetUid:n,targetName:(s==null?void 0:s.displayName)||(s==null?void 0:s.email)||n,from:i,to:e})}async function cv(n){var s;try{bt(3)}catch(i){Z("Access denied: "+i.message);return}const e=d.allUsers.find(i=>i.id===n),t=(e==null?void 0:e.displayName)||(e==null?void 0:e.email)||"this user";confirm(`Block ${t}?
They will be unable to watch content until unblocked.`)&&(await fe(W(F,"users",n),{blocked:!0,blockedAt:ue(),blockedBy:((s=d.user)==null?void 0:s.uid)||"admin"}),z({allUsers:d.allUsers.map(i=>i.id===n?{...i,blocked:!0}:i)}),Dn({type:"block",action:"Blocked user",targetUid:n,targetName:t}))}async function uv(n){const e=d.allUsers.find(t=>t.id===n);await fe(W(F,"users",n),{blocked:!1,blockedAt:null,blockedBy:null}),z({allUsers:d.allUsers.map(t=>t.id===n?{...t,blocked:!1}:t)}),Dn({type:"unblock",action:"Unblocked user",targetUid:n,targetName:(e==null?void 0:e.displayName)||(e==null?void 0:e.email)||n})}async function dv(n,e){try{bt(4)}catch(i){Z("Access denied: "+i.message);return}if(!confirm(`Permanently delete ${e||"this user"}?

This removes all their data from the database.
Note: Their login account may still exist in Firebase Auth.`))return;const s=ps(F);s.delete(W(F,"users",n)),await s.commit(),z({allUsers:d.allUsers.filter(i=>i.id!==n)})}async function hv(n,e,t=1){var o;const s=Math.max(1,Math.min(4,parseInt(t)||1));confirm(`Appoint ${e||"this user"} as Sub-Admin?

${{1:"Level 1 — Content & Banner",2:"Level 2 — + Trending, Sections, Promo & Notifications",3:"Level 3 — Full Admin Access (Users & Credits)",4:"Level 4 — Full access, same as Super Admin"}[s]}

Level 1: Content + Banner
Level 2: + Trending, Sections, Promo, Notifications
Level 3: + Users, Credits panels
Level 4: Full access — same as Super Admin`)&&(await fe(W(F,"users",n),{role:"subadmin",adminLevel:s,appointedBy:((o=d.user)==null?void 0:o.uid)||"superadmin",appointedAt:ue()}),z({allUsers:d.allUsers.map(l=>l.id===n?{...l,role:"subadmin",adminLevel:s}:l)}),Dn({type:"admin",action:"Appointed sub-admin (Level "+s+")",targetUid:n,targetName:e||n}))}async function pv(n,e,t){var r;const s=Math.max(1,Math.min(4,parseInt(t)||1)),i=e||n;await fe(W(F,"users",n),{role:"subadmin",adminLevel:s,appointedBy:((r=d.user)==null?void 0:r.uid)||"admin",appointedAt:ue()}),z({allUsers:d.allUsers.map(o=>o.id===n?{...o,role:"subadmin",adminLevel:s}:o)}),Z(i+" is now Level "+s+" Admin",2500),Dn({type:"admin",action:"Changed admin level to "+s,targetUid:n,targetName:i})}async function fv(n,e){var s;const t=e||"this user";confirm(`Revoke all admin access from ${t}?
They will become a regular user.`)&&(await fe(W(F,"users",n),{role:"user",adminLevel:0,revokedAt:ue(),revokedBy:((s=d.user)==null?void 0:s.uid)||"superadmin"}),z({allUsers:d.allUsers.map(i=>i.id===n?{...i,role:"user",adminLevel:0}:i)}),Dn({type:"admin",action:"Revoked admin access",targetUid:n,targetName:t}))}async function su(n,e){if(!d.user)return"auth";if(e=Math.max(1,Math.min(5,parseInt(e)||0)),!e)return;const t=d.ratings[n]||0;d.ratings={...d.ratings,[n]:e},de();const s=W(F,"users",d.user.uid),i=W(F,"content",n);Ae(fe(s,{[`ratings.${n}`]:e})),t>0?Ae(fe(i,{ratingSum:it(e-t)})):Ae(fe(i,{ratingSum:it(e),ratingCount:it(1)}));const r=gt(n);r&&(t===0?(r.ratingCount=(r.ratingCount||0)+1,r.ratingSum=(r.ratingSum||0)+e):r.ratingSum=(r.ratingSum||0)+(e-t)),de()}function Kt(n){return!n||!n.ratingCount||!n.ratingSum?0:Math.round(n.ratingSum/n.ratingCount*10)/10}function va(n){return d.ratings[n]||0}async function mv(n){const e=gt(n);if(!e)return;const t=`${window.location.origin}/?watch=${n}`,s={title:e.title,text:`Watch "${e.title}" on DramaFlow — ${e.episodes} episodes of ${e.genre}`,url:t};if(navigator.share)try{await navigator.share(s)}catch(i){i.name!=="AbortError"&&Qh(t,e.title)}else Qh(t,e.title)}function Qh(n,e){var t;(t=navigator.clipboard)==null||t.writeText(n).then(()=>{Z(`Link copied! Share "${e}" anywhere.`)}).catch(()=>{window.prompt("Copy this link:",n)})}async function ya(){if(d.user)try{const n=Cn(Ie(F,"notifications"),Jc("userId","==",d.user.uid),Pn(50)),t=(await Xe(n)).docs.map(s=>({id:s.id,...s.data()})).sort((s,i)=>{var r,o;return(((r=i.createdAt)==null?void 0:r.seconds)||0)-(((o=s.createdAt)==null?void 0:o.seconds)||0)}).slice(0,20);z({notifications:t})}catch(n){console.warn("[DramaFlow] loadNotifications failed:",n.message),z({notifications:[]})}}async function Ul(){if(!d.user||!d.notifications.length)return;const n=d.notifications.filter(t=>!t.read);if(!n.length)return;const e=ps(F);n.forEach(t=>e.update(W(F,"notifications",t.id),{read:!0})),await e.commit(),z({notifications:d.notifications.map(t=>({...t,read:!0}))})}async function gv(n,e){const t=gt(n);if(!t)return;const s=(e==null?void 0:e.trim())||`New update for "${t.title}"!`,r=(await Xe(Ie(F,"users"))).docs.map(l=>({uid:l.id,...l.data()})).filter(l=>Array.isArray(l.myList)&&l.myList.includes(n));if(!r.length){Z("No users have this in their list yet.");return}const o=ps(F);r.forEach(l=>{const c=W(Ie(F,"notifications"));o.set(c,{userId:l.uid,contentId:n,title:t.title,thumbnail:t.thumbnail||"",message:s,read:!1,createdAt:ue()})}),await o.commit(),Z(`Notification sent to ${r.length} user${r.length!==1?"s":""} who saved "${t.title}".`)}function Z(n,e=3e3){var s;(s=document.getElementById("dfToast"))==null||s.remove();const t=document.createElement("div");t.id="dfToast",t.className="df-toast df-toast-in",t.textContent=n,document.body.appendChild(t),setTimeout(()=>{t.classList.remove("df-toast-in"),t.classList.add("df-toast-out"),setTimeout(()=>t.remove(),400)},e)}function iu(){const n=Object.keys(d.watchHistory);if(!n.length)return[];const e=n[n.length-1],t=gt(e);if(!t)return[];const s=tu(),i=s.filter(r=>r.genre===t.genre&&r.id!==e&&!d.watchHistory[r.id]).slice(0,8);if(i.length<4){const r=s.filter(o=>o.id!==e&&!d.watchHistory[o.id]&&!i.find(l=>l.id===o.id)).slice(0,8-i.length);return[...i,...r]}return i}function ru(){var e;const n=Object.keys(d.watchHistory);return n.length&&((e=gt(n[n.length-1]))==null?void 0:e.title)||null}const Li=1,rt=30,ri=5;function vv(n,e){if(!d.user)return"auth";z({adPlaying:!0,adContext:{contentId:n,epIndex:e},adTimeLeft:rt,adCanSkip:!1,adCompleted:!1,pPaywall:null})}async function ou(){var o;if(!d.user)return;if(!d.adContext){const l=(d.adCredits||0)+Li;z({adCredits:l,adCompleted:!0,totalCreditsEarned:(d.totalCreditsEarned||0)+Li}),Ae(fe(W(F,"users",d.user.uid),{adCredits:l,totalCreditsEarned:it(Li),totalAdsWatched:it(1)}));return}const{contentId:n,epIndex:e}=d.adContext,t=(d.adCredits||0)+Li,s=((o=d.adCreditsUsed)==null?void 0:o[n])||[],i=s.includes(e)?s:[...s,e],r={...d.adCreditsUsed,[n]:i};z({adCredits:t,adCreditsUsed:r,adCompleted:!0}),Ae(fe(W(F,"users",d.user.uid),{adCredits:t,[`adCreditsUsed.${n}`]:i,totalAdsWatched:it(1)})),Z("Episode unlocked! Enjoy EP "+(e+1),3e3)}async function yv(){if(!d.adContext){z({adPlaying:!1,adContext:null,adCompleted:!1});return}const{contentId:n,epIndex:e}=d.adContext,t=gt(n);z({adPlaying:!1,adContext:null,adCompleted:!1}),t&&await ji(n,e)}async function _v(){d.adCanSkip&&await ou()}function bv(){if(!d.adPlaying||d.adCompleted)return;const n=d.adTimeLeft-1;n<=0?(z({adTimeLeft:0,adCanSkip:!0}),ou()):z({adTimeLeft:n,adCanSkip:n<=rt-ri})}function wv(){z({adPlaying:!1,adContext:null,adCompleted:!1,adTimeLeft:rt,adCanSkip:!1,pPaywall:"episode_limit"})}const _a=[{id:"daily_login",type:"streak",icon:"calendar",title:"Daily Login Streak",desc:"Log in every day to earn credits. Complete 7 days for a bonus!",creditsPerDay:1,maxStreak:7,streakBonusDay:7,streakBonusCredits:2,enabled:!0},{id:"watch_ad_page",type:"watch_ad",icon:"video",title:"Watch a Short Video",desc:"Watch a 30-second video and earn 1 credit. No limit.",creditsEarned:1,cooldownMinutes:0,enabled:!0},{id:"follow_instagram",type:"social",icon:"instagram",title:"Follow on Instagram",desc:"Follow @DramaFlow on Instagram and earn 2 credits.",creditsEarned:2,platform:"instagram",url:"https://instagram.com/dramaflow",oneTime:!0,enabled:!0},{id:"follow_youtube",type:"social",icon:"youtube",title:"Subscribe on YouTube",desc:"Subscribe to our YouTube channel and earn 2 credits.",creditsEarned:2,platform:"youtube",url:"https://youtube.com/@dramaflow",oneTime:!0,enabled:!0},{id:"follow_twitter",type:"social",icon:"twitter",title:"Follow on X (Twitter)",desc:"Follow @DramaFlow on X and earn 1 credit.",creditsEarned:1,platform:"twitter",url:"https://twitter.com/dramaflow",oneTime:!0,enabled:!0},{id:"share_app",type:"action",icon:"share",title:"Share DramaFlow",desc:"Share DramaFlow with a friend and earn 1 credit. (Once per day)",creditsEarned:1,cooldownMinutes:1440,enabled:!0},{id:"rate_content",type:"action",icon:"star",title:"Rate a Drama",desc:"Rate any drama you've watched and earn 1 credit. (Once per day)",creditsEarned:1,cooldownMinutes:1440,enabled:!0}];function ls(){return d.tasksConfig||_a}async function Iv(){if(!d.user)return;const n=Av(),e=d.lastLoginDate,t=d.loginStreak||0;if(e===n)return;const i=ls().find(x=>x.id==="daily_login")||{},r=i.creditsPerDay??1,o=i.maxStreak??7,l=i.streakBonusDay??7,c=i.streakBonusCredits??2,u=eT(-1);let p=1;e===u&&(p=t+1);const m=p===l,g=r+(m?c:0),_=p>=o?0:p,y=(d.adCredits||0)+g;z({loginStreak:_,lastLoginDate:n,adCredits:y,totalCreditsEarned:(d.totalCreditsEarned||0)+g}),Ae(fe(W(F,"users",d.user.uid),{loginStreak:_,lastLoginDate:n,adCredits:y,totalCreditsEarned:it(g)})),m?Z("Day "+p+" complete! +"+r+" + "+c+" bonus = "+g+" credits. Streak resets tomorrow!",4500):Z("Day "+p+" streak! +"+g+" credit"+(g!==1?"s":""),3200)}async function ql(n){if(!d.user)return"auth";const t=ls().find(u=>u.id===n);if(!t||!t.enabled)return;const s=Date.now();Av();const i=d.completedTasks||{},r=i[n];if(t.oneTime&&r)return Z("✓ Already completed — you earned this credit!"),"already_done";if(t.cooldownMinutes>0&&r){const u=new Date(r).getTime(),p=(s-u)/6e4;if(p<t.cooldownMinutes){const m=Math.ceil(t.cooldownMinutes-p),g=m>=1440?Math.ceil(m/1440)+"d":m>=60?Math.ceil(m/60)+"h":m+"m";return Z("Come back in "+g+" to do this again"),"cooldown"}}const o=t.creditsEarned||1,l=(d.adCredits||0)+o,c={...i,[n]:new Date().toISOString()};return z({adCredits:l,completedTasks:c,totalCreditsEarned:(d.totalCreditsEarned||0)+o}),Ae(fe(W(F,"users",d.user.uid),{adCredits:l,[`completedTasks.${n}`]:new Date().toISOString(),totalCreditsEarned:it(o)})),Z("+"+o+" credit"+(o!==1?"s":"")+" earned! Balance: "+l,3e3),"success"}function Ev(n){const t=ls().find(r=>r.id===n);if(!t||!t.enabled)return"disabled";const i=(d.completedTasks||{})[n];if(t.oneTime&&i)return"done";if(t.cooldownMinutes>0&&i){const r=(Date.now()-new Date(i).getTime())/6e4;if(r<t.cooldownMinutes)return"cooldown:"+Math.ceil(t.cooldownMinutes-r)}return"available"}async function au(){try{const n=await ct(W(F,"settings","tasks"));n.exists()&&z({tasksConfig:n.data().tasks})}catch(n){console.warn("[DramaFlow] loadTasksConfig failed:",n.message)}}async function jl(n){await Fe(W(F,"settings","tasks"),{tasks:n}),z({tasksConfig:n}),Z("✓ Tasks config saved!")}async function Tv(n){const e=await ct(W(F,"users",n));if(!e.exists())return;const t=e.data();z({loginStreak:t.loginStreak||0,lastLoginDate:t.lastLoginDate||null,completedTasks:t.completedTasks||{},totalCreditsEarned:t.totalCreditsEarned||0})}function zl(){if(!d.user)return"auth";z({adPlaying:!0,adContext:null,adSource:"credits_page",adTimeLeft:rt,adCanSkip:!1,adCompleted:!1})}function Av(){return new Date().toISOString().slice(0,10)}function eT(n){const e=new Date;return e.setDate(e.getDate()+n),e.toISOString().slice(0,10)}async function Sv(n,e,t,s){var c;try{bt(3)}catch(u){Z("Access denied: "+u.message);return}if(!n||!t)return;const i=parseInt(t);if(isNaN(i)||i===0){Z("Enter a valid credit amount");return}if(Math.abs(i)>1e4){Z("Amount too large (max ±10000)");return}const r=e||n,o=i>0?"Award":"Deduct",l=Math.abs(i);await fe(W(F,"users",n),{adCredits:it(i),totalCreditsEarned:i>0?it(i):0,[`creditLog.${Date.now()}`]:{amount:i,reason:(s==null?void 0:s.trim())||(i>0?"Admin award":"Admin deduction"),by:((c=d.user)==null?void 0:c.uid)||"admin",at:ue()}}),z({allUsers:d.allUsers.map(u=>u.id===n?{...u,adCredits:Math.max(0,(u.adCredits||0)+i)}:u)}),Z(o+"ed "+l+" credit"+(l!==1?"s":"")+" to "+r,3e3),Dn({type:"credits",action:(i>0?"Awarded":"Deducted")+" "+l+" credits",targetUid:n,targetName:r,amount:i,reason:(s==null?void 0:s.trim())||""})}const pe={enabled:!0,title:"Unlock Unlimited Drama",subtitle:"Start your Premium trial today",body:"Get access to all episodes, exclusive content, and HD quality — ad-free.",badge:"Limited Offer",ctaLabel:"Get Premium — ₹199/mo",ctaAction:"subscribe",ctaUrl:"",secondaryLabel:"Maybe later",showTo:"always",delaySeconds:3,frequencyHours:24,style:"gradient",accentColor:"#e5253f",imageUrl:""};async function Gl(){try{const n=await ct(W(F,"settings","promo")),e=n.exists()?{...pe,...n.data()}:pe;return z({promoConfig:e}),e}catch(n){return console.warn("[DramaFlow] loadPromoConfig failed:",n.message),z({promoConfig:pe}),pe}}async function Hl(n){await Fe(W(F,"settings","promo"),n),z({promoConfig:n}),Z("Promo popup saved!")}function Kl(){var r;const n=d.promoConfig||pe;if(!n.enabled)return!1;const e=d.sub||"free",t=!!d.user,s=e==="free";if(n.showTo==="free"){if(t&&!s)return!1}else if(n.showTo==="loggedout"){if(t)return!1}else if(n.showTo==="all"&&!t)return!1;const i=n.frequencyHours!=null?Number(n.frequencyHours):24;if(i>0){const o="dfPromoShown_"+(((r=d.user)==null?void 0:r.uid)||"guest"),l=parseInt(localStorage.getItem(o)||"0");if((Date.now()-l)/36e5<i)return!1}return!0}function kv(){var e;const n="dfPromoShown_"+(((e=d.user)==null?void 0:e.uid)||"guest");localStorage.setItem(n,String(Date.now()))}let ro=!1;function Wl(){if(ro)return;const n=d.promoConfig||pe;if(!Kl())return;ro=!0;const e=n.delaySeconds!=null?Number(n.delaySeconds):3,t=Math.max(0,e)*1e3;setTimeout(()=>{ro=!1,Kl()&&!d.pc&&!d.adPlaying&&!d.showPromo&&(z({showPromo:!0}),kv())},t)}function Cv(){ro=!1,z({showPromo:!0})}async function Ql({title:n,message:e,thumbnail:t,audience:s,dramaId:i}){var _;try{bt(2)}catch(y){return Z("Access denied: "+y.message),0}const r=He(n||"",80),o=He(e||"",300);if(!r||!o)return Z("Title and message are required"),0;let c=(await Xe(Ie(F,"users"))).docs.map(y=>({uid:y.id,...y.data()}));if(s==="free"?c=c.filter(y=>!y.subscription||y.subscription==="free"):s==="standard"?c=c.filter(y=>y.subscription==="standard"):s==="premium"?c=c.filter(y=>y.subscription==="premium"):s==="saved_drama"&&i?c=c.filter(y=>Array.isArray(y.myList)&&y.myList.includes(i)):s==="watched"&&i&&(c=c.filter(y=>y.watchHistory&&i in y.watchHistory)),!c.length)return Z("No users match this audience"),0;const u=i?gt(i):null,p=(t==null?void 0:t.trim())||(u==null?void 0:u.thumbnail)||"",m=490;let g=0;for(let y=0;y<c.length;y+=m){const x=c.slice(y,y+m),C=ps(F);x.forEach(L=>{const T=W(Ie(F,"notifications"));C.set(T,{userId:L.uid,contentId:i||null,title:r,thumbnail:p,message:o,read:!1,createdAt:ue()})}),await C.commit(),g+=x.length}return await Rn(Ie(F,"notifHistory"),{title:r,message:o,thumbnail:p,audience:s,dramaId:i||null,recipientCount:g,sentBy:((_=d.user)==null?void 0:_.uid)||"admin",sentAt:ue()}),Z("Sent to "+g+" user"+(g!==1?"s":""),3e3),g}async function oo(){try{const n=Cn(Ie(F,"notifHistory"),ni("sentAt","desc"),Pn(20)),e=await Xe(n);z({notifHistory:e.docs.map(t=>({id:t.id,...t.data()}))})}catch(n){console.warn("[DramaFlow] loadNotifHistory:",n.message);try{const t=(await Xe(Ie(F,"notifHistory"))).docs.map(s=>({id:s.id,...s.data()})).sort((s,i)=>{var r,o;return(((r=i.sentAt)==null?void 0:r.seconds)||0)-(((o=s.sentAt)==null?void 0:o.seconds)||0)}).slice(0,20);z({notifHistory:t})}catch{z({notifHistory:[]})}}}async function Pv(n,e){var i,r,o;try{bt(1)}catch(l){Z("Access denied: "+l.message);return}if(!(e!=null&&e.trim()))return;if(!gr("adminChat_"+d.user.uid,30)){Z("Sending too fast");return}const t=He(e,1e3);if(!t)return;const s=Ie(F,"adminChats",n,"messages");await Rn(s,{text:t,from:"admin",fromName:He(((i=d.user)==null?void 0:i.displayName)||((r=d.user)==null?void 0:r.email)||"Admin",80),fromUid:((o=d.user)==null?void 0:o.uid)||"admin",at:ue(),read:!1}),await Fe(W(F,"adminChats",n),{lastMsg:e.trim(),lastAt:ue(),unreadUser:!0,unreadAdmin:!1,userUid:n},{merge:!0})}async function ao(n){const e=Cn(Ie(F,"adminChats",n,"messages"),ni("at","asc"),Pn(50)),s=(await Xe(e)).docs.map(i=>({id:i.id,...i.data()}));z({chatMessages:s,chatUid:n})}async function Dn(n){var e,t,s,i;try{await Rn(Ie(F,"adminLog"),{...n,by:((e=d.user)==null?void 0:e.uid)||"admin",byName:((t=d.user)==null?void 0:t.displayName)||((s=d.user)==null?void 0:s.email)||"Admin",byEmail:((i=d.user)==null?void 0:i.email)||"",at:ue()})}catch(r){console.warn("[DramaFlow] auditLog write failed:",r.message)}}async function Yl(){try{const n=Cn(Ie(F,"adminLog"),ni("at","desc"),Pn(100)),e=await Xe(n);z({activityLog:e.docs.map(t=>({id:t.id,...t.data()}))})}catch{try{const t=(await Xe(Ie(F,"adminLog"))).docs.map(s=>({id:s.id,...s.data()})).sort((s,i)=>{var r,o;return(((r=i.at)==null?void 0:r.seconds)||0)-(((o=s.at)==null?void 0:o.seconds)||0)}).slice(0,100);z({activityLog:t})}catch{z({activityLog:[]})}}}async function Do(){if(d.user)try{const n=Cn(Ie(F,"adminChats",d.user.uid,"messages"),ni("at","asc"),Pn(50)),t=(await Xe(n)).docs.map(r=>({id:r.id,...r.data()}));z({userChatMessages:t});const s=await ct(W(F,"adminChats",d.user.uid)),i=s.exists()?!!s.data().unreadUser:!1;z({userChatUnread:i})}catch{z({userChatMessages:[],userChatUnread:!1})}}async function Rv(){if(d.user)try{await Fe(W(F,"adminChats",d.user.uid),{unreadUser:!1},{merge:!0}),z({userChatUnread:!1})}catch{}}async function xv(n){if(!d.user||!(n!=null&&n.trim()))return;if(d.userBlocked){Z("Your account is blocked");return}if(!gr("uchat_"+d.user.uid,15)){Z("Slow down — sending too many messages");return}const e=He(n,1e3);if(!e)return;const t=Ie(F,"adminChats",d.user.uid,"messages");await Rn(t,{text:e,from:"user",fromName:He(d.user.displayName||d.user.email||"User",80),fromUid:d.user.uid,at:ue(),read:!1}),await Fe(W(F,"adminChats",d.user.uid),{lastMsg:e,lastAt:ue(),unreadUser:!1,unreadAdmin:!0,userUid:d.user.uid,userEmail:d.user.email||"",userName:He(d.user.displayName||d.user.email||"",80)},{merge:!0})}function He(n,e=2e3){return typeof n!="string"?"":n.replace(/[<>]/g,t=>t==="<"?"&lt;":"&gt;").replace(/javascript:/gi,"").replace(/on\w+\s*=/gi,"").slice(0,e).trim()}const Yh=new Map;function gr(n,e=10){const t=Date.now(),s=6e4,i=(Yh.get(n)||[]).filter(r=>t-r<s);return i.length>=e?!1:(i.push(t),Yh.set(n,i),!0)}function bt(n=1){if(!d.user)throw new Error("Not authenticated");if(!d.isAdmin&&!d.isSuperAdmin)throw new Error("Admin access required");if((d.adminLevel||0)<n)throw new Error(`Level ${n}+ required`);if(d.userBlocked)throw new Error("Account blocked")}async function Dv(n){try{bt(1)}catch(t){Z("Access denied: "+t.message);return}const e=He(n,1e3);if(e){if(!gr("globalChat_"+d.user.uid,20)){Z("Slow down — you are sending messages too fast");return}await Rn(Ie(F,"adminGlobalChat"),{text:e,from:d.user.uid,fromName:d.user.displayName||d.user.email||"Admin",fromEmail:d.user.email||"",level:d.adminLevel||1,at:ue()})}}async function Vi(){try{bt(1)}catch{return}const n=Cn(Ie(F,"adminGlobalChat"),ni("at","asc"),Pn(80)),t=(await Xe(n)).docs.map(s=>({id:s.id,...s.data()}));z({globalChatMessages:t})}const Jh=Object.freeze(Object.defineProperty({__proto__:null,AD_DURATION:rt,AD_SKIP_AFTER:ri,CREDITS_PER_AD:Li,DEFAULT_PROMO:pe,DEFAULT_TASKS:_a,FREE_EP_LIMIT:as,aAddContent:tv,aAppointAdmin:hv,aAwardCredits:Sv,aBlockUser:cv,aChangeAdminLevel:pv,aDeleteContent:sv,aDeleteUser:dv,aEditContent:nv,aRevokeAdmin:fv,aSavePromoConfig:Hl,aSaveSectionConfigs:av,aSaveTasksConfig:jl,aSaveTrending:ov,aSetBanner:rv,aSetUserSub:lv,aToggleHide:iv,aUnblockUser:uv,actAdCompleted:ou,actAdDismiss:yv,actCancelAd:wv,actChangeEp:Yg,actClearAllHistory:ev,actComment:Zg,actCompleteTask:ql,actDeleteComment:ZE,actGoogleSignIn:Hg,actGoogleSignInRedirect:Kg,actLogin:jg,actLogout:Gg,actPlay:ji,actRateContent:su,actShare:mv,actSignup:zg,actSkipAd:_v,actStartAd:vv,actStartPageAd:zl,actToggleLike:Xg,actToggleList:Jg,adTick:bv,adminBroadcastNotification:Ql,adminSendChat:Pv,adminSendNotification:gv,assertAdminAccess:bt,buildSectionConfigs:nu,canPlayEpisode:pa,checkGoogleRedirectResult:Wg,checkLoginStreak:Iv,checkRateLimit:gr,findContent:gt,forceShowPromo:Cv,getAvgRating:Kt,getLastWatchedTitle:ru,getPlanLimits:ha,getRecommendations:iu,getTaskStatus:Ev,getTasksConfig:ls,getUserRating:va,loadActivityLog:Yl,loadAdminChat:ao,loadAllUsers:Cs,loadComments:ga,loadData:fa,loadGlobalAdminChat:Vi,loadNotifHistory:oo,loadNotifications:ya,loadPromoConfig:Gl,loadStreakData:Tv,loadTasksConfig:au,loadUserChat:Do,loadUserData:Qg,markNotificationsRead:Ul,markPromoShown:kv,markUserChatRead:Rv,reloadContent:ma,sanitizeText:He,schedulePromo:Wl,sendGlobalAdminChat:Dv,shouldShowPromo:Kl,showToast:Z,userSendChat:xv,visibleContent:tu,writeAuditLog:Dn},Symbol.toStringTag,{value:"Module"})),Hn={home:'<span class="icon icon-home"></span>',search:'<span class="icon icon-search"></span>',bookmark:'<span class="icon icon-bookmark"></span>',profile:'<span class="icon icon-profile"></span>',credits:'<span class="icon icon-credits"></span>',bell:'<span class="icon icon-bell"></span>',settings:'<span class="icon icon-settings"></span>'};function Xh(){const{user:n,isAdmin:e,page:t}=d,s=d.notifications.filter(u=>!u.read).length;d.adCredits;const r=[{id:"home",label:"Home"},{id:"search",label:"Explore"},{id:"library",label:"Library"},{id:"mylist",label:"My List"},{id:"credits",label:"Earn Credits",highlight:!0}].map(u=>{let p="nl";return t===u.id&&(p+=" act"),u.highlight&&(p+=" nl-credits"),'<a class="'+p+'" role="link" aria-current="'+(t===u.id?"page":"false")+`" onclick="A.nav('`+u.id+`')">`+u.label+"</a>"}).join(""),o=e?'<a class="nl admin-nl'+(t==="admin"?" act":"")+`" onclick="A.nav('admin')">`+Hn.settings+" Admin</a>":"",l=s?'<span class="notif-dot">'+(s>9?"9+":s)+"</span>":"",c=n?'<button class="notif-bell" onclick="A.openNotifs()" title="Notifications" aria-label="Notifications">'+Hn.bell+l+'</button><div class="upill'+(d.userChatUnread?" upill-unread":"")+`" onclick="A.nav('profile')"><div class="uav">`+(n.displayName||n.email||"U")[0].toUpperCase()+"</div>"+(d.userChatUnread?'<span class="upill-chat-dot"></span>':"")+'<span class="uname">'+(n.displayName||n.email)+"</span></div>":`<button class="btn btn-outline btn-sm" onclick="A.openAuth('login')">Login</button><button class="btn btn-red btn-sm" onclick="A.openAuth('signup')">Sign Up</button>`;return`<div class="logo" onclick="A.nav('home')">Drama<em>Flow</em></div><div class="nav-links">`+r+o+'</div><div class="nav-r">'+c+"</div>"}function Zh(){const n=d.page,e=d.adCredits||0;return[{id:"home",icon:Hn.home,lbl:"Home"},{id:"search",icon:Hn.search,lbl:"Explore"},{id:"credits",icon:Hn.credits,lbl:e?e+" cr":"Earn",highlight:!0},{id:"mylist",icon:Hn.bookmark,lbl:"My List"},{id:"profile",icon:Hn.profile,lbl:"Profile"}].map(s=>{let i="bni";n===s.id&&(i+=" act"),s.highlight&&(i+=" bni-highlight");const r=s.id==="profile"&&d.userChatUnread?'<span class="bni-chat-dot" aria-label="Unread message"></span>':"";return'<button class="'+i+`" onclick="A.nav('`+s.id+`')" aria-label="`+s.lbl+'" aria-current="'+(n===s.id?"page":"false")+'"><span class="bni-ic" aria-hidden="true">'+s.icon+r+'</span><span class="bni-lbl">'+s.lbl+"</span></button>"}).join("")}function tT(){if(!d.pShowNotifs)return"";const n=d.notifications,e=n.length?n.map(s=>{var r;const i=(r=s.createdAt)!=null&&r.seconds?nT(s.createdAt.seconds):"";return'<div class="notif-item'+(s.read?"":" unread")+`" onclick="A.notifClick('`+s.contentId+`')"><img src="`+s.thumbnail+`" class="notif-thumb" alt="" onerror="this.style.display='none'"><div class="notif-body"><div class="notif-title">`+s.title+'</div><div class="notif-msg">'+s.message+"</div>"+(i?'<div class="notif-ts">'+i+"</div>":"")+"</div>"+(s.read?"":'<div class="notif-unread-dot"></div>')+"</div>"}).join(""):'<div class="empty" style="padding:40px 20px"><p class="empty-txt" style="text-align:center">No notifications yet</p></div>';return`<div class="notif-overlay" onclick="event.target.classList.contains('notif-overlay')&&A.closeNotifs()"><div class="notif-panel"><div class="notif-panel-head"><div class="sheet-title">Notifications</div><div style="display:flex;gap:8px;align-items:center">`+(n.some(s=>!s.read)?'<button class="tbtn" onclick="A.markNotifsRead()">Mark all read</button>':"")+'<button class="sheet-x icon-btn" onclick="A.closeNotifs()" aria-label="Close"><span class="icon icon-close icon-txt2"></span></button></div></div><div class="notif-list">'+e+"</div></div></div>"}function nT(n){const e=Math.floor(Date.now()/1e3)-n;return e<60?"Just now":e<3600?Math.floor(e/60)+"m ago":e<86400?Math.floor(e/3600)+"h ago":Math.floor(e/86400)+"d ago"}let ft="login";function Et(n="login"){ft=n;const e=document.getElementById("authWrap");e&&(e.classList.remove("hidden"),Jl())}function Ti(){var n;(n=document.getElementById("authWrap"))==null||n.classList.add("hidden")}function ep(){return`<div id="authWrap" class="hidden">
    <div class="auth-card">
      <button class="auth-x" id="authX">×</button>
      <div class="auth-logo">Drama<em>Flow</em></div>
      <p class="auth-tagline">Your next obsession is one tap away.</p>

      <!-- Google sign-in button (works for both login and signup) -->
      <button class="btn-google" id="googleBtn">
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M43.611 20.083H42V20H24v8h11.303C33.65 33.093 29.268 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
          <path d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
          <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
          <path d="M43.611 20.083H42V20H24v8h11.303a11.966 11.966 0 01-4.087 5.571l6.19 5.238C39.9 36.76 44 30.859 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
        </svg>
        Continue with Google
      </button>

      <div class="auth-divider"><span>or</span></div>

      <!-- Tab switcher -->
      <div class="auth-tabs">
        <button class="auth-tab${ft==="login"?" act":""}" id="aTabLogin">Login</button>
        <button class="auth-tab${ft==="signup"?" act":""}" id="aTabSignup">Sign Up</button>
      </div>

      <!-- Login form -->
      <div id="aLoginForm" ${ft!=="login"?'class="hidden"':""}>
        <div class="inp-group">
          <label class="inp-label">Email</label>
          <input class="inp" id="liE" type="email" placeholder="you@example.com" autocomplete="email">
        </div>
        <div class="inp-group">
          <label class="inp-label">Password</label>
          <input class="inp" id="liP" type="password" placeholder="Password" autocomplete="current-password">
        </div>
        <button class="btn btn-red fw" id="liBtn">Sign In</button>
        <p class="auth-err" id="liErr"></p>
      </div>

      <!-- Sign Up form -->
      <div id="aSignupForm" ${ft!=="signup"?'class="hidden"':""}>
        <div class="inp-group">
          <label class="inp-label">Full Name</label>
          <input class="inp" id="suN" type="text" placeholder="Your full name" autocomplete="name">
        </div>
        <div class="inp-group">
          <label class="inp-label">Email</label>
          <input class="inp" id="suE" type="email" placeholder="you@example.com" autocomplete="email">
        </div>
        <div class="inp-group">
          <label class="inp-label">Password</label>
          <input class="inp" id="suP" type="password" placeholder="Min. 6 characters" autocomplete="new-password">
        </div>
        <button class="btn btn-red fw" id="suBtn">Create Account</button>
        <p class="auth-err" id="suErr"></p>
      </div>

    </div>
  </div>`}function Jl(){const n=document.getElementById("aLoginForm"),e=document.getElementById("aSignupForm"),t=document.getElementById("aTabLogin"),s=document.getElementById("aTabSignup");n&&(n.classList.toggle("hidden",ft!=="login"),e.classList.toggle("hidden",ft!=="signup"),t.classList.toggle("act",ft==="login"),s.classList.toggle("act",ft==="signup"))}function jr(n,e,t){const s=document.getElementById(n);s&&(s.disabled=e,s.textContent=e?"Please wait…":t,s.style.opacity=e?"0.7":"")}function tp(){var n,e,t,s,i,r,o,l,c;(n=document.getElementById("authX"))==null||n.addEventListener("click",Ti),(e=document.getElementById("authWrap"))==null||e.addEventListener("click",u=>{u.target.id==="authWrap"&&Ti()}),(t=document.getElementById("aTabLogin"))==null||t.addEventListener("click",()=>{ft="login",Jl()}),(s=document.getElementById("aTabSignup"))==null||s.addEventListener("click",()=>{ft="signup",Jl()}),(i=document.getElementById("googleBtn"))==null||i.addEventListener("click",async()=>{const u=document.getElementById("googleBtn"),p=u==null?void 0:u.innerHTML;u&&(u.disabled=!0,u.innerHTML='<span style="display:inline-block;width:16px;height:16px;border:2px solid rgba(0,0,0,.2);border-top-color:#555;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-right:8px"></span>Signing in…'),["liErr","suErr"].forEach(m=>{const g=document.getElementById(m);g&&(g.textContent="")});try{await Hg()!=="cancelled"&&Ti()}catch(m){const g=ft==="signup"?"suErr":"liErr",_=document.getElementById(g);_&&(_.textContent=sT(m))}finally{u&&(u.disabled=!1,u.innerHTML=p)}}),(r=document.getElementById("liBtn"))==null||r.addEventListener("click",async()=>{var g,_,y;const u=(_=(g=document.getElementById("liE"))==null?void 0:g.value)==null?void 0:_.trim(),p=(y=document.getElementById("liP"))==null?void 0:y.value,m=document.getElementById("liErr");m&&(m.textContent=""),jr("liBtn",!0,"Sign In");try{await jg(u,p),Ti()}catch(x){m&&(m.textContent=np(x))}finally{jr("liBtn",!1,"Sign In")}}),(o=document.getElementById("liP"))==null||o.addEventListener("keydown",u=>{var p;u.key==="Enter"&&((p=document.getElementById("liBtn"))==null||p.click())}),(l=document.getElementById("suBtn"))==null||l.addEventListener("click",async()=>{var _,y,x,C,L;const u=(y=(_=document.getElementById("suN"))==null?void 0:_.value)==null?void 0:y.trim(),p=(C=(x=document.getElementById("suE"))==null?void 0:x.value)==null?void 0:C.trim(),m=(L=document.getElementById("suP"))==null?void 0:L.value,g=document.getElementById("suErr");g&&(g.textContent=""),jr("suBtn",!0,"Create Account");try{await zg(p,m,u),Ti()}catch(T){g&&(g.textContent=np(T))}finally{jr("suBtn",!1,"Create Account")}}),(c=document.getElementById("suP"))==null||c.addEventListener("keydown",u=>{var p;u.key==="Enter"&&((p=document.getElementById("suBtn"))==null||p.click())})}function np(n){return{"auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/invalid-credential":"Incorrect email or password.","auth/invalid-email":"Please enter a valid email address.","auth/email-already-in-use":"An account with this email already exists.","auth/weak-password":"Password must be at least 6 characters.","auth/too-many-requests":"Too many attempts. Please wait a moment.","auth/network-request-failed":"Network error. Check your connection.","auth/user-disabled":"This account has been disabled."}[n.code]||n.message||"Something went wrong. Please try again."}function sT(n){return{"auth/account-exists-with-different-credential":"An account already exists with this email using a different sign-in method. Try logging in with email/password.","auth/popup-blocked":"Popup was blocked by your browser. Please allow popups for this site.","auth/network-request-failed":"Network error. Check your connection and try again.","auth/internal-error":"Google sign-in failed. Please try again."}[n.code]||n.message||"Google sign-in failed. Please try again."}function Lv(){if(!d.adPlaying||d.adSource==="credits_page")return"";const n=d.adContext,e=d.pc;if(d.adCompleted)return iT(e,n);const t=(rt-d.adTimeLeft)/rt*100,s=d.adCanSkip,i=ri-(rt-d.adTimeLeft),r=sp[Math.abs(Math.floor(Date.now()/1e3%sp.length))];return`<div class="ad-overlay" id="adOverlay">
    <div class="ad-player-wrap">

      <!-- Ad video / image area -->
      <div class="ad-media-area" style="background:${r.bg}">
        <div class="ad-brand-logo">${r.logo}</div>
        <div class="ad-visual">
          <div class="ad-visual-icon">${r.icon}</div>
          <div class="ad-visual-headline">${r.headline}</div>
          <div class="ad-visual-sub">${r.sub}</div>
        </div>
        <div class="ad-label">Advertisement</div>
      </div>

      <!-- Top bar -->
      <div class="ad-top-bar">
        <div class="ad-top-left">
          <div class="ad-earning-badge">🎬 Earning episode credit…</div>
        </div>
        <div class="ad-top-right">
          ${s?'<button class="ad-skip-btn" onclick="A.skipAd()">Skip Ad ›</button>':`<div class="ad-skip-soon">Skip in ${i>0?i:1}s</div>`}
        </div>
      </div>

      <!-- Progress bar -->
      <div class="ad-progress-wrap">
        <div class="ad-progress-bar">
          <div class="ad-progress-fill" style="width:${t}%"></div>
        </div>
        <div class="ad-timer">${d.adTimeLeft}s</div>
      </div>

      <!-- Bottom info -->
      <div class="ad-bottom">
        <div class="ad-unlock-info">
          <div class="ad-unlock-icon"></div>
          <div>
            <div class="ad-unlock-title">
              Unlocking: ${e?e.title:""} — EP ${n?n.epIndex+1:""}
            </div>
            <div class="ad-unlock-sub">Watch the full ad to earn 1 episode credit</div>
          </div>
        </div>
        <button class="ad-cancel-btn" onclick="A.cancelAd()">✕ Cancel</button>
      </div>

    </div>
  </div>`}function iT(n,e){return`<div class="ad-overlay" id="adOverlay">
    <div class="ad-reward-box">
      <div class="ad-reward-icon"></div>
      <div class="ad-reward-title">Episode Unlocked!</div>
      <div class="ad-reward-desc">
        You earned <strong>1 episode credit</strong> and unlocked<br>
        <strong>${n?n.title:""} — Episode ${e?e.epIndex+1:""}</strong>
      </div>

      <!-- Credit balance -->
      <div class="ad-credit-pill">
        🎬 Balance: ${d.adCredits} credit${d.adCredits!==1?"s":""}
      </div>

      ${d.adSource==="credits_page"?`<div style="display:flex;gap:10px;margin-top:6px;flex-wrap:wrap;justify-content:center">
             <button class="btn btn-outline btn-sm" onclick="A.watchAnotherAd()">▶ Watch Another (+1)</button>
             <button class="btn btn-red btn-sm" onclick="A.dismissPageAd()">✓ Done</button>
           </div>`:`<button class="btn btn-red fw" style="max-width:280px;margin-top:6px" onclick="A.dismissAd()">
             ▶ Watch Episode ${e?e.epIndex+1:""}
           </button>`}

      <div class="ad-reward-hint">
        💡 You can earn more credits by watching more ads
      </div>
    </div>
  </div>`}let lo=null;function rT(){dn(),lo=setInterval(()=>{var r,o,l,c;if(!d.adPlaying||d.adCompleted){dn();return}bv();const n=(r=document.getElementById("adOverlay"))==null?void 0:r.querySelector(".ad-timer"),e=(o=document.getElementById("adOverlay"))==null?void 0:o.querySelector(".ad-progress-fill"),t=(l=document.getElementById("adOverlay"))==null?void 0:l.querySelector(".ad-skip-soon");(c=document.getElementById("adOverlay"))==null||c.querySelector(".ad-skip-btn");const s=(rt-d.adTimeLeft)/rt*100,i=ri-(rt-d.adTimeLeft);n&&(n.textContent=d.adTimeLeft+"s"),e&&(e.style.width=s+"%"),d.adCanSkip&&t?t.outerHTML='<button class="ad-skip-btn" onclick="A.skipAd()">Skip Ad ›</button>':!d.adCanSkip&&t&&(t.textContent="Skip in "+(i>0?i:1)+"s"),d.adCompleted&&(dn(),de())},1e3)}function dn(){lo&&(clearInterval(lo),lo=null)}const sp=[{logo:"🛒 ShopEasy",bg:"linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",icon:"🛍️",headline:"Shop Smarter, Not Harder",sub:"Get 20% off your first order on ShopEasy"},{logo:"🎵 BeatStream",bg:"linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",icon:"🎧",headline:"Unlimited Music Streaming",sub:"Try BeatStream free for 3 months"},{logo:"🍕 FoodRush",bg:"linear-gradient(135deg, #200122 0%, #6f0000 100%)",icon:"🍔",headline:"Hungry? We Deliver in 20 Min",sub:"Use code DRAMA50 for ₹50 off"},{logo:"📱 TechMart",bg:"linear-gradient(135deg, #005c97 0%, #363795 100%)",icon:"💻",headline:"Latest Gadgets, Best Prices",sub:"EMI from ₹999/mo. Free delivery."},{logo:"💪 FitLife",bg:"linear-gradient(135deg, #134e5e 0%, #71b280 100%)",icon:"🏋️",headline:"Transform Your Body in 30 Days",sub:"Join 2 million users on FitLife"}];function oT(n){const e=d.pc;if(!e)return"";const t=n==="exclusive",s=n==="episode_limit",i=d.pEp,r=d.adCredits||0,o=t?"Premium Exclusive":"Free Preview Ended",l=t?`<em>${e.title}</em> is exclusive to Premium members.`:`You've watched the first ${as} free episodes of <em>${e.title}</em>.`,c=`
    <div class="paywall-plans">
      <div class="paywall-plan">
        <div class="paywall-plan-name">Standard</div>
        <div class="paywall-plan-price">₹99/mo</div>
        <div class="paywall-plan-perks">
          <span class="paywall-perk">All episodes</span>
          <span class="paywall-perk">Ad-free</span>
          <span class="paywall-perk">HD quality</span>
        </div>
        <button class="btn btn-outline-amber fw" onclick="A.nav('subscribe');A.closePlayer()">Get Standard</button>
      </div>
      <div class="paywall-plan">
        <div class="paywall-plan-name">Premium</div>
        <div class="paywall-plan-price">₹199/mo</div>
        <div class="paywall-plan-perks">
          <span class="paywall-perk">All episodes</span>
          <span class="paywall-perk">Exclusive content 👑</span>
          <span class="paywall-perk">4K Ultra HD</span>
        </div>
        <button class="btn btn-red fw" onclick="A.nav('subscribe');A.closePlayer()">Get Premium</button>
      </div>
    </div>`,u=s?`
    <div class="paywall-ad-divider">
      <span>or</span>
    </div>
    <div class="paywall-ad-box">
      <div class="paywall-ad-top">
        <div class="paywall-ad-icon">📺</div>
        <div class="paywall-ad-info">
          <div class="paywall-ad-title">Watch a short ad instead</div>
          <div class="paywall-ad-desc">
            Watch a 30-second ad and earn <strong>1 episode credit</strong>
            to unlock EP ${i+1} right now — completely free.
          </div>
        </div>
      </div>

      ${r>0?`
      <div class="paywall-credits-banner">
        🎬 You have <strong>${r} credit${r!==1?"s":""}</strong> — use one to watch instantly!
        <button class="btn btn-jade btn-sm" style="margin-top:8px;width:100%" onclick="A.useCredit('${e.id}',${i})">
          Use Credit — Watch EP ${i+1} Now
        </button>
      </div>`:""}

      <button class="btn-watch-ad" onclick="A.watchAd('${e.id}',${i})">
        <span class="btn-watch-ad-icon">▶</span>
        <span>Watch 30s Ad → Unlock EP ${i+1}</span>
        <span class="btn-watch-ad-badge">FREE</span>
      </button>

      <div class="paywall-ad-fine">
        No account needed · Skip after 5 seconds · 1 credit = 1 episode
      </div>
    </div>`:"";return`<div class="paywall-overlay" id="paywallOverlay">
    <div class="paywall-box">
      <div class="paywall-bg" style="background-image:url('${e.thumbnail}')"></div>
      <div class="paywall-bg-grad"></div>
      <div class="paywall-body">
        <div class="paywall-icon">
        ${t?'<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.662 1.736a.75.75 0 011.336.365l1.388 5.537 3.26-2.905a.75.75 0 011.11.98l-3.36 5.594 4.284.857a.75.75 0 01.18 1.407L12 16.403l-7.86-2.832a.75.75 0 01.18-1.407l4.284-.857-3.36-5.594a.75.75 0 011.11-.98l3.26 2.905 1.048-5.537a.75.75 0 01.3-.365z"/></svg>':'<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path stroke-linecap="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>'}
      </div>
        <div class="paywall-heading">${o}</div>
        <p class="paywall-text">${l}</p>

        ${c}
        ${u}

        <button class="paywall-back" onclick="A.closePlayer()">← Go Back</button>

        ${s?`<p class="paywall-hint">
          You can still rewatch the first ${as} episodes anytime for free.
        </p>`:""}
      </div>
    </div>
  </div>`}function aT(){const{pc:n,pEp:e,pComments:t,pShowLib:s,pShowComments:i,pMuted:r,pSpeed:o,pAutoplay:l}=d;if(!n)return"";const c=n.episodes||1,u=d.liked.includes(n.id),p=d.myList.includes(n.id),m=Kt(n),g=va(n.id),_=Array.from({length:c},(L,T)=>{const V=(n.episodeUrls||[])[T]||"",$=T===e?` src="${V}"`:"";return'<div class="ep-slide" id="epSlide'+T+'"><div class="ep-vid-wrap" id="epVidWrap'+T+'"><video class="ep-vid" id="vid'+T+'"'+$+` playsinline preload="none" onwaiting="document.getElementById('epLoad`+T+`').classList.add('show')" oncanplay="document.getElementById('epLoad`+T+`').classList.remove('show')" ontimeupdate="_DF.updateProgress(`+T+')" onended="_DF.onEnded('+T+')"></video><div class="ep-loading" id="epLoad'+T+'"><div class="ring" style="width:44px;height:44px"></div></div><div class="ep-seek-toast" id="seekToast'+T+'"></div><div class="ep-ctrl-bar" id="epCtrl'+T+'"><div class="ep-scrubber-wrap" onmousedown="_DF.scrubStart(event,'+T+')" ontouchstart="_DF.scrubTouchStart(event,'+T+')"><div class="ep-scrubber-bg"><div class="ep-scrubber-fill" id="epFill'+T+'"></div><div class="ep-scrubber-thumb" id="epThumb'+T+'"></div></div></div><div class="ep-ctrl-row"><span class="ep-time" id="epTime'+T+'">0:00 / 0:00</span><span style="flex:1"></span><div class="ep-speed-wrap"><button class="ep-ctrl-btn" onclick="_DF.cycleSpeed('+T+')" id="epSpeedBtn'+T+'">'+o+'x</button></div><button class="ep-ctrl-btn ep-ctrl-icon" id="epMuteBtn'+T+'" onclick="_DF.toggleMute('+T+')" title="'+(r?"Unmute":"Mute")+'"><span class="icon '+(r?"icon-mute":"icon-volume")+' icon-white" style="width:16px;height:16px"></span></button><button class="ep-ctrl-btn ep-ctrl-icon" onclick="_DF.toggleFullscreen('+T+')" title="Fullscreen"><span class="icon icon-expand icon-white" style="width:16px;height:16px"></span></button></div></div><div class="ep-progress"><div class="ep-progress-fill" id="epProg'+T+'"></div></div></div><div class="ep-info"><div class="ep-info-show">'+n.title+'</div><div class="ep-info-num">Episode '+(T+1)+" of "+c+'</div><p class="ep-info-desc">'+n.description+"</p>"+(T<c-1?'<div class="ep-next-hint"><span class="ep-next-hint-arr">↓</span> Scroll for Episode '+(T+2)+"</div>":'<div class="ep-next-hint ep-last">Last episode</div>')+'</div><div class="ep-side"><div class="ep-act'+(u?" liked":"")+`" onclick="A.toggleLike('`+n.id+`')"><div class="ep-act-ic"><span class="icon icon-heart`+(u?"-fill":"")+'" style="width:22px;height:22px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">'+(n.likes||0)+'</span></div><div class="ep-act" onclick="A.openComments()"><div class="ep-act-ic"><span class="icon icon-comment" style="width:22px;height:22px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">'+t.length+'</span></div><div class="ep-act'+(p?" saved":"")+`" onclick="A.toggleList('`+n.id+`')"><div class="ep-act-ic"><span class="icon `+(p?"icon-check icon-jade":"icon-plus")+`" style="width:20px;height:20px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">List</span></div><div class="ep-act" onclick="A.openLib()"><div class="ep-act-ic"><span class="icon icon-episodes" style="width:20px;height:20px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">EPs</span></div><div class="ep-act" onclick="_DF.share('`+n.id+`')"><div class="ep-act-ic"><span class="icon icon-share" style="width:20px;height:20px;--icon-color:currentColor"></span></div><span class="ep-act-lbl">Share</span></div><div class="ep-act ep-rating-act" onclick="_DF.openRating('`+n.id+`')"><div class="ep-act-ic"><span class="icon icon-star icon-amber" style="width:22px;height:22px"></span></div><span class="ep-act-lbl">`+(m?m.toFixed(1):"—")+"</span></div></div></div>"}).join(""),y=d.pCountdownActive?'<div class="ep-countdown" id="epCountdown"><div class="ep-countdown-box"><div class="ep-countdown-label">Next Episode in</div><div class="ep-countdown-num" id="epCountdownNum">'+d.pCountdownSec+'</div><div style="display:flex;gap:10px;margin-top:12px"><button class="btn btn-red btn-sm" onclick="_DF.skipCountdown()">Play Now</button><button class="btn btn-outline btn-sm" onclick="_DF.cancelCountdown()">Cancel</button></div></div></div>':"",x=d.pShowRating?lT(n,g,m):"",C=d.pPaywall?oT(d.pPaywall):"";return d.adPlaying?Lv():'<div id="player"><div class="player-header"><button class="player-back" onclick="A.closePlayer()"><span class="icon icon-back icon-txt2" style="width:18px;height:18px"></span> Back</button><div class="player-show">'+n.title+'</div><button class="player-autoplay-btn'+(l?" active":"")+'" onclick="_DF.toggleAutoplay()" title="'+(l?"Autoplay on":"Autoplay off")+'">⟳</button><div class="player-ep-tag" id="epTag">EP '+(e+1)+"/"+c+'</div></div><div class="ep-feed" id="epFeed">'+_+"</div>"+y+x+(s?cT(n):"")+(i?hT(n,t):"")+C+"</div>"}function lT(n,e,t){const s=[1,2,3,4,5];return`<div class="rating-modal-overlay" onclick="event.target.classList.contains('rating-modal-overlay')&&_DF.closeRating()"><div class="rating-modal"><div class="rating-modal-title">Rate this Drama</div><div class="rating-modal-show">`+n.title+"</div>"+(t?'<div class="rating-avg">Community: ★ '+t.toFixed(1)+" ("+(n.ratingCount||0)+" ratings)</div>":"")+'<div class="rating-stars" id="ratingStars">'+s.map(i=>'<button class="rating-star'+(e>=i?" lit":"")+'" onmouseover="_DF.hoverStar('+i+`)" onmouseout="_DF.unhoverStar()" onclick="_DF.submitRating('`+n.id+"',"+i+')">★</button>').join("")+'</div><div class="rating-label" id="ratingLabel">'+(e?"Your rating: "+e+" ★":"Tap a star to rate")+'</div><button class="btn btn-outline btn-sm" style="margin-top:14px" onclick="_DF.closeRating()">Close</button></div></div>'}function cT(n){const e=n.episodes||1,t=Array.from({length:e},(s,i)=>{const r=d.watchHistory[n.id]!=null&&d.watchHistory[n.id]>=i,o=i===d.pEp,l=pa(n,i,d.sub),c=!l.allowed,u=l.reason==="exclusive"?"":"🔒";return'<button class="ep-btn'+(o?" cur":"")+(r?" done":"")+(c?" ep-locked":"")+'" onclick="A.jumpEp('+i+')">'+(r?'<span class="ep-done-dot"></span>':"")+(c?'<span class="ep-lock-icon">'+u+"</span>":"")+'<span class="ep-btn-n">EP '+(i+1)+'</span><span class="ep-btn-lbl">'+(c?l.reason==="exclusive"?"Premium":"Upgrade":r?"Watched":"—")+"</span></button>"}).join("");return`<div class="sheet-overlay" onclick="event.target.classList.contains('sheet-overlay')&&A.closeLib()"><div class="sheet"><div class="sheet-head"><div class="sheet-title">`+n.title+' — Episodes</div><button class="sheet-x" onclick="A.closeLib()">✕</button></div><div class="ep-grid">'+t+"</div></div></div>"}const ip=["ci-av-red","ci-av-amber","ci-av-jade","ci-av-blue","ci-av-purple"];function uT(n){return ip[(n||"U").charCodeAt(0)%ip.length]}function dT(n){const e=Math.floor(Date.now()/1e3)-n;return e<60?"just now":e<3600?Math.floor(e/60)+"m ago":e<86400?Math.floor(e/3600)+"h ago":Math.floor(e/86400)+"d ago"}function hT(n,e){var r;const t=((r=d.user)==null?void 0:r.uid)||null,s=e.length?e.map(o=>{var m;const l=t&&o.userId===t,c=(o.userName||"U")[0].toUpperCase(),u=uT(o.userName),p=(m=o.createdAt)!=null&&m.seconds?dT(o.createdAt.seconds):"";return'<div class="ci'+(l?" ci-own":"")+'"><div class="ci-av '+u+'">'+c+'</div><div class="ci-body"><div class="ci-meta"><span class="ci-name">'+(o.userName||"Anonymous")+"</span>"+(p?'<span class="ci-ts">'+p+"</span>":"")+'</div><div class="ci-text">'+o.text+"</div></div>"+(l?`<button class="ci-del" onclick="A.deleteComment('`+o.id+`')" title="Delete">✕</button>`:"")+"</div>"}).join(""):'<div class="ci-empty"><div class="empty-ic">💬</div><p class="ci-empty-txt">Be the first to comment!</p></div>',i=d.user?'<div class="ci-inp-row"><div class="ci-inp-av">'+(d.user.displayName||d.user.email||"U")[0].toUpperCase()+`</div><input class="inp" id="cInp" placeholder="Write a comment…" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();A.postComment('`+n.id+`')}"><button class="btn btn-red btn-sm" id="cSubmitBtn" onclick="A.postComment('`+n.id+`')">Post</button></div>`:`<div class="ci-login-prompt"><button class="btn btn-outline btn-sm fw" onclick="A.openAuth('login')">Sign in to comment</button></div>`;return`<div class="sheet-overlay" onclick="event.target.classList.contains('sheet-overlay')&&A.closeComments()"><div class="sheet" style="max-height:80vh"><div class="sheet-head"><div class="sheet-title">Comments`+(e.length?' <span class="ci-count">'+e.length+"</span>":"")+'</div><button class="sheet-x" onclick="A.closeComments()">✕</button></div><div class="comments-list" id="commentsList">'+s+"</div>"+i+"</div></div>"}function ln(){var g;const n=document.getElementById("epFeed");if(!n)return;(g=n==null?void 0:n._cleanupFeed)==null||g.call(n);let e;const t=()=>{clearTimeout(e),e=setTimeout(()=>{const _=n.clientHeight,y=Math.round(n.scrollTop/_);if(y!==d.pEp){const x=document.getElementById("vid"+d.pEp);x&&(x.pause(),x.currentTime=0),d.pEp=y;const C=document.getElementById("epTag");C&&(C.textContent="EP "+(y+1)+"/"+d.pc.episodes),Yg(y).then(L=>{if(L==="paywall"){de();return}const T=document.getElementById("vid"+y);T&&!T.src&&(T.src=(d.pc.episodeUrls||[])[y]||""),T&&(T.playbackRate=d.pSpeed,T.muted=d.pMuted,T.play().catch(()=>{}))})}},120)};n._scrollHandler=t,n.addEventListener("scroll",t,{passive:!0});const s=_=>{if(_.target.closest(".ep-side, .ep-ctrl-bar, .ep-scrubber-wrap, .sheet-overlay, .ep-countdown, .rating-modal-overlay"))return;const y=document.getElementById("vid"+d.pEp);y&&(y.paused?(y.play().catch(()=>{}),zr("Play")):(y.pause(),zr("Pause")))};n._clickHandler=s,n.addEventListener("click",s),requestAnimationFrame(()=>{var y;n.scrollTop=d.pEp*n.clientHeight;const _=document.getElementById("vid"+d.pEp);_&&(_.src||(_.src=(((y=d.pc)==null?void 0:y.episodeUrls)||[])[d.pEp]||""),_.playbackRate=d.pSpeed,_.muted=d.pMuted,_.play().catch(()=>{}))});let i,r,o=0,l=null;const c=".ep-side, .ep-ctrl-bar, .sheet-overlay, .ep-countdown, .rating-modal-overlay",u=_=>{_.target.closest(c)||(i=_.touches[0].clientX,r=_.touches[0].clientY)},p=_=>{if(_.target.closest(c))return;const y=_.changedTouches[0],x=Date.now();if(x-o<300){clearTimeout(l),o=0;const V=document.getElementById("vid"+d.pEp);if(!V||!V.duration)return;y.clientX<window.innerWidth/2?(V.currentTime=Math.max(0,V.currentTime-10),Is(d.pEp,"−10s")):(V.currentTime=Math.min(V.duration,V.currentTime+10),Is(d.pEp,"+10s"));return}if(o=x,l=setTimeout(()=>{o=0},310),i==null)return;const C=y.clientX-i,L=y.clientY-r;if(i=null,Math.abs(C)<60||Math.abs(C)<Math.abs(L)*1.5)return;const T=document.getElementById("vid"+d.pEp);!T||!T.duration||(C>0?(T.currentTime=Math.min(T.duration,T.currentTime+10),Is(d.pEp,"+10s")):(T.currentTime=Math.max(0,T.currentTime-10),Is(d.pEp,"−10s")))};n._touchStartHandler=u,n._touchEndHandler=p,n.addEventListener("touchstart",u,{passive:!0}),n.addEventListener("touchend",p,{passive:!0});const m=_=>{if(!d.pc||_.target.tagName==="INPUT"||_.target.tagName==="TEXTAREA")return;const y=document.getElementById("vid"+d.pEp);if(y)switch(_.code){case"Space":case"KeyK":_.preventDefault(),y.paused?(y.play().catch(()=>{}),zr("Play")):(y.pause(),zr("Pause"));break;case"ArrowLeft":_.preventDefault(),y.currentTime=Math.max(0,y.currentTime-10),Is(d.pEp,"−10s"),$n();break;case"ArrowRight":_.preventDefault(),y.currentTime=Math.min(y.duration||0,y.currentTime+10),Is(d.pEp,"+10s"),$n();break;case"KeyF":_.preventDefault(),window._DF.toggleFullscreen(d.pEp);break;case"KeyM":_.preventDefault(),window._DF.toggleMute(d.pEp);break;case"Escape":A.closePlayer();break}};document.addEventListener("keydown",m),n._cleanupKey=()=>document.removeEventListener("keydown",m),$n(),n.addEventListener("touchstart",$n,{passive:!0}),n.addEventListener("mousemove",$n),n._scrollHandler,n._clickHandler,n._touchStartHandler,n._touchEndHandler,n._cleanupFeed=()=>{n.removeEventListener("scroll",n._scrollHandler),n.removeEventListener("click",n._clickHandler),n.removeEventListener("touchstart",n._touchStartHandler),n.removeEventListener("touchend",n._touchEndHandler),n.removeEventListener("touchstart",$n),n.removeEventListener("mousemove",$n),n._cleanupFeed=null}}let rp;function $n(){clearTimeout(rp),document.querySelectorAll(".ep-ctrl-bar").forEach(n=>n.classList.add("visible")),rp=setTimeout(()=>{document.querySelectorAll(".ep-ctrl-bar").forEach(n=>n.classList.remove("visible"))},3e3)}function zr(n){var t,s;(t=document.querySelector(".ep-flash-ctrl"))==null||t.remove();const e=document.createElement("div");e.className="ep-flash-ctrl",e.textContent=n,(s=document.getElementById("epFeed"))==null||s.appendChild(e),setTimeout(()=>e.remove(),700)}function pT(){var e,t;const n=document.getElementById("epFeed");(e=n==null?void 0:n._cleanupKey)==null||e.call(n),(t=n==null?void 0:n._cleanupFeed)==null||t.call(n)}function Is(n,e){var i;const t=document.getElementById("seekToast"+n);if(t){t.textContent=e,t.classList.add("show"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.remove("show"),900);return}const s=document.createElement("div");s.className="ep-seek-toast-fb",s.textContent=e,(i=document.getElementById("epFeed"))==null||i.appendChild(s),setTimeout(()=>s.remove(),900)}window._DF={updateProgress(n){const e=document.getElementById("vid"+n),t=document.getElementById("epFill"+n),s=document.getElementById("epThumb"+n),i=document.getElementById("epProg"+n),r=document.getElementById("epTime"+n);if(!e||!e.duration)return;const o=e.currentTime/e.duration*100;t&&(t.style.width=o+"%"),s&&(s.style.left=o+"%"),i&&(i.style.width=o+"%"),r&&(r.textContent=op(e.currentTime)+" / "+op(e.duration))},onEnded(n){var r;const e=document.getElementById("epFeed"),t=((r=d.pc)==null?void 0:r.episodes)||1,s=n+1;if(!e||s>=t)return;if(!d.pAutoplay){e.scrollTo({top:s*e.clientHeight,behavior:"smooth"});return}d.pCountdownActive=!0,d.pCountdownSec=5,de();const i=setInterval(()=>{d.pCountdownSec-=1;const o=document.getElementById("epCountdownNum");o&&(o.textContent=d.pCountdownSec),d.pCountdownSec<=0&&(clearInterval(i),window._DF._playNext(s))},1e3);d._countdownInterval=i},_playNext(n){d.pCountdownActive=!1,d.pCountdownSec=5,de(),setTimeout(()=>{const e=document.getElementById("epFeed");e&&e.scrollTo({top:n*e.clientHeight,behavior:"smooth"})},50)},skipCountdown(){clearInterval(d._countdownInterval),window._DF._playNext(d.pEp+1)},cancelCountdown(){clearInterval(d._countdownInterval),d.pCountdownActive=!1,d.pCountdownSec=5,de()},toggleAutoplay(){d.pAutoplay=!d.pAutoplay;const n=document.querySelector(".player-autoplay-btn");n&&(n.classList.toggle("active",d.pAutoplay),n.title=d.pAutoplay?"Autoplay on":"Autoplay off"),Z("Autoplay "+(d.pAutoplay?"on":"off"),1200)},toggleMute(n){const e=document.getElementById("vid"+n);if(!e)return;d.pMuted=!d.pMuted,e.muted=d.pMuted;const t=document.getElementById("epMuteBtn"+n);t&&(t.innerHTML='<span class="icon '+(d.pMuted?"icon-mute":"icon-volume")+' icon-white" style="width:16px;height:16px"></span>')},cycleSpeed(n){const e=[.5,.75,1,1.25,1.5,2],t=e.indexOf(d.pSpeed);d.pSpeed=e[t===-1?2:(t+1)%e.length];const s=document.getElementById("vid"+n);s&&(s.playbackRate=d.pSpeed);const i=document.getElementById("epSpeedBtn"+n);i&&(i.textContent=d.pSpeed+"x"),Z("Speed: "+d.pSpeed+"x",1200)},toggleFullscreen(n){var t,s,i,r;const e=document.getElementById("epVidWrap"+n);e&&(document.fullscreenElement?(i=document.exitFullscreen)!=null&&i.call(document)||((r=document.webkitExitFullscreen)==null||r.call(document)):(t=e.requestFullscreen)!=null&&t.call(e)||((s=e.webkitRequestFullscreen)==null||s.call(e)))},scrubStart(n,e){n.preventDefault(),Gr(n,e);const t=i=>Gr(i,e),s=()=>{window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",t),window.addEventListener("mouseup",s)},scrubTouchStart(n,e){const t=i=>{i.preventDefault(),Gr(i.touches[0],e)},s=()=>{window.removeEventListener("touchmove",t),window.removeEventListener("touchend",s)};window.addEventListener("touchmove",t,{passive:!1}),window.addEventListener("touchend",s),Gr(n.touches[0],e)},share(n){mv(n)},openRating(n){d.pShowRating=!0,de()},closeRating(){d.pShowRating=!1,de()},submitRating(n,e){su(n,e),d.pShowRating=!1,de()},hoverStar(n){document.querySelectorAll(".rating-star").forEach((t,s)=>{t.classList.toggle("lit",s<n)});const e=document.getElementById("ratingLabel");e&&(e.textContent=["","Terrible 😞","Bad 😕","OK 😐","Good 😊","Amazing 🤩"][n])},unhoverStar(){var t;const n=va((t=d.pc)==null?void 0:t.id);document.querySelectorAll(".rating-star").forEach((s,i)=>{s.classList.toggle("lit",i<n)});const e=document.getElementById("ratingLabel");e&&(e.textContent=n?"Your rating: "+n+" ★":"Tap a star to rate")}};function op(n){if(!isFinite(n))return"0:00";const e=Math.floor(n/60),t=Math.floor(n%60);return e+":"+(t<10?"0":"")+t}function Gr(n,e){const t=document.getElementById("vid"+e),s=document.querySelector("#epVidWrap"+e+" .ep-scrubber-bg");if(!t||!s||!t.duration)return;const i=s.getBoundingClientRect(),r=Math.max(0,Math.min(1,(n.clientX-i.left)/i.width));t.currentTime=r*t.duration,window._DF.updateProgress(e)}const fT='<span class="icon icon-play icon-white"></span>',mT='<span class="icon icon-plus"></span>',gT='<span class="icon icon-check"></span>',vT='<span class="icon icon-lock"></span>',yT='<span class="icon icon-star icon-amber" style="width:11px;height:11px"></span>';function kt(n,{rank:e}={}){if(!n)return"";const t=d.myList.includes(n.id),s=d.watchHistory[n.id],i=ha(d.sub),r=Kt(n),o=n.exclusive===!0,l=o&&!i.canExclusive,c=!i.canWatchAll&&!o,u=l?'<div class="card-exclusive-badge">Premium</div>':o?'<div class="card-exclusive-badge card-exclusive-owned">Exclusive</div>':"",p=c?'<div class="card-free-badge">Free: EP 1–2</div>':"",m=n.thumbnail?`background-image:url('${n.thumbnail}')`:"background-color:var(--raised)";return'<div class="card'+(e?" card-ranked":"")+(l?" card-locked":"")+`" onclick="A.openDetail('`+n.id+`')" role="article" aria-label="`+n.title.replace(/"/g,"&quot;")+'">'+(e?'<div class="rank-n" aria-hidden="true">'+e+"</div>":"")+'<div class="card-img" style="'+m+'">'+(n.thumbnail?`<img src="${n.thumbnail}" alt="" loading="lazy" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0" onerror="this.parentElement.style.backgroundImage='none';this.style.display='none'">`:"")+'<div class="card-ep" aria-label="'+n.episodes+' episodes">'+n.episodes+" EP</div>"+u+p+'<div class="card-over">'+(l?'<div class="card-lock" aria-label="Locked">'+vT+"</div>":'<button class="card-play" aria-label="Play '+n.title.replace(/"/g,"&quot;")+`" onclick="event.stopPropagation();A.play('`+n.id+"',"+(s??0)+')">'+fT+"</button>")+'<button class="card-add'+(t?" saved":"")+'" aria-label="'+(t?"Remove from My List":"Add to My List")+`" onclick="event.stopPropagation();A.toggleList('`+n.id+`')">`+(t?gT:mT)+"</button></div>"+(s!=null?'<div class="cw-bar" aria-label="Episode '+(s+1)+" of "+n.episodes+'">EP '+(s+1)+" / "+n.episodes+"</div>":"")+'</div><div class="card-body"><div class="card-name">'+n.title+'</div><div class="card-meta-row"><span class="card-sub">'+n.genre+"</span>"+(r?'<span class="card-rating" aria-label="Rating '+r.toFixed(1)+' out of 5">'+yT+" "+r.toFixed(1)+"</span>":"")+"</div></div></div>"}const _T=Object.freeze(Object.defineProperty({__proto__:null,cardHTML:kt},Symbol.toStringTag,{value:"Module"}));function ol(){const n=d.content.filter(p=>!p.hidden),e=n.find(p=>p.id===d.bannerContentId)||n[0],t=Object.keys(d.watchHistory).filter(p=>n.find(m=>m.id===p)),s=d.trendingIds.map(p=>n.find(m=>m.id===p)).filter(Boolean),i=iu(),r=ru(),o=d.sectionConfigs;let l=[];if(o&&o.length)l=o;else{const p=(d.sections.length?d.sections:[...new Set(n.map(m=>m.section))]).filter(Boolean);l=[{name:"Top 10 Trending",type:"trending",pinnedIds:[]},{name:"Continue Watching",type:"continue",pinnedIds:[]},...p.map(m=>({name:m,type:"content",pinnedIds:[]}))]}function c(p){var g;if(p.hidden)return"";if(p.type==="trending")return s.length?`<div class="sec">
        <div class="sec-head">
          <div class="sec-title-txt"> Top 10 <span class="sec-count">Trending</span></div>
        </div>
        <div class="hscroll">${s.map((_,y)=>kt(_,{rank:y+1})).join("")}</div>
      </div>`:"";if(p.type==="continue")return t.length?`<div class="sec">
        <div class="sec-head">
          <div class="sec-title-txt">▶ Continue Watching</div>
        </div>
        <div class="hscroll">${t.map(_=>kt(n.find(y=>y.id===_))).join("")}</div>
      </div>`:"";const m=(g=p.pinnedIds)!=null&&g.length?p.pinnedIds.map(_=>n.find(y=>y.id===_)).filter(Boolean):n.filter(_=>_.section===p.name);return m.length?`<div class="sec">
      <div class="sec-head">
        <div class="sec-title-txt">${p.name} <span class="sec-count">${m.length}</span></div>
        <span class="sec-all" onclick="A.nav('library')">See all ›</span>
      </div>
      <div class="hscroll">${m.map(_=>kt(_)).join("")}</div>
    </div>`:""}const u=i.length&&r?`
    <div class="sec">
      <div class="sec-head">
        <div class="sec-title-txt">
          Because you watched
          <span class="rec-title-pill">${r}</span>
        </div>
      </div>
      <div class="hscroll">${i.map(p=>kt(p)).join("")}</div>
    </div>`:"";return`<div class="page">
    ${e?`<div class="hero">
      <div class="hero-bg" style="background-image:url('${e.thumbnail}')"></div>
      <div class="hero-vignette"></div>
      <div class="hero-body">
        <div class="hero-genre">${e.genre}</div>
        <div class="hero-title">${e.title}</div>
        <div class="hero-meta">
          <span class="hero-meta-pill">${e.episodes} Episodes</span>
          <span class="hero-meta-pill">${e.genre}</span>
          ${d.watchHistory[e.id]!=null?`<span class="hero-meta-pill" style="color:var(--red)">▶ EP ${d.watchHistory[e.id]+1}</span>`:""}
        </div>
        <p class="hero-desc">${e.description}</p>
        <div class="hero-acts">
          <button class="btn btn-red" onclick="A.play('${e.id}',${d.watchHistory[e.id]??0})">Play Now</button>
          <button class="btn btn-outline" onclick="A.openDetail('${e.id}','home')">More Info</button>
          <button class="btn btn-outline" onclick="A.toggleList('${e.id}')">${d.myList.includes(e.id)?"Saved":"+ My List"}</button>
          <button class="btn btn-ghost" onclick="_DF.share('${e.id}')" style="font-size:1.1rem" title="Share">↗</button>
        </div>
      </div>
    </div>`:""}
    <div class="secs">
      ${l.map(c).join("")}
      ${u}
    </div>
  </div>`}function bT(){var c,u,p;const n=d.content.filter(m=>!m.hidden),e=[...new Set(n.map(m=>m.genre).filter(Boolean))].sort();let t=[...n];if((c=d.sGenres)!=null&&c.length&&(t=t.filter(m=>d.sGenres.includes(m.genre))),d.sq){const m=d.sq.toLowerCase();t=t.filter(g=>g.title.toLowerCase().includes(m)||(g.genre||"").toLowerCase().includes(m)||(g.description||"").toLowerCase().includes(m))}const s=d.sSort||"popular";s==="popular"?t.sort((m,g)=>(g.views||0)-(m.views||0)):s==="newest"?t.sort((m,g)=>{var _,y;return(((_=g.createdAt)==null?void 0:_.seconds)||0)-(((y=m.createdAt)==null?void 0:y.seconds)||0)}):s==="liked"?t.sort((m,g)=>(g.likes||0)-(m.likes||0)):s==="rated"&&t.sort((m,g)=>Kt(g)-Kt(m));const i=[{id:"popular",lbl:"Popular"},{id:"newest",lbl:"Newest"},{id:"liked",lbl:"Most Liked"},{id:"rated",lbl:"Top Rated"}],r=e.map(m=>{var _;return`<button class="gpill${((_=d.sGenres)==null?void 0:_.includes(m))?" act":""}" data-genre="${m.replace(/"/g,"&quot;")}" onclick="A.toggleGenre(this.dataset.genre)">${m}</button>`}).join(""),o=i.map(m=>`<button class="sort-pill${s===m.id?" act":""}" onclick="A.setSort('${m.id}')">${m.lbl}</button>`).join(""),l=t.length?t.map(m=>kt(m)).join(""):`<div class="empty">
        <p class="empty-txt">No results found</p>
        <button class="btn btn-outline btn-sm gap-t" onclick="A.clearGenres()">Clear filters</button>
       </div>`;return`<div class="page p-pad">
    <div class="p-title">Explore</div>
    <div class="p-sub">${n.length} titles · Find your next obsession</div>

    <!-- Search bar — oninput does NOT full re-render, updates grid in place -->
    <div class="search-bar" style="margin-bottom:12px">
      <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input class="inp" id="sq" placeholder="Search titles, genres, descriptions…"
        value="${d.sq||""}"
        oninput="A.search(this.value)"
        autocomplete="off" autocorrect="off" spellcheck="false"
        style="border-radius:50px;padding-left:44px;${d.sq?"padding-right:36px":""}">
      ${d.sq?`<button class="search-clear" onclick="A.clearGenres()">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
      </button>`:""}
    </div>

    <!-- Genre chips — IDs so _updateSearchResults can update them without re-render -->
    <div class="genre-bar" id="genreBar" style="margin-bottom:10px">
      <button class="gpill${(u=d.sGenres)!=null&&u.length?"":" act"}" onclick="A.clearGenres()">All</button>
      ${r}
    </div>

    <!-- Sort -->
    <div class="sort-row" id="sortRow">${o}</div>

    <!-- Result count -->
    <div class="search-results-count" id="searchCount">
      ${t.length} result${t.length!==1?"s":""}
      ${d.sq?` for "<strong>${d.sq}</strong>"`:""}
      ${(p=d.sGenres)!=null&&p.length?` in <strong>${d.sGenres.join(", ")}</strong>`:""}
    </div>

    <!-- Results grid — updated in-place by _updateSearchResults -->
    <div id="searchGrid" class="grid">${l}</div>
  </div>`}function wT(){const n=d.content.filter(p=>!p.hidden),e=[...new Set(n.map(p=>p.genre).filter(Boolean))].sort(),t=(d.libSearch||"").toLowerCase(),s=d.libGenre||"",i=d.libSort||"default";let r=[...n];t&&(r=r.filter(p=>p.title.toLowerCase().includes(t)||(p.genre||"").toLowerCase().includes(t)||(p.description||"").toLowerCase().includes(t))),s&&(r=r.filter(p=>p.genre===s)),i==="az"?r.sort((p,m)=>p.title.localeCompare(m.title)):i==="za"?r.sort((p,m)=>m.title.localeCompare(p.title)):i==="new"?r.sort((p,m)=>{var g,_;return(((g=m.createdAt)==null?void 0:g.seconds)||0)-(((_=p.createdAt)==null?void 0:_.seconds)||0)}):i==="pop"&&r.sort((p,m)=>(m.views||0)-(p.views||0));const o=["",...e].map(p=>{const m=p===s,g=p||"All Genres";return`<button class="gpill${m?" act":""}" onclick="A.setLibGenre('${p.replace(/'/g,"\\'")}')"> ${g}</button>`}).join(""),c=[{id:"default",lbl:"Default"},{id:"pop",lbl:"Popular"},{id:"new",lbl:"Newest"},{id:"az",lbl:"A–Z"},{id:"za",lbl:"Z–A"}].map(p=>`<button class="sort-pill${i===p.id?" act":""}" onclick="A.setLibSort('${p.id}')">${p.lbl}</button>`).join(""),u=r.length?r.map(p=>kt(p)).join(""):`<div class="empty">
        <p class="empty-txt">No titles match your filters.</p>
        <button class="btn btn-outline btn-sm" onclick="A.clearLibFilters()">Clear filters</button>
       </div>`;return`<div class="page p-pad">
    <div class="p-title">Library</div>
    <div class="p-sub">${n.length} titles${r.length!==n.length?` · ${r.length} shown`:""}</div>

    <div class="search-bar" style="margin-bottom:12px">
      <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input class="inp" placeholder="Search library…" value="${d.libSearch||""}"
        oninput="A.setLibSearch(this.value)"
        autocomplete="off" style="border-radius:50px;padding-left:44px;${t?"padding-right:36px":""}">
      ${t?`<button class="search-clear" onclick="A.clearLibFilters()">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
      </button>`:""}
    </div>

    <div class="genre-bar" style="margin-bottom:10px">${o}</div>
    <div class="sort-row" style="margin-bottom:14px">${c}</div>

    <div class="grid">${u}</div>
  </div>`}function IT(){if(!d.user)return`<div class="page p-pad">
    <div class="p-title">My List</div>
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      </div>
      <h3 class="empty-state-title">Save dramas to watch later</h3>
      <p class="empty-state-sub">Sign in to build your personal list.</p>
      <div class="empty-state-btns">
        <button class="btn btn-outline" onclick="A.openAuth('login')">Sign In</button>
        <button class="btn btn-red" onclick="A.openAuth('signup')">Create Account</button>
      </div>
    </div>
  </div>`;const n=d.content.filter(l=>!l.hidden&&d.myList.includes(l.id));if(n.length)return`<div class="page p-pad">
      <div class="p-title">My List</div>
      <div class="p-sub">${n.length} drama${n.length!==1?"s":""} saved</div>
      <div class="grid">${n.map(l=>kt(l)).join("")}</div>
    </div>`;const e=iu(),t=ru(),s=d.content.filter(l=>!l.hidden),i=d.trendingIds.map(l=>s.find(c=>c.id===l)).filter(Boolean).slice(0,8),r=e.length?e:i.length?i:s.slice(0,8),o=e.length&&t?"Because you watched "+t:"Popular right now";return`<div class="page p-pad">
    <div class="p-title">My List</div>

    <div class="empty-state">
      <div class="empty-state-icon">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      </div>
      <h3 class="empty-state-title">Your list is empty</h3>
      <p class="empty-state-sub">Tap the + button on any drama to save it here for later.</p>
    </div>

    ${r.length?`
    <div class="mylist-suggest">
      <div class="mylist-suggest-title">${o}</div>
      <div class="hscroll">${r.map(l=>kt(l)).join("")}</div>
    </div>`:""}

    <div class="mylist-explore">
      <button class="btn btn-outline fw" onclick="A.nav('search')">Browse All Dramas</button>
    </div>
  </div>`}const le={plan:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',bookmark:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>',heart:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',play:'<svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',eye:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',credits:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 8v8M8 12h8"/></svg>',calendar:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',email:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',shield:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',moon:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',sun:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',monitor:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path stroke-linecap="round" d="M8 21h8M12 17v4"/></svg>',settings:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',signout:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>',crown:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M5 19l2-7 5 4 5-4 2 7H5zM3 11l4 2 5-8 5 8 4-2"/></svg>',google:'<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',chevron:'<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>',bell:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',edit:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>'};function ET(){return`<div class="page prof-guest">
    <div class="prof-guest-inner">
      <div class="prof-guest-icon">
        <svg width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      </div>
      <h2 class="prof-guest-title">Your Profile</h2>
      <p class="prof-guest-sub">Sign in to track your watch history, earn credits, and manage your account.</p>
      <div class="prof-guest-btns">
        <button class="btn btn-outline" onclick="A.openAuth('login')">Sign In</button>
        <button class="btn btn-red"     onclick="A.openAuth('signup')">Create Account</button>
      </div>
    </div>
  </div>`}function je({icon:n,iconBg:e,label:t,sub:s,onclick:i,chevron:r=!0,variant:o="",right:l=""}){return`<div class="prow${o?" prow-"+o:""}"${i?` onclick="${i}"`:' style="cursor:default"'}>
    <div class="prow-l">
      <div class="prow-ic${e?" prow-ic--"+e:""}">${n}</div>
      <div class="prow-txt">
        <div class="prow-name">${t}</div>
        ${s?`<div class="prow-sub">${s}</div>`:""}
      </div>
    </div>
    <div class="prow-r">
      ${l}
      ${r&&i?`<span class="prow-chevron">${le.chevron}</span>`:""}
    </div>
  </div>`}function TT(){var E,Ze,wt,Ln;if(!d.user)return ET();const{user:n,sub:e,myList:t,watchHistory:s,liked:i,isAdmin:r,isSuperAdmin:o,adminLevel:l}=d,c=d.adCredits||0,u=d.loginStreak||0,p=d.totalCreditsEarned||0,m=d.content.filter(te=>!te.hidden),g=Object.keys(s),_=(n.displayName||n.email||"U")[0].toUpperCase(),y=((Ze=(E=n.providerData)==null?void 0:E[0])==null?void 0:Ze.providerId)==="google.com",x=e.charAt(0).toUpperCase()+e.slice(1),C=localStorage.getItem("dfTheme")||"system",L=(wt=n.metadata)!=null&&wt.creationTime?new Date(n.metadata.creationTime).toLocaleDateString("en-IN",{month:"long",year:"numeric"}):"—",T=g.map(te=>m.find(ae=>ae.id===te)).filter(Boolean).slice(0,12),V=i.map(te=>m.find(ae=>ae.id===te)).filter(Boolean).slice(0,12),$={};g.forEach(te=>{const ae=m.find(Nt=>Nt.id===te);ae!=null&&ae.genre&&($[ae.genre]=($[ae.genre]||0)+1)});const G=Object.entries($).sort((te,ae)=>ae[1]-te[1]).slice(0,5),Q=((Ln=G[0])==null?void 0:Ln[1])||1,w=[];g.length>=1&&w.push({icon:"▶",label:"First Watch",desc:"Watched your first drama"}),g.length>=10&&w.push({icon:"📺",label:"Binge Watcher",desc:"Watched 10+ dramas"}),g.length>=25&&w.push({icon:"🎬",label:"Drama Addict",desc:"Watched 25+ dramas"}),i.length>=5&&w.push({icon:"❤️",label:"Fan Favourite",desc:"Liked 5+ dramas"}),u>=3&&w.push({icon:"🔥",label:"On Fire",desc:"3+ day login streak"}),u>=7&&w.push({icon:"⚡",label:"Unstoppable",desc:"7-day streak complete"}),p>=10&&w.push({icon:"💰",label:"Credit Earner",desc:"Earned 10+ credits"}),t.length>=5&&w.push({icon:"🔖",label:"Collector",desc:"Saved 5+ to My List"}),e==="premium"&&w.push({icon:"👑",label:"VIP Member",desc:"Premium subscriber"}),r&&w.push({icon:"🛡️",label:"Team DramaFlow",desc:"Admin team member"});const b=o?{label:"Super Admin",cls:"prof-admin-badge-super"}:l>=4?{label:"L4 Admin",cls:"prof-admin-badge-super"}:l===3?{label:"L3 Admin",cls:"prof-admin-badge-l3"}:l===2?{label:"L2 Admin",cls:"prof-admin-badge-l2"}:l===1?{label:"L1 Admin",cls:"prof-admin-badge-l1"}:null,I=o?"Full access to all panels":l>=3?"Content, Users, Credits & more":l===2?"Content, Trending, Promo & Notifications":"Content & Banner management";function S(te,ae){return te.length?`<div class="prof-hscroll">${te.map(ae).join("")}</div>`:""}const k=C==="dark"?le.moon:C==="light"?le.sun:le.monitor,P=C==="dark"?"Dark mode":C==="light"?"Light mode":"System default";return`<div class="page prof-page">

    <!-- ═══ HERO COVER ═══ -->
    <div class="prof-cover">
      <div class="prof-cover-mesh"></div>
    </div>

    <!-- ═══ AVATAR ═══ -->
    <div class="prof-av-block">
      <div class="prof-av-wrap">
        <div class="prof-av">${_}</div>
        <div class="prof-av-provider" title="${y?"Google":"Email"}">
          ${y?le.google:le.shield}
        </div>
      </div>
    </div>

    <!-- ═══ IDENTITY ═══ -->
    <div class="prof-identity">
      <h1 class="prof-dname">${n.displayName||"DramaFlow User"}</h1>
      <p  class="prof-email">${n.email}</p>
      <div class="prof-id-badges">
        <span class="prof-plan-badge prof-plan-${e}">${x}</span>
        ${b?`<span class="prof-admin-badge ${b.cls}">${b.label}</span>`:""}
        ${u>0?`<span class="prof-streak-badge">🔥 ${u}d streak</span>`:""}
      </div>
    </div>

    <!-- ═══ STATS ROW ═══ -->
    <div class="prof-stats-wrap">
      <div class="prof-stat" onclick="A.nav('library')">
        <div class="prof-stat-n">${g.length}</div>
        <div class="prof-stat-l">Watched</div>
      </div>
      <div class="prof-stat-div"></div>
      <div class="prof-stat" onclick="A.nav('mylist')">
        <div class="prof-stat-n">${t.length}</div>
        <div class="prof-stat-l">Saved</div>
      </div>
      <div class="prof-stat-div"></div>
      <div class="prof-stat">
        <div class="prof-stat-n">${i.length}</div>
        <div class="prof-stat-l">Liked</div>
      </div>
      <div class="prof-stat-div"></div>
      <div class="prof-stat" onclick="A.nav('credits')">
        <div class="prof-stat-n" style="color:var(--jade)">${c}</div>
        <div class="prof-stat-l">Credits</div>
      </div>
    </div>

    <!-- ═══ QUICK ACTIONS ═══ -->
    <div class="prof-section prof-quick-actions">
      <button class="prof-qa" onclick="A.nav('credits')">
        <div class="prof-qa-ic">${le.credits}</div>
        <span>Earn Credits</span>
      </button>
      <button class="prof-qa" onclick="A.nav('search')">
        <div class="prof-qa-ic">${le.eye}</div>
        <span>Discover</span>
      </button>
      <button class="prof-qa" onclick="A.nav('mylist')">
        <div class="prof-qa-ic">${le.bookmark}</div>
        <span>My List</span>
      </button>
      <button class="prof-qa" onclick="A.nav('subscribe')">
        <div class="prof-qa-ic">${le.crown}</div>
        <span>Plans</span>
      </button>
    </div>

    <!-- ═══ CREDITS CARD (free/standard) ═══ -->
    ${e!=="premium"?`
    <div class="prof-section">
      <div class="prof-credits-banner" onclick="A.nav('credits')">
        <div class="prof-credits-banner-left">
          <div class="prof-credits-num">${c}</div>
          <div class="prof-credits-label">Episode Credits</div>
          <div class="prof-credits-desc">${c>0?`Use ${c} credit${c!==1?"s":""} to unlock episodes`:"Complete tasks to earn free credits"}</div>
        </div>
        <div class="prof-credits-banner-right">
          <div class="prof-credits-earned">
            <span class="prof-credits-earned-n">${p}</span>
            <span class="prof-credits-earned-l">total earned</span>
          </div>
          <div class="prof-credits-streak">
            <span class="prof-credits-streak-n">${u}</span>
            <span class="prof-credits-streak-l">day streak</span>
          </div>
        </div>
        <div class="prof-credits-cta">Earn More ${le.chevron}</div>
      </div>
    </div>`:""}

    <!-- ═══ CONTINUE WATCHING ═══ -->
    ${T.length?`
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">Continue Watching</span>
        <button class="prof-section-more" onclick="A.nav('library')">See all</button>
      </div>
      ${S(T,te=>`
        <div class="prof-cw-card" onclick="A.play('${te.id}',${s[te.id]??0})">
          <div class="prof-cw-img-wrap">
            <img src="${te.thumbnail}" class="prof-cw-img" loading="lazy">
            <div class="prof-cw-overlay">
              <div class="prof-cw-play">${le.play}</div>
            </div>
            <div class="prof-cw-prog-bar">
              <div class="prof-cw-prog-fill" style="width:${Math.round(((s[te.id]??0)+1)/te.episodes*100)}%"></div>
            </div>
          </div>
          <div class="prof-cw-name">${te.title}</div>
          <div class="prof-cw-ep">EP ${(s[te.id]??0)+1} / ${te.episodes}</div>
        </div>`)}
    </div>`:""}

    <!-- ═══ LIKED DRAMAS ═══ -->
    ${V.length?`
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">❤ Liked Dramas</span>
        <span class="prof-section-count">${V.length}</span>
      </div>
      ${S(V,te=>`
        <div class="prof-liked-card" onclick="A.openDetail('${te.id}')">
          <img src="${te.thumbnail}" class="prof-liked-img" loading="lazy">
          <div class="prof-liked-name">${te.title}</div>
        </div>`)}
    </div>`:""}

    <!-- ═══ GENRE TASTE ═══ -->
    ${G.length>=2?`
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">Your Taste</span>
        <span class="prof-section-sub">${g.length} dramas watched</span>
      </div>
      <div class="prof-genres">
        ${G.map(([te,ae],Nt)=>`
          <div class="prof-genre-row">
            <div class="prof-genre-name">${te}</div>
            <div class="prof-genre-bar-wrap">
              <div class="prof-genre-bar" style="width:${Math.round(ae/Q*100)}%;opacity:${1-Nt*.15}"></div>
            </div>
            <div class="prof-genre-count">${ae}</div>
          </div>`).join("")}
      </div>
    </div>`:""}

    <!-- ═══ ACHIEVEMENTS ═══ -->
    ${w.length?`
    <div class="prof-section">
      <div class="prof-section-head">
        <span class="prof-section-title">Achievements</span>
        <span class="prof-section-count">${w.length}</span>
      </div>
      <div class="prof-achievements">
        ${w.map(te=>`
          <div class="prof-achievement">
            <div class="prof-ach-icon">${te.icon}</div>
            <div class="prof-ach-label">${te.label}</div>
            <div class="prof-ach-desc">${te.desc}</div>
          </div>`).join("")}
      </div>
    </div>`:""}

    <!-- ═══ ADMIN ═══ -->
    ${r?`
    <div class="prof-section">
      <div class="prof-section-title">Administration</div>
      ${je({icon:le.settings,iconBg:"amber",label:o?"Super Admin Panel":"Admin Panel",sub:I,onclick:"A.nav('admin')",variant:"admin"})}
    </div>`:""}

    <!-- ═══ APPEARANCE ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Appearance</div>
      <div class="prof-theme-row">
        <div class="prof-theme-info">
          <div class="prof-theme-icon">${k}</div>
          <div>
            <div class="prof-theme-title">Theme</div>
            <div class="prof-theme-sub">${P}</div>
          </div>
        </div>
        <div class="prof-theme-btns">
          <button class="prof-theme-btn${C==="system"?" act":""}" onclick="A.setTheme('system')" title="System">${le.monitor}<span>System</span></button>
          <button class="prof-theme-btn${C==="light"?" act":""}" onclick="A.setTheme('light')"  title="Light">${le.sun}<span>Light</span></button>
          <button class="prof-theme-btn${C==="dark"?" act":""}" onclick="A.setTheme('dark')"   title="Dark">${le.moon}<span>Dark</span></button>
        </div>
      </div>
    </div>

    <!-- ═══ SUBSCRIPTION ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Subscription</div>
      ${je(e==="free"?{icon:le.crown,iconBg:"amber",label:"Upgrade to Premium",sub:"Ad-free, HD quality & exclusive dramas",onclick:"A.nav('subscribe')",variant:"upgrade"}:{icon:le.plan,iconBg:"amber",label:x+" Plan",sub:"Tap to manage or change plan",onclick:"A.nav('subscribe')"})}
      ${je({icon:le.credits,label:"Earn Credits",sub:`${c} available · Watch videos & complete tasks`,onclick:"A.nav('credits')"})}
    </div>

    <!-- ═══ SUPPORT ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Support</div>
      ${je({icon:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',iconBg:"jade",label:"Contact Support",sub:d.userChatMessages.length?"Continue conversation with admin":"Send a message to the DramaFlow team",onclick:"A.openUserChat()",right:d.userChatUnread?'<span class="prof-unread-dot" aria-label="Unread message"></span>':""})}
    </div>

    <!-- ═══ LIBRARY ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">My Library</div>
      ${je({icon:le.bookmark,label:"My List",sub:`${t.length} drama${t.length!==1?"s":""} saved`,onclick:"A.nav('mylist')"})}
      ${je({icon:le.heart,label:"Liked Dramas",sub:`${i.length} liked`,onclick:"A.nav('library')"})}
      ${je({icon:le.eye,label:"Watch History",sub:`${g.length} dramas watched`,onclick:"A.nav('library')"})}
    </div>

    <!-- ═══ ACCOUNT INFO ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Account</div>
      ${je({icon:le.edit,label:"Display Name",sub:n.displayName||"Not set",onclick:"A.openEditName()"})}
      ${je({icon:le.calendar,label:"Member Since",sub:L,chevron:!1})}
      ${je({icon:le.email,label:"Email",sub:n.email,chevron:!1})}
      ${je({icon:y?le.google:le.shield,label:"Sign-in",sub:y?"Google Account":"Email & Password",chevron:!1})}
      ${je({icon:le.bell,label:"Notifications",sub:"App updates & new episodes",onclick:"A.nav('home')"})}
      ${d.userChatUnread||d.userChatMessages.length?je({icon:'<svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',iconBg:d.userChatUnread?"red":"jade",label:"Messages from Admin",sub:d.userChatUnread?"New message — tap to read":`${d.userChatMessages.length} message${d.userChatMessages.length!==1?"s":""}`,onclick:"A.openUserChat()",right:d.userChatUnread?'<span class="prof-unread-dot"></span>':""}):""}
    </div>
    ${d.showUserChat?AT():""}

    <!-- ═══ DANGER ZONE ═══ -->
    <div class="prof-section">
      <div class="prof-section-title">Danger Zone</div>
      ${g.length?je({icon:le.eye,label:"Clear Watch History",sub:`Remove all ${g.length} watched titles`,onclick:"A.clearHistory()",variant:"danger"}):""}
      ${je({icon:le.signout,label:"Sign Out",sub:"You will need to log in again",onclick:"A.doLogout()",variant:"danger"})}
    </div>

  </div>`}function AT(){const n=d.userChatMessages||[];function e(s){if(!s)return"";const i=s.seconds?new Date(s.seconds*1e3):new Date(s),r=Date.now()-i;return r<6e4?"just now":r<36e5?Math.floor(r/6e4)+"m ago":r<864e5?i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):i.toLocaleDateString([],{month:"short",day:"numeric"})}return`<div class="uchat-overlay" onclick="event.target.classList.contains('uchat-overlay')&&A.closeUserChat()">
    <div class="uchat-panel">
      <div class="uchat-header">
        <div class="uchat-header-info">
          <div class="uchat-av">A</div>
          <div>
            <div class="uchat-header-title">Admin Support</div>
            <div class="uchat-header-sub">Messages from the DramaFlow team</div>
          </div>
        </div>
        <button class="icon-btn" onclick="A.closeUserChat()">
          <span class="icon icon-close icon-txt2"></span>
        </button>
      </div>
      <div class="uchat-messages" id="userChatMessages">${n.length?n.map(s=>{const i=s.from==="admin";return`<div class="uchat-msg ${i?"uchat-msg-admin":"uchat-msg-user"}">
          <div class="uchat-bubble">${s.text.replace(/</g,"&lt;")}</div>
          <div class="uchat-time">${i?(s.fromName||"Admin")+" · ":""}${e(s.at)}</div>
        </div>`}).join(""):'<div class="uchat-empty">No messages yet. The admin will reply here.</div>'}</div>
      <div class="uchat-input-row">
        <input class="inp uchat-inp" id="userChatInputField"
          placeholder="Reply to admin…"
          oninput="A.setUserChatInput(this.value)"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();A.sendUserChat()}">
        <button class="btn btn-red uchat-send" onclick="A.sendUserChat()">Send</button>
      </div>
    </div>
  </div>`}function ST(){const n=d.sub||"free",t=[{id:"free",name:"Free",price:"₹0",period:"forever",badge:null,featured:!1,feats:[{y:1,t:"Browse all content"},{y:1,t:`Watch first ${as} episodes free`},{y:0,t:"Full episode access"},{y:0,t:"Exclusive content"},{y:0,t:"Ad-free"},{y:0,t:"HD quality"}]},{id:"standard",name:"Standard",price:"₹99",period:"/month",badge:"Most Popular",featured:!0,feats:[{y:1,t:"Browse all content"},{y:1,t:"All episodes, all titles"},{y:0,t:"Exclusive content"},{y:1,t:"Ad-free watching"},{y:1,t:"HD quality"},{y:0,t:"4K + Early access"}]},{id:"premium",name:"Premium",price:"₹199",period:"/month",badge:null,featured:!1,feats:[{y:1,t:"Everything in Standard"},{y:1,t:"Exclusive content"},{y:1,t:"4K Ultra HD"},{y:1,t:"Early access to new dramas"},{y:1,t:"Ad-free watching"},{y:1,t:"Priority support"}]}].map(i=>{const r=i.id===n,o=i.feats.map(p=>'<li class="plan-feat"><span class="'+(p.y?"pfc":"pfx")+'">'+(p.y?"Done":"—")+"</span>"+p.t+"</li>").join("");let l,c,u;return r?(l="Current Plan",c="btn-current-plan",u=""):i.id==="free"?(l="Downgrade to Free",c="btn-ghost",u=`onclick="A.showPlanContact('free')"`):(l="Get "+i.name,c=i.featured?"btn-red":"btn-outline",u=`onclick="A.showPlanContact('`+i.id+`')"`),'<div class="plan'+(i.featured?" featured":"")+(r?" plan-current":"")+'">'+(r?'<div class="plan-current-badge">Your Plan</div>':"")+(i.badge&&!r?'<div class="plan-badge">'+i.badge+"</div>":"")+'<div class="plan-name">'+i.name+'</div><div class="plan-price"><span class="plan-price-n">'+i.price+'</span><span class="plan-price-p">'+i.period+'</span></div><ul class="plan-feats">'+o+'</ul><button class="btn '+c+' fw" '+u+">"+l+"</button></div>"}).join(""),s=`
  <div class="sub-compare">
    <div class="sub-compare-title">What can I watch?</div>
    <table class="sub-table">
      <thead>
        <tr>
          <th>Content Type</th>
          <th class="${n==="free"?"sub-col-current":""}">Free</th>
          <th class="${n==="standard"?"sub-col-current":""}">Standard</th>
          <th class="${n==="premium"?"sub-col-current":""}">Premium</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Regular dramas</td>
          <td>EP 1–${as} only</td>
          <td class="sub-check">All EPs ✓</td>
          <td class="sub-check">All EPs ✓</td>
        </tr>
        <tr>
          <td>Exclusive dramas</td>
          <td class="sub-cross">Locked</td>
          <td class="sub-cross">Locked</td>
          <td class="sub-check">Full access ✓</td>
        </tr>
        <tr>
          <td>Ad-free</td>
          <td class="sub-cross">✕</td>
          <td class="sub-check">✓</td>
          <td class="sub-check">✓</td>
        </tr>
        <tr>
          <td>Video quality</td>
          <td>SD</td>
          <td class="sub-check">HD ✓</td>
          <td class="sub-check">4K ✓</td>
        </tr>
      </tbody>
    </table>
  </div>`;return`<div class="page p-pad">
    <div style="text-align:center;margin-bottom:8px">
      <div class="p-title">Choose Your Plan</div>
      <div class="p-sub">
        ${n==="free"?"You're on the Free plan. Upgrade to watch everything.":`You're on the <strong style="color:var(--amber)">`+n.charAt(0).toUpperCase()+n.slice(1)+"</strong> plan."}
      </div>
    </div>
    <div class="sub-admin-note">
      <strong>How to upgrade:</strong> Ask an admin to change your plan — it's free during our beta!
      <br>Contact us at <span style="color:var(--jade)">admin@dramaflow.com</span>
    </div>
    <div class="plans">${t}</div>
    ${s}
    ${d.showPlanModal?kT(d.showPlanModal):""}
  </div>`}function kT(n){var i;const t={free:"Free",standard:"Standard",premium:"Premium"}[n]||n,s=n==="free";return`<div class="award-modal-overlay" onclick="event.target.classList.contains('award-modal-overlay')&&A.closePlanModal()">
    <div class="award-modal">
      <div class="award-modal-header">
        <div class="award-modal-title">${s?"Downgrade to Free":"Upgrade to "+t}</div>
        <button class="icon-btn" onclick="A.closePlanModal()"><span class="icon icon-close icon-txt2"></span></button>
      </div>
      <div class="award-modal-body" style="text-align:center;padding:8px 0 4px">
        <div style="font-size:2.2rem;margin-bottom:12px">${s?"⬇":"⭐"}</div>
        <div style="font-size:.95rem;color:var(--txt);margin-bottom:8px;font-weight:500">
          ${s?"Want to switch back to Free?":"Ready to go "+t+"?"}
        </div>
        <p style="font-size:.83rem;color:var(--txt3);line-height:1.6;margin-bottom:16px">
          Plan changes are handled by our admins — it's completely <strong style="color:var(--jade)">free</strong> during our beta.<br><br>
          Send a message or email us and we'll update your plan within 24 hours.
        </p>
        <div style="background:var(--raised);border-radius:var(--r-md);padding:12px;margin-bottom:4px">
          <div style="font-size:.75rem;color:var(--txt3);margin-bottom:4px">Contact admin</div>
          <div style="font-size:.9rem;color:var(--jade);font-weight:500">admin@dramaflow.com</div>
          <div style="font-size:.75rem;color:var(--txt4);margin-top:4px">Quote: "${t} plan request — ${((i=d.user)==null?void 0:i.email)||""}"</div>
        </div>
      </div>
      <div class="award-modal-footer">
        <button class="btn btn-outline" onclick="A.closePlanModal()">Close</button>
        <button class="btn btn-red" onclick="A.copyPlanEmail('${n}')">Copy Email Request</button>
      </div>
    </div>
  </div>`}function CT(){if(!d.user)return`<div class="page p-pad">
      <div class="p-title">Earn Credits</div>
      <div class="empty" style="min-height:50vh">
        <h3 style="font-family:var(--font-d);font-size:1.6rem;letter-spacing:.04em">Sign in to Earn Credits</h3>
        <p class="empty-txt">Watch videos, complete tasks and keep your streak going to earn free episode credits.</p>
        <div style="display:flex;gap:10px;margin-top:8px;justify-content:center">
          <button class="btn btn-outline" onclick="A.openAuth('login')">Sign In</button>
          <button class="btn btn-red"    onclick="A.openAuth('signup')">Create Account</button>
        </div>
      </div>
    </div>`;const n=ls(),e=n.find(L=>L.id==="daily_login")||{},t=e.creditsPerDay!=null?e.creditsPerDay:1,s=e.maxStreak!=null?e.maxStreak:7,i=e.streakBonusDay!=null?e.streakBonusDay:7,r=e.streakBonusCredits!=null?e.streakBonusCredits:2,o=d.adCredits||0,l=d.loginStreak||0,c=d.totalCreditsEarned||0,u=new Date().toISOString().slice(0,10),p=d.lastLoginDate===u,m=l===0&&p,g=Array.from({length:s},(L,T)=>{const V=T+1,$=V===i,G=l>=V,Q=p&&l===V,w=$?"+"+t+"+"+r+" ★":"+"+t;return'<div class="streak-day'+(G?" active":"")+(Q?" today":"")+($?" bonus-day":"")+'"><div class="streak-day-circle">'+(G?"&#10003;":V)+'</div><div class="streak-day-label">Day '+V+'</div><div class="streak-day-credit">'+w+"</div></div>"}).join("");let _;m?_='<span class="streak-claimed">Cycle complete! Resets to Day 1 tomorrow</span>':p?_=`<span class="streak-claimed">&#10003; Today's credit claimed</span>`:_='<span class="streak-pending">Log in tomorrow to continue your streak</span>';const y=m?'<span style="color:var(--jade)">Cycle Complete!</span>':'Day <span style="color:var(--amber)">'+l+"</span>",x=n.filter(L=>L.enabled&&L.id!=="daily_login").map(L=>{const T=Ev(L.id),V=T==="done",$=T.startsWith("cooldown:"),G=$?xT(parseInt(T.split(":")[1])):"",Q=L.type==="watch_ad",w=L.creditsEarned||1;let b;return V?b='<div class="task-done-badge">&#10003; Completed</div>':$?b='<div class="task-cooldown-badge">&#8987; '+G+"</div>":Q?b='<button class="task-btn task-btn-ad" onclick="A.startPageAd()"><span>Watch Video</span><span class="task-btn-reward">+'+w+" credit</span></button>":L.type==="social"?b=`<button class="task-btn task-btn-social" onclick="A.completeTask('`+L.id+"','"+(L.url||"")+`')"><span>Open &amp; Verify</span><span class="task-btn-reward">+`+w+" credit"+(w!==1?"s":"")+"</span></button>":b=`<button class="task-btn" onclick="A.completeTask('`+L.id+`')"><span>Complete</span><span class="task-btn-reward">+`+w+" credit"+(w!==1?"s":"")+"</span></button>",'<div class="task-card'+(V?" task-done":"")+($?" task-cooldown":"")+'"><div class="task-icon">'+L.icon+'</div><div class="task-info"><div class="task-title">'+L.title+'</div><div class="task-desc">'+L.desc+"</div>"+(L.oneTime?'<div class="task-one-time">One-time only</div>':"")+'</div><div class="task-action">'+b+"</div></div>"}).join(""),C=d.adPlaying&&d.adSource==="credits_page"?PT():"";return`<div class="page p-pad">

    <div class="credits-header">
      <div>
        <div class="p-title">Earn Credits</div>
        <div class="p-sub">Complete tasks to unlock more episodes for free</div>
      </div>
      <div class="credits-balance-big">
        <div class="credits-balance-num">${o}</div>
        <div class="credits-balance-lbl">credits</div>
      </div>
    </div>

    <div class="credits-stats">
      <div class="cstat"><div class="cstat-n" style="color:var(--jade)">${o}</div><div class="cstat-l">Available</div></div>
      <div class="cstat"><div class="cstat-n" style="color:var(--amber)">${l}</div><div class="cstat-l">Streak</div></div>
      <div class="cstat"><div class="cstat-n" style="color:var(--red)">${c}</div><div class="cstat-l">Total Earned</div></div>
    </div>

    <div class="credits-section-title">Daily Login Streak</div>
    <div class="streak-card">
      <div class="streak-info">
        <div class="streak-current">${y}</div>
        <div class="streak-sub">Log in every day. Day ${i} earns a bonus reward — then resets to Day 1.</div>
      </div>
      <div class="streak-row">${g}</div>
      <div class="streak-footer">
        ${_}
        <span class="streak-bonus-note">Day ${i} = +${t} daily + ${r} bonus = ${t+r} total credits</span>
      </div>
    </div>

    <div class="credits-section-title">Watch Videos</div>
    ${C||`<div class="watch-ad-card" onclick="A.startPageAd()">
      <div class="watch-ad-left">
        <div class="watch-ad-icon">&#9654;</div>
        <div>
          <div class="watch-ad-title">Watch a 30-second video</div>
          <div class="watch-ad-sub">Earn 1 credit &middot; Skip after ${ri}s &middot; Watch unlimited times</div>
        </div>
      </div>
      <div class="watch-ad-earn">
        <div class="watch-ad-earn-n">+1</div>
        <div class="watch-ad-earn-l">credit</div>
      </div>
    </div>`}

    <div class="credits-section-title" style="margin-top:24px">Tasks</div>
    <div class="tasks-list">${x}</div>

    <div class="credits-how">
      <div class="credits-how-title">How it works</div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>1 credit unlocks 1 locked episode</span></div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>Credits never expire — use them anytime</span></div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>Exclusive content requires a Premium plan</span></div>
      <div class="credits-how-row"><span class="icon icon-check icon-jade icon-sm"></span><span>Complete Day ${i} streak for a +${r} credit bonus</span></div>
    </div>

  </div>`}function PT(){if(d.adCompleted)return RT();const n=(rt-d.adTimeLeft)/rt*100,e=ri-(rt-d.adTimeLeft),t=DT(),s=t[Math.abs(Math.floor(Date.now()/1e3%t.length))];return`<div class="inline-ad-wrap" id="inlineAdWrap">
    <div class="inline-ad-visual" style="background:${s.bg}">
      <div class="ad-brand-logo" style="position:relative;top:auto;left:auto;margin-bottom:12px">${s.logo}</div>
      <div style="font-size:3rem;margin-bottom:8px">${s.icon}</div>
      <div class="ad-visual-headline" style="font-size:1.1rem">${s.headline}</div>
      <div class="ad-visual-sub">${s.sub}</div>
      <div class="ad-label">Advertisement</div>
    </div>
    <div class="inline-ad-controls">
      <div class="inline-ad-progress">
        <div class="ad-progress-bar" style="flex:1">
          <div class="ad-progress-fill" id="inlineFill" style="width:${n}%"></div>
        </div>
        <div class="ad-timer" id="inlineTimer">${d.adTimeLeft}s</div>
        ${d.adCanSkip?'<button class="ad-skip-btn" onclick="A.skipAd()">Skip &rsaquo;</button>':'<div class="ad-skip-soon">Skip in '+(e>0?e:1)+"s</div>"}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
        <div class="ad-earning-badge">Earning 1 episode credit&hellip;</div>
        <button class="ad-cancel-btn" onclick="A.cancelPageAd()">Cancel</button>
      </div>
    </div>
  </div>`}function RT(){return`<div class="inline-ad-reward" id="inlineAdWrap">
    <span class="icon icon-check icon-jade" style="width:48px;height:48px"></span>
    <div class="inline-reward-title">+1 Credit Earned!</div>
    <div class="inline-reward-desc">Balance: <strong style="color:var(--jade)">${d.adCredits}</strong> credits</div>
    <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;justify-content:center">
      <button class="btn btn-outline btn-sm" onclick="A.watchAnotherAd()">Watch Another (+1)</button>
      <button class="btn btn-red btn-sm"     onclick="A.dismissPageAd()">Done</button>
    </div>
  </div>`}function xT(n){return n>=1440?Math.ceil(n/1440)+"d":n>=60?Math.ceil(n/60)+"h":n+"m"}function DT(){return[{logo:"&#128722; ShopEasy",bg:"linear-gradient(135deg,#1a1a2e,#16213e)",icon:"&#128717;",headline:"Shop Smarter",sub:"20% off your first order"},{logo:"&#127925; BeatStream",bg:"linear-gradient(135deg,#0f0c29,#302b63)",icon:"&#127911;",headline:"Unlimited Music",sub:"Free for 3 months"},{logo:"&#127829; FoodRush",bg:"linear-gradient(135deg,#200122,#6f0000)",icon:"&#127828;",headline:"Deliver in 20 Min",sub:"Code DRAMA50 = &#8377;50 off"},{logo:"&#128241; TechMart",bg:"linear-gradient(135deg,#005c97,#363795)",icon:"&#128187;",headline:"Best Gadget Prices",sub:"EMI from &#8377;999/mo"},{logo:"&#128170; FitLife",bg:"linear-gradient(135deg,#134e5e,#71b280)",icon:"&#127947;",headline:"30-Day Transform",sub:"2M+ users on FitLife"}]}const ze={play:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',back:'<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>',bkm:'<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>',bkmF:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>',share:'<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v13"/></svg>',star:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>',lock:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path stroke-linecap="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>',check:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',ep:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',eye:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',heart:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>'};function LT(){const n=d.content.find(_=>_.id===d.detailId);if(!n)return'<div class="page p-pad"><p class="empty-txt" style="padding-top:80px;text-align:center">Content not found.</p></div>';const e=d.myList.includes(n.id),t=d.watchHistory[n.id],s=ha(d.sub),i=Kt(n),r=va(n.id),o=n.exclusive===!0,l=o&&!s.canExclusive,c=!s.canWatchAll&&!o,u=d.user?l?{label:"Upgrade to Premium",cls:"btn-outline",fn:"A.nav('subscribe')"}:t!=null?{label:"Continue — EP "+(t+1),cls:"btn-red",fn:"A.play('"+n.id+"',"+t+")"}:{label:"Play Now",cls:"btn-red",fn:"A.play('"+n.id+"',0)"}:{label:"Sign In to Watch",cls:"btn-outline",fn:"A.openAuth()"},p=Array.from({length:n.episodes||1},(_,y)=>{var T,V;const x=t!=null&&t>=y,C=t===y,L=!s.canWatchAll&&y>=2&&!((V=(T=d.adCreditsUsed)==null?void 0:T[n.id])!=null&&V.includes(y))||o&&!s.canExclusive;return'<div class="detail-ep'+(C?" cur":"")+(x?" done":"")+(L?" locked":"")+`" onclick="A.play('`+n.id+"',"+y+')"><div class="detail-ep-left"><div class="detail-ep-num">Episode '+(y+1)+'</div><div class="detail-ep-status">'+(C?"Continue here":x?"Watched":L?"Locked":"Not started")+'</div></div><div class="detail-ep-right">'+(L?ze.lock:C?ze.play:x?ze.check:ze.play)+"</div></div>"}).join(""),m=d.content.filter(_=>!_.hidden&&_.id!==n.id&&_.genre===n.genre).slice(0,8),g=[1,2,3,4,5].map(_=>'<button class="detail-star'+(r>=_?" lit":"")+`" onclick="A.rateFromDetail('`+n.id+"',"+_+')">'+ze.star+"</button>").join("");return`<div class="page detail-page">

    <!-- ── Hero ── -->
    <div class="detail-hero">
      <div class="detail-hero-bg" style="background-image:url('${n.thumbnail}')"></div>
      <div class="detail-hero-scrim"></div>
      <button class="detail-back-btn" onclick="A.navBack()" aria-label="Back">${ze.back}</button>
      ${o?'<div class="detail-excl-pill">Premium Exclusive</div>':""}
    </div>

    <!-- ── Title + meta ── -->
    <div class="detail-head">
      <div class="detail-genre-pill">${n.genre}</div>
      <h1 class="detail-title">${n.title}</h1>
      <div class="detail-meta">
        <span class="dmeta">${ze.ep} ${n.episodes} Episodes</span>
        ${i?`<span class="dmeta">${ze.star} ${i.toFixed(1)}</span>`:""}
        <span class="dmeta">${ze.eye} ${(n.views||0).toLocaleString()}</span>
        <span class="dmeta">${ze.heart} ${(n.likes||0).toLocaleString()}</span>
      </div>
    </div>

    <!-- ── Action bar ── -->
    <div class="detail-action-bar">
      <button class="btn ${u.cls} detail-cta-btn" onclick="${u.fn}">
        ${u.cls==="btn-red"?ze.play:""} ${u.label}
      </button>
      <button class="detail-icon-btn${e?" saved":""}" onclick="A.toggleList('${n.id}')" title="${e?"Remove from list":"Save to My List"}">
        ${e?ze.bkmF:ze.bkm}
        <span>${e?"Saved":"My List"}</span>
      </button>
      <button class="detail-icon-btn" onclick="_DF.share('${n.id}')" title="Share">
        ${ze.share}
        <span>Share</span>
      </button>
    </div>

    <!-- ── Body ── -->
    <div class="detail-body">

      <!-- Description -->
      <p class="detail-desc">${n.description||"No description available."}</p>

      <!-- Plan notice -->
      ${c?`<div class="detail-notice">
        ${ze.lock}
        <span>Free preview includes Episodes 1–2.
          <a class="detail-link" onclick="A.nav('credits')">Watch an ad</a> to unlock more or
          <a class="detail-link" onclick="A.nav('subscribe')">upgrade</a> for unlimited access.
        </span>
      </div>`:""}
      ${l?`<div class="detail-notice detail-notice--premium">
        ${ze.lock}
        <span>Premium exclusive — <a class="detail-link" onclick="A.nav('subscribe')">upgrade to watch</a></span>
      </div>`:""}

      <!-- Rating -->
      <div class="detail-rating-row">
        <div class="detail-rating-label">
          ${i?`<strong style="color:var(--amber)">${i.toFixed(1)}</strong>
               <span style="color:var(--txt3);font-size:.76rem"> / 5 &nbsp;·&nbsp; ${n.ratingCount||0} rating${(n.ratingCount||0)!==1?"s":""}</span>`:'<span style="color:var(--txt3);font-size:.78rem">No ratings yet</span>'}
        </div>
        <div class="detail-stars">${g}</div>
      </div>

      <!-- Episodes -->
      <div class="detail-section-title">Episodes</div>
      <div class="detail-ep-list">${p}</div>

      <!-- Related -->
      ${m.length?`
        <div class="detail-section-title" style="margin-top:28px">More in ${n.genre}</div>
        <div class="hscroll">${m.map(_=>kt(_)).join("")}</div>`:""}

    </div>
  </div>`}function VT(){const e=(d.tasksConfig?[...d.tasksConfig]:_a.map(t=>({...t}))).map((t,s)=>{const i=t.type==="streak",r=t.type==="social",o=t.type==="watch_ad",l=t.type==="action";return`<div class="task-admin-row" id="taskRow${s}">

      <!-- Row header: icon + title + type label + enable toggle -->
      <div class="task-admin-header">
        <div class="task-admin-icon-wrap">
          <input class="inp task-icon-inp" id="tIcon${s}" value="${t.icon}" maxlength="10"
            style="width:60px;text-align:center;padding:8px;font-size:.9rem">
        </div>
        <div class="task-admin-meta">
          <div class="task-admin-title">${t.title}</div>
          <div class="task-admin-type">${NT(t.type)}</div>
        </div>
        <div class="task-admin-toggle-wrap">
          <span class="task-status-lbl">${t.enabled?"Enabled":"Disabled"}</span>
          <label class="excl-toggle" onclick="A.toggleTask(${s})" style="cursor:pointer">
            <div class="excl-toggle-track${t.enabled?" excl-on":""}" id="taskTrack${s}">
              <div class="excl-toggle-thumb"></div>
            </div>
          </label>
        </div>
      </div>

      <!-- Editable fields -->
      <div class="task-admin-fields">
        <div class="inp-group">
          <label class="inp-label">Title</label>
          <input class="inp" id="tTitle${s}" value="${t.title}">
        </div>
        ${i?"":`<div class="inp-group">
          <label class="inp-label">Credits earned</label>
          <input class="inp" id="tCredits${s}" type="number" min="1" max="100" value="${t.creditsEarned||1}">
        </div>`}
        <div class="inp-group">
          <label class="inp-label">Description (shown to users)</label>
          <input class="inp" id="tDesc${s}" value="${t.desc}">
        </div>
        ${r?`
        <div class="inp-group">
          <label class="inp-label">Social URL (opens when user taps task)</label>
          <input class="inp" id="tUrl${s}" value="${t.url||""}" placeholder="https://…">
        </div>`:""}
        ${(l||o)&&t.cooldownMinutes!==void 0?`
        <div class="inp-group">
          <label class="inp-label">Cooldown in minutes (0 = unlimited, 1440 = once per day)</label>
          <input class="inp" id="tCooldown${s}" type="number" min="0"
            value="${t.cooldownMinutes}" placeholder="0">
        </div>`:""}
        ${i?`
        <div class="fg2">
          <div class="inp-group">
            <label class="inp-label">Cycle length (days)</label>
            <input class="inp" id="tMaxStreak${s}" type="number" min="1" max="30" value="${t.maxStreak||7}">
          </div>
          <div class="inp-group">
            <label class="inp-label">Bonus on day</label>
            <input class="inp" id="tBonusDay${s}" type="number" min="1" max="30" value="${t.streakBonusDay||7}">
          </div>
        </div>
        <div class="fg2">
          <div class="inp-group">
            <label class="inp-label">Credits per day</label>
            <input class="inp" id="tCredits${s}" type="number" min="1" max="100" value="${t.creditsPerDay||1}">
          </div>
          <div class="inp-group">
            <label class="inp-label">Bonus credits (extra on bonus day)</label>
            <input class="inp" id="tBonusCredits${s}" type="number" min="0" max="100" value="${t.streakBonusCredits??2}">
          </div>
        </div>
        <div class="streak-preview-note">
          Example: Day 7 = +${t.creditsPerDay||1} daily + ${t.streakBonusCredits??2} bonus = ${(t.creditsPerDay||1)+(t.streakBonusCredits??2)} total credits. Streak resets to Day 1.
        </div>`:""}
      </div>
    </div>`}).join("");return`<div class="apanel${d.aTab==="tasks"?" vis":""}">

    <!-- ── Header ── -->
    <div class="tasks-admin-header">
      <div>
        <div class="p-title" style="font-size:1.2rem">Credits &amp; Tasks</div>
        <div class="p-sub">Control what tasks users can complete to earn episode credits</div>
      </div>
      <div class="tasks-header-btns">
        <button class="btn btn-outline btn-sm" onclick="A.resetTasksConfig()">
          Reset Defaults
        </button>
        <button class="btn btn-red btn-sm" onclick="A.saveTasksConfig()" id="saveTasksBtnTop">
          Save Changes
        </button>
      </div>
    </div>

    <!-- ── Task rows ── -->
    <div class="task-admin-list">${e}</div>

    <!-- ── Tip ── -->
    <div class="task-admin-note">
      <strong>Tips:</strong>
      Toggle a task off to hide it from users without deleting it.
      Social tasks open the URL then award credits on user confirmation.
      Changes only apply after clicking <strong>Save Changes</strong>.
    </div>

    <!-- ── Sticky bottom save bar ── -->
    <div class="tasks-save-bar" id="tasksSaveBar">
      <div class="tasks-save-bar-inner">
        <div class="tasks-save-info">
          <span class="tasks-save-dot"></span>
          Unsaved changes
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-outline btn-sm" onclick="A.resetTasksConfig()">
            Discard
          </button>
          <button class="btn btn-red btn-sm" onclick="A.saveTasksConfig()">
            Save Changes
          </button>
        </div>
      </div>
    </div>

  </div>`}function NT(n){return{streak:"Daily Streak",watch_ad:"Watch Video",social:"Social Follow",action:"Action Task"}[n]||n}function MT(){if(d.aTab!=="promo")return"";const n=d.promoConfig||pe,{enabled:e=!0,title:t=pe.title,subtitle:s=pe.subtitle,body:i=pe.body,badge:r=pe.badge,ctaLabel:o=pe.ctaLabel,ctaAction:l=pe.ctaAction,ctaUrl:c=pe.ctaUrl,secondaryLabel:u=pe.secondaryLabel,showTo:p=pe.showTo,delaySeconds:m=pe.delaySeconds,frequencyHours:g=pe.frequencyHours,style:_=pe.style,accentColor:y=pe.accentColor,imageUrl:x=pe.imageUrl}=n,C=[{value:"free",label:"Free users only"},{value:"loggedout",label:"Logged-out visitors only"},{value:"all",label:"All logged-in users"},{value:"always",label:"Everyone (always)"}],L=[{value:"gradient",label:"Gradient (default)"},{value:"minimal",label:"Minimal / clean"},{value:"banner",label:"Bottom banner"}],T=[{value:"subscribe",label:"Open Subscribe page"},{value:"credits",label:"Open Earn Credits page"},{value:"url",label:"Open external URL"}];function V($,G,Q){return'<select class="inp" id="'+$+'">'+G.map(w=>'<option value="'+w.value+'"'+(Q===w.value?" selected":"")+">"+w.label+"</option>").join("")+"</select>"}return`<div class="apanel vis" id="promoPanel">
    <div class="promo-admin-header">
      <div>
        <div class="p-title" style="font-size:1.2rem">Promo Popup</div>
        <div class="p-sub">Configure the offer popup shown to users when they open the app</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn btn-outline btn-sm" onclick="A.previewPromo()">Preview</button>
        <button class="btn btn-outline btn-sm" onclick="A.resetPromoConfig()">Reset</button>
        <button class="btn btn-red btn-sm" id="savePromoBtnTop" onclick="A.savePromoConfig()">Save Changes</button>
      </div>
    </div>

    <!-- ── Enable toggle ── -->
    <div class="form-box" style="margin-bottom:14px">
      <label class="excl-toggle" onclick="A.togglePromoEnabled()" style="cursor:pointer">
        <div class="excl-toggle-label">
          <div class="excl-toggle-title">Popup ${e?"Enabled":"Disabled"}</div>
          <div class="excl-toggle-sub">${e?"Popup will show to users matching the target audience":"Popup is off — no users will see it"}</div>
        </div>
        <div class="excl-toggle-track${e?" excl-on":""}" id="promoEnabledTrack">
          <div class="excl-toggle-thumb"></div>
        </div>
      </label>
    </div>

    <!-- ── Content ── -->
    <div class="form-box">
      <div class="form-title">Content</div>
      <div class="inp-group">
        <label class="inp-label">Badge text (leave blank to hide)</label>
        <input class="inp" id="promoBadge" value="${r}" placeholder="e.g. Limited Offer, 50% Off">
      </div>
      <div class="inp-group">
        <label class="inp-label">Title</label>
        <input class="inp" id="promoTitle" value="${t}">
      </div>
      <div class="inp-group">
        <label class="inp-label">Subtitle</label>
        <input class="inp" id="promoSubtitle" value="${s}">
      </div>
      <div class="inp-group">
        <label class="inp-label">Body text</label>
        <textarea class="inp" id="promoBody" rows="3">${i}</textarea>
      </div>
    </div>

    <!-- ── Call to action ── -->
    <div class="form-box">
      <div class="form-title">Call to Action</div>
      <div class="inp-group">
        <label class="inp-label">Button label</label>
        <input class="inp" id="promoCtaLabel" value="${o}" placeholder="e.g. Get Premium — ₹199/mo">
      </div>
      <div class="fg2">
        <div class="inp-group">
          <label class="inp-label">Button action</label>
          ${V("promoCtaAction",T,l)}
        </div>
        <div class="inp-group">
          <label class="inp-label">External URL (if action = URL)</label>
          <input class="inp" id="promoCtaUrl" value="${c}" placeholder="https://…">
        </div>
      </div>
      <div class="inp-group">
        <label class="inp-label">Secondary link text (dismiss)</label>
        <input class="inp" id="promoSecondary" value="${u}" placeholder="e.g. Maybe later, No thanks">
      </div>
    </div>

    <!-- ── Targeting ── -->
    <div class="form-box">
      <div class="form-title">Targeting &amp; Timing</div>
      <div class="fg2">
        <div class="inp-group">
          <label class="inp-label">Show to</label>
          ${V("promoShowTo",C,p)}
        </div>
        <div class="inp-group">
          <label class="inp-label">Delay before showing (seconds)</label>
          <input class="inp" id="promoDelay" type="number" min="0" max="60" value="${m}">
        </div>
      </div>
      <div class="inp-group">
        <label class="inp-label">How often to show</label>
        <div class="freq-btn-group">
          <button class="freq-btn${g===0?" act":""}" onclick="A.setPromoFreq(0)"    id="fq0">Every visit</button>
          <button class="freq-btn${g===1?" act":""}" onclick="A.setPromoFreq(1)"    id="fq1">Every hour</button>
          <button class="freq-btn${g===24?" act":""}" onclick="A.setPromoFreq(24)"   id="fq24">Once a day</button>
          <button class="freq-btn${g===168?" act":""}" onclick="A.setPromoFreq(168)"  id="fq168">Once a week</button>
          <button class="freq-btn${g===720?" act":""}" onclick="A.setPromoFreq(720)"  id="fq720">Once a month</button>
        </div>
        <input type="hidden" id="promoFrequency" value="${g}">
      </div>
    </div>

    <!-- ── Appearance ── -->
    <div class="form-box">
      <div class="form-title">Appearance</div>
      <div class="fg2">
        <div class="inp-group">
          <label class="inp-label">Style</label>
          ${V("promoStyle",L,_)}
        </div>
        <div class="inp-group">
          <label class="inp-label">Accent colour</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input class="inp" id="promoAccent" value="${y}" placeholder="#e5253f" style="flex:1">
            <input type="color" id="promoAccentPicker" value="${y}"
              oninput="document.getElementById('promoAccent').value=this.value"
              style="width:40px;height:40px;border:1px solid var(--rim);border-radius:8px;cursor:pointer;background:none;padding:2px">
          </div>
        </div>
      </div>
      <div class="inp-group">
        <label class="inp-label">Background image URL (optional — overrides colour)</label>
        <input class="inp" id="promoImageUrl" value="${x}" placeholder="https://… or leave blank">
      </div>
    </div>

    <div style="display:flex;justify-content:flex-end;gap:8px;padding-bottom:32px">
      <button class="btn btn-outline" onclick="A.resetPromoConfig()">Reset to Default</button>
      <button class="btn btn-red" onclick="A.savePromoConfig()">Save Changes</button>
    </div>
  </div>`}function OT(){if(d.aTab!=="notifications")return"";const n=d.content.filter(c=>!c.hidden),e=d.notifHistory||[],t=[{value:"all",label:"All registered users"},{value:"free",label:"Free plan users only"},{value:"standard",label:"Standard plan users only"},{value:"premium",label:"Premium plan users only"},{value:"saved_drama",label:"Users who saved a specific drama"},{value:"watched",label:"Users who watched a specific drama"}],s=d.notifAudience||"all",i=s==="saved_drama"||s==="watched",r='<select class="inp" id="notifAudience" onchange="A.notifAudienceChange(this.value)">'+t.map(c=>'<option value="'+c.value+'"'+(s===c.value?" selected":"")+">"+c.label+"</option>").join("")+"</select>",o=i?'<div class="inp-group" id="notifDramaWrap"><label class="inp-label">Select Drama</label><select class="inp" id="notifDrama"><option value="">— Choose a drama —</option>'+n.map(c=>'<option value="'+c.id+'">'+c.title+"</option>").join("")+"</select></div>":"",l=e.length?e.map(c=>{var m;const u=(m=c.sentAt)!=null&&m.seconds?FT(c.sentAt.seconds):c.sentAt||"—",p=c.recipientCount||0;return'<div class="notif-hist-row"><div class="notif-hist-meta"><div class="notif-hist-title">'+Hr(c.title||"")+'</div><div class="notif-hist-body">'+Hr(c.message||"")+'</div></div><div class="notif-hist-right"><div class="notif-hist-count">'+p+' sent</div><div class="notif-hist-ts">'+u+'</div><span class="tag tag-'+(c.audience||"all")+'" style="font-size:.6rem">'+$T(c.audience)+"</span></div></div>"}).join(""):'<p class="empty-txt" style="padding:20px 0;text-align:center;font-size:.8rem">No notifications sent yet</p>';return`<div class="apanel vis">
    <div style="margin-bottom:20px">
      <div class="p-title" style="font-size:1.2rem">Notifications</div>
      <div class="p-sub">Send in-app notifications directly to users</div>
    </div>

    <!-- ── Compose ── -->
    <div class="form-box" style="margin-bottom:14px">
      <div class="form-title">Compose Notification</div>

      <div class="inp-group">
        <label class="inp-label">Title (shown in bold)</label>
        <input class="inp" id="notifTitle" placeholder="e.g. New episode added, Special offer…" maxlength="80" oninput="A.updateNotifPreview()">
      </div>

      <div class="inp-group">
        <label class="inp-label">Message</label>
        <textarea class="inp" id="notifMessage" rows="3" placeholder="Write your notification message here…" maxlength="300" oninput="A.updateNotifPreview()"></textarea>
        <div style="text-align:right;font-size:.68rem;color:var(--txt3);margin-top:4px" id="notifCharCount">0 / 300</div>
      </div>

      <div class="inp-group">
        <label class="inp-label">Thumbnail image URL (optional)</label>
        <input class="inp" id="notifThumb" placeholder="https://… leave blank for no image">
      </div>

      <div class="inp-group">
        <label class="inp-label">Send to</label>
        ${r}
      </div>

      ${o}

      <div class="notif-send-row">
        <div class="notif-send-preview" id="notifPreview">
          <div class="notif-send-preview-label">Preview</div>
          <div class="notif-preview-item">
            <div class="notif-preview-dot"></div>
            <div>
              <div class="notif-preview-title" id="notifPreviewTitle">Notification title</div>
              <div class="notif-preview-msg"   id="notifPreviewMsg">Your message will appear here…</div>
            </div>
          </div>
        </div>
        <button class="btn btn-red" id="notifSendBtn" onclick="A.sendNotification()">
          Send Notification
        </button>
      </div>
    </div>

    <!-- ── Quick send buttons (content-linked) ── -->
    <div class="form-box" style="margin-bottom:14px">
      <div class="form-title">Quick Send — Content Update</div>
      <p class="p-sub" style="margin-bottom:14px">Instantly notify users who saved a drama that new content is available.</p>
      <div class="notif-quick-grid">
        ${n.slice(0,12).map(c=>'<div class="notif-quick-card"><img src="'+c.thumbnail+'" class="notif-quick-thumb" alt="'+Hr(c.title)+`" onerror="this.style.display='none'"><div class="notif-quick-name">`+Hr(c.title)+`</div><button class="notif-quick-btn" onclick="A.quickNotify('`+c.id+`')">Notify Fans</button></div>`).join("")}
      </div>
    </div>

    <!-- ── Sent history ── -->
    <div class="form-box">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <div class="form-title" style="margin:0">Sent History</div>
        <button class="btn btn-outline btn-sm" onclick="A.loadNotifHistory()">Refresh</button>
      </div>
      <div class="notif-hist-list">${l}</div>
    </div>

  </div>`}function Hr(n){return String(n||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function FT(n){const e=Math.floor(Date.now()/1e3)-n;return e<60?"Just now":e<3600?Math.floor(e/60)+"m ago":e<86400?Math.floor(e/3600)+"h ago":Math.floor(e/86400)+"d ago"}function $T(n){return{all:"All users",free:"Free",standard:"Standard",premium:"Premium",saved_drama:"Saved",watched:"Watched"}[n]||n||"All"}function BT(){var x,C,L;if(d.aTab!=="analytics")return"";const n=d.content.filter(T=>!T.hidden);if(!n.length)return'<div class="apanel vis"><p class="empty-txt" style="padding:40px 0;text-align:center">No content yet.</p></div>';const e=n.reduce((T,V)=>T+(V.views||0),0),t=n.reduce((T,V)=>T+(V.likes||0),0),s=n.reduce((T,V)=>T+(V.ratingCount||0),0);d.allUsers.length;const i=[...n].sort((T,V)=>(V.views||0)-(T.views||0)).slice(0,5),r=[...n].sort((T,V)=>(V.likes||0)-(T.likes||0)).slice(0,5),o=[...n].filter(T=>T.ratingCount>0).sort((T,V)=>Kt(V)-Kt(T)).slice(0,5),l=((x=i[0])==null?void 0:x.views)||1,c=((C=r[0])==null?void 0:C.likes)||1,u=5;function p(T,V,$){return`<div class="ana-stat-card">
      <div class="ana-stat-n" style="color:${$}">${al(V)}</div>
      <div class="ana-stat-l">${T}</div>
    </div>`}function m(T,V,$,G,Q){const w=$>0?Math.round(V/$*100):0;return`<div class="ana-bar-row">
      <div class="ana-bar-thumb" style="background-image:url('${T.thumbnail}')"></div>
      <div class="ana-bar-info">
        <div class="ana-bar-title">${T.title}</div>
        <div class="ana-bar-genre">${T.genre}</div>
        <div class="ana-bar-track">
          <div class="ana-bar-fill" style="width:${w}%;background:${Q}"></div>
        </div>
      </div>
      <div class="ana-bar-val" style="color:${Q}">${al(V)}${G}</div>
    </div>`}const g={};n.forEach(T=>{g[T.genre]=(g[T.genre]||0)+(T.views||0)});const _=Object.entries(g).sort((T,V)=>V[1]-T[1]),y=((L=_[0])==null?void 0:L[1])||1;return`<div class="apanel vis">
    <div style="margin-bottom:20px">
      <div class="p-title" style="font-size:1.2rem">Analytics</div>
      <div class="p-sub">Overview of your content performance</div>
    </div>

    <!-- ── Overview stats ── -->
    <div class="ana-stats-row">
      ${p("Total Views",e,"var(--red)")}
      ${p("Total Likes",t,"var(--jade)")}
      ${p("Ratings Given",s,"var(--amber)")}
      ${p("Content Items",n.length,"var(--txt2)")}
    </div>

    <!-- ── Top by views ── -->
    <div class="ana-section-title">Top 5 Most Watched</div>
    <div class="ana-bar-list">
      ${i.map(T=>m(T,T.views||0,l," views","var(--red)")).join("")}
    </div>

    <!-- ── Top by likes ── -->
    <div class="ana-section-title">Top 5 Most Liked</div>
    <div class="ana-bar-list">
      ${r.map(T=>m(T,T.likes||0,c," likes","var(--jade)")).join("")}
    </div>

    <!-- ── Top by rating ── -->
    ${o.length?`<div class="ana-section-title">Top 5 Highest Rated</div>
    <div class="ana-bar-list">
      ${o.map(T=>m(T,Kt(T),u," / 5","var(--amber)")).join("")}
    </div>`:""}

    <!-- ── Genre breakdown ── -->
    <div class="ana-section-title">Views by Genre</div>
    <div class="ana-genre-list">
      ${_.slice(0,8).map(([T,V])=>`
        <div class="ana-genre-row">
          <div class="ana-genre-name">${T}</div>
          <div class="ana-genre-track">
            <div class="ana-genre-fill" style="width:${Math.round(V/y*100)}%"></div>
          </div>
          <div class="ana-genre-val">${al(V)}</div>
        </div>`).join("")}
    </div>

  </div>`}function al(n){return n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"K":String(n)}function ap(n,e,t,s,{idAttr:i="data-id",idxAttr:r="data-i"}={}){const o=document.getElementById(n);if(!o)return;let l=null;o.querySelectorAll(e).forEach(c=>{c.addEventListener("dragstart",u=>{l=c,c.classList.add("dragging"),u.dataTransfer.effectAllowed="move"}),c.addEventListener("dragend",()=>{c.classList.remove("dragging"),o.querySelectorAll(e).forEach(u=>u.classList.remove("drag-over"))}),c.addEventListener("dragover",u=>{u.preventDefault(),c!==l&&c.classList.add("drag-over")}),c.addEventListener("dragleave",()=>c.classList.remove("drag-over")),c.addEventListener("drop",u=>{if(u.preventDefault(),c.classList.remove("drag-over"),!l||l===c)return;const p=l.getAttribute(i)||l.getAttribute(r),m=c.getAttribute(i)||c.getAttribute(r),g=parseInt(l.getAttribute(r)),_=parseInt(c.getAttribute(r));if(!isNaN(g)&&!isNaN(_)&&g!==_){const[C]=t.splice(g,1);t.splice(_,0,C),s([...t]);return}const y=t.indexOf(p),x=t.indexOf(m);y>=0&&x>=0&&(t.splice(y,1),t.splice(x,0,p),s([...t]))})}),UT(o,e,t,s)}function UT(n,e,t,s,i){let r,o,l;n.querySelectorAll(e).forEach((c,u)=>{c.addEventListener("touchstart",p=>{r=p.touches[0].clientY,o=u;const m=c.getBoundingClientRect();l=c.cloneNode(!0),l.style.cssText=`position:fixed;z-index:9999;opacity:.85;pointer-events:none;width:${m.width}px;top:${m.top}px;left:${m.left}px;`,document.body.appendChild(l),c.style.opacity=".3"},{passive:!0}),c.addEventListener("touchmove",p=>{l&&(l.style.transform=`translateY(${p.touches[0].clientY-r}px)`)},{passive:!0}),c.addEventListener("touchend",p=>{if(!l)return;l.remove(),l=null,n.querySelectorAll(e).forEach(y=>y.style.opacity="");const m=p.changedTouches[0].clientY,g=[...n.querySelectorAll(e)];let _=o;if(g.forEach((y,x)=>{const C=y.getBoundingClientRect();m>=C.top&&m<=C.bottom&&(_=x)}),_!==o){const[y]=t.splice(o,1);t.splice(_,0,y),s([...t])}})})}function qT(){var p,m;const n=d.adminLevel,t=[{id:"analytics",lbl:"Analytics",icon:"M3 3h18v18H3zM3 9h18M9 21V9",minLevel:1},{id:"content",lbl:"Content",icon:"M15 10l4.553-2.069A1 1 0 0121 8.847V18.153a1 1 0 01-1.447.894L15 17M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",minLevel:1},{id:"banner",lbl:"Banner",icon:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1zm14 0a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1v-6a1 1 0 011-1z",minLevel:1},{id:"trending",lbl:"Trending",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",minLevel:2},{id:"sections",lbl:"Sections",icon:"M4 6h16M4 12h16M4 18h7",minLevel:2},{id:"promo",lbl:"Promo",icon:"M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",minLevel:2},{id:"notifications",lbl:"Notifications",icon:"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",minLevel:2},{id:"tasks",lbl:"Credits",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",minLevel:3},{id:"users",lbl:"Users",icon:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",minLevel:3},{id:"chat",lbl:"Chat",icon:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",minLevel:3},{id:"activity",lbl:"Activity",icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",minLevel:3}].filter(g=>n>=g.minLevel),s=n>=5?"alb-super":n===4?"alb-l4":n===3?"alb-l3":n===2?"alb-l2":"alb-l1",i=n>=5?"Super Admin":"Level "+n+(n>=4?" Admin":" Sub-Admin"),r=((p=d.user)==null?void 0:p.displayName)||((m=d.user)==null?void 0:m.email)||"Admin",o=t.map(g=>g.id);!o.includes(d.aTab)&&o.length&&(d.aTab=o[0]);let l=BT();l+=jT(),l+=GT(),n>=2&&(l+=HT()),n>=2&&(l+=KT()),n>=2&&(l+=MT()),n>=2&&(l+=OT()),n>=3&&(l+=VT()),n>=3&&(l+=WT()),n>=3&&(l+=YT()),n>=3&&(l+=JT());const c=t.map(g=>'<button class="admin-nav-item'+(d.aTab===g.id?" act":"")+'" data-tab="'+g.id+'" onclick="A.adminTab(this.dataset.tab)"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="'+g.icon+'"/></svg>'+g.lbl+"</button>").join(""),u=t.map(g=>'<button class="amt-btn'+(d.aTab===g.id?" act":"")+'" data-tab="'+g.id+'" onclick="A.adminTab(this.dataset.tab)">'+g.lbl+"</button>").join("");return'<div class="page admin-page"><aside class="admin-sidebar"><div class="admin-identity"><div class="admin-identity-logo">Drama<em>Flow</em></div><div class="admin-identity-name">'+r+'</div><div class="admin-identity-badge '+s+'">'+i+'</div></div><nav class="admin-nav">'+c+'</nav><div class="admin-nav-footer"><button data-page="home" onclick="A.nav(this.dataset.page)"><svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>Back to App</button></div></aside><div class="admin-mobile-tabs">'+u+'</div><main class="admin-content">'+l+"</main></div>"}function jT(){return`<div class="apanel${d.aTab==="content"?" vis":""}">
    <button class="btn btn-red btn-sm gap-b" onclick="A.toggleForm()">${d.aShowForm?"✕ Cancel":"+ Add Content"}</button>
    ${d.aShowForm?zT(d.aEditId?d.content.find(n=>n.id===d.aEditId):null):""}
    <div class="tbl-wrap">
      <table>
        <thead><tr><th></th><th>Title</th><th>Genre</th><th>EPs</th><th>Section</th><th>Views</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${d.content.map(n=>`<tr>
            <td><img src="${n.thumbnail}" class="tthumb"></td>
            <td style="font-weight:700">${n.title}</td>
            <td>${n.genre}</td><td>${n.episodes}</td>
            <td style="color:var(--txt2)">${n.section||"—"}</td>
            <td style="color:var(--txt3)">${n.views||0}</td>
            <td><span class="badge ${n.hidden?"b-hid":"b-vis"}">${n.hidden?"Hidden":"Visible"}</span></td>
            <td><div class="tact">
              <button class="tbtn" onclick="A.editContent('${n.id}')">Edit</button>
              <button class="tbtn tbtn-vis" onclick="A.toggleHide('${n.id}',${!n.hidden})">${n.hidden?"Show":"Hide"}</button>
              <button class="tbtn tbtn-del" onclick="A.deleteContent('${n.id}')">🗑</button>
              <button class="tbtn tbtn-notif" onclick="A.sendNotif('${n.id}','')" title="Notify users who saved this"></button>
            </div></td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>`}function zT(n){const e=parseInt(n==null?void 0:n.episodes)||1,t=n?n.id:null,s=t?`A.updateEpFields('${t}')`:"A.updateEpFields(null)",i=Array.from({length:e},(l,c)=>{const u=n&&n.episodeUrls&&n.episodeUrls[c]||"";return`<div class="ep-url-row"><span class="ep-url-lbl">EP ${c+1}</span><input class="inp" id="eu${c}" placeholder="Video URL" value="${u}"></div>`}).join(""),r=n?"Edit: "+n.title:"Add New Content",o=n?`<button class="btn btn-red btn-sm" onclick="A.saveEdit('${n.id}')">Save Changes</button> <button class="btn btn-outline btn-sm" onclick="A.cancelForm()">Cancel</button>`:'<button class="btn btn-red btn-sm" onclick="A.submitNew()">Add Content</button> <button class="btn btn-outline btn-sm" onclick="A.cancelForm()">Cancel</button>';return`<div class="form-box" id="cForm">
    <div class="form-title">${r}</div>
    <div class="fg2">
      <div class="inp-group"><label class="inp-label">Title</label><input class="inp" id="fT" value="${(n==null?void 0:n.title)||""}" placeholder="Drama title"></div>
      <div class="inp-group"><label class="inp-label">Genre</label><input class="inp" id="fG" value="${(n==null?void 0:n.genre)||""}" placeholder="Romance, Thriller…"></div>
    </div>
    <div class="inp-group"><label class="inp-label">Thumbnail URL</label><input class="inp" id="fTh" value="${(n==null?void 0:n.thumbnail)||""}" placeholder="https://…"></div>
    <div class="inp-group"><label class="inp-label">Description</label><textarea class="inp" id="fD">${(n==null?void 0:n.description)||""}</textarea></div>
    <div class="fg2">
      <div class="inp-group"><label class="inp-label">Section</label><input class="inp" id="fS" value="${(n==null?void 0:n.section)||""}" placeholder="Featured, Trending…"></div>
      <div class="inp-group"><label class="inp-label">Episodes</label><input class="inp" id="fE" type="number" min="1" max="100" value="${e}" oninput="${s}"></div>
    </div>
    <label class="inp-label">Episode Video URLs</label>
    <div class="ep-urls-box" id="epUrls">${i}</div>

    <!-- Exclusive toggle -->
    <div class="excl-toggle-row">
      <label class="excl-toggle" id="exclusiveToggle" onclick="A.toggleExclusive()">
        <div class="excl-toggle-track${n!=null&&n.exclusive?" excl-on":""}" id="exclusiveTrack">
          <div class="excl-toggle-thumb"></div>
        </div>
        <div class="excl-toggle-info">
          <div class="excl-toggle-label">👑 Exclusive Content</div>
          <div class="excl-toggle-sub">Only visible to Premium subscribers</div>
        </div>
      </label>
      <input type="hidden" id="fExcl" value="${n!=null&&n.exclusive?"true":"false"}">
    </div>

    <div class="row gap-t">${o}</div>
  </div>`}function GT(){const n=d.content.filter(e=>!e.hidden);return`<div class="apanel${d.aTab==="banner"?" vis":""}">
    <div class="p-sub gap-b">Select the content displayed on the home banner</div>
    <div class="ban-grid">
      ${n.map(e=>`<div class="ban-opt${d.bannerContentId===e.id?" act":""}" onclick="A.setBanner('${e.id}')">
        <img src="${e.thumbnail}" alt="${e.title}">
        <div class="ban-opt-name">${e.title}</div>
        ${d.bannerContentId===e.id?'<div class="ban-check">✓</div>':""}
      </div>`).join("")}
    </div>
  </div>`}function HT(){const n=d.content.filter(t=>!t.hidden),e=n.filter(t=>!d.tmpTrending.includes(t.id));return`<div class="apanel${d.aTab==="trending"?" vis":""}">
    <p class="note">Drag rows to reorder. ${d.tmpTrending.length}/10 selected.</p>
    <div class="trend-list" id="trendList">
      ${d.tmpTrending.map((t,s)=>{const i=n.find(r=>r.id===t);return i?`<div class="trend-item" draggable="true" data-id="${t}" data-i="${s}">
          <span class="trend-rank">#${s+1}</span>
          <img src="${i.thumbnail}" class="trend-img">
          <span class="trend-name">${i.title}</span>
          <button class="trend-rm" onclick="event.stopPropagation();A.rmTrend('${t}')">✕</button>
        </div>`:""}).join("")}
    </div>
    ${e.length?`<p class="note">Click to add to trending:</p>
    <div class="trend-add-grid">
      ${e.map(t=>`<div class="trend-add-card" onclick="A.addTrend('${t.id}')">
        <img src="${t.thumbnail}" alt="${t.title}">
        <div class="trend-add-ic">+</div>
        <div class="trend-add-name">${t.title}</div>
      </div>`).join("")}
    </div>`:""}
    <button class="btn btn-red btn-sm" onclick="A.saveTrending()">Save Trending</button>
  </div>`}function KT(){const n=d.tmpSectionConfigs.length?d.tmpSectionConfigs:nu();d.tmpSectionConfigs.length||(d.tmpSectionConfigs=n);const e=d.content.filter(s=>!s.hidden);function t(s,i){var g,_;const r=s.type==="trending"?"stp-trending":s.type==="continue"?"stp-continue":"stp-content",o=s.type==="trending"?"Trending":s.type==="continue"?"▶ Continue":"📋 Content",l=s.type==="trending"?"🔥":s.type==="continue"?"▶":"📋",c=d.expandedSection===i,u=s.type==="content"?((g=s.pinnedIds)==null?void 0:g.length)||e.filter(y=>y.section===s.name).length:0,p=s.type==="content"?"Content section · "+u+" card"+(u!==1?"s":""):s.type==="trending"?"System section · Top 10":"System section · Watch history";let m="";if(s.type==="content"){let y="";if((_=s.pinnedIds)!=null&&_.length){const C=s.pinnedIds.map((L,T)=>{const V=e.find($=>$.id===L);return V?`<div class="sec-picked-item" draggable="true" data-id="${L}" data-pi="${T}" data-si="${i}">
            <div class="spi-handle"><span></span><span></span><span></span></div>
            <img src="${V.thumbnail}" class="spi-img"><span class="spi-name">${V.title}</span>
            <span class="spi-rm" onclick="A.unpinCard(${i},'${L}')">✕</span></div>`:""}).join("");y=`<div class="sec-picked-list" id="secPickedList${i}">${C}</div>`}else y=`<p class="sec-card-note" style="color:var(--jade)">✓ Auto mode — showing all content tagged "${s.name}"</p>`;const x=e.map(C=>{const L=(s.pinnedIds||[]).includes(C.id);return`<div class="sec-avail-card${L?" picked":""}" ${L?"":`onclick="A.pinCard(${i},'${C.id}')"`}>
          <img src="${C.thumbnail}"><div class="sec-avail-card-name">${C.title}</div>
          ${L?'<div class="sec-avail-check">✓</div>':""}</div>`}).join("");m=`<div class="sec-field-row"><span class="sec-field-lbl">Name</span><input class="inp sec-name-inp" id="secName${i}" value="${s.name}"></div>
        <div class="sec-field-row"><span class="sec-field-lbl">Type</span>
        <select class="sec-type-sel" id="secType${i}" onchange="A.secTypeChange(${i},this.value)">
          <option value="content" selected>📋 Content Row</option>
          <option value="trending">🔥 Top 10 Trending</option>
          <option value="continue">▶ Continue Watching</option>
        </select></div>
        <div class="sec-card-note"><strong>Pinned Cards</strong> — Choose which content appears here. If nothing pinned, section name is used automatically.</div>
        ${y}
        <div style="font-size:.72rem;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Click to pin:</div>
        <div class="sec-avail-grid">${x}</div>
        <div class="sec-row-actions">
          <button class="tbtn tbtn-del" onclick="A.removeSecConfig(${i})">Remove</button>
          <button class="tbtn" onclick="A.clearPinned(${i})">Clear Pins</button>
        </div>`}else m=`<div class="sec-special-note">${s.type==="trending"?"<strong>🔥 Top 10 Trending</strong> — Shows your configured Top 10 list. Drag to reposition.":"<strong>▶ Continue Watching</strong> — Shows personalised continue-watching per user. Drag to reposition."}</div>
        <div class="sec-field-row"><span class="sec-field-lbl">Name</span><input class="inp sec-name-inp" id="secName${i}" value="${s.name}"></div>`;return`<div class="sec-editor-row${c?" expanded":""}${s.hidden?" sec-hidden":""}" id="secRow${i}" draggable="true" data-i="${i}">
      <div class="sec-row-header" onclick="A.toggleSecExpand(${i})">
        <div class="sec-drag-handle" onclick="event.stopPropagation()"><span></span><span></span><span></span></div>
        <div class="sec-row-icon">${l}</div>
        <div class="sec-row-name-wrap"><div class="sec-row-title">${s.name}</div><div class="sec-row-subtitle">${p}</div></div>
        <span class="sec-type-pill ${r}">${o}</span>
        <button class="sec-vis-btn${s.hidden?" sec-vis-hidden":""}" title="${s.hidden?"Section hidden — click to show":"Section visible — click to hide"}"
          onclick="event.stopPropagation();A.toggleSectionHidden(${i})" aria-label="${s.hidden?"Show section":"Hide section"}">
          ${s.hidden?'<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>':'<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'}
        </button>
        <span class="sec-expand-arrow${c?" open":""}">▼</span>
      </div>
      <div class="sec-row-body${c?" open":""}">${m}</div>
    </div>`}return`<div class="apanel${d.aTab==="sections"?" vis":""}">
    <div style="margin-bottom:16px">
      <div class="p-title" style="font-size:1.2rem">Home Feed Builder</div>
      <div class="p-sub">Drag to reorder · Click to expand · Changes apply to home screen</div>
    </div>
    <div class="sec-editor-wrap" id="secEditorList">${n.map(t).join("")}</div>
    <div class="row gap-t" style="flex-wrap:wrap">
      <button class="btn btn-outline btn-sm" onclick="A.addSecConfig()">+ Add Section</button>
      <button class="btn btn-red btn-sm" onclick="A.saveSecConfigs()">Save Feed Order</button>
    </div>
  </div>`}function WT(){if(d.aTab!=="users")return'<div class="apanel"></div>';const n=d.allUsers.length,e=d.allUsers.filter(y=>y.online).length,t=d.allUsers.filter(y=>y.blocked).length,s=d.allUsers.filter(y=>y.role==="subadmin"||y.email===xt).length,i=d.allUsers.filter(y=>y.subscription==="premium").length,r=d.allUsers.filter(y=>y.subscription==="standard").length;let o=[...d.allUsers];const l=(d.usersSearch||"").toLowerCase();l&&(o=o.filter(y=>(y.displayName||"").toLowerCase().includes(l)||(y.email||"").toLowerCase().includes(l))),d.userFilter==="online"&&(o=o.filter(y=>y.online)),d.userFilter==="blocked"&&(o=o.filter(y=>y.blocked)),d.userFilter==="admin"&&(o=o.filter(y=>y.role==="subadmin"||y.email===xt)),d.userFilter==="premium"&&(o=o.filter(y=>y.subscription==="premium")),d.userFilter==="standard"&&(o=o.filter(y=>y.subscription==="standard")),d.userFilter==="free"&&(o=o.filter(y=>!y.subscription||y.subscription==="free"));const c=[{id:"all",lbl:"All ("+n+")"},{id:"online",lbl:"● "+e+" Online"},{id:"premium",lbl:i+" Premium"},{id:"standard",lbl:r+" Std"},{id:"free",lbl:"Free"},{id:"admin",lbl:s+" Admins"},{id:"blocked",lbl:t+" Blocked"}],u=y=>"'"+String(y).replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'";function p(y){const x=y.id,C=y.email||"",L=y.adminLevel||0,T=y.subscription||"free",V=!!y.blocked,$=C===xt,G=y.role==="subadmin",w=(d.adminLevel||0)>=4&&!$,b=y.adCredits||0,I=(y.displayName||C||"U")[0].toUpperCase(),S=d.expandedUserId===x;u(x),u(y.displayName||C||x);const k="uc2-av"+($?" uc2-av-sa":G?" uc2-av-admin":"")+(V?" uc2-av-blocked":"");let P="";$?P='<span class="uc2-role uc2-role-sa">Super Admin</span>':G?P='<span class="uc2-role uc2-role-l'+L+'">L'+L+" Admin</span>":P='<span class="uc2-role uc2-role-user">User</span>';const E=y.online?'<span class="uc2-dot uc2-dot-on"></span>':'<span class="uc2-dot uc2-dot-off"></span>',Ze='<span class="uc2-plan uc2-plan-'+T+'">'+T+"</span>",wt={1:"Analytics, Content, Banner",2:"Trending, Promo, Notif",3:"Users, Credits",4:"Full Access"};let Ln="";if(w){let et="";for(let vt=1;vt<=4;vt++)et+='<button class="uc2-lv-btn'+(G&&L===vt?" act":"")+'" data-uid="'+x+'" data-name="'+C+'" data-lv="'+vt+'" onclick="A.changeLevel(this.dataset.uid,this.dataset.name,parseInt(this.dataset.lv))"><div class="uc2-lv-n">L'+vt+'</div><div class="uc2-lv-p">'+wt[vt]+"</div></button>";const Ia=G?"Current: L"+L+" — tap to change level":"Tap a level to make admin";Ln='<div class="uc2-section-label">Admin Role</div><div class="uc2-level-grid">'+et+'</div><div class="uc2-lv-hint">'+Ia+"</div>"+(G?'<button class="uc2-revoke-btn" data-uid="'+x+'" data-name="'+C+'" onclick="A.revokeAdmin(this.dataset.uid,this.dataset.name)">Remove Admin Role</button>':"")}const te=w?'<div class="uc2-section-label">Subscription Plan</div><div class="uc2-plan-btns">'+["free","standard","premium"].map(et=>'<button class="uc2-plan-btn'+(T===et?" act-"+et:"")+'" data-uid="'+x+'" data-plan="'+et+'" onclick="A.setUserSub(this.dataset.uid,this.dataset.plan)">'+et.charAt(0).toUpperCase()+et.slice(1)+"</button>").join("")+"</div>":"";let ae='<div class="uc2-section-label">Actions</div><div class="uc2-actions">';w?(ae+='<button class="uc2-btn uc2-btn-credits" data-uid="'+x+'" data-name="'+C+'" data-cr="'+b+'" onclick="A.openAwardModal(this.dataset.uid,this.dataset.name,parseInt(this.dataset.cr))">Award Credits</button>',V?ae+='<button class="uc2-btn uc2-btn-unblock" data-uid="'+x+'" onclick="A.unblockUser(this.dataset.uid)">Unblock User</button>':ae+='<button class="uc2-btn uc2-btn-block" data-uid="'+x+'" onclick="A.blockUser(this.dataset.uid)">Block User</button>',ae+='<button class="uc2-btn uc2-btn-del" data-uid="'+x+'" data-name="'+C+'" onclick="A.deleteUser(this.dataset.uid,this.dataset.name)">Delete Account</button>'):$?ae+='<span class="uc2-note-sa">Super Admin — cannot be modified</span>':ae+='<span class="uc2-note">Requires L4+ admin to manage</span>',ae+="</div>";const Nt=Object.keys(y.watchHistory||{}).length,vr=(y.myList||[]).length,ba=y.loginStreak||0,It='<div class="uc2-stats"><div class="uc2-stat"><div class="uc2-stat-n">'+Nt+'</div><div class="uc2-stat-l">Watched</div></div><div class="uc2-stat"><div class="uc2-stat-n">'+vr+'</div><div class="uc2-stat-l">Saved</div></div><div class="uc2-stat"><div class="uc2-stat-n">'+ba+'</div><div class="uc2-stat-l">Streak</div></div><div class="uc2-stat"><div class="uc2-stat-n" style="color:var(--jade)">'+b+'</div><div class="uc2-stat-l">Credits</div></div></div>',Le='<div class="uc2-expand'+(S?" open":"")+'">'+It+te+Ln+ae+"</div>",wa='<div class="uc2-header" data-uid="'+x+'" onclick="A.toggleUserExpand(this.dataset.uid)"><div class="'+k+'">'+I+'<span class="uc2-dot-wrap">'+E+'</span></div><div class="uc2-info"><div class="uc2-name">'+(y.displayName||"(no name)")+'</div><div class="uc2-email">'+C+'</div><div class="uc2-tags">'+P+Ze+(V?'<span class="uc2-role uc2-role-blocked">Blocked</span>':"")+'</div></div><div class="uc2-chevron'+(S?" open":"")+'"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 9l6 6 6-6"/></svg></div></div>';return'<div class="uc2'+(V?" uc2-blocked":"")+($?" uc2-sa":G?" uc2-admin":"")+'">'+wa+Le+"</div>"}const m=c.map(y=>'<button class="uf-pill'+(d.userFilter===y.id?" act":"")+'" data-filter="'+y.id+'" onclick="A.userFilter(this.dataset.filter)">'+y.lbl+"</button>").join(""),g=n===0?"Click Refresh to load users":"No users match this filter",_=o.length?o.map(p).join(""):'<div class="empty" style="padding:40px 0"><p class="empty-txt">'+g+"</p></div>";return'<div class="apanel vis"><div class="ap-header"><div><div class="ap-title">Users</div><div class="ap-sub">'+n+" total &nbsp;·&nbsp; "+e+" online &nbsp;·&nbsp; "+s+' admins</div></div><button class="btn btn-outline btn-sm" onclick="A.loadUsers()">Refresh</button></div><div class="users-stats"><div class="ustat"><div class="ustat-n" style="color:var(--txt)">'+n+'</div><div class="ustat-l">Total</div></div><div class="ustat"><div class="ustat-n" style="color:var(--jade)">'+e+'</div><div class="ustat-l">Online</div></div><div class="ustat"><div class="ustat-n" style="color:var(--amber)">'+s+'</div><div class="ustat-l">Admins</div></div><div class="ustat"><div class="ustat-n" style="color:var(--red)">'+t+'</div><div class="ustat-l">Blocked</div></div></div><div class="users-search-wrap" id="usersSearchWrap" style="margin-bottom:10px"><svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input class="inp" id="usersSearchInput" placeholder="Search name or email…" value="'+(d.usersSearch||"")+`" oninput="A.usersSearch(this.value)" autocomplete="off" autocorrect="off" spellcheck="false"><button class="users-search-clear" id="usersSearchClear" onclick="A.usersSearch('')" title="Clear search" style="display:`+(d.usersSearch?"flex":"none")+';align-items:center"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg></button></div><div class="users-search-meta" style="font-size:.72rem;color:var(--txt3);margin-bottom:8px"><span id="usersSearchCount">'+o.length+" of "+n+'</span></div><div class="users-filter-row" style="margin-bottom:14px">'+m+'</div><div class="uc2-list" id="uc2ListWrap">'+_+"</div>"+(d.awardModal?QT():"")+"</div>"}function QT(){const{uid:n,name:e,currentCredits:t}=d.awardModal;return`<div class="award-modal-overlay" onclick="event.target.classList.contains('award-modal-overlay')&&A.closeAwardModal()">
    <div class="award-modal">
      <div class="award-modal-header">
        <div class="award-modal-title">Award Credits</div>
        <button class="icon-btn" onclick="A.closeAwardModal()" aria-label="Close">
          <span class="icon icon-close icon-txt2"></span>
        </button>
      </div>
      <div class="award-modal-body">
        <div class="award-modal-user">
          <div class="award-modal-av">${e[0].toUpperCase()}</div>
          <div>
            <div class="award-modal-username">${e}</div>
            <div class="award-modal-balance">Current balance: <strong style="color:var(--jade)">${t} credits</strong></div>
          </div>
        </div>
        <div class="inp-group" style="margin-top:18px">
          <label class="inp-label">Amount (use negative to deduct)</label>
          <input class="inp" id="awardAmt" type="number" placeholder="e.g. 5" autofocus
            style="font-size:1.1rem;text-align:center;letter-spacing:.05em">
        </div>
        <div class="award-quick-btns">
          ${[1,2,5,10].map(s=>`<button class="award-quick-btn" onclick="document.getElementById('awardAmt').value=${s}">${s>0?"+":""}${s}</button>`).join("")}
          ${[-1,-3,-5].map(s=>`<button class="award-quick-btn award-quick-neg" onclick="document.getElementById('awardAmt').value=${s}">${s}</button>`).join("")}
        </div>
        <div class="inp-group">
          <label class="inp-label">Reason (optional — logged for audit)</label>
          <input class="inp" id="awardReason" placeholder="e.g. Contest winner, Support issue…">
        </div>
      </div>
      <div class="award-modal-footer">
        <button class="btn btn-outline" onclick="A.closeAwardModal()">Cancel</button>
        <button class="btn btn-red" onclick="A.confirmAward()" id="awardConfirmBtn">Award Credits</button>
      </div>
    </div>
  </div>`}function YT(){var r,o,l;if(d.aTab!=="chat")return'<div class="apanel"></div>';const n=d.globalChatTab||"direct";function e(c){if(!c)return"";const u=c.seconds?new Date(c.seconds*1e3):new Date(c),m=new Date-u;return m<6e4?"just now":m<36e5?Math.floor(m/6e4)+"m ago":m<864e5?u.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):u.toLocaleDateString([],{month:"short",day:"numeric"})}const t=`<div class="chat-tab-bar">
    <button class="chat-tab-btn${n==="direct"?" act":""}" onclick="A.setChatTab('direct')">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      Direct Messages
    </button>
    <button class="chat-tab-btn${n==="global"?" act":""}" onclick="A.setChatTab('global')">
      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      Admin Group Chat
      <span class="chat-tab-badge">All Admins</span>
    </button>
  </div>`;let s="";if(n==="direct"){const c=[...d.allUsers].filter(C=>C.email!==xt),u=(d.chatSearch||"").toLowerCase(),p=u?c.filter(C=>(C.displayName||"").toLowerCase().includes(u)||(C.email||"").toLowerCase().includes(u)):c,m=d.chatUid,g=m?d.allUsers.find(C=>C.id===m):null,_=d.chatMessages||[],y=p.length?p.map(C=>{const L=C.id===m,T=(C.displayName||C.email||"?")[0].toUpperCase(),V=C.online?'<span class="chat-online-dot"></span>':"";return`<div class="chat-user-row${L?" act":""}" onclick="A.openChat('${C.id}')"><div class="chat-av">${T}${V}</div><div class="chat-user-info"><div class="chat-user-name">${C.displayName||C.email||C.id}</div><div class="chat-user-email">${C.email||""}</div></div></div>`}).join(""):'<div class="chat-empty-list">No users found</div>',x=g?`<div class="chat-panel-header">
          <div class="chat-av" style="width:34px;height:34px;font-size:.85rem">${(g.displayName||g.email||"?")[0].toUpperCase()}</div>
          <div>
            <div style="font-size:.9rem;font-weight:500;color:var(--txt)">${g.displayName||g.email}</div>
            <div style="font-size:.75rem;color:var(--txt3)">${g.online?"🟢 Online":"Offline"} · ${g.subscription||"free"} plan</div>
          </div>
          <button class="icon-btn" style="margin-left:auto" onclick="A.closeChat()" title="Close"><span class="icon icon-close icon-txt2"></span></button>
        </div>
        <div class="chat-messages" id="chatMessages">
          ${_.length?_.map(C=>{const L=C.from==="admin";return`<div class="chat-msg${L?" chat-msg-admin":" chat-msg-user"}">
                  <div class="chat-bubble">${C.text.replace(/</g,"&lt;")}</div>
                  <div class="chat-msg-time">${L?(C.fromName||"Admin")+" · ":""}${e(C.at)}</div>
                </div>`}).join(""):'<div class="chat-no-msgs">No messages yet. Start the conversation.</div>'}
        </div>
        <div class="chat-input-row">
          <input class="inp chat-inp" id="chatInputField" placeholder="Type a message…"
            value="${(d.chatInput||"").replace(/"/g,"&quot;")}"
            oninput="A.setChatInput(this.value)"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();A.sendChat()}">
          <button class="btn btn-red chat-send-btn" onclick="A.sendChat()">Send</button>
        </div>`:`<div class="chat-select-prompt">
          <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color:var(--txt4);margin-bottom:10px"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          <div style="color:var(--txt3);font-size:.9rem">Select a user to message</div>
        </div>`;s=`<div class="chat-layout">
      <div class="chat-user-list">
        <div class="users-search-wrap" style="margin-bottom:10px">
          <svg class="search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input class="inp" id="chatSearchInput" placeholder="Search users…" value="${d.chatSearch||""}" oninput="A.setChatSearch(this.value)" autocomplete="off" autocorrect="off" spellcheck="false">
          <button class="users-search-clear" id="chatSearchClear" onclick="A.setChatSearch('')" title="Clear" style="display:${d.chatSearch?"flex":"none"};align-items:center"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>
        <div class="chat-user-list-inner" id="chatUserListInner">${y}</div>
      </div>
      <div class="chat-convo">${x}</div>
    </div>`}let i="";if(n==="global"){const c=d.globalChatMessages||[],u=((r=d.user)==null?void 0:r.uid)||"",p={1:"L1",2:"L2",3:"L3",4:"L4",5:"Super"},m=c.length?c.map(g=>{const _=g.from===u,y=g.level||1,x=`<span class="gchat-level-badge gchat-lvl-${y>4?5:y}">${p[y]||"L1"}</span>`;return`<div class="gchat-msg${_?" gchat-mine":""}">
            <div class="gchat-meta">${x} <span class="gchat-name">${g.fromName||"Admin"}</span><span class="gchat-time">${e(g.at)}</span></div>
            <div class="gchat-bubble">${g.text.replace(/</g,"&lt;")}</div>
          </div>`}).join(""):'<div class="gchat-empty"><div class="gchat-empty-icon">💬</div><div>No messages yet</div><div style="font-size:.75rem;margin-top:4px;opacity:.6">Be the first to say something to the team</div></div>';i=`<div class="gchat-layout">
      <div class="gchat-header">
        <div class="gchat-header-info">
          <div class="gchat-header-title">Admin Team Chat</div>
          <div class="gchat-header-sub">Visible to all admins &amp; sub-admins · ${d.allUsers.filter(g=>g.role==="subadmin"||g.email===xt).length+1} members</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="A.refreshGlobalChat()">Refresh</button>
      </div>
      <div class="gchat-messages" id="globalChatMessages">${m}</div>
      <div class="gchat-input-row">
        <div class="gchat-my-av">${(((o=d.user)==null?void 0:o.displayName)||((l=d.user)==null?void 0:l.email)||"A")[0].toUpperCase()}</div>
        <input class="inp gchat-inp" id="globalChatField" placeholder="Message all admins…"
          value="${(d.globalChatInput||"").replace(/"/g,"&quot;")}"
          oninput="A.setGlobalChatInput(this.value)"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();A.sendGlobalChat()}">
        <button class="btn btn-red gchat-send-btn" onclick="A.sendGlobalChat()">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>`}return`<div class="apanel vis">
    <div class="ap-header" style="margin-bottom:0">
      <div><div class="ap-title">Chat</div><div class="ap-sub">Message users or coordinate with your admin team</div></div>
    </div>
    ${t}
    ${s}${i}
  </div>`}function JT(){if(d.aTab!=="activity")return'<div class="apanel"></div>';const n=d.activityLog||[],e=d.actLogFilter||"all",t=[{id:"all",lbl:"All"},{id:"subscription",lbl:"Subscriptions"},{id:"credits",lbl:"Credits"},{id:"block",lbl:"Blocks"},{id:"admin",lbl:"Admin roles"}],s=e==="all"?n:n.filter(u=>u.type===e||e==="block"&&(u.type==="block"||u.type==="unblock"));function i(u){return u?(u.seconds?new Date(u.seconds*1e3):new Date(u)).toLocaleString([],{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):""}function r(u){return u==="subscription"?'<span style="color:#F2A623">★</span>':u==="credits"?'<span style="color:#1D9E75">◈</span>':u==="block"?'<span style="color:#E24B4A">⊘</span>':u==="unblock"?'<span style="color:#639922">✓</span>':u==="admin"?'<span style="color:#7F77DD">⬡</span>':'<span style="color:var(--txt3)">•</span>'}function o(u){const p={subscription:"act-tag-sub",credits:"act-tag-credits",block:"act-tag-block",unblock:"act-tag-unblock",admin:"act-tag-admin"},m={subscription:"Sub",credits:"Credits",block:"Block",unblock:"Unblock",admin:"Admin"};return`<span class="act-tag ${p[u]||"act-tag-other"}">${m[u]||u}</span>`}const l=t.map(u=>`<button class="uf-pill${e===u.id?" act":""}" onclick="A.actLogFilter('${u.id}')">${u.lbl}</button>`).join(""),c=s.length?s.map(u=>`
      <div class="act-row">
        <div class="act-icon">${r(u.type)}</div>
        <div class="act-body">
          <div class="act-action">${o(u.type)} ${u.action||"—"}</div>
          <div class="act-meta">
            <span class="act-target" title="${u.targetUid||""}">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
              ${u.targetName||u.targetUid||"Unknown user"}
            </span>
            <span class="act-sep">·</span>
            <span class="act-by" title="${u.byEmail||""}">
              <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              by ${u.byName||u.byEmail||"Admin"}
            </span>
            ${u.reason?`<span class="act-sep">·</span><span class="act-reason">"${u.reason}"</span>`:""}
            ${u.amount!=null?`<span class="act-sep">·</span><span class="act-amount" style="color:${u.amount>0?"var(--jade)":"var(--red)"}">${u.amount>0?"+":""}${u.amount} credits</span>`:""}
            ${u.from&&u.to?`<span class="act-sep">·</span><span class="act-change">${u.from} → ${u.to}</span>`:""}
          </div>
        </div>
        <div class="act-time">${i(u.at)}</div>
      </div>`).join(""):`<div class="empty" style="padding:48px 0">
        <p class="empty-txt">${n.length===0?"No activity yet. Actions like giving Premium or awarding credits will appear here.":"No entries match this filter."}</p>
      </div>`;return`<div class="apanel vis">
    <div class="ap-header">
      <div><div class="ap-title">Activity Log</div><div class="ap-sub">${n.length} total actions recorded</div></div>
      <button class="btn btn-outline btn-sm" onclick="A.loadActivityLog()">Refresh</button>
    </div>
    <div class="users-filter-row" style="margin-bottom:16px">${l}</div>
    <div class="act-list">${c}</div>
  </div>`}function ht(){d.aTab==="trending"&&ap("trendList",".trend-item",d.tmpTrending,n=>{d.tmpTrending=n,de()},{idAttr:"data-id",idxAttr:"data-i"}),d.aTab==="sections"&&ap("secEditorList",".sec-editor-row",d.tmpSectionConfigs,n=>{d.tmpSectionConfigs=n,d.expandedSection=-1,de()},{idxAttr:"data-i"})}function XT(){if(!d.showPromo)return"";const n=d.promoConfig||{},{title:e="Unlock Unlimited Drama",subtitle:t="Start your Premium trial today",body:s="Get all episodes, exclusive content and HD quality — ad-free.",badge:i="Limited Offer",ctaLabel:r="Get Premium",ctaAction:o="subscribe",ctaUrl:l="",secondaryLabel:c="Maybe later",style:u="gradient",accentColor:p="#e5253f",imageUrl:m=""}=n;let g;o==="subscribe"?g="A.closePromo();A.nav('subscribe')":o==="credits"?g="A.closePromo();A.nav('credits')":o==="url"&&l?g="A.closePromo();window.open('"+l+"','_blank','noopener')":g="A.closePromo();A.nav('subscribe')";const _=u==="gradient",y=ZT(p)||"229,37,63",x=m?"background-image:url("+m+");background-size:cover;background-position:center":_?"background:linear-gradient(145deg,rgba("+y+",.18) 0%,rgba(10,10,18,1) 60%)":"background:var(--deep)";return`<div class="promo-overlay" onclick="event.target.classList.contains('promo-overlay')&&A.closePromo()"><div class="promo-box promo-`+u+'" style="'+x+'">'+(_?'<div class="promo-glow" style="background:radial-gradient(circle,rgba('+y+',.35) 0%,transparent 70%)"></div>':"")+(m?'<div class="promo-img-overlay"></div>':"")+'<button class="promo-close icon-btn" onclick="A.closePromo()" aria-label="Close"><span class="icon icon-close icon-txt2"></span></button><div class="promo-body">'+(i?'<div class="promo-badge" style="background:rgba('+y+",.2);border-color:rgba("+y+",.4);color:"+p+'">'+i+"</div>":"")+'<h2 class="promo-title">'+e+"</h2>"+(t?'<p class="promo-subtitle">'+t+"</p>":"")+(s?'<p class="promo-body-txt">'+s+"</p>":"")+(_?'<div class="promo-pills"><span class="promo-pill">All episodes</span><span class="promo-pill">HD quality</span><span class="promo-pill">Exclusive content</span><span class="promo-pill">Ad-free</span></div>':"")+'<button class="promo-cta" style="background:'+p+'" onclick="'+g+'">'+r+'</button><button class="promo-secondary" onclick="A.closePromo()">'+c+"</button></div></div></div>"}function ZT(n){if(!n||!n.startsWith("#"))return null;const e=parseInt(n.slice(1,3),16),t=parseInt(n.slice(3,5),16),s=parseInt(n.slice(5,7),16);return isNaN(e)?null:e+","+t+","+s}function lu(n){const e=document.documentElement,t=n==="dark"||n==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches;e.setAttribute("data-theme",n||"system"),e.classList.toggle("theme-light",!t),localStorage.setItem("dfTheme",n||"system")}lu(localStorage.getItem("dfTheme")||"system");window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{(localStorage.getItem("dfTheme")||"system")==="system"&&lu("system")});nf(xn,async n=>{if(n){d.user=n,await Fe(W(F,"users",n.uid),{email:n.email,displayName:n.displayName||"",online:!0,lastSeen:ue()},{merge:!0}),await Qg(n.uid);const e=await ct(W(F,"users",n.uid)),t=e.exists()?e.data():{},s=t.role||"user",i=t.adminLevel||0;d.isAdmin=n.email===xt||s==="subadmin",d.isSuperAdmin=n.email===xt||i>=4,d.userRole=s,d.adminLevel=n.email===xt?5:i,ya(),await Tv(n.uid),au(),Do(),Iv(),await Gl(),Wl()}else d.user&&Fe(W(F,"users",d.user.uid),{online:!1,lastSeen:ue()},{merge:!0}).catch(()=>{}),Object.assign(d,{user:null,isAdmin:!1,isSuperAdmin:!1,userRole:"user",adminLevel:0,userBlocked:!1,myList:[],watchHistory:{},liked:[],sub:"free",ratings:{},notifications:[],page:"home",pc:null,pEp:0,pPaywall:null,pShowLib:!1,pShowComments:!1,pComments:[],showPromo:!1,userChatMessages:[],userChatUnread:!1,showUserChat:!1,userChatInput:""}),Gl().then(Wl);j()});window.addEventListener("beforeunload",()=>{d.user&&Fe(W(F,"users",d.user.uid),{online:!1,lastSeen:ue()},{merge:!0}).catch(()=>{})});setInterval(()=>{d.user&&ya()},3e4);function eA(){return`<div class="skel-page">
    <div class="skel-hero"></div>
    <div class="skel-section">
      <div class="skel-title"></div>
      <div class="skel-row">
        ${Array(5).fill('<div class="skel-card"></div>').join("")}
      </div>
    </div>
    <div class="skel-section">
      <div class="skel-title"></div>
      <div class="skel-row">
        ${Array(5).fill('<div class="skel-card"></div>').join("")}
      </div>
    </div>
  </div>`}function tA(){return d.appError?`<div class="app-error-banner" role="alert">
    <span class="app-error-msg">${d.appError}</span>
    <button class="app-error-retry" onclick="A.retryLoad()">Retry</button>
    <button class="app-error-close" onclick="A.dismissError()" aria-label="Dismiss">✕</button>
  </div>`:""}function nA(){return d.isOffline?'<div class="offline-badge" role="status" aria-live="polite">Offline</div>':""}function j(){if(d.page==="admin"&&d.aTab==="content"&&(d.aShowForm||d._formSaving)&&document.getElementById("cForm")){sA();return}const n=document.getElementById("preloader");n&&!n.classList.contains("hidden")&&n.classList.add("hidden");const e=document.getElementById("app");if(!e)return;if(d.appLoading&&!d.content.length){e.innerHTML=`
      ${ep()}
      <nav id="nav">${Xh()}</nav>
      <main id="wrap">${eA()}</main>
      <nav id="bnav">${Zh()}</nav>
    `,tp();return}if(d.adPlaying){e.innerHTML=Lv(),rT();return}else dn();if(d.pc){e.innerHTML=aT(),ln();return}const t=d.userBlocked?'<div class="blocked-banner">Your account is blocked. Contact support.</div>':"";let s="";switch(d.page){case"home":s=t+ol();break;case"search":s=t+bT();break;case"library":s=t+wT();break;case"mylist":s=t+IT();break;case"profile":s=TT();break;case"subscribe":s=ST();break;case"credits":s=CT();break;case"detail":s=LT();break;case"admin":s=d.isAdmin?qT():ol();break;default:s=t+ol()}e.innerHTML=`
    ${tA()}
    ${nA()}
    ${ep()}
    <nav id="nav" role="navigation" aria-label="Main navigation">${Xh()}</nav>
    <main id="wrap" role="main" tabindex="-1">${s}</main>
    <nav id="bnav" role="navigation" aria-label="Bottom navigation">${Zh()}</nav>
    ${tT()}
    ${XT()}
  `,tp(),d.page==="admin"&&setTimeout(ht,60)}const Ai=40;function Si(n=!1){var _,y,x,C;const e=document.getElementById("genreBar"),t=document.getElementById("sortRow"),s=document.getElementById("searchGrid"),i=document.getElementById("searchCount");if(!s&&!e){j();return}const r=d.content.filter(L=>!L.hidden),o=[...new Set(r.map(L=>L.genre).filter(Boolean))].sort();if(e){const L=document.createElement("button");L.className="gpill"+((_=d.sGenres)!=null&&_.length?"":" act"),L.setAttribute("aria-pressed",(!((y=d.sGenres)!=null&&y.length)).toString()),L.textContent="All",L.onclick=()=>A.clearGenres(),e.innerHTML="",e.appendChild(L),o.forEach(T=>{var $,G;const V=document.createElement("button");V.className="gpill"+(($=d.sGenres)!=null&&$.includes(T)?" act":""),V.setAttribute("aria-pressed",(!!((G=d.sGenres)!=null&&G.includes(T))).toString()),V.textContent=T,V.onclick=()=>A.toggleGenre(T),e.appendChild(V)})}if(t){const L=[{id:"popular",lbl:"Popular"},{id:"newest",lbl:"Newest"},{id:"liked",lbl:"Most Liked"},{id:"rated",lbl:"Top Rated"}],T=d.sSort||"popular";t.innerHTML="",L.forEach(V=>{const $=document.createElement("button");$.className="sort-pill"+(T===V.id?" act":""),$.setAttribute("aria-pressed",(T===V.id).toString()),$.textContent=V.lbl,$.onclick=()=>A.setSort(V.id),t.appendChild($)})}let l=r;if((x=d.sGenres)!=null&&x.length&&(l=l.filter(L=>d.sGenres.includes(L.genre))),d.sq){const L=d.sq.toLowerCase();l=l.filter(T=>T.title.toLowerCase().includes(L)||(T.genre||"").toLowerCase().includes(L)||(T.description||"").toLowerCase().includes(L))}const c=d.sSort||"popular";c==="popular"?l.sort((L,T)=>(T.views||0)-(L.views||0)):c==="newest"?l.sort((L,T)=>{var V,$;return(((V=T.createdAt)==null?void 0:V.seconds)||0)-((($=L.createdAt)==null?void 0:$.seconds)||0)}):c==="liked"?l.sort((L,T)=>(T.likes||0)-(L.likes||0)):c==="rated"&&l.sort((L,T)=>(T.ratingSum&&T.ratingCount?T.ratingSum/T.ratingCount:0)-(L.ratingSum&&L.ratingCount?L.ratingSum/L.ratingCount:0));const u=d.searchPage||0,p=l.length,m=l.slice(0,(u+1)*Ai),g=m.length<p;if(i&&(i.innerHTML=p+" result"+(p!==1?"s":"")+(d.sq?" for <strong>"+d.sq+"</strong>":"")+((C=d.sGenres)!=null&&C.length?" in <strong>"+d.sGenres.join(", ")+"</strong>":"")+(p>Ai?' <span style="color:var(--txt4);font-size:.75rem">(showing '+m.length+")</span>":""),i.setAttribute("aria-live","polite")),s)if(m.length)Ft(async()=>{const{cardHTML:L}=await Promise.resolve().then(()=>_T);return{cardHTML:L}},void 0).then(({cardHTML:L})=>{if(n){const V=l.slice(u*Ai,(u+1)*Ai);s.insertAdjacentHTML("beforeend",V.map($=>L($)).join(""))}else s.innerHTML=m.map(V=>L(V)).join("");let T=document.getElementById("searchLoadMore");T||(T=document.createElement("div"),T.id="searchLoadMore",T.style.cssText="text-align:center;padding:20px 0 8px;grid-column:1/-1",s.after(T)),T.innerHTML=g?'<button class="btn btn-outline" onclick="A.loadMoreSearch()">Load '+Math.min(Ai,p-m.length)+" more ("+(p-m.length)+" remaining)</button>":""});else{s.innerHTML='<div class="empty" role="status"><p class="empty-txt">No results found</p><button class="btn btn-outline btn-sm gap-t" onclick="A.clearGenres()">Clear filters</button></div>';const L=document.getElementById("searchLoadMore");L&&(L.innerHTML="")}}function sA(){const n=document.querySelector(".tbl-wrap tbody");if(!n)return;const e=d.content.map(t=>`<tr>
    <td><img src="${t.thumbnail}" class="tthumb"></td>
    <td style="font-weight:700">${t.title}</td>
    <td>${t.genre}</td><td>${t.episodes}</td>
    <td style="color:var(--txt2)">${t.section||"—"}</td>
    <td style="color:var(--txt3)">${t.views||0}</td>
    <td><span class="badge ${t.hidden?"b-hid":"b-vis"}">${t.hidden?"Hidden":"Visible"}</span></td>
    <td><div class="tact">
      <button class="tbtn" onclick="A.editContent('${t.id}')">Edit</button>
      <button class="tbtn tbtn-vis" onclick="A.toggleHide('${t.id}',${!t.hidden})">${t.hidden?"Show":"Hide"}</button>
      <button class="tbtn tbtn-del" onclick="A.deleteContent('${t.id}')">🗑</button>
      <button class="tbtn tbtn-notif" onclick="A.sendNotif('${t.id}','')" title="Notify users who saved this"></button>
    </div></td>
  </tr>`).join("");n.innerHTML=e}function iA(){const n=document.getElementById("uc2ListWrap"),e=document.getElementById("usersSearchCount"),t=document.getElementById("usersSearchClear");if(!n){j();return}const s=(d.usersSearch||"").toLowerCase();let i=[...d.allUsers];if(s&&(i=i.filter(r=>(r.displayName||"").toLowerCase().includes(s)||(r.email||"").toLowerCase().includes(s))),d.userFilter==="online"&&(i=i.filter(r=>r.online)),d.userFilter==="blocked"&&(i=i.filter(r=>r.blocked)),d.userFilter==="admin"&&(i=i.filter(r=>r.role==="subadmin")),d.userFilter==="premium"&&(i=i.filter(r=>r.subscription==="premium")),d.userFilter==="standard"&&(i=i.filter(r=>r.subscription==="standard")),d.userFilter==="free"&&(i=i.filter(r=>!r.subscription||r.subscription==="free")),e&&(e.textContent=i.length+" of "+d.allUsers.length),t&&(t.style.display=s?"flex":"none",t.style.alignItems="center"),!i.length){n.innerHTML='<div class="empty" style="padding:40px 0"><p class="empty-txt">'+(d.allUsers.length===0?"Click Refresh to load users":"No users match this search")+"</p></div>";return}n.innerHTML=i.map(r=>{const o=r.subscription||"free",l=!!r.blocked,c=r.role==="subadmin",u=r.email===(window.__dfAdminEmail||""),p=(r.displayName||r.email||"U")[0].toUpperCase(),m=d.expandedUserId===r.id,g=r.online?'<span class="uc2-dot uc2-dot-on"></span>':'<span class="uc2-dot uc2-dot-off"></span>',_=u?'<span class="uc2-role uc2-role-sa">Super Admin</span>':c?'<span class="uc2-role uc2-role-l'+(r.adminLevel||1)+'">L'+(r.adminLevel||1)+" Admin</span>":'<span class="uc2-role uc2-role-user">User</span>',y='<span class="uc2-plan uc2-plan-'+o+'">'+o+"</span>",x=l?'<span class="uc2-role uc2-role-blocked">Blocked</span>':"";return'<div class="uc2'+(l?" uc2-blocked":"")+(u?" uc2-sa":c?" uc2-admin":"")+'"><div class="uc2-header" data-uid="'+r.id+'" onclick="A.toggleUserExpand(this.dataset.uid)"><div class="uc2-av'+(u?" uc2-av-sa":c?" uc2-av-admin":"")+(l?" uc2-av-blocked":"")+'">'+p+'<span class="uc2-dot-wrap">'+g+'</span></div><div class="uc2-info"><div class="uc2-name">'+(r.displayName||"(no name)")+'</div><div class="uc2-email">'+(r.email||"")+'</div><div class="uc2-tags">'+_+y+x+'</div></div><div class="uc2-chevron'+(m?" open":"")+'"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 9l6 6 6-6"/></svg></div></div>'+(m?'<div class="uc2-expand open"><div class="uc2-note" style="padding:8px 0">Expand requires page refresh — click the expand button again after searching.</div></div>':"")+"</div>"}).join("")}function rA(){const n=document.getElementById("chatUserListInner"),e=document.getElementById("chatSearchClear");if(!n){j();return}const t=(d.chatSearch||"").toLowerCase();let s=[...d.allUsers].filter(r=>r.email!==window.__dfAdminEmail);if(t&&(s=s.filter(r=>(r.displayName||"").toLowerCase().includes(t)||(r.email||"").toLowerCase().includes(t))),e&&(e.style.display=t?"flex":"none",e.style.alignItems="center"),!s.length){n.innerHTML='<div class="chat-empty-list">No users found</div>';return}const i=d.chatUid;n.innerHTML=s.map(r=>{const o=r.id===i,l=(r.displayName||r.email||"?")[0].toUpperCase(),c=r.online?'<span class="chat-online-dot"></span>':"";return`<div class="chat-user-row${o?" act":""}" onclick="A.openChat('${r.id}')"><div class="chat-av">${l}${c}</div><div class="chat-user-info"><div class="chat-user-name">${r.displayName||r.email||r.id}</div><div class="chat-user-email">${r.email||""}</div></div></div>`}).join("")}window.A={nav:n=>{d.page=n,d.detailId=null,d.pShowNotifs=!1,n==="admin"&&d.aTab==="users"&&Cs(),lA({}),j()},openAuth:n=>Et(n||"login"),doLogout:()=>Gg(),play:(n,e)=>ji(n,e??0).then(t=>{t==="auth"&&Et()}),closePlayer:()=>{pT(),d._countdownInterval&&(clearInterval(d._countdownInterval),d._countdownInterval=null),dn(),z({pc:null,pEp:0,pPaywall:null,pCountdownActive:!1,pShowLib:!1,pShowComments:!1,pComments:[],pShowRating:!1,adPlaying:!1,adContext:null,adCompleted:!1})},watchAd:(n,e)=>{if(!d.user){Et();return}vv(n,e)},skipAd:()=>_v(),cancelAd:()=>wv(),dismissAd:()=>yv(),startPageAd:()=>{if(!d.user){Et();return}zl()==="auth"&&Et()},cancelPageAd:()=>{dn(),z({adPlaying:!1,adContext:null,adCompleted:!1,adTimeLeft:30,adCanSkip:!1})},dismissPageAd:()=>{dn(),z({adPlaying:!1,adContext:null,adCompleted:!1,adTimeLeft:30,adCanSkip:!1})},watchAnotherAd:()=>{dn(),z({adCompleted:!1,adTimeLeft:30,adCanSkip:!1}),zl()},completeTask:async(n,e)=>{if(!d.user){Et();return}if(e){window.open(e,"_blank","noopener"),setTimeout(async()=>{await ql(n)==="success"&&j()},1500);return}const t=await ql(n);(t==="success"||t==="already_done")&&j()},saveTasksConfig:async()=>{const n=[document.getElementById("saveTasksBtnTop"),...document.querySelectorAll(".tasks-save-bar .btn-red")];n.forEach(t=>{t&&(t.textContent="Saving…",t.disabled=!0)});const e=ls().map((t,s)=>{var _,y,x,C,L,T,V,$,G,Q,w,b,I,S;const i=((y=(_=document.getElementById("tIcon"+s))==null?void 0:_.value)==null?void 0:y.trim())||t.icon,r=((C=(x=document.getElementById("tTitle"+s))==null?void 0:x.value)==null?void 0:C.trim())||t.title,o=((T=(L=document.getElementById("tDesc"+s))==null?void 0:L.value)==null?void 0:T.trim())||t.desc,l=($=(V=document.getElementById("tUrl"+s))==null?void 0:V.value)==null?void 0:$.trim(),c=parseInt((G=document.getElementById("tCooldown"+s))==null?void 0:G.value),u=parseInt((Q=document.getElementById("tMaxStreak"+s))==null?void 0:Q.value),p=parseInt((w=document.getElementById("tBonusDay"+s))==null?void 0:w.value),m=parseInt((b=document.getElementById("tBonusCredits"+s))==null?void 0:b.value),g={...t,icon:i,title:r,desc:o};if(t.type==="streak"){const k=parseInt((I=document.getElementById("tCredits"+s))==null?void 0:I.value);isNaN(k)||(g.creditsPerDay=k),isNaN(u)||(g.maxStreak=u),isNaN(p)||(g.streakBonusDay=p),isNaN(m)||(g.streakBonusCredits=m)}else{const k=parseInt((S=document.getElementById("tCredits"+s))==null?void 0:S.value);isNaN(k)||(g.creditsEarned=k)}return l!==void 0&&t.type==="social"&&(g.url=l),isNaN(c)||(g.cooldownMinutes=c),g});await jl(e),n.forEach(t=>{t&&(t.textContent="Save Changes",t.disabled=!1)}),oA(),j()},resetTasksConfig:async()=>{confirm("Reset all tasks to default settings?")&&(await jl(_a),j())},toggleTask:n=>{const e=ls().map(r=>({...r}));e[n].enabled=!e[n].enabled,d.tasksConfig=e;const t=document.getElementById("taskTrack"+n);t&&t.classList.toggle("excl-on",e[n].enabled);const s=document.getElementById("taskRow"+n),i=s==null?void 0:s.querySelector(".task-status-lbl");i&&(i.textContent=e[n].enabled?"Enabled":"Disabled"),Vv()},useCredit:async(n,e)=>{var m;if(!d.user){Et();return}if((d.adCredits||0)<=0){Z("No credits left — watch an ad first!");return}const{updateDoc:t,doc:s,increment:i,arrayUnion:r}=await Ft(async()=>{const{updateDoc:g,doc:_,increment:y,arrayUnion:x}=await Promise.resolve().then(()=>Kh);return{updateDoc:g,doc:_,increment:y,arrayUnion:x}},void 0),{db:o}=await Ft(async()=>{const{db:g}=await Promise.resolve().then(()=>Wh);return{db:g}},void 0),l=Math.max(0,(d.adCredits||0)-1),c=((m=d.adCreditsUsed)==null?void 0:m[n])||[],u=c.includes(e)?c:[...c,e],p={...d.adCreditsUsed,[n]:u};z({adCredits:l,adCreditsUsed:p,pPaywall:null}),t(s(o,"users",d.user.uid),{adCredits:l,[`adCreditsUsed.${n}`]:u}).catch(()=>{}),Z("✓ Credit used! Playing EP "+(e+1),2e3),setTimeout(()=>ji(n,e),500)},openDetail:(n,e)=>{z({detailId:n,detailFrom:e||d.page,page:"detail"});const t=new URL(window.location);t.searchParams.set("watch",n),window.history.pushState({},"",t)},navBack:()=>{const n=new URL(window.location);n.searchParams.delete("watch"),window.history.pushState({},"",n),z({page:d.detailFrom||"home",detailId:null})},rateDrama:async(n,e)=>{const{actRateContent:t}=await Ft(async()=>{const{actRateContent:s}=await Promise.resolve().then(()=>Jh);return{actRateContent:s}},void 0);await t(n,e),j()},rateFromDetail:async(n,e)=>{await su(n,e),j()},toggleList:n=>Jg(n).then(e=>{e==="auth"&&Et()}),toggleLike:n=>Xg(n).then(e=>{e==="auth"&&Et()}),openLib:()=>{d.pShowLib=!0,j(),ln()},closeLib:()=>{d.pShowLib=!1,j(),ln()},openComments:()=>{d.pShowComments=!0,j(),ln()},closeComments:()=>{d.pShowComments=!1,j(),ln()},jumpEp:n=>{d.pShowLib=!1,j(),ln(),requestAnimationFrame(()=>{const e=document.getElementById("epFeed");e&&e.scrollTo({top:n*e.clientHeight,behavior:"smooth"})})},postComment:n=>{var i;const e=document.getElementById("cInp"),t=document.getElementById("cSubmitBtn"),s=(i=e==null?void 0:e.value)==null?void 0:i.trim();s&&(t&&(t.textContent="…",t.disabled=!0),e&&(e.disabled=!0),Zg(n,s).then(()=>{e&&(e.value="",e.disabled=!1,e.focus()),t&&(t.textContent="Post",t.disabled=!1),j(),ln(),requestAnimationFrame(()=>{const r=document.getElementById("commentsList");r&&(r.scrollTop=0)})}))},deleteComment:async n=>{const{actDeleteComment:e}=await Ft(async()=>{const{actDeleteComment:t}=await Promise.resolve().then(()=>Jh);return{actDeleteComment:t}},void 0);await e(n),j(),ln()},search:n=>{d.sq=n,d.searchPage=0,clearTimeout(window._searchDebounce),window._searchDebounce=setTimeout(()=>Si(),180)},loadMoreSearch:()=>{d.searchPage=(d.searchPage||0)+1,Si(!0)},genre:n=>{d.sg=n,j()},toggleGenre:n=>{const e=d.sGenres||[];d.sGenres=e.includes(n)?e.filter(t=>t!==n):[...e,n],d.searchPage=0,Si()},clearGenres:()=>{d.sGenres=[],d.sq="",d.searchPage=0;const n=document.getElementById("sq");n&&(n.value=""),Si()},setSort:n=>{d.sSort=n,d.searchPage=0,Si()},openNotifs:async()=>{d.pShowNotifs=!0,j(),await ya(),j(),Ul()},closeNotifs:()=>{d.pShowNotifs=!1,j()},markNotifsRead:()=>Ul(),notifClick:n=>{d.pShowNotifs=!1,ji(n,0).then(e=>{e==="auth"&&Et()})},sendNotif:(n,e)=>gv(n,e),closePromo:()=>z({showPromo:!1}),setTheme:n=>{lu(n),j()},getTheme:()=>localStorage.getItem("dfTheme")||"system",previewPromo:()=>{Cv()},savePromoConfig:async()=>{var s,i,r,o,l,c,u,p,m,g,_,y,x,C,L,T,V,$,G,Q,w,b,I;const n=document.getElementById("savePromoBtnTop");n&&(n.textContent="Saving…",n.disabled=!0);const e={enabled:((s=d.promoConfig)==null?void 0:s.enabled)??!0,title:((r=(i=document.getElementById("promoTitle"))==null?void 0:i.value)==null?void 0:r.trim())||pe.title,subtitle:((l=(o=document.getElementById("promoSubtitle"))==null?void 0:o.value)==null?void 0:l.trim())||"",body:((u=(c=document.getElementById("promoBody"))==null?void 0:c.value)==null?void 0:u.trim())||"",badge:((m=(p=document.getElementById("promoBadge"))==null?void 0:p.value)==null?void 0:m.trim())||"",ctaLabel:((_=(g=document.getElementById("promoCtaLabel"))==null?void 0:g.value)==null?void 0:_.trim())||pe.ctaLabel,ctaAction:((y=document.getElementById("promoCtaAction"))==null?void 0:y.value)||"subscribe",ctaUrl:((C=(x=document.getElementById("promoCtaUrl"))==null?void 0:x.value)==null?void 0:C.trim())||"",secondaryLabel:((T=(L=document.getElementById("promoSecondary"))==null?void 0:L.value)==null?void 0:T.trim())||pe.secondaryLabel,showTo:((V=document.getElementById("promoShowTo"))==null?void 0:V.value)||"free",delaySeconds:parseInt(($=document.getElementById("promoDelay"))==null?void 0:$.value)||3,frequencyHours:(()=>{var P;const S=(P=document.getElementById("promoFrequency"))==null?void 0:P.value,k=parseInt(S);return isNaN(k)?24:k})(),style:((G=document.getElementById("promoStyle"))==null?void 0:G.value)||"gradient",accentColor:((Q=document.getElementById("promoAccent"))==null?void 0:Q.value)||pe.accentColor,imageUrl:((b=(w=document.getElementById("promoImageUrl"))==null?void 0:w.value)==null?void 0:b.trim())||""};await Hl(e),n&&(n.textContent="Save Changes",n.disabled=!1);const t="dfPromoShown_"+(((I=d.user)==null?void 0:I.uid)||"guest");localStorage.removeItem(t),Z("Promo saved. Preview it with the Preview button."),j()},resetPromoConfig:async()=>{var e;if(!confirm("Reset promo to default settings?"))return;await Hl(pe);const n="dfPromoShown_"+(((e=d.user)==null?void 0:e.uid)||"guest");localStorage.removeItem(n),j()},setPromoFreq:n=>{const e=document.getElementById("promoFrequency");e&&(e.value=String(n)),document.querySelectorAll(".freq-btn").forEach(s=>s.classList.remove("act"));const t=document.getElementById("fq"+n);t&&t.classList.add("act")},togglePromoEnabled:()=>{var t;const n=((t=d.promoConfig)==null?void 0:t.enabled)??!0;d.promoConfig={...d.promoConfig||pe,enabled:!n};const e=document.getElementById("promoEnabledTrack");e&&e.classList.toggle("excl-on",!n),de()},notifAudienceChange:n=>{d.notifAudience=n,j()},sendNotification:async()=>{var l,c,u,p,m,g,_,y;const n=(c=(l=document.getElementById("notifTitle"))==null?void 0:l.value)==null?void 0:c.trim(),e=(p=(u=document.getElementById("notifMessage"))==null?void 0:u.value)==null?void 0:p.trim(),t=((g=(m=document.getElementById("notifThumb"))==null?void 0:m.value)==null?void 0:g.trim())||"",s=((_=document.getElementById("notifAudience"))==null?void 0:_.value)||"all",i=((y=document.getElementById("notifDrama"))==null?void 0:y.value)||"";if(!n||!e){Z("Title and message are required");return}const r=document.getElementById("notifSendBtn");r&&(r.textContent="Sending…",r.disabled=!0);const o=await Ql({title:n,message:e,thumbnail:t,audience:s,dramaId:i});if(r&&(r.textContent="Send Notification",r.disabled=!1),o>0){const x=document.getElementById("notifTitle");x&&(x.value="");const C=document.getElementById("notifMessage");C&&(C.value="");const L=document.getElementById("notifThumb");L&&(L.value=""),oo()}},quickNotify:async n=>{const e=d.content.find(s=>s.id===n);if(!e)return;const t='New update for "'+e.title+'"!';await Ql({title:e.title,message:t,thumbnail:e.thumbnail,audience:"saved_drama",dramaId:n}),oo()},loadNotifHistory:()=>oo(),updateNotifPreview:()=>{var r,o;const n=((r=document.getElementById("notifTitle"))==null?void 0:r.value)||"Notification title",e=((o=document.getElementById("notifMessage"))==null?void 0:o.value)||"Your message will appear here…",t=document.getElementById("notifPreviewTitle");t&&(t.textContent=n);const s=document.getElementById("notifPreviewMsg");s&&(s.textContent=e);const i=document.getElementById("notifCharCount");i&&(i.textContent=e.length+" / 300")},adminTab:n=>{d.aTab=n,n==="users"&&Cs(),n==="tasks"&&au(),n==="analytics"&&Cs(),n==="chat"&&(d.userSearch="",d.globalChatTab=d.globalChatTab||"direct",Cs(),d.chatUid&&ao(d.chatUid),Vi()),n==="activity"&&Yl(),j(),setTimeout(ht,60)},toggleForm:()=>{d.aShowForm=!d.aShowForm,d.aEditId=null,j()},cancelForm:()=>{d.aShowForm=!1,d.aEditId=null,j()},editContent:n=>{d.aEditId=n,d.aShowForm=!0,j(),setTimeout(()=>{var e;return(e=document.getElementById("cForm"))==null?void 0:e.scrollIntoView({behavior:"smooth"})},60)},toggleHide:(n,e)=>iv(n,e),deleteContent:n=>sv(n),setBanner:n=>rv(n),addTrend:n=>{if(d.tmpTrending.length>=10){alert("Max 10");return}d.tmpTrending=[...d.tmpTrending,n],j(),setTimeout(ht,60)},rmTrend:n=>{d.tmpTrending=d.tmpTrending.filter(e=>e!==n),j(),setTimeout(ht,60)},saveTrending:()=>ov(),toggleSecExpand:n=>{const e=document.getElementById("secName"+d.expandedSection);e&&d.tmpSectionConfigs[d.expandedSection]&&(d.tmpSectionConfigs[d.expandedSection].name=e.value),d.expandedSection=d.expandedSection===n?-1:n,j(),setTimeout(ht,10)},toggleSectionHidden:n=>{const e=document.getElementById("secName"+n);e&&d.tmpSectionConfigs[n]&&(d.tmpSectionConfigs[n].name=e.value),d.tmpSectionConfigs[n].hidden=!d.tmpSectionConfigs[n].hidden,j(),setTimeout(ht,10)},secTypeChange:(n,e)=>{const t=document.getElementById("secName"+n);t&&(d.tmpSectionConfigs[n].name=t.value),d.tmpSectionConfigs[n].type=e,d.expandedSection=n,j(),setTimeout(ht,10)},pinCard:(n,e)=>{const t=document.getElementById("secName"+n);t&&(d.tmpSectionConfigs[n].name=t.value),d.tmpSectionConfigs[n].pinnedIds||(d.tmpSectionConfigs[n].pinnedIds=[]),d.tmpSectionConfigs[n].pinnedIds.includes(e)||d.tmpSectionConfigs[n].pinnedIds.push(e),d.expandedSection=n,j(),setTimeout(ht,10)},unpinCard:(n,e)=>{d.tmpSectionConfigs[n].pinnedIds=d.tmpSectionConfigs[n].pinnedIds.filter(t=>t!==e),d.expandedSection=n,j(),setTimeout(ht,10)},clearPinned:n=>{d.tmpSectionConfigs[n].pinnedIds=[],d.expandedSection=n,j(),setTimeout(ht,10)},addSecConfig:()=>{d.tmpSectionConfigs=[...d.tmpSectionConfigs,{name:"New Section",type:"content",pinnedIds:[]}],d.expandedSection=d.tmpSectionConfigs.length-1,j(),setTimeout(ht,10)},removeSecConfig:n=>{d.tmpSectionConfigs.splice(n,1),d.expandedSection=-1,j(),setTimeout(ht,10)},saveSecConfigs:async()=>{d.tmpSectionConfigs.forEach((n,e)=>{const t=document.getElementById("secName"+e);t&&(n.name=t.value||n.name)}),await av(d.tmpSectionConfigs)},updateEpFields:n=>{var i;const e=parseInt((i=document.getElementById("fE"))==null?void 0:i.value)||1,t=n?d.content.find(r=>r.id===n):null,s=document.getElementById("epUrls");s&&(s.innerHTML=Array.from({length:e},(r,o)=>`<div class="ep-url-row"><span class="ep-url-lbl">EP ${o+1}</span><input class="inp" id="eu${o}" placeholder="Video URL" value="${((t==null?void 0:t.episodeUrls)||[])[o]||""}"></div>`).join(""))},toggleExclusive:()=>{const n=document.getElementById("fExcl"),e=document.getElementById("exclusiveTrack");if(!n)return;const t=n.value==="true";n.value=t?"false":"true",e&&e.classList.toggle("excl-on",!t)},submitNew:async()=>{var u,p,m,g,_,y,x,C,L,T,V,$;const n=(p=(u=document.getElementById("fT"))==null?void 0:u.value)==null?void 0:p.trim(),e=(g=(m=document.getElementById("fG"))==null?void 0:m.value)==null?void 0:g.trim(),t=(y=(_=document.getElementById("fTh"))==null?void 0:_.value)==null?void 0:y.trim(),s=(C=(x=document.getElementById("fD"))==null?void 0:x.value)==null?void 0:C.trim(),i=(T=(L=document.getElementById("fS"))==null?void 0:L.value)==null?void 0:T.trim(),r=parseInt((V=document.getElementById("fE"))==null?void 0:V.value)||1,o=Array.from({length:r},(G,Q)=>{var w,b;return((b=(w=document.getElementById("eu"+Q))==null?void 0:w.value)==null?void 0:b.trim())||""}),l=(($=document.getElementById("fExcl"))==null?void 0:$.value)==="true";if(!n||!e){alert("Title and genre are required.");return}const c=document.querySelector("#cForm .btn-red");c&&(c.textContent="Saving…",c.disabled=!0);try{d._formSaving=!0,await tv({title:n,genre:e,thumbnail:t,description:s,section:i,episodes:r,episodeUrls:o,exclusive:l}),d._formSaving=!1,d.aShowForm=!1,j()}catch{d._formSaving=!1,c&&(c.textContent="Add Content",c.disabled=!1)}},saveEdit:async n=>{var p,m,g,_,y,x,C,L,T,V,$,G;const e=(m=(p=document.getElementById("fT"))==null?void 0:p.value)==null?void 0:m.trim(),t=(_=(g=document.getElementById("fG"))==null?void 0:g.value)==null?void 0:_.trim(),s=(x=(y=document.getElementById("fTh"))==null?void 0:y.value)==null?void 0:x.trim(),i=(L=(C=document.getElementById("fD"))==null?void 0:C.value)==null?void 0:L.trim(),r=(V=(T=document.getElementById("fS"))==null?void 0:T.value)==null?void 0:V.trim(),o=parseInt(($=document.getElementById("fE"))==null?void 0:$.value)||1,l=Array.from({length:o},(Q,w)=>{var b,I;return((I=(b=document.getElementById("eu"+w))==null?void 0:b.value)==null?void 0:I.trim())||""}),c=((G=document.getElementById("fExcl"))==null?void 0:G.value)==="true";if(!e||!t){alert("Title and genre are required.");return}const u=document.querySelector("#cForm .btn-red");u&&(u.textContent="Saving…",u.disabled=!0);try{d._formSaving=!0,await nv(n,{title:e,genre:t,thumbnail:s,description:i,section:r,episodes:o,episodeUrls:l,exclusive:c}),d._formSaving=!1,d.aShowForm=!1,d.aEditId=null,j()}catch{d._formSaving=!1,u&&(u.textContent="Save Changes",u.disabled=!1)}},loadUsers:()=>Cs(),toggleUserExpand:n=>{d.expandedUserId=d.expandedUserId===n?null:n,j()},setUserSub:(n,e)=>lv(n,e),blockUser:n=>cv(n),unblockUser:n=>uv(n),deleteUser:(n,e)=>dv(n,e),openAwardModal:(n,e,t)=>{z({awardModal:{uid:n,name:e,currentCredits:t}})},closeAwardModal:()=>{z({awardModal:null})},confirmAward:async()=>{var l,c,u;const n=(l=d.awardModal)==null?void 0:l.uid,e=(c=d.awardModal)==null?void 0:c.name;if(!n)return;const t=document.getElementById("awardAmt"),s=document.getElementById("awardReason"),i=parseInt(t==null?void 0:t.value),r=(u=s==null?void 0:s.value)==null?void 0:u.trim();if(!i||isNaN(i)){t==null||t.focus();return}const o=document.getElementById("awardConfirmBtn");o&&(o.textContent="Awarding…",o.disabled=!0),await Sv(n,e,i,r),z({awardModal:null})},appointAdmin:(n,e,t)=>hv(n,e,t||1),revokeAdmin:(n,e)=>fv(n,e),changeLevel:(n,e,t)=>pv(n,e,t),userSearch:n=>{d.userSearch=n,j()},usersSearch:n=>{d.usersSearch=n,iA()},setChatSearch:n=>{d.chatSearch=n,rA()},userFilter:n=>{d.userFilter=n,j()},setChatInput:n=>{d.chatInput=n},setChatTab:n=>{d.globalChatTab=n,n==="global"&&Vi(),j()},openChat:async n=>{d.chatUid=n,d.chatInput="",d.globalChatTab="direct",j(),await ao(n),j(),setTimeout(()=>{const e=document.getElementById("chatMessages");e&&(e.scrollTop=e.scrollHeight)},60)},closeChat:()=>{d.chatUid=null,d.chatMessages=[],j()},sendChat:async()=>{const n=d.chatUid;if(!n)return;const e=document.getElementById("chatInputField"),t=((e==null?void 0:e.value)||d.chatInput||"").trim();t&&(e&&(e.value=""),d.chatInput="",await Pv(n,t),await ao(n),j(),setTimeout(()=>{const s=document.getElementById("chatMessages");s&&(s.scrollTop=s.scrollHeight)},60))},setGlobalChatInput:n=>{d.globalChatInput=n},sendGlobalChat:async()=>{const n=document.getElementById("globalChatField"),e=((n==null?void 0:n.value)||d.globalChatInput||"").trim();e&&(n&&(n.value=""),d.globalChatInput="",await Dv(e),await Vi(),j(),setTimeout(()=>{const t=document.getElementById("globalChatMessages");t&&(t.scrollTop=t.scrollHeight)},60))},refreshGlobalChat:async()=>{await Vi(),j(),setTimeout(()=>{const n=document.getElementById("globalChatMessages");n&&(n.scrollTop=n.scrollHeight)},60)},loadActivityLog:()=>Yl().then(j),actLogFilter:n=>{d.actLogFilter=n,j()},retryLoad:()=>fa(),dismissError:()=>{d.appError=null,j()},setLibSearch:n=>{d.libSearch=n,j()},setLibGenre:n=>{d.libGenre=n,j()},setLibSort:n=>{d.libSort=n,j()},clearLibFilters:()=>{d.libSearch="",d.libGenre="",d.libSort="default",j()},openEditName:async()=>{var l;const n=((l=d.user)==null?void 0:l.displayName)||"",e=prompt("Enter your display name:",n);if(e===null)return;const t=e.trim();if(!t){Z("Name cannot be empty");return}const{updateProfile:s}=await Ft(async()=>{const{updateProfile:c}=await Promise.resolve().then(()=>jw);return{updateProfile:c}},void 0),{doc:i,updateDoc:r}=await Ft(async()=>{const{doc:c,updateDoc:u}=await Promise.resolve().then(()=>Kh);return{doc:c,updateDoc:u}},void 0),{db:o}=await Ft(async()=>{const{db:c}=await Promise.resolve().then(()=>Wh);return{db:c}},void 0);await s(d.user,{displayName:t}),await r(i(o,"users",d.user.uid),{displayName:t}),Z("Display name updated ✓"),j()},clearHistory:()=>{confirm("Clear all watch history? This cannot be undone.")&&ev()},showPlanContact:n=>{d.showPlanModal=n,j()},closePlanModal:()=>{d.showPlanModal=null,j()},copyPlanEmail:n=>{var s;const t=`Hi, I'd like to switch to the ${{free:"Free",standard:"Standard",premium:"Premium"}[n]||n} plan.
My account email: ${((s=d.user)==null?void 0:s.email)||"(not logged in)"}`;navigator.clipboard?navigator.clipboard.writeText(t).then(()=>Z("Copied to clipboard ✓")):prompt("Copy this and email admin@dramaflow.com:",t)},openUserChat:async()=>{d.showUserChat=!0,j(),await Do(),await Rv(),j(),setTimeout(()=>{const n=document.getElementById("userChatMessages");n&&(n.scrollTop=n.scrollHeight)},60)},closeUserChat:()=>{d.showUserChat=!1,j()},setUserChatInput:n=>{d.userChatInput=n},sendUserChat:async()=>{const n=document.getElementById("userChatInputField"),e=((n==null?void 0:n.value)||d.userChatInput||"").trim();e&&(n&&(n.value=""),d.userChatInput="",await xv(e),await Do(),j(),setTimeout(()=>{const t=document.getElementById("userChatMessages");t&&(t.scrollTop=t.scrollHeight)},60))}};function Vv(){const n=document.getElementById("tasksSaveBar");n&&n.classList.add("visible")}function oA(){const n=document.getElementById("tasksSaveBar");n&&n.classList.remove("visible")}function aA(){document.querySelectorAll(".task-admin-row input").forEach(n=>{n.addEventListener("input",Vv,{once:!0})})}qg(()=>{d.page==="admin"&&d.aTab==="tasks"&&setTimeout(aA,60)});qg(j);(function(){const t=new URLSearchParams(window.location.search).get("watch");t&&(d.detailId=t,d.detailFrom="home",d.page="detail")})();Wg().catch(n=>console.warn("[DramaFlow] Redirect result check failed:",n.message));window.__dfAdminEmail=xt;function Nv(){const n=!navigator.onLine;d.isOffline!==n&&(d.isOffline=n,!n&&d.appError?(window.visualViewport&&window.visualViewport.addEventListener("resize",()=>{const e=document.querySelector(".uchat-panel");if(!e)return;const s=window.visualViewport.height-16;e.style.maxHeight=s+"px"}),fa()):de(),n?Z("You're offline — showing cached content",5e3):Z("Back online ✓",2500))}window.addEventListener("online",Nv);window.addEventListener("offline",Nv);function lA(n){const e=new URL(window.location.href);e.search="",Object.entries(n).forEach(([t,s])=>s&&e.searchParams.set(t,s)),window.history.replaceState({},"",e.toString())}fa();export{W as a,ue as b,Ie as c,F as d,Xe as g,Fe as s};
