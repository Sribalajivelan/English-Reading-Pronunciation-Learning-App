// Tamil meanings, keyed by lowercase English word. "word|meaning" per line.
const RAW = `
cat|பூனை
pen|பேனா
sit|உட்கார்
hot|சூடான
cup|கோப்பை
cake|கேக் (இனிப்புப் பலகாரம்)
me|எனக்கு / என்னை
ice|பனிக்கட்டி
go|போ
cute|அழகான, செல்லமான
book|புத்தகம்
dog|நாய்
fish|மீன்
hat|தொப்பி
job|வேலை
king|அரசன்
love|அன்பு / விரும்பு
man|ஆண்
name|பெயர்
queen|அரசி
red|சிவப்பு
sun|சூரியன்
top|உச்சி, மேல்
voice|குரல்
water|தண்ணீர்
box|பெட்டி
yes|ஆம்
zero|பூஜ்யம்
run|ஓடு
bat|மட்டை / வௌவால்
bed|படுக்கை
big|பெரிய
jam|பழக்கூழ் (ஜாம்)
leg|கால்
map|வரைபடம்
net|வலை
pig|பன்றி
bus|பேருந்து
come|வா
make|செய்
take|எடு
like|விரும்பு / போல
home|வீடு
good|நல்ல
food|உணவு
moon|நிலா
rain|மழை
road|சாலை
hand|கை
jump|குதி
milk|பால்
help|உதவு
door|கதவு
rice|சாதம், அரிசி
five|ஐந்து
nine|ஒன்பது
play|விளையாடு
knife|கத்தி
lamb|ஆட்டுக்குட்டி
write|எழுது
know|தெரிந்துகொள்
knee|முழங்கால்
comb|சீப்பு
climb|ஏறு
hour|மணி நேரம்
night|இரவு
light|ஒளி, விளக்கு
wrong|தவறான
thumb|கட்டைவிரல்
listen|கேள், கவனி
walk|நட
talk|பேசு
think|நினை
chair|நாற்காலி
ship|கப்பல்
phone|தொலைபேசி
sing|பாடு
this|இது
that|அது
thank|நன்றி சொல்
chip|சில்லு (சிப்ஸ்)
cheese|பாலாடைக்கட்டி
church|தேவாலயம்
shop|கடை
shirt|சட்டை
photo|புகைப்படம்
dolphin|டால்பின் (கடல் உயிரினம்)
long|நீளமான
song|பாட்டு
bring|கொண்டு வா
math|கணக்கு
watch|கடிகாரம் / பார்
apple|ஆப்பிள்
letter|கடிதம், எழுத்து
happy|மகிழ்ச்சியான
coffee|காபி
butter|வெண்ணெய்
summer|கோடைக்காலம்
dinner|இரவு உணவு
rabbit|முயல்
yellow|மஞ்சள்
little|சிறிய
bell|மணி
ball|பந்து
doll|பொம்மை
egg|முட்டை
kitten|பூனைக்குட்டி
dollar|டாலர் (அமெரிக்கப் பணம்)
puppy|நாய்க்குட்டி
sorry|மன்னிக்கவும்
funny|வேடிக்கையான
floor|தரை
mirror|கண்ணாடி (முகம் பார்க்கும்)
button|பொத்தான், பட்டன்
ladder|ஏணி
pepper|மிளகு
hello|வணக்கம்
carrot|கேரட்
school|பள்ளி
glass|கண்ணாடி, குவளை
across|குறுக்கே
tomorrow|நாளை
running|ஓடுதல்
walking|நடத்தல்
talking|பேசுதல்
eating|சாப்பிடுதல்
reading|படித்தல்
singing|பாடுதல்
playing|விளையாடுதல்
looking|பார்த்தல்
listening|கேட்டல்
cooking|சமைத்தல்
sleeping|தூங்குதல்
working|வேலை செய்தல்
walked|நடந்தான்
played|விளையாடினான்
worked|வேலை செய்தான்
jumped|குதித்தான்
asked|கேட்டான்
cooked|சமைத்தான்
watched|பார்த்தான்
helped|உதவினான்
washed|கழுவினான்
cleaned|சுத்தம் செய்தான்
opened|திறந்தான்
called|அழைத்தான்
painted|வண்ணம் தீட்டினான்
the|குறிப்பிட்ட ஒன்றைச் சுட்டும் சொல் (அந்த)
and|மற்றும்
a|ஒரு
to|-க்கு (திசை)
said|சொன்னான் (say-யின் இறந்தகாலம்)
you|நீ, நீங்கள்
he|அவன்
i|நான்
of|-இன், உடைய
it|அது
was|இருந்தது (is-ன் இறந்தகாலம்)
for|-க்காக
on|மேல், மீது
are|இருக்கிறார்கள், இருக்கிறோம்
as|போல, -ஆக
with|உடன்
his|அவனுடைய
they|அவர்கள்
at|-இல் (இடம்)
be|இரு
game|விளையாட்டு
late|தாமதமான
face|முகம்
lake|ஏரி
bike|மிதிவண்டி, பைக்
time|நேரம்
kite|பட்டம்
line|கோடு, வரிசை
ride|சவாரி செய்
nose|மூக்கு
bone|எலும்பு
rose|ரோஜா
hole|துளை
stone|கல்
rope|கயிறு
cube|கனசதுரம்
huge|மிகப் பெரிய
tube|குழாய்
these|இவை
theme|கருப்பொருள்
pete|பீட் (ஒரு பெயர்)
complete|முழுமையான, முடி
car|கார்
star|நட்சத்திரம்
farm|பண்ணை
park|பூங்கா
dark|இருண்ட
her|அவளுடைய, அவளை
tiger|புலி
fern|பெரணிச் செடி
sister|சகோதரி
bird|பறவை
girl|சிறுமி
first|முதல்
corn|சோளம்
horse|குதிரை
storm|புயல்
turn|திரும்பு
burn|எரி
nurse|செவிலியர்
purple|ஊதா நிறம்
fur|உரோமம்
hurt|காயம், வலி
short|குட்டையான
fork|முள்கரண்டி
have|வைத்திரு, உடைய
from|இருந்து
or|அல்லது
one|ஒன்று
had|இருந்தது (have-ன் இறந்தகாலம்)
by|அருகில், ஆல்
word|சொல்
but|ஆனால்
not|இல்லை (மறுப்பு)
what|என்ன
all|எல்லாம்
were|இருந்தார்கள் (are-ன் இறந்தகாலம்)
we|நாங்கள், நாம்
when|எப்போது
your|உன்னுடைய, உங்களுடைய
can|முடியும்
there|அங்கே
each|ஒவ்வொரு
which|எது
table|மேசை
pencil|பென்சில்
window|ஜன்னல்
garden|தோட்டம்
mother|அம்மா
father|அப்பா
teacher|ஆசிரியர்
doctor|மருத்துவர்
flower|பூ
monkey|குரங்கு
orange|ஆரஞ்சு
paper|காகிதம்
basket|கூடை
ticket|சீட்டு, டிக்கெட்
market|சந்தை
kitchen|சமையலறை
pocket|சட்டைப்பை
sugar|சர்க்கரை
lemon|எலுமிச்சை
computer|கணினி
important|முக்கியமான
beautiful|அழகான
banana|வாழைப்பழம்
tomato|தக்காளி
elephant|யானை
family|குடும்பம்
remember|நினைவில் வை
umbrella|குடை
hospital|மருத்துவமனை
sunshine|சூரிய ஒளி
bedroom|படுக்கையறை
homework|வீட்டுப்பாடம்
basketball|கூடைப்பந்து
sunflower|சூரியகாந்தி
notebook|குறிப்பேடு
classroom|வகுப்பறை
football|கால்பந்து
rainbow|வானவில்
toothbrush|பல் துலக்கி
birthday|பிறந்தநாள்
airport|விமான நிலையம்
bathroom|குளியலறை
butterfly|வண்ணத்துப்பூச்சி
moonlight|நிலவொளி
pancake|அப்பம் (பான்கேக்)
raincoat|மழைக்கோட்டு
snowman|பனி மனிதன்
goldfish|தங்க மீன்
cupcake|சிறு கேக்
i’m|நான் இருக்கிறேன் (I am)
don’t|செய்யாதே, செய்வதில்லை (do not)
can’t|முடியாது (cannot)
won’t|மாட்டேன் (will not)
it’s|அது ஆகும் (it is)
they’re|அவர்கள் இருக்கிறார்கள் (they are)
we’ll|நாம் செய்வோம் (we will)
isn’t|இல்லை (is not)
didn’t|செய்யவில்லை (did not)
i’ll|நான் செய்வேன் (I will)
he’s|அவன் ஆவான் (he is)
she’s|அவள் ஆவாள் (she is)
let’s|வாருங்கள் செய்வோம் (let us)
that’s|அது ஆகும் (that is)
you’re|நீங்கள் இருக்கிறீர்கள் (you are)
we’re|நாங்கள் இருக்கிறோம் (we are)
couldn’t|முடியவில்லை (could not)
doesn’t|செய்வதில்லை (does not)
i’ve|என்னிடம் உள்ளது (I have)
what’s|என்ன ஆகும் (what is)
blue|நீலம்
clean|சுத்தமான
fly|பற
glad|மகிழ்ச்சியான
slow|மெதுவான
black|கருப்பு
clap|கை தட்டு
flag|கொடி
plant|செடி
sleep|தூங்கு
brown|பழுப்பு நிறம்
cry|அழு
drop|விழு, துளி
free|இலவசம், சுதந்திரம்
green|பச்சை
proud|பெருமை
tree|மரம்
bread|ரொட்டி
crab|நண்டு
dress|ஆடை
frog|தவளை
grass|புல்
price|விலை
train|ரயில்
cross|கடந்து செல்
drink|குடி
fruit|பழம்
stop|நில்
skin|தோல்
smile|புன்னகை
snow|பனி
spoon|கரண்டி
swim|நீந்து
street|தெரு
clock|சுவர் கடிகாரம்
mail|அஞ்சல்
paint|வண்ணம் தீட்டு
wait|காத்திரு
day|நாள்
stay|தங்கு
say|சொல்
way|வழி
see|பார்
feet|பாதங்கள்
read|படி
eat|சாப்பிடு
sea|கடல்
team|குழு
meat|இறைச்சி
boat|படகு
coat|மேலங்கி
soap|சோப்பு
grow|வளர்
show|காட்டு
low|தாழ்வான
two|இரண்டு
who|யார்
some|சில
do|செய்
does|செய்கிறான் (do-வின் வடிவம்)
put|வை
give|கொடு
live|வாழ்
move|நகர்
through|வழியாக
though|இருந்தாலும்
enough|போதும், போதுமான
eye|கண்
friend|நண்பர்
people|மக்கள்
again|மீண்டும்
could|முடிந்தது (can-ன் இறந்தகாலம்)
would|செய்வேன் (நிபந்தனை)
should|செய்ய வேண்டும்
menu|உணவுப் பட்டியல்
exit|வெளியேறும் வழி
open|திற, திறந்திருக்கிறது
closed|மூடியிருக்கிறது
push|தள்ளு
pull|இழு
welcome|வரவேற்பு
hotel|உணவகம், தங்கும் விடுதி
bank|வங்கி
sale|தள்ளுபடி விற்பனை
whatsapp|வாட்ஸ்அப் (செய்தி அனுப்பும் செயலி)
youtube|யூடியூப் (காணொளி தளம்)
google|கூகுள் (தேடுபொறி)
facebook|ஃபேஸ்புக் (சமூக வலைதளம்)
instagram|இன்ஸ்டாகிராம் (புகைப்படச் செயலி)
camera|படக்கருவி
settings|அமைப்புகள்
battery|மின்கலம் (பேட்டரி)
message|செய்தி
video|காணொளி
maps|வரைபடங்கள்
search|தேடு
download|பதிவிறக்கு
password|கடவுச்சொல்
am|இருக்கிறேன் (I am)
is|இருக்கிறது
my|என்னுடைய
ravi|ரவி (ஒரு பெயர்)
she|அவள்
has|உடையது, உள்ளது
cap|தொப்பி
in|-இல்
writing|எழுதுதல்
baby|குழந்தை
talked|பேசினான்
cooks|சமைக்கிறார்
small|சிறிய
house|வீடு
him|அவனை, அவனுடன்
every|ஒவ்வொரு
white|வெள்ளை
likes|விரும்புகிறது
sunday|ஞாயிற்றுக்கிழமை
mala|மாலா (ஒரு பெயர்)
goes|செல்கிறாள்
buys|வாங்குகிறாள்
apples|ஆப்பிள்கள்
tom|டாம் (ஒரு பெயர்)
plays|விளையாடுகிறான்
today|இன்று
anu|அனு (ஒரு பெயர்)
drinks|குடிக்கிறாள்
cold|குளிர்ந்த
feels|உணர்கிறாள்
better|நன்றாக, மேலானது
wake|எழு, விழித்துக்கொள்
up|மேலே
six|ஆறு
brush|துலக்கு, தூரிகை
teeth|பற்கள்
then|பிறகு
breakfast|காலை உணவு
tea|தேநீர்
raining|மழை பெய்கிறது
so|அதனால்
an|ஒரு (உயிரெழுத்துக்கு முன்)
wow|அடடா!
mangoes|மாம்பழங்கள்
wash|கழுவு
hands|கைகள்
lived|வாழ்ந்தது
morning|காலை
sang|பாடியது
came|வந்தது
wet|நனைந்த
kind|அன்பான
saw|பார்த்தாள்
took|எடுத்துச் சென்றாள்
gave|கொடுத்தாள்
warm|இதமான, சூடான
soft|மென்மையான
slept|தூங்கியது
out|வெளியே
flew|பறந்தது
back|திரும்ப, பின்
its|அதனுடைய
smiled|புன்னகைத்தாள்
waved|கையசைத்தாள்
`
export const MEANINGS = Object.fromEntries(
  RAW.trim().split('\n').map(l => { const i = l.indexOf('|'); return [l.slice(0, i), l.slice(i + 1)] })
)

/** Tamil meaning for an English word, or '' when unknown. */
export const meaningOf = w => MEANINGS[String(w).toLowerCase().replace(/'/g, '’')] || ''
