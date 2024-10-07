"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faXmark,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Image from "next/image";
import HeroImage from "@/app/assest/images/sicilyvilla.jpg";
import SicilianVillas from "./sections/SicilianVillas";
import PercheSceglierci from "./sections/PercheSceglierci";
import NextDestination from "./sections/NextDestination";
import Reviews from "./sections/Reviews";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:mx-20">
        <div className="relative isolate overflow-hidden h-[90vh] group">
          <button onClick={() => setOpen(true)} className="h-full w-full">
            <Image
              src={HeroImage}
              alt="Sicilian Villa"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-black opacity-10 group-hover:opacity-60 transition-opacity duration-300" />
            <FontAwesomeIcon
              icon={faPlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-20 text-white group-hover:text-yellow-gold transition-colors"
            />
            <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36 lg:px-8 mt-20">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:max-w-none lg:items-center">
                <h2 className="text-center font-bold tracking-tight text-white text-4xl">
                  Egestas Pharetra Vestibulum Magna Sit
                </h2>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faArrowDown}
              className="mx-auto w-8 h-4/5 text-white z-10"
            />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <SicilianVillas />
        <PercheSceglierci />
        <NextDestination />
        <Reviews />
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative my-auto transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-1 text-left shadow-xl transition-all sm:my-8 sm:max-w-5xl">
                  <div>
                    <button className="w-full flex rounded-full p-1 text-gray-500 hover:text-gray-600">
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="ml-auto size-6"
                        onClick={() => setOpen(false)}
                      />
                    </button>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/2vXI5EgprFs?si=8Uwt3gn84cXxgHRM"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
