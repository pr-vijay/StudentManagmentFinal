package com.prvijay.studentmanagement.report;

import com.prvijay.studentmanagement.email.EmailService;
import com.prvijay.studentmanagement.student.Student;
import com.prvijay.studentmanagement.student.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeeklyEmailScheduler {

    private final WeeklyReportService weeklyReportService;
    private final StudentService studentService;
    private final EmailService emailService;

    // Every Monday at 9:00 AM (server time)
    @Scheduled(cron = "0 0 9 * * MON")
    public void sendWeeklyReports() {
        List<Student> students = studentService.getAll(); // ensure this exists

        for (Student student : students) {
            String email = student.getEmail(); // adjust field name
            if (email == null || email.isBlank()) {
                continue;
            }

            String body = weeklyReportService.buildWeeklySummaryForStudent(student.getId());

            emailService.sendEmail(
                    email,
                    "Weekly Attendance Report",
                    body
            );
        }
    }
}
