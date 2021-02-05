// erc20.test.js
const { BN, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const ERC20 = artifacts.require('ERC20Token');
contract('ERC20', function (accounts) {
const _name = 'ALYRA';
const _symbol = 'ALY';
const _initialsupply = new BN(1000);
const _decimals = new BN(18);
const owner = accounts[0];
const recipient = accounts[1];
const recipient2 = accounts[2];

 beforeEach(async function () {
 this.ERC20Instance = await ERC20.new(_initialsupply,{from: owner});
 });

it('a un nom', async function () {
 expect(await this.ERC20Instance.name()).to.equal(_name);
});
it('a un symbole', async function () {
 expect(await this.ERC20Instance.symbol()).to.equal(_symbol);
});
it('a une valeur décimal', async function () {
 expect(await this.ERC20Instance.decimals()).to.be.bignumber.equal(_decimals);
});
it('vérifie la balance du propriétaire du contrat', async function (){
 let balanceOwner = await this.ERC20Instance.balanceOf(owner);
 let totalSupply = await this.ERC20Instance.totalSupply();
expect(balanceOwner).to.be.bignumber.equal(totalSupply);
});
it('vérifie si un transfer est bien effectué', async function (){
 let balanceOwnerBeforeTransfer = await this.ERC20Instance.balanceOf(owner);
 let balanceRecipientBeforeTransfer = await this.ERC20Instance.balanceOf(recipient);
 let amount = new BN(10);
 await this.ERC20Instance.transfer(recipient, amount, {from: owner});
 let balanceOwnerAfterTransfer = await this.ERC20Instance.balanceOf(owner);
 let balanceRecipientAfterTransfer = await this.ERC20Instance.balanceOf(recipient);
 
 expect(balanceOwnerAfterTransfer).to.be.bignumber.equal(balanceOwnerBeforeTransfer.sub(amount));
 expect(balanceRecipientAfterTransfer).to.be.bignumber.equal(balanceRecipientBeforeTransfer.add(amount));
});

// test deux fonctions approve et transferFrom de l’ERC20
//et fonction allowance?.

//test de la fonction transferFrom

it('verifie si un transfer from est bien effectué - fonction transferFrom', async function () {
let balanceOwnerBeforeTransfer = await this.ERC20Instance.balanceOf(owner);
   let balanceRecipientBeforeTransfer = await this.ERC20Instance.balanceOf(recipient);
   let amount = new BN(10);
 
   await this.ERC20Instance.approve(spender, amount, {from: owner});
   await this.ERC20Instance.transferFrom(owner, recipient, amount, {from: spender});
 
   let balanceOwnerAfterTransfer = await this.ERC20Instance.balanceOf(owner);
   let balanceRecipientAfterTransfer = await this.ERC20Instance.balanceOf(recipient);
  
   expect(balanceOwnerAfterTransfer).to.be.bignumber.equal(balanceOwnerBeforeTransfer.sub(amount));
   expect(balanceRecipientAfterTransfer).to.be.bignumber.equal(balanceRecipientBeforeTransfer.add(amount));
})

//test de la fonction approve. 
//Set the amount of allowance the spender is allowed to transfer from the function caller (msg.sender) balance.
// This function emits the Approval event. The function returns whether the allowance was successfully set.

// //function approve(address delegate, uint256 numTokens) public override returns (bool) {
//     allowed[msg.sender][delegate] = numTokens;
//     emit Approval(msg.sender, delegate, numTokens);
//     return true;
// }


it('verifie si autorisation de transfert est donnée', async function () {
    let amount = new BN(10);
    let resFromApprove = await this.ERC20Instance.approve.sendTransaction(accounts[1], amount, {from: accounts[0]});
    assert.isTrue(resFromApprove);
    //check if an event is emitted?
 
})

});

//Correction:
it('vérifie si un approve est bien effectué', async function (){
    let allowanceSpenderBeforeApprove = await this.ERC20Instance.allowance(owner, spender);
    let amount = new BN(10);
    await this.ERC20Instance.approve(spender, amount, {from: owner});
    let allowanceSpenderAfterApprove = await this.ERC20Instance.allowance(owner, spender);
    expect(allowanceSpenderAfterApprove).to.be.bignumber.equal(allowanceSpenderBeforeApprove.add(amount));
  });