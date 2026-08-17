"use strict";var gt=Object.create;var re=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var yt=Object.getOwnPropertyNames;var wt=Object.getPrototypeOf,$t=Object.prototype.hasOwnProperty;var Ce=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Re=t=>{throw TypeError(t)};var kt=(t,e)=>{for(var r in e)re(t,r,{get:e[r],enumerable:!0})},Te=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of yt(e))!$t.call(t,s)&&s!==r&&re(t,s,{get:()=>e[s],enumerable:!(n=bt(e,s))||n.enumerable});return t};var O=(t,e,r)=>(r=t!=null?gt(wt(t)):{},Te(e||!t||!t.__esModule?re(r,"default",{value:t,enumerable:!0}):r,t)),St=t=>Te(re({},"__esModule",{value:!0}),t);var _=(t,e,r)=>{if(e!=null){typeof e!="object"&&typeof e!="function"&&Re("Object expected");var n,s;r&&(n=e[Ce("asyncDispose")]),n===void 0&&(n=e[Ce("dispose")],r&&(s=n)),typeof n!="function"&&Re("Object not disposable"),s&&(n=function(){try{s.call(this)}catch(i){return Promise.reject(i)}}),t.push([r,n,e])}else r&&t.push([r]);return e},N=(t,e,r)=>{var n=typeof SuppressedError=="function"?SuppressedError:function(a,c,d,l){return l=Error(d),l.name="SuppressedError",l.error=a,l.suppressed=c,l},s=a=>e=r?new n(a,e,"An error was suppressed during disposal"):(r=!0,a),i=a=>{for(;a=t.pop();)try{var c=a[1]&&a[1].call(a[2]);if(a[0])return Promise.resolve(c).then(i,d=>(s(d),i()))}catch(d){s(d)}if(r)throw e};return i()};var _t={};kt(_t,{default:()=>rt});module.exports=St(_t);var y=require("@raycast/api"),tt=require("react");var I=require("@raycast/api"),Z=require("react/jsx-runtime");function fe(){return(0,Z.jsxs)(I.ActionPanel.Section,{title:"Settings",children:[(0,Z.jsx)(I.Action,{title:"Configure Command",icon:I.Icon.Gear,shortcut:{modifiers:["cmd","shift"],key:","},onAction:async()=>{await(0,I.openCommandPreferences)()}}),(0,Z.jsx)(I.Action,{title:"Configure Extension",icon:I.Icon.Gear,shortcut:{modifiers:["opt","cmd"],key:","},onAction:async()=>{await(0,I.openExtensionPreferences)()}})]})}var h=require("child_process"),ce=require("fs"),x=O(require("path")),Y=require("@raycast/api");var K=require("child_process"),S=require("@raycast/api");var q=require("child_process"),$=O(require("fs")),C=O(require("os")),b=O(require("path")),o=require("@raycast/api");var W=O(require("react")),k=require("@raycast/api");var _e=O(require("node:child_process")),Ne=require("node:buffer"),G=O(require("node:stream")),Le=require("node:util");var Me=require("react/jsx-runtime");var de=globalThis;var ne=t=>!!t&&typeof t=="object"&&typeof t.removeListener=="function"&&typeof t.emit=="function"&&typeof t.reallyExit=="function"&&typeof t.listeners=="function"&&typeof t.kill=="function"&&typeof t.pid=="number"&&typeof t.on=="function",pe=Symbol.for("signal-exit emitter"),me=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),de[pe])return de[pe];Object.defineProperty(de,pe,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,r){this.listeners[e].push(r)}removeListener(e,r){let n=this.listeners[e],s=n.indexOf(r);s!==-1&&(s===0&&n.length===1?n.length=0:n.splice(s,1))}emit(e,r,n){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let i of this.listeners[e])s=i(r,n)===!0||s;return e==="exit"&&(s=this.emit("afterExit",r,n)||s),s}},ge=class{onExit(){return()=>{}}load(){}unload(){}},be=class{#o;#t;#e;#s;#i;#a;#n;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new me,this.#a={},this.#n=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#a={};for(let r of this.#r)this.#a[r]=()=>{let n=this.#e.listeners(r),{count:s}=this.#t,i=e;if(typeof i.__signal_exit_emitter__=="object"&&typeof i.__signal_exit_emitter__.count=="number"&&(s+=i.__signal_exit_emitter__.count),n.length===s){this.unload();let a=this.#t.emit("exit",null,r),c=r==="SIGHUP"?this.#o:r;a||e.kill(e.pid,c)}};this.#i=e.reallyExit,this.#s=e.emit}onExit(e,r){if(!ne(this.#e))return()=>{};this.#n===!1&&this.load();let n=r?.alwaysLast?"afterExit":"exit";return this.#t.on(n,e),()=>{this.#t.removeListener(n,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#n){this.#n=!0,this.#t.count+=1;for(let e of this.#r)try{let r=this.#a[e];r&&this.#e.on(e,r)}catch{}this.#e.emit=(e,...r)=>this.#l(e,...r),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#n&&(this.#n=!1,this.#r.forEach(e=>{let r=this.#a[e];if(!r)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,r)}catch{}}),this.#e.emit=this.#s,this.#e.reallyExit=this.#i,this.#t.count-=1)}#c(e){return ne(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#i.call(this.#e,this.#e.exitCode)):0}#l(e,...r){let n=this.#s;if(e==="exit"&&ne(this.#e)){typeof r[0]=="number"&&(this.#e.exitCode=r[0]);let s=n.call(this.#e,e,...r);return this.#t.emit("exit",this.#e.exitCode,null),s}else return n.call(this.#e,e,...r)}},he=null,xt=(t,e)=>(he||(he=ne(process)?new be(process):new ge),he.onExit(t,e));function Pt(t,{timeout:e}={}){let r=new Promise((c,d)=>{t.on("exit",(l,R)=>{c({exitCode:l,signal:R,timedOut:!1})}),t.on("error",l=>{d(l)}),t.stdin&&t.stdin.on("error",l=>{d(l)})}),n=xt(()=>{t.kill()});if(e===0||e===void 0)return r.finally(()=>n());let s,i=new Promise((c,d)=>{s=setTimeout(()=>{t.kill("SIGTERM"),d(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),a=r.finally(()=>{clearTimeout(s)});return Promise.race([i,a]).finally(()=>n())}var ye=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function vt(t){let{encoding:e}=t,r=e==="buffer",n=new G.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&n.setEncoding(e);let s=0,i=[];return n.on("data",a=>{i.push(a),s+=a.length}),n.getBufferedValue=()=>r?Buffer.concat(i,s):i.join(""),n.getBufferedLength=()=>s,n}async function De(t,e){let r=vt(e);return await new Promise((n,s)=>{let i=a=>{a&&r.getBufferedLength()<=Ne.constants.MAX_LENGTH&&(a.bufferedData=r.getBufferedValue()),s(a)};(async()=>{try{await(0,Le.promisify)(G.default.pipeline)(t,r),n()}catch(a){i(a)}})(),r.on("data",()=>{r.getBufferedLength()>8e7&&i(new ye)})}),r.getBufferedValue()}async function Ue(t,e){t.destroy();try{return await e}catch(r){return r.bufferedData}}async function It({stdout:t,stderr:e},{encoding:r},n){let s=De(t,{encoding:r}),i=De(e,{encoding:r});try{return await Promise.all([n,s,i])}catch(a){return Promise.all([{error:a,exitCode:null,signal:a.signal,timedOut:a.timedOut||!1},Ue(t,s),Ue(e,i)])}}function At(t){let e=typeof t=="string"?`
`:10,r=typeof t=="string"?"\r":13;return t[t.length-1]===e&&(t=t.slice(0,-1)),t[t.length-1]===r&&(t=t.slice(0,-1)),t}function Oe(t,e){return t.stripFinalNewline?At(e):e}function Et({timedOut:t,timeout:e,signal:r,exitCode:n}){return t?`timed out after ${e} milliseconds`:r!=null?`was killed with ${r}`:n!=null?`failed with exit code ${n}`:"failed"}function Ft({stdout:t,stderr:e,error:r,signal:n,exitCode:s,command:i,timedOut:a,options:c,parentError:d}){let R=`Command ${Et({timedOut:a,timeout:c?.timeout,signal:n,exitCode:s})}: ${i}`,u=r?`${R}
${r.message}`:R,T=[u,e,t].filter(Boolean).join(`
`);return r?r.originalMessage=r.message:r=d,r.message=T,r.shortMessage=u,r.command=i,r.exitCode=s,r.signal=n,r.stdout=t,r.stderr=e,"bufferedData"in r&&delete r.bufferedData,r}function Ct({stdout:t,stderr:e,error:r,exitCode:n,signal:s,timedOut:i,command:a,options:c,parentError:d}){if(r||n!==0||s!==null)throw Ft({error:r,exitCode:n,signal:s,stdout:t,stderr:e,command:a,timedOut:i,options:c,parentError:d});return t}async function F(t,e,r){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:n,language:s,timeout:i,...a}=Array.isArray(e)?r||{}:e||{},c=n!==!1?[]:["-ss"];s==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let d=_e.default.spawn("osascript",c,{...a,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),l=Pt(d,{timeout:i??1e4});d.stdin.end(t);let[{error:R,exitCode:u,signal:T,timedOut:X},D,U]=await It(d,{encoding:"utf8"},l),ee=Oe({stripFinalNewline:!0},D),te=Oe({stripFinalNewline:!0},U);return Ct({stdout:ee,stderr:te,error:R,exitCode:u,signal:T,timedOut:X,command:"osascript",options:r,parentError:new Error})}var We=async()=>F(`use framework "AppKit"
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
      
      return filePaths`),je=async t=>{let e=Array.isArray(t)?t:[t];await F(`use framework "Foundation"
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
      end if`)};var V=O(require("path"));var ae=require("child_process");function j(t,e){let r=e?.command,n=e?.language,s=[...e?.leadingArgs?.map(u=>u.toString())||[]],i=e?.trailingArgs||[];!r&&(n===void 0||n==="AppleScript"||n==="JXA")&&(r="/usr/bin/osascript",s.push("-l",n==="JXA"?"JavaScript":"AppleScript",...t.startsWith("/")?[]:["-e"],t,...i.map(u=>u.toString())));let a=process.env;if(e?.command&&(a.PATH=`${a.PATH}:${(0,ae.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,r=e.command,s.push(t,...i.map(u=>u.toString()))),!r)throw new Error("No command specified.");let c="",d=u=>{console.log(u)},l=(0,ae.spawn)(r,s,{env:a});return e?.logDebugMessages&&console.log(`Running shell command "${r} ${s.join(" ")}"`),l.stdout?.on("data",u=>{c+=u.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${c}`)}),l.stderr?.on("data",u=>{e?.stderrCallback&&e.stderrCallback(u.toString()),e?.logErrors&&console.error(u.toString())}),l.stdin.on("error",u=>{e?.logErrors&&console.error(`Error writing to stdin: ${u}`)}),d=async u=>{u?.length>0&&(l.stdin.cork(),l.stdin.write(`${u}\r
`),process.nextTick(()=>l.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${u}`))},{data:(async()=>new Promise((u,T)=>{let X=e?.timeout?setTimeout(()=>{try{l.kill()}catch(D){e?.logErrors&&console.error(`Error killing process: ${D}`)}return e?.logErrors&&console.error("Script timed out"),l.stdin.end(),l.kill(),T("Script timed out")},e?.timeout):void 0;l.on("close",D=>{if(D!==0)return e?.logErrors&&console.error(`Script exited with code ${D}`),l.stdin.end(),l.kill(),T(`Script exited with code ${D}`);clearTimeout(X);let U;try{U=JSON.parse(c)}catch{U=c.trim()}return e?.logFinalOutput&&console.log(`Script output: ${U}`),u(U)})}))(),sendMessage:d}}var z=require("@raycast/api");function L(t){return t.split(", /").map((e,r)=>r===0?e.trim():`/${e.trim()}`)}async function Ve(){let t=V.default.join(z.environment.assetsPath,"scripts","finder.scpt"),e=await j(t,{language:"AppleScript",stderrCallback:r=>v("Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:L(e)}async function ze(){let t=V.default.join(z.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await j(t,{language:"AppleScript",stderrCallback:r=>v("HoudahSpot Selection Error",new Error(r))}).data;return Array.isArray(e)?e:L(e)}async function Be(){let t=V.default.join(z.environment.assetsPath,"scripts","neofinder.scpt"),e=await j(t,{language:"AppleScript",stderrCallback:r=>v("NeoFinder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:L(e)}async function He(){let t=V.default.join(z.environment.assetsPath,"scripts","pathfinder.scpt"),e=await j(t,{language:"JXA",stderrCallback:r=>v("Path Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:L(e)}async function Ge(){let t=V.default.join(z.environment.assetsPath,"scripts","qspace.scpt"),e=await j(t,{language:"JXA",stderrCallback:r=>v("QSpace Pro Selection Error",new Error(r))}).data;return Array.isArray(e)?e:L(e)}async function Je(){let t=V.default.join(z.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await j(t,{language:"JXA",stderrCallback:r=>v("ForkLift Selection Error",new Error(r))}).data;return Array.isArray(e)?e:L(e)}var se=async t=>{let e=await o.LocalStorage.getItem("itemsToRemove")??"";await o.LocalStorage.setItem("itemsToRemove",e+`
`+t)},B=async(t,e)=>{let r=b.default.join(C.tmpdir(),`${t}.${e}`);return{path:r,[Symbol.asyncDispose]:async()=>{$.existsSync(r)&&await $.promises.rm(r,{recursive:!0})}}};var Xe=async()=>{let e=(await o.LocalStorage.getItem("itemsToRemove")??"").toString().split(`
`).filter(Boolean);for(let r of e)$.existsSync(r)&&await $.promises.rm(r,{recursive:!0});await o.LocalStorage.removeItem("itemsToRemove")},we=async()=>{let t=[],r=(0,o.getPreferenceValues)().inputMethod,n=!1;if(r=="Clipboard")try{let a=L(await We());if(await o.LocalStorage.setItem("itemsToRemove",a.join(`
`)),a.filter(c=>c.trim().length>0).length>0)return a}catch(a){console.error(`Couldn't get images from clipboard: ${a}`),n=!0}let s=r;try{s=(await(0,o.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: ${a}`)}try{(r=="Path Finder"||s=="Path Finder")&&(t=await He())}catch(a){console.error(`Couldn't get images from Path Finder: ${a}`),n=!0}try{(r=="NeoFinder"||s=="NeoFinder")&&(t=await Be())}catch(a){console.error(`Couldn't get images from NeoFinder: ${a}`),n=!0}try{(r=="HoudahSpot"||s=="HoudahSpot")&&(t=await ze())}catch(a){console.error(`Couldn't get images from HoudahSpot: ${a}`),n=!0}try{(r=="QSpace"||s=="QSpace Pro"||s=="QSpace")&&(t=await Ge())}catch(a){console.error(`Couldn't get images from ${s}: ${a}`),n=!0}try{(r=="ForkLift"||s=="ForkLift")&&(t=await Je())}catch(a){console.error(`Couldn't get images from ForkLift: ${a}`),n=!0}if(t.length>0)return t.filter((a,c)=>t.indexOf(a)===c);let i=await Ve();return s=="Finder"||r=="Finder"||n?t=i:i.forEach(a=>{a.split("/").at(-2)=="Desktop"&&!t.includes(a)&&t.push(a)}),t.filter((a,c)=>t.indexOf(a)===c)},Ze=async t=>{let e="Finder";try{e=(await(0,o.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: : ${n}`)}let r=(0,o.getPreferenceValues)();r.imageResultHandling=="copyToClipboard"?(await je(t),Ke(t)):r.imageResultHandling=="openInPreview"?(await Rt(t),Ke(t)):r.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,o.showInFinder)(t[0]):(r.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,o.showInFinder)(t[0])},ie=async()=>(C.cpus()[0].model.includes("Apple")?"arm":"x86")=="arm"?((0,q.execSync)(`chmod +x "${o.environment.assetsPath}/webp/arm/dwebp"`),(0,q.execSync)(`chmod +x "${o.environment.assetsPath}/webp/arm/cwebp"`),$.existsSync(`${o.environment.assetsPath}/webp/x86/dwebp`)&&await $.promises.rm(`${o.environment.assetsPath}/webp/x86/dwebp`),$.existsSync(`${o.environment.assetsPath}/webp/x86/cwebp`)&&await $.promises.rm(`${o.environment.assetsPath}/webp/x86/cwebp`),[`${o.environment.assetsPath}/webp/arm/dwebp`,`${o.environment.assetsPath}/webp/arm/cwebp`]):((0,q.execSync)(`chmod +x "${o.environment.assetsPath}/webp/x86/dwebp"`),(0,q.execSync)(`chmod +x "${o.environment.assetsPath}/webp/x86/cwebp"`),$.existsSync(`${o.environment.assetsPath}/webp/arm/dwebp`)&&await $.promises.rm(`${o.environment.assetsPath}/webp/arm/dwebp`),$.existsSync(`${o.environment.assetsPath}/webp/arm/cwebp`)&&await $.promises.rm(`${o.environment.assetsPath}/webp/arm/cwebp`),[`${o.environment.assetsPath}/webp/x86/dwebp`,`${o.environment.assetsPath}/webp/x86/cwebp`]);var $e=async(t,e,r)=>F(`use framework "Foundation"
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
  pngData's writeToFile:"${r}" atomically:false`),Q=async(t,e,r)=>{let n=(0,o.getPreferenceValues)(),s="NSPNGFileType";return t=="JPEG"?s="NSJPEGFileType":t=="TIFF"&&(s="NSTIFFFileType"),F(`use framework "Foundation"
  use framework "PDFKit"
  
  -- Load the PDF file as NSData
  set pdfData to current application's NSData's dataWithContentsOfFile:"${e}"
  
  -- Create a PDFDocument from the PDF data
  set pdfDoc to current application's PDFDocument's alloc()'s initWithData:pdfData

  ${n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview"?"set pageImages to current application's NSMutableArray's alloc()'s init()":""}
  
  set pageCount to (pdfDoc's pageCount()) - 1
  repeat with pageIndex from 0 to pageCount
    -- Create an NSImage from each page of the PDF document
    set pdfPage to (pdfDoc's pageAtIndex:pageIndex)
    set pdfRect to (pdfPage's boundsForBox:(current application's kPDFDisplayBoxMediaBox))
    set pdfImage to (current application's NSImage's alloc()'s initWithSize:{item 1 of item 2 of pdfRect, item 2 of item 2 of pdfRect})
    pdfImage's lockFocus()
    (pdfPage's drawWithBox:(current application's kPDFDisplayBoxMediaBox))
    pdfImage's unlockFocus()

    ${n.imageResultHandling=="copyToClipboard"?"pageImages's addObject:pdfImage":`
  
    -- Convert the NSImage to PNG data
    set pngData to pdfImage's TIFFRepresentation()
    set pngRep to (current application's NSBitmapImageRep's imageRepWithData:pngData)
    set pngData to (pngRep's representationUsingType:(current application's ${s}) |properties|:(missing value))
    
    -- Write the PNG data to a new file
    set filePath to "${r}/page-" & pageIndex + 1 & ".${t.toLowerCase()}"
    set fileURL to current application's NSURL's fileURLWithPath:filePath
    ${n.imageResultHandling=="openInPreview"?"pageImages's addObject:fileURL":""}
    pngData's writeToURL:fileURL atomically:false`}
  end repeat

  ${n.imageResultHandling=="openInPreview"?`
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
  
  ${n.imageResultHandling=="copyToClipboard"?`
    -- Copy the image of each page to the clipboard
    set thePasteboard to current application's NSPasteboard's generalPasteboard()
    thePasteboard's clearContents()
    thePasteboard's writeObjects:pageImages`:""}`,{timeout:60*1e3*5})};var Rt=async t=>{let e=Array.isArray(t)?t:[t],r=e.some(n=>b.default.extname(n)==".svg");await F(`use framework "Foundation"
    use scripting additions
    set pageImages to {${e.map(n=>`current application's NSURL's fileURLWithPath:"${n}"`).join(", ")}}

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
          end tell`}`)},Ke=t=>{let e=Array.isArray(t)?t:[t];for(let r of e)$.unlinkSync(r)},Tt=async()=>F(`use framework "Foundation"
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
    end if`),Dt=async t=>{let e="Finder";try{e=await Tt()}catch(r){console.error(`Couldn't get frontmost application: ${r}`)}try{if(e=="Path Finder")return F(`tell application "Path Finder"
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
      end tell`)}catch(r){console.error(`Couldn't get current directory of Path Finder: ${r}`)}return F(`tell application "Finder"
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
  end tell`)},qe=async(t,e=!1,r=void 0)=>{let n=(0,o.getPreferenceValues)(),s=await Dt(t[0]);return t.map(i=>{let a=i;if(n.imageResultHandling=="saveToDownloads"?a=b.default.join(C.homedir(),"Downloads",b.default.basename(a)):n.imageResultHandling=="saveToDesktop"?a=b.default.join(C.homedir(),"Desktop",b.default.basename(a)):(n.imageResultHandling=="saveInContainingFolder"||n.imageResultHandling=="replaceOriginal")&&(n.inputMethod=="Clipboard"||e)?a=b.default.join(s,b.default.basename(a)):(n.imageResultHandling=="copyToClipboard"||n.imageResultHandling=="openInPreview")&&(a=b.default.join(C.tmpdir(),b.default.basename(a))),a=r?a.replace(b.default.extname(a),`.${r}`):a,n.imageResultHandling!="replaceOriginal"&&C.tmpdir()!=b.default.dirname(a)){let c=2;for(;$.existsSync(a);)a=b.default.join(b.default.dirname(a),b.default.basename(a,b.default.extname(a))+`-${c}${b.default.extname(a)}`),c++}return a})},v=async(t,e,r,n)=>{console.error(e),r?(r.title=t,r.message=n??e.message,r.style=o.Toast.Style.Failure,r.primaryAction={title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}):r=await(0,o.showToast)({title:t,message:n??e.message,style:o.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await o.Clipboard.copy(e.message)}}})};var Qe=t=>{let e=C.homedir();if(t.startsWith("~"))return t.replace(/^~(?=$|\/|\\)/,e);let r=/(\/Users\/.*?)\/.*/,n=t.match(r);return n?t.replace(n[1],e):t};var Ye=require("fs"),ke=["-s","0","--min","0","--max","0","--minalpha","0","--maxalpha","0","--qcolor","100","--qalpha","100"];async function Ut(){let t="";try{t=(0,K.execSync)(`/bin/zsh -lc 'realpath "$(which brew)"'`).toString().trim()}catch(e){console.error(e)}if(t==="")return await(0,S.showToast)({title:"Homebrew is required to install the AVIF encoder.",message:"Please install Homebrew and try again. Visit https://brew.sh for more information. Once Homebrew is installed, run the command `brew install libavif` to install the AVIF encoder manually (Otherwise, this command will be run automatically).",style:S.Toast.Style.Failure}),!1;if(await(0,S.confirmAlert)({title:"Install AVIF Encoder",message:"The libavif Homebrew formula is required to convert images to/from AVIF format. Would you like to install it now?",primaryAction:{title:"Install"}})){let e=await(0,S.showToast)({title:"Installing AVIF Encoder...",style:S.Toast.Style.Animated});try{if((0,K.execSync)(`/bin/zsh -ilc '${t} install --quiet libavif || true'`),!Ot())throw new Error("The avifenc binary has not been added to the user's $PATH");return e.title="AVIF Encoder installed successfully!",e.style=S.Toast.Style.Success,!0}catch(r){console.error(r),v("Failed to install AVIF Encoder.",r,e,"If you previously attempted to install libavif or avifenc, please run `brew doctor` followed by `brew cleanup` and try again.")}}return await(0,S.showToast)({title:"AVIF Encoder not installed.",style:S.Toast.Style.Failure}),!1}async function Ot(){let r=!1,n=0;for(;!r&&n<7;){let s=(0,K.execSync)("/bin/zsh -lc 'command -v avifenc'").toString().trim();if((0,Ye.existsSync)(s)){r=!0;break}await new Promise(i=>setTimeout(i,1e3)),n++}return r}async function J(){let t=await S.LocalStorage.getItem("avifEncoderPath"),e=await S.LocalStorage.getItem("avifDecoderPath");if(!t||!e)try{t=(0,K.execSync)(`/bin/zsh -lc 'realpath "$(which avifenc)"'`).toString().trim(),e=(0,K.execSync)(`/bin/zsh -lc 'realpath "$(which avifdec)"'`).toString().trim(),t&&await S.LocalStorage.setItem("avifEncoderPath",t),e&&await S.LocalStorage.setItem("avifDecoderPath",e)}catch(r){if(await Ut())try{return await J()}catch(n){console.error(n),v("AVIF Encoder not found.",n,void 0,"Please install the libavif Homebrew formula manually and try again.")}else v("AVIF Encoder not found.",r,void 0,"Please install the libavif Homebrew formula and try again.")}if(typeof t!="string"||typeof e!="string")throw new Error("AVIF encoder and decoder paths could not be resolved.");return{encoderPath:t,decoderPath:e}}function Se(t,e,r){return[...r?["-lossless"]:[],t,"-o",e]}function oe(){return x.default.join(Y.environment.assetsPath,"potrace/potrace")}var et=["ASTC","AVIF","BMP","DDS","EXR","GIF","HEIC","HEICS","ICNS","ICO","JPEG","JP2","KTX","PBM","PDF","PNG","PSD","PVR","TGA","TIFF","WEBP","SVG"];async function M(t,e,r,n=!1){let s=(0,Y.getPreferenceValues)();Y.environment.commandName==="tools/convert-images"&&(s.jpegExtension="jpg");let i=[],a=t.map(ue=>Qe(ue));for(let[ue,w]of a.entries()){let E=x.default.extname(w).slice(1),mt=e==="JPEG"?s.jpegExtension:e.toLowerCase(),m=r?.[ue]||(await qe([w],!1,mt))[0];if(e==="WEBP"&&E.toLowerCase()!=="svg"){let[,p]=await ie();if(E.toLowerCase()=="avif"){var c=[];try{let{decoderPath:f}=await J();let P=_(c,await B("tmp","png"),!0);(0,h.execFileSync)(f,[w,P.path]);(0,h.execFileSync)(p,Se(P.path,m,s.useLosslessConversion))}catch(d){var l=d,R=!0}finally{var u=N(c,l,R);u&&await u}}else if(E.toLowerCase()=="pdf"){let f=x.default.join(m.split("/").slice(0,-1).join("/"),x.default.basename(m,".webp")+" WebP");(0,h.execFileSync)("mkdir",["-p",f]),await Q("PNG",w,f);let P=(0,ce.readdirSync)(f).map(g=>x.default.join(f,g));for(let g of P)(0,h.execFileSync)(p,Se(g,g.replace(".png",".webp"),s.useLosslessConversion)),await se(g)}else(0,h.execFileSync)(p,Se(w,m,s.useLosslessConversion))}else if(E.toLowerCase()=="svg")if(["AVIF","PDF","WEBP"].includes(e)){var T=[];try{let p=_(T,await B("tmp","png"),!0);await $e("PNG",w,p.path);return await M([p.path],e,[m])}catch(X){var D=X,U=!0}finally{var ee=N(T,D,U);ee&&await ee}}else return await $e(e,w,m),await M([m],e,[m]);else if(e=="SVG"){var Pe=[];try{let p=_(Pe,await B("tmp","bmp"),!0);(0,h.execFileSync)("chmod",["+x",oe()]);if(E.toLowerCase()=="webp"){var te=[];try{let f=_(te,await B("tmp","png"),!0);let[P]=await ie();(0,h.execFileSync)(P,[w,"-o",f.path]);(0,h.execFileSync)("sips",["--setProperty","format","bmp",f.path,"--out",p.path]);(0,h.execFileSync)(oe(),["-s","--tight","-o",m,p.path])}catch(nt){var at=nt,st=!0}finally{var xe=N(te,at,st);xe&&await xe}}else if(E.toLowerCase()=="pdf"){let f=x.default.join(m.split("/").slice(0,-1).join("/"),x.default.basename(m,".svg")+" SVG");(0,h.execFileSync)("mkdir",["-p",f]),await Q("PNG",w,f);let P=(0,ce.readdirSync)(f).map(g=>x.default.join(f,g));for(let g of P)(0,h.execFileSync)("sips",["--setProperty","format","bmp",g,"--out",p.path]),(0,h.execFileSync)(oe(),["-s","--tight","-o",g.replace(".png",".svg"),p.path]),await se(g)}else(0,h.execFileSync)("sips",["--setProperty","format","bmp",w,"--out",p.path]),(0,h.execFileSync)(oe(),["-s","--tight","-o",m,p.path])}catch(it){var ot=it,ct=!0}finally{var ve=N(Pe,ot,ct);ve&&await ve}}else if(e=="AVIF"){let{encoderPath:p}=await J();if(E.toLowerCase()=="pdf"){let f=x.default.join(m.split("/").slice(0,-1).join("/"),x.default.basename(m,".avif")+" AVIF");(0,h.execFileSync)("mkdir",["-p",f]),await Q("PNG",w,f);let P=(0,ce.readdirSync)(f).map(g=>x.default.join(f,g)).filter(g=>g.endsWith(".png"));for(let g of P)(0,h.execFileSync)(p,[...s.useLosslessConversion?ke:[],g,g.replace(".png",".avif")]),await se(g)}else{var Ie=[];try{let f=_(Ie,await B("tmp","png"),!0);await M([w],"PNG",[f.path],!0);(0,h.execFileSync)(p,[...s.useLosslessConversion?ke:[],f.path,m])}catch(lt){var ut=lt,ft=!0}finally{var Ae=N(Ie,ut,ft);Ae&&await Ae}}}else if(E.toLowerCase()=="webp"){let[p]=await ie();(0,h.execFileSync)(p,[w,"-o",m]),(0,h.execFileSync)("sips",["--setProperty","format",e.toLowerCase(),m])}else if(E.toLowerCase()=="pdf"){let p=x.default.basename(w),f=`${p?.substring(0,p.lastIndexOf("."))} ${e}`,P=x.default.join(m.split("/").slice(0,-1).join("/"),f);(0,h.execFileSync)("mkdir",["-p",P]),await Q(e,w,P)}else if(E.toLowerCase()=="avif"){var Ee=[];try{let{decoderPath:p}=await J();let f=_(Ee,await B("tmp","png"),!0);(0,h.execFileSync)(p,[w,f.path]);return await M([f.path],e,[m])}catch(dt){var pt=dt,ht=!0}finally{var Fe=N(Ee,pt,ht);Fe&&await Fe}}else(0,h.execFileSync)("sips",["--setProperty","format",e.toLowerCase(),w,"--out",m]);i.push(m)}return n||await Ze(i),i}var H=require("@raycast/api");async function le(t){if(t.selectedImages.length===0||t.selectedImages.length===1&&t.selectedImages[0]===""){await(0,H.showToast)({title:"No images selected",message:"No images found in your selection. Make sure the image(s) still exist on the disk. Verify that Raycast has permission to automate Finder and/or third-party file managers under System Settings->Privacy & Security->Automation->Raycast. If using a third-party file manager, make sure the app's index is up to date.",style:H.Toast.Style.Failure});return}let e=await(0,H.showToast)({title:t.inProgressMessage,style:H.Toast.Style.Animated}),r=`image${t.selectedImages.length===1?"":"s"}`;try{let n=await t.operation();return e.title=`${t.successMessage} ${t.selectedImages.length.toString()} ${r}`,e.style=H.Toast.Style.Success,n}catch(n){await v(`${t.failureMessage} ${t.selectedImages.length.toString()} ${r}`,n,e)}finally{await Xe()}}var A=require("react/jsx-runtime");function rt(t){let e=(0,y.getPreferenceValues)(),r=et.filter(n=>e[`show${n}`]);return(0,tt.useEffect)(()=>{if(t.launchContext&&"convertTo"in t.launchContext){let{convertTo:n}=t.launchContext;n&&Promise.resolve(we()).then(async s=>{await le({operation:()=>M(s,n),selectedImages:s,inProgressMessage:"Conversion in progress...",successMessage:"Converted",failureMessage:"Failed to convert"})})}},[t.launchContext]),(0,A.jsxs)(y.List,{searchBarPlaceholder:"Search image transformations...",children:[(0,A.jsx)(y.List.EmptyView,{title:"No Formats Enabled",description:"Enable formats in the command preferences (\u2318\u21E7,)",icon:y.Icon.Image,actions:(0,A.jsx)(y.ActionPanel,{children:(0,A.jsx)(y.Action,{title:"Open Command Preferences",onAction:async()=>await(0,y.openCommandPreferences)(),shortcut:{modifiers:["cmd","shift"],key:","}})})}),r.map(n=>(0,A.jsx)(y.List.Item,{title:n,actions:(0,A.jsxs)(y.ActionPanel,{children:[(0,A.jsx)(y.Action,{title:`Convert to ${n}`,icon:y.Icon.Switch,onAction:async()=>{let s=await we();await le({operation:()=>M(s,n),selectedImages:s,inProgressMessage:"Conversion in progress...",successMessage:"Converted",failureMessage:"Failed to convert"})}}),(0,A.jsx)(y.Action.CreateQuicklink,{title:"Create Quicklink",quicklink:{name:`Convert to ${n}`,link:`${process.env.RAYCAST_SCHEME??"raycast"}://extensions/HelloImSteven/sips/convert?context=${encodeURIComponent(JSON.stringify({convertTo:n}))}`}}),(0,A.jsx)(fe,{})]})},n))]})}
