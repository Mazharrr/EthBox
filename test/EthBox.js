let EthBox = artifacts.require("./EthBox.sol");

contract('EthBox', accounts => {

  let EthBoxInstance,
      seller = accounts[1],
      entryName = "Entry 1",
      entryDescription = "Entry 1's Description",
      entryPrice = 10;

  it("should be initialized with empty values", () =>{
    return EthBox.deployed().then(instance => {
        return instance.getEntry.call()
      }).then(data => {
        assert.equal(data[0], 0x0, "seller must be empty");
        assert.equal(data[1], '', "entry name must be empty");
        assert.equal(data[2], '', "description must be empty");
        assert.equal(data[3].toNumber(), 0, "price must be 0");
      });
  })

    it("should sell an entry", ()=>{
      return EthBox.deployed().then(instance =>{
        EthBoxInstance = instance;
        return EthBoxInstance.sellEntry(entryName, entryDescription, web3.toWei(entryPrice, "ether"), {from: seller});
      }).then(()=>{
        return EthBoxInstance.getEntry.call();
      }).then(data=>{
        assert.equal(data[0], seller, "seller address must match");
        assert.equal(data[1], entryName, "entry name must match");
        assert.equal(data[2], entryDescription, "descriptions must match");
        assert.equal(data[3].toNumber(), web3.toWei(entryPrice, "ether"), "prices must match");
      })
    })
});