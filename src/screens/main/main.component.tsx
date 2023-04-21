import { GameStage, updateStage } from "../../store/main/main.slice";
import {
  selectPriceEvents,
  removePriceEvent,
  selectPrices,
} from "../../store/price/price.slice";
import {
  upgradeCoat,
  buyGun,
  removePlayerEvent,
  removePlayerEventAction,
  EventActions,
  healPlayer,
  addPlayerEvent,
} from "../../store/player/player.slice";
import {
  selectPlayerMoney,
  selectPlayerCoatSpace,
  selectPlayerEvents,
  selectPlayerEventAction,
  selectPlayerCops,
} from "../../store/player/player.selectors";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import YesNo from "../../components/action/yes-no.component";
import Continue from "../../components/action/continue.component";
import BuySellJet from "../../components/action/buy-sell-jet.component";

export default function Main() {
  const dispatch = useAppDispatch();

  const playerMoney = useAppSelector(selectPlayerMoney);
  const playerCoatSpace = useAppSelector(selectPlayerCoatSpace);
  const playerEvents = useAppSelector(selectPlayerEvents);
  const playerEventAction = useAppSelector(selectPlayerEventAction);
  const playerCops = useAppSelector(selectPlayerCops);

  const priceEvents = useAppSelector(selectPriceEvents);
  const prices = useAppSelector(selectPrices);

  return (
    <>
      {playerEventAction === EventActions.CopsChase ? (
        <Continue
          text={`Officer Hardass and ${playerCops} of his deputies are chasing you !!!!!`}
          onContinue={() => dispatch(updateStage(GameStage.COPS_CHASE))}
        />
      ) : playerEventAction === EventActions.UpgradeCoat ? (
        <YesNo
          text={`Would you like to buy 15 more pockets for more drugs? It's $${prices.coat}`}
          onYes={() => {
            if (prices.coat <= playerMoney) {
              dispatch(upgradeCoat(prices.coat));
            } else {
              dispatch(
                addPlayerEvent("You don't have enough money to buy a coat!")
              );
            }
            dispatch(removePlayerEventAction());
          }}
          onNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEventAction === EventActions.BuyGun ? (
        <YesNo
          text={`Would you like to buy a gun for $${prices.gun}?`}
          onYes={() => {
            if (prices.gun <= playerMoney && playerCoatSpace >= 5) {
              dispatch(buyGun(prices.gun));
            } else {
              dispatch(
                addPlayerEvent(
                  "You don't have enough money/coat space to buy a gun!"
                )
              );
            }
            dispatch(removePlayerEventAction());
          }}
          onNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEventAction === EventActions.AskHeal ? (
        <YesNo
          text={`Do you want to heal for $${prices.heal}?`}
          onYes={() => {
            if (prices.heal <= playerMoney) {
              dispatch(healPlayer(prices.heal));
            } else {
              dispatch(addPlayerEvent("You don't have enough money to heal!"));
            }
            dispatch(removePlayerEventAction());
          }}
          onNo={() => dispatch(removePlayerEventAction())}
        />
      ) : playerEvents.length ? (
        <Continue
          text={playerEvents[0]}
          onContinue={() => dispatch(removePlayerEvent())}
        />
      ) : priceEvents.length ? (
        <Continue
          text={priceEvents[0]}
          onContinue={() => dispatch(removePriceEvent())}
        />
      ) : (
        <BuySellJet
          onBuy={() => dispatch(updateStage(GameStage.BUY))}
          onSell={() => dispatch(updateStage(GameStage.SELL))}
          onJet={() => dispatch(updateStage(GameStage.JET))}
        />
      )}
    </>
  );
}
