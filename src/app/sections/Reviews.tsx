import Image from "next/image";
import {
  faAngleUp,
  faAngleDown,
  faStar as faStarSolid,
  faStarHalfStroke,
  faQuoteLeft,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigationSteps } from "@/app/components/NavigationSteps";

import TheGuradianLogo from "@/app/assest/images/The_Guardian_2018.png";

export default function Reviews() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  const paragraphs = [
    {
      id: 0,
      content:
        "We thoroughly enjoyed our holiday in Sicily and were very pleased with our stay at Alesa. It's also the best one and the local office, Guissi and Domineco were always quick to respond and very helpful. soloSicily provide an excellent service. Thank you.",
      user: "Mario Rossi",
      logo: "",
      star: 4,
    },
    {
      id: 1,
      content:
        "The Guardian discovers south Sicily's secrets during a week's stay at Casa d'Eraclea. Quiet beaches, fresh seafood, picturesque towns and impressive ancient monuments all combine to create a wonderful week in southern Sicily",
      user: "",
      logo: TheGuradianLogo,
      star: 4,
    },
    {
      id: 2,
      content:
        "Odio taciti class ullamcorper ad vitae penatibus. Magnis interdum non sem metus sit id ante sem.  netus posuere. Est pharetra elit magna fusce cubilia in vehicula. Sit dui nec ut suscipit efficitur venenatis felis pretium luctus. Varius praesent pretium dui vestibulum hendrerit fermentum. Pellentesque etiam elementum gravida metus semper. Torquent suspendisse id massa consectetur donec metus.",
      user: "Odio Taciti",
      logo: "",
      star: 4.5,
    },
    {
      id: 3,
      content:
        "Arcu pulvinar dolor molestie duis faucibus. Curabitur curabitur consectetur lobortis finibus dolor curae; finibus viverra ante. Maximus laoreet purus posuere in proin tincidunt dictumst penatibus. Elit placerat bibendum arcu facilisi sociosqu dui elit maximus. Ut dolor nec; ut consequat luctus purus id torquent. Commodo imperdiet tempor id; consectetur class augue volutpat imperdiet.",
      user: "Arcu Pulvinar",
      logo: "",
      star: 3,
    },
    {
      id: 4,
      content:
        "Libero taciti nisi nulla nullam dictum inceptos quisque mauris. Feugiat euismod quam leo curae eleifend eget natoque. Euismod per efficitur parturient auctor sem venenatis. Felis netus suspendisse cras penatibus hendrerit rhoncus porta dapibus malesuada. Malesuada per rutrum bibendum erat maecenas nascetur magna sit porttitor. Fames consectetur nulla faucibus nunc; duis ipsum sagittis.",
      user: "Libero Taciti",
      logo: "",
      star: 3.5,
    },
    {
      id: 5,
      content:
        "Lorem justo egestas facilisis sollicitudin; etiam morbi vestibulum ultrices. Pharetra metus praesent diam feugiat magna sapien ridiculus nascetur. Lorem sem condimentum dignissim quisque rutrum natoque gravida. Ut nostra varius eget blandit cubilia dis. Magnis ex sociosqu lorem et, senectus curabitur pellentesque justo himenaeos. Gravida dui est finibus nam fusce hac rhoncus morbi venenatis.",
      user: "Lorem Justo",
      logo: "",
      star: 5,
    },
  ];

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
      prevIndex + 1 > paragraphs.length - 1 ? 0 : prevIndex + 1
    );
  }

  function PreviousItem() {
    setSelectedItem((prevIndex) =>
      prevIndex - 1 < 0 ? paragraphs.length - 1 : prevIndex - 1
    );
  }

  const startIdx = 0;
  const endIdx = 2;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FontAwesomeIcon
              key={`full-${i}`}
              icon={faStarSolid}
              className="text-yellow-500 m-auto"
            />
          ))}

        {halfStar && (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className="text-yellow-500 m-auto"
          />
        )}

        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FontAwesomeIcon
              key={`empty-${i}`}
              icon={faStarRegular}
              className="text-yellow-500 m-auto"
            />
          ))}
      </div>
    );
  };

  return (
    <>
      <div className="absolute xl:top-[80%] top-[85%]  left-[-25%] w-[150%] h-[35rem] bg-grey-light transform rotate-12 -z-10" />
      <div className="my-60 p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-5 md:mx-20 hidden xl:grid">
        <div className="m-auto">
          <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-grey" />
          <h1 className="mt-2 text-2xl font-bold w-full text-gray-900 sm:text-4xl">
            What they say{" "}
            <span className="bg-blue-light/50 h-6 inline-block align-baseline mt-auto">
              about ?
            </span>
          </h1>
        </div>

        {paragraphs.slice(startIdx, endIdx).map((para, idx) => (
          <div key={idx} className="mt-10">
            <p className="mb-4 text-gray-700 italic">{para.content}</p>
            <div className="flex items-center">
              {renderStars(para.star)}
              {para.logo ? (
                <Image
                  src={para.logo}
                  alt={`${para.user}'s logo`}
                  className="ml-5 w-24 h-12 sm:w-48 sm:h-16"
                />
              ) : (
                <p className="ml-5 font-semibold">{para.user}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div ref={ref} className="xl:hidden relative my-40 mx-5">
        <div className="m-auto">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="text-3xl text-grey h-20"
          />
          <h1 className="mt-2 font-bold w-1/2 text-gray-900 text-4xl text-center">
            What they say{" "}
            <span className="bg-blue-light/50 h-6 inline-block align-baseline mt-auto">
              about ?
            </span>
          </h1>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="p-4"
          >
            <p className="mb-4 text-gray-700 italic text-center w-1/2 flex m-auto">
              {paragraphs[selectedItem].content}
            </p>
            <div className="flex justify-center">
              {renderStars(paragraphs[selectedItem].star)}
              {paragraphs[selectedItem].logo ? (
                <Image
                  src={paragraphs[selectedItem].logo}
                  alt={`${paragraphs[selectedItem].user}'s logo`}
                  className="ml-5 w-24 h-12"
                />
              ) : (
                <p className="ml-5 font-semibold text-center">
                  {paragraphs[selectedItem].user}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex cursor-pointer justify-center">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => PreviousItem()}
            className="text-gray-400 transition-colors hover:text-gray-600 p-4 bg-white shadow-lg rounded-full absolute left-8 top-[70%]"
          />
          <NavigationSteps
            className="mt-6"
            selectedItem={selectedItem}
            setselectedItem={setSelectedItem}
            list={paragraphs}
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => NextItem()}
            className="text-gray-400 transition-colors hover:text-gray-600 p-4 bg-white shadow-lg rounded-full absolute right-8 top-[70%]"
          />
        </div>
      </div>
    </>
  );
}
