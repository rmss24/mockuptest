"use client";
import Link from "next/link";
import Image from "next/image";
import NordSicilia from "@/app/assest/images/north-sicilia.jpg";
import SudSicilia from "@/app/assest/images/sud-sicilia.jpg";
import WestSicilia from "@/app/assest/images/west-sicilia.png";
import EstSicilia from "@/app/assest/images/est-sicilia.png";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationSteps } from "@/app/components/NavigationSteps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function NextDestination() {
  const items = [
    {
      id: 0,
      image: NordSicilia,
      zone: "North Sicily",
      villas: 32,
      location: "Nord Sicilia",
    },
    {
      id: 1,
      image: SudSicilia,
      zone: "South Sicily",
      villas: 16,
      location: "Sud Sicilia",
    },
    {
      id: 2,
      image: WestSicilia,
      zone: "West Sicily",
      villas: 22,
      location: "Ovest Sicilia",
    },
    {
      id: 3,
      image: EstSicilia,
      zone: "East Sicily",
      villas: 18,
      location: "Est Sicilia",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const variants = {
    initial: { x: 200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -200, opacity: 0 },
  };

  function NextItem() {
    setSelectedItem((prevIndex) =>
      prevIndex + 1 > items.length - 1 ? 0 : prevIndex + 1
    );
  }

  function PreviousItem() {
    setSelectedItem((prevIndex) =>
      prevIndex - 1 < 0 ? items.length - 1 : prevIndex - 1
    );
  }

  return (
    <div className="mt-80">
      <div className="text-center">
        <h1 className="font-bold text-gray-900 sm:text-4xl">
          Choose Your Next{" "}
          <span className="bg-blue-light/50 h-6 inline-block align-baseline mt-auto">
            Destination{" "}
          </span>
        </h1>
        <p className="text-gray-700 mt-2 sm:w-1/2 w-full mx-auto">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Sed posuere consectetur est at lobortis.
        </p>
      </div>

      <div className="hidden xl:flex justify-center mt-20 space-x-8">
        {items.map((item, index) => (
          <Link href={"/search"}>
            <div className="max-w-sm rounded overflow-hidden relative group hover:-mt-5 transition-all cursor-pointer">
              <div className="relative w-80 h-[30rem] group-hover:-mt-5">
                <Image
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={`Immagine di ${item.zone}`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex flex-col bottom-5 left-4 top-auto text-white">
                  <p className="text-xl font-bold mt-0 relative group-hover:-translate-y-12 transition-all duration-300">
                    {item.zone}
                  </p>
                  <p className="mt-2 relative group-hover:-translate-y-12 transition-all duration-300">
                    villas: <span>{item.villas}</span>
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="uppercase tracking-wide">View All Villas</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div ref={ref} className="xl:hidden relative mt-40">
        <motion.div
          drag={isMobile ? "x" : false}
          key={selectedItem}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.1 }}
          onDragEnd={(event, info) => {
            if (isMobile) {
              if (info.offset.x < -100) {
                NextItem();
              } else if (info.offset.x > 100) {
                PreviousItem();
              }
            }
          }}
        >
          <AnimatePresence initial={false}>
            <div className="flex justify-center">
              <Link
                href={{
                  pathname: "/search",
                  query: { location: items[selectedItem].location },
                }}
              >
                <div className="max-w-sm rounded overflow-hidden relative group transition-all cursor-pointer">
                  <div className="relative w-80 h-[30rem] group-hover:-mt-5">
                    <Image
                      className="w-full h-full object-cover"
                      src={items[selectedItem].image}
                      alt={`Immagine di ${items[selectedItem].zone}`}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <div className="absolute inset-0 flex flex-col bottom-5 left-4 top-auto text-white">
                      <p className="text-xl font-bold mt-0 relative group-hover:-translate-y-12 transition-all duration-300">
                        {items[selectedItem].zone}
                      </p>
                      <p className="mt-2 relative group-hover:-translate-y-12 transition-all duration-300">
                        villas: <span>{items[selectedItem].villas}</span>
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="uppercase tracking-wide">
                          View All Villas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </AnimatePresence>
        </motion.div>

        <div className=" flex cursor-pointer justify-center">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => PreviousItem()}
            className="size-6 stroke-2 text-gray-400 transition-colors hover:text-gray-600 absolute left-8 top-1/2 p-4 bg-white shadow-lg rounded-full"
          />
          <NavigationSteps
            className="mt-6"
            selectedItem={selectedItem}
            setselectedItem={setSelectedItem}
            list={items}
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => NextItem()}
            className="size-6 stroke-2 text-gray-400 transition-colors hover:text-gray-600 absolute right-8 top-1/2 p-4 bg-white shadow-lg rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
