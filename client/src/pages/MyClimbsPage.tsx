import { useQuery } from "@tanstack/react-query";
import userApi from "@/features/users/userService";
import Spinner from "@/components/Spinner";
import type { Climb } from "@shared/types";
import { Link } from "react-router-dom";
import ClimbPic from "@/features/climbs/components/ClimbPic";

type climbCardProps = {
  climb: Climb;
};

function ClimbCard(props: climbCardProps) {
  const climb = props.climb;

  return (
    <Link to={`/climbs/${climb.id}`}>
      <ClimbPic picture={climb.picture} color={climb.color}>
        {climb.sent && (
          <img
            className="text-white absolute top-0 right-0 h-8 w-8 "
            src="./src/assets/sent.svg"
          />
        )}
        {climb.grade && (
          <p
            className="text-white bg-black rounded-sm"
            style={{ backgroundColor: climb.color }}
          >
            {climb.grade}
          </p>
        )}
      </ClimbPic>
    </Link>
  );
}

export default function MyClimbPage() {
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
  return (
    <>
      <h1>My Climbs</h1>
      <div className="flex flex-row gap-10 p-5 w-full justify-center flex-wrap">
        {data &&
          data.map((climb) => {
            return <ClimbCard key={climb.id} climb={climb}></ClimbCard>;
          })}
      </div>
    </>
  );
}
