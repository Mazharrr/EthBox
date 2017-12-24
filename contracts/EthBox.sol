pragma solidity ^0.4.11;

contract EthBox {
  address seller;
  string name;
  string description;
  uint256 price;

  function sellEntry(string _name, string _description, uint _price) public {
    seller = msg.sender;
    name = _name;
    description = _description;
    price = _price;
  }

  function getArticle() public constant returns (address _seller, string _name, string _description, uint256 _price) {
    return(seller, name, description, price);
  }
}