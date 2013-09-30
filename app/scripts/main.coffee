class Nico2
    @tagSearch: (tag) ->
        query = """
                {
                   "query":"#{tag}",
                   "service":["video"],
                   "search":[ "tags"],
                   "join":["cmsid", "title", "tags", "thumbnail_url"],
                   "filters":[],
                   "sort_by":"view_counter",
                   "order":"desc",
                   "from":0,
                   "size":18,
                   "timeout":10000,
                   "issuer":"sample",
                   "reason":"ma9"
                }
                """

        $.ajax {
            type: "POST"
            url: "http://api.search.nicovideo.jp/api/"
            data: query
            contentType: "application/json"
        }

tour = (tag) ->
    Nico2.tagSearch(tag).always (data) ->
        return if !(data.readyState is 4 and data.status is 200)

        contents = []
        chunks = $.trim(data.responseText).split "\n"
        for chunk in chunks
            row = JSON.parse chunk
            continue if !(row.type is "hits" and row.values?)

            contents = row.values.map (content) ->
                content.tags = content.tags.split " "
                content
            break

        tmpl = Hogan.compile($("#tmpl").text())
        $("#js-contents-container")
            .hide()
            .html(tmpl.render {"tag": tag, "contents": contents})
            .fadeIn()

$(document).on "click", ".tag", (event) ->
    tour $(event.target).text()

tour "オリンピック"