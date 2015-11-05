$(function() {

    $( "#myModal" ).load( "modal.html" );

    var $events = $('#events');
    var $name = $('#name');
    var $place = $('#place');
    var $priority = $('#priorty');
    var $with = $('#with');

    $.getJSON( "/events", function( data ) {
        $.each(data, function(i, item) {
            var node = $('<tr data-toggle="modal" data-target="#myModal">' +
                '<th>' + item._id + '</th>' +
                '<th>' + item.name + '</th>' +
                '</tr>');

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

            //node.attr( "alt", "Beijing Brush Seller" );

            $events.append(node);
        });
    });

    $('#add-event').click(function() {
        var newEvent = {
            name: $name.val(),
            place: $place.val(),
            priority: $priority.val(),
            with: $with.val
        };

        $.post( "/events/create", newEvent);
    });

});