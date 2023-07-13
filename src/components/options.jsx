import React, { useState, useEffect, MyFormControlLabel } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Button from "@mui/material/Button";
const checkPoint1 = [
  {
    attack: "Email Phishing",
    text: "Email Phishing",
    defence: "Block malicious email sent from unrelible sources",
  },
  {
    attack: "Spear phishing",
    text: "Spear phishing",
    defence: "Implement DMARC Technology",
  },
  {
    attack: "Smishing and Vishing",
    text: "Smishing and Vishing",
    defence:
      "Lookout for messages originating from spoofed number and block them",
  },
  {
    attack: "Angler Phishing",
    text: "Angler Phishing",
    defence:
      "Verify the Company Account and if found fraudulent block the origin",
  },
];

const checkPoint2 = [
  {
    attack: "IP spoofing",
    text: "IP spoofing",
    defence:
      "Authenticating Users and Devices Through PKI and block requests from non-authenticated sources",
  },
  {
    attack: "DNS spoofing",
    text: "DNS spoofing",
    defence: "Perform thorough DNS traffic-filtering",
  },
  {
    attack: "GPS Spoofing",
    text: "GPS Spoofing",
    defence:
      "Follow the principle of least priviledge and do not allow any unwanted apps to access the GPS",
  },
  {
    attack: "WiFi Eavesdropping",
    text: "WiFi Eavesdropping",
    defence: "Use Firewallls and do not allow any malicious users",
  },
];

const checkPoint3 = [
  {
    attack: "Ping of Death",
    text: "Ping of Death",
    defence:
      "Add checks to the reassembly process to make sure the maximum packet size constraint will not be exceeded after packet recombination. ",
  },
  {
    attack: "HTTP Flood",
    text: "HTTP Flood",
    defence: "Use load balancers and web application firewalls (WAFs)",
  },
  {
    attack: "Zero-day DDoS Attacks",
    text: "Zero-day DDoS Attacks",
    defence:
      "Use Windows Defender Exploit Guard along with Attack Surface Reduction (ASR)",
  },
  {
    attack: "Slowloris",
    text: "Slowloris",
    defence:
      "Use a hardware load balancer that accepts only complete HTTP connections. The hardware load balancer with an HTTP profile configuration inspects the packets and only forwards complete HTTP requests to the web server.",
  },
];

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
        if (resData.checkPoint === "1") setOptions(checkPoint1);
        else if (resData.checkPoint === "2") {
          setOptions(checkPoint2);
        } else if (resData.checkPoint === "3") setOptions(checkPoint3);
      }
      console.log("ResData", resData);
      console.log(options);
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
      body: JSON.stringify({
        defendOption: value,
        checkPoint: checkPoint,
        attackText: attackName,
      }),
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
