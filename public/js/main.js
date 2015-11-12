'use strict';

(function($){

  $(document).ready(init);

  function init(){

    // updateTable();

    $('#remove').click(removeContacts);
    $('th').on('click', 'i.fa-caret-down', sortDataAscending);
    $('th').on('click', 'i.fa-caret-up', sortDataDescending);
    $('#contactsList').on('keydown', function(e){
      if (e.which === 13 ){
        $(e.target).blur();
        return false;
      }
    });
    $('#contactsList').on('input', editTable);
  }

  function sortDataDescending(event){
    var index = $(this).parent().index();

    var toBeSorted = [];
    $('#contactsList').find('td:nth-child(' + (index+1) + ')').each(function(i, elem){
      toBeSorted.push(elem.textContent);
    });

    var $contactsList = $('#contactsList');
    toBeSorted.sort();

    for (var i = 0; i < toBeSorted.length; i++){
      var textToFind = toBeSorted[i];
      var $contactToMove = $contactsList.find('td:contains(' + textToFind + ')').parent().detach();
      $contactsList.prepend($contactToMove);
    }

    $('.fa-caret-up').removeClass('fa-caret-up').addClass('fa-caret-down');

  }

  function sortDataAscending(event){
    var index = $(this).parent().index();

    var toBeSorted = [];
    $('#contactsList').find('td:nth-child(' + (index+1) + ')').each(function(i, elem){
      toBeSorted.push(elem.textContent);
    });

    var $contactsList = $('#contactsList');
    toBeSorted.sort();

    for (var i = toBeSorted.length-1; i >= 0; i--){
      var textToFind = toBeSorted[i];
      var $contactToMove = $contactsList.find('td:contains(' + textToFind + ')').parent().detach();
      $contactsList.prepend($contactToMove);
    }

    $('.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-up');

  }

  function editTable(event){
    // updateDB with user changes
    // debugger;

    var edits = {}
    edits.timestamp = $(event.target).siblings('.timestamp').text();
    edits.value = $(event.target).text();
    switch ($(event.target).index()){
      case 0:
        edits.key = 'name';
        break;
      case 1:
        edits.key = 'email';
        break;
      case 2:
        edits.key = 'phone';
        break;
    }

    $.post('/edit', edits)
    .done(function(data){
      console.log(data);

    }).fail(function(err){
      console.error(err);
    });

  }

  function removeContacts(){
    var checkedTimestamps = [];
    $('#contactsList input:checked').parents('td').siblings('.timestamp')
      .each(function(i, elem){
          var timestamp = elem.textContent;
          checkedTimestamps.push(timestamp);
      });

    $.post('/delete', {"checked":checkedTimestamps})
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
