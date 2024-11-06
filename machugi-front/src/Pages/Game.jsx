import { useEffect, useState } from "react";

function Game() {
  // 9 * 12의 격자
  const [nums, setNums] = useState(
    Array(12)
      .fill()
      .map(() => Array(9).fill(0))
  );

  useEffect(() => {
    // 처음에 3줄 채움
    const newNums = [...nums];

    for (let i = 0; i < 3; i++) {
      newNums[i] = Array(9)
        .fill()
        .map(() => Math.floor(Math.random() * 9) + 1);
    }
    setNums(newNums);
  }, []);

  // 숫자 두개 선택
  const [choicedNum, setChoicedNum] = useState([]);
  const [clicked, setClicked] = useState(
    Array(12)
      .fill()
      .map(() => Array(9).fill(false))
  );

  const handleClickNum = (lineIndex, numIndex) => {
    // 선택 표시
    const newClicked = [...clicked];
    newClicked[lineIndex][numIndex] = true;
    setClicked(newClicked);

    // 아직 선택된 숫자가 없다면 해당 숫자 추가 (숫자, 위치 정보)
    if (!choicedNum.length) {
      setChoicedNum([nums[lineIndex][numIndex], lineIndex, numIndex]);
    } else {
      // 이미 선택된 숫자가 있다면 해당 숫자랑 테스트해보기
      console.log(choicedNum, nums[lineIndex][numIndex], "을 비교해요");
      setChoicedNum([]);

      // 선택 표시 지움
      setClicked(
        Array(12)
          .fill()
          .map(() => Array(9).fill(false))
      );
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <div className="h-[10%]">점수</div>
      <div className="w-[95%] border-1">
        {nums.map((line, lineIndex) => (
          <div key={lineIndex} className="flex">
            {line.map((num, numIndex) => (
              <div
                key={numIndex}
                className={`text-xl border-1 flex-1 h-[6vh] flex items-center justify-center hover:text-cyan-500 ${clicked[lineIndex][numIndex] ? "bg-cyan-100" : ""}`}
                onClick={() => {
                  handleClickNum(lineIndex, numIndex);
                }}
              >
                {num == 0 ? "" : num}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="h-[10%]">+랑 힌트</div>
    </div>
  );
}

export default Game;
