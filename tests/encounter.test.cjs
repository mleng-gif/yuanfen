const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const core=html.match(/<script id="experience-core">([\s\S]*?)<\/script>/)[1];
const model=core.slice(core.indexOf('class Encounter'),core.indexOf('class SoundField'));
const Encounter=vm.runInNewContext(model+';Encounter');
const step=(s,seconds,proximity,held=false)=>{const events=[];for(let i=0;i<seconds*60;i++)events.push(...s.step(1/60,proximity,held));return events;};
{
 const s=new Encounter();const events=step(s,50,.8,true);
 assert.equal(events.filter(e=>e==='exchange').length,1,'first encounter must complete without cooldown suppression');
 assert.equal(s.encounters,1);assert.ok(s.pressure>.99);
 const count=s.encounters;step(s,8,.1);assert.equal(s.encounters,count,'separation does not erase history');
 assert.equal(s.separationSeen,true);assert.ok(Math.abs(s.pressure-.2)<1e-6);
}
{
 const s=new Encounter();const events=step(s,275,.75,true);
 assert.ok(s.encounters>=2,'successive encounters can accumulate');
 assert.equal(events.filter(e=>e==='ending').length,1);assert.equal(s.ended,true);assert.equal(s.decay,1);
 const age=s.age;step(s,10,.9);assert.equal(s.age,age,'ending stops time');
}
{
 const s=new Encounter();step(s,275,.05);assert.equal(s.encounters,0);assert.equal(s.ended,true,'a quiet visit has an ending');
}
{
 const held=new Encounter(),free=new Encounter();step(held,200,.85,true);step(free,200,.05,false);
 assert.equal(held.decay,free.decay,'neither holding nor separating is morally penalized by faster decay');
}
console.log('Encounter lifecycle: first merge, repeated merge, history, pressure, ending and equal decay passed.');
