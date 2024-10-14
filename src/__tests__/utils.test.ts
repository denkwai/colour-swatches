import {
    createImageUrl,
    createImageSrcset,
    formatPrice
} from '../utils';

describe('createImageUrl()', () => {
    it('should return base image url when called empty', () => {
        expect(createImageUrl()).toMatch('https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_200,q_auto,w_300');
    });

    it('should attach an argument to the end of base image url', () => {
        expect(createImageUrl('/test.png')).toMatch('https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_200,q_auto,w_300/test.png');
    });

    it('should return a hires url when used with hires parameter', () => {
        expect(createImageUrl('/test.png', true)).toMatch('https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_400,q_auto,w_600/test.png');
    });
});

describe('createImageSrcset()', () => {
    it('should create a string with two urls (lo-res and hi-res) for the same image', () => {
        expect(createImageSrcset('/test.png')).toMatch('https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_200,q_auto,w_300/test.png, https://cdn.teufelaudio.com/image/upload/c_fill,f_auto,h_400,q_auto,w_600/test.png 2x');
    });
})

describe('formatPrice()', () => {
    Object.defineProperty(document, 'documentElement', {
        value: { lang: 'de-DE' }
    });

    it('should show the formatted price', () => {
        expect(formatPrice(250)).toMatch('2,50\xa0€');
    });
});