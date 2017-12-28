App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {
    return App.initWeb3();
  },
  initWeb3: function() {
    if(typeof web3 != 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 =  new Web3(App.web3Provider);
    }
    App.displayAccountInfo();
    return App.initContract();
  },
  displayAccountInfo: function(){
    web3.eth.getCoinbase(function(err,account) {
      if(err === null) {
        App.account = account;
        $("#account").text(account);
        web3.eth.getBalance(account, function(err, balance){
          if(err === null){
            $("#accountBalance").text(web3.fromWei(balance, "ether") +  "ETH")
          }
        })
      }
    })
  },
  initContract: function() {
    $.getJSON('EthBox.json', function(chainListArtifact) {
      App.contracts.EthBox = TruffleContract(chainListArtifact);
      App.contracts.EthBox.setProvider(App.web3Provider);
      return App.reloadArticles();
    })
  },
  reloadArticles: function() {
    App.displayAccountInfo();

    App.contracts.EthBox.deployed().then(function(instance){
      return instance.getEntry.call();
    }).then(function(entry) {
      if(entry[0] == 0x0) {
        return;
      }
      let entriesRow = $('#entriesRow');
      entriesRow.empty();

      let entryTemplate = $('#entryTemplate');
      entryTemplate.find('.panel-title').text(entry[1]);
      entryTemplate.find('.entry-description').text(entry[2]);
      entryTemplate.find('.entry-price').text(web3.fromWei(entry[3], "ether"));

      let seller = entry[0];
      if(seller = App.account) {
        seller = "You";
      }
      entryTemplate.find('.entry-seller').text(seller);
      entriesRow.append(entryTemplate.html());
    }).catch(function(err){
      console.log(err.message);
    })
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
