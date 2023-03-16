import { useContext } from "react";
import VotingContext from "./VotingContext";

const useVoting = () => useContext(VotingContext);

export default useVoting;
