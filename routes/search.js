module.exports = function(app) {

    app.get('/search',function(req,res){
        res.render('search_home');
    });

    app.get('/results',function(req,res){
        var params = [];
        var temptext = req.query['text'];
        var result = temptext.split(/, |,/);
        var content = {};
        for(var i in result) {
            params.push({'key':result[i]});
        }
        content.item = params;
        res.render('search_results', content);
    });
}