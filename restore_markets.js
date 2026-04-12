/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const cp = require('child_process');

// Get old page.tsx source from HEAD~1
const oldSrc = cp.execSync('git show HEAD~1:src/app/page.tsx', {encoding:'utf8'});
const curSrc = fs.readFileSync('src/app/page.tsx', 'utf8');

// Extract MARKETS -> PROCESS
const markerStart = '{/* MARKETS */}';
const markerEnd = '{/* PROCESS */}';

const oldMarkets = oldSrc.substring(oldSrc.indexOf(markerStart), oldSrc.indexOf(markerEnd));
const before = curSrc.substring(0, curSrc.indexOf(markerStart));
const after = curSrc.substring(curSrc.indexOf(markerEnd));

let newSrc = before + oldMarkets + after;
// Remove import
newSrc = newSrc.replace('import MarketsHUD from "@/components/MarketsHUD";\r\n', '');
newSrc = newSrc.replace('import MarketsHUD from "@/components/MarketsHUD";\n', '');

fs.writeFileSync('src/app/page.tsx', newSrc);
console.log('Restored markets section successfully.');
