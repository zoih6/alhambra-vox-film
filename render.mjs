// node render.mjs --fps 30 --dur 32.6 --out deliverable.mp4
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const arg=(k,d)=>{const i=process.argv.indexOf('--'+k);return i>0?process.argv[i+1]:d;};
const FPS=Number(arg('fps',30)), DUR=Number(arg('dur',32.6)), OUT=arg('out','silent.mp4'), START=Number(arg('start',0));
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1280,height:720}});
await page.goto(pathToFileURL(resolve('index.html')).href);
await page.evaluate(async()=>{await document.fonts.ready; await Promise.all([...document.images].map(i=>i.complete?1:i.decode().catch(()=>{}))); if(window.__elsReady) await window.__elsReady;});
const still=arg('still',null);
if(still!==null){await page.evaluate(t=>window.seek(t),Number(still));await page.locator('#c').screenshot({path:arg('shot','still.png')});console.log('still ok');await browser.close();process.exit(0);}
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-i','-','-c:v','libx264','-crf','16','-pix_fmt','yuv420p',OUT],{stdio:['pipe','inherit','inherit']});
const total=Math.round(DUR*FPS);
for(let i=0;i<total;i++){
  await page.evaluate(t=>window.seek(t), START+i/FPS);
  const png=await page.locator('#c').screenshot({type:'png'});
  if(!ff.stdin.write(png))await new Promise(r=>ff.stdin.once('drain',r));
  if(i%(FPS*5)===0)console.log(`${(i/FPS).toFixed(0)}s/${DUR}s`);
}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await browser.close();console.log('done ->',OUT);
