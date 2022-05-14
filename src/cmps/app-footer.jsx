import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'


export function AppFooter() {
    return (
        <footer className="app-footer flex column justify-center align-center">
            <img className='logo-img' src={require('../assets/img/toy.png')} />
            <small>© 2014 MisterToy.com - All Rights Reserved </small>
            <ul className="social-list clean-list flex">
                <li>
                    <a target="_blank" href="http://www.facebook.com">
                        <FontAwesomeIcon className='icon' icon={faFacebookF} />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="http://www.twitter.com">
                        <FontAwesomeIcon className='icon' icon={faTwitter} />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="http://www.instagram.com">
                        <FontAwesomeIcon className='icon' icon={faInstagram} />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="http://www.youtube.com">
                        <FontAwesomeIcon className='icon' icon={faYoutube} />
                    </a>
                </li>

            </ul>
        </footer>
    )
}