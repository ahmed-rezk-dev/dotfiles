"use strict";var it=Object.create;var q=Object.defineProperty;var ot=Object.getOwnPropertyDescriptor;var ct=Object.getOwnPropertyNames;var lt=Object.getPrototypeOf,ut=Object.prototype.hasOwnProperty;var Se=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),xe=t=>{throw TypeError(t)};var ft=(t,e)=>{for(var r in e)q(t,r,{get:e[r],enumerable:!0})},Pe=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ct(e))!ut.call(t,s)&&s!==r&&q(t,s,{get:()=>e[s],enumerable:!(a=ot(e,s))||a.enumerable});return t};var C=(t,e,r)=>(r=t!=null?it(lt(t)):{},Pe(e||!t||!t.__esModule?q(r,"default",{value:t,enumerable:!0}):r,t)),dt=t=>Pe(q({},"__esModule",{value:!0}),t);var D=(t,e,r)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&xe("Object expected");var a,s;r&&(a=e[Se("asyncDispose")]),a===void 0&&(a=e[Se("dispose")],r&&(s=a)),typeof a!="function"&&xe("Object not disposable"),s&&(a=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),t.push([r,a,e])}else r&&t.push([r]);return e},U=(t,e,r)=>{var a=typeof SuppressedError=="function"?SuppressedError:function(n,c,d,l){return l=Error(d),l.name="SuppressedError",l.error=n,l.suppressed=c,l},s=n=>e=r?new a(n,e,"An error was suppressed during disposal"):(r=!0,n),i=n=>{for(;n=t.pop();)try{var c=n[1]&&n[1].call(n[2]);if(n[0])return Promise.resolve(c).then(i,d=>(s(d),i()))}catch(d){s(d)}if(r)throw e};return i()};var At={};ft(At,{default:()=>It});module.exports=dt(At);var h=require("child_process"),ae=require("fs"),S=C(require("path")),K=require("@raycast/api");var B=require("child_process"),k=require("@raycast/api");var G=require("child_process"),w=C(require("fs")),A=C(require("os")),b=C(require("path")),o=require("@raycast/api");var _=C(require("react")),$=require("@raycast/api");var Ee=C(require("node:child_process")),Fe=require("node:buffer"),V=C(require("node:stream")),Re=require("node:util");var Te=require("react/jsx-runtime");var se=globalThis;var Q=t=>!!t&&typeof t=="object"&&typeof t.removeListener=="function"&&typeof t.emit=="function"&&typeof t.reallyExit=="function"&&typeof t.listeners=="function"&&typeof t.kill=="function"&&typeof t.pid=="number"&&typeof t.on=="function",ie=Symbol.for("signal-exit emitter"),ce=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),se[ie])return se[ie];Object.defineProperty(se,ie,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,r){this.listeners[e].push(r)}removeListener(e,r){let a=this.listeners[e],s=a.indexOf(r);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,r,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(r,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",r,a)||s),s}},le=class{onExit(){return()=>{}}load(){}unload(){}},ue=class{#o;#t;#e;#s;#i;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new ce,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let r of this.#r)this.#n[r]=()=>{let a=this.#e.listeners(r),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,r),c=r==="SIGHUP"?this.#o:r;n||e.kill(e.pid,c)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,r){if(!Q(this.#e))return()=>{};this.#a===!1&&this.load();let a=r?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let r=this.#n[e];r&&this.#e.on(e,r)}catch{}this.#e.emit=(e,...r)=>this.#l(e,...r),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let r=this.#n[e];if(!r)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,r)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return Q(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...r){let a=this.#s;if(e==="exit"&&Q(this.#e)){typeof r[0]=="number"&&(this.#e.exitCode=r[0]);let s=a.call(this.#e,e,...r);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...r)}},oe=null,pt=(t,e)=>(oe||(oe=Q(process)?new ue(process):new le),oe.onExit(t,e));function ht(t,{timeout:e}={}){let r=new Promise((c,d)=>{t.on("exit",(l,E)=>{c({exitCode:l,signal:E,timedOut:!1})}),t.on("error",l=>{d(l)}),t.stdin&&t.stdin.on("error",l=>{d(l)})}),a=pt(()=>{t.kill()});if(e===0||e===void 0)return r.finally(()=>a());let s,i=new Promise((c,d)=>{s=setTimeout(()=>{t.kill("SIGTERM"),d(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=r.finally(()=>{clearTimeout(s)});return Promise.race([i,n]).finally(()=>a())}var fe=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function mt(t){let{encoding:e}=t,r=e==="buffer",a=new V.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,i=[];return a.on("data",n=>{i.push(n),s+=n.length}),a.getBufferedValue=()=>r?Buffer.concat(i,s):i.join(""),a.getBufferedLength=()=>s,a}async function ve(t,e){let r=mt(e);return await new Promise((a,s)=>{let i=n=>{n&&r.getBufferedLength()<=Fe.constants.MAX_LENGTH&&(n.bufferedData=r.getBufferedValue()),s(n)};(async()=>{try{await(0,Re.promisify)(V.default.pipeline)(t,r),a()}catch(n){i(n)}})(),r.on("data",()=>{r.getBufferedLength()>8e7&&i(new fe)})}),r.getBufferedValue()}async function Ie(t,e){t.destroy();try{return await e}catch(r){return r.bufferedData}}async function gt({stdout:t,stderr:e},{encoding:r},a){let s=ve(t,{encoding:r}),i=ve(e,{encoding:r});try{return await Promise.all([a,s,i])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},Ie(t,s),Ie(e,i)])}}function bt(t){let e=typeof t=="string"?`
`:10,r=typeof t=="string"?"\r":13;return t[t.length-1]===e&&(t=t.slice(0,-1)),t[t.length-1]===r&&(t=t.slice(0,-1)),t}function Ae(t,e){return t.stripFinalNewline?bt(e):e}function yt({timedOut:t,timeout:e,signal:r,exitCode:a}){return t?`timed out after ${e} milliseconds`:r!=null?`was killed with ${r}`:a!=null?`failed with exit code ${a}`:"failed"}function wt({stdout:t,stderr:e,error:r,signal:a,exitCode:s,command:i,timedOut:n,options:c,parentError:d}){let E=`Command ${yt({timedOut:n,timeout:c?.timeout,signal:a,exitCode:s})}: ${i}`,u=r?`${E}
${r.message}`:E,F=[u,e,t].filter(Boolean).join(`
`);return r?r.originalMessage=r.message:r=d,r.message=F,r.shortMessage=u,r.command=i,r.exitCode=s,r.signal=a,r.stdout=t,r.stderr=e,"bufferedData"in r&&delete r.bufferedData,r}function $t({stdout:t,stderr:e,error:r,exitCode:a,signal:s,timedOut:i,command:n,options:c,parentError:d}){if(r||a!==0||s!==null)throw wt({error:r,exitCode:a,signal:s,stdout:t,stderr:e,command:n,timedOut:i,options:c,parentError:d});return t}async function I(t,e,r){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:i,...n}=Array.isArray(e)?r||{}:e||{},c=a!==!1?[]:["-ss"];s==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let d=Ee.default.spawn("osascript",c,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=ht(d,{timeout:i??1e4});d.stdin.end(t);let[{error:E,exitCode:u,signal:F,timedOut:H},R,T]=await gt(d,{encoding:"utf8"},l),X=Ae({stripFinalNewline:!0},R),Z=Ae({stripFinalNewline:!0},T);return $t({stdout:X,stderr:Z,error:E,exitCode:u,signal:F,timedOut:H,command:"osascript",options:r,parentError:new Error})}var Ce=async()=>I(`use framework "AppKit"
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
      
      return filePaths`),De=async t=>{let e=Array.isArray(t)?t:[t];await I(`use framework "Foundation"
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
      end if`)};var L=C(require("path"));var Y=require("child_process");function N(t,e){let r=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(u=>u.toString())||[]],i=e?.trailingArgs||[];!r&&(a===void 0||a==="AppleScript"||a==="JXA")&&(r="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...t.startsWith("/")?[]:["-e"],t,...i.map(u=>u.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,Y.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,r=e.command,s.push(t,...i.map(u=>u.toString()))),!r)throw new Error("No command specified.");let c="",d=u=>{console.log(u)},l=(0,Y.spawn)(r,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${r} ${s.join(" ")}"`),l.stdout?.on("data",u=>{c+=u.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${c}`)}),l.stderr?.on("data",u=>{e?.stderrCallback&&e.stderrCallback(u.toString()),e?.logErrors&&console.error(u.toString())}),l.stdin.on("error",u=>{e?.logErrors&&console.error(`Error writing to stdin: ${u}`)}),d=async u=>{u?.length>0&&(l.stdin.cork(),l.stdin.write(`${u}\r
`),process.nextTick(()=>l.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${u}`))},{data:(async()=>new Promise((u,F)=>{let H=e?.timeout?setTimeout(()=>{try{l.kill()}catch(R){e?.logErrors&&console.error(`Error killing process: ${R}`)}return e?.logErrors&&console.error("Script timed out"),l.stdin.end(),l.kill(),F("Script timed out")},e?.timeout):void 0;l.on("close",R=>{if(R!==0)return e?.logErrors&&console.error(`Script exited with code ${R}`),l.stdin.end(),l.kill(),F(`Script exited with code ${R}`);clearTimeout(H);let T;try{T=JSON.parse(c)}catch{T=c.trim()}return e?.logFinalOutput&&console.log(`Script output: ${T}`),u(T)})}))(),sendMessage:d}}var W=require("@raycast/api");function O(t){return t.split(", /").map((e,r)=>r===0?e.trim():`/${e.trim()}`)}async function Ue(){let t=L.default.join(W.environment.assetsPath,"scripts","finder.scpt"),e=await N(t,{language:"AppleScript",stderrCallback:r=>P("Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function Oe(){let t=L.default.join(W.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await N(t,{language:"AppleScript",stderrCallback:r=>P("HoudahSpot Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function _e(){let t=L.default.join(W.environment.assetsPath,"scripts","neofinder.scpt"),e=await N(t,{language:"AppleScript",stderrCallback:r=>P("NeoFinder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function Ne(){let t=L.default.join(W.environment.assetsPath,"scripts","pathfinder.scpt"),e=await N(t,{language:"JXA",stderrCallback:r=>P("Path Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function Le(){let t=L.default.join(W.environment.assetsPath,"scripts","qspace.scpt"),e=await N(t,{language:"JXA",stderrCallback:r=>P("QSpace Pro Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}async function We(){let t=L.default.join(W.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await N(t,{language:"JXA",stderrCallback:r=>P("ForkLift Selection Error",new Error(r))}).data;return Array.isArray(e)?e:O(e)}var ee=async t=>{let e=await o.LocalStorage.getItem("itemsToRemove")??"";await o.LocalStorage.setItem("itemsToRemove",e+`
`+t)},M=async(t,e)=>{let r=b.default.join(A.tmpdir(),`${t}.${e}`);return{path:r,[Symbol.asyncDispose]:async()=>{w.existsSync(r)&&await w.promises.rm(r,{recursive:!0})}}};var je=async()=>{let e=(await o.LocalStorage.getItem("itemsToRemove")??"").toString().split(`
`).filter(Boolean);for(let r of e)w.existsSync(r)&&await w.promises.rm(r,{recursive:!0});await o.LocalStorage.removeItem("itemsToRemove")},Ve=async()=>{let t=[],r=(0,o.getPreferenceValues)().inputMethod,a=!1;if(r=="Clipboard")try{let n=O(await Ce());if(await o.LocalStorage.setItem("itemsToRemove",n.join(`
`)),n.filter(c=>c.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=r;try{s=(await(0,o.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(r=="Path Finder"||s=="Path Finder")&&(t=await Ne())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(r=="NeoFinder"||s=="NeoFinder")&&(t=await _e())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(r=="HoudahSpot"||s=="HoudahSpot")&&(t=await Oe())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(r=="QSpace"||s=="QSpace Pro"||s=="QSpace")&&(t=await Le())}catch(n){console.error(`Couldn't get images from ${s}: ${n}`),a=!0}try{(r=="ForkLift"||s=="ForkLift")&&(t=await We())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(t.length>0)return t.filter((n,c)=>t.indexOf(n)===c);let i=await Ue();return s=="Finder"||r=="Finder"||a?t=i:i.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!t.includes(n)&&t.push(n)}),t.filter((n,c)=>t.indexOf(n)===c)},ze=async t=>{let e="Finder";try{e=(await(0,o.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let r=(0,o.getPreferenceValues)();r.imageResultHandling=="copyToClipboard"?(await De(t),Me(t)):r.imageResultHandling=="openInPreview"?(await kt(t),Me(t)):r.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,o.showInFinder)(t[0]):(r.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,o.showInFinder)(t[0])},te=async()=>(A.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,G.execSync)(`chmod +x "${o.environment.assetsPath}/webp/arm/dwebp"`),(0,G.execSync)(`chmod +x "${o.environment.assetsPath}/webp/arm/cwebp"`),w.existsSync(`${o.environment.assetsPath}/webp/x86/dwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/x86/dwebp`),w.existsSync(`${o.environment.assetsPath}/webp/x86/cwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/x86/cwebp`),[`${o.environment.assetsPath}/webp/arm/dwebp`,`${o.environment.assetsPath}/webp/arm/cwebp`]):((0,G.execSync)(`chmod +x "${o.environment.assetsPath}/webp/x86/dwebp"`),(0,G.execSync)(`chmod +x "${o.environment.assetsPath}/webp/x86/cwebp"`),w.existsSync(`${o.environment.assetsPath}/webp/arm/dwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/arm/dwebp`),w.existsSync(`${o.environment.assetsPath}/webp/arm/cwebp`)&&await w.promises.rm(`${o.environment.assetsPath}/webp/arm/cwebp`),[`${o.environment.assetsPath}/webp/x86/dwebp`,`${o.environment.assetsPath}/webp/x86/cwebp`]);var de=async(t,e,r)=>I(`use framework "Foundation"
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
  pngData's writeToFile:"${r}" atomically:false`),J=async(t,e,r)=>{let a=(0,o.getPreferenceValues)(),s="NSPNGFileType";return t=="JPEG"?s="NSJPEGFileType":t=="TIFF"&&(s="NSTIFFFileType"),I(`use framework "Foundation"
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
    thePasteboard's writeObjects:pageImages`:""}`,{timeout:60*1e3*5})};var kt=async t=>{let e=Array.isArray(t)?t:[t],r=e.some(a=>b.default.extname(a)==".svg");await I(`use framework "Foundation"
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
          end tell`}`)},Me=t=>{let e=Array.isArray(t)?t:[t];for(let r of e)w.unlinkSync(r)},St=async()=>I(`use framework "Foundation"
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
    end if`),xt=async t=>{let e="Finder";try{e=await St()}catch(r){console.error(`Couldn't get frontmost application: ${r}`)}try{if(e=="Path Finder")return I(`tell application "Path Finder"
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
      end tell`)}catch(r){console.error(`Couldn't get current directory of Path Finder: ${r}`)}return I(`tell application "Finder"
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
  end tell`)},Be=async(t,e=!1,r=void 0)=>{let a=(0,o.getPreferenceValues)(),s=await xt(t[0]);return t.map(i=>{let n=i;if(a.imageResultHandling=="saveToDownloads"?n=b.default.join(A.homedir(),"Downloads",b.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=b.default.join(A.homedir(),"Desktop",b.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=b.default.join(s,b.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=b.default.join(A.tmpdir(),b.default.basename(n))),n=r?n.replace(b.default.extname(n),`.${r}`):n,a.imageResultHandling!="replaceOriginal"&&A.tmpdir()!=b.default.dirname(n)){let c=2;for(;w.existsSync(n);)n=b.default.join(b.default.dirname(n),b.default.basename(n,b.default.extname(n))+`-${c}${b.default.extname(n)}`),c++}return n})},P=async(t,e,r,a)=>{console.error(e),r?(r.title=t,r.message=a??e.message,r.style=o.Toast.Style.Failure,r.primaryAction={title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}):r=await(0,o.showToast)({title:t,message:a??e.message,style:o.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}})};var He=t=>{let e=A.homedir();if(t.startsWith("~"))return t.replace(/^~(?=$|\/|\\)/,e);let r=/(\/Users\/.*?)\/.*/,a=t.match(r);return a?t.replace(a[1],e):t};var Ge=require("fs"),pe=["-s","0","--min","0","--max","0","--minalpha","0","--maxalpha","0","--qcolor","100","--qalpha","100"];async function Pt(){let t="";try{t=(0,B.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(t==="")return await(0,k.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:k.Toast.Style.Failure}),!1;if(await(0,k.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,k.showToast)({title:"Installing AVIF Encoder...",style:k.Toast.Style.Animated});try{if((0,B.execSync)(`/bin/zsh -ilc '${t} install --quiet libavif || true'`),!vt())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=k.Toast.Style.Success,!0}catch(r){console.error(r),P("Failed to install AVIF Encoder.",r,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,k.showToast)({title:"AVIF Encoder not installed.",style:k.Toast.Style.Failure}),!1}async function vt(){let r=!1,a=0;for(;!r&&a<7;){let s=(0,B.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,Ge.existsSync)(s)){r=!0;break}await new Promise(i=>setTimeout(i,1e3)),a++}return r}async function z(){let t=await k.LocalStorage.getItem("avifEncoderPath"),e=await k.LocalStorage.getItem("avifDecoderPath");if(!t||!e)try{t=(0,B.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,B.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim(),t&&await k.LocalStorage.setItem("avifEncoderPath",t),e&&await k.LocalStorage.setItem("avifDecoderPath",e)}catch(r){if(await Pt())try{return await z()}catch(a){console.error(a),P("AVIF Encoder not found.",a,void 0,"Please install the libavif Homebrew formula manually and try again.")}else P("AVIF Encoder not found.",r,void 0,"Please install the libavif Homebrew formula and try again.")}if(typeof t!="string"||typeof e!="string")throw new Error("AVIF encoder and decoder paths could not be resolved.");return{encoderPath:t,decoderPath:e}}function he(t,e,r){return[...r?["-lossless"]:[],t,"-o",e]}function re(){return S.default.join(K.environment.assetsPath,"potrace/potrace")}async function j(t,e,r,a=!1){let s=(0,K.getPreferenceValues)();K.environment.commandName==="tools/convert-images"&&(s.jpegExtension="jpg");let i=[],n=t.map(ne=>He(ne));for(let[ne,y]of n.entries()){let v=S.default.extname(y).slice(1),st=e==="JPEG"?s.jpegExtension:e.toLowerCase(),m=r?.[ne]||(await Be([y],!1,st))[0];if(e==="WEBP"&&v.toLowerCase()!=="svg"){let[,p]=await te();if(v.toLowerCase()=="avif"){var c=[];try{let{decoderPath:f}=await z();let x=D(c,await M("tmp","png"),!0);(0,h.execFileSync)(f,[y,x.path]);(0,h.execFileSync)(p,he(x.path,m,s.useLosslessConversion))}catch(d){var l=d,E=!0}finally{var u=U(c,l,E);u&&await u}}else if(v.toLowerCase()=="pdf"){let f=S.default.join(m.split("/").slice(0,-1).join("/"),S.default.basename(m,".webp")+" WebP");(0,h.execFileSync)("mkdir",["-p",f]),await J("PNG",y,f);let x=(0,ae.readdirSync)(f).map(g=>S.default.join(f,g));for(let g of x)(0,h.execFileSync)(p,he(g,g.replace(".png",".webp"),s.useLosslessConversion)),await ee(g)}else(0,h.execFileSync)(p,he(y,m,s.useLosslessConversion))}else if(v.toLowerCase()=="svg")if(["AVIF","PDF","WEBP"].includes(e)){var F=[];try{let p=D(F,await M("tmp","png"),!0);await de("PNG",y,p.path);return await j([p.path],e,[m])}catch(H){var R=H,T=!0}finally{var X=U(F,R,T);X&&await X}}else return await de(e,y,m),await j([m],e,[m]);else if(e=="SVG"){var ge=[];try{let p=D(ge,await M("tmp","bmp"),!0);(0,h.execFileSync)("chmod",["+x",re()]);if(v.toLowerCase()=="webp"){var Z=[];try{let f=D(Z,await M("tmp","png"),!0);let[x]=await te();(0,h.execFileSync)(x,[y,"-o",f.path]);(0,h.execFileSync)("sips",["--setProperty","format","bmp",f.path,"--out",p.path]);(0,h.execFileSync)(re(),["-s","--tight","-o",m,p.path])}catch(Je){var Ke=Je,Xe=!0}finally{var me=U(Z,Ke,Xe);me&&await me}}else if(v.toLowerCase()=="pdf"){let f=S.default.join(m.split("/").slice(0,-1).join("/"),S.default.basename(m,".svg")+" SVG");(0,h.execFileSync)("mkdir",["-p",f]),await J("PNG",y,f);let x=(0,ae.readdirSync)(f).map(g=>S.default.join(f,g));for(let g of x)(0,h.execFileSync)("sips",["--setProperty","format","bmp",g,"--out",p.path]),(0,h.execFileSync)(re(),["-s","--tight","-o",g.replace(".png",".svg"),p.path]),await ee(g)}else(0,h.execFileSync)("sips",["--setProperty","format","bmp",y,"--out",p.path]),(0,h.execFileSync)(re(),["-s","--tight","-o",m,p.path])}catch(Ze){var qe=Ze,Qe=!0}finally{var be=U(ge,qe,Qe);be&&await be}}else if(e=="AVIF"){let{encoderPath:p}=await z();if(v.toLowerCase()=="pdf"){let f=S.default.join(m.split("/").slice(0,-1).join("/"),S.default.basename(m,".avif")+" AVIF");(0,h.execFileSync)("mkdir",["-p",f]),await J("PNG",y,f);let x=(0,ae.readdirSync)(f).map(g=>S.default.join(f,g)).filter(g=>g.endsWith(".png"));for(let g of x)(0,h.execFileSync)(p,[...s.useLosslessConversion?pe:[],g,g.replace(".png",".avif")]),await ee(g)}else{var ye=[];try{let f=D(ye,await M("tmp","png"),!0);await j([y],"PNG",[f.path],!0);(0,h.execFileSync)(p,[...s.useLosslessConversion?pe:[],f.path,m])}catch(Ye){var et=Ye,tt=!0}finally{var we=U(ye,et,tt);we&&await we}}}else if(v.toLowerCase()=="webp"){let[p]=await te();(0,h.execFileSync)(p,[y,"-o",m]),(0,h.execFileSync)("sips",["--setProperty","format",e.toLowerCase(),m])}else if(v.toLowerCase()=="pdf"){let p=S.default.basename(y),f=`${p?.substring(0,p.lastIndexOf("."))} ${e}`,x=S.default.join(m.split("/").slice(0,-1).join("/"),f);(0,h.execFileSync)("mkdir",["-p",x]),await J(e,y,x)}else if(v.toLowerCase()=="avif"){var $e=[];try{let{decoderPath:p}=await z();let f=D($e,await M("tmp","png"),!0);(0,h.execFileSync)(p,[y,f.path]);return await j([f.path],e,[m])}catch(rt){var at=rt,nt=!0}finally{var ke=U($e,at,nt);ke&&await ke}}else(0,h.execFileSync)("sips",["--setProperty","format",e.toLowerCase(),y,"--out",m]);i.push(m)}return a||await ze(i),i}async function It({format:t,imagePaths:e}){let r=e?.length?e:await Ve(),a=await j(r,t);return await je(),a}
