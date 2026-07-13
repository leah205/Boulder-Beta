import climbApi from "@/features/climbs/climbService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ClimbAttemptsCard from "@/features/climbs/components/ClimbAttemptsCard";
import ClimbCard from "@/features/climbs/components/ClimbCard";
import { ServerError } from "@/utils/Error";
import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";

function ClimbPageLayout({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-6">{children}</div>;
}

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
  if (climbLoading) {
    return (
      <ClimbPageLayout>
        <ContentSpinner></ContentSpinner>
      </ClimbPageLayout>
    );
  }

  if (climbError instanceof ServerError) {
    if (climbError.status == 404 || climbError.status == 403) {
      return <ErrorMessage error={climbError}></ErrorMessage>;
    }
  }
  return (
    <>
      <ClimbPageLayout>
        <ClimbCard
          pending={climbLoading}
          error={climbError}
          data={climbData}
        ></ClimbCard>
        <ClimbAttemptsCard
          pending={attemptsLoading}
          error={attemptsError}
          data={attemptsData}
        ></ClimbAttemptsCard>
      </ClimbPageLayout>
    </>
  );
}
