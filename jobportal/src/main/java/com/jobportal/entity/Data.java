package com.jobportal.entity;

public class Data {
    public static String getMessageBody(String otp, int expiryMinutes) {
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Your One-Time Password (OTP)</title>\n" +
                "    <style>\n" +
                "        body, html {\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n" +
                "            line-height: 1.6;\n" +
                "            color: #333333;\n" +
                "        }\n" +
                "        .email-wrapper {\n" +
                "            max-width: 600px;\n" +
                "            margin: 0 auto;\n" +
                "            padding: 20px;\n" +
                "            background-color: #f7f7f7;\n" +
                "        }\n" +
                "        .header {\n" +
                "            text-align: center;\n" +
                "            padding: 30px 0;\n" +
                "            background-color: #ffffff;\n" +
                "        }\n" +
                "        .logo {\n" +
                "            max-width: 150px;\n" +
                "            height: auto;\n" +
                "        }\n" +
                "        .content {\n" +
                "            padding: 40px 30px;\n" +
                "            background-color: #ffffff;\n" +
                "            border-radius: 8px;\n" +
                "            margin: 20px 0;\n" +
                "            box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n" +
                "        }\n" +
                "        .otp-code {\n" +
                "            font-size: 42px;\n" +
                "            font-weight: bold;\n" +
                "            color: #2563eb;\n" +
                "            letter-spacing: 4px;\n" +
                "            text-align: center;\n" +
                "            margin: 30px 0;\n" +
                "            padding: 15px;\n" +
                "            background-color: #f0f4ff;\n" +
                "            border-radius: 6px;\n" +
                "            display: inline-block;\n" +
                "        }\n" +
                "        .footer {\n" +
                "            text-align: center;\n" +
                "            padding: 25px;\n" +
                "            color: #666666;\n" +
                "            font-size: 14px;\n" +
                "        }\n" +
                "        .social-links a {\n" +
                "            margin: 0 10px;\n" +
                "            text-decoration: none;\n" +
                "        }\n" +
                "        .disclaimer {\n" +
                "            font-size: 12px;\n" +
                "            color: #999999;\n" +
                "            line-height: 1.5;\n" +
                "            margin-top: 25px;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"email-wrapper\">\n" +
                "        <div class=\"header\">\n" +
                "            <img src=\"https://your-job-portal.com/logo.png\" alt=\"JobPortal Logo\" class=\"logo\">\n" +
                "            <h1 style=\"color: #1a202c; margin-top: 20px;\">Secure Your Account</h1>\n" +
                "        </div>\n" +
                "        <div class=\"content\">\n" +
                "            <p style=\"margin-bottom: 25px;\">Hello,</p>\n" +
                "            <p>We received a request to access your JobPortal account. Use the following One-Time Password to verify your identity:</p>\n" +
                "            <div style=\"text-align: center;\">\n" +
                "                <div class=\"otp-code\">" + otp + "</div>\n" +
                "            </div>\n" +
                "            <p style=\"margin-top: 25px;\">This code will expire in <strong>" + expiryMinutes + " minutes</strong>. Do not share this code with anyone.</p>\n" +
                "            <p style=\"margin-top: 30px;\">If you didn't request this OTP, please ignore this email or contact our support team immediately.</p>\n" +
                "        </div>\n" +
                "        <div class=\"footer\">\n" +
                "            <div class=\"social-links\">\n" +
                "                <a href=\"https://twitter.com/JobPortal\" style=\"color: #2563eb;\">Twitter</a>\n" +
                "                <a href=\"https://linkedin.com/company/JobPortal\" style=\"color: #2563eb;\">LinkedIn</a>\n" +
                "                <a href=\"https://facebook.com/JobPortal\" style=\"color: #2563eb;\">Facebook</a>\n" +
                "            </div>\n" +
                "            <p style=\"margin: 20px 0;\">© 2024 JobPortal. All rights reserved.</p>\n" +
                "            <div class=\"disclaimer\">\n" +
                "                <p>This is an automated message. Please do not reply directly to this email.</p>\n" +
                "                <p>For any inquiries, contact our support team at <a href=\"mailto:support@jobportal.com\" style=\"color: #2563eb;\">support@jobportal.com</a></p>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
