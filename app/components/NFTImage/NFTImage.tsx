import { FC } from "react";
import { Image } from "@mantine/core";

interface NFTImageProps {
    id: number,
    uri: string,
}

const NFTImage: FC<NFTImageProps> = ({ id, uri }) => {
    return (
        <>
            <Image src={uri}/>
        </>
    );
};

export default NFTImage;
