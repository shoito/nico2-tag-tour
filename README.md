niconicoタグ回遊
==================

## 概要
HTML5 Japan Cup向けに提供している「niconicoコンテンツの横断検索API」のサンプルアプリです。

niconicoのコンテンツをタグの繋がりで辿れます。

[http://shoito.github.io/nico2-tag-tour/index.html](http://shoito.github.io/nico2-tag-tour/index.html)

![nico2 tag tour](https://raw.github.com/shoito/nico2-tag-tour/master/docs/images/screenshot.png)


### HTML5 Japan Cup
[HTML5 Japan Cup](https://5jcup.org/awards/dwango)

[niconicoコンテンツの横断検索API | HTML5 Japan Cup](https://5jcup.org/awards/dwango)

## 解説
### 検索クエリ
「オリンピック」という文字列をタグに含む動画を視聴数順に18件取得しています。

タグのリンクをクリックすると「艦これ」の部分を選択したタグの文字列に置き換えて、新たに動画情報を取得しています。

```
{
   "query":"艦これ",
   "service":[
      "video"
   ],
   "search":[
      "tags"
   ],
   "join":[
      "cmsid",
      "title",
      "tags",
      "thumbnail_url"
   ],
   "sort_by":"view_counter",
   "order":"desc",
   "from":0,
   "size":18,
   "issuer":"sample",
   "reason":"html5jc"
}
```

## ビルド方法
1.NodeJSをインストールする

[http://nodejs.org/](http://nodejs.org/)

2.Gruntをインストールする。

```
$ npm install -g grunt-cli
```

3.git cloneする

```
$ git clone https://github.com/shoito/nico2-tag-tour.git
```

4.依存モジュールをインストールする

```
$ cd nico2-tag-tour
$ npm install
$ bower install
```

5.コンパイル・実行

```
$ grunt server
```

6.ビルド

```
$ grunt build
```

## ライセンス
```
The MIT License (MIT)

Copyright (c) 2014 shoito

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
