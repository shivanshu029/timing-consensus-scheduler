package com.example.tcs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/validate")
@CrossOrigin(origins = "http://localhost:3000")
public class OTPController {
    @Autowired
    private OTPService otpService;

    @GetMapping("/generateOTP")
    public ResponseEntity<OTP> generateOTP(@RequestParam String email) {
        return new ResponseEntity<OTP>(otpService.generateOTP(email), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Optional<OTP>> otpValidate(@RequestBody OTPController.ValidationRequest request) {
        String email = request.getEmail();
        String otpCode = request.getOtpCode();
        return new ResponseEntity<Optional<OTP>>(otpService.validateOTP(email, otpCode), HttpStatus.CREATED);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ValidationRequest {
        private String email;
        private String otpCode;

        // getters and setters
    }

}
