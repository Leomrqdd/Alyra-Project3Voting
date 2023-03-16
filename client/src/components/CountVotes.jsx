import useVoting from "../contexts/VotingContext/useVoting";

function CountVotes() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();

  const countVotes = async () => {
    await contract.methods.tallyVotes().send({ from: accounts[0] });
  };

  return (
    <div>
      <button onClick={countVotes}>CountAllTheVotes</button>
    </div>
  );
}

export default CountVotes;
