package com.example.tcs;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Member> allMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> singleMember(ObjectId id) {
        return memberRepository.findById(id);
    }


}
