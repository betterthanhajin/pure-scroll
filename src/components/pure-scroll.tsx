import { initialData, fetchMoreData } from "../lib/api/mock/dummy";
import { useRef, useEffect, useState } from "react";

const PureScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 88;
  const [visibleItems, setVisibleItems] = useState<typeof initialData>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [items, setItems] = useState(initialData);
  // 전체 컨테이너 높이 계산
  const totalHeight = initialData.length * itemHeight;

  // 스크롤 컨테이너에서 scrollTop 값 가져오기
  const handleScroll = async () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const clientHeight = containerRef.current.clientHeight;

    // 버퍼를 포함한 시작 및 끝 인덱스 계산 (위아래로 몇 개 더 렌더링)
    const buffer = 3; // 위아래로 3개씩 더 렌더링
    const calculatedStartIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - buffer
    );
    const visibleCount = Math.ceil(clientHeight / itemHeight) + buffer * 2;
    const endIndex = Math.min(
      initialData.length,
      calculatedStartIndex + visibleCount
    );

    console.log("clientHeight", clientHeight);
    console.log("scrollTop", scrollTop);
    console.log("endIndex", endIndex);
    console.log("visibleCount", visibleCount);
    console.log("initialData.length", initialData.length);
    console.log("clientHeight === scrollTop", clientHeight === scrollTop);
    console.log("totalHeight", totalHeight);
    console.log("endIndex * itemHeight", endIndex * itemHeight);
    if (scrollTop + clientHeight > totalHeight - 200) {
      console.log("더미데이터 추가");
      const newItems = await fetchMoreData();
      setItems((prevItems) => [...prevItems, ...newItems]);
    }

    // 보이는 항목만 필터링
    const itemsToRender = items.slice(calculatedStartIndex, endIndex);

    setStartIndex(calculatedStartIndex);
    setVisibleItems(itemsToRender);

    console.log("렌더링 범위:", calculatedStartIndex, endIndex, scrollTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);

    // 초기 계산을 위해 한 번 실행
    handleScroll();

    // 정리 함수
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="scroll-container"
      style={{
        height: "600px", // 고정된 높이의 스크롤 컨테이너
        overflow: "auto",
        position: "relative",
        border: "1px solid #ccc",
      }}
    >
      {/* 전체 높이를 유지하기 위한 빈 div */}
      <div style={{ height: `${totalHeight}px`, position: "relative" }}>
        {/* 보이는 항목만 렌더링 */}
        <ul
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${startIndex * itemHeight}px)`,
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {visibleItems.map((item) => (
            <li
              className="mb-1 p-8 bg-orange-400"
              key={item.id}
              style={{ height: `${itemHeight}px`, boxSizing: "border-box" }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PureScroll;
