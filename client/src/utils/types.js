// export class Voter {
//   constructor(address, isRegistered, hasVoted, votedProposalId) {
//     this.address = address;
//     this.isRegistered = isRegistered;
//     this.hasVoted = hasVoted;
//     this.votedProposalId = votedProposalId;
//   }
// }

export class Voter {
  constructor(address) {
    this.address = address;
  }
}

export class Proposal {
  constructor(description, voteCount) {
    this.description = description;
    this.voteCount = voteCount;
  }
}
