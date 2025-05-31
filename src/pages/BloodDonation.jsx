// BloodDonation.jsx
import React from "react";
import BloodDonationStandards from "../components/BloodDonationStandards";


import Tips from "../components/Tips"; // bạn có thể chia phần lời khuyên ra file riêng

const BloodDonation = () => {
    return (
        <>
            <BloodDonationStandards />
            <Tips />
        </>
    );
};

export default BloodDonation;
