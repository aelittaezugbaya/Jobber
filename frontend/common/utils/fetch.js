function fetch(url, options) {
  return window.fetch(url,
    {
      method: 'GET',
      ...options,
      headers: Object.assign({}, {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }, options.headers),
    });
}

export default fetch;