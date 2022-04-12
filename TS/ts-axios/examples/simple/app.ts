import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    test1: 1,
    test2: 2,
  },
});
