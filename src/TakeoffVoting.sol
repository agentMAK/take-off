// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.18;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract VotingContract   {

	Struct Interval {
		uint256 startTime;
		uint256 endTime;
		uint totalProposals;
	}

	Struct Proposal {
		address proposer;
		int256 result;
		mapping(address => uint256) totalVotes;
	}

	Proposal[] public proposals;

	//@notice Total proposals of a user
	mapping(address => uint256[]) userProposals;

    /// @notice Flag indicating whether the votes are open or not
    bool public votesOpen;

    /// @notice Timestamp of the votes next closing date and time
    uint256 public votesClosingTime;

///EVENTS///

    event ProposalCreated(uint256 proposalId, address indexed proposer);
    event Voted(address indexed voter, uint256 indexed proposalId, bool option);

	constructor() {}

///EXTERNAL FUNCTIONS///

	   /// @notice Opens the lottery for receiving bets
    function openVotes(uint256 closingTime) external onlyOwner whenBetsClosed {
        require(
            closingTime > block.timestamp,
            "Closing time must be in the future"
        );
        votesClosingTime = closingTime;
        votesOpen = true;
    }

	//@notice Function to vote on a proposal of a user (only when voting period starts)
	function vote(bool option, uint256 proposalId) external whenBetsOpen {
		require(proposalId < userProposals.length, "Proposal does not exist");
		require(StakingContract.votingPower(msg.sender > 0));

		uint256 votingPower = StakingContract.votingPower(msg.sender);
		Proposal memory proposal = proposals[proposalId];
		proposal.result += votingPower * (option ? 1 : -1); 

	} 


///MODIFIERS///

    /// @notice When votes are at closed state
    modifier whenVotesClosed() {
        require(!votesOpen, "Lottery is open");
        _;
    }

    /// @notice Passes when the lottery is at open state and the current block timestamp is lower than the lottery closing date
    modifier whenBetsOpen() {
        require(
            votesOpen && block.timestamp < betsClosingTime,
            "Lottery is closed"
        );
        _;
    }
}