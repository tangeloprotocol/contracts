const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Tangelo Integration tests", function () {
  let tangelo;
  let owner, lenderA, lenderB, borrower;

  describe("Tangelo", function () {
    it("Should deploy Sample NFT projects", async function () {
      const SampleNFT = await ethers.getContractFactory("SampleNFT");
      nftCollection = await SampleNFT.deploy();
      const SampleNFT2 = await ethers.getContractFactory("SampleNFT2");
      nftCollection2 = await SampleNFT2.deploy();
    });
    it("Should deploy Tangelo", async function () {
      const Tangelo = await ethers.getContractFactory("Tangelo");
      tangelo = await Tangelo.deploy();
      let accounts = await ethers.getSigners();
      owner = accounts[0];
      lenderA = accounts[1];
      lenderB = accounts[2];
      borrower = accounts[3];
    });

    describe("Simulate NFT loans with mulitple parties", async function () {
      it("Should distribute earnings correctly", async function () {
      expect(await tangelo.balanceOf(lenderA.address)).to.equal(0);
      // Liquidity providers deposit unevenly into vault
      const depositAmount = ethers.utils.parseEther("8.00");
      await tangelo.connect(lenderA).depositFunds({value: depositAmount})
      const depositAmount2 = ethers.utils.parseEther("2.00");
      await tangelo.connect(lenderB).depositFunds({value: depositAmount2})
      // Owner whitelists NFTs
      const loanAmount = ethers.utils.parseEther("1.00");
      const interestAmount = 1000; // 10%
      await tangelo.connect(owner).whitelistCollection(nftCollection.address, loanAmount, interestAmount);
      // borrower takes a loan
      const tokenId = 1;
      await nftCollection.awardItem(borrower.address, tokenId);
      await nftCollection.connect(borrower).setApprovalForAll(tangelo.address, true);
      await tangelo.connect(borrower).takeLoan(nftCollection.address, tokenId);
      await tangelo.connect(borrower).repayLoanForNFT(nftCollection.address, tokenId, {value: ethers.utils.parseEther("1.10")});
      expect(await ethers.provider.getBalance(tangelo.address)).to.equal(ethers.utils.parseEther("10.1"));
      expect(await tangelo.getAmountAvailableToWithdraw(lenderA.address)).to.equal(ethers.utils.parseEther("8.08"));
      expect(await tangelo.getPricePerShare()).to.equal(ethers.utils.parseEther("1.01"));
      const withdrawAmount1 = ethers.utils.parseEther("8.08");
      await tangelo.connect(lenderA).withdrawFunds(withdrawAmount1);
      const withdrawAmount2 = ethers.utils.parseEther("2.02");
      await tangelo.connect(lenderB).withdrawFunds(withdrawAmount2);
      expect(await tangelo.balanceOf(lenderA.address)).to.equal(0);
      expect(await tangelo.balanceOf(lenderB.address)).to.equal(0);
      expect(await tangelo.getVaultBalance()).to.equal(0);
    })

    // it("Handles complex sequences of deposits and withdraws", async function () {
    //   const depositAmount = ethers.utils.parseEther("8.00");
    //   await tangelo.connect(lenderA).depositFunds({value: depositAmount})
    // })


  })


  });
});
