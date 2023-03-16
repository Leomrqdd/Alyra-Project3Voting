import { useState } from "react";
import VoterList from "../components/UI/VoterList";

const Admin = () => {
  const [activeTab, setActiveTab] = useState({
    voters: true,
    proposals: false,
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
              proposals: false,
              results: false,
            })
          }
        >
          Voters
        </li>
        <li
          key={"Proposals"}
          className={tabItemClass(activeTab.proposals)}
          onClick={() =>
            setActiveTab({
              voters: false,
              proposals: true,
              results: false,
            })
          }
        >
          Proposals
        </li>
        <li
          key={"Results"}
          className={tabItemClass(activeTab.results)}
          onClick={() =>
            setActiveTab({
              voters: false,
              proposals: false,
              results: true,
            })
          }
        >
          Results
        </li>
      </ul>
      {activeTab.voters && (
        <div className="mt-4 flex w-full items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
          <VoterList />
        </div>
      )}
      {activeTab.proposals && (
        <div className="mt-4 flex w-full items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
          <p className="font-medium text-gray-600">Proposals Content</p>
        </div>
      )}
      {activeTab.results && (
        <div className="mt-4 flex w-full items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
          <p className="font-medium text-gray-600">Results Content</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
