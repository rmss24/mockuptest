"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faWandMagicSparkles,
  faGift,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faGem, faStar } from "@fortawesome/free-regular-svg-icons";
import { NavigationSteps } from "@/app/components/NavigationSteps";
import {
  XMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

const items = [
  {
    id: 0,
    icon: faGem,
    title: "High Quality Assured",
    description:
      "A stunning collection of high-quality villas suitable for all group sizes in some of Sicily's top locations.",
  },
  {
    id: 1,
    icon: faStar,
    title: "Outstanding Service",
    description:
      "Superb attention to details from your first enquiry and 24/7 assistance once you have arrived in Sicily.",
  },
  {
    id: 2,
    icon: faUserGroup,
    title: "Local Team",
    description:
      "Get detailed advice from our local team who know our villas and the island inside out",
  },
  {
    id: 3,
    icon: faWandMagicSparkles,
    title: "Extra Services",
    description:
      "Choose from a wide range of Extra Services, from cookery to wine tasting, to enhance your holiday.",
  },
  {
    id: 4,
    icon: faGift,
    title: "E-Travel Pack",
    description:
      "All your travel and comprehensive local information will be supplied in a convenient user-friendly Travel Pack.",
  },
];

export default function PercheSceglierci() {
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
    <>
      <div className="absolute top-[25%] left-[-25%] w-[150%] h-[35rem] bg-grey-light transform -rotate-12 -z-10" />
      <div className="mt-60 w-full hidden lg:block">
        <div className="max-w-full mx-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="my-auto lg:text-left">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-4xl">
                Perché{" "}
                <span className="bg-blue-light/50 h-6 inline-block align-baseline mt-auto">
                  sceglierci?
                </span>
              </h1>
            </div>
            {items.map((item) => (
              <div key={item.id} className="items-start space-x-4">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-blue size-16 m-5"
                />
                <div>
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full mt-60 lg:hidden">
        <div className="absolute top-[25%] left-[-25%] w-[150%] h-[35rem] bg-grey-light transform -rotate-12 -z-10" />
        <div className="max-w-full mx-20">
          <div className="grid gap-8">
            <div className="my-auto lg:text-left">
              <h1 className="mt-60 font-bold text-gray-900 text-4xl text-center">
                Perché{" "}
                <span className="bg-blue-light/50 h-6 inline-block align-baseline mt-auto">
                  sceglierci?
                </span>
              </h1>
            </div>

            <motion.div
              drag={isMobile ? "x" : false}
              dragConstraints={ref}
              key={selectedItem}
              variants={variants}
              animate="animate"
              initial="initial"
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
              <div className="grid lg:max-w-none lg:grid-cols-1">
                <AnimatePresence initial={false}>
                  {items.map((item, index) =>
                    index === selectedItem ? (
                      <motion.div
                        key={item.id}
                        variants={variants}
                        animate="animate"
                        initial="initial"
                        exit="exit"
                        transition={{ delay: 0.1 }}
                        className="mt-4 lg:order-first lg:my-auto"
                      >
                        <div className="items-start space-x-4">
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="text-blue size-16 my-5 w-full"
                          />
                          <div>
                            <p className="text-xl font-semibold text-center">
                              {item.title}
                            </p>
                            <p className="text-gray-700 text-center">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
        <div className=" flex cursor-pointer justify-center">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => PreviousItem()}
            className="size-6 stroke-2 text-gray-400 transition-colors hover:text-gray-600 absolute left-8 top-[70%] p-4 bg-white shadow-lg rounded-full"
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
            className="size-6 stroke-2 text-gray-400 transition-colors hover:text-gray-600 absolute right-8 top-[70%] p-4 bg-white shadow-lg rounded-full"
          />
        </div>
      </div>
    </>
  );
}
