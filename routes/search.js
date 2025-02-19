export default function (app, sessionChecker, context) {
  app.get("/search", sessionChecker, function (req, res) {
    context.siteTitle = "Results";
    res.render("search_home", context);
    context.initMessage = "";
  });

  app.get("/results", sessionChecker, function (req, res) {
    var params = [];
    var temptext = req.query["text"];
    var result = temptext.split(/, |,/);

    for (var i in result) {
      params.push({ key: result[i] });
    }

    context.item = params;

    context.siteTitle = "Search";
    res.render("search_results", context);
    context.initMessage = "";
  });
}
