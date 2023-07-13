import React, { useState, useEffect, MyFormControlLabel } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import Button from "@mui/material/Button";
function Options() {
  const [attack, setAttack] = useState();
  const [options, setOptions] = useState([
    { val: "heya", text: "hey this is text" },
    { val: "oooo", text: "hey this is text" },
  ]);
  const [value, setValue] = useState({});
  const [success, isSuccess] = useState();
  const [attackName, setAttackName] = useState();
  const [checkPoint, setCheckPoint] = useState();

  useEffect(() => {
    // api call to check ifDoc
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/defender/checkUpdate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await response.json();
      if (response.status === 200) {
        setAttackName(resData.attackName);
        setCheckPoint(resData.checkPoint);
        if (resData.checkPoint === 1) setOptions(checkPoint1);
        else if (resData.checkPoint === 2) {
          setOptions(checkPoint2);
        } else if (resData.checkPoint === 3) setOptions(checkPoint3);
      }
    };
    fetchData();
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = async (e) => {
    const response = await fetch(`http://localhost:5000/defender/doDefend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        defendOption: value,
        checkPoint: checkPoint,
        attackText: attackName,
      },
    });
    const resData = await response.json();

    if (response.status === 200) {
      if (resData.success === true) {
        alert("You've successfully defended!");
      } else {
        alert("You've failed!");
      }
    }
  };

  return (
    <div>
      <div>
        Attacker is trying to <span>{attackName}</span>
      </div>
      <div className="div_justify">
        <FormControl className="div_justify">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {options.map((o) => {
              return (
                <FormControlLabel
                  value={o.defence}
                  control={<Radio />}
                  label={o.defence}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={handleClick}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Options;
