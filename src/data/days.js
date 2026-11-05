/* ---------- day data ---------- */
export const W=s=>s.split(';').map(x=>{const p=x.split('|');return{en:p[0],ta:p[1],h:p[2]||''}});
export const P=s=>s.split(';').map(x=>{const p=x.split('|');return{p:p[0],ta:p[1],ex:p[2],exta:p[3]||''}});
export const PAIR=s=>s.split(';').map(x=>x.split('|'));
export const DAYS={};
function D(n,t,ta,tasks,o={}){DAYS[n]=Object.assign({n,t,ta,tasks,mins:n<=7?30:n<=14?40:n<=21?45:50},o)}

D(1,'Basic Vowel Sounds','அடிப்படை உயிர் ஒலிகள்',[
 ['Learn 5 vowel sounds: A, E, I, O, U','A, E, I, O, U ஆகிய 5 உயிர் ஒலிகளைக் கற்கவும்'],
 ['Practice simple words: cat, pen, sit, hot, cup','எளிய வார்த்தைகளைப் பயிலவும்: cat, pen, sit, hot, cup'],
 ['Write each vowel 10 times and say it aloud','ஒவ்வொரு எழுத்தையும் 10 முறை எழுதி சத்தமாகச் சொல்லவும்'],
 ['Listen to the vowel sounds (tap the cards)','அட்டைகளைத் தொட்டு ஒலியைக் கேளுங்கள்']],
 {letters:'AEIOU',words:W('cat|கேட்;pen|பென்;sit|சிட்;hot|ஹாட்;cup|கப்;cake|கேக்;me|மீ;ice|ஐஸ்;go|கோ;cute|க்யூட்')});
D(2,'Common Consonants (Part 1)','பொதுவான மெய்யெழுத்துகள் (பகுதி 1)',[
 ['Learn: B, C, D, F, G, H','கற்கவும்: B, C, D, F, G, H'],
 ['Practice words: book, cat, dog, fish, go, hat','வார்த்தைகள்: book, cat, dog, fish, go, hat'],
 ['Combine vowels + consonants (ba, be, bi, bo, bu)','உயிர் + மெய் சேர்த்துப் படிக்கவும் (ba, be, bi, bo, bu)'],
 ['Record yourself on your phone and listen back','உங்கள் ஃபோனில் பதிவு செய்து திரும்பக் கேளுங்கள்']],
 {letters:'BCDFGH',words:W('book|புக்;cat|கேட்;dog|டாக்;fish|பிஷ்;go|கோ;hat|ஹேட்')});
D(3,'Common Consonants (Part 2)','பொதுவான மெய்யெழுத்துகள் (பகுதி 2)',[
 ['Learn: J, K, L, M, N, P','கற்கவும்: J, K, L, M, N, P'],
 ['Practice words: job, king, love, man, name, pen','வார்த்தைகள்: job, king, love, man, name, pen'],
 ['Make 20 simple consonant + vowel combinations','20 எளிய மெய் + உயிர் சேர்க்கைகளை உருவாக்கவும்'],
 ['Practice for 15 minutes','15 நிமிடம் பயிற்சி செய்யவும்']],
 {letters:'JKLMNP',words:W('job|ஜாப்;king|கிங்;love|லவ்;man|மேன்;name|நேம்;pen|பென்')});
D(4,'Remaining Consonants','மீதமுள்ள மெய்யெழுத்துகள்',[
 ['Learn: Q, R, S, T, V, W, X, Y, Z','கற்கவும்: Q, R, S, T, V, W, X, Y, Z'],
 ['Practice words: queen, red, sun, top, voice, water, box, yes, zero','வார்த்தைகளைப் பயிலவும்'],
 ['Say the whole alphabet, A to Z','A முதல் Z வரை முழு அகரவரிசையைச் சொல்லவும்'],
 ['Test yourself on all 26 letters (see Practice tab)','26 எழுத்துகளிலும் உங்களைச் சோதிக்கவும் (பயிற்சி பக்கம்)']],
 {letters:'QRSTVWXYZ',words:W('queen|க்வீன்;red|ரெட்;sun|சன்;top|டாப்;voice|வாய்ஸ்;water|வாட்டர்;box|பாக்ஸ்;yes|யெஸ்;zero|ஸீரோ')});
