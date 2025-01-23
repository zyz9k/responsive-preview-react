import React from "react";
import { Star } from "lucide-react";

const PropertyCard = () => {
  return (
    <div className="@container bg-white">
      <div className="grid gap-10 rounded-t-2xl @4xl:grid-cols-2 @4xl:px-20 @4xl:py-8 @4xl:pb-10">
        <div className="flex flex-1 flex-col">
          <div className="hidden relative mb-4 overflow-hidden rounded-lg @container/media @4xl:relative">
            <div className="grid grid-cols-1 gap-2 @sm:grid-cols-4">
              <img
                src="https://tailwindcss.com/_next/static/media/responsive-1.fd2e9248.png"
                className="h-48 w-full rounded-lg bg-gray-950/5 object-cover @sm:col-span-2 @sm:h-40"
              />
              <img
                src="https://tailwindcss.com/_next/static/media/responsive-2.8cfea49d.png"
                className="col-span-2 h-48 w-full rounded-lg bg-gray-950/5 object-cover @sm:hidden @md:col-span-1 @sm:h-40"
              />
              <img
                src="https://tailwindcss.com/_next/static/media/responsive-3.e7467feb.png"
                className="h-48 w-full rounded-lg bg-gray-950/5 object-cover @md:hidden @sm:h-40"
              />
            </div>
            <div className="absolute inset-0  flex-col justify-end gap-2 bg-gradient-to-b from-transparent via-transparent to-gray-950 p-6 hidden @sm:flex">
              <span className="text-sm font-semibold text-white/80">
                Entire house
              </span>
              <span className="text-xl font-semibold text-white">
                Beach House on Lake Huron
              </span>
            </div>
          </div>
        </div>

        <div className="hidden grid-cols-4 grid-rows-2 gap-2 @4xl:grid">
          <img
            alt=""
            src="https://tailwindcss.com/_next/static/media/responsive-1.fd2e9248.png"
            className="col-span-4 h-[150px] w-full rounded-lg bg-gray-950/5 object-cover @6xl:col-span-2 @6xl:row-span-2 @6xl:aspect-square @6xl:h-[308px]"
          />
          <img
            alt=""
            src="https://tailwindcss.com/_next/static/media/responsive-2.8cfea49d.png"
            className="col-span-2 h-[150px] w-full rounded-lg bg-gray-950/5 @6xl:aspect-square @6xl:col-span-1"
          />
          <img
            alt=""
            src="https://tailwindcss.com/_next/static/media/responsive-3.e7467feb.png"
            className="col-span-2 h-[150px] w-full rounded-lg bg-gray-950/5 @6xl:aspect-square @6xl:col-span-1"
          />
          <div className="hidden @6xl:contents">
            <img
              alt=""
              src="https://tailwindcss.com/_next/static/media/responsive-4.8e943ba2.png"
              className="aspect-square h-[150px] rounded-lg bg-gray-950/5"
            />
            <img
              alt=""
              src="https://tailwindcss.com/_next/static/media/responsive-5.660185c2.png"
              className="aspect-square h-[150px] rounded-lg bg-gray-950/5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
