import { useGetClaps } from "../queries";
import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";
import { useState } from "react";
import expandSvg from "@assets/expand.svg";
import collapseSvg from "@assets/collapse.svg";
import BasicUserTag from "@/components/BasicUserTag";

type ClapSectionProps = {
    postId: number;
}

export default function ClapSection({postId}: ClapSectionProps){
    const [clapsOpen, setClapsOpen] = useState(false);


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
        <div className = "flex justify-between w-30">

            <p>Claps</p>
            <button onClick={() => setClapsOpen(!clapsOpen)}>
                <img
              src={clapsOpen ? collapseSvg : expandSvg}
              className="w-5"
            ></img>
            </button>
            </div>
       
        {clapsOpen && data?.map((clap) => {
            const user = {username: clap.username, id: clap.userId}
            return <li className = "list-none" key = {clap.id}><BasicUserTag user = {user}></BasicUserTag></li>
        })}

    </div>


    
}