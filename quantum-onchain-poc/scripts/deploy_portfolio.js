const hre = require("hardhat");

async function main() {
  console.log("Deploying 100% On-Chain QuantumFNFT with Real Estate Portfolio...");

  const QuantumFNFT = await hre.ethers.getContractFactory("QuantumFNFT");
  const contract = await QuantumFNFT.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`\n✅ Contract successfully deployed to: ${contractAddress}`);

  const [signer] = await hre.ethers.getSigners();
  console.log(`\nMinting Real Estate Portfolio to: ${signer.address}...\n`);

  // Asset 1: QM1-001
  const meta1 = JSON.stringify({
    asset_id: "QM1-001",
    ownership: "100%",
    legal_vehicle: "Fideicomiso Hotel Feeling",
    last_verified: new Date().toISOString(),
    claira_endpoint: "ONCHAIN_RESOLVER",
  });
  let tx = await contract.mintInstitutionalFNFT(
    signer.address, meta1, "QM1-001",
    1125000, // NOI
    8250,    // Occupancy 82.50%
    145,     // DSCR 1.45x
    281250   // Cashflow
  );
  await tx.wait();
  console.log("🎉 Token ID 0 Minted: QM1-001 (Hotel Feeling)");

  // Asset 2: QM1-002
  const meta2 = JSON.stringify({
    asset_id: "QM1-002",
    ownership: "100%",
    legal_vehicle: "Quantum M1 SPV",
    last_verified: new Date().toISOString(),
    claira_endpoint: "ONCHAIN_RESOLVER",
  });
  tx = await contract.mintInstitutionalFNFT(
    signer.address, meta2, "QM1-002",
    1729000, // NOI
    9410,    // Occupancy 94.10%
    138,     // DSCR 1.38x
    432250   // Cashflow
  );
  await tx.wait();
  console.log("🎉 Token ID 1 Minted: QM1-002 (Plaza Comercial Alcala)");

  // Asset 3: QM1-003
  const meta3 = JSON.stringify({
    asset_id: "QM1-003",
    ownership: "100%",
    legal_vehicle: "JHC-IND-001 Trust",
    last_verified: new Date().toISOString(),
    claira_endpoint: "ONCHAIN_RESOLVER",
  });
  tx = await contract.mintInstitutionalFNFT(
    signer.address, meta3, "QM1-003",
    845500,  // NOI
    10000,   // Occupancy 100.00%
    162,     // DSCR 1.62x
    211375   // Cashflow
  );
  await tx.wait();
  console.log("🎉 Token ID 2 Minted: QM1-003 (Bodega Industrial JHC)");

  console.log("\n========================================");
  console.log("  COPY THIS INTO frontend/index.html:");
  console.log(`  const CONTRACT_ADDRESS = "${contractAddress}";`);
  console.log("========================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
