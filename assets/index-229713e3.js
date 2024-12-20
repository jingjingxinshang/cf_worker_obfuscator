import{o as c,c as p,a as o,t as m,b,w as u,v as a,d as f,e as d,r as v,f as C,g}from"./vendor-89dd5263.js";import{J as x}from"./obfuscator-c816e9ae.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();const y=(r,e)=>{const i=r.__vccOpts||r;for(const[l,t]of e)i[l]=t;return i},h={name:"ObfuscatorForm",data(){return{sourceCode:"",obfuscatedCode:"",outputFileName:"obfuscated.js",selectedFileName:"",copyButtonText:"复制代码",options:{compact:!0,ignoreImports:!0,unicodeEscapeSequence:!0,identifierNamesGenerator:"hexadecimal",identifiersPrefix:"a0_0x",stringArray:!1,target:"service-worker",renameGlobals:!0}}},methods:{handleFileInput(r){const e=r.target.files[0];if(!e)return;if(this.selectedFileName=e.name,this.outputFileName==="obfuscated.js"){const l=e.name.replace(".js","");this.outputFileName=`${l}_obfuscated.js`}const i=new FileReader;i.onload=l=>{this.sourceCode=l.target.result},i.readAsText(e)},async copyToClipboard(){try{await navigator.clipboard.writeText(this.obfuscatedCode),this.copyButtonText="已复制！",setTimeout(()=>{this.copyButtonText="复制代码"},2e3)}catch{alert("复制失败，请手动复制")}},obfuscateCode(){try{const r=x.obfuscate(this.sourceCode,this.options);this.obfuscatedCode=r.getObfuscatedCode()}catch(r){alert("混淆过程中发生错误："+r.message)}},downloadFile(){if(!this.obfuscatedCode){alert("请先生成混淆代码");return}const r=new Blob([this.obfuscatedCode],{type:"text/javascript"}),e=document.createElement("a");e.href=URL.createObjectURL(r);const i=this.outputFileName.endsWith(".js")?this.outputFileName:`${this.outputFileName}.js`;e.download=i,document.body.appendChild(e),e.click(),document.body.removeChild(e),URL.revokeObjectURL(e.href)}}},F={class:"container"},N={class:"input-section"},_={class:"file-input"},w={key:0,class:"file-name"},O={class:"form-group"},I={class:"options"},k={class:"option-item"},T={class:"option-item"},L={class:"option-item"},U={class:"option-item"},j={class:"option-item"},S={class:"button-group"},V=["disabled"],E={key:0,class:"form-group"},B={class:"output-header"};function P(r,e,i,l,t,n){return c(),p("div",F,[e[18]||(e[18]=o("h2",null,"JS代码混淆工具",-1)),o("div",N,[o("div",_,[o("input",{type:"file",accept:".js",onChange:e[0]||(e[0]=(...s)=>n.handleFileInput&&n.handleFileInput(...s)),ref:"fileInput",style:{display:"none"}},null,544),o("button",{onClick:e[1]||(e[1]=s=>r.$refs.fileInput.click()),class:"file-btn"}," 选择文件 "),t.selectedFileName?(c(),p("span",w," 已选择: "+m(t.selectedFileName),1)):b("",!0)]),o("div",O,[u(o("textarea",{"onUpdate:modelValue":e[2]||(e[2]=s=>t.sourceCode=s),placeholder:"请输入需要混淆的JS代码或选择文件",rows:"10",class:"input-area"},null,512),[[a,t.sourceCode]])])]),o("div",I,[o("div",k,[o("label",null,[u(o("input",{type:"checkbox","onUpdate:modelValue":e[3]||(e[3]=s=>t.options.compact=s)},null,512),[[f,t.options.compact]]),e[12]||(e[12]=d(" Compact "))])]),o("div",T,[o("label",null,[u(o("input",{type:"checkbox","onUpdate:modelValue":e[4]||(e[4]=s=>t.options.ignoreImports=s)},null,512),[[f,t.options.ignoreImports]]),e[13]||(e[13]=d(" Ignore Imports "))])]),o("div",L,[o("label",null,[u(o("input",{type:"checkbox","onUpdate:modelValue":e[5]||(e[5]=s=>t.options.unicodeEscapeSequence=s)},null,512),[[f,t.options.unicodeEscapeSequence]]),e[14]||(e[14]=d(" Unicode Escape Sequence "))])]),o("div",U,[o("label",null,[u(o("input",{type:"text","onUpdate:modelValue":e[6]||(e[6]=s=>t.options.identifiersPrefix=s)},null,512),[[a,t.options.identifiersPrefix]]),e[15]||(e[15]=d(" Identifiers Prefix "))])]),o("div",j,[o("label",null,[u(o("input",{type:"text","onUpdate:modelValue":e[7]||(e[7]=s=>t.outputFileName=s),placeholder:"输出文件名"},null,512),[[a,t.outputFileName]]),e[16]||(e[16]=d(" 输出文件名 "))])])]),o("div",S,[o("button",{onClick:e[8]||(e[8]=(...s)=>n.obfuscateCode&&n.obfuscateCode(...s)),class:"obfuscate-btn"},"混淆代码"),o("button",{onClick:e[9]||(e[9]=(...s)=>n.downloadFile&&n.downloadFile(...s)),class:"download-btn",disabled:!t.obfuscatedCode}," 下载文件 ",8,V)]),t.obfuscatedCode?(c(),p("div",E,[o("div",B,[e[17]||(e[17]=o("h3",null,"混淆后的代码：",-1)),o("button",{onClick:e[10]||(e[10]=(...s)=>n.copyToClipboard&&n.copyToClipboard(...s)),class:"copy-btn"},m(t.copyButtonText),1)]),u(o("textarea",{"onUpdate:modelValue":e[11]||(e[11]=s=>t.obfuscatedCode=s),readonly:"",rows:"10",class:"output-area"},null,512),[[a,t.obfuscatedCode]])])):b("",!0),e[19]||(e[19]=o("footer",{class:"footer"},[o("p",null,[d(" © 2024 JS代码混淆工具 | "),o("a",{href:"https://github.com/yourusername/js-obfuscator-tool/blob/main/LICENSE",target:"_blank",rel:"noopener noreferrer"}," MIT License ")])],-1))])}const A=y(h,[["render",P],["__scopeId","data-v-7d62a117"]]),R={name:"App",components:{ObfuscatorForm:A}};function q(r,e,i,l,t,n){const s=v("ObfuscatorForm");return c(),p("div",null,[C(s)])}const J=y(R,[["render",q]]);g(J).mount("#app");