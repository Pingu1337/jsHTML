

$(function() {
    $('a#test').on('click', function(e) {
        e.preventDefault()
        $.getJSON('/background_process_test',
            function(data) {
        //do nothing
        });
        return false;
    });
});

$(function() {
    $('a#gettest').on('click', function(e) {
        e.preventDefault()
        var txtinput = document.getElementById('txtinput');
        $.post( "/postmethod", {
            javascript_data: txtinput.value 
        });
        return false;
    });
});

