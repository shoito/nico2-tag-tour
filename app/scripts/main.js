tour = async (tag) => {
  const url = new URL('https://api.search.nicovideo.jp/api/v2/video/contents/search')
  const params = new URLSearchParams()
  params.append('_context', 'yourapp')
  params.append('q', tag)
  params.append('targets', 'tagsExact')
  params.append('fields', 'contentId,title,tags,thumbnailUrl')
  params.append('_sort', '-view_counter')
  params.append('_offset', '0')
  params.append('_limit', '36')

  url.search = params.toString()

  const container = document.getElementById('js-contents-container')
  container.classList.remove('visible')

  fetch('https://cors.io/?' + url.toString())
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      const contents = json.data.map((content) => {
        content.tags = content.tags.split(' ').filter((t) => t !== tag)
        return content
      })

      const tmpl = Hogan.compile(document.getElementById('tmpl').innerText)
      container.innerHTML = tmpl.render({'tag': tag, 'contents': contents})

      document.querySelectorAll('.tag').forEach((button) => {
        button.addEventListener('click', (event) => {
          tour(event.target.innerText)
        })
      })

      document.getElementById('findButton').addEventListener('click', (event) => {
        event.preventDefault()
        tour(tagText.value)
      })

      document.getElementById('tagText').value = tag
      container.classList.add('visible')
    })
}

tour('音楽')