D(5,'Simple 3-Letter Words','எளிய 3 எழுத்து வார்த்தைகள்',[
 ['Read 20 three-letter words','20 மூன்றெழுத்து வார்த்தைகளைப் படிக்கவும்'],
 ['Blend the sounds together: c-a-t → cat','ஒலிகளை இணைக்கவும்: c-a-t → கேட்'],
 ['Write each word and say it aloud','ஒவ்வொரு வார்த்தையையும் எழுதி சத்தமாகச் சொல்லவும்']],
 {words:W('cat|கேட்;dog|டாக்;pen|பென்;sun|சன்;box|பாக்ஸ்;man|மேன்;run|ரன்;sit|சிட்;hot|ஹாட்;cup|கப்;bat|பேட்;bed|பெட்;big|பிக்;hat|ஹேட்;jam|ஜேம்;leg|லெக்;map|மேப்;net|நெட்;pig|பிக்;bus|பஸ்')});
D(6,'4-Letter Words','4 எழுத்து வார்த்தைகள்',[
 ['Read 25 four-letter words','25 நான்கெழுத்து வார்த்தைகளைப் படிக்கவும்'],
 ['Connect the sounds smoothly','ஒலிகளைத் தடையின்றி இணைக்கவும்'],
 ['Write each word and say it aloud','எழுதி சத்தமாகச் சொல்லவும்']],
 {words:W('book|புக்;fish|பிஷ்;name|நேம்;love|லவ்;king|கிங்;zero|ஸீரோ;come|கம்;make|மேக்;take|டேக்;like|லைக்;home|ஹோம்;good|குட்;food|ஃபுட்;moon|மூன்;rain|ரெய்ன்;road|ரோட்;hand|ஹேண்ட்;jump|ஜம்ப்;milk|மில்க்;help|ஹெல்ப்;door|டோர்;rice|ரைஸ்;five|ஃபைவ்;nine|நைன்;play|ப்ளே')});
D(7,'Review & Assessment','மறுபார்வை & மதிப்பீடு',[
 ['Test all letters and sounds (Letters tab)','எல்லா எழுத்துகள், ஒலிகளையும் சோதிக்கவும்'],
 ['Read the 50 words below','கீழே உள்ள 50 வார்த்தைகளைப் படிக்கவும்'],
 ['Self-assessment: what needs more practice?','சுய மதிப்பீடு: எதில் அதிக பயிற்சி தேவை?'],
 ['Plan next week’s improvements','அடுத்த வாரத்துக்கான மேம்பாட்டைத் திட்டமிடவும்']],
 {review:[1,2,3,4,5,6],limit:50,rate:1});
D(8,'Silent Letters','மௌன எழுத்துகள் அறிமுகம்',[
 ['Learn common silent letters: knife (k), lamb (b), write (w)','பொதுவான மௌன எழுத்துகள்: knife (k), lamb (b), write (w)'],
 ['Practice 10 words with silent letters','மௌன எழுத்துள்ள 10 வார்த்தைகளைப் பயிலவும்'],
 ['Find the silent letter in each word','ஒவ்வொரு வார்த்தையிலும் மௌன எழுத்தைக் கண்டறியவும்']],
 {pats:P('kn|k மௌனம் → ந்|knife|நைஃப்;mb|b மௌனம்|lamb|லேம்;wr|w மௌனம்|write|ரைட்;gh|gh மௌனம்|night|நைட்;lk|l மௌனம்|walk|வாக்;mb|b மௌனம்|comb|கோம்'),
  words:W('knife|நைஃப்|k is silent;lamb|லேம்|b is silent;write|ரைட்|w is silent;know|நோ|k is silent;knee|நீ|k is silent;comb|கோம்|b is silent;climb|க்ளைம்|b is silent;hour|அவர்|h is silent;night|நைட்|gh is silent;light|லைட்|gh is silent;wrong|ராங்|w is silent;thumb|தம்|b is silent;listen|லிசன்|t is silent;walk|வாக்|l is silent;talk|டாக்|l is silent')});
