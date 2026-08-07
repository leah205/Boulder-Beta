import Button from "@/components/Button";
import useFollowUser from "@/hooks/useFollowUser";
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
  const currentUser = useCurrentUser();
  const isSelfPost = currentUser.id == author.id;
  const { toggleFollowUser, isFollowing, isPending, error } = useFollowUser(
    author.id,
  );

  return (
    <div>
      {error && <ErrorMessage error={error}></ErrorMessage>}

      <div className="flex gap-3 my-3">
        {isPending && <Spinner></Spinner>}
        <p className="text-left ml-7">{author.username}</p>
        {!isSelfPost && (
          <Button
            type="submit"
            className="text-xs height-5 py-1"
            onClick={toggleFollowUser}
            variant={isFollowing ? "red" : "blue"}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
}
