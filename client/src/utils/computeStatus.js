export const getStatusMessage = (input) => {
  let voteStatusMessage = "";
  switch (input) {
    case "0":
      voteStatusMessage = "Voters registration is in progress";
      break;
    case "1":
      voteStatusMessage = "Proposals registration is open";
      break;
    case "2":
      voteStatusMessage = "Proposals registration is closed";
      break;
    case "3":
      voteStatusMessage = "Voting session is in progress";
      break;
    case "4":
      voteStatusMessage = "Voting session is closed";
      break;
    case "5":
      voteStatusMessage = "Votes have been tallied";
      break;
    default:
      voteStatusMessage = "Unknown workflow status";
  }
  return voteStatusMessage;
};

// export const getStatusAction = (input) => {
//   let voteStatusMessage = "";
//   switch (input) {
//     case "0":
//       voteStatusMessage = "Start proposals registration session";
//       break;
//     case "1":
//       voteStatusMessage = "End proposals registration session";
//       break;
//     case "2":
//       voteStatusMessage = "Start voting session";
//       break;
//     case "3":
//       voteStatusMessage = "End voting session";
//       break;
//     case "4":
//       voteStatusMessage = "Tally votes";
//       break;
//     case "5":
//       voteStatusMessage = "Results are available";
//       break;
//     default:
//       voteStatusMessage = "Unknown workflow status";
//   }
//   return voteStatusMessage;
// };
