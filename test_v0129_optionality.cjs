'use strict';
// Real local hooks, supplied reports only. This does not measure live model obedience.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {adventure}=require('./tests/objective_host.cjs');
const source=fs.readFileSync('library.js','utf8'),old=fs.readFileSync('fixtures/v0128_library.js','utf8');
const version=source.match(/const VERSION = "([^"]+)"/)[1];
const q={id:'errand',title:'A voluntary errand',autoStart:true,stages:[{id:'visit',title:'Visit',objectives:[{id:'room',text:'Actually enter the records room on two separate visits.',target:2,evidenceSource:'player',maxPerAction:1}]}]};
const action='I enter the records room and stop beside the first desk.';
const event={op:'progress',quest:'errand',stage:'visit',objective:'room',value:1,evidence:action};
const rows=[];
function test(name,fn){try{fn();rows.push({name,passed:true});}catch(error){rows.push({name,passed:false,error:error.stack});}}
function original(){return adventure({source:old,presets:[q],config:{compactReports:false}});}
function upgrade(a){const b=adventure({source,saved:a.saved(),config:null});b.observe();return b;}
function count(a){return a.world().records.errand.counts.visit?.room||0;}
function policy(text){assert(text.includes('Quests are optional'));assert(text.includes('Required objectives define completion, not obligation.'));}

test('Actual v28 save upgrades help while retaining settings, definitions, records and creator Notes',()=>{
 const a=original();a.control().description='Creator Notes retained exactly.';
 assert(!a.control().entry.includes('QUESTS ARE OPTIONAL'));
 const b=upgrade(a);assert.equal(b.state.Questism.version,version);
 for(const key of ['defs','records','flags','scene'])assert.deepEqual(b.world()[key],a.world()[key]);
 assert.deepEqual(b.state.Questism.config,a.state.Questism.config);assert.deepEqual(b.state.Questism.ledger,a.state.Questism.ledger);
 assert.equal(b.control().description,a.control().description);assert(b.control().entry.includes('QUESTS ARE OPTIONAL'));policy(b.control().entry);
});
test('An accepted v28 pending progress response commits once after upgrade and reload',()=>{
 const a=original(),t=a.turn([event],action,'The clerk sees you step inside the records room.');
 assert(a.state.Questism.pending);assert.equal(count(a),0);a.append('continue',t.output);
 const b=upgrade(a);assert.equal(count(b),1);const ledger=b.state.Questism.ledger.length;
 b.observe();const c=upgrade(b);assert.equal(count(c),1);assert.equal(c.state.Questism.ledger.length,ledger);
});
test('Migrated accepted progress retains Undo and source-edit rollback protections',()=>{
 const a=original(),t=a.turn([event],action,'The clerk sees you step inside the records room.');a.keep(t);assert.equal(count(a),1);
 const b=upgrade(a);assert.equal(count(b),1);b.menu('undo');assert.equal(count(b),0);
 const c=upgrade(a);c.actions[t.inputIndex].text='I stay outside the records room and quietly wait.';c.observe();assert.equal(count(c),0);
});
for(const compactReports of [false,true])test((compactReports?'Compact':'Legacy')+' unrelated accepted action leaves a voluntary quest active and unchanged',()=>{
 const a=adventure({source,presets:[q],config:{compactReports}}),previous=JSON.stringify(a.world().records);
 const t=a.turn([],"I leave the errand aside and watch the rain from the window.",'Rain taps against the glass. The clerk continues sorting papers.');
 policy(t.context);assert(t.context.includes('Follow the player\'s scene;'));
 a.keep(t);assert.equal(JSON.stringify(a.world().records),previous);assert.equal(a.world().records.errand.status,'active');assert.equal(Object.keys(a.world().proposals).length,0);
});
test('No-input Continue supplies observation and optionality guidance without reusing a prior action',()=>{
 const a=adventure({source,presets:[q]});a.keep(a.turn([], 'I stand outside the records room.', 'The clerk remains at the desk.'));
 const t=a.turn([], '', 'Rain continues beyond the window.');policy(t.context);assert(t.context.includes('NO NEW PLAYER ACTION'));
 a.keep(t);assert.equal(count(a),0);assert.equal(a.world().records.errand.status,'active');
});
test('A bounded automatic-offer fallback carries voluntary-quest guidance within its budget',()=>{
 const a=adventure({source,config:{newQuests:'auto',progression:'off',budget:1800}});
 a.keep(a.turn([], 'I wait beside the public desk.', 'The clerk asks a passing visitor whether they could return a folder to the records room later today.'));
 const t=a.context(a.begin('I sit by the window and quietly watch the rain.'));
 assert(t.context.includes('automatic offers only'));policy(t.context);assert(a.state.Questism.autoScan);
 const start=t.context.indexOf('[QUESTISM v'),end=t.context.lastIndexOf('[/QUESTISM]')+'[/QUESTISM]'.length;
 assert(start>=0&&end>start);assert(end-start<=1800);assert.equal(Object.keys(a.world().defs).length,0);
});
const report={version,name:'Optional quest guidance and actual v28 upgrade retention',sourceSHA256:crypto.createHash('sha256').update(source).digest('hex'),baselineSHA256:crypto.createHash('sha256').update(old).digest('hex'),nativeModelRecognitionTested:false,total:rows.length,passed:rows.filter(x=>x.passed).length,failed:rows.filter(x=>!x.passed).length,results:rows};
fs.writeFileSync('v0129_optionality_results.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));if(report.failed)process.exitCode=1;
