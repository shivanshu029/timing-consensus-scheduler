package com.example.tcs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OTPService {

    @Autowired
    private OTPRepository otpRepository;

    public Optional<OTP> getOTP(String email) {
        return otpRepository.findOTPDataByEmail(email);
    }

    public OTP generateOTP(String email) {
        // Generate a random OTP
        String otpCode = generateRandomOTP();

        // Store the OTP and timestamp
        OTP new_otp = new OTP(otpCode, email, System.currentTimeMillis());
        otpRepository.save(new_otp);
        System.out.println("GENERATED OTP : " + new_otp + " FOR USER :" + email);
        return new_otp;
    }

    public Optional<OTP> validateOTP(String email, String otpEntered) {
        Optional<OTP> otpData = otpRepository.findOTPDataByEmail(email);
        if (otpData.isPresent()) {
            OTP otp = otpData.get();
            if (System.currentTimeMillis() - otp.getTimeStamp() <= 10 * 60 * 1000) {
                if (otpEntered.equals(otp.getOtpCode())) {
                    System.out.println("OTP VALIDATED");
                    return otpData;
                }
                else {
                    System.out.println("OTP INVALIDATED");
                    return Optional.empty();
                }
            } else {
                // OTP has expired, remove it from storage
                otpRepository.deleteByEmail(email);
            }
        }
        return otpData;
    }

    // Cleanup mechanism to remove expired OTPs
    @Scheduled(fixedDelay = 600000) // Run every 10 minutes (600,000 milliseconds)
    public void cleanupExpiredOTP() {
        System.out.println("INITIATING OTP CLEANUP...");
        // Retrieve all OTPs from the database
        List<OTP> allOTPs = otpRepository.findAll();

        long currentTime = System.currentTimeMillis();

        // Filter out the expired OTPs
        List<OTP> expiredOTPs = allOTPs.stream()
                .filter(otp -> currentTime - otp.getTimeStamp() > (10 * 60 * 1000))
                .toList();

        // Delete the expired OTPs from the database
        for (OTP expiredOTP : expiredOTPs) {
            otpRepository.delete(expiredOTP);
            System.out.println("CLEARED OTP : " + expiredOTP.getOtpCode());
        }
        System.out.println("OTP CLEANUP FINISHED");
    }

    private static String generateRandomOTP() {
        // Define the characters allowed in the OTP
        String allowedChars = "0123456789";

        // Set the length of the OTP
        int otpLength = 6;

        StringBuilder otp = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < otpLength; i++) {
            int index = random.nextInt(allowedChars.length());
            otp.append(allowedChars.charAt(index));
        }

        return otp.toString();
    }
}
