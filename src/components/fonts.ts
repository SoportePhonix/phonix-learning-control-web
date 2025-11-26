import { Bebas_Neue, Instrument_Sans, Prompt, Roboto } from 'next/font/google';

export const roboto = Roboto({ subsets: ['latin'], weight: ['100', '400', '700'] });
export const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });
export const instrumentSans = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
export const prompt = Prompt({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
