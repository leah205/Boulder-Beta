import { useQuery } from "@tanstack/react-query";
import userApi from "@/features/users/userService";
import Spinner from "@/components/Spinner";
import type { Climb } from "@shared/types";

type climbCardProps = {
  climb: Climb;
};

function ClimbCard(props: climbCardProps) {
  const climb = props.climb;
  const bgStyle = climb.picture
    ? { backgroundImage: `url(${climb.picture})`, backgroundSize: "cover" }
    : undefined;
  return (
    <div
      className={`text-center hover:bg-mist-50 p-6 rounded-md border-1 border-mist-300 shadow-sm w-50 h-50`}
      style={bgStyle}
    >
      {climb.grade && (
        <p className="text-white bg-black rounded-sm">{climb.grade}</p>
      )}
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
  console.log(data);
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
