import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises"
import { basename, dirname, extname, join, resolve } from "node:path"
import { Plugin } from "@opencode/plugin"
import { getApiKey } from "./env"

// Function to detect if we're in test mode
function isTestMode(): boolean {
  // Only enable test mode when explicitly set
  return process.env.GEMINI_TEST_MODE === "true"
}

// Function to get Gemini API key with automatic .env loading
async function getGeminiApiKey(): Promise<string> {
  if (isTestMode()) {
    return "test-api-key"
  }
  return getApiKey("GEMINI_API_KEY")
}

interface ImageConfig {
  outputDir?: string
  useTimestamp?: boolean
  preserveOriginal?: boolean
  customName?: string
}

const MIME_BY_EXTENSION: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".heic": "image/heic",
  ".heif": "image/heif",
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function parseImageInput(input: string) {
  // Accepts file path ("./img.png") or data URL ("data:image/png;base64,...")
  if (input.startsWith("data:")) {
    const base64 = input.split(",")[1]
    const mime = input.substring(5, input.indexOf(";"))
    return { mime, base64 }
  }
  // Treat as file path
  const arr = await readFile(input)
  const base64 = arr.toString("base64")
  // Best-effort mime from the file extension, matching Bun.file().type behavior
  const mime = MIME_BY_EXTENSION[extname(input).toLowerCase()] || "image/png"
  return { mime, base64 }
}

async function ensureDirectoryExists(dirPath: string) {
  try {
    await mkdir(dirPath, { recursive: true })
  } catch (error) {
    // Directory might already exist, that's fine
  }
}

function getDateBasedPath(baseDir?: string): string {
  // Default to assets/images at repo root
  if (!baseDir) {
    baseDir = resolve(process.cwd(), "../../assets/images")
  }
  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD format
  return join(baseDir, today)
}

async function getUniqueFilename(
  directory: string,
  baseName: string,
  extension: string,
  isEdit: boolean = false,
): Promise<string> {
  await ensureDirectoryExists(directory)

  if (!isEdit) {
    // For generations, use timestamp if file exists
    const baseFilename = join(directory, `${baseName}${extension}`)
    const exists = await fileExists(baseFilename)

    if (!exists) {
      return baseFilename
    }

    // Add timestamp if file exists
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5) // Remove milliseconds and Z
    return join(directory, `${baseName}_${timestamp}${extension}`)
  }

  // For edits, use incremental numbering
  let counter = 1
  let filename: string

  do {
    const editSuffix = `_edit_${counter.toString().padStart(3, "0")}`
    filename = join(directory, `${baseName}${editSuffix}${extension}`)
    counter++
  } while (await fileExists(filename))

  return filename
}

export async function generateImage(prompt: string, config: ImageConfig = {}): Promise<string> {
  const apiKey = await getGeminiApiKey()

  // Test mode - return mock response without API call
  if (isTestMode()) {
    const baseDir = config.outputDir || getDateBasedPath()
    const generationsDir = join(baseDir, "generations")
    let baseName = config.customName || "generated"
    if (baseName.endsWith(".png") || baseName.endsWith(".jpg") || baseName.endsWith(".jpeg")) {
      baseName = baseName.substring(0, baseName.lastIndexOf("."))
    }
    const outputPath = await getUniqueFilename(generationsDir, baseName, ".png", false)

    return `[TEST MODE] Would generate image: ${outputPath} for prompt: "${prompt.substring(0, 50)}..."`
  }

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  }

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(body),
    },
  )

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`API error (${res.status}): ${errorText}`)
  }

  const json: any = await res.json()

  // Look for image data in the response
  const candidates = json?.candidates
  if (!candidates || candidates.length === 0) {
    throw new Error("No candidates in response")
  }

  const parts = candidates[0]?.content?.parts
  if (!parts || parts.length === 0) {
    throw new Error("No parts in response")
  }

  let b64 = null
  for (const part of parts) {
    if (part.inlineData?.data) {
      b64 = part.inlineData.data
      break
    }
  }

  if (!b64) {
    throw new Error("No image data returned from Nano Banana model")
  }

  // Determine output path
  const baseDir = config.outputDir || getDateBasedPath()
  const generationsDir = join(baseDir, "generations")

  // Generate filename (remove extension if already present)
  let baseName = config.customName || "generated"
  if (baseName.endsWith(".png") || baseName.endsWith(".jpg") || baseName.endsWith(".jpeg")) {
    baseName = baseName.substring(0, baseName.lastIndexOf("."))
  }
  const extension = ".png"
  const outputPath = await getUniqueFilename(generationsDir, baseName, extension, false)

  console.log(`Saving generated image to: ${outputPath}`)
  await writeFile(outputPath, Buffer.from(b64, "base64"))

  const exists = await fileExists(outputPath)
  if (!exists) {
    throw new Error(`Failed to save file to ${outputPath}`)
  }

  const stats = await stat(outputPath)
  return `Generated image saved: ${outputPath} (${stats.size} bytes)`
}

