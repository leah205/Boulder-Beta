import { useParams } from "react-router-dom";
import ClimbAttemptsCard from "@/features/climbs/components/attempts/ClimbAttemptsCard";
import ClimbCard from "@/features/climbs/components/ClimbCard";
import { ServerError } from "@/utils/Error";
import ErrorMessage from "@/components/error/ErrorMessage";
import ContentSpinner from "@/components/spinner/ContentSpinner";
import { useGetAttempts, useGetClimb } from "@/features/climbs/queries";
import ClimbDataContext from "@/features/climbs/context/ClimbDataContext";
import type React from "node_modules/@types/react/index";
import type { ClimbResponse } from "@shared/types";

type ClimbPageLayoutProps = {
  children: React.ReactNode;
};

function ClimbPageLayout({ children }: ClimbPageLayoutProps) {
  return <div className="px-2 py-6">{children}</div>;
}

export default function ClimbPage() {
  const { id: climbId } = useParams();

  const { climbLoading, climbError, climbData } = useGetClimb(Number(climbId));
  const { attemptsLoading, attemptsError, attemptsData } = useGetAttempts(
    Number(climbId),
  );

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
        <ClimbDataContext value={climbData}>
          <ClimbAttemptsCard
            pending={attemptsLoading}
            error={attemptsError}
            data={attemptsData}
          ></ClimbAttemptsCard>
        </ClimbDataContext>
      </ClimbPageLayout>
    </>
  );
}
