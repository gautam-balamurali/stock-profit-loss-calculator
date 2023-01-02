/* eslint-disable */

import React from "react";
import {
  containsOnlySpaces,
  convertToInteger,
  convertToNumber,
  fixToTwoDigitsAfterDecimalPoint,
  isNotANumber,
} from "../../../utils/app-utils";
import DEFAULT_CONSTANTS from "../../../config/app-config";
import user_avatar from "../../../images/user_avatar.svg";
import { useState } from "react";

function StockProfitLossCalculator() {
  const [currentPriceInput, setCurrentPriceInput] = useState("");
  const [initialPriceInput, setinitialPriceInput] = useState("");
  const [quantityOfStocksInput, setQuantityOfStocksInput] = useState("");
  const [outputMessage, setOutputMessage] = useState("");

  //   <-- Validity Functions Begins -->

  /**
   * Function to check validity of calculate button
   * @returns boolean
   */
  function isCalculateButtonInvalid() {
    return (
      currentPriceInput.length < 1 ||
      initialPriceInput.length < 1 ||
      quantityOfStocksInput.length < 1
    );
  }

  /**
   * Function to check number input validity
   * @param input
   * @returns boolean
   */
  function isNumbererInputValid(input) {
    if (isNotANumber(input) || containsOnlySpaces(input)) {
      invalidInputErrorHandler();
      return false;
    }
    return true;
  }
  //   <-- Validity Functions Ends -->

  //   <-- Error Handling Functions Begins -->

  /**
   * Function to handle invalid input
   */
  function invalidInputErrorHandler() {
    setOutputMessage(DEFAULT_CONSTANTS.INVALID_INPUT_MESSAGE);
  }

  //   <-- Error Handling Functions Ends -->

  //   <-- Change Handler Functions Begins -->

  /**
   * Function to handle initial price input change
   * @param event
   */
  function initiaIPriceInputChangeHandler(event) {
    let inputInitiaIPrice = event.target.value;
    if (isNumbererInputValid(inputInitiaIPrice)) {
      setOutputMessage("");
      setinitialPriceInput(inputInitiaIPrice);
    } else {
      invalidInputErrorHandler();
      setinitialPriceInput("");
    }
  }

  /**
   * Function to handle quantity of stocks input change
   * @param event
   */
  function quantityOfStocksInputChangeHandler(event) {
    let inputQuantityOfStocks = event.target.value;
    if (isNumbererInputValid(inputQuantityOfStocks)) {
      setOutputMessage("");
      setQuantityOfStocksInput(inputQuantityOfStocks);
    } else {
      invalidInputErrorHandler();
      setQuantityOfStocksInput("");
    }
  }

  /**
   * Function to handle current price input change
   * @param event
   */
  function currentPriceInputChangeHandler(event) {
    let inputcurrenPrice = event.target.value;
    if (isNumbererInputValid(inputcurrenPrice)) {
      setOutputMessage("");
      setCurrentPriceInput(inputcurrenPrice);
    } else {
      invalidInputErrorHandler();
      setCurrentPriceInput("");
    }
  }

  //   <-- Change Handler Functions Ends -->

  //   <-- Click Handler Functions Begins -->

  /**
   * Function to handle when calculate button is clicked
   * @param initialPrice
   * @param quantityOfStocks
   * @param currentPrice
   */
  function calculateButtonClickHandler(
    initialPrice,
    quantityOfStocks,
    currentPrice
  ) {
    initialPrice = convertToNumber(initialPrice);
    quantityOfStocks = convertToInteger(quantityOfStocks);
    currentPrice = convertToNumber(currentPrice);

    let message = "";

    if (currentPrice > initialPrice) {
      message = calculateProfit(initialPrice, quantityOfStocks, currentPrice);
    } else if (initialPrice > currentPrice) {
      message = calculateLoss(initialPrice, quantityOfStocks, currentPrice);
    } else {
      message = DEFAULT_CONSTANTS.DEFAULT_OUTPUT;
    }

    setOutputMessage(message);
  }

  /**
   * Function to calculate profit
   * @param {*} initialPrice
   * @param {*} quantityOfStocks
   * @param {*} currentPrice
   * @returns message
   */
  function calculateProfit(initialPrice, quantityOfStocks, currentPrice) {
    const profit = (currentPrice - initialPrice) * quantityOfStocks;
    const profitPercentage = (profit / (initialPrice * quantityOfStocks)) * 100;
    return `Congratulations BULL🐂! You earned a profit of ${fixToTwoDigitsAfterDecimalPoint(
      profit
    )} and your profit percentage is ${fixToTwoDigitsAfterDecimalPoint(
      profitPercentage
    )}%. 🥳🍺`;
  }

  /**
   * Function to calculate loss
   * @param {*} initialPrice
   * @param {*} quantityOfStocks
   * @param {*} currentPrice
   * @returns message
   */
  function calculateLoss(initialPrice, quantityOfStocks, currentPrice) {
    const loss = (initialPrice - currentPrice) * quantityOfStocks;
    const lossPercentage = (loss / (initialPrice * quantityOfStocks)) * 100;
    return `You had a loss of ${fixToTwoDigitsAfterDecimalPoint(
      loss
    )} and your loss percentage is ${fixToTwoDigitsAfterDecimalPoint(
      lossPercentage
    )}%. 💩🤮`;
  }

  //   <-- Click Handler Functions Ends -->

  //   <-- Render Functions Begins -->

  /**
   * Function to render user avatar
   * @returns user avatar image
   */
  function renderUserAvatar() {
    return (
      <div className="container user-avatar">
        <img src={user_avatar} alt="User Avatar" />
      </div>
    );
  }

  /**
   * Function to render app description
   * @returns app description
   */
  function renderAppDescriptionSection() {
    return (
      <div className="sub-section">
        <h3>{DEFAULT_CONSTANTS.APP_DESCRIPTION}</h3>
      </div>
    );
  }

  /**
   * Function to stock details input labels section
   * @returns stock details input labels section
   */
  function renderStockDetailsInputLabelsSection() {
    return (
      <div className="sub-section">
        <label htmlFor="initial-price-intput" className="initial-price-label">
          initial price:
        </label>
        <input
          id="initial-price-intput"
          value={initialPriceInput}
          onChange={initiaIPriceInputChangeHandler}
          type={"number"}
          min={0.1}
          placeholder="enter a value"
        ></input>

        <label
          htmlFor="quantity-of-stocks-intput"
          className="quantity-of-stocks-label"
        >
          quantity of stocks:
        </label>
        <input
          id="quantity-of-stocks-intput"
          value={quantityOfStocksInput}
          onChange={quantityOfStocksInputChangeHandler}
          type={"number"}
          min={1}
          placeholder="enter a value"
        ></input>

        <label htmlFor="current-price-intput" className="current-price-label">
          current price:
        </label>
        <input
          id="current-price-intput"
          value={currentPriceInput}
          onChange={currentPriceInputChangeHandler}
          type={"number"}
          min={0.1}
          placeholder="enter a value"
        ></input>
      </div>
    );
  }

  /**
   * Function to render calculate button
   * @returns calculate button
   */
  function renderCalculateButton() {
    return (
      <button
        className={`${
          isCalculateButtonInvalid() ? "btn-disabled" : "btn-enabled"
        }`}
        disabled={isCalculateButtonInvalid()}
        onClick={() =>
          calculateButtonClickHandler(
            initialPriceInput,
            quantityOfStocksInput,
            currentPriceInput
          )
        }
      >
        calculate
      </button>
    );
  }

  /**
   * Function to render output message
   * @returns output message
   */
  function renderOutput() {
    return (
      <p
        className={`${
          currentPriceInput >= initialPriceInput ? "output-msg" : "error-msg"
        }`}
      >
        {outputMessage}
      </p>
    );
  }
  //   <-- Rendering Stock Profit Loss Calculator App -->
  return (
    <section id="app-view" className="section">
      {renderUserAvatar()}
      {renderAppDescriptionSection()}
      {renderStockDetailsInputLabelsSection()}
      {renderCalculateButton()}
      {renderOutput()}
    </section>
  );
}

export default StockProfitLossCalculator;