D(9,'Common Letter Combinations','பொதுவான எழுத்துச் சேர்க்கைகள்',[
 ['Learn: th, ch, sh, ph, ng','கற்கவும்: th, ch, sh, ph, ng'],
 ['Practice: think, chair, ship, phone, sing','பயிலவும்: think, chair, ship, phone, sing'],
 ['Read 20 words with these combinations','இந்த சேர்க்கைகளுடன் 20 வார்த்தைகளைப் படிக்கவும்']],
 {pats:P('th|த் (நாக்கு பற்களுக்கிடையே)|think|திங்க்;ch|ச்|chair|சேர்;sh|ஷ்|ship|ஷிப்;ph|ஃப்|phone|ஃபோன்;ng|ங்|sing|சிங்'),
  words:W('think|திங்க்;chair|சேர்;ship|ஷிப்;phone|ஃபோன்;sing|சிங்;this|திஸ்;that|தேட்;thank|தேங்க்;chip|சிப்;cheese|சீஸ்;church|சர்ச்;shop|ஷாப்;shirt|ஷர்ட்;photo|ஃபோட்டோ;dolphin|டால்ஃபின்;long|லாங்;song|சாங்;bring|ப்ரிங்;math|மேத்;watch|வாட்ச்')});
D(10,'Double Letters','இரட்டை எழுத்துகள்',[
 ['Learn: apple, letter, happy, coffee, butter','கற்கவும்: apple, letter, happy, coffee, butter'],
 ['Double letters make one sound, not two','இரட்டை எழுத்து ஒரே ஒலியைத் தரும்'],
 ['Practice 30 words with double letters','இரட்டை எழுத்துள்ள 30 வார்த்தைகளைப் பயிலவும்']],
 {words:W('apple|ஆப்பல்;letter|லெட்டர்;happy|ஹேப்பி;coffee|காஃபி;butter|பட்டர்;summer|சம்மர்;dinner|டின்னர்;rabbit|ராபிட்;yellow|யெல்லோ;little|லிட்டில்;bell|பெல்;ball|பால்;doll|டால்;egg|எக்;kitten|கிட்டன்;dollar|டாலர்;puppy|பப்பி;sorry|சாரி;funny|ஃபன்னி;floor|ஃப்ளோர்;mirror|மிரர்;button|பட்டன்;ladder|லேடர்;pepper|பெப்பர்;hello|ஹலோ;carrot|கேரட்;school|ஸ்கூல்;glass|க்ளாஸ்;across|அக்ராஸ்;tomorrow|டுமாரோ')});
D(11,'Simple Sentences','எளிய வாக்கியங்கள்',[
 ['Read: “I am a man.” “The cat is big.” “My name is…”','படிக்கவும்: "I am a man." "The cat is big." "My name is…"'],
 ['Connect the words smoothly','வார்த்தைகளைத் தடையின்றி இணைத்துப் படிக்கவும்'],
 ['Read all 10 sentences below, twice','கீழே உள்ள 10 வாக்கியங்களையும் இருமுறை படிக்கவும்']],
 {pass:[0]});
D(12,'Common Word Patterns','பொதுவான சொல் வடிவங்கள்',[
 ['Learn -ing words: running, walking, talking','-ing சொற்கள்: running, walking, talking'],
 ['Learn -ed words: walked, played, worked','-ed சொற்கள்: walked, played, worked'],
 ['Practice 25 words with these endings','இந்த முடிவுகளுடன் 25 வார்த்தைகளைப் பயிலவும்']],
 {pats:P('-ing|இங்|running|ரன்னிங்;-ed (t)|ட்|walked|வாக்ட்;-ed (d)|ட்|played|ப்ளேட்;-ed (id)|இட்|painted|பெயின்டிட்'),
  words:W('running|ரன்னிங்;walking|வாக்கிங்;talking|டாக்கிங்;eating|ஈட்டிங்;reading|ரீடிங்;singing|சிங்கிங்;playing|ப்ளேயிங்;looking|லுக்கிங்;listening|லிசனிங்;cooking|குக்கிங்;sleeping|ஸ்லீப்பிங்;working|வர்க்கிங்;walked|வாக்ட்;played|ப்ளேட்;worked|வர்க்ட்;jumped|ஜம்ப்ட்;asked|ஆஸ்க்ட்;cooked|குக்ட்;watched|வாட்ச்ட்;helped|ஹெல்ப்ட்;washed|வாஷ்ட்;cleaned|க்ளீன்ட்;opened|ஓபன்ட்;called|கால்ட்;painted|பெயின்டிட்')});
