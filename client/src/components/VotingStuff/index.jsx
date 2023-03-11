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



function VotingStuff() {

    const {state: {contract, accounts} } = useEth();
    const [userType, setUserType] = useState('');


    const handleUserTypeChange = (newUserType) => {
    
      setUserType(newUserType);
    };
    
    return (
        <div className="VotingStuff"> 
        <button onClick={() => handleUserTypeChange('owner')}>
        Je suis le créateur du contrat
        </button>
        <button onClick={() => handleUserTypeChange('voter')}>
        Je suis un voteur
        </button>
        <button onClick={() => handleUserTypeChange('normal')}>
        Je suis un utilisateur normal
        </button>

        {userType === 'owner' && (
        <div>
        <p>Vous êtes le créateur du contrat.</p>
        <Address accounts={accounts}/>
        <AddVoter/>
        <StartProposalRegistration/>
        <AddProposal/>
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
        <p>Vous êtes un voteur.</p>
        <Address accounts={accounts}/>
        <AddProposal/>
        <Vote/>
        <Results/>
        </div>

      )}
      {userType === 'normal' && (
        <div>
        <p>Vous êtes un utilisateur normal.</p>
        <Address accounts={accounts}/>
        <Results/>
        </div>
      )}
        </div>
    );

}


export default VotingStuff;