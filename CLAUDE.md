# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Nice Sprites is a single-page pixel-art sprite editor built on Next.js 11 (pages router), React 17, TypeScript, and Tailwind CSS 2 (JIT mode). You paint on a 16×16 or 32×32 grid, and the result can be downloaded or copied as an SVG.

## Commands

Yarn is the package manager (`yarn.lock` is committed).

- `yarn dev`: start the dev server at http://localhost:3000
- `yarn build`: production build. This also runs the TypeScript type-check and ESLint.
- `yarn lint`: run ESLint (`next/core-web-vitals` config)
- `yarn tsc --noEmit`: type-check only

There is no test suite.

## Architecture

The whole app lives in `pages/index.tsx`, which composes the components in `components/`. `pages/api/hello.ts` is leftover boilerplate from create-next-app.

**State is lifted into `pages/index.tsx`.** It holds `currentColor` (a hex string, where `''` means eraser mode), `bitCount` (16 or 32), and `currentPixels`, then passes them down as props. There is no context or store.

**Painted pixels are stored in two places, and both must stay in sync:**
1. Each `Pixel` (`components/Pixel.tsx`) keeps its own displayed `color` in local state. It handles click (toggle) and drag painting through `onPointerEnter` with `e.buttons > 0`.
2. `currentPixels` in the page is an array of `{ key: "x-y", color, x, y }` objects. `SpriteGrid` updates it through the `addPixel` and `removePixel` callbacks it passes to each `Pixel`. The props are typed `string[]`, but the elements are actually these objects, so the code relies on `any` casts.

`currentPixels` is the source of truth for export (`GridActions` builds the SVG from it) and for the palette. The on-screen colors come from each `Pixel`'s local state. To clear the grid, `SpriteGrid` keeps an array of refs to the `Pixel`s and calls the `handleClear()` method each one exposes through `useImperativeHandle`. It then empties `currentPixels`.

**Components:**
- `SpriteGrid`: draws the dashed grid lines as two overlaid CSS grids, then the `bitCount × bitCount` grid of `Pixel`s. It shows `GridActions` once any pixel is painted.
- `GridActions`: builds the SVG by hand as a string, with one `<rect>` per pixel at 10px per cell. Downloads get a random file name from `unique-names-generator`, and copy uses `document.execCommand('copy')`. Toasts come from `react-toastify`, whose `ToastContainer` is mounted here.
- `Pallet` (spelled this way throughout): derives unique colors from `currentPixels` in a `useEffect` and only ever adds to its own `colorArr` state. Colors are removed only by its own remove and clear buttons.
- `BitActions`: the 16/32 grid-size toggle.

The color picker is `react-color`'s `SketchPicker`, wrapped in `react-click-away-listener`. Framer Motion adds the enter animations.

## Conventions

- Styling uses inline Tailwind utility classes, including arbitrary values such as `max-w-[350px]`. Active and inactive states are usually written as a ternary that switches between two full class strings. `styles/Home.module.css` is unused boilerplate.
- Components are typed `FC<Props>`, with the `Props` interface declared in the same file.
