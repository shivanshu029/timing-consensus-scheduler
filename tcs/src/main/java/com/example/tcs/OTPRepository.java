package com.example.tcs;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OTPRepository extends MongoRepository<OTP, String>{

    Optional<OTP> findOTPDataByEmail(String email);
    void deleteByEmail(String email); // Custom delete method
}
