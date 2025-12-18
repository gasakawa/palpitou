import logo from '../assets/images/palpitou.png';

export default function Logo() {
  return (
    <button
      type="button"
      className="flex items-center space-x-2"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <img src={logo} alt="Palpitou" className="rounded-lg object-cover" />
    </button>
  );
}
