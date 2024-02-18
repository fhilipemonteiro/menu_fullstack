import Button from '../button/Button';
import { MdLogout } from 'react-icons/md';
import logout from '../../utils/logout';
import './header.scss';
import { useNavigate } from 'react-router-dom';

export default function Header(): JSX.Element {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <div className='header-container'>
      <div className='header-wrapper'>
        <Button id='btn-logout' onClick={handleLogout}>
          <div className='name-button-logout'>Sair</div>
          <div className='icon-button-logout'>
            <MdLogout id='icon-btn-logout' className='icon' />
          </div>
        </Button>
      </div>
    </div>
  );
}
