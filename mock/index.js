// const Mock = require('mockjs')
// const { param2Obj } = require('./utils')

// const user = require('./user')
// const table = require('./table')

// const mocks = [
//   ...user,
//   ...table
// ]

// // for front mock
// // please use it cautiously, it will redefine XMLHttpRequest,
// // which will cause many of your third-party libraries to be invalidated(like progress event).
// function mockXHR() {
//   // mock patch
//   // https://github.com/nuysoft/Mock/issues/300
//   Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
//   Mock.XHR.prototype.send = function() {
//     if (this.custom.xhr) {
//       this.custom.xhr.withCredentials = this.withCredentials || false

//       if (this.responseType) {
//         this.custom.xhr.responseType = this.responseType
//       }
//     }
//     this.proxy_send(...arguments)
//   }

//   function XHR2ExpressReqWrap(respond) {
//     return function(options) {
//       let result = null
//       if (respond instanceof Function) {
//         const { body, type, url } = options
//         // https://expressjs.com/en/4x/api.html#req
//         result = respond({
//           method: type,
//           body: JSON.parse(body),
//           query: param2Obj(url)
//         })
//       } else {
//         result = respond
//       }
//       return Mock.mock(result)
//     }
//   }

//   for (const i of mocks) {
//     Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
//   }
// }

// module.exports = {
//   mocks,
//   mockXHR
// }

// import Mock from 'mockjs'
// Mock.mock('/charts/getOne', 'get', {
//     code: 200,
//     data: {
//         label: ['日期', '销售额-1季度', '销售额-2季度'],
//         value: [
//             {'日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 3523},
//             {'日期': '1月2日', '销售额-1季度': 3533, '销售额-2季度': 1232},
//             {'日期': '1月3日', '销售额-1季度': 2523, '销售额-2季度': 9768},
//             {'日期': '1月4日', '销售额-1季度': 4588, '销售额-2季度': 5252},
//             {'日期': '1月5日', '销售额-1季度': 5632, '销售额-2季度': 2536},
//             {'日期': '1月6日', '销售额-1季度': 6773, '销售额-2季度': 4454},
//         ]
//     }
// })
// Mock.mock('/charts/getTwo', 'get', {
//     code: 200,
//     data: {
//         label: ['日期', '访问用户'],
//         value: [
//         { '日期': '1/1', '访问用户': 1393 },
//         { '日期': '1/2', '访问用户': 3530 },
//         { '日期': '1/3', '访问用户': 2923 },
//         { '日期': '1/4', '访问用户': 1723 },
//         { '日期': '1/5', '访问用户': 3792 },
//         { '日期': '1/6', '访问用户': 4593 }
//         ]
//     }
// })


