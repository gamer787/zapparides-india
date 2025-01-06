import { type CategoryId } from './faq-categories';

export interface FAQ {
  id: string;
  category: CategoryId;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'pricing',
    category: 'rides',
    question: "How does ZappaRides pricing work?",
    answer: "We offer transparent pricing with upfront fare estimates. Our rates are calculated based on distance, time, and current demand. You can see the exact fare before confirming your ride.  "
  },
  {
    id: 'difference',
    category: 'general',
    question: "What makes ZappaRides different?",
    answer: "We prioritize transparency, fair pricing, and driver welfare. Our technology optimizes routes and matches, ensuring better earnings for drivers and lower wait times for riders. and at the same time empowering our driving partner to how more power of choice to them"
  },
  {
    id: 'become-driver',
    category: 'drivers',
    question: "How do I become a driver?",
    answer: "Sign up through our app, submit required documentation (driver's license, vehicle registration, insurance , pan , aadhar card , bank account with compleate kyc), complete our training program, and choose your preferred pricing plan to start earning with ZappaRides."
  },
  {
    id: 'availability',
    category: 'general',
    question: "Is ZappaRides available in my city?",
    answer: "We're currently operating in telangana. and we are working tirelessly to bring zappa rides to your city and mainaining local state government rules and regulations. Join our waitlist to be notified when we arrive in your area."
  },
  {
    id: 'contact us via email',
    category: 'general',
    question: "contact us via email",
    answer: "please use the following email to get in touch with the team with reachus@zapparides.in"
  },
  {
    id: 'safety-measures',
    category: 'safety',
    question: "What safety measures do you have in place?",
    answer: "We implement real-time driver tracking, emergency assistance buttons, ride sharing options, and thorough background checks for all drivers. Our 24/7 support team monitors all rides."
  },
  {
    id: 'corporate',
    category: 'business',
    question: "Do you offer corporate accounts?",
    answer: "currently no, but are working on provide specialized corporate solutions with custom billing, dedicated account managers, and analytics dashboards for business travel management. please contact customer relations to enroll into our waitlist for this feature "
  },
  {
    id: 'payment-methods',
    category: 'payments',
    question: "What payment methods do you accept?",
    answer: "We currently only accept , UPI payments, and cash payments for maximum convenience."
  },
  {
    id: 'schedule',
    category: 'rides',
    question: "Can I schedule rides in advance?",
    answer: "currently no, but we are working on testing this feature in a future update  ."
  },
  {
    id: 'cancellation',
    category: 'rides',
    question: "What is your cancellation policy?",
    answer: " in view of Motor Vehicle Aqereqators Guidelines-2020 page 8 On cancettation of a booking by a Driver a penatty of 10% of the totat fare not exceeding Rs. 100, and cancetlation by a Rider, subsequent to booking a ride on the App, a penatty of 10% of the total fare not exceeding Rs. 100, shatt be imposed, when such cancettation is made without such valid reason  "
  },
  {
    id: 'driver-requirements',
    category: 'drivers',
    question: "What are the driver requirements?",
    answer: "Drivers must be at least 21 years old, have a valid driver's license, clean driving record, and a vehicle that meets our safety standards."
  },
  {
    id: 'business-billing',
    category: 'business',
    question: "How does business billing work?",
    answer: "we currently dont offer this option but Business accounts receive monthly consolidated invoices, detailed trip reports, and can set custom policies for employee rides."
  },
  {
    id: 'safety-features',
    category: 'safety',
    question: "What safety features are in the app?",
    answer: "Our app includes emergency SOS buttons, ride sharing with trusted contacts, driver verification, and 24/7 customer support."
  }
];