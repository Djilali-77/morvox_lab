import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Send, CheckCircle2, Cpu, ChevronDown } from 'lucide-react';
import { supabase } from '../config/supabase';
import emailjs from '@emailjs/browser';

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    material: 'PLA',
    color: 'Navy Blue',
    description: '',
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = 'No file attached';

      // 1. Upload File to Supabase (if exists)
      if (formData.file) {
        const file = formData.file;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `orders/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('3d_models')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('3d_models')
          .getPublicUrl(filePath);
        
        fileUrl = publicUrlData.publicUrl;
      }

      // 2. Insert into Supabase Database
      const { error: insertError } = await supabase
        .from('custom_orders')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            material: formData.material,
            color: formData.color,
            description: formData.description,
            file_url: fileUrl === 'No file attached' ? null : fileUrl,
          }
        ]);

      if (insertError) throw insertError;

      // 3. Send Email Notification via EmailJS
      const serviceId = 'service_tdoacwe'; 
      const templateId = 'template_a5abfo8';
      const publicKey = 'iMTsr1ltQSyGtN9Fk';

      const templateParams = {
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        material: formData.material,
        color: formData.color,
        description: formData.description,
        file_url: fileUrl,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // 4. Show Success Screen
      setSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Oops! Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-dark pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span className="inline-block py-1.5 px-4 rounded-full bg-navy/5 dark:bg-white/5 text-navy dark:text-bronze-light font-semibold text-sm mb-4">
            Custom Manufacturing
          </motion.span>
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-navy dark:text-white mb-4">
            Sur-<span className="text-bronze">Mesure</span> Orders
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Have a unique part, functional prototype, or custom CAD design in mind? Send us your specs and let Morvox Lab bring it to life.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-navy/40 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-4"
            >
              <CheckCircle2 size={64} className="mx-auto text-bronze" />
              <h2 className="text-2xl font-bold text-navy dark:text-white">Request Received Successfully!</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Thank you, {formData.name}. Our engineering team at Morvox Lab is reviewing your specifications and will get back to you via email shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-navy dark:bg-bronze text-white dark:text-navy rounded-lg font-medium"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Anis Benali"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="anis@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-gray-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="0550 00 00 00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-gray-300 mb-2">Material</label>
                  <div className="relative">
                    <select 
                      name="material" 
                      value={formData.material} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze transition-colors cursor-pointer"
                    >
                      <option value="PLA">PLA (Standard & Eco)</option>
                      <option value="PETG">PETG (Durable & Strong)</option>
                      <option value="ABS">ABS (Engineering Grade)</option>
                      <option value="TPU">TPU (Flexible / Rubber-like)</option>
                    </select>
                    
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-navy/50 dark:text-gray-400">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy dark:text-gray-300 mb-2">Preferred Color</label>
                  <input 
                    type="text" 
                    name="color" 
                    value={formData.color} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy dark:text-gray-300 mb-2">Project Description & Dimensions</label>
                <textarea 
                  name="description" 
                  rows={4}
                  required
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="Describe your part requirements, intended use, dimensions in mm, or layer height preferences..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-navy-dark text-navy dark:text-white focus:outline-none focus:border-bronze transition-colors resize-none"
                />
              </div>

              {/* File Upload Zone */}
              <div>
                <label className="block text-sm font-semibold text-navy dark:text-gray-300 mb-2">Upload CAD File / References (.STL, .STEP, .JPG)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:bg-navy-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-bronze" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">STL, STEP, PNG, JPG (MAX. 50MB)</p>
                      {formData.file && (
                        <p className="text-xs font-bold text-bronze mt-2">Selected: {formData.file.name}</p>
                      )}
                    </div>
                    <input type="file" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-navy dark:bg-bronze hover:bg-navy-light dark:hover:bg-bronze-light text-white dark:text-navy rounded-xl font-bold text-lg shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                <span>{isSubmitting ? 'Sending your request...' : 'Submit Request'}</span>
              </motion.button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default CustomOrders;