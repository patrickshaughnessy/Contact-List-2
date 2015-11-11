'use strict';

(function($){

  $(document).ready(init);

  function init(){

    updateTable();

    $('#remove').click(removeContacts);
  }

  function updateTable(){
    $.get('/contacts')
    .done(function(data){
      var tableData = [];

      for (var contact in data){
        tableData.push(populateTable(data[contact]));
      }
      console.log(tableData)
      $('#contactsList').empty();
      $('#contactsList').append(tableData);
    }).fail(function(err){
      console.error(err);
    });
  }

  function removeContacts(){

    var checkedBoxesIndices = [];
    $('#contactsList input:checked').each(function(i, elem){
                          var index = ($(elem).parents('tr').index());
                          checkedBoxesIndices.push(index);
                      });
    console.log(checkedBoxesIndices);
    // var indices = JSON.stringify(checkedBoxesIndices);
    // console.log(indices);
    $.post('/delete', {'checked':checkedBoxesIndices})
    .done(function(data){
      console.log('done');
      updateTable();
    }).fail(function(err){
      console.error(err);
    })
  }

  function populateTable(obj){
    var $name = $('<td>').text(obj.name);
    var $email = $('<td>').text(obj.email);
    var $phone = $('<td>').text(obj.phone);
    var $remove = $('<td>').append($('<input>').attr('type', 'checkbox'));

    var $newRow = $('<tr>').append($name, $email, $phone, $remove);

    return $newRow;
  }

}(jQuery))
