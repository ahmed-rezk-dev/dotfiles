"use strict";var ct=Object.create;var X=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var ut=Object.getOwnPropertyNames;var ft=Object.getPrototypeOf,dt=Object.prototype.hasOwnProperty;var we=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),$e=t=>{throw TypeError(t)};var pt=(t,e)=>{for(var r in e)X(t,r,{get:e[r],enumerable:!0})},ke=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ut(e))!dt.call(t,s)&&s!==r&&X(t,s,{get:()=>e[s],enumerable:!(a=lt(e,s))||a.enumerable});return t};var U=(t,e,r)=>(r=t!=null?ct(ft(t)):{},ke(e||!t||!t.__esModule?X(r,"default",{value:t,enumerable:!0}):r,t)),ht=t=>ke(X({},"__esModule",{value:!0}),t);var v=(t,e,r)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&$e("Object expected");var a,s;r&&(a=e[we("asyncDispose")]),a===void 0&&(a=e[we("dispose")],r&&(s=a)),typeof a!="function"&&$e("Object not disposable"),s&&(a=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),t.push([r,a,e])}else r&&t.push([r]);return e},L=(t,e,r)=>{var a=typeof SuppressedError=="function"?SuppressedError:function(n,o,d,l){return l=Error(d),l.name="SuppressedError",l.error=n,l.suppressed=o,l},s=n=>e=r?new a(n,e,"An error was suppressed during disposal"):(r=!0,n),i=n=>{for(;n=t.pop();)try{var o=n[1]&&n[1].call(n[2]);if(n[0])return Promise.resolve(o).then(i,d=>(s(d),i()))}catch(d){s(d)}if(r)throw e};return i()};var It={};pt(It,{default:()=>Qe});module.exports=ht(It);var Ze=require("@raycast/api");var G=require("child_process"),g=U(require("fs")),P=U(require("os")),m=U(require("path")),c=require("@raycast/api");var _=U(require("react")),F=require("@raycast/api");var Pe=U(require("node:child_process")),Ae=require("node:buffer"),V=U(require("node:stream")),Ie=require("node:util");var Ee=require("react/jsx-runtime");var se=globalThis;var Z=t=>!!t&&typeof t=="object"&&typeof t.removeListener=="function"&&typeof t.emit=="function"&&typeof t.reallyExit=="function"&&typeof t.listeners=="function"&&typeof t.kill=="function"&&typeof t.pid=="number"&&typeof t.on=="function",ie=Symbol.for("signal-exit emitter"),ce=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),se[ie])return se[ie];Object.defineProperty(se,ie,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,r){this.listeners[e].push(r)}removeListener(e,r){let a=this.listeners[e],s=a.indexOf(r);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,r,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(r,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",r,a)||s),s}},le=class{onExit(){return()=>{}}load(){}unload(){}},ue=class{#o;#t;#e;#s;#i;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new ce,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let r of this.#r)this.#n[r]=()=>{let a=this.#e.listeners(r),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,r),o=r==="SIGHUP"?this.#o:r;n||e.kill(e.pid,o)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,r){if(!Z(this.#e))return()=>{};this.#a===!1&&this.load();let a=r?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let r=this.#n[e];r&&this.#e.on(e,r)}catch{}this.#e.emit=(e,...r)=>this.#l(e,...r),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let r=this.#n[e];if(!r)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,r)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return Z(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...r){let a=this.#s;if(e==="exit"&&Z(this.#e)){typeof r[0]=="number"&&(this.#e.exitCode=r[0]);let s=a.call(this.#e,e,...r);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...r)}},oe=null,mt=(t,e)=>(oe||(oe=Z(process)?new ue(process):new le),oe.onExit(t,e));function gt(t,{timeout:e}={}){let r=new Promise((o,d)=>{t.on("exit",(l,A)=>{o({exitCode:l,signal:A,timedOut:!1})}),t.on("error",l=>{d(l)}),t.stdin&&t.stdin.on("error",l=>{d(l)})}),a=mt(()=>{t.kill()});if(e===0||e===void 0)return r.finally(()=>a());let s,i=new Promise((o,d)=>{s=setTimeout(()=>{t.kill("SIGTERM"),d(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=r.finally(()=>{clearTimeout(s)});return Promise.race([i,n]).finally(()=>a())}var fe=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function bt(t){let{encoding:e}=t,r=e==="buffer",a=new V.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,i=[];return a.on("data",n=>{i.push(n),s+=n.length}),a.getBufferedValue=()=>r?Buffer.concat(i,s):i.join(""),a.getBufferedLength=()=>s,a}async function Se(t,e){let r=bt(e);return await new Promise((a,s)=>{let i=n=>{n&&r.getBufferedLength()<=Ae.constants.MAX_LENGTH&&(n.bufferedData=r.getBufferedValue()),s(n)};(async()=>{try{await(0,Ie.promisify)(V.default.pipeline)(t,r),a()}catch(n){i(n)}})(),r.on("data",()=>{r.getBufferedLength()>8e7&&i(new fe)})}),r.getBufferedValue()}async function xe(t,e){t.destroy();try{return await e}catch(r){return r.bufferedData}}async function yt({stdout:t,stderr:e},{encoding:r},a){let s=Se(t,{encoding:r}),i=Se(e,{encoding:r});try{return await Promise.all([a,s,i])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},xe(t,s),xe(e,i)])}}function Ft(t){let e=typeof t=="string"?`
`:10,r=typeof t=="string"?"\r":13;return t[t.length-1]===e&&(t=t.slice(0,-1)),t[t.length-1]===r&&(t=t.slice(0,-1)),t}function ve(t,e){return t.stripFinalNewline?Ft(e):e}function wt({timedOut:t,timeout:e,signal:r,exitCode:a}){return t?`timed out after ${e} milliseconds`:r!=null?`was killed with ${r}`:a!=null?`failed with exit code ${a}`:"failed"}function $t({stdout:t,stderr:e,error:r,signal:a,exitCode:s,command:i,timedOut:n,options:o,parentError:d}){let A=`Command ${wt({timedOut:n,timeout:o?.timeout,signal:a,exitCode:s})}: ${i}`,f=r?`${A}
${r.message}`:A,I=[f,e,t].filter(Boolean).join(`
`);return r?r.originalMessage=r.message:r=d,r.message=I,r.shortMessage=f,r.command=i,r.exitCode=s,r.signal=a,r.stdout=t,r.stderr=e,"bufferedData"in r&&delete r.bufferedData,r}function kt({stdout:t,stderr:e,error:r,exitCode:a,signal:s,timedOut:i,command:n,options:o,parentError:d}){if(r||a!==0||s!==null)throw $t({error:r,exitCode:a,signal:s,stdout:t,stderr:e,command:n,timedOut:i,options:o,parentError:d});return t}async function k(t,e,r){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:i,...n}=Array.isArray(e)?r||{}:e||{},o=a!==!1?[]:["-ss"];s==="JavaScript"&&o.push("-l","JavaScript"),Array.isArray(e)&&o.push("-",...e);let d=Pe.default.spawn("osascript",o,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=gt(d,{timeout:i??1e4});d.stdin.end(t);let[{error:A,exitCode:f,signal:I,timedOut:R},E,D]=await yt(d,{encoding:"utf8"},l),te=ve({stripFinalNewline:!0},E),J=ve({stripFinalNewline:!0},D);return kt({stdout:te,stderr:J,error:A,exitCode:f,signal:I,timedOut:R,command:"osascript",options:r,parentError:new Error})}var z=require("child_process"),w=require("@raycast/api");var Ce=require("fs"),Re=["-s","0","--min","0","--max","0","--minalpha","0","--maxalpha","0","--qcolor","100","--qalpha","100"];async function St(){let t="";try{t=(0,z.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(t==="")return await(0,w.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:w.Toast.Style.Failure}),!1;if(await(0,w.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,w.showToast)({title:"Installing AVIF Encoder...",style:w.Toast.Style.Animated});try{if((0,z.execSync)(`/bin/zsh -ilc '${t} install --quiet libavif || true'`),!xt())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=w.Toast.Style.Success,!0}catch(r){console.error(r),$("Failed to install AVIF Encoder.",r,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,w.showToast)({title:"AVIF Encoder not installed.",style:w.Toast.Style.Failure}),!1}async function xt(){let r=!1,a=0;for(;!r&&a<7;){let s=(0,z.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,Ce.existsSync)(s)){r=!0;break}await new Promise(i=>setTimeout(i,1e3)),a++}return r}async function Q(){let t=await w.LocalStorage.getItem("avifEncoderPath"),e=await w.LocalStorage.getItem("avifDecoderPath");if(!t||!e)try{t=(0,z.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,z.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim(),t&&await w.LocalStorage.setItem("avifEncoderPath",t),e&&await w.LocalStorage.setItem("avifDecoderPath",e)}catch(r){if(await St())try{return await Q()}catch(a){console.error(a),$("AVIF Encoder not found.",a,void 0,"Please install the libavif Homebrew formula manually and try again.")}else $("AVIF Encoder not found.",r,void 0,"Please install the libavif Homebrew formula and try again.")}if(typeof t!="string"||typeof e!="string")throw new Error("AVIF encoder and decoder paths could not be resolved.");return{encoderPath:t,decoderPath:e}}var De=async()=>k(`use framework "AppKit"
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
      
      return filePaths`),Te=async t=>{let e=Array.isArray(t)?t:[t];await k(`use framework "Foundation"
      use framework "PDFKit"
      use scripting additions
  
      set thePasteboard to current application's NSPasteboard's generalPasteboard()
      thePasteboard's clearContents()
      
      -- Handle PDFs separately
      set pdfPaths to {"${e.filter(r=>r.endsWith(".pdf")).join('", "')}"}
  
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
      end if`)};var je=require("fs/promises");var M=U(require("path"));var Y=require("child_process");function W(t,e){let r=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(f=>f.toString())||[]],i=e?.trailingArgs||[];!r&&(a===void 0||a==="AppleScript"||a==="JXA")&&(r="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...t.startsWith("/")?[]:["-e"],t,...i.map(f=>f.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,Y.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,r=e.command,s.push(t,...i.map(f=>f.toString()))),!r)throw new Error("No command specified.");let o="",d=f=>{console.log(f)},l=(0,Y.spawn)(r,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${r} ${s.join(" ")}"`),l.stdout?.on("data",f=>{o+=f.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${o}`)}),l.stderr?.on("data",f=>{e?.stderrCallback&&e.stderrCallback(f.toString()),e?.logErrors&&console.error(f.toString())}),l.stdin.on("error",f=>{e?.logErrors&&console.error(`Error writing to stdin: ${f}`)}),d=async f=>{f?.length>0&&(l.stdin.cork(),l.stdin.write(`${f}\r
`),process.nextTick(()=>l.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${f}`))},{data:(async()=>new Promise((f,I)=>{let R=e?.timeout?setTimeout(()=>{try{l.kill()}catch(E){e?.logErrors&&console.error(`Error killing process: ${E}`)}return e?.logErrors&&console.error("Script timed out"),l.stdin.end(),l.kill(),I("Script timed out")},e?.timeout):void 0;l.on("close",E=>{if(E!==0)return e?.logErrors&&console.error(`Script exited with code ${E}`),l.stdin.end(),l.kill(),I(`Script exited with code ${E}`);clearTimeout(R);let D;try{D=JSON.parse(o)}catch{D=o.trim()}return e?.logFinalOutput&&console.log(`Script output: ${D}`),f(D)})}))(),sendMessage:d}}var j=require("@raycast/api");function O(t){return t.split(", /").map((e,r)=>r===0?e.trim():`/${e.trim()}`)}async function Ue(){let t=M.default.join(j.environment.assetsPath,"scripts","finder.scpt"),e=await W(t,{language:"AppleScript",stderrCallback:r=>$("Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function Oe(){let t=M.default.join(j.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await W(t,{language:"AppleScript",stderrCallback:r=>$("HoudahSpot Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function Ne(){let t=M.default.join(j.environment.assetsPath,"scripts","neofinder.scpt"),e=await W(t,{language:"AppleScript",stderrCallback:r=>$("NeoFinder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function Le(){let t=M.default.join(j.environment.assetsPath,"scripts","pathfinder.scpt"),e=await W(t,{language:"JXA",stderrCallback:r=>$("Path Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function _e(){let t=M.default.join(j.environment.assetsPath,"scripts","qspace.scpt"),e=await W(t,{language:"JXA",stderrCallback:r=>$("QSpace Pro Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function We(){let t=M.default.join(j.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await W(t,{language:"JXA",stderrCallback:r=>$("ForkLift Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}var C=async(t,e)=>{let r=m.default.join(P.tmpdir(),`${t}.${e}`);return{path:r,[Symbol.asyncDispose]:async()=>{g.existsSync(r)&&await g.promises.rm(r,{recursive:!0})}}},de=async t=>{let e=m.default.join(P.tmpdir(),t);return await(0,je.mkdir)(e,{recursive:!0}),{path:e,[Symbol.asyncDispose]:async()=>{g.existsSync(e)&&await g.promises.rm(e,{recursive:!0})}}},Be=async()=>{let e=(await c.LocalStorage.getItem("itemsToRemove")??"").toString().split(`
`).filter(Boolean);for(let r of e)g.existsSync(r)&&await g.promises.rm(r,{recursive:!0});await c.LocalStorage.removeItem("itemsToRemove")},Ve=async()=>{let t=[],r=(0,c.getPreferenceValues)().inputMethod,a=!1;if(r=="Clipboard")try{let n=O(await De());if(await c.LocalStorage.setItem("itemsToRemove",n.join(`
`)),n.filter(o=>o.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=r;try{s=(await(0,c.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(r=="Path Finder"||s=="Path Finder")&&(t=await Le())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(r=="NeoFinder"||s=="NeoFinder")&&(t=await Ne())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(r=="HoudahSpot"||s=="HoudahSpot")&&(t=await Oe())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(r=="QSpace"||s=="QSpace Pro"||s=="QSpace")&&(t=await _e())}catch(n){console.error(`Couldn't get images from ${s}: ${n}`),a=!0}try{(r=="ForkLift"||s=="ForkLift")&&(t=await We())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(t.length>0)return t.filter((n,o)=>t.indexOf(n)===o);let i=await Ue();return s=="Finder"||r=="Finder"||a?t=i:i.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!t.includes(n)&&t.push(n)}),t.filter((n,o)=>t.indexOf(n)===o)},ze=async t=>{let e="Finder";try{e=(await(0,c.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let r=(0,c.getPreferenceValues)();r.imageResultHandling=="copyToClipboard"?(await Te(t),Me(t)):r.imageResultHandling=="openInPreview"?(await vt(t),Me(t)):r.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,c.showInFinder)(t[0]):(r.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,c.showInFinder)(t[0])},Ge=async()=>(P.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,G.execSync)(`chmod +x "${c.environment.assetsPath}/webp/arm/dwebp"`),(0,G.execSync)(`chmod +x "${c.environment.assetsPath}/webp/arm/cwebp"`),g.existsSync(`${c.environment.assetsPath}/webp/x86/dwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/x86/dwebp`),g.existsSync(`${c.environment.assetsPath}/webp/x86/cwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/x86/cwebp`),[`${c.environment.assetsPath}/webp/arm/dwebp`,`${c.environment.assetsPath}/webp/arm/cwebp`]):((0,G.execSync)(`chmod +x "${c.environment.assetsPath}/webp/x86/dwebp"`),(0,G.execSync)(`chmod +x "${c.environment.assetsPath}/webp/x86/cwebp"`),g.existsSync(`${c.environment.assetsPath}/webp/arm/dwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/arm/dwebp`),g.existsSync(`${c.environment.assetsPath}/webp/arm/cwebp`)&&await g.promises.rm(`${c.environment.assetsPath}/webp/arm/cwebp`),[`${c.environment.assetsPath}/webp/x86/dwebp`,`${c.environment.assetsPath}/webp/x86/cwebp`]);var He=async(t,e,r)=>k(`use framework "Foundation"
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
    set pngData to theBitmap's representationUsingType:(current application's NSBitmapImageFileType${t}) |properties|:(missing value)
  on error
    set pngData to theBitmap's representationUsingType:(current application's NSBitmapImageFileTypePNG) |properties|:(missing value)
  end
  
  -- Save PNG data to file
  pngData's writeToFile:"${r}" atomically:false`),Ke=async(t,e,r)=>{let a=(0,c.getPreferenceValues)(),s="NSPNGFileType";return t=="JPEG"?s="NSJPEGFileType":t=="TIFF"&&(s="NSTIFFFileType"),k(`use framework "Foundation"
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
    set filePath to "${r}/page-" & pageIndex + 1 & ".${t.toLowerCase()}"
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
    thePasteboard's writeObjects:pageImages`:""}`,{timeout:60*1e3*5})};var vt=async t=>{let e=Array.isArray(t)?t:[t],r=e.some(a=>m.default.extname(a)==".svg");await k(`use framework "Foundation"
    use scripting additions
    set pageImages to {${e.map(a=>`current application's NSURL's fileURLWithPath:"${a}"`).join(", ")}}

    set workspace to current application's NSWorkspace's sharedWorkspace()
    set config to current application's NSWorkspaceOpenConfiguration's configuration()

    ${r?`tell application "Finder"
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
          end tell`}`)},Me=t=>{let e=Array.isArray(t)?t:[t];for(let r of e)g.unlinkSync(r)},Pt=async()=>k(`use framework "Foundation"
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
    end if`),At=async t=>{let e="Finder";try{e=await Pt()}catch(r){console.error(`Couldn't get frontmost application: ${r}`)}try{if(e=="Path Finder")return k(`tell application "Path Finder"
        if 1 \u2264 (count finder windows) then
          try
          get POSIX path of (target of finder window 1)
          on error message number -1728
            -- Folder is nonstandard, use container of selection
            tell application "System Events"
              set itemPath to POSIX file "${t}" as alias
              return POSIX path of container of itemPath
            end tell
          end try
        else
          get POSIX path of desktop
        end if
      end tell`)}catch(r){console.error(`Couldn't get current directory of Path Finder: ${r}`)}return k(`tell application "Finder"
    if 1 \u2264 (count Finder windows) then
      try
        return POSIX path of (target of window 1 as alias)
      on error message number -1700
        -- Folder is nonstandard, use container of selection
        set itemPath to POSIX file "${t}" as alias
        return POSIX path of (container of itemPath as alias)
      end try
    else
      return POSIX path of (desktop as alias)
    end if
  end tell`)},qe=async(t,e=!1,r=void 0)=>{let a=(0,c.getPreferenceValues)(),s=await At(t[0]);return t.map(i=>{let n=i;if(a.imageResultHandling=="saveToDownloads"?n=m.default.join(P.homedir(),"Downloads",m.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=m.default.join(P.homedir(),"Desktop",m.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=m.default.join(s,m.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=m.default.join(P.tmpdir(),m.default.basename(n))),n=r?n.replace(m.default.extname(n),`.${r}`):n,a.imageResultHandling!="replaceOriginal"&&P.tmpdir()!=m.default.dirname(n)){let o=2;for(;g.existsSync(n);)n=m.default.join(m.default.dirname(n),m.default.basename(n,m.default.extname(n))+`-${o}${m.default.extname(n)}`),o++}return n})},$=async(t,e,r,a)=>{console.error(e),r?(r.title=t,r.message=a??e.message,r.style=c.Toast.Style.Failure,r.primaryAction={title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}):r=await(0,c.showToast)({title:t,message:a??e.message,style:c.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}})},pe=t=>{let e=t.replace("#",""),r=e.slice(0,6),a=e.slice(6,8),s=parseInt(r,16),i=s>>16&255,n=s>>8&255,o=s&255;return{red:i,green:n,blue:o,alpha:a?parseInt(a,16):255}},Je=t=>{let e=P.homedir();if(t.startsWith("~"))return t.replace(/^~(?=$|\/|\\)/,e);let r=/(\/Users\/.*?)\/.*/,a=t.match(r);return a?t.replace(a[1],e):t};var H={aliceblue:"#F0F8FFFF",antiquewhite:"#FAEBD7FF",aqua:"#00FFFFFF",aquamarine:"#7FFFD4FF",azure:"#F0FFFFFF",beige:"#F5F5DCFF",bisque:"#FFE4C4FF",black:"#000000FF",blanchedalmond:"#FFEBCDFF",blue:"#0000FFFF",blueviolet:"#8A2BE2FF",brown:"#A52A2AFF",burlywood:"#DEB887FF",cadetblue:"#5F9EA0FF",chartreuse:"#7FFF00FF",chocolate:"#D2691EFF",coral:"#FF7F50FF",cornflowerblue:"#6495EDFF",cornsilk:"#FFF8DCFF",crimson:"#DC143CFF",cyan:"#00FFFFFF",darkblue:"#00008BFF",darkcyan:"#008B8BFF",darkgoldenrod:"#B8860BFF",darkgray:"#A9A9A9FF",darkgrey:"#A9A9A9FF",darkgreen:"#006400FF",darkkhaki:"#BDB76BFF",darkmagenta:"#8B008BFF",darkolivegreen:"#556B2FFF",darkorange:"#FF8C00FF",darkorchid:"#9932CCFF",darkred:"#8B0000FF",darksalmon:"#E9967AFF",darkseagreen:"#8FBC8FFF",darkslateblue:"#483D8BFF",darkslategray:"#2F4F4FFF",darkslategrey:"#2F4F4FFF",darkturquoise:"#00CED1FF",darkviolet:"#9400D3FF",deeppink:"#FF1493FF",deepskyblue:"#00BFFFFF",dimgray:"#696969FF",dimgrey:"#696969FF",dodgerblue:"#1E90FFFF",firebrick:"#B22222FF",floralwhite:"#FFFAF0FF",forestgreen:"#228B22FF",fuchsia:"#FF00FFFF",gainsboro:"#DCDCDCFF",ghostwhite:"#F8F8FFFF",gold:"#FFD700FF",goldenrod:"#DAA520FF",gray:"#808080FF",grey:"#808080FF",green:"#008000FF",greenyellow:"#ADFF2FFF",honeydew:"#F0FFF0FF",hotpink:"#FF69B4FF",indianred:"#CD5C5CFF",indigo:"#4B0082FF",ivory:"#FFFFF0FF",khaki:"#F0E68CFF",lavender:"#E6E6FAFF",lavenderblush:"#FFF0F5FF",lawngreen:"#7CFC00FF",lemonchiffon:"#FFFACDFF",lightblue:"#ADD8E6FF",lightcoral:"#F08080FF",lightcyan:"#E0FFFFFF",lightgoldenrodyellow:"#FAFAD2FF",lightgray:"#D3D3D3FF",lightgrey:"#D3D3D3FF",lightgreen:"#90EE90FF",lightpink:"#FFB6C1FF",lightsalmon:"#FFA07AFF",lightseagreen:"#20B2AAFF",lightskyblue:"#87CEFAFF",lightslategray:"#778899FF",lightslategrey:"#778899FF",lightsteelblue:"#B0C4DEFF",lightyellow:"#FFFFE0FF",lime:"#00FF00FF",limegreen:"#32CD32FF",linen:"#FAF0E6FF",magenta:"#FF00FFFF",maroon:"#800000FF",mediumaquamarine:"#66CDAAFF",mediumblue:"#0000CDFF",mediumorchid:"#BA55D3FF",mediumpurple:"#9370D8FF",mediumseagreen:"#3CB371FF",mediumslateblue:"#7B68EEFF",mediumspringgreen:"#00FA9AFF",mediumturquoise:"#48D1CCFF",mediumvioletred:"#C71585FF",midnightblue:"#191970FF",mintcream:"#F5FFFAFF",mistyrose:"#FFE4E1FF",moccasin:"#FFE4B5FF",navajowhite:"#FFDEADFF",navy:"#000080FF",oldlace:"#FDF5E6FF",olive:"#808000FF",olivedrab:"#6B8E23FF",orange:"#FFA500FF",orangered:"#FF4500FF",orchid:"#DA70D6FF",palegoldenrod:"#EEE8AAFF",palegreen:"#98FB98FF",paleturquoise:"#AFEEEEFF",palevioletred:"#D87093FF",papayawhip:"#FFEFD5FF",peachpuff:"#FFDAB9FF",peru:"#CD853FFF",pink:"#FFC0CBFF",plum:"#DDA0DDFF",powderblue:"#B0E0E6FF",purple:"#800080FF",rebeccapurple:"#663399FF",red:"#FF0000FF",rosybrown:"#BC8F8FFF",royalblue:"#4169E1FF",saddlebrown:"#8B4513FF",salmon:"#FA8072FF",sandybrown:"#F4A460FF",seagreen:"#2E8B57FF",seashell:"#FFF5EEFF",sienna:"#A0522DFF",silver:"#C0C0C0FF",skyblue:"#87CEEBFF",slateblue:"#6A5ACDFF",slategray:"#708090FF",slategrey:"#708090FF",snow:"#FFFAFAFF",springgreen:"#00FF7FFF",steelblue:"#4682B4FF",tan:"#D2B48CFF",teal:"#008080FF",thistle:"#D8BFD8FF",tomato:"#FF6347FF",turquoise:"#40E0D0FF",violet:"#EE82EEFF",wheat:"#F5DEB3FF",white:"#FFFFFFFF",whitesmoke:"#F5F5F5FF",yellow:"#FFFF00FF",yellowgreen:"#9ACD32FF"};var S=require("child_process"),q=require("@raycast/api");var p=U(require("path")),ee=require("fs/promises");async function Xe(t,e){return k(`function run() {
      ObjC.import("AppKit");
      ObjC.import("PDFKit");
      
      const document = $.PDFDocument.alloc.init;
      
      const sourcePaths = $.NSArray.arrayWithArray(["${t.join('", "')}"]);
      sourcePaths.enumerateObjectsUsingBlock((filePath, idx, stop) => {
        const image = $.NSImage.alloc.initWithContentsOfFile(filePath);
        const page = $.PDFPage.alloc.initWithImage(image);
        document.insertPageAtIndex(page, idx);
      })
      
      document.writeToFile("${e}");
    }`,{language:"JavaScript"})}var K=async(t,e,r,a=!0,s=!1)=>{let i=await k(`function run() {
      ObjC.import("CoreGraphics");
      ObjC.import("CoreImage");
      ObjC.import("Vision");
      
      const sourceURL = $.NSURL.fileURLWithPath("${t}")
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
      
      ${r?`const color = $.CIColor.colorWithRedGreenBlueAlpha(${r.red/255}, ${r.green/255}, ${r.blue/255}, ${r.alpha/255});
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
    }`,{language:"JavaScript"});if(i!==e)throw new Error(i)};async function he(t,e,r=!1){let a=(0,q.getPreferenceValues)();q.environment.commandName==="tools/remove-bg"&&(a.preserveFormat=!0);let s=t.map(x=>Je(x)),i=await qe(s),n=[],o;if(e)if(e.match(/^#?[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/))o=pe(e);else if(Object.keys(H).includes(e.toLowerCase().replaceAll(" ","")))o=pe(H[e.toLowerCase().replaceAll(" ","")]);else throw new Error("Invalid color string provided.");for(let x of s){let u=i[s.indexOf(x)];if(x.toLowerCase().endsWith(".webp")){var d=[];try{let y=v(d,await C("sips-remove-bg-1","png"),!0);let h=v(d,await C("sips-remove-bg-2","png"),!0);let[T,b]=await Ge();(0,S.execFileSync)(T,[x,"-o",y.path]);await K(y.path,h.path,o,r);a.preserveFormat?(0,S.execFileSync)(b,[...a.useLosslessConversion?["-lossless"]:[],h.path,"-o",u]):(u=p.default.join(p.default.dirname(u),p.default.basename(u,".webp")+".png"),(0,S.execFileSync)("mv",[h.path,u]));n.push(u)}catch(l){var A=l,f=!0}finally{var I=L(d,A,f);I&&await I}}else if(x.toLowerCase().endsWith(".svg")){var R=[];try{let y=v(R,await C("sips-remove-bg-1","png"),!0);let h=v(R,await C("sips-remove-bg-2","png"),!0);let T=v(R,await C("sips-remove-bg-3","svg"),!0);await He("PNG",x,y.path);await K(y.path,h.path,o,r);if(a.preserveFormat){let b=p.default.join(q.environment.assetsPath,"potrace/potrace");(0,S.execFileSync)("chmod",["+x",b]),(0,S.execFileSync)("sips",["--setProperty","format","bmp",h.path,"--out",T.path]),(0,S.execFileSync)(b,["-s","--tight","-o",u,T.path])}else u=p.default.join(p.default.dirname(u),p.default.basename(u,".svg")+".png"),(0,S.execFileSync)("mv",[h.path,u]);n.push(u)}catch(E){var D=E,te=!0}finally{var J=L(R,D,te);J&&await J}}else if(x.toLowerCase().endsWith(".avif")){var re=[];try{let y=v(re,await C("sips-remove-bg-1","png"),!0);let h=v(re,await C("sips-remove-bg-2","png"),!0);let{encoderPath:T,decoderPath:b}=await Q();(0,S.execFileSync)(b,[x,y.path]);await K(y.path,h.path,o,r);a.preserveFormat?(0,S.execFileSync)(T,[...a.useLosslessConversion?Re:[],h.path,u]):(u=p.default.join(p.default.dirname(u),p.default.basename(u,".avif")+".png"),(0,S.execFileSync)("mv",[h.path,u]));n.push(u)}catch(Ye){var et=Ye,tt=!0}finally{var ge=L(re,et,tt);ge&&await ge}}else if(x.toLowerCase().endsWith(".pdf")){var ae=[];try{let y=v(ae,await de("sips-remove-bg-1"),!0);let h=v(ae,await de("sips-remove-bg-2"),!0);await Ke("PNG",x,y.path);let T=(await(0,ee.readdir)(y.path)).map(b=>p.default.join(y.path,b));for(let b of T){let N=p.default.join(h.path,p.default.basename(b));await K(b,N,o,r,!0)}if(a.preserveFormat){let b=(await(0,ee.readdir)(h.path)).map(N=>p.default.join(h.path,N));b.sort((N,ne)=>parseInt(N?.split("-").at(-1)||"0")>parseInt(ne?.split("-").at(-1)||"0")?1:-1),await Xe(b,u),n.push(u)}else{let b=p.default.join(p.default.dirname(u),p.default.basename(u,".pdf")+"-pngs");(0,S.execFileSync)("mv",[h.path,b]);let N=(await(0,ee.readdir)(b)).map(ne=>p.default.join(b,ne));n.push(...N)}}catch(rt){var at=rt,nt=!0}finally{var be=L(ae,at,nt);be&&await be}}else{var ye=[];try{let y=x.split(".").pop()??"png";y==="jpg"&&(y="jpeg");let h=v(ye,await C("sips-remove-bg","png"),!0);await K(x,h.path,o,r);a.preserveFormat?(0,S.execFileSync)("sips",["-s","format",y.toLowerCase(),h.path,"--out",u]):(u=p.default.join(p.default.dirname(u),p.default.basename(u,".png")+".png"),(0,S.execFileSync)("mv",[h.path,u]));n.push(u)}catch(st){var it=st,ot=!0}finally{var Fe=L(ye,it,ot);Fe&&await Fe}}}return await ze(n),n}var B=require("@raycast/api");async function me(t){if(t.selectedImages.length===0||t.selectedImages.length===1&&t.selectedImages[0]===""){await(0,B.showToast)({title:"No images selected",message:"No images found in your selection. Make sure the image(s) still exist on the disk. Verify that Raycast has permission to automate Finder and/or third-party file managers under System Settings->Privacy & Security->Automation->Raycast. If using a third-party file manager, make sure the app's index is up to date.",style:B.Toast.Style.Failure});return}let e=await(0,B.showToast)({title:t.inProgressMessage,style:B.Toast.Style.Animated}),r=`image${t.selectedImages.length===1?"":"s"}`;try{let a=await t.operation();return e.title=`${t.successMessage} ${t.selectedImages.length.toString()} ${r}`,e.style=B.Toast.Style.Success,a}catch(a){await $(`${t.failureMessage} ${t.selectedImages.length.toString()} ${r}`,a,e)}finally{await Be()}}async function Qe(t){let{bgcolor:e,crop:r}=t.arguments,a=(0,Ze.getPreferenceValues)(),s=e||a.defaultBgColor;if(s?.length>0&&!s.match(/^#?[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/)&&!Object.keys(H).includes(s.toLowerCase().replaceAll(" ",""))){await $("Invalid color string provided.",new Error(`'${s}' is not a valid color string. Please provide a valid hex color (e.g. #FF0000FF) or named HTML color (e.g. Red).`));return}let i=r==="yes"||r!=="no"&&a.cropByDefault,n=await Ve(),o=n.length>1?"backgrounds":"background";await me({operation:()=>he(n,s||void 0,i),selectedImages:n,inProgressMessage:`Removing ${o}...`,successMessage:`Removed ${o} from`,failureMessage:`Failed to remove ${o} from`})}
