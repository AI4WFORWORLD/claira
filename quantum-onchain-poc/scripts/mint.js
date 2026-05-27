const hre = require("hardhat");

async function main() {
  const contractAddress = "0xCbE0F785EDc2d823a44d5DB44C8099407000B843";
  
  const QuantumFNFT = await hre.ethers.getContractAt("QuantumFNFT", contractAddress);
  const [signer] = await hre.ethers.getSigners();

  console.log(`Minting Token ID 0 to: ${signer.address}...`);

  const structuralMetadata = JSON.stringify({
    asset_id: "QM1-001",
    ownership: "0.05%",
    legal_vehicle: "Quantum M1 SPV",
    last_verified: "2026-05-27T16:00:00Z",
    claira_endpoint: "ONCHAIN_RESOLVER",
  });

  const tx = await QuantumFNFT.mintInstitutionalFNFT(
    signer.address,
    structuralMetadata,
    "QM1-001",
    450000,   // NOI
    9450,     // Occupancy 94.50%
    135,      // DSCR 1.35x
    125000    // Cashflow
  );
  
  console.log(`TX sent: ${tx.hash}`);
  console.log("Waiting for confirmation...");
  await tx.wait();
  console.log("🎉 Token Minted successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
