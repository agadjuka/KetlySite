/**
 * Конфигурация виджета Virtual Try-On (Vion).
 * Свои фото: положите в public/virtual-tryon/ (см. имена ниже).
 * Пока своих нет — виджет использует демо-URL.
 */

const BASE = '/virtual-tryon';
const DEMO_ORIGINAL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAE6NkVsm4bjYYGQKaIdWY1EexoZdT8mHwsEbWw6L0mLP4mCju1x1AP_Kw81sEmqwap3zVf7MIpeafgT64xyIqma_Nl2x9LfwcCog--3xEjm3bPgB6dXULg93BheTeqPEzUbUB5Rm41aioWKMsyjLbznAOrKU7-bPtTKNOjQm0-m_phdTrcBJsBXy0knlGVCWQ_7OHjbEyRggLDbPbS-IIK62lYb6HcqAhjsHp_nKSTwY0fbplw8HRdRjwCRLSGU3ikbTgpn5JvvLCU';
const DEMO_RESULT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAO-yu5MlxKETaO2o_XG8aXUL8Da7G0zIDI4ynyQW3VfTh9bi2VZGSQSS3ZGfOdgXxfEZ66FXNmoZXhDq4AwYjVHluB64RHYiW-aekwsf6i475_eZHrMXUl9Is9t8eueBXZPd9GGNJbJKMMNPxlLpvVHs52cxdpULjqSYEBKCokGB_7qZBHtCO65HeMpYFAOBxMYgsUV6580ZqxjNJUhAQew6E14MxKuQTI-6hiRJp_LgrlhJb-iWZiRq7TjQJ3qhrKnx35LqgH_B_5';
const DEMO_GARMENTS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCwu-nciQ5Ugh6FNsiONppwpWZdtcCmgWqz2h4oVR4gUv3N_xaUhbeIJP2WP4lMBQTbPE5hFtKBmPreYhJZqfhUkti1XBpFavhN5FaUUypzTXVcEPjW24RvkFs5__jljn-yZvaPH4bBboLY2EDRJYaS7HNC_3tg-XT2LFlR3uu8UHy6qOqheIbyGaRqOtbQcQQmb4lgHvIHOSVXTd31wpuq_s8sNNGdCau31tO2TSPq1dCLW3D9J9nj4kG6_qIr8vADRhhtWHwozTYD',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBPuhMb4kJOkCRJCEZNHdXWB21u2ST6Xne58ZtNqVpQ8fMUHzGF7DytYvwEKEM7k_ah_cikzomGHSTBtDT1Z5v0qqJb6FXFMxLEACkX0VNgxcOsbkj0m0BqC5jauSKFrxFYteRetnxKBEby3zaoLsu2v6Va90voJSXiys1nYljW8DSvuGKugnyHJF-Jt4p6uMZ-RE6XXBEvIIJfKUUTmT_OT0Tl_G9tk-VJUQEhUnIJDVysNsdLSwh0BrSam81nvtGYS9wpkyqWrlJz',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAWgZlT2MIfVVEaRhBhiN8EpVAI4XKbbY4HjE0t6ry7TmxNh3t6XwY5UeZ3AobvijxhiEmDotJp_g1r8u7O1bt7tmBuis3xmkSIOkO0hlvNfzaS22PR_PLijSiZnpeYzpEwSet-TdWIEjIcQYw9RSetqRmdWXU2gbcVYTQkVm1Nez-cUd0xi5bfrJq_SvOiPpjJhbesKx42nnkuq0rbsifE9AHeIPFSVxNzYal-vfwmc2-M5HLNfy8E3rlqUpasmzboaaP-PlIsKX62',
];

export interface GarmentItem {
  id: number;
  garmentImage: string;
  resultImage: string;
  labelShort: string;
  labelLong: string;
  category?: string;
}

const USE_LOCAL =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_VION_USE_LOCAL === 'true';

export const VIRTUAL_TRYON_IMAGES = {
  original: USE_LOCAL ? `${BASE}/original.jpg` : DEMO_ORIGINAL,
} as const;

export const VIRTUAL_TRYON_GARMENTS: GarmentItem[] = [
  {
    id: 0,
    garmentImage: USE_LOCAL ? `${BASE}/garment-1.jpg` : DEMO_GARMENTS[0]!,
    resultImage: USE_LOCAL ? `${BASE}/result-1.jpg` : DEMO_RESULT,
    labelShort: 'Essential',
    labelLong: 'Black Blazer',
    category: 'Essential',
  },
  {
    id: 1,
    garmentImage: USE_LOCAL ? `${BASE}/garment-2.jpg` : DEMO_GARMENTS[1]!,
    resultImage: USE_LOCAL ? `${BASE}/result-2.jpg` : DEMO_RESULT,
    labelShort: 'Premium',
    labelLong: 'Silk Blue Dress',
    category: 'Premium',
  },
  {
    id: 2,
    garmentImage: USE_LOCAL ? `${BASE}/garment-3.jpg` : DEMO_GARMENTS[2]!,
    resultImage: USE_LOCAL ? `${BASE}/result-3.jpg` : DEMO_RESULT,
    labelShort: 'Bespoke',
    labelLong: 'Evening Gown',
    category: 'Bespoke',
  },
];

/** Пути для своих фото (положите в public/virtual-tryon/): original.jpg, garment-1..3.jpg, result-1..3.jpg */
export const VIRTUAL_TRYON_ASSET_PATHS = {
  original: `${BASE}/original.jpg`,
  garments: [`${BASE}/garment-1.jpg`, `${BASE}/garment-2.jpg`, `${BASE}/garment-3.jpg`] as const,
  results: [`${BASE}/result-1.jpg`, `${BASE}/result-2.jpg`, `${BASE}/result-3.jpg`] as const,
} as const;
