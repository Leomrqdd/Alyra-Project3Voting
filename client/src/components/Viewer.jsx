import Results from "./UI/Results";

const Viewer = () => {
  return (
    <div className="w-full md:justify-evenly ">
      <ul className="text-white md:flex hidden list-none flex-row justify-evenly items-center flex-initial">
        <li className="flex rounded-lg p-2 font-bold bg-gray-800 text-white cursor-pointer">
          Results
        </li>
      </ul>
      <div className="mt-4 flex w-full items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
        <Results/>
      </div>
    </div>
  );
};

export default Viewer;
