import useEth from "../../contexts/EthContext/useEth";


function Address() {
    const {state : {accounts}} = useEth();

    return (
        <div className="addr">
            Your eth address is :
            <br />
            {accounts && accounts[0] && <pre>{accounts[0]}</pre>}
        </div>
        );
    };


export default Address;