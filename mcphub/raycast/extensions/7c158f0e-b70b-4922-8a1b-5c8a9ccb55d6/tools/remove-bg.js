"use strict";var nt=Object.create;var q=Object.defineProperty;var st=Object.getOwnPropertyDescriptor;var it=Object.getOwnPropertyNames;var ot=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ye=(r,e)=>(e=Symbol[r])?e:Symbol.for("Symbol."+r),Fe=r=>{throw TypeError(r)};var lt=(r,e)=>{for(var t in e)q(r,t,{get:e[t],enumerable:!0})},we=(r,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of it(e))!ct.call(r,s)&&s!==t&&q(r,s,{get:()=>e[s],enumerable:!(a=st(e,s))||a.enumerable});return r};var U=(r,e,t)=>(t=r!=null?nt(ot(r)):{},we(e||!r||!r.__esModule?q(t,"default",{value:r,enumerable:!0}):t,r)),ut=r=>we(q({},"__esModule",{value:!0}),r);var S=(r,e,t)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&Fe("Object expected");var a,s;t&&(a=e[ye("asyncDispose")]),a===void 0&&(a=e[ye("dispose")],t&&(s=a)),typeof a!="function"&&Fe("Object not disposable"),s&&(a=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),r.push([t,a,e])}else t&&r.push([t]);return e},L=(r,e,t)=>{var a=typeof SuppressedError=="function"?SuppressedError:function(n,o,d,l){return l=Error(d),l.name="SuppressedError",l.error=n,l.suppressed=o,l},s=n=>e=t?new a(n,e,"An error was suppressed during disposal"):(t=!0,n),i=n=>{for(;n=r.pop();)try{var o=n[1]&&n[1].call(n[2]);if(n[0])return Promise.resolve(o).then(i,d=>(s(d),i()))}catch(d){s(d)}if(t)throw e};return i()};var vt={};lt(vt,{default:()=>St});module.exports=ut(vt);var z=require("child_process"),g=U(require("fs")),P=U(require("os")),m=U(require("path")),c=require("@raycast/api");var _=U(require("react")),F=require("@raycast/api");var Se=U(require("node:child_process")),ve=require("node:buffer"),M=U(require("node:stream")),Pe=require("node:util");var Ae=require("react/jsx-runtime");var ae=globalThis;var J=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",ne=Symbol.for("signal-exit emitter"),ie=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),ae[ne])return ae[ne];Object.defineProperty(ae,ne,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let a=this.listeners[e],s=a.indexOf(t);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,t,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(t,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",t,a)||s),s}},oe=class{onExit(){return()=>{}}load(){}unload(){}},ce=class{#o;#t;#e;#s;#i;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new ie,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let t of this.#r)this.#n[t]=()=>{let a=this.#e.listeners(t),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,t),o=t==="SIGHUP"?this.#o:t;n||e.kill(e.pid,o)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,t){if(!J(this.#e))return()=>{};this.#a===!1&&this.load();let a=t?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#n[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let t=this.#n[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return J(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let a=this.#s;if(e==="exit"&&J(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let s=a.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...t)}},se=null,ft=(r,e)=>(se||(se=J(process)?new ce(process):new oe),se.onExit(r,e));function dt(r,{timeout:e}={}){let t=new Promise((o,d)=>{r.on("exit",(l,A)=>{o({exitCode:l,signal:A,timedOut:!1})}),r.on("error",l=>{d(l)}),r.stdin&&r.stdin.on("error",l=>{d(l)})}),a=ft(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>a());let s,i=new Promise((o,d)=>{s=setTimeout(()=>{r.kill("SIGTERM"),d(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=t.finally(()=>{clearTimeout(s)});return Promise.race([i,n]).finally(()=>a())}var le=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function pt(r){let{encoding:e}=r,t=e==="buffer",a=new M.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,i=[];return a.on("data",n=>{i.push(n),s+=n.length}),a.getBufferedValue=()=>t?Buffer.concat(i,s):i.join(""),a.getBufferedLength=()=>s,a}async function $e(r,e){let t=pt(e);return await new Promise((a,s)=>{let i=n=>{n&&t.getBufferedLength()<=ve.constants.MAX_LENGTH&&(n.bufferedData=t.getBufferedValue()),s(n)};(async()=>{try{await(0,Pe.promisify)(M.default.pipeline)(r,t),a()}catch(n){i(n)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&i(new le)})}),t.getBufferedValue()}async function ke(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function ht({stdout:r,stderr:e},{encoding:t},a){let s=$e(r,{encoding:t}),i=$e(e,{encoding:t});try{return await Promise.all([a,s,i])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},ke(r,s),ke(e,i)])}}function mt(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function xe(r,e){return r.stripFinalNewline?mt(e):e}function gt({timedOut:r,timeout:e,signal:t,exitCode:a}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:a!=null?`failed with exit code ${a}`:"failed"}function bt({stdout:r,stderr:e,error:t,signal:a,exitCode:s,command:i,timedOut:n,options:o,parentError:d}){let A=`Command ${gt({timedOut:n,timeout:o?.timeout,signal:a,exitCode:s})}: ${i}`,f=t?`${A}
${t.message}`:A,I=[f,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=d,t.message=I,t.shortMessage=f,t.command=i,t.exitCode=s,t.signal=a,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function yt({stdout:r,stderr:e,error:t,exitCode:a,signal:s,timedOut:i,command:n,options:o,parentError:d}){if(t||a!==0||s!==null)throw bt({error:t,exitCode:a,signal:s,stdout:r,stderr:e,command:n,timedOut:i,options:o,parentError:d});return r}async function $(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:i,...n}=Array.isArray(e)?t||{}:e||{},o=a!==!1?[]:["-ss"];s==="JavaScript"&&o.push("-l","JavaScript"),Array.isArray(e)&&o.push("-",...e);let d=Se.default.spawn("osascript",o,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=dt(d,{timeout:i??1e4});d.stdin.end(r);let[{error:A,exitCode:f,signal:I,timedOut:D},E,R]=await ht(d,{encoding:"utf8"},l),Y=xe({stripFinalNewline:!0},E),K=xe({stripFinalNewline:!0},R);return yt({stdout:Y,stderr:K,error:A,exitCode:f,signal:I,timedOut:D,command:"osascript",options:t,parentError:new Error})}var V=require("child_process"),w=require("@raycast/api");var Ie=require("fs"),Ee=["-s","0","--min","0","--max","0","--minalpha","0","--maxalpha","0","--qcolor","100","--qalpha","100"];async function Ft(){let r="";try{r=(0,V.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(r==="")return await(0,w.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:w.Toast.Style.Failure}),!1;if(await(0,w.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,w.showToast)({title:"Installing AVIF Encoder...",style:w.Toast.Style.Animated});try{if((0,V.execSync)(`/bin/zsh -ilc '${r} install --quiet libavif || true'`),!wt())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=w.Toast.Style.Success,!0}catch(t){console.error(t),v("Failed to install AVIF Encoder.",t,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,w.showToast)({title:"AVIF Encoder not installed.",style:w.Toast.Style.Failure}),!1}async function wt(){let t=!1,a=0;for(;!t&&a<7;){let s=(0,V.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,Ie.existsSync)(s)){t=!0;break}await new Promise(i=>setTimeout(i,1e3)),a++}return t}async function X(){let r=await w.LocalStorage.getItem("avifEncoderPath"),e=await w.LocalStorage.getItem("avifDecoderPath");if(!r||!e)try{r=(0,V.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,V.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim(),r&&await w.LocalStorage.setItem("avifEncoderPath",r),e&&await w.LocalStorage.setItem("avifDecoderPath",e)}catch(t){if(await Ft())try{return await X()}catch(a){console.error(a),v("AVIF Encoder not found.",a,void 0,"Please install the libavif Homebrew formula manually and try again.")}else v("AVIF Encoder not found.",t,void 0,"Please install the libavif Homebrew formula and try again.")}if(typeof r!="string"||typeof e!="string")throw new Error("AVIF encoder and decoder paths could not be resolved.");return{encoderPath:r,decoderPath:e}}var Ce=async()=>$(`use framework "AppKit"
      use framework "PDFKit"
      
      set pb to current application's NSPasteboard's generalPasteboard()
      set theItems to pb's readObjectsForClasses:({current application's NSURL, current application's NSImage, current application's NSAttributedString}) options:{}
      
      set theImages to {}
      repeat with i from 0 to ((theItems's |count|()) - 1)
        set theItem to (theItems's objectAtIndex:i)
        if (theItem's |class|()) is current application's NSImage then
          copy theItem to end of theImages
        else if (theItem's |class|()) is current application's NSURL then
          if (theItem's absoluteString() as text) ends with ".pdf" then
            set theImage to (current application's PDFDocument's alloc()'s initWithURL:theItem)
          else
            set theImage to (current application's NSImage's alloc()'s initWithContentsOfURL:theItem)
          end if
          if theImage is not missing value then
            copy theImage to end of theImages
          end if
        else if (theItem's |class|()) is current application's NSConcreteAttributedString then
          repeat with i from 0 to ((theItem's |length|()) - 1)
            set attrs to (theItem's attributesAtIndex:i longestEffectiveRange:(missing value) inRange:{i, (theItem's |length|()) - i})
            set theAttachment to (attrs's objectForKey:"NSAttachment")
            if theAttachment is not missing value then
              set cell to theAttachment's attachmentCell()
              set theImage to cell's image()
              copy theImage to end of theImages
            end if
          end repeat
        end if
      end repeat
      
      set tempDir to current application's NSTemporaryDirectory() as text
      set filePaths to {}
      repeat with i from 1 to count theImages
        set theImage to item i of theImages
        set theFile to tempDir & "clipboardImage_" & i
        if theImage's |class|() is current application's PDFDocument then
          set theFile to theFile & ".pdf"
          (theImage's writeToFile:theFile)
        else
          set theFile to theFile & ".png"
          set theTIFFData to theImage's TIFFRepresentation()
          set theBitmap to (current application's NSBitmapImageRep's alloc()'s initWithData:theTIFFData)
          set thePNGData to (theBitmap's representationUsingType:(current application's NSBitmapImageFileTypePNG) |properties|:(current application's NSDictionary's alloc()'s init()))
          (thePNGData's writeToFile:theFile atomically:false)
        end if
        copy theFile to end of filePaths
      end repeat
      
      return filePaths`),De=async r=>{let e=Array.isArray(r)?r:[r];await $(`use framework "Foundation"
      use framework "PDFKit"
      use scripting additions
  
      set thePasteboard to current application's NSPasteboard's generalPasteboard()
      thePasteboard's clearContents()
      
      -- Handle PDFs separately
      set pdfPaths to {"${e.filter(t=>t.endsWith(".pdf")).join('", "')}"}
  
      set pdfItems to current application's NSMutableArray's alloc()'s init()
      repeat with pdfPath in pdfPaths
        if length of pdfPath is not 0 then
          set pdfItem to current application's NSPasteboardItem's alloc()'s init()
          set pdfData to current application's NSData's dataWithContentsOfFile:pdfPath
          pdfItem's setData:pdfData forType:(current application's NSPasteboardTypePDF)
          pdfItems's addObject:pdfItem
        end if
      end repeat
  
      if pdfItems's |count|() > 0 then
        thePasteboard's writeObjects:pdfItems
      end if
        
      -- Handle all other image types
      set theFiles to {"${e.join('", "')}"}
    
      set theImages to {}
      repeat with theFile in theFiles
        if length of theFile is not 0 then
          set theImage to (current application's NSImage's alloc()'s initWithContentsOfFile:theFile)
          if theImage is not missing value then
            copy theImage to end of theImages
          end if
        end if
      end repeat
      
      if (count theImages) > 0 then
        thePasteboard's writeObjects:theImages
      end if`)};var We=require("fs/promises");var j=U(require("path"));var Z=require("child_process");function W(r,e){let t=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(f=>f.toString())||[]],i=e?.trailingArgs||[];!t&&(a===void 0||a==="AppleScript"||a==="JXA")&&(t="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...r.startsWith("/")?[]:["-e"],r,...i.map(f=>f.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,Z.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,t=e.command,s.push(r,...i.map(f=>f.toString()))),!t)throw new Error("No command specified.");let o="",d=f=>{console.log(f)},l=(0,Z.spawn)(t,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${t} ${s.join(" ")}"`),l.stdout?.on("data",f=>{o+=f.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${o}`)}),l.stderr?.on("data",f=>{e?.stderrCallback&&e.stderrCallback(f.toString()),e?.logErrors&&console.error(f.toString())}),l.stdin.on("error",f=>{e?.logErrors&&console.error(`Error writing to stdin: ${f}`)}),d=async f=>{f?.length>0&&(l.stdin.cork(),l.stdin.write(`${f}\r
`),process.nextTick(()=>l.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${f}`))},{data:(async()=>new Promise((f,I)=>{let D=e?.timeout?setTimeout(()=>{try{l.kill()}catch(E){e?.logErrors&&console.error(`Error killing process: ${E}`)}return e?.logErrors&&console.error("Script timed out"),l.stdin.end(),l.kill(),I("Script timed out")},e?.timeout):void 0;l.on("close",E=>{if(E!==0)return e?.logErrors&&console.error(`Script exited with code ${E}`),l.stdin.end(),l.kill(),I(`Script exited with code ${E}`);clearTimeout(D);let R;try{R=JSON.parse(o)}catch{R=o.trim()}return e?.logFinalOutput&&console.log(`Script output: ${R}`),f(R)})}))(),sendMessage:d}}var B=require("@raycast/api");function O(r){return r.split(", /").map((e,t)=>t===0?e.trim():`/${e.trim()}`)}async function Re(){let r=j.default.join(B.environment.assetsPath,"scripts","finder.scpt"),e=await W(r,{language:"AppleScript",stderrCallback:t=>v("Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:O(e)}async function Te(){let r=j.default.join(B.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await W(r,{language:"AppleScript",stderrCallback:t=>v("HoudahSpot Selection Error",new Error(t))}).data;return Array.isArray(e)?e:O(e)}async function Ue(){let r=j.default.join(B.environment.assetsPath,"scripts","neofinder.scpt"),e=await W(r,{language:"AppleScript",stderrCallback:t=>v("NeoFinder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:O(e)}async function Oe(){let r=j.default.join(B.environment.assetsPath,"scripts","pathfinder.scpt"),e=await W(r,{language:"JXA",stderrCallback:t=>v("Path Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:O(e)}async function Ne(){let r=j.default.join(B.environment.assetsPath,"scripts","qspace.scpt"),e=await W(r,{language:"JXA",stderrCallback:t=>v("QSpace Pro Selection Error",new Error(t))}).data;return Array.isArray(e)?e:O(e)}async function Le(){let r=j.default.join(B.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await W(r,{language:"JXA",stderrCallback:t=>v("ForkLift Selection Error",new Error(t))}).data;return Array.isArray(e)?e:O(e)}var C=async(r,e)=>{let t=m.default.join(P.tmpdir(),`${r}.${e}`);return{path:t,[Symbol.asyncDispose]:async()=>{g.existsSync(t)&&await g.promises.rm(t,{recursive:!0})}}},ue=async r=>{let e=m.default.join(P.tmpdir(),r);return await(0,We.mkdir)(e,{recursive:!0}),{path:e,[Symbol.asyncDispose]:async()=>{g.existsSync(e)&&await g.promises.rm(e,{recursive:!0})}}},je=async()=>{let e=(await c.LocalStorage.getItem("itemsToRemove")??"").toString().split(`
`).filter(Boolean);for(let t of e)g.existsSync(t)&&await g.promises.rm(t,{recursive:!0});await c.LocalStorage.removeItem("itemsToRemove")},Be=async()=>{let r=[],t=(0,c.getPreferenceValues)().inputMethod,a=!1;if(t=="Clipboard")try{let n=O(await Ce());if(await c.LocalStorage.setItem("itemsToRemove",n.join(`
`)),n.filter(o=>o.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=t;try{s=(await(0,c.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(t=="Path Finder"||s=="Path Finder")&&(r=await Oe())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(t=="NeoFinder"||s=="NeoFinder")&&(r=await Ue())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(t=="HoudahSpot"||s=="HoudahSpot")&&(r=await Te())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(t=="QSpace"||s=="QSpace Pro"||s=="QSpace")&&(r=await Ne())}catch(n){console.error(`Couldn't get images from ${s}: ${n}`),a=!0}try{(t=="ForkLift"||s=="ForkLift")&&(r=await Le())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(r.length>0)return r.filter((n,o)=>r.indexOf(n)===o);let i=await Re();return s=="Finder"||t=="Finder"||a?r=i:i.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!r.includes(n)&&r.push(n)}),r.filter((n,o)=>r.indexOf(n)===o)},Me=async r=>{let e="Finder";try{e=(await(0,c.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let t=(0,c.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await De(r),_e(r)):t.imageResultHandling=="openInPreview"?(await $t(r),_e(r)):t.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,c.showInFinder)(r[0]):(t.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,c.showInFinder)(r[0])},Ve=async()=>(P.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,z.execSync)(`chmod +x "${c.environment.assetsPath}/webp/arm/dwebp"`),(0,z.execSync)(`chmod +x "${c.environment.assetsPath}/webp/arm/cwebp"`),g.existsSync(`${c.environment.assetsPath}/webp/x86/dwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/x86/dwebp`),g.existsSync(`${c.environment.assetsPath}/webp/x86/cwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/x86/cwebp`),[`${c.environment.assetsPath}/webp/arm/dwebp`,`${c.environment.assetsPath}/webp/arm/cwebp`]):((0,z.execSync)(`chmod +x "${c.environment.assetsPath}/webp/x86/dwebp"`),(0,z.execSync)(`chmod +x "${c.environment.assetsPath}/webp/x86/cwebp"`),g.existsSync(`${c.environment.assetsPath}/webp/arm/dwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/arm/dwebp`),g.existsSync(`${c.environment.assetsPath}/webp/arm/cwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/arm/cwebp`),[`${c.environment.assetsPath}/webp/x86/dwebp`,`${c.environment.assetsPath}/webp/x86/cwebp`]);var ze=async(r,e,t)=>$(`use framework "Foundation"
  use scripting additions

  -- Load SVG image from file
  set svgFilePath to "${e}"
  set svgData to current application's NSData's alloc()'s initWithContentsOfFile:svgFilePath
  
  -- Create image from SVG data
  set svgImage to current application's NSImage's alloc()'s initWithData:svgData
  
  -- Convert image to PNG data
  set tiffData to svgImage's TIFFRepresentation()
  set theBitmap to current application's NSBitmapImageRep's alloc()'s initWithData:tiffData

  try
    set pngData to theBitmap's representationUsingType:(current application's NSBitmapImageFileType${r}) |properties|:(missing value)
  on error
    set pngData to theBitmap's representationUsingType:(current application's NSBitmapImageFileTypePNG) |properties|:(missing value)
  end
  
  -- Save PNG data to file
  pngData's writeToFile:"${t}" atomically:false`),Ge=async(r,e,t)=>{let a=(0,c.getPreferenceValues)(),s="NSPNGFileType";return r=="JPEG"?s="NSJPEGFileType":r=="TIFF"&&(s="NSTIFFFileType"),$(`use framework "Foundation"
  use framework "PDFKit"
  
  -- Load the PDF file as NSData
  set pdfData to current application's NSData's dataWithContentsOfFile:"${e}"
  
  -- Create a PDFDocument from the PDF data
  set pdfDoc to current application's PDFDocument's alloc()'s initWithData:pdfData

  ${a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview"?"set pageImages to current application's NSMutableArray's alloc()'s init()":""}
  
  set pageCount to (pdfDoc's pageCount()) - 1
  repeat with pageIndex from 0 to pageCount
    -- Create an NSImage from each page of the PDF document
    set pdfPage to (pdfDoc's pageAtIndex:pageIndex)
    set pdfRect to (pdfPage's boundsForBox:(current application's kPDFDisplayBoxMediaBox))
    set pdfImage to (current application's NSImage's alloc()'s initWithSize:{item 1 of item 2 of pdfRect, item 2 of item 2 of pdfRect})
    pdfImage's lockFocus()
    (pdfPage's drawWithBox:(current application's kPDFDisplayBoxMediaBox))
    pdfImage's unlockFocus()

    ${a.imageResultHandling=="copyToClipboard"?"pageImages's addObject:pdfImage":`
  
    -- Convert the NSImage to PNG data
    set pngData to pdfImage's TIFFRepresentation()
    set pngRep to (current application's NSBitmapImageRep's imageRepWithData:pngData)
    set pngData to (pngRep's representationUsingType:(current application's ${s}) |properties|:(missing value))
    
    -- Write the PNG data to a new file
    set filePath to "${t}/page-" & pageIndex + 1 & ".${r.toLowerCase()}"
    set fileURL to current application's NSURL's fileURLWithPath:filePath
    ${a.imageResultHandling=="openInPreview"?"pageImages's addObject:fileURL":""}
    pngData's writeToURL:fileURL atomically:false`}
  end repeat

  ${a.imageResultHandling=="openInPreview"?`
    -- Open the images of each page in Preview, then delete their temporary files
    tell application "Finder"
      set previewPath to POSIX path of ((application file id "com.apple.Preview") as text)
      set previewURL to current application's NSURL's fileURLWithPath:previewPath
    end tell

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()
    workspace's openURLs:pageImages withApplicationAtURL:previewURL configuration:config completionHandler:(missing value)
    delay 1
    
    set fileManager to current application's NSFileManager's defaultManager()
    repeat with imageURL in pageImages
      fileManager's removeItemAtURL:imageURL |error|:(missing value)
    end repeat
    `:""}
  
  ${a.imageResultHandling=="copyToClipboard"?`
    -- Copy the image of each page to the clipboard
    set thePasteboard to current application's NSPasteboard's generalPasteboard()
    thePasteboard's clearContents()
    thePasteboard's writeObjects:pageImages`:""}`,{timeout:60*1e3*5})};var $t=async r=>{let e=Array.isArray(r)?r:[r],t=e.some(a=>m.default.extname(a)==".svg");await $(`use framework "Foundation"
    use scripting additions
    set pageImages to {${e.map(a=>`current application's NSURL's fileURLWithPath:"${a}"`).join(", ")}}

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()

    ${t?`tell application "Finder"
            set safariPath to POSIX path of ((application file id "com.apple.Safari") as text)
            set safariURL to current application's NSURL's fileURLWithPath:safariPath
          end tell

          workspace's openURLs:pageImages withApplicationAtURL:safariURL configuration:config completionHandler:(missing value)
          
          tell application "Safari"
            set finished to false
            set iter to 0
            repeat while ((count of windows) = 0 or finished is not true) and iter < 10
              delay 0.5
              set iter to iter + 1

              set currentStatus to true
              repeat with doc in (path of documents as list)
                repeat with thePath in {"${e.map(a=>encodeURI(`file://${a}`)).join('", "')}"}
                  if thePath is not in doc then
                    set currentStatus to false
                  end if
                end repeat
              end repeat
              set finished to currentStatus
            end repeat
          end tell
          `:`tell application "Finder"
            set previewPath to POSIX path of ((application file id "com.apple.Preview") as text)
            set previewURL to current application's NSURL's fileURLWithPath:previewPath
          end tell

          workspace's openURLs:pageImages withApplicationAtURL:previewURL configuration:config completionHandler:(missing value)
          
          tell application "Preview"
            set finished to false
            set iter to 0
            repeat while ((count of windows) = 0 or finished is not true) and iter < 10
              delay 0.5
              set iter to iter + 1

              set currentStatus to true
              repeat with doc in (path of documents as list)
                repeat with thePath in {"${e.join('", "')}"}
                  if thePath is not in doc then
                    set currentStatus to false
                  end if
                end repeat
              end repeat
              set finished to currentStatus
            end repeat
          end tell`}`)},_e=r=>{let e=Array.isArray(r)?r:[r];for(let t of e)g.unlinkSync(t)},kt=async()=>$(`use framework "Foundation"
    use scripting additions
    set workspace to current application's NSWorkspace's sharedWorkspace()
    set runningApps to workspace's runningApplications()
    
    set targetApp to missing value
    repeat with theApp in runningApps
      if theApp's ownsMenuBar() then
        set targetApp to theApp
        exit repeat
      end if
    end repeat
    
    if targetApp is missing value then
      return "Finder"
    else
      return targetApp's localizedName() as text
    end if`),xt=async r=>{let e="Finder";try{e=await kt()}catch(t){console.error(`Couldn't get frontmost application: ${t}`)}try{if(e=="Path Finder")return $(`tell application "Path Finder"
        if 1 \u2264 (count finder windows) then
          try
          get POSIX path of (target of finder window 1)
          on error message number -1728
            -- Folder is nonstandard, use container of selection
            tell application "System Events"
              set itemPath to POSIX file "${r}" as alias
              return POSIX path of container of itemPath
            end tell
          end try
        else
          get POSIX path of desktop
        end if
      end tell`)}catch(t){console.error(`Couldn't get current directory of Path Finder: ${t}`)}return $(`tell application "Finder"
    if 1 \u2264 (count Finder windows) then
      try
        return POSIX path of (target of window 1 as alias)
      on error message number -1700
        -- Folder is nonstandard, use container of selection
        set itemPath to POSIX file "${r}" as alias
        return POSIX path of (container of itemPath as alias)
      end try
    else
      return POSIX path of (desktop as alias)
    end if
  end tell`)},He=async(r,e=!1,t=void 0)=>{let a=(0,c.getPreferenceValues)(),s=await xt(r[0]);return r.map(i=>{let n=i;if(a.imageResultHandling=="saveToDownloads"?n=m.default.join(P.homedir(),"Downloads",m.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=m.default.join(P.homedir(),"Desktop",m.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=m.default.join(s,m.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=m.default.join(P.tmpdir(),m.default.basename(n))),n=t?n.replace(m.default.extname(n),`.${t}`):n,a.imageResultHandling!="replaceOriginal"&&P.tmpdir()!=m.default.dirname(n)){let o=2;for(;g.existsSync(n);)n=m.default.join(m.default.dirname(n),m.default.basename(n,m.default.extname(n))+`-${o}${m.default.extname(n)}`),o++}return n})},v=async(r,e,t,a)=>{console.error(e),t?(t.title=r,t.message=a??e.message,t.style=c.Toast.Style.Failure,t.primaryAction={title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}):t=await(0,c.showToast)({title:r,message:a??e.message,style:c.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}})},fe=r=>{let e=r.replace("#",""),t=e.slice(0,6),a=e.slice(6,8),s=parseInt(t,16),i=s>>16&255,n=s>>8&255,o=s&255;return{red:i,green:n,blue:o,alpha:a?parseInt(a,16):255}},Ke=r=>{let e=P.homedir();if(r.startsWith("~"))return r.replace(/^~(?=$|\/|\\)/,e);let t=/(\/Users\/.*?)\/.*/,a=r.match(t);return a?r.replace(a[1],e):r};var de={aliceblue:"#F0F8FFFF",antiquewhite:"#FAEBD7FF",aqua:"#00FFFFFF",aquamarine:"#7FFFD4FF",azure:"#F0FFFFFF",beige:"#F5F5DCFF",bisque:"#FFE4C4FF",black:"#000000FF",blanchedalmond:"#FFEBCDFF",blue:"#0000FFFF",blueviolet:"#8A2BE2FF",brown:"#A52A2AFF",burlywood:"#DEB887FF",cadetblue:"#5F9EA0FF",chartreuse:"#7FFF00FF",chocolate:"#D2691EFF",coral:"#FF7F50FF",cornflowerblue:"#6495EDFF",cornsilk:"#FFF8DCFF",crimson:"#DC143CFF",cyan:"#00FFFFFF",darkblue:"#00008BFF",darkcyan:"#008B8BFF",darkgoldenrod:"#B8860BFF",darkgray:"#A9A9A9FF",darkgrey:"#A9A9A9FF",darkgreen:"#006400FF",darkkhaki:"#BDB76BFF",darkmagenta:"#8B008BFF",darkolivegreen:"#556B2FFF",darkorange:"#FF8C00FF",darkorchid:"#9932CCFF",darkred:"#8B0000FF",darksalmon:"#E9967AFF",darkseagreen:"#8FBC8FFF",darkslateblue:"#483D8BFF",darkslategray:"#2F4F4FFF",darkslategrey:"#2F4F4FFF",darkturquoise:"#00CED1FF",darkviolet:"#9400D3FF",deeppink:"#FF1493FF",deepskyblue:"#00BFFFFF",dimgray:"#696969FF",dimgrey:"#696969FF",dodgerblue:"#1E90FFFF",firebrick:"#B22222FF",floralwhite:"#FFFAF0FF",forestgreen:"#228B22FF",fuchsia:"#FF00FFFF",gainsboro:"#DCDCDCFF",ghostwhite:"#F8F8FFFF",gold:"#FFD700FF",goldenrod:"#DAA520FF",gray:"#808080FF",grey:"#808080FF",green:"#008000FF",greenyellow:"#ADFF2FFF",honeydew:"#F0FFF0FF",hotpink:"#FF69B4FF",indianred:"#CD5C5CFF",indigo:"#4B0082FF",ivory:"#FFFFF0FF",khaki:"#F0E68CFF",lavender:"#E6E6FAFF",lavenderblush:"#FFF0F5FF",lawngreen:"#7CFC00FF",lemonchiffon:"#FFFACDFF",lightblue:"#ADD8E6FF",lightcoral:"#F08080FF",lightcyan:"#E0FFFFFF",lightgoldenrodyellow:"#FAFAD2FF",lightgray:"#D3D3D3FF",lightgrey:"#D3D3D3FF",lightgreen:"#90EE90FF",lightpink:"#FFB6C1FF",lightsalmon:"#FFA07AFF",lightseagreen:"#20B2AAFF",lightskyblue:"#87CEFAFF",lightslategray:"#778899FF",lightslategrey:"#778899FF",lightsteelblue:"#B0C4DEFF",lightyellow:"#FFFFE0FF",lime:"#00FF00FF",limegreen:"#32CD32FF",linen:"#FAF0E6FF",magenta:"#FF00FFFF",maroon:"#800000FF",mediumaquamarine:"#66CDAAFF",mediumblue:"#0000CDFF",mediumorchid:"#BA55D3FF",mediumpurple:"#9370D8FF",mediumseagreen:"#3CB371FF",mediumslateblue:"#7B68EEFF",mediumspringgreen:"#00FA9AFF",mediumturquoise:"#48D1CCFF",mediumvioletred:"#C71585FF",midnightblue:"#191970FF",mintcream:"#F5FFFAFF",mistyrose:"#FFE4E1FF",moccasin:"#FFE4B5FF",navajowhite:"#FFDEADFF",navy:"#000080FF",oldlace:"#FDF5E6FF",olive:"#808000FF",olivedrab:"#6B8E23FF",orange:"#FFA500FF",orangered:"#FF4500FF",orchid:"#DA70D6FF",palegoldenrod:"#EEE8AAFF",palegreen:"#98FB98FF",paleturquoise:"#AFEEEEFF",palevioletred:"#D87093FF",papayawhip:"#FFEFD5FF",peachpuff:"#FFDAB9FF",peru:"#CD853FFF",pink:"#FFC0CBFF",plum:"#DDA0DDFF",powderblue:"#B0E0E6FF",purple:"#800080FF",rebeccapurple:"#663399FF",red:"#FF0000FF",rosybrown:"#BC8F8FFF",royalblue:"#4169E1FF",saddlebrown:"#8B4513FF",salmon:"#FA8072FF",sandybrown:"#F4A460FF",seagreen:"#2E8B57FF",seashell:"#FFF5EEFF",sienna:"#A0522DFF",silver:"#C0C0C0FF",skyblue:"#87CEEBFF",slateblue:"#6A5ACDFF",slategray:"#708090FF",slategrey:"#708090FF",snow:"#FFFAFAFF",springgreen:"#00FF7FFF",steelblue:"#4682B4FF",tan:"#D2B48CFF",teal:"#008080FF",thistle:"#D8BFD8FF",tomato:"#FF6347FF",turquoise:"#40E0D0FF",violet:"#EE82EEFF",wheat:"#F5DEB3FF",white:"#FFFFFFFF",whitesmoke:"#F5F5F5FF",yellow:"#FFFF00FF",yellowgreen:"#9ACD32FF"};var k=require("child_process"),H=require("@raycast/api");var p=U(require("path")),Q=require("fs/promises");async function qe(r,e){return $(`function run() {
      ObjC.import("AppKit");
      ObjC.import("PDFKit");
      
      const document = $.PDFDocument.alloc.init;
      
      const sourcePaths = $.NSArray.arrayWithArray(["${r.join('", "')}"]);
      sourcePaths.enumerateObjectsUsingBlock((filePath, idx, stop) => {
        const image = $.NSImage.alloc.initWithContentsOfFile(filePath);
        const page = $.PDFPage.alloc.initWithImage(image);
        document.insertPageAtIndex(page, idx);
      })
      
      document.writeToFile("${e}");
    }`,{language:"JavaScript"})}var G=async(r,e,t,a=!0,s=!1)=>{let i=await $(`function run() {
      ObjC.import("CoreGraphics");
      ObjC.import("CoreImage");
      ObjC.import("Vision");
      
      const sourceURL = $.NSURL.fileURLWithPath("${r}")
      const image = $.CIImage.imageWithContentsOfURL(sourceURL);
      
      const handler = $.VNImageRequestHandler.alloc.initWithCIImageOptions(image, $.NSDictionary.alloc.init);
      const request = $.VNGenerateForegroundInstanceMaskRequest.alloc.init;
      const requests = $.NSArray.arrayWithObject(request);
      
      let error = Ref();
      handler.performRequestsError(requests, error);
      
      const result = request.results.firstObject;
      if (!result?.js) {
        if (${s}) {
          const outputURL = $.NSURL.fileURLWithPath("${e}");
          const context = $.CIContext.alloc.init;
          const format = $.kCIFormatRGBA8;
          const colorspace = $.CGColorSpaceCreateDeviceRGB();
          const outputOptions = $.NSDictionary.alloc.init;
          context.writePNGRepresentationOfImageToURLFormatColorSpaceOptionsError(image, outputURL, format, colorspace, outputOptions, error);
          return outputURL.path;
        }
        return "Failed to isolate foreground."
      }
      
      const pixelBuffer = result.generateMaskedImageOfInstancesFromRequestHandlerCroppedToInstancesExtentError(result.allInstances, handler, ${a}, error);
      const maskedImage = $.CIImage.imageWithCVPixelBuffer(pixelBuffer);
      
      ${t?`const color = $.CIColor.colorWithRedGreenBlueAlpha(${t.red/255}, ${t.green/255}, ${t.blue/255}, ${t.alpha/255});
      const colorImage = $.CIImage.imageWithColor(color).imageByCroppingToRect(maskedImage.extent);
      
      const blendFilter = $.CIFilter.filterWithName("CIBlendWithAlphaMask");
      blendFilter.setValueForKey(colorImage, "inputBackgroundImage");
      blendFilter.setValueForKey(maskedImage, "inputImage");
      blendFilter.setValueForKey(maskedImage, "inputMaskImage");
      const finalImage = blendFilter.outputImage;`:"const finalImage = maskedImage;"}
      
      const outputURL = $.NSURL.fileURLWithPath("${e}");
      const context = $.CIContext.alloc.init;
      const format = $.kCIFormatRGBA8;
      const colorspace = $.CGColorSpaceCreateDeviceRGB();
      const outputOptions = $.NSDictionary.alloc.init;
      context.writePNGRepresentationOfImageToURLFormatColorSpaceOptionsError(finalImage, outputURL, format, colorspace, outputOptions, error);
      return outputURL.path;
    }`,{language:"JavaScript"});if(i!==e)throw new Error(i)};async function pe(r,e,t=!1){let a=(0,H.getPreferenceValues)();H.environment.commandName==="tools/remove-bg"&&(a.preserveFormat=!0);let s=r.map(x=>Ke(x)),i=await He(s),n=[],o;if(e)if(e.match(/^#?[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/))o=fe(e);else if(Object.keys(de).includes(e.toLowerCase().replaceAll(" ","")))o=fe(de[e.toLowerCase().replaceAll(" ","")]);else throw new Error("Invalid color string provided.");for(let x of s){let u=i[s.indexOf(x)];if(x.toLowerCase().endsWith(".webp")){var d=[];try{let y=S(d,await C("sips-remove-bg-1","png"),!0);let h=S(d,await C("sips-remove-bg-2","png"),!0);let[T,b]=await Ve();(0,k.execFileSync)(T,[x,"-o",y.path]);await G(y.path,h.path,o,t);a.preserveFormat?(0,k.execFileSync)(b,[...a.useLosslessConversion?["-lossless"]:[],h.path,"-o",u]):(u=p.default.join(p.default.dirname(u),p.default.basename(u,".webp")+".png"),(0,k.execFileSync)("mv",[h.path,u]));n.push(u)}catch(l){var A=l,f=!0}finally{var I=L(d,A,f);I&&await I}}else if(x.toLowerCase().endsWith(".svg")){var D=[];try{let y=S(D,await C("sips-remove-bg-1","png"),!0);let h=S(D,await C("sips-remove-bg-2","png"),!0);let T=S(D,await C("sips-remove-bg-3","svg"),!0);await ze("PNG",x,y.path);await G(y.path,h.path,o,t);if(a.preserveFormat){let b=p.default.join(H.environment.assetsPath,"potrace/potrace");(0,k.execFileSync)("chmod",["+x",b]),(0,k.execFileSync)("sips",["--setProperty","format","bmp",h.path,"--out",T.path]),(0,k.execFileSync)(b,["-s","--tight","-o",u,T.path])}else u=p.default.join(p.default.dirname(u),p.default.basename(u,".svg")+".png"),(0,k.execFileSync)("mv",[h.path,u]);n.push(u)}catch(E){var R=E,Y=!0}finally{var K=L(D,R,Y);K&&await K}}else if(x.toLowerCase().endsWith(".avif")){var ee=[];try{let y=S(ee,await C("sips-remove-bg-1","png"),!0);let h=S(ee,await C("sips-remove-bg-2","png"),!0);let{encoderPath:T,decoderPath:b}=await X();(0,k.execFileSync)(b,[x,y.path]);await G(y.path,h.path,o,t);a.preserveFormat?(0,k.execFileSync)(T,[...a.useLosslessConversion?Ee:[],h.path,u]):(u=p.default.join(p.default.dirname(u),p.default.basename(u,".avif")+".png"),(0,k.execFileSync)("mv",[h.path,u]));n.push(u)}catch(Je){var Xe=Je,Ze=!0}finally{var he=L(ee,Xe,Ze);he&&await he}}else if(x.toLowerCase().endsWith(".pdf")){var te=[];try{let y=S(te,await ue("sips-remove-bg-1"),!0);let h=S(te,await ue("sips-remove-bg-2"),!0);await Ge("PNG",x,y.path);let T=(await(0,Q.readdir)(y.path)).map(b=>p.default.join(y.path,b));for(let b of T){let N=p.default.join(h.path,p.default.basename(b));await G(b,N,o,t,!0)}if(a.preserveFormat){let b=(await(0,Q.readdir)(h.path)).map(N=>p.default.join(h.path,N));b.sort((N,re)=>parseInt(N?.split("-").at(-1)||"0")>parseInt(re?.split("-").at(-1)||"0")?1:-1),await qe(b,u),n.push(u)}else{let b=p.default.join(p.default.dirname(u),p.default.basename(u,".pdf")+"-pngs");(0,k.execFileSync)("mv",[h.path,b]);let N=(await(0,Q.readdir)(b)).map(re=>p.default.join(b,re));n.push(...N)}}catch(Qe){var Ye=Qe,et=!0}finally{var me=L(te,Ye,et);me&&await me}}else{var ge=[];try{let y=x.split(".").pop()??"png";y==="jpg"&&(y="jpeg");let h=S(ge,await C("sips-remove-bg","png"),!0);await G(x,h.path,o,t);a.preserveFormat?(0,k.execFileSync)("sips",["-s","format",y.toLowerCase(),h.path,"--out",u]):(u=p.default.join(p.default.dirname(u),p.default.basename(u,".png")+".png"),(0,k.execFileSync)("mv",[h.path,u]));n.push(u)}catch(tt){var rt=tt,at=!0}finally{var be=L(ge,rt,at);be&&await be}}}return await Me(n),n}async function St({imagePaths:r,bgReplacementColor:e,shouldCrop:t}){let a=r?.length?r:await Be(),s=await pe(a,e,t);return await je(),s}
