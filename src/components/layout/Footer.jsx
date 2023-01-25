import {FaFacebook, FaInstagram, FaTelegram} from 'react-icons/fa'
import Styles from './Footer.module.css'

function Footer(){
    return(
    <footer className={Styles.footer_prin}>
        <ul>
            <li><FaFacebook /></li>
            <li><FaInstagram /></li>
            <li><FaTelegram /></li>
        </ul>
        <p><span> Costs </span> &copy; 2022</p>
    </footer>
)}

export default Footer