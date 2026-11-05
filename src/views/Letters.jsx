import LetterCard from '../components/LetterCard.jsx'

const small = { fontFamily: 'var(--f-body)', fontWeight: 400, fontSize: '.8rem' }

export default function Letters() {
  return (
    <>
      <div>
        <h2 className="ta">ஆங்கில எழுத்து ஒலிகள்</h2>
        <p className="muted ta">பெரிய எழுத்தைத் தொட்டால் பெயர் கேட்கும். நீல-பச்சைப் பொத்தான்கள் எழுத்தின் ஒலியைச் சொல்லும். வார்த்தையைத் தொட்டால் முழு வார்த்தை கேட்கும். கீழே உள்ள சிறு பொத்தான்கள் மெய் + உயிர் சேர்க்கைகள்.</p>
      </div>
      <section className="stack">
        <h3 className="ta">உயிர் எழுத்துகள் <small className="muted" style={small}>Vowels</small></h3>
        <div className="lgrid">{[...'AEIOU'].map(L => <LetterCard key={L} L={L} />)}</div>
      </section>
      <section className="stack">
        <h3 className="ta">மெய் எழுத்துகள் <small className="muted" style={small}>Consonants</small></h3>
        <div className="lgrid">{[...'BCDFGHJKLMNPQRSTVWXYZ'].map(L => <LetterCard key={L} L={L} />)}</div>
      </section>
      <p className="muted ta" style={{ fontSize: '.85rem' }}>சேர்க்கை ஒலிகள் தோராயமானவை. துல்லியமான ஒலிக்கு வார்த்தை பொத்தான்களைக் கேளுங்கள்.</p>
    </>
  )
}
