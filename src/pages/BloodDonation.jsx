// BloodDonation.jsx
import React from "react";
import BloodDonationStandards from "../components/BloodDonationStandards";
import Tips from "../components/Tips";
import DonorBenefits from "../components/DonorBenefit";

const BloodDonation = () => {
    return (
        <>
            <DonorBenefits />
            <BloodDonationStandards />
            <Tips />
        </>
    );
};

export default BloodDonation;
