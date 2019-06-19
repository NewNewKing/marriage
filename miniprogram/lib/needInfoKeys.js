const obj = {
  common: ["$ready", "$style"],
  // 首页
  ["pages/index/index"]: [
    "$groom",
    "$bride",
    "$indexBanners",
    "$address",
    "$time",
    "$indexFlashTexts"
  ],
  // 相册
  ["pages/photo/index"]: ["$photos"],
  // 导航
  ["pages/navigator/index"]: [
    "$markers",
    "$address",
    "$phone1",
    "$phone2",
    "$hotel",
    "$lon",
    "$lat"
  ],
  // 评论
  ["pages/comment/index"]: []
}

module.exports = obj
