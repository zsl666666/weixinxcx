import {
  baseURl
} from './config.js'

export default function request(options){
  return new Promise((resolve,reject) => {
    wx.request({
      url:baseURl + options.url,
      data: options.data || {},
      method:options.method || 'get',
      success:resolve,
      fail:reject
    })
  })
}