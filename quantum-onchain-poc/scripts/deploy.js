const hre = require("hardhat");

async function main() {
  console.log("Deploying 100% On-Chain QuantumFNFT...");

  const QuantumFNFT = await hre.ethers.getContractFactory("QuantumFNFT");
  const contract = await QuantumFNFT.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`\n✅ Contract successfully deployed to: ${contractAddress}`);

  // 1. Core Structural Metadata Schema (Token URI JSON)
  const structuralMetadata = JSON.stringify({
    asset_id: "QM1-001",
    ownership: "0.05%",
    legal_vehicle: "Quantum M1 SPV",
    last_verified: "2026-05-27T16:00:00Z",
    claira_endpoint: "ONCHAIN_RESOLVER",
  });

  // 2. Financial Indicators (To be stored as raw contract variables)
  const noi = 450000; // $450,000 USD
  const occupancy = 9450; // 94.50%
  const dscr = 135; // 1.35x
  const cashflow = 125000; // $125,000 USD

  const [signer] = await hre.ethers.getSigners();
  console.log(`\nMinting Token ID 0 to: ${signer.address}...`);

  const tx = await contract.mintInstitutionalFNFT(
    signer.address,
    structuralMetadata,
    "QM1-001",
    noi,
    occupancy,
    dscr,
    cashflow
  );
  await tx.wait();

  console.log(
    "🎉 Token Minted successfully! Financials are baked into the block."
  );
  console.log(`Transaction Hash: ${tx.hash}`);

  // Print the contract address prominently for the frontend
  console.log("\n========================================");
  console.log("  COPY THIS INTO frontend/index.html:");
  console.log(`  CONTRACT_ADDRESS = "${contractAddress}"`);
  console.log("========================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
