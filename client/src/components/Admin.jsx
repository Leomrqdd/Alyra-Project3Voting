import { useState } from "react";
import AddVoter from "./UI/AddVoter";
import Results from "../components/UI/Results"


const Admin = () => {
  const [activeTab, setActiveTab] = useState({
    voters: true,
    results: false,
  });

  const tabItemClass = (tabItem) => {
    return tabItem
      ? "flex rounded-lg p-2 font-bold bg-gray-800 text-white cursor-pointer"
      : "flex rounded-lg bg-gray-100 p-2 font-bold text-gray-600 hover:bg-gray-800 hover:text-white cursor-pointer";
  };

  return (
    <div className="w-full md:justify-evenly ">
      <ul className="text-white md:flex hidden list-none flex-row justify-evenly items-center flex-initial">
        <li
          key={"Voters"}
          className={tabItemClass(activeTab.voters)}
          onClick={() =>
            setActiveTab({
              voters: true,
              results: false,
            })
          }
        >
          Voters
        </li>
        <li
          key={"Results"}
          className={tabItemClass(activeTab.results)}
          onClick={() =>
            setActiveTab({
              voters: false,
              results: true,
            })
          }
        >
          Results
        </li>
      </ul>
      {activeTab.voters && (
        <div className="mt-4 flex w-full items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
          <AddVoter/>
        </div>
      )}
      {activeTab.results && (
        <div className="mt-4 flex w-full items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
          <Results/>
        </div>
      )}
    </div>
  );
};

export default Admin;
