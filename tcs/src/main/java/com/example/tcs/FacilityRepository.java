package com.example.tcs;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacilityRepository extends MongoRepository<Facility, ObjectId>{

    Optional<Facility> findFacilityByEmail(String email);

}
