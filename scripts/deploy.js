const { ethers } = require("hardhat");

async function main() {
  const router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const dalle = "0xD9BF83790A3fBD7125F655acc9b2B899aC813F55";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const DALLE_INU_MINT_FACTORY = await hre.ethers.getContractFactory(
    "DALLE_INU_MINT_FACTORY"
  );
  const dalleNFT = await DALLE_INU_MINT_FACTORY.deploy(dalle, router, USDC);
  await dalleNFT.deployed();
  console.log("DALLE INU MINT FACTORY deployed to:", dalleNFT.address);

  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await dalleNFT.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
  await run(`verify:verify`, {
    address: dalleNFT.address,
    constructorArguments: [dalle, router, USDC],
  });

  console.log("DALLE INU MINT FACTORY verified");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
