/**
 * Reformats a normalize collection of behance images to an array of objects
 * with properties size and url
 * @param images
 * @returns {{size: number, url: *}[]}
 */
export const transformImages = (images) =>
  Object.keys(images || {})
      .map((size) => parseInt(size, 10))
      .sort((a, b) => (a - b))
      .map((imgSize) => ({ size: imgSize, url: images[imgSize] }))
      .filter((imageObj) => (imageObj.size && imageObj.url));
