$(function() {

    var $events = $('#events');

    $.getJSON( "/events", function( data ) {
        $.each(data, function(i, item) {
            var node = $('<tr>' +
                '<th>' + item.name + '</th>' +
                '<th>' + item.place + '</th>' +
                '<th>' + item.priority + '</th>' +
                '<th>' + item.with + '</th>' +
                '</tr>');
            node.click(function() {
                alert( "H." );
            });
            $events.append(node);
        });
    });

});