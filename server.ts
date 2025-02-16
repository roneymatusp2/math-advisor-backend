// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import morgan from 'morgan';
import validator from 'validator';

dotenv.config(); // Load environment variables

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

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON request bodies
// Allow requests from any origin.  This is fine for development, but for
// production, you should restrict this to your frontend's URL.
app.use(cors());
app.use(morgan('dev')); // Log requests to the console (for debugging)

// --- Environment Variables (CRITICAL) ---
const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const MAILERSEND_FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL;

if (!MAILERSEND_API_KEY || !MAILERSEND_FROM_EMAIL) {
    console.error('❌ ERROR: MailerSend API key or fromEmail not set in environment variables!');
    process.exit(1); // Stop the server if these are missing
}

// Health check endpoint (good for testing)
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Server is running!' });
});

// Email sending endpoint
app.post('/api/sendEmail', async (req: Request, res: Response) => {
    try {
        const { email, results } = req.body as { email: string; results: MathResults };

        // --- Input Validation ---
        if (!email || !results) {
            return res.status(400).json({ error: 'Email and results are required.' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address.' });
        }

        // --- Construct MailerSend Data ---
        const mailData = {
            from: {
                email: MAILERSEND_FROM_EMAIL,
                name: 'IB Math Advisor',
            },
            to: [{ email: email, name: email.split('@')[0] }], // Use provided email
            subject: 'Your IB Math Course Recommendation',
            html: `
                <html>
                    <head>
                        <style>
                            /* Your CSS styles here (from previous examples) */
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;}
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px;}
                            .result-box { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                            .confidence { color: #4F46E5; font-weight: bold; }
                            .alert { background: #FEF2F2; color: #991B1B; padding: 10px; border-radius: 5px; margin-top: 10px; }
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
                                    <p><strong>Mathematics: ${results.course === 'AA' ? 'Analysis & Approaches' : results.course === 'AI' ? 'Applications & Interpretation' : 'AA or AI (Tie)'}</strong></p>
                                    <p><strong>Level: ${results.level === 'HL' ? 'Higher Level' : results.level === 'SL' ? 'Standard Level' : 'HL or SL (Tie)'}</strong></p>
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
                                        <p><strong>Note:</strong> Your results indicate you're on the borderline between levels or courses.  Consider discussing these results with your math teacher.</p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </body>
                </html>
            `,
        };

        // --- Send Email via MailerSend ---
        const mailResponse = await fetch('https://api.mailersend.com/v1/email', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest', // Good practice for CORS
            },
            body: JSON.stringify(mailData),
        });

        // --- Handle MailerSend Response ---
        if (!mailResponse.ok) {
            const errorData = await mailResponse.json(); // Get error details
            console.error('❌ MailerSend Error:', mailResponse.status, errorData);
            return res.status(mailResponse.status).json({
                error: 'Failed to send email via MailerSend',
                details: errorData, // Include MailerSend's error details
            });
        }

        const mailResult = await mailResponse.json();
        console.log('✅ Email sent successfully:', mailResult);
        return res.status(200).json({ success: true, message: 'Email sent successfully!' });

    } catch (error: any) {
        console.error('❌ General Error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});