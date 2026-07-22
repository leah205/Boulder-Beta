type PostsListLayoutProps = {
  children: React.ReactNode;
};
export default function PostsListLayout(props: PostsListLayoutProps) {
  return (
    <div className="flex flex-col justify-center gap-10 w-full items-center">
      {props.children}
    </div>
  );
}
