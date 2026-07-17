import Button from "@/components/Button";

type FeedPostHeaderProps = {
  author: {
    username: string;
    id: number;
  };
};

export default function FeedPostHeader({ author }: FeedPostHeaderProps) {
  return (
    <div className="flex gap-3 my-3">
      <p className="text-left ml-7">{author.username}</p>
      <Button
        type="submit"
        className="text-xs height-5 py-1"
        onClick={() => {}}
      >
        Follow
      </Button>
    </div>
  );
}