D(13,'Sight Words (Part 1)','அடிக்கடி வரும் சொற்கள் (பகுதி 1)',[
 ['Learn the 20 most common words below','கீழே உள்ள 20 பொதுச் சொற்களைக் கற்கவும்'],
 ['Memorize and practice daily','மனப்பாடம் செய்து தினமும் பயிலவும்'],
 ['Use these words in simple sentences','எளிய வாக்கியங்களில் பயன்படுத்தவும்']],
 {words:W('the|த;and|அண்ட்;a|அ;to|டு;said|செட்;you|யூ;he|ஹி;I|ஐ;of|ஆவ்;it|இட்;was|வாஸ்;for|ஃபார்;on|ஆன்;are|ஆர்;as|அஸ்;with|வித்;his|ஹிஸ்;they|தே;at|அட்;be|பி'),pass:[1]});
D(14,'Week 2 Review','வாரம் 2 மறுபார்வை',[
 ['Review all learned patterns','கற்ற எல்லா வடிவங்களையும் மறுபார்வை செய்யவும்'],
 ['Read the 20 sentences (words below plus the sentences)','20 வாக்கியங்களைப் படிக்கவும்'],
 ['Self-test on sight words','அடிக்கடி வரும் சொற்களில் சுய சோதனை'],
 ['Practice your weak areas','பலவீனமான பகுதிகளில் பயிற்சி']],
 {review:[8,9,10,12,13],limit:30,pass:[0,2],rate:1});
D(15,'Long Vowel Sounds','நீண்ட உயிர் ஒலிகள்',[
 ['Learn: a_e (cake), i_e (bike), o_e (home), u_e (cube), e_e (these)','கற்கவும்: a_e, i_e, o_e, u_e, e_e'],
 ['Compare short and long vowels (pairs below)','குறில் – நெடில் ஒலிகளை ஒப்பிடவும்'],
 ['Practice 30 words with long vowel patterns','30 வார்த்தைகளைப் பயிலவும்']],
 {pats:P('a_e|ஏ|cake|கேக்;i_e|ஐ|bike|பைக்;o_e|ஓ|home|ஹோம்;u_e|யூ|cube|க்யூப்;e_e|ஈ|these|தீஸ்'),
  pairs:PAIR('cap|கேப்|cape|கேய்ப்;pin|பின்|pine|பைன்;hop|ஹாப்|hope|ஹோப்;cut|கட்|cute|க்யூட்;kit|கிட்|kite|கைட்;not|நாட்|note|நோட்;tap|டேப்|tape|டேய்ப்;mad|மேட்|made|மேய்ட்'),
  words:W('cake|கேக்;name|நேம்;make|மேக்;game|கேம்;late|லேட்;face|ஃபேஸ்;lake|லேக்;bike|பைக்;time|டைம்;like|லைக்;nine|நைன்;five|ஃபைவ்;kite|கைட்;line|லைன்;ride|ரைட்;home|ஹோம்;nose|நோஸ்;bone|போன்;rose|ரோஸ்;hole|ஹோல்;stone|ஸ்டோன்;rope|ரோப்;cube|க்யூப்;cute|க்யூட்;huge|ஹியூஜ்;tube|ட்யூப்;these|தீஸ்;theme|தீம்;Pete|பீட்;complete|கம்ப்ளீட்')});
