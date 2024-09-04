import { FaStar } from "react-icons/fa";

function Footer() {
  return (
    <div className="my-11 text-center">
      <p className="mb-2">
        <a 
          className="text-blue-500 underline" 
          href="https://github.com/munashex/Youtube_clone"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </p>
      <p className="inline-flex">
        If you like this project, give it a star on GitHub! 
        <a 
          className="text-yellow-500 ml-2 inline-flex"
          href="https://github.com/munashex/Youtube_clone"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaStar size={24} /><FaStar size={24} /><FaStar size={24} />
        </a>
      </p>
    </div>
  );
}

export default Footer;
