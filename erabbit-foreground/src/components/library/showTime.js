// 倒计时
// var day = 0
var hour = '00'
var min = '00'
var second = '00'
function countTime (timeStr) {
  // 获取当前时间
  const date = new Date()
  const now = date.getTime()
  // 设置截止时间
  const endDate = new Date(timeStr) // 需要倒计时的日期
  const end = endDate.getTime()

  // 时间差
  const leftTime = end - now

  // type参数: 0-距离开始 1-距离结束（2个小时）2-已结束
  let type

  // 定义变量 d,h,m,s保存倒计时的时间
  if (leftTime >= 0) {
    // 天
    // day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
    // 时
    const h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
    hour = h < 10 ? '0' + h : h
    // 分
    const m = Math.floor(leftTime / 1000 / 60 % 60)
    min = m < 10 ? '0' + m : m
    // 秒
    const s = Math.floor(leftTime / 1000 % 60)
    second = s < 10 ? '0' + s : s

    type = 0
  } else {
    const sTime = (end + 7200 * 1000) - now
    if (sTime >= 0) {
      const h = Math.floor(sTime / 1000 / 60 / 60 % 24)
      hour = h < 10 ? '0' + h : h
      // 分
      const m = Math.floor(sTime / 1000 / 60 % 60)
      min = m < 10 ? '0' + m : m
      // 秒
      const s = Math.floor(sTime / 1000 % 60)
      second = s < 10 ? '0' + s : s
      type = 1
    } else {
      // day = 0
      hour = '00'
      min = '00'
      second = '00'
      type = 2
    }
  }
  // 等于0的时候不调用
  if (Number(hour) === 0 === 0 && Number(min) === 0 && Number(second) === 0) {
    return
  } else {
  // 递归每秒调用countTime方法，显示动态时间效果,
    setTimeout(countTime, 1000)
  }
  var reMin = endDate.getMinutes()
  if (reMin === 0) {
    reMin = '00'
  }
  const startTime = endDate.getHours() + ':' + reMin
  const reTime = hour + ':' + min + ':' + second

  return { type, timeStr, startTime, reTime }
}

export default function countTimeFun (ck, t) {
  setInterval((t) => {
    const arrayPush = []
    for (let i = 0; i < t.length; i++) {
      arrayPush.push(countTime(t[i]))
    }
    // console.log(arrayPush)
    ck(arrayPush)
  }, 1000, t)
}
