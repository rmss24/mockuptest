"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FilterPanel from "@/app/components/filterPanel";
import { MultiValue } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faBed,
  faBath,
} from "@fortawesome/free-solid-svg-icons";

type OptionType = {
  value: number;
  label: string;
};

type DataType = {
  id: number;
  nome: string;
  capacita: {
    adulti: number;
    bambini: number;
    neonati: number;
    bagni: number;
  };
  descrizione: string;
  esperienze: string[];
  prezzo: number;
  image: string;
  location: string;
};

export default function Search() {
  const Data: DataType[] = require("@/app/api/data.json");
  const [adultsCounter, setAdultsCounter] = useState(0);
  const [childrenCounter, setChildrenCounter] = useState(0);
  const [infantsCounter, setInfantsCounter] = useState(0);
  const [value, setValue] = useState<number[]>([0, 50000]);
  const [multiSelected, setMultiSelected] = useState<MultiValue<OptionType>>(
    []
  );
  const [filteredData, setFilteredData] = useState<DataType[]>(Data);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const items = [
    { id: 1, name: "Cooking Experience" },
    { id: 2, name: "Outdoor Adventures" },
    { id: 3, name: "Cultural Tours" },
    { id: 4, name: "Wine Tasting" },
    { id: 5, name: "Beach Activities" },
  ];

  const selectOptions = items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    const newData = Data.filter((item) => {
      const adultMatch =
        adultsCounter === 0 || item.capacita.adulti === adultsCounter;
      const childrenMatch =
        childrenCounter === 0 || item.capacita.bambini === childrenCounter;
      const infantsMatch =
        infantsCounter === 0 || item.capacita.neonati === infantsCounter;

      const experienceMatch =
        multiSelected.length > 0
          ? multiSelected.every((exp) => item.esperienze.includes(exp.label))
          : true;

      const budgetMatch = item.prezzo >= value[0] && item.prezzo <= value[1];
      const locationMatch =
        !selectedLocation || item.location === selectedLocation;

      return (
        adultMatch &&
        childrenMatch &&
        infantsMatch &&
        experienceMatch &&
        budgetMatch &&
        locationMatch
      );
    });

    setFilteredData(newData);
  }, [
    adultsCounter,
    childrenCounter,
    infantsCounter,
    multiSelected,
    value,
    selectedLocation,
    location,
  ]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Villas in Sicily</h1>
        <FilterPanel
          adultsCounter={adultsCounter}
          setAdultsCounter={setAdultsCounter}
          childrenCounter={childrenCounter}
          setChildrenCounter={setChildrenCounter}
          infantsCounter={infantsCounter}
          setInfantsCounter={setInfantsCounter}
          value={value}
          setValue={setValue}
          handleChange={handleChange}
          multiSelected={multiSelected}
          setMultiSelected={setMultiSelected}
          selectOptions={selectOptions}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <div className="grid lg:grid-cols-2 gap-4 mt-8 mx-5 lg:mx-20">
          {filteredData.map((item: DataType, index: number) => (
            <div
              key={index}
              className="max-w-lg overflow-hidden shadow-lg relative group"
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.nome}
                  className="w-full h-[25rem] object-cover hover:h-[28rem] transition-all"
                  width={400}
                  height={250}
                />
                <div className="absolute bottom-0 left-0 right-0 text-white p-4 backdrop-blur-sm bg-white/10">
                  <h2 className="text-lg font-bold">{item.nome}</h2>
                  <p className="text-sm">{item.descrizione}</p>
                </div>
              </div>

              <div className="p-4 bg-white">
                <div className="lg:flex justify-between items-center">
                  <h1 className="font-bold text-sm">
                    From <span className="text-xl ml-2">{item.prezzo}</span>/per
                    Week
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">
                      <FontAwesomeIcon icon={faPeopleGroup} />{" "}
                      {item.capacita.adulti +
                        item.capacita.bambini +
                        item.capacita.neonati}
                    </span>
                    <span className="text-gray-500 text-xs">
                      <FontAwesomeIcon icon={faBed} /> {item.capacita.adulti}
                    </span>
                    <span className="text-gray-500">
                      <FontAwesomeIcon icon={faBath} /> {item.capacita.bagni}
                    </span>
                  </div>
                </div>
                <div className="bg-grey-light">
                  <p className="text-sm text-gray-500 mt-2 p-2">
                    {item.esperienze.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
