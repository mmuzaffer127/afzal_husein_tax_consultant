import { config } from '../utils/config';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const SYSTEM_INSTRUCTION = `You are the official AI Tax & Accounting Assistant for Afzal Husein Mohtesham, a reputable Accounts & Tax Professional based in Bhatkal, Karnataka, India.

Your Goal:
Provide helpful, accurate, polite, and professional answers to clients and prospective clients regarding Indian taxation, accounting, GST, compliance, and the firm's services.

About the Firm:
- Principal Professional: Afzal Husein Mohtesham
- Office Location: Bhatkal, Uttara Kannada District, Karnataka, India
- Experience: Dedicated practice assisting individuals, retail merchants, traders, NRIs, and small-to-medium businesses (MSMEs).

Core Services Offered:
1. Income Tax Return (ITR) Filing:
   - ITR-1 to ITR-4 (Salaried employees, freelancers, professionals, small businesses, capital gains, NRI income).
   - Tax planning, computation, rebate advice (Old vs. New Tax Regime).
2. GST Compliance & Registration:
   - New GST registration for businesses and sole proprietors.
   - Monthly and quarterly return filings (GSTR-1, GSTR-3B, CMP-08).
   - Annual GST returns (GSTR-9/9C) and reconciliation.
3. Accounting & Bookkeeping:
   - Day-to-day transaction recording, ledger creation, reconciliation in Tally/Zoho/Excel.
   - Preparation of Profit & Loss statements and Balance Sheets.
4. TDS & TCS Compliance:
   - TDS deduction calculations, quarterly 24Q, 26Q, 27Q filings, Form 16/16A generation.
5. Business Advisory & Registrations:
   - MSME/Udyam registration, PAN/TAN application, Partnership deeds, Trade licenses.
6. Audit & Financial Reporting Support:
   - Assistance with tax audit preparation and documentation.

Communication Style:
- Professional, warm, concise, and trustworthy.
- Format responses cleanly using bullet points for readability.
- If the user asks about quotes or specific case filing, warmly encourage them to submit an enquiry via the website or contact Afzal Husein directly.
- Include a disclaimer when necessary: "This advice is for informational guidance based on Indian tax laws. For tailored solutions or representation, please consult Mr. Afzal Husein directly."
`;

// Built-in intelligent answers when API key is not yet set or during offline testing
const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['itr', 'income tax', 'tax return', 'file tax', 'slab', 'regime'],
    answer: `**Income Tax Services by Afzal Husein Mohtesham:**\n\nWe provide end-to-end Income Tax Return (ITR) filing and advisory:\n\n• **ITR-1 (Sahaj)**: For salaried individuals & pension income.\n• **ITR-2**: For capital gains (stocks, mutual funds, property sale) & foreign/NRI income.\n• **ITR-3 & ITR-4 (Sugam)**: For business owners, professionals, and presumptive taxation.\n• **Regime Comparison**: Detailed calculation between Old vs. New Tax Regime to minimize your liability.\n\n**Key Documents Needed:** Form 16, PAN, Aadhaar, Bank statements, and investment proofs.\n\nWould you like to submit an enquiry for your ITR filing?`,
  },
  {
    keywords: ['gst', 'gstr', 'gst registration', 'goods and service'],
    answer: `**GST Solutions Offered:**\n\n• **New GST Registration**: Quick registration for sole proprietors, partnerships, and companies.\n• **Periodic Returns**: Timely filing of GSTR-1 (outward supplies) and GSTR-3B (monthly summary).\n• **Composition Scheme**: Quarterly filing (CMP-08) for eligible small businesses.\n• **Annual Reconciliation**: GSTR-9 and audit compliance.\n\nAvoiding GST penalties requires timely filings by the 11th and 20th of each month. Let us manage your compliance hassle-free!`,
  },
  {
    keywords: ['accounting', 'bookkeeping', 'tally', 'balance sheet', 'profit and loss'],
    answer: `**Accounting & Bookkeeping Services:**\n\n• Comprehensive maintenance of purchase, sales, and expense ledgers.\n• Bank reconciliations and vendor balance settlements.\n• Preparation of Profit & Loss Statements and Balance Sheets.\n• Regular financial health checks to prepare your business for loans and tax assessments.\n\nWe support leading accounting platforms including Tally Prime and digital cloud solutions.`,
  },
  {
    keywords: ['location', 'address', 'bhatkal', 'office', 'where'],
    answer: `**Office & Service Location:**\n\nAfzal Husein Mohtesham operates from **Bhatkal, Karnataka, India**.\n\nWe serve clients locally across Uttara Kannada, Mangalore, Udupi, and remotely across India and GCC/NRI clients via WhatsApp, phone, and secure document sharing.`,
  },
  {
    keywords: ['contact', 'phone', 'whatsapp', 'reach', 'email', 'consultation'],
    answer: `**How to Contact Afzal Husein Mohtesham:**\n\n• **Enquiry Form**: Use the "Contact" or "Submit Enquiry" page on this website.\n• **Response Time**: All enquiries are reviewed promptly within 24 hours.\n• **Preferred Methods**: You can request contact via Phone, WhatsApp, or Email based on your convenience!`,
  },
  {
    keywords: ['services', 'help', 'what do you do', 'offer'],
    answer: `**Overview of Services:**\n\n1. **Income Tax Returns (ITR)** — Salaried, Business, NRI, & Capital Gains\n2. **GST Registration & Returns** — Monthly, Quarterly & Annual Filings\n3. **Accounting & Bookkeeping** — Ledgers, P&L, Balance Sheets\n4. **TDS/TCS Compliance** — Quarterly returns & Form 16 issuance\n5. **Business Registrations** — MSME/Udyam, PAN/TAN, Partnership setup\n\nFeel free to ask about any specific service!`,
  },
];

function getKnowledgeBaseResponse(userQuery: string): string {
  const lower = userQuery.toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.answer;
    }
  }
  return `Thank you for reaching out! Afzal Husein Mohtesham specializes in Income Tax Returns (ITR), GST compliance, Business Accounting, TDS, and Company/MSME registrations in Bhatkal and across India.\n\nCould you please specify your requirement (e.g., ITR filing, GST registration, or Bookkeeping), or submit a quick enquiry through our contact form?`;
}

export async function askGemini(message: string, history: ChatMessage[] = []): Promise<string> {
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    // Graceful smart knowledge base fallback
    return getKnowledgeBaseResponse(message);
  }

  // Model endpoints to try (supports latest Gemini 2.5 / 2.0 / 1.5)
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const contents = [
        ...history.map((h) => ({
          role: h.role === 'model' ? 'model' : 'user',
          parts: h.parts.map((p) => ({ text: p.text })),
        })),
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.warn(`Gemini API error with model ${model}:`, errorText);
        continue; // try next model
      }

      const data = (await res.json()) as any;
      const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidate) {
        return candidate;
      }
    } catch (err) {
      console.warn(`Gemini fetch error with model ${model}:`, (err as Error).message);
    }
  }

  // Fallback to knowledge base if all API calls fail
  return getKnowledgeBaseResponse(message);
}
