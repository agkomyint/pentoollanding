export const guides=[
 {slug:"first-design",title:"Create your first design",eyebrow:"10 min",description:"Go from an empty document to an editable export."},
 {slug:"libraries",title:"Build a shared library",eyebrow:"15 min",description:"Turn layers and selections into reusable assets."},
 {slug:"github-packages",title:"Ship packages on GitHub",eyebrow:"20 min",description:"Publish many .penpkg files through Releases and a static registry."},
 {slug:"self-hosting",title:"Host a company registry",eyebrow:"25 min",description:"Run a simple, immutable package registry on your own infrastructure."},
] as const;
export const guideContent:Record<string,string>={
"first-design":`# Create your first design

This guide creates a file, adds editable content, opens the browser editor, and exports an SVG.

## 1. Start a document

\`\`\`sh
pentool new hello.pen --width 1200 --height 800
pentool rect hello.pen background 0 0 1200 800 --fill "#b8f34a"
pentool text hello.pen title "Open by design" 120 180
\`\`\`

## 2. Inspect and refine

\`\`\`sh
pentool tree hello.pen
pentool serve hello.pen
\`\`\`

Use the browser canvas for direct manipulation. The CLI and editor write the same document model.

## 3. Export

\`\`\`sh
pentool export hello.pen hello.svg
pentool export hello.pen hello@2x.png --scale 2
\`\`\`

Commit the \`.pen\` source alongside your code. Export formats can be rebuilt whenever you need them.
`,
"libraries":`# Build a shared library

Pentool assets are normal, editable \`.pen\` documents with a small manifest. A document, page, layer, object list, or rectangular selection can become a library item.

## Create assets

\`\`\`sh
pentool asset create design.pen assets/card.pen \\
  --id ui/card --name "Card" --layer card
pentool asset create design.pen assets/icons.pen \\
  --id icons/navigation --name "Navigation icons" --rect 20 20 400 240
\`\`\`

## Register the local library

\`\`\`sh
pentool library add ./assets --name project-assets
pentool library refresh project-assets
pentool explore card --category layout
pentool asset preview project-assets/ui/card --output card.png
\`\`\`

## Copy or instance

\`\`\`sh
pentool add poster.pen project-assets/ui/card --mode copy --at 100 80
pentool add poster.pen project-assets/ui/card --mode instance --at 400 80
\`\`\`

Instances keep materialized content, so documents still open and render when the library is offline. Updates are always previewed and explicitly accepted.
`,
"github-packages":`# Ship packages on GitHub

GitHub Releases is a good public distribution layer for a small or medium package catalog. Attach every immutable \`.penpkg\`, its signature, and a registry index to a release.

## Package and sign

\`\`\`sh
pentool package init ./open-ui --name open-design/ui
pentool package pack ./open-ui --output open-ui-0.1.0.penpkg
pentool package verify open-ui-0.1.0.penpkg
pentool package keygen ./publisher
pentool package sign open-ui-0.1.0.penpkg --key publisher.key
\`\`\`

Keep the private key outside Git. Commit the public key so consumers can verify publisher identity.

## Publish a release

Create a tag such as \`packages/open-ui/v0.1.0\`. Upload the package and signature as release assets. Publish your generated registry index through GitHub Pages or an object-storage CDN.

## Scale to many packages

Use one repository for the catalog and immutable release assets for blobs. A CI workflow should validate manifests, verify hashes, reject an existing name/version pair, regenerate the index, then publish. Teams install from a stable registry URL rather than hunting through release pages.
`,
"self-hosting":`# Host a company registry

A Pentool registry is static data. It does not require a special server: S3-compatible storage, a CDN, an internal web server, or a synchronized folder can all work.

## Recommended layout

\`\`\`text
registry/
  index.json
  packages/open-design/ui/0.1.0/open-ui-0.1.0.penpkg
  packages/open-design/ui/0.1.0/open-ui-0.1.0.penpkg.sig.json
  keys/publisher.pub
\`\`\`

## Operational rules

- Treat package versions as immutable.
- Enable object versioning and keep registry index history.
- Put write credentials only in CI; consumers need read-only access.
- Require signature and hash verification before installation.
- Mirror critical packages for offline and disaster-recovery use.

## Consumer workflow

\`\`\`sh
pentool registry search https://design.example.com/registry open-design
pentool package install open-design/ui@0.1.0 \\
  --registry https://design.example.com/registry
pentool lock verify
pentool lock sync --offline
\`\`\`

The generated \`pentool.lock\` gives each project a reproducible dependency graph. Commit it with the design project.
`};
