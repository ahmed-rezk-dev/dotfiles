# Mouseless Navigation Ideas & Solutions

## Executive Summary

This document explores solutions for creating a system-wide keyboard-only navigation system for macOS,
similar to Homerow, Shortcat, or Vimac. I've analyzed existing tools and your Hammerspoon setup to
identify opportunities and gaps.

---

## Existing Solutions Comparison

| Tool | Approach | Price | Open Source | Platform |
|------|----------|-------|------------|----------|
| **Homerow** | Hints + fuzzy search labels | $49 one-time | ❌ | macOS |
| **Shortcat** | Hints with fuzzy search | Free (discontinued) | ❌ | macOS |
| **Vimac** | Hints + Grid | Free | ✅ | macOS (unmaintained) |
| **Mouseless** | Grid-based pointer control | Paid | ❌ | macOS |
| **Wooshy** | Search-to-click | Paid | ❌ | macOS |
| **Neru** | Hints + Grid + Recursive Grid + Scroll | Free | ✅ | macOS (Go) |
| **FlashJump** | Keyboard-first navigation | Free | ❌ | macOS 15.2+ |
| **Scrolla** | Vim-style scroll | Free | ❌ | macOS |

---

## Navigation Modes Explained

### 1. Hints Mode (Shortcat/Homerow Style)
```
┌─────────────────────────────────────┐
│  [A] Button    [B] Link    [C] ☐   │
│                                     │
│  [D] Input     [E] Button   [F] ⋯  │
└─────────────────────────────────────┘
Press letter to click that element
```
- Labels appear on every clickable element
- Type the label to "click" it
- Fuzzy search narrows options as you type

**Pros:** Fast for known interfaces, intuitive
**Cons:** Requires accessibility support, labels can be cluttered

### 2. Grid Mode (Vimac/Neru Style)
```
┌────┬────┬────┬────┐
│    │    │    │    │
│ 1  │ 2  │ 3  │ 4  │
├────┼────┼────┼────┤
│    │    │    │    │
│ 5  │ 6  │ 7  │ 8  │
├────┼────┼────┼────┤
│    │    │    │    │
│ 9  │ 10 │ 11 │ 12 │
└────┴────┴────┴────┘
Press 7 to jump to cell 7
```
- Screen divided into numbered grid
- Press coordinates to move cursor
- Recursive grid subdivides on each press

**Pros:** Works everywhere (no accessibility needed), predictable
**Cons:** Less precise, many keystrokes for small targets

### 3. Recursive Grid (Neru Recommended)
```
Initial:          After pressing 3:
┌────┬────┐       ┌────┬────┐
│ 1  │ 2  │       │    │    │
├────┼────┤   →   │ 1  │ 2  │
│ 3  │ 4  │       ├────┼────┤
└────┴────┘       │ 3  │ 4  │
                   └────┴────┘
```
- First press divides into quadrants
- Continue pressing to subdivide
- `u` to go back up a level
- Works like binary search to find target

**Pros:** Precise, works universally, no setup per-app
**Cons:** Takes practice to learn the rhythm

### 4. Element Tree Navigation (Shortcat/Vimium)
```
Current: [Submit Button]
       ↓
   ┌───────────┐
   │  Form     │ ← Parent (press ↑)
   │  ├─ Name  │
   │  ├─ Email │ ← Sibling (press ←/→)
   │  └─ [Submit] ← Current
   └───────────┘
       ↓
   [Button] ← Child (press ↓)
```
- Navigate the accessibility tree
- Arrow keys move between elements
- Enter/Space to activate

**Pros:** Semantic navigation, respects UI structure
**Cons:** Slow for distant targets, requires good AX support

### 5. Vim-Style Scrolling (Scrolla/Neru)
```
j = scroll down    k = scroll up
h = scroll left    l = scroll right
gg = top           G = bottom
d = half-page down u = half-page up
```
- Supplement to other modes for scrolling
- Natural for Vim users

---

## Your Existing Foundation

Your Hammerspoon setup already has strong building blocks:

### Already Implemented ✅

| Feature | Location | Status |
|---------|---------|--------|
| **Element Inspector** | `config/ui_callouts.lua` | Canvas highlighting + arrow key nav |
| **VI Text Input** | `bindings/vi-input.lua` | Modal hjkl navigation |
| **VimMode Spoon** | `Spoons/VimMode.spoon/` | Full Vim for text editing |
| **AX Observer** | `config/observer.lua` | Event watching |
| **Window Hints** | `ext/ext/window.lua` | Window cycling |
| **Click Simulation** | Various | `performAction("AXPress")` |
| **Menu Search** | `config/uielements.lua` | Ctrl+Cmd+Alt+M |

### Key Files to Leverage

```
hammerspoon/config/ax/
├── helpers.lua      # Core: :windows(), :buttons(), :textFields(), :groups(), etc.
├── caching.lua      # CachedElement for performance
axuielemMT methods available:
├── :windows()       # Get all windows
├── :buttons()       # Get all buttons
├── :textFields()    # Get all text fields
├── :performAction() # Click elements
├── :path()          # Element hierarchy
└── :childrenWithRole() # Filter by role
```

---

## Proposed Solutions

### Option A: Build on Existing (Recommended)

**Approach:** Extend your current `ui_callouts.lua` element inspector

**What's needed:**
1. **Recursive Grid Overlay** - Canvas-based grid with subdivision
2. **Hints Mode** - Use `ax/helpers.lua` to enumerate elements, show labels
3. **Hotkey Integration** - Bind to your Hyper key (already configured)
4. **Sticky Modifiers** - Tap Shift/Cmd once to apply to next click

