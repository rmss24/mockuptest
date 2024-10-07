"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faArrowRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import Select, { MultiValue } from "react-select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type OptionType = {
  value: number;
  label: string;
};

type FilterPanelProps = {
  adultsCounter: number;
  setAdultsCounter: React.Dispatch<React.SetStateAction<number>>;
  childrenCounter: number;
  setChildrenCounter: React.Dispatch<React.SetStateAction<number>>;
  infantsCounter: number;
  setInfantsCounter: React.Dispatch<React.SetStateAction<number>>;
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  handleChange: (event: Event, newValue: number | number[]) => void;
  multiSelected: MultiValue<OptionType>;
  setMultiSelected: React.Dispatch<
    React.SetStateAction<MultiValue<OptionType>>
  >;
  selectOptions: OptionType[];
  selectedLocation: string | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string | null>>;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  adultsCounter,
  setAdultsCounter,
  childrenCounter,
  setChildrenCounter,
  infantsCounter,
  setInfantsCounter,
  value,
  setValue,
  handleChange,
  multiSelected,
  setMultiSelected,
  selectOptions,
  selectedLocation,
  setSelectedLocation,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([]);

  const handleIdeaClick = (idea: string) => {
    if (selectedIdeas.includes(idea)) {
      setSelectedIdeas(selectedIdeas.filter((selected) => selected !== idea));
    } else {
      setSelectedIdeas([...selectedIdeas, idea]);
    }
  };

  const handleCurrencyClick = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const locations = [
    { id: 1, name: "Nord Sicilia" },
    { id: 2, name: "Sud Sicilia" },
    { id: 3, name: "Ovest Sicilia" },
    { id: 4, name: "Est Sicilia" },
  ];

  const valuetext = (value: number) => `${value}`;

  const resetFilters = () => {
    setAdultsCounter(1);
    setChildrenCounter(0);
    setInfantsCounter(0);
    setValue([0, 10000]);
    setSelectedIdeas([]);
    setSelectedLocation(null);
    setMultiSelected([]);
    setSelectedCurrency(null);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 rounded-md rotate-90 w-32 uppercase tracking-wide xl:flex items-center group fixed top-1/2 transform -translate-y-1/2 left-0 hidden"
      >
        Filter Search
        <span className="ml-5 group-hover:m-0 transition-all">
          <hr className="bg-yellow-gold w-12 h-1" />
        </span>
      </button>
      <button
        onClick={handleButtonClick}
        className="px-2 py-2 rounded-sm bg-grey-light w-40 uppercase tracking-wide   top-1/2 xl:hidden order-first mb-8"
      >
        Filtro
      </button>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-white transition-opacity duration-500 ${
            isOpen ? "opacity-70" : "opacity-0"
          } z-10`}
        ></div>
      )}

      <div
        ref={panelRef}
        className={`fixed top-0 left-0 h-full xl:w-[55%] w-full bg-white z-20  transform transition-transform duration-500 shadow-xl overflow-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-10 flex justify-between items-center">
          <p className="text-3xl text-center font-bold flex-grow">Filtro</p>
          <FontAwesomeIcon
            icon={faClose}
            className="cursor-pointer absolute right-8 h-8"
            onClick={handleButtonClick}
          />
        </div>
        <hr className="my-2 w-full" />
        <div className="mt-10 px-6">
          <p className="text-grey mb-4">Villa ideas</p>
          <div className="grid grid-cols-3 2xl:grid-cols-6">
            {["Pool", "Luxury", "Seaview", "Couples", "Large", "Family"].map(
              (idea, index) => (
                <button
                  key={index}
                  className={`py-3 border-[0.5px] transition-colors 2xl:mt-0 ${
                    selectedIdeas.includes(idea)
                      ? "bg-blue text-white"
                      : "bg-white"
                  } border-gray-300 mx-1 hover:bg-blue-light hover:text-white`}
                  onClick={() => handleIdeaClick(idea)}
                >
                  {idea}
                </button>
              )
            )}
          </div>

          <div className="mt-10">
            <p className="my-4 text-gray-400">Experiences</p>
            <Select
              isMulti
              name="experiences"
              value={multiSelected}
              onChange={(e) => setMultiSelected(e)}
              options={selectOptions}
              styles={{
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: "#64b4fa",
                  borderRadius: 9999,
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              }}
            />
          </div>
        </div>
        <hr className="mt-10 w-full" />

        <div className="mt-10 grid grid-cols-2 px-6">
          <div className="col-span-2 xl:col-span-1 mr-0 xl:mr-12">
            <Listbox value={selectedLocation} onChange={setSelectedLocation}>
              <label className="block text-sm font-medium leading-6 text-gray-400">
                Choose a zone
              </label>
              <div className="relative mt-2">
                <ListboxButton className="relative p-[1.2rem] w-full cursor-default rounded-md bg-grey-light py-1.5 pr-32 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <span className="block truncate">
                      {selectedLocation || "Select location"}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {locations.map((location) => (
                    <ListboxOption
                      key={location.id}
                      value={location.name}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "bg-blue-light" : ""
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {location.name}
                            </span>
                          </div>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <CheckIcon
                                className="h-5 w-5 text-blue"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div className="col-span-2 xl:col-span-1 mr-0 xl:mr-12xl:mt-0 mt-4 lg:mt-0">
            <Listbox>
              <label className="block text-sm font-medium leading-6 text-gray-400">
                Search by Airport
              </label>
              <div className="relative mt-2">
                <ListboxButton className="relative w-full p-[1.2rem] cursor-default rounded-md bg-grey-light pr-32 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue sm:text-sm sm:leading-6">
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  <ListboxOption
                    key={""}
                    value={""}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                        {""}
                      </span>
                    </div>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                      <CheckIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-grey mt-10">
              Data di inizio
            </label>
            <div className="relative">
              <input
                type="date"
                name="date-start"
                id="date-start"
                autoComplete="given-date-start"
                required
                className="block w-full appearance-none bg-grey-light px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
                onClick={(e) => e.currentTarget.showPicker()}
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-500 text-grey"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-grey mt-10">
              Data di fine
            </label>
            <div className="relative ">
              <input
                type="date"
                name="date-end"
                id="date-end"
                autoComplete="given-date-end"
                required
                className="block w-full appearance-none bg-grey-light px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
                onClick={(e) => e.currentTarget.showPicker()}
              />
            </div>
          </div>
          <div className="md:flex lg:col-span-1 col-span-2">
            <div className="">
              <label className="block text-sm font-medium leading-6 text-grey mt-10">
                Adulto
              </label>
              <div className="flex justify-between">
                <div className="bg-grey-light py-2 pr-5 flex items-center justify-between w-full">
                  <span className="ml-4 xl:mr-12 mr-0 text-lg">
                    {adultsCounter}
                  </span>
                  <div className="flex">
                    <button
                      onClick={() => setAdultsCounter(adultsCounter - 1)}
                      className="py-1 px-2 border-2 border-l-grey rounded-full ml-2"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-grey" />
                    </button>
                    <button
                      onClick={() => setAdultsCounter(adultsCounter + 1)}
                      className="py-1 px-2 border-2 border-l-grey rounded-full ml-2"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-grey" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grey mt-10">
                Bambino
              </label>
              <div className="flex justify-between">
                <div className="bg-grey-light py-2 pr-5 flex items-center justify-between w-full">
                  <span className="ml-4 mr-12 text-lg">{childrenCounter}</span>
                  <div className="flex">
                    <button
                      onClick={() => setChildrenCounter(childrenCounter - 1)}
                      className="py-1 px-2 border-2 border-l-grey rounded-full ml-2"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-grey" />
                    </button>
                    <button
                      onClick={() => setChildrenCounter(childrenCounter + 1)}
                      className="py-1 px-2 border-2 border-l-grey rounded-full ml-2"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-grey" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-grey mt-10">
                Neonato
              </label>
              <div className="flex justify-between">
                <div className="bg-grey-light py-2 pr-5 flex items-center justify-between w-full">
                  <span className="ml-4 mr-12 text-lg">{infantsCounter}</span>
                  <div className="flex">
                    <button
                      onClick={() => setInfantsCounter(infantsCounter - 1)}
                      className="py-1 px-2 border-2 border-l-grey rounded-full ml-2"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-grey" />
                    </button>
                    <button
                      onClick={() => setInfantsCounter(infantsCounter + 1)}
                      className="py-1 px-2 border-2 border-l-grey rounded-full ml-2"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-grey" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 col-span-2">
            <div className="mt-10">
              <p className="text-grey">Currency</p>
              <div>
                <button
                  className={`px-4 py-2 border-[1px] transition-colors ${
                    selectedCurrency === "€"
                      ? "bg-blue text-white"
                      : "bg-grey-light hover:bg-grey"
                  }`}
                  onClick={() => handleCurrencyClick("€")}
                >
                  €
                </button>
                <button
                  className={`px-4 py-2 border-[1px] transition-colors ${
                    selectedCurrency === "$"
                      ? "bg-blue text-white"
                      : "bg-grey-light hover:bg-grey"
                  }`}
                  onClick={() => handleCurrencyClick("$")}
                >
                  $
                </button>
                <button
                  className={`px-4 py-2 border-[1px] transition-colors ${
                    selectedCurrency === "£"
                      ? "bg-blue text-white"
                      : "bg-grey-light hover:bg-grey"
                  }`}
                  onClick={() => handleCurrencyClick("£")}
                >
                  £
                </button>
                <button
                  className={`px-4 py-2 border-[1px] transition-colors ${
                    selectedCurrency === "¥"
                      ? "bg-blue text-white"
                      : "bg-grey-light hover:bg-grey"
                  }`}
                  onClick={() => handleCurrencyClick("¥")}
                >
                  ¥
                </button>
              </div>
            </div>
            <div className="mt-10 col-span-3">
              <p className="text-gray-400 mb-4">Budget</p>
              <Box sx={{ width: "100%" }}>
                <Slider
                  getAriaLabel={() => "Budget"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={0}
                  max={10000}
                  sx={{
                    "& .MuiSlider-rail": {
                      backgroundColor: "lightgrey",
                    },
                  }}
                />
              </Box>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 bg-white border-t-2 z-10 flex justify-center">
          <div className="items-center justify-center space-y-4 p-4  flex lg:grid w-full lg:w-1/4 order-first">
            <button
              className="text-yellow-gold tracking-wide uppercase mt-4 mr-4"
              onClick={resetFilters}
            >
              Reset filter
            </button>
            <button
              className="py-5 px-12 bg-yellow-gold hover:bg-yellow-600 transition lg:order-first order-last"
              onClick={() => setIsOpen(false)}
            >
              <p className="uppercase text-white tracking-wide">Apply filter</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