export async function editImage(imagePath: string, prompt: string, config: ImageConfig = {}): Promise<string> {
  const apiKey = await getGeminiApiKey()

  // Test mode - return mock response without API call
  if (isTestMode()) {
    const baseDir = config.outputDir || getDateBasedPath()
    const editsDir = join(baseDir, "edits")
    const originalName = basename(imagePath, extname(imagePath))
    let baseName = config.customName || originalName
    if (baseName.endsWith(".png") || baseName.endsWith(".jpg") || baseName.endsWith(".jpeg")) {
      baseName = baseName.substring(0, baseName.lastIndexOf("."))
    }
    const outputPath = await getUniqueFilename(editsDir, baseName, ".png", true)

    return `[TEST MODE] Would edit image: ${imagePath} -> ${outputPath} with prompt: "${prompt.substring(0, 50)}..."`
  }

  // Parse the input image
  const { mime, base64 } = await parseImageInput(imagePath)

  const body = {
    contents: [
      {
        parts: [{ text: prompt }, { inlineData: { mimeType: mime, data: base64 } }],
      },
    ],
  }

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(body),
    },
  )

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`API error (${res.status}): ${errorText}`)
  }

  const json: any = await res.json()

  // Look for image data in the response
  const candidates = json?.candidates
  if (!candidates || candidates.length === 0) {
    throw new Error("No candidates in response")
  }

  const parts = candidates[0]?.content?.parts
  if (!parts || parts.length === 0) {
    throw new Error("No parts in response")
  }

  let b64 = null
  for (const part of parts) {
    if (part.inlineData?.data) {
      b64 = part.inlineData.data
      break
    }
  }

  if (!b64) {
    throw new Error("No image data returned from Nano Banana model")
  }

  // Determine output path
  const baseDir = config.outputDir || getDateBasedPath()
  const editsDir = join(baseDir, "edits")

  // Extract original filename without extension
  const originalName = basename(imagePath, extname(imagePath))
  let baseName = config.customName || originalName
  if (baseName.endsWith(".png") || baseName.endsWith(".jpg") || baseName.endsWith(".jpeg")) {
    baseName = baseName.substring(0, baseName.lastIndexOf("."))
  }
  const extension = ".png"

  const outputPath = await getUniqueFilename(editsDir, baseName, extension, true)

  console.log(`Saving edited image to: ${outputPath}`)
  await writeFile(outputPath, Buffer.from(b64, "base64"))

  const exists = await fileExists(outputPath)
  if (!exists) {
    throw new Error(`Failed to save file to ${outputPath}`)
  }

  const stats = await stat(outputPath)
  return `Edited image saved: ${outputPath} (${stats.size} bytes)`
}

export async function analyzeImage(imagePath: string, question: string): Promise<string> {
  const apiKey = await getGeminiApiKey()

  // Test mode - return mock response without API call
  if (isTestMode()) {
    return `[TEST MODE] Would analyze image: ${imagePath} with question: "${question.substring(0, 50)}..." - Mock analysis: This is a test image analysis response.`
  }

  const { mime, base64 } = await parseImageInput(imagePath)

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: question }, { inlineData: { mimeType: mime, data: base64 } }],
          },
        ],
      }),
    },
  )

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`API error (${res.status}): ${errorText}`)
  }

  const json: any = await res.json()
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error("No analysis returned")
  }

  return text
}

export default Plugin.define({
  id: "gemini",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      // Tool for generating images from text
      editor.add({
        name: "gemini_generate",
        description: "Generate an image using Gemini Nano Banana from text prompt",
        input: {
          type: "object",
          properties: {
            prompt: { type: "string", description: "Text description of the image to generate" },
            outputDir: {
              type: "string",
              description: "Custom output directory (default: ./generated-images/YYYY-MM-DD/)",
            },
            filename: { type: "string", description: "Custom filename (default: generated)" },
          },
          required: ["prompt"],
          additionalProperties: false,
        },
        async execute(input) {
          const args = input as { prompt: string; outputDir?: string; filename?: string }
          try {
            const config: ImageConfig = {
              outputDir: args.outputDir,
              customName: args.filename,
            }
            return { content: await generateImage(args.prompt, config) }
          } catch (error) {
            return { content: `Error: ${(error as Error).message}` }
          }
        },
      })

      // Tool for editing existing images
      editor.add({
        name: "gemini_edit",
        description: "Edit an existing image using Gemini Nano Banana",
        input: {
          type: "object",
          properties: {
            image: { type: "string", description: "File path or data URL of image to edit" },
            prompt: { type: "string", description: "Edit instruction" },
            outputDir: {
              type: "string",
              description: "Custom output directory (default: ./generated-images/YYYY-MM-DD/)",
            },
            filename: {
              type: "string",
              description: "Custom filename (default: original name with _edit_XXX)",
            },
          },
          required: ["image", "prompt"],
          additionalProperties: false,
        },
        async execute(input) {
          const args = input as {
            image: string
            prompt: string
            outputDir?: string
            filename?: string
          }
          try {
            const config: ImageConfig = {
              outputDir: args.outputDir,
              customName: args.filename,
            }
            return { content: await editImage(args.image, args.prompt, config) }
          } catch (error) {
            return { content: `Error: ${(error as Error).message}` }
          }
        },
      })

      // Tool for analyzing images
      editor.add({
        name: "gemini_analyze",
        description: "Analyze an image using Gemini (text analysis only)",
        input: {
          type: "object",
          properties: {
            image: { type: "string", description: "File path or data URL of image to analyze" },
            question: { type: "string", description: "What to analyze about the image" },
          },
          required: ["image", "question"],
          additionalProperties: false,
        },
        async execute(input) {
          const args = input as { image: string; question: string }
          try {
            return { content: await analyzeImage(args.image, args.question) }
          } catch (error) {
            return { content: `Error: ${(error as Error).message}` }
          }
        },
      })
    })
  },
})
