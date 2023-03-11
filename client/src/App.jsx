import { EthProvider } from "./contexts/EthContext";
import VotingStuff from "./components/VotingStuff";


function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <VotingStuff/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
