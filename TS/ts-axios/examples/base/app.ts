import axios from '../../src/index'

/**
 * 如下的方法是测试 get 请求时，对参数信息的处理
// array
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['foo', 'bar'],
  },
});

// object
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'barz',
    }
  },
});

// date
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date(),
  },
});

// special characters
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$,+[]',
  },
});

// null
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'foo',
    bar: null,
  },
});

// url contain hash value
axios({
  method: 'get',
  url: '/base/get#hashvalue',
  params: {
    foo: 'url hash value',
  },
});

// url contain ?
axios({
  method: 'get',
  url: '/base/get?foo=urlfoo',
  params: {
    bar: 'barz',
  }
});
 */

/**
 * 如下的测试是，检测 post 请求中对 data 的处理
 */
/**
 * post 请求时，请求参数是普通对象
 * 这里不设置 header 中的 Content-Type 时，其默认值为 Content-Type: text/plain;chrset=UTF-8，传给服务端的数据会被当做普通字符串，
 * 而我们实际传入的是 json 字符串，会导致接口的返回值为空对象
 */
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     foo: 1,
//     bar: 2,
//   },
// });
// // post 请求时，请求参数是 array buffer 数据
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: new Int32Array([21, 31]),
// });

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application/json, text/plain, */*',
//   },
//   data: {
//     a: 1,
//     b: 2,
//   },
// });

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// 没有设置 responseType 类型时的返回值，它的 data 应该是一个 string
axios({
  method: 'post',
  url: '/base/post',
  data: {
    foo: 1,
    bar: 2,
  },
}).then(res => {
  console.log('--res:', res);
});

// 设置 responseType 为 json，它的 data 应该是一个 object
axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    foo: 3,
    bar: 4,
  },
}).then(res => {
  console.log('--res:', res);
});

