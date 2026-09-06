import logoFotter from '../assets/logo.png'; 

export default function Footer(){
    return(
        <>
        <footer>
            <div className="footer-esquerdo">
                <a href="#agent"><img src={logoFotter} alt="Logo do rodapé" className='logo' /></a>
            </div>
            <div className="footer-direito">
                <ul>
                    <li><a href="https://www.linkedin.com/in/naelson-albino/">Linkedin</a></li>
                    <li><a href="https://www.instagram.com/eu.naelson/">Instagram</a></li>
                    <li><a href="https://github.com/Naelsoon">GitHub</a></li>
                </ul>
            </div>
        </footer>
        </>
    )
}