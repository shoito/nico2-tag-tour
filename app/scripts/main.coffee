tour = (tag) ->
  SearchNico.contents(
      issuer: "nico2-tag-tour",
      reason: "html5jc"
  ).service("video")
  .keyword(tag)
  .target(["tags"])
  .sort("view_counter", "desc")
  .select(["cmsid", "title", "tags", "thumbnail_url"])
  .from(0)
  .size(18)
  .fetch()
  .then (result) ->
    contents = result.values.map (content) ->
      content.tags = content.tags.split " "
      content

    tmpl = Hogan.compile($("#tmpl").text())
    $("#js-contents-container")
      .hide()
      .html(tmpl.render {"tag": tag, "contents": contents})
      .fadeIn()

$(document).on "click", ".tag", (event) ->
  tour $(event.target).text()

tour "艦これ"