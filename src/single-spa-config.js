import * as singleSpa from "single-spa";
import axios from "axios";

const runScript = async url => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  });
};

/**
 * 通过url去拿去子项目的stats.json文件获取子项目中的打包静态文件并进行加载，
 * 参数是拿取stats.json的url, 和需要加载stats.json中记录的那一份内容
 */

const getManifest = (url, bundle) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async resolve => {
    const { data } = await axios.get(url);
    // eslint-disable-next-line no-console
    const { entrypoints, publicPath } = data;
    const assets = entrypoints[bundle].assets;
    for (let i = 0; i < assets.length; i++) {
      await runScript(publicPath + assets[i]).then(() => {
        if (i === assets.length - 1) {
          resolve();
        }
      });
    }
  });

singleSpa.registerApplication(
  "singleChild",
  async () => {
    let singleVue = null;
    await getManifest("/api/manifest.json", "app").then(() => {
      singleVue = window.singleVue;
    });
    return singleVue;
  },
  location => location.pathname.startsWith("/child")
);
singleSpa.start(); // 启动
