import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [bodyPart, setBodyPart] = useState("back");
  const [images, setImages] = useState<string[]>([]);

  const generateImages = async () => {
    try {
      const response = await fetch(
        "https://rohit4242-tattoo--stable-diffusion-xl-entrypoint.modal.run/tattoo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, body_part: bodyPart, n_images: 4 }),
        }
      );

      if (response.ok) {
        const data = await response.json(); // Get the JSON response containing the base64 images
        console.log(JSON.stringify(data));
        setImages(
          data.images.map((img: string) => `data:image/png;base64,${img}`)
        );
      } else {
        console.error("Failed to generate images");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-4  mb-4">
        <Input
          type="text"
          className="text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
        />
        <Input
          type="text"
          className="text-black"
          value={bodyPart}
          onChange={(e) => setBodyPart(e.target.value)}
          placeholder="Enter body part"
        />
        <Button variant={"default"} onClick={generateImages}>
          Generate Images
        </Button>
      </div>

      <div className="flex justify-center flex-wrap items-center gap-4 ">
        {images.map((image, index) => (
          <Card key={index} className="max-w-60 w-full ">
            <CardContent className="flex justify-center items-center p-2">
              <img
                src={image}
                className="rounded-md"
                alt={`Generated Image ${index}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;
