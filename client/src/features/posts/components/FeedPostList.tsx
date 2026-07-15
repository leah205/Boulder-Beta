import type { PostResponse } from "@shared/types";
import FeedPost from "./FeedPost";
import type React from "node_modules/@types/react/index";
type FeedPostListProps = {
  children: React.ReactNode;
};

export default function FeedPostList(props: FeedPostListProps) {
  return (
    <div className="flex flex-col justify-center gap-10 w-full">
      {props.children}
    </div>
  );
}
