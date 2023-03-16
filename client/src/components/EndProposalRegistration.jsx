import useVoting from "../contexts/VotingContext/useVoting";

function EndProposalRegistration() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();

  const endProposalRegistration = async () => {
    await contract.methods
      .endProposalsRegistering()
      .send({ from: accounts[0] });
  };

  return (
    <div>
      <button onClick={endProposalRegistration}>EndProposalRegistration</button>
    </div>
  );
}

export default EndProposalRegistration;
