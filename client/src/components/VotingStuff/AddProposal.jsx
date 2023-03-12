import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function AddProposal() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [inputProposal, setInputProposal] = useState("");
  const [eventValue,setEventValue] = useState("");
  const [oldEvents,setOldEvents] = useState();


  const handleInputChange = e => {
    setInputProposal(e.target.value);
  };



  const addProposal = async () => {
    await contract.methods.addProposal(inputProposal).send({ from: accounts[0] });
  };


  useEffect(() => {
    (async function () {
 
       let oldEvents= await contract.getPastEvents('ProposalRegistered', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        let oldies=[];
        oldEvents.forEach(event => {
            oldies.push(event.returnValues.proposalId);
        });
        setOldEvents(oldies);
 
        await contract.events.ProposalRegistered({fromBlock:"earliest"})
        .on('data', event => {
          let lesevents = event.returnValues.proposalId;
          setEventValue(lesevents);
        })          
        .on('changed', changed => console.log(changed))
        .on('error', err => console.log(err))
        .on('connected', str => console.log(str))
    })();
  }, [contract])


  return (
    <div className="btns">
      <input
        type="text"
        placeholder="string"
        value={inputProposal}
        onChange={handleInputChange}
      />
      <button onClick={addProposal} className="addProposal-btn">
        AddOneProposal
      </button>
      <div>
       Proposal Id added: {eventValue} 
         <br/>
        <div>
        {oldEvents && (
         <p>Number of Proposals added: {oldEvents.length}</p>
         )}
        </div>
    </div>
</div>
  );
}

export default AddProposal;