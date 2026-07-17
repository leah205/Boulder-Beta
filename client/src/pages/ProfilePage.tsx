import useCurrentUser from "@/hooks/useCurrentUser";

export default function ProfilePage() {
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    throw new Error("current user not found");
  }
  return (
    <div className="w-80 m-auto border-1 h-100 my-10 p-6">
      <p>{currentUser.username}</p>
      <div>
        <p>Following: </p>
        <ul>
          {currentUser.following.map((user) => {
            return <p>{user.username}</p>;
          })}
        </ul>
        <p>Followers: </p>
        <ul>
          {currentUser.followedBy.map((user) => {
            return <p>{user.username}</p>;
          })}
        </ul>
      </div>
    </div>
  );
}
