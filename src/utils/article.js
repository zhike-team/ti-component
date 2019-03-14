import { compact, get, map, sortBy, mapValues } from 'lodash';

// 组合样式标记
const groupMarkupsByPId = source => {
  const mappings = {};
  (source || []).forEach(item => {
    (mappings[item.pid] || (mappings[item.pid] = [])).push(item);
  });

  return mapValues(mappings, arr => sortBy(arr, 'index'));
};

// 序列化文章
export const normalizeArticle = (origin, decorator = {}, isTextOnly) => {
  const { paragraphs, ...rest } = origin;

  const paragraphMarkups = groupMarkupsByPId(
    isTextOnly ? origin.paragraphMarkup : decorator.paragraphMarkup,
  );

  const inlineMarkups = groupMarkupsByPId(
    isTextOnly ? origin.inlineMarkup : decorator.inlineMarkup,
  );

  let hasAnchor = false;

  // 生成新的段落
  const newParapraphs = map(paragraphs, p => {
    const anchor = !isTextOnly && get(decorator, 'articleMarkup.anchorPid') === p.id;

    if (anchor) {
      hasAnchor = true;
    }

    return {
      ...p,
      markups: paragraphMarkups[p.id] || [],
      inlineMarkups: inlineMarkups[p.id] || [],
      anchor,
    };
  });

  return {
    ...rest,
    hasAnchor,
    paragraphs: compact(newParapraphs),
  };
};
