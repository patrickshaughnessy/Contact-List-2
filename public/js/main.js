'use strict';

(function($){

  $(document).ready(init);

  function init(){

    $.get('/contacts')
    .done(function(data){
      var tableData = [];

      // data.forEach(function(contact){
      //   populateTable(contact);
      // })
      for (var contact in data){
        tableData.push(populateTable(data[contact]));
      }
      console.log(tableData)
      $('#contactsList').append(tableData);
    }).fail(function(err){
      console.error(err);
    });
  }

  function populateTable(obj){
    var $name = $('<td>').text(obj.name);
    var $email = $('<td>').text(obj.email);
    var $phone = $('<td>').text(obj.phone);

    var $newRow = $('<tr>').append($name, $email, $phone);

    return $newRow;
  }

}(jQuery))