D(16,'R-controlled Vowels','R உடன் வரும் உயிர் ஒலிகள்',[
 ['Learn: ar (car), er (her), ir (bird), or (for), ur (turn)','கற்கவும்: ar, er, ir, or, ur'],
 ['Practice 25 R-controlled words','25 வார்த்தைகளைப் பயிலவும்'],
 ['Focus on the soft English “r” (not the rolled Tamil “ர்”)','ஆங்கில "r" மென்மையானது; தமிழ் "ர்" போல உருட்ட வேண்டாம்']],
 {pats:P('ar|ஆர்|car|கார்;er|அர்|her|ஹர்;ir|அர்|bird|பர்ட்;or|ஓர்|for|ஃபார்;ur|அர்|turn|டர்ன்'),
  words:W('car|கார்;star|ஸ்டார்;farm|ஃபார்ம்;park|பார்க்;dark|டார்க்;her|ஹர்;tiger|டைகர்;fern|ஃபர்ன்;sister|சிஸ்டர்;bird|பர்ட்;girl|கர்ல்;shirt|ஷர்ட்;first|ஃபர்ஸ்ட்;for|ஃபார்;corn|கார்ன்;horse|ஹார்ஸ்;storm|ஸ்டார்ம்;turn|டர்ன்;burn|பர்ன்;nurse|நர்ஸ்;purple|பர்ப்பிள்;fur|ஃபர்;hurt|ஹர்ட்;short|ஷார்ட்;fork|ஃபார்க்')});
D(17,'Sight Words (Part 2)','அடிக்கடி வரும் சொற்கள் (பகுதி 2)',[
 ['Learn the next 20 words below','அடுத்த 20 சொற்களைக் கற்கவும்'],
 ['Use them in sentences','வாக்கியங்களில் பயன்படுத்தவும்'],
 ['Speed reading practice','வேகமாகப் படிக்கும் பயிற்சி']],
 {words:W('have|ஹேவ்;from|ஃப்ரம்;or|ஆர்;one|வன்;had|ஹேட்;by|பை;word|வர்ட்;but|பட்;not|நாட்;what|வாட்;all|ஆல்;were|வர்;we|வி;when|வென்;your|யோர்;can|கேன்;said|செட்;there|தேர்;each|ஈச்;which|விச்')});
D(18,'Multi-syllable Words','பல அசைச் சொற்கள்',[
 ['Break words into parts: com-pu-ter, im-por-tant, beau-ti-ful','சொற்களை அசைகளாகப் பிரிக்கவும்'],
 ['Clap once for each syllable','ஒவ்வொரு அசைக்கும் ஒருமுறை கை தட்டவும்'],
 ['Read 20 two-syllable and 10 three-syllable words','20 இரண்டசை, 10 மூன்றசை சொற்களைப் படிக்கவும்']],
 {words:W('table|டேபிள்|ta·ble;pencil|பென்சில்|pen·cil;window|விண்டோ|win·dow;garden|கார்டன்|gar·den;mother|மதர்|moth·er;father|ஃபாதர்|fa·ther;teacher|டீச்சர்|teach·er;doctor|டாக்டர்|doc·tor;flower|ஃப்ளவர்|flow·er;monkey|மங்கி|mon·key;orange|ஆரஞ்ச்|or·ange;paper|பேப்பர்|pa·per;basket|பாஸ்கெட்|bas·ket;ticket|டிக்கெட்|tick·et;market|மார்க்கெட்|mar·ket;kitchen|கிச்சன்|kitch·en;pocket|பாக்கெட்|pock·et;water|வாட்டர்|wa·ter;sugar|ஷுகர்|su·gar;lemon|லெமன்|lem·on;computer|கம்ப்யூட்டர்|com·pu·ter;important|இம்போர்ட்டன்ட்|im·por·tant;beautiful|பியூட்டிஃபுல்|beau·ti·ful;banana|பனானா|ba·na·na;tomato|டமேட்டோ|to·ma·to;elephant|எலிஃபன்ட்|el·e·phant;family|ஃபேமிலி|fam·i·ly;remember|ரிமெம்பர்|re·mem·ber;umbrella|அம்ப்ரெல்லா|um·brel·la;hospital|ஹாஸ்பிடல்|hos·pi·tal')});
