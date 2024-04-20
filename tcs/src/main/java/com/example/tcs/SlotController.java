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
@RequestMapping("/api/v1/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {
    @Autowired
    private SlotService slotService;
    private String encryptPassword(String password){
        StringBuilder encryptedPassword = new StringBuilder();
        for(int i=0; i<password.length(); i++){
            encryptedPassword.append((char) (password.charAt(i) + 2));
        }
        return encryptedPassword.toString();
    };

    @GetMapping
    public ResponseEntity<List<Slot>> getAllSlots() {
        return new ResponseEntity<>(slotService.allSlots(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Slot>> getSingleSlot(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Slot>>(slotService.singleSlot(id), HttpStatus.OK);
    }

    @GetMapping("/getSlots")
    public ResponseEntity<List<Slot>> getSlots(
            @RequestParam List<String> emails,
            @RequestParam String date) {
        return new ResponseEntity<List<Slot>>(
                slotService.availSlotsByMembersAndDate(emails, date),
                HttpStatus.OK);
    }

    @GetMapping("/memberemailtoid")
    public ResponseEntity<List<ObjectId>> getMemberIdByEmail(@RequestParam List<String> emails) {
        List<ObjectId> memberIds = slotService.getMemberIdByEmail(emails);
        if (memberIds == null) {
            return ResponseEntity.notFound().build();
        }
        System.out.println("memberIds: " + memberIds);
        return ResponseEntity.ok(memberIds);
    }

    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        String encryptedPassword = encryptPassword(password);
        return new ResponseEntity<Member>(slotService.login(email, encryptedPassword), HttpStatus.CREATED);
    }

    @PostMapping("/signup")
    public ResponseEntity<Member> signup(@RequestBody SignupRequest request) {
        String name = request.getName();
        String email = request.getEmail();
        String password = request.getPassword();
        String memberType = request.getMemberType();
        String encryptedPassword = encryptPassword(password);
        Member member = slotService.signup(name, email, encryptedPassword, memberType);
        return new ResponseEntity<Member>(member, HttpStatus.CREATED);
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<Member> resetPassword(@RequestBody ResetRequest request) {
        String email = request.getEmail();
        String oldPassword = request.getOldPassword();
        String newPassword = request.getNewPassword();
        String encryptedOldPassword = encryptPassword(oldPassword);
        String encryptedNewPassword = encryptPassword(newPassword);
        Member member = slotService.resetPassword(email, encryptedOldPassword, encryptedNewPassword);
        return new ResponseEntity<Member>(member, HttpStatus.CREATED);
    }

    @PostMapping("/editSlot")
    public ResponseEntity<Member> editSlot(@RequestBody SlotRequest request) {
        String date = request.getDate();
        String startTime = request.getStartTime();
        String memberType = request.getMemberType();
        ObjectId memberId = request.getMemberId();
        return new ResponseEntity<Member>(slotService.editSlot(date, startTime, memberType, memberId), HttpStatus.CREATED);
    }

    @PostMapping("/editSlotEmail")
    public ResponseEntity<Member> editSlotEmail(@RequestBody SlotRequestEmail request) {
        String date = request.getDate();
        String startTime = request.getStartTime();
        String memberType = request.getMemberType();
        String email = request.getEmail();
        return new ResponseEntity<Member>(slotService.editSlotEmail(date, startTime, memberType, email), HttpStatus.CREATED);
    }

    @PostMapping("/createSlot")
    public ResponseEntity<Slot> createSlot(@RequestBody SlotRequest request) {
        String date = request.getDate();
        String startTime = request.getStartTime();
        ObjectId id = new ObjectId();

        return new ResponseEntity<Slot>(slotService.createSlot(date, startTime, id), HttpStatus.CREATED);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SlotRequest {
        private String date;
        private String startTime;
        private String memberType;
        private ObjectId memberId;

        // getters and setters
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SlotRequestEmail {
        private String date;
        private String startTime;
        private String memberType;
        private String email;

        // getters and setters
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;

        // getters and setters
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SignupRequest {
        private String name;
        private String email;
        private String password;
        private String memberType;

        // getters and setters
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResetRequest {
        private String email;
        private String oldPassword;
        private String newPassword;

        // getters and setters
    }

}
