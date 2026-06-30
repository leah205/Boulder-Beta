import { useQuery } from "@tanstack/react-query";
import userApi from "@/features/users/userService";
import Spinner from "@/components/Spinner";
import type { Climb } from "@shared/types";
import { Link } from "react-router-dom";

type climbStats = Pick<
  Climb,
  "id" | "grade" | "rating" | "attempt_num" | "sent"
>;
type climbCardProps = {
  climb: climbStats;
};

function ClimbCard(props: climbCardProps) {
  const climb = props.climb;
  return (
    <div className=" text-center hover:bg-mist-50 p-6 rounded-md border-1 border-mist-400 shadow-sm w-50 h-50">
      <h2 className="text-xl">
        <Link to={`${climb.id}`}>View Log</Link>
      </h2>
      {climb.grade && <p>{climb.grade}</p>}
      {climb.rating && <p>{climb.rating}</p>}
      {climb.attempt_num && <p>{climb.attempt_num}</p>}
      {climb.sent && <p>sent!</p>}
    </div>
  );
}

export default function LogClimbPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["myclimbs"],
    queryFn: async () => userApi.getMyClimbs(),
  });

  if (isPending) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const climbs: climbStats[] = data.climbs;
  return (
    <>
      {climbs.map((climb) => {
        return <ClimbCard key={climb.id} climb={climb}></ClimbCard>;
      })}
    </>
  );
}
