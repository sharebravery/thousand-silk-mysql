import request = require('request-promise');

class RequestOptions {
  method?: 'GET' | 'POST' = 'GET';
  url: string;
  encoding? = 'utf8'; // 编码
  proxy: string; // 代理
  callback?: (body) => any;
}

const service = async function (options: RequestOptions) {
  const { url, method, encoding, proxy, callback } = {
    ...new RequestOptions(),
    ...options,
  };
  console.log(
    '%c [ options ]-15',
    'font-size:13px; background:pink; color:#bf2c9f;',
    options,
  );
  return request(
    {
      url: url,
      method,
      proxy,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      },
    },
    // function (err, res, body) {
    //   //   body = iconv.decode(body, encoding);
    //   if (err) {
    //     console.log(err);
    //     return err;
    //   } else {
    //     callback(body);
    //     return body;
    //   }
    // },
  );
};

export default service;
