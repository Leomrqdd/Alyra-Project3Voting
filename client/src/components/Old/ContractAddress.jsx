import useEth from "../../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function ContractAddress() {
    const {state : {contract}} = useEth();
    const [contractAddress,setContractAddress] = useState("");

    useEffect(() => {

        const fetchContractAddress = async() => {
            if (contract) {
                 const address = await contract.options.address;
                setContractAddress(address);
            }
        };
        fetchContractAddress();
    },[contract]);


    return(
        <div className="addr">
            The Contract Address is :
            <br />
            {contract && <pre>{contractAddress}</pre>}
        </div>
    );

};

export default ContractAddress;
