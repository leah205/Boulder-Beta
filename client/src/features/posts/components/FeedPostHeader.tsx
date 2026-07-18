import Button from "@/components/Button";
import useFollowUser from "@/features/users/hooks/useFollowUser";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/error/ErrorMessage";
import useCurrentUser from "@/hooks/useCurrentUser";

type FeedPostHeaderProps = {
  author: {
    username: string;
    id: number;
  };
};

export default function FeedPostHeader({ author }: FeedPostHeaderProps) {
  const { followUser, isPending, error } = useFollowUser();
  const currentUser = useCurrentUser();
  const isFollowing = currentUser.following.some(
    (user) => user.id == author.id,
  );
  return (
    <div>
      {error && <ErrorMessage error={error}></ErrorMessage>}

      <div className="flex gap-3 my-3">
        {isPending && <Spinner></Spinner>}
        <p className="text-left ml-7">{author.username}</p>
        {!isFollowing ? (
          <Button
            type="submit"
            className="text-xs height-5 py-1"
            onClick={() => {
              followUser({ user_id: author.id });
            }}
          >
            Follow
          </Button>
        ) : (
          <p>following</p>
        )}
      </div>
    </div>
  );
}
