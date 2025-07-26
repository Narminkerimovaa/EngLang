import logo from "./../../assets/EngLang_logo.png";
import search from "./../../assets/search_icon.png";
import user from './../../assets/user_lang.png';
import fav from './../../assets/fav_lang.png';
import {Link} from 'react-router'
import { FaAngleDown } from "react-icons/fa6";
import './style.css'

function Header() {
  return (
    <header>
      <nav>
        <div className="nav_logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="nav_links">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"#"}>Learn from Video</Link>
            </li>
            <li>
              <Link to={"#"}>All words</Link>
            </li>
            <li>
              <Link to={"#"}>TalkZone</Link>
            </li>
            <li>
              <Link to={"#"}>About us</Link>
            </li>
          </ul>
        </div>

        <div className="nav_controls">
          <div className="nav_search">
            <input type="text" placeholder="search..." />
            <img src={search} alt="search_icon" />
          </div>
          <div className="nav_tools">
            <div className="nav_lang">
              EN <FaAngleDown className="nav_lang_icon" />
            </div>
            <div className="nav_icons">
              <img src={fav} alt="fav" />
              <img src={user} alt="user" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
