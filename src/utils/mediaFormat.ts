//URLs starting with http://, https://, or ftp://
// const linkHTTP = /(\b(https?|ftp):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/im;
const linkHTTP = /(?<!<[^>]*)(\b(https?|ftp):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/im;

//URLs starting with "www."
const linkWWW = new RegExp(/(^|[^\/])(www\.[\S]+(\b|$))/im);

//Change email addresses to mailto:: links.
const linkMAIL = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/im;

//Image links .jpg, .png, .bmp
// const imageHTTP = /^https?:\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(?:jpg|jpeg|bmp|png)$/gim;
const imageHTTP = /(?<!\([^\)]*)\b(https?:\/\/\S*?\.(?:png|jpe?g|gif)(?:\?(?:(?:(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)|(?:[\w_-]+)))?)\b/gim;
const image_regex = new RegExp(/(?<!<[^>]*)\.(jpg|JPG|jpeg|JPEG|bmp|BMP|png|PNG)/);
const imageWWW = new RegExp(linkWWW.source + image_regex.source + "$");

// http://www.youtube.com/embed/m5yCOSHeYn4
const ytRegEx = /^(?:https?:\/\/)?(?:i\.|www\.|img\.)?(?:youtu\.be\/|youtube\.com\/|ytimg\.com\/)(?:embed\/|v\/|vi\/|vi_webp\/|watch\?v=|watch\?.+&v=)((\w|-){11})(?:\S+)?$/;
const youtubeRegEx = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)(?<end>[\w\-]+)(\S+)?/gim;
// https://player.vimeo.com/video/50489180
const vmRegEx = /https?:\/\/(?:player\.)(?:vimeo\.com\/video\/)((\w|-){8})/;
const vimeoRegEx = /https?:\/\/(?:(?:player\.)(?:vimeo\.com\/video\/)|(?:vimeo\.com\/))((\w|-)+)/gim;
// https://embed.spotify.com/?uri=spotify:track:78z8O6X1dESVSwUPAAPdme
const spRegEx = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|embed\/track\/|\?uri=spotify:track:|)((\w|-){22})((\?si=[^&].+)?)/gim;
// https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/29395900&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false
const scRegEx = /https?:\/\/(?:w\.)(?:soundcloud\.com\/player\/)\?url=https\%3A\/\/api.soundcloud.com\/tracks\/((\w|-){8})/;

function getIDfromRegEx(src, regExpy) {
  return (src.match(regExpy)) ? RegExp.$1 : null;
}

function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/**
    * JavaScript function to match (and return) the video Id 
    * of any valid Youtube Url, given as input string.
    * @author: Stephan Schmitz <eyecatchup@gmail.com>
    * @url: http://stackoverflow.com/a/10315969/624466
    * ref: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
    */
