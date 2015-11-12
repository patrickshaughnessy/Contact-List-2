'use strict';

(function($){

  $(document).ready(init);

  function init(){

    // updateTable();

    $('#remove').click(removeContacts);
    // $('#contactsList').on('input', editTable);
  }

  function editTable(event){
    // updateDB with user changes
    var index = $(event.target).parent().index();
    var text = $(event.target).text();
    // key

    $.post('/edit', {"index": index, "text": text})
    .done(function(data){
      console.log('done');
      updateTable();
    }).fail(function(err){
      console.error(err);
    });
    // debugger;
  }

  function removeContacts(){

    var checkedBoxesIndices = [];
    $('#contactsList input:checked').each(function(i, elem){
                          var index = ($(elem).parents('tr').index());
                          checkedBoxesIndices.push(index);
                      });

    $.post('/delete', {"checked":checkedBoxesIndices})
    .done(function(data){
      console.log(data);
      // updateTable();
      $('#contactsList input:checked').parents('tr').remove()
    }).fail(function(err){
      console.error(err);
    });
  }

  function updateTable(){
    $.get('/contacts')
    .done(function(data){
      var tableData = [];

      for (var contact in data){
        tableData.push(populateTable(data[contact]));
      }
      $('#contactsList').empty();
      $('#contactsList').append(tableData);
    }).fail(function(err){
      console.error(err);
    });
  }

  function populateTable(obj){
    var $name = $('<td>').text(obj.name).attr('contenteditable', 'true');
    var $email = $('<td>').text(obj.email).attr('contenteditable', 'true');
    var $phone = $('<td>').text(obj.phone).attr('contenteditable', 'true');
    var $remove = $('<td>').append($('<input>').attr('type', 'checkbox'));

    var $newRow = $('<tr>').append($name, $email, $phone, $remove);

    return $newRow;
  }

}(jQuery))
