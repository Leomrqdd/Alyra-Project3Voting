import useEth from "../../contexts/EthContext/useEth";


function Address() {
    const {state : {accounts}} = useEth();

    return (
        <div className="addr">
            Votre address eth:
            <br />
            {accounts && accounts[0] && <pre>{accounts[0]}</pre>}
        </div>
        );
    };


export default Address;