# Fix Chatbot to Match the New UI

## Problem
1. The rest of the portfolio was redesigned with new gradients, animations, and styling, but the **Chatbot** still uses its old plain look — hardcoded white text, basic bubbles, no animations. Replies work, but the chat window looks out of place next to the updated UI.
2. The build is also failing because the `build:dev` script is missing from `package.json` (it was removed during the UI edits).

## Changes

### 1. Restore the build script
- Add `"build:dev": "vite build"` back to `package.json` so the project builds again.

### 2. Restyle the chatbot to match the new design
- **Floating button:** gradient background matching the site's primary→accent theme, subtle pulse/glow animation, hover scale effect.
- **Chat window:** glassy card with the site's gradient border/glow treatment, rounded corners, smooth open/close animation.
- **Messages:** assistant replies render in theme-consistent styled bubbles; user messages use the gradient style with proper contrast.
- **Animations:** messages fade/slide in as they appear, typing indicator uses the new accent styling, tooltip matches the new design.
- **Replace hardcoded colors** (e.g. `text-white` on the tooltip) with theme tokens so dark/light mode works correctly.
- **Keep all existing functionality untouched:** per-visitor sessions, 15-question limit, 200-word limit, contact email button, message persistence, streaming replies.

## Technical details
- Edit only `src/components/Chatbot.tsx` (styling/JSX classes) and `package.json` (one script line).
- No changes to edge functions, database, or chat logic.
- Verify with a browser check that the chat opens, replies stream, and styling matches the new theme in both light and dark mode.
