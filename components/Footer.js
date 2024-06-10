import React from "react";


const links1 = [
  "About Us",
  "Contact",
  "Community",
  "Programs",
  "Legal",
];

const links2 = [
  "Accessability",
  "Referrals",
  "Offers & Discounts",
  "Hosting",
  "Information",
];

const links3 = [
  "Information & Help",
  "Contact Center",
  "Become A Host",
  "Terms & Conditions",
  "Requirements",
];

const links4 = [
  "Trust & Safety",
  "Contact Center",
  "Useful Links",
  "Need To Know",
  "Help Centre",
];


function Footer() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-y-10 text-gray-600 px-20 py-14 bg-gray-100">
       <div className="space-y-4 text-xs text-gray-800 ">
        <h5 className="font-bold">ABOUT</h5>
        {links1.map(item => (
           <p className="cursor-pointer hover:text-red-400">{item}</p>
        ))}
      </div>

      <div className="space-y-4 text-xs text-gray-800 ">
        <h5 className="font-bold">COMMUNITY</h5>
        {links2.map(item => (
           <p className="cursor-pointer hover:text-red-400">{item}</p>
        ))}
      </div>

      <div className="space-y-4 text-xs text-gray-800 ">
        <h5 className="font-bold">OFFERS</h5>
        {links3.map(item => (
           <p className="cursor-pointer hover:text-red-400">{item}</p>
        ))}
      </div>

      <div className="space-y-4 text-xs text-gray-800 ">
        <h5 className="font-bold">TERMS</h5>
        {links4.map(item => (
           <p className="cursor-pointer hover:text-red-400">{item}</p>
        ))}
      </div>

    
    </div>
  );
}

export default Footer;
