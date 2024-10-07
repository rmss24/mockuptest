import Image from "next/image";
import Link from "next/link";
import SicilianMapImage from "@/app/assest/images/sicilyMap.png";
export default function SicilianVillas() {
  return (
    <div className="relative isolate overflow-hidden mt-14 lg:mx-20 mx-4">
      <div className=" grid">
        <div className="text-left 2xl:w-1/2">
          <h1 className="mt-2 text-4xl font-bold  text-gray-900 sm:text-4xl">
            Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel
            augue laoreet rutrum.
          </h1>
          <p className="lm:w-4/5 mb-6 text-base leading-6 text-gray-600 mt-10">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget lacinia odio sem nec elit. Sed posuere consectetur est at
            lobortis. Duis mollis, est non commodo luctus, nisi erat porttitor
            ligula, eget lacinia odio sem nec elit. Fusce dapibus, tellus ac
            cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
            justo sit amet risus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit
          </p>
          <div className="mt-10">
            <p className="lm:w-4/5 mb-6 text-base leading-6 text-gray-600 mt-10">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Fusce dapibus, tellus ac cursus
              commodo, tortor mauris condimentum nibh, ut fermentum massa justo
              sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </p>
          </div>
          <Link href={"/search"}>
            <button className="bg-blue-500 rounded-md uppercase tracking-wide flex items-center group 2xl:mb-40">
              Villas in Sicily
              <span className="ml-5 group-hover:m-0 transition-all">
                <hr className="bg-yellow-gold w-12 h-1" />
              </span>
            </button>
          </Link>
        </div>
      </div>
      <Image
        src={SicilianMapImage}
        alt="Sicily's Map with any villas"
        className="absolute w-[20rem] sm:w-[40rem] right-0 top-0 hidden 2xl:block"
        width={2432}
        height={1542}
      />
    </div>
  );
}
