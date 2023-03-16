import useVoting from "../contexts/VotingContext/useVoting";

function EndVotingSession() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();

  const endVotingSession = async () => {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
  };

  return (
    <div>
      <button onClick={endVotingSession}>EndVotingSession</button>
    </div>
  );
}

export default EndVotingSession;
