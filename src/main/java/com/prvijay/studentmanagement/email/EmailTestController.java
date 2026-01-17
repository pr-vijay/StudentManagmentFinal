package com.prvijay.studentmanagement.email;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailTestController {

    private final EmailService emailService;

    @PostMapping("/test")
    public ResponseEntity<String> sendTestEmail(@RequestParam String to) {
        emailService.sendEmail(to, "Test Email", "This is a test from Student Management app.");
        return ResponseEntity.ok("Email sent to " + to);
    }
}
