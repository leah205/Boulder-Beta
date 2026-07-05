import climbApi from "@/features/climbs/climbService";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { useParams } from "react-router-dom";
interface Props {}

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

  if (climbLoading) {
    return <Spinner></Spinner>;
  }
  if (climbError) {
    return <p>{climbError.message}</p>;
  }

  return (
    <div>
      <p>{climbData.color}</p>
    </div>
  );

  //   const {
  //     isPending: attemptsLoad,
  //     error: attemptsError,
  //     data: attemptsData,
  //   } = useQuery({
  //     queryKey: ["climb", climb_id],
  //     queryFn: async () => userApi.getAttempts(climb_id),
  //   });
  return <></>;
}
