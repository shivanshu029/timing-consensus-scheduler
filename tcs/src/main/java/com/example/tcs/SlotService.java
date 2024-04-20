package com.example.tcs;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}

@Service
public class SlotService {
    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Slot> allSlots() {
        return slotRepository.findAll();
    }

    public Optional<Slot> singleSlot(ObjectId id) {
        return slotRepository.findById(id);
    }

    public List<Slot> findSlotsByDate(String date) {

        List<Slot> slots = slotRepository.findAll();
        List<Slot> slots2 = slots.stream().filter(slot -> slot.getDate().equals(date)).toList();

        return slots;
    }

    public List<Member> findMembersByEmail(List<String> emails) {
        List<Member> members = memberRepository.findAll();
        return members.stream().filter(member -> emails.contains(member.getEmail())).toList();
    }

    public List<Facility> findFacilitiesByEmail(List<String> emails) {
        List<Facility> facilities = facilityRepository.findAll();
        return facilities.stream().filter(facility -> emails.contains(facility.getEmail())).toList();
    }

    public Member findMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findMemberByEmail(email);
        return optionalMember.orElse(null);
    }

    public Facility findFacilityByEmail(String email) {
        Optional<Facility> optionalFacility = facilityRepository.findFacilityByEmail(email);
        return optionalFacility.orElse(null);
    }

    public int passwordStrength(String pass) {
        int strength = 0;

        // Rule 1: Check password length
        if (pass.length() >= 8) {
            strength++;
        }

        // Rule 2: Check for both lowercase and uppercase characters
        if (pass.matches(".*[a-z].*") && pass.matches(".*[A-Z].*")) {
            strength++;
        }

        // Rule 3: Check for at least one digit
        if (pass.matches(".*\\d.*")) {
            strength++;
        }

        // Rule 4: Check for at least one special character
        if (pass.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            strength++;
        }

        // Rule 5: Check for no spaces
        if (!pass.contains(" ")) {
            strength++;
        }

        // Ensure the strength is between 1 and 5
        strength = Math.min(5, strength);
        strength = Math.max(1, strength);

        return strength;
    }


    public Member login(String email, String password) {
        Optional<Member> optionalMember = memberRepository.findMemberByEmail(email);
        Member member = optionalMember.orElse(null);

        // member is assigned a null value if the member does not exist
        if (member == null) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        if (!member.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        return member;
    }

    public Member signup(String name, String email, String password, String memberType) {
        // Check if member already exists with the given email
        Member existingMember = findMemberByEmail(email);
        if (existingMember != null) {
            throw new InvalidCredentialsException("An account already exists with email: " + email);
        }

        if(memberType == "" || memberType == null) {
            throw new InvalidCredentialsException("Select Member Type");
        }

        if(email == "" || email == null) {
            throw new InvalidCredentialsException("Email field is empty");
        }

        if(password == "" || password == null) {
            throw new InvalidCredentialsException("Password field is empty");
        }

        if(name == "" || name == null) {
            throw new InvalidCredentialsException("Name field is empty");
        }

        // Checking password strength
        int password_strength = passwordStrength(password);
        System.out.println("Password Strength: " + password_strength);
        if(password_strength <= 2) {
            throw new InvalidCredentialsException("Password is too weak");
        }

        // Create a new Member object with the given details
        Member newMember = new Member();
        newMember.setName(name); // Set default name as empty string
        newMember.setEmail(email);
        newMember.setPassword(password);
        newMember.setType(memberType);

        // Save the new member to the database
        memberRepository.save(newMember);
        System.out.println("Registered with email: " + email);

        return newMember;
    }

    public Member resetPassword(String email, String oldPassword, String newPassword) {
        // Check if member already exists with the given email
        Member existingMember = findMemberByEmail(email);
        if (existingMember == null) {
            throw new InvalidCredentialsException("Member does not exist with email: " + email);
        }

        if(!oldPassword.equals(existingMember.getPassword())) {
            throw new InvalidCredentialsException("Old password is wrong");
        }

        if(newPassword == "" || newPassword == null) {
            throw new InvalidCredentialsException("New password cannot be null");
        }

        if(newPassword.equals(oldPassword)) {
            throw new InvalidCredentialsException("New password cannot be same as old password");
        }

        //update the existing member's password
        Update update = new Update();
        update.set("password", newPassword);
        mongoTemplate.updateFirst(
                Query.query(Criteria.where("email").is(email)),
                update,
                Member.class
        );

        System.out.println("Password reset for member with email: " + email + ", new password: " + newPassword);

        return existingMember;
    }

    public Member editSlot(String date, String startTime, String memberType, ObjectId memberId) {

        System.out.println("\n\nDate: " + date + ", Start Time: " + startTime + ", Member Type: " + memberType + ", Member ID: " + memberId);

        Optional<Slot> optionalSlot = slotRepository.findSlotByDateAndStartTime(date, startTime);
        Slot slot = optionalSlot.orElse(null);
        //System.out.println("Slot: " + slot);

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElse(null);
        //System.out.println("Member: " + member);

        Optional<Facility> optionalFacility = facilityRepository.findById(memberId);
        Facility facility = optionalFacility.orElse(null);
        System.out.println("Facility: " + facility);

        if ("User".equals(memberType) && slot != null && member != null) {

            if(checkMemberAvail(slot, member)) {
                System.out.println("\nMember already in slot");
                return member;
            }
            //System.out.println("\nMember not in slot, Member : " + member.getName());
            mongoTemplate.update(Slot.class)
                    .matching(Criteria.where("_id").is(slot.getId()))
                    .apply(new Update().push("userAvail").value(member))
                    .first();
            System.out.println("\nUser added to slot: " + slot.getId());
        } else if ("Facility".equals(memberType) && slot != null && facility != null) {
            if(checkFacAvail(slot, facility)) {
                System.out.println("\nFacility already in slot");
                return facility;
            }
            mongoTemplate.update(Slot.class)
                    .matching(Criteria.where("_id").is(slot.getId()))
                    .apply(new Update().push("facAvail").value(facility))
                    .first();
            System.out.println("\nFacility added to slot: " + slot.getId());
        }
        return member;

    }

    public Member editSlotEmail(String date, String startTime, String memberType, String email) {

        System.out.println("\n\nDate: " + date + ", Start Time: " + startTime + ", Member Type: " + memberType + ", Email: " + email);

        Optional<Slot> optionalSlot = slotRepository.findSlotByDateAndStartTime(date, startTime);
        Slot slot = optionalSlot.orElse(null);
        //System.out.println("Slot: " + slot);

        Member member = findMemberByEmail(email);
        System.out.println("Member: " + member);

        Facility facility = findFacilityByEmail(email);
        System.out.println("Facility: " + facility);

        if ("User".equals(memberType) && slot != null && member != null) {
            System.out.println("HERE");
            if(checkMemberAvail(slot, member)) {
                System.out.println("\nMember already in slot");
                return member;
            }
            //System.out.println("\nMember not in slot, Member : " + member.getName());
            mongoTemplate.update(Slot.class)
                    .matching(Criteria.where("_id").is(slot.getId()))
                    .apply(new Update().push("userAvail").value(member))
                    .first();
            System.out.println("\nUser added to slot: " + slot.getId());
        } else if ("Facility".equals(memberType) && slot != null && facility != null) {
            if(!checkFacAvail(slot, facility)) {
                System.out.println("\nFacility not in slot");
                return facility;
            }
            mongoTemplate.update(Slot.class)
                    .matching(Criteria.where("_id").is(slot.getId()))
                    .apply(new Update().pull("facAvail", facility))
                    .first();
            System.out.println("\nFacility removed from slot: " + slot.getId());
        }
        return member;
    }

    public boolean checkMemberAvail(Slot slot, Member member) {
        List<Member> userAvail = slot.getUserAvail();
        for (Member m : userAvail) {
            if (m.getId().equals(member.getId())) {
                return true;
            }
        }
        return false;
    }

    public List<ObjectId> getMemberIdByEmail (List<String> emails) {
        List<Member> members = memberRepository.findAll();
        List<ObjectId> memberIds = members.stream().filter(member -> emails.contains(member.getEmail())).map(Member::getId).collect(Collectors.toList());
        System.out.println("\n\nMember Ids: " + memberIds);
        return memberIds;
    }

    public boolean checkFacAvail(Slot slot, Facility facility) {
        List<Facility> facAvail = slot.getFacAvail();
        for (Facility f : facAvail) {
            if (f.getId().equals(facility.getId())) {
                return true;
            }
        }
        return false;
    }

    public List<Slot> availSlotsByMember (ObjectId memberId, String date) {
        List<Slot> slots = findSlotsByDate(date);
        Member member = memberRepository.findById(memberId).orElse(null);
        slots.removeIf(slot -> !checkMemberAvail(slot, member));
        return slots;
    }

    public List<Slot> availSlotsByMembersAndDate (List<String> emailIds, String date) {
        List<Slot> slots = findSlotsByDate(date);
        //System.out.println("\n\n slots: " + slots);
        //System.out.println("\n date: " + date);
        //System.out.println("\n emailIds: " + emailIds);
        List<Member> members = findMembersByEmail(emailIds);
        List<Facility> facilities = findFacilitiesByEmail(emailIds);
        for (Member member : members) {
            System.out.println("\n\n member: " + member);
            slots.removeIf(slot -> !checkMemberAvail(slot, member));
        }
        for (Facility facility : facilities) {
            System.out.println("\n\n facility: " + facility);
            slots.removeIf(slot -> !checkFacAvail(slot, facility));
        }
        System.out.println("\n\n slots: " + slots);
        return slots;
    }

    public Slot createSlot(String date, String time, ObjectId id) {
        Slot slot = new Slot();
        slot.setDate(date);
        slot.setStartTime(time);
        slot.setId(id);

        return slotRepository.insert(slot);
    }
}
