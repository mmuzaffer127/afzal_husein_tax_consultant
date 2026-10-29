// ============================================
// Service Data — Centralized Service Definitions
// ============================================

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  icon: string;
  whoItsFor: string[];
  process: string[];
  relatedServices: string[];
}

export const serviceCategories = [
  { id: 'accounting-tax', label: 'Accounting & Tax' },
  { id: 'gst', label: 'GST' },
  { id: 'registration', label: 'Business Registration & Compliance' },
  { id: 'other', label: 'Other Services' },
];

export const services: Service[] = [
  // --- Accounting & Tax ---
  {
    slug: 'bookkeeping',
    title: 'Bookkeeping',
    shortDescription: 'Systematic recording and organisation of financial transactions for individuals and businesses.',
    description: 'Bookkeeping forms the foundation of sound financial management. This service covers the systematic recording, organising, and maintenance of financial transactions. Whether you run a shop, a small business, or manage personal finances, accurate bookkeeping helps you understand your financial position, prepare for tax filing, and make informed decisions.',
    category: 'accounting-tax',
    icon: 'BookOpen',
    whoItsFor: [
      'Small business owners and shopkeepers',
      'Self-employed professionals',
      'Individuals managing multiple income sources',
      'Businesses needing organised financial records',
    ],
    process: [
      'Discuss your current financial record-keeping situation',
      'Understand the nature and volume of transactions',
      'Set up or review the bookkeeping system',
      'Regularly record and reconcile financial transactions',
      'Provide organised financial summaries as needed',
    ],
    relatedServices: ['income-tax-filing', 'gst-return-filing', 'tds'],
  },
  {
    slug: 'income-tax-filing',
    title: 'Income Tax / ITR Filing',
    shortDescription: 'Assistance with preparation and filing of Income Tax Returns for individuals and businesses.',
    description: 'Income Tax Return (ITR) filing is a mandatory annual compliance for eligible individuals, businesses, and other entities. This service covers the preparation and filing of various ITR forms based on your income sources and category. Proper ITR filing helps you remain compliant with tax laws and may be required for visa applications, loan approvals, and other financial processes.',
    category: 'accounting-tax',
    icon: 'FileText',
    whoItsFor: [
      'Salaried individuals',
      'Business owners and self-employed professionals',
      'Individuals with capital gains or multiple income sources',
      'NRIs with Indian income',
      'Anyone required to file income tax returns',
    ],
    process: [
      'Review your income sources and applicable ITR form',
      'Gather necessary financial documents and statements',
      'Prepare the income tax computation',
      'File the ITR through the official portal',
      'Provide the acknowledgement and follow up if needed',
    ],
    relatedServices: ['bookkeeping', 'tds', 'tax-appeals'],
  },
  {
    slug: 'tds',
    title: 'TDS (Tax Deducted at Source)',
    shortDescription: 'Assistance with TDS compliance, returns, and related filings.',
    description: 'Tax Deducted at Source (TDS) is a mechanism where tax is deducted at the point of income generation. Businesses, employers, and certain individuals are required to deduct TDS and deposit it with the government. This service covers TDS return filing, TDS computation, compliance assistance, and correction statements to help you meet your TDS obligations.',
    category: 'accounting-tax',
    icon: 'Percent',
    whoItsFor: [
      'Employers deducting TDS on salaries',
      'Businesses making payments subject to TDS',
      'Individuals receiving income with TDS deducted',
      'Entities needing TDS return filing assistance',
    ],
    process: [
      'Review applicable TDS provisions for your payments',
      'Compute TDS amounts correctly',
      'Assist with TDS deposit and return filing',
      'Issue TDS certificates as required',
      'Handle corrections and revisions if needed',
    ],
    relatedServices: ['income-tax-filing', 'bookkeeping', 'tax-appeals'],
  },
  {
    slug: 'tax-appeals',
    title: 'Tax Appeals',
    shortDescription: 'Assistance with tax-related appeals and dispute resolution processes.',
    description: 'Tax disputes can arise when there are differences between your declared income and assessments by the tax authorities. This service provides assistance with preparing and filing tax appeals, responding to notices, and navigating the dispute resolution process. Professional guidance can help present your case effectively.',
    category: 'accounting-tax',
    icon: 'Scale',
    whoItsFor: [
      'Individuals who have received tax demand notices',
      'Businesses facing assessment disputes',
      'Anyone needing to appeal a tax order',
      'Entities seeking rectification of tax records',
    ],
    process: [
      'Review the tax notice or assessment order',
      'Analyse the grounds for appeal',
      'Prepare the appeal documentation',
      'File the appeal through appropriate channels',
      'Follow up and provide representation support',
    ],
    relatedServices: ['income-tax-filing', 'tds', 'gst-refund'],
  },
  {
    slug: 'professional-tax-registration',
    title: 'Professional Tax Registration',
    shortDescription: 'Assistance with Professional Tax registration and compliance in Karnataka.',
    description: 'Professional Tax is a state-level tax levied on individuals and entities earning income through employment, trade, or profession. In Karnataka, employers and self-employed individuals may need to register for Professional Tax and file periodic returns. This service assists with the registration process and ongoing compliance requirements.',
    category: 'accounting-tax',
    icon: 'BadgeCheck',
    whoItsFor: [
      'Employers in Karnataka',
      'Self-employed professionals',
      'Businesses with employees',
      'Freelancers and consultants',
    ],
    process: [
      'Determine your Professional Tax obligation',
      'Gather required documents for registration',
      'Submit the registration application',
      'Assist with periodic return filing',
      'Ensure ongoing compliance',
    ],
    relatedServices: ['income-tax-filing', 'gst-registration', 'bookkeeping'],
  },

  // --- GST ---
  {
    slug: 'gst-registration',
    title: 'GST Registration',
    shortDescription: 'Assistance with obtaining GST registration for businesses and individuals.',
    description: 'Goods and Services Tax (GST) registration is mandatory for businesses and individuals whose turnover exceeds the prescribed threshold, as well as certain categories that require compulsory registration. A GST Identification Number (GSTIN) is essential for collecting GST, claiming input tax credit, and conducting inter-state business. This service covers the entire registration process.',
    category: 'gst',
    icon: 'ShieldCheck',
    whoItsFor: [
      'Businesses exceeding the GST turnover threshold',
      'E-commerce sellers',
      'Businesses involved in inter-state supply',
      'Anyone requiring mandatory GST registration',
      'Voluntary registration seekers',
    ],
    process: [
      'Assess your GST registration requirement',
      'Gather necessary documents and information',
      'Prepare and submit the GST registration application',
      'Respond to any queries from the tax authority',
      'Receive and verify your GSTIN',
    ],
    relatedServices: ['gst-return-filing', 'gst-refund', 'bookkeeping'],
  },
  {
    slug: 'gst-return-filing',
    title: 'GST Return Filing',
    shortDescription: 'Regular filing of GST returns to maintain compliance and avoid penalties.',
    description: 'Once registered under GST, businesses must file periodic returns reporting their sales, purchases, tax collected, and tax paid. Timely and accurate GST return filing is essential to avoid penalties, maintain compliance, and claim input tax credit. This service covers the preparation and filing of various GST returns based on your registration type.',
    category: 'gst',
    icon: 'FileCheck',
    whoItsFor: [
      'GST-registered businesses',
      'Composition scheme dealers',
      'Regular taxpayers needing GSTR-1 and GSTR-3B filing',
      'Businesses needing annual return filing',
    ],
    process: [
      'Collect and review sales and purchase data',
      'Reconcile with your financial records',
      'Prepare the applicable GST return',
      'File the return through the GST portal',
      'Maintain records and provide filing confirmation',
    ],
    relatedServices: ['gst-registration', 'gst-refund', 'bookkeeping'],
  },
  {
    slug: 'gst-refund',
    title: 'GST Refund Assistance',
    shortDescription: 'Help with claiming GST refunds where eligible under applicable provisions.',
    description: 'GST refunds may be available in situations such as excess tax payment, exports, inverted duty structure, or other circumstances specified under GST law. The refund process involves specific documentation, application forms, and compliance requirements. This service assists with determining refund eligibility, preparing the application, and following up on the claim.',
    category: 'gst',
    icon: 'RotateCcw',
    whoItsFor: [
      'Exporters of goods or services',
      'Businesses with inverted duty structure',
      'Entities with excess tax credit',
      'Anyone eligible for GST refund under applicable provisions',
    ],
    process: [
      'Assess your eligibility for GST refund',
      'Gather supporting documents and records',
      'Prepare the refund application',
      'File through the GST portal',
      'Follow up on the claim status',
    ],
    relatedServices: ['gst-return-filing', 'gst-registration', 'tax-appeals'],
  },

  // --- Registration ---
  {
    slug: 'company-incorporation',
    title: 'Corporate / Company Incorporation',
    shortDescription: 'Assistance with incorporating a private limited company or other corporate entity.',
    description: 'Incorporating a company provides a formal legal structure for your business, offering benefits such as limited liability, better credibility, and easier access to funding. This service assists with the incorporation process for private limited companies and other corporate entities, including name reservation, document preparation, and filing with the Registrar of Companies.',
    category: 'registration',
    icon: 'Building2',
    whoItsFor: [
      'Entrepreneurs starting a new business',
      'Existing businesses seeking formal incorporation',
      'Startups needing a legal entity',
      'Groups of individuals forming a joint venture',
    ],
    process: [
      'Choose the appropriate company structure',
      'Reserve the company name',
      'Prepare incorporation documents (MOA, AOA)',
      'File incorporation application with ROC',
      'Obtain the Certificate of Incorporation',
    ],
    relatedServices: ['partnership-llp-registration', 'gst-registration', 'professional-tax-registration'],
  },
  {
    slug: 'partnership-llp-registration',
    title: 'Partnership & LLP Registration',
    shortDescription: 'Assistance with registering partnership firms and Limited Liability Partnerships.',
    description: 'Partnership firms and Limited Liability Partnerships (LLPs) offer flexible business structures suitable for professional practices and small to medium businesses. This service covers the registration process for both traditional partnership firms and LLPs, including drafting of partnership deeds, filing with appropriate authorities, and obtaining necessary registrations.',
    category: 'registration',
    icon: 'Users',
    whoItsFor: [
      'Professionals forming a joint practice',
      'Small business owners seeking a partnership structure',
      'Individuals wanting to formalise an existing partnership',
      'Groups seeking limited liability with partnership flexibility',
    ],
    process: [
      'Discuss the partnership terms and structure',
      'Draft or review the partnership deed / LLP agreement',
      'File registration application with the Registrar',
      'Obtain partnership registration / LLP Certificate',
      'Assist with PAN and other related registrations',
    ],
    relatedServices: ['company-incorporation', 'firm-registration', 'gst-registration'],
  },
  {
    slug: 'firm-registration',
    title: 'Firm Registration',
    shortDescription: 'Assistance with registering a proprietorship or partnership firm.',
    description: 'Firm registration provides legal recognition to your business entity. Whether you operate as a sole proprietorship or a partnership, proper registration helps establish your business identity, open bank accounts, apply for loans, and enter into contracts. This service covers the registration process for various types of firms.',
    category: 'registration',
    icon: 'Store',
    whoItsFor: [
      'Sole proprietors wanting formal registration',
      'Small business owners',
      'Shopkeepers and traders',
      'Service providers needing a business identity',
    ],
    process: [
      'Determine the appropriate firm type',
      'Gather required documents',
      'Prepare and submit the registration application',
      'Follow up with the registering authority',
      'Obtain the registration certificate',
    ],
    relatedServices: ['partnership-llp-registration', 'gst-registration', 'professional-tax-registration'],
  },
  {
    slug: 'fssai-license',
    title: 'FSSAI License Assistance',
    shortDescription: 'Assistance with obtaining food safety licenses and registrations from FSSAI.',
    description: 'The Food Safety and Standards Authority of India (FSSAI) requires food businesses to obtain appropriate licenses or registrations. Whether you operate a restaurant, food manufacturing unit, food trading business, or any other food-related enterprise, an FSSAI license is essential for legal compliance. This service assists with determining the appropriate license type and completing the application process.',
    category: 'registration',
    icon: 'UtensilsCrossed',
    whoItsFor: [
      'Restaurant and food service operators',
      'Food manufacturers and processors',
      'Food traders and distributors',
      'Catering businesses',
      'Any food-related business needing FSSAI compliance',
    ],
    process: [
      'Assess the appropriate FSSAI license category',
      'Gather required documents and premises information',
      'Prepare the license application',
      'Submit through the FSSAI portal',
      'Follow up and obtain the license',
    ],
    relatedServices: ['firm-registration', 'gst-registration', 'company-incorporation'],
  },
  {
    slug: 'deed-drafting',
    title: 'Deed Drafting',
    shortDescription: 'Professional drafting of legal deeds, agreements, and business documents.',
    description: 'Properly drafted deeds and agreements form the legal backbone of business relationships and property transactions. This service covers the drafting and review of various deeds including partnership deeds, sale deeds, lease agreements, and other business documents. Well-drafted documents help prevent future disputes and protect the interests of all parties involved.',
    category: 'registration',
    icon: 'FileSignature',
    whoItsFor: [
      'Business partners needing a partnership deed',
      'Property buyers and sellers',
      'Landlords and tenants requiring lease agreements',
      'Businesses needing formal agreements',
    ],
    process: [
      'Discuss the nature and purpose of the deed',
      'Gather relevant details from all parties',
      'Draft the deed with appropriate legal provisions',
      'Review and revise based on feedback',
      'Finalise the document for execution',
    ],
    relatedServices: ['partnership-llp-registration', 'firm-registration', 'company-incorporation'],
  },
];

// Get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// Get services by category
export function getServicesByCategory(category: string): Service[] {
  return services.filter((s) => s.category === category);
}

// Get service titles for dropdown
export function getServiceTitles(): string[] {
  return [
    ...services.map((s) => s.title),
    'Other Related Accounting, Tax & Business Compliance Services',
  ];
}

// Get related services
export function getRelatedServices(slugs: string[]): Service[] {
  return services.filter((s) => slugs.includes(s.slug));
}
