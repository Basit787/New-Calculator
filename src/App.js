import { Box, Button, Card } from "@mui/material";
import React, { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  const inputs = [
    "AC",
    "Del",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ".",
    "=",
  ];

  const operators = ["AC", "Del", "+", "-", "*", "/", "%", ".", "="];

  const handleDelete = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const handleEvaluate = () => {
    if (value !== 0 && value !== "") {
      try {
        const result = eval(value);
        setValue(result);
      } catch (error) {
        setValue("error");
      }
    }
  };

  const handleClick = (e) => {
    console.log(e);
    if (e === "AC") {
      setValue("");
    } else if (e === "Del") {
      handleDelete();
    } else if (e === "=") {
      handleEvaluate();
    } else if (operators.includes(e) && value.length === 0) {
      setValue("");
    } else if (
      operators.includes(e) &&
      operators.includes(value[value.length - 1])
    ) {
      setValue(value.replace(value[value.length - 1], e));
    } else {
      const newValue = value + e;
      const digitCount = newValue.replace(/[^0-9]/g, "").length;
      if (digitCount <= 20) {
        setValue(newValue);
      }
    }
  };

  const buttonColor = (input) => {
    if (
      input === "AC" ||
      input === "Del" ||
      input.split("").some((char) => operators.includes(char))
    ) {
      return "bg-gray-100 text-black hover:bg-gray-200";
    } else {
      return "bg-sky-500 hover:bg-sky-600";
    }
  };
  return (
    <Box className="flex justify-center items-center min-h-screen">
      <Card className=" flex flex-col justify-center items-center ">
        <Box className="self-end m-2 text-xl font-light ">
          {value.length !== 0 || value.length === 10 ? value : "0"}
        </Box>
        <Box className="grid grid-cols-4 gap-4 m-2  ">
          {inputs.map((input, index) => (
            <Button
              key={index}
              onClick={() => handleClick(input)}
              variant="contained"
              className={`h-16 w-16 rounded-full ${buttonColor(input)}`}
            >
              {input}
            </Button>
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default App;
