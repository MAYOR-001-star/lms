// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="py-8 text-center">
      <p className="text-basee text-gray-500 mb-4">Trusted by learners from</p>
      <div className="flex flex-wrap justify-center items-center gap-6">
        <img src={assets.microsoft_logo} alt="Microsoft" className="w-20 md:w-28" />
        <img src={assets.walmart_logo} alt="Walmart" className="w-20 md:w-28" />
        <img src={assets.accenture_logo} alt="Accenture" className="w-20 md:w-28" />
        <img src={assets.adobe_logo} alt="Adobe" className="w-20 md:w-28" />
        <img src={assets.paypal_logo} alt="PayPal" className="w-20 md:w-28" />
      </div>
    </div>
  );
};

export default Companies;
