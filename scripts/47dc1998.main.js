(function() {
  var Nico2, tour;

  Nico2 = (function() {
    function Nico2() {}

    Nico2.tagSearch = function(tag) {
      var query;
      query = "{\n   \"query\":\"" + tag + "\",\n   \"service\":[\"video\"],\n   \"search\":[ \"tags\"],\n   \"join\":[\"cmsid\", \"title\", \"tags\", \"thumbnail_url\"],\n   \"filters\":[],\n   \"sort_by\":\"view_counter\",\n   \"order\":\"desc\",\n   \"from\":0,\n   \"size\":18,\n   \"timeout\":10000,\n   \"issuer\":\"sample\",\n   \"reason\":\"ma9\"\n}";
      return $.ajax({
        type: "POST",
        url: "http://api.search.nicovideo.jp/api/",
        data: query,
        contentType: "application/json"
      });
    };

    return Nico2;

  })();

  tour = function(tag) {
    return Nico2.tagSearch(tag).always(function(data) {
      var chunk, chunks, contents, row, tmpl, _i, _len;
      if (!(data.readyState === 4 && data.status === 200)) {
        return;
      }
      contents = [];
      chunks = $.trim(data.responseText).split("\n");
      for (_i = 0, _len = chunks.length; _i < _len; _i++) {
        chunk = chunks[_i];
        row = JSON.parse(chunk);
        if (!(row.type === "hits" && (row.values != null))) {
          continue;
        }
        contents = row.values.map(function(content) {
          content.tags = content.tags.split(" ");
          return content;
        });
        break;
      }
      tmpl = Hogan.compile($("#tmpl").text());
      return $("#js-contents-container").hide().html(tmpl.render({
        "tag": tag,
        "contents": contents
      })).fadeIn();
    });
  };

  $(document).on("click", ".tag", function(event) {
    return tour($(event.target).text());
  });

  tour("オリンピック");

}).call(this);
