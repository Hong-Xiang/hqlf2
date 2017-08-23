import urllib

def path_quote(path):
    quoted_path = urllib.parse.quote_plus(path)
    double_quoted_path = urllib.parse.quote_plus(quoted_path)
    return double_quoted_path

def path_unquote(path_url):
    quoted_path = urllib.parse.unquote_plus(path_url)
    path = urllib.parse.unquote_plus(quoted_path)
    return path
