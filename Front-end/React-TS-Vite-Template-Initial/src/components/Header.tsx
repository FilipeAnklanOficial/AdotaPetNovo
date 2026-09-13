import { User } from "lucide-react";
import { APP_NAME } from "../constants/app.constant";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export const Header = (): JSX.Element => {
  return (
    <header className="w-full  bg-[#F8FAFC]-600 px-8 py-4 md:px-12 ">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-10">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <img src="src/images/logoMelhor.png" alt="Logo" className="w-20 h-[70px] object-contain" />
            </a>
            <div className="hidden md:flex gap-8">
              <a href="#" className="text-black hover:underline font-mono">Adotar</a>
              <a href="#" className="text-black hover:underline font-mono">Sobre</a>
              <a href="#" className="text-black hover:underline font-mono">F.A.Q</a>
            </div>
          </div>
          <Button variant="secondary" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </nav>
      </header>
  );
};
