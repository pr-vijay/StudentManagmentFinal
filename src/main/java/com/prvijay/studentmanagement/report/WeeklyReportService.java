package com.prvijay.studentmanagement.report;

import com.prvijay.studentmanagement.attendance.AttendanceService;
import com.prvijay.studentmanagement.attendance.dto.AttendanceSummaryDto;
import com.prvijay.studentmanagement.student.Student;
import com.prvijay.studentmanagement.student.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WeeklyReportService {

    private final AttendanceService attendanceService;
    private final StudentService studentService;

    public String buildWeeklySummaryForStudent(String studentId) {
        Student student = studentService.getById(studentId); // make sure this exists


        AttendanceSummaryDto summary = (AttendanceSummaryDto) attendanceService.getAttendanceForStudent(studentId);

        return """
        Weekly Attendance Report for %s (%s)

        Total Classes: %d
        Present: %d
        Absent: %d

        Keep up the good work and review detailed performance in the portal.
        """
                .formatted(
                        student.getFirstName() + " " + student.getLastName(),
                        student.getClassName() + " " + student.getSection(),
                        summary.getTotalClasses(),
                        summary.getPresent(),
                        summary.getAbsent()
                );

    }
}
