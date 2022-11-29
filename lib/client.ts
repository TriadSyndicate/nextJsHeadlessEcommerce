import  SanityClient  from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = SanityClient({
    projectId:'ln1jpkh1',
    dataset:'production',
    apiVersion:'2022-11-28',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = ImageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source).toString()