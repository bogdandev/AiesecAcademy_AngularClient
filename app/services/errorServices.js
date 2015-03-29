
app.service('ErrorHandler', function() {
    return {
        alert: function(data){
            if(data.code){
                return  alert('Error ' + data.code+' : ' + data.message);
            }
        }
    }
});
