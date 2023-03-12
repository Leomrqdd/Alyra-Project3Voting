import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function AddVoter() {
  const { state: { contract, accounts, web3} } = useEth();
  const [inputAddress, setInputAddress] = useState("");
  const [eventValue,setEventValue] = useState("");
  const [oldEvents,setOldEvents] = useState();

  const handleAddressChange = e => {
    setInputAddress(e.target.value);
  };


  useEffect(() => {
    (async function () {
 
       let oldEvents= await contract.getPastEvents('VoterRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        let oldies=[];
        oldEvents.forEach(event => {
            oldies.push(event.returnValues.voterAddress);
        });
        setOldEvents(oldies);
 
        await contract.events.VoterRegistered({fromBlock:"earliest"})
        .on('data', event => {
          let lesevents = event.returnValues.voterAddress;
          setEventValue(lesevents);
        })          
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])








  const addVoter = async () => {
    if (!web3.utils.isAddress(inputAddress)) {
      alert("invalid address")
    }
    await contract.methods.addVoter(inputAddress).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <input
        type="text"
        placeholder="address"
        value={inputAddress}
        onChange={handleAddressChange}
      />
      <button onClick={addVoter} className="addVoter-btn">
        addVoter
      </button>
      <div>
      {eventValue && <div>Voter added: {eventValue}</div>}
        <br/>
        <div>
        <p>List of Voters:</p>
        {oldEvents && oldEvents.map((event, index) => (
        <p key={index}>Voter {index+1}: {event}</p>
        ))}
        </div>
    </div>
  </div>
    

  );
}

export default AddVoter;