// src/services/EmailService.ts
interface MathResults {
    course: string;
    level: string;
    courseConfidence: number;
    levelConfidence: number;
    overallConfidence: number;
    details: {
        focus: string;
        style: string;
        advice: string;
        overrides?: string[];
        borderline?: boolean;
    };
}

class EmailService {
    private baseUrl: string = '/api'; //  <-- Correct: Use relative path

    async sendMathResults(email: string, results: MathResults) {
        try {
            // Use VITE_APP_BACKEND_URL if available, otherwise default to /api
            const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || this.baseUrl;
            const response = await fetch(`${backendUrl}/sendEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // NO Authorization header here!
                },
                body: JSON.stringify({ email, results }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Email send failed:', errorData);
                throw new Error(errorData.error || 'Failed to send email');
            }

            return await response.json();
        } catch (error: any) {
            console.error('Error sending email:', error);
            throw error; // Re-throw for component handling
        }
    }
}

const emailService = new EmailService();
export default emailService;