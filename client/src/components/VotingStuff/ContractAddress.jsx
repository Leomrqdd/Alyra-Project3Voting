import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function ContractAddress() {
    const {state : {contract}} = useEth();
    const [contractAddress,setContractAddress] = useState("");

    useEffect(() => {

        const fetchContractAddress = async() => {
            const address = await contract.options.address;
            setContractAddress(address);
        };
        fetchContractAddress();
    },[contract]);


    return(
        <div>
        <p>Contract Address : <pre>{contractAddress}</pre> </p>    
        </div>
    );

};

export default ContractAddress;
