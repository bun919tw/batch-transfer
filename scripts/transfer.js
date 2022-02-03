const { ethers } = require("hardhat");
const nftAbi = require('../abi/nft');

const gasLimit = 250000;
const gasPrice = 40e9; // 40 Gwei

const nftAddress = '0xdC0479CC5BbA033B3e7De9F178607150B3AbCe1f'; // Crypto Unicorns
const destinationAddress = '';

async function main() {
  const signers = await ethers.getSigners();

  // TODO: Could make it async.
  for (const signer of signers) {
    const nft = new ethers.Contract(nftAddress, nftAbi, signer);
    const bal = await nft.balanceOf(signer.address);
    if (bal.gt(0)) {
      const tokenIds = [];
      for (let i = 0; i < bal.toNumber(); i++) {
        const tokenId = await nft.tokenOfOwnerByIndex(signer.address, i);
        tokenIds.push(tokenId);
      }

      const txCount = await signer.getTransactionCount();
      for (let i = 0; i < bal.toNumber(); i++) {
        const tokenIdNum = tokenIds[i].toNumber();
        await nft.safeTransferFrom(signer.address, destinationAddress, tokenIds[i], {nonce: txCount + i, gasLimit: gasLimit, gasPrice: gasPrice});
        console.log('tokenId', tokenIdNum, 'transfer done!');
      }
    } else {
      console.log(signer.address, 'has zero balance');
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
