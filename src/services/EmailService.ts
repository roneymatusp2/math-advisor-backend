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

class EmailService {
    private apiKey: string;
    private baseUrl: string = 'https://api.mailersend.com/v1';
    private fromEmail: string;

    constructor() {
        this.apiKey = import.meta.env.VITE_MAILERSEND_API_KEY;
        this.fromEmail = import.meta.env.VITE_MAILERSEND_FROM_EMAIL;

        if (!this.apiKey || !this.fromEmail) {
            console.error('Missing required MailerSend configuration. Check your environment variables.');
        }
    }

    async sendMathResults(email: string, results: MathResults) {
        try {
            const emailData = {
                from: {
                    email: this.fromEmail,
                    name: "IB Math Advisor"
                },
                to: [
                    {
                        email: email,
                        name: email.split('@')[0]
                    }
                ],
                subject: "Your IB Math Course Recommendation",
                html: `
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
                                        <h2>Course Recommendation</h2>
                                        <p>Based on your responses, we recommend:</p>
                                        <p><strong>Mathematics: ${results.course === 'AA' ? 'Analysis & Approaches' :
                    results.course === 'AI' ? 'Applications & Interpretation' :
                        'AA or AI (Tie)'}</strong></p>
                                        <p><strong>Level: ${results.level === 'HL' ? 'Higher Level' :
                    results.level === 'SL' ? 'Standard Level' :
                        'HL or SL (Tie)'}</strong></p>
                                        <p class="confidence">Confidence Level: ${Math.round(results.overallConfidence * 100)}%</p>
                                    </div>

                                    <div class="result-box">
                                        <h2>Analysis Details</h2>
                                        <h3>Learning Focus</h3>
                                        <p>${results.details.focus}</p>
                                        <h3>Learning Style</h3>
                                        <p>${results.details.style}</p>
                                        <h3>Recommendations</h3>
                                        <p>${results.details.advice}</p>
                                    </div>

                                    ${results.details.borderline ? `
                                        <div class="alert">
                                            <p><strong>Note:</strong> Your results indicate you're on the borderline between levels or courses. 
                                            Consider discussing these results with your math teacher to make the best choice.</p>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </body>
                    </html>
                `
            };

            const response = await fetch(`${this.baseUrl}/email`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Email send failed:', errorData);
                throw new Error(`Email send failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

const emailService = new EmailService();
export default emailService;