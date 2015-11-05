$(function() {

    var $events = $('#events');

    $.getJSON( "/events", function( data ) {
        $.each(data, function(i, item) {
            $events.append(
            '<tr>' +
            '<th>' + item.name + '</th>' +
            '<th>' + item.place + '</th>' +
            '<th>' + item.priority + '</th>' +
            '<th>' + item.with + '</th>' +
            '</tr>');
        });
    });

});