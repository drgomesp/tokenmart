import { FC } from "react";
import { Image } from "@mantine/core";

interface NFTImageProps {
    id: number,
    uri: string,
    style?: {},
}

const NFTImage: FC<NFTImageProps> = ({ id, uri, style = {} }) => {
    return <Image src={uri} style={style}/>;
};

export default NFTImage;
