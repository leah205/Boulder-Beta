import type React from "node_modules/@types/react/index";
import { useGetAllPosts } from "@/features/posts/queries";

type FeedPostListProps = {
  children: React.ReactNode;
};

export default function AllPostList(props: FeedPostListProps) {
  const { isPending, error, data } = useGetAllPosts();

  return (
    <div className="flex flex-col justify-center gap-10 w-full items-center">
      {props.children}
    </div>
  );
}
