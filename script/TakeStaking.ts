// deployAndInteract.ts

import { ethers } from "hardhat";

async function main() {
  // Deploy StakingContract
  const StakingContract = await ethers.getContractFactory("StakingContract");
  const cUSDTokenAddress = "";

  const stakingContract = await StakingContract.deploy(cUSDTokenAddress);
  await stakingContract.deployed();
  
  console.log("StakingContract deployed to:", stakingContract.address);

  // Interact with StakingContract
  const [deployer, user] = await ethers.getSigners();

  // Transfer cUSD tokens to the user
  const cUSDToken = await ethers.getContractAt("IERC20", cUSDTokenAddress);
  await cUSDToken.connect(deployer).transfer(user.address, ethers.utils.parseEther("100"));

  // Approve StakingContract to spend user's tokens
  await cUSDToken.connect(user).approve(stakingContract.address, ethers.utils.parseEther("1"));

  // User stakes 1 cUSD token
  await stakingContract.connect(user).stake();
  console.log("User staked 1 cUSD token");

  // Check user's voting power
  const userVotingPower = await stakingContract.votingPower(user.address);
  console.log("User voting power:", userVotingPower.toNumber());

  // Wait for 7 days
  await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
  await ethers.provider.send("evm_mine");

  // User withdraws deposited cUSD tokens
  await stakingContract.connect(user).withdraw(ethers.utils.parseEther("1"));
  console.log("User withdrew 1 cUSD token");

  // Check user's voting power after withdrawal
  const userVotingPowerAfterWithdrawal = await stakingContract.votingPower(user.address);
  console.log("User voting power after withdrawal:", userVotingPowerAfterWithdrawal.toNumber());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
