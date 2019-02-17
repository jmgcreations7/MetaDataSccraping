var existingScrape = document.getElementById('existingScrape');
existingScrape.onclick = function(){
    var url = document.getElementById('url').value;
    if(url) {
        $.ajax({
            url: '/url',
            type: "POST",
            async: true,
            dataType: 'json',
            data: {
                url: url
            },
            success: function (result) {
                var resultBody = document.getElementById('resultBody');
                resultBody.innerHTML = '';
                if(result.data.length) {
                    result.data.forEach(element => {
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        var td1 = document.createElement("td");
                        td.innerHTML = element.name + ' : ';
                        td1.innerHTML = element.content;
                        tr.append(td);
                        tr.append(td1);
                        resultBody.append(tr);
                    });
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
};