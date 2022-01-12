var Ce=Object.defineProperty,Se=Object.defineProperties;var qe=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var De=Object.prototype.hasOwnProperty,Me=Object.prototype.propertyIsEnumerable;var V=(h,v,e)=>v in h?Ce(h,v,{enumerable:!0,configurable:!0,writable:!0,value:e}):h[v]=e,L=(h,v)=>{for(var e in v||(v={}))De.call(v,e)&&V(h,e,v[e]);if(R)for(var e of R(v))Me.call(v,e)&&V(h,e,v[e]);return h},B=(h,v)=>Se(h,qe(v));(function(h,v){typeof exports=="object"&&typeof module!="undefined"?v(exports,require("svelte/store"),require("svelte/internal"),require("svelte")):typeof define=="function"&&define.amd?define(["exports","svelte/store","svelte/internal","svelte"],v):(h=typeof globalThis!="undefined"?globalThis:h||self,v(h.sketch={},h["svelte/store"],h["svelte/internal"],h.svelte))})(this,function(h,v,e,C){"use strict";const H={},M=v.writable([]),S=v.writable(void 0),O=v.writable({});T(window.location),window.addEventListener("popstate",()=>{T(window.location)});function T(s){const l=s.hash.replace("#","").split("?"),u=l[0],o=v.get(M).find(f=>f.slug===u);if(!o)return;S.set(L({},o));const c={};if(l.length>1){const f=l[1].split("&");for(const n of f){const d=n.split("="),p=decodeURIComponent(d[0]);let _=decodeURIComponent(d[1]);_==="true"?_=!0:_==="false"?_=!1:_.match(/^\d+$/)&&(_=parseInt(_)),c[p]=_}}O.set(c)}async function $(s){window.location.hash=s}async function W(s){const t=s.__sketch_page_config;if(t){const{file:l,name:u}=t;if(Object.values(H).find(c=>u===c)){console.error(`Sketch: page '${u}' has already already been registerd`);return}H[l]=u,Y(s.default,t)}}async function Y(s,t){const l=F(t),u=B(L({},l),{component:s});M.update(c=>[...c,u]),T(window.location),!v.get(S)&&t.home&&S.set(L({},u))}function F(s){const t=s.file,l=s.name,u=l.toLowerCase().replace(/\W+/gi,"-"),o=l.split("/"),c=o[o.length-1];return{name:l,title:c,slug:u,file:t}}var G={load:$,pages:M,active:S,register:W};const P=v.writable([]);function J(s,t,l,u){P.update(o=>[...o,{name:s,type:t,defaultValue:l,content:u}])}function K(s){P.update(t=>t.filter(l=>l.name!==s))}var Le="";function A(s,t,l){const u=s.slice();return u[3]=t[l],u}function z(s){var y;let t,l,u=s[3].name+"",o,c,f,n=s[3].content+"",d,p,_=s[3].type+"",g,b,r,a=((y=s[3].defaultValue)!=null?y:"-")+"",m,i;return{c(){t=e.element("tr"),l=e.element("td"),o=e.text(u),c=e.space(),f=e.element("td"),d=e.space(),p=e.element("td"),g=e.text(_),b=e.space(),r=e.element("td"),m=e.text(a),i=e.space(),e.attr(l,"class","svelte-10noebx"),e.attr(f,"class","svelte-10noebx"),e.attr(p,"class","svelte-10noebx"),e.attr(r,"class","svelte-10noebx"),e.attr(t,"class","svelte-10noebx")},m(k,w){e.insert(k,t,w),e.append(t,l),e.append(l,o),e.append(t,c),e.append(t,f),f.innerHTML=n,e.append(t,d),e.append(t,p),e.append(p,g),e.append(t,b),e.append(t,r),e.append(r,m),e.append(t,i)},p(k,w){var q;w&1&&u!==(u=k[3].name+"")&&e.set_data(o,u),w&1&&n!==(n=k[3].content+"")&&(f.innerHTML=n),w&1&&_!==(_=k[3].type+"")&&e.set_data(g,_),w&1&&a!==(a=((q=k[3].defaultValue)!=null?q:"-")+"")&&e.set_data(m,a)},d(k){k&&e.detach(t)}}}function Q(s){let t,l,u,o,c,f,n,d,p,_=s[0],g=[];for(let a=0;a<_.length;a+=1)g[a]=z(A(s,_,a));const b=s[2].default,r=e.create_slot(b,s,s[1],null);return{c(){t=e.element("div"),l=e.element("div"),l.textContent="Props",u=e.space(),o=e.element("table"),c=e.element("thead"),c.innerHTML=`<tr class="svelte-10noebx"><td class="svelte-10noebx">Name</td> 
                <td class="svelte-10noebx">Description</td> 
                <td class="svelte-10noebx">Type</td> 
                <td class="svelte-10noebx">Default</td></tr>`,f=e.space(),n=e.element("tbody");for(let a=0;a<g.length;a+=1)g[a].c();d=e.space(),r&&r.c(),e.attr(l,"class","title svelte-10noebx"),e.attr(o,"class","svelte-10noebx"),e.attr(t,"class","docs svelte-10noebx")},m(a,m){e.insert(a,t,m),e.append(t,l),e.append(t,u),e.append(t,o),e.append(o,c),e.append(o,f),e.append(o,n);for(let i=0;i<g.length;i+=1)g[i].m(n,null);e.append(t,d),r&&r.m(t,null),p=!0},p(a,[m]){if(m&1){_=a[0];let i;for(i=0;i<_.length;i+=1){const y=A(a,_,i);g[i]?g[i].p(y,m):(g[i]=z(y),g[i].c(),g[i].m(n,null))}for(;i<g.length;i+=1)g[i].d(1);g.length=_.length}r&&r.p&&(!p||m&2)&&e.update_slot_base(r,b,a,a[1],p?e.get_slot_changes(b,a[1],m,null):e.get_all_dirty_from_scope(a[1]),null)},i(a){p||(e.transition_in(r,a),p=!0)},o(a){e.transition_out(r,a),p=!1},d(a){a&&e.detach(t),e.destroy_each(g,a),r&&r.d(a)}}}function X(s,t,l){let u;e.component_subscribe(s,P,f=>l(0,u=f));let{$$slots:o={},$$scope:c}=t;return s.$$set=f=>{"$$scope"in f&&l(1,c=f.$$scope)},[u,c,o]}class Z extends e.SvelteComponent{constructor(t){super();e.init(this,t,X,Q,e.safe_not_equal,{})}}var Te="";function x(s){let t,l;const u=s[4].default,o=e.create_slot(u,s,s[3],null);return{c(){t=e.element("div"),o&&o.c(),e.attr(t,"class","props svelte-1vtwary")},m(c,f){e.insert(c,t,f),o&&o.m(t,null),s[5](t),l=!0},p(c,[f]){o&&o.p&&(!l||f&8)&&e.update_slot_base(o,u,c,c[3],l?e.get_slot_changes(u,c[3],f,null):e.get_all_dirty_from_scope(c[3]),null)},i(c){l||(e.transition_in(o,c),l=!0)},o(c){e.transition_out(o,c),l=!1},d(c){c&&e.detach(t),o&&o.d(c),s[5](null)}}}function ee(s,t,l){let{$$slots:u={},$$scope:o}=t,{name:c}=t,{type:f="string"}=t,n=t.default,d,p=!1;C.beforeUpdate(()=>{d&&!p&&(J(c,f,n,d.innerHTML),p=!0)}),C.onDestroy(()=>{K(c)});function _(g){e.binding_callbacks[g?"unshift":"push"](()=>{d=g,l(0,d)})}return s.$$set=g=>{l(8,t=e.assign(e.assign({},t),e.exclude_internal_props(g))),"name"in g&&l(1,c=g.name),"type"in g&&l(2,f=g.type),"$$scope"in g&&l(3,o=g.$$scope)},t=e.exclude_internal_props(t),[d,c,f,o,u,_]}class te extends e.SvelteComponent{constructor(t){super();e.init(this,t,ee,x,e.safe_not_equal,{name:1,type:2})}}class se extends e.SvelteComponent{constructor(t){super();e.init(this,t,null,null,e.safe_not_equal,{})}}var Pe="";function oe(s){let t,l;const u=s[1].default,o=e.create_slot(u,s,s[0],null);return{c(){t=e.element("div"),o&&o.c(),e.attr(t,"class","sketch svelte-a5p7a0")},m(c,f){e.insert(c,t,f),o&&o.m(t,null),l=!0},p(c,[f]){o&&o.p&&(!l||f&1)&&e.update_slot_base(o,u,c,c[0],l?e.get_slot_changes(u,c[0],f,null):e.get_all_dirty_from_scope(c[0]),null)},i(c){l||(e.transition_in(o,c),l=!0)},o(c){e.transition_out(o,c),l=!1},d(c){c&&e.detach(t),o&&o.d(c)}}}function le(s,t,l){let{$$slots:u={},$$scope:o}=t;return s.$$set=c=>{"$$scope"in c&&l(0,o=c.$$scope)},[o,u]}class ce extends e.SvelteComponent{constructor(t){super();e.init(this,t,le,oe,e.safe_not_equal,{})}}var He="";function U(s,t,l){const u=s.slice();return u[7]=t[l],u}function E(s,t,l){const u=s.slice();return u[10]=t[l],u}function ue(s){let t,l=s[7].label+"",u,o,c,f;function n(){return s[5](s[7])}return{c(){t=e.element("a"),u=e.text(l),e.attr(t,"href",o=s[7].url),e.attr(t,"class","svelte-1ssgg69"),e.toggle_class(t,"active",s[7].slug===s[1].slug)},m(d,p){e.insert(d,t,p),e.append(t,u),c||(f=e.listen(t,"click",e.prevent_default(n)),c=!0)},p(d,p){s=d,p&1&&l!==(l=s[7].label+"")&&e.set_data(u,l),p&1&&o!==(o=s[7].url)&&e.attr(t,"href",o),p&3&&e.toggle_class(t,"active",s[7].slug===s[1].slug)},d(d){d&&e.detach(t),c=!1,f()}}}function fe(s){let t,l,u,o=s[7].label+"",c,f,n,d,p,_;function g(){return s[3](s[7])}let b=s[7].children,r=[];for(let a=0;a<b.length;a+=1)r[a]=N(E(s,b,a));return{c(){t=e.element("div"),l=e.element("div"),u=e.element("em"),c=e.text(o),f=e.space(),n=e.element("div");for(let a=0;a<r.length;a+=1)r[a].c();d=e.space(),e.attr(u,"class","svelte-1ssgg69"),e.attr(l,"class","label svelte-1ssgg69"),e.attr(n,"class","items svelte-1ssgg69"),e.attr(t,"class","group svelte-1ssgg69"),e.toggle_class(t,"opened",s[7].opened)},m(a,m){e.insert(a,t,m),e.append(t,l),e.append(l,u),e.append(u,c),e.append(t,f),e.append(t,n);for(let i=0;i<r.length;i+=1)r[i].m(n,null);e.append(t,d),p||(_=e.listen(l,"click",g),p=!0)},p(a,m){if(s=a,m&1&&o!==(o=s[7].label+"")&&e.set_data(c,o),m&7){b=s[7].children;let i;for(i=0;i<b.length;i+=1){const y=E(s,b,i);r[i]?r[i].p(y,m):(r[i]=N(y),r[i].c(),r[i].m(n,null))}for(;i<r.length;i+=1)r[i].d(1);r.length=b.length}m&1&&e.toggle_class(t,"opened",s[7].opened)},d(a){a&&e.detach(t),e.destroy_each(r,a),p=!1,_()}}}function N(s){let t,l=s[10].label+"",u,o,c,f;function n(){return s[4](s[10])}return{c(){var d;t=e.element("a"),u=e.text(l),e.attr(t,"href",o=s[10].url),e.attr(t,"class","svelte-1ssgg69"),e.toggle_class(t,"active",s[10].slug===((d=s[1])==null?void 0:d.slug))},m(d,p){e.insert(d,t,p),e.append(t,u),c||(f=e.listen(t,"click",e.prevent_default(n)),c=!0)},p(d,p){var _;s=d,p&1&&l!==(l=s[10].label+"")&&e.set_data(u,l),p&1&&o!==(o=s[10].url)&&e.attr(t,"href",o),p&3&&e.toggle_class(t,"active",s[10].slug===((_=s[1])==null?void 0:_.slug))},d(d){d&&e.detach(t),c=!1,f()}}}function j(s){let t;function l(c,f){return c[7].group?fe:ue}let u=l(s),o=u(s);return{c(){o.c(),t=e.empty()},m(c,f){o.m(c,f),e.insert(c,t,f)},p(c,f){u===(u=l(c))&&o?o.p(c,f):(o.d(1),o=u(c),o&&(o.c(),o.m(t.parentNode,t)))},d(c){o.d(c),c&&e.detach(t)}}}function pe(s){let t,l,u,o,c=s[0],f=[];for(let n=0;n<c.length;n+=1)f[n]=j(U(s,c,n));return{c(){t=e.element("div"),l=e.element("div"),l.innerHTML=`<span class="logo svelte-1ssgg69"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none"><path d="M10.75 22H4.917a2.086 2.086 0 0 1-2.084-2.084v-9.7a1.977
                        1.977 0 0 1-.592-2.558c.9-1.608 1.818-3.193 2.721-4.712A1.976
                        1.976 0 0 1 6.666 2c.424.004.836.139 1.18.385l.024.015c.412.24
                        4.392 2.609 7.591 4.512l2.84 1.688l.13.077a372.255 372.255
                        0 0 1 2.744 1.628a1.963 1.963 0 0 1 .583 2.553c-.883
                        1.577-1.8 3.162-2.72 4.712a1.983 1.983 0 0 1-1.68.951c-.136
                        0-.27-.015-.4-.045c-.117.069-.757.48-1.568 1c-1.443.925-3.415
                        2.19-3.643 2.307a1.976 1.976 0 0 1-.997.217zM4.5 13.03v6.886c0
                        .23.187.417.417.417H8.74A485.729 485.729 0 0 1 4.5 13.03zm1.358-1c.4.687
                        4.716 8.132 4.752 8.182a.3.3 0 0 0 .38.082c.134-.076 4.193-2.684
                        4.233-2.71c-.314-.185-2.586-1.539-4.992-2.972L5.838
                        12l.007.011l.01.017v.006l.003-.004zm.474-8.13c-.808 1.3-2.616
                        4.528-2.64 4.587a.312.312 0 0 0 .124.386c.133.079 13.354 7.956
                        13.48 7.976a.32.32 0 0 0 .048 0a.31.31 0 0 0 .266-.149a414.198 414.198
                        0 0 0 2.694-4.667a.316.316 0 0 0-.125-.387c-.127-.076-13.323-7.918-13.408-7.955a.314.314
                        0 0 0-.383.117l-.007.012l-.008.012l-.012.02v.005l-.015.024l-.015.019h.001zm1.353
                        5.49a1.666 1.666 0 1 1 1.667-1.67a1.669 1.669 0 0 1-1.667 1.667v.003z" fill="currentColor"></path></g></svg></span> 
        <span class="name">Sketch Book</span>`,u=e.space(),o=e.element("div");for(let n=0;n<f.length;n+=1)f[n].c();e.attr(l,"class","head svelte-1ssgg69"),e.attr(o,"class","menu svelte-1ssgg69"),e.attr(t,"class","navigation svelte-1ssgg69")},m(n,d){e.insert(n,t,d),e.append(t,l),e.append(t,u),e.append(t,o);for(let p=0;p<f.length;p+=1)f[p].m(o,null)},p(n,[d]){if(d&7){c=n[0];let p;for(p=0;p<c.length;p+=1){const _=U(n,c,p);f[p]?f[p].p(_,d):(f[p]=j(_),f[p].c(),f[p].m(o,null))}for(;p<f.length;p+=1)f[p].d(1);f.length=c.length}},i:e.noop,o:e.noop,d(n){n&&e.detach(t),e.destroy_each(f,n)}}}function de(s,t,l){let u;e.component_subscribe(s,S,_=>l(1,u=_));let o=[];const c=M.subscribe(_=>{let g={},b=v.get(S),r=[];_.map(a=>{let m=r,i=a.name.split("/");if(i.length>1){let q=i[0],D=g[q];D||(D={label:q,group:!0,children:[]},r.push(D),g[q]=D),m=D.children,a.slug===(b==null?void 0:b.slug)&&(D.opened=!0)}let y=i[i.length-1];const k=`#${a.slug}`,w={slug:a.slug,label:y,url:k};m.push(w)}),r=r.sort((a,m)=>!!a.group>!!m.group?1:!!a.group<!!m.group?-1:0).map(a=>(a.group&&(a.children=a.children.sort((m,i)=>m.label>i.label?1:m.label<i.label?-1:0)),a)),l(0,o=r)});C.onDestroy(()=>{c()});const f=_=>{_.group?(_.opened=!_.opened,l(0,o=[...o])):$(_.slug)};return[o,u,f,_=>f(_),_=>f(_),_=>f(_)]}class ae extends e.SvelteComponent{constructor(t){super();e.init(this,t,de,pe,e.safe_not_equal,{})}}var $e="";function _e(s){let t,l,u;return{c(){t=e.element("div"),l=e.element("div"),u=e.text(s[0]),e.attr(l,"class","page-title"),e.attr(t,"class","sketch-page")},m(o,c){e.insert(o,t,c),e.append(t,l),e.append(l,u),s[3](t)},p(o,[c]){c&1&&e.set_data(u,o[0])},i:e.noop,o:e.noop,d(o){o&&e.detach(t),s[3](null)}}}function ne(s,t,l){let{title:u=void 0}=t,{component:o=void 0}=t,c,f;C.beforeUpdate(()=>{o&&c&&(f==null||f.$destroy(),f=new o({target:c}))}),C.onDestroy(()=>{f==null||f.$destroy()});function n(d){e.binding_callbacks[d?"unshift":"push"](()=>{c=d,l(1,c)})}return s.$$set=d=>{"title"in d&&l(0,u=d.title),"component"in d&&l(2,o=d.component)},[u,c,o,n]}class ie extends e.SvelteComponent{constructor(t){super();e.init(this,t,ne,_e,e.safe_not_equal,{title:0,component:2})}}var Ae="";function re(s){let t,l,u;return{c(){t=e.element("iframe"),e.attr(t,"title","page-frame"),e.attr(t,"frameborder","0"),e.attr(t,"width","100"),e.attr(t,"class","svelte-1oftune")},m(o,c){e.insert(o,t,c),s[4](t),l||(u=e.listen(t,"load",s[1]),l=!0)},p:e.noop,i:e.noop,o:e.noop,d(o){o&&e.detach(t),s[4](null),l=!1,u()}}}function ge(s,t,l){let{title:u=void 0}=t,{component:o=void 0}=t,c,f;const n=()=>{const p=c.contentDocument.head,_=document.querySelectorAll('style, link[rel="stylesheet"]');Array.from(_).forEach(b=>p.appendChild(b.cloneNode(!0)));const g=c.contentDocument.body;f=new ie({target:g,props:{component:o,title:u}})};C.onDestroy(()=>{f==null||f.$destroy()}),C.beforeUpdate(()=>{c&&l(0,c.contentDocument.body.scrollTop=0,c),f==null||f.$$set({title:u,component:o})});function d(p){e.binding_callbacks[p?"unshift":"push"](()=>{c=p,l(0,c)})}return s.$$set=p=>{"title"in p&&l(2,u=p.title),"component"in p&&l(3,o=p.component)},[c,n,u,o,d]}class me extends e.SvelteComponent{constructor(t){super();e.init(this,t,ge,re,e.safe_not_equal,{title:2,component:3})}}var ze="";function I(s){let t,l;return t=new me({props:{title:s[0].title,component:s[0].component}}),{c(){e.create_component(t.$$.fragment)},m(u,o){e.mount_component(t,u,o),l=!0},p(u,o){const c={};o&1&&(c.title=u[0].title),o&1&&(c.component=u[0].component),t.$set(c)},i(u){l||(e.transition_in(t.$$.fragment,u),l=!0)},o(u){e.transition_out(t.$$.fragment,u),l=!1},d(u){e.destroy_component(t,u)}}}function he(s){let t,l,u,o,c,f,n;o=new ae({});let d=s[0]&&I(s);return{c(){t=e.element("div"),l=e.element("div"),u=e.element("div"),e.create_component(o.$$.fragment),c=e.space(),f=e.element("div"),d&&d.c(),e.attr(u,"class","navigation svelte-eu3h6w"),e.attr(f,"class","content svelte-eu3h6w"),e.attr(l,"class","wrapper svelte-eu3h6w"),e.attr(t,"class","layout svelte-eu3h6w")},m(p,_){e.insert(p,t,_),e.append(t,l),e.append(l,u),e.mount_component(o,u,null),e.append(l,c),e.append(l,f),d&&d.m(f,null),n=!0},p(p,[_]){p[0]?d?(d.p(p,_),_&1&&e.transition_in(d,1)):(d=I(p),d.c(),e.transition_in(d,1),d.m(f,null)):d&&(e.group_outros(),e.transition_out(d,1,1,()=>{d=null}),e.check_outros())},i(p){n||(e.transition_in(o.$$.fragment,p),e.transition_in(d),n=!0)},o(p){e.transition_out(o.$$.fragment,p),e.transition_out(d),n=!1},d(p){p&&e.detach(t),e.destroy_component(o),d&&d.d()}}}function ve(s,t,l){let u;return e.component_subscribe(s,S,o=>l(0,u=o)),[u]}class be extends e.SvelteComponent{constructor(t){super();e.init(this,t,ve,he,e.safe_not_equal,{})}}function ye(s){let t,l;return t=new be({}),{c(){e.create_component(t.$$.fragment)},m(u,o){e.mount_component(t,u,o),l=!0},p:e.noop,i(u){l||(e.transition_in(t.$$.fragment,u),l=!0)},o(u){e.transition_out(t.$$.fragment,u),l=!1},d(u){e.destroy_component(t,u)}}}class ke extends e.SvelteComponent{constructor(t){super();e.init(this,t,null,ye,e.safe_not_equal,{})}}var Ue="";function we({target:s}){return new ke({target:s})}h.Docs=Z,h.Example=ce,h.Prop=te,h.Scene=se,h.router=G,h.start=we,Object.defineProperty(h,"__esModule",{value:!0}),h[Symbol.toStringTag]="Module"});