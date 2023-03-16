import { useState } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { BsCheckSquareFill } from "react-icons/bs";
import useVoting from "../../contexts/VotingContext/useVoting";

const ChangStatusBtn = ({ workflowStatus }) => {
  const [votingEnded, setVotingEnded] = useState(false);
  const {
    state: { contract, accounts },
  } = useVoting();

  const startProposalRegistration = async () => {
    await contract.methods
      .startProposalsRegistering()
      .send({ from: accounts[0] });
  };
  const endProposalRegistration = async () => {
    await contract.methods
      .endProposalsRegistering()
      .send({ from: accounts[0] });
  };
  const startVotingSession = async () => {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
  };
  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
  };
  const tallyVotes = async () => {
    setVotingEnded(true);
    await contract.methods.tallyVotes().send({ from: accounts[0] });
  };
  const computeActionLabel = () => {
    switch (workflowStatus) {
      case "0":
        startProposalRegistration();
        break;
      case "1":
        endProposalRegistration();
        break;
      case "2":
        startVotingSession();
        break;
      case "3":
        endVotingSession();
        break;
      case "4":
        tallyVotes();
        break;
      default:
        tallyVotes();
    }
  };

  return (
    <>
      {!votingEnded && (
        <button
          className="bg-teal-500 py-1 px-7 rounded-md cursor-pointer hover:bg-teal-700 mx-4 md:flex flex flex-col items-center"
          onClick={() => computeActionLabel()}
        >
          <TbPlayerTrackNextFilled color="white" fontSize={30} />
          <span>Next session</span>
        </button>
      )}
      {votingEnded && (
        <button
          className="bg-[#737373] py-2 px-7 rounded-full cursor-pointer hover:bg-[#575757] mx-4 md:flex flex flex-col items-center"
          disabled={true}
        >
          <BsCheckSquareFill color="#9afa9a" fontSize={25} />
          <span>Results available</span>
        </button>
      )}
    </>
  );
};

export default ChangStatusBtn;
