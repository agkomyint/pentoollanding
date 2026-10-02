import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const docsDir=path.join(process.cwd(),"content","docs");
const releasesDir=path.join(process.cwd(),"content","releases");
export const docs=[
  {slug:"getting-started",title:"Getting started",description:"Install Pentool and make your first editable document."},
  {slug:"cli",title:"CLI essentials",description:"Create, inspect, edit, render, and export from the terminal."},
  {slug:"pen-format",title:"The .pen format",description:"The readable document model for pages, layers, and objects."},
  {slug:"protocol",title:"Package protocol",description:"The open specification for libraries, packages, and registries."},
  {slug:"performance",title:"Performance",description:"Benchmarks, constraints, and reproducible measurements."},
] as const;
const builtIn:Record<string,string>={
"getting-started":`# Getting started

Pentool is distributed as one native binary. It serves the visual editor locally and exposes the same document operations through a CLI.

## Install

Download the binary for your platform from [GitHub Releases](https://github.com/agkomyint/pentoolgg/releases), place it on your PATH, then verify it:

\`\`\`sh
pentool --help
pentool serve
\`\`\`

Open \`http://127.0.0.1:4711\`. No Node.js runtime, database, or account is required.

## Build from source

\`\`\`sh
git clone https://github.com/agkomyint/pentoolgg.git
cd pentoolgg
cargo install --path .
\`\`\`

## Create your first file

\`\`\`sh
pentool new hello.pen --width 1200 --height 800
pentool serve hello.pen
pentool export hello.pen hello.svg
\`\`\`

The \`.pen\` file remains editable JSON. The SVG is the delivery artifact; the \`.pen\` file is the source of truth.
`,
"cli":`# CLI essentials

Pentool makes small, explicit operations easy for people, scripts, and agents.

## Files and rendering

\`\`\`sh
pentool new logo.pen --width 1200 --height 800
pentool info logo.pen
pentool export logo.pen logo.png --scale 2
pentool export logo.pen logo.svg
\`\`\`

## Find before you edit

\`\`\`sh
pentool tree artwork.pen
pentool search artwork.pen composer
pentool search artwork.pen "Open desktop app" --kind text
\`\`\`

## Targeted edits

\`\`\`sh
pentool object artwork.pen set composer --layer ui --fill "#1c1c1c"
pentool object artwork.pen rename composer --layer ui --new-id prompt-box
pentool object artwork.pen duplicate prompt-box --layer ui --new-id prompt-copy
\`\`\`

Mutations preserve unspecified properties and create numbered recovery snapshots. Use \`--dry-run\` and revisions for all-or-nothing automation.
`};
export function getDoc(slug:string){const file=path.join(docsDir,`${slug}.md`);const raw=fs.existsSync(file)?fs.readFileSync(file,"utf8"):builtIn[slug];if(!raw)return null;const parsed=matter(raw);return{content:parsed.content,data:parsed.data};}
export function getReleases(){if(!fs.existsSync(releasesDir))return[];return fs.readdirSync(releasesDir).filter(f=>f.endsWith(".md")).sort().reverse().map(file=>{const raw=fs.readFileSync(path.join(releasesDir,file),"utf8");const parsed=matter(raw);const heading=parsed.content.match(/^#\s+(.+)$/m)?.[1]??file.replace(/\.md$/,"");return{slug:file.replace(/\.md$/,"").replace("release-",""),title:heading,content:parsed.content};});}
