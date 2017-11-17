let url = require('url');
let a = url.parse('http://example.com:8080/one?a=index&t=article&m=default',true);
console.log(typeof a.query);
//console.log(typeof(a) == "object" && Object.prototype.toString.call(a).toLowerCase() == "[object object]" && !a.length); // true
/*{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'example.com:8080',
  port: '8080',
  hostname: 'example.com',
  hash: null,
  search: '?a=index&t=article&m=default',
  query: { a: 'index', t: 'article', m: 'default' },
  pathname: '/one',
  path: '/one?a=index&t=article&m=default',
  href: 'http://example.com:8080/one?a=index&t=article&m=default' }
//true*/
{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'example.com:8080',
  port: '8080',
  hostname: 'example.com',
  hash: null,
  search: '?a=index&t=article&m=default',
  query: 'a=index&t=article&m=default',
  pathname: '/one',
  path: '/one?a=index&t=article&m=default',
  href: 'http://example.com:8080/one?a=index&t=article&m=default' }
