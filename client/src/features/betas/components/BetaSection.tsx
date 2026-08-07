import type { BetaResponse } from "@shared/types";
import type React from "react";
import Button from "@/components/Button";
import Form from "@/components/form/Form";
import { usePostBeta } from "../usePostBeta";
import Spinner from "@/components/spinner/Spinner";
import { useState, useEffect } from "react";
import ErrorWrapper from "@/components/error/ErrorWrapper";
import Beta from "./Beta";

type BetaFormProps = {
  post_id: number;
  setBetaFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function BetaForm({ post_id, setBetaFormOpen }: BetaFormProps) {
  const [content, setContent] = useState("");
  const { mutate: postBeta, isPending, errors } = usePostBeta(post_id);

  function submitBetaForm() {
    postBeta({ content });
    if (!errors.length) {
      setBetaFormOpen(false);
    }
  }
  return (
    <form className="border-0 ">
      {errors &&
        errors.map((error) => {
          return <ErrorWrapper key={error}>{error}</ErrorWrapper>;
        })}
      {isPending && <Spinner></Spinner>}
      <textarea
        className="text-black w-full bg-mist-100 p-2 rounded-sm"
        value={content}
        data-testid="new-comment-text"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <Button
        type="submit"
        className="text-xs w-1/2 h-7 flex items-center justify-center"
        onClick={submitBetaForm}
      >
        Submit
      </Button>
    </form>
  );
}

function BetasSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden absolute p-3 top-1/3 bg-black text-white flex-col gap-3 h-2/3  bg-black/50 w-50 left-1/2 -translate-x-1/2 z-20">
      {children}
    </div>
  );
}

type BetaSectionProps = {
  betas: BetaResponse[];
  post_id: number;
  setBetasOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BetaSection({
  betas,
  post_id,
  setBetasOpen,
}: BetaSectionProps) {
  const [betaFormOpen, setBetaFormOpen] = useState(false);

  const toggleBetaFormOpen = () =>
    betaFormOpen ? setBetaFormOpen(false) : setBetaFormOpen(true);

  return (
    <BetasSectionLayout>
      <div className="flex justify-between mb-3">
        <Button
          type="button"
          onClick={toggleBetaFormOpen}
          variant="blue"
          className="opacity-100 h-3 w-3 rounded-xl flex justify-center items-center p-3"
        >
          <span className=" relative">{betaFormOpen ? "-" : "+"}</span>
        </Button>
        <Button
          type="button"
          onClick={() => setBetasOpen(false)}
          variant="red"
          className="opacity-100 h-3 w-3 rounded-xl flex justify-center items-center  flex justify-center items-center p-3"
        >
          <span className="-top-0.5 relative ">x</span>
        </Button>
      </div>
      {betaFormOpen && (
        <BetaForm
          post_id={post_id}
          setBetaFormOpen={setBetaFormOpen}
        ></BetaForm>
      )}
      <div>
        {betas.map((beta) => {
          return <Beta beta={beta} key={beta.id}></Beta>;
        })}
      </div>
    </BetasSectionLayout>
  );
}
