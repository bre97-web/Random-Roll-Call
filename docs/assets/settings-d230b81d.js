import{b as i,g as r,o as p,c as u,w as d,v as n,u as s,d as o,p as _,h as c}from"./index-03f44cd3.js";import{_ as m}from"./_plugin-vue_export-helper-c27b6911.js";const f=l=>(_("data-v-df067942"),l=l(),c(),l),x={class:"flex flex-col gap-2"},g=f(()=>o("label",null,"随机时是否连续",-1)),v={__name:"settings",setup(l){var e=i(JSON.parse(localStorage.getItem("settings"))||{delayShowResult:1e3,delayNext:250,linear:!0});return r(e,()=>{localStorage.setItem("settings",JSON.stringify(e))}),(y,t)=>(p(),u("div",x,[d(o("md-filled-text-field",{label:"停止后延迟显示结果",type:"text","onUpdate:modelValue":t[0]||(t[0]=a=>s(e).delayShowResult=a)},null,512),[[n,s(e).delayShowResult,void 0,{number:!0}]]),d(o("md-filled-text-field",{label:"随机间隔",type:"text","onUpdate:modelValue":t[1]||(t[1]=a=>s(e).delayNext=a)},null,512),[[n,s(e).delayNext,void 0,{number:!0}]]),g,o("md-switch",{name:"mode",onClick:t[2]||(t[2]=a=>s(e).linear=!s(e).linear)})]))}},b=m(v,[["__scopeId","data-v-df067942"]]);export{b as default};
