import { redirect } from "next/navigation";

import { TarotSelectionClient } from "@/components/tarot/TarotSelectionClient";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { isTarotCategoryKey } from "@/lib/tarotInterpreter";

export default async function TarotSelectPage(
  props: PageProps<"/tarot/select">,
) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;

  if (typeof category !== "string" || !isTarotCategoryKey(category)) {
    redirect("/tarot");
  }

  return (
    <main className="flex flex-1 flex-col pb-8">
      <GlassPanel className="p-6 sm:p-8">
        <TarotSelectionClient categoryKey={category} />
      </GlassPanel>
    </main>
  );
}
