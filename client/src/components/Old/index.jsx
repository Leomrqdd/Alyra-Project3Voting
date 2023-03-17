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
    const [userType, setUserType] = useState('normal');
    const [web3Enabled, setWeb3Enabled] = useState(false);


    useEffect(() => {

      const checkUserType = async () => {
        if (contract && accounts) {

          const isOwner = await contract.methods.getOwner().call({ from: accounts[0] });
          if (isOwner === accounts[0]) {
            setUserType('owner');
          } else {
            const isVoter = await contract.methods.getVoterBool(accounts[0]).call({ from: accounts[0] });
            if (isVoter) {
              setUserType('voter');
            } else {
              setUserType('normal');
            }
          }
      }
      }
      checkUserType();
    }, [contract, accounts]);

    useEffect(() => {
      const checkWeb3 = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            setWeb3Enabled(true);
          } catch (error) {
            console.log(error);
          }
        }
      };
      checkWeb3();
    }, []);
    
    return (
        
        <div className="VotingStuff"> 

        {!web3Enabled && <p>Please connect to Metamask</p>}

        {userType === 'owner' && web3Enabled && (
        <div>
        <p>You are the owner of the contract.</p>
        <Address accounts={accounts}/>
        <ContractAddress/>
        <Workflow/>
        <AddVoter/>
        <StartProposalRegistration/>
        <EndProposalRegistration/>
        <StartVotingSession/>
        <EndVotingSession/>
        <CountVotes/>
        <Results/>
        </div>

      )}
      {userType === 'voter' && web3Enabled && (
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
      {userType === 'normal' && web3Enabled && (
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