D(19,'Compound Words','கூட்டுச் சொற்கள்',[
 ['Learn: sunshine, bedroom, homework, basketball','கற்கவும்: sunshine, bedroom, homework, basketball'],
 ['See how two words join to make one','இரண்டு சொற்கள் இணைந்து ஒன்றாவதைக் கவனியுங்கள்'],
 ['Make and read 15 compound words','15 கூட்டுச் சொற்களை உருவாக்கிப் படிக்கவும்']],
 {words:W('sunshine|சன்ஷைன்|sun + shine;bedroom|பெட்ரூம்|bed + room;homework|ஹோம்வர்க்|home + work;basketball|பாஸ்கெட்பால்|basket + ball;sunflower|சன்ஃப்ளவர்|sun + flower;notebook|நோட்புக்|note + book;classroom|க்ளாஸ்ரூம்|class + room;football|ஃபுட்பால்|foot + ball;rainbow|ரெயின்போ|rain + bow;toothbrush|டூத்பிரஷ்|tooth + brush;birthday|பர்த்டே|birth + day;airport|ஏர்போர்ட்|air + port;bathroom|பாத்ரூம்|bath + room;butterfly|பட்டர்ஃப்ளை|butter + fly;moonlight|மூன்லைட்|moon + light;pancake|பேன்கேக்|pan + cake;raincoat|ரெயின்கோட்|rain + coat;snowman|ஸ்னோமேன்|snow + man;goldfish|கோல்டுஃபிஷ்|gold + fish;cupcake|கப்கேக்|cup + cake')});
D(20,'Contractions','சுருக்கங்கள்',[
 ['Learn: I’m, don’t, can’t, won’t, it’s, they’re, we’ll','கற்கவும்: I’m, don’t, can’t, won’t, it’s, they’re, we’ll'],
 ['The apostrophe (’) replaces missing letters','அபாஸ்ட்ரஃபி (’) விடுபட்ட எழுத்துகளைக் குறிக்கும்'],
 ['Practice 20 common contractions','20 பொதுச் சுருக்கங்களைப் பயிலவும்']],
 {words:W('I’m|ஐம்|I am;don’t|டோன்ட்|do not;can’t|கேன்ட்|cannot;won’t|வோன்ட்|will not;it’s|இட்ஸ்|it is;they’re|தேர்|they are;we’ll|வீல்|we will;isn’t|இஸ்ன்ட்|is not;didn’t|டிட்ன்ட்|did not;I’ll|ஐல்|I will;he’s|ஹீஸ்|he is;she’s|ஷீஸ்|she is;let’s|லெட்ஸ்|let us;that’s|தேட்ஸ்|that is;you’re|யோர்|you are;we’re|வீர்|we are;couldn’t|குட்ன்ட்|could not;doesn’t|டஸ்ன்ட்|does not;I’ve|ஐவ்|I have;what’s|வாட்ஸ்|what is')});
D(21,'Week 3 Review','வாரம் 3 மறுபார்வை',[
 ['Review all skills from this week','இந்த வார எல்லா திறன்களையும் மறுபார்வை செய்யவும்'],
 ['Read the short paragraph (5–6 sentences)','சிறு பத்தியை (5–6 வாக்கியங்கள்) படிக்கவும்'],
 ['Time yourself reading the words','வார்த்தைகளைப் படிக்கும் நேரத்தைக் கணக்கிடவும்'],
 ['Note the areas to improve','மேம்படுத்த வேண்டிய பகுதிகளைக் குறிக்கவும்']],
 {review:[15,16,17,18,19,20],limit:30,pass:[3],timer:true,rate:1});
D(22,'Complex Consonant Blends','கலந்த மெய் ஒலிகள்',[
 ['Learn: bl, cl, fl, gl, pl, sl','கற்கவும்: bl, cl, fl, gl, pl, sl'],
 ['Learn: br, cr, dr, fr, gr, pr, tr','கற்கவும்: br, cr, dr, fr, gr, pr, tr'],
 ['Practice 40 words with blends','40 வார்த்தைகளைப் பயிலவும்']],
 {pats:P('bl|ப்ள்|blue|ப்ளூ;cl|க்ள்|clean|க்ளீன்;fl|ஃப்ள்|fly|ஃப்ளை;gl|க்ள்|glad|க்ளேட்;pl|ப்ள்|play|ப்ளே;sl|ஸ்ல்|slow|ஸ்லோ;br|ப்ர்|brown|ப்ரவுன்;cr|க்ர்|cry|க்ரை;dr|ட்ர்|drop|ட்ராப்;fr|ஃப்ர்|free|ஃப்ரீ;gr|க்ர்|green|க்ரீன்;pr|ப்ர்|proud|ப்ரவுட்;tr|ட்ர்|tree|ட்ரீ'),
  words:W('blue|ப்ளூ;clean|க்ளீன்;fly|ஃப்ளை;glad|க்ளேட்;play|ப்ளே;slow|ஸ்லோ;black|ப்ளாக்;clap|க்ளாப்;flag|ஃப்ளேக்;glass|க்ளாஸ்;plant|ப்ளாண்ட்;sleep|ஸ்லீப்;brown|ப்ரவுன்;cry|க்ரை;drop|ட்ராப்;free|ஃப்ரீ;green|க்ரீன்;proud|ப்ரவுட்;tree|ட்ரீ;bread|ப்ரெட்;crab|க்ராப்;dress|ட்ரெஸ்;frog|ஃப்ராக்;grass|க்ராஸ்;price|ப்ரைஸ்;train|ட்ரெய்ன்;bring|ப்ரிங்;cross|க்ராஸ்;drink|ட்ரிங்க்;fruit|ஃப்ரூட்;stop|ஸ்டாப்;star|ஸ்டார்;skin|ஸ்கின்;smile|ஸ்மைல்;snow|ஸ்னோ;spoon|ஸ்பூன்;swim|ஸ்விம்;street|ஸ்ட்ரீட்;flower|ஃப்ளவர்;clock|க்ளாக்')});
