
"use client";
import { useImages } from "@/lib/queries";
import Image from "next/image";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface TattooProps {}

const Tattoo: FC<TattooProps> = ({}) => {
  const [prompt, setPrompt] = useState("");
  const [bodyPart, setBodyPart] = useState("back");
  const [nImages, setNImages] = useState<number>(4);
  const { mutate, data, error, isLoading } = useImages();

  const generateImages = async () => {
    mutate({ prompt, n_images: nImages });
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className=" space-y-2">
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
      {isLoading && (
        <div className="flex justify-center flex-wrap gap-4 items-center ">
          <Skeleton className=" size-60" />
          <Skeleton className=" size-60" />
        </div>
      )}
      <div className="flex justify-center flex-wrap items-center gap-4 ">
        {data?.map((image: any, index: any) => (
          <Card key={index} className="max-w-60 w-full ">
            <CardContent className="flex justify-center items-center p-2">
              <Image
                src={image}
                className="rounded-md"
                alt={`Generated Image ${index}`}
                width={1000}
                height={1000}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tattoo;
