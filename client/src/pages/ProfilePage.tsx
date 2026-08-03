import useAuth from "@/features/authentication/useAuth";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollowUser from "@/hooks/useFollowUser";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";

type FollowingRowProps = {
  user: {
    id: number;
    username: string;
  };
};

function FollowingRow({ user }: FollowingRowProps) {
  const { toggleFollowUser, isPending, error } = useFollowUser(user.id);

  function clickUnfollow(e) {
    e.preventDefault();
    toggleFollowUser();
  }

  return (
    <div className="flex gap-3">
      {isPending && <Spinner></Spinner>}
      {error && <ErrorMessage error={error}></ErrorMessage>}
      <p>{user.username}</p>
      <button
        className="bg-red-400 p-3 h-5 text-xs flex items-center rounded-sm text-white"
        onClick={clickUnfollow}
      >
        Unfollow
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const currentUser = useCurrentUser();

  return (
    <div className="w-80 m-auto border-1 h-100 my-10 p-6 max-w-4/5 bg-mist-50">
      <p className="text-xl mb-5">{currentUser.username}</p>
      <div>
        <p className=" bg-blue-100 rounded-md p-3 my-3">Following: </p>
        <ul>
          {currentUser.following.map((user) => {
            return <FollowingRow user={user} key={user.id}></FollowingRow>;
          })}
        </ul>
        <p className=" bg-blue-100 rounded-md p-3 my-3">Followers: </p>
        <ul>
          {currentUser.followedBy.map((user) => {
            return <p key={user.id}>{user.username}</p>;
          })}
        </ul>
      </div>
    </div>
  );
}
