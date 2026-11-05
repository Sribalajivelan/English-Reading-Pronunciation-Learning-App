import Reader from '../components/Reader.jsx'
import { PASS } from '../data/passages.js'

export default function Read() {
  return (
    <>
      <div>
        <h2 className="ta">வாசிப்புப் பயிற்சி</h2>
        <p className="muted ta">சொல்லைத் தொட்டால் அந்தச் சொல் கேட்கும். ஸ்பீக்கர் பொத்தானைத் தொட்டால் முழு வாக்கியம் கேட்கும். சிவப்புக் குறிகள் நிறுத்தற்குறிகள்.</p>
      </div>
      {PASS.map((p, i) => <Reader key={i} p={p} />)}
    </>
  )
}
