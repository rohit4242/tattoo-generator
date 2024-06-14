
import { useMutation } from "react-query";
import axios from "axios";
import { z } from "zod";
const FormSchema = z.object({
  prompt: z.string({
    required_error: "Please enter a prompt.",
  }),
  style: z.string(),
  bodyPart: z.string().optional(),
  nImages: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

const fetchImages = async (formData: FormData) => {
  const { prompt, style, bodyPart, nImages } = formData;

  const response = await axios.post(
    "https://rohit4242-tattoo--tattoo-generator-entrypoint.modal.run/tattoo",
    { prompt, body_part: bodyPart, style, n_images: Number(nImages) },
    {
      responseType: "json",
    }
  );

  const data = await response.data;
  return data.images.map((img: string) => `data:image/png;base64,${img}`);
};

export const useImages = () => {
  return useMutation(async (formData: FormData) => fetchImages(formData), {
    onError: (error: any) => console.error(error),
  });
};
