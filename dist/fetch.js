"use strict";var f=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var E=(t,e)=>{for(var r in e)f(t,r,{get:e[r],enumerable:!0})},w=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of T(e))!N.call(t,i)&&i!==r&&f(t,i,{get:()=>e[i],enumerable:!(n=x(e,i))||n.enumerable});return t};var F=t=>w(f({},"__esModule",{value:!0}),t);var k={};E(k,{edenFetch:()=>M});module.exports=F(k);var o=class extends Error{constructor(r,n){super(n+"");this.status=r;this.value=n}};var j=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,A=/(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/,C=/^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/,O=t=>t.trim().length!==0&&!Number.isNaN(Number(t)),h=t=>{if(typeof t!="string")return null;let e=t.replace(/"/g,"");if(j.test(e)||A.test(e)||C.test(e)){let r=new Date(e);if(!Number.isNaN(r.getTime()))return r}return null},D=t=>{let e=t.charCodeAt(0),r=t.charCodeAt(t.length-1);return e===123&&r===125||e===91&&r===93},J=t=>JSON.parse(t,(e,r)=>{let n=h(r);return n||r}),y=t=>{if(!t)return t;if(O(t))return+t;if(t==="true")return!0;if(t==="false")return!1;let e=h(t);if(e)return e;if(D(t))try{return J(t)}catch{}return t};var M=(t,e)=>(r,{query:n,params:i,body:d,...c}={})=>{i&&Object.entries(i).forEach(([a,s])=>{r=r.replace(`:${a}`,s)});let p=c.headers?.["Content-Type"];if(!p||p==="application/json")try{d=JSON.stringify(d)}catch{}let m=e?.fetcher||globalThis.fetch,l=n?`?${new URLSearchParams(n).toString()}`:"",u=()=>m(t+r+l,{...c,method:c.method?.toUpperCase()||"GET",headers:d?{"content-type":"application/json",...c.headers}:c.headers,body:d}).then(async a=>{let s;switch(a.headers.get("Content-Type")?.split(";")[0]){case"application/json":s=await a.json();break;case"application/octet-stream":s=await a.arrayBuffer();break;case"multipart/form-data":let g=await a.formData();s={},g.forEach((S,b)=>{s[b]=S});break;default:s=await a.text().then(y)}return a.status>300?{data:null,status:a.status,headers:a.headers,retry:u,error:new o(a.status,s)}:{data:s,error:null,status:a.status,headers:a.headers,retry:u}});return u()};0&&(module.exports={edenFetch});
