"use strict";var Pe=Object.create;var D=Object.defineProperty;var Ie=Object.getOwnPropertyDescriptor;var Ae=Object.getOwnPropertyNames;var Ee=Object.getPrototypeOf,Re=Object.prototype.hasOwnProperty;var Z=(r,e)=>(e=Symbol[r])?e:Symbol.for("Symbol."+r),q=r=>{throw TypeError(r)};var Te=(r,e)=>{for(var t in e)D(r,t,{get:e[t],enumerable:!0})},Q=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ae(e))!Re.call(r,s)&&s!==t&&D(r,s,{get:()=>e[s],enumerable:!(n=Ie(e,s))||n.enumerable});return r};var x=(r,e,t)=>(t=r!=null?Pe(Ee(r)):{},Q(e||!r||!r.__esModule?D(t,"default",{value:r,enumerable:!0}):t,r)),Fe=r=>Q(D({},"__esModule",{value:!0}),r);var U=(r,e,t)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&q("Object expected");var n,s;t&&(n=e[Z("asyncDispose")]),n===void 0&&(n=e[Z("dispose")],t&&(s=n)),typeof n!="function"&&q("Object not disposable"),s&&(n=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),r.push([t,n,e])}else t&&r.push([t]);return e},O=(r,e,t)=>{var n=typeof SuppressedError=="function"?SuppressedError:function(a,o,u,l){return l=Error(u),l.name="SuppressedError",l.error=a,l.suppressed=o,l},s=a=>e=t?new n(a,e,"An error was suppressed during disposal"):(t=!0,a),i=a=>{for(;a=r.pop();)try{var o=a[1]&&a[1].call(a[2]);if(a[0])return Promise.resolve(o).then(i,u=>(s(u),i()))}catch(u){s(u)}if(t)throw e};return i()};var Je={};Te(Je,{default:()=>Ke});module.exports=Fe(Je);var J=require("child_process");var w=require("child_process"),p=x(require("fs")),y=x(require("os")),d=x(require("path")),c=require("@raycast/api");var v=x(require("react")),h=require("@raycast/api");var re=x(require("node:child_process")),ne=require("node:buffer"),T=x(require("node:stream")),ae=require("node:util");var se=require("react/jsx-runtime");var W=globalThis;var _=r=>!!r&&typeof r=="object"&&typeof r.removeListener=="function"&&typeof r.emit=="function"&&typeof r.reallyExit=="function"&&typeof r.listeners=="function"&&typeof r.kill=="function"&&typeof r.pid=="number"&&typeof r.on=="function",M=Symbol.for("signal-exit emitter"),V=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),W[M])return W[M];Object.defineProperty(W,M,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,t){this.listeners[e].push(t)}removeListener(e,t){let n=this.listeners[e],s=n.indexOf(t);s!==-1&&(s===0&&n.length===1?n.length=0:n.splice(s,1))}emit(e,t,n){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(t,n)===!0||s;return e==="exit"&&(s=this.emit("afterExit",t,n)||s),s}},z=class{onExit(){return()=>{}}load(){}unload(){}},B=class{#o;#t;#e;#s;#i;#a;#n;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new V,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#a={};for(let t of this.#r)this.#a[t]=()=>{let n=this.#e.listeners(t),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),n.length===s){this.unload();let a=this.#t.emit("exit",null,t),o=t==="SIGHUP"?this.#o:t;a||e.kill(e.pid,o)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,t){if(!_(this.#e))return()=>{};this.#n===!1&&this.load();let n=t?.alwaysLast?"afterExit":"exit";return this.#t.on(n,e),()=>{this.#t.removeListener(n,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let e of this.#r)try{let t=this.#a[e];t&&this.#e.on(e,t)}catch{}this.#e.emit=(e,...t)=>this.#l(e,...t),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(e=>{let t=this.#a[e];if(!t)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,t)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return _(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...t){let n=this.#s;if(e==="exit"&&_(this.#e)){typeof t[0]=="number"&&(this.#e.exitCode=t[0]);let s=n.call(this.#e,e,...t);return this.#t.emit("exit",this.#e.exitCode,null),s}else return n.call(this.#e,e,...t)}},j=null,Ce=(r,e)=>(j||(j=_(process)?new B(process):new z),j.onExit(r,e));function De(r,{timeout:e}={}){let t=new Promise((o,u)=>{r.on("exit",(l,g)=>{o({exitCode:l,signal:g,timedOut:!1})}),r.on("error",l=>{u(l)}),r.stdin&&r.stdin.on("error",l=>{u(l)})}),n=Ce(()=>{r.kill()});if(e===0||e===void 0)return t.finally(()=>n());let s,i=new Promise((o,u)=>{s=setTimeout(()=>{r.kill("SIGTERM"),u(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),a=t.finally(()=>{clearTimeout(s)});return Promise.race([i,a]).finally(()=>n())}var H=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function Ue(r){let{encoding:e}=r,t=e==="buffer",n=new T.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&n.setEncoding(e);let s=0,i=[];return n.on("data",a=>{i.push(a),s+=a.length}),n.getBufferedValue=()=>t?Buffer.concat(i,s):i.join(""),n.getBufferedLength=()=>s,n}async function Y(r,e){let t=Ue(e);return await new Promise((n,s)=>{let i=a=>{a&&t.getBufferedLength()<=ne.constants.MAX_LENGTH&&(a.bufferedData=t.getBufferedValue()),s(a)};(async()=>{try{await(0,ae.promisify)(T.default.pipeline)(r,t),n()}catch(a){i(a)}})(),t.on("data",()=>{t.getBufferedLength()>8e7&&i(new H)})}),t.getBufferedValue()}async function ee(r,e){r.destroy();try{return await e}catch(t){return t.bufferedData}}async function Oe({stdout:r,stderr:e},{encoding:t},n){let s=Y(r,{encoding:t}),i=Y(e,{encoding:t});try{return await Promise.all([n,s,i])}catch(a){return Promise.all([{error:a,exitCode:null,signal:a.signal,timedOut:a.timedOut||!1},ee(r,s),ee(e,i)])}}function _e(r){let e=typeof r=="string"?`
`:10,t=typeof r=="string"?"\r":13;return r[r.length-1]===e&&(r=r.slice(0,-1)),r[r.length-1]===t&&(r=r.slice(0,-1)),r}function te(r,e){return r.stripFinalNewline?_e(e):e}function Ne({timedOut:r,timeout:e,signal:t,exitCode:n}){return r?`timed out after ${e} milliseconds`:t!=null?`was killed with ${t}`:n!=null?`failed with exit code ${n}`:"failed"}function Le({stdout:r,stderr:e,error:t,signal:n,exitCode:s,command:i,timedOut:a,options:o,parentError:u}){let g=`Command ${Ne({timedOut:a,timeout:o?.timeout,signal:n,exitCode:s})}: ${i}`,f=t?`${g}
${t.message}`:g,E=[f,e,r].filter(Boolean).join(`
`);return t?t.originalMessage=t.message:t=u,t.message=E,t.shortMessage=f,t.command=i,t.exitCode=s,t.signal=n,t.stdout=r,t.stderr=e,"bufferedData"in t&&delete t.bufferedData,t}function We({stdout:r,stderr:e,error:t,exitCode:n,signal:s,timedOut:i,command:a,options:o,parentError:u}){if(t||n!==0||s!==null)throw Le({error:t,exitCode:n,signal:s,stdout:r,stderr:e,command:a,timedOut:i,options:o,parentError:u});return r}async function $(r,e,t){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:s,timeout:i,...a}=Array.isArray(e)?t||{}:e||{},o=n!==!1?[]:["-ss"];s==="JavaScript"&&o.push("-l","JavaScript"),Array.isArray(e)&&o.push("-",...e);let u=re.default.spawn("osascript",o,{...a,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=De(u,{timeout:i??1e4});u.stdin.end(r);let[{error:g,exitCode:f,signal:E,timedOut:L},S,R]=await Oe(u,{encoding:"utf8"},l),xe=te({stripFinalNewline:!0},S),ve=te({stripFinalNewline:!0},R);return We({stdout:xe,stderr:ve,error:g,exitCode:f,signal:E,timedOut:L,command:"osascript",options:t,parentError:new Error})}var F=require("child_process"),m=require("@raycast/api");var ie=require("fs");async function Me(){let r="";try{r=(0,F.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(r==="")return await(0,m.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:m.Toast.Style.Failure}),!1;if(await(0,m.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,m.showToast)({title:"Installing AVIF Encoder...",style:m.Toast.Style.Animated});try{if((0,F.execSync)(`/bin/zsh -ilc '${r} install --quiet libavif || true'`),!je())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=m.Toast.Style.Success,!0}catch(t){console.error(t),b("Failed to install AVIF Encoder.",t,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,m.showToast)({title:"AVIF Encoder not installed.",style:m.Toast.Style.Failure}),!1}async function je(){let t=!1,n=0;for(;!t&&n<7;){let s=(0,F.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,ie.existsSync)(s)){t=!0;break}await new Promise(i=>setTimeout(i,1e3)),n++}return t}async function G(){let r=await m.LocalStorage.getItem("avifEncoderPath"),e=await m.LocalStorage.getItem("avifDecoderPath");if(!r||!e)try{r=(0,F.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,F.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim(),r&&await m.LocalStorage.setItem("avifEncoderPath",r),e&&await m.LocalStorage.setItem("avifDecoderPath",e)}catch(t){if(await Me())try{return await G()}catch(n){console.error(n),b("AVIF Encoder not found.",n,void 0,"Please install the libavif Homebrew formula manually and try again.")}else b("AVIF Encoder not found.",t,void 0,"Please install the libavif Homebrew formula and try again.")}if(typeof r!="string"||typeof e!="string")throw new Error("AVIF encoder and decoder paths could not be resolved.");return{encoderPath:r,decoderPath:e}}var oe=async()=>$(`use framework "AppKit"
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
      
      return filePaths`),ce=async r=>{let e=Array.isArray(r)?r:[r];await $(`use framework "Foundation"
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
      end if`)};var I=x(require("path"));var N=require("child_process");function P(r,e){let t=e?.command,n=e?.language,s=[...e?.leadingArgs?.map(f=>f.toString())||[]],i=e?.trailingArgs||[];!t&&(n===void 0||n==="AppleScript"||n==="JXA")&&(t="/usr/bin/osascript",s.push("-l",n==="JXA"?"JavaScript":"AppleScript",...r.startsWith("/")?[]:["-e"],r,...i.map(f=>f.toString())));let a=process.env;if(e?.command&&(a.PATH=`${a.PATH}:${(0,N.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,t=e.command,s.push(r,...i.map(f=>f.toString()))),!t)throw new Error("No command specified.");let o="",u=f=>{console.log(f)},l=(0,N.spawn)(t,s,{env:a});return e?.logDebugMessages&&console.log(`Running shell command "${t} ${s.join(" ")}"`),l.stdout?.on("data",f=>{o+=f.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${o}`)}),l.stderr?.on("data",f=>{e?.stderrCallback&&e.stderrCallback(f.toString()),e?.logErrors&&console.error(f.toString())}),l.stdin.on("error",f=>{e?.logErrors&&console.error(`Error writing to stdin: ${f}`)}),u=async f=>{f?.length>0&&(l.stdin.cork(),l.stdin.write(`${f}\r
`),process.nextTick(()=>l.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${f}`))},{data:(async()=>new Promise((f,E)=>{let L=e?.timeout?setTimeout(()=>{try{l.kill()}catch(S){e?.logErrors&&console.error(`Error killing process: ${S}`)}return e?.logErrors&&console.error("Script timed out"),l.stdin.end(),l.kill(),E("Script timed out")},e?.timeout):void 0;l.on("close",S=>{if(S!==0)return e?.logErrors&&console.error(`Script exited with code ${S}`),l.stdin.end(),l.kill(),E(`Script exited with code ${S}`);clearTimeout(L);let R;try{R=JSON.parse(o)}catch{R=o.trim()}return e?.logFinalOutput&&console.log(`Script output: ${R}`),f(R)})}))(),sendMessage:u}}var A=require("@raycast/api");function k(r){return r.split(", /").map((e,t)=>t===0?e.trim():`/${e.trim()}`)}async function le(){let r=I.default.join(A.environment.assetsPath,"scripts","finder.scpt"),e=await P(r,{language:"AppleScript",stderrCallback:t=>b("Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:k(e)}async function ue(){let r=I.default.join(A.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await P(r,{language:"AppleScript",stderrCallback:t=>b("HoudahSpot Selection Error",new Error(t))}).data;return Array.isArray(e)?e:k(e)}async function fe(){let r=I.default.join(A.environment.assetsPath,"scripts","neofinder.scpt"),e=await P(r,{language:"AppleScript",stderrCallback:t=>b("NeoFinder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:k(e)}async function de(){let r=I.default.join(A.environment.assetsPath,"scripts","pathfinder.scpt"),e=await P(r,{language:"JXA",stderrCallback:t=>b("Path Finder Selection Error",new Error(t))}).data;return Array.isArray(e)?e:k(e)}async function pe(){let r=I.default.join(A.environment.assetsPath,"scripts","qspace.scpt"),e=await P(r,{language:"JXA",stderrCallback:t=>b("QSpace Pro Selection Error",new Error(t))}).data;return Array.isArray(e)?e:k(e)}async function he(){let r=I.default.join(A.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await P(r,{language:"JXA",stderrCallback:t=>b("ForkLift Selection Error",new Error(t))}).data;return Array.isArray(e)?e:k(e)}var K=async(r,e)=>{let t=d.default.join(y.tmpdir(),`${r}.${e}`);return{path:t,[Symbol.asyncDispose]:async()=>{p.existsSync(t)&&await p.promises.rm(t,{recursive:!0})}}};var ge=async()=>{let e=(await c.LocalStorage.getItem("itemsToRemove")??"").toString().split(`
`).filter(Boolean);for(let t of e)p.existsSync(t)&&await p.promises.rm(t,{recursive:!0});await c.LocalStorage.removeItem("itemsToRemove")},be=async()=>{let r=[],t=(0,c.getPreferenceValues)().inputMethod,n=!1;if(t=="Clipboard")try{let a=k(await oe());if(await c.LocalStorage.setItem("itemsToRemove",a.join(`
`)),a.filter(o=>o.trim().length>0).length>0)return a}catch(a){console.error(`Couldn't get images from clipboard: ${a}`),n=!0}let s=t;try{s=(await(0,c.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: ${a}`)}try{(t=="Path Finder"||s=="Path Finder")&&(r=await de())}catch(a){console.error(`Couldn't get images from Path Finder: ${a}`),n=!0}try{(t=="NeoFinder"||s=="NeoFinder")&&(r=await fe())}catch(a){console.error(`Couldn't get images from NeoFinder: ${a}`),n=!0}try{(t=="HoudahSpot"||s=="HoudahSpot")&&(r=await ue())}catch(a){console.error(`Couldn't get images from HoudahSpot: ${a}`),n=!0}try{(t=="QSpace"||s=="QSpace Pro"||s=="QSpace")&&(r=await pe())}catch(a){console.error(`Couldn't get images from ${s}: ${a}`),n=!0}try{(t=="ForkLift"||s=="ForkLift")&&(r=await he())}catch(a){console.error(`Couldn't get images from ForkLift: ${a}`),n=!0}if(r.length>0)return r.filter((a,o)=>r.indexOf(a)===o);let i=await le();return s=="Finder"||t=="Finder"||n?r=i:i.forEach(a=>{a.split("/").at(-2)=="Desktop"&&!r.includes(a)&&r.push(a)}),r.filter((a,o)=>r.indexOf(a)===o)},ye=async r=>{let e="Finder";try{e=(await(0,c.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: : ${n}`)}let t=(0,c.getPreferenceValues)();t.imageResultHandling=="copyToClipboard"?(await ce(r),me(r)):t.imageResultHandling=="openInPreview"?(await Be(r),me(r)):t.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,c.showInFinder)(r[0]):(t.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,c.showInFinder)(r[0])},Ve=async()=>(y.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,w.execSync)(`chmod +x "${c.environment.assetsPath}/webp/arm/dwebp"`),(0,w.execSync)(`chmod +x "${c.environment.assetsPath}/webp/arm/cwebp"`),p.existsSync(`${c.environment.assetsPath}/webp/x86/dwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/x86/dwebp`),p.existsSync(`${c.environment.assetsPath}/webp/x86/cwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/x86/cwebp`),[`${c.environment.assetsPath}/webp/arm/dwebp`,`${c.environment.assetsPath}/webp/arm/cwebp`]):((0,w.execSync)(`chmod +x "${c.environment.assetsPath}/webp/x86/dwebp"`),(0,w.execSync)(`chmod +x "${c.environment.assetsPath}/webp/x86/cwebp"`),p.existsSync(`${c.environment.assetsPath}/webp/arm/dwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/arm/dwebp`),p.existsSync(`${c.environment.assetsPath}/webp/arm/cwebp`)&&await p.promises.rm(`${c.environment.assetsPath}/webp/arm/cwebp`),[`${c.environment.assetsPath}/webp/x86/dwebp`,`${c.environment.assetsPath}/webp/x86/cwebp`]),$e=async(r,e)=>{var o=[];try{let t=(0,c.getPreferenceValues)();let n=U(o,await K("tmp","png"),!0);let s=(await C([e]))[0];let[i,a]=await Ve();(0,w.execSync)(`"${i}" "${e}" -o "${n.path}" && ${r} "${n.path}" && "${a}" ${t.useLosslessConversion?"-lossless":""} "${n.path}" -o "${s}"`);return s}catch(u){var l=u,g=!0}finally{var f=O(o,l,g);f&&await f}},we=async(r,e)=>{var o=[];try{let t=(0,c.getPreferenceValues)();let n=U(o,await K("tmp","png"),!0);let s=(await C([e]))[0];let{encoderPath:i,decoderPath:a}=await G();(0,w.execSync)(`"${a}" "${e}" "${n.path}" && ${r} "${n.path}" && "${i}" ${t.useLosslessConversion?"-s 0 --min 0 --max 0 --minalpha 0 --maxalpha 0 --qcolor 100 --qalpha 100":""}  "${n.path}" "${s}"`);return s}catch(u){var l=u,g=!0}finally{var f=O(o,l,g);f&&await f}},ke=async(r,e)=>{var s=[];try{let t=U(s,await K("tmp","bmp"),!0);let n=(await C([e]))[0];await ze("BMP",e,t.path);(0,w.execSync)(`chmod +x "${c.environment.assetsPath}/potrace/potrace"`);(0,w.execSync)(`${r} "${t.path}" && "${c.environment.assetsPath}/potrace/potrace" -s --tight -o "${n}" "${t.path}"`);return n}catch(i){var a=i,o=!0}finally{var u=O(s,a,o);u&&await u}},ze=async(r,e,t)=>$(`use framework "Foundation"
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
  pngData's writeToFile:"${t}" atomically:false`);var Be=async r=>{let e=Array.isArray(r)?r:[r],t=e.some(n=>d.default.extname(n)==".svg");await $(`use framework "Foundation"
    use scripting additions
    set pageImages to {${e.map(n=>`current application's NSURL's fileURLWithPath:"${n}"`).join(", ")}}

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
                repeat with thePath in {"${e.map(n=>encodeURI(`file://${n}`)).join('", "')}"}
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
          end tell`}`)},me=r=>{let e=Array.isArray(r)?r:[r];for(let t of e)p.unlinkSync(t)},He=async()=>$(`use framework "Foundation"
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
    end if`),Ge=async r=>{let e="Finder";try{e=await He()}catch(t){console.error(`Couldn't get frontmost application: ${t}`)}try{if(e=="Path Finder")return $(`tell application "Path Finder"
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
  end tell`)},C=async(r,e=!1,t=void 0)=>{let n=(0,c.getPreferenceValues)(),s=await Ge(r[0]);return r.map(i=>{let a=i;if(n.imageResultHandling=="saveToDownloads"?a=d.default.join(y.homedir(),"Downloads",d.default.basename(a)):n.imageResultHandling=="saveToDesktop"?a=d.default.join(y.homedir(),"Desktop",d.default.basename(a)):(n.imageResultHandling=="saveInContainingFolder"||n.imageResultHandling=="replaceOriginal")&&(n.inputMethod=="Clipboard"||e)?a=d.default.join(s,d.default.basename(a)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(a=d.default.join(y.tmpdir(),d.default.basename(a))),a=t?a.replace(d.default.extname(a),`.${t}`):a,n.imageResultHandling!="replaceOriginal"&&y.tmpdir()!=d.default.dirname(a)){let o=2;for(;p.existsSync(a);)a=d.default.join(d.default.dirname(a),d.default.basename(a,d.default.extname(a))+`-${o}${d.default.extname(a)}`),o++}return a})},b=async(r,e,t,n)=>{console.error(e),t?(t.title=r,t.message=n??e.message,t.style=c.Toast.Style.Failure,t.primaryAction={title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}):t=await(0,c.showToast)({title:r,message:n??e.message,style:c.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await c.Clipboard.copy(e.message)}}})};var Se=r=>{let e=y.homedir();if(r.startsWith("~"))return r.replace(/^~(?=$|\/|\\)/,e);let t=/(\/Users\/.*?)\/.*/,n=r.match(t);return n?r.replace(n[1],e):r};async function X(r,e){let t=r.map(i=>Se(i)),n=await C(t),s=[];for(let i of t){let a=(0,J.execSync)(`sips -g pixelWidth -g pixelHeight "${i}"`).toString().split(/(: |\n)/g),o=parseInt(a[4]),u=parseInt(a[8]);if(i.toLowerCase().endsWith("webp"))s.push(await $e(`sips --resampleHeightWidth ${u*e} ${o*e}`,i));else if(i.toLowerCase().endsWith("svg"))s.push(await ke(`sips --resampleHeightWidth ${u*e} ${o*e}`,i));else if(i.toLowerCase().endsWith("avif"))s.push(await we(`sips --resampleHeightWidth ${u*e} ${o*e}`,i));else{let l=n[t.indexOf(i)];s.push(l),(0,J.execSync)(`sips --resampleHeightWidth ${u*e} ${o*e} -o "${l}" "${i}"`)}}return await ye(s),s}async function Ke({factor:r,imagePaths:e}){let t=e?.length?e:await be(),n=await X(t,r);return await ge(),n}
