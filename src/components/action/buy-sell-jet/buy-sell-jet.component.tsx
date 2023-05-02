import { FC } from "react";

import ActionContainer from "../action-container.component";
import Button from "../../button/button.component";
import DialogBox from "../../dialog-box/dialog-box.component";

type BuySellJetProps = {
  onBuy: Function;
  onSell: Function;
  onJet: Function;
};

const BuySellJet: FC<BuySellJetProps> = ({ onBuy, onSell, onJet }) => {
  const isBuySellJet = (key: string) => {
    return key === "b" || key === "s" || key === "j";
  };

  const handleOnKeyDown = (key: string) => {
    if (isBuySellJet(key)) {
      if (key === "b") onBuy();
      if (key === "s") onSell();
      if (key === "j") onJet();
    }
  };

  return (
    <ActionContainer onKeyDown={handleOnKeyDown}>
      <DialogBox>
        <span>What are you gonna do?</span>
        <Button onClick={() => onBuy()}>buy</Button>
        <Button onClick={() => onSell()}>sell</Button>
        <Button onClick={() => onJet()}>jet</Button>
      </DialogBox>
    </ActionContainer>
  );
};

export default BuySellJet;
