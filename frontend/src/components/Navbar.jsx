import { useState } from "react";
import { motion } from "framer-motion";
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[rgb(238,238,238)] backdrop-blur-lg px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src="/brep-bgr.png" alt="Logo" className="h-12" /> {/* changed from h-15 to h-12 */}
        
        <div className="hidden md:flex space-x-6">
          {["Projects", "About", "Contact", "Members"].map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-black text-lg font-bold"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="relative">
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="md:hidden absolute left-0 top-full w-full bg-[rgb(238,238,238)] p-4 flex flex-col gap-5 text-black font-bold shadow-md"
          >
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Projects</li>
            <li className="cursor-pointer">Contact</li>
            <li className="cursor-pointer">Members</li>
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
