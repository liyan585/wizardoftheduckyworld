import { notFound } from "next/navigation";
import ResultCard from "../../../components/ResultCard";
import { results } from "../../../data/results";

type Params = {
  params: { type: string };
};

export default function ResultPage({ params }: Params) {
  const type = params.type.toLowerCase();
  const result = results.find((item) => item.key === type);

  if (!result) {
    notFound();
  }

  return <ResultCard result={result!} />;
}
