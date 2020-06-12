$(document).ready(function () {
    (function() {
        $.ajax({ 
            url: '/api/users/',
            type: 'GET',
            complete: function() {
                console.log('process complete');
            },
            success: function(result) {
                console.log(result);

                $('#showresults').html(JSON.stringify(result));
                //$('#showresults').append(JSON.stringify(result))
            },
            error: function() {
                console.log("no result from ajax");
            }
        })
    })();
    //more code here for other ajax calls
 });