D(23,'Vowel Teams','உயிர் குழுக்கள்',[
 ['Learn: ai/ay (rain/day), ee/ea (tree/read), oa/ow (boat/grow)','கற்கவும்: ai/ay, ee/ea, oa/ow'],
 ['Practice 30 words with vowel teams','30 வார்த்தைகளைப் பயிலவும்'],
 ['Keep the pronunciation consistent','ஒலியை ஒரே மாதிரியாக வைத்திருங்கள்']],
 {pats:P('ai / ay|ஏ|rain|ரெய்ன்;ee / ea|ஈ|tree|ட்ரீ;oa / ow|ஓ|boat|போட்'),
  words:W('rain|ரெய்ன்;train|ட்ரெய்ன்;mail|மெய்ல்;paint|பெயின்ட்;wait|வெய்ட்;day|டே;play|ப்ளே;stay|ஸ்டே;say|ஸே;way|வே;tree|ட்ரீ;see|ஸீ;feet|ஃபீட்;sleep|ஸ்லீப்;green|க்ரீன்;read|ரீட்;eat|ஈட்;sea|ஸீ;team|டீம்;meat|மீட்;boat|போட்;coat|கோட்;road|ரோட்;soap|சோப்;grow|க்ரோ;snow|ஸ்னோ;slow|ஸ்லோ;show|ஷோ;low|லோ;yellow|யெல்லோ')});
D(24,'Reading Comprehension','வாசித்துப் புரிதல்',[
 ['Read the 5 short passages below','கீழே உள்ள 5 சிறு பகுதிகளைப் படிக்கவும்'],
 ['Answer the question after each passage','ஒவ்வொன்றிற்கும் பின் உள்ள கேள்விக்கு பதில் சொல்லவும்'],
 ['Summarize each one in Tamil, then in English','ஒவ்வொன்றையும் தமிழில், பின் ஆங்கிலத்தில் சுருக்கிச் சொல்லவும்']],
 {pass:[4,5,6,7,8]});
D(25,'Irregular Words','ஒழுங்கற்ற சொற்கள்',[
 ['Learn words that do not follow the rules: said, was, one, two, who, come, some','விதிக்கு உட்படாத சொற்கள்: said, was, one, two, who, come, some'],
 ['Memorize these as whole words','முழுச் சொல்லாக மனப்பாடம் செய்யவும்'],
 ['Practice 25 irregular words with flashcards (Practice tab)','25 சொற்களை பிளாஷ்கார்டு மூலம் பயிலவும் (பயிற்சி பக்கம்)']],
 {words:W('said|செட்;was|வாஸ்;one|வன்;two|டூ;who|ஹூ;come|கம்;some|சம்;do|டூ;does|டஸ்;put|புட்;give|கிவ்;live|லிவ்;love|லவ்;move|மூவ்;through|த்ரூ;though|தோ;enough|இனஃப்;eye|ஐ;friend|ஃப்ரெண்ட்;people|பீப்பிள்;again|அகெயின்;could|குட்;would|வுட்;should|ஷுட்;are|ஆர்;were|வர்')});
