/** Switch between the letter cards and the hard-sound coaching. */
export default function LettersTabs({ active }) {
  return (
    <div className="seg ltabs" role="navigation" aria-label="Letters">
      <a href="#letters" aria-current={active === 'letters' ? 'page' : undefined}>எழுத்துகள்</a>
      <a href="#sounds" aria-current={active === 'sounds' ? 'page' : undefined}>கடினமான ஒலிகள்</a>
    </div>
  )
}