function youtubeVideoID(url) {
  const ms = url.match(youtubeRegEx);
  if (!ms) return;
  let results = `${ms[0]}`.matchAll(youtubeRegEx);
  let res

  for (let result of results) {
    let i = result.pop()
    if (i) res = i
    else {
      let t = result.pop()
      if (t) res = t
    }
  }
  if (!res) return;
  return res?.replace(/\//g, '')
}

function replaceHashtags(str) {
  return str
    .replace(/(^|\s)#(\w+)/g, '$1<a class="htag" href="/tagged/$2">$2</a>');
}

function replaceMentions(str) {
  return str
    .replace(/@(\w+)/gim, '<a class="mention" href="/$1">@$1</a>');
    // .replace(/@(\w+)/gim, '$1<a class="mention" href="/$2">@$2</a>');
    // .replace(/(^|\s)@(\w+)/gim, '$1<a class="mention" href="/$2">@$2</a>');
}

function replaceFontStyles(str) {
  return str
    // -strikethrough-
    .replace(/-([A-Za-z](.*[A-Za-z]+)?)-/, '<del>$1</del>')
    // *bold*
    .replace(/(^|\D)\*(.+)\*($|\D)/, '$1<b>$2</b>$3')
    // _italics_
    .replace(/_(\S+(.*\S+)?)_/, '<i>$1</i>');
}

function formatHTTP(linkStr) {
  return linkStr.replace(linkHTTP, '<a class="link" href="$1" target="_blank">$1</a>');
}

function formatWWW(linkStr) {
  return linkStr.replace(linkWWW, '$1<a class="link" href="https://$2" target="_blank">$2</a>');
}

function formatMAIL(mailStr) {
  return mailStr
    .replace(linkMAIL, '<a href="mailto:$1">$1</a>');
}

function splitFirst(str, regex) {
  var result = regex.exec(str);
  if (!result) return {}
  return {
    beginning: str.substring(0, result.index),
    match: result[0],
    end: str.substring(result.index + result[0].length, str.length),
  };
}

// REF: https://stackoverflow.com/questions/69199639/render-markdown-in-vue-js
function simpleMarkdown(mdText: string) {
  mdText = mdText.replace(/<br>/gim, '\n')

  // first, handle syntax for code-block
  mdText = mdText.replace(/\r\n/g, '\n')
  mdText = mdText.replace(/\n~~~ *(.*?)\n([\s\S]*?)\n~~~/g, '<pre><code title="$1">$2</code></pre>')
  mdText = mdText.replace(/\n``` *(.*?)\n([\s\S]*?)\n```/g, '<pre><code title="$1">$2</code></pre>')

  // split by "pre>", skip for code-block and process normal text
  var mdHTML = ''
  var mdCode = mdText.split('pre>')

  for (var i = 0; i < mdCode.length; i++) {
    if (mdCode[i].substr(-2) == '</') {
      mdHTML += '<pre>' + mdCode[i] + 'pre>'
    } else {
      mdHTML += mdCode[i]
        .replace(/(.*)<$/, '$1')
        .replace(/^##### (.*?)\s*#*$/gm, '<h5>$1</h5>')
        .replace(/^#### (.*?)\s*#*$/gm, '<h4 id="$1">$1</h4>')
        .replace(/^### (.*?)\s*#*$/gm, '<h3 id="$1">$1</h3>')
        .replace(/^## (.*?)\s*#*$/gm, '<h2 id="$1">$1</h2>')
        .replace(/^# (.*?)\s*#*$/gm, '<h1 id="$1">$1</h1>')
        .replace(/^-{3,}|^\_{3,}|^\*{3,}/gm, '<hr/>')
        .replace(/``(.*?)``/gm, '<code>$1</code>')
        .replace(/`(.*?)`/gm, '<code>$1</code>')
        .replace(/^\>> (.*$)/gm, '<blockquote><blockquote>$1</blockquote></blockquote>')
        .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/<\/blockquote\>\n<blockquote\>/g, '\n<br>')
        .replace(/<\/blockquote\>\n<br\><blockquote\>/g, '\n<br>')
        .replace(/!\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<img alt="$1" src="$2" $3 />')
        .replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />')
        .replace(/\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<a href="$2" title="$3">$1</a>')
        .replace(/<http(.*?)\>/gm, '<a href="http$1">http$1</a>')
        .replace(/\[(.*?)\]\(\)/gm, '<a href="$1">$1</a>')
        .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
        .replace(linkHTTP, '<a class="link" href="$1" target="_blank">$1</a>')
        .replace(linkWWW, '$1<a class="link" href="https://$2" target="_blank">$2</a>')
        .replace(linkMAIL, '<a href="mailto:$1">$1</a>')
        .replace(/^[\*|+|-][ |.](.*)/gm, '<ul><li>$1</li></ul>').replace(/<\/ul\>\n<ul\>/g, '\n')
        .replace(/^\d[ |.](.*)/gm, '<ol><li>$1</li></ol>').replace(/<\/ol\>\n<ol\>/g, '\n')
        .replace(/\*\*\*(.*)\*\*\*/gm, '<b><em>$1</em></b>')
        .replace(/\*\*(.*)\*\*/gm, '<b>$1</b>')
        .replace(/\*([\w \d]*)\*/gm, '<em>$1</em>')
        .replace(/___(.*)___/gm, '<b><em>$1</em></b>')
        .replace(/__(.*)__/gm, '<u>$1</u>')
        .replace(/_([\w \d]*)_/gm, '<em>$1</em>')
        .replace(/~~(.*)~~/gm, '<del>$1</del>')
        .replace(/\^\^(.*)\^\^/gm, '<ins>$1</ins>')
        .replace(/ +\n/g, '\n<br/>')
        .replace(/\n\s*\n/g, '\n<p>\n')
        .replace(/^ {4,10}(.*)/gm, '<pre><code>$1</code></pre>')
        .replace(/^\t(.*)/gm, '<pre><code>$1</code></pre>')
        .replace(/<\/code\><\/pre\>\n<pre\><code\>/g, '\n')
        .replace(/\\([`_\\\*\+\-\.\(\)\[\]\{\}])/gm, '$1')
    }
  }

  return mdHTML.trim()
}

export function formatMessage(str: string): string {
  let result;
  str = simpleMarkdown(str);

  // If there is a link:
  // if (linkHTTP.test(str)) {
  //   result = splitFirst(str, linkHTTP);
  //   return formatMessage(result.beginning) +
  //     formatHTTP(result.match) +
  //     formatMessage(result.end);
  // }
  // if (linkWWW.test(str)) {
  //   result = splitFirst(str, linkWWW);
  //   return formatMessage(result.beginning) +
  //     formatWWW(result.match) +
  //     formatMessage(result.end);
  // }
  if (linkMAIL.test(str)) {
    result = splitFirst(str, linkMAIL);
    return formatMessage(result.beginning) +
      formatMAIL(result.match) +
      formatMessage(result.end);
  }

  // // replace hashtags with clickable links
  // str = replaceHashtags(str);

  // replace mentions with clickable links
  str = replaceMentions(str);
  return str;
}

// NOTE: Soundcloud removed support, all links go to website... SMH
export function autoFormatAll(str: string): string {
  if (!str) return str;
  // Trim whitespace off beginning and end of message.
  str = trim(str);

  // spotify
  const spRes = splitFirst(str, spRegEx);
  if (spRes.match) {
    const spId = MediaFormat.getSpotifyID(spRes.match);
    if (spId) {
      const songEl = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${spId}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
      
      return autoFormatAll(spRes.beginning) +
        spRes.match.replace(spRegEx, songEl) +
        autoFormatAll(spRes.end);
    }
  }

  // vimeo
  const vmRes = splitFirst(str, vimeoRegEx);
  if (vmRes.match) {
    const vmId = MediaFormat.getVimeoID(vmRes.match);
    if (vmId) {
      const vidEl = `<iframe src="https://player.vimeo.com/video/${vmId}?h=b088a8eda6&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      
      return autoFormatAll(vmRes.beginning) +
        vmRes.match.replace(vimeoRegEx, vidEl) +
        autoFormatAll(vmRes.end);
    }
  }

  // youtube
  const ytRes = splitFirst(str, youtubeRegEx);
  if (ytRes.match) {
    const ytVideoID = youtubeVideoID(ytRes.match);
    if (ytVideoID) {
      const size = 'maxresdefault'
      // const size = 'hqdefault' // had black bars
      // const size = 'mqdefault' // small: 320x180
      const videoEl = `<a class="youtube" target="_blank" href="https://youtube.com/watch?v=${ytVideoID}"><img class="youtube-thumb" src="https://img.youtube.com/vi/${ytVideoID}/${size}.jpg" /></a>`;
      
      return autoFormatAll(ytRes.beginning) +
        ytRes.match.replace(youtubeRegEx, videoEl) +
        autoFormatAll(ytRes.end);
    }
  }

  // // images: www
  let imgRes
  imgRes = splitFirst(str, imageWWW);
  if (imgRes.match) {
    return autoFormatAll(imgRes.beginning) +
      imgRes.match.replace(imageWWW, '<img class="msgImage" src="$1"></img>') +
      autoFormatAll(imgRes.end);
  }
  // images: http
  imgRes = splitFirst(str, imageHTTP);
  if (imgRes.match) {
    return autoFormatAll(imgRes.beginning) +
      imgRes.match.replace(imageHTTP, '<img class="msgImage" src="$1"></img>') +
      autoFormatAll(imgRes.end);
  }

  return formatMessage(str);
}


/**
 * MediaFormat
 * format and return only needed pieces of media from their public sources
 */
export const MediaFormat = {
  // returns only the ID
  getYoutubeID: function (src) {
    return getIDfromRegEx(src, ytRegEx);
  },
  // returns main link
  getYoutubeUrl: function (ID) {
    return "https://www.youtube.com/watch?v=" + ID;
  },
  // returns only the ID
  getVimeoID: function (src) {
    return getIDfromRegEx(src, vimeoRegEx);
  },
  // returns main link
  getVimeoUrl: function (ID) {
    return "http://vimeo.com/" + ID;
  },
  // returns only the ID
  getSpotifyID: function (src) {
    return getIDfromRegEx(src, spRegEx);
  },
  // returns main link
  getSpotifyUrl: function (ID) {
    return "http://open.spotify.com/track/" + ID;
  },
  // returns only the ID
  getSoundcloudID: function (src) {
    return getIDfromRegEx(src, scRegEx);
  },
  // returns main link
  // NOTE: this one really sucks since soundcloud doesnt have good API without js library
  getSoundcloudUrl: function (ID) {
    return "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + ID; //only way to link to the track currently
  }
}
