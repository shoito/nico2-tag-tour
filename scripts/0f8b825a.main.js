(function() {
  var tour;

  tour = function(tag) {
    return SearchNico.contents({
      issuer: "nico2-tag-tour",
      reason: "html5jc"
    }).service("video").keyword(tag).target(["tags"]).sort("view_counter", "desc").select(["cmsid", "title", "tags", "thumbnail_url"]).from(0).size(18).fetch().then(function(result) {
      var contents, tmpl;
      contents = result.values.map(function(content) {
        content.tags = content.tags.split(" ");
        return content;
      });
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

  tour("艦これ");

}).call(this);
