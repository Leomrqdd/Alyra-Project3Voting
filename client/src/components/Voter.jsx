const Voter = () => {
  let ProposalsTabActive = false;
  let resultsTabActive = false;

  const activateProposalsTab = () => {
    ProposalsTabActive = true;
    resultsTabActive = false;
  };

  const activateResultsTab = () => {
    ProposalsTabActive = false;
    resultsTabActive = true;
  };

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
          className={tabItemClass(ProposalsTabActive)}
          onClick={activateProposalsTab()}
        >
          Proposals
        </li>
        <li
          key={"Results"}
          className={tabItemClass(resultsTabActive)}
          onClick={activateResultsTab()}
        >
          Results
        </li>
      </ul>
      <div className="mt-4 flex w-full items-center justify-center rounded-xl bg-white p-8 sm:col-span-2 min-h-[400px]">
        <p className="font-medium text-gray-600">Content</p>
      </div>
    </div>
  );
};

export default Voter;
