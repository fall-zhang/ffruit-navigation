import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  mongoose: {
    enable: true // 开启插件
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  }
}

export default plugin
