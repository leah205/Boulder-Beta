import Spinner from "@/components/spinner/Spinner";
import type { ClimbResponse } from "@shared/types";
import { Link } from "react-router-dom";
import ClimbPic from "@/features/climbs/components/ClimbPic";
import ErrorMessage from "@/components/error/ErrorMessage";
import { useGetClimbs } from "@/features/climbs/queries";
import sentSvg from "@assets/sent.svg";
import PageHeader from "@/components/PageHeader";

type climbCardProps = {
  climb: ClimbResponse;
};

function ClimbCard(props: climbCardProps) {
  const climb = props.climb;

  return (
    <Link data-testid="climb-card" to={`/climbs/${climb.id}`}>
      <ClimbPic picture={climb.picture || undefined} color={climb.color}>
        {climb.sent && (
          <img
            data-testid="sent-check"
            className="text-white absolute top-0 right-0 h-8 w-8 "
            src={sentSvg}
          />
        )}
        {climb.grade && (
          <p
            className="text-white bg-black absolute bottom-0 w-full"
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
  const { isPending, error, data } = useGetClimbs();
  console.log(data);
  if (isPending) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  return (
    <>
      <div className="flex flex-row gap-10 p-5 pb-20 w-full justify-center flex-wrap">
        {data &&
          data.map((climb) => {
            return <ClimbCard key={climb.id} climb={climb}></ClimbCard>;
          })}
      </div>
    </>
  );
}
