// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <img src={assets.logo_dark} alt="" />
          <p></p>
        </div>
        <div></div>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
