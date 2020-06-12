$(document).ready(function(){
    ab();
});

function ab()
{
    
    $('#test').click(function()
    {
        if($('#test').text() == "")
        {
            alert("Hello world");
        }

        $.ajax({
            type : 'POST',
            url : '/upload',
            dataType: 'html', 
            success: function (result) {
               alert("You have success to upload file");
            }
        });
    });   
}