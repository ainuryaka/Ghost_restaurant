import "./style.scss";

import mailIcon from "../../assets/mail.svg";
import phoneIcon from "../../assets/phone.svg";

import facebookIcon from "../../assets/facebook.svg";
import githubIcon from "../../assets/github.svg";
import instagramIcon from "../../assets/instagram.svg";
import twitterIcon from "../../assets/twitter.svg";

const TopBar = () => {
    return (
        <div className="topbar">
            <section>
                <span>
                    <img src={phoneIcon} />
                    +7 (7172) 645-716
                </span>
                <span>
                    <img src={mailIcon} />
                    info@astanait.edu.kz
                </span>
            </section>
            <section>
                <a href="https://twitter.com">
                    <img src={twitterIcon} />
                </a>
                <a href="https://facebook.com">
                    <img src={facebookIcon} />
                </a>
                <a href="https://instagram.com">
                    <img src={instagramIcon} />
                </a>
                <a href="https://github.com">
                    <img src={githubIcon} />
                </a>
            </section>
        </div>
    );
};

export default TopBar;
