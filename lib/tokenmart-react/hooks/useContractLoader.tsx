import { useEffect, useState } from "react";

interface ContractLoaderData {
    provider: {}
}

const useContractLoader = (provider: any) => {
    const [ contracts, setContracts ] = useState();

    useEffect(() => {
        console.log('useContractLoader > loading contracts...');
    });
};

export default useContractLoader;
