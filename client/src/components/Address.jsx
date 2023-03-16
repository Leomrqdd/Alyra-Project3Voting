import useVoting from "../contexts/VotingContext/useVoting";

function Address() {
  const {
    state: { accounts },
  } = useVoting();

  return (
    <div>
      Your Eth Address is :
      <br />
      {accounts && accounts[0] && <pre>{accounts[0]}</pre>}
    </div>
  );
}

export default Address;
