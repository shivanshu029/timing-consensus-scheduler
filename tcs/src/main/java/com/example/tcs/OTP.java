package com.example.tcs;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "otps")
@Data
public class OTP {

    private String otpCode;
    @Id
    private String email;
    private long timestamp = 0;

    public OTP(String otpCode, String email, long timestamp) {
        this.otpCode = otpCode;
        this.email = email;
        this.timestamp = timestamp;
    }

    public String getOtpCode () {
        return otpCode;
    }

    public String getEmail() {
        return email;
    }

    public long getTimeStamp() {
        return timestamp;
    }

}
