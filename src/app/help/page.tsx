'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHelpCircle, FiMessageSquare, FiBook, FiSearch, FiChevronDown, FiChevronUp, FiMail, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// FAQ item type
interface FAQItem {
  question: string;
  answer: string;
}

// Knowledge base article type
interface KBArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  views: number;
}

export default function HelpPage() {
  // Active section
  const [activeSection, setActiveSection] = useState('faq');
  
  // FAQ state
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  
  // Knowledge base state
  const [kbCategory, setKbCategory] = useState('all');
  
  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  // Handle contact form input change
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };
  
  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Your message has been sent!');
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
  };
  
  // FAQ data
  const faqData: FAQItem[] = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password. Follow the link in the email to create a new password.'
    },
    {
      question: 'How can I update my billing information?',
      answer: 'You can update your billing information by navigating to Settings > Billing. From there, you can edit your payment methods, view past invoices, and update your billing address.'
    },
    {
      question: 'Can I export my dashboard data?',
      answer: 'Yes, you can export your dashboard data in various formats including CSV, Excel, and PDF. To do this, look for the export icon in the top right corner of each widget or report you want to export.'
    },
    {
      question: 'How do I add team members to my account?',
      answer: 'To add team members, go to Settings > Team Management. Click on "Invite Member" and enter their email address. You can assign different roles and permissions to each team member based on your organizational needs.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security very seriously. All data is encrypted both in transit and at rest using industry-standard encryption protocols. We implement strict access controls and regular security audits to ensure your data remains protected.'
    },
    {
      question: 'How often is the dashboard data updated?',
      answer: 'Dashboard data is updated in real-time for most metrics. Some aggregated reports may update hourly or daily depending on the complexity of the calculations involved. The timestamp at the bottom of each widget indicates when it was last updated.'
    }
  ];
  
  // Knowledge base data
  const kbArticles: KBArticle[] = [
    {
      id: 'kb-001',
      title: 'Getting Started with the Dashboard',
      category: 'basics',
      excerpt: 'Learn how to navigate and customize your dashboard for maximum productivity.',
      views: 3421
    },
    {
      id: 'kb-002',
      title: 'Understanding Sales Analytics',
      category: 'analytics',
      excerpt: 'A comprehensive guide to interpreting your sales data and trends.',
      views: 2876
    },
    {
      id: 'kb-003',
      title: 'Advanced Filtering Techniques',
      category: 'advanced',
      excerpt: 'Master the art of filtering and segmenting your data for deeper insights.',
      views: 1543
    },
    {
      id: 'kb-004',
      title: 'Creating Custom Reports',
      category: 'reports',
      excerpt: 'Learn how to build and schedule custom reports for your specific needs.',
      views: 2109
    },
    {
      id: 'kb-005',
      title: 'User Management Best Practices',
      category: 'admin',
      excerpt: 'Guidelines for effectively managing user roles and permissions.',
      views: 967
    },
    {
      id: 'kb-006',
      title: 'Data Import and Export Guide',
      category: 'basics',
      excerpt: 'Step-by-step instructions for importing and exporting your data.',
      views: 1834
    }
  ];
  
  // Filter FAQ based on search term
  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter KB articles based on category
  const filteredKbArticles = kbCategory === 'all' 
    ? kbArticles 
    : kbArticles.filter(article => article.category === kbCategory);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Find answers to your questions or get in touch with our support team.</p>
      </div>
      
      {/* Help navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'faq' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('faq')}
          >
            <FiHelpCircle className="mr-2" />
            <span>FAQs</span>
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'contact' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('contact')}
          >
            <FiMessageSquare className="mr-2" />
            <span>Contact Support</span>
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeSection === 'kb' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            onClick={() => setActiveSection('kb')}
          >
            <FiBook className="mr-2" />
            <span>Knowledge Base</span>
          </button>
        </div>
      </div>
      
      {/* FAQ Section */}
      {activeSection === 'faq' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button 
                    className="w-full px-6 py-4 text-left bg-gray-50 dark:bg-gray-900 flex justify-between items-center"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                    {expandedFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <FiHelpCircle className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500 dark:text-gray-400">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Contact Support Section */}
      {activeSection === 'contact' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
              
              <form onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                    />
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={contactForm.subject}
                    onChange={handleContactInputChange}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                  ></textarea>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select 
                    id="priority"
                    name="priority"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={contactForm.priority}
                    onChange={handleContactInputChange}
                  >
                    <option value="low">Low - General Inquiry</option>
                    <option value="normal">Normal - Need Assistance</option>
                    <option value="high">High - Urgent Issue</option>
                    <option value="critical">Critical - System Down</option>
                  </select>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </motion.div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
              
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                    <FiMail className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@salesdashboard.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We'll respond within 24 hours</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                    <FiPhone className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg mr-4">
                    <FiMessageCircle className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-300">Available for Premium users</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get instant support</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Support Hours</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Monday - Friday: 9AM - 8PM EST</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Saturday: 10AM - 6PM EST</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Knowledge Base Section */}
      {activeSection === 'kb' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          {/* KB Categories */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  kbCategory === 'all' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setKbCategory('all')}
              >
                All
              </button>
              
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  kbCategory === 'basics' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setKbCategory('basics')}
              >
                Basics
              </button>
              
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  kbCategory === 'analytics' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setKbCategory('analytics')}
              >
                Analytics
              </button>
              
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  kbCategory === 'reports' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setKbCategory('reports')}
              >
                Reports
              </button>
              
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  kbCategory === 'advanced' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setKbCategory('advanced')}
              >
                Advanced
              </button>
              
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  kbCategory === 'admin' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setKbCategory('admin')}
              >
                Admin
              </button>
            </div>
          </div>
          
          {/* KB Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredKbArticles.map((article) => (
              <motion.div 
                key={article.id}
                variants={itemVariants}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full mb-3">
                  {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                </span>
                
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{article.views.toLocaleString()} views</span>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
} 