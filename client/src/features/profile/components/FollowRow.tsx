import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import useFollowUser from "@/hooks/useFollowUser";
import Button from "@/components/Button";

type FollowingRowProps = {
  user: {
    id: number;
    username: string;
  };
};

export default function FollowingRow({ user }: FollowingRowProps) {
  const { toggleFollowUser, isPending, error } = useFollowUser(user.id);

  function clickUnfollow() {
    toggleFollowUser();
  }

  return (
    <div className="flex gap-3">
      {isPending && <Spinner></Spinner>}
      {error && <ErrorMessage error={error}></ErrorMessage>}
      <p>{user.username}</p>
      <Button
        className="p-3 h-5 text-xs flex items-center rounded-sm text-white"
        variant="red"
        onClick={clickUnfollow}
      >
        Unfollow
      </Button>
    </div>
  );
}
