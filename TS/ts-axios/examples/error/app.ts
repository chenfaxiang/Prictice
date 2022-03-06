import axios, { AxiosError } from '../../src/index'

// 404
axios({
  method: 'get',
  url: '/error/get1',
}).then(res => {
  console.log('404 response:', res);
}).catch(err => {
  console.log('404 error:', err);
});

// 一定几率出现正常请求或者 500
axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log('success response:', res);
}).catch(err => {
  console.log('error:', err);
});

// 利用 chrome 的 devtools 面板上的 offline 功能模拟网络断开
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get',
  }).then(res => {
    console.log('网络断开 response:', res);
  }).catch(err => {
    console.log('网络断开 error:', err);
  });
}, 5000);

// 网络超时
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000,
}).then(res => {
  console.log('请求超时 response:', res);
}).catch((err: AxiosError) => {
  console.log('请求超时 error.message:', err.message);
  console.log('请求超时 error.code:', err.code);
  console.log('请求超时 error.config:', err.config);
  console.log('请求超时 error.isAxiosError:', err.isAxiosError);
  console.log('请求超时 error.request:', err.request);
  console.log('请求超时 error.response:', err.response);
});