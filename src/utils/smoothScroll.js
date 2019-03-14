// 动画曲线函数, 可自行添加更多曲线函数
export const animationCurve = {
  linear: (current, duration) => current / duration,
  easeOut: (current, duration) => 1 - (1 - current / duration) ** 5,
};

// 自动寻找第一个支持滚动的父元素
export const findScrollParent = element => {
  if (element.parentNode.tagName === 'BODY') {
    return global.document.body;
  } else if (['scroll', 'auto'].includes(global.getComputedStyle(element.parentNode).overflowY)) {
    return element.parentNode;
  }
  return findScrollParent(element.parentNode);
};

// 自然滚动函数
export const smoothScroll = ({
  element, // 需要滚动到可视区域的元素
  position = 'center', // 滚动的位置，可选择start/center/end，默认滚动到屏幕中央
  horizon = false, // 是否横向滚动，默认否
  duration = 800, // 动画时长，默认800ms
  curve = 'easeOut', // 动画曲线函数，默认 easeOut
  callback = () => {}, // 滚动结束后的回调函数
}) => {
  if (!element) return;
  const parent = findScrollParent(element);
  const parPos = parent.getBoundingClientRect();
  const elePos = element.getBoundingClientRect();
  const startAt = horizon ? parent.scrollLeft : parent.scrollTop;
  let endAt;

  switch (position) {
    case 'start': {
      endAt = horizon
        ? startAt + (elePos.left - parPos.left)
        : startAt + (elePos.top - parPos.top);
      break;
    }
    case 'center': {
      endAt = horizon
        ? startAt + (elePos.left - parPos.left) - (parPos.width - elePos.width) / 2
        : startAt + (elePos.top - parPos.top) - (parPos.height - elePos.height) / 2;
      break;
    }
    default: {
      endAt = horizon
        ? startAt + (elePos.left - parPos.left) - (parPos.width - elePos.width)
        : startAt + (elePos.top - parPos.top) - (parPos.height - elePos.height);
      break;
    }
  }

  const animation = (stamp, startStamp) => {
    if (!startStamp) startStamp = stamp // eslint-disable-line

    const percent = animationCurve[animationCurve[curve] ? curve : 'easeOut'](stamp - startStamp, duration);

    parent[horizon ? 'scrollLeft' : 'scrollTop'] = startAt + (endAt - startAt) * percent;
    percent < 1
      ? global.requestAnimationFrame(stamp => {
        animation(stamp, startStamp);
      })
      : callback();
  };

  global.requestAnimationFrame(stamp => {
    animation(stamp, null);
  });
};
