App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    var entriesRow = $('#entriesRow');
    var entryTemplate = $('#entryTemplate');

    entryTemplate.find('.panel-title').text("entry one");
    entryTemplate.find('.entry-description').text("Description for this entry");
    entryTemplate.find('.entry-price').text("10.23");
    entryTemplate.find('.entry-seller').text("0x01234567890123456789012345678901");

    entriesRow.append(entryTemplate.html());

    return App.initWeb3();
  },

  initWeb3: function() {
    /*

     */

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
