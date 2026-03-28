import { TarotSelectionClient } from "@/components/tarot/TarotSelectionClient";
import { GlassPanel } from "@/components/shared/GlassPanel";
import {
  isTarotCategoryKey,
  parseTarotCategoryKey,
} from "@/lib/tarotInterpreter";

export default async function TarotSelectPage(
  props: PageProps<"/tarot/select">,
) {
  const searchParams = await props.searchParams;
  const category =
    typeof searchParams.category === "string" &&
    isTarotCategoryKey(searchParams.category)
      ? parseTarotCategoryKey(searchParams.category)
      : undefined;

  return (
    <main className="flex flex-1 flex-col pb-8">
      <GlassPanel className="p-6 sm:p-8">
        <TarotSelectionClient initialCategoryKey={category} />
      </GlassPanel>
    </main>
  );
}
