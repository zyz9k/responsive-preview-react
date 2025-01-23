import React from "react";
import {
  BookOpen,
  Clock,
  User,
  Share2,
  Award,
  Target,
  Heart,
  Star,
} from "lucide-react";

const ContainerQueryCardModern = () => {
  return (
    <div className="@container">
      <div
        className="flex flex-col p-4 bg-slate-200 dark:bg-slate-800
          @xs:bg-red-200 @xs:dark:bg-red-800
          @sm:bg-orange-200 @sm:dark:bg-orange-800
          @md:bg-yellow-200 @md:dark:bg-yellow-800
          @lg:bg-green-200 @lg:dark:bg-green-800
          @xl:bg-teal-200 @xl:dark:bg-teal-800
          @2xl:bg-cyan-200 @2xl:dark:bg-cyan-800
          @3xl:bg-blue-200 @3xl:dark:bg-blue-800
          @4xl:bg-indigo-200 @4xl:dark:bg-indigo-800
          @5xl:bg-purple-200 @5xl:dark:bg-purple-800
          @6xl:bg-pink-200 @6xl:dark:bg-pink-800
          @7xl:bg-rose-200 @7xl:dark:bg-rose-800"
      >
        <div
          className="flex flex-col gap-2 
          @xs:flex-row @xs:items-center @xs:justify-between
          @2xl:gap-4"
        >
          <h2
            className="w-2/3 h-8 rounded bg-gray-500 dark:bg-gray-600 font-bold 
            text-base
            @xs:text-lg 
            @sm:text-xl
            @md:text-2xl
            @lg:text-3xl
            @xl:text-4xl"
          ></h2>

          <p
            className="w-1/4 h-6 rounded bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400
            text-xs
            @sm:text-sm
            @md:text-base
            @lg:text-lg"
          ></p>
        </div>

        <div
          className="mt-4 grid gap-4
          grid-cols-1
          @xs:grid-cols-2
          @md:grid-cols-3
          @xl:grid-cols-4
          @3xl:grid-cols-6
          @5xl:grid-cols-8"
        >
          <StatCard icon={BookOpen} label="Pages Read" value="127" />
          <StatCard icon={Clock} label="Time Spent" value="2.5h" />
          <StatCard icon={User} label="Streak" value="7 days" />
          <StatCard icon={Share2} label="Shares" value="12" />
          <StatCard icon={Award} label="Achievements" value="5" />
          <StatCard icon={Target} label="Goals Met" value="3/5" />
          <StatCard icon={Heart} label="Favorites" value="15" />
          <StatCard icon={Star} label="Rating" value="4.8" />
        </div>

        <div className="hidden @4xl:block mt-6">
          <div
            className="grid gap-4
            @4xl:grid-cols-2
            @5xl:grid-cols-3
            @6xl:grid-cols-4"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 rounded bg-white/50 dark:bg-black/50">
                <h3 className="w-full h-6 mb-2 font-semibold bg-gray-500 dark:bg-gray-600 rounded"></h3>
                <p
                  className="w-1/4 h-6 rounded bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400
                  text-xs
                  @sm:text-sm
                  @md:text-base
                  @lg:text-lg"
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value }) => (
  <div
    className="p-3 rounded bg-white/50 dark:bg-black/50 transition-all duration-200
    @xs:p-4
    @lg:p-5
    @4xl:p-6"
  >
    <div
      className="flex items-center gap-2 
      @2xl:gap-3"
    >
      <div
        className="min-w-4 min-h-4 
        @sm:min-w-5 @sm:min-h-5
        @xl:min-w-6 @xl:min-h-6
        bg-gray-200 dark:bg-gray-800"
      ></div>

      <div
        className="w-48 h-3 rounded bg-gray-500 dark:bg-gray-600 text-xs font-medium
        @sm:text-sm
        @xl:text-base"
      ></div>
    </div>

    <div
      className="mt-2 w-full h-12 font-bold bg-gray-800 dark:bg-gray-950
      text-lg
      @sm:text-xl
      @xl:text-2xl
      @4xl:text-3xl"
    ></div>
  </div>
);

export default ContainerQueryCardModern;
