import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const repo="https://raw.githubusercontent.com/agkomyint/pentoolgg/main";
const docs=["pen-format.md","performance.md","PROTOCOL.md"];
const releases=["release-v0.1.0.md","release-v0.2.0.md","release-v0.3.0.md","release-v0.4.0.md","release-v0.5.0.md","release-v0.6.0.md"];
async function sync(file,folder,target=file.toLowerCase()==="protocol.md"?"protocol.md":file){const response=await fetch(`${repo}/docs/${file}`);if(!response.ok)throw new Error(`${response.status} ${file}`);await writeFile(path.join(process.cwd(),"content",folder,target),await response.text(),"utf8")}
await mkdir(path.join(process.cwd(),"content","docs"),{recursive:true});
await mkdir(path.join(process.cwd(),"content","releases"),{recursive:true});
const results=await Promise.allSettled([...docs.map(file=>sync(file,"docs")),...releases.map(file=>sync(file,"releases"))]);
const failures=results.filter(result=>result.status==="rejected");
if(failures.length)console.warn(`Content sync skipped ${failures.length} unavailable file(s); using checked-in fallbacks.`);else console.log("Pentool docs synced from GitHub.");
