import useCurrentUser from "@/hooks/useCurrentUser";
import AboutSection from "@/features/profile/components/AboutSection";
import RelationshipSection from "@/features/profile/components/RelationshipSection";


export default function ProfilePage() {
  const currentUser = useCurrentUser();
 
  

  return (
    <div className="w-150 m-auto border-1 border-mist-300 h-150 my-20 p-6 max-w-4/5 bg-mist-50">
            <AboutSection user = {currentUser}></AboutSection>
         <RelationshipSection user = {currentUser}></RelationshipSection>
    </div>
  );
}
