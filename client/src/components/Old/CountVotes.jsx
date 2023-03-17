import useEth from "../../contexts/EthContext/useEth";

function CountVotes() {
  const { state: { contract, accounts, web3 } } = useEth();

  const countVotes = async () => {
    await contract.methods.tallyVotes().send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={countVotes} className="countVotes-btn">
        CountAllTheVotes
      </button>
    </div>
  );
}

export default CountVotes;