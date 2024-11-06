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
    // 비어있는 칸은 아예 로직 실행 안함
    if (nums[lineIndex][numIndex] == 0) {
      return;
    }

    // 선택 표시
    const newClicked = [...clicked];
    newClicked[lineIndex][numIndex] = true;
    setClicked(newClicked);

    // 아직 선택된 숫자가 없다면 해당 숫자 추가 (숫자, 위치 정보)
    if (!choicedNum.length) {
      setChoicedNum([nums[lineIndex][numIndex], lineIndex, numIndex]);
    } else {
      // 이미 선택된 숫자가 있다면 해당 숫자랑 테스트해보기
      const numberCheck = checkNums(choicedNum, [
        nums[lineIndex][numIndex],
        lineIndex,
        numIndex,
      ]);

      // 테스트 값이 맞으면 없애주기
      if (numberCheck) {
        let newNums = [...nums];
        newNums[choicedNum[1]][choicedNum[2]] = 0;
        newNums[lineIndex][numIndex] = 0;
        setNums(newNums);
      }
      setChoicedNum([]);

      // 선택 표시 지움
      setClicked(
        Array(12)
          .fill()
          .map(() => Array(9).fill(false))
      );
    }
  };

  // 메인 로직(num1과 num2의 정보를 바탕으로 괜찮은지 체크)
  function checkNums(num1, num2) {
    // 우선 둘의 숫자가 같거나, 더해서 10이 되는지 확인
    if (num1[0] == num2[0] || num1[0] + num2[0] == 10) {
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ];
      const [y, x] = [num1[1], num1[2]];

      for (let [dy, dx] of directions) {
        let i = 1;
        let temp = true;

        while (temp) {
          let [ny, nx] = [y + i * dy, x + i * dx];
          if (0 <= ny && ny < nums.length && nx >= 0 && nx < 9) {
            if (ny === num2[1] && nx === num2[2]) {
              return true;
            }
            if (nums[ny][nx] === 0) {
              i += 1;
            } else {
              temp = false;
            }
          } else {
            temp = false;
          }
        }
      }

      return false;
    } else {
      return false;
    }
  }

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
