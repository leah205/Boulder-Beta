import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import useFollowUser from "@/hooks/useFollowUser";
import Button from "@/components/Button";
import UserTag from "@/components/UserTag";

type FollowingRowProps = {
  user: {
    id: number;
    username: string;
  };
  isSelf: boolean;
};

export default function FollowingRow({ user, isSelf}: FollowingRowProps) {
  const { toggleFollowUser, isPending, error } = useFollowUser(user.id);

  function clickUnfollow() {
    toggleFollowUser();
  }

  return (
    <div className="flex gap-3">
      {isPending && <Spinner></Spinner>}
      {error && <ErrorMessage error={error}></ErrorMessage>}
      <UserTag user = {user}></UserTag>
      {isSelf && <Button
        className="p-3 h-5 text-xs flex items-center rounded-sm text-white"
        variant="red"
        onClick={clickUnfollow}
      >
        Unfollow
      </Button>}
    </div>
  );
}
