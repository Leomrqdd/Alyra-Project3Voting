import { useState } from "react";
import AddProposal from "../components/UI/AddProposal"
import ProposalsList from "./UI/ProposalsList";
import Results from "./UI/Results";
import Vote from "./UI/Vote";



const Voter = () => {
  const [activeTab, setActiveTab] = useState({
    voters: false,
    proposals: true,
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
          key={"Votes"}
          className={tabItemClass(activeTab.voters)}
          onClick={() =>
            setActiveTab({
              voters: true,
              proposals: false,
              results: false,
            })
          }
        >
          Votes
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
        <Vote/>
        </div>
      )}
      {activeTab.proposals && (
        <div className="mt-4 flex-col items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
        <AddProposal/>
        <ProposalsList/>
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

export default Voter;
