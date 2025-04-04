import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <Logo />
          <FooterLinks />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center space-x-3 mb-8 md:mb-0">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
        <span className="text-gray-900 font-bold text-lg">F</span>
      </div>
      <span className="font-semibold text-xl text-white">FinSync</span>
    </div>
  );
};

const FooterLinks = () => {
  const linkGroups = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security"],
    },
    
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 md:mb-0">
      {linkGroups.map((group, index) => (
        <div key={index}>
          <h4 className="text-white font-medium mb-3">{group.title}</h4>
          <ul className="space-y-2">
            {group.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const FooterBottom = () => {
  return (
    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-500 text-sm order-2 md:order-1">
        © 2025 FinSync. All rights reserved.
      </p>

      <SocialLinks />
    </div>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex space-x-6 mb-4 md:mb-0 order-1 md:order-2">
      <Link
        href="#"
        className="text-gray-400 hover:text-emerald-300 transition-colors"
      >
        <span className="sr-only">Twitter</span>
        {/* Twitter icon */}
      </Link>
      <Link
        href="#"
        className="text-gray-400 hover:text-emerald-300 transition-colors"
      >
        <span className="sr-only">LinkedIn</span>
        {/* LinkedIn icon */}
      </Link>
    </div>
  );
};