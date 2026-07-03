import { useQuery } from "@tanstack/react-query";
import userApi from "@/features/users/userService";
import Spinner from "@/components/Spinner";
import type { Climb } from "@shared/types";
import Button from "@/components/Button";
import { useState } from "react";
import Form from "@/components/Form";

type climbStats = Pick<Climb, "id" | "grade" | "rating" | "sent">;
type climbCardProps = {
  climb: climbStats;
};

function ClimbCard(props: climbCardProps) {
  const climb = props.climb;
  return (
    <div className=" text-center hover:bg-mist-50 p-6 rounded-md border-1 border-mist-300 shadow-sm w-50 h-50">
      {/* <h2 className="text-xl">
        <Link to={`${climb.id}`}>View Log</Link>
      </h2> */}
      {climb.grade && <p>Grade: {climb.grade}</p>}
      {climb.rating && <p>Rating: {climb.rating}</p>}
      {climb.sent && <p>sent!</p>}
      {/* <Button type="button" onClick={() => {}}>
        Edit
      </Button> */}
    </div>
  );
}

// function EditModal(){
//   const [formData, setFormData] = useState<Partial<Climb>>({});
//     const { logClimb, isPending, errors } = useClimbLog();
//     function handleSubmit() {
//       logClimb(formData);
//     }
//   return (
//         <Form>
//           <ul>
//             {errors &&
//               errors.map((error) => {
//                 return <ValidationError key={error}>{error}</ValidationError>;
//               })}
//           </ul>

//           <FormField name="grade" label="Grade: ">
//             <select
//               name="grade"
//               onChange={(e) =>
//                 setFormData({ ...formData, grade: e.target.value })
//               }
//               value={formData.grade || "V0"}
//             >
//               {get_grades().map((grade) => {
//                 return <option value={grade}>{grade}</option>;
//               })}
//             </select>
//           </FormField>

//           <FormField name="attempt_num" label="Attempts">
//             <InputField
//               value={formData.attempt_num}
//               onChange={(e) =>
//                 setFormData({ ...formData, attempt_num: Number(e.target.value) })
//               }
//               name="attempt_num"
//               type="number"
//             ></InputField>
//           </FormField>

//           <FormField name="sent" label="Sent">
//             <input
//               checked={formData.sent}
//               type="checkbox"
//               onChange={(e) => {
//                 setFormData({
//                   ...formData,
//                   sent: e.target.checked,
//                 });
//               }}
//               name="sent"
//             ></input>
//           </FormField>

//           {formData.sent && (
//             <FormField name="rating" label="Rating">
//               <select
//                 name="rating"
//                 className="block"
//                 onChange={(e) =>
//                   setFormData({ ...formData, rating: Number(e.target.value[0]) })
//                 }
//                 value={`${formData.rating}/5` || "1/5"}
//               >
//                 {get_ratings().map((rating) => {
//                   return <option value={rating}>{rating}</option>;
//                 })}
//               </select>
//             </FormField>
//           )}
//           <Button type="submit" className="" onClick={handleSubmit}>
//             Log Climb
//           </Button>
//         </Form>
//   )
// }

export default function LogClimbPage() {
  const [editModal, setEditModal] = useState<number | null>(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["myclimbs"],
    queryFn: async () => userApi.getMyClimbs(),
  });

  if (isPending) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const climbs: climbStats[] = data.climbs;
  return (
    <>
      <h1>My Climbs</h1>
      <div className="flex flex-row gap-10 p-5 w-full justify-center flex-wrap">
        {climbs.map((climb) => {
          return <ClimbCard key={climb.id} climb={climb}></ClimbCard>;
        })}
      </div>
    </>
  );
}
