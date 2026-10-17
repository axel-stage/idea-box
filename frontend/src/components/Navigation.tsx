import { Link, NavLink } from 'react-router';
import {
  MdLightbulbOutline,
  MdOutlineSpaceDashboard,
  MdOutlinePermIdentity
} from "react-icons/md";

import type { User } from '@/types/data';
import styles from './Navigation.module.css'

export default function Navigation() {

  const user: User = {
    id: '1',
    email: 'hammer@punch.com',
    username: 'TheHammer',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  }

  return (
    <nav>
      <div className={styles.navContainer}>
        <Link to="/" >Idea Box</Link>
        <div className={styles.linkContainer}>
          <NavLink to="/idea"> <MdLightbulbOutline/> Ideas </NavLink>
          <NavLink to="/about"> <MdLightbulbOutline/> About </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard"> <MdOutlineSpaceDashboard /> My Dashboard </NavLink>
              <NavLink to={`/profile/${user.username}`}> <MdOutlinePermIdentity /> {user.username} </NavLink>
            </>
          ) : ( null )}
        </div>
      </div>
    </nav>
  );
}
