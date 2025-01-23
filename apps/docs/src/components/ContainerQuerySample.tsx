export default function ContainerQuerySample() {
  return (
    <div className="twp @container flex items-center bg-blue-200 p-4 max-h-48 overflow-scroll">
      <div className="flex items-center justify-center w-full gap-6">
        <div className="flex flex-col bg-blue-200 @md:bg-orange-200 @lg:bg-pink-400 @xl:bg-yellow-300">
          <p className="text-base font-bold text-pretty">Rajiv S</p>
          <p className="text-xs text-mono-2">Open Source Developer</p>
          <div className="p-20">Hello</div>
        </div>
      </div>
    </div>
  );
}
