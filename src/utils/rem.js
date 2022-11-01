function isPc() {
  const u = navigator.userAgent;
  const isAndroid = u.includes('Android') || u.includes('Adr'); //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return !(isiOS || isAndroid);
}

function setRem(designWidth, maxWidth) {
  const doc = document;
  const win = window
  const docEl = doc.documentElement;
  let tid;
  let rootItem, rootStyle;

  function refreshRem() {
    let width = docEl.getBoundingClientRect().width;
    if (width > maxWidth) width = maxWidth;

    if (isPc() && width <= 1000) width = 1000; //pc最小宽度1000
    const rem = width * 50 / designWidth;

    //兼容UC开始
    rootStyle = "html{font-size:" + rem + 'px !important}';
    rootItem = document.getElementById('rootsize') || document.createElement("style");
    if (!document.getElementById('rootsize')) {
      document.getElementsByTagName("head")[0].appendChild(rootItem);
      rootItem.id = 'rootsize';
    }
    if (rootItem.styleSheet) {
      rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle)
    } else {
      try {
        rootItem.innerHTML = rootStyle
      } catch (f) {
        rootItem.innerText = rootStyle
      }
    }
    //兼容UC结束
    docEl.style.fontSize = rem + "px";
  }
  refreshRem();

  win.addEventListener("resize", function () {
    clearTimeout(tid); //防止执行两次
    tid = setTimeout(refreshRem);
  }, false);

  win.addEventListener("pageshow", function (e) {
    if (e.persisted) { // 浏览器后退的时候重新计算
      clearTimeout(tid);
      tid = setTimeout(refreshRem);
    }
  }, false);

  document.addEventListener('DOMContentLoaded', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  })
  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function () {
      doc.body.style.fontSize = "16px";
    }, false);
  }
}

if (isPc()) {
  setRem(960, 1920)
  document.documentElement.setAttribute('class', 'pc')
} else {
  setRem(375, 750)
  document.documentElement.setAttribute('class', 'mobile')
}
