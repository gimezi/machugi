import { Button } from "@nextui-org/react";
import logoImage from "./../asset/machugi_logo.jpg";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();
  const goGame = () => {
    navigate("/game");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <img src={logoImage} alt="" className="w-[40%]" />
      <p className="text-4xl lg:text-6xl font-bold">숫자 마추기</p>
      <p className="text-xl lg:text-xl">🎮킬링타임용 숫자 맞추기 게임🎮</p>
      <Button
        className="w-[20%] h-16 text-lg lg:text-xl font-bold"
        variant="ghost"
        onClick={goGame}
      >
        시작!
      </Button>
    </div>
  );
}

export default Start;
