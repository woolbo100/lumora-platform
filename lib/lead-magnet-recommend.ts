import type { BlogPost } from "@/types/blog";

const REUNION_KEYWORDS = [
  "재회", "이별", "전남친", "전여친", "카톡", "SNS", "차단", "연락", "프로필", "읽씹", "미련"
];

const LOVE_PATTERN_KEYWORDS = [
  "애착유형", "연애패턴", "불안형", "회피형", "혼란형", "안정형", "집착", "관계패턴", "감정신호"
];

const MAGNETIC_KEYWORDS = [
  "매력", "매력자본", "자존감", "끌림", "여성성", "관계심리", "에너지", "대화", "자기존중"
];

/**
 * 텍스트 내 특정 키워드의 출현 빈도를 계산합니다.
 */
function countOccurrences(text: string, keyword: string): number {
  if (!text || !keyword) return 0;
  // 정규식 특수문자를 안전하게 이스케이프 처리
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedKeyword, "g");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

/**
 * 블로그 포스트 정보를 바탕으로 알맞은 리드 마그넷 슬러그를 추천합니다.
 */
export function getRecommendedLeadMagnetSlug(post: BlogPost): string | null {
  if (!post) return null;

  const title = post.title || "";
  const summary = post.summary || "";
  const content = post.content || "";
  const tags = post.tags ? post.tags.join(" ") : "";
  
  // 분석 대상 전체 텍스트
  const targetText = `${title} ${summary} ${tags} ${content}`;

  let reunionCount = 0;
  let lovePatternCount = 0;
  let magneticCount = 0;

  // 1. 키워드 기반 카운트 합산
  REUNION_KEYWORDS.forEach((kw) => {
    reunionCount += countOccurrences(targetText, kw);
  });

  LOVE_PATTERN_KEYWORDS.forEach((kw) => {
    lovePatternCount += countOccurrences(targetText, kw);
  });

  MAGNETIC_KEYWORDS.forEach((kw) => {
    magneticCount += countOccurrences(targetText, kw);
  });

  // 2. 가장 많이 등장한 키워드 그룹으로 선정
  const maxCount = Math.max(reunionCount, lovePatternCount, magneticCount);

  if (maxCount > 0) {
    if (maxCount === reunionCount) {
      return "reunion-sns-kakao-strategy";
    }
    if (maxCount === lovePatternCount) {
      return "love-pattern-attachment-self-check";
    }
    if (maxCount === magneticCount) {
      return "magnetic-woman-attraction-capital";
    }
  }

  // 3. 키워드가 검출되지 않았거나 동률일 경우, 카테고리를 기준으로 2차 추천
  if (post.category === "romance-reunion") {
    return "reunion-sns-kakao-strategy";
  }
  if (post.category === "psychology-code") {
    return "love-pattern-attachment-self-check";
  }
  if (post.category === "attraction-self-esteem") {
    return "magnetic-woman-attraction-capital";
  }

  // 4. 예외 케이스: 그 외 카테고리나 매칭이 전혀 없는 경우 기본값 제공
  return "reunion-sns-kakao-strategy";
}
