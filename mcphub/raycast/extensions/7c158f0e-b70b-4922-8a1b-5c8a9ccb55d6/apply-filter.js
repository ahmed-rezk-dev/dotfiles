"use strict";var Re=Object.create;var N=Object.defineProperty;var Ne=Object.getOwnPropertyDescriptor;var _e=Object.getOwnPropertyNames;var Oe=Object.getPrototypeOf,Ue=Object.prototype.hasOwnProperty;var ze=(t,e)=>{for(var r in e)N(t,r,{get:e[r],enumerable:!0})},Z=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of _e(e))!Ue.call(t,s)&&s!==r&&N(t,s,{get:()=>e[s],enumerable:!(a=Ne(e,s))||a.enumerable});return t};var S=(t,e,r)=>(r=t!=null?Re(Oe(t)):{},Z(e||!t||!t.__esModule?N(r,"default",{value:t,enumerable:!0}):r,t)),Le=t=>Z(N({},"__esModule",{value:!0}),t);var Ye={};ze(Ye,{default:()=>Ee});module.exports=Le(Ye);var Ae=require("fs"),R=require("react"),g=require("@raycast/api");var k=S(require("react")),h=require("@raycast/api");var te=S(require("node:child_process")),re=require("node:buffer"),D=S(require("node:stream")),ae=require("node:util");var ne=require("react/jsx-runtime");var W=globalThis;var _=t=>!!t&&typeof t=="object"&&typeof t.removeListener=="function"&&typeof t.emit=="function"&&typeof t.reallyExit=="function"&&typeof t.listeners=="function"&&typeof t.kill=="function"&&typeof t.pid=="number"&&typeof t.on=="function",M=Symbol.for("signal-exit emitter"),V=class{constructor(){if(this.emitted={afterExit:!1,exit:!1},this.listeners={afterExit:[],exit:[]},this.count=0,this.id=Math.random(),W[M])return W[M];Object.defineProperty(W,M,{value:this,writable:!1,enumerable:!1,configurable:!1})}on(e,r){this.listeners[e].push(r)}removeListener(e,r){let a=this.listeners[e],s=a.indexOf(r);s!==-1&&(s===0&&a.length===1?a.length=0:a.splice(s,1))}emit(e,r,a){if(this.emitted[e])return!1;this.emitted[e]=!0;let s=!1;for(let o of this.listeners[e])s=o(r,a)===!0||s;return e==="exit"&&(s=this.emit("afterExit",r,a)||s),s}},j=class{onExit(){return()=>{}}load(){}unload(){}},H=class{#o;#t;#e;#i;#s;#n;#a;#r;constructor(e){this.#o=process.platform==="win32"?"SIGINT":"SIGHUP",this.#t=new V,this.#n={},this.#a=!1,this.#r=[],this.#r.push("SIGHUP","SIGINT","SIGTERM"),globalThis.process.platform!=="win32"&&this.#r.push("SIGALRM","SIGABRT","SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),globalThis.process.platform==="linux"&&this.#r.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT"),this.#e=e,this.#n={};for(let r of this.#r)this.#n[r]=()=>{let a=this.#e.listeners(r),{count:s}=this.#t,o=e;if(typeof o.__signal_exit_emitter__=="object"&&typeof o.__signal_exit_emitter__.count=="number"&&(s+=o.__signal_exit_emitter__.count),a.length===s){this.unload();let n=this.#t.emit("exit",null,r),c=r==="SIGHUP"?this.#o:r;n||e.kill(e.pid,c)}};this.#s=e.reallyExit,this.#i=e.emit}onExit(e,r){if(!_(this.#e))return()=>{};this.#a===!1&&this.load();let a=r?.alwaysLast?"afterExit":"exit";return this.#t.on(a,e),()=>{this.#t.removeListener(a,e),this.#t.listeners.exit.length===0&&this.#t.listeners.afterExit.length===0&&this.unload()}}load(){if(!this.#a){this.#a=!0,this.#t.count+=1;for(let e of this.#r)try{let r=this.#n[e];r&&this.#e.on(e,r)}catch{}this.#e.emit=(e,...r)=>this.#l(e,...r),this.#e.reallyExit=e=>this.#c(e)}}unload(){this.#a&&(this.#a=!1,this.#r.forEach(e=>{let r=this.#n[e];if(!r)throw new Error("Listener not defined for signal: "+e);try{this.#e.removeListener(e,r)}catch{}}),this.#e.emit=this.#i,this.#e.reallyExit=this.#s,this.#t.count-=1)}#c(e){return _(this.#e)?(this.#e.exitCode=e||0,this.#t.emit("exit",this.#e.exitCode,null),this.#s.call(this.#e,this.#e.exitCode)):0}#l(e,...r){let a=this.#i;if(e==="exit"&&_(this.#e)){typeof r[0]=="number"&&(this.#e.exitCode=r[0]);let s=a.call(this.#e,e,...r);return this.#t.emit("exit",this.#e.exitCode,null),s}else return a.call(this.#e,e,...r)}},B=null,We=(t,e)=>(B||(B=_(process)?new H(process):new j),B.onExit(t,e));function Me(t,{timeout:e}={}){let r=new Promise((c,p)=>{t.on("exit",(u,w)=>{c({exitCode:u,signal:w,timedOut:!1})}),t.on("error",u=>{p(u)}),t.stdin&&t.stdin.on("error",u=>{p(u)})}),a=We(()=>{t.kill()});if(e===0||e===void 0)return r.finally(()=>a());let s,o=new Promise((c,p)=>{s=setTimeout(()=>{t.kill("SIGTERM"),p(Object.assign(new Error("Timed out"),{timedOut:!0,signal:"SIGTERM"}))},e)}),n=r.finally(()=>{clearTimeout(s)});return Promise.race([o,n]).finally(()=>a())}var G=class extends Error{constructor(){super("The output is too big"),this.name="MaxBufferError"}};function Be(t){let{encoding:e}=t,r=e==="buffer",a=new D.default.PassThrough({objectMode:!1});e&&e!=="buffer"&&a.setEncoding(e);let s=0,o=[];return a.on("data",n=>{o.push(n),s+=n.length}),a.getBufferedValue=()=>r?Buffer.concat(o,s):o.join(""),a.getBufferedLength=()=>s,a}async function Q(t,e){let r=Be(e);return await new Promise((a,s)=>{let o=n=>{n&&r.getBufferedLength()<=re.constants.MAX_LENGTH&&(n.bufferedData=r.getBufferedValue()),s(n)};(async()=>{try{await(0,ae.promisify)(D.default.pipeline)(t,r),a()}catch(n){o(n)}})(),r.on("data",()=>{r.getBufferedLength()>8e7&&o(new G)})}),r.getBufferedValue()}async function Y(t,e){t.destroy();try{return await e}catch(r){return r.bufferedData}}async function Ve({stdout:t,stderr:e},{encoding:r},a){let s=Q(t,{encoding:r}),o=Q(e,{encoding:r});try{return await Promise.all([a,s,o])}catch(n){return Promise.all([{error:n,exitCode:null,signal:n.signal,timedOut:n.timedOut||!1},Y(t,s),Y(e,o)])}}function je(t){let e=typeof t=="string"?`
`:10,r=typeof t=="string"?"\r":13;return t[t.length-1]===e&&(t=t.slice(0,-1)),t[t.length-1]===r&&(t=t.slice(0,-1)),t}function ee(t,e){return t.stripFinalNewline?je(e):e}function He({timedOut:t,timeout:e,signal:r,exitCode:a}){return t?`timed out after ${e} milliseconds`:r!=null?`was killed with ${r}`:a!=null?`failed with exit code ${a}`:"failed"}function Ge({stdout:t,stderr:e,error:r,signal:a,exitCode:s,command:o,timedOut:n,options:c,parentError:p}){let w=`Command ${He({timedOut:n,timeout:c?.timeout,signal:a,exitCode:s})}: ${o}`,l=r?`${w}
${r.message}`:w,A=[l,e,t].filter(Boolean).join(`
`);return r?r.originalMessage=r.message:r=p,r.message=A,r.shortMessage=l,r.command=o,r.exitCode=s,r.signal=a,r.stdout=t,r.stderr=e,"bufferedData"in r&&delete r.bufferedData,r}function Ke({stdout:t,stderr:e,error:r,exitCode:a,signal:s,timedOut:o,command:n,options:c,parentError:p}){if(r||a!==0||s!==null)throw Ge({error:r,exitCode:a,signal:s,stdout:t,stderr:e,command:n,timedOut:o,options:c,parentError:p});return t}async function m(t,e,r){if(process.platform!=="darwin")throw new Error("AppleScript is only supported on macOS");let{humanReadableOutput:a,language:s,timeout:o,...n}=Array.isArray(e)?r||{}:e||{},c=a!==!1?[]:["-ss"];s==="JavaScript"&&c.push("-l","JavaScript"),Array.isArray(e)&&c.push("-",...e);let p=te.default.spawn("osascript",c,{...n,env:{PATH:"/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"}}),u=Me(p,{timeout:o??1e4});p.stdin.end(t);let[{error:w,exitCode:l,signal:A,timedOut:L},$,E]=await Ve(p,{encoding:"utf8"},u),De=ee({stripFinalNewline:!0},$),Te=ee({stripFinalNewline:!0},E);return Ke({stdout:De,stderr:Te,error:w,exitCode:l,signal:A,timedOut:L,command:"osascript",options:r,parentError:new Error})}var i={blur:"Blur",colorAdjustment:"Color Adjustment",colorEffect:"Color Effect",compositeOperation:"Composite Operation",distortion:"Distortion",generator:"Generator",gradient:"Gradient",halftone:"Halftone",sharpen:"Sharpen",stylize:"Stylize",tile:"Tile",stillImage:"Still Image",interlaced:"Interlaced",highDynamicRange:"High Dynamic Range"};var pe=require("@raycast/api"),fe=(t,e,r)=>`use framework "Foundation"
    use framework "Quartz"
    use framework "PDFKit"
    use scripting additions

    on getTrueSize(image)
      set rep to image's representations()'s objectAtIndex:0
      set imageSize to current application's NSMakeSize(rep's pixelsWide, rep's pixelsHigh)
      return imageSize as record
    end getTrueSize

    set res to ""
    set thePDF to missing value

    applyFilter("${t}", "${e}")
    on applyFilter(sourcePath, destinationPath)
        global thePDF
        set repeatCount to 1
        if "${t}" ends with ".pdf" then
            set thePDF to current application's PDFDocument's alloc()'s initWithURL:(current application's |NSURL|'s fileURLWithPath:sourcePath)
            set pageCount to thePDF's pageCount()
            set repeatCount to pageCount
        end if

        repeat with i from 1 to repeatCount
          if thePDF is not missing value then
            set thePage to thePDF's pageAtIndex:(i - 1)
            set theData to thePage's dataRepresentation()
            set theImage to current application's NSImage's alloc()'s initWithData:theData
          else
            set theImage to current application's NSImage's alloc()'s initWithContentsOfFile:sourcePath
          end if

          set imgSize to getTrueSize(theImage)
          
          -- Set up the Filter
          set filterName to "${r}"
          set theFilter to current application's CIFilter's filterWithName:filterName
          theFilter's setDefaults()`,he=`-- Get result & crop to original image size
    set theBounds to current application's NSMakeRect(0, 0, imgSize's width, imgSize's height)
    set uncroppedOutput to theFilter's valueForKey:(current application's kCIOutputImageKey)
    set croppedOutput to uncroppedOutput's imageByCroppingToRect:(uncroppedOutput's extent())
    
    -- Detect if output is an infinite image, bound it to the original image size
    if item 1 of (item 2 of uncroppedOutput's extent()) > 100000 or item 2 of (item 2 of uncroppedOutput's extent()) > 100000 then
      set croppedOutput to uncroppedOutput's imageByCroppingToRect:theBounds
    end if
    
    -- Convert back to NSImage and save to file
    set theRep to current application's NSCIImageRep's imageRepWithCIImage:croppedOutput
    set theResult to current application's NSImage's alloc()'s initWithSize:(theRep's |size|())
    theResult's addRepresentation:theRep
    saveImage(theResult, sourcePath, destinationPath, i)`,Je=`on saveImage(imageToSave, sourcePath, destinationPath, iter)
    global thePDF
    if destinationPath ends with ".pdf" then
      -- Replaces the contents of a PDF page with the supplied NSImage
      set newPage to current application's PDFPage's alloc()'s initWithImage:imageToSave
      thePDF's removePageAtIndex:(iter - 1)
      thePDF's insertPage:newPage atIndex:(iter - 1)
    else
      -- Saves an NSImage to the supplied file path
      set theTIFFData to imageToSave's TIFFRepresentation()
      set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
      set theImageProperties to current application's NSDictionary's dictionaryWithObject:1 forKey:(current application's NSImageCompressionFactor)
      set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
      theResultData's writeToFile:destinationPath atomically:false
    end if
end saveImage`,me=async(t,e)=>m(`${fe(e,"",t.CIFilterName)}
    set newWidth to 300

    try
      set scaleFactor to newWidth / (imgSize's width)
    on error
      set scaleFactor to 1
    end try

    set imgSize to current application's NSMakeSize(newWidth, (imgSize's height) * scaleFactor)

    set theCIImage to current application's CIImage's imageWithData:(theImage's TIFFRepresentation())
    set transform to current application's CGAffineTransformMakeScale(scaleFactor, scaleFactor)
    set smallImage to theCIImage's imageByApplyingTransform:transform highQualityDownsample:false

    theFilter's setValue:smallImage forKey:"inputImage"
    ${t.presets?Object.entries(t.presets).map(([r,a])=>`theFilter's setValue:${a} forKey:"${r}"`).join(`
`):""}
    ${he}
  end repeat
  end applyFilter
  
  on saveImage(imageToSave, sourcePath, destinationPath, iter)
       global res
        -- Saves an NSImage to the supplied file path
        set theTIFFData to imageToSave's TIFFRepresentation()
        set theBitmapImageRep to current application's NSBitmapImageRep's imageRepWithData:theTIFFData
        set theImageProperties to current application's NSDictionary's dictionaryWithObject:1 forKey:(current application's NSImageCompressionFactor)
        set theResultData to theBitmapImageRep's representationUsingType:(current application's NSPNGFileType) |properties|:(missing value)
        set base64String to (theResultData's base64EncodedStringWithOptions:0) as text
        set res to "data:image/png;base64," & base64String
  end saveImage
  
  return res`),ge=async(t,e,r)=>m(`${fe(t,e,r.CIFilterName)}
          set theCIImage to current application's CIImage's imageWithData:(theImage's TIFFRepresentation())
          theFilter's setValue:theCIImage forKey:"inputImage"
          ${r.presets?Object.entries(r.presets).map(([a,s])=>`theFilter's setValue:${s} forKey:"${a}"`).join(`
`):""}
          ${he}
        end repeat

        -- Save PDFs
        if "${t}" ends with ".pdf" then
          thePDF's writeToFile:"${e}"
        end if
    end applyFilter
    ${Je}`),K=()=>{let t=(0,pe.getPreferenceValues)(),e=[];if((t.hiddenFilters||"").trim().length>0){let r=t.hiddenFilters.split(",").map(a=>a.trim());return r.includes("Blur")||e.push(...ie),r.includes("Color Effect")||e.push(...se),r.includes("Halftone")||e.push(...oe),r.includes("Distortion")||e.push(...ce),r.includes("Sharpen")||e.push(...le),r.includes("Style")||e.push(...ue),r.includes("Tile")||e.push(...de),e.filter(a=>!r.includes(a.name))}return[...ie,...se,...oe,...ce,...le,...ue,...de]},ie=[{name:"Bokeh Blur",description:"Applies a Bokeh effect",CIFilterName:"CIBokehBlur",thumbnail:"thumbnails/bokeh_blur.webp",category:i.blur},{name:"Box Blur",description:"Blur effect using a box-shaped convolution kernel",CIFilterName:"CIBoxBlur",thumbnail:"thumbnails/box_blur.webp",category:i.blur},{name:"Disc Blur",description:"Blur effect that uses a disc-shaped convolution kernel",CIFilterName:"CIDiscBlur",thumbnail:"thumbnails/disc_blur.webp",category:i.blur},{name:"Gaussian Blur",description:"Blurs the image using a Gaussian filter",CIFilterName:"CIGaussianBlur",thumbnail:"thumbnails/gaussian_blur.webp",category:i.blur},{name:"Median",description:"Reduces noise by calculating median pixel values",CIFilterName:"CIMedianFilter",thumbnail:"thumbnails/median.webp",category:i.blur},{name:"Motion Blur",description:"Blur effect simulating a camera moving while capturing an image",CIFilterName:"CIMotionBlur",thumbnail:"thumbnails/motion_blur.webp",category:i.blur},{name:"Noise Reduction",description:"Reduces noise by sharpening areas of low luminance",CIFilterName:"CINoiseReduction",thumbnail:"thumbnails/noise_reduction.webp",category:i.blur},{name:"Zoom Blur",description:"Blur simulating a camera zooming in while capturing an image",CIFilterName:"CIZoomBlur",thumbnail:"thumbnails/zoom_blur.webp",category:i.blur}],se=[{name:"Chrome",description:"Increase brightness and saturation",CIFilterName:"CIPhotoEffectChrome",thumbnail:"thumbnails/chrome.webp",category:i.colorEffect},{name:"Dither",description:"Adds noise to reduce distortion",CIFilterName:"CIDither",thumbnail:"thumbnails/dither.webp",category:i.colorEffect},{name:"Document Enhancement",description:"Removes unwanted shadows, whitens background, and enhances contrast",CIFilterName:"CIDocumentEnhancer",thumbnail:"thumbnails/document_enhancement.webp",category:i.colorEffect},{name:"Fade",description:"Decreases saturation",CIFilterName:"CIPhotoEffectFade",thumbnail:"thumbnails/fade.webp",category:i.colorEffect},{name:"Instant",description:"Decreases saturation, reduces contrast",CIFilterName:"CIPhotoEffectInstant",thumbnail:"thumbnails/instant.webp",category:i.colorEffect},{name:"Invert",description:"Inverts colors",CIFilterName:"CIColorInvert",thumbnail:"thumbnails/invert.webp",category:i.colorEffect},{name:"Maximum Component",description:"Converts image to grayscale using the maximum of the three color components",CIFilterName:"CIMaximumComponent",thumbnail:"thumbnails/maximum_component.webp",category:i.colorEffect},{name:"Minimum Component",description:"Converts image to grayscale using the minimum of the three color components",CIFilterName:"CIMinimumComponent",thumbnail:"thumbnails/minimum_component.webp",category:i.colorEffect},{name:"Mono",description:"Desaturates images and reduces contrast",CIFilterName:"CIPhotoEffectMono",thumbnail:"thumbnails/mono.webp",category:i.colorEffect},{name:"Noir",description:"Desaturates images and increases contrast",CIFilterName:"CIPhotoEffectNoir",thumbnail:"thumbnails/noir.webp",category:i.colorEffect},{name:"Posterize",description:"Flattens colors",CIFilterName:"CIColorPosterize",thumbnail:"thumbnails/posterize.webp",category:i.colorEffect},{name:"Process",description:"Gives images a cooler toner",CIFilterName:"CIPhotoEffectProcess",thumbnail:"thumbnails/process.webp",category:i.colorEffect},{name:"Sepia",description:"Maps all colors to shades of brown",CIFilterName:"CISepiaTone",thumbnail:"thumbnails/sepia.webp",category:i.colorEffect},{name:"Thermal",description:"Thermal camera effect",CIFilterName:"CIThermal",thumbnail:"thumbnails/thermal.webp",category:i.colorEffect},{name:"Tonal",description:"Decreases saturation and contrast",CIFilterName:"CIPhotoEffectTonal",thumbnail:"thumbnails/tonal.webp",category:i.colorEffect},{name:"Transfer",description:"Makes images warmer",CIFilterName:"CIPhotoEffectTransfer",thumbnail:"thumbnails/transfer.webp",category:i.colorEffect},{name:"Vignette",description:"Adds shading to the corners of images",CIFilterName:"CIVignette",thumbnail:"thumbnails/vignette.webp",category:i.colorEffect,presets:{inputIntensity:1,inputRadius:"(imgSize's width / 2)"}},{name:"X-Ray",description:"X-Ray image effect",CIFilterName:"CIXRay",thumbnail:"thumbnails/x-ray.webp",category:i.colorEffect}],oe=[{name:"Circular Screen",description:"Simulates a circular-shaped halftone screen",CIFilterName:"CICircularScreen",thumbnail:"thumbnails/circular_screen.webp",category:i.halftone},{name:"Dot Screen",description:"Simulates the dot pattern of a halftone screen",CIFilterName:"CIDotScreen",thumbnail:"thumbnails/dot_screen.webp",category:i.halftone},{name:"CMYK Halftone",description:"Creates a halftoned rendition of an image using cyan, magenta, yellow, and black",CIFilterName:"CICMYKHalftone",thumbnail:"thumbnails/cmyk_halftone.webp",category:i.halftone},{name:"Hatched Screen",description:"Simulates the hatched pattern of a halftone screen",CIFilterName:"CIHatchedScreen",thumbnail:"thumbnails/hatched_screen.webp",category:i.halftone},{name:"Line Screen",description:"Simulates the line pattern of a halftone screen",CIFilterName:"CILineScreen",thumbnail:"thumbnails/line_screen.webp",category:i.halftone}],ce=[{name:"Bump",description:"Creates a bump that originates from a point",CIFilterName:"CIBumpDistortion",thumbnail:"thumbnails/bump.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 3)"}},{name:"Circle Splash",description:"Radially replicates colors around a center circle",CIFilterName:"CICircleSplashDistortion",thumbnail:"thumbnails/circle_splash.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Circular Wrap",description:"Wraps an image around a transparent circle",CIFilterName:"CICircularWrap",thumbnail:"thumbnails/circular_wrap.webp",category:i.distortion},{name:"Droste",description:"Creates a recursive, M.C. Escher-like effect",CIFilterName:"CIDroste",thumbnail:"thumbnails/droste.webp",category:i.distortion,presets:{inputInsetPoint0:`(current application's CIVector's vectorWithString:"[" & imgSize's width * 1 / 10 & " " & imgSize's height * 9 / 10 & "]")`,inputInsetPoint1:`(current application's CIVector's vectorWithString:"[" & imgSize's width * 9 / 10 & " " & imgSize's height * 1 / 10 & "]")`,inputPeriodicity:0}},{name:"Glass Lozenge",description:"Distorts a portion of the image around lozenge-shaped lens",CIFilterName:"CIGlassLozenge",thumbnail:"thumbnails/glass_lozenge.webp",category:i.distortion,presets:{inputPoint0:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 1.5 & " " & imgSize's height / 2 & "]")`,inputPoint1:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 3 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Hole",description:"Creates a hole in the image, pushing the surrounding pixels outward",CIFilterName:"CIHoleDistortion",thumbnail:"thumbnails/hole.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 4)"}},{name:"Light Tunnel",description:"Rotates the image around a center area to create tunneling effect",CIFilterName:"CILightTunnel",thumbnail:"thumbnails/light_tunnel.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRotation:3*Math.PI,inputRadius:"(imgSize's width / 4)"}},{name:"Linear Bump",description:"Creates a bump that originates from a line",CIFilterName:"CIBumpDistortionLinear",thumbnail:"thumbnails/linear_bump.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 3)",inputAngle:Math.PI/2}},{name:"Pinch",description:"Distorts an image by pinching it at a point",CIFilterName:"CIPinchDistortion",thumbnail:"thumbnails/pinch.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)"}},{name:"Torus Lens",description:"Distorts a portion on an image around a torus-shaped lens",CIFilterName:"CITorusLensDistortion",thumbnail:"thumbnails/torus_lens.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputWidth:"(imgSize's width / 10)"}},{name:"Twirl",description:"Rotates pixels around a point to create a twirl effect",CIFilterName:"CITwirlDistortion",thumbnail:"thumbnails/twirl.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputAngle:"(imgSize's width / 100) * "+Math.PI}},{name:"Vortex",description:"Rotates pixels around a point to create a vortex effect",CIFilterName:"CIVortexDistortion",thumbnail:"thumbnails/vortex.webp",category:i.distortion,presets:{inputCenter:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & "]")`,inputRadius:"(imgSize's width / 2)",inputAngle:"(imgSize's width / 10) * "+Math.PI}}],le=[{name:"Sharpen Luminance",description:"Increases detailed by sharpening based on luminance",CIFilterName:"CISharpenLuminance",thumbnail:"thumbnails/sharpen_luminance.webp",category:i.sharpen},{name:"Unsharp Mask",description:"Sharpens images by increasing contrast along edges",CIFilterName:"CIUnsharpMask",thumbnail:"thumbnails/unsharp_mask.webp",category:i.sharpen}],ue=[{name:"Bloom",description:"Softens edges and adds a glow",CIFilterName:"CIBloom",thumbnail:"thumbnails/bloom.webp",category:i.stylize},{name:"Comic",description:"Makes images look like comic book drawings",CIFilterName:"CIComicEffect",thumbnail:"thumbnails/comic.webp",category:i.stylize},{name:"Crystallize",description:"Creates polygon-shaped color blocks by aggregating pixel values",CIFilterName:"CICrystallize",thumbnail:"thumbnails/crystallize.webp",category:i.stylize},{name:"Depth Of Field",description:"Simulates tilt-shift",CIFilterName:"CIDepthOfField",thumbnail:"thumbnails/depth_of_field.webp",category:i.stylize},{name:"Edges",description:"Detects edges and highlights them colorfully, blackening other areas",CIFilterName:"CIEdges",thumbnail:"thumbnails/edges.webp",category:i.stylize},{name:"Edge Work",description:"White woodblock cutout effect",CIFilterName:"CIEdgeWork",thumbnail:"thumbnails/edge_work.webp",category:i.stylize},{name:"Gabor Gradients",description:"Applies a 5x5 Gabor filter to an image",CIFilterName:"CIGaborGradients",thumbnail:"thumbnails/gabor_gradients.webp",category:i.stylize},{name:"Gloom",description:"Dulls highlights",CIFilterName:"CIGloom",thumbnail:"thumbnails/gloom.webp",category:i.stylize},{name:"Height Field From Mask",description:"Generates a 3D height field from a grayscale mask",CIFilterName:"CIHeightFieldFromMask",thumbnail:"thumbnails/height_field_from_mask.webp",category:i.stylize},{name:"Hexagonal Pixellate",description:"Pixellates images using hexagons",CIFilterName:"CIHexagonalPixellate",thumbnail:"thumbnails/hexagonal_pixellate.webp",category:i.stylize},{name:"Line Overlay",description:"Black woodblock cutout effect",CIFilterName:"CILineOverlay",thumbnail:"thumbnails/line_overlay.webp",category:i.stylize},{name:"Pixellate",description:"Pixellates images with large square pixels",CIFilterName:"CIPixellate",thumbnail:"thumbnails/pixellate.webp",category:i.stylize},{name:"Pointillize",description:"Pixellates images with dots",CIFilterName:"CIPointillize",thumbnail:"thumbnails/pointillize.webp",category:i.stylize},{name:"Spotlight",description:"Adds a directional spotlight effect",CIFilterName:"CISpotLight",thumbnail:"thumbnails/spotlight.webp",category:i.stylize,presets:{inputLightPointsAt:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & " 0]")`,inputLightPosition:`(current application's CIVector's vectorWithString:"[" & imgSize's width / 2 & " " & imgSize's height / 2 & " 1000]")`,inputBrightness:5,inputConcentration:.1}}],de=[{name:"Eightfold Reflected Tile",description:"Tiles an image by applyng an 8-way reflection",CIFilterName:"CIEightfoldReflectedTile",thumbnail:"thumbnails/eightfold_reflected_tile.webp",category:i.tile},{name:"Fourfold Reflected Tile",description:"Tiles an image by applying a 4-way reflection",CIFilterName:"CIFourfoldReflectedTile",thumbnail:"thumbnails/fourfold_reflected_tile.webp",category:i.tile},{name:"Fourfold Rotated Tile",description:"Tiles an image by rotating it at increments of 90 degrees",CIFilterName:"CIFourfoldRotatedTile",thumbnail:"thumbnails/fourfold_rotated_tile.webp",category:i.tile},{name:"Fourfold Translated Tile",description:"Tiles an image by applying a 4 translation operations",CIFilterName:"CIFourfoldTranslatedTile",thumbnail:"thumbnails/fourfold_translated_tile.webp",category:i.tile},{name:"Glide Reflected Tile",description:"Tiles an image by translating and smearing it",CIFilterName:"CIGlideReflectedTile",thumbnail:"thumbnails/glide_reflected_tile.webp",category:i.tile},{name:"Kaleidoscope",description:"Creates a kaleidoscopic image by applying 12-way symmetry",CIFilterName:"CIKaleidoscope",thumbnail:"thumbnails/kaleidoscope.webp",category:i.tile},{name:"Op Tile",description:"Segments and re-assembles images to mimic op art",CIFilterName:"CIOpTile",thumbnail:"thumbnails/op_tile.webp",category:i.tile},{name:"Parallelogram Tile",description:"Tiles an image after reflecting it in a parallelogram",CIFilterName:"CIParallelogramTile",thumbnail:"thumbnails/parallelogram_tile.webp",category:i.tile},{name:"Perspective Tile",description:"Applies a perspective transformation to an image and tiles the result",CIFilterName:"CIPerspectiveTile",thumbnail:"thumbnails/perspective_tile.webp",category:i.tile},{name:"Sixfold Reflected Tile",description:"Tiles an image by applying a 6-way reflection",CIFilterName:"CISixfoldReflectedTile",thumbnail:"thumbnails/sixfold_reflected_tile.webp",category:i.tile},{name:"Sixfold Rotated Tile",description:"Tiles an image by rotating it at increments of 60 degrees",CIFilterName:"CISixfoldRotatedTile",thumbnail:"thumbnails/sixfold_rotated_tile.webp",category:i.tile},{name:"Triangle Kaleidoscope",description:"Maps a triangular portion of an image to a kaleidoscopically tiled pattern",CIFilterName:"CITriangleKaleidoscope",thumbnail:"thumbnails/triangle_kaleidoscope.webp",category:i.tile},{name:"Triangle Tile",description:"Tiles a triangular portion of an image",CIFilterName:"CITriangleTile",thumbnail:"thumbnails/triangle_tile.webp",category:i.tile},{name:"Twelvefold Reflected Tile",description:"Tiles an image by applying a 12-way reflection",CIFilterName:"CITwelvefoldReflectedTile",thumbnail:"thumbnails/twelvefold_reflected_tile.webp",category:i.tile}];var v=S(require("fs")),F=S(require("os")),f=S(require("path")),d=require("@raycast/api");var O=require("@raycast/api");var be=async()=>m(`use framework "AppKit"
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
      
      return filePaths`),ye=async t=>{let e=Array.isArray(t)?t:[t];await m(`use framework "Foundation"
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
      end if`)};var x=S(require("path"));var U=require("child_process");function I(t,e){let r=e?.command,a=e?.language,s=[...e?.leadingArgs?.map(l=>l.toString())||[]],o=e?.trailingArgs||[];!r&&(a===void 0||a==="AppleScript"||a==="JXA")&&(r="/usr/bin/osascript",s.push("-l",a==="JXA"?"JavaScript":"AppleScript",...t.startsWith("/")?[]:["-e"],t,...o.map(l=>l.toString())));let n=process.env;if(e?.command&&(n.PATH=`${n.PATH}:${(0,U.execSync)(`$(/bin/bash -lc 'echo $SHELL') -lc 'echo "$PATH"'`).toString()}`,r=e.command,s.push(t,...o.map(l=>l.toString()))),!r)throw new Error("No command specified.");let c="",p=l=>{console.log(l)},u=(0,U.spawn)(r,s,{env:n});return e?.logDebugMessages&&console.log(`Running shell command "${r} ${s.join(" ")}"`),u.stdout?.on("data",l=>{c+=l.toString(),e?.logIntermediateOutput&&console.log(`Data from script: ${c}`)}),u.stderr?.on("data",l=>{e?.stderrCallback&&e.stderrCallback(l.toString()),e?.logErrors&&console.error(l.toString())}),u.stdin.on("error",l=>{e?.logErrors&&console.error(`Error writing to stdin: ${l}`)}),p=async l=>{l?.length>0&&(u.stdin.cork(),u.stdin.write(`${l}\r
