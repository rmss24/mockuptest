"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLangMenu = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  return (
    <header className="inset-x-0 top-0 z-50 xl:mx-20 mx-5">
      <nav
        className="flex items-center justify-between py-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <h3 className="font-noeDisplay text-3xl">Logo</h3>
          </Link>
        </div>
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon
              icon={menuOpen ? faTimes : faBars}
              className="h-6 w-6"
            />
          </button>
          <a
            href="#"
            className="text-sm border-2 px-3 py-1 border-yellow-gold leading-6 text-gray-900 hover:bg-yellow-gold transition-colors ml-4"
            onClick={toggleMenu}
          >
            Login
          </a>
        </div>

        <div
          className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out ${
            menuOpen ? "transform translate-x-0" : "transform translate-x-full"
          } lg:hidden`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div>
              <Link href="/" className="-m-1.5 p-1.5">
                <h3 className="font-noeDisplay text-3xl">Logo</h3>
              </Link>
            </div>
            <button className="absolute top-6 right-6" onClick={toggleMenu}>
              <FontAwesomeIcon
                icon={faTimes}
                className="h-6 w-6 text-gray-700"
              />
            </button>
            <a
              href="#"
              className="text-lg leading-6 text-gray-700 py-4 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Destinations
            </a>
            <a
              href="#"
              className="text-lg leading-6 text-gray-700 py-4 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Villas
            </a>
            <a
              href="#"
              className="text-lg leading-6 text-gray-700 py-4 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Experiences
            </a>
            <a
              href="#"
              className="text-lg leading-6 text-gray-700 py-4 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Guides
            </a>
            <a
              href="#"
              className="text-lg leading-6 text-gray-700 py-4 hover:text-gray-900"
              onClick={toggleMenu}
            >
              About
            </a>
            <a
              href="#"
              className="text-lg leading-6 text-gray-700 py-4 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Journal
            </a>
            <a
              href="#"
              className="text-lg leading-6 text-gray-700 py-4 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className="text-sm leading-6 text-gray-700 hover:text-gray-900"
            >
              Destinations
            </a>
            <a
              href="#"
              className="text-sm leading-6 text-gray-700 hover:text-gray-900"
            >
              Villas
            </a>
            <a
              href="#"
              className="text-sm leading-6 text-gray-700 hover:text-gray-900"
            >
              Experiences
            </a>
            <a
              href="#"
              className="text-sm leading-6 text-gray-700 hover:text-gray-900"
            >
              Guides
            </a>
            <a
              href="#"
              className="text-sm leading-6 text-gray-700 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm leading-6 text-gray-700 hover:text-gray-900"
            >
              Journal
            </a>
            <a
              href="#"
              className="text-sm leading-6 text-gray-700 hover:text-gray-900"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="relative flex align-middle">
            <button onClick={toggleLangMenu} className="text-gray-700">
              EN <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md z-50">
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={toggleLangMenu}
                  >
                    Italian
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    onClick={toggleLangMenu}
                  >
                    Spanish
                  </a>
                </div>
              </div>
            )}
          </div>
          <FontAwesomeIcon
            icon={faSearch}
            className="w-6 mx-4 my-2 text-grey"
          />
          <a
            href="#"
            className="text-sm border-2 px-3 py-1 border-yellow-gold leading-6 text-gray-900 hover:bg-yellow-gold transition-colors"
          >
            Login
          </a>
        </div>
      </nav>
    </header>
  );
}
