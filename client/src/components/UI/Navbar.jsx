import {
  AiOutlineUsergroupDelete,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle, BsFillWalletFill } from "react-icons/bs";
import { shortenAddress } from "../../utils/shortenAddress";
import { getStatusMessage } from "../../utils/computeStatus";
import ChangStatusBtn from "./ChangStatusBtn";

const Navbar = ({ userType, web3Enabled, userAddress, workflowStatus }) => {
  return (
    <nav className="w-full md:justify-evenly p-4 bg-gray-800">
      <ul className="text-white md:flex hidden list-none flex-row justify-evenly items-center flex-initial">
        <li className="mx-4 md:flex flex flex-col items-center">
          {userType === "owner" && web3Enabled && (
            <>
              <RiAdminLine
                color="white"
                fontSize={50}
                className="pb-2"
                onClick={() => {}}
              />
              <span className="text-white">Admin</span>
            </>
          )}
          {userType === "voter" && web3Enabled && (
            <>
              <AiOutlineUsergroupAdd
                color="white"
                fontSize={50}
                className="pb-2"
                onClick={() => {}}
              />
              <span className="text-white">Voter</span>
            </>
          )}
          {userType === "viewer" && web3Enabled && (
            <>
              <AiOutlineUsergroupDelete
                color="white"
                fontSize={50}
                className="pb-2"
                onClick={() => {}}
              />
              <span className="text-white">Viewer</span>
            </>
          )}
        </li>
        {userType === "owner" && web3Enabled && (
          <li className="mx-4 md:flex flex flex-col items-center">
            <ChangStatusBtn workflowStatus={workflowStatus} />
          </li>
        )}
        {web3Enabled && (
          <li className="mx-4 md:flex flex flex-col items-center">
            <BsInfoCircle color="white" fontSize={40} className="pb-2" />
            <span className="text-white">
              {getStatusMessage(workflowStatus)}
            </span>
          </li>
        )}
        <li className="mx-4 md:flex flex flex-col items-center">
          <SiEthereum color="white" fontSize={40} className="pb-2" />
          <span className="text-white">{shortenAddress(userAddress)}</span>
        </li>
        {web3Enabled ? (
          <li className="mx-4 md:flex flex flex-col items-center">
            <BsFillWalletFill color="#9afa9a" fontSize={40} className="pb-2" />
            <span className="text-white">Connected</span>
          </li>
        ) : (
          <li className="mx-4 md:flex flex flex-col items-center">
            <BsFillWalletFill color="#f96a8a" fontSize={40} className="pb-2" />
            <span className="text-white">Not connected</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
