
import Spinner from "@/components/spinner/Spinner";

import { useParams } from "react-router-dom";
import { useGetUser } from "@/features/users/queries";
import AboutSection from "@/features/profile/components/AboutSection";
import RelationshipSection from "@/features/profile/components/RelationshipSection";
import ErrorMessage from "@/components/error/ErrorMessage";

export default function ProfilePage() {
  const {id: userId} = useParams()
  const {isPending, error, user} = useGetUser(Number(userId));
  if(!user){
    throw new Error("User does not exist");
  }

  if(error){
    return <ErrorMessage error = {error}></ErrorMessage>
  }

  if(isPending){
    return <Spinner></Spinner>
  }

  return (
    <div className="w-150 m-auto border-1 border-mist-300 h-150 my-20 p-6 max-w-4/5 bg-mist-50">
      <AboutSection user = {user}></AboutSection>
   <RelationshipSection user = {user}></RelationshipSection>

 
    </div>
  );
}
