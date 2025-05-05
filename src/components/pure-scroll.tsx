import { initialData } from "../lib/api/mock/dummy";
import { useRef, useEffect } from "react";

const PureScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 88;

  const handleScroll = () => {
    if (!containerRef.current) return;

    // 스크롤 컨테이너에서 scrollTop 값 가져오기
    const scrollTop = containerRef.current.scrollTop;

    // 스크롤 컨테이너에서 clientHeight 값 가져오기
    const clientHeight = containerRef.current.clientHeight;

    // 이제 이 값들을 사용하여 계산할 수 있습니다
    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(clientHeight / itemHeight);
    const endIndex = startIndex + visibleCount;

    console.log(startIndex, visibleCount, endIndex);

    // 계산된 값으로 가시 범위 업데이트
    // ...
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
        height: "600px", // 또는 원하는 높이
        overflow: "auto",
        position: "relative",
      }}
    >
      <ul>
        {initialData.map((item) => (
          <li className="mb-1 p-8 bg-orange-400" key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PureScroll;
