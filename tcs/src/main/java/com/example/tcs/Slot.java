package com.example.tcs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Document(collection = "slots")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Slot {
    @Id
    private ObjectId id;
    private String date;
    private String startTime;
    @DBRef
    private List<Member> userAvail;
    @DBRef
    private List<Facility> facAvail;

}
