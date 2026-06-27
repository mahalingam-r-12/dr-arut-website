/**
 * structure.test.js
 * Dependency-free checks for the agreed folder layout and the hero image wiring.
 * Run with:  node tests/structure.test.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
let failures = 0;

function check(name, condition) {
  if (condition) { console.log('  PASS  ' + name); }
  else { console.error('  FAIL  ' + name); failures++; }
}
function exists(rel) { return fs.existsSync(path.join(root, rel)); }

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
const icons = fs.readFileSync(path.join(root, 'assets/images/svgs/icons.svg'), 'utf8');

console.log('Folder layout');
check('assets/css exists', exists('assets/css'));
check('assets/js/utils exists', exists('assets/js/utils'));
check('assets/js/utils/.gitkeep locks the convention', exists('assets/js/utils/.gitkeep'));
check('assets/images/svgs exists', exists('assets/images/svgs'));
check('tests/ exists', exists('tests'));

console.log('Required files');
check('assets/css/styles.css', exists('assets/css/styles.css'));
check('assets/images/svgs/icons.svg', exists('assets/images/svgs/icons.svg'));
check('assets/js/main.js', exists('assets/js/main.js'));
check('assets/js/utils/reveal.js', exists('assets/js/utils/reveal.js'));
check('assets/js/utils/accordion.js', exists('assets/js/utils/accordion.js'));

console.log('index.html wiring');
check('links external stylesheet', html.includes('assets/css/styles.css'));
check('loads reveal util', html.includes('assets/js/utils/reveal.js'));
check('loads accordion util', html.includes('assets/js/utils/accordion.js'));
check('loads main.js', html.includes('assets/js/main.js'));
check('no leftover inline style block', html.indexOf('<style') === -1);

console.log('Hero image (responsive)');
check('hero uses the supplied portrait', html.includes('assets/images/Dr-Arutchelvam-Vijayaraman.jpeg'));
check('hero provides responsive srcset', html.includes('srcset=') && html.includes('-600.jpeg') && html.includes('-900.jpeg'));
check('hero declares sizes for selection', html.includes('sizes='));
check('hero declares width/height (no layout shift)', html.includes('width="1200"') && html.includes('height="1600"'));
check('hero prioritised for fast load', html.includes('fetchpriority="high"'));
check('hero has graceful fallback', html.includes('onerror='));
check('image uses object-fit cover (no distortion)', css.includes('object-fit:cover'));
check('focal point keeps the face in frame', css.includes('object-position:center 16%'));
check('portrait frame locked to a 4:5 ratio', css.includes('aspect-ratio:4/5'));
check('responsive variant files exist', exists('assets/images/Dr-Arutchelvam-Vijayaraman-600.jpeg') && exists('assets/images/Dr-Arutchelvam-Vijayaraman-900.jpeg'));

console.log('Text-wrapper rule');
check('FAQ question text wrapped in span.q-text', html.includes('q-text'));
check('FAQ summaries use the icon sprite', html.includes('#icon-plus'));
check('icon sprite defines symbol glyphs', icons.indexOf('<symbol id="icon-') !== -1);

console.log('');
if (failures === 0) { console.log('All checks passed.'); process.exit(0); }
else { console.error(failures + ' check(s) failed.'); process.exit(1); }