D(26,'Punctuation & Reading Flow','நிறுத்தற்குறிகள் & படிக்கும் ஓட்டம்',[
 ['Pause at commas, stop at full stops','கமாவில் சிறு இடைவெளி, புள்ளியில் நிறுத்தம்'],
 ['Read with expression: ? rises, ! is excited','உணர்வுடன் படிக்கவும்: ? ஏறும், ! உற்சாகம்'],
 ['Read the 10 sentences below with natural rhythm','கீழே உள்ள 10 வாக்கியங்களை இயல்பான தாளத்தில் படிக்கவும்']],
 {pats:P(',|சிறு இடைநிறுத்தம் (கமா)|Hello, Anu.|;.|முழு நிறுத்தம் (புள்ளி)|I like tea.|;?|குரல் மேலே ஏறும்|Do you like tea?|;!|உற்சாகம் / அழுத்தம்|Wow! That is big!|'),pass:[9]});
D(27,'Speed Building','வேகப் பயிற்சி',[
 ['Read the familiar words below quickly','பழகிய வார்த்தைகளை வேகமாகப் படிக்கவும்'],
 ['Time yourself and beat yesterday’s time','நேரத்தைக் கணக்கிட்டு நேற்றைய நேரத்தை முந்துங்கள்'],
 ['Accuracy first, then speed','முதலில் துல்லியம், பிறகு வேகம்']],
 {review:[13,17,25],limit:60,timer:true});
D(28,'Final Assessment','இறுதி மதிப்பீடு',[
 ['Read the complete short story (12 sentences)','12 வாக்கிய முழுக் கதையைப் படிக்கவும்'],
 ['Test yourself on everything you learned (Practice tab)','கற்ற எல்லாவற்றிலும் உங்களைச் சோதிக்கவும்'],
 ['Evaluate your own progress','உங்கள் முன்னேற்றத்தை மதிப்பிடவும்'],
 ['Plan your continued learning','தொடர்ந்து கற்கும் திட்டம் தயாரிக்கவும்']],
 {review:[5,6,10,13,17,22,23,25],limit:40,pass:[10],rate:1});
D(29,'Real-world Practice','நிஜ வாழ்க்கைப் பயிற்சி',[
 ['Read simple signs, labels, and menus','எளிய பலகைகள், லேபிள்கள், மெனுக்களைப் படிக்கவும்'],
 ['Read app names and phone text (list below)','செயலி பெயர்கள், ஃபோன் எழுத்துகளைப் படிக்கவும்'],
 ['Find 20 English words around you and count them below','உங்களைச் சுற்றி 20 ஆங்கில வார்த்தைகளைக் கண்டுபிடித்து கீழே எண்ணவும்']],
 {counter:20,words:W('menu|மெனு;exit|எக்ஸிட்;open|ஓபன்;closed|க்ளோஸ்ட்;push|புஷ்;pull|புல்;stop|ஸ்டாப்;welcome|வெல்கம்;hotel|ஹோட்டல்;hospital|ஹாஸ்பிடல்;school|ஸ்கூல்;bank|பேங்க்;ticket|டிக்கெட்;price|ப்ரைஸ்;sale|சேல்;WhatsApp|வாட்ஸ்அப்;YouTube|யூடியூப்;Google|கூகுள்;Facebook|ஃபேஸ்புக்;Instagram|இன்ஸ்டாகிராம்;camera|கேமரா;settings|செட்டிங்ஸ்;battery|பேட்டரி;message|மெசேஜ்;photo|ஃபோட்டோ;video|வீடியோ;maps|மேப்ஸ்;search|சர்ச்;download|டவுன்லோட்;password|பாஸ்வர்ட்')});
D(30,'Future Planning','எதிர்காலத் திட்டம்',[
 ['Assess your overall progress','உங்கள் ஒட்டுமொத்த முன்னேற்றத்தை மதிப்பிடவும்'],
 ['Identify your strongest and weakest areas','வலிமையான, பலவீனமான பகுதிகளைக் கண்டறியவும்'],
 ['Plan next month’s learning goals','அடுத்த மாத இலக்குகளைத் திட்டமிடவும்'],
 ['Celebrate your achievement!','உங்கள் சாதனையைக் கொண்டாடுங்கள்!']],
 {summary:true});

