import { useState, useEffect } from "react";
import useVoting from "../../contexts/VotingContext/useVoting";

function AddVoter() {
  const {
    state: { contract, accounts, web3 },
  } = useVoting();
  const [inputAddress, setInputAddress] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  const handleAddressChange = (e) => {
    setInputAddress(e.target.value);
  };

  useEffect(() => {
    (async function () {
      let oldEvents = await contract.getPastEvents("VoterRegistered", {
        fromBlock: 0,
        toBlock: "latest",
      });
      let oldies = [];
      oldEvents.forEach((event) => {
        oldies.push(event.returnValues.voterAddress);
      });
      setOldEvents(oldies);

      await contract.events
        .VoterRegistered({ fromBlock: "earliest" })
        .on("data", (event) => {
          let lesevents = event.returnValues.voterAddress;
          setEventValue(lesevents);
        })
        .on("changed", (changed) => console.log(changed))
        .on("error", (err) => console.log(err))
        .on("connected", (str) => console.log(str));
    })();
  }, [contract]);

  const addVoter = async () => {
    if (!web3.utils.isAddress(inputAddress)) {
      alert("invalid address");
    }
    await contract.methods.addVoter(inputAddress).send({ from: accounts[0] });
  };

  return (
    <div className="w-1/2 p-4" >
    <div className="flex relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="address"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
        value={inputAddress}
        onChange={handleAddressChange}
      />
      <button 
      className="bg-teal-500 px-7 border-transparent rounded-md cursor-pointer hover:bg-teal-700 mx-4 flex justify-center items-center"
      onClick={addVoter}
      >
      <span className="text-white whitespace-nowrap">Add Voter</span>
      </button>
      </div>

      <div>
        {eventValue && 
        <div class="text-gray-600 mb-2 italic">
        Voter added: {eventValue}
        </div>
        }

        <br />

        <p class="text-gray-600 mb-2 italic">List of Voters:</p>
          {oldEvents &&
            oldEvents.map((event, index) => (
              <p className="text-gray-600 mb-2 italic" key={index}>
                Voter {index + 1}: {event}
              </p>
            ))}
        </div>
      </div>
  );
}

export default AddVoter;
