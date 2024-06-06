import React from "react";

function Footer() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-y-10 text-gray-600 px-20 py-14 bg-gray-100">
       <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">About</h5>
        <p>About us</p>
        <p>Contact</p>
        <p>Community work</p>
        <p>Papa rich clan</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">COMMUNITY</h5>
        <p>Accessability</p>
        <p>Real site</p>
        <p>Pretty clone</p>
        <p>Referrals accepted</p>
        <p>Papafam</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">HOST</h5>
        <p>Papa React</p>
        <p>Zero to hero</p>
        <p>Awesome site</p>
        <p>For the win</p>
        <p>Join Now</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">SUPPORT</h5>
        <p>Help Centre</p>
        <p>Trust & Safety</p>
        <p>Say Hi</p>
        <p>aster Eggs</p>
        <p>Papafam</p>
      </div>
    </div>
  );
}

export default Footer;
