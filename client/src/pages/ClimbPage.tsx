import climbApi from "@/features/climbs/climbService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ClimbPageLayout from "@/features/climbs/components/ClimbPageLayout";
import AttemptsCard from "@/features/climbs/components/AttemptsCard";
import ClimbCard from "@/features/climbs/components/ClimbCard";

//
export default function ClimbPage() {
  const { id: climbId } = useParams();
  const {
    isPending: climbLoading,
    error: climbError,
    data: climbData,
  } = useQuery({
    queryKey: ["climb", climbId],
    queryFn: async () => climbApi.getClimb(Number(climbId)),
  });

  const {
    isPending: attemptsLoading,
    error: attemptsError,
    data: attemptsData,
  } = useQuery({
    queryKey: ["climb", "attempts", climbId],
    queryFn: async () => climbApi.getAttempts(Number(climbId)),
  });

  return (
    <>
      <ClimbPageLayout>
        <ClimbCard
          pending={climbLoading}
          error={climbError}
          data={climbData}
        ></ClimbCard>
        <AttemptsCard
          pending={attemptsLoading}
          error={attemptsError}
          data={attemptsData}
        ></AttemptsCard>
      </ClimbPageLayout>
    </>
  );
}
