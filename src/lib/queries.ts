// queries.ts

import { useMutation } from 'react-query';
import axios from 'axios';

const fetchImages = async (prompt: string, n_images: number) => {
  const response = await axios.post(
    'https://rohit4242-tattoo--stable-diffusion-xl-entrypoint.modal.run/tattoo',
    { prompt, n_images },
    {
      responseType: "json"
    }
  );

  const data = await response.data;
  return data.images.map((img: string) => `data:image/png;base64,${img}`);
};

export const useImages = () => {
  return useMutation(
    async ({ prompt, n_images }: { prompt: string; n_images: number }) => fetchImages(prompt, n_images),
    {
      onError: (error: any) => console.error(error),
    }
  );
};
