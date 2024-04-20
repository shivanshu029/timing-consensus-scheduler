package com.example.tcs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "members")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    private ObjectId id;
    private String name;
    private String email;
    private String password;
    private String type;

}
