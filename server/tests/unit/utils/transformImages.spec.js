import { transformImages } from '../../../src/utils/transformImages';

describe('(transformImages Util)', () => {
  let result;

  beforeEach(() => {
    result = transformImages(imageCollection);
  });
  /**
   * This is modeled after how Behance returns image collections.
   * The key is a string representing the size in pixels of the image,
   * and the value is the url
   * @type {{'50': string, '100': string, '500': string, '1000': string, original: string}}
   */
  const imageCollection = {
    '50': 'http://example.com/image1.png',
    '100': 'http://example.com/image2.png',
    '500': 'http://example.com/image3.png',
    '1000': 'http://example.com/image4.png',
    'original': 'http://example.com/image.png'
  };

  /**
   * This is the desired output. We ignore the 'original', because
   * we'll be using the pixel sizes to determine which image to display
   * @type {*[]}
   */
  const expectedCollection = [
    { size: 50, url: 'http://example.com/image1.png' },
    { size: 100, url: 'http://example.com/image2.png' },
    { size: 500, url: 'http://example.com/image3.png' },
    { size: 1000, url: 'http://example.com/image4.png' }
  ];

  it('should return an array', () => {
    expect(result).to.be.an('array');
  });

  it('should transform to the expected format', () => {
    expect(result).to.eql(expectedCollection);
  });

  it('should discard the "original" element', () => {
    const sizes = result.map(({ size }) => size);
    expect(sizes).to.not.contain('original');
  });

  it('should create a size and url property on each element of the array', () => {
    result.forEach((image) => {
      expect(image).to.have.all.keys('size', 'url');
    });
  });

  it('should convert the size to a number', () => {
    result.forEach(({ size }) => {
      expect(size).to.be.a('Number');
    });
  });
});
