let EthBox = artifacts.require("./EthBox.sol");

contract('EthBox', accounts =>{
  it("should be initialized with empty values", () =>
    EthBox.deployed()
      .then(instance => instance.getEntry.call())
      .then(data => {
        assert.equal(data[0], 0x0, "seller must be empty");
        assert.equal(data[1], '', "entry name must be empty");
        assert.equal(data[2], '', "description must be empty");
        assert.equal(data[3].toNumber(), 0, "price must be 0");
      }))
});