"use client";
import { useImages } from "@/lib/queries";
import Image from "next/image";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  Select,
  SelectContent, SelectItem, SelectTrigger
} from "./ui/select";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl, FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";

interface TattooProps {}

const tattooStyles = [
  "Traditional",
  "Neo-Traditional",
  "Blackwork",
  "Watercolor",
  "Geometric",
  "Tribal",
  "Realism",
  "New School",
  // Add more styles as needed
];
const FormSchema = z.object({
  prompt: z.string({
    required_error: "Please enter an prompt.",
  }),
  style: z.string(),
  bodyPart: z.string().optional(),
  nImages: z.string().optional(),
});
const Tattoo: FC<TattooProps> = ({}) => {
  const [style, setStyle] = useState("Treditional");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      style: style,
      bodyPart: "back",
      nImages: "2",
    },
  });

  const onStyleChange = (style: string) => {
    setStyle(style);
    form.setValue("style", style);
  };

  const { mutate, data, error, isLoading } = useImages();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    mutate(data);
  }
  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `tattoo_image_${index}.png`;
    link.click();
  };
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className=" space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center gap-4 items-center">
              <FormField
                control={form.control}
                name="bodyPart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Part</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a Body Part" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="nImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Images</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a Number of Images"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tattoo Style</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a Tattoo Style" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Styles</FormLabel>
                <Select onValueChange={onStyleChange} value={style}>
                  <SelectTrigger></SelectTrigger>
                  <SelectContent>
                    <div className="grid grid-cols-2 gap-4">
                      {tattooStyles.map((styleOption) => (
                        <SelectItem
                          key={styleOption}
                          value={styleOption}
                          className={cn(
                            style === styleOption &&
                              "border-teal-500 border-4 rounded-xl"
                          )}
                        >
                          <Image
                            src="/watercolor.png"
                            className="mr-2 mb-2 shrink-0 rounded-md"
                            width={100}
                            height={100}
                            alt={styleOption}
                          />
                          <p className="line-clamp-1 text-center">
                            {styleOption}
                          </p>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
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
                <div className="relative group">
                  <Image
                    src={image}
                    className="rounded-md"
                    alt={`Generated Image ${index}`}
                    width={1000}
                    height={1000}
                  />
                  <div className="absolute inset-0 mx-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <Button
                      variant="outline"
                      onClick={() => downloadImage(image, index)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tattoo;
