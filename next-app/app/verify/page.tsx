"use client";

import { Box, Flex, Link, Progress, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { VerifyReply } from "../../pages/api/verify";

export default function Home() {
  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit:\n", JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      verification_level: result.verification_level,
      action: process.env.NEXT_PUBLIC_WLD_ACTION,
      signal: "",
    };
    console.log(
      "Sending proof to backend for verification:\n",
      JSON.stringify(reqBody)
    ); // Log the proof being sent to our backend for visibility
    const res: Response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const data: VerifyReply = await res.json();
    console.log('verify')
    if (res.status == 200) {
      console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
    } else {
      throw new Error(
        `Error code ${res.status} (${data.code}): ${data.detail}` ??
          "Unknown error."
      ); // Throw an error if verification fails
    }
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };
  return (
    <>
      <Header />
      <Box>
        <IDKitWidget
          app_id="app_staging_001c10e1b5a0b9d5088279095f2722be"
          action="award-vote"
          verification_level={VerificationLevel.Device}
          handleVerify={handleProof}
          onSuccess={onSuccess}
        >
          {({ open }) => <button onClick={open}>Verify with World ID</button>}
        </IDKitWidget>
      </Box>
    </>
  );
}