`),process.nextTick(()=>u.stdin.uncork()),e?.logSentMessages&&console.log(`Sent message: ${l}`))},{data:(async()=>new Promise((l,A)=>{let L=e?.timeout?setTimeout(()=>{try{u.kill()}catch($){e?.logErrors&&console.error(`Error killing process: ${$}`)}return e?.logErrors&&console.error("Script timed out"),u.stdin.end(),u.kill(),A("Script timed out")},e?.timeout):void 0;u.on("close",$=>{if($!==0)return e?.logErrors&&console.error(`Script exited with code ${$}`),u.stdin.end(),u.kill(),A(`Script exited with code ${$}`);clearTimeout(L);let E;try{E=JSON.parse(c)}catch{E=c.trim()}return e?.logFinalOutput&&console.log(`Script output: ${E}`),l(E)})}))(),sendMessage:p}}var C=require("@raycast/api");function y(t){return t.split(", /").map((e,r)=>r===0?e.trim():`/${e.trim()}`)}async function Fe(){let t=x.default.join(C.environment.assetsPath,"scripts","finder.scpt"),e=await I(t,{language:"AppleScript",stderrCallback:r=>b("Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:y(e)}async function we(){let t=x.default.join(C.environment.assetsPath,"scripts","houdahSpot.scpt"),e=await I(t,{language:"AppleScript",stderrCallback:r=>b("HoudahSpot Selection Error",new Error(r))}).data;return Array.isArray(e)?e:y(e)}async function $e(){let t=x.default.join(C.environment.assetsPath,"scripts","neofinder.scpt"),e=await I(t,{language:"AppleScript",stderrCallback:r=>b("NeoFinder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:y(e)}async function Se(){let t=x.default.join(C.environment.assetsPath,"scripts","pathfinder.scpt"),e=await I(t,{language:"JXA",stderrCallback:r=>b("Path Finder Selection Error",new Error(r))}).data;return Array.isArray(e)?e:y(e)}async function ke(){let t=x.default.join(C.environment.assetsPath,"scripts","qspace.scpt"),e=await I(t,{language:"JXA",stderrCallback:r=>b("QSpace Pro Selection Error",new Error(r))}).data;return Array.isArray(e)?e:y(e)}async function Ie(){let t=x.default.join(C.environment.assetsPath,"scripts","forklift-beta.scpt"),e=await I(t,{language:"JXA",stderrCallback:r=>b("ForkLift Selection Error",new Error(r))}).data;return Array.isArray(e)?e:y(e)}var z=async()=>{let e=(await d.LocalStorage.getItem("itemsToRemove")??"").toString().split(`
`).filter(Boolean);for(let r of e)v.existsSync(r)&&await v.promises.rm(r,{recursive:!0});await d.LocalStorage.removeItem("itemsToRemove")},J=async()=>{let t=[],r=(0,d.getPreferenceValues)().inputMethod,a=!1;if(r=="Clipboard")try{let n=y(await be());if(await d.LocalStorage.setItem("itemsToRemove",n.join(`
`)),n.filter(c=>c.trim().length>0).length>0)return n}catch(n){console.error(`Couldn't get images from clipboard: ${n}`),a=!0}let s=r;try{s=(await(0,d.getFrontmostApplication)()).name}catch(n){console.error(`Couldn't get frontmost application: ${n}`)}try{(r=="Path Finder"||s=="Path Finder")&&(t=await Se())}catch(n){console.error(`Couldn't get images from Path Finder: ${n}`),a=!0}try{(r=="NeoFinder"||s=="NeoFinder")&&(t=await $e())}catch(n){console.error(`Couldn't get images from NeoFinder: ${n}`),a=!0}try{(r=="HoudahSpot"||s=="HoudahSpot")&&(t=await we())}catch(n){console.error(`Couldn't get images from HoudahSpot: ${n}`),a=!0}try{(r=="QSpace"||s=="QSpace Pro"||s=="QSpace")&&(t=await ke())}catch(n){console.error(`Couldn't get images from ${s}: ${n}`),a=!0}try{(r=="ForkLift"||s=="ForkLift")&&(t=await Ie())}catch(n){console.error(`Couldn't get images from ForkLift: ${n}`),a=!0}if(t.length>0)return t.filter((n,c)=>t.indexOf(n)===c);let o=await Fe();return s=="Finder"||r=="Finder"||a?t=o:o.forEach(n=>{n.split("/").at(-2)=="Desktop"&&!t.includes(n)&&t.push(n)}),t.filter((n,c)=>t.indexOf(n)===c)},Ce=async t=>{let e="Finder";try{e=(await(0,d.getFrontmostApplication)()).name}catch(a){console.error(`Couldn't get frontmost application: : ${a}`)}let r=(0,d.getPreferenceValues)();r.imageResultHandling=="copyToClipboard"?(await ye(t),xe(t)):r.imageResultHandling=="openInPreview"?(await Xe(t),xe(t)):r.inputMethod=="NeoFinder"||e=="NeoFinder"?await(0,d.showInFinder)(t[0]):(r.inputMethod=="HoudahSpot"||e=="HoudahSpot")&&await(0,d.showInFinder)(t[0])};var Xe=async t=>{let e=Array.isArray(t)?t:[t],r=e.some(a=>f.default.extname(a)==".svg");await m(`use framework "Foundation"
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
          end tell`}`)},xe=t=>{let e=Array.isArray(t)?t:[t];for(let r of e)v.unlinkSync(r)},qe=async()=>m(`use framework "Foundation"
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
    end if`),Ze=async t=>{let e="Finder";try{e=await qe()}catch(r){console.error(`Couldn't get frontmost application: ${r}`)}try{if(e=="Path Finder")return m(`tell application "Path Finder"
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
      end tell`)}catch(r){console.error(`Couldn't get current directory of Path Finder: ${r}`)}return m(`tell application "Finder"
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
  end tell`)},ve=async(t,e=!1,r=void 0)=>{let a=(0,d.getPreferenceValues)(),s=await Ze(t[0]);return t.map(o=>{let n=o;if(a.imageResultHandling=="saveToDownloads"?n=f.default.join(F.homedir(),"Downloads",f.default.basename(n)):a.imageResultHandling=="saveToDesktop"?n=f.default.join(F.homedir(),"Desktop",f.default.basename(n)):(a.imageResultHandling=="saveInContainingFolder"||a.imageResultHandling=="replaceOriginal")&&(a.inputMethod=="Clipboard"||e)?n=f.default.join(s,f.default.basename(n)):(a.imageResultHandling=="copyToClipboard"||a.imageResultHandling=="openInPreview")&&(n=f.default.join(F.tmpdir(),f.default.basename(n))),n=r?n.replace(f.default.extname(n),`.${r}`):n,a.imageResultHandling!="replaceOriginal"&&F.tmpdir()!=f.default.dirname(n)){let c=2;for(;v.existsSync(n);)n=f.default.join(f.default.dirname(n),f.default.basename(n,f.default.extname(n))+`-${c}${f.default.extname(n)}`),c++}return n})},b=async(t,e,r,a)=>{console.error(e),r?(r.title=t,r.message=a??e.message,r.style=d.Toast.Style.Failure,r.primaryAction={title:"Copy Error",onAction:async()=>{await d.Clipboard.copy(e.message)}}):r=await(0,d.showToast)({title:t,message:a??e.message,style:d.Toast.Style.Failure,primaryAction:{title:"Copy Error",onAction:async()=>{await d.Clipboard.copy(e.message)}}})};var Pe=t=>{let e=F.homedir();if(t.startsWith("~"))return t.replace(/^~(?=$|\/|\\)/,e);let r=/(\/Users\/.*?)\/.*/,a=t.match(r);return a?t.replace(a[1],e):t};async function X(t,e){let r=[],a=t.map(s=>Pe(s));for(let s of a){let o=(await ve([s],!1,s.endsWith(".pdf")?"pdf":"png"))[0];await ge(s,o,e),r.push(o)}return await Ce(r),r}var P=require("@raycast/api");async function q(t){if(t.selectedImages.length===0||t.selectedImages.length===1&&t.selectedImages[0]===""){await(0,P.showToast)({title:"No images selected",message:"No images found in your selection. Make sure the image(s) still exist on the disk. Verify that Raycast has permission to automate Finder and/or third-party file managers under System Settings->Privacy & Security->Automation->Raycast. If using a third-party file manager, make sure the app's index is up to date.",style:P.Toast.Style.Failure});return}let e=await(0,P.showToast)({title:t.inProgressMessage,style:P.Toast.Style.Animated}),r=`image${t.selectedImages.length===1?"":"s"}`;try{let a=await t.operation();return e.title=`${t.successMessage} ${t.selectedImages.length.toString()} ${r}`,e.style=P.Toast.Style.Success,a}catch(a){await b(`${t.failureMessage} ${t.selectedImages.length.toString()} ${r}`,a,e)}finally{await z()}}var T=require("react/jsx-runtime");function Qe({filter:t,content:e}){return(0,T.jsx)(g.Grid.Item,{title:t.name,id:t.CIFilterName,accessory:{icon:{source:g.Icon.Info},tooltip:t.description},subtitle:t.category,content:e||{source:t.thumbnail},actions:(0,T.jsx)(g.ActionPanel,{children:(0,T.jsx)(g.Action,{title:`Apply ${t.name} Filter`,onAction:async()=>{let r=await J();await q({operation:()=>X(r,t),selectedImages:r,inProgressMessage:"Filtering in progress...",successMessage:"Applied filter to",failureMessage:"Failed to apply filter to"})}})})},t.CIFilterName)}function Ee(){let[t,e]=(0,R.useState)(),[r,a]=(0,R.useState)(""),s=(0,R.useRef)([]),o=(0,g.getPreferenceValues)();return(0,T.jsx)(g.Grid,{searchBarPlaceholder:"Search filters...",onSelectionChange:async n=>{!o.showPreviews||!n||(s.current.push(n),setTimeout(async()=>{if(s.current.at(-1)==n){let c=K().find(p=>p.CIFilterName===n);if(c&&c.name!==t?.name){a(""),e(c);let p=(await J()).at(0);if(p&&p.trim()!==""&&(0,Ae.statSync)(p).size<8e5){let u=await me(c,p);a(u)}await z()}}s.current=s.current.filter(c=>c!==n)},500))},children:K().map(n=>(0,T.jsx)(Qe,{filter:n,content:t?.name===n.name?r:void 0},n.CIFilterName))})}
