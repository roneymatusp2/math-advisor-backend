import Mailgun from 'mailgun-js';

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
    }
}

/**
 * Service for sending emails using Mailgun
 */
export default class EmailService {
    private readonly mailgunClient: Mailgun.Mailgun;

    constructor() {
        const apiKey = process.env.MAILGUN_API_KEY;
        const domain = process.env.MAILGUN_DOMAIN;

        if (!apiKey) {
            throw new Error('MAILGUN_API_KEY environment variable is required');
        }
        if (!domain) {
            throw new Error('MAILGUN_DOMAIN environment variable is required');
        }

        this.mailgunClient = Mailgun({
            apiKey,
            domain
        });
    }

    private validateEmail(email: string): void {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email address');
        }
    }

    private validateResults(results: MathResults): void {
        if (!results.course || !results.level || !results.details) {
            throw new Error('Missing required results fields');
        }

        if (results.courseConfidence < 0 || results.courseConfidence > 100 ||
            results.levelConfidence < 0 || results.levelConfidence > 100 ||
            results.overallConfidence < 0 || results.overallConfidence > 100) {
            throw new Error('Confidence values must be between 0 and 100');
        }

        if (!results.details.focus || !results.details.style || !results.details.advice) {
            throw new Error('Missing required details fields');
        }
    }

    async sendMathResults(email: string, results: MathResults): Promise<Mailgun.messages.SendResponse> {
        try {
            this.validateEmail(email);
            this.validateResults(results);

            const domain = process.env.MAILGUN_DOMAIN;
            if (!domain) {
                throw new Error('MAILGUN_DOMAIN environment variable is required');
            }

            const html = `
                <html>
                    <head>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                line-height: 1.6; 
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                            .container { 
                                max-width: 600px; 
                                margin: 0 auto; 
                                padding: 20px; 
                            }
                            .header { 
                                background: #4F46E5; 
                                color: white; 
                                padding: 20px; 
                                text-align: center; 
                                border-radius: 8px 8px 0 0;
                            }
                            .content { 
                                background: #f9fafb; 
                                padding: 20px; 
                                border-radius: 0 0 8px 8px;
                            }
                            .result-box { 
                                background: white; 
                                padding: 15px; 
                                margin: 10px 0; 
                                border-radius: 5px;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                            .confidence { 
                                color: #4F46E5; 
                                font-weight: bold; 
                            }
                            .alert {
                                background: #FEF2F2;
                                color: #991B1B;
                                padding: 10px;
                                border-radius: 5px;
                                margin-top: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Your IB Math Results</h1>
                            </div>
                            <div class="content">
                                <div class="result-box">
                                    <h2>Final Recommendation: ${results.course} (${results.level})</h2>
                                    <p class="confidence">
                                        Course Confidence: ${results.courseConfidence}%<br/>
                                        Level Confidence: ${results.levelConfidence}%<br/>
                                        Overall Confidence: ${results.overallConfidence}%
                                    </p>
                                </div>
                                <div class="result-box">
                                    <h3>Detailed Analysis</h3>
                                    <p><strong>Focus:</strong> ${results.details.focus}</p>
                                    <p><strong>Learning Style:</strong> ${results.details.style}</p>
                                    <p><strong>Advice:</strong> ${results.details.advice}</p>
                                    ${results.details.borderline ?
                `<p class="alert">Note: This recommendation is borderline. Consider discussing with your teacher.</p>`
                : ''}
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            `;

            const data = {
                from: `IB Math Advisor <mailgun@${domain}>`,
                to: email,
                subject: 'Your IB Math Course Recommendation',
                html: html
            };

            return await this.mailgunClient.messages().send(data);
        } catch (error: unknown) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}