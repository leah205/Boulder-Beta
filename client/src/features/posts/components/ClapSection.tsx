import { useGetClaps } from "../queries";
import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";

type ClapSectionProps = {
    postId: number;
}

export default function ClapSection({postId}: ClapSectionProps){

    const {isPending, error, data} = useGetClaps(Number(postId));
    console.log(data);

    if(error){
        return <ErrorMessage error = {error}></ErrorMessage>
    }
    if(isPending){
        return <ContentSpinner></ContentSpinner>
    }
    if(!(data?.length)){

        return <div></div>
    }

    return <div>
        {data?.map((clap) => {
            return <li>{clap.username}</li>
        })}

    </div>


    
}