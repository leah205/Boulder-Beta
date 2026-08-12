
import Spinner from "@/components/spinner/Spinner";

import AboutSection from "@/features/profile/components/AboutSection";
import RelationshipSection from "@/features/profile/components/RelationshipSection";
import ErrorMessage from "@/components/error/ErrorMessage";
import useProfileUser from "@/features/profile/hooks/useProfileUser";
import PageLayout from "@/layouts/PageLayout";

export default function ProfilePage() {

  const {user, isPending, error, isSelf} = useProfileUser();

 

  if(error){
    return  <PageLayout>    <ErrorMessage error = {error}></ErrorMessage></PageLayout>
    

  }

  if(isPending){
    return <Spinner></Spinner>
  }

   if(!user){
    throw new Error("User does not exist");
  }

  return (
    <PageLayout>

        <div className="w-150 m-auto border-1 border-mist-300 h-150 my-20 p-6 max-w-4/5 bg-mist-50">
      <AboutSection user = {user} isSelf = {isSelf}></AboutSection>
   <RelationshipSection user = {user} isSelf = {isSelf}></RelationshipSection>

 
    </div>
    </PageLayout>
  
  );
}
