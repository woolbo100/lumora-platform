import { NamingResultClient } from "@/components/naming/NamingResultClient";
import { type SajuNamingInput } from "@/types/naming";

type NamingResultPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NamingResultPage({ searchParams }: NamingResultPageProps) {
  const params = await searchParams;

  const input: Partial<SajuNamingInput> = {
    analysis_id: getSingleValue(params.analysisId),
    purpose: getSingleValue(params.purpose) as SajuNamingInput["purpose"] | undefined,
    current_name: getSingleValue(params.current_name),
    preferred_style: getSingleValue(params.preferred_style) as
      | SajuNamingInput["preferred_style"]
      | undefined,
  };

  return <NamingResultClient input={input} />;
}
