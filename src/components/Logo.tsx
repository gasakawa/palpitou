import { Link } from 'react-router-dom';

import logo from '../assets/images/palpitou.png';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2" aria-label="Ir para a página inicial">
      <img src={logo} alt="Palpitou" className="rounded-lg object-cover" />
    </Link>
  );
}
