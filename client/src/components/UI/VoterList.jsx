import { useReducer, useState } from "react";
import useVoting from "../../contexts/VotingContext/useVoting";
import { reducer, initialState } from "../../contexts/VotingContext/state";

const VoterList = () => {
  const {
    state: { contract, accounts, web3, VoterList },
  } = useVoting();
  const [inputAddress, setInputAddress] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();

  const [state, dispatch] = useReducer(reducer, initialState);
  const addVoter = (voter) => dispatch({ type: "ADD_VOTER", payload: voter });

  const onSubmit = (e) => {
    addVoter({
      address: inputAddress,
    });

    e.preventDefault();
    // history.push("/");
  };

  console.log(state.voterList);

  return (
    <div className="min-w-full">
      <form className="px-32" onSubmit={onSubmit}>
        <label
          htmlFor="address"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Add voter address
        </label>
        <div className="flex relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="address"
            id="address"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
            placeholder="0x..."
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
          />
          <button
            className="bg-teal-500 px-7 border-transparent rounded-md cursor-pointer hover:bg-teal-700 mx-4 flex"
            onClick={() => setInputAddress(inputAddress)}
          >
            <span className="text-white">Register address</span>
          </button>
        </div>
      </form>
      <div className="pt-5">
        {state.voterList.length > 0 && (
          <ul>
            <>
              {state.voterList.map((voter) => (
                <li key={voter.address}>{voter.address}</li>
              ))}
            </>
          </ul>
        )}
      </div>
    </div>
  );
};

export default VoterList;
