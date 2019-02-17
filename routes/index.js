var express = require('express'),
  request = require("request"),
  cheerio = require("cheerio");

var router = express.Router();

    /**
     * Load the index page.
     *
     * @param req, http request which is not used here.
     * @param res, http response which is used to render the page.
     * @param next the callback that triggers the next middleware in express js stack.
     **/

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'D I A G N A L Workshop'
  });
});

    /**
     * Fetch the meta data from url.
     *
     * @param req, http request which used to get the value from body.
     * @param res, http response which is used to return the value.
     * 
     * cheerio and request external packages are used to request the html data from url, 
     * parse and traverse the data resevied from the server
     **/
router.post('/url', function (req, res) {
  request({uri: req.body.url}, function (err, response, html) {
    if(err) {
      return next(err);
    }
    var $ = cheerio.load(html);
    var array = [];
    var meta = $("meta");
    meta.each(function () {
      if (this.attribs && this.attribs.content && this.attribs.name) {
        array.push({
          name: this.attribs.name,
          content: this.attribs.content
        });
      }
    });
    if(!array.length) {
      if($("h1").length) {
        $("h1").each(function () {
          if (this.attribs && this.attribs.content && this.attribs.name) {
            array.push({
              name: 'title',
              content: this.attribs.content
            });
          }
        });
      } else if ($("h2").length) {
        $("h2").each(function () {
          if (this.attribs && this.attribs.content && this.attribs.name) {
            array.push({
              name: 'title',
              content: this.attribs.content
            });
          }
        });
      } else if ($("h3").length) {
        $("h3").each(function () {
          if (this.attribs && this.attribs.content && this.attribs.name) {
            array.push({
              name: 'title',
              content: this.attribs.content
            });
          }
        });
      } else if ($("h4").length) {
        $("h4").each(function () {
          if (this.attribs && this.attribs.content && this.attribs.name) {
            array.push({
              name: 'title',
              content: this.attribs.content
            });
          }
        });
      } else if ($("h5").length) {
        $("h5").each(function () {
          if (this.attribs && this.attribs.content && this.attribs.name) {
            array.push({
              name: 'title',
              content: this.attribs.content
            });
          }
        });
      } else if ($("h6").length) {
        $("h6").each(function () {
          if (this.attribs && this.attribs.content && this.attribs.name) {
            array.push({
              name: 'title',
              content: this.attribs.content
            });
          }
        });
      }
    }
    res.json({data: array});
  });
});

module.exports = router;
