import { NextResponse } from "next/server";

import { tarotCards } from "@/data/tarotCards";
import {
  generateTarotReading,
  isTarotCategoryKey,
  parseCardIds,
} from "@/lib/tarotInterpreter";

type TarotReadingRequest = {
  category?: string;
  selectedCards?: Array<{ id?: number }> | number[];
  cards?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as TarotReadingRequest;
  const category = payload.category;

  if (!isTarotCategoryKey(category)) {
    return NextResponse.json(
      { error: "유효한 카테고리가 필요합니다." },
      { status: 400 },
    );
  }

  const selectedIds = Array.isArray(payload.selectedCards)
    ? payload.selectedCards
        .map((item) => (typeof item === "number" ? item : item.id))
        .filter((item): item is number => typeof item === "number")
    : parseCardIds(payload.cards);

  const cards = selectedIds
    .map((id) => tarotCards.find((card) => card.id === id))
    .filter((card): card is (typeof tarotCards)[number] => Boolean(card))
    .slice(0, 3);

  if (cards.length !== 3) {
    return NextResponse.json(
      { error: "카드 세 장을 정확히 전달해 주세요." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    interpretation: generateTarotReading(cards, category),
  });
}
