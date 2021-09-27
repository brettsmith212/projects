import React, { useState } from "react";

function Todo({ title, completed, removeTodoItemProp }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [tempValue, setTempValue] = useState(title);
  const [completedState, setCompletedState] = useState(completed);

  const handleDivDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputKeyDown = (e) => {
    const key = e.keyCode;

    if (key === 13) {
      setValue(tempValue);
      setIsEditing(false);
    } else if (key === 27) {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  const handleInputOnChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleButtonClick = () => {
    setCompletedState((oldCompleted) => !oldCompleted);
  };

  return (
    <div className="row">
      {isEditing ? (
        <div className="column seven wide">
          <div className="ui input fluid">
            <input
              autoFocus={true}
              onKeyDown={handleInputKeyDown}
              onChange={handleInputOnChange}
              value={tempValue}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            className="column five wide"
            onDoubleClick={handleDivDoubleClick}
          >
            <h2 className={"ui header" + (completedState ? " green" : "")}>
              {value}
            </h2>
          </div>

          <div className="column one wide">
            <button
              className={
                "ui button circular icon" +
                (completedState ? " blue" : " green")
              }
              onClick={handleButtonClick}
            >
              <i className="white check icon"></i>
            </button>
          </div>

          <div className="column one wide">
            <button
              onClick={removeTodoItemProp}
              className="ui button circular icon red"
            >
              <i className="white check icon"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Todo;