**Implementation sketch:**
```lua
-- config/mouseless.lua
local Mouseless = {}

function Mouseless:start()
    -- Start recursive grid mode
    self.gridOverlay = self:createGridOverlay()
    self.gridOverlay:show()
end

function Mouseless:createGridOverlay()
    -- Use hs.canvas for grid visualization
    -- Handle u/j/k/l for navigation
    -- Use hs.eventtap for mouse simulation
end

function Mouseless:hintsMode()
    -- Enumerate all clickable elements using ax/helpers
    -- Show labels overlay
    -- Map keys to element:performAction("AXPress")
end
```

### Option B: Use Existing Open Source (Neru)

**Recommendation:** Install Neru (https://github.com/y3owk1n/neru)

```bash
brew tap y3owk1n/tap
brew install --cask y3owk1n/tap/neru
```

**Why Neru over others:**
- ✅ Open source (MIT)
- ✅ Recursive Grid mode (recommended)
- ✅ Free
- ✅ Active development (daily commits)
- ✅ TOML config (version control friendly)
- ✅ CLI for scripting

**Default hotkeys:**
- `Cmd+Shift+C` - Recursive Grid ⭐
- `Cmd+Shift+G` - Grid
- `Cmd+Shift+Space` - Hints
- `Shift+L` - Left click
- `Shift+R` - Right click

### Option C: Hybrid Approach

Use Neru for grid-based navigation + extend Hammerspoon for:
- Custom actions (e.g., "focus browser, then click first link")
- AI-enhanced intent prediction
- App-specific macros
- Deep system integration

---

## AI-Enhanced Features (Future)

### Intent Prediction
```
Traditional: User types "gm" → Google Maps opens
AI-Enhanced: User thinks "check traffic" → System predicts → Opens Maps with commute
```

**Implementation ideas:**
1. **Context-aware suggestions** - Based on time/location/app history
2. **Fuzzy element matching** - "click the blue button near the top"
3. **Natural language commands** - "open the settings and click the first option"
4. **Predictive scrolling** - AI guesses where user wants to scroll

### Apple Intelligence Integration
With macOS 26 (Tahoe), Apple Intents can be used for:
- System-wide shortcuts
- App actions via Siri/Shortcuts
- Cross-app workflows

---

## Implementation Roadmap

### Phase 1: Quick Win (1-2 hours)
```lua
-- Add to hammerspoon/config/
-- Simple grid mode overlay
local GridNav = {
    trigger = {"cmd", "alt", "ctrl"},  -- Already your MEH?
    divisions = 4,  -- 4x4 grid
}

function GridNav:activate()
    local mousePos = hs.mouse.absolutePosition()
    local screen = hs.mouse.currentScreen()
    local frame = screen:fullFrame()
    
    -- Calculate which cell
    local cellW = frame.w / self.divisions
    local cellH = frame.h / self.divisions
    local col = math.floor((mousePos.x - frame.x) / cellW)
    local row = math.floor((mousePos.y - frame.y) / cellH)
    
    -- Show overlay
    self:showOverlay()
    
    -- Listen for 0-9, u (undo), enter (confirm)
end
```

### Phase 2: Element Hints (1-2 days)
```lua
-- Enumerate focusable elements using ax/helpers
-- Show letter overlays
-- Map keys to clicks
local function getClickableElements()
    local systemWide = hs.axuielement.systemWideElement()
    local focusedApp = hs.axuielement.systemWideElement():
        attributeValue("AXFocusedApplication")
    -- ... traverse hierarchy
end
```

### Phase 3: Recursive Grid (1 week)
- Implement subdivision algorithm
- Add undo (u key)
- Add visual feedback
- Smooth transitions

### Phase 4: Polish (ongoing)
- Sticky modifiers
- Drag support
- App exclusions
- Configuration UI

---

## Integration with Your Setup

Your current config already has:
- **Hyper key** (Settings.keys.HYPER) - Perfect trigger
- **Bindings system** - Can integrate mouseless modes
- **Canvas** - For overlays
- **AX helpers** - For element enumeration

**Suggested integration:**
```lua
-- In init.lua, add:
local MouselessGrid = require("config/mouseless/grid")
local MouselessHints = require("config/mouseless/hints")

-- Trigger on Hyper+G (grid) or Hyper+H (hints)
hs.hotkey.bind(Settings.keys.HYPER, "g", function()
    MouselessGrid:toggle()
end)

hs.hotkey.bind(Settings.keys.HYPER, "h", function()
    MouselessHints:toggle()
end)
```

---

## Technical Considerations

### Accessibility Permissions
Any solution requires:
- **System Settings → Privacy & Security → Accessibility**
- Grant access to Hammerspoon (or Neru)

### Performance
- Cache accessibility trees
- Debounce rapid keypresses
- Use `hs.canvas` for efficient overlays

### Multi-monitor
- Neru handles this well
- Hammerspoon: detect which screen mouse is on

### App Exclusions
- Don't trigger in games, video editors, etc.
- Check `hs.application.frontmost()` bundle ID

---

## Recommendations

1. **Start with Neru** - It's free, proven, and works today
2. **Extend with Hammerspoon** - Add custom macros, AI features, deep integration
3. **Build custom** - If you want full control and learning experience

**My recommendation:** Try Neru first, then extend with Hammerspoon for your specific needs.

---

## Resources

- Neru: https://github.com/y3owk1n/neru
- Homerow: https://homerow.app/
- Hammerspoon AX docs: https://www.hammerspoon.org/docs/hs.axuielement.html
- Apple Accessibility: https://developer.apple.com/documentation/applicationservices/axuielement
