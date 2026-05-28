const hre = require("hardhat");

async function main() {
  const contractAddress = "0xCbE0F785EDc2d823a44d5DB44C8099407000B843";
  const QuantumFNFT = await hre.ethers.getContractAt("QuantumFNFT", contractAddress);
  const [signer] = await hre.ethers.getSigners();

  console.log(`Minting Real Estate Portfolio to: ${signer.address}...`);

  // Asset 1: QM1-001 (New values) -> Will be Token ID 1
  const meta1 = JSON.stringify({
    asset_id: "QM1-001",
    ownership: "100%",
    legal_vehicle: "Fideicomiso Hotel Feeling",
    last_verified: new Date().toISOString(),
    claira_endpoint: "ONCHAIN_RESOLVER",
  });
  let tx = await QuantumFNFT.mintInstitutionalFNFT(
    signer.address, meta1, "QM1-001",
    1125000, // NOI
    8250,    // Occupancy 82.50%
    145,     // DSCR 1.45x
    281250   // Cashflow
  );
  await tx.wait();
  console.log("🎉 Minted QM1-001 (Hotel Feeling)");

  // Asset 2: QM1-002 -> Will be Token ID 2
  const meta2 = JSON.stringify({
    asset_id: "QM1-002",
    ownership: "100%",
    legal_vehicle: "Quantum M1 SPV",
    last_verified: new Date().toISOString(),
    claira_endpoint: "ONCHAIN_RESOLVER",
  });
  tx = await QuantumFNFT.mintInstitutionalFNFT(
    signer.address, meta2, "QM1-002",
    1729000, // NOI
    9410,    // Occupancy 94.10%
    138,     // DSCR 1.38x
    432250   // Cashflow
  );
  await tx.wait();
  console.log("🎉 Minted QM1-002 (Plaza Comercial Alcala)");

  // Asset 3: QM1-003 -> Will be Token ID 3
  const meta3 = JSON.stringify({
    asset_id: "QM1-003",
    ownership: "100%",
    legal_vehicle: "JHC-IND-001 Trust",
    last_verified: new Date().toISOString(),
    claira_endpoint: "ONCHAIN_RESOLVER",
  });
  tx = await QuantumFNFT.mintInstitutionalFNFT(
    signer.address, meta3, "QM1-003",
    845500,  // NOI
    10000,   // Occupancy 100.00%
    162,     // DSCR 1.62x
    211375   // Cashflow
  );
  await tx.wait();
  console.log("🎉 Minted QM1-003 (Bodega Industrial JHC)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
