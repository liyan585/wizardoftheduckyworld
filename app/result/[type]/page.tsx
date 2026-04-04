import { notFound } from "next/navigation";
import ResultCard from "../../../components/ResultCard";
import { results } from "../../../data/results";

type Params = {
  params: Promise<{ type: string }>;
};

export async function generateStaticParams() {
  return results.map((result) => ({
    type: result.key,
  }));
}

export default async function ResultPage({ params }: Params) {
  const { type } = await params;
  const result = results.find((item) => item.key === type.toLowerCase());

  if (!result) {
    notFound();
  }

  return <ResultCard result={result!} />;
}
