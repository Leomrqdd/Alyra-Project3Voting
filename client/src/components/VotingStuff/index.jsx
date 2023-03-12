import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";
import AddVoter from "./AddVoter";
import StartProposalRegistration from "./StartProposalRegistration";
import AddProposal from "./AddProposal"
import EndProposalRegistration from "./EndProposalRegistration";
import StartVotingSession from "./StartVotingSession";
import Vote from "./Vote";
import EndVotingSession from "./EndVotingSession";
import CountVotes from "./CountVotes";
import Results from "./Results";
import GetProposal from "./GetProposal";
import Workflow from "./Workflow";
import ContractAddress from "./ContractAddress";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function VotingStuff() {

    const {state: {contract, accounts} } = useEth();
    const [userType, setUserType] = useState('');


    const handleUserTypeChange = (newUserType) => {
    
      setUserType(newUserType);
    };
    
    return (
        
        <div className="VotingStuff"> 

        <div className="btn-group" role="group" aria-label="Basic example">
        <button className="btn btn-primary" onClick={() => handleUserTypeChange('owner')}>
        You are the owner of the Contract
        </button>
        <button className="btn btn-primary" onClick={() => handleUserTypeChange('voter')}>
        You are a Voter
        </button>
        <button className="btn btn-primary" onClick={() => handleUserTypeChange('normal')}>
        You are a simple User
        </button>
        </div>

        {userType === 'owner' && (
        <div>
        <p>You are the owner of the contract.</p>
        <Address accounts={accounts}/>
        <ContractAddress/>
        <Workflow/>
        <AddVoter/>
        <StartProposalRegistration/>
        <AddProposal/>
        <GetProposal/>
        <EndProposalRegistration/>
        <StartVotingSession/>
        <Vote/>
        <EndVotingSession/>
        <CountVotes/>
        <Results/>
        </div>

      )}
      {userType === 'voter' && (
        <div>
        <p>You are a Voter.</p>
        <Address accounts={accounts}/>
        <ContractAddress/>
        <Workflow/>
        <AddProposal/>
        <GetProposal/>
        <Vote/>
        <Results/>
        </div>

      )}
      {userType === 'normal' && (
        <div>
        <p>You are a simple user.</p>
        <Address accounts={accounts}/>
        <ContractAddress/>
        <Workflow/>
        <Results/>
        </div>
      )}
        </div>
    );

}


export default VotingStuff;