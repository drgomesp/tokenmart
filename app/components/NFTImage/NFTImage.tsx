import { FC } from "react";
import { Image } from "@mantine/core";

interface NFTImageProps {
    uri: string,
    style?: {},
}

const NFTImage: FC<NFTImageProps> = ({ uri, style = {} }) => {
    return <Image src={uri} style={style}/>;
};

export default NFTImage;
