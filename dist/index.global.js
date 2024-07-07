"use strict";var Eden=(()=>{var q=Object.defineProperty;var ne=Object.getOwnPropertyDescriptor;var se=Object.getOwnPropertyNames;var ae=Object.prototype.hasOwnProperty;var ie=(e,t)=>{for(var r in t)q(e,r,{get:t[r],enumerable:!0})},oe=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of se(t))!ae.call(e,i)&&i!==r&&q(e,i,{get:()=>t[i],enumerable:!(s=ne(t,i))||s.enumerable});return e};var ce=e=>oe(q({},"__esModule",{value:!0}),e);var we={};ie(we,{edenFetch:()=>re,edenTreaty:()=>te,treaty:()=>Q});var F=class extends Error{constructor(r,s){super(s+"");this.status=r;this.value=s}};var fe=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,de=/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/,ye=/^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/,M=e=>e.trim().length!==0&&!Number.isNaN(Number(e)),V=e=>{if(typeof e!="string")return null;let t=e.replace(/"/g,"");if(fe.test(t)||de.test(t)||ye.test(t)){let r=new Date(t);if(!Number.isNaN(r.getTime()))return r}return null},ue=e=>{let t=e.charCodeAt(0),r=e.charCodeAt(e.length-1);return t===123&&r===125||t===91&&r===93},le=e=>JSON.parse(e,(t,r)=>{let s=V(r);return s||r}),K=e=>{if(!e)return e;if(M(e))return+e;if(e==="true")return!0;if(e==="false")return!1;let t=V(e);if(t)return t;if(ue(e))try{return le(e)}catch{}return e};var G=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,I=class{constructor(t){this.url=t;this.ws=new WebSocket(t)}ws;send(t){return Array.isArray(t)?(t.forEach(r=>this.send(r)),this):(this.ws.send(typeof t=="object"?JSON.stringify(t):t.toString()),this)}on(t,r,s){return this.addEventListener(t,r,s)}off(t,r,s){return this.ws.removeEventListener(t,r,s),this}subscribe(t,r){return this.addEventListener("message",t,r)}addEventListener(t,r,s){return this.ws.addEventListener(t,i=>{if(t==="message"){let n=i.data.toString(),a=n.charCodeAt(0),y=n.charCodeAt(n.length-1);if(a===91||a===123)try{n=JSON.parse(n,(L,w)=>{if(typeof w=="string"&&G.test(w)){let p=new Date(w);if(!Number.isNaN(p.getTime()))return p}return w})}catch{}else M(n)?n=+n:n==="true"?n=!0:n==="false"?n=!1:n==="null"?n=null:a===34&&y===34&&G.test(n)&&(n=new Date(n.substring(1,n.length-1)));r({...i,data:n})}else r(i)},s),this}removeEventListener(t,r,s){return this.off(t,r,s),this}close(){return this.ws.close(),this}};var pe=["get","post","put","delete","patch","options","head","connect","subscribe"],z=["localhost","127.0.0.1","0.0.0.0"],U=typeof FileList>"u",Z=e=>U?e instanceof Blob:e instanceof FileList||e instanceof File,he=e=>{if(!e)return!1;for(let t in e)if(Z(e[t])||Array.isArray(e[t])&&e[t].find(Z))return!0;return!1},J=e=>U?e:new Promise(t=>{let r=new FileReader;r.onload=()=>{let s=new File([r.result],e.name,{lastModified:e.lastModified,type:e.type});t(s)},r.readAsArrayBuffer(e)}),j=(e,t,r={},s={})=>{if(Array.isArray(e)){for(let i of e)if(!Array.isArray(i))s=j(i,t,r,s);else{let n=i[0];if(typeof n=="string")s[n.toLowerCase()]=i[1];else for(let[a,y]of n)s[a.toLowerCase()]=y}return s}if(!e)return s;switch(typeof e){case"function":if(e instanceof Headers)return j(e,t,r,s);let i=e(t,r);return i?j(i,t,r,s):s;case"object":if(e instanceof Headers)return e.forEach((n,a)=>{s[a.toLowerCase()]=n}),s;for(let[n,a]of Object.entries(e))s[n.toLowerCase()]=a;return s;default:return s}};async function*ge(e){let t=e.body;if(!t)return;let r=t.getReader(),s=new TextDecoder;try{for(;;){let{done:i,value:n}=await r.read();if(i)break;let a=s.decode(n);yield K(a)}}finally{r.releaseLock()}}var N=(e,t,r=[],s)=>new Proxy(()=>{},{get(i,n){return N(e,t,n==="index"?r:[...r,n],s)},apply(i,n,[a,y]){if(!a||y||typeof a=="object"&&Object.keys(a).length!==1||pe.includes(r.at(-1))){let L=[...r],w=L.pop(),p="/"+L.join("/"),{fetcher:d=fetch,headers:h,onRequest:E,onResponse:S,fetch:R}=t,x=w==="get"||w==="head"||w==="subscribe";h=j(h,p,y);let D=x?a?.query:y?.query,A="";if(D){let o=(O,v)=>{A+=(A?"&":"?")+`${encodeURIComponent(O)}=${encodeURIComponent(v)}`};for(let[O,v]of Object.entries(D)){if(Array.isArray(v)){for(let c of v)o(O,c);continue}o(O,`${v}`)}}if(w==="subscribe"){let o=e.replace(/^([^]+):\/\//,e.startsWith("https://")?"wss://":e.startsWith("http://")||z.find(O=>e.includes(O))?"ws://":"wss://")+p+A;return new I(o)}return(async()=>{let o={method:w?.toUpperCase(),body:a,...R,headers:h};o.headers={...h,...j(x?a?.headers:y?.headers,p,o)};let O=x&&typeof a=="object"?a.fetch:y?.fetch;if(o={...o,...O},x&&delete o.body,E){Array.isArray(E)||(E=[E]);for(let u of E){let f=await u(p,o);typeof f=="object"&&(o={...o,...f,headers:{...o.headers,...j(f.headers,p,o)}})}}if(x&&delete o.body,he(a)){let u=new FormData;for(let[f,m]of Object.entries(o.body)){if(U){u.append(f,m);continue}if(m instanceof File){u.append(f,await J(m));continue}if(m instanceof FileList){for(let l=0;l<m.length;l++)u.append(f,await J(m[l]));continue}if(Array.isArray(m)){for(let l=0;l<m.length;l++){let k=m[l];u.append(f,k instanceof File?await J(k):k)}continue}u.append(f,m)}o.body=u}else typeof a=="object"?(o.headers["content-type"]="application/json",o.body=JSON.stringify(a)):a!=null&&(o.headers["content-type"]="text/plain");if(x&&delete o.body,E){Array.isArray(E)||(E=[E]);for(let u of E){let f=await u(p,o);typeof f=="object"&&(o={...o,...f,headers:{...o.headers,...j(f.headers,p,o)}})}}let v=e+p+A,c=await(s?.handle(new Request(v,o))??d(v,o)),b=null,g=null;if(S){Array.isArray(S)||(S=[S]);for(let u of S)try{let f=await u(c.clone());if(f!=null){b=f;break}}catch(f){f instanceof F?g=f:g=new F(422,f);break}}if(b!==null)return{data:b,error:g,response:c,status:c.status,headers:c.headers};switch(c.headers.get("Content-Type")?.split(";")[0]){case"text/event-stream":b=ge(c);break;case"application/json":b=await c.json();break;case"application/octet-stream":b=await c.arrayBuffer();break;case"multipart/form-data":let u=await c.formData();b={},u.forEach((f,m)=>{b[m]=f});break;default:b=await c.text().then(K)}return(c.status>=300||c.status<200)&&(g=new F(c.status,b),b=null),{data:b,error:g,response:c,status:c.status,headers:c.headers}})()}return typeof a=="object"?N(e,t,[...r,Object.values(a)[0]],s):N(e,t,r)}}),Q=(e,t={})=>typeof e=="string"?(t.keepDomain||(e.includes("://")||(e=(z.find(r=>e.includes(r))?"http://":"https://")+e),e.endsWith("/")&&(e=e.slice(0,-1))),N(e,t)):(typeof window<"u"&&console.warn("Elysia instance server found on client side, this is not recommended for security reason. Use generic type instead."),N("http://e.ly",t,[],e));var X=(e,t,r)=>{if(e.endsWith("/")||(e+="/"),t==="index"&&(t=""),!r||!Object.keys(r).length)return`${e}${t}`;let s="";for(let[i,n]of Object.entries(r))s+=`${i}=${n}&`;return`${e}${t}?${s.slice(0,-1)}`};var _=typeof FileList>"u",Y=e=>_?e instanceof Blob:e instanceof FileList||e instanceof File,me=e=>{if(!e)return!1;for(let t in e){if(Y(e[t]))return!0;if(Array.isArray(e[t])&&e[t].find(r=>Y(r)))return!0}return!1},B=e=>_?e:new Promise(t=>{let r=new FileReader;r.onload=()=>{let s=new File([r.result],e.name,{lastModified:e.lastModified,type:e.type});t(s)},r.readAsArrayBuffer(e)}),H=class{ws;url;constructor(t){this.ws=new WebSocket(t),this.url=t}send(t){return Array.isArray(t)?(t.forEach(r=>this.send(r)),this):(this.ws.send(typeof t=="object"?JSON.stringify(t):t.toString()),this)}on(t,r,s){return this.addEventListener(t,r,s)}off(t,r,s){return this.ws.removeEventListener(t,r,s),this}subscribe(t,r){return this.addEventListener("message",t,r)}addEventListener(t,r,s){return this.ws.addEventListener(t,i=>{if(t==="message"){let n=i.data.toString(),a=n.charCodeAt(0);if(a===47||a===123)try{n=JSON.parse(n)}catch{}else M(n)?n=+n:n==="true"?n=!0:n==="false"&&(n=!1);r({...i,data:n})}else r(i)},s),this}removeEventListener(t,r,s){return this.off(t,r,s),this}close(){return this.ws.close(),this}},ee=(e,t="",r)=>new Proxy(()=>{},{get(s,i,n){return ee(e,`${t}/${i.toString()}`,r)},apply(s,i,[n,a={}]=[{},{}]){let y=n!==void 0&&(typeof n!="object"||Array.isArray(n))?n:void 0,{$query:L,$fetch:w,$headers:p,$transform:d,getRaw:h,...E}=n??{};y??=E;let S=t.lastIndexOf("/"),R=t.slice(S+1).toUpperCase(),x=X(e,S===-1?"/":t.slice(0,S),Object.assign(a.query??{},L)),D=r.fetcher??fetch,A=r.transform?Array.isArray(r.transform)?r.transform:[r.transform]:void 0,o=d?Array.isArray(d)?d:[d]:void 0;return o&&(A?A=o.concat(A):A=o),R==="SUBSCRIBE"?new H(x.replace(/^([^]+):\/\//,x.startsWith("https://")?"wss://":"ws://")):(async v=>{let c,b={...r.$fetch?.headers,...w?.headers,...a.headers,...p};if(R!=="GET"&&R!=="HEAD"){c=Object.keys(y).length||Array.isArray(y)?y:void 0;let l=c&&(typeof c=="object"||Array.isArray(y));if(l&&me(c)){let C=new FormData;for(let[$,T]of Object.entries(c))if(_)C.append($,T);else if(T instanceof File)C.append($,await B(T));else if(T instanceof FileList)for(let W=0;W<T.length;W++)C.append($,await B(T[W]));else if(Array.isArray(T))for(let W=0;W<T.length;W++){let P=T[W];C.append($,P instanceof File?await B(P):P)}else C.append($,T);c=C}else c!=null&&(b["content-type"]=l?"application/json":"text/plain",c=l?JSON.stringify(c):y)}let g=await D(x,{method:R,body:c,...r.$fetch,...a.fetch,...w,headers:b}),u;if(v.getRaw)return g;switch(g.headers.get("Content-Type")?.split(";")[0]){case"application/json":u=await g.json();break;default:u=await g.text().then(l=>M(l)?+l:l==="true"?!0:l==="false"?!1:l)}let f=g.status>=300||g.status<200?new F(g.status,u):null,m={data:u,error:f,response:g,status:g.status,headers:g.headers};if(A)for(let l of A){let k=l(m);k instanceof Promise&&(k=await k),k!=null&&(m=k)}return m})({getRaw:h})}}),te=(e,t={fetcher:fetch})=>new Proxy({},{get(r,s){return ee(e,s,t)}});var re=(e,t)=>(r,{query:s,params:i,body:n,...a}={})=>{i&&Object.entries(i).forEach(([d,h])=>{r=r.replace(`:${d}`,h)});let y=a.headers?.["Content-Type"];if(!y||y==="application/json")try{n=JSON.stringify(n)}catch{}let L=t?.fetcher||globalThis.fetch,w=s?`?${new URLSearchParams(s).toString()}`:"",p=()=>L(e+r+w,{...a,method:a.method?.toUpperCase()||"GET",headers:n?{"content-type":"application/json",...a.headers}:a.headers,body:n}).then(async d=>{let h;switch(d.headers.get("Content-Type")?.split(";")[0]){case"application/json":h=await d.json();break;case"application/octet-stream":h=await d.arrayBuffer();break;case"multipart/form-data":let E=await d.formData();h={},E.forEach((S,R)=>{h[R]=S});break;default:h=await d.text().then(K)}return d.status>300?{data:null,status:d.status,headers:d.headers,retry:p,error:new F(d.status,h)}:{data:h,error:null,status:d.status,headers:d.headers,retry:p}});return p()};return ce(we);})();
