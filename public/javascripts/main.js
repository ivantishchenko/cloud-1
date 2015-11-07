$(function() {

    $( "#myModal" ).load( "modal.html" );

    var $events = $('#events');
    var $name = $('#name');
    var $place = $('#place');
    var $priority = $('#priority');
    var $with = $('#with');

    function getNode(item) {
        var node = $('<tr>'+
            '<th data-toggle="modal" data-target="#myModal">' + item._id + '</th>' +
            '<th data-toggle="modal" data-target="#myModal">' + item.name + '</th></tr>'
        );

        var del = $('<th><button class="btn-xs" type="button">X</button></th>');

        del.click(function() {
                $.ajax({
                    url: '/events/' + item._id,
                    type: 'DELETE',
                    success: function(result) {
                        window.location.replace("/");
                    }
                });
        });

        node.click(function() {
            var dateVal = new Date(item.created);
            var date = (dateVal.getDay() + 1) + '.' + (dateVal.getMonth() + 1) + '.' + dateVal.getFullYear();
            $('#event-name').text('Event id = ' + item._id);
            $('#event').html('<th>' + item.name + '</th>' +
                '<th>' + item.place + '</th>' +
                '<th>' + item.priority + '</th>' +
                '<th>' + item.with + '</th>' +
                '<th>' + date + '</th>'
            );
        });


        return $.merge(node, del);
    }

    $.getJSON( "/events", function( data ) {
        $.each(data, function(i, item) {

            $events.append(getNode(item));
        });
    });

    $('#delete-event').click(function() {
        $.ajax({
            url: '/events',
            type: 'DELETE',
            success: function(result) {
                $events.html({});
            }
        });
    });

/*
    $('#add').click(function() {
        var newEvent = {
            name: $('input#name').val(),
            place: $('input#place').val(),
            priority: $('input#priority').val(),
            with: $('input#with').val()
        };

        $.post( "/events/create", newEvent, function(data) {
            console.log(data);
            if ( data ) $events.append(getNode(data));
        });
    });
*/

    $("#myForm").submit(function(e) {
        var newEvent = {
            name: $('input#name').val(),
            place: $('input#place').val(),
            priority: $('input#priority').val(),
            with: $('input#with').val()
        };

        $.post( "/events/create", newEvent, function(data) {
           $events.append(getNode(data));
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

    $('#delete-all').click(function() {
        $.ajax({
            url: '/events',
            type: 'DELETE',
            success: function(result) {
                $events.html({});
            }
        });
    });

});