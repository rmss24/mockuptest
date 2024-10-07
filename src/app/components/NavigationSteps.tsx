import { BaseList } from "@/lib/types/types";
import { Dispatch, SetStateAction } from "react";

export function NavigationSteps({
  className,
  list,
  selectedItem,
  setselectedItem,
}: {
  className: string;
  selectedItem: number;
  setselectedItem: Dispatch<SetStateAction<number>>;
  list: BaseList[];
}) {
  return (
    <nav
      className={`${className} flex items-center justify-center`}
      aria-label="Progress"
    >
      <ol role="list" className="flex items-center space-x-5">
        {list.map((item) => (
          <li key={item.id}>
            {item.id === selectedItem ? (
              <button
                onClick={() => setselectedItem(item.id)}
                className="relative flex items-center justify-center"
                aria-current="step"
              >
                <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                  <span className="h-full w-full rounded-full bg-blue-light/50" />
                </span>
                <span
                  className="relative block h-2.5 w-2.5 rounded-full bg-brand-blue-400"
                  aria-hidden="true"
                />
              </button>
            ) : (
              <button
                onClick={() => setselectedItem(item.id)}
                className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
              ></button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
